import { http, HttpResponse } from "msw";
import {
  GetShootingSettingResponseBody,
  SetShootingSettingRequestBody,
  SetShootingSettingResponseBody,
} from "../src";

export const handlers = [
  http.get<never, never, GetShootingSettingResponseBody>(
    /\/ccapi\/ver100\/shooting\/settings\/av/,
    () => {
      return HttpResponse.json({
        value: "f8.0",
        ability: [
          "f4.0",
          "f4.5",
          "f5.0",
          "f5.6",
          "f6.3",
          "f7.1",
          "f8.0",
          "f9.0",
          "f10",
          "f11",
          "f13",
          "f14",
          "f16",
          "f18",
          "f20",
          "f22",
        ],
      });
    },
  ),
  http.put<
    never,
    SetShootingSettingRequestBody,
    SetShootingSettingResponseBody
  >(/\/ccapi\/ver100\/shooting\/settings\/av/, async ({ request }) => {
    const requestBody = await request.json();
    return HttpResponse.json({
      value: requestBody.value,
    });
  }),
];
