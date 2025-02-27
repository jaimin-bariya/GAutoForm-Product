from flask import request, jsonify, Blueprint, redirect, url_for
import os
import pandas as pd
import time
from app.utils import startDemoFill

form_bp = Blueprint("form_bp", __name__)


UPLOAD_FOLDER = "uploads_csv"  # Folder to save uploaded csv files
os.makedirs(UPLOAD_FOLDER, exist_ok=True)



todays_Form = {}



@form_bp.route("/test")
def TestForm():


    url = todays_Form.get("formLink", None)
    fields = todays_Form.get("formFields", None)
    filePath = todays_Form.get("filePath", None)


    startDemoFill(url=url, fields=fields, filePath=filePath)
    return jsonify(todays_Form)
    
    


@form_bp.route("/fileupload", methods=['POST', 'GET'])
def upload_file():
    
    if 'file' not in request.files:
        return jsonify({"error": "No File part"}), 400
    
    print("-------------------------\n -------------------")

    file = request.files['file']

    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400


    # file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    # file.save(file_path)


    # Convert them into csv df and save them 
    try:
        if file.filename.endswith(".csv"):
            file.seek(0)  # Reset pointer before reading
            df = pd.read_csv(file, encoding="utf-8", engine="python")
        elif file.filename.endswith(".xlsx"):
            file.seek(0)
            df = pd.read_excel(file, engine="openpyxl")
        else:
            return jsonify({"error": "Unsupported file format"}), 400
        

        file_path = os.path.join(UPLOAD_FOLDER, file.filename.split(".")[0] + ".csv")
        todays_Form['fileName'] = str(file.filename)
        todays_Form['filePath'] = str(file_path)
        df.to_csv(file_path, index=False)

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

    


    return jsonify({"msg": "File uploaded successfully", "FileName": file.filename, "columns": list(df.columns)}), 201





@form_bp.route("/form-link", methods=['POST'])
def post_form_link():

    try:

        data = request.get_json()

        if not data or not "formLink" in data:
            return jsonify({"error": "Missing link in JSON request"}), 400
        
        print("rech this")
    
        todays_Form['formLink'] = data['formLink']
    
        return jsonify({"msg": "Recevied Link", "link": data['formLink']}), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    


@form_bp.route("form-field", methods=['POST'])
def post_form_field():

    try:

        data = request.get_json()

        if not data or not "fields" in data:
            return jsonify({"error": "fields not found in JSON req"}), 400
    
        todays_Form['formFields'] = data['fields']
        return jsonify({"msg": "Fields recevied", "fields": data['fields']}), 200


    except Exception as e:
        return jsonify({"error": str(e)}), 500


