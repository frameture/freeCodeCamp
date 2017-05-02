import * as bcrypt from 'bcrypt-nodejs';
import * as mongoose from 'mongoose';
import { Document, Model, Schema } from 'mongoose';

import { Book } from '../models/book';

export let User: Model<Document>;

const schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: String,
  lastName: String,
  city: String,
  state: String,
  books: [ String ],
  incomingRequests: [ { book: String, from: String, to: String, accepted: Boolean }],
  outgoingRequests: [ { book: String, from: String, to: String, accepted: Boolean }]
});

schema.pre('save', function (done) {
  const user = this;
  const empty = () => { };

  if (!user.isModified('password')) { return done(); }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return done(err); }
    bcrypt.hash(user.password, salt, empty, function (err, hashed) {
      if (err) { return done(err); }
      user.password = hashed;
      done();
    });
  });
});

schema.methods.checkPassword = function (guess, next) {
  bcrypt.compare(guess, this.password, (err, isMatch) => {
    next(err, isMatch);
  });
}

schema.methods.getProfile = function () {
  const user = this._doc;
  const profile = {};

  for (let prop in user) {
    if (prop !== 'password') {
      profile[ prop ] = user[ prop ];
    }
  }
  return profile;
}

schema.methods.removeBook = function (bookId, next) {
  this.books.splice(this.books.indexOf(bookId), 1);

  this.save((err, doc) => {
    if (err) { return next(err); }
    Book.findByIdAndRemove(bookId, (err, removedBook) => {
      if (err) { return next(err); }
      next(null, doc);
    });
  });
}

schema.methods.acceptRequest = function (reqId: string, next) {
  let currentRequest;
  for (let i = 0; i < this.incomingRequests.length; i++) {
    const req = this.incomingRequests[ i ];
    if (req._id == reqId) {
      currentRequest = req;
      this.incomingRequests[ i ].accepted = true;
      break;
    }
  }

  User.findOne({ username: currentRequest.from }, (err, doc: any) => {
    if (err) { return next(err); }
    if (!doc) { return next({ message: 'No such user' }); }
    for (let i = 0; i < doc.outgoingRequests.length; i++) {
      const req = doc.outgoingRequests[ i ];
      if (req.book == currentRequest.book && req.to == this.username) {
        doc.outgoingRequests[ i ].accepted = true;
        break;
      }
    }
    doc.save();

    this.save((err, doc) => {
      if (err) { return next(err); }
      next(null, doc);
    });
  });
}

schema.methods.addRequest = function (id, next) {
  Book.findById(id, (err, book: any) => {
    if (err) { return next(err); }
    const owner = book.owner;
    User.findOne({ username: owner }, (err, doc: any) => {
      if (err) { return next(err); }
      const request =
        { book: book.name, from: this.username, to: doc.username, accepted: false };
      doc.incomingRequests.push(request);
      doc.save((err, doc) => {
        if (err) { return next(err); }
        this.outgoingRequests.push(request);
        this.save((err, doc) => {
          if (err) { return next(err); }
          next(null, doc);
        });
      })
    });
  });
}

User = mongoose.model('User', schema, 'users');
