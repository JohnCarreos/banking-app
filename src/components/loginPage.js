import { useState } from "react";
import { useHistory } from "react-router-dom";
import loginImage from "../loginImage.svg"
import TransactionAlert from "./TransactionAlert";
import Logo from "./Logo";

const LoginPage = () => {
  const [alert, setAlert] = useState("");
  const [animationDelay, setAnimationDelay] = useState("");
  let history = useHistory();
  // Handles Login
  const handleLogin = () => {
    try {
      for (let key in localStorage) {
        let verify = JSON.parse(localStorage.getItem(key));
        console.log(verify.email === email);
        if (verify.email === email) {
          if (verify.password === password) {
            if (verify.isAdmin) {
              verify.isLoggedIn = true;
              localStorage.setItem(key,JSON.stringify(verify))
              history.push({ pathname: "/admin", state: { verify } });
              console.log("An admin logged in!");
              break;
            } else {
              history.push({ pathname: "/home", state: { verify } });
              console.log("Logged in!");
              break;
            }
          }
        }
      }
    } catch {
      setAlert(true);
      setAnimationDelay(true);
    }
  };

  //

  // This is where the user's input from the form is saved
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //

  return (
    <div className="vh-100">
      {alert? <TransactionAlert
        aDelay={animationDelay}
        sAnimationDelay={setAnimationDelay}
        sAlert={setAlert}
        message="Incorrect email or password"
        severity="error"
      /> :<></>}
      <Logo/>
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-log-7 col-xl-7 text-center">
            <img src={loginImage} alt="login" className="loginImage"/>
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5">
            <div className="card shadow">
            <div className="card-body">
            <form onSubmit={handleLogin}>
              <div className="form-floating mb-4">
                <input
                  type="email"
                  id="emailInput"
                  className="form-control form-control-lg"
                  placeholder="Enter your email here!"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label className="form-label" htmlFor="emailInput">
                  Email address
                </label>
              </div>
              <div className="form-floating mb-4">
                <input
                  type="password"
                  id="passwordInput"
                  className="form-control form-control-lg"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label className="form-label" htmlFor="passwordInput">
                  Password
                </label>
              </div>
              <button type="submit" className="btn login btn-danger">
                LOG IN
              </button>
            </form>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
