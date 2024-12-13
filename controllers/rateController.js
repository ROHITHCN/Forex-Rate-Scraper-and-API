const rateModel = require('../models/rateModel');
const currencyPairModel = require('../models/currencyPairModel');

const getAverageRate = async (req, res) => {
  try {
    const { currencyPair, startDate, endDate } = req.query;
    const pair = await currencyPairModel.getCurrencyPairId(currencyPair);
    if (!pair) return res.status(404).json({ error: 'Currency pair not found' });

    const result = await rateModel.getRatesByDateRange(pair.id, startDate, endDate);
    res.json(result);
  } catch (err) {
    console.error('Error fetching average rate:', err.message);
    res.status(500).json({ error: err.message });
  }
};

const getClosingRate = async (req, res) => {
  try {
    const { currencyPair, date } = req.query;
    const pair = await currencyPairModel.getCurrencyPairId(currencyPair);
    if (!pair) return res.status(404).json({ error: 'Currency pair not found' });

    const result = await rateModel.getClosingRate(pair.id, date);
    res.json(result);
  } catch (err) {
    console.error('Error fetching closing rate:', err.message);
    res.status(500).json({ error: err.message });
  }
};

const addCurrencyPair = async (req, res) => {
  try {
    const { currencyPair } = req.body;
    const result = await currencyPairModel.addCurrencyPair(currencyPair);
    res.json({ message: 'Currency pair added successfully!'});
  } catch (err) {
    console.error('Error adding currency pair:', err.message);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAverageRate,
  getClosingRate,
  addCurrencyPair
};
