function score(numbers: number[]) {
  return 6;
}

test("score should return the total score of the cards", () => {
  expect(score([2, 4])).toEqual(6);
  expect(score([3, 4, 5])).toEqual(12);
});
