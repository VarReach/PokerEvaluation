const { expect } = require('chai');

const evaluateHand = require('../PokerHand');


describe('Hand', () => {

  it('should throw if not given hand', () => {
    expect(evaluateHand).to.throw();
  });

  it('should throw if not given string', () => {
    expect(() => evaluateHand(['5s', '6s'])).to.throw();
  });

  it('should throw if invalid hand size', () => {
    const smallHand = '9s 9s';
    const largeHand = '9s 9s 9s 9s 9s 9s 9s 9s';
    expect(() => evaluateHand(smallHand)).to.throw(Error, 'Hand must consist of 5 cards');
    expect(() => evaluateHand(largeHand)).to.throw(Error, 'Hand must consist of 5 cards');
  });

  describe('Cards', () => {

    it('should throw if duplicate cards', () => {
      const invalidHand = '9s 9s 9s 9s 9s';
      expect(() => evaluateHand(invalidHand)).to.throw(Error, 'Hand must not contain duplicates');
    });

    it('should throw if a card has an invalid suit or value', () => {
      const invalidHand = 'Mk Ih 9s 9n 24s';
      expect(() => evaluateHand(invalidHand)).to.throw(Error, 'Invalid card');
    });

  });
  
});