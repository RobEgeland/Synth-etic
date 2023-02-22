import React from 'react'
import {Knob} from 'primereact/knob'

const Oscilliator2 = ({
    setVoice2Osc,
    voice2Osc,
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
            <div className='voice2_osc'>
                <select value={voice2Osc} onChange={(e) => setVoice2Osc(e.target.value)} >
                    <option value={"sine"}>sine</option>
                    <option value={"triangle"}>triangle</option>
                    <option value={"sawtooth"}>sawtooth</option>
                    <option value={"square"}>square</option>
                </select>
            </div>
            <div className='voice2_vol'>
                <Knob className='voice2_volume' textColor={"white"} step={1} size={60} min={-5} max={10} value={voice2Vol} onChange={(e) => setVoice2Vol(e.value)} />
                <h3 className='knob_label'>Volume</h3>
            </div>
            <div className='voice2_port'>
                <Knob className='voice2_portamento' textColor={"white"} step={1} size={60} min={0} max={10} value={voice2Port} onChange={(e) => setVoice2Port(e.value)} />
                <h3 className='knob_label'>Portamento</h3>
            </div>
            <div className='voice2_att'>
                <Knob className='voice2_attack' textColor={"white"} step={0.1} size={60} min={0.1} max={1} value={voice2Attack} onChange={(e) => setVoice2Attack(e.value.toFixed(1))} />
                <h3 className='knob_label'>Attack</h3>
            </div>
            <div className='voice2_dec'>
                <Knob className='voice2_decay' textColor={"white"} step={0.1} size={60} min={0.1} max={1} value={voice2Decay} onChange={(e) => setVoice2Decay(e.value.toFixed(1))} />
                <h3 className='knob_label'>Decay</h3>
            </div>
            <div className='voice2_sus'>
                <Knob className='voice2_sustain' textColor={"white"} step={0.1} size={60} min={0.1} max={1} value={voice2Sustain} onChange={(e) => setVoice2Sustain(e.value.toFixed(1))} />
                <h3 className='knob_label'>Sustain</h3>
            </div>
            <div className='voice2_rel'>
                <Knob className='voice2_release' textColor={"white"} step={0.1} size={60} min={0.1} max={1} value={voice2Release} onChange={(e) => setVoice2Release(e.value.toFixed(1))} />
                <h3 className='knob_label'>Release</h3>
            </div>
        </div>
    )
}

export default Oscilliator2