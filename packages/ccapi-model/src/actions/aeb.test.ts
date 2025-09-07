import { beforeAll, expect, test } from "vitest";
import { CCAPIClient } from "@repo/ccapi-client";
import { AEBAction } from "./aeb.js";

let client: CCAPIClient;
beforeAll(() => {
  client = new CCAPIClient("http://192.168.7.122:8080");
});

test("AEBAction", async () => {
  const action = new AEBAction("+1.0");
  expect(action.value).toBe("+1.0");
  expect(action.toString()).toBe("AEBAction [value=+1.0]");
  await expect(action.run(client)).resolves.toMatchObject({
    value: "+1.0",
  });
});
