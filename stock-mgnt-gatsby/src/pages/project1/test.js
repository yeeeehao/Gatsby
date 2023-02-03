import React from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  defaults,
} from "chart.js"
import { Line } from "react-chartjs-2"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "GPA per Semester",
    },
  },
}

const labels = ["January", "February", "March", "April", "May", "June", "July"]

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [25, 20, 8, 12, 34],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
}

const LineChart = () => {
  return (
    <div style={{ width: "750px" }}>
      <Line options={options} data={data} />
    </div>
  )
}

export default LineChart
