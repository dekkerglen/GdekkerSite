const INVALID = 13;

const NONE = -1;
const ANY = 0;
const GRASS = 1;
const GRASS_CLIFF_TOP = 2;
const GRASS_CLIFF_BOTTOM = 3;
const GRASS_CLIFF_LEFT = 4;
const GRASS_CLIFF_RIGHT = 5;
const TREE = 6;
const GRASS_WATER_TOP = 7;
const GRASS_WATER_BOTTOM = 8;
const GRASS_WATER_LEFT = 9;
const GRASS_WATER_RIGHT = 10;
const WATER = 11;

const tiles = [
  {
    index: 0,
    top: GRASS,
    bottom: GRASS_CLIFF_LEFT,
    left: GRASS,
    right: GRASS_CLIFF_TOP,
  },
  {
    index: 1,
    top: GRASS,
    bottom: GRASS,
    left: GRASS_CLIFF_TOP,
    right: GRASS_CLIFF_TOP,
  },
  {
    index: 2,
    top: GRASS,
    bottom: GRASS_CLIFF_RIGHT,
    left: GRASS_CLIFF_TOP,
    right: GRASS,
  },
  {
    index: 3,
    top: GRASS,
    bottom: GRASS_CLIFF_RIGHT,
    left: GRASS,
    right: GRASS_CLIFF_BOTTOM,
  },
  {
    index: 4,
    top: GRASS,
    bottom: GRASS_CLIFF_LEFT,
    left: GRASS_CLIFF_BOTTOM,
    right: GRASS,
  },
  {
    index: 5,
    top: GRASS_CLIFF_LEFT,
    bottom: TREE,
    left: GRASS,
    right: GRASS_CLIFF_BOTTOM,
  },
  {
    index: 6,
    top: GRASS,
    bottom: TREE,
    left: GRASS_CLIFF_BOTTOM,
    right: GRASS_CLIFF_BOTTOM,
  },
  {
    index: 7,
    top: GRASS_CLIFF_RIGHT,
    bottom: TREE,
    left: GRASS_CLIFF_BOTTOM,
    right: GRASS,
  },
  {
    index: 8,
    top: GRASS_CLIFF_LEFT,
    bottom: GRASS_CLIFF_LEFT,
    left: GRASS,
    right: GRASS,
  },
  {
    index: 9,
    top: GRASS,
    bottom: GRASS,
    left: GRASS,
    right: GRASS,
  },
  {
    index: 10,
    top: GRASS_CLIFF_RIGHT,
    bottom: GRASS_CLIFF_RIGHT,
    left: GRASS,
    right: GRASS,
  },
  {
    index: 11,
    top: GRASS_CLIFF_RIGHT,
    bottom: GRASS,
    left: GRASS,
    right: GRASS_CLIFF_TOP,
  },
  {
    index: 12,
    top: GRASS_CLIFF_LEFT,
    bottom: GRASS,
    left: GRASS_CLIFF_TOP,
    right: GRASS,
  },
  {
    index: 13,
    top: NONE,
    bottom: NONE,
    left: NONE,
    right: NONE,
  },
  {
    index: 14,
    top: GRASS,
    bottom: TREE,
    left: GRASS_CLIFF_TOP,
    right: GRASS_CLIFF_TOP,
  },
  {
    index: 15,
    top: GRASS,
    bottom: TREE,
    left: GRASS,
    right: GRASS,
  },
  {
    index: 16,
    top: GRASS_CLIFF_LEFT,
    bottom: GRASS,
    left: GRASS,
    right: GRASS_CLIFF_BOTTOM,
  },
  {
    index: 17,
    top: GRASS,
    bottom: GRASS,
    left: GRASS_CLIFF_BOTTOM,
    right: GRASS_CLIFF_BOTTOM,
  },
  {
    index: 18,
    top: GRASS_CLIFF_RIGHT,
    bottom: GRASS,
    left: GRASS_CLIFF_BOTTOM,
    right: GRASS,
  },
  {
    index: 19,
    top: GRASS,
    bottom: GRASS,
    left: GRASS,
    right: GRASS,
  },
  {
    index: 20,
    top: GRASS,
    bottom: GRASS,
    left: GRASS,
    right: GRASS,
  },
  {
    index: 21,
    top: GRASS,
    bottom: GRASS,
    left: GRASS,
    right: GRASS,
  },
  {
    index: 22,
    top: GRASS,
    bottom: GRASS,
    left: GRASS,
    right: GRASS,
  },
  {
    index: 23,
    top: TREE,
    bottom: GRASS,
    left: GRASS,
    right: GRASS,
  },
  {
    index: 24,
    top: GRASS,
    bottom: GRASS_WATER_RIGHT,
    left: GRASS,
    right: GRASS_WATER_BOTTOM,
  },
  {
    index: 25,
    top: GRASS,
    bottom: WATER,
    left: GRASS_WATER_BOTTOM,
    right: GRASS_WATER_BOTTOM,
  },
  {
    index: 26,
    top: GRASS,
    bottom: GRASS_WATER_LEFT,
    left: GRASS_WATER_BOTTOM,
    right: GRASS,
  },
  {
    index: 27,
    top: WATER,
    bottom: GRASS_WATER_LEFT,
    left: WATER,
    right: GRASS_WATER_TOP,
  },
  {
    index: 28,
    top: WATER,
    bottom: GRASS_WATER_RIGHT,
    left: GRASS_WATER_TOP,
    right: WATER,
  },
  {
    index: 29,
    top: GRASS_WATER_LEFT,
    bottom: GRASS_WATER_RIGHT,
    left: GRASS_WATER_TOP,
    right: GRASS_WATER_BOTTOM,
  },
  {
    index: 30,
    top: WATER,
    bottom: WATER,
    left: WATER,
    right: WATER,
  },
  {
    index: 31,
    top: GRASS_WATER_RIGHT,
    bottom: TREE,
    left: GRASS,
    right: GRASS_WATER_TOP,
  },
  {
    index: 32,
    top: GRASS_WATER_RIGHT,
    bottom: GRASS_WATER_RIGHT,
    left: GRASS,
    right: WATER,
  },
  {
    index: 33,
    top: WATER,
    bottom: WATER,
    left: WATER,
    right: WATER,
  },
  {
    index: 34,
    top: GRASS_WATER_LEFT,
    bottom: GRASS_WATER_LEFT,
    left: WATER,
    right: GRASS,
  },
  {
    index: 35,
    top: GRASS_WATER_LEFT,
    bottom: WATER,
    left: WATER,
    right: GRASS_WATER_BOTTOM,
  },
  {
    index: 36,
    top: GRASS_WATER_RIGHT,
    bottom: WATER,
    left: GRASS_WATER_BOTTOM,
    right: WATER,
  },
  {
    index: 37,
    top: GRASS_WATER_RIGHT,
    bottom: GRASS_WATER_LEFT,
    left: GRASS_WATER_BOTTOM,
    right: GRASS_WATER_TOP,
  },
  {
    index: 38,
    top: WATER,
    bottom: TREE,
    left: GRASS_WATER_TOP,
    right: GRASS_WATER_TOP,
  },
  {
    index: 39,
    top: GRASS_WATER_LEFT,
    bottom: TREE,
    left: GRASS_WATER_TOP,
    right: GRASS,
  },
  {
    index: 40,
    top: GRASS_WATER_RIGHT,
    bottom: GRASS,
    left: GRASS,
    right: GRASS_WATER_TOP,
  },
  {
    index: 41,
    top: WATER,
    bottom: GRASS,
    left: GRASS_WATER_TOP,
    right: GRASS_WATER_TOP,
  },
  {
    index: 42,
    top: GRASS_WATER_LEFT,
    bottom: GRASS,
    left: GRASS_WATER_TOP,
    right: GRASS,
  },
  // {
  //   index: 43,
  //   top: GRASS,
  //   bottom: GRASS_CLIFF_LEFT,
  //   left: GRASS,
  //   right: GRASS,
  //   lowPriority: true,
  // },
  // {
  //   index: 44,
  //   top: GRASS,
  //   bottom: GRASS_CLIFF_RIGHT,
  //   left: GRASS,
  //   right: GRASS,
  //   lowPriority: true,
  // },
  // {
  //   index: 45,
  //   top: GRASS,
  //   bottom: GRASS,
  //   left: GRASS,
  //   right: GRASS_CLIFF_BOTTOM,
  //   lowPriority: true,
  // },
  // {
  //   index: 46,
  //   top: GRASS,
  //   bottom: GRASS,
  //   left: GRASS_CLIFF_BOTTOM,
  //   right: GRASS,
  //   lowPriority: true,
  // },
  // {
  //   index: 47,
  //   top: GRASS,
  //   bottom: GRASS,
  //   left: GRASS,
  //   right: GRASS_CLIFF_TOP,
  //   lowPriority: true,
  // },
  // {
  //   index: 48,
  //   top: GRASS,
  //   bottom: GRASS,
  //   left: GRASS_CLIFF_TOP,
  //   right: GRASS,
  // },
  // {
  //   index: 49,
  //   top: GRASS_CLIFF_LEFT,
  //   bottom: GRASS,
  //   left: GRASS,
  //   right: GRASS,
  //   lowPriority: true,
  // },
  // {
  //   index: 50,
  //   top: GRASS_CLIFF_RIGHT,
  //   bottom: GRASS,
  //   left: GRASS,
  //   right: GRASS,
  //   lowPriority: true,
  // },
];

const mappings = [];

for (let j = 0; j < 7; j++) {
  for (let i = 0; i < 8; i++) {
    if (tiles[j * 8 + i]) {
      mappings.push([i, j]);
    }
  }
}

module.exports = {
  INVALID,
  NONE,
  ANY,
  tiles,
  mappings,
};
