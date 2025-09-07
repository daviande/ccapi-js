import { beforeAll, expect, test } from "vitest";
import { CCAPIClient } from "@repo/ccapi-client";
import { ISOAction } from "./iso.js";

let client: CCAPIClient;
beforeAll(() => {
  client = new CCAPIClient("http://192.168.7.122:8080");
});

test("ISOAction", async () => {
  const action = new ISOAction("auto");
  expect(action.value).toBe("auto");
  expect(action.toString()).toBe("ISOAction [value=auto]");
  await expect(action.run(client)).resolves.toMatchObject({
    value: "auto",
  });
});
