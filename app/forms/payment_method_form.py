from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import User




class PaymentMethodForm(FlaskForm):
  cc_number = StringField('Credit Card Number', validators=[DataRequired()])
  sec_number = StringField('Security Code', validators=[DataRequired()])
  card_nickname = StringField('Card Nickname', validators=[DataRequired()])
