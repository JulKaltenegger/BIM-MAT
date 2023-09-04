import React, { useEffect } from 'react'
import Console from './Console'
import addMesh from './plugins/addMesh'
import addNavCube from './plugins/addNavCube'
import addViewer from './plugins/addViewer'
import addUserEvents from './plugins/addUserEvents'
import Highlighter from '../../streams/Highlighter'
import addTreeView from './plugins/addTreeView'
// import addFastNav from './plugins/addFastNav'
import addXktLoader from './plugins/addXktLoader'
import './RenderWindow.css'
import addAnnotations from './plugins/addAnnotations'
import { useSettings } from '../../services/useSettings'
import UserSelected from '../../streams/UserSelected'
import ToastrStream from '../../streams/ToastrStream'

// @ts-ignore
// import { StoreyViewsPlugin } from '@xeokit/xeokit-sdk'
// @ts-ignore
// import { DistanceMeasurementsPlugin } from '@xeokit/xeokit-sdk'

export function RenderWindow() {

    const {
        xktLoader, setXKTloader,
        viewer, setViewer,
        setNavCube, mesh, setMesh,
        setAnnotations,
        model, setModel,
        setXKT,
        picked, setPicked,
        hierarchy,
        treeView, setTreeView,
        autoHighlight, autoExpand,
        isMeshVisible
    } = useSettings()

    useEffect(() => {
        if (treeView) {
            if (picked && autoExpand) {
                treeView.showNode(picked)
            } else {
                treeView.unShowNode()
            }
        }
    }, [treeView, picked])

    useEffect(() => {
        if (treeView) {
            treeView.hierarchy = hierarchy! as any
        }
    }, [treeView, hierarchy])

    useEffect(() => {
        if (viewer && treeView) {
            treeView.on('nodeTitleClicked', (e: any) => {
                if (autoHighlight) {
                    const scene = viewer.scene
                    const objectIds: string[] = []
                    e.treeViewPlugin.withNodeTree(e.treeViewNode, (treeViewNode: any) => {
                        if (treeViewNode.objectId) {
                            objectIds.push(treeViewNode.objectId)
                        }
                    })
                    scene.setObjectsXRayed(scene.objectIds, true)
                    scene.setObjectsVisible(scene.objectIds, true)
                    scene.setObjectsXRayed(objectIds, false)
                    viewer.cameraFlight.flyTo({
                        aabb: scene.getAABB(objectIds),
                        duration: 0.5
                    }, () => {
                        setTimeout(function () {
                            scene.setObjectsVisible(scene.xrayedObjectIds, false)
                            scene.setObjectsXRayed(scene.xrayedObjectIds, false)
                        }, 500)
                    })
                }
            })
        }
    }, [viewer, treeView, autoHighlight]) // for autoHighlight

    useEffect(() => {
        const _viewer = addViewer()
        setViewer!(_viewer)
        // addFastNav(_viewer)
        setNavCube!(addNavCube(_viewer))
        setMesh!(addMesh(_viewer))
        const _treeView = addTreeView(_viewer)
        setTreeView!(_treeView)
        addUserEvents!(_viewer)
        setXKTloader!(addXktLoader(_viewer))

        // const distanceMeasurements = new DistanceMeasurementsPlugin(_viewer)
        // distanceMeasurements.control.activate()

        // const storeyViewsPlugin = new StoreyViewsPlugin(_viewer)

        // prevent dragover
        window.addEventListener('dragover', (event: any) =>
            event.preventDefault())

        // drop support
        window.addEventListener('drop', (event: any) => {
            event.preventDefault()
            const file = event.dataTransfer.files[0]
            const reader = new FileReader()
            reader.readAsArrayBuffer(file)
            reader.onload = (event: any) =>
                setXKT!(event.target.result)
        })

        Highlighter.subscribe(highlight =>
            _viewer.scene.setObjectsHighlighted(highlight, true))

        UserSelected.subscribe(async (item) => {
            setPicked!(item ? item.entity.id : null) // guid of selected element
        })
    }, [])

    useEffect(() => {
        if (xktLoader && viewer) {
            if (model) model.destroy()

            const t0 = performance.now()
            try {
                const _model = xktLoader.load({
                    id: 'MyModel' + (new Date().getTime()),
                    src: './Rijwoning-BM.xkt',
                    edges: true,
                })
                _model.on('loaded', () => {
                    mesh!.position = [viewer.scene.center[0], 0, viewer.scene.center[2]]
                    viewer.cameraFlight.flyTo(_model.aabb as any)

                    const t1 = performance.now()
                    console.log(`Loading time: ${Math.floor(t1 - t0)} ms`)
                    ToastrStream.next({
                        title: 'XKT Loaded',
                        message: `Loading time: ${Math.floor(t1 - t0)} ms`
                    })
                    setModel!(_model)
                    const _annotations = addAnnotations(viewer)
                    setAnnotations!(_annotations)
                })
            } catch (error) {
                console.error(`Error loading xkt file ${error}`)
            }
        }
    }, [xktLoader])

    useEffect(() => {
        if (mesh) {
            mesh.visible = isMeshVisible!
        }
    }, [isMeshVisible])

    return (
        <div id='RenderWindow'>
            <canvas id='myCanvas'></canvas>
            <canvas id='myNavCubeCanvas' ></canvas>
            {/* // TODO <div className='xeokit-camera-pivot-marker'></div>  */}
            <div id='treeViewContainer'></div>
            <Console />
        </div>
    )
}
