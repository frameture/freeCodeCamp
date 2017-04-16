import * as express from 'express';
import { publicPath } from '../app';
import { Entry } from '../models/entry'
import { view } from '../public/view';

export const router = express.Router();

router.get('/shortcuts', (req, res) => {
  Entry.find((err, docs) => {
    if (err) { console.error(err) }
    res.json(docs[ 0 ] ? docs : { error: 'No entries' });
  });
});

router.get(/^\/(\d+)/, (req, res) => {
  const shortcut = parseInt(req.params[ 0 ], 10);
  Entry.findOne({ shortcut }, (err, doc: any) => {
    if (err) { return console.error(err); }
    if (!doc) { return res.json({ error: 'No such shortcut.' }); }
    res.redirect(doc.url);
  });
});

router.get('/new/*', (req, res) => {
  const url = req.url.substring(5);
  if (!url) { return res.json({ error: 'No URL provided.' }); }

  const regExp = /https?:\/\/(www\.)?(\d|\w)+\.(\w)+(:\d+)?/;
  if (!regExp.test(url)) {
    return res.json({ error: 'Provided URL of wrong format.' });
  }

  const baseUrl = 'https://shortened-url-microservice.herokuapp.com/'
  const shortcut = setShortcut();
  const newEntry = new Entry({ url, shortcut });
  newEntry.save((err, doc: any) => {
    if (err) { return console.error(err) }
    res.json({
      'original_url': baseUrl + doc.url,
      'shortcut_url': baseUrl + doc.shortcut
    });
  });
});

router.get('/', (req, res) => {
  res.send(view);
});

function setShortcut() {
  let doc;
  let shortcut;
  while (true) {
    shortcut = Math.floor(Math.random() * 10000);
    Entry.findOne({ shortcut }, (err, tempDoc) => {
      if (err) { return console.error(err) }
      doc = tempDoc;
    });
    if (!doc) { break; } // Unique shortcut.
  }
  return shortcut;
}
