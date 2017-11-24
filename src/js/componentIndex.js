
import "../css/reset"
import App from "../compontents/App"


/**
 * 初始化dom
 */
let initDom = ()=> {

    ReactDOM.render(
        <App/>,document.querySelector("#container")
    );
};

initDom();
