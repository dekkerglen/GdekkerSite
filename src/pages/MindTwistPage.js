/* eslint-disable react/no-array-index-key */
import React, { useCallback, useEffect, useState, useMemo } from 'react';
import RenderToRoot from 'utils/RenderToRoot';
import PropTypes from 'prop-types';
import ChooseCardModal from 'components/ChooseCardModal';
import withModal from 'utils/withModal';
import useLocalStorage from 'hooks/useLocalStorage';
import { Container, Card, CardHeader } from 'reactstrap';

const TileButton = withModal('div', ChooseCardModal);

const DEFAULT_IMAGE = 'https://cubecobra.com/content/default_card.png';

const Tile = ({ coordinate, count, query, value, setValue, correct }) => {
  const [image, setImage] = useState(DEFAULT_IMAGE);

  const updateValue = useCallback(
    async (val) => {
      setValue(val);
      try {
        const card = await fetch(`https://api.scryfall.com/cards/named?fuzzy=${val}`);
        const json = await card.json();
        if (json.card_faces && json.card_faces[0].image_uris) {
          setImage(json.card_faces[0].image_uris.art_crop || DEFAULT_IMAGE);
        } else {
          setImage(json.image_uris.art_crop || DEFAULT_IMAGE);
        }
      } catch (e) {
        setImage(DEFAULT_IMAGE);
      }
    },
    [setValue],
  );

  useEffect(() => {
    if (value && value !== '') {
      updateValue(value);
    }
    // we only want to run this once, so we can ignore the dependency array
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(image);

  return (
    <TileButton
      className="square grid-item clickable"
      modalProps={{ title: `${coordinate}: ${query}`, value, setValue: updateValue }}
    >
      <div className="tile-content">
        <img
          className={`w-100 h-100 ${correct ? '' : 'greyscale'}`}
          style={{ objectFit: 'cover' }}
          src={image}
          alt={image}
        />
      </div>
      <div className="tile-content white-text-black-border">
        <h1>{coordinate}</h1>
      </div>
      {!correct && (
        <div className="tile-content">
          <div className="h-100 centered">
            {value !== '' && <h1 className="white-text-black-border">❌</h1>}
            <h1 className="white-text-black-border">{count}</h1>
          </div>
        </div>
      )}
      {correct && (
        <div className="tile-content">
          <div className="h-100 centered">
            <h1 className="white-text-black-border">✅</h1>
          </div>
        </div>
      )}
      <div className="tile-content">
        <div className="h-100 centered d-flex align-items-center align-content-end flex-column">
          <div className="mt-auto white-text-black-border">
            <b>{value}</b>
          </div>
        </div>
      </div>
    </TileButton>
  );
};

Tile.propTypes = {
  coordinate: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  query: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  correct: PropTypes.bool.isRequired,
};

const MobileText = ({ text }) => {
  return <h1>{text}</h1>;
};

MobileText.propTypes = {
  text: PropTypes.string.isRequired,
};

const removeAccents = (str) => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

const ManaMatrixPage = ({ matrix, date, counts, cards }) => {
  const [values, setValues] = useLocalStorage(`values-${date}`, [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]);

  const updateValue = useCallback(
    (newValue, row, col) => {
      setValues((old) => {
        const updated = JSON.parse(JSON.stringify(old));
        updated[row][col] = newValue;
        return updated;
      });
    },
    [setValues],
  );

  const correct = useMemo(() => {
    const result = [
      [false, false, false],
      [false, false, false],
      [false, false, false],
    ];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const answer = values[i][j];
        if (
          cards[i][j].some((card) => {
            if (card.toLowerCase().trim() === answer.toLowerCase().trim()) {
              return true;
            }
            if (
              card
                .split('//')
                .map((x) => x.trim().toLowerCase())
                .map(removeAccents)
                .includes(removeAccents(answer).toLowerCase().trim())
            ) {
              return true;
            }
            return false;
          })
        ) {
          result[i][j] = true;
        }
      }
    }

    return result;
  }, [values, cards]);

  return (
    <div className="root-container bg-dark">
      <Container>
        <Card className="mt-2" color="dark">
          <CardHeader>
            <h4>Mana Matrix</h4>
          </CardHeader>
          <div className="d-flex justify-content-center">
            <div xs={1} className="vertical flex-shrink">
              <MobileText text="‎" />
            </div>
            <div className="centered flex-grow-1 flex-basis-1">
              <MobileText text={matrix[0][0]} />
            </div>
            <div className="centered flex-grow-1 flex-basis-1">
              {' '}
              <MobileText text={matrix[0][1]} />
            </div>
            <div className="centered flex-grow-1 flex-basis-1">
              {' '}
              <MobileText text={matrix[0][2]} />
            </div>
          </div>
          <div className="d-flex">
            <div xs={1} className="vertical flex-shrink">
              <MobileText text={matrix[1][0]} />
            </div>
            <div className="grid-container flex-grow">
              <Tile
                coordinate="1A"
                count={counts[0][0]}
                query={`${matrix[0][0]} ${matrix[1][0]}`}
                value={values[0][0]}
                setValue={(val) => updateValue(val, 0, 0)}
                correct={correct[0][0]}
              />
              <Tile
                coordinate="1B"
                count={counts[0][1]}
                query={`${matrix[0][1]} ${matrix[1][0]}`}
                value={values[0][1]}
                setValue={(val) => updateValue(val, 0, 1)}
                correct={correct[0][1]}
              />
              <Tile
                coordinate="1C"
                count={counts[0][2]}
                query={`${matrix[0][2]} ${matrix[1][0]}`}
                value={values[0][2]}
                setValue={(val) => updateValue(val, 0, 2)}
                correct={correct[0][2]}
              />
            </div>
          </div>
          <div className="d-flex">
            <div xs={1} className="vertical flex-shrink">
              <MobileText text={matrix[1][1]} />
            </div>
            <div className="grid-container flex-grow">
              <Tile
                coordinate="2A"
                count={counts[1][0]}
                query={`${matrix[0][0]} ${matrix[1][1]}`}
                value={values[1][0]}
                setValue={(val) => updateValue(val, 1, 0)}
                correct={correct[1][0]}
              />
              <Tile
                coordinate="2B"
                count={counts[1][1]}
                query={`${matrix[0][1]} ${matrix[1][1]}`}
                value={values[1][1]}
                setValue={(val) => updateValue(val, 1, 1)}
                correct={correct[1][1]}
              />
              <Tile
                coordinate="2C"
                count={counts[1][2]}
                query={`${matrix[0][2]} ${matrix[1][1]}`}
                value={values[1][2]}
                setValue={(val) => updateValue(val, 1, 2)}
                correct={correct[1][2]}
              />
            </div>
          </div>
          <div className="d-flex">
            <div xs={1} className="vertical flex-shrink py-2">
              <MobileText text={matrix[1][2]} />
            </div>
            <div className="grid-container flex-grow">
              <Tile
                coordinate="3A"
                count={counts[2][0]}
                query={`${matrix[0][0]} ${matrix[1][2]}`}
                value={values[2][0]}
                setValue={(val) => updateValue(val, 2, 0)}
                correct={correct[2][0]}
              />
              <Tile
                coordinate="3B"
                count={counts[2][1]}
                query={`${matrix[0][1]} ${matrix[1][2]}`}
                value={values[2][1]}
                setValue={(val) => updateValue(val, 2, 1)}
                correct={correct[2][1]}
              />
              <Tile
                coordinate="3C"
                count={counts[2][2]}
                query={`${matrix[0][2]} ${matrix[1][2]}`}
                value={values[2][2]}
                setValue={(val) => updateValue(val, 2, 2)}
                correct={correct[2][2]}
              />
            </div>
          </div>
        </Card>
      </Container>
    </div>
  );
};

ManaMatrixPage.propTypes = {
  matrix: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  date: PropTypes.string.isRequired,
  counts: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  cards: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
};

export default RenderToRoot(ManaMatrixPage);
