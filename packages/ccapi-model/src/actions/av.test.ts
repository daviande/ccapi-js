import { beforeAll, expect, test } from "vitest";
import { CCAPIClient } from "@repo/ccapi-client";
import { AVAction } from "./av.js";

let client: CCAPIClient;
beforeAll(() => {
  client = new CCAPIClient("http://192.168.7.122:8080");
});

test("TVAction", async () => {
  const action = new AVAction("f5.6");
  expect(action.value).toBe("f5.6");
  expect(action.toString()).toBe("AVAction [value=f5.6]");
  await expect(action.run(client)).resolves.toMatchObject({
    value: "f5.6",
  });
});
