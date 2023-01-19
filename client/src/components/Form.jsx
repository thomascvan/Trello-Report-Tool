import React from "react";
import axios from "axios";

const Form = () => {

  return (
<div className="attendee-form">
        <label>Start Date:
          <input type="date" onChange={e => setStartDate(e.target.value[0].toUpperCase() + e.target.value.substring(1))} ></input>
        </label>
        <label>End Date:
          <input type="date" onChange={e => setEndDate(e.target.value[0].toUpperCase() + e.target.value.substring(1))} ></input>
        </label>
        <button onClick={() => formSubmit() }>Run Report</button>
    </div>
  );
};

export default Form;