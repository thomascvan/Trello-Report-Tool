import React from 'react';
import { Bar } from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto';

let objData = {
      "ricardopuente": 38,
      "mattpericoni1": 23,
      "michalhastings": 11,
      "thomas_van": 18,
      "alexanderdabrowski": 4,
      "danielrice12": 7,
      "ezramalernee": 1,
      "davidback5": 6,
      "claytonbrown40": 1
    };

let keys = Object.keys(objData);
let values = Object.values(objData);

let Data = {
    labels: keys, 
    datasets: [{
        label: "Jobs Engineered",
        data: values
    }]
};

function BarChart() {
    // return <Bar data={Data} width={"30%"} options={{ maintainAspectRatio: false }}/>
    // return <Bar data={Data} width={"30%"} height={"10%"} />
    return <Bar data={Data} options={{ maintainAspectRatio: false }}/>
}

export default BarChart;