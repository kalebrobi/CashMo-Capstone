from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField, TextAreaField, BooleanField, HiddenField
from wtforms.validators import DataRequired


class TransactionForm(FlaskForm):
  amount = IntegerField('Amount', validators=[DataRequired()])
  sender_id = IntegerField('sender_id', validators=[DataRequired()])
  receiver_id = IntegerField('receiver_id', validators=[DataRequired()])
  note = TextAreaField('Note', validators=[DataRequired()])
  # is_request = BooleanField('Request')
