import React, { useState, useEffect } from "react";
import axios from "axios";

const Form = () => {

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [count, setCount] = useState('');
  const [leadTime, setLeadTime] = useState('');
  const [status, setStatus] = useState(undefined);

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
      setCount(response.data.output);
      setLeadTime(Math.round(response.data.leadTime * 100) / 100);
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
            <p>Jobs Engineered: {count}</p>
            <p>Lead Time: {leadTime}</p>
            </>
            : null
        }

    </div>
  );
};

export default Form;