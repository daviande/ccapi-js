import { beforeAll, expect, test } from "vitest";
import { CCAPIClient } from "@repo/ccapi-client";
import { ShootingModeAction } from "./shooting-mode.js";

let client: CCAPIClient;
beforeAll(() => {
  client = new CCAPIClient("http://192.168.7.122:8080");
});

test("ShootingModeAction", async () => {
  const action = new ShootingModeAction(client, "av");
  expect(action.value).toBe("av");
  expect(action.toString()).toBe("ShootingModeAction [value=av]");
  await expect(action.run()).resolves.toMatchObject({ value: "av" });
  await expect(action.getPresentValue()).resolves.toMatchObject({
    value: "av",
    ability: expect.arrayContaining(["av", "tv", "m"]),
  });
});
