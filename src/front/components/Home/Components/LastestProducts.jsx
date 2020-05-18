import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import ProductItem from '../../general/ProductItem'
import { fetchLastestProduct } from '../../../redux/actions';

class LastestProducts extends Component{
  componentWillMount(){
    this.props.fetchLastestProduct();
  }

  render(){
    let { lastestItem, newProduct } = this.props;

    const lastestProductSettings = {
      dots: false,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      // centerMode: true,
      cssEase: 'linear',
      autoplay: true,
      speed: 500,
      autoplaySpeed: 4000,
      prevArrow: <PrevArrow />,
      nextArrow: <NextArrow />
    };
  
    function NextArrow(props){
      const { className, onClick } = props;
      return( <span className={className} onClick={onClick}><i className="fas fa-chevron-right"></i></span> )
    }
  
    function PrevArrow(props){
      const { className, onClick } = props;
      return( <span className={className} onClick={onClick}><i className="fas fa-chevron-left"></i></span> )
    }


    return(
      <div className="lastest clearfix" id="a">
        <div className="inner">
          <div className="lastest__title l_title">
            <h3 className="l_title__main">Lastest Products</h3>
            {/* <span className="l_title__sub">Pick the most lastest products from us.</span> */}
          </div>
          <div className="lastest__slides">
            {
              lastestItem 
              ?
                <Slider {...lastestProductSettings} >
                  {
                    lastestItem.map( value => 
                        <ProductItem
                          key = { value.productID }
                          newProduct = {newProduct}
                          { ...value }
                        />
                    )
                  }
                </Slider>
              : null 
            }
          </div>
        </div>
      </div>
    )
  }
}
// let LastestProducts2 = ( { lastestItem, newProduct, fetchLastestProduct } ) => {
//   console.log(fetchLastestProduct)
//   let lastest =
//   lastestItem ? lastestItem.map( value => {
//     return (
//       <ProductItem
//         key = { value.productID }
//         newProduct
//         { ...value }
//       />
//     )
//   })
//   : null

//   const lastestProductSettings = {
//     dots: false,
//     infinite: true,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     centerMode: true,
//     centerPadding: "30px",
//     autoplay: true,
//     speed: 1500,
//     autoplaySpeed: 400000,
//     prevArrow: <PrevArrow />,
//     nextArrow: <NextArrow />
//   };

//   function NextArrow(props){
//     const { className, onClick } = props;
//     return( <span className={className} onClick={onClick}><i className="fas fa-chevron-right"></i></span> )
//   }

//   function PrevArrow(props){
//     const { className, onClick } = props;
//     return( <span className={className} onClick={onClick}><i className="fas fa-chevron-left"></i></span> )
//   }

//   return (
//     <div className="lastest clearfix" id="a">
//       <div className="inner">
//         <div className="lastest__title l_title">
//           <h3 className="l_title__main">Lastest Products</h3>
//           {/* <span className="l_title__sub">Pick the most lastest products from us.</span> */}
//         </div>
//         <div className="lastest__slides">
//           <Slider {...lastestProductSettings} >{lastest}</Slider>
//         </div>
//       </div>
//     </div>
//   )
// }

const mapStateToProps = (state) => ({ 
  lastestItem: state.lastestItem,
  newProduct : true,
})

const mapDispatchToProps = dispatch => ({
  fetchLastestProduct: () => dispatch( fetchLastestProduct() )
})

LastestProducts = connect(mapStateToProps, mapDispatchToProps)(LastestProducts)

export default LastestProducts;