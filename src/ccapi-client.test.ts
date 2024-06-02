import * as fs from "node:fs";
import { CCAPIClient } from "./index";

let client: CCAPIClient;
beforeAll(() => {
  client = new CCAPIClient("http://192.168.7.122:8080");
});

test("getShootingMode", async () => {
  const expectedShootingMode = {
    value: expect.any(String),
    ability: expect.arrayContaining(["av", "tv", "m"]),
  };
  const shootingMode = await client.getShootingMode();
  expect(shootingMode).toMatchObject(expectedShootingMode);
});

test("setShootingMode", async () => {
  const expectedShootingMode = {
    value: "av",
  };
  const shootingMode = await client.setShootingMode("av");
  expect(shootingMode).toMatchObject(expectedShootingMode);
});

test("getTV", async () => {
  await client.setShootingMode("m");
  const expectedTV = {
    value: expect.any(String),
    ability: expect.arrayContaining(["1/125", '1"']),
  };
  const tv = await client.getTV();
  expect(tv).toMatchObject(expectedTV);
});

test("setTV", async () => {
  const expectedTV = {
    value: "1/8",
  };
  const tv = await client.setTV("1/8");
  expect(tv).toMatchObject(expectedTV);
});

test("getAV", async () => {
  await client.setShootingMode("av");
  const expectedAV = {
    value: expect.any(String),
    ability: expect.arrayContaining(["f8.0"]),
  };
  const av = await client.getAV();
  expect(av).toMatchObject(expectedAV);
});

test("setAV", async () => {
  const expectedAV = {
    value: "f11",
  };
  const av = await client.setAV("f11");
  expect(av).toMatchObject(expectedAV);
});

test("getISO", async () => {
  const expectedISO = {
    value: expect.any(String),
    ability: expect.arrayContaining(["auto", "100"]),
  };
  const iso = await client.getISO();
  expect(iso).toMatchObject(expectedISO);
});

test("setISO", async () => {
  const expectedISO = {
    value: "100",
  };
  const iso = await client.setISO("100");
  expect(iso).toMatchObject(expectedISO);
});

test("getExposure", async () => {
  const expectedExposure = {
    value: expect.any(String),
    ability: expect.arrayContaining(["-1_2/3"]),
  };
  const exposure = await client.getExposure();
  expect(exposure).toMatchObject(expectedExposure);
});

test("setExposure", async () => {
  const expectedExposure = {
    value: "+0_1/3",
  };
  const exposure = await client.setExposure("+0_1/3");
  expect(exposure).toMatchObject(expectedExposure);
});

test("getDrive", async () => {
  const expectedDrive = {
    value: expect.any(String),
    ability: expect.arrayContaining(["single", "self_10sec"]),
  };
  const drive = await client.getDrive();
  expect(drive).toMatchObject(expectedDrive);
});

test("setDrive", async () => {
  const expectedDrive = {
    value: "self_10sec",
  };
  const drive = await client.setDrive("self_10sec");
  expect(drive).toMatchObject(expectedDrive);
});

test("getAEB", async () => {
  const expectedAEB = {
    value: expect.any(String),
    ability: expect.arrayContaining(["+1.0", "+2_1/3"]),
  };
  const aeb = await client.getAEB();
  expect(aeb).toMatchObject(expectedAEB);
});

test("setAEB", async () => {
  const expectedDrive = {
    value: "+1.0",
  };
  const aeb = await client.setAEB("+1.0");
  expect(aeb).toMatchObject(expectedDrive);
});

test("getFocusBracketing", async () => {
  await client.setAEB("+0.0");
  const expectedFocusBracketing = {
    value: expect.any(String),
    ability: expect.arrayContaining(["disable", "enable"]),
  };
  const focusBracketing = await client.getFocusBracketing();
  expect(focusBracketing).toMatchObject(expectedFocusBracketing);
});

test("setFocusBracketing", async () => {
  const expectedFocusBracketing = {
    value: "disable",
  };
  const focusBracketing = await client.setFocusBracketing("disable");
  expect(focusBracketing).toMatchObject(expectedFocusBracketing);
});

test("setLiveView", async () => {
  const livewView = await client.setLiveView();
  expect(livewView).toMatchObject({});
});

test("getFlipDetail", async () => {
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
  const flipDetail = await client.getFlipDetail();
  expect(flipDetail).toMatchObject(expectedFlipDetail);
  fs.writeFileSync("flipdetail.jpg", Buffer.from(flipDetail.image));
});
