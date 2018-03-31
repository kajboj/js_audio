const names = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B' ]
const numbers = {
  'C': 0,
  'C#': 1,
  'D': 2,
  'D#': 3,
  'E': 4,
  'F': 5,
  'F#': 6,
  'G': 7,
  'G#': 8,
  'A': 9,
  'A#': 10,
  'B': 11
}    

export const toName = (number) => {
  const octave = Math.floor(number / 12)
  const noteNumber = number % 12
  const name = names[noteNumber]
  return `${name}${octave}`
}

export const toNumber = (name) => {
  const noteName = name.match(/^[A-G]#?/)[0]
  const octave = parseInt(name.match(/\d$/)[0])
  return octave * 12 + numbers[noteName]
}
