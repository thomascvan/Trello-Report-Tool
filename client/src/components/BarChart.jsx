import React from 'react';
import { Bar } from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto';

let Data = {
    labels: ["ricardopuente", "mattpericoni1"], 
    datasets: [{
        label: "Jobs Engineered",
        data: [38, 23]
    }]
};

// let Data = [
//     {
//       "ricardopuente": 38,
//       "mattpericoni1": 23,
//       "michalhastings": 11,
//       "thomas_van": 18,
//       "alexanderdabrowski": 4,
//       "danielrice12": 7,
//       "ezramalernee": 1,
//       "davidback5": 6,
//       "claytonbrown40": 1
//     }

//   ];
function BarChart() {
    return <Bar data={Data} />
}

export default BarChart;