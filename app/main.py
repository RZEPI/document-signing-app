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

user = User('COM3_191703_Paweł_Rzepecki (1).pdf', user_type)
user.sign_doc(RSA_KEY, password=KEY_PIN)