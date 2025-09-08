import type { CCAPIClient } from "@repo/ccapi-client";

import { CCAPIAction } from "./ccapi-action.js";

export class AFFramePositionAction implements CCAPIAction {
  constructor(
    public positionX: number,
    public positionY: number,
  ) {}

  public run(client: CCAPIClient) {
    return client.afFramePosition(this.positionX, this.positionY);
  }

  public toString() {
    return `${this.constructor.name} [positionX=${this.positionX}, positionY=${this.positionY}]`;
  }
}
