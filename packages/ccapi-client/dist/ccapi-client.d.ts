import { AxiosRequestConfig } from "axios";
export type GetShootingSettingResponseBody = {
    value: string;
    ability: string[];
};
export type SetShootingSettingRequestBody = {
    value: string;
};
export type SetShootingSettingResponseBody = {
    value: string;
};
export type LiveViewIncidentalInformation = {
    liveviewdata: {
        image: {
            sizex: number;
            sizey: number;
        };
    };
};
export type GetFlipDetailResponseBody = {
    incidentalInformation: LiveViewIncidentalInformation;
    image: ArrayBuffer;
};
export declare class CCAPIClient {
    private readonly base;
    constructor(base: string);
    private static request;
    private getShootingSetting;
    private setShootingSetting;
    getShootingMode(): Promise<GetShootingSettingResponseBody>;
    setShootingMode(value: string): Promise<SetShootingSettingResponseBody>;
    getAV(): Promise<GetShootingSettingResponseBody>;
    setAV(value: string): Promise<SetShootingSettingResponseBody>;
    getTV(): Promise<GetShootingSettingResponseBody>;
    setTV(value: string): Promise<SetShootingSettingResponseBody>;
    getISO(): Promise<GetShootingSettingResponseBody>;
    setISO(value: string): Promise<SetShootingSettingResponseBody>;
    getExposure(): Promise<GetShootingSettingResponseBody>;
    setExposure(value: string): Promise<SetShootingSettingResponseBody>;
    getDrive(): Promise<GetShootingSettingResponseBody>;
    setDrive(value: string): Promise<SetShootingSettingResponseBody>;
    getAEB(): Promise<GetShootingSettingResponseBody>;
    setAEB(value: string): Promise<SetShootingSettingResponseBody>;
    getFocusBracketing(): Promise<GetShootingSettingResponseBody>;
    setFocusBracketing(value: string): Promise<SetShootingSettingResponseBody>;
    setLiveView(options?: AxiosRequestConfig): Promise<object>;
    getFlipDetail(): Promise<GetFlipDetailResponseBody>;
    shutterButton(): Promise<object>;
    shutterButtonManual(action: "half_press" | "full_press" | "release"): Promise<object>;
    afFramePosition(positionX: number, positionY: number): Promise<object>;
}
