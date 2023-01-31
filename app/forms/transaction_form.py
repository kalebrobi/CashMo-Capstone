from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField, TextAreaField, BooleanField, HiddenField
from wtforms.validators import DataRequired


class TransactionForm(FlaskForm):
  amount = IntegerField('Amount', validators=[DataRequired(message='Amount is required')])
  sender_id = IntegerField('sender_id', validators=[DataRequired()])
  receiver_id = IntegerField('receiver_id', validators=[DataRequired(message="UserInfo is required")])
  note = TextAreaField('Note', validators=[DataRequired(message="Please include a note")])
  isRequest = BooleanField('Request')
  isPending = BooleanField('Pending')
