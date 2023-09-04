import React, { useState } from 'react'
import { useEffect } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useSettings } from '../../services/useSettings'

import './Console.css'

export default function Console() {

    const { picked } = useSettings()

    const [value, setValue] = useState<string>('')
    const [copied, setCopied] = useState('Copy to clipboard')

    useEffect(() => {
        if (picked) {
            setValue(picked)
        } else {
            setValue('Pick some element')
        }
    }, [picked])

    const copyToClipboard = () => {
        if (picked) {
            navigator.clipboard.writeText(value)
            setCopied('Copied!')
        }
    }

    return (

        <div id='console'>
            <OverlayTrigger
                onExited={() => { setCopied('Copy to clipboard') }}
                key={'copied'}
                placement={'top-end'}
                overlay={<Tooltip id={'copied'} hidden={!picked}>{copied}</Tooltip>}
            >
                <div >
                    <pre id='selected_id' onClick={copyToClipboard}>{value}</pre>
                </div>
            </OverlayTrigger>
        </div>
    )
}
