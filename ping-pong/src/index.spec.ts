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

function score(numbers: Card[]) {
  const sum = numbers.reduce((acc, next) => acc + value(next), 0);

  return numbers.find(x => x === Card.Ace) && sum < 10
    ? {
        lowAce: sum,
        highAce: sum + 9
      }
    : sum;
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
