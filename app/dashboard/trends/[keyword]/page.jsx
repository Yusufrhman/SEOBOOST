import IndonesiaMap from "@/components/chart/indo-map";
import NetworkGraph from "@/components/chart/network-graph";
import Table from "@/components/chart/table";
import { convertToNodePairs } from "@/lib/utils/convertToNodePairs";
import { countKeywords } from "@/lib/utils/countKeyword";

export default async function Page({ params }) {
  const keyword = decodeURIComponent(params.keyword);
  let relatedKeyword = await fetch(
    `http://localhost:3000/api/relatedQueries?keyword=${keyword}`
  );
  let keywordData = await relatedKeyword.json();
  let getGeoMapData = await fetch(
    `http://localhost:3000/api/googletrend/interest-by-region?keyword=${keyword}`
  );
  let geoMapDataFull = await getGeoMapData.json();
  let geoMapData = geoMapDataFull.default.geoMapData;


  const dataForNetworkGraph = convertToNodePairs(keywordData);
  const countKeywordDepth = countKeywords(keywordData)

  return (
    <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-700 bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full overflow-auto">
      <div className=" w-full flex flex-col gap-10">
        <NetworkGraph
          data={dataForNetworkGraph}
          detail={countKeywordDepth}
          title={keywordData.mainKeyword}
        />
        <section className="h-[50vh] overflow-scroll relative">
          <Table data={countKeywordDepth} />
        </section>

        <section className="h-fit">
          <section className="flex gap-8 items-center justify-between h-[30rem] bg-[#2b2b2b] p-8 rounded-lg">
            <IndonesiaMap geoMapData={geoMapData} />
            <div className="w-[95%] h-full">
              <h2 className="text-custom-teal text-xl text-center font-bold pb-4">
                Minat Menurut Sub-Wilayah
              </h2>
              <div className="h-[24rem] overflow-y-auto">
                <table className="w-full border-collapse text-white">
                  <thead>
                    <tr className="text-left font-bold border-b border-gray-600">
                      <th className="p-3">Urutan Ke-</th>
                      <th className="p-3">Wilayah</th>
                      <th className="p-3">Minat Pencarian</th>
                    </tr>
                  </thead>
                  <tbody>
                    {geoMapData.map((item, index) => {
                      return (
                        <tr
                          id={item.id}
                          key={item.id}
                          className="border-b border-gray-600"
                        >
                          <td className="p-3">{index + 1}</td>
                          <td className="p-3">{item.geoName}</td>
                          <td className="p-3">{item.value}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </section>
      </div>
    </div>
  );
}