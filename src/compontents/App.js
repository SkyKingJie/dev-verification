
/**
 * 顶层模板
 * 
 * @class App
 * @extends {React.Component}
 */


import Verification from "./verification/Verification";
import config from "../js/config"

class App extends React.Component{
    constructor(){
        super();
    }
    
    render(){
       return (
           <div>
                 <Verification countFromProps={config.countdownNum} buttonName={config.againText}/>

           </div>
       )
    }
}

export default App;
