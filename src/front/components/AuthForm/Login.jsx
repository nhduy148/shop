import React, { Component } from 'react';
import { getPopup } from '../../redux/actions';
import { connect } from 'react-redux';


class Login extends Component{

  render(){
		let { getUsernameError, hasUsername } = this.props;
		
		let { loginSuccess, loginError } = this.props;

		let { popupName, openForm } = this.props;

    return(
			<div className={`login${popupName === "login" ? ' -active' : ''}`}>
				<form onSubmit = { (e) => this.props.loginHandle(e) } className="login100-form validate-form">
					<h2 className="auth__title">Member Login</h2>
					<div className={`wrap-input ${ hasUsername === true ? '_done' : '' }`} id="loginForm">
						<div className="_input input-username">
							<div className="wrap-input100">
								<input 
									className="input100"
									type="text" name="username"
									placeholder="Username"
									onChange={(e) => this.props.getUsername(e)}
									/>
								<span className="focus-input100"></span>
								<span className="symbol-input100">
									<i className="fa fa-envelope" aria-hidden="true"></i>
								</span>
							</div>
							<div className="validate-alert">
								<p>{getUsernameError}</p>
							</div>
							<div className="container-login100-form-btn">
								<button
									className="login100-form-btn"
									type="button"
									onClick={() => this.props.handleCheckLogin()
								}>
									Continue
								</button>
							</div>
						</div>
						<div className="_input input-password">
							<div className="text-center p-b-10">
								<a className="txt2" href="/#" onClick={ (e) => this.props.backToInputUser(e) } >
									<i className="fas fa-long-arrow-alt-left m-r-5"></i>
									Change user
								</a>
							</div>
							<div className="wrap-input100">
								<input className="input100" type="password" name="password" placeholder="Password" />
								<span className="focus-input100"></span>
								<span className="symbol-input100">
									<i className="fa fa-lock" aria-hidden="true"></i>
								</span>
							</div>
							<div className="validate-alert">
								<p>{loginError}</p>
							</div>
							<div className="container-login100-form-btn">
								<button className="login100-form-btn" type="submit">Login</button>
							</div>
							<div className="text-center p-t-12">
								<span className="txt1">Forgot</span>
								<a className="txt2 m-l-5" href="/#">Password?</a>
							</div>
						</div>
					</div>
				</form>
				<div className="text-center p-t-10">
					<a className="txt2" href="/#" onClick={ (e) => openForm(e, 'signup') } >
						Create your Account
						<i className="fas fa-long-arrow-alt-right m-l-5"></i>
					</a>
				</div>
				<div className="noti-logged">
					<p dangerouslySetInnerHTML={{ __html: (loginSuccess) }} />
				</div>
			</div>
		)
  }
}

const mapDispatch = dispatch => {
	return{
    openForm: (e, formName) => {
      e.preventDefault();
      // formName === 'login' ?
      //   dispatch( getPopup('login') )

      // : formName === 'signup' ?
      //   dispatch( getPopup('signup') )

      // : dispatch( getPopup(null) )


        dispatch( getPopup(formName) )      
		}
	}
}


export default Login = connect(null, mapDispatch) (Login);
