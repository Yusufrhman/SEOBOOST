import { NextResponse } from "next/server";
const googleTrends = require("google-trends-api");

const endTime = new Date();
const startTime = new Date();
startTime.setDate(endTime.getDate() - 7);

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get("keyword") || "Universitas Airlangga";

  let result;
  await googleTrends.realTimeTrends(
    {
      geo: "US",
      category: "all",
    },
    function (err, results) {
      if (err) {
        console.log(err);
      } else {
        const parsedResults = JSON.parse(results);
        result = parsedResults;
      }
    }
  );

  return NextResponse.json(result);
}
