import React, {useState} from 'react'
import {Knob} from 'primereact/knob'

const Oscillator1 = ({
    setVoice1Osc, 
    voice1Osc,
    setVoice1Vol, 
    voice1Vol, 
    setVoice1Port, 
    voice1Port,
    setVoice1Attack,
    voice1Attack,
    setVoice1Decay,
    voice1Decay,
    setVoice1Sustain,
    voice1Sustain,
    setVoice1Release,
    voice1Release
}) => {

    return (
        <div className='osc1form'>
            <div className='voice1_osc '>
                <select value={voice1Osc} onChange={(e) => setVoice1Osc(e.target.value)} >
                    <option value={"sine"} selected>sine</option>
                    <option value={"triangle"}>triangle</option>
                    <option value={"sawtooth"}>sawtooth</option>
                    <option value={"square"}>square</option>
                </select>
            </div>
            <div className='voice1_vol'>
                <Knob className='voice1_volume' textColor={"white"} step={1} size={60} min={-5} max={10} value={voice1Vol} onChange={(e) => setVoice1Vol(e.value)} />
                <h3 className='knob_label'>Volume</h3>
            </div>
            <div className='voice1_port'>
                <Knob className='voice1_portamento' textColor={"white"} step={1} size={60} min={0} max={10} value={voice1Port} onChange={(e) => setVoice1Port(e.value)} />
                <h3 className='knob_label'>Portamento</h3>
            </div>
            <div className='voice1_att'>
                <Knob className='voice1_attack' textColor={"white"} step={0.1} size={60} min={0.1} max={1} value={voice1Attack} onChange={(e) => setVoice1Attack(e.value.toFixed(1))} />
                <h3 className='knob_label'>Attack</h3>
            </div>
            <div className='voice1_dec'>
                <Knob className='voice1_decay' textColor={"white"} step={0.1} size={60} min={0.1} max={1} value={voice1Decay} onChange={(e) => setVoice1Decay(e.value.toFixed(1))} />
                <h3 className='knob_label'>Decay</h3>
            </div>
            <div className='voice1_sus'>
                <Knob className='voice1_sustain' textColor={"white"} step={0.1} size={60} min={0.1} max={1} value={voice1Sustain} onChange={(e) => setVoice1Sustain(e.value.toFixed(1))} />
                <h3 className='knob_label'>Sustain</h3>
            </div>
            <div className='voice1_rel'>
                <Knob className='voice1_release' textColor={"white"} step={0.1} size={60} min={0.1} max={1} value={voice1Release} onChange={(e) => setVoice1Release(e.value.toFixed(1))} />
                <h3 className='knob_label'>Release</h3>
            </div>
        </div>
    )
}

export default Oscillator1