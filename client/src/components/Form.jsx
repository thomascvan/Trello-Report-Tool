import React, { useState, useEffect } from "react";
import axios from "axios";

const Form = () => {

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [count, setCount] = useState('');

  function formSubmit() {
    setCount('fetching...')
    axios.post('/',
      {
        "startDate": startDate,
        "endDate": endDate,
      }
    ).then((response) => {
      console.log(response.data);
      setCount(response.data);
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
        <h2>Count</h2> {count}
    </div>
  );
};

export default Form;