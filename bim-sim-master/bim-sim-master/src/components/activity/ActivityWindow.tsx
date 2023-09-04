import React, { lazy, Suspense } from 'react'
import {
    Switch,
    Route,
    Link,
} from 'react-router-dom'

const ProjectsWindow = lazy(() => import('../projects/ProjectsWindow'))
const QueryWindow = lazy(() => import('../query/QueryWindow'))
const SettingsWindow = lazy(() => import('../settings/SettingsWindow'))
const InfoWindow = lazy(() => import('../info/InfoWindow'))

import './ActivityWindow.css'

export function ActivityWindow() {

    return <section id="activity-window">
        <Suspense fallback={null}>
            <Switch>
                <Route path="/main"></Route>
                <Route path="/projects">
                    <ProjectsWindow />
                </Route>
                <Route path="/query"><QueryWindow /></Route>
                <Route path="/settings"><SettingsWindow /></Route>
                <Route path="/info"><InfoWindow /></Route>
            </Switch>
        </Suspense>
        <Link to="/main">
            <span id="close-icon" className="material-icons">close</span>
        </Link>
    </section>
}
