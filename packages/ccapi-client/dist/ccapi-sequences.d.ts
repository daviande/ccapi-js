import { CCAPIClient } from "./ccapi-client.js";
declare function getLiveViewImage(client: CCAPIClient): Promise<import("./ccapi-client.js").GetFlipDetailResponseBody>;
declare function shootStillImage(client: CCAPIClient, numberOfBracketedShots?: number): Promise<void>;
declare function stillImageShutterButtonControl(client: CCAPIClient, signal: AbortSignal): Promise<void>;
export declare const CCAPISequences: {
    getLiveViewImage: typeof getLiveViewImage;
    shootStillImage: typeof shootStillImage;
    stillImageShutterButtonControl: typeof stillImageShutterButtonControl;
};
export {};
