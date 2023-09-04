import React from 'react'
// import Amplify from 'aws-amplify'
// import { AWSIoTProvider } from '@aws-amplify/pubsub'
// import { MqttOverWSProvider } from '@aws-amplify/pubsub/lib/Providers'
import 'bootstrap/dist/css/bootstrap.min.css'

import { createRoot } from 'react-dom/client'

import './index.css'
import { App } from './App'
import reportWebVitals from './reportWebVitals'
import { OpenAPI } from './api'
import { API_URL } from './services/useRealm'

OpenAPI.BASE = API_URL

createRoot(document.getElementById('root')!)
    .render(<App />,)

reportWebVitals()
