import React from "react";
import { useState } from "react";
import TransactionAlert from "./TransactionAlert";
import { Fade, Modal, Backdrop, Box } from "@material-ui/core";

const ClientWithdraw = (props) => {
  const [amount, setAmount] = useState(0);
  const [alert, setAlert] = useState("");
  const [animationDelay, setAnimationDelay] = useState("");
  const [confirmationModal, setConfirmationModal] = useState('');

  let account = JSON.parse(localStorage.getItem(props.accountNumber));
  const [severity, setSeverity] = useState("");

  function addZeroes(num) {
    return Number(num).toFixed(2)
  }

  const saveToTransactionHistory = () => {
    let d = new Date();
    let date = d.getDate();
    let month = d.getMonth() + 1;
    let dateToBeSaved = `${month}/${date}`;
    let transactions = account.transactions;
    transactions.push({
      title: "Withdraw",
      date: dateToBeSaved,
      amount: `-${addZeroes(Number(amount))}`,
    });
    localStorage.setItem(account.id, JSON.stringify(account));
  };

  const alertHandler = () => {
    let message = "";
    if (severity === "error") {
      account.balance > amount
        ? (message = "Please enter a valid amount")
        : (message = "Sorry, you got insufficient funds for your request");
    } else {
      message = "You have withdrawn successfully!";
    }
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
        message={message}
        severity={severity}
      />
    );
  };

  const handleWithdraw = () => {
    account.balance = parseFloat(account.balance) - parseFloat(amount);
    localStorage.setItem(props.accountNumber, JSON.stringify(account));
    !props.refreshCheck ? props.refresher(true) : props.refresher(false);
    setConfirmationModal(false)
    setAlert(true);
    setAnimationDelay(true);
    setSeverity("success");
    saveToTransactionHistory();
    setAmount(0)
  };

  const toConfirmation = () => {
    if (account.balance > amount && amount > 0) {
      setConfirmationModal(true)
    }
    else {
      setSeverity("error");
      setAlert(true);
      setAnimationDelay(true);
    }
  }

  return (
    <>
      {alert ? alertHandler() : <></>}
      <div
        className="modal fade"
        id="clientWithdrawModal"
        tabindex="-1"
        aria-labelledby="clientWithdrawModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="clientWithdrawModalLabel">
                Withdraw
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <label htmlFor="amount" className="form-label">
                Amount
              </label>
              <input
                type="number"
                className="form-control"
                id="amount"
                placeholder="Enter Amount Here"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-danger"
                onClick={toConfirmation}
                data-bs-dismiss="modal"
                data-bs-target="#confirmClientWithdrawModal"
              >
                Enter
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={confirmationModal}
        onClose={() => { setConfirmationModal(false) }}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={confirmationModal}>
          <Box className="confirmationModal">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="confirmClientWithdrawModalLabel">
                    Transaction Details
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={()=>setConfirmationModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <p className="lbl-1">
                    Account Name: <span className="lbl-2">{account.name}</span>
                  </p>
                  <p className="lbl-1">
                    Account Number:{" "}
                    <span className="lbl-2">{props.accountNumber}</span>
                  </p>
                  <p className="lbl-1">
                    Withdraw Amount: <span className="lbl-2">&#x20B1;{amount}</span>
                  </p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleWithdraw}
                    data-bs-dismiss="modal"
                  >
                    CONFIRM
                  </button>
                </div>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>

    </>
  );
};

export default ClientWithdraw;
