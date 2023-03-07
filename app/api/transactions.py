from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Transaction, db, User, likes
from ..forms.transaction_form import TransactionForm
from ..forms.like_form import LikeForm



transaction_routes = Blueprint('transactions', __name__)



def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(error)
    return errorMessages


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
    new_transaction = Transaction()
    form.populate_obj(new_transaction)



    db.session.add(new_transaction)
    db.session.commit()


    return new_transaction.to_dict(), 200

  # if form.errors:
  #   return {
  #     "errors": form.errors
  #   }, 400
  print(form.errors)
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401



@transaction_routes.route('/<int:id>', methods = ['PUT'])
@login_required
def update_pay(id):

  old_transactions = Transaction.query.get(id)
  form = TransactionForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  print("FORM1------", form)

  if form.validate_on_submit():

    form.populate_obj(old_transactions)
    print("FORM222------", form)



    db.session.add(old_transactions)
    db.session.commit()
    return old_transactions.to_dict(), 201


  # if form.errors:
  #   print('-----------FORM ERROR--------', form.errors)
  #   return {
  #     "errors": form.errors
  #   }, 400
  print(form.errors)
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@transaction_routes.route('/<int:id>', methods = ['DELETE'])
@login_required
def delete_pay(id):

  transaction = Transaction.query.get(id)


  db.session.delete(transaction)
  db.session.commit()


  return {"message": 'successfully deleted'}


# get all likes for a transaction by transaction-id

@transaction_routes.route('/<int:id>/likes')
def all_likes(id):
  all_likes = db.session.execute(db.select(likes)).fetchall()

  filtered = filter(lambda like: like[1] == id, all_likes)

  # turns filtered data to a dict
  dict_version = dict(filtered)

  #gets the values from that dict, view object only tho
  valuesI = dict_version.values()

  # turns the view object to a list then sums the length(which is total amount of likes)
  total_likes = len(list(valuesI))
  return {'likes': total_likes}, 200


@transaction_routes.route('/<int:id>/likes', methods=['POST'])
def post_like(id):
  form = LikeForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():

    user_id = form.users.data
    transaction_id = form.transactions.data

    selected_transaction = Transaction.query.get(transaction_id)
    selected_user = User.query.get(user_id)

    if selected_user in selected_transaction.transaction_likes:
      selected_transaction.transaction_likes.remove(selected_transaction)
      db.session.commit()
      return all_likes(id)

    else:
      selected_transaction.transaction_likes.append(selected_user)
      db.session.commit()
      return all_likes(id)
