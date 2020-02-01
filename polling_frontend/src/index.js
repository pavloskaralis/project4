import React from 'react'
import ReactDOM from 'react-dom'
import App from './App/App'
import {Router} from 'react-router-dom'
import history from './history.js'

ReactDOM.render(
    <Router history={history}>
        <App />
    </Router>,
    document.getElementById('root')
)