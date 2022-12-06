import React, {useState} from 'react'
import { Piano, KeyboardShortcuts, MidiNumbers  } from 'react-piano'
import 'react-piano/dist/styles.css';
import * as Tone from 'tone'
import Knob from "react-simple-knob";
import { Distortion } from 'tone';

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

  const style3 = {
    height: "5px",
    margin: "10%",
    height: "100px",
    width: "200px",
    fontFamily: "Arial",
    color: "white",
  }

  const style4 = {
    height: "15px",
    margin: "0%",
    height: "250px",
    width: "200px",
    fontFamily: "Arial",
    color: "white",
  }
  
  const firstNote = MidiNumbers.fromNote('c3');
  const lastNote = MidiNumbers.fromNote('f5');
  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: firstNote,
    lastNote: lastNote,
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
  });
  let synth;
  
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

  const [voice2, setVoice2] = useState({
    // need to figure out how high/low this can go
    volume: -10, 
    // think this will go to 5?
    portamento: 0,
    // sine, triangle, sawtooth, square
    oscillator: {
      type: "OSC 2"
    },
    // all these are 0 - 1
    envelope : {
      attack: 0.1,
      decay: 0.1,
      sustain: 0.1,
      release: 0.1
    }
  })

  const [harmonicity, setHarmonicity] = useState(1.0) // make sound very laggy, possibly cause it becomes polyphonic?
  const [vibrato, setVibrato] = useState({
    amount: 0,
    rate: 5

  })
  const [reverb, setReverb] = useState({
    amount: 0,
    decay: 1
  })
  const [phaser, setPhaser] = useState(0)
  const [distortion, setDistortion] = useState(0)
  const [delay, setDelay] = useState(0)
  const [autoFilter, setAutoFilter] = useState(0)
  const [bitCrusher, setBitCrusher] = useState(1)

  const Reverb = new Tone.Reverb(reverb.decay, reverb.amount)
  const Phaser = new Tone.Phaser(phaser)
  const Distortion = new Tone.Distortion(distortion)
  const Delay = new Tone.FeedbackDelay(delay)
  const AutoFilter = new Tone.AutoFilter(autoFilter)
  const BitCrusher = new Tone.BitCrusher(bitCrusher)


  {voice2.oscillator.type === "OSC 2" ? synth = new Tone.Synth({
    oscillator: {
      partialCount: 0,
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
  }).toDestination() : synth = new Tone.DuoSynth({
    
    vibratoAmount: vibrato.amount,
    vibratoRate: vibrato.rate,
    harmonicity: harmonicity,
    voice0: {
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
      },
      voice1: {
        volume: voice2.volume,
        portamento: voice2.portamento,
        oscillator: {
          type: voice2.oscillator.type
        },
        envelope: {
          attack: voice2.envelope.attack,
          decay: voice2.envelope.decay,
          sustain: voice2.envelope.sustain,
          release: voice2.envelope.release
        }
      }

  })
  synth.connect(Tone.Destination)
}


  
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

  function handle_voice1_vol_port(e, name) {
    setVoice1({
      ...voice1,
      [name]: e
    })
  }



  function handle_voice2_vol_port(e, name) {
    setVoice2({
      ...voice2,
      [name]: e
    })
  }

  function handle_voice2_env(e, name) {
    setVoice2({
      ...voice2,
      envelope: {
        ...voice2.envelope,
        [name]: e
      }
    })
  }

  function handle_voice2_osc(e) {
    if (e.target.value === "Ocs 2") {
      setVoice2({
        ...voice2,
        oscillator: {
          type: ""
        }
      })
    }else {
      setVoice2({
        ...voice2,
        oscillator: {
          type: e.target.value
        }
      })
    }
  }

  function handle_harm_change(e) {
    setHarmonicity(e)
  }

  function handle_vibrato(e, name) {
    setVibrato({
      ...vibrato,
      [name]: e
    })
  }

  function handleReverbChange(e, name) {
    setReverb({
      ...reverb,
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
                onChange={(e) => handle_voice1_vol_port(e, "volume")}
                bg="black"
                fg="white"
                mouseSpeed={5}
                transform={p => parseInt(p * 25, 10) } 
                style={style} />
              <Knob
                name="Portamento"
                unit="sec"
                defaultPercentage={0}
                onChange={(e) => handle_voice1_vol_port(e, "portamento")}
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
      <div className='osc1form'>
          <form> 
            <div name='voice2_osc'>
              <select onChange={handle_voice2_osc} >
                <option  selected>OCS 2</option>
                <option>sine</option>
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
                onChange={(e) => handle_voice2_vol_port(e, "volume")}
                bg="black"
                fg="white"
                mouseSpeed={5}
                transform={p => parseInt(p * 25, 10) } 
                style={style} />
              <Knob
                name="Portamento"
                unit="sec"
                defaultPercentage={0}
                onChange={(e) => handle_voice2_vol_port(e, "portamento")}
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
                onChange={(e) => handle_voice2_env(e, "attack")}
                bg="black"
                fg="white"
                mouseSpeed={5}
                transform={p => parseFloat(p * 1.0) + 0} 
                style={style_env} />
              <Knob
                name="Decay"
                unit=""
                defaultPercentage={0}
                onChange={(e) => handle_voice2_env(e, "decay")}
                bg="black"
                fg="white"
                mouseSpeed={5}
                transform={p => parseFloat(p * 1.0) + 0} 
                style={style_env} />
              <Knob
                name="Sustain"
                unit=""
                defaultPercentage={0}
                onChange={(e) => handle_voice2_env(e, "sustain")}
                bg="black"
                fg="white"
                mouseSpeed={5}
                transform={p => parseFloat(p * 1.0) + 0} 
                style={style_env} />
              <Knob
                name="Release"
                unit=""
                defaultPercentage={0}
                onChange={(e) => handle_voice2_env(e, "release")}
                bg="black"
                fg="white"
                mouseSpeed={5}
                transform={p => parseFloat(p * 1.0) + 0} 
                style={style_env} />
              </div>
          </form>
      </div>
      <div className='triangle' />
      <div className='vib_harm'>
        <div className='vib_harm_inner'>
          <Knob
            name="Harmonicity"
            unit="voice(s)"
            defaultPercentage={0}
            onChange={(e) => handle_harm_change(e)}
            bg="black"
            fg="white"
            mouseSpeed={5}
            transform={p => parseFloat((p) + 1) } 
            style={style3} />
          <Knob
            name="Vibrato Rate"
            unit="Hz"
            defaultPercentage={0}
            onChange={(e) => handle_vibrato(e, "rate")}
            bg="black"
            fg="white"
            mouseSpeed={5}
            transform={p => parseFloat((p * 10) + 5.0)} 
            style={style3} />
          <Knob
            name="Vibrato"
            unit=""
            defaultPercentage={0}
            onChange={(e) => handle_vibrato(e, "amount")}
            bg="black"
            fg="white"
            mouseSpeed={5}
            transform={p => parseFloat(p)} 
            style={style3} />
          </div>
      </div>
      <div className='effects'>
        <div className='effectsinner'>
          <div className='reverb'>
            <div className='reverb_underline'></div>
            <Knob
                name="Amount"
                unit=""
                defaultPercentage={0}
                onChange={e => handleReverbChange(e, "amount")}
                bg="black"
                fg="white"
                mouseSpeed={5}
                transform={p => parseFloat(p)} 
                style={style} />
            <Knob
                name="Decay"
                unit="secs"
                defaultPercentage={0}
                onChange={e => handleReverbChange(e, "decay")}
                bg="black"
                fg="white"
                mouseSpeed={5}
                transform={p => parseInt((p * 5) + 1)} 
                style={style} />
          </div>
          <Knob
              name="Phaser"
              unit=""
              defaultPercentage={0}
              onChange={setPhaser}
              bg="black"
              fg="white"
              mouseSpeed={5}
              transform={p => parseFloat(p)} 
              style={style4} />
          <Knob
              name="Distortion"
              unit=""
              defaultPercentage={0}
              onChange={setDistortion}
              bg="black"
              fg="white"
              mouseSpeed={5}
              transform={p => parseFloat(p)} 
              style={style4} />
          <Knob
              name="BitCrusher"
              unit=""
              defaultPercentage={0}
              onChange={setBitCrusher}
              bg="black"
              fg="white"
              mouseSpeed={5}
              transform={p => parseInt((p * 16) + 1)} 
              style={style4} />
          <Knob
              name="Delay"
              unit=""
              defaultPercentage={0}
              onChange={setDelay}
              bg="black"
              fg="white"
              mouseSpeed={5}
              transform={p => parseFloat(p)} 
              style={style4} />
          <Knob
              name="AutoFilter"
              unit=""
              defaultPercentage={0}
              onChange={setAutoFilter}
              bg="black"
              fg="white"
              mouseSpeed={5}
              transform={p => parseFloat(p)} 
              style={style4} />
        </div>
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