import * as express from 'express';
import { UserModel } from './model';

export const router = express.Router();

router.post('/server/login', (req, res) => {

});

router.post('/server/sign-up', (req, res) => {
  const data = req.body.data;

  UserModel.findOne({ username: data.username }, (err, doc) => {
    if (err) { return res.status(500).end(); }
    if (doc) {
      return res
        .status(400)
        .json({ message: 'Username is already taken.' });
    }

    const newUser = new UserModel({
      username: data.username,
      password: data.password
    })
    newUser.save((err, doc) => { if (err) { return res.status(500).end(); } });
    res.send('User registered.');
  });
});
