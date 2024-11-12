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
      const depthMap = {};
      const freqMap = {};

      if (
        this instanceof Highcharts.Series.types.networkgraph &&
        e.options.id === "lang-tree"
      ) {
        e.options.data.forEach(function (link) {
          const parent = link[0];
          const child = link[1];

          freqMap[parent] = (freqMap[parent] || 0) + 1;
          freqMap[child] = (freqMap[child] || 0) + 1;

          if (!nodes[parent]) {
            nodes[parent] = {
              id: parent,
              marker: { radius: 25 },
              color: colors[0],
              frequency: freqMap[parent],
            };
            depthMap[parent] = 0;
          }

          const parentDepth = depthMap[parent] + 1;
          depthMap[child] = parentDepth;

          nodes[child] = {
            id: child,
            marker: {
              radius: Math.min(4 + freqMap[child] * 1, 12),
            },
            color: colors[parentDepth % colors.length],
            frequency: freqMap[child],
          };
        });

        const maxFrequency = Math.max(
          ...Object.values(freqMap).filter(
            (f) => f < freqMap[Object.keys(nodes)[0]]
          )
        );

        e.options.nodes = Object.keys(nodes).map((id) => {
          const isRoot = depthMap[id] === 0;
          const frequency = freqMap[id] || 1;
          return {
            ...nodes[id],
            marker: {
              radius: isRoot ? 20 : 4 + (frequency / maxFrequency) * 2,
            },
            dataLabels: {
              style: {
                fontSize: isRoot
                  ? "0.5rem"
                  : `${0.5 + (frequency / maxFrequency) * 0.075}rem`,
              },
            },
            frequency: frequency,
          };
        });
      }
    });
  }, []);

  // Hitung repulsive dan linkLength berdasarkan jumlah data
  const repulsiveForce = Math.min(400, Math.max(100, 6000 / data.length));
  const linkLengthValue = Math.min(300, Math.max(50, 5000 / data.length));

  const options = {
    chart: {
      type: "networkgraph",
      height: "50%",
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
          friction: -0.9995,
          repulsive: repulsiveForce, // Dinamis berdasarkan jumlah data
          linkLength: linkLengthValue, // Dinamis berdasarkan jumlah data
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
