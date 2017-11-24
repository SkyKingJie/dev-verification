"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require("./css.css");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
 * 验证码组件
 * Created by zhangjie11 on 2017/11/23.
 */


var Verification = function (_React$Component) {
		_inherits(Verification, _React$Component);

		function Verification() {
			_classCallCheck(this, Verification);

			var _this = _possibleConstructorReturn(this, (Verification.__proto__ || Object.getPrototypeOf(Verification)).call(this));

			_this.state = {
				countdownNum: 0,
				countdownIng: false
			};
			return _this;
		}

		_createClass(Verification, [{
			key: "componentWillUnmount",
			value: function componentWillUnmount() {
				this.timeoutFlag && clearTimeout(this.timeoutFlag);
			}

			/**
			 * onchange验证手机号
			 */

		}, {
			key: "checkPhoneNum",
			value: function checkPhoneNum() {
				var countdownIng = this.state.countdownIng;

				if (countdownIng) return;

				var againButtonDom = this.refs.againButton;
				var phoneNumStatus = this.checkPhoneNumFunc();
				var originKlass = "veri_again_button";

				if (phoneNumStatus) {
					againButtonDom.className = originKlass;
				} else {
					againButtonDom.className = originKlass + " error_phone_num";
				}
			}

			/**
			 * 判断手机号是否合法
			 * @returns {boolean}
			 */

		}, {
			key: "checkPhoneNumFunc",
			value: function checkPhoneNumFunc() {
				var codeInputDom = this.refs.codeInput;
				var value = codeInputDom.value.trim();

				if (/^1\d{10}$/.test(value)) {
					return true;
				} else {
					return false;
				}
			}

			/**
			 * 验证码点击事件处理函数
			 */

		}, {
			key: "handleClick",
			value: function handleClick() {
				var _this2 = this;

				//是否正在进行倒计时
				var countdownIng = this.state.countdownIng;

				if (countdownIng || !this.checkPhoneNumFunc()) return;

				var _props$countFromProps = this.props.countFromProps,
					countFromProps = _props$countFromProps === undefined ? 60 : _props$countFromProps;

				/**
				 * 倒计时
				 */

				var countdown = function countdown() {
					if (countFromProps < 0) {
						_this2.setState({
							countdownNum: undefined,
							countdownIng: false
						});

						return;
					} else {
						_this2.setState({
							countdownNum: "" + countFromProps,
							countdownIng: true
						});

						countFromProps--;
					}

					_this2.timeoutFlag = setTimeout(countdown, 1000);
				};

				countdown();

				this.sendVerificationCode().then(function (result) {
					var code = result.code;


					if (code != "0") {
						_this2.setState({
							countdownNum: undefined,
							countdownIng: false
						});

						_this2.timeoutFlag && clearTimeout(_this2.timeoutFlag);

						alert("验证码发送失败");
					}
				});
			}
		}, {
			key: "render",
			value: function render() {
				var _props$buttonName = this.props.buttonName,
					buttonName = _props$buttonName === undefined ? "60s" : _props$buttonName;
				var _state = this.state,
					countdownNum = _state.countdownNum,
					countdownIng = _state.countdownIng;

				var againButtonText = "获取验证码";
				var buttonklass = "veri_again_button";

				if (countdownIng) {
					againButtonText = buttonName.replace(/\d+s/, countdownNum + "s");
					buttonklass = buttonklass + " countdown_ing";
				}

				return React.createElement(
					"div",
					{ className: "veri_container" },
					React.createElement(
						"div",
						null,
						React.createElement("input", { type: "value", className: "veri_code_input", ref: "codeInput", onChange: this.checkPhoneNum.bind(this) }),
						React.createElement(
							"span",
							{ className: buttonklass, ref: "againButton", onClick: this.handleClick.bind(this) },
							againButtonText
						)
					)
				);
			}

			/**
			 * 请求接口
			 */

		}, {
			key: "sendVerificationCode",
			value: function sendVerificationCode() {
				var randomCodes = ["0", "1"];

				return new Promise(function (resolve, reject) {
					setTimeout(function () {
						resolve({
							code: randomCodes[Math.floor(Math.random() * randomCodes.length)]
						});
					}, 500);
				});
			}
		}]);

		return Verification;
	}(React.Component);

exports.default = Verification;
