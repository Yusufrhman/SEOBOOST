import { NextResponse } from "next/server";

const googleTrends = require("google-trends-api");

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get("keyword") || "Universitas Airlangga";
  let result;
  await googleTrends
    .interestByRegion({
      keyword: keyword,
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
