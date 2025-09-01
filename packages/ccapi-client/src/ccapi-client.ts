import ky, { Options } from "ky";

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

enum ShootingSetting {
  ShootingMode = "shootingmode",
  AV = "av",
  TV = "tv",
  ISO = "iso",
  Exposure = "exposure",
  Drive = "drive",
  AEB = "aeb",
  FocusBracketing = "focusbracketing",
}

export class CCAPIClient {
  constructor(private readonly base: string) {}

  private static request(url: URL, options: Options) {
    return ky(url, {
      retry: {
        methods: ["get", "put", "post"],
        limit: 3,
      },
      ...options,
    }).json();
  }

  private getShootingSetting(setting: ShootingSetting) {
    return CCAPIClient.request(
      new URL(`/ccapi/ver100/shooting/settings/${setting}`, this.base),
      { method: "get" },
    ) as Promise<GetShootingSettingResponseBody>;
  }

  private setShootingSetting(setting: ShootingSetting, value: string) {
    return CCAPIClient.request(
      new URL(`/ccapi/ver100/shooting/settings/${setting}`, this.base),
      {
        method: "put",
        json: {
          value,
        },
      },
    ) as Promise<SetShootingSettingResponseBody>;
  }

  public getShootingMode() {
    return this.getShootingSetting(ShootingSetting.ShootingMode);
  }

  public setShootingMode(value: string) {
    return this.setShootingSetting(ShootingSetting.ShootingMode, value);
  }

  public getAV() {
    return this.getShootingSetting(ShootingSetting.AV);
  }

  public setAV(value: string) {
    return this.setShootingSetting(ShootingSetting.AV, value);
  }

  public getTV() {
    return this.getShootingSetting(ShootingSetting.TV);
  }

  public setTV(value: string) {
    return this.setShootingSetting(ShootingSetting.TV, value);
  }

  public getISO() {
    return this.getShootingSetting(ShootingSetting.ISO);
  }

  public setISO(value: string) {
    return this.setShootingSetting(ShootingSetting.ISO, value);
  }

  public getExposure() {
    return this.getShootingSetting(ShootingSetting.Exposure);
  }

  public setExposure(value: string) {
    return this.setShootingSetting(ShootingSetting.Exposure, value);
  }

  public getDrive() {
    return this.getShootingSetting(ShootingSetting.Drive);
  }

  public setDrive(value: string) {
    return this.setShootingSetting(ShootingSetting.Drive, value);
  }

  public getAEB() {
    return this.getShootingSetting(ShootingSetting.AEB);
  }

  public setAEB(value: string) {
    return this.setShootingSetting(ShootingSetting.AEB, value);
  }

  public getFocusBracketing() {
    return this.getShootingSetting(ShootingSetting.FocusBracketing);
  }

  public setFocusBracketing(value: string) {
    return this.setShootingSetting(ShootingSetting.FocusBracketing, value);
  }

  public setLiveView(options: Options = {}) {
    return CCAPIClient.request(
      new URL("/ccapi/ver100/shooting/liveview", this.base),
      {
        ...options,
        method: "post",
        json: {
          liveviewsize: "medium",
          cameradisplay: "on",
        },
      },
    );
  }

  public async getFlipDetail(): Promise<GetFlipDetailResponseBody> {
    const response = await ky.get(
      new URL("/ccapi/ver100/shooting/liveview/flipdetail?kind=both", this.base)
        .href,
    );

    /*
      0xFF,0x00,0x01,<Incidental information data size 4 bytes>,<Incidental information
      binary data>,0xFF,0xFF,
      0xFF,0x00,0x00,<Image data size 4 bytes>,<Image binary data>,0xFF,0xFF
      */
    const buffer = await response.arrayBuffer();

    let start = 3;
    const view = new DataView(buffer);

    const incidentalInformationDataSize = view.getUint32(start);

    start += 4;
    const decoder = new TextDecoder();
    const incidentalInformation = JSON.parse(
      decoder.decode(
        buffer.slice(start, start + incidentalInformationDataSize),
      ),
    );

    start += incidentalInformationDataSize + 5;
    const imageDataSize = view.getUint32(start);

    start += 4;
    const image = buffer.slice(start, start + imageDataSize);

    return { incidentalInformation, image };
  }

  public shutterButton() {
    return CCAPIClient.request(
      new URL("/ccapi/ver100/shooting/control/shutterbutton", this.base),
      {
        method: "post",
        json: {
          af: true,
        },
      },
    );
  }

  public shutterButtonManual(action: "half_press" | "full_press" | "release") {
    return CCAPIClient.request(
      new URL("/ccapi/ver100/shooting/control/shutterbutton/manual", this.base),
      {
        method: "post",
        json: {
          action,
          af: true,
        },
      },
    );
  }

  public afFramePosition(positionX: number, positionY: number) {
    return CCAPIClient.request(
      new URL("/ccapi/ver100/shooting/liveview/afframeposition", this.base),
      {
        method: "put",
        json: {
          positionx: positionX,
          positiony: positionY,
        },
      },
    );
  }
}
