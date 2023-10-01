/* eslint-disable no-await-in-loop */
const seedrandom = require('seedrandom');
const fetch = require('node-fetch');
const types = require('./creatureTypes');
const sets = require('./sets');

const keywords = [
  'Deathtouch',
  'Defender',
  '"Double Strike"',
  'Enchant',
  'Equip',
  '"First Strike"',
  'Flash',
  'Flying',
  'Haste',
  'Hexproof',
  'Indestructible',
  'Lifelink',
  'Menace',
  'Prowess',
  'Reach',
  'Trample',
  'Vigilance',
  'Flashback',
];

const colors = ['W', 'U', 'B', 'R', 'G'];
const combinations = [
  ...colors,
  'UW',
  'UB',
  'UR',
  'UG',
  'WB',
  'WR',
  'WG',
  'BR',
  'BG',
  'RG',
  'GWU',
  'WUB',
  'WUR',
  'UBR',
  'BRG',
  'RGW',
  'RUG',
  'BUG',
  'WBG',
  'WRG',
  'WUBRG',
];

const oracleTerms = [
  'destroy target',
  'exile target',
  'counter target',
  'return target',
  'creature gets',
  'creature gains',
  'until end of turn',
  'add one',
  'enters the battlefield',
  'whenever',
  ': add',
  'for each',
  'unless',
  'up to',
  'create',
  'damage to',
  'search your library',
  'draw a card',
  'put a',
  'put it',
  'discard',
  'sacrifice',
  "can't",
  'remove',
  'reveal',
  'the beginning of',
  'you control',
  'becomes',
  'each opponent',
  'target opponent',
  'target player',
  'another',
  'where x is',
  'random order',
  'any order',
  'bottom of',
  'copy',
  'top of',
  'if you do',
  'token with',
  'permanent',
  'tapped',
  'untapped',
  "doesn't",
  'next',
  'you gain',
  'you have',
  'you lose',
  'additional cost',
  'this way',
];

const valueTerms = [
  () => `type:${types[Math.floor(Math.random() * types.length)]}`,
  () => {
    return `cmc${['=0', '=1', '=2', '=3', '=5', '=6', '=7', '>7'][Math.floor(Math.random() * 8)]}`;
  },
  () => {
    return `ci=${[0, 1, 2, 3, 5][Math.floor(Math.random() * 5)]}`;
  },
  () => {
    return `ci=${combinations[Math.floor(Math.random() * combinations.length)]}`;
  },
  () =>
    `type:${
      ['Artifact', 'Creature', 'Enchantment', 'Instant', 'Land', 'Planeswalker', 'Sorcery', 'Legendary'][
        Math.floor(Math.random() * 8)
      ]
    }`,
  () => `power=${Math.floor(Math.random() * 7)}`,
  () => `toughness=${Math.floor(Math.random() * 7)}`,
  () => `set:${sets[Math.floor(Math.random() * sets.length)]}`,
  () => `keyword:${keywords[Math.floor(Math.random() * keywords.length)]}`,
  () => {
    const color = colors[Math.floor(Math.random() * colors.length)];
    const pips = Math.floor(Math.random() * 2) + 1;
    const generic = Math.floor(Math.random() * 3);

    let base = `mana=`;
    if (generic > 0) {
      base += `{${generic}}`;
    }
    for (let i = 0; i < pips; i++) {
      base += `{${color}}`;
    }

    return base;
  },
];

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

const newMatrix = () => {
  // generate 6 terms, if we already have this term we need to get a new one

  const numOracle = [0, 1, 1, 2, 2, 3][Math.floor(Math.random() * 6)];

  const terms = shuffle([
    ...nDistinctRandom(valueTerms, 6 - numOracle).map((fn) => fn()),
    ...nDistinctRandom(oracleTerms, numOracle).map((term) => `o:"${term}"`),
  ]);

  const matrix = [
    [terms[0], terms[1], terms[2]],
    [terms[3], terms[4], terms[5]],
  ];

  return matrix;
};

const cache = {};

const getCards = async (q1, q2) => {
  const cards = [];

  let nextPage = `https://api.scryfall.com/cards/search?order=cmc&q=${encodeURIComponent(q1)}+${encodeURIComponent(
    q2,
  )}`;

  do {
    const result = await fetch(nextPage);
    const json = await result.json();

    if (json.data) {
      cards.push(...json.data.map((card) => card.name));
    }

    if (json.next_page) {
      nextPage = json.next_page;
    } else {
      nextPage = null;
    }
  } while (nextPage);

  return cards;
};

const getScryfallCards = async (key, matrix) => {
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

  return result;
};

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

const generateMatrix = async (date) => {
  seedrandom(date, { global: true });
  let counts = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  let matrix;
  let cards;

  do {
    matrix = newMatrix();
    cards = await getScryfallCards(date, matrix);
    counts = cards.map((row) => row.map((item) => item.length));
  } while (counts.some((row) => row.some((item) => item === 0)));

  cache[date] = {
    matrix,
    counts,
    cards,
  };

  return {
    matrix,
    counts,
    cards,
  };
};

const getManaMatrix = async (date) => {
  return cachePromise(date, async () => generateMatrix(date));
};

module.exports = {
  getManaMatrix,
};
