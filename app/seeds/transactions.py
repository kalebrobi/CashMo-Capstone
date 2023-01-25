from app.models import db, Transaction,  environment, SCHEMA


def seed_transactions():
  transaction1 = Transaction(
    sender_id=1,
    receiver_id=2,
    amount=50,
    note = "for dinner",
    isRequest = False,
    isPending = True
  )

  transaction2 = Transaction(
    amount=1200,
    sender_id=2,
    receiver_id=3,
    note= "its the first of the month...",
    isRequest = False,
    isPending = True
  )

  transaction3 = Transaction(
    amount=20,
    sender_id=3,
    receiver_id=1,
    note= "Starbucks",
    isRequest = False,
    isPending = True
  )


  db.session.add(transaction1)
  db.session.add(transaction2)
  db.session.add(transaction3)
  db.session.commit()



def undo_transactions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.transactions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM transactions")

    db.session.commit()
