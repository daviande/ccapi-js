import { beforeAll, afterEach, afterAll } from "vitest";
import { server } from "@repo/msw-mocks";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
