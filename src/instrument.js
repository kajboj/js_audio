import {toName} from './notes'
import Wad from 'web-audio-daw'

const withNoteNumbers = (instrument) => {
  return (noteNumber) => {
    instrument.play({pitch: toName(noteNumber)})
  }
}

const instrument = withNoteNumbers(new Wad({
  source : 'sine',
  volume: 0.3,
  env: {
    attack  : 0.05,
    decay   : 0.10,
    sustain : 0.05,
    hold    : 0.5,
    release : 0.5
  }
}))

export default instrument
