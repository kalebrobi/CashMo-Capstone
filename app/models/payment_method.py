from .db import db, environment, SCHEMA, add_prefix_for_prod, CheckConstraint


class PaymentMethod(db.Model):
  __tablename__='payment_methods'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'),  nullable=False)
  cc_number = db.Column(db.String(16), nullable=False)
  sec_code = db.Column(db.String(3), nullable=False)
  card_nickname = db.Column(db.String(50), nullable=False)



  def to_dict(self):
    return{
      "id": self.id,
      "user_id": self.user_id,
      "cc_number": self.cc_number,
      "sec_code": self.sec_code,
      "card_nickname": self.card_nickname
    }
