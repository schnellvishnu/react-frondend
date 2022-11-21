import React from 'react';
import { Pie } from 'react-chartjs-2';
 
const data = {
  labels: ['Productionorder', 'Stock', '', 'Product', 'Customers', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
     
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        '#00cc99',
        '#0000ff',
        '#ffc107',
        '#5da87b',
        '#e30022',
        '#98777b',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        '#090e11',
      ],
      borderWidth: 1,
    },
  ],
};
 
const PieChart = () => (
  <>
    <div className='header'>
      
      <div className='links'>
         
      </div>
    </div>
    <Pie data={data}  />
  </>
);
 
export default PieChart;
