from flask import Flask
from flask_cors import CORS
import logging
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from . import app, envs


app = Flask(__name__)
# CORS(app)

gunicorn_logger = logging.getLogger('gunicorn.error')
app.logger.handlers = gunicorn_logger.handlers
app.logger.setLevel(gunicorn_logger.level)

app.config['SQLALCHEMY_DATABASE_URI'] = envs.DATABASE_URL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = envs.SECRET_KEY

db = SQLAlchemy(app)
from . import models

migrate = Migrate(app, db)
from . import views

