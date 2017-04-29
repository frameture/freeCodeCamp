import { Router } from 'express';
import * as http from 'http';

import { STOCK_DATA_KEY } from '../../.env';
import { Stock } from '../models/stock';

export const apiRouter = Router();

apiRouter.get('/api/stock-remove/:name', (req, res) => {
  const name = req.params.name;

  Stock.findOneAndRemove({ name }, (err) => {
    if (err) { return console.error(err); }
    res.json({ success: true });
  });
});

apiRouter.get('/api/stock-add/:name', (req, res) => {
  const name = req.params.name;

  Stock.findOne({ name }, (err, doc) => {
    if (err) { return console.error(err); }
    if (doc) {
      return res.json({ message: 'Stock has been already added.' });
    }

    new Stock({ name }).save((err) => {
      if (err) { return console.error(err); }
      res.json({ success: true });
    });
  });
});

apiRouter.get('/api/stocks', (req, res) => {
  Stock.find((err, docs: any) => {
    if (err) { return console.error(err); }
    if (!docs || !docs.length) { return res.json({ message: 'No stocks added' }); }

    res.json(docs.map(d => d.name));
  });
});

apiRouter.get('/api/stock-data/:query', (req, res) => {
  const query = req.params.query;
  const url =
    `http://www.alphavantage.co/query?${ query }&apikey=${ STOCK_DATA_KEY }`;

  http.get(url, (response: any) => {
    response.setEncoding('utf8');

    let body = '';
    response.on('data', data => body += data);
    response.on('end', data => res.send(body + data));
  });
});