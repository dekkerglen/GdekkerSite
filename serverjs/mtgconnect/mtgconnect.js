/* eslint-disable no-await-in-loop */
const seedrandom = require('seedrandom');
const fetch = require('node-fetch');
const types = require('../creatureTypes');
const sets = require('../sets');

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

const getCards = async (q1, q2) => {
  const cards = [];

  let nextPage = `https://api.scryfall.com/cards/search?order=cmc&q=${encodeURIComponent(q1)}+${encodeURIComponent(
    q2,
  )}`;

  do {
    const result = await fetch(nextPage);
    const json = await result.json();

    if (json.data) {
      cards.push(...json.data.map((card) => card.oracle_id));
    }

    if (json.next_page) {
      nextPage = json.next_page;
    } else {
      nextPage = null;
    }
  } while (nextPage);

  return cards;
};

const newConnections = async (seed) => {
  seedrandom(seed, { global: true });

  let cards = [];
  let result = [];

  do {
    do {
      const numOracle = [0, 1, 1, 2, 2, 3][Math.floor(Math.random() * 6)];

      const terms = shuffle([
        ...nDistinctRandom(valueTerms, 6 - numOracle).map((fn) => fn()),
        ...nDistinctRandom(oracleTerms, numOracle).map((term) => `o:"${term}"`),
      ]);

      const [q1, q2] = terms;

      cards = await getCards(q1, q2);
    } while (cards.length < 50);

    const cobraresult = await fetch(`https://cubecobra.com/tool/mtgconnect`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ oracles: cards }),
    });

    const cobrajson = await cobraresult.json();

    const detailedCards = cobrajson.cards;

    // sort by most played, filter out cards with no history
    const filteredCards = detailedCards
      .filter((card) => card && card.popularity)
      .sort((a, b) => {
        // sort by pop desc
        return b.popularity - a.popularity;
      })
      .map((card) => ({
        name: card.name,
        imageUrl: card.image_normal,
        synergistic: card.synergistic.slice(0, 4).map((item) => ({
          name: item.name,
          imageUrl: item.image_normal,
        })),
      }));

    for (const item of filteredCards) {
      const newResults = [...result, item];

      if (theseCardsAreDistinct(newResults.map((details) => details.synergistic.map((d) => d.name)).flat())) {
        result = newResults;
      }

      if (result.length >= 4) {
        break;
      }
    }
  } while (result.length < 4);

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
