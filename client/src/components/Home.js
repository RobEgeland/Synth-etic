import React, {useContext, useState, useRef} from 'react'
import { Piano, KeyboardShortcuts, MidiNumbers  } from 'react-piano'
import 'react-piano/dist/styles.css';
import * as Tone from 'tone'
import Knob from "react-simple-knob";
import { Distortion } from 'tone';

const Home = () => {
  // Tone.context.lookAhead = 0.3
  // Tone.Transport.start("+0.1")
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
    height: "200px",
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

  const harmonicity = useRef(0)
  const vibratoAmount = useRef(0)
  const vibratoRate = useRef(0)
  const voice0osc = useRef("sine")
  const voice0vol = useRef(-10)
  const voice0port = useRef(0)
  const voice0EnvAt = useRef(0.1)
  const voice0EnvDe = useRef(0.1)
  const voice0EnvSus = useRef(0.1)
  const voice0EnvRe = useRef(0.1)
  const voice1osc = useRef("sine")
  const voice1vol = useRef(-10)
  const voice1port = useRef(0)
  const voice1EnvAt = useRef(0.1)
  const voice1EnvDe = useRef(0.1)
  const voice1EnvSus = useRef(0.1)
  const voice1EnvRe = useRef(0.1)
  let synth = new Tone.DuoSynth({
    harmonicity: harmonicity.current,
    vibratoAmount: vibratoAmount.current,
    vibratoRate: vibratoRate.current,
    voice0: {
        oscillator: {
            type: voice0osc.current
        },
        volume: voice0vol.current,
        portamento: voice0port.current,
        envelope: {
            attack: voice0EnvAt.current,
            decay: voice0EnvDe.current,
            sustain: voice0EnvSus.current,
            release: voice0EnvRe.current
        }
    },
    voice1: {
        oscillator: {
            type: voice1osc.current 
        },
        volume: voice1vol.current,
        portamento: voice1port.current,
        envelope: {
            attack: voice1EnvAt.current,
            decay: voice1EnvDe.current,
            sustain: voice1EnvSus.current,
            release: voice1EnvRe.current
        }
    }
  },
  console.log("was rerendered")
  ).connect(Tone.Destination)
  
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

   
 
  function handle_voice1_osc(e) {
    voice0osc.current = e.target.value
  }

  function handle_voice1_vol(e) {
    voice0vol.current = e
  }
  function handle_voice1_port(e) {
    voice0port.current = e
  }
  function handle_voice1_attack(e) {
    voice0EnvAt.current = e
  }
  function handle_voice1_decay(e) {
    voice0EnvDe.current = e
  }
  function  handle_voice1_sustain(e) {
    voice0EnvSus.current = e
  }
  function handle_voice1_release(e) {
    voice0EnvRe.current = e
  }


  function handle_voice2_osc(e) {
    voice1osc.current = e.target.value
  }
  function handle_voice2_vol(e) {
    voice1vol.current = e
  }
  function handle_voice2_port(e) {
    voice1port.current = e
  }
  function handle_voice2_attack(e) {
    voice1EnvAt.current = e
  }
  function handle_voice2_decay(e) {
    voice1EnvDe.current = e
  }
  function handle_voice2_sustain(e) {
    voice1EnvSus.current = e
  }
  function handle_voice2_release(e) {
    voice1EnvRe.current = e
  }

  function handle_harm_change(e) {
    harmonicity.current = e
  }

  function handle_vibrato_rate(e) {
    vibratoRate.current = e
  }

  function handle_vibrato_amount(e) {
    vibratoAmount.current = e
  }

  // function handle_vibrato(e, name) {
  //   setVibrato({
  //     ...vibrato,
  //     [name]: e
  //   })
  // }

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
                onChange={(e) => handle_voice1_vol(e)}
                bg="black"
                fg="white"
                mouseSpeed={5}
                transform={p => parseInt(p * 25, 10) } 
                style={style} />
              <Knob
                name="Portamento"
                unit="sec"
                defaultPercentage={0}
                onChange={(e) => handle_voice1_port(e)}
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
                onChange={(e) => handle_voice1_attack(e)}
                bg="black"
                fg="white"
                mouseSpeed={5}
                transform={p => parseFloat(p * 1.0) + 0} 
                style={style_env} />
              <Knob
                name="Decay"
                unit=""
                defaultPercentage={0}
                onChange={(e) => handle_voice1_decay(e)}
                bg="black"
                fg="white"
                mouseSpeed={5}
                transform={p => parseFloat(p * 1.0) + 0} 
                style={style_env} />
              <Knob
                name="Sustain"
                unit=""
                defaultPercentage={0}
                onChange={(e) => handle_voice1_sustain(e)}
                bg="black"
                fg="white"
                mouseSpeed={5}
                transform={p => parseFloat(p * 1.0) + 0} 
                style={style_env} />
              <Knob
                name="Release"
                unit=""
                defaultPercentage={0}
                onChange={(e) => handle_voice1_release(e)}
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
                onChange={(e) => handle_voice2_vol(e)}
                bg="black"
                fg="white"
                mouseSpeed={5}
                transform={p => parseInt(p * 10, 10) } 
                style={style} />
              <Knob
                name="Portamento"
                unit="sec"
                defaultPercentage={0}
                onChange={(e) => handle_voice2_port(e)}
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
                onChange={(e) => handle_voice2_attack(e)}
                bg="black"
                fg="white"
                mouseSpeed={5}
                transform={p => parseFloat(p * 1.0) + 0} 
                style={style_env} />
              <Knob
                name="Decay"
                unit=""
                defaultPercentage={0}
                onChange={(e) => handle_voice2_decay(e)}
                bg="black"
                fg="white"
                mouseSpeed={5}
                transform={p => parseFloat(p * 1.0) + 0} 
                style={style_env} />
              <Knob
                name="Sustain"
                unit=""
                defaultPercentage={0}
                onChange={(e) => handle_voice2_sustain(e)}
                bg="black"
                fg="white"
                mouseSpeed={5}
                transform={p => parseFloat(p * 1.0) + 0} 
                style={style_env} />
              <Knob
                name="Release"
                unit=""
                defaultPercentage={0}
                onChange={(e) => handle_voice2_release(e)}
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
            onChange={(e) => handle_vibrato_rate(e)}
            bg="black"
            fg="white"
            mouseSpeed={5}
            transform={p => parseFloat((p * 10) + 5.0)} 
            style={style3} />
          <Knob
            name="Vibrato"
            unit=""
            defaultPercentage={0}
            onChange={(e) => handle_vibrato_amount(e)}
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
              transform={p => parseInt((p * 15) + 1)} 
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