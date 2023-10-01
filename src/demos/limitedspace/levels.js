/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import useLocalStorage from 'hooks/useLocalStorage';
import React from 'react';
import { copyGrid } from 'demos/limitedspace/utils';

const validateCounts = (grid, counts) => {
  for (const [fruit, count] of Object.entries(counts)) {
    let found = 0;
    for (const row of grid) {
      for (const cell of row) {
        if (cell === fruit) {
          found += 1;
        }
      }
    }
    if (found < count) {
      return false;
    }
  }
  return true;
};

const levels = [
  {
    level: 0,
    description: `Here's an 🍎. Click it to add it to the grid.`,
    isValid: (grid) => grid.some((row) => row.some((cell) => cell === '🍎')),
    Extra: ({ grid, setGrid }) => {
      const [clicked, setClicked] = useLocalStorage('tiny-garden-level-0-clicked', false);

      return (
        <div
          className="clickable"
          style={{ fontSize: '50px' }}
          onClick={() => {
            setClicked(true);
            // add apple to grid
            const newGrid = copyGrid(grid);
            for (let y = 0; y < newGrid.length; y += 1) {
              for (let x = 0; x < newGrid[y].length; x += 1) {
                if (newGrid[y][x] === '') {
                  newGrid[y][x] = '🍎';
                  setGrid(newGrid);
                  return;
                }
              }
            }
          }}
        >
          {clicked ? '' : '🍎'}
        </div>
      );
    },
  },
  {
    level: 1,
    description: `Here's a 🍐. Click it to add it to the grid.`,
    isValid: (grid) => grid.some((row) => row.some((cell) => cell === '🍐')),
    Extra: ({ grid, setGrid }) => {
      const [clicked, setClicked] = useLocalStorage('tiny-garden-level-1-clicked', false);

      return (
        <div
          className="clickable"
          style={{ fontSize: '50px' }}
          onClick={() => {
            setClicked(true);
            // we want to find a space adjacent to an apple
            const newGrid = copyGrid(grid);

            // first, find all apples
            const apples = [];
            for (let y = 0; y < newGrid.length; y += 1) {
              for (let x = 0; x < newGrid[y].length; x += 1) {
                if (newGrid[y][x] === '🍎') {
                  apples.push([x, y]);
                }
              }
            }

            // now, find all adjacent spaces
            const adjacentSpaces = [];
            for (let y = 0; y < newGrid.length; y += 1) {
              for (let x = 0; x < newGrid[y].length; x += 1) {
                if (newGrid[y][x] === '') {
                  for (const apple of apples) {
                    if (Math.abs(apple[0] - x) + Math.abs(apple[1] - y) === 1) {
                      adjacentSpaces.push([x, y]);
                    }
                  }
                }
              }
            }

            // pick a random adjacent space
            const [x, y] = adjacentSpaces[Math.floor(Math.random() * adjacentSpaces.length)];

            newGrid[y][x] = '🍐';
            setGrid(newGrid);
          }}
        >
          {clicked ? '' : '🍐'}
        </div>
      );
    },
  },
  {
    level: 2,
    description: `An 🍎 must never be adjacent to a 🍐.`,
    isValid: (grid) => {
      for (let y = 0; y < grid.length; y += 1) {
        for (let x = 0; x < grid[y].length; x += 1) {
          if (grid[y][x] === '🍎') {
            if (
              (x > 0 && grid[y][x - 1] === '🍐') ||
              (x < grid[y].length - 1 && grid[y][x + 1] === '🍐') ||
              (y > 0 && grid[y - 1][x] === '🍐') ||
              (y < grid.length - 1 && grid[y + 1][x] === '🍐')
            ) {
              return false;
            }
          }
        }
      }
      return true;
    },
  },
  {
    level: 3,
    description: `New fruits just dropped! Click each one to add it to the grid.`,
    isValid: (grid) => {
      // we need 3 apples, 2 pears, 1 orange, 1 lemon, 1 banana
      return validateCounts(grid, { '🍎': 2, '🍐': 2, '🍊': 1, '🍋': 1, '🍌': 1 });
    },
    Extra: ({ grid, setGrid }) => {
      const [clicked, setClicked] = useLocalStorage('tiny-garden-level-3-clicked', [false, false, false, false, false]);

      return (
        <div className="d-flex justify-content-center">
          {['🍎', '🍐', '🍊', '🍋', '🍌'].map((fruit, index) => (
            <div
              key={`${fruit}-${index}`}
              className="clickable"
              style={{ fontSize: '50px' }}
              onClick={() => {
                setClicked((prev) => {
                  const newClicked = [...prev];
                  newClicked[index] = true;
                  return newClicked;
                });
                // add apple to grid
                const newGrid = copyGrid(grid);
                for (let y = 0; y < newGrid.length; y += 1) {
                  for (let x = 0; x < newGrid[y].length; x += 1) {
                    if (newGrid[y][x] === '') {
                      newGrid[y][x] = fruit;
                      setGrid(newGrid);
                      return;
                    }
                  }
                }
              }}
            >
              {clicked[index] ? '' : fruit}
            </div>
          ))}
        </div>
      );
    },
  },
  {
    level: 4,
    description: `At least one 🍌 must be in a corner.`,
    isValid: (grid) => {
      // a banana must be in a corner
      for (let y = 0; y < grid.length; y += 1) {
        for (let x = 0; x < grid[y].length; x += 1) {
          if (grid[y][x] === '🍌') {
            if (
              (x === 0 && y === 0) ||
              (x === 0 && y === grid.length - 1) ||
              (x === grid[y].length - 1 && y === 0) ||
              (x === grid[y].length - 1 && y === grid.length - 1)
            ) {
              return true;
            }
          }
        }
      }

      return false;
    },
  },
  {
    level: 5,
    description: `Each 🍋 must be diagonal from at least two unique fruits`,
    isValid: (grid) => {
      // each lemon must be diagonal from at least two unique fruits
      for (let y = 0; y < grid.length; y += 1) {
        for (let x = 0; x < grid[y].length; x += 1) {
          if (grid[y][x] === '🍋') {
            const uniqueFruits = new Set();
            if (x > 0 && y > 0 && grid[y - 1][x - 1] !== '') {
              uniqueFruits.add(grid[y - 1][x - 1]);
            }
            if (x < grid[y].length - 1 && y > 0 && grid[y - 1][x + 1] !== '') {
              uniqueFruits.add(grid[y - 1][x + 1]);
            }
            if (x > 0 && y < grid.length - 1 && grid[y + 1][x - 1] !== '') {
              uniqueFruits.add(grid[y + 1][x - 1]);
            }
            if (x < grid[y].length - 1 && y < grid.length - 1 && grid[y + 1][x + 1] !== '') {
              uniqueFruits.add(grid[y + 1][x + 1]);
            }
            if (uniqueFruits.size < 2) {
              return false;
            }
          }
        }
      }

      return true;
    },
  },
  {
    level: 6,
    description: `This is too easy. Let's add some more fruits!`,
    isValid: (grid) => {
      // we need 3 apples, 2 pears, 1 orange, 1 lemon, 1 banana
      return validateCounts(grid, { '🍎': 3, '🍐': 3, '🍊': 2, '🍋': 2, '🍌': 2 });
    },
    Extra: ({ grid, setGrid }) => {
      const [clicked, setClicked] = useLocalStorage('tiny-garden-level-6-clicked', [false, false, false, false, false]);

      return (
        <div className="d-flex justify-content-center">
          {['🍎', '🍐', '🍊', '🍋', '🍌'].map((fruit, index) => (
            <div
              key={`${fruit}-${index}`}
              className="clickable"
              style={{ fontSize: '50px' }}
              onClick={() => {
                setClicked((prev) => {
                  const newClicked = [...prev];
                  newClicked[index] = true;
                  return newClicked;
                });
                // add apple to grid
                const newGrid = copyGrid(grid);
                for (let y = 0; y < newGrid.length; y += 1) {
                  for (let x = 0; x < newGrid[y].length; x += 1) {
                    if (newGrid[y][x] === '') {
                      newGrid[y][x] = fruit;
                      setGrid(newGrid);
                      return;
                    }
                  }
                }
              }}
            >
              {clicked[index] ? '' : fruit}
            </div>
          ))}
        </div>
      );
    },
  },
  {
    level: 7,
    description: `Each 🍎 must be adjacent to at least one other 🍎.`,
    isValid: (grid) => {
      // each apple must be adjacent to at least one other apple
      for (let y = 0; y < grid.length; y += 1) {
        for (let x = 0; x < grid[y].length; x += 1) {
          if (grid[y][x] === '🍎') {
            if (
              x > 0 &&
              grid[y][x - 1] !== '🍎' &&
              x < grid[y].length - 1 &&
              grid[y][x + 1] !== '🍎' &&
              y > 0 &&
              grid[y - 1][x] !== '🍎' &&
              y < grid.length - 1 &&
              grid[y + 1][x] !== '🍎'
            ) {
              return false;
            }
          }
        }
      }

      return true;
    },
  },
  {
    level: 8,
    description: `Each 🍊 must be in a column with a 🍋.`,
    isValid: (grid) => {
      // each orange must be in a column with a lemon
      for (let y = 0; y < grid.length; y += 1) {
        let foundLemon = false;
        let foundOrange = false;
        for (let x = 0; x < grid[y].length; x += 1) {
          if (grid[x][y] === '🍋') {
            foundLemon = true;
          }
          if (grid[x][y] === '🍊') {
            foundOrange = true;
          }
        }
        if (foundOrange && !foundLemon) {
          return false;
        }
      }

      return true;
    },
  },
  {
    level: 9,
    description: `Each 🍌 must be in a row with a 🍐.`,
    isValid: (grid) => {
      // each banana must be in a row with a pear
      for (let y = 0; y < grid.length; y += 1) {
        let foundBanana = false;
        let foundPear = false;
        for (let x = 0; x < grid[y].length; x += 1) {
          if (grid[y][x] === '🍌') {
            foundBanana = true;
          }
          if (grid[y][x] === '🍐') {
            foundPear = true;
          }
        }
        if (foundBanana && !foundPear) {
          return false;
        }
      }

      return true;
    },
  },
  {
    level: 10,
    description: `There's a bit too much empty space. Let's add some more fruits!`,
    isValid: (grid) => {
      // we need 3 apples, 2 pears, 1 orange, 1 lemon, 1 banana
      return validateCounts(grid, { '🍎': 3, '🍐': 3, '🍊': 2, '🍋': 2, '🍌': 2, '🍉': 4 });
    },
    Extra: ({ grid, setGrid }) => {
      const [clicked, setClicked] = useLocalStorage('tiny-garden-level-7-clicked', [
        false,
        false,
        false,
        false,
        false,
        false,
      ]);

      return (
        <div className="d-flex justify-content-center">
          {['🍎', '🍊', '🍉', '🍉', '🍉', '🍉'].map((fruit, index) => (
            <div
              key={`${fruit}-${index}`}
              className="clickable"
              style={{ fontSize: '50px' }}
              onClick={() => {
                setClicked((prev) => {
                  const newClicked = [...prev];
                  newClicked[index] = true;
                  return newClicked;
                });
                // add apple to grid
                const newGrid = copyGrid(grid);
                for (let y = 0; y < newGrid.length; y += 1) {
                  for (let x = 0; x < newGrid[y].length; x += 1) {
                    if (newGrid[y][x] === '') {
                      newGrid[y][x] = fruit;
                      setGrid(newGrid);
                      return;
                    }
                  }
                }
              }}
            >
              {clicked[index] ? '' : fruit}
            </div>
          ))}
        </div>
      );
    },
  },
  {
    level: 11,
    description: `Each 🍎 cannot be diagonal from another 🍎.`,
    isValid: (grid) => {
      // each apple cannot be diagonal from another apple
      for (let y = 0; y < grid.length; y += 1) {
        for (let x = 0; x < grid[y].length; x += 1) {
          if (grid[y][x] === '🍎') {
            if (
              (x > 0 && y > 0 && grid[y - 1][x - 1] === '🍎') ||
              (x < grid[y].length - 1 && y > 0 && grid[y - 1][x + 1] === '🍎') ||
              (x > 0 && y < grid.length - 1 && grid[y + 1][x - 1] === '🍎') ||
              (x < grid[y].length - 1 && y < grid.length - 1 && grid[y + 1][x + 1] === '🍎')
            ) {
              return false;
            }
          }
        }
      }

      return true;
    },
  },
  {
    level: 12,
    description: `A 🍉 cannot be adjacent to a 🍌.`,
    isValid: (grid) => {
      // each watermelon cannot be adjacent to a banana
      for (let y = 0; y < grid.length; y += 1) {
        for (let x = 0; x < grid[y].length; x += 1) {
          if (grid[y][x] === '🍉') {
            if (
              (x > 0 && grid[y][x - 1] === '🍌') ||
              (x < grid[y].length - 1 && grid[y][x + 1] === '🍌') ||
              (y > 0 && grid[y - 1][x] === '🍌') ||
              (y < grid.length - 1 && grid[y + 1][x] === '🍌')
            ) {
              return false;
            }
          }
        }
      }
      return true;
    },
  },
  {
    level: 13,
    description: `At least two 🍎 must be on the edge of the grid.`,
    isValid: (grid) => {
      // at least two apples must be on the edge of the garden
      let applesOnEdge = 0;
      for (let y = 0; y < grid.length; y += 1) {
        if (grid[y][0] === '🍎') {
          applesOnEdge += 1;
        }
        if (grid[y][grid[y].length - 1] === '🍎') {
          applesOnEdge += 1;
        }
      }
      for (let x = 0; x < grid[0].length; x += 1) {
        if (grid[0][x] === '🍎') {
          applesOnEdge += 1;
        }
        if (grid[grid.length - 1][x] === '🍎') {
          applesOnEdge += 1;
        }
      }

      return applesOnEdge >= 2;
    },
  },
  {
    level: 14,
    description: `An 🍎 must never be adjacent to a 🍉.`,
    isValid: (grid) => {
      // each apple cannot be adjacent to a watermelon
      for (let y = 0; y < grid.length; y += 1) {
        for (let x = 0; x < grid[y].length; x += 1) {
          if (grid[y][x] === '🍎') {
            if (
              (x > 0 && grid[y][x - 1] === '🍉') ||
              (x < grid[y].length - 1 && grid[y][x + 1] === '🍉') ||
              (y > 0 && grid[y - 1][x] === '🍉') ||
              (y < grid.length - 1 && grid[y + 1][x] === '🍉')
            ) {
              return false;
            }
          }
        }
      }

      return true;
    },
  },
  {
    level: 15,
    description: `All 🍉 must form a 2x2 cluster.`,
    isValid: (grid) => {
      // all watermelons must form a 2x2 cluster
      for (let y = 0; y < grid.length - 1; y += 1) {
        for (let x = 0; x < grid[y].length - 1; x += 1) {
          if (
            grid[y][x] === '🍉' &&
            grid[y][x + 1] === '🍉' &&
            grid[y + 1][x] === '🍉' &&
            grid[y + 1][x + 1] === '🍉'
          ) {
            return true;
          }
        }
      }

      return false;
    },
  },
  {
    level: 16,
    description: `New shipment of fruits!.`,
    isValid: (grid) => {
      // we need 3 apples, 2 pears, 1 orange, 1 lemon, 1 banana
      return validateCounts(grid, { '🍎': 3, '🍐': 3, '🍊': 2, '🍋': 3, '🍌': 2, '🍉': 4, '🍇': 2 });
    },
    Extra: ({ grid, setGrid }) => {
      const [clicked, setClicked] = useLocalStorage('tiny-garden-level-15-clicked', [
        false,
        false,
        false,
        false,
        false,
        false,
      ]);

      return (
        <div className="d-flex justify-content-center">
          {['🍋', '🍇', '🍇'].map((fruit, index) => (
            <div
              key={`${fruit}-${index}`}
              className="clickable"
              style={{ fontSize: '50px' }}
              onClick={() => {
                setClicked((prev) => {
                  const newClicked = [...prev];
                  newClicked[index] = true;
                  return newClicked;
                });
                // add apple to grid
                const newGrid = copyGrid(grid);
                for (let y = 0; y < newGrid.length; y += 1) {
                  for (let x = 0; x < newGrid[y].length; x += 1) {
                    if (newGrid[y][x] === '') {
                      newGrid[y][x] = fruit;
                      setGrid(newGrid);
                      return;
                    }
                  }
                }
              }}
            >
              {clicked[index] ? '' : fruit}
            </div>
          ))}
        </div>
      );
    },
  },
  {
    level: 17,
    description: `Each 🍇 must be adjacent to four unique fruits.`,
    isValid: (grid) => {
      // each grape must be adjacent to four unique fruits
      for (let y = 0; y < grid.length; y += 1) {
        for (let x = 0; x < grid[y].length; x += 1) {
          const uniqueFruits = new Set();
          if (grid[y][x] === '🍇') {
            if (x > 0 && grid[y][x - 1] !== '') {
              uniqueFruits.add(grid[y][x - 1]);
            }
            if (x < grid[y].length - 1 && grid[y][x + 1] !== '') {
              uniqueFruits.add(grid[y][x + 1]);
            }
            if (y > 0 && grid[y - 1][x] !== '') {
              uniqueFruits.add(grid[y - 1][x]);
            }
            if (y < grid.length - 1 && grid[y + 1][x] !== '') {
              uniqueFruits.add(grid[y + 1][x]);
            }
            if (uniqueFruits.size !== 4) {
              return false;
            }
          }
        }
      }

      return true;
    },
  },
  {
    level: 18,
    description: `Each row and each column cannot have more than 2 of the same fruit.`,
    isValid: (grid) => {
      // each row and each column cannot have more than 2 of the same fruit
      for (let y = 0; y < grid.length; y += 1) {
        const rowCounts = {};
        for (let x = 0; x < grid[y].length; x += 1) {
          if (rowCounts[grid[y][x]]) {
            rowCounts[grid[y][x]] += 1;
          } else {
            rowCounts[grid[y][x]] = 1;
          }
          if (rowCounts[grid[y][x]] > 2) {
            return false;
          }
        }
      }
      for (let x = 0; x < grid[0].length; x += 1) {
        const colCounts = {};
        for (let y = 0; y < grid.length; y += 1) {
          if (colCounts[grid[y][x]]) {
            colCounts[grid[y][x]] += 1;
          } else {
            colCounts[grid[y][x]] = 1;
          }
          if (colCounts[grid[y][x]] > 2) {
            return false;
          }
        }
      }

      return true;
    },
  },
  {
    level: 19,
    description: `The final batch of fruit has arrived!`,
    isValid: (grid) => {
      // we need 3 apples, 2 pears, 1 orange, 1 lemon, 1 banana
      return validateCounts(grid, { '🍎': 3, '🍐': 3, '🍊': 2, '🍋': 3, '🍌': 2, '🍉': 4, '🍇': 2, '🍑': 2, '🍍': 2 });
    },
    Extra: ({ grid, setGrid }) => {
      const [clicked, setClicked] = useLocalStorage('tiny-garden-level-19-clicked', [false, false, false, false]);

      return (
        <div className="d-flex justify-content-center">
          {['🍑', '🍑', '🍍', '🍍'].map((fruit, index) => (
            <div
              key={`${fruit}-${index}`}
              className="clickable"
              style={{ fontSize: '50px' }}
              onClick={() => {
                setClicked((prev) => {
                  const newClicked = [...prev];
                  newClicked[index] = true;
                  return newClicked;
                });
                // add apple to grid
                const newGrid = copyGrid(grid);
                for (let y = 0; y < newGrid.length; y += 1) {
                  for (let x = 0; x < newGrid[y].length; x += 1) {
                    if (newGrid[y][x] === '') {
                      newGrid[y][x] = fruit;
                      setGrid(newGrid);
                      return;
                    }
                  }
                }
              }}
            >
              {clicked[index] ? '' : fruit}
            </div>
          ))}
        </div>
      );
    },
  },
  {
    level: 20,
    description: `Each 🍑 must be adjacent to an 🍎.`,
    isValid: (grid) => {
      // each peach must be adjacent to an apple
      for (let y = 0; y < grid.length; y += 1) {
        for (let x = 0; x < grid[y].length; x += 1) {
          if (grid[y][x] === '🍑') {
            // if no adjacent squares are apples, return false
            if (
              (x === 0 || grid[y][x - 1] !== '🍎') &&
              (x === grid[y].length - 1 || grid[y][x + 1] !== '🍎') &&
              (y === 0 || grid[y - 1][x] !== '🍎') &&
              (y === grid.length - 1 || grid[y + 1][x] !== '🍎')
            ) {
              return false;
            }
          }
        }
      }

      return true;
    },
  },
  {
    level: 21,
    description: `Each 🍍 must be adjacent to a 🍌.`,
    isValid: (grid) => {
      // each pineapple must be adjacent to a banana
      for (let y = 0; y < grid.length; y += 1) {
        for (let x = 0; x < grid[y].length; x += 1) {
          if (grid[y][x] === '🍍') {
            // if no adjacent squares are bananas, return false
            if (
              (x === 0 || grid[y][x - 1] !== '🍌') &&
              (x === grid[y].length - 1 || grid[y][x + 1] !== '🍌') &&
              (y === 0 || grid[y - 1][x] !== '🍌') &&
              (y === grid.length - 1 || grid[y + 1][x] !== '🍌')
            ) {
              return false;
            }
          }
        }
      }

      return true;
    },
  },
  {
    level: 22,
    description: `Each 🍇 must be diagonal to four unique fruits`,
    isValid: (grid) => {
      // each grape must have 4 unique fruits on the diagonals
      for (let y = 0; y < grid.length; y += 1) {
        for (let x = 0; x < grid[y].length; x += 1) {
          if (grid[y][x] === '🍇') {
            const uniqueFruits = new Set();
            if (x > 0 && y > 0 && grid[y - 1][x - 1] !== '') {
              uniqueFruits.add(grid[y - 1][x - 1]);
            }
            if (x < grid[y].length - 1 && y > 0 && grid[y - 1][x + 1] !== '') {
              uniqueFruits.add(grid[y - 1][x + 1]);
            }
            if (x > 0 && y < grid.length - 1 && grid[y + 1][x - 1] !== '') {
              uniqueFruits.add(grid[y + 1][x - 1]);
            }
            if (x < grid[y].length - 1 && y < grid.length - 1 && grid[y + 1][x + 1] !== '') {
              uniqueFruits.add(grid[y + 1][x + 1]);
            }
            if (uniqueFruits.size !== 4) {
              return false;
            }
          }
        }
      }

      return true;
    },
  },
  {
    level: 23,
    description: `An 🍊 must be at the center and in a corner.`,
    isValid: (grid) => {
      // an orange must be at the center and in a corner
      if (grid[2][2] !== '🍊') {
        return false;
      }
      if (
        grid[0][0] !== '🍊' &&
        grid[0][grid[0].length - 1] !== '🍊' &&
        grid[grid.length - 1][0] !== '🍊' &&
        grid[grid.length - 1][grid[0].length - 1] !== '🍊'
      ) {
        return false;
      }

      return true;
    },
  },
  {
    level: 24,
    description: `Congratulations! You've completed all the levels!`,
    isValid: () => {
      return true;
    },
  },
];

export default levels;
