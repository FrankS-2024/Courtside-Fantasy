import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const StatDifferenceChart = ({ data }) => {
    const chartData = {
        labels: Object.keys(data).filter(key => key !== 'scoreDifference'),
        datasets: [{
            label: 'Stat Differences',
            data: Object.entries(data)
                .filter(([key]) => key !== 'scoreDifference')
                .map(([, value]) => value),
            backgroundColor: Object.entries(data)
                .filter(([key]) => key !== 'scoreDifference')
                .map(([, value]) => value >= 0 ? 'rgba(75, 192, 192, 0.8)' : 'rgba(255, 99, 132, 0.8)')
        }]
    };

    const options = {
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: (context) => `${context.dataset.label}: ${context.raw.toFixed(2)}`
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: {
                    color: 'white'
                }
            }
        }
    };

    return (
        <div className="mt-6">
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default StatDifferenceChart;