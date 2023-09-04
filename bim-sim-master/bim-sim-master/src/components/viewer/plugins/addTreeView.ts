// @ts-ignore
import { TreeViewPlugin, Viewer } from '@xeokit/xeokit-sdk'

export default function addTreeView(viewer: Viewer): TreeViewPlugin {
    return new TreeViewPlugin(viewer, {
        containerElement: document.getElementById('treeViewContainer'),
        autoExpandDepth: 1, // Initially expand root node,
        hierarchy: 'storeys', // "containment", "storeys" or "types"
    } as any)
}
