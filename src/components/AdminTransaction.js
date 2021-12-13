import React from "react";
import Deposit from "./Deposit";
import Transfer from "./Transfer";
import Withdraw from "./Withdraw";

const AdminTransaction = () => {
  return (


    <div class="modal fade" id="adminTransactionModal" tabindex="-1">

      <div class="close-modal">
        <button type="button" class="btn btn-danger btn-circle" data-bs-dismiss="modal" arial-label="Close"><i class="btn-close" aria-label="Close"></i></button>
      </div>
      <div class="modal-dialog modal-xl">
        <div class="modal-content container bg-transparent border-0">
          <div className="row">
            <Withdraw />
            <Deposit />
            <Transfer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTransaction;
