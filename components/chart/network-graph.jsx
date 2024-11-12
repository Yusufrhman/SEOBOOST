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
      const colors = ["#fac29d", "#f7ad7c", "#f5914e", "#fa7c28", "#ff6600"];
      const nodes = {};
      const depthMap = {};
      const freqMap = {}; // Frekuensi total untuk setiap node
      const depthFreqMap = {}; // Frekuensi berdasarkan kedalaman

      // Pastikan keyword utama sebagai root berada di kedalaman 0
      const mainKeyword = title;
      depthMap[mainKeyword] = 0;

      if (
        this instanceof Highcharts.Series.types.networkgraph &&
        e.options.id === "lang-tree"
      ) {
        e.options.data.forEach(function (link) {
          const parent = link[0];
          const child = link[1];

          // Hitung frekuensi total (independen dari kedalaman)
          freqMap[child] = (freqMap[child] || 0) + 1;

          // Tentukan kedalaman child berdasarkan kedalaman parent (maksimal 3)
          const parentDepth = depthMap[parent];
          const childDepth = Math.min(parentDepth + 1, 3); // Batasi kedalaman hingga 3
          depthMap[child] = childDepth;

          // Hitung frekuensi kemunculan child pada kedalaman tertentu
          if (!depthFreqMap[child]) depthFreqMap[child] = {};
          depthFreqMap[child][childDepth] =
            (depthFreqMap[child][childDepth] || 0) + 1;

          // Inisialisasi node
          if (!nodes[parent]) {
            nodes[parent] = {
              id: parent,
              marker: { radius: 25 },
              color: colors[0],
              frequency: freqMap[child],
            };
          }

          nodes[child] = {
            id: child,
            marker: {
              radius: Math.min(4 + freqMap[child] * 1, 12),
            },
            color: colors[childDepth % colors.length],
            frequency: freqMap[child],
          };
        });

        const maxFrequency = Math.max(...Object.values(freqMap));

        // Pemberian warna berdasarkan kategori frekuensi
        const getColorByFrequency = (frequency) => {
          const percentage = frequency / maxFrequency;
          if (percentage >= 0.8) return colors[4];
          if (percentage >= 0.6) return colors[3];
          if (percentage >= 0.4) return colors[2];
          if (percentage >= 0.2) return colors[1];
          return colors[0];
        };

        e.options.nodes = Object.keys(nodes).map((id) => {
          const isRoot = depthMap[id] === 0;
          const frequency = freqMap[id] || 1;
          return {
            ...nodes[id],
            marker: {
              radius: isRoot ? 20 : 4 + (frequency / maxFrequency) * 9,
            },
            color: isRoot ? "#ff4400" : getColorByFrequency(frequency),
            dataLabels: {
              style: {
                fontSize: isRoot
                  ? "2rem"
                  : `${0.5 + (frequency / maxFrequency) * 0.8}rem`,
              },
            },
            frequency: frequency,
            depthFreq: depthFreqMap[id], // Menyimpan frekuensi per kedalaman
          };
        });
      }
    });
  }, []);

  const repulsiveForce = Math.min(400, Math.max(100, 6000 / data.length));
  const linkLengthValue = Math.min(300, Math.max(50, 5000 / data.length));

  const options = {
    chart: {
      type: "networkgraph",
      height: "30%",
      backgroundColor: "#171717",
      events: {
        load: function () {
          const chart = this;
          chart.series[0].nodes.forEach((node, index) => {
            node.plotX = Math.cos(index) * 300 + chart.plotWidth / 2;
            node.plotY = Math.sin(index) * 300 + chart.plotHeight / 2;
          });
          chart.redraw();
        },
      },
    },
    title: {
      text: "Related Keywords",
      style: { color: "#36BFB1", fontSize: "1.5rem" },
    },
    tooltip: {
      formatter: function () {
        const node = this.point;
        const depthFreq = node.depthFreq || {};

        // Jika ada kedalaman lebih dari 3, masukkan ke dalam kedalaman ke-3
        const mergedDepthInfo = { ...depthFreq };
        if (Object.keys(mergedDepthInfo).some((depth) => depth > 3)) {
          mergedDepthInfo[3] = Object.keys(mergedDepthInfo)
            .filter((depth) => depth > 3)
            .reduce(
              (acc, depth) => acc + mergedDepthInfo[depth],
              mergedDepthInfo[3] || 0
            );

          // Hapus kedalaman lebih dari 3 setelah digabungkan
          Object.keys(mergedDepthInfo)
            .filter((depth) => depth > 3)
            .forEach((depth) => delete mergedDepthInfo[depth]);
        }

        const depthInfo = Object.keys(mergedDepthInfo)
          .map((depth) => `Kedalaman ke-${depth}: ${mergedDepthInfo[depth]}x`)
          .join("<br/>");

        return `<b>${node.id}</b><br/>Frequency: ${
          node.frequency || 1
        }<br/>${depthInfo}`;
      },
    },
    plotOptions: {
      networkgraph: {
        keys: ["from", "to"],
        layoutAlgorithm: {
          enableSimulation: true,
          friction: -0.9995,
          repulsive: repulsiveForce,
          linkLength: linkLengthValue,
          gravitationalConstant: 0.5,
        },
      },
    },
    series: [
      {
        accessibility: {
          enabled: false,
        },
        dataLabels: {
          allowOverlap: false,
          enabled: true,
          linkFormat: "",
          style: {
            fontSize: "0.8em",
            fontWeight: "normal",
          },
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
