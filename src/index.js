import Wad from 'web-audio-daw'
import React from 'react'
import ReactDOM from 'react-dom'
import {toName, toNumber} from './notes'
import instrument from './instrument'
import every from './timing'
import {addRoot, majorTriad} from './chording'

const cadence = addRoot(toNumber('C4'), [0, 5, 7, 0]).map((root) => majorTriad(instrument, root))
var playCadence = every(500, cadence)
var playTone = (toneNumber) => instrument.play(toneNumber)

function Tone({tone, chosen}) {
  return (
    <button onClick={chosen}>{tone}</button>
  );
}

function TonePicker({tones, chosen}) {
  return tones.map((tone) => <Tone tone={tone} key={tone} chosen={() => chosen(tone)}/>)
}

class Lesson extends React.Component {
  constructor(props) {
    super()
    this.state = {}
  }

  componentDidMount() {
  }

  generateTone() {
    this.props.tones[1]
  }

  startRound() {
    const tone = generateTone()
    this.props.playTone(tone)
    this.setState({
      tone: tone
    })
  }

  isCorrect(guessedTone) {
    return guessedTone === this.state.tone
  }

  guess(tone) {
    if (isCorrect(tone)) {
      this.props.resolution()
      this.startRound()
    } else {
      this.setState({
        wrong: true
      })
    }
  }

  giveUp() {
  }

  render() {
    return <TonePicker tones={this.props.tones} chosen={(tone) => console.log(tone)}/>
  }
}

// cadence
// guess
// if (correct)
//   resolution
// else
//   wrong = true
//   wait for input (give up, cadence, etc.)

ReactDOM.render(
  <Lesson playCadence={playCadence} playTone={playTone} tones={[1, 2, 3]}/>,
  document.getElementById('root')
)

playCadence().then(() => console.log('done'))
