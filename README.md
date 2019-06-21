# Poker Hand Evaluation

Write some code that will evaluate a poker hand and determine its rank.

#### Examples

* Hand: Ah As 10c 7d 6s (Pair of Aces)
* Hand: Kh Kc 3s 3h 2d (2 Pair)
* Hand: Kh Qh 6h 2h 9h (Flush)

## Getting Started

#### Setup

* Clone this repo to your local machine using `https://github.com/VarReach/PokerEvaluation`

#### Running

* Optional: Import `evaluatePokerHand` from `PokerHand.js` into a new file
```
const evaluatePokerHand = require('./PokerHand');
```

* Provide the function with an appropriate string
```
evaluatePokerHand('9s 2d Ac Kh Qd');

List of values: 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K, A
List of Suits: d, c, h, s
```
* Log the result and run node
```
console.log(evaluatePokerHand('10s Js Ks Qs As'));

node PokerHand.js

...

Royal Flush
```

## Tests

#### Running

* Make sure dev packages are installed
```
npm install
```
* Run tests
```
npm test
```

* [x] Validation:
  * [x] Must have 5 cards
  * [x] All cards must have a valid suit and value
  * [x] No duplicate cards

* [x] Evaluation:
  * [x] Check for a 'Royal Flush'
  * [x] Check for a 'Straight Flush'
  * [x] Check for '4 of a Kind'
  * [x] Check for a 'Full House'
  * [x] Check for a 'Flush'
  * [x] Check for a 'Straight'
  * [x] Check for '3 of a Kind'
  * [x] Check for '2 Pairs'
  * [x] Check for 'One Pair'
  * [x] Default, return 'High Card'
  * [x] Include card name:
    * [x] '4 of a Kind'
    * [x] '3 of a Kind'
    * [x] 'One Pair'
    * [x] 'High Card
    
## Limitations

* Limited to standard 5 Card Draw
* No wild cards (Jokers)

## Tech

* Chai
* Mocha
* ES6