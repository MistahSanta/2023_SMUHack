"use client";
import React from "react";
// import Map from "../Maps/TestMap";

// without this the component renders on server and throws an error
import dynamic from "next/dynamic";

// Data
import {supabase} from "../../db/supabase";
import {useEffect, useState} from "react";

import TableThree from "../Tables/TableThree";
import FutureAssetTypePieChart from "../Charts/FutureAssetTypePieChart";

import ChartFour from "../Charts/ChartFour";
import FutureBarGraph from "../Charts/FutureBarGraph";

const MapOne = dynamic(() => import("../Maps/MapOne"), {
  ssr: false,
});

const FutureDashBoard: React.FC = () => {
  const [totalManagedAssets, setTotalManagedAssets] = useState(0);
  const [openWorkOrders, setOpenWorkOrders] = useState(0);

  const loadCount = async () => {
    let { count, error } = await supabase
    .from('cbre')
    .select('*', { count: 'exact' })
    
    setTotalManagedAssets(count);
  }

  const loadOpenWorkOrders = async () => {
    let { data, error } = await supabase
    .from('open_work_orders')
    .select('Difference')
    setOpenWorkOrders(data[0].Difference);
  }


  useEffect(() => {
    loadCount();
    loadOpenWorkOrders();
    // loadAssetTypes();
  }, [])

  return (
    <>

        <TableThree />
        
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        {/* <ChartOne />  */}
        
      
          
        <div className="col-span-12 xl:col-span-6">
        <FutureAssetTypePieChart/>
        
        </div>
        <div className="col-span-12 xl:col-span-6">

          <FutureBarGraph />
        </div>
        {/* <ChatCard /> */}
      </div>
    </>
  );
};

export default FutureDashBoard;
