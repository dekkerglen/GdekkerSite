/* eslint-disable no-await-in-loop */
const seedrandom = require('seedrandom');
const fetch = require('node-fetch');
const types = require('./creatureTypes');
const sets = require('./sets');

const keywords = [
  'Deathtouch',
  'Defender',
  'Double Strike',
  'Enchant',
  'Equip',
  'First Strike',
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
  'Scry',
];

const shuffle = (array) => {
  let m = array.length;
  let t;
  let i;
  while (m) {
    i = Math.floor(Math.random() * m);
    m -= 1;
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
};

const nRandomFromArray = (array, n) => {
  const shuffled = shuffle(array.slice(0));
  return shuffled.slice(0, n);
};

const colors = ['W', 'U', 'B', 'R', 'G'];

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
    const operator = ['=', '>', '<'][Math.floor(Math.random() * 3)];

    if (operator === '=') {
      return `cmc=${Math.floor(Math.random() * 7)}`;
    }

    if (operator === '>') {
      return `cmc>=${Math.floor(Math.random() * 4) + 3}`;
    }

    if (operator === '<') {
      return `cmc<${Math.floor(Math.random() * 4) + 1}`;
    }

    return '';
  },
  () => {
    const operator = ['=', '>', '<'][Math.floor(Math.random() * 3)];
    let value = Math.floor(Math.random() * 4);

    if (operator === '>') {
      value -= 1;
    }

    if (operator === '<') {
      value += 1;
    }

    return `ci${operator}${value}`;
  },
  () => `ci:${colors[Math.floor(Math.random() * colors.length)]}`,
  () => {
    const numColors = [1, 2, 3, 5][Math.floor(Math.random() * 4)];

    return `ci=${nRandomFromArray(colors, numColors).join('')}`;
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

const randomTerm = () => {
  const term = Math.floor(Math.random() * 5);

  if (term === 0) {
    return `oracle:"${oracleTerms[Math.floor(Math.random() * oracleTerms.length)]}"`;
  }
  return valueTerms[Math.floor(Math.random() * valueTerms.length)]();
};

const newMatrix = () => {
  // generate 6 terms, if we already have this term we need to get a new one
  const xterms = [];
  const yterms = [];

  while (xterms.length < 3) {
    const term = randomTerm();
    if (!xterms.includes(term)) {
      xterms.push(term);
    }
  }

  while (yterms.length < 3) {
    const term = randomTerm();
    if (!yterms.includes(term) && !xterms.includes(term)) {
      if (!(term.startsWith('ci') && xterms.some((xterm) => xterm.startsWith('ci')))) {
        yterms.push(term);
      }
    }
  }

  return [
    [xterms[0], xterms[1], xterms[2]],
    [yterms[0], yterms[1], yterms[2]],
  ];
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

const getManaMatrix = async (date) => {
  if (cache[date]) {
    return cache[date];
  }

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

module.exports = {
  getManaMatrix,
};
