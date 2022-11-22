import logo from './logo.svg';
import './App.css';
import SignUp from './components/SignUp';
import NavBar from './components/NavBar';
import Home from './components/Home';
import {useState, useEffect} from "react"
import {BrowserRouter, Route, Switch} from "react-router-dom"


function App() {



  return (
    
    <BrowserRouter>
    <div className="App">
      <NavBar />
      <Switch>
        <Route path="/signup">
          <SignUp />
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
