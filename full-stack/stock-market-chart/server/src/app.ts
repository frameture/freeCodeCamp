import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as logger from 'morgan'
import * as mongoose from 'mongoose';
import * as path from 'path';
import * as socketIO from 'socket.io';
import * as http from 'http';

// TODO: 
import { DB_URI } from '../.env';
import { apiRouter } from './routes/api';
import { indexRouter } from './routes/index';

export const publicPath = path.resolve(__dirname, 'public');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('new connection');
  
  socket.on('disconnect', () => {
    console.log('disconnection' + socket.id);
  });

  socket.on('add', stock =>  socket.broadcast.emit('add', stock));
  socket.on('remove', stock =>  socket.broadcast.emit('remove', stock));
});

app.use(express.static(publicPath));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(apiRouter);
app.use(indexRouter);

mongoose.connect(DB_URI, () => console.log('Connected to the DB'));
server.listen(process.env.PORT || 8181, () => console.log('Started'));
