import { CCAPIClient } from "./ccapi-client";
declare function getLiveViewImage(client: CCAPIClient): Promise<import("./ccapi-client").GetFlipDetailResponseBody>;
declare function shootStillImage(client: CCAPIClient, numberOfBracketedShots?: number): Promise<void>;
declare function stillImageShutterButtonControl(client: CCAPIClient, signal: AbortSignal): Promise<void>;
export declare const CCAPISequences: {
    getLiveViewImage: typeof getLiveViewImage;
    shootStillImage: typeof shootStillImage;
    stillImageShutterButtonControl: typeof stillImageShutterButtonControl;
};
export {};
