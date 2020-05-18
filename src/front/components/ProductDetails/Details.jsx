import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProductDetails, fetchRelatedProduct, fetchProductSlides } from '../../redux/actions';
import RelatedProducts from './Components/RelatedProducts';
import SlideProduct from './Components/SlideProduct';
import PageLoading from '../general/PageLoading';

class Details extends Component {
  constructor (props) {
    super(props);
    this.state = {
      currentID: null,
      loading: true,
      showSpec: false,
    }
  }

  async componentWillMount() {
    await this.props.getDetails();
    
    await this.props.getRelatedProducts();
    await this.props.getProductSlides();

    let currentID = await this.props.match.params.id;
    await this.setState({ currentID });
    window.scrollTo(0, 0)

    setTimeout(() => {
      let { detailsRes } = this.props;
      // console.log(detailsRes)
      if(!!detailsRes && detailsRes === true) this.setState({ loading: false });
    }, 500)
  
  }

  componentWillReceiveProps(nextProps) {
    let newID = nextProps.match.params.id;
    newID = !!newID ? newID : null;

    let oldID = this.state.currentID;

    if ((!!oldID && !!newID) && (oldID !== newID)) {
      this.props.getDetails();
      this.props.getRelatedProducts();
      this.props.getProductSlides();

      let currentID = this.props.match.params.id;
      this.setState({ currentID });
    }

  }

  showFullSpec = () => {
    this.setState({ showSpec: true })
  }

  closeFullSpec = (e, outSide) => {
    if(!!outSide && outSide){
      if(e.target === e.currentTarget){
        this.setState({ showSpec: false })
      }
    } else {
      this.setState({ showSpec: false })
    }
  }

  render() {
    let { productItem, relatedItem, proSlideItem } = this.props;

    let { loading, showSpec } = this.state;

    let thumbnails, slide_images, haveSlides;
    if (!!proSlideItem && proSlideItem.length > 0) {

      thumbnails = proSlideItem[0].thumbnails.split(', ');
      slide_images = proSlideItem[0].slides.split(', ');
      if (proSlideItem[0].have_slides === 0) {
        haveSlides = true;
      } else {
        haveSlides = false;
      }
    } else {
      thumbnails = [];
      slide_images = [];
      haveSlides = false
    }

    let proImg = !!productItem ? productItem[0].product_image : null;

    let proName = !!productItem ? productItem[0].product_name : null;

    let proPrice = !!productItem ? productItem[0].product_price : null;
    proPrice = !!proPrice ? `${proPrice.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")} VND` : null

    let fullSpec = !!productItem ? productItem[0].full_specification : null;
    let shortSpec = !!productItem ? productItem[0].short_specification : null;


    return (
      <section className="pr-details">
        <PageLoading loading = {loading} />
        <div className="pr-details__box">
          <div className="inner">
            <div className="pr-details__top">
              <div className="pr-details__top--col1">
                <SlideProduct
                  haveSlides={haveSlides}
                  thumbnails={thumbnails}
                  slide_images={slide_images}
                  proImg={proImg}
                  proName={proName}
                />
              </div>
              <div className="pr-details__top--col2">
                <div className="pr-details__info">
                  <h3 className="pro-name">{proName}</h3>
                  <p className="pro-price">{proPrice}</p>
                  <div className="pr-details__params">
                    <div dangerouslySetInnerHTML={{ __html: (shortSpec ) }} />
                    <span className="viewmore" onClick={ () => this.showFullSpec() }>View details</span>
                  </div>
                  <div className={`pr-details__fullspec${showSpec ? ' show': ''}`} onClick={ e => this.closeFullSpec(e, true) }>
                    <span className="close"  onClick={ e => this.closeFullSpec(e) }>
                      <i className="fal fa-times"></i>
                    </span>
                    <div className="box">
                      <div className={`fullspec`} dangerouslySetInnerHTML={{ __html: (fullSpec) }}></div>
                    </div>
                  </div>
                </div>
                <div className="pr-details__option">
                  <div className="coming">
                    <p>Product Option</p>
                  </div>
                </div>
                <div className="pr-details__button">
                  <a href="/#" className="cart">
                    Add to cart
                  </a>
                  <a href="/#" className="wish">
                    Add to wishlist
                  </a>
                </div>
              </div>
              <div className="pr-details__top--col3">
                <div className="pr-details__promotion">
                  <div className="coming">
                    <p>Promotion Area</p>
                  </div>
                </div>
                <div className="pr-details__ship">
                  <div className="coming">
                    <p>Ship Area</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="pr-details__content">
              <div className="pr-details__content--left">
                <div className="pr-details__intro">
                  <div className="pr-details__title">
                    <h5>About of {proName}</h5>
                  </div>
                  <div className="coming">
                    <p>Introudce Product Area</p>
                  </div>
                </div>
                <div className="pr-details__comment">
                  <div className="pr-details__title">
                    <h5>Comment of {proName}</h5>
                  </div>
                  <div className="coming">
                    <p>Comment Area</p>
                  </div>
                </div>
              </div>
              <div className="pr-details__content--right">
                <RelatedProducts relatedItem={relatedItem} />
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

const mapStateToProps = state => ({
  productItem: state.productItem,
  detailsRes: state.detailsRes,
  relatedItem: state.relatedItem,
  proSlideItem: state.proSlideItem,
})

const mapDispatchToProps = (dispatch, ownProps) => {
  let proID = ownProps.match.params.id;
  return {
    getDetails: (cb) => {
      dispatch(fetchProductDetails(proID))
    },
    getRelatedProducts: () => {
      dispatch(fetchRelatedProduct(proID))
    },
    getProductSlides: () => {
      dispatch(fetchProductSlides(ownProps.match.params.id))
    },
  }
}

Details = connect(mapStateToProps, mapDispatchToProps)(Details);
export default Details;