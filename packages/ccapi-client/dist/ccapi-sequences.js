var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { isRetryableError } from "axios-retry";
function getLiveViewImage(client) {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.setLiveView();
        return client.getFlipDetail();
    });
}
function shootStillImage(client_1) {
    return __awaiter(this, arguments, void 0, function* (client, numberOfBracketedShots = 3) {
        const drive = yield client.getDrive();
        const aeb = yield client.getAEB();
        const n = aeb.value != "+0.0" && !drive.value.includes("self_")
            ? numberOfBracketedShots
            : 1;
        for (let i = 0; i < n; i++) {
            yield client.shutterButton();
            yield client.setLiveView({
                "axios-retry": {
                    retries: 300,
                    retryDelay: () => 1000,
                    retryCondition: isRetryableError,
                },
            });
        }
    });
}
function stillImageShutterButtonControl(client, signal) {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.shutterButtonManual("full_press");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        yield new Promise((resolve, reject) => {
            const intervalID = setInterval(() => {
                if (signal.aborted) {
                    clearInterval(intervalID);
                    resolve(undefined);
                }
            }, 1000);
        });
        yield client.shutterButtonManual("release");
        yield client.setLiveView({
            "axios-retry": {
                retries: 60,
                retryDelay: () => 1000,
                retryCondition: isRetryableError,
            },
        });
    });
}
export const CCAPISequences = {
    getLiveViewImage,
    shootStillImage,
    stillImageShutterButtonControl,
};
//# sourceMappingURL=ccapi-sequences.js.map