import Logo from "./Logo";
import {useHistory} from "react-router-dom"

const Unauthorized = () => {
    const history = useHistory()
    return (
        <div>
            <div id="notfound">
            <Logo/>
            <div class="notfound">
                <div class="notfound-404">
                    <h3>Oops! Missing Permissions</h3>
                    <h1><span>4</span><span>0</span><span>1</span></h1>
                </div>
                <h2>Don't worry though, there is another way to go back home. </h2>
                <button className="btn btn-danger" type="button" onClick={()=>{history.push({pathname:"/"})}}>Go Back</button>
            </div>
        </div>
        </div>
    )
}

export default Unauthorized
