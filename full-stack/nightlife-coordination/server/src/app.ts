import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as path from 'path';
import * as logger from 'morgan';
import * as mongoose from 'mongoose';

import { DB_URI } from '../.env';
import { router } from './routes/routes';

export const publicPath = path.resolve(__dirname, 'public');

const app = express(); 

// TODO: remove cors in production
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.static(publicPath));
app.use(router);

mongoose.connect(DB_URI, () => console.log('Connected to DB'));
app.listen(process.env.PORT || 8080, () => console.log('Started'));
