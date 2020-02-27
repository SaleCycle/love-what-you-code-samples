function score(numbers: number[]) {
  return numbers.reduce((acc, next) => acc + next, 0);
}

test("score should return the total score of the cards", () => {
  expect(score([2, 4])).toEqual(6);
  expect(score([3, 4, 5])).toEqual(12);
});

test("score should count picture cards as 10", () => {
  expect(score([3, Queen, King])).toEqual(23);
});
