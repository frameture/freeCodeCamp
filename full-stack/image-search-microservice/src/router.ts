import * as cp from 'child_process';
import * as express from 'express';
import * as https from 'https';
import { Model } from './model';
import { view } from './view';

export let router = express.Router();

router.get('/search/:term', (req, res) => {
  let body = '';
  let term = req.params.term;
  const offset = req.query.offset;
  if (!term) { return res.json({ error: 'No term provided' }); }
  if (offset) { term += `&start=${ offset * 10 }` }

  https.get(process.env.GSE_URL + term, (result: any) => {
    result.setEncoding('utf8');
    result.on('data', (data) => { body += data; });
    result.on('end', () => {
      const json = JSON.parse(body);
      const mapped = json.items.map((e => {
        return { snippet: e.snippet, image: e.link, url: e.image.contextLink };
      }))
      res.json(mapped);
    });
  });

  const entry = new Model({ term, when: new Date() });
  entry.save(console.error);
});

router.get('/recent', (req, res) => {
  Model.find((err, docs) => {
    if (err) { return console.error(err); }
    res.json(docs);
  })
});

router.get('/', (req, res) => {
  res.send(view);
});
