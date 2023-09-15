/* eslint-disable no-await-in-loop */
const fetch = require('node-fetch');

const cache = {};

const getCurrentKey = () => {
  const date = new Date();

  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

const getCards = async (q1, q2) => {
  const cards = [];
  let nextPage = `https://api.scryfall.com/cards/search?order=cmc&q=${encodeURIComponent(q1)}+${encodeURIComponent(
    q2,
  )}`;

  do {
    console.log(nextPage);
    const result = await fetch(nextPage);
    const json = await result.json();
    cards.push(...json.data.map((card) => card.name));

    if (json.next_page) {
      nextPage = json.next_page;
    } else {
      nextPage = null;
    }
  } while (nextPage);

  return cards;
};

const getScryfallCounts = async (key, matrix) => {
  if (cache[key]) {
    return cache[key];
  }

  const result = [
    [[], [], []],
    [[], [], []],
    [[], [], []],
  ];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      result[j][i] = await getCards(matrix[0][i], matrix[1][j]);
    }
  }

  cache[key] = result;

  return cache[key];
};

const todaysMatrix = () => {
  return [
    ['oracle:"exile target"', `oracle:"until end of turn"`, `type:Cleric`],
    ['oracle:": add"', `mana={2}{W}`, `ci>=R`],
  ];
};

const getManaMatrix = async () => {
  const date = getCurrentKey();
  const matrix = todaysMatrix();
  const cards = await getScryfallCounts(date, matrix);
  const counts = cards.map((row) => row.map((item) => item.length));

  return {
    matrix,
    date,
    counts,
  };
};

module.exports = {
  getManaMatrix,
};
