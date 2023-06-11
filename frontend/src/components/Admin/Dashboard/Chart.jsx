import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export const LineChart = ({stats}) => {
  const lineChartViews = stats.map((item)=>item.views)
  const lineChartUsers = stats.map((item)=>item.users)
  const labels = getLastYearMonths();
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Yearly Views & Users',
      },
    },
  };
  const data = {
    labels,
    datasets: [
      {
        label: 'Views',
        data:lineChartViews ,
        borderColor: 'rgba(107,70,193,0.5)',
        backgroundColor: '#6b46c1',
      },
      {
        label: 'Users',
        data: lineChartUsers,
        borderColor: 'rgba(255, 0, 0,0.5) ',
        backgroundColor:'#fd7f6f',
      },
    ],
  };
  return <Line data={data} options={options} />;
};

export const DoughnutChart = ({users= []}) => {
  const data = {
    labels: ['Subscribed', 'Not Subscribed'],
    datasets: [
      {
        label: 'Views',
        data:users,
        borderWidth: 1,
        borderColor: ['rgb(62,12,171)', 'rgb(214,43,129'],
        backgroundColor: ['rgba(62,12,171,0.3)', 'rgba(214,43,129,0.3'],
      },
    ],
  };
  return <Doughnut data={data} />;
};

const getLastYearMonths = () => {
  const labels = [];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const currentMonth = new Date().getMonth();
  const remain = 11 - currentMonth;
  for (let i = currentMonth; i < months.length; i--) {
    const element = months[i];
    labels.unshift(element);
    if (i === 0) break;
  }

  for (let i = 11; i >= remain; i--) {
    if (i === currentMonth) break;
    const element = months[i];
    labels.unshift(element);
  }
  return labels;
};
