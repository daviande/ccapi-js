import type { CCAPIClient } from "@repo/ccapi-client";
import { ShootingSettingAction } from "./shooting-setting.js";

export class ExposureAction extends ShootingSettingAction {
  public run(client: CCAPIClient) {
    return client.setExposure(this.value);
  }
}
