import React, { Component } from 'react';
import { logout, fetchUserInfo } from '../../../redux/actions';
import { connect } from 'react-redux';
import defAvatar from '../../../../assets/image/auth/default-avatar.jpg';
import Popup from '../Popup';

class Account extends Component{

  componentWillMount(){
    this.props.fetchUserInfo();
  }


  render() {
    let userAcccess = localStorage.getItem("currentUser");

    let { userInfo, popupName, logOut } = this.props;

    userInfo = !!userInfo ? userInfo : []

    let showPopup = !!popupName && popupName === "user" ? true : false;

    return userAcccess 
    ?
      <Popup head="Account" showPopup={showPopup}>
        <div className="user__welcome">
          <a href={userInfo.role === 0 ? '/admin/profile' : '/profile'} className="user-general">
            <div className="avatar">
              {
                userInfo.user_image !== null
                ?
                  <img src={ userInfo.user_image } alt="avatar" />
                :
                  <img src={ defAvatar } alt="avatar" />
              }
            </div>
            <div className="name_role">
              <p className="name">{userInfo.first_name} {userInfo.last_name}</p>
              <p className="role">{ userInfo.role === 0 ? 'Administrator' : 'Customer' }</p>
            </div>
          </a>
          <span className="logout" onClick={(e) => logOut(e)}>Sign out</span>
        </div>
        <ul className="user__option">
          {
            userInfo.role === 0
            ?
              <li>
                <a href="/admin"><i className="fal fa-tachometer-alt"></i> Dashboard</a>
              </li>
            :
              <li>
                <a href="/#"><i className="fal fa-user-circle"></i>My Account</a>
              </li>
          }
          <li>
            <a href="/#"><i className="fal fa-clipboard-list"></i>My Orders</a>
          </li>
          <li>
            <a href="/#"><i className="fal fa-book-heart"></i>My Wishlist</a>
          </li>
        </ul>
      </Popup>
    : null
  }
}

const mapState = state => {
  return{
    userInfo: state.userInfo,
    popupName: state.popupName,
  }
}

const mapDispatch = dispatch => {
  return{
    logOut: (e) => {
      e.preventDefault();
      dispatch( logout() );
    },
    fetchUserInfo: () => {
      dispatch( fetchUserInfo() )
    }
  }
}


export default Account = connect( mapState, mapDispatch ) ( Account );