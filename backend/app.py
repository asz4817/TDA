from datetime import datetime
from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
from flask_mail import Mail, Message
from pymongo import MongoClient
from config import Config
import json
import os
from werkzeug.utils import secure_filename
import base64

import zipfile
import io


app = Flask(__name__, static_folder="../frontend/dist", static_url_path="/")
app.config.from_object(Config)
cors = CORS(app, origins='*')

client = MongoClient(app.config['MONGO_URI'])
db = client.get_database('TDA')
mail = Mail(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

CHAPERONE_FOLDER = os.path.join(BASE_DIR, "chaperone_forms")
MUSIC_FOLDER = os.path.join(BASE_DIR, "music_files")

os.makedirs(CHAPERONE_FOLDER, exist_ok=True)
os.makedirs(MUSIC_FOLDER, exist_ok=True)

app.config["CHAPERONE_FOLDER"] = CHAPERONE_FOLDER
app.config["MUSIC_FOLDER"] = MUSIC_FOLDER

# Configuration
REGISTRATIONS_FILE = 'registrations.json'
ALLOWED_EXTENSIONS = {'pdf', 'doc', 'docx'}
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
@app.errorhandler(404)
def catch_all(path):
    return app.send_static_file('index.html')


@app.route('/contact', methods=['POST', 'GET'])
def contact():
    '''backend for contact page'''
    data = request.get_json()

    name = data['name']
    email = data['email']
    message = data['message']


    try:
        db.contactMessages.insert_one({
            'Name': name, 
            'Email': email, 
            'Message': message
        })

        msg = Message(f"Contact Us Page: Message from {name}",
                       recipients=['texasdiabolo@gmail.com'])
        msg.body = f"Name:  {name} \
            \nEmail:  {email} \
            \n\nMessage:\n{message}"
        mail.send(msg)

    except Exception as e:
        print(f"Failed: {str(e)}")
        return jsonify({"message":  f"Failed: {str(e)}"}), 409

    return jsonify({"Message": "Message received!"}), 200

@app.route('/addToMailout', methods = ['POST', 'GET'])
def add_to_mailout():
    '''Function to add email to mailout list when form is filled out'''
    email = request.get_json()


    if db.mail_list.find_one({'email': email}):
        return jsonify({"message": "This email is already subscribed!"}), 409

    db.mail_list.insert_one({'email':email, 'subscribed': True})
    return jsonify({"message": "Subscribed successfully!"}), 200

@app.route('/upload_newsletter', methods=['POST'])
def upload_newsletter():
    '''Send newsletter out to recipients'''
    subject = request.form['subject']
    body = request.form['body']
    subscribers = list(db.mail_list.find({'subscribed': True}))
    recipients = [subscriber['email'] for subscriber in subscribers]

    try:
        msg = Message(subject, recipients=recipients)
        msg.body = body + "\n"

        files = request.files.getlist('file')

        for file in files:
            if file:
                msg.attach(file.filename, 'application/pdf', file.read(), disposition='inline')
        mail.send(msg)

        db.delivered_newsletters.insert_one({
            'subject': subject,
            'body': body,
            'emails': recipients,
            'delivered_at': datetime.utcnow()
        })
    except Exception as e:
        print(f"Failed to send email: {str(e)}")

    return jsonify({"message": "Emails sent!"}), 202




@app.route('/download/all_chaperones')
def download_all_chaperones():
    folder = app.config['CHAPERONE_FOLDER']
    
    # Create a zip file in memory
    zip_buffer = io.BytesIO()
    with zipfile.ZipFile(zip_buffer, 'w') as zipf:
        for filename in os.listdir(folder):
            file_path = os.path.join(folder, filename)
            if os.path.isfile(file_path):
                zipf.write(file_path, arcname=filename)
    zip_buffer.seek(0)

    return send_file(
        zip_buffer,
        mimetype='application/zip',
        as_attachment=True,
        download_name='chaperone_forms.zip'
    )


@app.route('/register_indiv', methods=['POST'])
def register_individual():
    """Handle individual registration with optional file upload (stored in MongoDB)"""
    try:
        data = request.get_json()

        # Validate required fields
        required_fields = [
            'firstname', 'lastname', 'email', 'phonenumber',
            'dateofbirth', 'tshirtsize', 'emergencycontactname',
            'emergencycontactphone', 'numberofguests'
        ]
        missing_fields = [field for field in required_fields if field not in data]
        if missing_fields:
            return jsonify({
                'error': f'Missing required fields: {", ".join(missing_fields)}'
            }), 400

        # Handle optional chaperone file for minors
        chaperone_file_path = None
        if data.get('isminor') and data.get('chaperonefile'):
            try:
                file_data = data['chaperonefile']
                file_name = data.get('chaperonefilename', 'chaperone_form.pdf')
                filename = secure_filename(f"{data['firstname']}_{data['lastname']}_{file_name}")
                file_path = os.path.join(app.config['CHAPERONE_FOLDER'], filename)
                with open(file_path, 'wb') as f:
                    f.write(base64.b64decode(file_data.split(',')[1] if ',' in file_data else file_data))
                chaperone_file_path = file_path
            except Exception as e:
                return jsonify({'error': f'Failed to save chaperone form: {str(e)}'}), 400

        # Build the registration document
        new_registration = {
            'timestamp': datetime.utcnow(),
            'firstname': data['firstname'],
            'lastname': data['lastname'],
            'email': data['email'],
            'phonenumber': data['phonenumber'],
            'division': data['division'],
            'dateofbirth': data['dateofbirth'],
            'tshirtsize': data['tshirtsize'],
            'emergencycontactname': data['emergencycontactname'],
            'emergencycontactphone': data['emergencycontactphone'],
            'numberofguests': data['numberofguests'],
            'isminor': data.get('isminor', False),
            'chaperonefile': chaperone_file_path
        }

        # Save to MongoDB instead of JSON file
        result = db.individual_registrations.insert_one(new_registration)

        return jsonify({
            'message': 'Registration successful!',
            'registration_id': str(result.inserted_id)
        }), 200
        

    except Exception as e:
        return jsonify({'error': f'Server error: {str(e)}'}), 500

@app.route('/register_team', methods=['POST'])
def register_team():
    """Handle team registration with multiple members (stored in MongoDB)"""
    try:
        data = request.get_json()

        # Validate members
        if 'members' not in data or len(data['members']) == 0:
            return jsonify({'error': 'No team members provided'}), 400

        # Validate emergency contact + guests
        required_fields = ['emergencycontactname', 'emergencycontactphone', 'numberofguests']
        missing_fields = [field for field in required_fields if field not in data]
        if missing_fields:
            return jsonify({
                'error': f'Missing required fields: {", ".join(missing_fields)}'
            }), 400

        # Handle optional chaperone files (for minors)
        chaperone_file_paths = []
        if data.get('chaperonefiles'):
            for idx, file_data_obj in enumerate(data['chaperonefiles']):
                try:
                    file_data = file_data_obj['data']
                    file_name = file_data_obj['name']
                    filename = secure_filename(f"team_chaperone_{idx+1}_{file_name}")
                    file_path = os.path.join(app.config['CHAPERONE_FOLDER'], filename)

                    with open(file_path, 'wb') as f:
                        f.write(base64.b64decode(file_data.split(',')[1] if ',' in file_data else file_data))

                    chaperone_file_paths.append(file_path)
                except Exception as e:
                    return jsonify({'error': f'Failed to save chaperone form {idx+1}: {str(e)}'}), 400

        # Create new team registration entry
        new_registration = {
            'type': 'team',
            'timestamp': datetime.utcnow(),
            'members': data['members'],
            'team_size': len(data['members']),
            'emergencycontactname': data['emergencycontactname'],
            'emergencycontactphone': data['emergencycontactphone'],
            'numberofguests': data['numberofguests'],
            'chaperonefiles': chaperone_file_paths
        }

        # Save to MongoDB instead of JSON
        result = db.team_registrations.insert_one(new_registration)

        return jsonify({
            'message': 'Team registration successful!',
            'registration_id': str(result.inserted_id)
        }), 200

    except Exception as e:
        return jsonify({'error': f'Server error: {str(e)}'}), 500




# @app.route("/upload_audio", methods=["POST"])
# def upload_audio():
#     """Handle audio file upload and store metadata in MongoDB"""
#     try:
#         #  Check for file in request
#         if "file" not in request.files:
#             return jsonify({"error": "No file part"}), 400

#         file = request.files["file"]
#         if file.filename == "":
#             return jsonify({"error": "No file selected"}), 400

#         # Save file locally to MUSIC_FOLDER
#         filename = secure_filename(file.filename)
#         file_path = os.path.join(app.config['MUSIC_FOLDER'], filename)
#         file.save(file_path)

#         # Optional: store metadata in MongoDB
#         upload_info = {
#             "filename": filename,
#             "path": file_path,
#             "timestamp": datetime.utcnow(),
#         }

#         result = db.audio_uploads.insert_one(upload_info)

#         return jsonify({
#             "message": "File uploaded successfully",
#             "filename": filename,
#             "path": file_path,
#             "upload_id": str(result.inserted_id)
#         }), 200

#     except Exception as e:
#         return jsonify({"error": f"Server error: {str(e)}"}), 500
    
@app.route("/upload_audio", methods=["POST"])
def upload_audio():
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    # save to the correct folder
    file_path = os.path.join(app.config['MUSIC_FOLDER'], secure_filename(file.filename))
    file.save(file_path)


    return jsonify({
        "message": "File uploaded successfully",
        "filename": file.filename,
        "path": file_path
    })


@app.route("/download_all_audios", methods=["GET"])
def download_all_audios():
    memory_file = io.BytesIO()
    with zipfile.ZipFile(memory_file, "w") as zf:
        for filename in os.listdir(app.config['MUSIC_FOLDER']):
            file_path = os.path.join(app.config['MUSIC_FOLDER'], filename)
            if os.path.isfile(file_path):
                zf.write(file_path, arcname=filename)
    memory_file.seek(0)
    return send_file(memory_file, as_attachment=True, download_name="all_audios.zip")

if __name__ == '__main__':
    app.run(debug=True)
