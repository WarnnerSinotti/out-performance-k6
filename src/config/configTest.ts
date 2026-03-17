import { Options } from "k6/options";

const sliThresholds = {
  http_req_failed: ["rate<0.01"],
  http_req_duration: ["p(95)<3000", "p(99)<6000"],
  "http_req_duration{name:GetPosts}": ["p(95)<3000", "p(99)<6000"],
  http_reqs: ["rate>5"],
  checks: ["rate>0.99"],
};

const testOptions: Record<string, Options> = {
  spike: {
    stages: [
      { duration: "2m", target: 2000 },
      { duration: "1m", target: 0 },
    ],
    thresholds: sliThresholds,
  },
  load: {
    stages: [
      { duration: "1m", target: 500 },
      { duration: "5m", target: 500 },
      { duration: "1m", target: 0 },
    ],
    thresholds: sliThresholds,
  },
  smoke: {
    vus: 500,
    duration: "5m",
    thresholds: sliThresholds,
  },
  soak: {
    stages: [
      { duration: "5m", target: 30 },
      { duration: "30m", target: 30 },
      { duration: "5m", target: 0 },
    ],
    thresholds: sliThresholds,
  },
  break: {
    stages: [{ duration: "5m", target: 500 }],
    thresholds: sliThresholds,
  },
  averageLoad: {
    stages: [
      { duration: "5m", target: 30 },
      { duration: "30m", target: 30 },
      { duration: "5m", target: 0 },
    ],
    thresholds: sliThresholds,
  },
};

export function getOptions(testType: string): Options {
  return testOptions[testType] || testOptions.smoke;
}
