import './App.css';
import SignUp from './components/SignUp';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Login from './components/Login';
import TestKnob2 from './components/TestKnob2';
import UserProfile from './components/UserProfile';
import {useState, useEffect, useMemo, useRef} from "react"
import {BrowserRouter, Route, Switch} from "react-router-dom"
import { UserContext } from './context/UserContext';
import { SynthProvider, useTrackedState } from './context/SynthSetupContext';
import * as Tone from 'tone'


function App() {
  let synth;
  const [currentUser, setCurrentUser] = useState()
  const [loggedIn, setLoggedIn] = useState(false)

  // const [voice1, setVoice1] = useState({
  //   // need to figure out how high/low this can go
  //   volume: -10, 
  //   // think this will go to 5?
  //   portamento: 0,
  //   // sine, triangle, sawtooth, square
  //   oscillator: {
  //     type: "sine"
  //   },
  //   // all these are 0 - 1
  //   envelope : {
  //     attack: 0.1,
  //     decay: 0.1,
  //     sustain: 0.1,
  //     release: 0.1
  //   }
  // })
  // const [voice2, setVoice2] = useState({
  //   // need to figure out how high/low this can go
  //   volume: -10, 
  //   // think this will go to 5?
  //   portamento: 0,
  //   // sine, triangle, sawtooth, square
  //   oscillator: {
  //     type: "sine"
  //   },
  //   // all these are 0 - 1
  //   envelope : {
  //     attack: 0.1,
  //     decay: 0.1,
  //     sustain: 0.1,
  //     release: 0.1
  //   }
  // })
  // const [harmonicity, setHarmonicity] = useState(1.0)
  // const [vibrato, setVibrato] = useState({
  //   amount: 0,
  //   rate: 5

  // })
  

  // function handle_voice1_osc(e) {
  //   setState((prev) => ({...prev, [voice0.oscillator.type]: e.target.value}))
  // }
  // function handle_voice1_env(e, name) {
  //   setVoice1({
  //     ...voice1,
  //     envelope: {
  //       ...voice1.envelope,
  //       [name]: e
  //     }
  //   })
  // }
  // function handle_voice1_vol_port(e, name) {
  //   setVoice1({
  //     ...voice1,
  //     [name]: e
  //   })
  // }
  // function handle_voice2_vol_port(e, name) {
  //   setVoice2({
  //     ...voice2,
  //     [name]: e
  //   })
  // }
  // function handle_voice2_env(e, name) {
  //   setVoice2({
  //     ...voice2,
  //     envelope: {
  //       ...voice2.envelope,
  //       [name]: e
  //     }
  //   })
  // }
  // function handle_voice2_osc(e) {
  //   if (e.target.value === "OCS 2") {
  //     setVoice2({
  //       ...voice2,
  //       oscillator: {
  //         type: ""
  //       }
  //     })
  //   }else {
  //     setVoice2({
  //       ...voice2,
  //       oscillator: {
  //         type: e.target.value
  //       }
  //     })
  //   }
  // }
  // function handle_harm_change(e) {
  //   setHarmonicity(e)
  // }
  // function handle_vibrato(e, name) {
  //   setVibrato({
  //     ...vibrato,
  //     [name]: e
  //   })
  // }
  
  
  

  

  useEffect(() => {
    fetch("/current-user")
    .then((r) => {
      if(r.ok){
        r.json().then((data) => {
          setCurrentUser(data)
          setLoggedIn(true)
        })
      }else {
        r.text().then(error => {
            throw new Error(error)
        })
    }
    })
  },[])


  const providerValue = useMemo(() => ({
    loggedIn, setLoggedIn,
    currentUser, setCurrentUser
  }), [loggedIn, currentUser])

  // const synthProvider = useMemo(() => ({
  //   synth,
  //   handle_osc_change,
  //   // handle_vibrato,
  //   // handle_harm_change,
  //   handle_voice2_osc,
  //   handle_voice2_env,
  //   handle_voice2_vol_port,
  //   handle_voice1_vol_port,
  //   handle_voice1_env,
  //   handle_voice1_osc,
  //   setSynthChange,
  //   synthChange,
  //   // setHarmonicity,
  //   // setVibrato

  // }), [synth])

  return (
    
    <BrowserRouter>
    <div className="App">
      <UserContext.Provider
      value={providerValue}
      >
      <SynthProvider

      >
        <NavBar />
        <Switch>
        <Route path="/my-profile">
            <UserProfile />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path={"/login"}>
            <Login/> 
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        </SynthProvider>
      </UserContext.Provider>
    </div>
    </BrowserRouter>
  );
}

export default App;
