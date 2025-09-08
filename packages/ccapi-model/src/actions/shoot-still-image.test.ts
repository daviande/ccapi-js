import { beforeAll, expect, test } from "vitest";
import { CCAPIClient } from "@repo/ccapi-client";
import { ShootStillImageAction } from "./shoot-still-image.js";

let client: CCAPIClient;
beforeAll(() => {
  client = new CCAPIClient("http://192.168.7.122:8080");
});

test("ShootStillImageAction", async () => {
  const action = new ShootStillImageAction(5);
  expect(action.numberOfBracketedShots).toBe(5);
  expect(action.toString()).toBe(
    "ShootStillImageAction [numberOfBracketedShots=5]",
  );
  await expect(action.run(client)).resolves.toBeUndefined();
});
