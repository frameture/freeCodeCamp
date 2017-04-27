import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as logger from 'morgan'
import * as socket from 'socket.io';
import * as http from 'http';

import { apiRouter } from './routes/api';

const app = express();
const server = http.createServer(app);
const io = socket.listen(server);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(logger('dev'));
app.use(apiRouter);

app.listen(8080, () => console.log('Started'));
