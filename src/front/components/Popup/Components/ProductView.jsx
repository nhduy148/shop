import React, { Component } from 'react';
import {connect} from 'react-redux';
import { quickView, addToCart } from '../../../redux/actions';
import closeBtn from '../../../../assets/image/product/close.png';
// import { Link } from 'react-router-dom';
import { store } from '../../../../index';

class ProductView extends Component{
  constructor(props){
    super(props);
    this.state = {
      tabIndex : 'desc',
      quantity: 1,
    }
  }
  
  componentDidMount(){
    this.setState({ quantity : 1 });
  }

  clickTabIndex = tab => {
    // let tab = e.target.getAttribute('data-tab')
    this.setState({ tabIndex : tab })
  }

  increaseQuantity= () =>{
    let inc = this.state.quantity + 1;
    this.setState({ quantity: inc });
  }

  decreaseQuantity = () =>{
    let dec = this.state.quantity - 1;
    this.setState({ quantity: dec });
  }

  onchangeQuantity(e){
    let number = parseInt(e);
    this.setState({ quantity: number })
  }

  render(){
    let { viewItem, showView } = this.props;
    let { tabIndex } = this.state;
    let itemEmpty = [{"product_name": "", "product_image": "", "brand_name": ""}]
    let item = !!viewItem && viewItem.length > 0 ? viewItem[0] : itemEmpty[0];
    
    // console.log(item);

    let color = ["Yellow", "Black", "White"];
    let memory = ["32 GB", "64 GB", "128 GB", "256 GB"]
    let colorOption = [];
    let memoryOption = [];

    color.map((val, i) => {
      return colorOption.push(<option value={val} key={i}>{val}</option>)
    })

    memory.map((val, i) => {
      return memoryOption.push(<option value={val} key={i}>{val}</option>)
    })


    return (
      <div className={ `quickview${showView ?  ' -show' : '' }` } onClick={(e) => this.props.outsideCloseBox(e) } > 
      {
        <div className="quickview__box">
          <div className="quickview__image">
            <img src={item.product_image} alt={item.product_name} className="q-image" />
            <div className="q-brand">
              <img src={item.brand_image} alt={item.brand_name}/>
            </div>
          </div>
          <div className="quickview__content">
            <form onSubmit={(e) => this.props.addToCart(e)}>
              <input type="hidden" name="pro_id" value={!!item.productID ? item.productID : 0} />
              <h3 className="quickview__name">{item.product_name}</h3>
              <h5 className="quickview__brand">{item.brand_name}</h5>
              <div className="quickview__rate">
                <span className="star -active"><i className="fas fa-star"></i></span>
                <span className="star -active"><i className="fas fa-star"></i></span>
                <span className="star -active"><i className="fas fa-star"></i></span>
                <span className="star -active"><i className="fas fa-star"></i></span>
                <span className="star"><i className="fas fa-star"></i></span>
              </div>
              <div className="quickview__info">
                <div className="q-tabs">
                  <span className={ `q-tab ${tabIndex === 'desc' ? '-active' : ''}` } data-tab="desc" onClick={ (e) => this.clickTabIndex(e.target.getAttribute('data-tab')) }>Description</span>
                  <span className={ `q-tab ${tabIndex === 'spec' ? '-active' : ''}` } data-tab="spec" onClick={ (e) => this.clickTabIndex(e.target.getAttribute('data-tab')) }>Specification</span>
                  <span className={ `q-tab ${tabIndex === 'cmt'  ? '-active' : ''}` } data-tab="cmt"  onClick={ (e) => this.clickTabIndex(e.target.getAttribute('data-tab')) }>Comments</span>
                </div>
                <div className="q-contents">
                  <div className={ `q-content${tabIndex === "desc" ? ' -active' : '' } ` }>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sagittis gravida dolor quis consequat. Proin id metus ac tellus interdum commodo sed vitae dolor... {/*<Link>Readmore</Link>*/}</p>
                  </div>
                  <div dangerouslySetInnerHTML={{ __html: (item.short_specification) }}  className={ `q-content${tabIndex === "spec" ? ' -active' : '' } `}/>
                  <div className={ `q-content${tabIndex === "cmt" ? ' -active' : '' } ` }>
                    Comming soon
                  </div>
                </div>
              </div>
              <div className="quickview__option">
                <div className="q-color">
                  <select name="q-color">
                    { colorOption }
                  </select>
                </div>
                <div className="q-quantity">
                  <span className="value_button" id="decrease" onClick={ () => this.decreaseQuantity() }>-</span>
                  <input type="text" name="quantity" value={this.state.quantity} onChange={ (e) => this.onchangeQuantity(e.target.value) } />
                  <span className="value_button" id="increase" onClick={ () => this.increaseQuantity() }>+</span>
                </div>
                <div className="q-memory">
                  <select name="q-memory">
                    { memoryOption }
                  </select>
                </div>
              </div>
              <div className="quickview__button">
                <a href="/#" className="q-like" title={`Add ${item.product_name} To Your Wishlist`}>
                  Add To Wishlist
                </a>
                <button type="submit" className="q-add" title={`Add ${item.product_name} To Your Cart`}>
                  Add To Cart
                </button>
              </div>
            </form>
          </div>
          <div className="quickview__close" onClick={ this.props.closeBox }>
            <img src={closeBtn} alt="Close"/>
          </div>
        </div>
      }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  viewItem: state.viewItem,
  showView: state.showView
})

const mapDispatchToProps = dispatch => ({
  addToCart: (e) => {

    e.preventDefault();
    let cartID = store.getState().cartID;
    let target = e.target;

    let id = parseInt(target.pro_id.value);
    let quantity = parseInt(target.quantity.value);

    dispatch( addToCart(id, cartID, quantity) );
    dispatch ( quickView (null, false) );
  },
  outsideCloseBox: (e) => {
    if(e.target === e.currentTarget) {
      dispatch ( quickView (null, false) )
    }    
  },
  closeBox: () => {
    dispatch ( quickView (null, false) );
  }
})


ProductView = connect(mapStateToProps, mapDispatchToProps)(ProductView)

export default ProductView