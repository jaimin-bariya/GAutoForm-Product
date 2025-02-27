import os

class Config:

    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URI", 'sqlite:///database.db')
    SECRET_KEY = os.getenv("SECRET_KEY", "default_secret_key")
    SQLALCHEMY_TRACK_MODIFICATIONS = False

