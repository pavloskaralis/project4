import React, { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import Chart from 'chart.js'
import history from '../../history'
import axios from 'axios'
import './App.css'

function App() {

  const [data, updateData] = useState();
  const [month, updateMonth] = useState('');
  const [candidates, updateCandidates] = useState([]);

 useEffect( () => { 
  const getData = () => {
    
    axios.get('http://localhost:3001/path')
    .then(({data}) => this.prepareData(data))
    .then(chartData => this.createChart(chartData))
  }

 
  const prepareData = (data) => {

    const labels = month ? candidates.slice() : ['January 2019']

    const chartData = { 
      labels: [],
      datasets: [

        {
          label: 'label',
          data: []
        }
      ]
    }
  
    data.x_prop.forEach(x_prop => {
      chartData.labels.push(x_prop.id)
      chartData.datasets[0].data.push(x_prop.value)
    })  
  
    return chartData
  }

  const createChart = (data) => {
    const ctx = document.querySelector('#container')
    const tempsChart =  new Chart(ctx, {
      type: month ? 'bar' : 'line',
      data: data
    })
  }
 }, [])  
  
 
  return (
    <>
      <nav>
        <h1>2020 Democratic Polling Averages</h1>
      </nav>

    </>
  )
}

export default App
