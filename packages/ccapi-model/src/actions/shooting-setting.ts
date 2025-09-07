import type {
  CCAPIClient,
  SetShootingSettingResponseBody,
} from "@repo/ccapi-client";

import { CCAPIAction } from "./ccapi-action.js";

export abstract class ShootingSettingAction implements CCAPIAction {
  constructor(public value: string) {}

  abstract run(client: CCAPIClient): Promise<SetShootingSettingResponseBody>;

  public toString() {
    return `${this.constructor.name} [value=${this.value}]`;
  }
}
