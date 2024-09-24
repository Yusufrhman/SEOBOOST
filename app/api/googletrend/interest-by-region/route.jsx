import { NextResponse } from "next/server";

const googleTrends = require("google-trends-api");

export async function GET() {
  let result;
  await googleTrends
    .interestByRegion({
      keyword: "gempabumi mag 6.4",
      startTime: new Date(),
      geo: "ID",
    })
    .then((res) => {
      result = JSON.parse(res);
    })
    .catch((err) => {
      console.log(err);
    });
  return NextResponse.json(result);
}
