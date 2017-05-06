import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as logger from 'morgan';
import * as path from 'path';

import { DB_URI } from './env'; // TODO
import { apiRouter } from './routes/api';
import { indexRouter } from './routes/index';

export const publicPath = path.resolve(__dirname, 'public');

const app = express();

app.use(cors()); // TODO
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', apiRouter);
app.use(indexRouter);

// app.connect(process.env.DB_URI || DB_URI, () => console.log('DB-ected'));
app.listen(process.env.PORT || 8080, () => console.log('Started'));
