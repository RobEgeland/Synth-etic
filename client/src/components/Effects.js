import React, {useContext} from 'react'
import {Knob} from 'primereact/knob'
import { UserContext } from '../context/UserContext'

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
    handleSynthSave,
    handleSoundReset,
    match,
    userSoundId,
    handleSynthUpdate
}) => {
    const { currentUser, loggedIn } = useContext(UserContext)
    let button;
    if(match){
        if(userSoundId === currentUser.id){
            button = <button onClick={handleSynthUpdate} className="button-62" role="button">Update Sound</button>
        }else{
            button = null
        }
    }else{
        button = <button onClick={handleSynthSave} className="button-62" role="button">Save Sound</button>
    }
    return (
        <div className='effects'>
            <input value={soundName} type={"text"} placeholder={"Sound Name"} onClick={() => setNameTyping(true)} onChange={(e) => {
                setNameTyping(true)
                setSoundName(e.target.value)
                }}>
            </input>
            <div className='effects_inner'>
                <div className='reverb'>
                    <Knob className='reverb' textColor={"white"} step={0.1} size={75} min={0} max={1} value={reverb} onChange={(e) => setReverb(e.value)} />
                    <h3 className='knob_label'>Reverb</h3>
                </div>
                <div className='phaser'>
                    <Knob className='phaser' textColor={"white"} step={0.1} size={75} min={0} max={1} value={phaser} onChange={(e) => setPhaser(e.value)} />
                    <h3 className='knob_label'>Phaser</h3>
                </div>
                <div className='distortion'>
                    <Knob className='distortion' textColor={"white"} step={0.1} size={75} min={0} max={1} value={distortion} onChange={(e) => setDistortion(e.value)} />
                    <h3 className='knob_label'>Distortion</h3>
                </div>
                <div className='bitcrusher'>
                    <Knob className='bitcrusher' textColor={"white"} step={0.1} size={75} min={0} max={1} value={bitcrusher} onChange={(e) => setBitcrusher(e.value)} />
                    <h3 className='knob_label'>BitCrusher</h3>
                </div>
                <div className='delay'>
                    <Knob className='delay' textColor={"white"} step={0.1} size={75} min={0} max={1} value={delay} onChange={(e) => setDelay(e.value)} />
                    <h3 className='knob_label'>Delay</h3>
                </div>
                <div className='feedback'>
                    <Knob className='feedback' textColor={"white"} step={0.1} size={75} min={0} max={1} value={feedback} onChange={(e) => setFeedback(e.value)} />
                    <h3 className='knob_label'>Feedback</h3>
                </div>
            </div>
            <button  className="button-63" role="button" onClick={handleSoundReset}>Reset</button>    
            {button}
        </div>
    )
}

export default Effects