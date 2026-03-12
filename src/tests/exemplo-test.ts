import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { check, sleep } from "k6";
import { Rate, Trend } from "k6/metrics";
import { Options } from "k6/options";

import { getOptions } from "../config/configTest";
import { exemploGetFunction } from "../functions/exemploGetFunction";

const testType = __ENV.K6_TEST_TYPE || "smoke";
export const options: Options = getOptions(testType);

export function handleSummary(data: unknown) {
  return {
    "src/reports/test-exemplo.html": htmlReport(data),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}

// Métricas personalizadas
const getElementDurationTimeTrend = new Trend("OUT_Tempo_Duracao");
const getElementWaitingTimeTrend = new Trend("OUT_Tempo_Espera");
const getElementSuccessRate: Rate = new Rate("OUT_Percentual_Sucesso");

export default function () {
  try {
    const apigetElement = exemploGetFunction();

    check(apigetElement, {
      "Get element API returned status 200": (res) => res.status === 200,
    });

    getElementDurationTimeTrend.add(apigetElement.timings.duration);
    getElementWaitingTimeTrend.add(apigetElement.timings.waiting);
    getElementSuccessRate.add(apigetElement.status === 200);

    console.log(`Status: ${apigetElement.status}`);
    console.log(`Response Body: ${JSON.stringify(apigetElement.body)}`);

    sleep(1);
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
  }
}
