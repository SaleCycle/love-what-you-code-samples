enum Card {
  King = "King",
  Queen = "Queen",
  Jack = "Jack",
  Ten = "Ten",
  Nine = "Nine",
  Eight = "Eight",
  Seven = "Seven",
  Six = "Six",
  Five = "Five",
  Four = "Four",
  Three = "Three",
  Two = "Two",
  Ace = "Ace"
}

function value(card: Card): number {
  switch (card) {
    case Card.King:
      return 10;
    case Card.Queen:
      return 10;
    case Card.Jack:
      return 10;
    case Card.Ten:
      return 10;
    case Card.Nine:
      return 9;
    case Card.Eight:
      return 8;
    case Card.Seven:
      return 7;
    case Card.Six:
      return 6;
    case Card.Five:
      return 5;
    case Card.Four:
      return 4;
    case Card.Three:
      return 3;
    case Card.Two:
      return 2;
    case Card.Ace:
      return 1;
  }
}

function score(cards: Card[]) {
  const sum = cards.reduce((acc, next) => acc + value(next), 0);

  return cards.find(x => x === Card.Ace) && sum < 10
    ? {
        lowAce: sum,
        highAce: sum + 9
      }
    : sum;
}

interface AceScore {
  lowAce: number;
  highAce: number;
}

function foo(hand: Card[], aceHandler: (aceScore: AceScore) => number): number {
  const handScore = score(hand);
  return isAce(handScore) ? aceHandler(handScore) : handScore;
}

function isAce(handScore: number | AceScore): handScore is AceScore {
  return (handScore as AceScore).lowAce !== undefined;
}

function deal(hand: Card[], deck: Card[]) {
  return foo(hand, x => x.lowAce) < 21
    ? {
        hand: hand.concat(deck[0]),
        deck: deck.slice(1)
      }
    : {
        hand,
        deck
      };
}

function doesPlayerWin(dealersCards: Card[], playersCards: Card[]) {
  const playersScore = foo(playersCards, x => x.highAce);
  const dealersScore = foo(dealersCards, x => x.highAce);

  return playersScore > dealersScore && playersScore <= 21;
}

test("score should return the total score of the cards", () => {
  expect(score([Card.Two, Card.Four])).toEqual(6);
  expect(score([Card.Three, Card.Four, Card.Five])).toEqual(12);
});

test("score should count picture cards as 10", () => {
  expect(score([Card.Three, Card.Queen, Card.King])).toEqual(23);
});

test("score should return a pair of scores when an ace is present", () => {
  expect(score([Card.Three, Card.Ace])).toEqual({
    lowAce: 4,
    highAce: 13
  });
});

test("score should return a single score when there's an ace but the rest of the cards sum to greater than 10", () => {
  expect(score([Card.Three, Card.Queen, Card.Ace])).toEqual(14);
});

test("deal should add a card to a hand from the deck when the current score of the hand is less than 21", () => {
  const currentHand = [Card.Eight];
  const deck = [Card.Five];
  expect(deal(currentHand, deck)).toEqual({
    hand: [Card.Eight, Card.Five],
    deck: []
  });
});

test("deal should return the hand and deck unchanged when the score of the hand is 21 or greater", () => {
  const hand = [Card.Eight, Card.Eight, Card.King];
  const deck = [Card.Five];
  expect(deal(hand, deck)).toEqual({
    hand,
    deck
  });
});

test("deal should add a card to a hand from the deck when the current score of the hand is between 10 and 21 and it contains an ace", () => {
  const hand = [Card.Eight, Card.King, Card.Ace];
  const deck = [Card.Five];
  expect(deal(hand, deck)).toEqual({
    hand: [Card.Eight, Card.King, Card.Ace, Card.Five],
    deck: []
  });
});

test("deal should add a card to a hand from the deck when the current score of the hand is less than 11 and it contains an ace", () => {
  const hand = [Card.Eight, Card.Ace];
  const deck = [Card.Five];
  expect(deal(hand, deck)).toEqual({
    hand: [Card.Eight, Card.Ace, Card.Five],
    deck: []
  });
});

test("an empty deck should return the hand and deck unchanged", () => {
  const hand = [Card.Eight, Card.Ace];
  const deck: Card[] = [];
  expect(deal(hand, deck)).toEqual({
    hand: [Card.Eight, Card.Ace],
    deck: []
  });
});

test("doesPlayerWin should compare two hands and decide which wins", () => {
  const dealerHand = [Card.Eight, Card.King];
  const playerHand = [Card.King, Card.Queen];
  expect(doesPlayerWin(dealerHand, playerHand)).toEqual(true);
});

test("doesPlayerWin should be false if the player is bust", () => {
  const dealerHand = [Card.King, Card.Queen];
  const playerHand = [Card.Eight, Card.King, Card.Eight];
  expect(doesPlayerWin(dealerHand, playerHand)).toEqual(false);
});
