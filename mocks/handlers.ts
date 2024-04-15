import { http, HttpResponse } from "msw";

export const handlers = [
  http.get(/\/ccapi\/ver100\/shooting\/settings\/av/, () => {
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
  }),
];
