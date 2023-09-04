// @ts-ignore
import { FastNavPlugin, Viewer } from '@xeokit/xeokit-sdk'

export default function addFastNav(viewer: Viewer) {
    return new FastNavPlugin(viewer, {})
}
