import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "../styles/SolarImpactCalculator.css";

// Register necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const SolarImpactCalculator = () => {
  const [userId, setUserId] = useState("");
  const [investment, setInvestment] = useState("");
  const [project, setProject] = useState("Solar Farm A");
  const [results, setResults] = useState(null);
  const [investmentYears, setInvestmentYears] = useState(1);
  const [investmentResults, setInvestmentResults] = useState([]);

  const projectsData = [
    {
      "Project Name": "Solar Farm A",
      "Total Energy Produced (kWh)": 100000,
      "Total Investment ($)": 200000,
      "CO2 Reduction (g)": 50000000,
      "Savings Per kWh": 0.1,
    },
    {
      "Project Name": "Emmvee Solar",
      "Total Energy Produced (kWh)": 150000,
      "Total Investment ($)": 300000,
      "CO2 Reduction (g)": 75000000,
      "Savings Per kWh": 0.1,
    },
  ];

  const calculateUserEnergy = (userData) => {
    const projectData = projectsData.find(
      (p) => p["Project Name"] === userData.project,
    );
    if (!projectData) return null;

    const userSharePercentage =
      (userData.investment / projectData["Total Investment ($)"]) * 100;
    const energyProduced =
      projectData["Total Energy Produced (kWh)"] * (userSharePercentage / 100);
    const co2Reduction =
      projectData["CO2 Reduction (g)"] * (userSharePercentage / 100);
    const savings = energyProduced * projectData["Savings Per kWh"];

    return {
      "User ID": userData.userId,
      "Investment ($)": userData.investment,
      Project: userData.project,
      "Energy Produced (kWh)": energyProduced,
      "CO2 Reduction (g)": co2Reduction,
      "Savings ($)": savings,
    };
  };

  const calculateUserImpact = (userEnergy) => {
    const coalEmissions = 820; // kg per kWh
    const solarEmissions = 40; // kg per kWh
    const electricityCost = 0.4; // $ per kWh

    const userCo2Offset =
      ((coalEmissions - solarEmissions) * userEnergy["Energy Produced (kWh)"]) /
      1000; // kg
    const userSavings = userEnergy["Energy Produced (kWh)"] * electricityCost;

    return {
      "User ID": userEnergy["User ID"],
      "Investment ($)": userEnergy["Investment ($)"],
      Project: userEnergy["Project"],
      "Energy Produced (kWh)": userEnergy["Energy Produced (kWh)"],
      "CO₂ Offset (kg)": userCo2Offset,
      "Savings ($)": userSavings,
    };
  };

  const simulateInvestmentImpact = (amount, years) => {
    const growthRate = 0.12;
    const projections = [];

    for (let year = 1; year <= years; year++) {
      const adjustedInvestment = amount * (1 + growthRate) ** year;
      projections.push({
        year,
        projectedSavings: adjustedInvestment * 0.12,
      });
    }

    return projections;
  };

  const handleCalculateImpact = () => {
    const userData = { userId, investment: parseFloat(investment), project };
    const userEnergy = calculateUserEnergy(userData);

    if (userEnergy) {
      const userImpact = calculateUserImpact(userEnergy);
      setResults(userImpact);
    } else {
      setResults(null);
    }
  };

  const handleInvestmentSimulation = () => {
    const investmentAmount = parseFloat(investment);
    const investmentYearsParsed = parseInt(investmentYears, 10);

    if (isNaN(investmentAmount) || isNaN(investmentYearsParsed)) {
      alert("Please enter valid numbers for investment and years.");
      return;
    }

    const newResults = simulateInvestmentImpact(
      investmentAmount,
      investmentYearsParsed,
    );

    // Accumulate previous investment results with the new ones
    setInvestmentResults((prevResults) => {
      const combinedResults = [...prevResults];

      newResults.forEach((newRes, index) => {
        if (combinedResults[index]) {
          combinedResults[index].projectedSavings += newRes.projectedSavings;
        } else {
          combinedResults.push(newRes);
        }
      });

      return combinedResults;
    });
  };

  const investmentChartData = {
    labels: investmentResults
      ? investmentResults.map((res) => `Year ${res.year}`)
      : [],
    datasets: [
      {
        label: "Projected Savings ($)",
        data: investmentResults
          ? investmentResults.map((res) => res.projectedSavings)
          : [],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const userImpactChartData = {
    labels: ["Energy Produced (kWh)", "CO₂ Offset (kg)", "Savings ($)"],
    datasets: [
      {
        label: "User Impact",
        data: results
          ? [
              results["Energy Produced (kWh)"],
              results["CO₂ Offset (kg)"],
              results["Savings ($)"],
            ]
          : [],
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Projected Savings Over Investment Years",
      },
    },
  };

  const userImpactChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "User Impact Overview",
      },
    },
  };

  return (
    <div className="impact-calculator">
      <h2>Solar Impact Calculator</h2>
      <label>
        User ID:
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
      </label>
      <label>
        Investment ($):
        <input
          type="number"
          value={investment}
          onChange={(e) => setInvestment(e.target.value)}
          required
        />
      </label>
      <label>
        Project:
        <select value={project} onChange={(e) => setProject(e.target.value)}>
          {projectsData.map((p) => (
            <option key={p["Project Name"]} value={p["Project Name"]}>
              {p["Project Name"]}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleCalculateImpact}>Calculate Impact</button>

      {results && (
        <div className="results">
          <h3>Impact Results</h3>
          <p>User ID: {results["User ID"]}</p>
          <p>Project: {results["Project"]}</p>
          <p>Energy Produced (kWh): {results["Energy Produced (kWh)"]}</p>
          <p>CO₂ Offset (kg): {results["CO₂ Offset (kg)"]}</p>
          <p>Savings ($): {results["Savings ($)"]}</p>
        </div>
      )}

      {results && (
        <div className="user-impact-chart">
          <h3>User Impact Visualization</h3>
          <Bar data={userImpactChartData} options={userImpactChartOptions} />
        </div>
      )}

      <label>
        Investment Years:
        <input
          type="number"
          value={investmentYears}
          onChange={(e) => setInvestmentYears(e.target.value)}
          required
        />
      </label>
      <button onClick={handleInvestmentSimulation}>
        Simulate Investment Impact
      </button>

      {investmentResults && investmentResults.length > 0 && (
        <div className="investment-results">
          <h3>Projected Investment Savings</h3>
          <Bar data={investmentChartData} options={chartOptions} />
        </div>
      )}
    </div>
  );
};

export default SolarImpactCalculator;
