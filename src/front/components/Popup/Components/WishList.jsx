import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import likedIcon from '../../../../assets/image/common/liked.png';
import { fetchWishList, removeWishList, getPopup } from '../../../redux/actions';
import Popup from '../Popup';

class WishList extends Component {

  componentWillMount(){
    this.props.fetchWish();
  }

  closeWishAndLogin = (e) => {
    this.props.closeWish(e)
    this.props.openForm(e, 'login')
  }

  render(){
    //Redux props
    let { wishlistItem, removeItemWishList, popupName } = this.props;

    let { closeWish } = this.props;
    
    // React Parent Component Props
    let user = localStorage.getItem("currentUser");

    let showPopup = !!popupName && popupName === "wishlist" ? true : false;
    
    return (
      <Popup head="Wishlist" showPopup={showPopup}>
        {
          user ? 
          <div className="wish__list">
            {
              wishlistItem && wishlistItem.length > 0 ?
                wishlistItem.map( (item, index) =>
                  <div className="wish__item" key={index}>
                    <div className="image">
                      <Link to={`/product/${item.productID}`} onClick={ e => closeWish(e) }>
                        <img src={item.product_image} alt={item.product_name} />
                      </Link>
                    </div>
                    <div className="info">
                      <Link to={`/product/${item.productID}`} onClick={ e => closeWish(e) }>
                        <h5 className="name"><span className="title">Name: </span>{item.product_name}</h5>
                      </Link>
                      <p className="price"><span className="title">Price: </span>{item.product_price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")} VND</p>
                    </div>
                    <div className="unlike" title="Remove from Wishlist" onClick={() => removeItemWishList(item.wishID)}>
                      <img src={likedIcon} alt="Remove from Wishlist"/>
                    </div>
                  </div>
                )
              : <div className="wish__empty">No favorites yet.</div>
            }
          </div>
        : 
          <div className="wish__login">
            <p>You have to <span className="login" onClick={ (e) => this.closeWishAndLogin(e) }>login</span> to use this function.</p>
          </div>
        }
      </Popup>
    )
  }
}

const mapStateToProps = state => {
  return{
    wishlistItem: state.wishlistItem,
    popupName: state.popupName,
  }
}

const mapDispatchToProps = dispatch => {
  let accessKey = localStorage.getItem("currentUser")
  return{
    openForm: (e, formName) => {
      e.preventDefault();
      dispatch( getPopup(formName) )      
    },
    fetchWish: () => {
      dispatch ( fetchWishList(accessKey) )
    },
    removeItemWishList: (wishID) => {
      dispatch( removeWishList(wishID, accessKey) )
    },
    closeWish: () => {
      dispatch( getPopup( null ) )
    },
  }
}

WishList = connect(mapStateToProps, mapDispatchToProps) (WishList)

export default WishList;