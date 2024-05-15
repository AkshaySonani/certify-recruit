import React, { useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import "./styles.css";

const format = "MMM";

export default function App() {
  const [dates, setDates] = useState([
    new DateObject().set({ month: 7, format }),
  ]);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <div style={{ textAlign: "center" }}>
        <DatePicker
          onlyMonthPicker
          value={dates}
          onChange={(date) => setDates(date)}
          format={format}
          calendarPosition="bottom-center"
          plugins={[<DatePanel />]}
        />
      </div>
      <ul>
        {dates.map((date, index) => (
          <li key={index}>{date.format()}</li>
        ))}
      </ul>
    </div>
  );
}
