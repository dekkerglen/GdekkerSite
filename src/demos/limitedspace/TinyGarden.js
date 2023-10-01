/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import useLocalStorage from 'hooks/useLocalStorage';
import React, { useEffect, useMemo, useCallback, useState } from 'react';
import { Row, Col } from 'reactstrap';
import Level from 'demos/limitedspace/Level';
import Grid from 'demos/limitedspace/Grid';
import levels from 'demos/limitedspace/levels';

// const fruits = ['🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅'];

const TinyGarden = () => {
  const [grid, setGrid] = useLocalStorage('tiny-garden-grid', [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
  ]);
  const [level, setLevel] = useLocalStorage('tiny-garden-level', 0);
  const [visibleGrid, setVisibleGrid] = useState(grid);

  const updateGrid = useCallback(
    (newGrid) => {
      setGrid(newGrid);
      setVisibleGrid(newGrid);
    },
    [setVisibleGrid, setGrid],
  );

  // increment level when all previous levels are valid
  useEffect(() => {
    for (let i = 0; i <= level; i += 1) {
      if (!levels[i] || !levels[i].isValid(grid)) {
        return;
      }
    }

    setLevel((oldLevel) => oldLevel + 1);
  }, [grid, level, setLevel]);

  const passedLevels = useMemo(() => {
    const passed = [];
    for (let i = 0; i <= level; i += 1) {
      if (levels[i] && levels[i].isValid(grid)) {
        passed.push(levels[i]);
      }
    }
    return passed.sort((a, b) => {
      // sort by .level desc
      if (a.level < b.level) {
        return 1;
      }
      if (a.level > b.level) {
        return -1;
      }
      return 0;
    });
  }, [grid, level]);

  const failedLevels = useMemo(() => {
    const failed = [];
    for (let i = 0; i <= level; i += 1) {
      if (levels[i] && !levels[i].isValid(grid)) {
        failed.push(levels[i]);
      }
    }
    return failed.sort((a, b) => {
      // sort by .level desc
      if (a.level < b.level) {
        return 1;
      }
      if (a.level > b.level) {
        return -1;
      }
      return 0;
    });
  }, [grid, level]);

  return (
    <Row>
      <Col xs={6}>
        <Grid visibleGrid={visibleGrid} setVisibleGrid={setVisibleGrid} updateGrid={updateGrid} />
      </Col>
      <Col xs={6}>
        <div className="d-flex flex-column justify-content-center">
          {failedLevels.map((lev, index) => (
            <Level key={index} index={index} level={lev} grid={grid} setGrid={updateGrid} />
          ))}
          {passedLevels.map((lev, index) => (
            <Level key={index} index={index} level={lev} grid={grid} setGrid={updateGrid} />
          ))}
        </div>
      </Col>
    </Row>
  );
};

export default TinyGarden;
