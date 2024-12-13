const db = require('./db');

const getRatesByDateRange = async (currencyPairId, startDate, endDate) => {
  try {
    const query = `
      SELECT AVG(rate) AS averageRate FROM rates
      WHERE currencyPairId = ? AND date BETWEEN ? AND ?
    `;
    const [results] = await db.execute(query, [currencyPairId, startDate, endDate]);
    return results[0];
  } catch (err) {
    console.error('Error fetching rates by date range:', err.message);
    throw err;
  }
};

const getClosingRate = async (currencyPairId, date) => {
  try {
    const query = `
      SELECT rate AS closingRate FROM rates
      WHERE currencyPairId = ? AND date = ?
      ORDER BY id DESC LIMIT 1
    `;
    const [results] = await db.execute(query, [currencyPairId, date]);
    return results[0];
  } catch (err) {
    console.error('Error fetching closing rate:', err.message);
    throw err;
  }
};

const addRate = async (currencyPairId, rate, date) => {
  try {
    const query = `
      INSERT INTO rates (currencyPairId, rate, date) VALUES (?, ?, ?)
    `;
    const [results] = await db.execute(query, [currencyPairId, rate, date]);
    console.log('Rate inserted:', results);
    return results;
  } catch (err) {
    console.error('Error inserting rate:', err.message);
    throw err;
  }
};

module.exports = {
  getRatesByDateRange,
  getClosingRate,
  addRate
};
