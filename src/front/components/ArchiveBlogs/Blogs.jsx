import React, { Component } from 'react';

import Banner from '../general/Banner';
import Sidebar from './Components/Sidebar';
import PageLoading from '../general/PageLoading';

import { Link } from 'react-router-dom';
import { fetchBlogsArchive } from '../../redux/actions';
import { connect } from 'react-redux'

import loadingImage from '../../../assets/image/blogs/loading.gif';
import bannerBGD from '../../../assets/image/blogs/banner3.jpg';

class Blogs extends Component{

  constructor(props){
    super(props);
    this.state = {
      limit: 12,
      offSet: 0,
      pageLoad: true,
      blogLoad: false,

      blogArray: [],
    }

    this.watchMore = this.watchMore.bind(this);
  }

  async componentWillMount(){
    let { offSet } = await this.state;

    await this.props.fetchBlogs(offSet, setTimeout(() => {
      window.scrollTo(0, 0)
      this.setState({ pageLoad: false });
      this.setState({ blogArray: [...this.props.archiveBlogList]})
    }, 1000));
  }

  async watchMore(oldOffSet) {
    let { limit } = await this.state;
    let newOffSet = await oldOffSet + limit;
    await this.setState({ offSet: newOffSet, blogLoad: true })

    await this.props.fetchBlogs(newOffSet, setTimeout(() => {
      let { archiveBlogList } = this.props;
      let { blogArray } = this.state;
      this.setState({ blogLoad: false });
      this.setState({ blogArray: [...blogArray, ...archiveBlogList] });
    }, 500));
  }

  render(){

    let { offSet, blogLoad, pageLoad, blogArray } = this.state;

    // console.log(blogArray);

    return(
      <div className="ar-blog">
        <PageLoading loading = {pageLoad} />
        <Banner 
          background = {bannerBGD}
          title = "Blogs"
        />
        <div className="container">
          <div className="ar-blog__box">
            <Sidebar />
            <div className="ar-blog__right">
              <div className="ar-blog__categories">
                <span className="cat">Category</span>
                <span className="cat">Category</span>
                <span className="cat">Category</span>
                <span className="cat">Category</span>
                <span className="cat">Category</span>
              </div>
              <div className="ar-blog__list">
                {
                  !!blogArray && blogArray.length > 0 
                    ? blogArray.map( ( blog, i) => {
                      let time = blog.blog_date;

                      let dateCreated = new Date(Date.parse(time));
                      let currentDate =  new Date();

                      let date = currentDate - dateCreated;
                      
                      let calcSecond = Math.round( date / 1000 );

                      let blogTime = 
                        calcSecond < 60 ?
                          'a few seconds ago.'
                        : calcSecond > 60 && calcSecond < 3600 ?
                          Math.round( calcSecond / 60 )+' minutes ago.'
                        : calcSecond > 3600 && calcSecond < 86400 ?
                          Math.round( calcSecond / 60 / 60 )+' hours ago.'
                        : calcSecond > 86400 && calcSecond < 2592000 ?
                          Math.round( calcSecond / 60 / 60 / 24 )+' days ago.'
                        : calcSecond > 2592000 && calcSecond < 31104000 ?
                          Math.round( calcSecond / 60 / 60 / 24 / 30 )+' month ago.'
                        : 
                          Math.round( calcSecond / 60 / 60 / 24 / 30 / 12 )+' years ago.'

                      // console.log(calcSecond);


                      return (
                        <div className="ar-blog__item" key={i} >
                          <Link to={`/blog/${blog.blogID}`} className="ar-blog__link"></Link>
                          <div className="ar-blog__thumb">
                            <img src={blog.blog_thumbnail} alt={blog.blog_title}/>
                          </div>
                          <div className="ar-blog__content">
                            <h5 className="ar-blog__title">{blog.blog_title}</h5>
                            <p className="ar-blog__excepts">{blog.blog_except}...</p>
                            <div className="ar-blog__option">
                              <div className="option">
                                <span className="comment">{100}<i className="fal fa-comment-alt-lines"></i></span>
                                <span className="like">{100}<i className="fal fa-thumbs-up"></i></span>
                              </div>
                              <span className="time">{blogTime}</span>
                            </div>
                          </div>
                        </div> 
                      )
                    }
                      )
                    : 
                      <div className="ar-blog__empty">
                        <p>No blog found</p>
                      </div>
                }
              </div>
              <div className={`ar-blog__loading${blogLoad === false ? ' is-loaded' : ''}`}>
                <img src={loadingImage} alt=""/>
              </div>
              <span className="ar-blog__more" onClick={ () => this.watchMore(offSet) }>See more</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    archiveBlogList: state.archiveBlogList,
    blogDetailsStatus: state.blogDetailsStatus,
    archiveBlogOffSet: state.archiveBlogOffSet,
  }
}

const mapDispatch = dispatch => {
  return{
    fetchBlogs: ( offSet, cb ) => {
      offSet = !!offSet ? offSet : 0;

      dispatch( fetchBlogsArchive( offSet ) )
    }
  }
}

export default Blogs = connect( mapState, mapDispatch )(Blogs);