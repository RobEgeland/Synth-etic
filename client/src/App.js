import logo from './logo.svg';
import './App.css';
import SignUp from './components/SignUp';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Login from './components/Login';
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
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path={"/login"}>
            {loggedIn ? <Login/> : <h1>Loading</h1>}
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </UserContext.Provider>
    </div>
    </BrowserRouter>
  );
}

export default App;
