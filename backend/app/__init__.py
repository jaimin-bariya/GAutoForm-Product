import faulthandler
from flask import Flask
from flask_migrate import Migrate
from config import Config
from app.database import db
from werkzeug.debug import DebuggedApplication
from flask_cors import CORS
import os


faulthandler.enable()

def Create_app():

    app = Flask(__name__)

    # app.wsgi_app = DebuggedApplication(app.wsgi_app, evalex=True)

    app.config.from_object(Config)


    db.init_app(app)

    migrate = Migrate(app)



    from app.routes import user_bp, form_bp


    app.register_blueprint(user_bp, url_prefix="/user")
    app.register_blueprint(form_bp, url_prefix="/form")

    # CORS must be applied **after** registering blueprints
    CORS(app, resources={r"/*": {"origins": os.getenv("FRONTEND_URL", "http://localhost:5173")}})



    if app.config.get("DEBUG", False):
        app.wsgi_app = DebuggedApplication(app.wsgi_app, evalex=True)


    return app

