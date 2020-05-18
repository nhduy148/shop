import React, { Component } from 'react';
import Pagination from './Pagination';
import SideBar from './SideBar';
import Toolbar from './Toolbar';
import { connect } from 'react-redux';
import { filterProduct, allProducs } from '../../../redux/actions';

class ArchiveComponent extends Component {

  constructor(props){
    super(props);
    this.state = {
      currentPage: 1,
      limit: 9,
      offSet: 0,
      sortSelected: 'lastest',
      priceSelected: {},
      brandSelected: [],
    }

    this.filterPrice = this.filterPrice.bind(this);
    this.filterBrand = this.filterBrand.bind(this);
    this.sortProducts = this.sortProducts.bind(this);
    this.changeCurrentPagi = this.changeCurrentPagi.bind(this);
    this.numberOfProducts = this.numberOfProducts.bind(this);
  }

  componentWillMount() {
    let { catSlug } = this.props;
    let { sidebarPrice } = this.props;
    let priceArr = !!catSlug ? sidebarPrice.filter( price => price.type === catSlug ) : sidebarPrice.filter( price => price.type === "all")
    
    this.setState({ priceArr: priceArr[0].data });
  }

  resetPagination = (currentPage, limit, offSet) => {
    limit = !!limit ? limit : 9;
    offSet = !!offSet ? offSet : 0;
    currentPage = !!currentPage ? currentPage : 1;

    this.setState({ 
      currentPage,
      limit,
      offSet,
    })
  }
  
  orderQuery = () => {
    let { sortSelected } =  this.state;
    let order 
      = ( sortSelected === 'name-desc' )
      ? 'product_name DESC'
      : ( sortSelected === 'name-asc' )
      ? 'product_name ASC'
      : ( sortSelected === 'price-asc' )
      ? 'product_price ASC'
      : ( sortSelected === 'price-desc' )
      ? 'product_price DESC'
      : 'date_create DESC'
    return order;
  }

  whereQuery = () => {
    let { catSlugIs } = this.props;
    let { brandSelected, priceSelected } = this.state;

    let whereBrand = !!brandSelected.length > 0 ? `brandID=${brandSelected[0]}` : '1=1';

    let whereCategory = !!catSlugIs ? `catSlug='${catSlugIs}'` : '1=1';

    let wherePrice = 
      !!priceSelected.price && priceSelected.price.length === 3 ?
      `product_price > ${priceSelected.price[2]}`
    : !!priceSelected.price && priceSelected.price.length === 2 ?
      `product_price > ${priceSelected.price[0]} AND product_price < ${priceSelected.price[1]}`
    : !!priceSelected.price && priceSelected.price.length === 1 ?
      `product_price < ${priceSelected.price[0]}`
    : '1=1';

    return `${whereCategory} AND ${whereBrand} AND ${wherePrice}`
  }

  async filterPrice(e, priceSelected, tagPrice) {
    e.preventDefault();

    await
    !!priceSelected && !!tagPrice
    ? this.setState({ priceSelected: {price: priceSelected, tag: tagPrice} })
    : this.setState({ priceSelected: {} })

    await this.resetPagination();
    let { limit, offSet } = await this.state;
    
    let orderQuery = await this.orderQuery();
    let whereQuery = await this.whereQuery();
    this.props.filterProducts( whereQuery, orderQuery, limit, offSet )
  }

  async filterBrand(e, brandID, brandName) {
    e.preventDefault();

    await
    !!brandID && !!brandName
    ? this.setState({ brandSelected: [brandID, brandName] })
    : this.setState({ brandSelected: [] })
    
    await this.resetPagination();
    let { limit, offSet } = await this.state;
    
    let orderQuery = await this.orderQuery();
    let whereQuery = await this.whereQuery();
    this.props.filterProducts( whereQuery, orderQuery, limit, offSet )
  }

  async sortProducts(e) {
    let sortSelected = e.target.value;
    await this.setState({ sortSelected })
    await this.resetPagination();

    let { limit, offSet } = await this.state;

    let orderQuery = await this.orderQuery();
    let whereQuery = await this.whereQuery();
    this.props.filterProducts( whereQuery, orderQuery, limit, offSet )
  }

  async changeCurrentPagi(e) {
    e.preventDefault();
    let currentPage = e.target.getAttribute("data-pagi");
    let getLimit = await this.state.limit;

    let setOffSet = await (parseInt(getLimit) * currentPage ) - parseInt(getLimit);
    await this.resetPagination(currentPage, null, setOffSet);

    let { limit, offSet } = await this.state;

    let orderQuery = await this.orderQuery();
    let whereQuery = await this.whereQuery();
    this.props.filterProducts( whereQuery, orderQuery, limit, offSet )
  }

  async numberOfProducts (e) {
    let numberPosts = e.target.value;
    await this.resetPagination(null, numberPosts, null);

    // await this.resetPagination();
    let { limit, offSet } = await this.state;
    
    let orderQuery = await this.orderQuery();
    let whereQuery = await this.whereQuery();
    this.props.filterProducts( whereQuery, orderQuery, limit, offSet )
  }

  render(){
    // console.log(this.whereQuery())

    //Redux map State
    let { priceSelected, brandSelected } = this.state;

    // Parent props
    let { allItem, catSlugIs } = this.props;

    // Component State
    let { limit, currentPage, sortSelected, offSet } = this.state;

    // total item
    let total = !!allItem && allItem.length > 0 ? allItem[0].total : 0;

    let totalProductOfBrand = allItem ? allItem.length : null;
    let disabledSelectLimit = totalProductOfBrand < parseInt(limit) ? true : false;
    let newLimit = totalProductOfBrand < parseInt(limit) ? totalProductOfBrand : limit;
    
    
    return [
        <SideBar
          key = {SideBar}
          filterPrice = {this.filterPrice}
          filterBrand = {this.filterBrand}
          sortProducts = {this.sortProducts}

          limit = { limit }
          offSet = { offSet }
          sortSelected = {sortSelected}
          catSlugIs = {catSlugIs}
        />,
        <Pagination
          key = {Pagination}
          total = {total}
          limit = {limit}
          currentPage = {currentPage}
          changeCurrentPagi = { this.changeCurrentPagi }
        />,
        <Toolbar
          key = {Toolbar}
          tagPrice = {priceSelected.tag}
          tagBrand = {brandSelected[1]}
          filterPrice = {this.filterPrice}
          filterBrand = {this.filterBrand}
          changeViewMode = {this.props.changeViewMode}

          limit = {limit}
          newLimit = {newLimit}
          total = {total}
          disabledSelectLimit = {disabledSelectLimit}
          numberOfProducts = {this.numberOfProducts}
        />
    ]
  }
}

const mapStateToProps = state => ({
  sidebarPrice: state.sidebarPrice
})


const mapDispatchToProps = dispatch => ({

  filterProducts: (whereQuery, orderQuery, limit, offSet) => {
    dispatch( allProducs( null, false, null ) )
    dispatch( filterProduct( whereQuery, orderQuery, limit, offSet ) )
  },
  
})

export default ArchiveComponent = connect(mapStateToProps, mapDispatchToProps)(ArchiveComponent);