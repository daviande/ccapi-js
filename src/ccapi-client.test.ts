import { CCAPIClient } from "./index";

test("getAV", async () => {
  const client = new CCAPIClient("http://192.168.7.122:8080");

  const expectedAV = {
    value: expect.any(String),
    ability: expect.arrayContaining(["f8.0"]),
  };
  const av = await client.getAV();
  expect(av).toMatchObject(expectedAV);
});

test("setAV", async () => {
  const client = new CCAPIClient("http://192.168.7.122:8080");

  const expectedAV = {
    value: "f11",
  };
  const av = await client.setAV("f11");
  expect(av).toMatchObject(expectedAV);
});
