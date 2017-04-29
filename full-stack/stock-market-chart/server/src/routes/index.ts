import { Router } from 'express';

import { publicPath } from '../app';

export const indexRouter = Router();

indexRouter.get('/', (req, res) => {
  res.sendFile(publicPath + '/index.html');
});

indexRouter.get('/*', (req, res) => {
  res.sendFile(publicPath + '/index.html');
});