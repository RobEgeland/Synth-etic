import { useState } from "react";
import { createContainer } from 'react-tracked'
import { createContext } from "react";

const initialState = {
    harmonicity: 0,
    vibratoAmount: 0,
    vibratoRate: 0,
    voice0: {
        oscillator: {
            type: "sine"
        },
        volume: -10,
        portamento: 0,
        envelope: {
            attack: 0.1,
            decay: 0.1,
            sustain: 0.1,
            release: 0.1
        }
    },
    voice1: {
        oscillator: {
            type: "sine"
        },
        volume: -10,
        portamento: 0,
        envelope: {
            attack: 0.1,
            decay: 0.1,
            sustain: 0.1,
            release: 0.1
        }
    }
}

const useMyState = () => useState(initialState)

export const { Provider: SynthProvider, useTracked: useSharedState } = createContainer(useMyState)

// export const SynthSetupContext = createContext(null)