import React from 'react';
import { Pie } from 'react-chartjs-2';

interface PieChartProps {
  chartData: any; // Ideally, you'd define a more specific type here
}

const PieChart: React.FC<PieChartProps> = ({ chartData }) => {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: 'center' }}>Pie Chart</h2>
      <Pie
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: 'Users Gained between 2016-2020',
            },
          },
        }}
      />
    </div>
  );
};

export default PieChart;
