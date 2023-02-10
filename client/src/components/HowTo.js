import React from 'react'

const HowTo = () => {
  return (
    <div className='how-to'>
        <div className='title'>
            <h1>Welcome to Synth-etic!</h1>
            <h2>A fully web based synethizer</h2>
            <h3>This page is to give you a quick overveiw of the synth and what each of the knobs does.</h3>
        </div>
        <br>
        </br>
        <div className='oscillator'>
            <h2>Oscillator</h2>
            <br></br>
            <h3>Oscillator Dropdown</h3>
            <p>Each Oscillator dropdown will directly change the sound depending on with soundwave you choose.</p>
            <h3>Volume</h3>
            <p>This will change the volume of each specific Osc.</p>
            <h3>Portamento</h3>
            <p>This knob will change the speed in which the oscillator changes notes, so the higher the seconds the more of a gliding effect you will get.</p>
            <h3>Envelope</h3>
            <p>These four liitle knobs will change the evolution of the sound as you change them</p>
            <p><strong>Attack</strong>- this will slow time from key press to full volume</p>
            <p><strong>Decay</strong> - this will slow the time from attacks full volume to the level of sustain</p>
            <p><strong>Sustain</strong> - determines the volume of the sound while the key is hold down</p>
            <p><strong>Release</strong> - the opposite of attack, this will slow the time from when full volume to silence when you release the key</p>
        </div>
        <br>
        </br>
        <div className='Harm'>
            <h2>Harmonicity/Vibrato</h2>
            <h3>Each of these will change how the two oscillators interact with each other</h3>
            <br></br>
            <h3>Harmonicity</h3>
            <p>this changes the ratio between the two oscillator ex. 1 = 1 ocatave, 2 = 2 octaves</p>
            <h3>Vibrato Rate</h3>
            <p>this is how fast the two oscillator modulate between each other</p>
            <p>The vibrato knob just determines how much the effect has on the sound</p>
        </div>
        <br>
        </br>
        <div className='effect'>
            <h2>Effects</h2>
            <br></br>
            <h3>Reverb</h3>
            <p>this is an electronically produced echo effect</p>
            <h3>Phaser</h3>
            <p>this processes the sound with a filter giveing it a sweeping feel</p>
            <h3>Distortion</h3>
            <p>the distortion gives the sound a grainy feel to it</p>
            <h3>BitCrusher</h3>
            <p>this is similar to distortion but it has an 8-bit sound</p>
            <h3>Delay</h3>
            <p>this will repeat the original sound after a certain amount of time</p>
            <h3>Feedback</h3>
            <p>this determines the amount of signals(sounds) that are feed back into the delay effect</p>

        </div>
    </div>
  )
}

export default HowTo