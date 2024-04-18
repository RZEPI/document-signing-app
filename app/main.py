from sys import argv
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS

from user import User, UserType
from constants import PRIVATE_KEY_FILE, ConvertionType, STORAGE_PATH, KEY_PIN

app = Flask(__name__)
CORS(app)

try:
    if argv[1] == "user_b":
        user_type = UserType.USER_B
    else:
        user_type = UserType.USER_A
except IndexError:
    user_type = UserType.USER_A

user = User(user_type)

@app.route("/pin", methods=["POST"])
def verify_pin():
    request_body = request.json
    pin = request_body.get("pin")

    if int(pin) == int.from_bytes(KEY_PIN):
        return jsonify({"message": "Pin is valid"}), 200
    else:
        return jsonify({"message": "Pin is invalid"}), 401

@app.route("/upload", methods=["POST"])
def upload_file():
    file = request.files["file"]
    if file:
        file_path = f"{STORAGE_PATH}{file.filename}"
        file.save(file_path)
        user.set_doc(file.filename)
        return jsonify({"message": "File uploaded"}), 200
    else:
        return jsonify({"message": "No file provided"}), 400

@app.route("/sign", methods=["POST"])
def sign_doc():
    request_body = request.json
    user_data = request_body.get("userData")

    try:
        user.user_data = user_data
        user.sign_doc(PRIVATE_KEY_FILE, password=KEY_PIN)

        return jsonify({"message": "Document signed"}), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 400


@app.route("/download/signed", methods=["GET"])
def download_signed_doc():
    return send_file(user.file_path, as_attachment=True)

@app.route("/download/xml", methods=["GET"])
def download_xml():
    return send_file(user.file_data_path, as_attachment=True)

if __name__ == "__main__":
    app.run(debug=True, port=5000)


# user = User('RPI.pdf', user_type)
# user.sign_doc(PRIVATE_KEY_FILE, password=KEY_PIN)
# is_doc_vaild = user.verify_signature()
# if is_doc_vaild:
#     print("Signature is valid")
# else:
#     print("Signature is invalid")

# encrypted_file = user.crypto_convert_file("files\\RPI.pdf")
# print(f"Encrypted file saved to{encrypted_file}")
# decrypted_file = user.crypto_convert_file(encrypted_file, ConvertionType.DECRYPT)
# print(f"Decrypted file saved to{decrypted_file}")