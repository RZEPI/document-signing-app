from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.fernet import Fernet

from constants import PRIVATE_KEY_FILE, FERNET_FILE, KEY_LEN


private_key = rsa.generate_private_key(
    public_exponent=65537,
    key_size=KEY_LEN
,
)
private_key_pem = private_key.private_bytes(
    encoding=serialization.Encoding.PEM,
    format=serialization.PrivateFormat.PKCS8,
    encryption_algorithm=serialization.BestAvailableEncryption(b"2001")
)

fernet_key = Fernet.generate_key()

with open(FERNET_FILE, 'wb') as file:
    file.write(fernet_key)

with open(PRIVATE_KEY_FILE, 'wb') as file:
    file.write(private_key_pem)

print(f"Private key saved to {PRIVATE_KEY_FILE}")