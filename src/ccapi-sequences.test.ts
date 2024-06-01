import * as fs from "node:fs";
import { CCAPIClient, CCAPISequences } from "./index";

let client: CCAPIClient;
beforeAll(() => {
  client = new CCAPIClient("http://192.168.7.122:8080");
});

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

test("shootStillImage", async () => {
  await client.setDrive("single");
  await client.setAEB("+0_1/3");
  await CCAPISequences.shootStillImage(client);
}, 300000);
