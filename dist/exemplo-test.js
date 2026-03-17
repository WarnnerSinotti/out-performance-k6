/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ exemplo_test),
  handleSummary: () => (/* binding */ handleSummary),
  options: () => (/* binding */ options)
});

;// external "https://jslib.k6.io/k6-summary/0.0.1/index.js"
const index_js_namespaceObject = require("https://jslib.k6.io/k6-summary/0.0.1/index.js");
;// external "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js"
const bundle_js_namespaceObject = require("https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js");
;// external "k6"
const external_k6_namespaceObject = require("k6");
;// external "k6/metrics"
const metrics_namespaceObject = require("k6/metrics");
;// ./src/config/configTest.ts
const sliThresholds = {
  http_req_failed: ["rate<0.01"],
  http_req_duration: ["p(95)<3000", "p(99)<6000"],
  "http_req_duration{name:GetPosts}": ["p(95)<3000", "p(99)<6000"],
  http_reqs: ["rate>5"],
  checks: ["rate>0.99"]
};
const testOptions = {
  spike: {
    stages: [{
      duration: "2m",
      target: 2000
    }, {
      duration: "1m",
      target: 0
    }],
    thresholds: sliThresholds
  },
  load: {
    stages: [{
      duration: "1m",
      target: 500
    }, {
      duration: "5m",
      target: 500
    }, {
      duration: "1m",
      target: 0
    }],
    thresholds: sliThresholds
  },
  smoke: {
    vus: 500,
    duration: "5m",
    thresholds: sliThresholds
  },
  soak: {
    stages: [{
      duration: "5m",
      target: 30
    }, {
      duration: "30m",
      target: 30
    }, {
      duration: "5m",
      target: 0
    }],
    thresholds: sliThresholds
  },
  break: {
    stages: [{
      duration: "5m",
      target: 500
    }],
    thresholds: sliThresholds
  },
  averageLoad: {
    stages: [{
      duration: "5m",
      target: 30
    }, {
      duration: "30m",
      target: 30
    }, {
      duration: "5m",
      target: 0
    }],
    thresholds: sliThresholds
  }
};
function getOptions(testType) {
  return testOptions[testType] || testOptions.smoke;
}
;// external "k6/http"
const http_namespaceObject = require("k6/http");
var http_default = /*#__PURE__*/__webpack_require__.n(http_namespaceObject);
;// ./src/functions/exemploGetFunction.ts

const baseUrl = "https://jsonplaceholder.typicode.com";
function exemploGetFunction() {
  const url = `${baseUrl}/posts`;
  const params = {
    headers: {
      "Content-Type": "application/json"
    },
    tags: {
      name: "GetPosts"
    }
  };
  const response = http_default().get(url, params);
  return {
    status: response.status,
    body: response.json(),
    timings: response.timings
  };
}
;// ./src/tests/exemplo-test.ts






const testType = __ENV.K6_TEST_TYPE || "smoke";
const options = getOptions(testType);
function handleSummary(data) {
  const profile = __ENV.K6_TEST_TYPE || "smoke";
  return {
    [`src/reports/test-exemplo-${profile}.html`]: (0,bundle_js_namespaceObject.htmlReport)(data),
    stdout: (0,index_js_namespaceObject.textSummary)(data, {
      indent: " ",
      enableColors: true
    })
  };
}
const successRate = new metrics_namespaceObject.Rate("OUT_Percentual_Sucesso");
/* harmony default export */ function exemplo_test() {
  try {
    const apigetElement = exemploGetFunction();
    (0,external_k6_namespaceObject.check)(apigetElement, {
      "Get element API returned status 200": res => res.status === 200
    });
    successRate.add(apigetElement.status === 200);
    if (apigetElement.status !== 200) {
      console.warn(`[Falha] Status: ${apigetElement.status}, Body: ${JSON.stringify(apigetElement.body)}`);
    }
    (0,external_k6_namespaceObject.sleep)(1);
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error(`Error: ${msg}`);
  }
}
var __webpack_export_target__ = exports;
for(var __webpack_i__ in __webpack_exports__) __webpack_export_target__[__webpack_i__] = __webpack_exports__[__webpack_i__];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=exemplo-test.js.map