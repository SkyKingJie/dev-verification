/**
 * 验证码组件
 * Created by zhangjie11 on 2017/11/23.
 */
import "./css.css"

class Verification extends React.Component{
    constructor(){
        super();
        this.state = {
						countdownNum : 0,
						countdownIng : false
        }
		}

		componentWillUnmount(){
			this.timeoutFlag && clearTimeout(this.timeoutFlag);
		}
		
		/**
		 * onchange验证手机号
		 */
		checkPhoneNum(){
			let {countdownIng} = this.state;
			if(countdownIng)return;

			const againButtonDom = this.refs.againButton;
			let phoneNumStatus = this.checkPhoneNumFunc();
			let originKlass = "veri_again_button";

			if(phoneNumStatus){
				againButtonDom.className = originKlass
			}else{
				againButtonDom.className = `${originKlass} error_phone_num`
			}
		}

	/**
	 * 判断手机号是否合法
	 * @returns {boolean}
     */
		checkPhoneNumFunc(){
			const codeInputDom = this.refs.codeInput;
			var value = codeInputDom.value.trim();

			if(/^1\d{10}$/.test(value)){
				return true;
			}else{
				return false;
			}
		}


		/**
		 * 验证码点击事件处理函数
		 */
		handleClick(){
			//是否正在进行倒计时
			var {countdownIng} = this.state;
			if(countdownIng || !this.checkPhoneNumFunc())return;

			var {countFromProps = 60} = this.props;

			/**
			 * 倒计时
			 */
			var countdown = () => {
				if(countFromProps < 0){
					this.setState({
						countdownNum : undefined,
						countdownIng : false
					});

					return;
				}else{
					this.setState({
						countdownNum : `${countFromProps}`,
						countdownIng : true
					});

					countFromProps --;
				}

				this.timeoutFlag = setTimeout(countdown , 1000);
			}

			countdown();

			this.sendVerificationCode().then((result) => {
				const {code} = result;

				if(code != "0"){
					this.setState({
						countdownNum : undefined,
						countdownIng : false
					});

					this.timeoutFlag && clearTimeout(this.timeoutFlag);

					alert("验证码发送失败");
				}
			});
		}

    render(){
				let {buttonName = "60s"} = this.props;
				let {countdownNum , countdownIng} = this.state;
				let againButtonText = "获取验证码";
				let buttonklass = "veri_again_button";
				
				if(countdownIng){
					againButtonText = buttonName.replace(/\d+s/ , `${countdownNum}s`);
					buttonklass = `${buttonklass} countdown_ing`
				}

        return (
            <div className="veri_container">
                <div>
                    <input type="value" className="veri_code_input" ref="codeInput" onChange={this.checkPhoneNum.bind(this)}/>
                    <span className={buttonklass} ref="againButton" onClick={this.handleClick.bind(this)}>{againButtonText}</span>
                </div>
            </div>
        )
		}
		
		/**
		 * 请求接口
		 */
		sendVerificationCode(){
			var randomCodes = ["0" , "1"];

			return new Promise((resolve , reject) => {
				setTimeout(() => {
					resolve({
						code : randomCodes[Math.floor(Math.random() * randomCodes.length)]
					});
				}, 500)
			})
		}
}

export default Verification;
