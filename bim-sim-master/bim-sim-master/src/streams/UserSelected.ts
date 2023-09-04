// @ts-ignore
import { PickResult } from '@xeokit/xeokit-sdk/src/viewer/scene/webgl/PickResult'
import { Subject } from 'rxjs'

const UserSelected = new Subject<PickResult | null>()

export default UserSelected
