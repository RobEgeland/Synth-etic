import React, {useState} from 'react'
import { Piano, KeyboardShortcuts, MidiNumbers  } from 'react-piano'
import 'react-piano/dist/styles.css';
import * as Tone from 'tone'
import Knob from "react-simple-knob";

const Home = () => {
  const style = {
    margin: "1%",
    height: "75px",
    fontFamily: "Arial",
    color: "white" // Sets font color of value and knob name
  };
  const style_env = {
    margin: "1%",
    height: "50px",
    fontFamily: "Arial",
    color: "white" // Sets font color of value and knob name
  };
  
  const firstNote = MidiNumbers.fromNote('c3');
  const lastNote = MidiNumbers.fromNote('f5');
  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: firstNote,
    lastNote: lastNote,
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
  });
  
  const [voice1, setVoice1] = useState({
    // need to figure out how high/low this can go
    volume: 0, 
    // think this will go to 5?
    portamento: 0,
    // sine, triangle, sawtooth, square
    oscillator: {
      type: ""
    },
    // all these are 0 - 1
    envelope : {
      attack: 0,
      decay: 0,
      sustain: 0,
      release: 0
    }

  })
  const synth = new Tone.Synth({
    oscillator: {
      type: voice1.oscillator
    },
    volume: voice1.volume,
    portamento: voice1.portamento

  }).toDestination();
  console.log(synth.get())
  let ampEnv = new Tone.AmplitudeEnvelope({
    attack: voice1.envelope.attack,
    decay: voice1.envelope.decay,
    sustain: voice1.envelope.sustain,
    release: voice1.envelope.release
  })
  synth.connect(ampEnv)

  function handle_voice1_osc(e) {
    if (e.target.value === "Ocs 1") {
      setVoice1({
        ...voice1,
        oscillator: {
          type: ""
        }
      })
    }else {
      setVoice1({
        ...voice1,
        oscillator: {
          type: e.target.value
        }
      })
      
    }
  }
  function handle_voice1_env(e, name) {
    setVoice1({
      ...voice1,
      envelope: {
        ...voice1.envelope,
        [name]: e
      }
    })
  }

  function handleVoice1Change(e, name) {
    setVoice1({
      ...voice1,
      [name]: e
    })
  }

 
  return (
    <div>
      <div className='voice1'>
        <form> 
          <select onChange={handle_voice1_osc} name='voice1_osc'>
            <option>Ocs 1</option>
            <option>sine</option>
            <option>triangle</option>
            <option>sawtooth</option>
            <option>square</option>
          </select>
          <Knob
            name="Volume"
            unit="dB"
            defaultPercentage={0}
            onChange={(e) => handleVoice1Change(e, "volume")}
            bg="black"
            fg="white"
            mouseSpeed={5}
            transform={p => parseInt(p * 50, 10) } 
            style={style} />
          <Knob
            name="Portamento"
            unit="sec"
            defaultPercentage={0}
            onChange={(e) => handleVoice1Change(e, "portamento")}
            bg="black"
            fg="white"
            mouseSpeed={5}
            transform={p => parseInt(p * 5)} 
            style={style} />
          <div className='voice1Env'>
            <Knob
              name="Attack"
              unit=""
              defaultPercentage={0}
              onChange={(e) => handle_voice1_env(e, "attack")}
              bg="black"
              fg="white"
              mouseSpeed={5}
              transform={p => parseFloat(p * 2.0) + 0} 
              style={style_env} />
            <Knob
              name="Decay"
              unit=""
              defaultPercentage={0}
              onChange={(e) => handle_voice1_env(e, "decay")}
              bg="black"
              fg="white"
              mouseSpeed={5}
              transform={p => parseFloat(p * 2.0) + 0} 
              style={style_env} />
            <Knob
              name="Sustain"
              unit=""
              defaultPercentage={0}
              onChange={(e) => handle_voice1_env(e, "sustain")}
              bg="black"
              fg="white"
              mouseSpeed={5}
              transform={p => parseFloat(p * 2.0) + 0} 
              style={style_env} />
            <Knob
              name="Release"
              unit=""
              defaultPercentage={0}
              onChange={(e) => handle_voice1_env(e, "release")}
              bg="black"
              fg="white"
              mouseSpeed={5}
              transform={p => parseFloat(p * 2.0) + 0} 
              style={style_env} />
            </div>
        </form>
      </div>
      <div className='voice2'>

      </div>
      <br>
      </br>
      <Piano 
      noteRange={{ first: 48, last: 77}}
      playNote={(MidiNumbers) => {
        switch(MidiNumbers) {
          case 48:
            synth.triggerAttack("C4", Tone.now());
            break;
          case 49:
            synth.triggerAttack("C#4", Tone.now());
            break;
          case 50:
            synth.triggerAttack("D4", Tone.now());
            break;
          case 51:
            synth.triggerAttack("D#4", Tone.now());
            break;
          case 52:
            synth.triggerAttack("E4", Tone.now());
            break;
          case 53:
            synth.triggerAttack("F4", Tone.now());
            break;
          case 54:
            synth.triggerAttack("F#4", Tone.now());
            break;
          case 55:
            synth.triggerAttack("G4", Tone.now());
            break;
          case 56:
            synth.triggerAttack("G#4", Tone.now());
            break;
          case 57:
            synth.triggerAttack("A4", Tone.now());
            break;  
          case 58:
            synth.triggerAttack("A#4", Tone.now());
            break;
          case 59:
            synth.triggerAttack("B4", Tone.now());
            break;
          case 60:
            synth.triggerAttack("C5", Tone.now());
            break;
          case 61:
            synth.triggerAttack("C#5", Tone.now());
            break;
          case 62:
            synth.triggerAttack("D5", Tone.now());
            break;
          case 63:
            synth.triggerAttack("D#5", Tone.now());
            break;
          case 64:
            synth.triggerAttack("E5", Tone.now());
            break;
          case 65:
            synth.triggerAttack("F5", Tone.now());
            break;
        }
      }}
      width={1000}
      stopNote={(midiNumber) => {
        synth.triggerRelease()
        // Stop playing a given note - see notes below
        // add .triggerRelease, also remove release from above cases
        
      }}
      keyboardShortcuts={keyboardShortcuts}
      />
    </div>
  )
}

export default Home