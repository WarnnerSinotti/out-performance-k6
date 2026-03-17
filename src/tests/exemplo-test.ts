import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { check, sleep } from "k6";
import { Rate } from "k6/metrics";
import { Options } from "k6/options";

import { getOptions } from "../config/configTest";
import { exemploGetFunction } from "../functions/exemploGetFunction";

const testType = __ENV.K6_TEST_TYPE || "smoke";
export const options: Options = getOptions(testType);

export function handleSummary(data: unknown) {
  const profile = __ENV.K6_TEST_TYPE || "smoke";
  return {
    [`src/reports/test-exemplo-${profile}.html`]: htmlReport(data),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}

const successRate = new Rate("OUT_Percentual_Sucesso");

export default function () {
  try {
    const apigetElement = exemploGetFunction();

    check(apigetElement, {
      "Get element API returned status 200": (res) => res.status === 200,
    });

    successRate.add(apigetElement.status === 200);

    if (apigetElement.status !== 200) {
      console.warn(
        `[Falha] Status: ${apigetElement.status}, Body: ${JSON.stringify(
          apigetElement.body,
        )}`,
      );
    }

    sleep(1);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error(`Error: ${msg}`);
  }
}
