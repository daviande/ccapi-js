import type { CCAPIClient } from "@repo/ccapi-client";
import { ShootingSettingAction } from "./shooting-setting.js";

export class ISOAction extends ShootingSettingAction {
  public run(client: CCAPIClient) {
    return client.setISO(this.value);
  }
}
