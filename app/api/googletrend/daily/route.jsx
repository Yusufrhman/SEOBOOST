import { NextResponse } from "next/server";

const googleTrends = require("google-trends-api");
const HttpsProxyAgent = require("https-proxy-agent");

let proxyAgent = new HttpsProxyAgent("http://proxy-host:8888/");

export async function GET() {
  let result;
  await googleTrends.dailyTrends(
    {
      trendDate: new Date(),
      geo: "ID",
      hl: "ID",
    },
    function (err, results) {
      if (err) {
        console.log(err);
      } else {
        const parsedResults = JSON.parse(results);
        result = parsedResults.default;
      }
    }
  );
  return NextResponse.json(result);
}
