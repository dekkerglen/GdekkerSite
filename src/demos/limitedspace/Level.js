/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Alert } from 'reactstrap';

const Level = ({ level, grid, setGrid }) => {
  const { Extra } = level;

  return (
    <Alert color={level.isValid(grid) ? undefined : 'danger'} className="mt-2">
      {level.isValid(grid) ? '✅' : '❌'} {level.level + 1}. {level.description}{' '}
      {level.Extra && <Extra grid={grid} setGrid={setGrid} />}
    </Alert>
  );
};

export default Level;
