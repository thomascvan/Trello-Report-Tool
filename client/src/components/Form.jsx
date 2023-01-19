import React, { useState, useEffect } from "react";
import axios from "axios";

const Form = () => {

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  return (
<div className="attendee-form">
        <label>Start Date:
          <input type="date" onChange={e => setStartDate(e.target.value)} ></input>
        </label>
        <label>End Date:
          <input type="date" onChange={e => setEndDate(e.target.value)} ></input>
        </label>
        <button onClick={() => formSubmit() }>Run Report</button>
    </div>
  );
};

export default Form;