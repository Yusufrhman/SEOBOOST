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
      const freqMap = {}; // Menyimpan frekuensi kemunculan setiap keyword

      if (
        this instanceof Highcharts.Series.types.networkgraph &&
        e.options.id === "lang-tree"
      ) {
        e.options.data.forEach(function (link) {
          const parent = link[0];
          const child = link[1];

          // Hitung frekuensi setiap node muncul
          freqMap[parent] = (freqMap[parent] || 0) + 1;
          freqMap[child] = (freqMap[child] || 0) + 1;

          if (!nodes[parent]) {
            nodes[parent] = {
              id: parent,
              marker: { radius: 25 },
              color: colors[0],
              frequency: freqMap[parent], // Simpan frekuensi untuk tooltip
            };
            depthMap[parent] = 0;
          }

          // Menentukan kedalaman untuk child
          const parentDepth = depthMap[parent] + 1;
          depthMap[child] = parentDepth;

          // Mengatur warna dan radius berdasarkan kedalaman dan frekuensi
          nodes[child] = {
            id: child,
            marker: {
              radius: Math.min(4 + freqMap[child] * 1.05, 12),
            },
            color: colors[parentDepth % colors.length],
            frequency: freqMap[child], // Simpan frekuensi untuk tooltip
          };
        });

        // Temukan frekuensi maksimum selain root
        const maxFrequency = Math.max(
          ...Object.values(freqMap).filter(
            (f) => f < freqMap[Object.keys(nodes)[0]]
          )
        );

        // Tentukan radius dan ukuran teks untuk setiap node
        e.options.nodes = Object.keys(nodes).map((id) => {
          const isRoot = depthMap[id] === 0;
          const frequency = freqMap[id] || 1;
          return {
            ...nodes[id],
            marker: {
              radius: isRoot ? 20 : 4 + (frequency / maxFrequency) * 3,
            },
            dataLabels: {
              style: {
                fontSize: isRoot
                  ? "14px"
                  : `${7 + (frequency / maxFrequency) * 4}px`,
              },
            },
            frequency: frequency, // Tambahkan frekuensi untuk tooltip
          };
        });
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
      style: { color: "white" },
    },
    tooltip: {
      formatter: function () {
        const node = this.point;
        return `<b>${node.id}</b><br/>Frequency: ${node.frequency || 1}`;
      },
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
          style: { fontWeight: "normal" },
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
