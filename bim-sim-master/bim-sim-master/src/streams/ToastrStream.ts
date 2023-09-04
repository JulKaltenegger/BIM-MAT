import { Subject } from 'rxjs'
import { ToastrMessage } from '../services/useSettings'

const ToastrStream = new Subject<ToastrMessage>()

export default ToastrStream
