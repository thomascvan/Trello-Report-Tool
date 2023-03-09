import React, { Component } from "react";
import Form from "./Form.jsx";
import BarChart from "./BarChart.jsx";
import '../style.css';

class App extends Component {

    render() {
        return (
            <>
            <div>
                <h1>JE Engineering Output Report</h1>
                <Form />
            </div>
            <div className="chart-container" style={{position: 'relative', height: '40vh', width:'70vw'}}> <h6>STILL TESTING, NOT ACCURATE:</h6> <BarChart /> </div>
            {/* <BarChart style={{position: 'relative', height: '40vh', width:'80vw'}}/> */}
            </>
        )
    }
}

export default App;