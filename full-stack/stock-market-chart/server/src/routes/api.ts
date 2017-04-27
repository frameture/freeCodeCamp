import { Router } from 'express';
import * as http from 'http';

import { STOCK_DATA_KEY } from '../../.env';

export const apiRouter = Router();

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