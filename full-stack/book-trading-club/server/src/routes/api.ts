import { Router } from 'express';

import { Book } from '../models/book';
import { User } from '../models/user';

export const api = Router();

api.get('/book/:id', (req, res, next) => {
  const id = req.params.id;
  
  Book.findById(id, (err, doc) => {
    if (err) { return next(err); }
    res.json(doc);
  });
});

api.get('/books', (req, res, next) => {
  Book.find((err, docs) => {
    if (err) { return next(err); }
    res.json(docs);
  });
});

api.post('/accept-request', (req, res, next) => {
  const data = req.body.data;
  
  User.findOne({ username: data.username }, (err, doc: any) => {
    if (err) { return next(err); }
    doc.acceptRequest(data.reqId, (err, doc) => {
      if (err) { return next(err); }
      res.json(doc.getProfile());
    });
  });
});

api.post('/add-request', (req, res, next) => {
  const data = req.body.data;
  
  User.findOne({ username: data.username }, (err, doc: any) => {
    if (err) { return next(err); }
    if (!doc) { return next({ message: 'No such user' }); }
    
    doc.addRequest(data.bookId, (err, doc: any) => {
      if (err) { return next(err); }
      res.json(doc.getProfile());
    });
  });
});

api.post('/remove-book', (req, res, next) => {
  const data = req.body.data;

  User.findOne({ username: data.username }, (err, doc: any) => {
    if (err) { return next(err); }
    if (!doc) { return next({ message: 'No such user' }); }
    
    doc.removeBook(data.bookId, (err, doc: any) => {
      if (err) { return next(err); }
      res.json(doc.getProfile());
    });
  });
});

api.post('/add-book', (req, res, next) => {
  const data = req.body.data;

  new Book({
    name: data.name,
    owner: data.owner
  }).save((err, newBook) => {
    if (err) { return next(err); }

    User.findOne({ username: data.owner }, (err, doc: any) => {
      if (err) { return next(err); }
      if (!doc) { next({ message: 'No such user' }); }

      doc.books.push(newBook._id);
      doc.save((err, doc: any) => {
        if (err) { return next(err); }
        res.json(doc.getProfile());
      })
    });
  })
});

api.post('/update-profile', (req, res, next) => {
  const data = req.body.data;

  User.findByIdAndUpdate(data._id, data, (err, doc: any) => {
    if (err) { return next(err); }
    if (!doc) { return next({ message: 'No such user' }); }

    User.findById(doc._id, (err, doc: any) => {
      if (err) { return next(err); }
      res.json(doc.getProfile());
    });
  });
});

api.get('/user/:id', (req, res, next) => {
  const id = req.params.id;

  User.findById(id, (err, doc: any) => {
    if (err) { return next(err); }
    if (!doc) { return next({ message: 'No such user' }); }

    res.json(doc.getProfile());
  });
});

api.post('/login', (req, res, next) => {
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

api.post('/sign-up', (req, res, next) => {
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