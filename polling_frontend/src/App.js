import React, { useEffect, useState } from 'react'
import Chart from 'chart.js'
import axios from 'axios'
import './App.css'

function App() {
  const [data, storeData] = useState([]);
  const [monthButtons, storeMonthButtons] = useState(['']);
  const [typeChange, toggleTypeChange] = useState(false);
  const [chart, storeChart] = useState(null);
  const [month, updateMonth] = useState('all');
  const [candidates, updateCandidates] = useState([]);

  const getData = () => {
      axios.get('http://localhost:3001/candidates')
      .then(({data}) => prepareData(data))
      .then(chartData => chart ? updateChart(chartData) : createChart(chartData))
  }

  const prepareData = (data) => {
    storeData(data)
    //dynamic load of all candidates
    if(candidates.length === 0){
      const allCandidates = [];
      data.forEach(candidate => allCandidates.push(candidate.name));
      updateCandidates(allCandidates);
    }
    //dynamic month filter
    const months = Object.keys(data[0]).filter(key => ['id','name','created_at','updated_at'].indexOf(key) === -1);
    //pass months to state for dynamic render
    storeMonthButtons(['all',...months]);
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
      
      datasetsArr.push({
        label: candidate, 
        data: candidateData, 
        backgroundColor: color,
        fill: false,
        borderColor: color
      })
    })
  
    const chartData = { 
      labels: month !== 'all' ? [month] : months,
      datasets: datasetsArr
    }
  
    return chartData
  }

  const createChart = (data) => {
    //create initial chart
    const ctx = document.querySelector('#chart')
    const tempsChart =  new Chart(ctx, {
      type: month !== 'all' ? 'bar' : 'line',
      data: data,
      options: {
        animation: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    max: 50
                } 
            }]
        }
      }
    })
    //store chart to update
    storeChart(tempsChart);
  }

  const updateChart = (data) => {
    //if chart type changes, destroy and make new instead of update
    if(typeChange){
      chart.destroy();
      toggleTypeChange(false);
      createChart(data); 
    }else{
      chart.data.labels = [...data.labels];
      chart.data.datasets = [...data.datasets];
      chart.update(); 
    }
  }

  //componentDidMount hook; remount on month and candidate changes only
  useEffect(getData, [candidates, month]);

  //toggle candidate buttons; add or remove conditional 
  const updatedCandidates = (name) => {
    if(candidates.indexOf(name) === -1) {
      return [...candidates, name]
    } else {
      const index = candidates.indexOf(name);
      return [...candidates.slice(0, index), ...candidates.slice(index + 1)];
    }
  }

  return (
    <>
      <nav>
        <h1>2020 Democratic Polling Averages</h1>
      </nav>
      <canvas id="chart" ></canvas>
      <div className='duration'>
        {monthButtons.map(button => {
          return (
            <button key={button} onClick={()=>{
              if(month !== button){
                if((month === 'all' && button !== 'all') || (month !== 'all' && button === 'all'))toggleTypeChange(true);
                updateMonth(button);
              }
            }}>{button}</button>
          )
        })}
      </div>
      <div className='candidates'>
        {data.map(candidate => {
          return (
            <div key={candidate.name} className='candidate-container' onClick={()=> {
              updateCandidates(()=>updatedCandidates(candidate.name));
            }}>
              <img className='image'key={candidate.name} src={candidate.img} />
              <div className='name'>{candidate.name}</div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default App
