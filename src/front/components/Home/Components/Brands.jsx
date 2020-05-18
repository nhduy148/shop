import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchBrands } from '../../../redux/actions';
import Slider from "react-slick";

class Brands extends Component{

  componentWillMount(){
    this.props.getBrands()
  }

  render(){

    let { brandItem } = this.props;

    const lastestProductSettings = {
      dots: false,
      infinite: true,
      slidesToShow: 8,
      cssEase: 'linear',
      autoplay: true,
      speed: 500,
      autoplaySpeed: 4000,
      arrows: false
    };
  
    return(
      <div className="brand">
        {/* <div className="c-title _white">
          <h3 className="c-title__main">Feature Product</h3>
          <p className="c-title__sub">Pick the most popular products from us. May you love them!</p>
        </div> */}
        <div className="container brand__content">
          {brandItem ? 
          <Slider {...lastestProductSettings} >
            {brandItem.map((brand, key) => 
              <div className="brand__item" key = {key} title={brand.cat_name}>
                <img src={brand.brand_image} alt={brand.cat_name}/>
                {/* <h3 className="brand__name">{brand.cat_name}</h3> */}
              </div>
            )}
          </Slider>
           : null }
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return{
    brandItem: state.brandItem
  }
}
const mapDispatch = dispatch => {
  return{
    getBrands: () => {
      dispatch( fetchBrands() )
    }
  }
}

Brands = connect( mapState, mapDispatch ) (Brands)
export default Brands;