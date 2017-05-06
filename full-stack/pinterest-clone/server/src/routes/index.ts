import { Router, Request, Response } from 'express';
import * as path from 'path';

import { publicPath } from '../app';

export const indexRouter = Router();

indexRouter.get('/', sendIndex);
indexRouter.get('/**', sendIndex);

function sendIndex(req: Request, res: Response) {
  res.sendFile(path.resolve(publicPath, 'index.html'));
}
