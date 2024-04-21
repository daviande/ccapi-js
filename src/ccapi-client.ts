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
  AV = "av",
  ISO = "iso",
  Exposure = "exposure",
}

export class CCAPIClient {
  constructor(private readonly base: string) {}

  private static async request(resource: URL, options?: RequestInit) {
    const response = await fetch(resource, options);
    const jsonData = await response.json();

    if (response.ok) {
      return jsonData as object;
    } else {
      return Promise.reject((jsonData as { message: string }).message);
    }
  }

  private getShootingSetting(setting: ShootingSetting) {
    return CCAPIClient.request(
      new URL(`/ccapi/ver100/shooting/settings/${setting}`, this.base),
    ) as Promise<GetShootingSettingResponseBody>;
  }

  private setShootingSetting(setting: ShootingSetting, value: string) {
    return CCAPIClient.request(
      new URL(`/ccapi/ver100/shooting/settings/${setting}`, this.base),
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          value,
        }),
      },
    ) as Promise<SetShootingSettingResponseBody>;
  }

  public getAV() {
    return this.getShootingSetting(ShootingSetting.AV);
  }

  public setAV(value: string) {
    return this.setShootingSetting(ShootingSetting.AV, value);
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

  public async getFlipDetail(): Promise<GetFlipDetailResponseBody> {
    const response = await fetch(
      new URL(
        "/ccapi/ver100/shooting/liveview/flipdetail?kind=both",
        this.base,
      ),
    );

    if (response.ok) {
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
    } else {
      const jsonData = await response.json();
      return Promise.reject((jsonData as { message: string }).message);
    }
  }
}
