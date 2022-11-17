import logo from './logo.svg';
import './App.css';
import SignUp from './components/SignUp';
import NavBar from './components/NavBar';
import {useState, useEffect} from "react"
import {BrowserRouter, Route, Switch} from "react-router-dom"

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    fetch("/hello")
    .then((r) => r.json())
    .then((data) => setCount(data.count))
  },[])
  return (
    
    <BrowserRouter>
    <div className="App">
      <NavBar />
      <Switch>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/">
          <h1>Page Count: {count}</h1>
        </Route>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
