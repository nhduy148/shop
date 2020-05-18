import React, { Component } from 'react';
import defAvatar from '../../../../assets/image/auth/default-avatar.jpg';
import closeBtn from '../../../../assets/image/product/close.png';
import { connect } from 'react-redux';
import { checkUsername, login, registerAccount, getUsername, getPopup } from '../../../redux/actions';
import Login from '../../AuthForm/Login';
import Register from '../../AuthForm/Register';


class UserAction extends Component{
	constructor(props){
		super(props);
		this.state = {
			username: null,
		}
	}

	getUsername = e => {
		this.setState({username: e.target.value});
	}

	handleCheckLogin = () => {
		let { username } = this.state;
		this.props.checkLogin(username);
	}

  render(){
		// check Username Props
		let { getUsernameError, getUsernameSuccess, getUsername, hasUsername } = this.props;
		// check Password Props
		let { loginSuccess, loginError } = this.props;

		// Action Animation Props
		let { closeForm, popupName } = this.props;

		let displayForm = !!popupName && ( popupName === 'login' || popupName === 'signup' ) ? true : false;
		// console.log(!!popupName);


		//Validate Register Props
		let { userError, emailError, phoneError, passError, passConfirmError } = this.props;

    return(
			<div className={`auth${displayForm  ? ' -active' : ''}`} onClick={ (e) => closeForm(e) } id="auth-form">
				<div className="wrap-login100 auth__box">
					<div className="auth__close" onClick={ (e) => closeForm(e) } id="close-auth">
						<img src={closeBtn} alt="Close"/>
					</div>
					<div className="auth__left">
						<div className="login100-pic js-tilt">
							{
								getUsername && getUsername.length > 0 && getUsername[0].user_image !== null
								?
									<img src={ getUsername[0].user_image } alt="avatar" />
								:
									<img src={ defAvatar } alt="avatar" />
							}
						</div>
						<div className="success">
						{/* <p dangerouslySetInnerHTML={{ __html: (getUsernameSuccess) }} /> */}
						<p>Hi {getUsernameSuccess ? getUsernameSuccess : 'Guest'} !</p>
						</div>
					</div>
					<div className="auth__right">
							<Login
								hasUsername = {hasUsername}
								getUsernameError = {getUsernameError}
								loginSuccess = {loginSuccess}
								loginError = {loginError}
								popupName = {popupName}
								checkLogin = {this.props.checkLogin}
								backToInputUser = {this.props.backToInputUser}
								handleCheckLogin = {this.handleCheckLogin}
								getUsername = {this.getUsername}
								loginHandle = {this.props.loginHandle}
							/>
							<Register
								popupName = {popupName}
								userError = {userError}
								emailError = {emailError}
								passError = {passError}
								passConfirmError = {passConfirmError}
								phoneError = {phoneError}
								registerHandle = {this.props.registerHandle}
							/>
          </div>
				</div>
			</div>
		)
  }
}

const mapStateToProps = state => ({
	popupName: state.popupName,

	//Login
	getUsername: state.getUsername,
	getUsernameSuccess: state.getUsernameSuccess,
	getUsernameError: state.getUsernameError,
	hasUsername: state.hasUsername,

	// Register
	userError: state.userError,
	emailError: state.emailError,
	passError: state.passError,
	passConfirmError: state.passConfirmError,
	phoneError: state.phoneError,

	//Login Status
	loginSuccess: state.loginSuccess,
	loginError: state.loginError
})

const mapDispatchToProps = dispatch => {
	return{
		closeForm: (e) => {
			let closeBtn = document.getElementById("close-auth")
			let form = document.getElementById("auth-form");
			let inputArr = form.querySelectorAll("input");

			if( e.target === e.currentTarget || e.currentTarget === closeBtn ) {
				inputArr.forEach( input => input.value = '' )
				dispatch( getPopup(null) )
			}
		},

		backToInputUser: e => {
			e.preventDefault();
			dispatch( getUsername() )
		},

		checkLogin: (username) => {
			dispatch( checkUsername( username ) );
		},

		loginHandle: e => {
			e.preventDefault();
			let target = e.target;
	
			let username = target.username.value;
			let password = target.password.value;

			dispatch( login( username, password ) );
		},

		registerHandle: e => {
			e.preventDefault();
			let target = e.target;

			let username = target.username.value;
			let password = target.password.value;
			let passConfirm = target.pass_confirm.value
			let fname = target.fname.value;
			let lname = target.lname.value;
			let phone = target.phone.value;
			let email = target.email.value;

			dispatch( registerAccount( username, email, password, passConfirm, fname, lname, phone  ) );
		}
	}
}

UserAction = connect(mapStateToProps, mapDispatchToProps)(UserAction)

export default UserAction;
