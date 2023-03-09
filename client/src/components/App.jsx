import React, { Component } from "react";
import Form from "./Form.jsx";
import BarChart from "./BarChart.jsx";
import '../style.css';

class App extends Component {

    render() {
        return (
            <div>
                <h1>JE Engineering Output Report</h1>
                <Form />
                <BarChart />
            </div>
        )
    }
}

export default App;