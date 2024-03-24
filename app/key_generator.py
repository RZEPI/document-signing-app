from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import rsa

FILE_NAME = "files\\private_key.pem"
KEY_LEN = 4096

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

with open(FILE_NAME, 'wb') as file:
    file.write(private_key_pem)

print(f"Private key saved to {FILE_NAME}")