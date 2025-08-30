var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from "axios";
import axiosRetry from "axios-retry";
axiosRetry(axios, { retryDelay: axiosRetry.exponentialDelay });
var ShootingSetting;
(function (ShootingSetting) {
    ShootingSetting["ShootingMode"] = "shootingmode";
    ShootingSetting["AV"] = "av";
    ShootingSetting["TV"] = "tv";
    ShootingSetting["ISO"] = "iso";
    ShootingSetting["Exposure"] = "exposure";
    ShootingSetting["Drive"] = "drive";
    ShootingSetting["AEB"] = "aeb";
    ShootingSetting["FocusBracketing"] = "focusbracketing";
})(ShootingSetting || (ShootingSetting = {}));
export class CCAPIClient {
    constructor(base) {
        this.base = base;
    }
    static request(resource, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios(resource.href, options);
            return response.data;
        });
    }
    getShootingSetting(setting) {
        return CCAPIClient.request(new URL(`/ccapi/ver100/shooting/settings/${setting}`, this.base));
    }
    setShootingSetting(setting, value) {
        return CCAPIClient.request(new URL(`/ccapi/ver100/shooting/settings/${setting}`, this.base), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            data: {
                value,
            },
        });
    }
    getShootingMode() {
        return this.getShootingSetting(ShootingSetting.ShootingMode);
    }
    setShootingMode(value) {
        return this.setShootingSetting(ShootingSetting.ShootingMode, value);
    }
    getAV() {
        return this.getShootingSetting(ShootingSetting.AV);
    }
    setAV(value) {
        return this.setShootingSetting(ShootingSetting.AV, value);
    }
    getTV() {
        return this.getShootingSetting(ShootingSetting.TV);
    }
    setTV(value) {
        return this.setShootingSetting(ShootingSetting.TV, value);
    }
    getISO() {
        return this.getShootingSetting(ShootingSetting.ISO);
    }
    setISO(value) {
        return this.setShootingSetting(ShootingSetting.ISO, value);
    }
    getExposure() {
        return this.getShootingSetting(ShootingSetting.Exposure);
    }
    setExposure(value) {
        return this.setShootingSetting(ShootingSetting.Exposure, value);
    }
    getDrive() {
        return this.getShootingSetting(ShootingSetting.Drive);
    }
    setDrive(value) {
        return this.setShootingSetting(ShootingSetting.Drive, value);
    }
    getAEB() {
        return this.getShootingSetting(ShootingSetting.AEB);
    }
    setAEB(value) {
        return this.setShootingSetting(ShootingSetting.AEB, value);
    }
    getFocusBracketing() {
        return this.getShootingSetting(ShootingSetting.FocusBracketing);
    }
    setFocusBracketing(value) {
        return this.setShootingSetting(ShootingSetting.FocusBracketing, value);
    }
    setLiveView(options = {}) {
        return CCAPIClient.request(new URL("/ccapi/ver100/shooting/liveview", this.base), Object.assign(Object.assign({}, options), { method: "POST", headers: {
                "Content-Type": "application/json",
            }, data: {
                liveviewsize: "medium",
                cameradisplay: "on",
            } }));
    }
    getFlipDetail() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios.get(new URL("/ccapi/ver100/shooting/liveview/flipdetail?kind=both", this.base)
                .href, { responseType: "arraybuffer" });
            /*
              0xFF,0x00,0x01,<Incidental information data size 4 bytes>,<Incidental information
              binary data>,0xFF,0xFF,
              0xFF,0x00,0x00,<Image data size 4 bytes>,<Image binary data>,0xFF,0xFF
              */
            // https://github.com/axios/axios/issues/3517
            const buffer = response.data.buffer || response.data;
            let start = 3;
            const view = new DataView(buffer);
            const incidentalInformationDataSize = view.getUint32(start);
            start += 4;
            const decoder = new TextDecoder();
            const incidentalInformation = JSON.parse(decoder.decode(buffer.slice(start, start + incidentalInformationDataSize)));
            start += incidentalInformationDataSize + 5;
            const imageDataSize = view.getUint32(start);
            start += 4;
            const image = buffer.slice(start, start + imageDataSize);
            return { incidentalInformation, image };
        });
    }
    shutterButton() {
        return __awaiter(this, void 0, void 0, function* () {
            return CCAPIClient.request(new URL("/ccapi/ver100/shooting/control/shutterbutton", this.base), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                data: {
                    af: true,
                },
            });
        });
    }
    shutterButtonManual(action) {
        return __awaiter(this, void 0, void 0, function* () {
            return CCAPIClient.request(new URL("/ccapi/ver100/shooting/control/shutterbutton/manual", this.base), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                data: {
                    action,
                    af: true,
                },
            });
        });
    }
    afFramePosition(positionX, positionY) {
        return __awaiter(this, void 0, void 0, function* () {
            return CCAPIClient.request(new URL("/ccapi/ver100/shooting/liveview/afframeposition", this.base), {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                data: {
                    positionx: positionX,
                    positiony: positionY,
                },
            });
        });
    }
}
//# sourceMappingURL=ccapi-client.js.map