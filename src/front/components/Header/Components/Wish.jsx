import React, { Component } from 'react';
import wish from '../../../../assets/image/common/like.png';
import { connect } from 'react-redux';
import { getPopup } from '../../../redux/actions';


class Wish extends Component {
  render() {
    let { addWishStatus, removeWishStatus, openWish } = this.props;
    
    return(
      <div className="wish">
        <span className="wish__icon _icon" onClick={() => openWish()} title="See your Wislist">
          <img src={wish} alt=""/>
        </span>
        <div className={`noti${addWishStatus ? ' -show _add' : removeWishStatus ? ' -show _remove' : ''}`}>
          {
            addWishStatus ? <p><i className="fal fa-check-circle"></i>Added To WishList</p>
            : removeWishStatus ? <p><i className="fal fa-trash-alt"></i>Removed From WishList</p>
            : null
          }
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return{
    addWishStatus: state.addWishStatus,
    removeWishStatus: state.removeWishStatus
  }
}

const mapDispatch = dispatch =>{
  return{
    openWish: () => {
      dispatch( getPopup('wishlist') )
    }
  }
}

Wish = connect(mapState, mapDispatch) (Wish)

export default Wish