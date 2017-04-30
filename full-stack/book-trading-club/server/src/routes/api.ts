import { Router } from 'express';

import { User } from '../models/user';

export const api = Router();

api.post('/login', (req, res, next) => {
  const data = req.body.data;

  User.findOne({ username: data.username }, (err, doc: any) => {
    if (err) { return next(err); }
    if (!doc) { return next(new Error('No such user')); }

    doc.checkPassword(data.password, (err, isMatch) => {
      if (!isMatch) next({ message: 'Wrong password' });
      res.end();
    });
  })
});

api.post('/sign-up', (req, res, next) => {
  const data = req.body.data;

  User.findOne({ username: data.username }, (err, doc) => {
    if (err) { return next(err); }
    if (doc) { return next({ message: 'Username taken' }); }

    new User({
      username: data.username,
      password: data.password
    }).save((err) => {
      if (err) { return next(err); }
      res.end();
    });
  });
});