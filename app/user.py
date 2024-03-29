from enum import Enum

import os
import base64
from xml.etree import ElementTree
from datetime import datetime

from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives.serialization import load_pem_private_key
from cryptography.fernet import Fernet

DEFAULT_USER_DATA = {
    "name": "User not provided",
    "index": "Index not provided",
    "group": "Group not provided",
}

class UserType(Enum):
    USER_A = 1
    USER_B = 2


class User:
    def __init__(
        self,
        file_name,
        type=UserType.USER_A,
        user_data=DEFAULT_USER_DATA,
    ):
        self.type = type
        self.file_name = file_name
        self.user_data = user_data
        with open(f"files\\{file_name}", "rb") as file:
            self.doc = file.read()

    def encrypt_doc(self, private_key_pem):
        fernet = Fernet(private_key_pem)
        encrypted_doc = fernet.encrypt(self.doc.encode("utf-8"))

        return encrypted_doc

    def decrypt_doc(self, private_key_pem):
        fernet = Fernet(private_key_pem)
        decrypted_doc = fernet.decrypt(self.doc)

        return decrypted_doc

    def sign_doc(self, private_key_file, password=None):
        if self.type == UserType.USER_B:
            raise Exception("User B cannot sign doc")

        with open(private_key_file, "rb") as file:
            private_key = load_pem_private_key(file.read(), password=password)

        signature = private_key.sign(
            self.doc,
            padding.PSS(
                mgf=padding.MGF1(hashes.SHA256()), salt_length=padding.PSS.MAX_LENGTH
            ),
            hashes.SHA256(),
        )
        self._save_signature(signature)

    def get_document_data(self):
        file_path = f"files\\{self.file_name}"
        size = os.path.getsize(file_path)
        extension = os.path.splitext(self.file_name)[-1]
        mod_date_timestamp = os.path.getmtime(file_path)
        mod_date = datetime.fromtimestamp(mod_date_timestamp).isoformat()

        return {"size": size, "extension": extension, "mod_date": mod_date}

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

    def _save_signature(self, signature):
        file_name = self.file_name + "_signature.xml"
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
        signature_tree.write(f"files\\{file_name}")
