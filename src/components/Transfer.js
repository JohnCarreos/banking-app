import React from "react";
import { useState } from "react";
import TransactionAlert from "./TransactionAlert";
import Alert from "@material-ui/lab/Alert";
import { Fade, Modal, Backdrop, Box } from "@material-ui/core";

const Transfer = ({ updateTable }) => {
  const [alert, setAlert] = useState("");
  const [animationDelay, setAnimationDelay] = useState("");
  const [severity, setSeverity] = useState("");
  const [senderAccountNumber, setSenderAccountNumber] = useState("");
  const [receiverAccountNumber, setReceiverAccountNumber] = useState("");
  const [confirmationModal, setConfirmationModal] = useState('');
  let senderAccount = JSON.parse(localStorage.getItem(senderAccountNumber));
  let receiverAccount = JSON.parse(localStorage.getItem(receiverAccountNumber));

  const [senderName, setSenderName] = useState("");
  const [receiverName, setReceiverName] = useState("");

  const [amount, setAmount] = useState(0);

  const saveToTransactionHistory = () => {
    
    let d = new Date();
    let date = d.getDate();
    let month = d.getMonth() + 1;
    let dateToBeSaved = `${month}/${date}`;
    let transactions = senderAccount.transactions;
    transactions.push({
      title: "Transfer",
      date: dateToBeSaved,
      amount: `-${amount}`,
    });
    localStorage.setItem(senderAccount.id, JSON.stringify(senderAccount));
    transactions = receiverAccount.transactions;
    transactions.push({
      title: "Transfer",
      date: dateToBeSaved,
      amount: `+${amount}`,
    });
    localStorage.setItem(receiverAccount.id, JSON.stringify(receiverAccount));
  };

  const alertHandler = () => {
    let message = ''
    if (severity === 'error') {
      !senderAccount || !receiverAccount ? message = "The account number you have entered is invalid" : senderAccount.balance > amount || receiverAccount.balance > amount || amount === 0 ? message = "Please enter a valid amount" : message = "Sorry, you got insufficient funds for your request"
    }
    else { message = "You have transferred successfully!" }
    setTimeout(() => { setAnimationDelay(false); setTimeout(() => { setAlert(false) }, 500) }, 5000)
    return <TransactionAlert aDelay={animationDelay} sAnimationDelay={setAnimationDelay} sAlert={setAlert} message={message} severity={severity} />
  }

  const handleTransfer = () => {
    senderAccount.balance =
      parseFloat(senderAccount.balance) - parseFloat(amount);
    receiverAccount.balance =
      parseFloat(receiverAccount.balance) + parseFloat(amount);

    localStorage.setItem(senderAccountNumber, JSON.stringify(senderAccount));
    localStorage.setItem(
      receiverAccountNumber,
      JSON.stringify(receiverAccount)
    );
    setReceiverAccountNumber('')
    setSenderAccountNumber('')
    setAmount('')
    saveToTransactionHistory();
    updateTable()
    setConfirmationModal(false)
    setSeverity("success")
    setAlert(true);
    setAnimationDelay(true);
  };

  const handleDisplayName = () => {
    if (senderAccount !== null && senderAccount.balance > amount && amount > 0 && senderAccount !== receiverAccount) {
      setReceiverName(receiverAccount.name);
      setSenderName(senderAccount.name);
      setConfirmationModal(true)
    }
    else {
      setSeverity("error")
      setAlert(true);
      setAnimationDelay(true);
    }

  };
  return (
    <>
      {alert ? alertHandler() : <></>}
      <div
        className="modal fade"
        id="transferModal"
        tabindex="-1"
        aria-labelledby="transferModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered ">
          <div className="modal-content ">
            <div className="modal-header">
              <h5 className="modal-title" id="transferModalLabel">
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
              <div className="col-xl p-2">
                <h3 className="m-0 pl-2">Sender</h3>
                <div className="mb-3">
                  <label className="form-label">Account Number</label>
                  <input
                    className="form-control"
                    type="text"
                    onWheel={(e) => e.target.blur()}
                    placeholder=" Enter Account Number Here"
                    value={senderAccountNumber}
                    onChange={(e) => setSenderAccountNumber(e.target.value)}
                  />
                </div>
                <h3 className="m-0 pl-2">Receiver</h3>
                <div className="mb-3">
                  <label className="form-label">Account Number</label>
                  <input
                    className="form-control"
                    type="text"
                    onWheel={(e) => e.target.blur()}
                    placeholder=" Enter Account Number Here"
                    value={receiverAccountNumber}
                    onChange={(e) => setReceiverAccountNumber(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <h3>Amount</h3>
                  <input
                    className="form-control"
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    placeholder=" Enter Amount Here"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                  onClick={handleDisplayName}
                >
                  Transfer
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal fade"
          id="confirmTransferModal"
          tabindex="-1"
          aria-labelledby="confirmTransferModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="confirmTransferModalLabel">
                  Transaction Details
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <h3 className="m-0 pl-2">Sender</h3>
                <p className="lbl-1 mb-0">
                  Account Name: <span className="lbl-2"> {senderName}</span>
                </p>
                <p className="lbl-1">
                  Account Number:
                  <span className="lbl-2"> {senderAccountNumber}</span>
                </p>

                <h3 className="m-0 pl-2 pt-2 border-top">Receipient</h3>
                <p className="lbl-1 mb-0">
                  Account Name: <span className="lbl-2">{receiverName}</span>
                </p>
                <p className="lbl-1">
                  Account Number:
                  <span className="lbl-2"> {receiverAccountNumber}</span>
                </p>

                <p className="lbl-1 border-top pt-3 mb-0">
                  Transfer Amount:{" "}
                  <span className="lbl-2">&#x20B1;{amount}</span>
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                  onClick={handleTransfer}
                >
                  Confirm
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
                      onClick={() => { setConfirmationModal(false) }}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <h3 className="m-0 pl-2">Sender</h3>
                    <p className="lbl-1 mb-0">
                      Account Name: <span className="lbl-2"> {senderName}</span>
                    </p>
                    <p className="lbl-1">
                      Account Number:
                      <span className="lbl-2"> {senderAccountNumber}</span>
                    </p>

                    <h3 className="m-0 pl-2 pt-2 border-top">Receipient</h3>
                    <p className="lbl-1 mb-0">
                      Account Name: <span className="lbl-2">{receiverName}</span>
                    </p>
                    <p className="lbl-1">
                      Account Number:
                      <span className="lbl-2"> {receiverAccountNumber}</span>
                    </p>

                    <p className="lbl-1 border-top pt-3 mb-0">
                      Transfer Amount: <span className="lbl-2">&#x20B1;{amount}</span>
                    </p>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-danger"
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

      </div>
    </>
  );
};

export default Transfer;
