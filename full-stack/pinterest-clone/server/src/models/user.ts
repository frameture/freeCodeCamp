import * as bcrypt from 'bcrypt-nodejs';
import * as mongoose from 'mongoose';
import { Document, Model, Schema } from 'mongoose';

export let User: Model<Document>;

const schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  wins: [ { link: String, userId: String, likes: [ String ], title: String }]
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

schema.methods.removeWin = function (winId: string, next) {
  for (let i = 0; i < this.wins.length; i++) {
    if (this.wins[ i ]._id == winId) {
      this.wins.splice(i, 1);
      break;
    }
  }

  this.save((err, doc) => {
    if (err) { return next(err); }
    next(null, doc);
  });
}

schema.methods.addWin = function (title: string, link: string, next) {
  const win = { title, link, userId: this._id, likes: [] };
  this.wins.push(win);
  this.save((err, doc) => {
    if (err) { return next(err); }
    next(null, doc);
  });
}

schema.methods.likeWin = function (winId: string, winOwner: string, next) {
  User.findById(winOwner, (err, doc: any) => {
    if (err) { return next(err); }
    doc.addLikerToWins(winId, this.username, next);
  });
}

schema.methods.unlikeWin = function (winId: string, winOwner: string, next) {
  User.findById(winOwner, (err, doc: any) => {
    if (err) { return next(err); }
    doc.removeLikerFromWins(winId, this.username, next);
  });
}

schema.methods.addLikerToWins = function (winId: string, liker: string, next) {
  let win;
  for (let i = 0; i < this.wins.length; i++) {
    win = this.wins[ i ];
    if (win._id == winId) {
      win.likes.push(liker);
      break;
    }
  }

  this.save((err, doc) => {
    if (err) { return next(err); }
    next(null, win);
  });
}

schema.methods.removeLikerFromWins = function (winId: string, unliker: string, next) {
  let win;
  for (let i = 0; i < this.wins.length; i++) {
    win = this.wins[ i ];
    if (win._id == winId) {
      win.likes.splice(win.likes.indexOf(unliker), 1);
      break;
    }
  }

  this.save((err, doc) => {
    if (err) { return next(err); }
    next(null, win);
  });
}

User = mongoose.model('User', schema, 'users');
