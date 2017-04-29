import { Router } from 'express';
import * as path from 'path';

import { publicPath } from '../app';

export const index = Router();

index.get('/', (req, res) => {
  res.sendFile(path.resolve(publicPath, 'index.html'));
});

index.get('/*', (req, res) => {
  res.sendFile(path.resolve(publicPath, 'index.html'));
});