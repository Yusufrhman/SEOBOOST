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

export default function NetworkGraph({ data, detail, title }) {
  console.log(detail)
  useEffect(() => {
    Highcharts.addEvent(Highcharts.Series, "afterSetOptions", function (e) {
      const nodes = {};
      const freqMap = {}; // Menyimpan frekuensi total untuk setiap node

      if (
        this instanceof Highcharts.Series.types.networkgraph &&
        e.options.id === "lang-tree"
      ) {
        e.options.data.forEach(function (link) {
          const parent = link[0];
          const child = link[1];

          // Hitung frekuensi total (independen dari kedalaman)
          freqMap[child] = (freqMap[child] || 0) + 1;

          // Inisialisasi node jika belum ada
          if (!nodes[parent]) {
            nodes[parent] = {
              id: parent,
              marker: { radius: 30 }, // Ukuran tetap
              color: "#ff6600", // Warna merah untuk parent
              frequency: freqMap[parent] || 1, // Menyimpan frekuensi
              fontSize: `24px`,
            };
          }

          nodes[child] = {
            id: child,
            marker: { radius: Math.max(getRadius(child), 3) },
            color: getColor(getDepth(child)), // Warna berdasarkan kedalaman
            frequency: freqMap[child], // Menyimpan frekuensi
            fontSize: `${Math.max(getFontSize(child), 8)}px`, // Menghitung ukuran font berdasarkan kedalaman
          };
        });

        // Gunakan nodes yang telah diinisialisasi
        e.options.nodes = Object.values(nodes);
      }
    });
  }, []);

  function getRadius(child) {
    let detailKeyword = detail[`${child.toLowerCase()}`];
    const totalKedalaman =
      detailKeyword.kedalaman1 * 4 +
      detailKeyword.kedalaman2 * 3 +
      detailKeyword.kedalaman3 * 2 +
      detailKeyword.kedalaman4 * 1;
    return totalKedalaman;
  }

  function getFontSize(child) {
    let detailKeyword = detail[`${child.toLowerCase()}`];
    const totalKedalaman =
      detailKeyword.kedalaman1 * 4 +
      detailKeyword.kedalaman2 * 3 +
      detailKeyword.kedalaman3 * 2 +
      detailKeyword.kedalaman4 * 1;

    // Menyesuaikan ukuran font dengan total kedalaman
    return totalKedalaman;
  }

  function getDepth(child) {
    // Hitung kedalaman berdasarkan detail
    let detailKeyword = detail[`${child.toLowerCase()}`];
    if (!detailKeyword) return 4; // Default jika tidak ada data
    if (detailKeyword.kedalaman1 > 0) return 1;
    if (detailKeyword.kedalaman2 > 0) return 2;
    if (detailKeyword.kedalaman3 > 0) return 3;
    return 4;
  }

  function getColor(depth) {
    // Mengatur warna berdasarkan kedalaman (semakin besar kedalaman, semakin terang)
    const colors = ["#fa7c28", "#f5914e", "#f7ad7c", "#fac29d"]; // Merah -> Oranye -> Kuning
    return colors[depth - 1]; // Default warna kuning pucat untuk depth 4+
  }

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
      text: title || "Related Keywords",
      style: { color: "#36BFB1", fontSize: "1.5rem" },
    },
    tooltip: {
      formatter: function () {
        const node = this.point;
        const keywordDetail = detail[node.id.toLowerCase()] || {};
        return `
          <b>${node.id}</b><br/>
          Frequency: ${node.frequency || 1}<br/>
          Kedalaman 1: ${keywordDetail.kedalaman1 || 0}<br/>
          Kedalaman 2: ${keywordDetail.kedalaman2 || 0}<br/>
          Kedalaman 3: ${keywordDetail.kedalaman3 || 0}<br/>
          Kedalaman 4: ${keywordDetail.kedalaman4 || 0}
        `;
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
            fontWeight: "normal",
            color: "#fff", // Tambahan untuk warna teks
          },
          formatter: function () {
            return `<span style="font-size:${this.point.fontSize || "12px"}">${
              this.point.id
            }</span>`;
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
