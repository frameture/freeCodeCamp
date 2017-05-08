import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as logger from 'morgan';
import * as path from 'path';

import { DB_URI } from './env';
import { apiUserRouter } from './routes/api-user';
import { apiAuthRouter } from './routes/api-auth';
import { indexRouter } from './routes/index';
import { errorHandler } from './error-handler';

export const publicPath = path.resolve(__dirname, 'public');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(publicPath));
app.use('/api', apiUserRouter);
app.use('/api', apiAuthRouter);
app.use(indexRouter);
app.use(errorHandler);

mongoose.connect(process.env.DB_URI || DB_URI, () => console.log('DB-ected'));
app.listen(process.env.PORT || 8080, () => console.log('Started'));
