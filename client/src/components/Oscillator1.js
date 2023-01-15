import React, {useState} from 'react'
import {Knob} from 'primereact/knob'

const Oscillator1 = ({
    setVoice1Osc, 
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
        <div>
            <div name='voice1_osc'>
                <select onChange={(e) => setVoice1Osc(e.target.value)} >
                    <option selected>sine</option>
                    <option>triangle</option>
                    <option>sawtooth</option>
                    <option>square</option>
                </select>
            </div>
            <div className='voice1_vol_port'>
                <Knob className='voice1_volume' textColor={"white"} step={1} size={60} min={-5} max={10} value={voice1Vol} onChange={(e) => setVoice1Vol(e)} />
                <Knob className='voice1_portamento' textColor={"white"} step={1} size={60} min={0} max={10} value={voice1Port} onChange={(e) => setVoice1Port(e)} />
            </div>
            <div className='voice1Env'>
                <Knob className='voice1_attack' textColor={"white"} step={0.1} size={60} min={0.1} max={1} value={voice1Attack} onChange={(e) => setVoice1Attack(e)} />
                <Knob className='voice1_decay' textColor={"white"} step={0.1} size={60} min={0.1} max={1} value={voice1Decay} onChange={(e) => setVoice1Decay(e)} />
                <Knob className='voice1_sustain' textColor={"white"} step={0.1} size={60} min={0.1} max={1} value={voice1Sustain} onChange={(e) => setVoice1Sustain(e)} />
                <Knob className='voice1_release' textColor={"white"} step={0.1} size={60} min={0.1} max={1} value={voice1Release} onChange={(e) => setVoice1Release(e)} />
            </div>
        </div>
    )
}

export default Oscillator1