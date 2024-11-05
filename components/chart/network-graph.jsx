"use client";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import networkgraph from "highcharts/modules/networkgraph";
import exporting from "highcharts/modules/exporting";
import accessibility from "highcharts/modules/accessibility";
import { useEffect } from "react";

// Inisialisasi module tambahan
if (typeof Highcharts === "object") {
  networkgraph(Highcharts);
  exporting(Highcharts);
  accessibility(Highcharts);
}

export default function NetworkGraph({ data, title }) {
  useEffect(() => {
    Highcharts.addEvent(Highcharts.Series, "afterSetOptions", function (e) {
      const colors = Highcharts.getOptions().colors;
      const nodes = {};
      const depthMap = {}; // Menyimpan kedalaman keyword
      let i = 0;

      if (
        this instanceof Highcharts.Series.types.networkgraph &&
        e.options.id === "lang-tree"
      ) {
        e.options.data.forEach(function (link) {
          const parent = link[0];
          const child = link[1];

          if (!nodes[parent]) {
            nodes[parent] = {
              id: parent,
              marker: { radius: 20 },
              color: colors[0], // Warna untuk root node
            };
            depthMap[parent] = 0; // Kedalaman root
          }

          // Menentukan kedalaman untuk child
          const parentDepth = depthMap[parent] + 1;
          depthMap[child] = parentDepth;

          // Mengatur warna berdasarkan kedalaman
          nodes[child] = {
            id: child,
            marker: { radius: 5 },
            color: colors[parentDepth % colors.length], // Warna berdasarkan kedalaman
          };
        });

        e.options.nodes = Object.keys(nodes).map((id) => nodes[id]);
      }
    });
  }, []);

  const options = {
    chart: {
      type: "networkgraph",
      height: "100%",
      backgroundColor: "#171717",
    },
    title: {
      text: title,
      color: "white",
    },
    plotOptions: {
      networkgraph: {
        keys: ["from", "to"],
        layoutAlgorithm: {
          enableSimulation: true,
          friction: -0.9,
        },
      },
    },
    series: [
      {
        accessibility: { enabled: false },
        dataLabels: {
          enabled: true,
          linkFormat: "",
          style: { fontSize: "0.75rem", fontWeight: "normal" },
        },
        id: "lang-tree",
        data: data,
      },
    ],
  };

  return (
    <figure className="highcharts-figure">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </figure>
  );
}
