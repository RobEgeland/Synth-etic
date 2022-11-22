import logo from './logo.svg';
import './App.css';
import SignUp from './components/SignUp';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Login from './components/Login';
import {useState, useEffect} from "react"
import {BrowserRouter, Route, Switch} from "react-router-dom"


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



  return (
    
    <BrowserRouter>
    <div className="App">
      <NavBar />
      <Switch>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path={"/login"}>
          <Login />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
