enum picture {
  King = 10,
  Queen = 10,
  Jack = 10,
  Ace = 1
}
type Card = number | picture;

function score(numbers: Card[]) {
  const sum = numbers.reduce((acc, next) => acc + next, 0);
  return numbers.find(x => x === picture.Ace) === undefined
    ? sum
    : {
        lowAce: sum,
        highAce: sum + 9
      };
}

test("score should return the total score of the cards", () => {
  expect(score([2, 4])).toEqual(6);
  expect(score([3, 4, 5])).toEqual(12);
});

test("score should count picture cards as 10", () => {
  expect(score([3, picture.Queen, picture.King])).toEqual(23);
});

test("score should return a pair of scores when an ace is present", () => {
  expect(score([3, picture.Ace])).toEqual({
    lowAce: 4,
    highAce: 13
  });
});
