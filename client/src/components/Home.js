import React, {useContext, useState, useRef, useEffect, Component} from 'react'
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
  // synth state vars
  const [voice1Osc, setVoice1Osc] = useState("sine")
  const [voice1Vol, setVoice1Vol] = useState(-5)
  const [voice1Port, setVoice1Port] = useState(0)
  const [voice1Attack, setVoice1Attack] = useState(0.1)
  const [voice1Decay, setVoice1Decay] = useState(0.1)
  const [voice1Sustain, setVoice1Sustain] = useState(0.1)
  const [voice1Release, setVoice1Release] = useState(0.1)
  const [voice2Osc, setVoice2Osc] = useState("sine")
  const [voice2Vol, setVoice2Vol] = useState(-5)
  const [voice2Port, setVoice2Port] = useState(0)
  const [voice2Attack, setVoice2Attack] = useState(0.1)
  const [voice2Decay, setVoice2Decay] = useState(0.1)
  const [voice2Sustain, setVoice2Sustain] = useState(0.1)
  const [voice2Release, setVoice2Release] = useState(0.1)
  const [harmonicity, setHarmonicity] = useState(0.1)
  const [vibratoRate, setVibratoRate] = useState(4.5)
  const [vibrato, setVibrato] = useState(0.1)
  const [reverb, setReverb] = useState(0)
  const [phaser, setPhaser] = useState(0)
  const [distortion, setDistortion] = useState(0)
  const [bitcrusher, setBitcrusher] = useState(0)
  const [delay, setDelay] = useState(0)
  const [feedback, setFeedback] = useState(0)

  let synth = useRef(null)
    const reverbAmount = 0.1
    // can possible get rid of decay knob, make it constant
    const reverbDecay = 4
  
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
  }, [])

  useEffect(() => {
    let returnObj = JSON.parse(window.localStorage.getItem('Synth'))
    if (window.localStorage.getItem('Synth')){
      setHarmonicity(returnObj.harmonicity)
      setVibratoRate(returnObj.vibratoRate)
      setVibrato(returnObj.vibrato)
      setVoice1Osc(returnObj.voice1Osc)
      setVoice1Vol(returnObj.voice1Vol)
      setVoice1Port(returnObj.voice1Port)
      setVoice1Attack(returnObj.voice1Attack)
      setVoice1Decay(returnObj.voice1Decay)
      setVoice1Sustain(returnObj.voice1Sustain)
      setVoice1Release(returnObj.voice1Release)
      setVoice2Osc(returnObj.voice2Osc)
      setVoice2Vol(returnObj.voice2Vol)
      setVoice2Port(returnObj.voice2Port)
      setVoice2Attack(returnObj.voice2Attack)
      setVoice2Decay(returnObj.voice2Decay)
      setVoice2Sustain(returnObj.voice2Sustain)
      setVoice2Release(returnObj.voice2Release)
      setReverb(returnObj.reverb)
      setPhaser(returnObj.phaser)
      setDistortion(returnObj.distortion)
      setBitcrusher(returnObj.bitcrusher)
      setDelay(returnObj.delay)
      setFeedback(returnObj.feedback)
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('Synth', JSON.stringify({
      "harmonicity": harmonicity,
      "vibratoRate": vibratoRate,
      "vibrato": vibrato,
      "voice1Osc": voice1Osc,
      "voice1Vol": voice1Vol,
      "voice1Port": voice1Port,
      "voice1Attack": voice1Attack,
      "voice1Decay": voice1Decay,
      "voice1Sustain": voice1Sustain,
      "voice1Release": voice1Release,
      "voice2Osc": voice2Osc,
      "voice2Vol": voice2Vol,
      "voice2Port": voice2Port,
      "voice2Attack": voice2Attack,
      "voice2Decay": voice2Decay,
      "voice2Sustain": voice2Sustain,
      "voice2Release": voice2Release,
      "reverb": reverb,
      "phaser": phaser,
      "distortion": distortion,
      "bitcrusher": bitcrusher,
      "delay": delay,
      "feedback": feedback
    }))
  }, [
    harmonicity, 
    vibratoRate, 
    vibrato, 
    voice1Osc, 
    voice1Vol, 
    voice1Port, 
    voice1Attack, 
    voice1Decay, 
    voice1Sustain,
    voice1Release,
    voice2Osc,
    voice2Vol,
    voice2Port,
    voice2Attack,
    voice2Decay,
    voice2Sustain,
    voice2Release,
    reverb,
    phaser,
    distortion,
    bitcrusher,
    delay,
    feedback
  ])
  

  function handleSoundReset() {
    window.localStorage.clear()
    location.reload()
  }

  // functions for changing knobs
  // Voice 1 controls
  
  useEffect(() => {
    synth.current.voice0.oscillator.type = voice1Osc
  }, [voice1Osc])

 
  useEffect(() => {
    synth.current.voice0.volume.value = voice1Vol
  }, [voice1Vol])


  
  useEffect(() => {
    synth.current.voice0.portamento = voice1Port
  }, [voice1Port])

  // these can be refactored to one function
  
  useEffect(() => {
    synth.current.voice0.envelope.attack = voice1Attack
  }, [voice1Attack])


  
  useEffect(() => {
    synth.current.voice0.envelope.decay = voice1Decay
  }, [voice1Decay])

  
  useEffect(() => {
    synth.current.voice0.envelope.decay = voice1Sustain
  }, [voice1Sustain])

  
  useEffect(() => {
    synth.current.voice0.envelope.release = voice1Release
  }, [voice1Release])
  
  // voice 2 controls
  
  useEffect(() => {
    synth.current.voice1.oscillator.type = voice2Osc
  }, [voice2Osc])

  
  useEffect(() => {
    synth.current.voice1.volume.value = voice2Vol
  }, [voice2Vol])

  
  useEffect(() => {
    synth.current.voice1.portamento = voice2Port
  }, [voice2Port])

 
  useEffect(() => {
    synth.current.voice1.envelope.attack = voice2Attack
  }, [voice2Attack])

  
  useEffect(() => {
    synth.current.voice1.envelope.decay = voice2Decay
  }, [voice2Decay])

  
  useEffect(() => {
    synth.current.voice1.envelope.sustain = voice2Sustain
  }, [voice2Sustain])

  
  useEffect(() => {
    synth.current.voice1.envelope.release = voice2Release
  }, [voice2Release])
  
  // harm/vib controls
  
  useEffect(() => {
    synth.current.harmonicity.value = harmonicity
  }, [harmonicity])

  
  useEffect(() => {
    synth.current.vibratoRate.value = vibratoRate
  }, [vibratoRate])

  
  useEffect(() => {
    synth.current.vibratoAmount.value = vibrato
  }, [vibrato])

  // effects controls
  
  useEffect(() => {
    synth.current.connect(Reverb)
    synth.current.Reverb = reverb
    if (reverb === 0) {
      synth.current.disconnect(Reverb)
    }
  }, [reverb])

  
  useEffect(() => {
    synth.current.connect(Phaser)
    synth.current.Phaser = phaser
    if (phaser === 0) {
      synth.current.disconnect(Phaser)
    }
  }, [phaser])

  
  useEffect(() => {
    synth.current.connect(Distortion)
    synth.current.Distortion = distortion
    if (distortion === 0) {
      synth.current.disconnect(Distortion)
    }
  }, [distortion])


  useEffect(() => {
    synth.current.connect(BitCrusher)
    synth.current.BitCrusher = bitcrusher
    if (bitcrusher === 0) {
      synth.current.disconnect(BitCrusher)
    }
  })

  
  useEffect(() => {
    synth.current.connect(Delay)
    synth.current.Delay = delay
    if (delay === 0) {
      synth.current.disconnect(Delay)
    }
  }, [delay])

  
  useEffect(() => {
    synth.current.connect(Feedback)
    synth.current.Feedback = feedback
    if (feedback === 0) {
      synth.current.disconnect(Feedback)
    }
  }, [feedback])

  

  function handleSynthSave() {
    if (!currentUser) {
      setErrors("Must Be Logged in to save")
    }else if(soundName === "") {
      setErrors("sound must have a name")
    }else {
      const synthObject = {
        user_id: currentUser.id,
        sound_name: soundName,
        harmonicity: harmonicity,
        vibrato_amount: vibrato,
        vibrato_rate: vibratoRate,
        voice0_oscillator: voice1Osc,
        voice0_volume: voice1Vol,
        voice0_portamento: voice1Port,
        voice0_attack: voice1Attack,
        voice0_decay: voice1Decay,
        voice0_sustain: voice1Sustain,
        voice0_release: voice1Release,
        voice1_oscillator: voice2Osc,
        voice1_volume: voice2Vol,
        voice1_portamento: voice2Port,
        voice1_attack: voice2Attack,
        voice1_decay: voice2Decay,
        voice1_sustain: voice2Sustain,
        voice1_release: voice2Release,
        effects: {
          "reverb": reverb,
          "phaser": phaser, 
          "distortion": distortion, 
          "bitcrusher": bitcrusher, 
          "delay": delay, 
          "feedback": feedback
        }
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
        handleSoundReset={handleSoundReset}
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