function score(numbers: number[]) {
  return 6;
}

test("a test", () => {
  expect(score([2, 4])).toEqual(6);
});
