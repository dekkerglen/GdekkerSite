/* eslint-disable no-await-in-loop */
const seedrandom = require('seedrandom');
const fetch = require('node-fetch');

const indexToOracleMap = require('./indexToOracleMap.json');

const allOracles = Object.values(indexToOracleMap);

const shuffle = (array) => {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const nDistinctRandom = (array, n) => {
  const copy = shuffle(array);
  return copy.slice(0, n);
};

const theseCardsAreDistinct = (list) => {
  const seen = new Set();
  for (const card of list) {
    if (seen.has(card)) {
      return false;
    }
    seen.add(card);
  }
  return true;
};

const newConnections = async (seed) => {
  seedrandom(seed, { global: true });

  let result = [];

  do {
    // select 100 cards, we will pick the 4 most played cards that do not have overlapping synergies
    const pool = shuffle(nDistinctRandom(allOracles, 200));

    const detailedCards = await Promise.all(
      pool.map(async (card) => {
        try {
          const cobraresult = await fetch(`https://cubecobra.com/tool/cardjson/${card}`);
          return cobraresult.json();
        } catch (e) {
          return null;
        }
      }),
    );

    // sort by most played, filter out cards with no history
    detailedCards
      .filter(
        (details) =>
          details && details.history && details.history.length > 0 && details.history[details.history.length - 1].total,
      )
      .sort((a, b) => {
        // get the last history object
        const aHistory = a.history[a.history.length - 1];
        const bHistory = b.history[b.history.length - 1];

        const aTotal = aHistory.total[0];
        const bTotal = bHistory.total[0];

        return bTotal - aTotal;
      });

    // get the 4 most played cards
    result = detailedCards.slice(0, 4).map((details) => {
      return {
        name: details.card.name,
        imageUrl: details.card.image_normal,
        synergistic: details.synergistic.top.slice(0, 4).map((item) => ({
          name: item.name,
          imageUrl: item.image_normal,
        })),
      };
    });
  } while (!theseCardsAreDistinct(result.map((card) => card.synergistic.map((item) => item.name)).flat()));

  return result;
};

const cache = {};

function cachePromise(key, callback) {
  const existingPromise = cache[key];
  if (existingPromise) {
    return existingPromise;
  }

  const newPromise = callback().catch((error) => {
    delete cache[key];
    throw error;
  });
  cache[key] = newPromise;
  return newPromise;
}

const getConnections = async (date) => {
  return cachePromise(date, async () => newConnections(date));
};

module.exports = {
  getConnections,
};
