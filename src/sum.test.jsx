// sum.test.js
import { expect, it } from "vitest";
import { sum } from "./sum";

it("adds 2 + 2 to equal 4", () => {
  expect(sum(2, 2)).toBe(4);
});
