import { Options } from "k6/options";

const testOptions: Record<string, Options> = {
  spike: {
    stages: [
      { duration: "2m", target: 2000 },
      { duration: "1m", target: 0 },
    ],
    thresholds: {
      http_req_failed: ["rate<0.1"],
    },
  },
  load: {
    stages: [
      { duration: "1m", target: 500 },
      { duration: "5m", target: 500 },
      { duration: "1m", target: 0 },
    ],
    thresholds: {
      http_req_failed: ["rate<0.1"],
    },
  },
  smoke: {
    vus: 500,
    duration: "5m",
    thresholds: {
      http_req_failed: ["rate<0.1"],
    },
  },
  break: {
    stages: [{ duration: "5m", target: 500 }],
    thresholds: {
      http_req_failed: ["rate<0.1"],
    },
  },
  averageLoad: {
    stages: [
      { duration: "5m", target: 30 },
      { duration: "30m", target: 30 },
      { duration: "5m", target: 0 },
    ],
    thresholds: {
      http_req_failed: ["rate<0.1"],
    },
  },
};

export function getOptions(testType: string): Options {
  return testOptions[testType] || testOptions.smoke;
}
