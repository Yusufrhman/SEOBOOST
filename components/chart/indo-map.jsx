"use client";
import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsMap from "highcharts/modules/map";

// Initialize Highcharts map module
HighchartsMap(Highcharts);

const MapChart = ({geoMapData}) => {
  const [topology, setTopology] = useState(null);
  let mapData = geoMapData;

  useEffect(() => {
    // Fetch the map data when the component mounts
    const fetchData = async () => {
      const response = await fetch(
        "https://code.highcharts.com/mapdata/historical/countries/id-2011/id-all-2011.topo.json"
      );
      const data = await response.json();
      setTopology(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (topology && mapData.length) {
      const data = mapData.map((item) => [
        item.geoCode.toLowerCase(),
        item.value,
      ]);

      // Create the chart once the topology and data are loaded
      Highcharts.mapChart("container", {
        chart: {
          map: topology,
          backgroundColor: "#2b2b2b",
          style: {
            color: "#fff",
          },
        },

        title: {
          text: "Trends by Location",
          style: {
            color: "#36BFB1",
          },
        },

        mapNavigation: {
          enabled: false, // Disable map zooming and navigation controls
        },

        colorAxis: {
          min: 0,
          stops: [
            [0, "#ffc3b8"], // Oranye terang
            [1, "#ff2a00"], // Oranye gelap
          ],
        },

        series: [
          {
            data: data,
            name: "Minat Penelusuran",
            states: {
              hover: {
                color: "#BADA55",
              },
            },
            dataLabels: {
              enabled: true,
              format: "{point.name}",
              style: {
                color: "#fff",
              },
            },
            point: {
              events: {
                click: function () {
                  alert(`Clicked on ${this.name}`);
                },
              },
            },
          },
        ],
      });
    }
  }, [topology, mapData]);

  return <div id="container" style={{ width: "100%", height: "100%" }}></div>;
};

export default MapChart;
