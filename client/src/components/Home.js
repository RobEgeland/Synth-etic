import React, {useContext, useState, useRef, useEffect} from 'react'
import { Piano, KeyboardShortcuts, MidiNumbers  } from 'react-piano'
import 'react-piano/dist/styles.css';
import * as Tone from 'tone'
import Knob from "react-simple-knob";
import { Distortion } from 'tone';
import { UserContext } from '../context/UserContext'

const Home = () => {
  const { currentUser, loggedIn } = useContext(UserContext)
  const [errors, setErrors] = useState()
  const [saveClicked, setSaveClicked] = useState(false)
  const [soundName, setSoundName] = useState("")
  let synth = useRef(null)
  // this still cause some audo glitching
  let synthSaveObj = {
    harmonicity: 0.1,
    vibrato_rate: 4.5,
    voice0_oscillator: "sine",
    voice0_volume: -5,
    voice0_portamento: 0.1,
    voice0_attack: 0.1,
    voice0_decay: 0.1,
    voice0_sustain: 0.1,
    voice0_release: 0.1,
    voice1_oscillator: "sine",
    voice1_volume: -5,
    voice1_portamento: 0.1,
    voice1_attack: 0.1,
    voice1_decay: 0.1,
    voice1_sustain: 0.1,
    voice1_release: 0.1
    
  }



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
  

  useEffect(() => {
    synth.current = new Tone.DuoSynth({
      harmonicity: 0.1,
      vibratoAmount: 0.1,
      vibratoRate: 4.5,
      voice0: {
          oscillator: {
              type: "sine"
          },
          volume: -5,
          portamento: 0,
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
      },
    }).toDestination()
  }, [])


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


  function handle_voice1_osc(e) {
    synth.current.voice0.oscillator.type = e.target.value
    synthSaveObj.voice0_oscillator = e.target.value
  }

  function handle_voice1_vol(e) {
    synth.current.voice0.volume.value = e
    synthSaveObj.voice0_volume = e
  }
  function handle_voice1_port(e) {
    synth.current.voice0.portamento = e
    synthSaveObj.voice0_portamento = e
  }
  // these can be refactored to one function
  function handle_voice1_attack(e) {
    synth.current.voice0.envelope.attack = e
    synthSaveObj.voice0_attack = e
  }
  function handle_voice1_decay(e) {
    synth.current.voice0.envelope.decay = e
    synthSaveObj.voice0_decay = e
  }
  function  handle_voice1_sustain(e) {
    synth.current.voice0.envelope.decay = e
    synthSaveObj.voice0_sustain = e
  }
  function handle_voice1_release(e) {
    synth.current.voice0.envelope.release = e
    synthSaveObj.voice0_release = e
  }


  function handle_voice2_osc(e) {
    synth.current.voice1.oscillator.type = e.target.value
    synthSaveObj.voice1_oscillator = e.target.value
  }

  function handle_voice2_vol(e) {
    synth.current.voice1.volume.value = e
    synthSaveObj.voice1_volume = e
  }
  function handle_voice2_port(e) {
    synth.current.voice1.portamento = e
    synthSaveObj.voice1_portamento = e
  }
  function handle_voice2_attack(e) {
    synth.current.voice1.envelope.attack = e
    synthSaveObj.voice1_attack = e
  }
  function handle_voice2_decay(e) {
    synth.current.voice1.envelope.decay = e
    synthSaveObj.voice1_decay = e 
  }
  function handle_voice2_sustain(e) {
    synth.current.voice1.envelope.sustain = e
    synthSaveObj.voice1_sustain = e
  }
  function handle_voice2_release(e) {
    synth.current.voice1.envelope.release = e
    synthSaveObj.voice1_release = e
  }

  function handle_harm_change(e) {
    synth.current.harmonicity.value = e
    synthSaveObj.harmonicity = e
  }
  function handle_vibrato_rate(e) {
    synth.current.vibratoRate.value = e
    synthSaveObj.vibrato_rate = e
  }

  function handle_vibrato_amount(e) {
    synth.current.vibratoAmount.value = e
    synthSaveObj.vibrato_amount = e
  }

  function handleReverbAmount(e) {
    if (e > 0.1) {
      synth.current.connect(Reverb)
      synth.current.Reverb = e
    }else {
      synth.current.disconnect(Reverb)
    }
  }

  function handleBitCrusher(e) {
    if (e > 1) {
      synth.current.connect(BitCrusher)
      synth.current.BitCrusher = e
    }else{
      synth.current.disconnect(BitCrusher)
    }
  }

  function handleDistortion(e) {
    if (e > 0.1) {
      synth.current.connect(Distortion)
      synth.current.Distortion = e
    }else {
      synth.current.disconnect(Distortion)
    }
  }
  
  function handleFeedback(e) {
    if (e > 0.1) {
      synth.current.connect(Feedback)
      synth.current.Feedback = e
    }else {
      synth.current.disconnect(Feedback)
    }
  }

  function handleDelay(e) {
    if (e > 0.1) {
      synth.current.connect(Delay)
      synth.current.Delay = e
    }else {
      synth.current.disconnect(Delay)
    }
  }

  function handlePhaser(e) {
    if (e > 0.1) {
      synth.current.connect(Phaser)
      synth.current.Phaser = e
    }else {
      synth.current.disconnect(Phaser)
    }
  }

  function handleSynthName(e) {
    setSoundName(e.target.value)
  }

  function handleSynthSave() {
    console.log("before post", synthSaveObj)
    const synthObject = {
      user_id: currentUser.id,
      sound_name: soundName,
      harmonicity: synthSaveObj.harmonicity,
      vibrato_amount: synthSaveObj.vibrato_amount,
      vibrato_rate: synthSaveObj.vibrato_rate,
      voice0_oscillator: synthSaveObj.voice0_oscillator,
      voice0_volume: synthSaveObj.voice0_volume,
      voice0_portamento: synthSaveObj.voice0_portamento,
      voice0_attack: synthSaveObj.voice0_attack,
      voice0_decay: synthSaveObj.voice0_decay,
      voice0_sustain: synthSaveObj.voice0_sustain,
      voice0_release: synthSaveObj.voice0_release,
      voice1_oscillator: synthSaveObj.voice1_oscillator,
      voice1_volume: synthSaveObj.voice1_volume,
      voice1_portamento: synthSaveObj.voice1_portamento,
      voice1_attack: synthSaveObj.voice1_attack,
      voice1_decay: synthSaveObj.voice1_decay,
      voice1_sustain: synthSaveObj.voice1_sustain,
      voice1_release: synthSaveObj.voice1_release
    }
      const headers = {
          "Accept": "application/json",
          "Content-Type": "application/json"
      }
      const options = {
          method: "POST",
          headers,
          body: JSON.stringify(synthObject)
      }
      fetch('/sounds', options)
      .then(res => {
          if(res.ok){
              res.json().then(data => {
                console.log(data)
              })
          }else {
              res.json().then(error => {
                  console.log(error.errors)
                  const errorAr = []
                  for (const element in error.errors) {
                      errorAr.push(` ${element} ${error.errors[element]} -`)
                  }
                  setErrors(errorAr)
                  throw new Error(errors)
              })
          }
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
                transform={p => parseInt(p * 10, 10) } 
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
          <button onClick={() => setSaveClicked(!saveClicked)} className="button-62" role="button">Save Sound</button>
          {saveClicked ? <form onSubmit={handleSynthSave}>
            <label htmlFor='name'>Sound Name</label>
            <br/>
            <input type={"text"} value={soundName} onChange={handleSynthName} />
            <input type={"submit"} value={"save sound"}/>
          </form> : null}
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
              synth.current.triggerAttackRelease("C4", "4n");
              break;
            case 49:
              synth.current.triggerAttackRelease("C#4", "4n");
              break;
            case 50:
              synth.current.triggerAttackRelease("D4", "4n");
              break;
            case 51:
              synth.current.triggerAttackRelease("D#4", "4n");
              break;
            case 52:
              synth.current.triggerAttackRelease("E4", "4n");
              break;
            case 53:
              synth.current.triggerAttackRelease("F4", "4n");
              break;
            case 54:
              synth.current.triggerAttackRelease("F#4", "4n");
              break;
            case 55:
              synth.current.triggerAttackRelease("G4", "4n");
              break;
            case 56:
              synth.current.triggerAttackRelease("G#4", "4n");
              break;
            case 57:
              synth.current.triggerAttackRelease("A4", "4n");
              break;  
            case 58:
              synth.current.triggerAttackRelease("A#4", "4n");
              break;
            case 59:
              synth.current.triggerAttackRelease("B4", "4n");
              break;
            case 60:
              synth.current.triggerAttackRelease("C5", "4n");
              break;
            case 61:
              synth.current.triggerAttackRelease("C#5", "4n");
              break;
            case 62:
              synth.current.triggerAttackRelease("D5", "4n");
              break;
            case 63:
              synth.current.triggerAttackRelease("D#5", "4n");
              break;
            case 64:
              synth.current.triggerAttackRelease("E5", "4n");
              break;
            case 65:
              synth.current.triggerAttackRelease("F5", "4n");
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