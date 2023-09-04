// @ts-ignore
import { buildGridGeometry, Mesh, PhongMaterial, VBOGeometry, Viewer } from '@xeokit/xeokit-sdk'

export default function addMesh(viewer: Viewer) {
    return new Mesh(viewer.scene, {
        geometry: new VBOGeometry(viewer.scene, buildGridGeometry({
            size: 100,
            divisions: 20
        })),
        material: new PhongMaterial(viewer.scene, {
            color: [0.0, 0.0, 0.0],
            emissive: [0.2, 0.2, 0.2]
        }),
        // position: [0, 0, 0],
        collidable: false,
        visible: false
    })
}
