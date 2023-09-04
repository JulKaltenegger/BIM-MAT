// @ts-ignore
import { Viewer } from '@xeokit/xeokit-sdk'

export default function addViewer(): Viewer {
    const viewer = new Viewer({
        canvasId: 'myCanvas',
        transparent: true,
        // logarithmicDepthBufferEnabled: true,
        antialias: true,
        // pbrEnabled: true, // Physically-based rendering
        saoEnabled: true, // Configures Scalable Ambient Obscurance,
    })

    // set a default value
    // viewer.camera.eye = [-3.933, 2.855, 27.018]
    // viewer.camera.look = [4.400, 3.724, 8.899]
    // viewer.camera.up = [-0.018, 0.999, 0.039]

    return viewer
}
