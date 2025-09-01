import { GetShootingSettingResponseBody } from "@repo/ccapi-client";
import { ShootingSettingAction } from "./shooting-setting.js";

export class ShootingModeAction extends ShootingSettingAction {
  public run() {
    return this.client.setShootingMode(this.value);
  }

  public getPresentValue(): Promise<GetShootingSettingResponseBody> {
    return this.client.getShootingMode();
  }
}
