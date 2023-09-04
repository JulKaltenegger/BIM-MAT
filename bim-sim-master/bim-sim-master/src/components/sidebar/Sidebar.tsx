import React from 'react'
import { Link } from 'react-router-dom'

import './Sidebar.css'

export default function Sidebar() {
    return (
        <nav id="sidebar">
            <Link to="projects">
                <span className="material-icons">face</span>
            </Link>
            <Link to="query">
                <span className="material-icons">search</span>
            </Link>
            <Link to="settings">
                <span className="material-icons">settings</span>
            </Link>
            <Link to="info">
                <span className="material-icons">info</span>
            </Link>
            {/* <span className='material-icons' id='dragger'>drag_indicator</span> */}
        </nav>
    )
}
