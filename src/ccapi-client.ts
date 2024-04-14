export type GetShootingSettingResponseBody = {
  value: string;
  ability: string[];
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

  public getAVSetting() {
    return CCAPIClient.request(
      new URL("/ccapi/ver100/shooting/settings/av", this.base),
    ) as Promise<GetShootingSettingResponseBody>;
  }
}
