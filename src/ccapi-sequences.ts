import { isRetryableError } from "axios-retry";
import { CCAPIClient } from "./ccapi-client";

async function getLiveViewImage(client: CCAPIClient) {
  await client.setLiveView();
  return client.getFlipDetail();
}

async function shootStillImage(client: CCAPIClient) {
  await client.shutterButton();
  return client.setLiveView({
    "axios-retry": {
      retries: 300,
      retryDelay: () => 1000,
      retryCondition: isRetryableError,
    },
  });
}

export const CCAPISequences = {
  getLiveViewImage,
  shootStillImage,
};
