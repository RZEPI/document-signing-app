from enum import Enum

import base64
from xml.etree import ElementTree
from datetime import datetime

from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives.serialization import load_pem_private_key
from cryptography.fernet import Fernet


class UserType(Enum):
    USER_A = 1
    USER_B = 2


class User:
    def __init__(self, file_name, type=UserType.USER_A):
        self.type = type
        self.file_name = file_name
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

    def _save_signature(self, signature):
        file_name = self.file_name + "_signature.xml"
        signature_xml = ElementTree.Element("signature")
        signature_content = ElementTree.SubElement(signature_xml, "content")
        signature_content.text = base64.b64encode(signature).decode("utf-8")

        signature_tree = ElementTree.ElementTree(signature_xml)
        signature_tree.write(f'files\\{file_name}')
