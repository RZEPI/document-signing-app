from enum import Enum

import os
import base64
from xml.etree import ElementTree
from datetime import datetime

from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives.serialization import (
    load_pem_private_key,
    load_pem_public_key,
    Encoding,
    PublicFormat,
)
from cryptography.exceptions import InvalidSignature
from cryptography.fernet import Fernet

from constants import (
    DEFAULT_USER_DATA,
    PUBLIC_KEY_FILE,
    FERNET_FILE,
    STORAGE_PATH,
    ConvertionType,
)


class UserType(Enum):
    USER_A = 1
    USER_B = 2


class User:
    file_name = None
    private_key = None

    def __init__(
        self,
        type=UserType.USER_A,
        user_data=DEFAULT_USER_DATA,
    ):
        self.type = type
        self.user_data = user_data

    def set_doc(self, file_name):
        self.file_name = file_name
        self.file_path = f"{STORAGE_PATH}{file_name}"
        self.file_data_path = f"{STORAGE_PATH}{file_name.split('.')[0]}_signature.xml"
        with open(self.file_path, "rb") as file:
            self.doc = file.read()

    def check_file(method):
        def wrapper(self, *args, **kwargs):
            if not self.file_name:
                raise Exception("No file provided")

            ret_val = method(self, *args, **kwargs)
            return ret_val

        return wrapper

    @staticmethod
    def create_xml_node(parent_node, node_name, node_value):
        node = ElementTree.SubElement(parent_node, node_name)
        node.text = str(node_value)
        return node

    @staticmethod
    def create_xml_node_from_dict(parent_node, node_name, node_dict):
        node = ElementTree.SubElement(parent_node, node_name)
        for key, value in node_dict.items():
            User.create_xml_node(node, key, value)
        return node

    @staticmethod
    def store_public_key(public_key):
        with open(PUBLIC_KEY_FILE, "wb") as file:
            public_key_pem = public_key.public_bytes(
                encoding=Encoding.PEM, format=PublicFormat.SubjectPublicKeyInfo
            )
            file.write(public_key_pem)

    @staticmethod
    def load_public_key():
        with open(PUBLIC_KEY_FILE, "rb") as file:
            public_key = load_pem_public_key(file.read())

        return public_key

    def load_private_key(self, private_key_file, password=None):
        with open(private_key_file, "rb") as file:
            self.private_key = load_pem_private_key(file.read(), password=password)

    @staticmethod
    def load_file_content(file_path):
        with open(file_path, "rb") as file:
            file_content = file.read()

        return file_content

    @staticmethod
    def store_file_content(file_path, content):
        with open(file_path, "wb") as file:
            file.write(content)

    @staticmethod
    def load_fernet_key():
        return User.load_file_content(FERNET_FILE)

    @staticmethod
    def crypto_convert_file(file_path, cypher_type=ConvertionType.ENCRYPT):
        fernet_key = User.load_fernet_key()
        fernet = Fernet(fernet_key)

        file_content = User.load_file_content(file_path)
        if cypher_type == ConvertionType.ENCRYPT:
            file_content = fernet.encrypt(file_content)
            new_file_path = file_path + ".encrypted"
        else:
            file_content = fernet.decrypt(file_content)
            new_file_path = file_path.replace(".encrypted", "")

        User.store_file_content(new_file_path, file_content)
        return new_file_path

    @check_file
    def sign_doc(self):
        if self.type == UserType.USER_B:
            raise Exception("User B cannot sign doc")
        if not self.file_name:
            raise Exception("No file provided")

        if self.private_key:
            signature = self.private_key.sign(
                self.doc,
                padding.PSS(
                    mgf=padding.MGF1(hashes.SHA256()),
                    salt_length=padding.PSS.MAX_LENGTH,
                ),
                hashes.SHA256(),
            )
            self._save_signature(signature)
            self.store_public_key(self.private_key.public_key())
        else:
            raise Exception("No private key provided")

    @check_file
    def get_document_data(self):
        size = os.path.getsize(self.file_path)
        extension = os.path.splitext(self.file_name)[-1]
        mod_date_timestamp = os.path.getmtime(self.file_path)
        mod_date = datetime.fromtimestamp(mod_date_timestamp).isoformat()

        return {
            "size": size,
            "extension": extension,
            "mod_date": mod_date,
            "name": self.file_name,
        }

    @check_file
    def _save_signature(self, signature):
        signature_xml = ElementTree.Element("signature")
        User.create_xml_node(
            signature_xml, "content", base64.b64encode(signature).decode("utf-8")
        )
        User.create_xml_node(signature_xml, "date", datetime.now().isoformat())
        User.create_xml_node_from_dict(signature_xml, "user-data", self.user_data)
        User.create_xml_node_from_dict(
            signature_xml, "document-data", self.get_document_data()
        )

        signature_tree = ElementTree.ElementTree(signature_xml)
        signature_tree.write(self.file_data_path)

    @check_file
    def verify_signature(self, file_data_path=None):
        if not file_data_path:
            signature_file_tree = ElementTree.parse(self.file_data_path)
        else:
            signature_file_tree = ElementTree.parse(file_data_path)
        signature = base64.b64decode(signature_file_tree.find("content").text)
        public_key = self.load_public_key()
        try:
            public_key.verify(
                signature,
                self.doc,
                padding.PSS(
                    mgf=padding.MGF1(hashes.SHA256()),
                    salt_length=padding.PSS.MAX_LENGTH,
                ),
                hashes.SHA256(),
            )
            return True
        except InvalidSignature:
            return False
