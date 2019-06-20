function evaluateHand(hand) {
  hand = hand.split(' ');

  validateHand(hand);

  hand = hand.map(convertCards).sort(sortHand);
  
  const isStraight = checkStraight(hand);
  const isFlush = checkFlush(hand);

  if (isStraight && isFlush) {
    //special case for Royal Flush
    if (hand[0].rank === '10') {
      return 'Royal Flush';
    }
    return 'Straight Flush';
  }

  const uniqueRanks = getUniqueRanks(hand);
  
  if (uniqueRanks === '41') {
    return 'Four of a kind';
  } else if (uniqueRanks === '32') {
    return 'Full house';
  } else if (isFlush) {
    return 'Flush';
  } else if (isStraight) {
    return 'Straight';
  } else if (uniqueRanks === '221') {
    return 'Two pair';
  } else if (uniqueRanks === '2111') {
    return 'One pair';
  } else {
    return 'High card';
  }
}

function validateHand(hand) {
  //check length
  if (hand.length !== 5) {
    throw new Error('Hand must consist of 5 cards');
  }

  //check for duplicates
  if (hand.length !== new Set(hand).size) {
    throw new Error('Hand must not contain duplicates');
  }
}

function convertCards(card) {
  let value;
  let suit;

  if (card.length > 2) {
    value = card.substr(0,2);
    suit = card[2];
  } else {
    value = card[0];
    suit = card[1];
  }

  validateCard(value, suit);

  return {
    rank: getCardRank(value),
    suit,
  };
}

function validateCard(value, suit) {
  const possibleValues = ['1','2','3','4','5','6','7','8','9','10','J','Q','K','A'];
  const possibleSuits = ['s', 'h', 'd', 'c'];

  if (!possibleValues.includes(value) || !possibleSuits.includes(suit)) {
    throw new Error('Invalid card');
  }
}

function getCardRank(value) {
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

function sortHand(a,b) {
  return (a.rank < b.rank)
    ? -1
    : 1;
}

function checkFlush(hand) {
  for (let i = 1; i < hand.length; i++) {
    if ( hand[i].suit !== hand[i-1].suit ) {
      return false;
    }
  }
  return true;
}

function checkStraight(hand) {
  for (let i = 1; i < hand.length; i++) {
    if ( hand[i].rank !== (hand[i-1].rank + 1)) {
      //special case for low Ace
      if (i === 4 && hand[i].rank === 14) {
        return true;
      }

      return false;
    }
  }
  return true;
}

function getUniqueRanks(hand) {
  const count = {};
  hand.forEach(card => {
    count[card.rank]
      ? count[card.rank] += 1
      : count[card.rank] = 1;
  });
  return Object.values(count).join('');
}

console.log(evaluateHand('6s 6h 6c 6d 10s'));

module.exports = evaluateHand;