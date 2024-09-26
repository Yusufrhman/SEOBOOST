"use server";
import TrendChart from "@/components/chart/trend-chart";
import TrendsContainer from "@/components/dashboard/trends-container";
import TrendsInput from "@/components/trends-keyword/trends-input";

import Link from "next/link";
import { motion } from "framer-motion";
import TrendsTitle from "@/components/trends-keyword/trends-title";

export default async function Dashboard() {
  let trendsData = await fetch("http://localhost:3000/api/googletrend/daily");
  let trendsJson = await trendsData.json();
  let trends = trendsJson.trendingSearchesDays[0].trendingSearches;
  trends = trends.slice(0, 4);
  return (
    <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-700 bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full overflow-auto">
      <article className="w-full h-full flex flex-col items-center justify-center gap-[2rem]">
        <div>
          <TrendsTitle className="w-full mx-auto text-2xl text-transparent bg-gradient-to-r from-custom-teal to-custom-darkTeal inline-block bg-clip-text text-center font-bold"></TrendsTitle>
          <ul className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-2">
            {trends.map((trend) => {
              return (
                <li key={trend.title.query}>
                  <Link href={"/dashboard/trends/" + trend.title.query}>
                    <TrendsContainer
                      layoutId={trend.title.query}
                      className={
                        "px-4 py-6 hover:cursor-pointer flex flex-col justify-between"
                      }
                    >
                      <h2 className="text-white text-xl font-bold">
                        {trend.title.query}
                      </h2>
                      <TrendChart keyword={trend.title.query}></TrendChart>
                      <div className="flex justify-between items-center">
                        <section className="flex flex-col">
                          <p className="text-custom-darkTeal font-bold text-lg">
                            {trend.formattedTraffic}
                          </p>
                          <span className="text-white text-xs">
                            Vol Penelusuran
                          </span>
                        </section>
                        <section className="flex flex-col">
                          <p className="text-custom-darkTeal font-bold text-lg">
                            {trend.articles[0].timeAgo}
                          </p>
                        </section>
                      </div>
                    </TrendsContainer>
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            href="/dashboard/trends"
            className="text-neutral-400 flex items-center justify-center mt-2 text-sm"
          >
            View More...
          </Link>
        </div>
        <TrendsInput className="relative w-[90%] max-w-[35rem] text-lg" />
      </article>
    </div>
  );
}
