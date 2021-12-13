import AddAccountModal from "./AddAccountModal";
import { useState } from "react";
import AccountsTable from "./AccountsTable";
import Withdraw from "./Withdraw";
import Transfer from "./Transfer";
import Deposit from "./Deposit";
import { LocalAtm, Sync, AccountBalance } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import { useLocation, useHistory } from 'react-router-dom'
import Logo from "./Logo";

const Accounts = () => {

  const adminAccess = JSON.parse(localStorage.getItem('00'))
  const [allAccountsChecked, setAllAccountsChecked] = useState(false);
  let accounts = [];
  const [allAccounts, setAllAccounts] = useState(accounts);
  const history = useHistory()
  if (adminAccess.isLoggedIn) {

    const signOut = () => {
      adminAccess.isLoggedIn = false;
      localStorage.setItem('00',JSON.stringify(adminAccess))
      history.push({pathname:"/"})
    }


    if (!allAccountsChecked) {
      for (let i = 0; i < localStorage.length; i++) {
        let account = JSON.parse(localStorage.getItem(localStorage.key(i)));
        if (!account.isAdmin) accounts.push(account);
      }
      setAllAccountsChecked(true);
      setAllAccounts([...accounts]);
    }

    const updateTable = () => {
      setAllAccounts([...accounts]);
      setAllAccountsChecked(false);
      console.log("update");
    };

    return (
      <div className="container mt-3">
        <Logo />
        <AddAccountModal updateTable={updateTable} />
        <h2 className="text-center display-5">All Accounts</h2>
        <table className="table text-center">
          <thead>
            <tr>
              <th>Name</th>
              <th>Account Number</th>
              <th>Balance</th>
              <th className="deleteCol"></th>
            </tr>
          </thead>
          <AccountsTable allAccounts={allAccounts} updateTable={updateTable} />
        </table>
        <Withdraw updateTable={updateTable} />
        <Transfer updateTable={updateTable} />

        <div className="d-flex flex-column align-items-center">
          <div className="btn-group" role="group" aria-label="Nav">
            <button
              type="button"
              className="btn btn-outline-danger"
              data-bs-toggle="modal"
              data-bs-target="#depositModal"
            >
              <AccountBalance />
              <br />
              Deposit
            </button>
            <button
              type="button"
              className="btn btn-outline-danger"
              data-bs-toggle="modal"
              data-bs-target="#transferModal"
            >
              <Sync />
              <br />
              Transfer
            </button>
            <button
              type="button"
              className="btn btn-outline-danger"
              data-bs-toggle="modal"
              data-bs-target="#withdrawModal"
            >
              <LocalAtm />
              <br />
              Withdraw
            </button>
            <button
              type="button"
              className="btn btn-outline-danger"
              data-bs-toggle="modal"
              data-bs-target="#AddAccountModal"
            >
              <AddIcon />
              <br />
              Add Account
            </button>
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={signOut}
            >
              <i class="fas fa-sign-out-alt "></i>
              <br />
              Sign Out
            </button>
          </div>
        </div>

        <Deposit updateTable={updateTable} />
      </div>
    );
  }
  else {
    history.push({ pathname: "/unauthorized" })
    return null
  }
};

export default Accounts;
