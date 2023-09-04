import React from 'react'
import {
    Accordion, Dropdown, InputGroup, OverlayTrigger, Tooltip,
} from 'react-bootstrap'
import './SettingsWindow.css'

import { useSettings } from '../../services/useSettings'

function SettingsWindow() {

    const {
        hierarchy, setHierarchy,
        autoExpand, setAutoExpand,
        autoHighlight, setAutoHighlight,
        autoHideToast, setAutoHideToast,
        isMeshVisible, setMeshVisibility
    } = useSettings()

    const changeHierarchy = (e: any) => {setHierarchy!(e)
    console.log(e);
    }

    const changeAutoExpand = () => setAutoExpand!(!autoExpand)
    const changeAutoHighlight = () => setAutoHighlight!(!autoHighlight)
    const changeAutoHideToast = () => setAutoHideToast!(!autoHideToast)
    const changeMeshVisibility = () => setMeshVisibility!(!isMeshVisible)

    return (
        <div id='settings-window'>
            <h3 id='heading'> Settings</h3>
            <div id='content'>
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Display</Accordion.Header>
                        <Accordion.Body>
                            <InputGroup id="hierarchy" className="mb-1">
                                <InputGroup.Text>Organize tree view as </InputGroup.Text>
                                <Dropdown onSelect={changeHierarchy}>
                                    <OverlayTrigger placement="right"
                                        overlay={<Tooltip>Sets how the nodes are organized within this tree view</Tooltip>}
                                    ><Dropdown.Toggle>{hierarchy}</Dropdown.Toggle>
                                    </OverlayTrigger>
                                    <Dropdown.Menu>
                                        <OverlayTrigger placement="right"
                                            overlay={<Tooltip>organizes the nodes to indicate the containment hierarchy of the IFC objects</Tooltip>}
                                        ><Dropdown.Item eventKey="containment">containment</Dropdown.Item>
                                        </OverlayTrigger>
                                        <OverlayTrigger placement="right" overlay={<Tooltip>groups the nodes within their IFC types</Tooltip>}>
                                            <Dropdown.Item eventKey="types">types</Dropdown.Item>
                                        </OverlayTrigger>
                                        <OverlayTrigger placement="right"
                                            overlay={<Tooltip>groups the nodes within <strong>IfcBuildingStoreys</strong> and sub-groups them by their IFC types</Tooltip>}
                                        ><Dropdown.Item eventKey="storeys">storeys</Dropdown.Item>
                                        </OverlayTrigger>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </InputGroup>
                            <InputGroup id="auto-hidetoast" className="mb-1">
                                <InputGroup.Text>Auto hide messages</InputGroup.Text>
                                <InputGroup.Checkbox onChange={changeAutoHideToast} checked={autoHideToast} />
                            </InputGroup>
                            <InputGroup id="mesh-visibility" className="mb-1">
                                <InputGroup.Text>View mesh</InputGroup.Text>
                                <InputGroup.Checkbox onChange={changeMeshVisibility} checked={isMeshVisible} />
                            </InputGroup>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Selector</Accordion.Header>
                        <Accordion.Body>
                            <InputGroup id="auto-expand" className="mb-1">
                                <InputGroup.Text>Auto expand tree-view on select</InputGroup.Text>
                                <InputGroup.Checkbox
                                    onChange={changeAutoExpand} checked={autoExpand} />
                            </InputGroup>
                            <InputGroup id="auto-highlight" className="mb-1">
                                <InputGroup.Text>Auto highlight when selected on tree-view</InputGroup.Text>
                                <InputGroup.Checkbox aria-label="auto-highlight"
                                    onChange={changeAutoHighlight} checked={autoHighlight} />
                            </InputGroup>
                            <InputGroup id="auto-subscribe" className="mb-1">
                                <InputGroup.Text>Auto subscribe on select</InputGroup.Text>
                                <InputGroup.Checkbox aria-label="auto-subscribe" />
                            </InputGroup>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
        </div>
    )

}

export default SettingsWindow
