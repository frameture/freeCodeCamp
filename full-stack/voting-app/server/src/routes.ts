import * as express from 'express';
import { UserModel } from './models/user';
import { PollModel } from './models/poll';

export const router = express.Router();

router.post('/server/remove', (req, res) => {
  const id = req.body.data.id;
  
  PollModel.findByIdAndRemove(id, (err) => {
    if (err) { return console.error(err); }
    res.json({ success: true });
  });
});

router.post('/server/vote', (req, res) => {
  const data = req.body.data;
  const ip = req.ip;
  
  PollModel.findById(data.id, (err, doc: any) => {
    if (err) { return console.error(err); }
    if (!doc) { return res.json({ message: 'This poll has been deleted.' }); }
    if (!doc.addVote(data, ip)) {
      return res.json({ message: 'You have already voted in this poll.' });
    }
    res.json({ success: true });
  });
});

router.get('/server/poll/:id', (req, res) => {
  const id = req.params.id;
  PollModel.findById(id, (err, doc) => {
    if (err) { return console.error(err); }
    if (!doc) { return res.json({ message: 'This poll has been deleted.' }); }
    res.json(doc);
  });
});

router.get('/server/polls/:username', (req, res) => {
  const username = req.params.username;
  PollModel.find({ username }, (err, docs) => {
    if (err) { return console.error(err); }
    res.json(docs);
  });
});

router.get('/server/polls', (req, res) => {
  PollModel.find((err, docs) => {
    if (err) { return console.error(err); }
    res.json(docs);
  });

});

router.post('/server/add-poll', (req, res) => {
  const data = req.body.data;

  PollModel.findOne({
    username: data.username,
    name: data.poll.name
  }, (err, doc) => {
    if (err) { return console.error(err); }
    if (doc) {
      return res
        .json({ message: 'You already have a poll with this name.' });
    }

    new PollModel({
      username: data.username,
      name: data.poll.name,
      options: data.poll.options
    }).save((err) => {
      if (err) { return console.error(err); }
      res.json({ success: true });
    });
  })
})

router.post('/server/login', (req, res) => {
  const data = req.body.data;

  UserModel.findOne({ username: data.username }, (err, doc: any) => {
    if (err) { return res.status(500).end(); }
    if (!doc) { return res.json({ message: 'No user with this username' }); }

    const isSame = doc.checkPassword(data.password);
    if (!isSame) { return res.json({ message: 'Wrong password' }); }

    res.json({ success: true });
  });
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
