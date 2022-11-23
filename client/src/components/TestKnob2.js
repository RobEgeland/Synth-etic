import React, {useState} from 'react'
import Knob from "react-simple-knob";

const TestKnob2 = () => {
    const [reverb, setReverb] = useState()
    const style = {
        margin: "20%",
        height: "100px",
        fontFamily: "Arial",
        color: "white" // Sets font color of value and knob name
    };

    return (
    <Knob
        name="Reverb"
        unit=""
        defaultPercentage={0.7}
        onChange={setReverb}
        bg="black"
        fg="white"
        mouseSpeed={5}
        // need to figure out how to truncate the number
        transform={p => parseFloat(p * 1.0) + 0} 
        style={style} />
    )
}

export default TestKnob2