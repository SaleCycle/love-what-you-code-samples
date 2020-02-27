export enum Card {
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

export function score(cards: Card[]) {
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

function scoreConsideringAce(
  hand: Card[],
  aceHandler: (aceScore: AceScore) => number
): number {
  const handScore = score(hand);
  return isAce(handScore) ? aceHandler(handScore) : handScore;
}

function isAce(handScore: number | AceScore): handScore is AceScore {
  return (handScore as AceScore).lowAce !== undefined;
}

export function deal(hand: Card[], deck: Card[]) {
  return scoreConsideringAce(hand, x => x.lowAce) < 21 && deck.length > 0
    ? {
        hand: hand.concat(deck[0]),
        deck: deck.slice(1)
      }
    : {
        hand,
        deck
      };
}

export function doesPlayerWin(dealersCards: Card[], playersCards: Card[]) {
  const playersScore = scoreConsideringAce(playersCards, x => x.highAce);
  const dealersScore = scoreConsideringAce(dealersCards, x => x.highAce);

  return playersScore > dealersScore && playersScore <= 21;
}
