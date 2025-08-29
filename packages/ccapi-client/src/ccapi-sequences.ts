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

async function stillImageShutterButtonControl(
  client: CCAPIClient,
  signal: AbortSignal,
) {
  await client.shutterButtonManual("full_press");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  await new Promise((resolve, reject) => {
    const intervalID = setInterval(() => {
      if (signal.aborted) {
        clearInterval(intervalID);
        resolve(undefined);
      }
    }, 1000);
  });
  await client.shutterButtonManual("release");
  await client.setLiveView({
    "axios-retry": {
      retries: 60,
      retryDelay: () => 1000,
      retryCondition: isRetryableError,
    },
  });
}

export const CCAPISequences = {
  getLiveViewImage,
  shootStillImage,
  stillImageShutterButtonControl,
};
