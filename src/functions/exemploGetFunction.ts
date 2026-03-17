import http, { RefinedParams, RefinedResponse, ResponseType } from "k6/http";

const baseUrl: any | undefined = process.env.BASE_URL_TEST;

export function exemploGetFunction() {
  const url = `${baseUrl}/posts`;

  const params: RefinedParams<ResponseType> = {
    headers: { "Content-Type": "application/json" },
    tags: { name: "GetPosts" },
  };

  const response: RefinedResponse<ResponseType> = http.get(url, params);

  return {
    status: response.status,
    body: response.json(),
    timings: response.timings,
  };
}
