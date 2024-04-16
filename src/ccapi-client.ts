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

  public getAV() {
    return CCAPIClient.request(
      new URL("/ccapi/ver100/shooting/settings/av", this.base),
    ) as Promise<GetShootingSettingResponseBody>;
  }

  public setAV(value: string) {
    return CCAPIClient.request(
      new URL("/ccapi/ver100/shooting/settings/av", this.base),
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

  public getISO() {
    return CCAPIClient.request(
      new URL("/ccapi/ver100/shooting/settings/iso", this.base),
    ) as Promise<GetShootingSettingResponseBody>;
  }

  public setISO(value: string) {
    return CCAPIClient.request(
      new URL("/ccapi/ver100/shooting/settings/iso", this.base),
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
}
