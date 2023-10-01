/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import React, { useCallback, useEffect, useState } from 'react';
import { copyGrid } from 'demos/limitedspace/utils';

const Grid = ({ visibleGrid, setVisibleGrid, updateGrid }) => {
  const [dragData, setDragData] = useState(null);
  const [mousePosition, setMousePosition] = useState([0, 0]);
  const [gridPosition, setGridPosition] = useState([0, 0]);

  const handleDragStart = useCallback(
    (x, y, source) => {
      if (visibleGrid[y][x] === '') {
        return;
      }
      setDragData({
        x,
        y,
        value: visibleGrid[y][x],
        source,
      });
      setVisibleGrid((oldGrid) => {
        const newGrid = copyGrid(oldGrid);
        newGrid[y][x] = '';
        return newGrid;
      });
    },
    [setVisibleGrid, visibleGrid],
  );

  const handleDragEnd = useCallback(() => {
    if (dragData) {
      if (dragData.source === 'grid') {
        if (dragData.x === gridPosition[0] && dragData.y === gridPosition[1]) {
          // put it back
          const newGrid = copyGrid(visibleGrid);
          newGrid[dragData.y][dragData.x] = dragData.value;
          updateGrid(newGrid);
        } else {
          // swap
          const newGrid = copyGrid(visibleGrid);
          newGrid[dragData.y][dragData.x] = visibleGrid[gridPosition[1]][gridPosition[0]];
          newGrid[gridPosition[1]][gridPosition[0]] = dragData.value;
          updateGrid(newGrid);
        }
      }

      setDragData(null);
    }
  }, [dragData, gridPosition, updateGrid, visibleGrid]);

  useEffect(() => {
    document.onmousemove = (e) => {
      setMousePosition([e.clientX, e.clientY]);
    };
  }, []);

  useEffect(() => {
    document.onmouseup = () => {
      handleDragEnd();
    };
  }, [handleDragEnd]);
  return (
    <div>
      {dragData && (
        <div
          style={{
            position: 'fixed',
            left: mousePosition[0] - 50,
            top: mousePosition[1] - 50,
            fontSize: '50px',
            zIndex: 1000,
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          {dragData.value}
        </div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 20%)', gridGap: '1px' }}>
        {visibleGrid.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${x}-${y}`}
              className={cell === '' ? 'garden-tile' : 'garden-tile clickable'}
              style={{
                backgroundColor: 'white',
                padding: '10px',
                fontSize: '50px',
                textAlign: 'center',
                aspectRatio: '1/1',
                border: '1px solid black',
                userSelect: 'none',
              }}
              onMouseEnter={() => {
                setGridPosition([x, y]);
              }}
              onMouseDown={() => {
                handleDragStart(x, y, 'grid');
              }}
            >
              {cell}
            </div>
          )),
        )}
      </div>
    </div>
  );
};

export default Grid;
