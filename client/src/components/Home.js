import React from 'react'
import { createRef } from 'react';

const Home = () => {
  const editorRef = createRef()
  let knobPositionX;
  let knobPositionY;
  let knobCenterX;
  let knobCenterY;
  function handleMouseDown(e) {
    onMouseMove(e)
  }

  function onMouseMove(e) {
    console.log(editorRef.current)
    knobPositionX = editorRef.current.boundingRectangle.left 
    knobPositionY = editorRef.current.boundingRectangle.top

    knobCenterX = editorRef.current.boundingRectangle.width / 2 + knobPositionX
    knobCenterY = editorRef.current.boundingRectangle.height / 2 + knobPositionY
  }
 
  return (
    <div>
      <p>Reverb: <span id='volumeValue' className='current-value'>0</span></p>
      <div className='knob-surround'>
        <div ref={editorRef} className='knob' onMouseDown={handleMouseDown}></div>
        <span className='min'>Min</span>
        <span className='max'>Max</span>
      </div>
    </div>
  )
}

export default Home