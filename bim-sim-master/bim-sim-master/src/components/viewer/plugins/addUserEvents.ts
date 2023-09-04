// @ts-ignore
import { Viewer } from '@xeokit/xeokit-sdk'
// @ts-ignore
import { PickResult } from '@xeokit/xeokit-sdk/src/viewer/scene/webgl/PickResult'
import UserSelected from '../../../streams/UserSelected'

export default function addUserEvents(viewer: Viewer) {

    const cameraControl = viewer.cameraControl
    cameraControl.navMode = 'orbit'
    cameraControl.followPointer = true
    cameraControl.doublePickFlyTo = true

    let lastEntity: any
    let lastColorize: any

    cameraControl.on('picked', (pickResult: PickResult) => {
        // console.log("picked: ", pickResult.entity.id)
        // console.log(viewer.metaScene.metaModels)

        UserSelected.next(pickResult) //update the selection stream

        if (!pickResult.entity) { return }

        if (!lastEntity || pickResult.entity.id !== lastEntity.id) {
            if (lastEntity) { lastEntity.colorize = lastColorize }
            lastEntity = pickResult.entity
            lastColorize = pickResult.entity.colorize ? pickResult.entity.colorize.slice() : null
            pickResult.entity.colorize = [0.0, 1.0, 0.0]
        }
    })

    // viewer.scene.input.on('mousedown', (coords: any) => {
    //     const pickResult = viewer.scene.pick({
    //         canvasPos: coords,
    //         pickSurface: true
    //     })
    //     UserSelected.next(pickResult)
    // })

    cameraControl.on('pickedNothing', () => {
        if (lastEntity) {
            lastEntity.colorize = lastColorize
            lastEntity = null
        }
        UserSelected.next(null)
    });

    // viewer.scene.input.setKeyboardEnabled(false);
    (viewer.scene as any).input.on('keyup', (keyCode: number) => {

        if (keyCode === 27) { // esc to unselect
            if (lastEntity) {
                lastEntity.colorize = lastColorize
                lastEntity = null
            }
            viewer.scene.setObjectsHighlighted(viewer.scene.highlightedObjectIds, false)
            UserSelected.next(null)
        }
    })
}
