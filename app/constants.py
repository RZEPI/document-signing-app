import enum

DEBUG = True
KEY_PIN = b"\x00\x00\x07\xD1"
PRIVATE_KEY_FILE = "files\\private_key.pem"
PUBLIC_KEY_FILE = "files\\public_key.pem"
FERNET_FILE = "files\\fernet_key.key"

KEY_LEN = 4096
DEFAULT_USER_DATA = {
    "name": "User not provided",
    "index": "Index not provided",
    "group": "Group not provided",
}

STORAGE_PATH = "files\\"

class ConvertionType(enum.Enum):
    ENCRYPT = 1 
    DECRYPT = 2