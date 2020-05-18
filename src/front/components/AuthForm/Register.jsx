import React, { Component } from 'react';
import { getPopup } from '../../redux/actions';
import { connect } from 'react-redux';

class Register extends Component {

  render() {

    let { popupName, openForm } = this.props;
    let { userError, emailError, phoneError, passError, passConfirmError } = this.props;
    
    return(
      <div className={`signup${popupName === "signup" ? ' -active' : ''}`}>
        <div className="card-body">
          <h2 className="auth__title">Registration Info</h2>
          <form onSubmit={ (e) => this.props.registerHandle(e) } >
            <div className="input-group">
              <input className="i3" type="text" placeholder="Username" name="username" required />
              <p>{userError}</p>
            </div>
            <div className="input-group">
              <input className="i3" type="email" placeholder="Email" name="email" required />
              <p>{emailError}</p>
            </div>
            <div className="input-group">
              <input className="i3" type="password" placeholder="Password" name="password" required />
              <p>{passError}</p>
            </div>
            <div className="input-group">
              <input className="i3" type="password" placeholder="Confirm Password" name="pass_confirm" required />
              <p>{passConfirmError}</p>
            </div>
            <div className="input-group fieldname">
              <input className="i3" type="text" placeholder="First Name" name="fname" />
              <input className="i3" type="text" placeholder="Last Name" name="lname" />
            </div>
            <div className="input-group">
              <input className="i3" type="text" placeholder="Phone" name="phone" required />
              <p>{phoneError}</p>
            </div>
            <div className="p-t-10">
              <button className="btn btn--pill btn--green" type="submit">Sign Up</button>
            </div>
          </form>
          <div className="text-center p-t-50">
            <a className="txt2" href="/#" onClick={ (e) => openForm(e, 'login') } >
              <i className="fas fa-long-arrow-alt-left m-r-5"></i>
              Have an account? Login
            </a>
          </div>
        </div>
      </div>
    )
  }
}


const mapDispatch = dispatch => {
	return{
    openForm: (e, formName) => {
      e.preventDefault();
      dispatch( getPopup(formName) )      
		}
	}
}


export default Register = connect(null, mapDispatch) (Register);