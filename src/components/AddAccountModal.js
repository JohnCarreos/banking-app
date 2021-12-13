import { useState } from "react";
import TransactionAlert from "./TransactionAlert";

const AddAccountModal = ({ updateTable }) => {
  // Saves a new user to local storage

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [balance, setBalance] = useState("");
  const [name, setName] = useState("");
  const [alert, setAlert] = useState("");
  const [severity, setSeverity] = useState("");
  const [animationDelay, setAnimationDelay] = useState("");

  function addAccount() {
    let d = new Date();
    let date = d.getDate();
    let month = d.getMonth()+1;
    let currentDate = `${month}/${date}`;
    let id = (Math.floor(Math.random() * 9000000000) + 1000000000).toString();
    localStorage.setItem(
      id,
      JSON.stringify({
        id: id,
        email: email,
        password: password,
        isAdmin: false,
        balance: balance,
        name: name,
        transactions: [],
        balanceHistory: [{"name":currentDate, "balance":balance}],
      })
    );
    setEmail('')
    setPassword('')
    setBalance(0)
    setName('')
    updateTable()
    setSeverity("success");
    setAlert(true);
    setAnimationDelay(true);
  }
  //



  const alertHandler = () => {
    let errorMessage = "";
    errorMessage = "An account has been added!";
    setTimeout(() => {
      setAnimationDelay(false);
      setTimeout(() => {
        setAlert(false);
      }, 500);
    }, 5000);
    return (
      <TransactionAlert
        aDelay={animationDelay}
        sAnimationDelay={setAnimationDelay}
        sAlert={setAlert}
        message={errorMessage}
        severity={severity}
      />
    );
  };

  return (
    <>
      {alert ? alertHandler() : <></>}
      <div className="modal fade" tabIndex="-1" id="AddAccountModal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title display-2">Add Account</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={addAccount}>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    type="text"
                    placeholder="Name"
                    id="name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    type="email"
                    placeholder="Email"
                    id="email"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    type="password"
                    placeholder="Password"
                    id="password"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="initialBalance" className="form-label">
                    Initial Balance
                  </label>
                  <input
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                    className="form-control"
                    type="number"
                    placeholder="Initial Balance"
                    id="initialBalance"
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" onClick={addAccount} className="btn btn-danger"
                  data-bs-dismiss="modal"
                  aria-label="Close">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAccountModal;
