from .db import db, environment, SCHEMA, add_prefix_for_prod


likes = db.Table(
  'likes',
  db.Model.metadata,
  db.Column('users', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
  db.Column('transactions', db.Integer, db.ForeignKey(add_prefix_for_prod('transactions.id')), primary_key=True),
)

if environment == 'production':
  likes.schema = SCHEMA
