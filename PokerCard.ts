interface Card {
  suit: string, rank: number
};

function convertCard(card: string): Card {
  let value: string;
  let suit: string;

  if (card.length > 2) {
    value = card.substr(0, 2);
    suit = card[2];
  } else {
    value = card[0];
    suit = card[1];
  }

  validateCard(value, suit);

  return {
    rank: getCardRank(value),
    suit
  };
}

function validateCard(value: string, suit: string): void {
  const possibleValues = ['1','2','3','4','5','6','7','8','9','10','J','Q','K','A'];
  const possibleSuits = ['s', 'h', 'd', 'c'];

  if (!possibleValues.includes(value) || !possibleSuits.includes(suit)) {
    throw new Error('Invalid card');
  }
}

function getCardRank(value: string): number {
  let result;

  const royalConversionTable = {
    'J': 11,
    'Q': 12,
    'K': 13,
    'A': 14
  };

  (Object.keys(royalConversionTable).includes(value))
    ? result = royalConversionTable[value]
    : result = parseInt(value);

  return result;
}

function convertCardRankToName(rank: string, plural = true) {
  const dict = {
    '2': 'Two',
    '3': 'Three',
    '4': 'Four',
    '5': 'Five',
    '6': 'Six',
    '7': 'Seven',
    '8': 'Eight',
    '9': 'Nine',
    '10': 'Ten',
    '11': 'Jack',
    '12': 'Queen',
    '13': 'King',
    '14': 'Ace'
  };

  if (plural) {
    return (rank === '6')
      ? 'Sixes'
      : dict[rank] + 's';
  }
  return dict[rank];
}

export {
  Card,
  convertCard,
  convertCardRankToName
};