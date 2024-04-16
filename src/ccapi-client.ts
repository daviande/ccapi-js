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

enum ShootingSetting {
  AV = "av",
  ISO = "iso",
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
}
