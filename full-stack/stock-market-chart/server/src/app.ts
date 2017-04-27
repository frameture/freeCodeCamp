import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as logger from 'morgan'
import * as mongoose from 'mongoose';
import * as socketIO from 'socket.io';
import * as http from 'http';

// TODO: 
import { DB_URI } from '../.env';
import { apiRouter } from './routes/api';

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('new connection');
});

io.on('message', (data) => {
  io.emit('message', data);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(cors());
app.use(logger('dev'));
app.use(apiRouter);

mongoose.connect(DB_URI, () => console.log('Connected to the DB'));
app.listen(8181, () => console.log('Started'));
