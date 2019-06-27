
import { expect } from 'chai';
import evaluatePokerHand from '../Poker';

describe('Validate Hand', () => {
  it('Should throw if invalid hand size', () => {
    const smallHand = '9s 9s';
    const largeHand = '9s 9s 9s 9s 9s 9s 9s 9s';
    expect(() => evaluatePokerHand(smallHand)).to.throw(Error, 'Hand must consist of 5 cards');
    expect(() => evaluatePokerHand(largeHand)).to.throw(Error, 'Hand must consist of 5 cards');
  });

  describe('Validate Cards', () => {

    it('Should throw if duplicate cards', () => {
      const invalidHand = '9s 9s 4s 5s 6s';
      expect(() => evaluatePokerHand(invalidHand)).to.throw(Error, 'Hand must not contain duplicates');
    });
  
    it('Should throw if a card has an invalid suit or value', () => {
      const invalidHand = 'Ks I 9s 9h 2s';
      expect(() => evaluatePokerHand(invalidHand)).to.throw(Error, 'Invalid card');
    });
  
  });
});

describe('Evaluate Hand', () => {
  it('Should recognize a Royal Flush', () => {
    const result = evaluatePokerHand('10c Jc Qc Kc Ac');
    expect(result).to.equal('Royal Flush');
  });
  
  it('Should recognize a Straight Flush', () => {
    const result = evaluatePokerHand('6c 7c 8c 9c 10c');
    expect(result).to.equal('Straight Flush');
  });

  it('Should recognize a low ace Straight Flush', () => {
    const result = evaluatePokerHand('Ac 2c 4c 5c 3c');
    expect(result).to.equal('Straight Flush');
  });

  it('Should recognize four of a kind and include the card name', () => {
    const result = evaluatePokerHand('Ac Ad Ah As 5h');
    expect(result).to.equal('4 of a Kind (Aces)');
  });

  it('Should recognize a Full House', () => {
    const result = evaluatePokerHand('Ac Ad Ah 5h 5d');
    expect(result).to.equal('Full House');
  });

  it('Should recognize a Flush', () => {
    const result = evaluatePokerHand('5h 6h 9h 2h Ah');
    expect(result).to.equal('Flush');
  });

  it('Should recognize a Straight', () => {
    const result = evaluatePokerHand('5h 6c 9h 8d 7h');
    expect(result).to.equal('Straight');
  });

  it('Should recognize a low ace Straight', () => {
    const result = evaluatePokerHand('5h 4c 3h 2s Ad');
    expect(result).to.equal('Straight');
  });

  it('Should recognize Three of a Kind and include the card name', () => {
    const result = evaluatePokerHand('Kh 6d 6s 5c 6h');
    expect(result).to.equal('3 of a Kind (Sixes)');
  });

  it('Should recognize Two Pair and include the card names', () => {
    const result = evaluatePokerHand('Jh Jd 5h 6s 6c');
    expect(result).to.equal('2 Pair');
  });

  it('Should recognize One Pair and include the card name', () => {
    const result = evaluatePokerHand('7d 7c 8h 10s Kd');
    expect(result).to.equal('Pair of Sevens');
  });

  it('Should default to High Card and the cards name', () => {
    const result = evaluatePokerHand('8d 6h 3d 2s 4h');
    expect(result).to.equal('High Card (Eight)');
  });
});
