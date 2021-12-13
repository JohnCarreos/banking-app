import { useLocation, useHistory } from "react-router-dom";
import { useState } from "react";
import Card from "./Card";
import ClientDeposit from "./ClientDeposit";
import ClientWithdraw from "./ClientWithdraw";
import ClientTransfer from "./ClientTransfer";
import TransactionHistory from "./TransactionHistory";
import Graph from "./Graph";
import GambleModal from "./GambleModal";
import { LocalAtm, Sync, AccountBalance, Timeline } from '@material-ui/icons'
import { LineChart, Line, Tooltip, Legend, XAxis, YAxis, CartesianGrid } from "recharts";

function HomePage() {

  const passedState = useLocation();
  const history = useHistory();
  const [graphModal, setGraphModal] = useState('')
  const [refresh, setRefresh] = useState(false);
  const { state } = passedState;
  try {
  const user = state.verify;
  const data = JSON.parse(localStorage.getItem(user.id))
  console.log(user);

  
  
    return (
      <div className="container">
        {/* modals */}
        <ClientWithdraw
          refreshCheck={refresh}
          refresher={setRefresh}
          key={user.id}
          balance={user.balance}
          accountNumber={user.id}
        />

        <ClientDeposit
          refreshCheck={refresh}
          refresher={setRefresh}
          key={user.id}
          balance={user.balance}
          accountNumber={user.id}
        />

        <ClientTransfer
          refreshCheck={refresh}
          refresher={setRefresh}
          key={user.id}
          balance={user.balance}
          accountNumber={user.id}
        />

        <GambleModal />

        <Graph open={graphModal} setOpen={setGraphModal} id={user.id} />
        <div className="row vh-100">
          <div className="col-lg-6 d-flex flex-column justify-content-center align-items-center">
            <div className="card shadow w-100 mt-1">
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <Card id={user.id} />
                <div className="buttons mt-4 d-flex flex-column justify-content-center align-items-center">
                  <div className="btn-group" role="group" aria-label="Nav">
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      data-bs-toggle="modal"
                      data-bs-target="#clientDepositModal"
                    >
                      <AccountBalance />
                      <br />
                      Deposit
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      data-bs-toggle="modal"
                      data-bs-target="#clientTransferModal"
                    >
                      <Sync />
                      <br />
                      Transfer
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      data-bs-toggle="modal"
                      data-bs-target="#clientWithdrawModal"
                      data-bs-dismiss="modal"
                    >
                      <LocalAtm />
                      <br />
                      Withdraw
                    </button>
                    <button type="button" class="btn btn-outline-danger gambleButton disabled" data-bs-toggle="modal" data-bs-target="#gamble"><i class="fas fa-dice"></i><br />Gamble</button>
                  </div>
                  <div class="btn-group mt-2 subButtons" role="group">
                    <button type="button" class="btn btn-outline-danger disabled" data-bs-toggle="modal" data-bs-target="#gamble" ><i class="fas fa-dice"></i><br />Gamble</button>
                    <button type="button" class="btn btn-outline-danger" onClick={() => setGraphModal(true)}><Timeline /><br />Graph</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="graph">
              <LineChart
                width={500}
                height={280}
                data={data.balanceHistory}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5
                }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" />
                <Line
                  dot={{ stroke: '#ff4d2e' }}
                  strokeWidth={6}
                  type="monotone"
                  dataKey="balance"
                  stroke="tomato"
                  activeDot={{ r: 8 }}
                />
                <Legend />
              </LineChart>
            </div>
          </div>


          <div className="col-lg-6">
            <TransactionHistory id={user.id} />
          </div>
        </div>
      </div>
    );
  }
  catch {
    history.push({pathname:"/unauthorized"})
    return null
  }
}

export default HomePage;
