import Wad from 'web-audio-daw'
import {toName, toNumber} from './notes'
import instrument from './instrument'
import every from './timing'
import {addRoot, majorTriad} from './chording'

const cadence = addRoot(toNumber('C4'), [0, 5, 7, 0]).map((root) => majorTriad(instrument, root))

var clock = every(500, cadence)

clock.start()
