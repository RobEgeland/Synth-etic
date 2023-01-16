import React from 'react'
import {Knob} from 'primereact/knob'

const Oscilliator2 = ({
    setVoice2Osc,
    setVoice2Vol,
    voice2Vol,
    setVoice2Port,
    voice2Port,
    setVoice2Attack,
    voice2Attack,
    setVoice2Decay,
    voice2Decay,
    setVoice2Sustain,
    voice2Sustain,
    setVoice2Release,
    voice2Release
}) => {
    return (
        <div className='osc2form'>
            <div name='voice2_osc'>
                <select onChange={(e) => setVoice2Osc(e.target.value)} >
                    <option selected>sine</option>
                    <option>triangle</option>
                    <option>sawtooth</option>
                    <option>square</option>
                </select>
            </div>
            <div className='voice2_vol'>
                <Knob className='voice2_volume' textColor={"white"} step={1} size={60} min={-5} max={10} value={voice2Vol} onChange={(e) => setVoice2Vol(e.value)} />
            </div>
            <div className='voice2_port'>
                <Knob className='voice2_portamento' textColor={"white"} step={1} size={60} min={0} max={10} value={voice2Port} onChange={(e) => setVoice2Port(e.value)} />
            </div>
            <div className='voice2_att'>
                <Knob className='voice2_attack' textColor={"white"} step={0.1} size={60} min={0.1} max={1} value={voice2Attack} onChange={(e) => setVoice2Attack(e.value)} />
            </div>
            <div className='voice2_dec'>
                <Knob className='voice2_decay' textColor={"white"} step={0.1} size={60} min={0.1} max={1} value={voice2Decay} onChange={(e) => setVoice2Decay(e.value)} />
            </div>
            <div className='voice2_sus'>
                <Knob className='voice2_sustain' textColor={"white"} step={0.1} size={60} min={0.1} max={1} value={voice2Sustain} onChange={(e) => setVoice2Sustain(e.value)} />
            </div>
            <div className='voice2_rel'>
                <Knob className='voice2_release' textColor={"white"} step={0.1} size={60} min={0.1} max={1} value={voice2Release} onChange={(e) => setVoice2Release(e.value)} />
            </div>
        </div>
    )
}

export default Oscilliator2