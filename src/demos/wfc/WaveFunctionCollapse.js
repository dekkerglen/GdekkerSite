import React, { useCallback, useMemo } from 'react';
import Tilemap from 'demos/wfc/TileMap';
import { Button, Row, Col, Card, CardBody, CardTitle, Input } from 'reactstrap';

import { INVALID, ANY, tiles, mappings } from 'demos/wfc/pokemon';

const pickRandom = (array) => {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
};

const shuffleInPlace = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const overlap = (a, b) => {
  return a.filter((x) => b.includes(x));
};

const collapseStep = (data, constraints, invalid) => {
  const uncollapsed = [];
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      if (Array.isArray(data[i][j])) {
        uncollapsed.push([i, j]);
      }
    }
  }

  shuffleInPlace(uncollapsed);
  const newData = [...data];

  uncollapsed.sort((a, b) => {
    return newData[b[0]][b[1]].length - newData[a[0]][a[1]].length;
  });

  const [i, j] = uncollapsed.pop();
  let pick = invalid;
  if (newData[i][j].length === 0) {
    console.log(`${i}, ${j} is empty`);
    newData[i][j] = invalid;
  } else {
    const highPriorityOptions = newData[i][j].filter((index) => {
      return !tiles[index].lowPriority;
    });

    if (highPriorityOptions.length > 0) {
      pick = pickRandom(highPriorityOptions);
    } else {
      pick = pickRandom(newData[i][j]);
    }
  }

  if (newData[i][j] !== invalid) {
    // update adjacent cells given constraints
    const constraint = constraints[pick];

    let blocking = false;
    const constrained = {};

    // left
    if (j > 0 && constraint && Array.isArray(newData[i][j - 1])) {
      constrained.left = overlap(newData[i][j - 1], constraint.left);
      if (constrained.left.length === 0) {
        blocking = true;
      }
    }
    // right
    if (!blocking && j < data[i].length - 1 && constraint && Array.isArray(newData[i][j + 1])) {
      constrained.right = overlap(newData[i][j + 1], constraint.right);
      if (constrained.right.length === 0) {
        blocking = true;
      }
    }
    // top
    if (!blocking && i > 0 && constraint && Array.isArray(newData[i - 1][j])) {
      constrained.top = overlap(newData[i - 1][j], constraint.top);
      if (constrained.top.length === 0) {
        blocking = true;
      }
    }
    // bottom
    if (!blocking && i < data.length - 1 && constraint && Array.isArray(newData[i + 1][j])) {
      constrained.bottom = overlap(newData[i + 1][j], constraint.bottom);
      if (constrained.bottom.length === 0) {
        blocking = true;
      }
    }

    if (blocking) {
      newData[i][j] = newData[i][j].filter((x) => x !== pick);
    } else {
      newData[i][j] = pick;

      if (constrained.left) {
        newData[i][j - 1] = constrained.left;
      }
      if (constrained.right) {
        newData[i][j + 1] = constrained.right;
      }
      if (constrained.top) {
        newData[i - 1][j] = constrained.top;
      }
      if (constrained.bottom) {
        newData[i + 1][j] = constrained.bottom;
      }
    }
  }

  return newData;
};

const collapse = (data, constraints, invalid) => {
  let done = false;
  do {
    const uncollapsed = [];
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        if (Array.isArray(data[i][j])) {
          uncollapsed.push([i, j]);
        }
      }
    }

    if (uncollapsed.length === 0) {
      done = true;
    } else {
      data = collapseStep(data, constraints, invalid);
    }
  } while (!done);

  return data;
};

const DIRECTIONS = ['top', 'left', 'bottom', 'right'];

const INVERSE_DIRECTION = {
  top: 'bottom',
  left: 'right',
  bottom: 'top',
  right: 'left',
};

const makeConstraints = (list) => {
  const constraints = [];

  for (const tile of list) {
    const constraint = {};

    for (const direction of DIRECTIONS) {
      if (tile[direction] === ANY) {
        constraint[direction] = list.map((t) => t.index);
      } else {
        constraint[direction] = list
          .filter((t) => t[INVERSE_DIRECTION[direction]] === tile[direction])
          .map((t) => t.index)
          .filter((index) => index !== 13);
      }
    }

    constraints.push(constraint);
  }

  return constraints;
};

const constraints = makeConstraints(tiles);

const init = (width, height, list) => {
  const state = [];
  for (let i = 0; i < height; i++) {
    const row = [];
    for (let j = 0; j < width; j++) {
      const possibleValues = [];
      for (let l = 0; l < list; l++) {
        possibleValues.push(l);
      }
      row.push(
        constraints
          .map((value, index) => [value, index])
          .filter((tuple) => tuple[0])
          .map((tuple) => tuple[1])
          .filter((index) => index !== INVALID),
      );
    }
    state.push(row);
  }
  return state;
};

const WaveFunctionCollapse = () => {
  const [scale, setScale] = React.useState(2);
  const [width, setWidth] = React.useState(16);
  const [height, setHeight] = React.useState(16);
  const [data, setData] = React.useState(init(width, height, mappings.length));
  const [step, setStep] = React.useState(0);
  const [selected, setSelected] = React.useState(null);

  useMemo(() => {
    setData(init(width, height, mappings.length));
    setStep(0);
    setSelected(null);
  }, [width, height]);

  const mappedData = data.map((row) => {
    return row.map((tile) => {
      if (Array.isArray(tile)) {
        return INVALID;
      }
      return tile;
    });
  });

  const runStep = useCallback(() => {
    setData(collapseStep(data, constraints, INVALID));
    setStep(step + 1);
  }, [data, step]);

  const runCollapse = useCallback(() => {
    setData(collapse(data, constraints, INVALID));
  }, [data]);

  const runRestart = useCallback(() => {
    setData(init(width, height, mappings.length));
    setStep(0);
  }, [width, height]);

  const uncollapsedCount = data.reduce(
    (acc, row) => acc + row.reduce((acc2, tile) => acc2 + (Array.isArray(tile) ? 1 : 0), 0),
    0,
  );

  return (
    <div>
      <Row>
        <Col xs={12} md={6}>
          <Tilemap
            src="/content/wfc/tilemap.png"
            mappings={mappings}
            data={mappedData}
            cellSize={16}
            scale={scale}
            width={128}
            height={128}
            selected={selected}
            onClick={(x, y) => setSelected([x, y])}
          />
        </Col>
        <Col xs={12} md={6}>
          <Card className="mt-3">
            <CardBody>
              <CardTitle>
                <h5>Parameters</h5>
              </CardTitle>
              <p>Width</p>
              <Input type="number" value={width} onChange={(e) => setWidth(e.target.value)} />
              <p>Height</p>
              <Input type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
              <p>Scale</p>
              <Input type="number" value={scale} onChange={(e) => setScale(e.target.value)} />
            </CardBody>
          </Card>
          <Card className="mt-3">
            <CardBody>
              <Button
                className="mt-3"
                block
                outline
                color="primary"
                disabled={uncollapsedCount === 0}
                onClick={runStep}
              >
                {`Run Step (${step})`}
              </Button>
              <Button
                className="mt-3"
                block
                outline
                color="primary"
                disabled={uncollapsedCount === 0}
                onClick={runCollapse}
              >
                Collapse
              </Button>
              <Button className="mt-3" block outline color="primary" onClick={runRestart}>
                Restart
              </Button>
            </CardBody>
          </Card>
          {selected && (
            <Card className="mt-3">
              <CardBody>
                <CardTitle>
                  <h5>{`Selected: ${mappedData[selected[0]][selected[1]]} (${selected[0]}, ${selected[1]})`}</h5>
                </CardTitle>
                <Tilemap
                  src="/content/wfc/tilemap.png"
                  mappings={mappings}
                  data={[[mappedData[selected[0]][selected[1]]]]}
                  cellSize={16}
                  scale={scale * 2}
                  width={128}
                  height={128}
                />
                <h6>Possible Values</h6>
                <pre>
                  <code>{JSON.stringify(data[selected[0]][selected[1]], null, 2)}</code>
                </pre>
                <h6>Constraints</h6>
                <pre>
                  <code>{JSON.stringify(constraints[mappedData[selected[0]][selected[1]]], null, 2)}</code>
                </pre>
              </CardBody>
            </Card>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default WaveFunctionCollapse;
