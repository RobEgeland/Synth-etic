import React from 'react'
import {Knob} from 'primereact/knob'

const Effects = ({
    soundName,
    setSoundName,
    setNameTyping,
    setReverb,
    reverb,
    setPhaser,
    phaser,
    setDistortion,
    distortion,
    setBitcrusher,
    bitcrusher,
    setDelay,
    delay,
    setFeedback,
    feedback,
    handleSynthSave
}) => {
    return (
        <div>
            <input value={soundName} type={"text"} placeholder={"Sound Name"} onChange={(e) => {
                setNameTyping(true)
                setSoundName(e.target.value)
                }}>
            </input>
            <div className='effects_inner'>
                <div className='reverb'>
                    <Knob className='reverb' textColor={"white"} step={0.1} size={75} min={0} max={1} value={reverb} onChange={(e) => setReverb(e.value)} />
                </div>
                <div className='phaser'>
                    <Knob className='phaser' textColor={"white"} step={0.1} size={75} min={0} max={1} value={phaser} onChange={(e) => setPhaser(e.value)} />
                </div>
                <div className='distortion'>
                    <Knob className='distortion' textColor={"white"} step={0.1} size={75} min={0} max={1} value={distortion} onChange={(e) => setDistortion(e.value)} />
                </div>
                <div className='bitcrusher'>
                    <Knob className='bitcrusher' textColor={"white"} step={0.1} size={75} min={0} max={1} value={bitcrusher} onChange={(e) => setBitcrusher(e.value)} />
                </div>
                <div className='delay'>
                    <Knob className='delay' textColor={"white"} step={0.1} size={75} min={0} max={1} value={delay} onChange={(e) => setDelay(e.value)} />
                </div>
                <div className='feedback'>
                    <Knob className='feedback' textColor={"white"} step={0.1} size={75} min={0} max={1} value={feedback} onChange={(e) => setFeedback(e.value)} />
                </div>
            </div>
            <button  className="button-63" role="button">Reset</button>    
            <button onClick={handleSynthSave} className="button-62" role="button">Save Sound</button>
        </div>
    )
}

export default Effects