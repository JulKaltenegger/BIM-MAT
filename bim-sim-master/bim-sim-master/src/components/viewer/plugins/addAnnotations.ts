// @ts-ignore
import { Viewer, AnnotationsPlugin } from '@xeokit/xeokit-sdk'

export default function addAnnotations(viewer: Viewer) {
    return new AnnotationsPlugin(viewer, {
        // markerHTML: "<div class='annotation-marker' style='background-color: {{markerBGColor}};'>{{glyph}}</div>",
        // labelHTML: "<div class='annotation-label' style='background-color: {{labelBGColor}};'><div class='annotation-title'>{{title}}</div><div class='annotation-desc'>{{description}}</div></div>",
        values: {
            // markerBGColor: 'red',
            // labelBGColor: 'red',
            glyph: 'X',
            title: 'Untitled',
            description: 'No description'
        } as any
    })
}
