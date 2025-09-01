import type {
  CCAPIClient,
  GetShootingSettingResponseBody,
  SetShootingSettingResponseBody,
} from "@repo/ccapi-client";

export abstract class ShootingSettingAction {
  constructor(
    protected readonly client: CCAPIClient,
    public value: string,
  ) {}

  abstract run(): Promise<SetShootingSettingResponseBody>;

  abstract getPresentValue(): Promise<GetShootingSettingResponseBody>;

  public toString() {
    return `${this.constructor.name} [value=${this.value}]`;
  }
}
