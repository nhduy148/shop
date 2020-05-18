import React, { Component } from 'react';
import { fetchBlogDetails } from '../../redux/actions'
import { connect } from 'react-redux';
import PageLoading from '../general/PageLoading';

class Details extends Component{
  constructor(props){
    super(props);
    this.state = {
      loading: true,
    }
  }

  componentWillMount(){

    let { loading } = this.state;

    this.props.fetchBlogDetails(
      setTimeout(() => {
        window.scrollTo(0, 0)
        let { blogDetailsStatus } = this.props;
        if(!!blogDetailsStatus && blogDetailsStatus === true) this.setState({ loading: false });
      }, 1000)
    );
    

    let body = document.getElementsByTagName('body')[0];
    if (!!loading && loading){
      body.style.overflow = "hidden"
    }
  }

  componentDidMount(){
    setTimeout(() => {
      let img = document.querySelectorAll('.imgwrap')
      
      img.forEach( (div, i) => {
        let img = div.childNodes
        let img_attr = img[0].dataset.original
        img[0].setAttribute("src", img_attr)
      })
    }, 500);
  }

  render() {
    
    let { loading } = this.state;

    // Set style for body tag
    let body = document.getElementsByTagName('body')[0];
    if (loading === false){
      setTimeout(() => {
        body.style.overflow = "unset";
      }, 200);
    }
//======================================================================
    let { blogDetails } = this.props;

    let blogContent = !!blogDetails ? blogDetails[0].blog_contents : '';

    let title = !!blogDetails ? blogDetails[0].blog_title : '';

    let blogTitle = `<h1 class="titledetail">${title}</h1>`

    return (
      <div className="bl-details">
        <PageLoading loading = {loading} />
        <div className="container">
          <div className="bl-details__box">
            <div className="bl-details__content">
              <article dangerouslySetInnerHTML={{ __html: (blogTitle+blogContent) }} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    blogDetails: state.blogDetails,
    blogDetailsStatus: state.blogDetailsStatus
  }
}

const mapDispatch = (dispatch, props) => {
  let blogID = props.match.params.id;
  return{
    fetchBlogDetails: (cb) => {
      dispatch( fetchBlogDetails( blogID ) );
    }
  }
}

export default Details = connect(mapState, mapDispatch) (Details)