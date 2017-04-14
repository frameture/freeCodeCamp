import * as express from 'express';
import * as logger from 'morgan';
import * as helmet from 'helmet';
import * as cors from 'cors';

let app = express();
app.use(logger('dev'));
app.use(cors());

app.get('/:date', requestHandler);
app.listen(process.env.PORT || 8080);

function requestHandler(req: express.Request, res): void {
  let param = req.params[ 'date' ];
  if (!param) {
    return res.json({ 'unix': null, 'natural': null });
  }

  let date;
  if (!isNaN(+param)) {
    date = new Date(+param);
  } else {
    date = new Date(param);
  }

  res.json({ 'unix': date.valueOf(), 'natural': date.toDateString() });
}
