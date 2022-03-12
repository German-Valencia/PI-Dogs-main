import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Landing from "./components/Landing/Landing.jsx";
import Home from "./components/Home/Home.jsx";
import Detail from "./components/Detail/Detail";
import About from "./components/About/About";
import DogCreate from "./components/DogCreate/DogCreate";
import Error404 from "./components/Error404/Error404";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/create" component={DogCreate} />
          <Route exact path="/about" component={About} />
          <Route exact path="/dogs/:id" component={Detail} />
          <Route path="*" component={Error404} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
