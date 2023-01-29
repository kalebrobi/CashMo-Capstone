from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Transaction, db, User
from ..forms.transaction_form import TransactionForm



transaction_routes = Blueprint('transactions', __name__)



# def validation_errors_to_error_messages(validation_errors):
#     """
#     Simple function that turns the WTForms validation errors into a simple list
#     """
#     errorMessages = []
#     for field in validation_errors:
#         for error in validation_errors[field]:
#             errorMessages.append(f'{error}')
#     return errorMessages


#get all transactions
@transaction_routes.route('/<int:id>')
@login_required
def all_transactions(id):
  # current_user = User.query.get(id)



  # transactions = Transaction.query.all()
  print('----------Transactions4444---------')

  # user_id = request.args.get('user_id')
  transactions = db.session.query(Transaction).filter((Transaction.receiver_id == current_user.id) | (Transaction.sender_id == current_user.id)).all()
  return {'transactions' :[transaction.to_dict() for transaction in transactions]}, 200



#post a payment or req
@transaction_routes.route('/<int:id>', methods = ['POST'])
@login_required
def post_pay(id):
  form = TransactionForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    print("Hello--------", form.data)

    new_transaction = Transaction()
    form.populate_obj(new_transaction)

    db.session.add(new_transaction)
    db.session.commit()

    print("NEW TRANSAC",new_transaction)
    return new_transaction.to_dict(), 200

  if form.errors:
    return {
      "errors": form.errors
    }, 400
