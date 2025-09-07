import type { CCAPIClient } from "@repo/ccapi-client";
import { ShootingSettingAction } from "./shooting-setting.js";

export class FocusBracketingAction extends ShootingSettingAction {
  public run(client: CCAPIClient) {
    return client.setFocusBracketing(this.value);
  }
}
