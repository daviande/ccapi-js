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
  http.get<never, never, GetShootingSettingResponseBody>(
    /\/ccapi\/ver100\/shooting\/settings\/iso/,
    () => {
      return HttpResponse.json({
        value: "100",
        ability: [
          "auto",
          "100",
          "125",
          "160",
          "200",
          "250",
          "320",
          "400",
          "500",
          "640",
          "800",
          "1000",
          "1250",
          "1600",
          "2000",
          "2500",
          "3200",
          "4000",
          "5000",
          "6400",
          "8000",
          "10000",
          "12800",
          "16000",
          "20000",
          "25600",
          "32000",
          "40000",
          "51200",
        ],
      });
    },
  ),
  http.put<
    never,
    SetShootingSettingRequestBody,
    SetShootingSettingResponseBody
  >(/\/ccapi\/ver100\/shooting\/settings\/iso/, async ({ request }) => {
    const requestBody = await request.json();
    return HttpResponse.json({
      value: requestBody.value,
    });
  }),
  http.get<never, never, GetShootingSettingResponseBody>(
    /\/ccapi\/ver100\/shooting\/settings\/exposure/,
    () => {
      return HttpResponse.json({
        value: "+0.0",
        ability: [
          "-3.0",
          "-2_2/3",
          "-2_1/3",
          "-2.0",
          "-1_2/3",
          "-1_1/3",
          "-1.0",
          "-0_2/3",
          "-0_1/3",
          "+0.0",
          "+0_1/3",
          "+0_2/3",
          "+1.0",
          "+1_1/3",
          "+1_2/3",
          "+2.0",
          "+2_1/3",
          "+2_2/3",
          "+3.0",
        ],
      });
    },
  ),
  http.put<
    never,
    SetShootingSettingRequestBody,
    SetShootingSettingResponseBody
  >(/\/ccapi\/ver100\/shooting\/settings\/exposure/, async ({ request }) => {
    const requestBody = await request.json();
    return HttpResponse.json({
      value: requestBody.value,
    });
  }),
];
