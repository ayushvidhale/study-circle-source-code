import Script from "next/script";
import { useState, useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

export default function Reports({ userDetails }) {
  const chartRef = useRef(null);
  const [reportType, setReportType] = useState('weekly'); // Default to weekly report


  console.log(userDetails);

  useEffect(() => {
    const ctx = document.getElementById('myChart').getContext('2d');

    const data = reportType === 'weekly' 
      ? userDetails[0]?.streaks?.slice(-7).map(item => item.time) || [0, 0, 0, 0, 0, 0, 0]
      : userDetails[0]?.streaks?.slice(-30).map(item => item.time) || [];

    const labels = reportType === 'weekly'
      ? getWeekdayLabels(userDetails[0]?.streaks?.slice(-7))
      : getDayLabels(userDetails[0]?.streaks?.slice(-30));

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
  }, [userDetails, reportType]);

  const handleReportTypeChange = (type) => {
    setReportType(type);
  };

  const getWeekdayLabels = (streaks) => {
    const weekdayLabels = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return Array.from({ length: 7 }, (_, index) => {
      const streak = streaks?.[index];
      if (streak && streak.date) {
        const date = new Date(streak.date);
        const weekday = weekdayLabels[date.getDay()];
        return weekday;
      } else {
        return '';
      }
    });
  };

  const getDayLabels = (streaks) => {
    return streaks?.map(streak => {
      const date = new Date(streak.date);
      return `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })}`;
    }) || [];
  };

  return (
    <>
      <div className="w-full rounded-2xl mb-4">
        <div className="flex justify-center mb-4 px-14">
          <button
            className={`mr-2 ${reportType === 'weekly' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'} px-2 py-1 rounded-md`}
            onClick={() => handleReportTypeChange('weekly')}
          >
            Week
          </button>
          <button
            className={`mr-2 ${reportType === 'monthly' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'} px-2 py-1 rounded-md`}
            onClick={() => handleReportTypeChange('monthly')}
          >
            Month
          </button>
        </div>
        <div className="xl:w-[1000px] lg:w-[900px] md:w-[600px] w-[300px]  h-fit flex mx-auto my-auto">
          <div className='border border-gray-400 pt-0 rounded-xl  w-full h-fit my-auto  shadow-lg'>
            <canvas id='myChart'></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
