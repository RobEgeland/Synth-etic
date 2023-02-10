import React, {useContext, useState, useRef, useEffect, Component} from 'react'
import { useParams, useRouteMatch, useHistory } from 'react-router-dom';
import { Piano, KeyboardShortcuts, MidiNumbers  } from 'react-piano'
import 'react-piano/dist/styles.css';
import * as Tone from 'tone'
import { UserContext } from '../context/UserContext'
import Oscillator1  from './Oscillator1';
import Oscilliator2 from './Oscilliator2';
import Vibracity from './Vibracity';
import Effects from './Effects';


const Home = ({sounds, setSounds}) => {

  let synth = useRef(null)
  let match = useRouteMatch('/:id')
  
  const [midiNote, setMidiNote] = useState(null)
  const [userSoundId, setUserSoundId] = useState(null)
  const [reverbUpdateId, setReverbUpdateId] = useState(null)
  const [phaserUpdateId, setPhaserUpdateId] = useState(null)
  const [distortionUpdateId, setDistortionUpdateId] = useState(null)
  const [bitchrusherUpdateId, setBitcrusherUpdateId] = useState(null)
  const [delayUpdateId, setDelayUpdateId] = useState(null)
  const [feedbackUpdateId, setFeedbackUpdateId] = useState(null)

  const history = useHistory()
  const { currentUser, loggedIn } = useContext(UserContext)
  const [errors, setErrors] = useState()
  const [nameTyping, setNameTyping] = useState(false)
  const [soundName, setSoundName] = useState("")
  
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
  
  // effect vars
  const Reverb = new Tone.Reverb({
    decay: 10,
  }).toDestination()
  
  const Phaser = new Tone.Phaser({
    frequency: 15,
	  octaves: 5,
	  baseFrequency: 500,
    wet: 0
  }).toDestination()
  const Distortion = new Tone.Distortion(0.4).toDestination()
  const Delay = new Tone.PingPongDelay("8n").toDestination()
  const Feedback = new Tone.FeedbackDelay("8n").toDestination()

  const BitCrusher = new Tone.BitCrusher({
    bits: 4,
    wet: 0
  }).toDestination()
  const firstNote = MidiNumbers.fromNote('c3');
  const lastNote = MidiNumbers.fromNote('f5');
  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: firstNote,
    lastNote: lastNote,
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
  });
  // 


  // function for loading in sounds
  // useEffect(() => {
  //   if (match) {
  //     fetch(`/sounds/${match.params.id}`)
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log(data)
  //       setSoundName(data.sound_name)
  //       setHarmonicity(data.harmonicity)
  //       setVibratoRate(data.vibrato_rate)
  //       setVibrato(data.vibrato_amount)
  //       setVoice1Osc(data.voice0_oscillator)
  //       setVoice1Vol(data.voice0_volume)
  //       setVoice1Port(data.voice0_portamento)
  //       setVoice1Attack(data.voice0_attack)
  //       setVoice1Decay(data.voice0_decay)
  //       setVoice1Sustain(data.voice0_sustain)
  //       setVoice1Release(data.voice0_release)
  //       setVoice2Osc(data.voice1_oscillator)
  //       setVoice2Vol(data.voice1_volume)
  //       setVoice2Port(data.voice1_portamento)
  //       setVoice2Attack(data.voice1_attack)
  //       setVoice2Decay(data.voice1_decay)
  //       setVoice2Sustain(data.voice1_sustain)
  //       setVoice2Release(data.voice1_release)
  //       setReverb(data.effects[0].wet)
  //       setReverbUpdateId(data.effects[0].id)
  //       setPhaser(data.effects[1].wet)
  //       setPhaserUpdateId(data.effects[1].id)
  //       setDistortion(data.effects[2].wet)
  //       setDistortionUpdateId(data.effects[2].id)
  //       setBitcrusher(data.effects[3].wet)
  //       setBitcrusherUpdateId(data.effects[3].id)
  //       setDelay(data.effects[4].wet)
  //       setDelayUpdateId(data.effects[4].id)
  //       setFeedback(data.effects[5].wet)
  //       setFeedbackUpdateId(data.effects[5].id)
  //       setUserSoundId(data.user.id)
  //     })
  //   }
  // }, [])
    
  // init function
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
          portamento: 0.1,
          envelope: {
              attack:0.1,
              decay: 0.1,
              sustain: 0.1,
              release: 0.1
          }
      },
      voice1: {
        volume: -10,
        portamento: 0.1,
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

  // localstore update after refresh
  useEffect(() => {
    let returnObj = JSON.parse(window.localStorage.getItem('Synth'))
    if (match) {
      fetch(`/sounds/${match.params.id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setSoundName(data.sound_name)
        setHarmonicity(data.harmonicity)
        setVibratoRate(data.vibrato_rate)
        setVibrato(data.vibrato_amount)
        setVoice1Osc(data.voice0_oscillator)
        setVoice1Vol(data.voice0_volume)
        setVoice1Port(data.voice0_portamento)
        setVoice1Attack(data.voice0_attack)
        setVoice1Decay(data.voice0_decay)
        setVoice1Sustain(data.voice0_sustain)
        setVoice1Release(data.voice0_release)
        setVoice2Osc(data.voice1_oscillator)
        setVoice2Vol(data.voice1_volume)
        setVoice2Port(data.voice1_portamento)
        setVoice2Attack(data.voice1_attack)
        setVoice2Decay(data.voice1_decay)
        setVoice2Sustain(data.voice1_sustain)
        setVoice2Release(data.voice1_release)
        setReverb(data.effects[0].wet)
        setReverbUpdateId(data.effects[0].id)
        setPhaser(data.effects[1].wet)
        setPhaserUpdateId(data.effects[1].id)
        setDistortion(data.effects[2].wet)
        setDistortionUpdateId(data.effects[2].id)
        setBitcrusher(data.effects[3].wet)
        setBitcrusherUpdateId(data.effects[3].id)
        setDelay(data.effects[4].wet)
        setDelayUpdateId(data.effects[4].id)
        setFeedback(data.effects[5].wet)
        setFeedbackUpdateId(data.effects[5].id)
        setUserSoundId(data.user.id)
      })
    }else if (window.localStorage.getItem('Synth')){
      setSoundName(returnObj.soundName)
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
  
  // localstore persistence
  useEffect(() => {
    window.localStorage.setItem('Synth', JSON.stringify({
      "soundName": soundName,
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
    feedback,
    soundName
  ])
  

  function handleSoundReset() {
    window.localStorage.clear()
    if(match) {
      history.push('/')
    }
    location.reload()
  }

  
  useEffect(() => {
    synth.current.voice0.oscillator.type = voice1Osc
  }, [voice1Osc])


  useEffect(() => {
    synth.current.voice0.volume.value = voice1Vol
  }, [voice1Vol])


  useEffect(() => {
    synth.current.voice0.portamento = voice1Port
  }, [voice1Port])

  useEffect(() => {
    if(voice1Attack !== synth.current.voice0.envelope.attack) {
      synth.current.voice0.envelope.attack = voice1Attack
    }else if(voice1Decay !== synth.current.voice0.envelope.decay) {
      synth.current.voice0.envelope.decay = voice1Decay
      console.log(synth.current.voice0.envelope.decay)
    }else if(voice1Sustain !== synth.current.voice0.envelope.sustain) {
      synth.current.voice0.envelope.sustain = voice1Sustain
      console.log(synth.current.voice0.envelope.sustain)
    }else if(voice1Release !== synth.current.voice0.envelope.release) {
      synth.current.voice0.envelope.release = voice1Release
      console.log(synth.current.voice0.envelope.release)
    }
  }, [voice1Attack, voice1Decay, voice1Sustain, voice1Release])


  
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
    if(voice2Attack !== synth.current.voice1.envelope.attack) {
      synth.current.voice1.envelope.attack = voice2Attack
    }else if(voice2Decay !== synth.current.voice1.envelope.decay) {
      synth.current.voice1.envelope.decay = voice2Decay
      console.log(synth.current.voice1.envelope.decay)
    }else if(voice2Sustain !== synth.current.voice1.envelope.sustain) {
      synth.current.voice1.envelope.sustain = voice2Sustain
      console.log(synth.current.voice1.envelope.sustain)
    }else if(voice2Release !== synth.current.voice1.envelope.release) {
      synth.current.voice1.envelope.release = voice2Release
      console.log(synth.current.voice1.envelope.release)
    }
  }, [voice2Attack, voice2Decay, voice2Sustain, voice2Release])

  
  // harm/vib controls

  useEffect(() => {
    if(harmonicity !== synth.current.harmonicity.value){
      synth.current.harmonicity.value = harmonicity
    } else if(vibrato !== synth.current.vibratoAmount.value){
      synth.current.vibratoAmount.value = vibrato
    }else if(vibratoRate !== synth.current.vibratoRate.value){
      synth.current.vibratoRate.value = vibratoRate
    }
  }, [harmonicity, vibrato, vibratoRate])

  // effects controls
  
  useEffect(() => {
    synth.current.connect(Reverb)
    Reverb.wet.value = reverb
    if (reverb == 0) {
      Reverb.wet.value = 0
    }
  }, [reverb])


  
  useEffect(() => {
    synth.current.connect(Phaser)
    Phaser.wet.value = phaser
    if (phaser == 0) {
      Phaser.wet.value = 0
    }
  }, [phaser])

  
  useEffect(() => {
    synth.current.connect(Distortion)
    Distortion.wet.value = distortion
    if (distortion == 0) {
      Distortion.wet.value = 0
    }
  }, [distortion])


  useEffect(() => {
    synth.current.connect(BitCrusher)
    BitCrusher.wet.value = bitcrusher
    if (bitcrusher == 0) {
      BitCrusher.wet.value = 0
    }
  }, [bitcrusher])


  useEffect(() => {
    synth.current.connect(Delay)
    synth.current.Delay = delay
    if (delay == 0) {
      Delay.wet.value = 0
    }
  }, [delay])

  
  useEffect(() => {
    synth.current.connect(Feedback)
    Feedback.wet.value = feedback
    if (feedback == 0) {
      Feedback.wet.value = 0
    }
  }, [feedback])

  

  function handleSynthSave() {
    if (!currentUser) {
      setErrors("must be logged in to save")
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
          setSounds([...sounds, data])
          window.localStorage.clear()
          history.push('/my-profile')
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

  function handleSynthUpdate(){
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
        "reverb": [reverb, reverbUpdateId],
        "phaser": [phaser, phaserUpdateId],
        "distortion": [distortion, distortionUpdateId], 
        "bitcrusher": [bitcrusher, bitchrusherUpdateId], 
        "delay": [delay, delayUpdateId],
        "feedback": [feedback, feedbackUpdateId]
      }
    }
    const headers = {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
    const options = {
      method: 'PATCH',
      headers,
      body: JSON.stringify(synthObject)
    }
    fetch(`/sounds/${match.params.id}`, options)
    .then(res => res.json())
    .then(data => {
      const filteredSounds = sounds.map((sound) => {
          if (sound.id === data.id) {
              return data
          } else {
              return sound
          }
      })
      setSounds(filteredSounds)
      history.push('/my-profile')
    })
  }

  return (
    <div>
      {errors ? <h2 className='error'>{errors}</h2> : null}
      <div className='voice1'>
        <Oscillator1 
        setVoice1Osc={setVoice1Osc} 
        voice1Osc={voice1Osc}
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
        voice2Osc={voice2Osc}
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
        match={match}
        userSoundId={userSoundId}
        handleSynthUpdate={handleSynthUpdate}
        />
      <br>
      </br>
      <div className='piano-parent'>
        <div className='piano'>
          <Piano 
          activeNotes={midiNote}
          playbackNote={[midiNote]}
          disabled={nameTyping ? true : false}
          noteRange={{ first: 48, last: 77}}
          playNote={(MidiNumbers) => {
            switch(MidiNumbers) {
              // 8TH note durration works for now but need to figure out how to extend
              case 48:
                synth.current.triggerAttackRelease("C4", "4n", '+0.05');
                break;
              case 49:
                synth.current.triggerAttackRelease("C#4", "4n", '+0.05');
                break;
              case 50:
                synth.current.triggerAttackRelease("D4", "4n", '+0.05');
                break;
              case 51:
                synth.current.triggerAttackRelease("D#4", "4n", '+0.05');
                break;
              case 52:
                synth.current.triggerAttackRelease("E4", "4n", '+0.05');
                break;
              case 53:
                synth.current.triggerAttackRelease("F4", "4n", '+0.05');
                break;
              case 54:
                synth.current.triggerAttackRelease("F#4", "4n", '+0.05');
                break;
              case 55:
                synth.current.triggerAttackRelease("G4", "4n", '+0.05');
                break;
              case 56:
                synth.current.triggerAttackRelease("G#4", "4n", '+0.05');
                break;
              case 57:
                synth.current.triggerAttackRelease("A4", "4n", '+0.05');
                break;  
              case 58:
                synth.current.triggerAttackRelease("A#4", "4n", '+0.05');
                break;
              case 59:
                synth.current.triggerAttackRelease("B4", "4n", '+0.05');
                break;
              case 60:
                synth.current.triggerAttackRelease("C5", "4n", '+0.05');
                break;
              case 61:
                synth.current.triggerAttackRelease("C#5", "4n", '+0.05');
                break;
              case 62:
                synth.current.triggerAttackRelease("D5", "4n", '+0.05');
                break;
              case 63:
                synth.current.triggerAttackRelease("D#5", "4n", '+0.05');
                break;
              case 64:
                synth.current.triggerAttackRelease("E5", "4n", '+0.05');
                break;
              case 65:
                synth.current.triggerAttackRelease("F5", "4n", '+0.05');
                break;
            }
          }}
          width={(window.innerWidth) - 17}
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