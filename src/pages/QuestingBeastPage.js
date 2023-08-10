import React from 'react';
import RenderToRoot from 'utils/RenderToRoot';
import PropTypes from 'prop-types';
import seedrandom from 'seedrandom';

import { Row, Col, Button } from 'reactstrap';

const keywords = [
  'Vigilance',
  'Deathtouch',
  'Haste',
  'Defender',
  'First Strike',
  'Flying',
  'Hexproof',
  'Ward 2',
  'Intimidate',
  'Lifelink',
  'Flanking',
  'Reach',
];

const possibleAbilities = [
  'The Questing Beast can’t be blocked by creatures with power 2 or less.',
  'Combat damage that would be dealt by creatures you control can’t be prevented.',
  'Whenever The Questing Beast deals combat damage to an opponent, it deals that much damage to target planeswalker that player controls.',
  'Whenever an opponent casts a spell or a planeswalker ability that targets a creature you control, The Questing Beast deals 2 damage to that player.',
  'If The Questing Beast is attacking a planeswalker, you may have The Questing Beast deal its combat damage as though it weren’t being blocked.',
  'When The Questing Beast attacks, target opponent discards a card.',
  'When The Questing Beast enters the battlefield, you gain life equal to the number of forests you control.',
  "The Questing Beast can't be blocked by creatures with converted mana cost 3 or less.",
  'Whenever The Questing Beast deals combat damage to a player, you may draw a card.',
  "The Questing Beast has hexproof as long as it's attacking.",
  'Whenever The Questing Beast blocks or becomes blocked, each player gains 3 life.',
  "The Questing Beast has protection from artifacts named 'The Holy Grail.'",
  'When The Questing Beast attacks, you may return target enchantment card from your graveyard to your hand.',
  "The Questing Beast's power and toughness are each equal to the number of cards in your hand.",
  'Whenever The Questing Beast deals combat damage to a player, that player discards a card',
  'Whenever The Questing Beast enters the battlefield, you may search your library for a basic land card and put it onto the battlefield tapped.',
  'Whenever The Questing Beast becomes tapped, you may untap target permanent.',
  'Whenever The Questing Beast deals combat damage, untap all lands you control.',
  "The Questing Beast can't be blocked by creatures with odd power.",
  'The Questing Beast can block any number of creatures.',
  'When The Questing Beast becomes the target of a spell or ability, sacrifice it.',
  'Whenever The Questing Beast deals combat damage to a player, you may sacrifice a land. If you do, create a 1/1 white Angel creature token with flying.',
  'Whenever The Questing Beast becomes tapped, you may tap target creature an opponent controls.',
  'Whenever The Questing Beast deals combat damage to a player, that player exiles the top card of their library.',
  'Whenever The Questing Beast becomes blocked, untap all creatures you control.',
  'Whenever a creature enters the battlefield under your control, put a +1/+1 counter on The Questing Beast.',
  "The Questing Beast can't be blocked by creatures with flying.",
  'Whenever The Questing Beast becomes untapped, you may return target creature card from your graveyard to your hand.',
  'Whenever The Questing Beast deals combat damage to a player, you may have that player shuffle their library.',
  'Whenever The Questing Beast attacks, you may tap target land.',
  'Whenever The Questing Beast becomes the target of a spell or ability, flip a coin. If you win the flip, draw three cards.',
  'Protection from squirrels.',
  'Whenever The Questing Beast deals combat damage, you may search your library for a Knight card and put it into your graveyard.',
  'Whenever The Questing Beast attacks, each player gains 2 life.',
  "The Questing Beast's power and toughness are each equal to the number of lands you control.",
  'When The Questing Beast enters the battlefield, each player may discard their hand and draw seven cards.',
  'Whenever The Questing Beast becomes blocked, you may return target creature from your graveyard to the battlefield.',
  'Whenever The Questing Beast deals combat damage to a player, you may sacrifice a creature. If you do, create a 3/3 green Beast creature token.',
  'Whenever The Questing Beast becomes untapped, you may put a loyalty counter on target planeswalker you control.',
  "Whenever The Questing Beast deals combat damage, you may reveal a card at random from your hand. If it's a creature card, draw two cards.",
  'Whenever The Questing Beast becomes the target of a spell or ability, you may pay X. If you do, create X 1/1 green Elf creature tokens.',
  'Whenever The Questing Beast deals combat damage to a player, you lose life equal to the damage dealt.',
  "The Questing Beast can't attack or block unless you pay 2 life.",
  'Whenever a creature enters the battlefield, you lose 1 life.',
  'Whenever The Questing Beast deals combat damage to a player, that player draws a card.',
  'Whenever a player casts a green spell, put a -1/-1 counter on The Questing Beast.',
  'Whenever The Questing Beast becomes the target of a spell or ability, sacrifice a land.',
  "The Questing Beast can't attack or block unless you sacrifice a creature.",
  'Whenever The Questing Beast becomes the target of a spell or ability, discard a card at random.',
  'Whenever a creature dies, put a -1/-1 counter on The Questing Beast.',
];

const nDistinct = (n, arr) => {
  const result = [];
  for (let i = 0; i < n; i++) {
    const index = Math.floor(Math.random() * arr.length);
    result.push(arr[index]);
    arr.splice(index, 1);
  }
  return result;
};

const nKeywords = (n) => {
  return nDistinct(n, keywords);
};

const generateAbilities = (seed) => {
  seedrandom(seed, { global: true });

  return [
    nKeywords(Math.floor(Math.random() * 3) + 1).join(', '),
    ...nDistinct(Math.floor(Math.random() * 3) + 2, possibleAbilities),
  ];
};

const QuestingBeastPage = ({ seed }) => {
  const abilities = generateAbilities(seed);

  return (
    <Row>
      <Col xs="12" md="6">
        <div className="d-flex flex-column align-items-center">
          <img src="/content/qbtop.png" alt="The Questing Beast Top" className="w-100" />
          <div
            className="flex-grow-1 w-100 d-flex flex-column"
            style={{
              backgroundImage: 'url(/content/qbmid.png)',
              backgroundSize: '100%',
              paddingRight: '10%',
              paddingLeft: '10%',
            }}
          >
            {abilities.map((ability) => (
              <h5 className="mt-2">{ability}</h5>
            ))}
          </div>
          <img src="/content/qbbot.png" alt="The Questing Beast Bottom" className="w-100" />
        </div>
        <Button block outline color="success" className="mt-3" href="/questingbeast">
          New The Questing Beast
        </Button>
      </Col>
    </Row>
  );
};

QuestingBeastPage.propTypes = {
  seed: PropTypes.string.isRequired,
};

export default RenderToRoot(QuestingBeastPage);
