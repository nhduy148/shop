import React, { Component } from 'react';
import userIcon from '../../../../assets/image/common/user.png';
import { getPopup } from '../../../redux/actions';
import { connect } from 'react-redux';

class User extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: null,
    }
  }

  componentWillMount(){
    let currentUser = localStorage.getItem("currentUser");
    currentUser ? this.setState({ currentUser: currentUser }) : this.setState ({ currentUser: null })
  }

  render() {
   let { openForm } = this.props;
   let { currentUser } = this.state;
   let { showUserOption } = this.props;
   
    return currentUser
        ?
          <div className="user">
            <span className="_icon" onClick={() => showUserOption()}>
              <img src={userIcon} alt="User"/>
            </span>
          </div>
        :
          <div className="user">
            <div className="user__text"><a href="/#a" onClick={ (e) => openForm(e, 'login') } >Login</a><span> / </span><a href="/#b" onClick={ (e) => openForm(e, 'signup') } >Signup</a></div>
          </div>
  }
}

const mapDispatchToProps = dispatch => {
  return{

    openForm: (e, formName) => {
      e.preventDefault();
      // formName === 'login' ?
      //   dispatch( getPopup('login') )

      // : formName === 'signup' ?
      //   dispatch( getPopup('signup') )

      // : dispatch( getPopup(null) )


        dispatch( getPopup(formName) )      
    },
    showUserOption: () => {
      dispatch( getPopup('user') )
    }
  }
}

User = connect(null, mapDispatchToProps)(User);
export default User
