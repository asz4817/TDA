import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')
    MAIL_DEFAULT_SENDER = os.environ.get('MAIL_DEFAULT_SENDER')
    ALLOWED_IPS = os.environ.get('ALLOWED_IPS', '127.0.0.1').split(',')
    MONGO_URI = os.environ.get('MONGO_URI')
