import './App.css';
import SignUp from './components/SignUp';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Login from './components/Login';
import TestKnob2 from './components/TestKnob2';
import UserProfile from './components/UserProfile';
import {useState, useEffect, useMemo} from "react"
import {BrowserRouter, Route, Switch} from "react-router-dom"
import { UserContext } from './context/UserContext';


function App() {
  const [currentUser, setCurrentUser] = useState()
  const [loggedIn, setLoggedIn] = useState(false)

  

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
            <TestKnob2 />
          </Route>
        </Switch>
      </UserContext.Provider>
    </div>
    </BrowserRouter>
  );
}

export default App;
