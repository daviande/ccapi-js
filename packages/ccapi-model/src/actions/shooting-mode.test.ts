import { beforeAll, expect, test } from "vitest";
import { CCAPIClient } from "@repo/ccapi-client";
import { ShootingModeAction } from "./shooting-mode.js";

let client: CCAPIClient;
beforeAll(() => {
  client = new CCAPIClient("http://192.168.7.122:8080");
});

test("ShootingModeAction", async () => {
  const action = new ShootingModeAction("av");
  expect(action.value).toBe("av");
  expect(action.toString()).toBe("ShootingModeAction [value=av]");
  await expect(action.run(client)).resolves.toMatchObject({ value: "av" });
});
