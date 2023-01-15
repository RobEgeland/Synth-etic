import React from 'react'

const Oscillator1 = () => {
  return (
    <div className='voice_1'>
        <div name='voice1_osc'>
            <select onChange={handle_voice1_osc} >
                <option selected>sine</option>
                <option>triangle</option>
                <option>sawtooth</option>
                <option>square</option>
            </select>
        </div>
        <div className='voice1_vol_port'>
            <Knob2 className='Knob_test' textColor={"white"} step={1} size={60} min={-5} max={10} value={testVol} onChange={(e) => {
                handle_voice1_vol(e.value)
                setTestVol(e.value)
                }} />
            <Knob2 className='Knob_test' textColor={"white"} step={1} size={60} min={0.1} max={10} value={testPort} onChange={(e) => {
                handle_voice1_port(e.value)
                setTestPort(e.value)
                }} />
        </div>
        <div className='voice1Env'>
            <Knob2 className='Knob_test' textColor={"white"} step={0.1} size={60} min={0.1} max={1} value={testAtt} onChange={(e) => {
                handle_voice1_attack(e.value)
                setTestAtt(e.value)
                }} />
            <Knob2 className='Knob_test' textColor={"white"} step={0.1} size={60} min={0.1} max={1} value={testDec} onChange={(e) => {
                handle_voice1_decay(e.value)
                setTestDec(e.value)
                }} />
            <Knob2 className='Knob_test' textColor={"white"} step={0.1} size={60} min={0.1} max={1} value={testSus} onChange={(e) => {
                handle_voice1_sustain(e.value)
                setTestSus(e.value)
                }} />
            <Knob2 className='Knob_test' textColor={"white"} step={0.1} size={60} min={0.1} max={1} value={testRel} onChange={(e) => {
                handle_voice1_release(e.value)
                setTestRel(e.value)
                }} />
        </div>
    </div>
  )
}

export default Oscillator1