import type { CCAPIClient } from "@repo/ccapi-client";
import { ShootingSettingAction } from "./shooting-setting.js";

export class AVAction extends ShootingSettingAction {
  public run(client: CCAPIClient) {
    return client.setAV(this.value);
  }
}
