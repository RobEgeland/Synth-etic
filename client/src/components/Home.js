import React, {useState} from 'react'
import { Piano, KeyboardShortcuts, MidiNumbers  } from 'react-piano'
import 'react-piano/dist/styles.css';
import * as Tone from 'tone'
import Knob from "react-simple-knob";

const Home = () => {
  const style = {
    height: "5px",
    margin: "1%",
    height: "100px",
    fontFamily: "Arial",
    color: "white" // Sets font color of value and knob name
  };
  const style_env = {
    height: "5px",
    margin: "1%",
    height: "75px",
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
    volume: -10, 
    // think this will go to 5?
    portamento: 0,
    // sine, triangle, sawtooth, square
    oscillator: {
      type: "sine"
    },
    // all these are 0 - 1
    envelope : {
      attack: 0.1,
      decay: 0.1,
      sustain: 0.1,
      release: 0.1
    }

  })
  const synth = new Tone.Synth({
    oscillator: {
      type: voice1.oscillator.type
    },
    volume: voice1.volume,
    portamento: voice1.portamento,
    envelope: {
      attack: voice1.envelope.attack,
      decay: voice1.envelope.decay,
      sustain: voice1.envelope.sustain,
      release: voice1.envelope.release
    }
  }).toDestination();
  console.log(synth.get())
  


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
        <div className='osc1form'>
          <form> 
            <div name='voice1_osc'>
              <select onChange={handle_voice1_osc} >
                <option selected>sine</option>
                <option>triangle</option>
                <option>sawtooth</option>
                <option>square</option>
              </select>
            </div>
            <div className='voice1_vol_port'>
              <Knob
                name="Volume"
                unit="dB"
                defaultPercentage={0}
                onChange={(e) => handleVoice1Change(e, "volume")}
                bg="black"
                fg="white"
                mouseSpeed={5}
                transform={p => parseInt(p * 25, 10) } 
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
            </div>
            <div className='voice1Env'>
              <Knob
                name="Attack"
                unit=""
                defaultPercentage={0}
                onChange={(e) => handle_voice1_env(e, "attack")}
                bg="black"
                fg="white"
                mouseSpeed={5}
                transform={p => parseFloat(p * 1.0) + 0} 
                style={style_env} />
              <Knob
                name="Decay"
                unit=""
                defaultPercentage={0}
                onChange={(e) => handle_voice1_env(e, "decay")}
                bg="black"
                fg="white"
                mouseSpeed={5}
                transform={p => parseFloat(p * 1.0) + 0} 
                style={style_env} />
              <Knob
                name="Sustain"
                unit=""
                defaultPercentage={0}
                onChange={(e) => handle_voice1_env(e, "sustain")}
                bg="black"
                fg="white"
                mouseSpeed={5}
                transform={p => parseFloat(p * 1.0) + 0} 
                style={style_env} />
              <Knob
                name="Release"
                unit=""
                defaultPercentage={0}
                onChange={(e) => handle_voice1_env(e, "release")}
                bg="black"
                fg="white"
                mouseSpeed={5}
                transform={p => parseFloat(p * 1.0) + 0} 
                style={style_env} />
              </div>
          </form>
        </div>
      </div>
      <div className='voice2'>

      </div>
      <br>
      </br>
      <div className='piano'>
        <Piano 
        noteRange={{ first: 48, last: 77}}
        playNote={(MidiNumbers) => {
          switch(MidiNumbers) {
            // 8TH note durration works for now but need to figure out how to extend
            case 48:
              synth.triggerAttackRelease("C4", "4n");
              break;
            case 49:
              synth.triggerAttackRelease("C#4", "4n");
              break;
            case 50:
              synth.triggerAttackRelease("D4", "4n");
              break;
            case 51:
              synth.triggerAttackRelease("D#4", "4n");
              break;
            case 52:
              synth.triggerAttackRelease("E4", "4n");
              break;
            case 53:
              synth.triggerAttackRelease("F4", "4n");
              break;
            case 54:
              synth.triggerAttackRelease("F#4", "4n");
              break;
            case 55:
              synth.triggerAttackRelease("G4", "4n");
              break;
            case 56:
              synth.triggerAttackRelease("G#4", "4n");
              break;
            case 57:
              synth.triggerAttackRelease("A4", "4n");
              break;  
            case 58:
              synth.triggerAttackRelease("A#4", "4n");
              break;
            case 59:
              synth.triggerAttackRelease("B4", "4n");
              break;
            case 60:
              synth.triggerAttackRelease("C5", "4n");
              break;
            case 61:
              synth.triggerAttackRelease("C#5", "4n");
              break;
            case 62:
              synth.triggerAttackRelease("D5", "4n");
              break;
            case 63:
              synth.triggerAttackRelease("D#5", "4n");
              break;
            case 64:
              synth.triggerAttackRelease("E5", "4n");
              break;
            case 65:
              synth.triggerAttackRelease("F5", "4n");
              break;
          }
        }}
        width={1920}
        stopNote={(midiNumber) => {
          // synth.triggerRelease()
          // Stop playing a given note - see notes below
          // add .triggerRelease, also remove release from above cases
          
        }}
        keyboardShortcuts={keyboardShortcuts}
        />
    </div>
    </div>
  )
}

export default Home