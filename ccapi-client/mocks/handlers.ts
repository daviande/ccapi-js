import * as path from "node:path";
import * as fs from "node:fs";
import { http, HttpResponse } from "msw";
import {
  GetShootingSettingResponseBody,
  SetShootingSettingRequestBody,
  SetShootingSettingResponseBody,
} from "../src";

const shootingSettings = {
  shootingMode: "av",
  av: "f8.0",
  iso: "100",
  exposure: "+0.0",
  drive: "single",
  aeb: "+0_1/3",
  focusBracketing: "disable",
  tv: "1/125",
};

export const handlers = [
  http.get<never, never, GetShootingSettingResponseBody>(
    /\/ccapi\/ver100\/shooting\/settings\/shootingmode/,
    () => {
      return HttpResponse.json({
        value: shootingSettings.shootingMode,
        ability: ["a+", "fv", "p", "tv", "av", "m", "bulb", "c1", "c2", "c3"],
      });
    },
  ),
  http.put<
    never,
    SetShootingSettingRequestBody,
    SetShootingSettingResponseBody
  >(
    /\/ccapi\/ver100\/shooting\/settings\/shootingmode/,
    async ({ request }) => {
      const requestBody = await request.json();
      shootingSettings.shootingMode = requestBody.value;
      return HttpResponse.json({
        value: shootingSettings.shootingMode,
      });
    },
  ),
  http.get<never, never, GetShootingSettingResponseBody>(
    /\/ccapi\/ver100\/shooting\/settings\/av/,
    () => {
      return HttpResponse.json({
        value: shootingSettings.av,
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
    shootingSettings.av = requestBody.value;
    return HttpResponse.json({
      value: shootingSettings.av,
    });
  }),
  http.get<never, never, GetShootingSettingResponseBody>(
    /\/ccapi\/ver100\/shooting\/settings\/tv/,
    () => {
      return HttpResponse.json({
        value: shootingSettings.tv,
        ability: [
          '30"',
          '25"',
          '20"',
          '15"',
          '13"',
          '10"',
          '8"',
          '6"',
          '5"',
          '4"',
          '3"2',
          '2"5',
          '2"',
          '1"6',
          '1"3',
          '1"',
          '0"8',
          '0"6',
          '0"5',
          '0"4',
          '0"3',
          "1/4",
          "1/5",
          "1/6",
          "1/8",
          "1/10",
          "1/13",
          "1/15",
          "1/20",
          "1/25",
          "1/30",
          "1/40",
          "1/50",
          "1/60",
          "1/80",
          "1/100",
          "1/125",
          "1/160",
          "1/200",
          "1/250",
          "1/320",
          "1/400",
          "1/500",
          "1/640",
          "1/800",
          "1/1000",
          "1/1250",
          "1/1600",
          "1/2000",
          "1/2500",
          "1/3200",
          "1/4000",
          "1/5000",
          "1/6400",
          "1/8000",
        ],
      });
    },
  ),
  http.put<
    never,
    SetShootingSettingRequestBody,
    SetShootingSettingResponseBody
  >(/\/ccapi\/ver100\/shooting\/settings\/tv/, async ({ request }) => {
    const requestBody = await request.json();
    shootingSettings.tv = requestBody.value;
    return HttpResponse.json({
      value: shootingSettings.tv,
    });
  }),
  http.get<never, never, GetShootingSettingResponseBody>(
    /\/ccapi\/ver100\/shooting\/settings\/iso/,
    () => {
      return HttpResponse.json({
        value: shootingSettings.iso,
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
    shootingSettings.iso = requestBody.value;
    return HttpResponse.json({
      value: shootingSettings.iso,
    });
  }),
  http.get<never, never, GetShootingSettingResponseBody>(
    /\/ccapi\/ver100\/shooting\/settings\/exposure/,
    () => {
      return HttpResponse.json({
        value: shootingSettings.exposure,
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
    shootingSettings.exposure = requestBody.value;
    return HttpResponse.json({
      value: shootingSettings.exposure,
    });
  }),
  http.post(/\/ccapi\/ver100\/shooting\/liveview/, async () => {
    return HttpResponse.json({});
  }),
  http.get(/\/ccapi\/ver100\/shooting\/liveview\/flipdetail/, async () => {
    const buffer = fs.readFileSync(path.resolve(__dirname, "flipdetail"));

    return HttpResponse.arrayBuffer(buffer, {
      headers: {
        "Content-Type": "application/octet-stream",
      },
    });
  }),
  http.get<never, never, GetShootingSettingResponseBody>(
    /\/ccapi\/ver100\/shooting\/settings\/drive/,
    () => {
      return HttpResponse.json({
        value: shootingSettings.drive,
        ability: [
          "single",
          "cont_super_hi",
          "highspeed",
          "lowspeed",
          "self_10sec",
          "self_2sec",
        ],
      });
    },
  ),
  http.put<
    never,
    SetShootingSettingRequestBody,
    SetShootingSettingResponseBody
  >(/\/ccapi\/ver100\/shooting\/settings\/drive/, async ({ request }) => {
    const requestBody = await request.json();
    shootingSettings.drive = requestBody.value;
    return HttpResponse.json({
      value: shootingSettings.drive,
    });
  }),
  http.get<never, never, GetShootingSettingResponseBody>(
    /\/ccapi\/ver100\/shooting\/settings\/aeb/,
    () => {
      return HttpResponse.json({
        value: shootingSettings.aeb,
        ability: [
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
  >(/\/ccapi\/ver100\/shooting\/settings\/aeb/, async ({ request }) => {
    const requestBody = await request.json();
    shootingSettings.aeb = requestBody.value;
    return HttpResponse.json({
      value: shootingSettings.aeb,
    });
  }),
  http.post(/\/ccapi\/ver100\/shooting\/control\/shutterbutton/, async () => {
    return HttpResponse.json({});
  }),
  http.post(
    /\/ccapi\/ver100\/shooting\/control\/shutterbutton\/manual/,
    async () => {
      return HttpResponse.json({});
    },
  ),
  http.get<never, never, GetShootingSettingResponseBody>(
    /\/ccapi\/ver100\/shooting\/settings\/focusbracketing/,
    () => {
      return HttpResponse.json({
        value: shootingSettings.focusBracketing,
        ability: ["disable", "enable"],
      });
    },
  ),
  http.put<
    never,
    SetShootingSettingRequestBody,
    SetShootingSettingResponseBody
  >(
    /\/ccapi\/ver100\/shooting\/settings\/focusbracketing/,
    async ({ request }) => {
      const requestBody = await request.json();
      shootingSettings.focusBracketing = requestBody.value;
      return HttpResponse.json({
        value: shootingSettings.focusBracketing,
      });
    },
  ),
  http.put(/\/ccapi\/ver100\/shooting\/liveview\/afframeposition/, async () => {
    return HttpResponse.json({});
  }),
];
