import { beforeAll, expect, test } from "vitest";
import { CCAPIClient } from "@repo/ccapi-client";
import { TVAction } from "./tv.js";

let client: CCAPIClient;
beforeAll(() => {
  client = new CCAPIClient("http://192.168.7.122:8080");
});

test("TVAction", async () => {
  const action = new TVAction('0"5');
  expect(action.value).toBe('0"5');
  expect(action.toString()).toBe('TVAction [value=0"5]');
  await expect(action.run(client)).resolves.toMatchObject({
    value: '0"5',
  });
});
