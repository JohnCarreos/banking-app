import { useState } from "react";
import Alert from "@material-ui/lab/Alert";
import { Fade, Modal, Backdrop, Box } from "@material-ui/core";
import TransactionAlert from "./TransactionAlert";

const Withdraw = ({updateTable}) => {
  const [alert, setAlert] = useState("");
  const [animationDelay, setAnimationDelay] = useState("");
  const [accountName, setAccountName] = useState("");
  const [severity, setSeverity] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState(0);
  const [confirmationModal, setConfirmationModal] = useState('');
  let account = JSON.parse(localStorage.getItem(accountNumber));

  const saveToTransactionHistory = () => {
    let d = new Date();
    let date = d.getDate();
    let month = d.getMonth() + 1;
    let dateToBeSaved = `${month}/${date}`;
    let transactions = account.transactions;
    transactions.push({
      title: "Withdraw",
      date: dateToBeSaved,
      amount: `-${amount}`,
    });
    localStorage.setItem(account.id, JSON.stringify(account));
  };

  const alertHandler = () => {
    let message = ''
    if (severity === 'error') {
      !account ? message = "The account number you have entered is invalid" : account.balance > amount || amount === 0 ? message = "Please enter a valid amount" : message = "Sorry, you got insufficient funds for your request"
    }
    else { message = "You have withdrawn successfully!" }
    setTimeout(() => { setAnimationDelay(false); setTimeout(() => { setAlert(false) }, 500) }, 5000)
    return <TransactionAlert aDelay={animationDelay} sAnimationDelay={setAnimationDelay} sAlert={setAlert} message={message} severity={severity} />
  }

  const handleWithdraw = () => {
    account.balance -= amount;
    localStorage.setItem(accountNumber, JSON.stringify(account));
    setConfirmationModal(false)
    saveToTransactionHistory();
    setAccountNumber('')
    setAmount('')
    updateTable()
    setSeverity("success")
    setAlert(true);
    setAnimationDelay(true);
  };
  const handleDisplayName = () => {
    if (account !== null && account.balance > amount && amount !== 0) {
      setAccountName(account.name);
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
        id="withdrawModal"
        tabindex="-1"
        aria-labelledby="withdrawModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="withdrawModalLabel">
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
              <div className="col-xl p-2">
                <div className="mb-3">
                  <label htmlFor="accountNumber" className="form-label">
                    Account Number
                  </label>
                  <input
                    className="form-control"
                    id="accountNumber"
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    placeholder=" Enter Account Number Here"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="amount" className="form-label">
                    Amount
                  </label>
                  <input
                    className="form-control"
                    id="amount"
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    placeholder=" Enter Amount Here"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={handleDisplayName}
              >
                Withdraw
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
                    <h5 className="modal-title" id="confirmWithdrawModalLabel">
                      Transaction Details
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => { setConfirmationModal(false) }}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <p className="lbl-1">
                      Account Name: <span className="lbl-2">{accountName}</span>
                    </p>
                    <p className="lbl-1">
                      Account Number: <span className="lbl-2">{accountNumber}</span>
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
                    >
                      CONFIRM
                    </button>
                  </div>
                </div>
              </div>
          </Box>
        </Fade>
      </Modal>
      {/* <div
        className="modal fade"
        id="confirmWithdrawModal"
        tabindex="-1"
        aria-labelledby="confirmWithdrawModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="confirmWithdrawModalLabel">
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
              <p className="lbl-1">
                Account Name: <span className="lbl-2">{accountName}</span>
              </p>
              <p className="lbl-1">
                Account Number: <span className="lbl-2">{accountNumber}</span>
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
              >
                CONFIRM
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Withdraw;

// <div
// className="modal fade"
// id="withdrawModal"
// tabindex="-1"
// aria-labelledby="withdrawModalLabel"
// aria-hidden="true"
// >
// <div className="modal-dialog modal-dialog-centered">
//   <div className="modal-content">
//     <div className="modal-header">
//       <h5 className="modal-title" id="withdrawModalLabel">
//         Withdraw
//       </h5>
//       <button
//         type="button"
//         class="btn-close"
//         data-bs-dismiss="modal"
//         aria-label="Close"
//       ></button>
//     </div>
//     <div className="modal-body">

//       </div>
//     </div>
//     <div className="modal-footer">
//       <button
//         type="button"
//         className="btn btn-success"
//         onClick={handleWithdraw}
//       >
//         Withdraw
//       </button>
//     </div>
//   </div>
// </div>
