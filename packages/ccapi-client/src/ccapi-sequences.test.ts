import * as fs from "node:fs";
import { beforeAll, afterEach, expect, test, vi } from "vitest";
import { CCAPIClient, CCAPISequences } from "./index";

let client: CCAPIClient;
beforeAll(() => {
  client = new CCAPIClient("http://192.168.7.122:8080");
});

afterEach(() => vi.restoreAllMocks());

test("getLiveViewImage", async () => {
  const expectedFlipDetail = {
    incidentalInformation: {
      liveviewdata: {
        image: {
          sizex: 8192,
          sizey: 5464,
        },
      },
    },
    image: expect.any(ArrayBuffer),
  };
  const flipDetail = await CCAPISequences.getLiveViewImage(client);
  expect(flipDetail).toMatchObject(expectedFlipDetail);
  fs.writeFileSync("flipdetail.jpg", Buffer.from(flipDetail.image));
});

test("stillImageShutterButtonControl", async () => {
  await client.setDrive("lowspeed");
  const controller = new AbortController();
  setTimeout(() => controller.abort(), 3000);
  await CCAPISequences.stillImageShutterButtonControl(
    client,
    controller.signal,
  );
}, 60000);

test("shootStillImage single +0.0", async () => {
  await client.setDrive("single");
  await client.setAEB("+0.0");
  const spy = vi.spyOn(client, "shutterButton");
  await CCAPISequences.shootStillImage(client);
  expect(spy).toHaveBeenCalledTimes(1);
}, 300000);

test("shootStillImage single +0_1/3", async () => {
  await client.setDrive("single");
  await client.setAEB("+0_1/3");
  const spy = vi.spyOn(client, "shutterButton");
  await CCAPISequences.shootStillImage(client);
  expect(spy).toHaveBeenCalledTimes(3);
}, 300000);

test("shootStillImage self_2sec +0_1/3", async () => {
  await client.setDrive("self_2sec");
  await client.setAEB("+0_1/3");
  const spy = vi.spyOn(client, "shutterButton");
  await CCAPISequences.shootStillImage(client);
  expect(spy).toHaveBeenCalledTimes(1);
}, 300000);
