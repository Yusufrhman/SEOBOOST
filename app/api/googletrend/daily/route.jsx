import { NextResponse } from "next/server";

const googleTrends = require("google-trends-api");

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
        const parsedResults = JSON.parse(results); // Parse the JSON string into an object

        result = parsedResults.default.trendingSearchesDays[0].trendingSearches;
      }
    }
  );
  return NextResponse.json(result);
}
