import React from 'react'

import './Header.css'

export default function Header() {

    return (
        <header id='app-header'>
            <span className='material-icons'>drawer</span>
            <nav>
                <h2>BIM-SIM</h2>
                <div id='project-title'>
                    <span>Atlas</span>
                </div>
            </nav>
        </header>
    )
}
