from .db import db, environment, SCHEMA, add_prefix_for_prod


class Transaction(db.Model):
  __tablename__='transactions'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  sender_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'),  nullable=False)
  receiver_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'),  nullable=False)
  amount = db.Column(db.Integer, nullable=False)
  note = db.Column(db.String(280), nullable=False)
  isRequest = db.Column(db.Boolean, default=False)
  isPending = db.Column(db.Boolean, default=True)

  # sender = db.relationship('User', foreign_keys=[sender_id], back_populates='transactions_sent')
  # reciever = db.relationship('User', foreign_keys=[receiver_id], back_populates='transactions_recieved')



def to_dict(self):
  return{
    "id": self.id,
    "sender_id": self.sender_id,
    "reciever_id": self.receiver_id,
    "amount": self.amount,
    "note": self.note,
    "isRequest": self.isRequest,
    "isPending": self.isPending
  }
