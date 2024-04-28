import json
import os
from sys import argv
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS

from user import User, UserType
from constants import PRIVATE_KEY_FILE, STORAGE_PATH, KEY_PIN, DEBUG, ConvertionType

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


def save_file(file):
    file_path = f"{STORAGE_PATH}{file.filename}"
    file.save(file_path)
    return file_path


def parse_operation(operation: str):
    operation = operation.replace('"', '')
    if operation == "Encryption":
        return ConvertionType.ENCRYPT
    elif operation == "Decryption":
        return ConvertionType.DECRYPT
    else:
        raise ValueError("Invalid operation")


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
    try:
        file_xml = request.files["xml"]
        file_doc = request.files["doc"]

        file_name = file_doc.filename

        file_xml.filename = file_name.split(".")[0] + "_signature.xml"

        if file_xml and file_doc:
            save_file(file_xml)
            save_file(file_doc)
            user.set_doc(file_name)

            is_doc_vaild = user.verify_signature()
        else:
            return jsonify({"message": "No files provided"}), 400

        if is_doc_vaild:
            return jsonify({"message": "Signature is valid"}), 200
        else:
            return jsonify({"message": "Signature is invalid"}), 400
    except Exception as e:
        print(e)
        return jsonify({"message": str(e)}), 400


@app.route("/crypto", methods=["POST", "GET"])
def encrypt_file():
    try:
        if request.method == "POST":
            file = request.files["file"]
            operation = parse_operation(str(request.form.get("operation")))
            file_path = save_file(file)
            new_file_path = user.crypto_convert_file(file_path, operation)
            new_file_name = new_file_path.split("\\")[-1]
            return jsonify({"message": "File converted", "filename":new_file_name}), 200
        elif request.method == "GET":
            if file_name := request.args.get("filename"):
                return send_file(f"{STORAGE_PATH}{file_name}", as_attachment=True)
            else:
                return jsonify({"message": "No file name provided"}), 400
    except Exception as e:
        if file_path:
            os.remove(file_path)
        return jsonify({"message": str(e)}), 400


if __name__ == "__main__":
    if user_type == UserType.USER_A:
        app.run(debug=DEBUG, port=5000)
    else:
        app.run(debug=DEBUG, port=5001)
