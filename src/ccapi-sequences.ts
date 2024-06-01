import { isRetryableError } from "axios-retry";
import { CCAPIClient } from "./ccapi-client";

async function getLiveViewImage(client: CCAPIClient) {
  await client.setLiveView();
  return client.getFlipDetail();
}

async function shootStillImage(
  client: CCAPIClient,
  numberOfBracketedShots = 3,
) {
  const drive = await client.getDrive();
  const aeb = await client.getAEB();

  const n =
    aeb.value != "+0.0" && !drive.value.includes("self_")
      ? numberOfBracketedShots
      : 1;

  for (let i = 0; i < n; i++) {
    await client.shutterButton();
    await client.setLiveView({
      "axios-retry": {
        retries: 300,
        retryDelay: () => 1000,
        retryCondition: isRetryableError,
      },
    });
  }
}

export const CCAPISequences = {
  getLiveViewImage,
  shootStillImage,
};
