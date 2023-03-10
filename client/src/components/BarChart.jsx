import React, { useState, useEffect } from "react";

import { Bar } from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto';


function BarChart(props) {
    let objData = props.data;

    let keys = Object.keys(objData);
    let values = Object.values(objData);

    let Data = {
        labels: keys,
        datasets: [{
            label: "Jobs Engineered",
            data: values
        }]
    };

    return <Bar data={Data} options={{ maintainAspectRatio: false }}/>
}

export default BarChart;