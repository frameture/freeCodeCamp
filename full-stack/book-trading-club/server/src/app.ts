import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as path from 'path';

import { DB_URI } from '../env';
import { api } from './routes/api';
import { index } from './routes/index';

export const publicPath = path.resolve(__dirname, 'public');

const app = express();

app.use(cors()) // TODO
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(api);
app.use(index);

mongoose.connect(DB_URI, () => console.log('Connected to the DB'));
app.listen(process.env.DB || 8080, () => console.log('Started on 8080:'));