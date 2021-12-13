import Alert from '@material-ui/lab/Alert';
import { Fade } from '@material-ui/core';

const TransactionError = ({ aDelay, sAnimationDelay, sAlert, message, severity }) => {
  console.log(severity)
    return (
        <Fade in={aDelay === true}><Alert onClose={() => { sAnimationDelay(false); setTimeout(function () { sAlert(false) }, 500) }} variant="filled" severity={severity} className="position-fixed bottom-0 start-50 translate-middle z-top mt-5">
        {message}
      </Alert></Fade>
    )
}

export default TransactionError
