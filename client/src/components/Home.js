import React from 'react'
import { Piano, KeyboardShortcuts, MidiNumbers  } from 'react-piano'
import 'react-piano/dist/styles.css';
import * as Tone from 'tone'

const Home = () => {
  const synth = new Tone.Synth().toDestination();
  const firstNote = MidiNumbers.fromNote('c3');
  const lastNote = MidiNumbers.fromNote('f5');
  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: firstNote,
    lastNote: lastNote,
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
  });

 
  return (
    <div>
      <Piano 
      noteRange={{ first: 48, last: 77}}
      playNote={(MidiNumbers) => {
        switch(MidiNumbers) {
          case 48:
            synth.triggerAttackRelease("C4", "8n");
            break;
          case 49:
            synth.triggerAttackRelease("C#4", "8n");
            break;
          case 50:
            synth.triggerAttackRelease("D4", "8n");
            break;
          case 51:
            synth.triggerAttackRelease("D#4", "8n");
            break;
          case 52:
            synth.triggerAttackRelease("E4", "8n");
            break;
          case 53:
            synth.triggerAttackRelease("F4", "8n");
            break;
          case 54:
            synth.triggerAttackRelease("F#4", "8n");
            break;
          case 55:
            synth.triggerAttackRelease("G4", "8n");
            break;
          case 56:
            synth.triggerAttackRelease("G#4", "8n");
            break;
          case 57:
            synth.triggerAttackRelease("A4", "8n");
            break;  
          case 58:
            synth.triggerAttackRelease("A#4", "8n");
            break;
          case 59:
            synth.triggerAttackRelease("B4", "8n");
            break;
          case 60:
            synth.triggerAttackRelease("C5", "8n");
            break;
          case 61:
            synth.triggerAttackRelease("C#5", "8n");
            break;
          case 62:
            synth.triggerAttackRelease("D5", "8n");
            break;
          case 63:
            synth.triggerAttackRelease("D#5", "8n");
            break;
          case 64:
            synth.triggerAttackRelease("E5", "8n");
            break;
          case 65:
            synth.triggerAttackRelease("F5", "8n");
            break;
        }
      }}
      width={1000}
      stopNote={(midiNumber) => {
        // Stop playing a given note - see notes below
      }}
      keyboardShortcuts={keyboardShortcuts}
      />
    </div>
  )
}

export default Home