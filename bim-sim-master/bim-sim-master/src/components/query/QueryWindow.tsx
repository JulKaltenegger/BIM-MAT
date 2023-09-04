import React, { useLayoutEffect, useRef, useState } from 'react'
import Yasgui from '@triply/yasgui'
import Yasqe from '@triply/yasqe'
import Yasr from '@triply/yasr'

import '@triply/yasgui/build/yasgui.min.css'

import './QueryWindow.css'
import { Button, ButtonGroup } from 'react-bootstrap'
import Highlighter from '../../streams/Highlighter'
import { useEffect } from 'react'
import { API_URL, useRealmApp } from '../../services/useRealm'

function QueryWindow() {

    const {
        namespaces,
        query,
        updateQuery,
    } = useRealmApp()

    const myYasqe = useRef<HTMLDivElement>(null)
    const myYasr = useRef<HTMLDivElement>(null)

    const [yasqe, setYasqe] = useState<Yasqe | null>(null)
    const [yasr, setYasr] = useState<Yasr | null>(null)
    const [result, setResult] = useState<any | null>(null)
    const [title, setTitle] = useState<string>('')

    useLayoutEffect(() => {

        const _yasqe = new Yasgui.Yasqe(myYasqe.current!, {
            persistenceId: null,
            resizeable: true,
            theme: 'material',
            requestConfig: {
                endpoint: `${API_URL}/rdf/230421_BMP`,
                headers: { Accept: 'application/json' },
                method: 'POST',
            },
        } as any)

        setYasqe(_yasqe)

        if (query) _yasqe.setValue(query.query)

        const _yasr = new Yasgui.Yasr(myYasr.current!, {
            persistenceId: null,
            prefixes: undefined, // namespaces
        })

        setYasr(_yasr)

        _yasqe.on('queryResponse', (instance: any, res: any, duration: number) => {
            // console.log('response: ', res.text)
            console.log('response duration: ', duration)
            _yasr.setResponse(res)
            setResult(res)

            try {
                // const _vars = JSON.parse(res.text).head.vars
                const _bindings = JSON.parse(
                    res.text
                ).results.bindings.map((v: any) => v.guid.value)
                Highlighter.next(_bindings)
            } catch (e: any) {
                console.log('No GUIDs found :( ')
            }
        })

    }, [])

    useEffect(() => {
        if (query) setTitle(query.title)
    }, [query])

    useEffect(() => {
        if (result) {
            try {
                const elem = document.getElementsByClassName('dataTable')[0]
                elem.classList.add('compact', 'stripe', 'cell-border')
            } catch (error) {
                console.error('Error on query result')
            }
        }
    }, [result])

    useEffect(() => {
        if (yasr && namespaces) { //project && yasr
            yasr.config = { ...yasr.config, prefixes: namespaces }
        }
    }, [yasr, namespaces])

    const saveQuery = () => {
        if (query && yasqe) updateQuery!({
            ...query,
            query: yasqe.getValue(),
            title: title
        })
    }

    return (
        <div id='query-window'>
            <div id='heading'>
                <h3>SPARQL Query</h3>
                <ButtonGroup size="sm">
                    <Button onClick={saveQuery}>Save</Button>
                </ButtonGroup>
            </div>
            <div id='yasgui-view'>
                <div id='yasqe-view' ref={myYasqe}></div>
                <div id='yasr-view' ref={myYasr}></div>
            </div>
        </div>
    )
}

export default QueryWindow
