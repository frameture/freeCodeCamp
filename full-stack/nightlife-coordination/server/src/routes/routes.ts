import { Router } from 'express';

import { User } from '../models/user';
import { Venue } from '../models/venue';
import { yelpClient } from '../yelp/client';
import { publicPath } from '../app';

export const router = Router();

router.post('/api/set-venue', (req, res) => {
  const data = req.body.data;

  User.findOne({ clientId: data.clientId }, (err, doc: any) => {
    if (err) { return console.error(err); }
    if (!doc) { return res.json({ message: 'No user with this ID' }); }

    Venue.findOne({ venueId: data.venueId }, (err, doc: any) => {
      if (err) { return console.error(err); }
      if (!doc) {
        new Venue({
          venueId: data.venueId,
          going: [ data.clientId ]
        }).save();
        return res.json({ success: true, message: 'New venue saved' });
      }

      const index = doc.going.indexOf(data.clientId);
      if (index >= 0) {
        doc.going = doc.going.splice(index);
        doc.save();
        return res.json({ success: true, message: 'un-go' });
      }
      doc.going.push(data.clientId);
      doc.save();
      res.json({ success: true, message: 'go' });
    });
  });
});

router.post('/api/profile', (req, res) => {
  const clientId = req.body.data.clientId;

  User.findOne({ clientId }, (err, doc: any) => {
    if (err) { return console.error(err); }
    if (doc) { return res.json({ message: 'User already exists with this ID.' }); }

    new User({ clientId }).save((err) => {
      if (err) { return console.error(err); }
      res.json({ success: true });
    });
  });
})

router.get('/api/:profile', (req, res) => {
  const clientId = req.params.profile;

  User.findOne({ clientId }, (err, doc: any) => {
    if (err) { return console.error(err); }
    if (!doc) { return res.json({ message: 'No such user.' }); }

    res.json(doc);
  });
});

router.get('/api/bars/:location', (req, res) => {
  const searchRequest = {
    location: req.params.location
  };

  yelpClient.search(searchRequest)
    .then((data) => {
      const venues = data.jsonBody.businesses

      Venue.find((err, docs: any) => {
        const going = [];
        for (let i = 0; i < docs.length; i++) {
          const doc = docs[ i ];
          for (let j = 0; j < venues.length; j++) {
            const venue = venues[ j ];
            if (doc.venueId === venue.id) {
              going.push(doc);
            }
          }
        }

        res.json({ venues, going });
      });
    })
    .catch(e => console.error(e));
});

router.get('/*', (req, res) => {
  res.sendFile(publicPath + '/index.html');
});
