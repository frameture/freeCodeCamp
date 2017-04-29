import { Router } from 'express';

import { User } from '../models/user';

export const api = Router();

api.post('/sign-up', (req, res) => {
  const data = req.body.data;

  User.findOne({ username: data.username }, (err, doc) => {
    if (err) { return console.error(err); }
    if (doc) { return res.json({ message: 'Username taken' }); }

    new User({
      username: data.username,
      password: data.password
    }).save((err) => {
      if (err) { return console.error(err); }
      res.json({ success: true });
    });
  });
});