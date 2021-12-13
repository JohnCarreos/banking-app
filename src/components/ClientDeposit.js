import React, { Component } from "react";
import { useState } from "react";
import TransactionAlert from "./TransactionAlert";
import { Fade, Modal, Backdrop, Box } from "@material-ui/core";

const ClientDeposit = (props) => {
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
      title: "Deposit",
      date: dateToBeSaved,
      amount: `+${addZeroes(Number(amount))}`,
    });
    localStorage.setItem(account.id, JSON.stringify(account));
  };

  const alertHandler = () => {
    let errorMessage = "";
    if (severity === "error") {
      errorMessage = "Please enter a valid amount";
    } else {
      errorMessage = "Your funds have been deposited!";
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
        message={errorMessage}
        severity={severity}
      />
    );
  };

  const toConfirmation = () => {
    if (amount > 0) {
      setConfirmationModal(true)
    }
    else {
      setSeverity("error");
      setAlert(true);
      setAnimationDelay(true);
    }
  }

  const handleDeposit = () => {
      account.balance = parseFloat(account.balance) + parseFloat(amount);
      localStorage.setItem(props.accountNumber, JSON.stringify(account));
      !props.refreshCheck ? props.refresher(true) : props.refresher(false);
      saveToTransactionHistory();
      setConfirmationModal(false)
      setAlert(true);
      setAnimationDelay(true);
      setSeverity("success");
      setAmount(0)
  };

  return (
    <>
      {alert ? alertHandler() : <></>}
      <div
        className="modal fade"
        id="clientDepositModal"
        tabindex="-1"
        aria-labelledby="clientDepositModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="clientDepositModalLabel">
                Deposit
              </h5>
              <button
                type="button"
                className="btn-close"
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
                onClick={toConfirmation}
                className="btn btn-danger"
                data-bs-dismiss="modal"
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
                  <h5 className="modal-title" id="confirmClientDepositModalLabel">
                    Transaction Details
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={()=>{setConfirmationModal(false)}}
                    data-bs-dismiss="modal"
                    aria-label="Close"
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
                    Deposit Amount: <span className="lbl-2">&#x20B1;{amount}</span>
                  </p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleDeposit}
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

export default ClientDeposit;
