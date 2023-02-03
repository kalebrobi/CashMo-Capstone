from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def valid_email(form, field):
    email = field.data
    substring = '@'
    if substring not in email:
        raise ValidationError('Must be a valid email address')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


def validate_image_url(form, field):
    allowed_extensions = ['.jpg', '.png','.jpeg','.webp', '.gif']
    image_url = field.data
    if not image_url.startswith('http://') and not image_url.startswith('https://'):
        raise ValidationError('Image URL must start with either "http://" or "https://"')


def username_length(form, field):
    if len(field.data) > 15:
        raise ValidationError('Username cannot be longer than 15 characters.')




class SignUpForm(FlaskForm):
    first_name = StringField('first_name', validators=[DataRequired()])
    last_name = StringField('last_name', validators=[DataRequired()])
    username = StringField('username', validators=[DataRequired(), username_exists, username_length])
    email = StringField('email', validators=[DataRequired(), user_exists, valid_email])
    password = StringField('password', validators=[DataRequired()])
    profile_photo = StringField('Profile Photo', validators=[validate_image_url])
    # profile_photo = StringField('Profile Photo')







    # class SignUpForm(FlaskForm):
    # first_name = StringField('first_name', validators=[DataRequired()])
    # last_name = StringField('last_name', validators=[DataRequired()])
    # username = StringField('username', validators=[DataRequired(), username_exists])
    # email = StringField('email', validators=[DataRequired(), user_exists, valid_email])
    # password = StringField('password', validators=[DataRequired()])
    # profile_photo = StringField('Profile Photo')
