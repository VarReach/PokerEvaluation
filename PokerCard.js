"use strict";
exports.__esModule = true;
;
function convertCard(card) {
    var value;
    var suit;
    if (card.length > 2) {
        value = card.substr(0, 2);
        suit = card[2];
    }
    else {
        value = card[0];
        suit = card[1];
    }
    validateCard(value, suit);
    return {
        rank: getCardRank(value),
        suit: suit
    };
}
exports.convertCard = convertCard;
function validateCard(value, suit) {
    var possibleValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    var possibleSuits = ['s', 'h', 'd', 'c'];
    if (!possibleValues.includes(value) || !possibleSuits.includes(suit)) {
        throw new Error('Invalid card');
    }
}
function getCardRank(value) {
    var result;
    var royalConversionTable = {
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
function convertCardRankToName(rank, plural) {
    if (plural === void 0) { plural = true; }
    var dict = {
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
exports.convertCardRankToName = convertCardRankToName;
