import type { CCAPIClient } from "@repo/ccapi-client";
import { ShootingSettingAction } from "./shooting-setting.js";

export class AEBAction extends ShootingSettingAction {
  public run(client: CCAPIClient) {
    return client.setAEB(this.value);
  }
}
