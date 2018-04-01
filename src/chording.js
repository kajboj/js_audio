export const simultaneous = (instrument, noteNumbers) => {
  return () => {
    noteNumbers.forEach((number) => instrument(number))
  }
}

export const addRoot = (root, offsets) => {
  return offsets.map((offset) => root + offset)
}

export const chord = (instrument, root, offsets) => {
  return simultaneous(instrument, addRoot(root, offsets))
}

export const majorTriad = (instrument, root) => {
  return chord(instrument, root, [0, 4, 7])
}

export const minorTriad = (instrument, root) => {
  return chord(instrument, root, [0, 3, 7])
}
