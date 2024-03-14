from enum import Enum
from datetime import datetime
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives.serialization import load_pem_private_key


class UserType(Enum):
    USER_A = 1
    USER_B = 2

class User:
    def __init__(self, type=UserType.USER_A):
        self.type = type

    def set_doc(self, doc):
        self.doc = doc

    def sign_doc(self, private_key_pem):
        if self.type == UserType.USER_B:
            raise Exception("User B cannot sign doc")
        
        private_key = load_pem_private_key(private_key_pem, password=None, backend=default_backend())

        timestamp = str(datetime.now()).encode('utf-8')
        new_document = self.doc.encode('utf-8') + timestamp
        
        signature = private_key.sign(new_document, padding.PSS(mgf=padding.MGF1(hashes.SHA256()), salt_length=padding.PSS.MAX_LENGTH), hashes.SHA256())

    def verify_doc(self):
        pass

    def encrypt_doc(self):
        pass

    def decrypt_doc(self):
        pass

    def remove_doc(self):
        del self.doc