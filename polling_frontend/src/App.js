import React, { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import Chart from 'chart.js'
import history from './history'
import axios from 'axios'
import './App.css'

function App() {
  const [data, updateData] = useState();
  const [monthButtons, updateMonthButtons] = useState(['']);
  const [chart, updateChart] = useState(null);
  const [month, updateMonth] = useState('all');
  const [candidates, updateCandidates] = useState(['Bernie Sanders','Joe Biden']);

  const getData = () => {
    axios.get('http://localhost:3001/candidates')
    .then(({data}) => prepareData(data))
    .then(chartData => createChart(chartData))
  }

  const prepareData = (data) => {
    //dynamic month filter
    const months = Object.keys(data[0]).filter(key => ['id','name','created_at','updated_at'].indexOf(key) === -1);
    //pass months to state for dynamic render
    updateMonthButtons(['all',...months]);
    //passed to Chart datasets property
    const datasetsArr = [];
    //render selected candidates only
    candidates.forEach((candidate) => {
      //find candidate in component data
      const index = data.findIndex(obj => candidate === obj.name)
      //passed to data property of dataset object
      const candidateData = [];
      //data based on month conditional
      if (month !== 'all') {
        candidateData.push(data[index][month]);
      } else {
        for (let i = 0; i < months.length; i ++) candidateData.push(data[index][months[i]]);
      }
      //bar color based on candidate    
      const color = {
        'Joe Biden': 'red',
        'Bernie Sanders': 'blue',
        'Elizabeth Warren': 'green',
        'Pete Buttigieg': 'orange',
        'Andrew Yang': 'gold'
      }[candidate]
      
      datasetsArr.push({label: candidate, data: candidateData, backgroundColor: color})
    })
  
    const chartData = { 
      labels: month !== 'all' ? [month] : months,
      datasets: datasetsArr
    }
  
    return chartData
  }

  const createChart = (data) => {
    const ctx = document.querySelector('#chart')
    const tempsChart =  new Chart(ctx, {
      type: month !== 'all' ? 'bar' : 'line',
      data: data,
      options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                } 
            }]
        }
      }
    })
    //store chart to destroy on remount
    updateChart(tempsChart);
  }

  //componentDidMount hook; remount on month and candidate changes only
  useEffect(getData, [candidates,month]);

  return (
    <>
      <nav>
        <h1>2020 Democratic Polling Averages</h1>
      </nav>
      <canvas id="chart" ></canvas>
      <div className='duration'>
        {monthButtons.map(month => {
          return (
            <button key={month} onClick={()=>{
              chart.destroy();
              updateMonth(month);
            }}>{month}</button>
          )
        })}
      </div>
      <div className='candidates'>
        
      </div>
    </>
  )
  
}

export default App
