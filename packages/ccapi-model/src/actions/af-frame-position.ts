import type { CCAPIClient } from "@repo/ccapi-client";

import { CCAPIAction } from "./ccapi-action.js";

export class AFFramePositionAction implements CCAPIAction {
  constructor(public value: { positionX: number; positionY: number }) {}

  public run(client: CCAPIClient) {
    return client.afFramePosition(this.value.positionX, this.value.positionY);
  }

  public toString() {
    return `${this.constructor.name} [positionX=${this.value.positionX}, positionY=${this.value.positionY}]`;
  }
}
