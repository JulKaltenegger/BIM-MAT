import React, {
    useContext,
    createContext,
    useState,
    useEffect
} from 'react'

// @ts-ignore
import { AnnotationsPlugin } from '@xeokit/xeokit-sdk'
// @ts-ignore
import { Viewer } from '@xeokit/xeokit-sdk'
// @ts-ignore
import { XKTLoaderPlugin } from '@xeokit/xeokit-sdk'
// @ts-ignore
import { TreeViewPlugin } from '@xeokit/xeokit-sdk'
// @ts-ignore
import { NavCubePlugin } from '@xeokit/xeokit-sdk'
// @ts-ignore
import { Mesh } from '@xeokit/xeokit-sdk'
// @ts-ignore
import { Entity } from '@xeokit/xeokit-sdk/src/viewer/scene/Entity'

export interface Sensor {
    item: { value: string },
    location: { value: string },
    sensor: { value: string }
}

export interface PickedItem {
    index: number
    /**
     * GUID of selected element by user
     */
    id: string,
    sensors: Sensor[],
    // data: Plotly.Data,
    removePick: (id: string, items: PickedItem[]) => void
}

export interface ToastrMessage {
    title: string
    message: string
}

interface Settings {
    hierarchy: string
    setHierarchy: (hierarchy: string) => void
    treeView: TreeViewPlugin
    setTreeView: (treeView: TreeViewPlugin) => void
    xktLoader: XKTLoaderPlugin | null
    setXKTloader: (xktLoader: XKTLoaderPlugin) => void
    viewer: Viewer | null
    setViewer: (viewer: Viewer) => void
    navCube: NavCubePlugin | null
    setNavCube: (navCube: NavCubePlugin) => void
    mesh: Mesh | null
    setMesh: (mesh: Mesh) => void
    annotations: AnnotationsPlugin | null
    setAnnotations: (annotations: AnnotationsPlugin) => void
    model: Entity | null
    setModel: (model: Entity) => void
    xkt: any
    setXKT: (xkt: any) => any
    toasts: ToastrMessage[]
    setToasts: (toasts: ToastrMessage[]) => void

    picked: any
    setPicked: (item: any) => void

    pickedItems: PickedItem[]
    setPickedItems: (items: PickedItem[]) => void

    autoExpand: boolean
    setAutoExpand: (expand: boolean) => void
    autoHighlight: boolean
    setAutoHighlight: (highlight: boolean) => void
    autoHideToast: boolean
    setAutoHideToast: (autohide: boolean) => void
    isMeshVisible: boolean
    setMeshVisibility: (isVisible: boolean) => void
}

const SettingsContext = createContext<Partial<Settings>>({})

export const useSettings = () => {
    return useContext(SettingsContext)
}

export const ProviderSettings = ({ children }: { children: any }) => {

    const [xktLoader, setXKTloader] = useState<XKTLoaderPlugin | null>(null)
    const [viewer, setViewer] = useState<Viewer | null>(null)
    const [navCube, setNavCube] = useState<NavCubePlugin | null>(null)
    const [mesh, setMesh] = useState<Mesh | null>(null)

    const [, setAnnotations] = useState<AnnotationsPlugin | null>(null)
    const [model, setModel] = useState<Entity | null>(null)
    const [xkt, setXKT] = useState<any | null>(null)
    const [hierarchy, _setHierarchy] = useState<string>('storeys')
    const [treeView, setTreeView] = useState<any | null>(null)
    const [toasts, setToasts] = useState<ToastrMessage[]>([])

    const [picked, setPicked] = useState<string | null>(null)
    const [pickedItems, setPickedItems] = useState<PickedItem[]>([])

    const [autoExpand, setAutoExpand] = useState(true)
    const [autoHighlight, setAutoHighlight] = useState(true)
    const [autoHideToast, setAutoHideToast] = useState(true)
    const [isMeshVisible, setMeshVisibility] = useState(false)

    useEffect(() => {
        const _hierarchy = localStorage.getItem('hierarchy')
        if (_hierarchy) setHierarchy(_hierarchy)
    }, [])

    const setHierarchy = (_hierarchy: string) => {
        localStorage.setItem('hierarchy', _hierarchy)
        _setHierarchy(_hierarchy)
    }

    const wrapper = {
        xktLoader, setXKTloader,
        viewer, setViewer,
        navCube, setNavCube,
        mesh, setMesh,
        setAnnotations,
        model, setModel,
        xkt, setXKT,
        hierarchy, setHierarchy,
        treeView, setTreeView,
        picked, setPicked,
        pickedItems, setPickedItems,
        toasts, setToasts,


        autoExpand, setAutoExpand,
        autoHighlight, setAutoHighlight,
        autoHideToast, setAutoHideToast,
        isMeshVisible, setMeshVisibility
    }
    return (
        <SettingsContext.Provider value={wrapper}>
            {children}
        </SettingsContext.Provider>
    )
}
