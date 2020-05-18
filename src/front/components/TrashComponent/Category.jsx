import React, { Component } from 'react';

//Compoenent
import Banner from '../general/Banner';
import SideBar from '../ArchiveComponent/SideBar'
import ProductItem from '../general/ProductItem';
import Pagination from '../ArchiveComponent/Pagination';
import PageLoading from '../general/PageLoading';

// Redux
import { connect } from 'react-redux';
import { fetchProductByCat, filterProduct } from '../../redux/actions';

// Image
import mobileBGD from '../../../assets/image/product/phone-banner.png';
import laptopBGD from '../../../assets/image/product/laptop-banner-2.png';
import loadProductImg from '../../../assets/image/product/loading-product-2.gif'

class Products extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentPage: 1,
      limit: 9,
      offSet: 0,
      sortSelected: 'lastest',
      idBrand: null,
      loading: true,
    }
    this.handleShowProduct = this.handleShowProduct.bind(this);
    this.changeCurrentPagi = this.changeCurrentPagi.bind(this);
  }

  componentWillMount(){
    let { loading } = this.state;
    let body = document.getElementsByTagName('body')[0];
    if (!!loading && loading){
      body.style.overflow = "hidden"
    }

    let cat = this.props.match.params.cat;
    this.props.fecthProducts(cat, setTimeout(() => {
      let { allItemRes } = this.props;
      if(!!allItemRes && allItemRes === true) this.setState({ loading: false });
    }, 200));
  }
  
  async componentWillReceiveProps(nextProps){
    // console.log(this.state.loading)
    if(nextProps.match.params.cat !== this.props.match.params.cat){
      let cat = await nextProps.match.params.cat;
      this.props.fecthProducts(cat, setTimeout(() => {
        let { allItemRes } = this.props;
        if(!!allItemRes && allItemRes === true) this.setState({ loading: false });
      }, 200));
    }
  }

  sortSelected = () => {
    let { sortSelected } = this.state;
    let order 
      = sortSelected === 'name-desc'
      ? 'product_name DESC'
      : sortSelected === 'name-asc'
      ? 'product_name ASC'
      : sortSelected === 'price-asc'
      ? 'product_price ASC'
      : sortSelected === 'price-desc'
      ? 'product_price DESC'
      : 'date_create DESC'

    return order;
  }

  handleSort = (e, val) => {
    e.preventDefault();
    val = e.target.value;

    let catSlug = this.props.match.params.cat;
    this.setState({sortSelected: val, currentPage: 1}, () => {
      let where = this.state.idBrand !== null ? `brandID=${this.state.idBrand} and catSlug='${catSlug}'` : `1=1 and catSlug='${catSlug}'`;
      let order = this.sortSelected();
      let { limit } = this.state;
      this.props.sortAction(e, where, order, limit);

    });
  }

  changeBrandID = (e, val) => {
    e.preventDefault();
    let catSlug = this.props.match.params.cat;
    this.setState({ idBrand: val, currentPage: 1 }, () => {

      let where = this.state.idBrand !== null ? `brandID=${this.state.idBrand} and catSlug='${catSlug}'` : `1=1 and catSlug='${catSlug}'`;
      let order = this.sortSelected();
      let { limit } = this.state;

      this.props.fillterByBrand(e, where, order, limit);
    });
  }
  
  //Try async/awwait
  async handleShowProduct(e, val){
    e.preventDefault();
    val = e.target.value;
    let catSlug = this.props.match.params.cat;
    this.setState({ limit: val, offSet: val, currentPage: 1 });

    let where = await this.state.idBrand !== null ? `brandID=${this.state.idBrand} and catSlug='${catSlug}'` : `1=1 and catSlug='${catSlug}'`;
    let order = await this.sortSelected();
    let { limit, offSet } = await this.state;

    await this.props.showProduct(e, where, order, limit, offSet)

  }

  //Use callback
  // handleShowProduct = (e, val) => {
  //   e.preventDefault();
  //   val = e.target.value;

  //   this.setState({ offSet: val }, () => {

  //     let where = this.state.idBrand !== null ? `brandID=${this.state.idBrand}` : '1=1';
  //     let order = this.sortSelected();
  //     let offSet = this.state.offSet;

  //     this.props.showProduct(e, where, order, offSet)

  //   })
  // }
  
  async changeCurrentPagi(e) {
    e.preventDefault();
    let current = e.target.getAttribute("data-pagi");
    let getLimit = this.state.limit;
    let catSlug = this.props.match.params.cat;
    let setOffSet = (parseInt(getLimit) * current ) - parseInt(getLimit);
    // console.log(parseInt(getLimit)+ ' * '+current+' - ' +parseInt(getLimit)+ ' = '+setOffSet);
    this.setState({ currentPage: current, offSet: setOffSet })

    let where = await this.state.idBrand !== null ? `brandID=${this.state.idBrand} and catSlug='${catSlug}'` : `1=1 and catSlug='${catSlug}'`;
    let order = await this.sortSelected();
    let { limit, offSet } = await this.state;

    await this.props.showProduct(e, where, order, limit, offSet)
  }

  render() {
    let { allItem, allItemRes } = this.props;
    let { limit, currentPage, loading } = this.state;

    // Set style for body tag
    let body = document.getElementsByTagName('body')[0];
    if (loading === false){
      setTimeout(() => {
        body.style.overflow = "unset";
      }, 200);
    }

    let total = allItem ? allItem[0].total : 0;
    let totalPagi = Math.ceil(total / limit);
    let pagiItem = [];
    currentPage = parseInt(currentPage);

    let totalProductOfBrand = allItem ? allItem[0].total : null;
    let disabledSelectLimit = totalProductOfBrand <= parseInt(limit) ? true : false;
    let newLimit = totalProductOfBrand < parseInt(limit) ? totalProductOfBrand : limit;

    for (let i = 1; i <= totalPagi; i++) {
      pagiItem.push(i);
    }

    // If is first page *don't have "First" and "Prev" button
    if (currentPage === 1){
      pagiItem = [...pagiItem, "Next", "Last"]
    }
    // esle If is first page *don't have "Next" and "Last" button
    else if(currentPage === totalPagi){
      pagiItem = [ "First", "Prev", ...pagiItem ]
    }
    // esle full button
    else{
      pagiItem = [ "First", "Prev", ...pagiItem, "Next", "Last" ]
    }
    
    let cate = this.props.match.params.cat;

    return (
      <div className="archive">
        <PageLoading loading = {loading} />   
        <Banner
          background = { !!cate && cate === "mobile" ? mobileBGD : !!cate && cate === "laptop" ? laptopBGD : mobileBGD}
          title = {`${ !!cate && cate === "mobile" ? "Mobile Phones" : !!cate && cate === "laptop" ? "Laptops" : "Tablets"}`}
        />
        <div className="container -has_sidebar">
          <SideBar 
            changeBrandID = { this.changeBrandID }
            sortSelected = { this.state.sortSelected }
            catSlug = {this.props.match.params.cat}
          />
          <div className="archive__content">
            <div className={`archive__load${allItemRes ? ' -loaded' : ''}`}><img src={loadProductImg} alt=""/></div>
            <div className="archive__toolbar -content">
              <div className="toolbar-item">
                <p>Sort by</p>
                <select name="sort" id="sort" defaultValue={this.state.sortSelected} onChange={(e) => this.handleSort(e)}>
                  <option value="lastest">Lastest Product</option>
                  <option value="name-desc">Name ( A - Z )</option>
                  <option value="name-asc">Name ( Z - A )</option>
                  <option value="price-desc">Price ( decrease )</option>
                  <option value="price-asc">Price ( increase )</option>
                </select>
              </div>
              <div className="toolbar-item">
                <p>Show {newLimit} of {total} {newLimit === 1 ? 'item' : 'items'}</p>
                <select name="show-item" id="show-item" 
                  defaultValue={this.state.limit}
                  onChange={(e) => this.handleShowProduct(e)}
                  style={{display: disabledSelectLimit === true ? "none" : "block"}}
                >
                  <option value="9">Show 9 Products On Page</option>
                  <option value="12">Show 12 Products On Page</option>
                  <option value="15">Show 15 Products On Page</option>
                  <option value="18">Show 18 Products On Page</option>
                </select>
              </div>
            </div>
            <div className="archive__product">
              {
                allItem
                ? allItem.map( (val, i) => <ProductItem {...val} key = {i} /> )
                : <h5>No Product</h5>
              }
              </div>
              <Pagination
                total = {total}
                limit = {limit}
                currentPage = {currentPage}
                changeCurrentPagi = { this.changeCurrentPagi }
              />
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
const mapDispatchToProps = dispatch => {
  return{
    //fetch All Product when page load.
    fecthProducts: (cat, cb) => {
      dispatch( fetchProductByCat(cat) )
    },

    //Sort by Brand
    sortAction: (e, where, order, limit) => {
      e.preventDefault();
      dispatch( filterProduct(where, order, limit ) )
    },
    
    // Fillter by name/price/lastest //default = lastest product
    fillterByBrand: (e, where, order, limit) => {
      e.preventDefault();
      dispatch( filterProduct( where, order, limit ) );
    },

    //Select produc will show //default = 9
    showProduct: (e, where, order, limit, offSet) => {
      e.preventDefault();
      dispatch( filterProduct( where, order, limit, offSet ) );
    }
  }
}
Products = connect(mapStateToProps, mapDispatchToProps)(Products)

export default Products;