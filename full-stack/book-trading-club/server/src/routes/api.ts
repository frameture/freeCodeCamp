import { Router } from 'express';

import { Book } from '../models/book';
import { User } from '../models/user';

export const api = Router();

api.post('/add-book', (req, res, next) => {
  const data = req.body.data;

  new Book({
    name: data.name,
    owner: data.owner
  }).save((err, newBook) => {
    if (err) { return next(err); }

    User.findOne({ username: data.owner }, (err, doc: any) => {
      if (err) { return next(err); }
      if (!doc) { return next(new Error('No such user')); }

      doc.books.push(newBook._id);
      doc.save((err) => {
        if (err) { return next(err); }
        res.end();
      })
    });
  })
});

// api.post('/user-update', (req, res, next) => {
//   const data = req.body.data;

//   User.findByIdAndUpdate(data._id, data, (err, doc: any) => {
//     if (err) { return next(err); }
//     res.json(doc.getProfile());
//   });
// });

api.get('/user/:id', (req, res, next) => {
  const id = req.params.id;

  User.findById(id, (err, doc: any) => {
    if (err) { return next(err); }
    if (!doc) { return next(new Error('No such user')); }
    
    res.json(doc.getProfile());
  });
});

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