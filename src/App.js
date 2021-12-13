import LoginPage from "./components/LoginPage.js";
import Admin from "./components/Admin.js";
import HomePage from "./components/HomePage";
import NotFound from "./components/NotFound";
import Unauthorized from "./components/Unauthorized"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";


window.localStorage.setItem(
  "00",
  JSON.stringify({ email: "admin@gmail.com", password: "admin", isAdmin: true, isLoggedIn: false })
);

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/home" component={HomePage} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/unauthorized" component={Unauthorized}/>
          <Route component={NotFound}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
