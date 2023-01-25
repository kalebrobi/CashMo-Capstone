from app.models import db, PaymentMethod,  environment, SCHEMA


def seed_payment_methods():
  paymentMethod1 = PaymentMethod(
    user_id=1,
    cc_number='1234567890123456',
    sec_code='123',
    card_nickname="My Visa"
  )

  paymentMethod2 = PaymentMethod(
    user_id=2,
    cc_number='1111222233334444',
    sec_code='456',
    card_nickname="bofA"
  )

  paymentMethod3 = PaymentMethod(
    user_id=3,
    cc_number='5555666677778888',
    sec_code='789',
    card_nickname="my Amex"
  )


  db.session.add(paymentMethod1)
  db.session.add(paymentMethod2)
  db.session.add(paymentMethod3)
  db.session.commit()



def undo_payment_methods():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.payment_methods RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM payment_methods")

    db.session.commit()
