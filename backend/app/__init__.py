from flask import Flask
from flask_pymongo import PyMongo
from flask_cors import CORS
import os

mongo = PyMongo()

def create_app():
    app = Flask(__name__)

    # Load config from environment
    app.config["MONGO_URI"] = os.getenv("MONGO_URI", "mongodb://mongo_db:27017/flaskdb")

    # Init extensions
    mongo.init_app(app)
    CORS(app)

    # Register routes
    from .routes import api_bp
    app.register_blueprint(api_bp, url_prefix="/api")

    return app
