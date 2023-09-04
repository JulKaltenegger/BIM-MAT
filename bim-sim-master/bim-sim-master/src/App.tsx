import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import { RenderWindow } from './components/viewer/RenderWindow'
import Sidebar from './components/sidebar/Sidebar'
import { ActivityWindow } from './components/activity/ActivityWindow'
import { Toastr } from './components/toastr/Toastr'
import './App.css'
import { ProviderSettings } from './services/useSettings'

import { createBrowserHistory } from 'history'
import Header from './components/nav/Header'

export const history = createBrowserHistory({
    basename: process.env.PUBLIC_URL
})

export function App() {

    return (
        <ProviderSettings>
            <div className='App light'>
                <Header />
                <RenderWindow />
                <Router basename='/bim-sim'>
                    <Sidebar />
                    <ActivityWindow />
                </Router>
                <Toastr />
                <img src='./tue.svg' id='logo' title='logo' alt='' />
            </div>
        </ProviderSettings>
    )
}
