import { CCAPIClient } from "./ccapi-client";

async function getLiveViewImage(client: CCAPIClient) {
  await client.setLiveView();
  return client.getFlipDetail();
}

export const CCAPISequences = {
  getLiveViewImage,
};
