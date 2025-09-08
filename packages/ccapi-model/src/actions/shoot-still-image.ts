import { CCAPIClient, CCAPISequences } from "@repo/ccapi-client";

import { CCAPIAction } from "./ccapi-action.js";

export class ShootStillImageAction implements CCAPIAction {
  constructor(public numberOfBracketedShots?: number) {}

  public run(client: CCAPIClient) {
    return CCAPISequences.shootStillImage(client, this.numberOfBracketedShots);
  }

  public toString() {
    return `${this.constructor.name} [numberOfBracketedShots=${this.numberOfBracketedShots}]`;
  }
}
