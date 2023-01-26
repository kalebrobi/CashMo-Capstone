from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError, Regexp
from flask_login import current_user
from app.models import User, PaymentMethod
import re

def cc_length(form, field):
  if len(field.data) != 16:
    raise ValidationError('Credit Card Number must be 16 digits.')

def sec_code_length(form, field):
  if len(field.data) != 3:
    raise ValidationError('Security Code must be 3 digits.')

def cc_number_validator(form, field):
  if not bool(re.match("^[0-9]*$", field.data)):
    raise ValidationError('Credit Card Number must be a number')

def sec_code_validator(form, field):
  if not bool(re.match("^[0-9]*$", field.data)):
    raise ValidationError('Security code must be a number')

def cc_exists(form, field):
  cc_number = field.data
  payment_method = PaymentMethod.query.filter(PaymentMethod.cc_number == cc_number, PaymentMethod.user_id == current_user.id).first()
  if payment_method:
    raise ValidationError('Credit Card Number is already in use.')



class PaymentMethodForm(FlaskForm):
  user_id = IntegerField('User Id', validators=[DataRequired()])
  cc_number = StringField('Credit Card Number', validators=[DataRequired(),cc_exists, cc_length,cc_number_validator])
  sec_code = StringField('Security Code', validators=[DataRequired(), sec_code_length,sec_code_validator])
  card_nickname = StringField('Card Nickname', validators=[DataRequired()])
