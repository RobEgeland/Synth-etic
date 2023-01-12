import './App.css';
import SignUp from './components/SignUp';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Login from './components/Login';
import TestKnob2 from './components/TestKnob2';
import UserProfile from './components/UserProfile';
import HowTo from './components/HowTo';
import {useState, useEffect, useMemo, useRef} from "react"
import {BrowserRouter, Route, Switch} from "react-router-dom"
import { UserContext } from './context/UserContext';
import { SynthProvider, useTrackedState } from './context/SynthSetupContext';
import * as Tone from 'tone'


function App() {
  const [currentUser, setCurrentUser] = useState()
  const [loggedIn, setLoggedIn] = useState(false)

 
  
  const [synthSaveObj, setSynthSaveObj] =useState({
      harmonicity: 0.1,
      vibratoAmount: 0.1,
      vibratoRate: 4.5,
      voice0: {
          oscillator: {
              type: "sine"
          },
          volume: -5,
          portamento: 0.1,
          envelope: {
              attack:0.1,
              decay: 0.1,
              sustain: 0.1,
              release: 0.1
          }
      },
      voice1: {
        volume: -5,
        portamento: 1,
        oscillator: {
          type: "sine" 
        },
        envelope: {
            attack: 0.1,
            decay: 0.1,
            sustain: 0.1,
            release: 0.1
        }
      }
    })

    function setOsc(e) {
      setSynthSaveObj({
        ...synthSaveObj,
        [synthSaveObj.voice0.oscillator.type]: e.target.value
      })

    }

    useEffect(() => {
      // localStorage.setItem("synthSave", JSON.stringify(synthSaveObj))
      console.log(synthSaveObj)
    }, [synthSaveObj])


  

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
          <Route path={"/how-to"}>
            <HowTo />
          </Route>
          <Route path="/">
            <Home setOsc={setOsc} />
          </Route>
        </Switch>
        </SynthProvider>
      </UserContext.Provider>
    </div>
    </BrowserRouter>
  );
}

export default App;
