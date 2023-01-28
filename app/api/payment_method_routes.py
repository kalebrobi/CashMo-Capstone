from flask import Blueprint, jsonify, request
from flask_login import login_required , current_user
from app.models import User, PaymentMethod, db
from ..forms.payment_method_form import PaymentMethodForm



pmt_method_routes = Blueprint('paymentmethod', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages




# get all cards that belong to a user
@pmt_method_routes.route('/')
@login_required
def all_pmt_methods():


  cards = PaymentMethod.query.filter_by(user_id=current_user.id).all()

  return {'cards' :[card.to_dict() for card in cards]}, 200



@pmt_method_routes.route('/add', methods=['POST'])
@login_required
def new_card():
  form = PaymentMethodForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():

    card = PaymentMethod()
    form.populate_obj(card)


    db.session.add(card)
    db.session.commit()
    return card.to_dict(), 200


  return {'errors': validation_errors_to_error_messages(form.errors)}, 401


#delete comment
@pmt_method_routes.route('/<int:payment_method_id>', methods=['DELETE'])
@login_required
def delete_card(payment_method_id):

    print("CHECKING IF ROUTE ENTERED", payment_method_id)
    payment_method = PaymentMethod.query.get(payment_method_id)

    print("METHOD TO BE DELETED", payment_method)

    db.session.delete(payment_method)
    db.session.commit()

    return {"message": 'successfully deleted'}
