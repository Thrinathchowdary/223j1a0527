const express = require('express');
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');
const logger = require('./logger');
const db = require('./database');

const app = express();
app.use(express.json());
app.use(logger);

function generateShortCode() {
  return uuidv4().slice(0, 6);
}

app.post('/shorturls', (req, res) => {
  const { url, validity = 30, shortcode } = req.body;
  if (!url) return res.status(400).json({ error: "URL is required" });

  let code = shortcode || generateShortCode();
  if (db[code]) return res.status(400).json({ error: "Shortcode already exists" });

  const now = moment();
  const expiry = now.clone().add(validity, 'minutes');

  db[code] = {
    url,
    createdAt: now.toISOString(),
    expiry: expiry.toISOString(),
    clicks: []
  };

  res.status(201).json({
    shortLink: `http://localhost:3000/${code}`,
    expiry: expiry.toISOString()
  });
});

app.get('/shorturls/:code', (req, res) => {
  const code = req.params.code;
  const record = db[code];
  if (!record) return res.status(404).json({ error: "Shortcode not found" });

  res.json({
    url: record.url,
    createdAt: record.createdAt,
    expiry: record.expiry,
    totalClicks: record.clicks.length,
    clicks: record.clicks
  });
});

app.get('/:code', (req, res) => {
  const code = req.params.code;
  const record = db[code];
  if (!record) return res.status(404).json({ error: "Shortcode not found" });

  const now = moment();
  if (now.isAfter(moment(record.expiry))) {
    return res.status(410).json({ error: "Link has expired" });
  }

  record.clicks.push({
    time: now.toISOString(),
    referrer: req.get('Referrer') || 'direct',
    location: 'Unknown'
  });

  res.redirect(record.url);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
