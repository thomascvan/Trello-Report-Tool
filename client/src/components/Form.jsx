import React, { useState, useEffect } from "react";
import axios from "axios";

const Form = () => {

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [count, setCount] = useState('');
  const [leadTime, setLeadTime] = useState('');
  const [status, setStatus] = useState(undefined);
  const [backlog, setBacklog] = useState(undefined);
  const [engineerCount, setEngineerCount] = useState();

  function formSubmit() {
    setStatus('fetching...')
    axios.post('/',
      {
        "startDate": startDate,
        "endDate": endDate,
      }
    ).then((response) => {
      setStatus(' ')
      console.log(response.data);
      setBacklog(response.data.backlog);
      setCount(response.data.output);
      setLeadTime(Math.round(response.data.leadTime * 100) / 100);
      console.log(response.data.engineerCount)
      setEngineerCount(response.data.engineerCount);
    }).catch((err) => {
      console.log(err);
    })
  }

  return (
    <div className="attendee-form">
        <label>Start Date:
          <input type="date" onChange={e => setStartDate(e.target.value)} ></input>
        </label>
        <label>End Date:
          <input type="date" onChange={e => setEndDate(e.target.value)} ></input>
        </label>
        <button onClick={() => formSubmit() }>Run Report</button>
        <h2>Report</h2>
        { status ?
            <>
            {status}
            <p>Backlog: {backlog}</p>
            <p>Jobs Engineered: {count}</p>
            <p>Lead Time: {leadTime}</p>
            {engineerCount ? Object.keys(engineerCount).map((item, i) => <li key={i}>{item}: {engineerCount[item]}</li>) : null}
            </>
            : null
        }

    </div>
  );
};

export default Form;