const axios = require('axios');
const cheerio = require('cheerio');
const rateModel = require('../models/rateModel');
const currencyPairModel = require('../models/currencyPairModel');

async function scrapeRates() {
  console.log('Scrape job started at:', new Date().toLocaleString());

  try {
    const pairs = await currencyPairModel.getAllCurrencyPairs();

    for (const pair of pairs) {
      const fromCurrency = pair.currencyPair.substring(0, 3);
      const toCurrency = pair.currencyPair.substring(3);
      const url = `https://www.x-rates.com/calculator/?from=${fromCurrency}&to=${toCurrency}&amount=1`;

      try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        // Use the provided CSS path to find the rate
        const rateElement = $('div.wrapper div.grid.clearfix div#content.grid__cell.main div.grid div.grid__cell div.col2.pull-right div.moduleContent.bottomMargin div.ccOutputBx span.ccOutputRslt');
        const rateText = rateElement.text().trim();
        const rate = parseFloat(rateText);

        if (!isNaN(rate)) {
          console.log(`Scraped Data: ${pair.currencyPair} - ${rate}`);
          await rateModel.addRate(pair.id, rate, new Date());
          console.log(`Rate stored: ${pair.currencyPair} - ${rate}`);
        } else {
          console.error(`Failed to scrape rate for ${pair.currencyPair}`);
        }

      } catch (error) {
        console.error(`Error scraping data for ${pair.currencyPair}:`, error.message);
      }
    }

    console.log('Data scraping process completed!');
  } catch (error) {
    console.error('Error in scrapeRates:', error.message);
  }
}

module.exports = scrapeRates;
