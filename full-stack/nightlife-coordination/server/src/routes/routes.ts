import { Router } from 'express';

// import { publicPath } from '../app';

export const router = Router();

router.get('/*', (req, res) => {
  res.send('index');
});