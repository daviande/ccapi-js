import { CCAPIClient } from "./index";

test("getAV", async () => {
  const client = new CCAPIClient("http://192.168.7.122:8080");

  const expectedAV = {
    value: expect.any(String),
    ability: expect.arrayContaining(["f8.0"]),
  };
  const avSetting = await client.getAVSetting();
  expect(avSetting).toMatchObject(expectedAV);
});
