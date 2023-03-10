// import React, { Component } from "react";
import React, { useState, useEffect } from "react";
import Form from "./Form.jsx";
import BarChart from "./BarChart.jsx";
import '../style.css';

const App = () => {

    const [chartData, setChartData] = useState({});

    function updateData(data) {
        setChartData(data);
    }

        return (
            <>
            <div>
                <h1>JE Engineering Output Report</h1>
                <Form updateData={updateData}/>
            </div>
            <div className="chart-container" style={{position: 'relative', height: '40vh', width:'70vw'}}> <BarChart data={chartData} /> </div>
            </>
        )
}

export default App;