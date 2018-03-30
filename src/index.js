import Wad from 'web-audio-daw';

var sine = new Wad({
  source : 'sine',
  volume: 0.5
})
sine.play({pitch: 'C5'})
sine.play({pitch: 'E5'})
sine.play({pitch: 'G5'})
