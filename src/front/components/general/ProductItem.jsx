import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addToCart, quickView, actionAddToCart, fetchCart, addWishList, removeWishList, wishlistArray, cartArray } from '../../redux/actions';
import { Link } from 'react-router-dom';


class ProductItem extends Component {

  componentWillMount(){
    this.props.getWishlistArr();
    this.props.getCartArr();
  }

  // componentWillReceiveProps(nextProps){
  //   let { currentArr } = this.props;
  //   let nextArr = nextProps.wishArr;
  //   let currentArrLength = currentArr !== undefined ? currentArr : null;
  //   let nextArrLength = nextArr !== undefined ? nextArr : null;
  //   if( currentArrLength !== null && nextArrLength !== null && currentArrLength !== nextArrLength ){
  //     this.props.getWishlistArr();
  //   }
  // }

  actionWishlish = (isLike, proID, wishID) => {
    if(isLike){
      this.props.removeFromWishlist(wishID)
      this.props.getWishlistArr();
    } else {
      this.props.addToWishlist(proID)
      this.props.getWishlistArr();
    }
  }

  render(){
    let value = this.props;
    let { wishArr, cartArr } = this.props;
    let { addCart } = this.props;
    let proDesc = this.props.proDesc;

    let liked = wishArr && wishArr.includes(value.productID) ? true : false;
    
    const convertToVND = (price) => {
      if(price) return price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.") + "VND";
      return "0 VND"
    }
    
    return(
      <div className={`product${value.newProduct === true ? ' _new' : '' }`}>
        <Link to={`/product/${value.productID}`} className="product__link"></Link>
        <div className="product__image">
          <img src={value.product_image} alt={value.product_name} />
        </div>
        <div className="product__action">
          <span
            className={`like_btn${liked ? ' liked' : '' }`}
            onClick={() => this.actionWishlish(liked, value.productID, value.wishID)}
            title={`${value.liked === 0 ? 'Add this product to Wishlist' : 'Remove this product from Wishlist'}`}
          >
            <i className="far fa-heart"></i>
          </span>
          <span className="quickview_btn" onClick={ value.view }><i className="fas fa-search"></i></span>
          <span className="addtocart_btn" onClick={() => addCart(cartArr) }><i className="fas fa-cart-plus"></i></span>
        </div>
        <div className="product__general">
          <div className="product__rate">
            <span><i className="fas fa-star"></i></span>
            <span><i className="fas fa-star"></i></span>
            <span><i className="fas fa-star"></i></span>
            <span><i className="fas fa-star"></i></span>
            <span><i className="fas fa-star"></i></span>
          </div>
          <h3 className="product__name">{value.product_name}</h3>
          <h5 className="product__price">{convertToVND(value.product_price)}</h5>
          { proDesc ? <p className="product__desc">{proDesc}</p> : null }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  wishArr: state.wishArr,
  cartArr: state.cartArr
})


const mapDispatchToProps = (dispatch, ownProps) => {
  let accessKey = localStorage.getItem('currentUser');
  let proID = ownProps.productID;
  let proName = ownProps.product_name;
  let proImage = ownProps.product_image;
  let proPrice = ownProps.product_price;

  return {
    getWishlistArr: () => {
      dispatch( wishlistArray() )
    },
    getCartArr: () => {
      dispatch( cartArray() )
    },
    addCart: (cartID) => {
      
      dispatch( addToCart ( proID, cartID, 1, accessKey, proName, proImage, proPrice ) );
      dispatch( cartArray() )
      dispatch( fetchCart(false, accessKey) )
  
      setTimeout(() => {
        dispatch( actionAddToCart ( false, false ) )
      }, 3000);
    },
    view: () => {
      dispatch( quickView ( ownProps.productID, true ) );
    },
    addToWishlist: () => {
      dispatch( addWishList(proID, accessKey) )
    },
    removeFromWishlist: (wishID) => {
      dispatch( removeWishList(wishID, accessKey) )
    }
  }
}

ProductItem = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductItem)

export default ProductItem;
