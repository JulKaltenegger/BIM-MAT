import React, { useCallback, useEffect, useState } from 'react'
import { Accordion, ButtonGroup, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'

import './InfoWindow.css'
import Picked from './Picked'

import UserSelected from '../../streams/UserSelected'
import { PickedItem, useSettings } from '../../services/useSettings'
import { RdfService } from '../../api'


export default function InfoWindow() {

    const { pickedItems, setPickedItems } = useSettings()
    const [current, setCurrent] = useState<string | null>(null)

    useEffect(() => {
        if (current && pickedItems) {
            if (!pickedItems.find(i => i.id === current)) {
                (async () => {
                    const sensors = await RdfService
                        .rdfControllerGetSensors('230421_BMP', current)
                    const newItem: PickedItem = {
                        id: current,
                        index: pickedItems.length,
                        sensors: sensors,
                        removePick: removePick
                    }
                    setPickedItems!([...pickedItems, newItem])
                })()
            }
        }
    }, [current])

    useEffect(() => {
        UserSelected.subscribe(async (item) => {
            setCurrent(item ? item.entity.id : null)
        })
    }, [])

    /**
     * Clear picked all items
     */
    const clearAll = () => {
        setPickedItems!([])
        setCurrent(null)
    }

    const removePick = useCallback((id: string, items: PickedItem[]) => {
        setPickedItems!(items.filter(i => i.id !== id))
    }, [])

    return (
        <div id='info-window'>
            <div id='heading'>
                <h3>Info</h3>
                <div id="actions">
                    <span hidden={pickedItems ? ((pickedItems.length > 0) ? true : false) : true}>This will populate as you select items</span>
                    <ButtonGroup size="sm">
                        <OverlayTrigger overlay={<Tooltip>Clear All</Tooltip>}                        >
                            <Button variant="link" onClick={clearAll} disabled={pickedItems?.length === 0}>
                                <span className="material-icons">clear_all</span>
                            </Button>
                        </OverlayTrigger>
                    </ButtonGroup>
                </div>
            </div>

            <div id='content'>
                <Accordion>
                    {pickedItems!.map(i => <Picked key={i.index} {...i} />)}
                </Accordion>
            </div>
        </div >
    )
}
