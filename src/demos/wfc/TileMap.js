/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';

const Cell = ({ src, xOffset, yOffset, cellSize, scale, width, height, onClick, x, y, selected }) => {
  const divStyle = {
    width: cellSize * scale,
    height: cellSize * scale,
    overflow: 'hidden',
  };
  const imgStyle = {
    margin: `-${yOffset * scale}px 0 0 -${xOffset * scale}px`,
    width: width * scale,
    height: height * scale,
  };

  return (
    <div style={divStyle}>
      <img
        className={`cell ${selected && 'selected'}`}
        src={src}
        style={imgStyle}
        alt="cell"
        onClick={() => onClick(x, y)}
      />
    </div>
  );
};

Cell.propTypes = {
  src: PropTypes.string.isRequired,
  xOffset: PropTypes.number.isRequired,
  yOffset: PropTypes.number.isRequired,
  cellSize: PropTypes.number.isRequired,
  scale: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
};

Cell.defaultProps = {
  onClick: () => {},
  selected: false,
};

const Tilemap = ({ src, cellSize, mappings, data, scale, width, height, onClick, selected }) => {
  return (
    <div className="d-flex flex-column">
      {data.map((row, rowIndex) => (
        <div className="d-flex flex-row">
          {row.map((cell, colIndex) => {
            return (
              <Cell
                id={`${rowIndex}-${colIndex}`}
                src={src}
                xOffset={mappings[cell][0] * cellSize}
                yOffset={mappings[cell][1] * cellSize}
                cellSize={cellSize}
                scale={scale}
                width={width}
                height={height}
                onClick={onClick}
                selected={selected && selected[0] === rowIndex && selected[1] === colIndex}
                x={rowIndex}
                y={colIndex}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

Tilemap.propTypes = {
  src: PropTypes.string.isRequired,
  mappings: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  cellSize: PropTypes.number.isRequired,
  scale: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  selected: PropTypes.arrayOf(PropTypes.number),
};

Tilemap.defaultProps = {
  onClick: () => {},
  selected: null,
};

export default Tilemap;
