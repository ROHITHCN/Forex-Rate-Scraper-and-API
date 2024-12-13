const db = require('./db');

const addCurrencyPair = async (currencyPair) => {
  try {
    const query = 'INSERT INTO currency_pairs (currencyPair) VALUES (?)';
    const [results] = await db.execute(query, [currencyPair]);
    return results;
  } catch (err) {
    console.error('Error adding currency pair:', err.message);
    throw err;
  }
};

const getCurrencyPairId = async (currencyPair) => {
  try {
    const query = 'SELECT id FROM currency_pairs WHERE currencyPair = ?';
    const [results] = await db.execute(query, [currencyPair]);
    return results[0];
  } catch (err) {
    console.error('Error fetching currency pair ID:', err.message);
    throw err;
  }
};

const getAllCurrencyPairs = async () => {
  try {
    const query = 'SELECT * FROM currency_pairs';
    const [results] = await db.execute(query);
    return results;
  } catch (err) {
    console.error('Error fetching all currency pairs:', err.message);
    throw err;
  }
};

module.exports = {
  addCurrencyPair,
  getCurrencyPairId,
  getAllCurrencyPairs
};
