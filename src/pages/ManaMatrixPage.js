/* eslint-disable react/no-array-index-key */
import React, { useCallback, useEffect, useState, useMemo } from 'react';
import RenderToRoot from 'utils/RenderToRoot';
import PropTypes from 'prop-types';
import ChooseCardModal from 'components/ChooseCardModal';
import withModal from 'utils/withModal';
import useLocalStorage from 'hooks/useLocalStorage';
import { Container, Card, CardHeader, CardBody, Button } from 'reactstrap';

const TileButton = withModal('div', ChooseCardModal);

const DEFAULT_IMAGE = 'https://cubecobra.com/content/default_card.png';

const Tile = ({ coordinate, count, query, value, setValue, submitted, correct }) => {
  const [image, setImage] = useState(DEFAULT_IMAGE);

  const updateValue = useCallback(
    async (val) => {
      setValue(val);
      try {
        const card = await fetch(`https://api.scryfall.com/cards/named?fuzzy=${val}`);
        const json = await card.json();
        if (json.card_faces) {
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
    updateValue(value);
    // we only want to run this once, so we can ignore the dependency array
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (submitted) {
    return (
      <div className="square grid-item">
        <div className="tile-content">
          <img
            className={`w-100 h-100 ${correct ? '' : 'greyscale'}`}
            style={{ objectFit: 'cover' }}
            src={image}
            alt={image}
          />
        </div>
        <div className="tile-content white-text-black-border">
          <b>{coordinate}</b>
        </div>
        {!correct && (
          <div className="tile-content">
            <div className="h-100 centered">
              <h1 className="white-text-black-border">❌</h1>
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
      </div>
    );
  }

  return (
    <TileButton
      className="square grid-item clickable"
      modalProps={{ title: `${coordinate}: ${query}`, value, setValue: updateValue }}
    >
      <div className="tile-content">
        <img className="w-100 h-100" style={{ objectFit: 'cover' }} src={image} alt={image} />
      </div>
      <div className="tile-content white-text-black-border">
        <b>{coordinate}</b>
      </div>
      {!correct && (
        <div className="tile-content">
          <div className="h-100 centered">
            <h1 className="white-text-black-border">{count}</h1>
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
  submitted: PropTypes.bool.isRequired,
  correct: PropTypes.bool.isRequired,
};

const MobileText = ({ text, reversed }) => {
  // on mobile we want to break apart the text

  const brokenText = useMemo(() => {
    const operators = ['=', '>', '<'];

    for (const operator of operators) {
      if (text.includes(operator)) {
        const [left, right] = text.split(operator);

        if (reversed) {
          return [right, operator + left];
        }

        return [left + operator, right];
      }
    }

    if (text.includes(':')) {
      const [left, right] = text.split(':');

      if (reversed) {
        return [right, `${left}:`];
      }
      return [`${left}:`, right];
    }

    return [text];
  }, [reversed, text]);

  return (
    <>
      <div className="d-block d-sm-none">
        {brokenText.map((item, index) => (
          <div key={index} className="d-flex justify-content-center">
            <div className="centered flex-grow-1 flex-basis-1">{item}</div>
          </div>
        ))}
      </div>
      <div className="d-none d-sm-block">{text}</div>
    </>
  );
};

MobileText.propTypes = {
  text: PropTypes.string.isRequired,
  reversed: PropTypes.bool,
};

MobileText.defaultProps = {
  reversed: false,
};

const ManaMatrixPage = ({ matrix, date, counts, cards }) => {
  const [values, setValues] = useLocalStorage(`values-${date}`, [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]);
  const [submitted, setSubmitted] = useLocalStorage(`submitted-${date}`, false);
  const [attempts, setAttempts] = useLocalStorage(`attempts-${date}`, 0);

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
    console.log(values);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        console.log(`Checking ${i}, ${j}`);
        const answer = values[i][j];
        if (
          cards[i][j].some((card) => {
            if (card.toLowerCase().trim() === answer.toLowerCase().trim()) {
              return true;
            }

            if (
              card
                .split('//')
                .map((x) => x.trim())
                .includes(answer.toLowerCase().trim())
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

  const correctText = `My results for today's Mana Matrix:\n${correct
    .map((row) => row.map((item) => (item ? '✅' : '❌')).join(' '))
    .join('\n')}\nAnd it only took me ${attempts} attempt${
    attempts > 1 ? 's' : ''
  }!\nTry it for yourself here: https://gdekker.io/manamatrix`;

  return (
    <Container>
      <Card className="mt-2">
        <CardHeader>
          <h4>Mana Matrix - {date}</h4>
        </CardHeader>
        <CardBody>
          {submitted ? (
            <Card>
              <CardHeader>
                <h5>Results</h5>
              </CardHeader>
              <CardBody>
                <p>
                  With {attempts} attempt{attempts > 1 ? 's' : ''}, you got {correct.flat().filter((x) => x).length} out
                  of 9 correct.
                  <br />
                  {
                    [
                      'Today might not be your day.',
                      'At least you got one right!',
                      'Not too bad!',
                      'Nice!',
                      'Great job!',
                      'Wow!',
                      'Amazing!',
                      'Incredible!',
                      'A perfect score!',
                    ][correct.flat().filter((x) => x).length]
                  }
                  <br />
                  <br />
                  <p>
                    Share your results! Copy and paste your results here.
                    <br />
                    <Card className="p-2 mt-2">
                      <p>My results for today's Mana Matrix:</p>
                      {correct.map((row) => (
                        <p>{row.map((item) => (item ? '✅' : '❌')).join(' ')}</p>
                      ))}
                      <p>
                        And it only took me {attempts} attempt{attempts > 1 ? 's' : ''}!
                      </p>
                      <p>
                        Try it for yourself here:{' '}
                        <a href="https://gdekker.io/manamatrix">https://gdekker.io/manamatrix</a>
                      </p>
                      <Button
                        block
                        outline
                        color="success"
                        className="mt-3"
                        onClick={() => navigator.clipboard.writeText(correctText)}
                      >
                        Copy Results
                      </Button>
                    </Card>
                  </p>
                </p>
                <Button block outline color="success" className="mt-3" onClick={() => setSubmitted(false)}>
                  Try Again
                </Button>
              </CardBody>
            </Card>
          ) : (
            <>Name a card at the intersection of each column and row. The numbers indicate how many cards match.</>
          )}
        </CardBody>
        <div className="d-flex justify-content-center">
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
            <MobileText text={matrix[1][0]} reversed />
          </div>
          <div className="grid-container flex-grow">
            <Tile
              coordinate="1A"
              count={counts[0][0]}
              query={`${matrix[0][0]} ${matrix[1][0]}`}
              value={values[0][0]}
              setValue={(val) => updateValue(val, 0, 0)}
              submitted={submitted}
              correct={correct[0][0]}
            />
            <Tile
              coordinate="1B"
              count={counts[0][1]}
              query={`${matrix[0][1]} ${matrix[1][0]}`}
              value={values[0][1]}
              setValue={(val) => updateValue(val, 0, 1)}
              submitted={submitted}
              correct={correct[0][1]}
            />
            <Tile
              coordinate="1C"
              count={counts[0][2]}
              query={`${matrix[0][2]} ${matrix[1][0]}`}
              value={values[0][2]}
              setValue={(val) => updateValue(val, 0, 2)}
              submitted={submitted}
              correct={correct[0][2]}
            />
          </div>
        </div>
        <div className="d-flex">
          <div xs={1} className="vertical flex-shrink">
            <MobileText text={matrix[1][1]} reversed />
          </div>
          <div className="grid-container flex-grow">
            <Tile
              coordinate="2A"
              count={counts[1][0]}
              query={`${matrix[0][0]} ${matrix[1][1]}`}
              value={values[1][0]}
              setValue={(val) => updateValue(val, 1, 0)}
              submitted={submitted}
              correct={correct[1][0]}
            />
            <Tile
              coordinate="2B"
              count={counts[1][1]}
              query={`${matrix[0][1]} ${matrix[1][1]}`}
              value={values[1][1]}
              setValue={(val) => updateValue(val, 1, 1)}
              submitted={submitted}
              correct={correct[1][1]}
            />
            <Tile
              coordinate="2C"
              count={counts[1][2]}
              query={`${matrix[0][2]} ${matrix[1][1]}`}
              value={values[1][2]}
              setValue={(val) => updateValue(val, 1, 2)}
              submitted={submitted}
              correct={correct[1][2]}
            />
          </div>
        </div>
        <div className="d-flex">
          <div xs={1} className="vertical flex-shrink py-2">
            <MobileText text={matrix[1][2]} reversed />
          </div>
          <div className="grid-container flex-grow">
            <Tile
              coordinate="3A"
              count={counts[2][0]}
              query={`${matrix[0][0]} ${matrix[1][2]}`}
              value={values[2][0]}
              setValue={(val) => updateValue(val, 2, 0)}
              submitted={submitted}
              correct={correct[2][0]}
            />
            <Tile
              coordinate="3B"
              count={counts[2][1]}
              query={`${matrix[0][1]} ${matrix[1][2]}`}
              value={values[2][1]}
              setValue={(val) => updateValue(val, 2, 1)}
              submitted={submitted}
              correct={correct[2][1]}
            />
            <Tile
              coordinate="3C"
              count={counts[2][2]}
              query={`${matrix[0][2]} ${matrix[1][2]}`}
              value={values[2][2]}
              setValue={(val) => updateValue(val, 2, 2)}
              submitted={submitted}
              correct={correct[2][2]}
            />
          </div>
        </div>
        <CardBody>
          {!submitted && (
            <Button
              block
              outline
              color="success"
              className="mt-3"
              onClick={() => {
                setSubmitted(true);
                setAttempts(attempts + 1);
              }}
            >
              Check your score!
            </Button>
          )}
        </CardBody>
      </Card>
    </Container>
  );
};

ManaMatrixPage.propTypes = {
  matrix: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  date: PropTypes.string.isRequired,
  counts: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  cards: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
};

export default RenderToRoot(ManaMatrixPage);
