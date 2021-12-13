import React from "react";
import { useState } from "react";
import TransactionAlert from "./TransactionAlert";
import { Fade, Modal, Backdrop, Box } from "@material-ui/core";

const ClientTransfer = (props) => {
  const [amount, setAmount] = useState(0);
  const [alert, setAlert] = useState("");
  const [animationDelay, setAnimationDelay] = useState("");
  const [receipientAccountNumber, setReceipientAccountNumber] = useState("");
  const [confirmationModal, setConfirmationModal] = useState('');
  let senderAccount = JSON.parse(localStorage.getItem(props.accountNumber));
  const [severity, setSeverity] = useState("");

  let receiverAccount = JSON.parse(
    localStorage.getItem(receipientAccountNumber)
  );

  const [receiverName, setReceiverName] = useState("");

  function addZeroes(num) {
    return Number(num).toFixed(2)
  }

  const alertHandler = () => {
    let message = "";
    if (severity === "error") {
      senderAccount.balance < amount
        ? (message = "Sorry, you got insufficient funds for your request")
        : senderAccount.balance === 0
          ? (message = "Please enter a valid amount")
          : (message = "The account number you entered is invalid");
    } else message = "Your funds have been transferred";
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

  const handleTransfer = () => {
    senderAccount.balance =
      parseFloat(senderAccount.balance) - parseFloat(amount);
    receiverAccount.balance =
      parseFloat(receiverAccount.balance) + parseFloat(amount);

    localStorage.setItem(props.accountNumber, JSON.stringify(senderAccount));
    localStorage.setItem(
      receipientAccountNumber,
      JSON.stringify(receiverAccount)
    );
    !props.refreshCheck ? props.refresher(true) : props.refresher(false);
    setConfirmationModal(false)
    setAlert(true);
    setAnimationDelay(true);
    setSeverity("success");
    saveToTransactionHistory();
    setReceipientAccountNumber();
    setAmount(0)
  };

  const handleDisplayName = () => {
    if (senderAccount.balance > amount && receiverAccount !== null && senderAccount.id !== receiverAccount.id) {
      setReceiverName(receiverAccount.name);
      setConfirmationModal(true)
    }
    else {
      setSeverity("error");
      setAlert(true);
      setAnimationDelay(true);
    }
  };

  const saveToTransactionHistory = () => {
    let receiverAccount = JSON.parse(
      localStorage.getItem(receipientAccountNumber)
    );
    let d = new Date();
    let date = d.getDate();
    let month = d.getMonth() + 1;
    let dateToBeSaved = `${month}/${date}`;
    let transactions = senderAccount.transactions;
    transactions.push({
      title: "Transfer",
      date: dateToBeSaved,
      amount: `-${addZeroes(Number(amount))}`,
    });
    localStorage.setItem(senderAccount.id, JSON.stringify(senderAccount));
    transactions = receiverAccount.transactions;
    transactions.push({
      title: "Transfer",
      date: dateToBeSaved,
      amount: `+${addZeroes(Number(amount))}`,
    });
    localStorage.setItem(receiverAccount.id, JSON.stringify(receiverAccount));
  };



  return (
    <>
      {alert ? alertHandler() : <></>}
      <div
        className="modal fade"
        id="clientTransferModal"
        tabindex="-1"
        aria-labelledby="clientTransferModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="clientTransferModalLabel">
                Transfer
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <label htmlFor="receipient" className="form-label">
                Receipient
              </label>
              <input
                className="form-control"
                id="receipient"
                placeholder="Enter Acount Number Here"
                value={receipientAccountNumber}
                onChange={(e) => setReceipientAccountNumber(e.target.value)}
                required
              />

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
                onClick={handleDisplayName}
                className="btn btn-danger"
                data-bs-dismiss="modal"
                data-bs-target="#confirmTransferModal"
                data-bs-toggle="modal"
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
                  <h5 className="modal-title" id="confirmTransferModalLabel">
                    Transaction Details
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={()=>setConfirmationModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <h3 className="m-0 pl-2 pt-2">Receipient</h3>
                  <p className="lbl-1 mb-0">
                    Account Name: <span className="lbl-2">{receiverName}</span>
                  </p>
                  <p className="lbl-1">
                    Account Number:
                    <span className="lbl-2"> {receipientAccountNumber}</span>
                  </p>

                  <p className="lbl-1 border-top pt-3 mb-0">
                    Transfer Amount: <span className="lbl-2">&#x20B1;{amount}</span>
                  </p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-bs-dismiss="modal"
                    onClick={handleTransfer}
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

export default ClientTransfer;
