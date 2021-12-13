import Logo from "./Logo";

const NotFound = () => {
    return (
        <div id="notfound">
            <Logo/>
            <div class="notfound">
                <div class="notfound-404">
                    <h3>Oops! Page not found</h3>
                    <h1><span>4</span><span>0</span><span>4</span></h1>
                </div>
                <h2>we are sorry, but the page you requested was not found</h2>
                <button className="btn btn-danger" type="button" onClick={()=>{window.history.back();}}>Go Back</button>
            </div>
        </div>
    )
}

export default NotFound