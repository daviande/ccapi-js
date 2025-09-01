import type { CCAPIClient } from "@repo/ccapi-client";
import { ShootingSettingAction } from "./shooting-setting.js";

export class ShootingModeAction extends ShootingSettingAction {
  public run(client: CCAPIClient) {
    return client.setShootingMode(this.value);
  }
}
