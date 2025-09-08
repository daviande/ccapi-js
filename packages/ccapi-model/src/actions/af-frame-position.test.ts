import { beforeAll, expect, test } from "vitest";
import { CCAPIClient } from "@repo/ccapi-client";
import { AFFramePositionAction } from "./af-frame-position.js";

let client: CCAPIClient;
beforeAll(() => {
  client = new CCAPIClient("http://192.168.7.122:8080");
});

test("AFFramePositionAction", async () => {
  const action = new AFFramePositionAction(4000, 3000);
  expect(action.positionX).toBe(4000);
  expect(action.positionY).toBe(3000);
  expect(action.toString()).toBe(
    "AFFramePositionAction [positionX=4000, positionY=3000]",
  );
  await expect(action.run(client)).resolves.toMatchObject({});
});
