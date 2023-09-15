import React, { useCallback, useState } from 'react';
import RenderToRoot from 'utils/RenderToRoot';
import PropTypes from 'prop-types';
import ChooseCardModal from 'components/ChooseCardModal';
import withModal from 'utils/withModal';
import { Container, Card, CardHeader, Row, Col, CardBody } from 'reactstrap';

const TileButton = withModal(Col, ChooseCardModal);

const DEFAULT_IMAGE = 'https://cubecobra.com/content/default_card.png';

const Tile = ({ coordinate, count, query, value, setValue }) => {
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

  return (
    <TileButton
      xs={3}
      className="square border tile"
      modalProps={{ title: `${coordinate}: ${query}`, value, setValue: updateValue }}
    >
      <div className="position-absolute w-100">
        <div className="square">
          <img className="w-100 h-100" style={{ objectFit: 'cover' }} src={image} alt={image} />
        </div>
      </div>
      <div className="position-absolute white-text-black-border">
        <b>{coordinate}</b>
      </div>
      <div className="position-absolute w-100">
        <div className="square centered">
          <h1 className="white-text-black-border">{count}</h1>
        </div>
      </div>
      <div className="position-absolute w-100">
        <div className="square d-flex align-items-center align-content-end flex-column">
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
};

const ManaMatrixPage = ({ matrix, date, counts }) => {
  const [values, setValues] = useState([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]);

  const updateValue = useCallback((newValue, row, col) => {
    setValues((old) => {
      const updated = JSON.parse(JSON.stringify(old));
      updated[row][col] = newValue;
      return updated;
    });
  }, []);

  return (
    <Container>
      <Card className="mt-2">
        <CardHeader>
          <h4>Mana Matrix - {date}</h4>
        </CardHeader>
        <CardBody>
          <p>Name a card at the intersection of each column and row.</p>
          <Row noGutters>
            <Col xs={1} className="vertical" />
            <Col xs={3} className="centered">
              {matrix[0][0]}
            </Col>
            <Col xs={3} className="centered">
              {matrix[0][1]}
            </Col>
            <Col xs={3} className="centered">
              {matrix[0][2]}
            </Col>
          </Row>
          <Row noGutters>
            <Col xs={1} className="vertical">
              {matrix[1][0]}
            </Col>
            <Tile
              coordinate="1A"
              count={counts[0][0]}
              query={`${matrix[0][0]} ${matrix[1][0]}`}
              value={values[0][0]}
              setValue={(val) => updateValue(val, 0, 0)}
            />
            <Tile
              coordinate="1B"
              count={counts[0][1]}
              query={`${matrix[0][1]} ${matrix[1][0]}`}
              value={values[0][1]}
              setValue={(val) => updateValue(val, 0, 1)}
            />
            <Tile
              coordinate="1C"
              count={counts[0][2]}
              query={`${matrix[0][2]} ${matrix[1][0]}`}
              value={values[0][2]}
              setValue={(val) => updateValue(val, 0, 2)}
            />
          </Row>
          <Row noGutters>
            <Col xs={1} className="vertical">
              {matrix[1][1]}
            </Col>
            <Tile
              coordinate="2A"
              count={counts[1][0]}
              query={`${matrix[0][0]} ${matrix[1][1]}`}
              value={values[1][0]}
              setValue={(val) => updateValue(val, 1, 0)}
            />
            <Tile
              coordinate="2B"
              count={counts[1][1]}
              query={`${matrix[0][1]} ${matrix[1][1]}`}
              value={values[1][1]}
              setValue={(val) => updateValue(val, 1, 1)}
            />
            <Tile
              coordinate="2C"
              count={counts[1][2]}
              query={`${matrix[0][2]} ${matrix[1][1]}`}
              value={values[1][2]}
              setValue={(val) => updateValue(val, 1, 2)}
            />
          </Row>
          <Row noGutters>
            <Col xs={1} className="vertical">
              {matrix[1][2]}
            </Col>
            <Tile
              coordinate="3A"
              count={counts[2][0]}
              query={`${matrix[0][0]} ${matrix[1][0]}`}
              value={values[2][0]}
              setValue={(val) => updateValue(val, 2, 0)}
            />
            <Tile
              coordinate="3B"
              count={counts[2][1]}
              query={`${matrix[0][1]} ${matrix[1][1]}`}
              value={values[2][1]}
              setValue={(val) => updateValue(val, 2, 1)}
            />
            <Tile
              coordinate="3C"
              count={counts[2][2]}
              query={`${matrix[0][2]} ${matrix[1][2]}`}
              value={values[2][2]}
              setValue={(val) => updateValue(val, 2, 2)}
            />
          </Row>
        </CardBody>
      </Card>
    </Container>
  );
};

ManaMatrixPage.propTypes = {
  matrix: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  date: PropTypes.string.isRequired,
  counts: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
};

export default RenderToRoot(ManaMatrixPage);
