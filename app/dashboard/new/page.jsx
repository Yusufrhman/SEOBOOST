"use server";
import TrendChart from "@/components/chart/trend-chart";
import TrendsContainer from "@/components/dashboard/trends-container";
import { IconSearch } from "@tabler/icons-react";

export default async function Dashboard() {
  let trendsData = await fetch("http://localhost:3000/api/googletrend/daily");
  let trends = await trendsData.json();
  return (
    <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-700 bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full overflow-auto">
      <article className="w-full h-full flex flex-col items-center justify-center gap-[2rem]">
        <div>
          <h1 className="w-full mx-auto text-2xl text-transparent bg-gradient-to-r from-custom-teal to-custom-darkTeal inline-block bg-clip-text text-center font-bold">
            TRENDING KEYWORDS
          </h1>

          <ul className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-2">
            {trends.map((trend) => {
              return (
                <li key={trend.title.query}>
                  <TrendsContainer
                    className={
                      "px-4 py-6 hover:cursor-pointer flex flex-col justify-between"
                    }
                  >
                    <h2 className="text-white text-xl font-bold">
                      {trend.title.query}
                    </h2>
                    <TrendChart keyword={trend.title.query}></TrendChart>
                    <p className="text-neutral-200 text-sm">
                      VOLUME:{" "}
                      <span className="text-custom-darkTeal font-bold text-lg">
                        {trend.formattedTraffic}
                      </span>
                    </p>
                  </TrendsContainer>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="relative w-[90%] max-w-[35rem]">
          <input
            type="text"
            className="block w-[100%] pl-6 pr-12 py-2 rounded-full bg-transparent border-2 border-neutral-500 text-white focus:outline-none focus:border-custom-teal font-thin text-xl group"
            required
            placeholder="Explore Hot Trendings..." // Optional placeholder for better UX
          />
          <button type="button" aria-label="Search">
            <IconSearch
              stroke={2}
              className="absolute right-4 top-3 bottom-0 text-neutral-400"
            />
          </button>
        </div>
      </article>
    </div>
  );
}
