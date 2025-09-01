import type {
  CCAPIClient,
  SetShootingSettingResponseBody,
} from "@repo/ccapi-client";

export abstract class ShootingSettingAction {
  constructor(public value: string) {}

  abstract run(client: CCAPIClient): Promise<SetShootingSettingResponseBody>;

  public toString() {
    return `${this.constructor.name} [value=${this.value}]`;
  }
}
