import type { CCAPIClient } from "@repo/ccapi-client";
import { ShootingSettingAction } from "./shooting-setting.js";

export class DriveAction extends ShootingSettingAction {
  public run(client: CCAPIClient) {
    return client.setDrive(this.value);
  }
}
