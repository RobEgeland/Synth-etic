import './App.css';
import SignUp from './components/SignUp';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Login from './components/Login';
import Explore from './components/Explore';
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
  const [sounds, setSounds] = useState([])
  

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

  useEffect(() => {
    fetch('/sounds')
    .then(r => r.json())
    .then(data => setSounds(data))
  }, [])


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
            <UserProfile sounds={sounds} setSounds={setSounds} />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path={"/login"}>
            <Login/> 
          </Route>
          <Route path="/explore">
            <Explore sounds={sounds}/>
          </Route>
          <Route path={"/how-to"}>
            <HowTo />
          </Route>
          {/* <Route path={["/", "/:id"]}>
            <Home />
          </Route> */}
            {["/", "/:id"].map(path => <Route path={path}><Home sounds={sounds} setSounds={setSounds}/></Route>)}
        </Switch>
        </SynthProvider>
      </UserContext.Provider>
    </div>
    </BrowserRouter>
  );
}

export default App;
