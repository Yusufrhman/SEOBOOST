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
        result = results;
      }
    }
  );
  return NextResponse.json(result);
}
