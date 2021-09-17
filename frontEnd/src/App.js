import "./App.css";
import Signupp from "./components/Signupp";
import PasswordReset from "./components/PasswordReset";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Welcome from "./components/Welcome";
import ChangePassword from "./components/ChangePassword";

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={() => <Signupp />} />
          <Route
            className="welcome"
            path="/welcome"
            render={() => <Welcome />}
          />
          <Route path="/passwordReset" render={() => <PasswordReset />} />
          <Route path="/changePassword" render={() => <ChangePassword />} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
