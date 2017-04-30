import * as bcrypt from 'bcrypt-nodejs';
import * as mongoose from 'mongoose';
import { Document, Model, Schema } from 'mongoose';

export let User: Model<Document>;

const schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: String,
  lastName: String,
  city: String,
  state: String,
  books: [ String ],
  incomingRequests: [ String ],
  outgoingRequests: [ String ]
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

User = mongoose.model('User', schema, 'users');
