"use server";
import TrendChart from "@/components/chart/trend-chart";
import TrendsContainer from "@/components/dashboard/trends-container";
import Link from "next/link";
import TrendsInput from "@/components/trends-keyword/trends-input";
import TrendsTitle from "@/components/trends-keyword/trends-title";

export default async function Dashboard() {
  let trendsData = await fetch("http://localhost:3000/api/googletrend/daily", {
    next: { revalidate: 300 }, // Revalidate setiap 5 menit
  });
  // let trendsData = await fetch("http://localhost:3000/api/googletrend/daily");
  // let trendsData = await fetch("http://localhost:8000/trends");

  let trendsJson = await trendsData.json();
  let trends;
  trends = trendsJson.trendingSearchesDays.flatMap(
    (trendingSearchesDay) => trendingSearchesDay.trendingSearches
  );
  return (
    <div className="relative p-2 md:p-10 rounded-tl-2xl border border-neutral-700 bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full overflow-scroll">
      <article className="w-fit h-full gap-[2rem] mx-auto flex flex-col gap-">
        <div className="flex items-center justify-between">
          <TrendsTitle className="w-fit text-2xl text-transparent bg-gradient-to-r from-custom-teal to-custom-darkTeal inline-block bg-clip-text text-center font-bold" />
          <TrendsInput
            className={"relative w-[40%] max-w-[35rem] flex  items-center "}
          />
        </div>
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6 mt-2 w-fit mx-auto">
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
                    <div className="flex justify-between items-end">
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
      </article>
    </div>
  );
}
