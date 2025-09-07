import type { CCAPIClient } from "@repo/ccapi-client";

export interface CCAPIAction {
  run(client: CCAPIClient): Promise<unknown>;
}
