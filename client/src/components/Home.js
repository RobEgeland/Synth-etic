import React, {useContext, useState, useRef, useEffect} from 'react'
import { Piano, KeyboardShortcuts, MidiNumbers  } from 'react-piano'
import 'react-piano/dist/styles.css';
import * as Tone from 'tone'
import Knob from "react-simple-knob";
import {Knob as Knob2} from 'primereact/knob'
import { Distortion } from 'tone';
import { UserContext } from '../context/UserContext'
import Oscillator1  from './Oscillator1';


const Home = () => {
  const { currentUser, loggedIn } = useContext(UserContext)
  const [errors, setErrors] = useState()
  const [nameTyping, setNameTyping] = useState(false)
  const [soundName, setSoundName] = useState("")
  const [reload, setReload] = useState(false)
  const [synthReset, setSynthReset] = useState(false)
  let synth = useRef(null)
  let voice0_vol_default = 0
  let synthSaveObj = useRef({
    harmonicity: 0.1,
    vibrato_rate: 4.5,
    vibrato_amount: 0.1,
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
  })
  let reverbSave = useRef({
      name: "reverb",
      wet: 0.1
    })
  let phaserSave = useRef({
      name: "phaser",
      wet: 0.1
    })
  let distortionSave = useRef({
      name: "distortion",
      wet: 0.1
    })
  let bitcrusherSave = useRef({
      name: "bitcrusher",
      wet: 0.1
    })
    let delaySave = useRef({
      name: "delay",
      wet: 0.1
    })
  let feedbackSave = useRef({
      name: "feedback",
      wet: 0.1
    })
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

  const firstNote = MidiNumbers.fromNote('c3');
  const lastNote = MidiNumbers.fromNote('f5');
  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: firstNote,
    lastNote: lastNote,
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
  });
  
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

  
  
  

  
  setTimeout(() => {
    setNameTyping(false)
    setSynthReset(false)
  }, "5000")

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
  }, [synthReset])
  // persist the data through session storage
  window.addEventListener('beforeunload', () => {
    window.sessionStorage.setItem("synth", JSON.stringify(synthSaveObj.current))
    window.sessionStorage.setItem("reload", "true")
  }) 

  window.addEventListener('load', () => {
    console.log(reload)
    if (window.sessionStorage.getItem("reload") === "true") {
      let returnObj = JSON.parse(window.sessionStorage.getItem("synth"))

  
      synth.current.harmonicity.value = returnObj.harmonicity
      synth.current.vibratoAmount.value = returnObj.vibrato_amount
      synth.current.vibratoRate.value = returnObj.vibrato_rate
      synth.current.voice0.oscillator.type = returnObj.voice0_oscillator
      synth.current.voice0.volume.value = returnObj.voice0_volume
      synth.current.voice0.portamento = returnObj.voice0_portamento
      synth.current.voice0.envelope.attack = returnObj.voice0_attack
      synth.current.voice0.envelope.decay = returnObj.voice0_decay
      synth.current.voice0.envelope.sustain = returnObj.voice0_sustain
      synth.current.voice0.envelope.release = returnObj.voice0_release
      synth.current.voice1.volume.value = returnObj.voice1_volume
      synth.current.voice1.portamento = returnObj.voice1_portamento
      synth.current.voice1.oscillator.type = returnObj.voice1_oscillator
      synth.current.voice1.envelope.attack = returnObj.voice1_attack
      synth.current.voice1.envelope.decay = returnObj.voice1_decay
      synth.current.voice1.envelope.sustain = returnObj.voice1_sustain
      synth.current.voice1.envelope.release = returnObj.voice1_release
      
      synthSaveObj.current = JSON.parse(window.sessionStorage.getItem("synth"))
      setTestVol(returnObj.voice0_volume)
      voice0_vol_default = parseFloat(`0.${returnObj.voice0_volume}`)
      // synth.current = synthSaveObj.current
      window.sessionStorage.setItem("reload", "false")
    }
  })
  

  function handleSoundReset() {
    setSynthReset(true)
    window.sessionStorage.setItem("synth", "")
    synthSaveObj.current = {
      harmonicity: 0.1,
    vibrato_rate: 4.5,
    vibrato_amount: 0.1,
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
  }

  // functions for changing knobs
  const [voice1Osc, setVoice1Osc] = useState("sine")
  useEffect(() => {
    synth.current.voice0.oscillator.type = voice1Osc
  }, [voice1Osc])
  
  // function handle_voice1_osc(e) {
  //   synth.current.voice0.oscillator.type = e.target.value
  //   synthSaveObj.current.voice0_oscillator = e.target.value
  // }
  const [voice1Vol, setVoice1Vol] = useState(-5)
  useEffect(() => {
    synth.current.voice0.volume.value = voice1Vol
  }, [voice1Vol])
  // function handle_voice1_vol(e) {
  //   synth.current.voice0.volume.value = e
  //   synthSaveObj.current.voice0_volume = e

  // }
  const [voice1Port, setVoice1Port] = useState(0)
  useEffect(() => {
    synth.current.voice0.portamento = voice1Port
  }, [voice1Port])
  // function handle_voice1_port(e) {
  //   synth.current.voice0.portamento = e
  //   synthSaveObj.current.voice0_portamento = e
  // }
  // these can be refactored to one function
  const [voice1Attack, setVoice1Attack] = useState(0.1)
  useEffect(() => {
    synth.current.voice0.envelope.attack = voice1Attack
  }, [voice1Attack])

  // function handle_voice1_attack(e) {
  //   synth.current.voice0.envelope.attack = e
  //   synthSaveObj.current.voice0_attack = e
  // }
  const [voice1Decay, setVoice1Decay] = useState(0.1)
  useEffect(() => {
    synth.current.voice0.envelope.decay = voice1Decay
  }, [voice1Decay])
  // function handle_voice1_decay(e) {
  //   synth.current.voice0.envelope.decay = e
  //   synthSaveObj.current.voice0_decay = e
  // }
  const [voice1Sustain, setVoice1Sustain] = useState(0.1)
  useEffect(() => {
    synth.current.voice0.envelope.decay = voice1Sustain
  }, [voice1Sustain])
  // function  handle_voice1_sustain(e) {
  //   synth.current.voice0.envelope.decay = e
  //   synthSaveObj.current.voice0_sustain = e
  // }
  const [voice1Release, setVoice1Release] = useState(0.1)
  useEffect(() => {
    synth.current.voice0.envelope.release = voice1Release
  }, [voice1Release])
  


  function handle_voice2_osc(e) {
    synth.current.voice1.oscillator.type = e.target.value
    synthSaveObj.current.voice1_oscillator = e.target.value
  }

  function handle_voice2_vol(e) {
    synth.current.voice1.volume.value = e
    synthSaveObj.current.voice1_volume = e
  }
  function handle_voice2_port(e) {
    synth.current.voice1.portamento = e
    synthSaveObj.current.voice1_portamento = e
  }
  function handle_voice2_attack(e) {
    synth.current.voice1.envelope.attack = e
    synthSaveObj.current.voice1_attack = e
  }
  function handle_voice2_decay(e) {
    synth.current.voice1.envelope.decay = e
    synthSaveObj.current.voice1_decay = e 
  }
  function handle_voice2_sustain(e) {
    synth.current.voice1.envelope.sustain = e
    synthSaveObj.current.voice1_sustain = e
  }
  function handle_voice2_release(e) {
    synth.current.voice1.envelope.release = e
    synthSaveObj.current.voice1_release = e
  }

  function handle_harm_change(e) {
    synth.current.harmonicity.value = e
    synthSaveObj.current.harmonicity = e
  }
  function handle_vibrato_rate(e) {
    synth.current.vibratoRate.value = e
    synthSaveObj.current.vibrato_rate = e
  }

  function handle_vibrato_amount(e) {
    synth.current.vibratoAmount.value = e
    synthSaveObj.current.vibrato_amount = e
  }

  function handleReverbAmount(e) {
    if (e > 0.1) {
      synth.current.connect(Reverb)
      synth.current.Reverb = e
      reverbSave.current.wet = e
    }else {
      synth.current.disconnect(Reverb)
    }
  }

  function handleBitCrusher(e) {
    if (e > 1) {
      synth.current.connect(BitCrusher)
      synth.current.BitCrusher = e
      bitcrusherSave.current.wet = e
    }else{
      synth.current.disconnect(BitCrusher)
    }
  }

  function handleDistortion(e) {
    if (e > 0.1) {
      synth.current.connect(Distortion)
      synth.current.Distortion = e
      distortionSave.current.wet = e
    }else {
      synth.current.disconnect(Distortion)
    }
  }
  
  function handleFeedback(e) {
    if (e > 0.1) {
      synth.current.connect(Feedback)
      synth.current.Feedback = e
      feedbackSave.current.wet = e
    }else {
      synth.current.disconnect(Feedback)
    }
  }

  function handleDelay(e) {
    if (e > 0.1) {
      synth.current.connect(Delay)
      synth.current.Delay = e
      delaySave.current.wet = e
    }else {
      synth.current.disconnect(Delay)
    }
  }

  function handlePhaser(e) {
    if (e > 0.1) {
      synth.current.connect(Phaser)
      synth.current.Phaser = e
      phaserSave.current.wet = e
    }else {
      synth.current.disconnect(Phaser)
    }
  }

  

  function handleSynthSave() {
    if (!currentUser) {
      setErrors("Must Be Logged in to save")
    }else if(soundName === "") {
      setErrors("sound must have a name")
    }else {
      const synthObject = {
        user_id: currentUser.id,
        sound_name: soundName,
        harmonicity: synthSaveObj.current.harmonicity,
        vibrato_amount: synthSaveObj.current.vibrato_amount,
        vibrato_rate: synthSaveObj.current.vibrato_rate,
        voice0_oscillator: synthSaveObj.current.voice0_oscillator,
        voice0_volume: synthSaveObj.current.voice0_volume,
        voice0_portamento: synthSaveObj.current.voice0_portamento,
        voice0_attack: synthSaveObj.current.voice0_attack,
        voice0_decay: synthSaveObj.current.voice0_decay,
        voice0_sustain: synthSaveObj.current.voice0_sustain,
        voice0_release: synthSaveObj.current.voice0_release,
        voice1_oscillator: synthSaveObj.current.voice1_oscillator,
        voice1_volume: synthSaveObj.current.voice1_volume,
        voice1_portamento: synthSaveObj.current.voice1_portamento,
        voice1_attack: synthSaveObj.current.voice1_attack,
        voice1_decay: synthSaveObj.current.voice1_decay,
        voice1_sustain: synthSaveObj.current.voice1_sustain,
        voice1_release: synthSaveObj.current.voice1_release,
        effects: [reverbSave, phaserSave, distortionSave, bitcrusherSave, delaySave, feedbackSave]
      }
      console.log(synthObject)
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
  }

  return (
    <div>
      <div>
      {errors ? <h2 className='error'>{errors}</h2> : null}
      </div>
      <div className='voice1'>
        <Oscillator1 
        setVoice1Osc={setVoice1Osc} 
        setVoice1Vol={setVoice1Vol} 
        voice1Vol={voice1Vol} 
        setVoice1Port={setVoice1Port} 
        voice1Port={voice1Port} 
        setVoice1Attack={setVoice1Attack}
        voice1Attack={voice1Attack}
        setVoice1Decay={setVoice1Decay}
        voice1Decay={voice1Decay}
        setVoice1Sustain={setVoice1Sustain}
        voice1Sustain={voice1Sustain}
        setVoice1Release={setVoice1Release}
        voice1Release={voice1Release}
        
        />
        {/* <div className='osc1form'>
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
              <Knob2 className='Knob_test' textColor={"white"} step={1} size={60} min={-5} max={10} value={testVol} onChange={(e) => {
                handle_voice1_vol(e.value)
                setTestVol(e.value)
                }} />
              <Knob
                name="Volume"
                unit="dB"
                defaultPercentage={testVol}
                onChange={(e) => setTestVol(e)}
                bg="black"
                fg="white"
                mouseSpeed={5}
                transform={p => parseInt(p * 10, 10) } 
                style={style} /> 


                <Knob2 className='Knob_test' textColor={"white"} step={1} size={60} min={0.1} max={10} value={testPort} onChange={(e) => {
                handle_voice1_port(e.value)
                setTestPort(e.value)
                }} />
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
            <Knob2 className='Knob_test' textColor={"white"} step={0.1} size={60} min={0.1} max={1} value={testAtt} onChange={(e) => {
                handle_voice1_attack(e.value)
                setTestAtt(e.value)
                }} />
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
                <Knob2 className='Knob_test' textColor={"white"} step={0.1} size={60} min={0.1} max={1} value={testDec} onChange={(e) => {
                handle_voice1_decay(e.value)
                setTestDec(e.value)
                }} />
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
              <Knob2 className='Knob_test' textColor={"white"} step={0.1} size={60} min={0.1} max={1} value={testSus} onChange={(e) => {
                handle_voice1_sustain(e.value)
                setTestSus(e.value)
                }} />
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
                <Knob2 className='Knob_test' textColor={"white"} step={0.1} size={60} min={0.1} max={1} value={testRel} onChange={(e) => {
                handle_voice1_release(e.value)
                setTestRel(e.value)
                }} />
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
        </div> */}
      </div>
      <div className='osc2form'>
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
            {/* <Knob2 className='Knob_test' textColor={"white"} step={1} size={60} min={-5} max={10} value={testVol2} onChange={(e) => {
                handle_voice2_vol(e.value)
                setTestVol2(e.value)
                }} /> */}
              {/* <Knob
                name="Volume"
                unit="dB"
                defaultPercentage={0}
                onChange={(e) => handle_voice2_vol(e)}
                bg="black"
                fg="white"
                mouseSpeed={5}
                transform={p => parseInt(p * 10, 10) } 
                style={style} /> */}
              {/* <Knob
                name="Portamento"
                unit="sec"
                defaultPercentage={0}
                onChange={(e) => handle_voice2_port(e)}
                bg="black"
                fg="white"
                mouseSpeed={5}
                transform={p => parseInt(p * 5)} 
                style={style} /> */}
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
        {/* <h3>Sound Name</h3> */}
        <input value={soundName} type={"text"} placeholder={"Sound Name"} onClick={() => setNameTyping(true)} onChange={(e) => {
          setNameTyping(true)
          setSoundName(e.target.value)
          }}></input>
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
          <button onClick={handleSoundReset}  className="button-63" role="button">Reset</button>    
          <button onClick={handleSynthSave} className="button-62" role="button">Save Sound</button>
        </div>
      </div>
      <br>
      </br>
      <div className='piano-parent'>
        <div className='piano'>
          <Piano 
          disabled={nameTyping ? true : false}
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
    </div>
  )
}


export default Home