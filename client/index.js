import React from 'react'
import { render } from 'react-dom'
import App from './containers/App'
import 'reset.css/reset.css'
import './main.css'

const el = document.querySelector('#app')

render(<App  />, el)