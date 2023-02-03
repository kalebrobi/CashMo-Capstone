from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField, TextAreaField, BooleanField, HiddenField, FloatField
from wtforms.validators import DataRequired, NumberRange, ValidationError


def validate_amount(form, field):
  if field.data < 1:
    raise ValidationError('Amount must be at least $1.')




class TransactionForm(FlaskForm):
  amount = FloatField('Amount', validators=[DataRequired(message='Amount is required'), validate_amount])
  sender_id = IntegerField('sender_id', validators=[DataRequired()])
  receiver_id = IntegerField('receiver_id', validators=[DataRequired(message="Please select a user")])
  note = TextAreaField('Note', validators=[DataRequired(message="Please include a note")])
  isRequest = BooleanField('Request')
  isPending = BooleanField('Pending')
