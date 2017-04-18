import * as express from 'express';
import { view } from './view';

export let router: express.Router;

router = express.Router();
router.get('/', (req, res) => {
  res.send(view);
});

router.get('/file-size/:size', (req, res) => {
  const size = req.params.size;
  res.json({ size });
});