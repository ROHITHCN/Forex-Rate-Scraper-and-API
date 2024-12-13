const express = require('express');
const rateRoutes = require('./routes/rateRoutes');
const schedule = require('node-schedule');
const scrapeRates = require('./scraper/scraper');

const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use('/api', rateRoutes);

// Schedule the scraping at 6:00 AM daily
schedule.scheduleJob('0 6 * * *', scrapeRates);

app.listen(port, () => {
  console.log(`API server running at http://localhost:${port}`);
});
