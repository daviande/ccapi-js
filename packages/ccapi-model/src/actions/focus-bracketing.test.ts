import { beforeAll, expect, test } from "vitest";
import { CCAPIClient } from "@repo/ccapi-client";
import { FocusBracketingAction } from "./focus-bracketing.js";

let client: CCAPIClient;
beforeAll(() => {
  client = new CCAPIClient("http://192.168.7.122:8080");
});

test("FocusBracketingAction", async () => {
  const action = new FocusBracketingAction("disable");
  expect(action.value).toBe("disable");
  expect(action.toString()).toBe("FocusBracketingAction [value=disable]");
  await expect(action.run(client)).resolves.toMatchObject({
    value: "disable",
  });
});
