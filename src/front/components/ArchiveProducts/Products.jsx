import React, { Component } from 'react';

//Component
import Banner from '../general/Banner';
import ProductItem from '../general/ProductItem';
import ArchiveComponent from './Components';
import PageLoading from '../general/PageLoading';

// Redux
import { connect } from 'react-redux';
import { fecthAllProduct, fetchProductByCat } from '../../redux/actions';

//Image
import loadProductImg from '../../../assets/image/product/loading-product-2.gif'
import bannerBGD from '../../../assets/image/product/product-banner2.png';


class Products extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      catSlugIs: null,
      catArr: ["mobile", "laptop", "tablet"],
      viewMode: 'grid'
    }
  }

  componentWillMount(){
    let { params } = this.props;
    let catParams = !!params ? params : null;

    let { loading, catArr } = this.state;

    let catSlug = catArr.includes(catParams) ? (this.setState({catSlugIs: catParams}), catParams ) : this.setState({catSlugIs: null})

    this.props.fecthProducts(catSlug,
      setTimeout(() => {
        window.scrollTo(0, 0)
        let { allItemRes } = this.props;
        if(!!allItemRes && allItemRes === true) this.setState({ loading: false });

        this.paginationPos();
        
      }, 1000)
    );

    let body = document.getElementsByTagName('body')[0];
    if (!!loading && loading){
      body.style.overflow = "hidden"
    }
  }

  componentWillReceiveProps(nextProps){
    let newCat = nextProps.params;    
    newCat = !!newCat ? newCat : null;
    let oldCat = this.state.catSlugIs;

    // console.log("oldCat => "+oldCat)
    // console.log("newCat => "+newCat)

    // console.log(( !!oldCat && !!oldCat ) && ( newCat !== oldCat ) )
    
    if( ( newCat !== oldCat ) ){
      let { loading, catArr } = this.state;
  
      let catSlug = catArr.includes(newCat) ? (this.setState({catSlugIs: newCat}), newCat ) : this.setState({catSlugIs: null})
  
      this.props.fecthProducts(catSlug, 
        setTimeout(() => {
          let { allItemRes } = this.props;
          if(!!allItemRes && allItemRes === true) this.setState({ loading: false });
        }, 1000)
      );
  
      let body = document.getElementsByTagName('body')[0];
      if (!!loading && loading){
        body.style.overflow = "hidden"
      }
    }
  }

  changeViewMode = (e) => {
    let viewMode = e.currentTarget.getAttribute('class');
    this.setState({ viewMode })
    setTimeout(() => {
      this.paginationPos();
    }, 100);
  }

  paginationPos = () => {
    let archive = document.querySelectorAll('.archive__content')[0];
    let archiveHeight = archive.clientHeight;
    let pagination = document.getElementsByClassName('pagination')[0]
    let archive_top = archive.offsetTop
    let archive_offSetTop = parseInt(archive_top) + parseInt(archiveHeight);
    if(pagination) pagination.style.top = archive_offSetTop+ 30 +'px';
  }

  render() {

    // Redux state
    let { allItem, allItemRes } = this.props;
    // console.log(allItem)

    // Component State
    let { loading, catSlugIs, viewMode } = this.state;

    // Set style for body tag
    let body = document.getElementsByTagName('body')[0];


    if (loading === false){
      setTimeout(() => {
        body.style.overflow = "unset";
      }, 200);
    }

    let proDesc = 'This is product description. It will be coming soon.';

    return (
      <div className="archive">
        <PageLoading loading = {loading} />
        <Banner
          background = {bannerBGD}
          title = "Our Products"
        />
        <div className="container archive__block">
        <ArchiveComponent
          allItem = {allItem}
          catSlugIs = {catSlugIs}
          changeViewMode = {this.changeViewMode}
        />
          <div className={`archive__content ${viewMode}`}>
            {/* <div className="archive__product"> */}
              <div className={`archive__load${allItemRes ? ' -loaded' : ''}`}><img src={loadProductImg} alt=""/></div>
              {
                !!allItem > 0 && allItemRes
                  ? allItem.map( (val, i) => <ProductItem {...val} key = {i} proDesc = {proDesc} /> )
                : allItem === null && allItemRes
                  ? <h5 className="archive__empty" >No Products</h5>
                  : <div className={`archive__load${allItemRes ? ' -loaded' : ''}`}><img src={loadProductImg} alt=""/></div>
              }
            {/* </div> */}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps =  state => ({
  allItem: state.allItem,
  allItemRes: state.allItemRes
})

const mapDispatchToProps = dispatch => ({
  //fetch All Product when page load.
  fecthProducts: (catSlug, cb) => {
    !!catSlug
    ?
      dispatch( fetchProductByCat(catSlug) )
    :
      dispatch( fecthAllProduct() )
  }

})
Products = connect(mapStateToProps, mapDispatchToProps)(Products)

export default Products;
