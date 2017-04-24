import * as cors from 'cors';
import * as express from 'express';
import * as path from 'path';
import * as logger from 'morgan';

import { router } from './routes/routes';

export const publicPath = path.resolve(__dirname, 'public');

const app = express(); 

// TODO: remove cors
app.use(cors());
app.use(logger('dev'));
app.use(express.static(publicPath));
app.use(router);

app.listen(process.env.PORT || 8080, () => console.log('Started'));
