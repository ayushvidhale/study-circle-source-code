import Script from "next/script";
import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";


export default function Reports({userDetails}) {
  
  const chartRef = useRef(null);

useEffect(() => {
  const ctx = document.getElementById('myChart').getContext('2d');

  const data = userDetails[0]?.streaks?.slice(-7).map(item => item.time) || [0, 0, 0, 0, 0, 0, 0];

  const weekdayLabels = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const labels = Array.from({ length: 7 }, (_, index) => {
    const streak = userDetails[0]?.streaks?.slice(-7)[index];
    if (streak && streak.date) {
      const date = new Date(streak.date);
      const weekday = weekdayLabels[date.getDay()];
      return weekday;
    } else {
      return '';
    }
  });

  if (chartRef.current) {
    // Destroy the previous chart instance
    chartRef.current.destroy();
  }

  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          data: data,
          label: "Minutes / Day",
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(0, 255, 0)',
            'rgb(255, 99, 132)',
            'rgb(128, 255, 0)',
            'rgb(0, 255, 255)',
            'rgb(255, 255, 0)',
            'rgb(255, 255, 128)'
          ],
          borderWidth: 2
        }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  // Store the chart instance in the ref
  chartRef.current = myChart;
}, [userDetails]);

  return (
    <>
      <div className="w-full rounded-2xl md:py-4 grid place-content-center place-items-center justify-center mb-4">
        <h1 className="w-full mx-auto md:mb-6 mb-2 text-xl font-semibold capitalize ">Weekly Report</h1>
        <div className="xl:w-[1000px] lg:w-[800px] md:w-[600px] w-[300px]  h-fit flex mx-auto my-auto">
          <div className='border border-gray-400 pt-0 rounded-xl  w-full h-fit my-auto  shadow-lg'>
            <canvas id='myChart'></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
