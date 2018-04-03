import Wad from 'web-audio-daw'
import React from 'react'
import ReactDOM from 'react-dom'
import {toNumber} from './notes'
import instrument from './instrument'
import every from './timing'
import {addRoot, majorTriad} from './chording'
import random from 'lodash/random'

const root = toNumber('C4')

const cadence = addRoot(root, [0, 5, 7, 0]).map((root) => majorTriad(instrument, root))
const playTone = (scaleTone) => every(500, [
  ...cadence,
  () => {},
  () => instrument(root + scaleTone)
])()


function Tone({tone, chosen}) {
  return (
    <button onClick={chosen}>{tone}</button>
  );
}

function TonePicker({tones, chosen}) {
  return tones.map((tone) => <Tone tone={tone} key={tone} chosen={() => chosen(tone)}/>)
}

class Lesson extends React.Component {
  constructor({tones, playTone}) {
    super()
    this.tones = tones
    this.playTone = playTone
    this.state = {
      questionsLeft: 5,
      correct: 0,
      incorrect: 0
    }
  }

  componentDidMount() {
    this.nextQuestion()
  }

  nextQuestion() {
    const tone = this.tones[random(this.tones.length-1)]
    this.playTone(tone)
    this.setState({
      tone,
      answered: false,
      questionsLeft: this.state.questionsLeft-1,
    })
  }

  answer(tone) {
    if (tone === this.state.tone) {
      if (!this.state.answered) {
        this.setState({correct: this.state.correct+1})
      }
      this.nextQuestion()
      console.log('correct')
    } else {
      if (!this.state.answered) {
        this.setState({incorrect: this.state.incorrect+1})
      }
      console.log('wrong')
    }

    this.setState({answered: true})
  }

  render() {
    return <div>
      <TonePicker tones={this.props.tones} chosen={(tone) => this.answer(tone)}/>
    </div>
  }
}

ReactDOM.render(
  <Lesson playTone={playTone} tones={[0, 2, 4]}/>,
  document.getElementById('root')
)
