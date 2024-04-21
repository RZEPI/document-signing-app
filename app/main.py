import json
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

@app.route("/sign", methods=["POST"])
def sign_file():
    file = request.files["file"]
    user_data = json.loads(request.form["userData"])
    if file:
        file_path = f"{STORAGE_PATH}{file.filename}"
        file.save(file_path)
        user.set_doc(file.filename)
        user.user_data = user_data
        user.sign_doc(PRIVATE_KEY_FILE, password=KEY_PIN)

        return jsonify({"message": "Document signed"}), 200
    else:
        return jsonify({"message": "No file provided"}), 400


@app.route("/download/signed", methods=["GET"])
def download_signed_doc():
    return send_file(user.file_path, as_attachment=True)

@app.route("/download/xml", methods=["GET"])
def download_xml():
    return send_file(user.file_data_path, as_attachment=True)

@app.route("/verify", methods=["POST"])
def verify_signature():
    file_xml = request.files["xml"]
    file_doc = request.files["doc"]

    if file_xml and file_doc:
        file_xml.save(f"{STORAGE_PATH}{file_xml.filename}")
        file_doc.save(f"{STORAGE_PATH}{file_doc.filename}")
        user.set_doc(file_doc.filename)

        is_doc_vaild = user.verify_signature()
    else:
        return jsonify({"message": "No files provided"}), 400


    if is_doc_vaild:
        return jsonify({"message": "Signature is valid"}), 200
    else:
        return jsonify({"message": "Signature is invalid"}), 400

if __name__ == "__main__":
    app.run(debug=True, port=5000)