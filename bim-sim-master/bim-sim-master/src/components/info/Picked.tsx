import React, { useEffect, useState, lazy, Suspense } from 'react'
import {
    Accordion, OverlayTrigger,
    Tooltip, Badge, Button,
    InputGroup, DropdownButton,
    Dropdown,
    FormControl,
} from 'react-bootstrap'
import { FaTimes, FaArrowUp, FaArrowDown } from 'react-icons/fa'
import { SensorsService } from '../../api'
import { PickedItem, Sensor, useSettings } from '../../services/useSettings'

const Chart = lazy(() => import('./Chart'))

import './Picked.css'

export interface SensorData {
    timestamp: string,
    value: number
}

// console.log(new Date(Date.UTC(2021, 2, 1)).toISOString().substr(0, 10))
// console.log(new Date(Date.UTC(2021, 3, 31)).toLocaleDateString())//.substr(0, 10))

export default function Picked(item: PickedItem) {

    const { pickedItems } = useSettings()
    const [isSubscribed, setSubscribe] = useState(true)
    const [data, setData] = useState<SensorData[]>([])
    const [startDate, setStartDate] = useState(new Date(Date.now() - 86400000 * 30)) //30 days before from today
    const [endDate, setEndDate] = useState(new Date())
    const [isSampleOnly, setSampleOnly] = useState(true)
    const [sampleSize, setSampleSize] = useState(100)
    const [sensor, _setSensor] = useState<Sensor | null>(null)
    const [sensorId, setSensorId] = useState<string | null>(null)

    const loadData = () => {
        if (sensorId) {
            SensorsService.sensorsControllerGetRecords(
                sensorId,
                startDate.toISOString(),
                endDate.toISOString(),
                isSampleOnly ? sampleSize : undefined
            ).then((value) => {
                setData(value.result)
            })
        }
    }

    const setSensor = (id: string | null) => {
        if (id) {
            const _sensor = item.sensors.find(s => s.sensor.value.endsWith(id))
            console.log(id, _sensor)

            if (_sensor) {
                _setSensor(_sensor)
                setSensorId(id)
                setData([])
            }
        }
    }

    const setSampleLevelUp = (e: any) => {
        if ((sampleSize + 100) <= 1000) setSampleSize(sampleSize + 100)
    }

    const setSampleLevelDown = (e: any) => {
        if ((sampleSize - 100) >= 100) setSampleSize(sampleSize - 100)
    }

    const changeSubscription = () => setSubscribe(!isSubscribed)

    const removeThis = () => {
        if (pickedItems) item.removePick(item.id, pickedItems)
    }

    return (
        <Accordion.Item eventKey={item.index.toFixed()}>
            <Accordion.Header>
                <span><Badge bg="secondary">{item.index}</Badge> {item.id}</span>
            </Accordion.Header>
            <Accordion.Body>
                <div id='pickec-content'>
                    <div hidden={sensor === null} id="tags">
                        <Badge bg='info'>{sensor?.sensor.value.split('/').pop()}</Badge>
                    </div>
                    <div id='value'>
                        <InputGroup size="sm" className="mb-1">
                            <DropdownButton
                                variant="secondary"
                                onSelect={(id) => setSensor(id)}
                                title={sensor ? sensorId : `${item.sensors.length === 0 ? 'no ' : item.sensors.length} sensors`}>
                                {item.sensors.map((s, i) => {
                                    const _sensor = s.sensor.value.split('/').pop()
                                    return <Dropdown.Item
                                        eventKey={_sensor}
                                        key={i}>
                                        {_sensor}
                                    </Dropdown.Item>
                                })}
                            </DropdownButton>
                            <Button variant="success"
                                onClick={loadData}
                                disabled={sensor === null}>Get Data</Button>
                            <InputGroup.Text>Subscribed</InputGroup.Text>
                            <InputGroup.Checkbox checked={isSubscribed} onChange={changeSubscription} />
                            <OverlayTrigger overlay={<Tooltip>Remove</Tooltip>}                        >
                                <Button variant="secondary"
                                    onClick={removeThis}><FaTimes /></Button>
                            </OverlayTrigger>
                        </InputGroup>
                        <div id="range">
                            <InputGroup size="sm" className="mb-1">
                                <InputGroup.Text>Start date</InputGroup.Text>
                                <FormControl
                                    value={startDate.toISOString().substring(0, 10)}
                                    type="date"
                                    onChange={(e: any) => setStartDate(new Date(e.target.value))} />
                            </InputGroup>
                            <InputGroup size="sm" className="mb-1">
                                <FormControl
                                    value={endDate.toISOString().substring(0, 10)}
                                    type="date"
                                    onChange={(e: any) => setEndDate(new Date(e.target.value))} />
                                <InputGroup.Text>End date</InputGroup.Text>
                            </InputGroup>
                            <InputGroup size="sm" className="mb-1">
                                <InputGroup.Text>Sample</InputGroup.Text>
                                <InputGroup.Checkbox checked={isSampleOnly}
                                    onChange={() => setSampleOnly(!isSampleOnly)} />
                                <FormControl
                                    type="number"
                                    disabled={!isSampleOnly}
                                    value={sampleSize}
                                    onChange={(e: any) => setSampleSize(+e.target.value)} />
                                <Button variant="secondary"
                                    disabled={!isSampleOnly}
                                    onClick={setSampleLevelUp}><FaArrowUp key="inc" values="inc" id="inc" /></Button>
                                <Button variant="secondary"
                                    disabled={!isSampleOnly}
                                    onClick={setSampleLevelDown}><FaArrowDown key="dec" values="dec" id="dec" /></Button>
                            </InputGroup>
                        </div>
                    </div>
                </div>
                <div hidden={item.sensors.length === 0}>
                    <Suspense fallback={<span>loading...</span>}>
                        <Chart {...{ id: sensorId, data: data }} />
                    </Suspense>
                    <InputGroup size="sm" className="mb-1" hidden={data.length === 0 || data.length === sampleSize}>
                        <InputGroup.Text>{data.length} points</InputGroup.Text>
                    </InputGroup>
                </div>
            </Accordion.Body>
        </Accordion.Item >
    )
}
