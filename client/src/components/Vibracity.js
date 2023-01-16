import React from 'react'
import {Knob} from 'primereact/knob'

const Vibracity = ({
    setHarmonicity,
    harmonicity,
    setVibratoRate,
    vibratoRate,
    setVibrato,
    vibrato
    
}) => {
  return (
    <div>
        <div className='harmonicity'>
            <Knob className='harmonicity' textColor={"white"} step={0.1} size={75} min={0} max={2} value={harmonicity} onChange={(e) => setHarmonicity(e.value)} />
        </div>
        <div className='vibrato_rate'>
            <Knob className='vibrato_rate' textColor={"white"} step={0.5} size={75} min={4.5} max={15} value={vibratoRate} onChange={(e) => setVibratoRate(e.value)} />
        </div>
        <div className='vibrato'>
            <Knob className='vibrato' textColor={"white"} step={0.1} size={75} min={0} max={1} value={vibrato} onChange={(e) => setVibrato(e.value)} />
        </div>
    </div>
  )
}

export default Vibracity