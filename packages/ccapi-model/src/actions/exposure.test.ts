import { beforeAll, expect, test } from "vitest";
import { CCAPIClient } from "@repo/ccapi-client";
import { ExposureAction } from "./exposure.js";

let client: CCAPIClient;
beforeAll(() => {
  client = new CCAPIClient("http://192.168.7.122:8080");
});

test("ExposureAction", async () => {
  const action = new ExposureAction("-1_1/3");
  expect(action.value).toBe("-1_1/3");
  expect(action.toString()).toBe("ExposureAction [value=-1_1/3]");
  await expect(action.run(client)).resolves.toMatchObject({
    value: "-1_1/3",
  });
});
