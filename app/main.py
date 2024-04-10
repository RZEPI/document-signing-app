from sys import argv

from user import User, UserType
from constants import PRIVATE_KEY_FILE, ConvertionType

KEY_PIN = b"2001"

try:
    if argv[1] == "user_b":
        user_type = UserType.USER_B
    else:
        user_type = UserType.USER_A
except IndexError:
    user_type = UserType.USER_A

user = User('RPI.pdf', user_type)
user.sign_doc(PRIVATE_KEY_FILE, password=KEY_PIN)
is_doc_vaild = user.verify_signature()
if is_doc_vaild:
    print("Signature is valid")
else:
    print("Signature is invalid")

encrypted_file = user.crypto_convert_file("files\\RPI.pdf")
print(f"Encrypted file saved to{encrypted_file}")
decrypted_file = user.crypto_convert_file(encrypted_file, ConvertionType.DECRYPT)
print(f"Decrypted file saved to{decrypted_file}")