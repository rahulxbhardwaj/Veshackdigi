// Calculator.jsx
import React, { useState } from "react";
import '../styles/Calculator.css'; // Ensure the path is correct

function Calculator() {
  const [load, setLoad] = useState(1);
  const [rate, setRate] = useState("");
  const [savings, setSavings] = useState(null);
  const [yearlyUnits, setYearlyUnits] = useState(null);

  const calculateSavings = () => {
    const hoursInMonth = 30 * 5; // Assuming 5 hours of sunlight per day
    const totalUnitsMonthly = load * hoursInMonth;
    const totalUnitsYearly = totalUnitsMonthly * 12; // 12 months in a year
    const totalSavings = totalUnitsMonthly * rate;

    setSavings(totalSavings.toFixed(2));
    setYearlyUnits(totalUnitsYearly.toFixed(2));
  };

  return (
    <div className="calculator">
      <h2>Solar Savings Calculator</h2>

      <label>
        Kilowatt Load:
        <select value={load} onChange={(e) => setLoad(Number(e.target.value))}>
          {[1, 2, 3, 4, 5, 6, 7].map((num) => (
            <option key={num} value={num}>{num} kWh</option>
          ))}
        </select>
      </label>

      <label>
        Rate per Unit (in ₹):
        <input
          type="number"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          placeholder="Enter rate"
        />
      </label>

      <button onClick={calculateSavings}>Calculate</button>

      {savings && (
        <div className="savings-result">
          <p>Estimated Monthly Savings: ₹{savings}</p>
          <p>Estimated Annual Units Produced: {yearlyUnits} kWh</p>
        </div>
      )}
    </div>
  );
}

export default Calculator;
