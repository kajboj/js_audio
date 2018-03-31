import Wad from 'web-audio-daw'
import {toName, toNumber} from './notes'

const withNoteNumbers = (instrument) => {
  return (noteNumber) => {
    instrument.play({pitch: toName(noteNumber)})
  }
}

const sine = withNoteNumbers(new Wad({
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

const wait = (delay) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay)
  })
}

const every = (period, actions) => {
  return {
    start: () => {
      if (actions.length > 0) {
        actions[0]()
        wait(period).then(() => {
          every(period, actions.slice(1)).start()
        })
      }
    }
  }
}

const simultaneous = (instrument, noteNumbers) => {
  return () => {
    noteNumbers.forEach((number) => instrument(number))
  }
}

const addRoot = (root, offsets) => {
  return offsets.map((offset) => root + offset)
}

const chord = (instrument, root, offsets) => {
  return simultaneous(instrument, addRoot(root, offsets))
}

const majorTriad = (instrument, root) => {
  return chord(instrument, root, [0, 4, 7])
}

const minorTriad = (instrument, root) => {
  return chord(instrument, root, [0, 3, 7])
}

const cadence = addRoot(toNumber('C4'), [0, 5, 7, 0]).map((root) => majorTriad(sine, root))

var clock = every(500, cadence)

clock.start()
