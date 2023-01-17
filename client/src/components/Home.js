import React, {useContext, useState, useRef, useEffect} from 'react'
import { Piano, KeyboardShortcuts, MidiNumbers  } from 'react-piano'
import 'react-piano/dist/styles.css';
import * as Tone from 'tone'
import Knob from "react-simple-knob";
import {Knob as Knob2} from 'primereact/knob'
import { Distortion } from 'tone';
import { UserContext } from '../context/UserContext'
import Oscillator1  from './Oscillator1';
import Oscilliator2 from './Oscilliator2';
import Vibracity from './Vibracity';
import Effects from './Effects';


const Home = () => {
  const { currentUser, loggedIn } = useContext(UserContext)
  const [errors, setErrors] = useState()
  const [nameTyping, setNameTyping] = useState(false)
  const [soundName, setSoundName] = useState("")
  const [reload, setReload] = useState(false)
  const [synthReset, setSynthReset] = useState(false)
  let synth = useRef(null)
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
  // let distortionSave = useRef({
  //     name: "distortion",
  //     wet: 0.1
  //   })
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
    // const phaser = 0.1
  
  

    // delay is in seconds

    // not sure about the autofilter
    const [autoFilter, setAutoFilter] = useState(0)
    // bitchrusher range 1-8
  
    
  
    const Reverb = new Tone.Reverb(reverbDecay, reverbAmount).toDestination()
    const Phaser = new Tone.Phaser({
      frequency: 10,
	    octaves: 5,
	    baseFrequency: 600
    }).toDestination()
    const Distortion = new Tone.Distortion(0.4).toDestination()
    const Delay = new Tone.PingPongDelay("8n").toDestination()
    const Feedback = new Tone.FeedbackDelay("8n").toDestination()
    const BitCrusher = new Tone.BitCrusher(2).toDestination()

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
  // window.addEventListener('beforeunload', () => {
  //   window.sessionStorage.setItem("synth", JSON.stringify(synthSaveObj.current))
  //   window.sessionStorage.setItem("reload", "true")
  // }) 

  // window.addEventListener('load', () => {
  //   console.log(reload)
  //   if (window.sessionStorage.getItem("reload") === "true") {
  //     let returnObj = JSON.parse(window.sessionStorage.getItem("synth"))

  
  //     synth.current.harmonicity.value = returnObj.harmonicity
  //     synth.current.vibratoAmount.value = returnObj.vibrato_amount
  //     synth.current.vibratoRate.value = returnObj.vibrato_rate
  //     synth.current.voice0.oscillator.type = returnObj.voice0_oscillator
  //     synth.current.voice0.volume.value = returnObj.voice0_volume
  //     synth.current.voice0.portamento = returnObj.voice0_portamento
  //     synth.current.voice0.envelope.attack = returnObj.voice0_attack
  //     synth.current.voice0.envelope.decay = returnObj.voice0_decay
  //     synth.current.voice0.envelope.sustain = returnObj.voice0_sustain
  //     synth.current.voice0.envelope.release = returnObj.voice0_release
  //     synth.current.voice1.volume.value = returnObj.voice1_volume
  //     synth.current.voice1.portamento = returnObj.voice1_portamento
  //     synth.current.voice1.oscillator.type = returnObj.voice1_oscillator
  //     synth.current.voice1.envelope.attack = returnObj.voice1_attack
  //     synth.current.voice1.envelope.decay = returnObj.voice1_decay
  //     synth.current.voice1.envelope.sustain = returnObj.voice1_sustain
  //     synth.current.voice1.envelope.release = returnObj.voice1_release
      
  //     synthSaveObj.current = JSON.parse(window.sessionStorage.getItem("synth"))
  //     voice0_vol_default = parseFloat(`0.${returnObj.voice0_volume}`)
  //     // synth.current = synthSaveObj.current
  //     window.sessionStorage.setItem("reload", "false")
  //   }
  // })
  

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
  // Voice 1 controls
  const [voice1Osc, setVoice1Osc] = useState("sine")
  useEffect(() => {
    synth.current.voice0.oscillator.type = voice1Osc
  }, [voice1Osc])

  const [voice1Vol, setVoice1Vol] = useState(-5)
  useEffect(() => {
    synth.current.voice0.volume.value = voice1Vol
  }, [voice1Vol])


  const [voice1Port, setVoice1Port] = useState(0)
  useEffect(() => {
    synth.current.voice0.portamento = voice1Port
  }, [voice1Port])

  // these can be refactored to one function
  const [voice1Attack, setVoice1Attack] = useState(0.1)
  useEffect(() => {
    synth.current.voice0.envelope.attack = voice1Attack
  }, [voice1Attack])


  const [voice1Decay, setVoice1Decay] = useState(0.1)
  useEffect(() => {
    synth.current.voice0.envelope.decay = voice1Decay
  }, [voice1Decay])

  const [voice1Sustain, setVoice1Sustain] = useState(0.1)
  useEffect(() => {
    synth.current.voice0.envelope.decay = voice1Sustain
  }, [voice1Sustain])

  const [voice1Release, setVoice1Release] = useState(0.1)
  useEffect(() => {
    synth.current.voice0.envelope.release = voice1Release
  }, [voice1Release])
  
  // voice 2 controls
  const [voice2Osc, setVoice2Osc] = useState("sine")
  useEffect(() => {
    synth.current.voice1.oscillator.type = voice2Osc
  }, [voice2Osc])

  const [voice2Vol, setVoice2Vol] = useState(-5)
  useEffect(() => {
    synth.current.voice1.volume.value = voice2Vol
  }, [voice2Vol])

  const [voice2Port, setVoice2Port] = useState(0)
  useEffect(() => {
    synth.current.voice1.portamento = voice2Port
  }, [voice2Port])

  const [voice2Attack, setVoice2Attack] = useState(0.1)
  useEffect(() => {
    synth.current.voice1.envelope.attack = voice2Attack
  }, [voice2Attack])

  const [voice2Decay, setVoice2Decay] = useState(0.1)
  useEffect(() => {
    synth.current.voice1.envelope.decay = voice2Decay
  }, [voice2Decay])

  const [voice2Sustain, setVoice2Sustain] = useState(0.1)
  useEffect(() => {
    synth.current.voice1.envelope.sustain = voice2Sustain
  }, [voice2Sustain])

  const [voice2Release, setVoice2Release] = useState(0.1)
  useEffect(() => {
    synth.current.voice1.envelope.release = voice2Release
  }, [voice2Release])
  
  // harm/vib controls
  const [harmonicity, setHarmonicity] = useState(0.1)
  useEffect(() => {
    synth.current.harmonicity.value = harmonicity
  }, [harmonicity])

  const [vibratoRate, setVibratoRate] = useState(4.5)
  useEffect(() => {
    synth.current.vibratoRate.value = vibratoRate
  }, [vibratoRate])

  const [vibrato, setVibrato] = useState(0.1)
  useEffect(() => {
    synth.current.vibratoAmount.value = vibrato
  }, [vibrato])

  // effects controls
  const [reverb, setReverb] = useState(0)
  useEffect(() => {
    synth.current.connect(Reverb)
    synth.current.Reverb = reverb
    if (reverb === 0) {
      synth.current.disconnect(Reverb)
    }
  }, [reverb])

  const [phaser, setPhaser] = useState(0)
  useEffect(() => {
    synth.current.connect(Phaser)
    synth.current.Phaser = phaser
    if (phaser === 0) {
      synth.current.disconnect(Phaser)
    }
  }, [phaser])

  const [distortion, setDistortion] = useState(0)
  useEffect(() => {
    synth.current.connect(Distortion)
    synth.current.Distortion = distortion
    if (distortion === 0) {
      synth.current.disconnect(Distortion)
    }
  }, [distortion])

  const [bitcrusher, setBitcrusher] = useState(0)
  useEffect(() => {
    synth.current.connect(BitCrusher)
    synth.current.BitCrusher = bitcrusher
    if (bitcrusher === 0) {
      synth.current.disconnect(BitCrusher)
    }
  })

  const [delay, setDelay] = useState(0)
  useEffect(() => {
    synth.current.connect(Delay)
    synth.current.Delay = delay
    if (delay === 0) {
      synth.current.disconnect(Delay)
    }
  }, [delay])

  const [feedback, setFeedback] = useState(0)
  useEffect(() => {
    synth.current.connect(Feedback)
    synth.current.Feedback = feedback
    if (feedback === 0) {
      synth.current.disconnect(Feedback)
    }
  }, [feedback])
  // function handleBitCrusher(e) {
  //   if (e > 1) {
  //     synth.current.connect(BitCrusher)
  //     synth.current.BitCrusher = e
  //     bitcrusherSave.current.wet = e
  //   }else{
  //     synth.current.disconnect(BitCrusher)
  //   }
  // }

  // function handleDistortion(e) {
  //   if (e > 0.1) {
  //     synth.current.connect(Distortion)
  //     synth.current.Distortion = e
  //     distortionSave.current.wet = e
  //   }else {
  //     synth.current.disconnect(Distortion)
  //   }
  // }
  
  function handleFeedback(e) {
    if (e > 0.1) {
      synth.current.connect(Feedback)
      synth.current.Feedback = e
      feedbackSave.current.wet = e
    }else {
      synth.current.disconnect(Feedback)
    }
  }

  // function handleDelay(e) {
  //   if (e > 0.1) {
  //     synth.current.connect(Delay)
  //     synth.current.Delay = e
  //     delaySave.current.wet = e
  //   }else {
  //     synth.current.disconnect(Delay)
  //   }
  // }

  // function handlePhaser(e) {
  //   if (e > 0.1) {
  //     synth.current.connect(Phaser)
  //     synth.current.Phaser = e
  //     phaserSave.current.wet = e
  //   }else {
  //     synth.current.disconnect(Phaser)
  //   }
  // }

  

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
      </div>
      <div className='voice2'>
        <Oscilliator2 
        setVoice2Osc={setVoice2Osc}
        setVoice2Vol={setVoice2Vol}
        voice2Vol={voice2Vol}
        setVoice2Port={setVoice2Port}
        voice2Port={voice2Port}
        setVoice2Attack={setVoice2Attack}
        voice2Attack={voice2Attack}
        setVoice2Decay={setVoice2Decay}
        voice2Decay={voice2Decay}
        setVoice2Sustain={setVoice2Sustain}
        voice2Sustain={voice2Sustain}
        setVoice2Release={setVoice2Release}
        voice2Release={voice2Release}
        />
      </div>
      <div className='triangle' />
      <div className='vib_harm'>
        <div >
          <Vibracity 
          setHarmonicity={setHarmonicity}
          harmonicity={harmonicity}
          setVibratoRate={setVibratoRate}
          vibratoRate={vibratoRate}
          setVibrato={setVibrato}
          vibrato={vibrato}
          />
        </div>
      </div>
        <Effects 
        soundName={soundName}
        setSoundName={setSoundName}
        setNameTyping={setNameTyping}
        setReverb={setReverb}
        reverb={reverb}
        setPhaser={setPhaser}
        phaser={phaser}
        setDistortion={setDistortion}
        distortion={distortion}
        setBitcrusher={setBitcrusher}
        bitcrusher={bitcrusher}
        setDelay={setDelay}
        delay={delay}
        setFeedback={setFeedback}
        feedback={feedback}
        // handleSoundReset={handleSoundReset}
        handleSynthSave={handleSynthSave}
        />
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
          width={1905}
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