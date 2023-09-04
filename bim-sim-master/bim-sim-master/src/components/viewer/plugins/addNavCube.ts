// @ts-ignore
import { Viewer } from '@xeokit/xeokit-sdk'
// @ts-ignore
import { NavCubePlugin } from '@xeokit/xeokit-sdk'

export default function addNavCube(viewer: Viewer) {
    return new NavCubePlugin(viewer, {
        canvasId: 'myNavCubeCanvas',
        color: 'gray',
        visible: true,
        // cameraFly: true,
        // cameraFitFOV: 45,
        // cameraFlyDuration: 0.5,
        fitVisible: true,
        synchProjection: true,
        hoverColor: 'rgba(0,0.5,0,0.4)' // Default value
    })
}
