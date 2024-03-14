from sys import argv
import secrets

def generate_key(lengh=32):
    return secrets.token_hex(lengh//2)


if argv[1]:
    print(generate_key(int(argv[1])))
else:
    print(generate_key())