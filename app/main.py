from sys import argv

from user import User, UserType

RSA_KEY_LEN = 4096 #in bits
KEY_PIN = b"2001"

RSA_KEY = 'files\\private_key.pem'

try:
    if argv[1] == "user_b":
        user_type = UserType.USER_B
    else:
        user_type = UserType.USER_A
except IndexError:
    user_type = UserType.USER_A

user = User('RPI.pdf', user_type)
user.sign_doc(RSA_KEY, password=KEY_PIN)
user.encrypt_decrypt_doc(RSA_KEY, option="encrypt", password=KEY_PIN)
is_doc_vaild = user.verify_signature()
if is_doc_vaild:
    print("Signature is valid")
else:
    print("Signature is invalid")