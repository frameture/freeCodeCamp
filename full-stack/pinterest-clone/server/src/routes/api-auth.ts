import { Router } from 'express';

import { User } from '../models/user';

export const apiAuthRouter = Router();


apiAuthRouter.post('/sign-up', (req, res, next) => {
  const data = req.body.data;

  User.findOne({ username: data.username }, (err, doc) => {
    if (err) { return next(err); }
    if (doc) { return next({ message: 'Username taken' }); }

    new User({
      username: data.username,
      password: data.password
    }).save((err, doc: any) => {
      if (err) { return next(err); }
      res.json(doc.getProfile());
    });
  });
});

apiAuthRouter.post('/login', (req, res, next) => {
  const data = req.body.data;

  User.findOne({ username: data.username }, (err, doc: any) => {
    if (err) { return next(err); }
    if (!doc) { return next({ message: 'No such user' }); }

    doc.checkPassword(data.password, (err, isMatch) => {
      if (!isMatch) return next({ message: 'Wrong password' });
      res.json(doc.getProfile());
    });
  })
});
