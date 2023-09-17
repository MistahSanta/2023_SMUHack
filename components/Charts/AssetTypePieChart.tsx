"use client";
import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { supabase } from "@/db/supabase";
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface AssetTypeState {
  series: number[];
  labels: string[];
}

const options: ApexOptions = {
  chart: {
    type: "donut",
  },
  colors: ["#8ecae6", "#219ebc", "#023047", "#ffb703", "fb8500"],
  labels: [],
  legend: {
    show: true,
    position: "bottom",
  },

  plotOptions: {
    pie: {
      donut: {
        size: "65%",
        background: "transparent",
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: 380,
        },
      },
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 200,
        },
      },
    },
  ],
};

const AssetTypePieChart: React.FC = () => {
  const [state, setState] = useState<AssetTypeState>({
    series: [],
    labels: [],
  });

  const loadAssets = async () => {
    let { data, error } = await supabase
    .from('top_assets')
    .select('*')
    
    if (data && data.length > 0) {
      setState({
        series: data.map((item) => item["count"]),
        labels: data.map((item) => item["Asset Type"]),
      })
      console.log(state)
    }
  }

  useEffect(() => {
    loadAssets();
  }, []);
  

  return (
    <div className="col-span-12 rounded-lg border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-5">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            Asset Type Analytics
          </h5>
        </div>
        <div>
          <div className="relative z-20 inline-block">
            <span className="absolute top-1/2 right-3 z-10 -translate-y-1/2">
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
              </svg>
            </span>
          </div>
        </div>
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart
            options={{...options, labels: state.labels}}
            series={state.series}
            type="donut"
          />
        </div>
      </div>

      
    </div>
  );
};

export default AssetTypePieChart;
