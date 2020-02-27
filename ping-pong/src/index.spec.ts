enum picture {
  King = 10,
  Queen = 10,
  Jack = 10
}

type Card = number | picture;

function score(numbers: Card[]) {
  return numbers.reduce((acc, next) => acc + next, 0);
}

test("score should return the total score of the cards", () => {
  expect(score([2, 4])).toEqual(6);
  expect(score([3, 4, 5])).toEqual(12);
});

test("score should count picture cards as 10", () => {
  expect(score([3, picture.Queen, picture.King])).toEqual(23);
});
