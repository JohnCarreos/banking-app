import React, { useState } from "react";
import { useEffect } from "react";
const GambleModal = (props) => {
  const [randomNumber, setRandomNumber] = useState(0);
  const [toggle, setToggle] = useState(false);

  const [inputNum, setInputNum] = useState(0);

  useEffect(() => {
    let counter;
    if (toggle) {
      counter = setInterval(
        () => setRandomNumber(Math.floor(Math.random() * 2)),
        50
      );
    }
    return () => {
      clearInterval(counter);
    };
  }, [toggle]);

  const handleGenerateNumber = () => {
    setToggle(true);
    setTimeout(() => {
      setToggle(false);
    }, 5000);

    if (inputNum === randomNumber) {
      console.log(randomNumber, "you won");
    }
  };
  return (
    <>
      <div
        class="modal fade"
        id="gamble"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="gambleLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header p-3 pt-0 pb-0">
              <h5 class="modal-title " id="gambleLabel">
                <span style={{ fontSize: "2.5rem" }}>&#x2660;</span>INSTACASH
              </h5>

              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <p>{randomNumber}</p>
              <input
                type="number"
                id="inputNum"
                placeholder="Enter Amount Here"
                value={inputNum}
                onChange={(e) => setInputNum(e.target.value)}
              />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={handleGenerateNumber}
              >
                Start game
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GambleModal;
