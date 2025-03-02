import { expect, it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

export const youSayGoodbyeISayHello = <TGreet extends "goodbye" | "hello">(
  greeting: TGreet
): TGreet extends "goodbye" ? "hello" : "goodbye" => {
  return (greeting === "goodbye" ? "hello" : "goodbye") as any;
};

it("Should return goodbye when hello is passed in", () => {
  const result = youSayGoodbyeISayHello("hello");

  type test = [Expect<Equal<typeof result, "goodbye">>];

  expect(result).toEqual("goodbye");
});

it("Should return hello when goodbye is passed in", () => {
  const result = youSayGoodbyeISayHello("goodbye");

  type test = [Expect<Equal<typeof result, "hello">>];

  expect(result).toEqual("hello");
});
