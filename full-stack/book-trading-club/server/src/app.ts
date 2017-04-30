import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as logger from 'morgan';
import * as path from 'path';

import { DB_URI } from './env';
import { api } from './routes/api';
import { index } from './routes/index';

export const publicPath = path.resolve(__dirname, 'public');

const app = express();

app.use(cors()) // TODO
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', api);
app.use(index);

app.use((err, req, res, next) => {
  if (err) {
    console.log('ERROR HANDLING MIDDLEWARE \n\n\n ', err);
    res.json(err);
  }
});

mongoose.connect(DB_URI, () => console.log('Connected to the DB'));
app.listen(process.env.PORT || 8080, () => console.log('Started on 8080:'));