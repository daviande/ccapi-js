import { beforeAll, expect, test } from "vitest";
import { CCAPIClient } from "@repo/ccapi-client";
import { DriveAction } from "./drive.js";

let client: CCAPIClient;
beforeAll(() => {
  client = new CCAPIClient("http://192.168.7.122:8080");
});

test("ExposureAction", async () => {
  const action = new DriveAction("highspeed");
  expect(action.value).toBe("highspeed");
  expect(action.toString()).toBe("DriveAction [value=highspeed]");
  await expect(action.run(client)).resolves.toMatchObject({
    value: "highspeed",
  });
});
