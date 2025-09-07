import type { CCAPIClient } from "@repo/ccapi-client";
import { ShootingSettingAction } from "./shooting-setting.js";

export class TVAction extends ShootingSettingAction {
  public run(client: CCAPIClient) {
    return client.setTV(this.value);
  }
}
