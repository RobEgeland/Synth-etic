import React, {useContext, useState, useRef, useEffect} from 'react'
import { Piano, KeyboardShortcuts, MidiNumbers  } from 'react-piano'
import 'react-piano/dist/styles.css';
import * as Tone from 'tone'
import Knob from "react-simple-knob";
import { Distortion } from 'tone';

const Home = ({setOsc}) => {
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
  let synth;

  useEffect(() => {
    synth = new Tone.DuoSynth({
      harmonicity: 0.1,
      vibratoAmount: 0.1,
      vibratoRate: 4.5,
      voice0: {
          oscillator: {
              type: "sine"
          },
          volume: -5,
          portamento: 0.1,
          envelope: {
              attack:0.1,
              decay: 0.1,
              sustain: 0.1,
              release: 0.1
          }
      },
      voice1: {
        volume: -5,
        portamento: 1,
        oscillator: {
          type: "sine" 
        },
        envelope: {
            attack: 0.1,
            decay: 0.1,
            sustain: 0.1,
            release: 0.1
        }
      }
    }
    ).toDestination()
  }, [synth])


 
  const reverbAmount = 0.1
  // can possible get rid of decay knob, make it constant
  const reverbDecay = 4
  const phaser = 0.1


  const distortion = 0.1
  // delay is in seconds
  const delay = 0.1 
  // not sure about the autofilter
  const [autoFilter, setAutoFilter] = useState(0)
  // bitchrusher range 1-8
  const bitCrusher = 1
  const feedback = 0.1

  const Reverb = new Tone.Reverb(reverbDecay, reverbAmount).toDestination()
  const Phaser = new Tone.Phaser(phaser).toDestination()
  const Distortion = new Tone.Distortion(distortion).toDestination()
  const Delay = new Tone.PingPongDelay(delay).toDestination()
  const Feedback = new Tone.FeedbackDelay(feedback).toDestination()
  const BitCrusher = new Tone.BitCrusher(bitCrusher).toDestination()

// console.log(localStorage.)

  function handle_voice1_osc(e) {
    synth.voice0.oscillator.type = e.target.value
    localStorage.setItem("Osc", JSON.stringify(e.target.value))
  }

  function handle_voice1_vol(e) {
    synth.voice0.volume.value = e
  }
  function handle_voice1_port(e) {
    synth.voice0.portamento.value = e
    
  }
  // these can be refactored to one function
  function handle_voice1_attack(e) {
    synth.voice0.envelope.attack = e

  }
  function handle_voice1_decay(e) {
    synth.voice0.envelope.decay = e
  }
  function  handle_voice1_sustain(e) {
    synth.voice0.envelope.decay = e
  }
  function handle_voice1_release(e) {
    synth.voice0.envelope.release = e
  }


  function handle_voice2_osc(e) {
    synth.voice1.oscillator.type = e.target.value
  }
  // think both volume knobs need to be fixed
  function handle_voice2_vol(e) {
    synth.voice1.volume.value = e
  }
  function handle_voice2_port(e) {
    synth.voice1.portamento.value = e
  }
  function handle_voice2_attack(e) {
    synth.voice1.envelope.attack = e
  }
  function handle_voice2_decay(e) {
    synth.voice1.envelope.decay = e
  }
  function handle_voice2_sustain(e) {
    synth.voice1.envelope.sustain = e
  }
  function handle_voice2_release(e) {
    synth.voice1.envelope.release = e
  }

  function handle_harm_change(e) {
    synth.harmonicity.value = e
  }
  function handle_vibrato_rate(e) {
    synth.vibratoRate.value = e
  }

  function handle_vibrato_amount(e) {
    synth.vibratoAmount.value = e
  }

  function handleReverbAmount(e) {
    if (e > 0.1) {
      synth.connect(Reverb)
      synth.Reverb = e
    }else {
      synth.disconnect(Reverb)
    }
  }

  function handleBitCrusher(e) {
    if (e > 1) {
      synth.connect(BitCrusher)
      synth.BitCrusher = e
    }else{
      synth.disconnect(BitCrusher)
    }
  }

  function handleDistortion(e) {
    if (e > 0.1) {
      synth.connect(Distortion)
      synth.Distortion = e
    }else {
      synth.disconnect(Distortion)
    }
  }
  
  function handleFeedback(e) {
    if (e > 0.1) {
      synth.connect(Feedback)
      synth.Feedback = e
    }else {
      synth.disconnect(Feedback)
    }
  }

  function handleDelay(e) {
    if (e > 0.1) {
      synth.connect(Delay)
      synth.Delay = e
    }else {
      synth.disconnect(Delay)
    }
  }

  function handlePhaser(e) {
    if (e > 0.1) {
      synth.connect(Phaser)
      synth.Phaser = e
    }else {
      synth.disconnect(Phaser)
    }
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
                transform={p => parseFloat(p * 1.0) + 0.1} 
                style={style_env} />
              <Knob
                name="Decay"
                unit=""
                defaultPercentage={0}
                onChange={(e) => handle_voice1_decay(e)}
                bg="black"
                fg="white"
                mouseSpeed={5}
                transform={p => parseFloat(p * 1.0) + 0.1} 
                style={style_env} />
              <Knob
                name="Sustain"
                unit=""
                defaultPercentage={0}
                onChange={(e) => handle_voice1_sustain(e)}
                bg="black"
                fg="white"
                mouseSpeed={5}
                transform={p => parseFloat(p * 1.0) + 0.1} 
                style={style_env} />
              <Knob
                name="Release"
                unit=""
                defaultPercentage={0}
                onChange={(e) => handle_voice1_release(e)}
                bg="black"
                fg="white"
                mouseSpeed={5}
                transform={p => parseFloat(p * 1.0) + 0.1} 
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
                transform={p => parseFloat(p * 1.0) + 0.1} 
                style={style_env} />
              <Knob
                name="Decay"
                unit=""
                defaultPercentage={0}
                onChange={(e) => handle_voice2_decay(e)}
                bg="black"
                fg="white"
                mouseSpeed={5}
                transform={p => parseFloat(p * 1.0) + 0.1} 
                style={style_env} />
              <Knob
                name="Sustain"
                unit=""
                defaultPercentage={0}
                onChange={(e) => handle_voice2_sustain(e)}
                bg="black"
                fg="white"
                mouseSpeed={5}
                transform={p => parseFloat(p * 1.0) + 0.1} 
                style={style_env} />
              <Knob
                name="Release"
                unit=""
                defaultPercentage={0}
                onChange={(e) => handle_voice2_release(e)}
                bg="black"
                fg="white"
                mouseSpeed={5}
                transform={p => parseFloat(p * 1.0) + 0.1} 
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
            <Knob
                name="Reverb"
                unit=""
                defaultPercentage={0}
                onChange={handleReverbAmount}
                bg="black"
                fg="white"
                mouseSpeed={5}
                transform={p => parseFloat(p)} 
                style={style4} />
          <Knob
              name="Phaser"
              unit=""
              defaultPercentage={0}
              onChange={handlePhaser}
              bg="black"
              fg="white"
              mouseSpeed={5}
              transform={p => parseFloat(p)} 
              style={style4} />
          <Knob
              name="Distortion"
              unit=""
              defaultPercentage={0}
              onChange={handleDistortion}
              bg="black"
              fg="white"
              mouseSpeed={5}
              transform={p => parseFloat(p)} 
              style={style4} />
          <Knob
              name="BitCrusher"
              unit=""
              defaultPercentage={0}
              onChange={handleBitCrusher}
              bg="black"
              fg="white"
              mouseSpeed={5}
              transform={p => parseInt((p * 7) + 1)} 
              style={style4} />
          <Knob
              name="Delay"
              unit=""
              defaultPercentage={0}
              onChange={handleDelay}
              bg="black"
              fg="white"
              mouseSpeed={5}
              transform={p => parseFloat(p)} 
              style={style4} />
          <Knob
              name="Feedback"
              unit=""
              defaultPercentage={0}
              onChange={handleFeedback}
              bg="black"
              fg="white"
              mouseSpeed={5}
              transform={p => parseFloat(p)} 
              style={style4} />
          <button class="button-62" role="button">Save Sound</button>
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