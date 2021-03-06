const { convertCard, convertCardRankToName } = require('./Card');

function evaluatePokerHand(hand) {
  hand = hand.split(' ');
  validatePokerHand(hand);
  hand = hand.map(convertCard).sort(sortPokerHand);
  
  const isStraight = checkForStraight(hand);
  const isFlush = checkForFlush(hand);

  if (isStraight && isFlush) {
    //special case for Royal Flush
    if (hand[0].rank === 10) {
      return 'Royal Flush';
    }
    return 'Straight Flush';
  }

  const rankCounts = getUniqueRankCounts(hand);

  if (rankCounts[0][1] === 4) {
    const cardName = convertCardRankToName(rankCounts[0][0]);
    return `4 of a Kind (${cardName})`;

  } else if (rankCounts[0][1] === 3 && rankCounts[1][1] === 2) {
    return 'Full House';

  } else if (isFlush) {
    return 'Flush';

  } else if (isStraight) {
    return 'Straight';

  } else if (rankCounts[0][1] === 3) {
    const cardName = convertCardRankToName(rankCounts[0][0]);
    return `3 of a Kind (${cardName})`;

  } else if (rankCounts[0][1] === 2 && rankCounts[1][1] === 2) {
    return '2 Pair';

  } else if (rankCounts[0][1] === 2) {
    const cardName = convertCardRankToName(rankCounts[0][0]);
    return `Pair of ${cardName}`;

  }
  const cardName = convertCardRankToName(hand[4].rank, false);
  return `High Card (${cardName})`;
}

function validatePokerHand(hand) {
  //check length
  if (hand.length !== 5) {
    throw new Error('Hand must consist of 5 cards');
  }
  //check for duplicates
  if (hand.length !== new Set(hand).size) {
    throw new Error('Hand must not contain duplicates');
  }
}

function sortPokerHand(a,b) {
  if (a.rank < b.rank) {
    return -1;
  } else if (a.rank > b.rank) {
    return 1;
  } else {
    return 0;
  }
}

function checkForFlush(hand) {
  for (let i = 1; i < hand.length; i++) {
    if ( hand[i].suit !== hand[i-1].suit ) {
      return false;
    }
  }
  return true;
}

function checkForStraight(hand) {
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

function getUniqueRankCounts(hand) {
  const count = {};
  hand.forEach(card => {
    count[card.rank]
      ? count[card.rank] += 1
      : count[card.rank] = 1;
  });

  return Object
    .entries(count)
    .sort((a,b) => {
      if (a[1] < b[1]) {
        return 1;
      } else if (a[1] > b[1]) {
        return -1;
      } else {
        return 0;
      }
    });
}

module.exports = evaluatePokerHand;