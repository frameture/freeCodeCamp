import { Router } from 'express';

import { User } from '../models/user';

export const apiUserRouter = Router();

apiUserRouter.get('/wins', (req, res, next) => {
  User.find((err, docs: any[]) => {
    if (err) { return next(err); }
    res.json(docs
      .map(e => e.wins)
      .reduce((prev, curr) => prev.concat(curr)));
  });
});

apiUserRouter.post('/add-win', (req, res, next) => {
  const data = req.body.data;

  User.findOne({ username: data.username }, (err, doc: any) => {
    if (err) { return next(err); }
    if (!doc) { return next({ message: 'No such user' }); }
    doc.addWin(data.title, data.link, (err, doc) => {
      if (err) { return next(err); }
      res.json(doc.getProfile());
    });
  });
});

apiUserRouter.post('/remove-win', (req, res, next) => {
  const data = req.body.data;

  User.findOne({ username: data.username }, (err, doc: any) => {
    if (err) { return next(err); }
    if (!doc) { return next({ message: 'No such user' }); }
    doc.removeWin(data.winId, (err, doc) => {
      if (err) { return next(err); }
      res.json(doc.getProfile());
    });
  });
});

apiUserRouter.post('/like-unlike', (req, res, next) => {
  const data = req.body.data;

  User.findOne({ username: data.winOwner, winId: data.winId }, (err, doc: any) => {
    if (err) { return next(err); }

    if (data.like) {
      return doc.likeWin(data.winId, data.winOwner, (err, doc) => {
        if (err) { return next(err); }
        res.json(doc.getProfile());
      });
    }
    doc.unlikeWin(data.winId, data.winOwner, (err, doc) => {
      if (err) { return next(err); }
      res.json(doc.getProfile());
    });
  });
});
