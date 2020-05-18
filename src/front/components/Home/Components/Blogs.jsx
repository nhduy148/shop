import React, { Component } from 'react';
import { fetchHomeBlogs } from '../../../redux/actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class Blogs extends Component {

  componentWillMount(){
    this.props.fetchHomeBlogs();
  }

  render() {
    let { homeBlogItem } = this.props;
    // console.log(homeBlogItem);
    return (
      <div className="blog">
        <div className="c-title">
          <h3 className="c-title__main">Blogs</h3>
          <span className="c-title__sub">technology market analysis.</span>
        </div>
        <div className="blog__list container">
          {homeBlogItem ? homeBlogItem.map((blog, key) => 
            <div className="blog__item" key = {key}>
              <Link to={`/blog/${blog.blogID}`} className="blog__link"></Link>
              <div className="blog__thumbnail">
                <img src={blog.blog_thumbnail} alt={blog.blog_title} />
                <div className="blog__option">
                  <span className="option like">100 <i className="fal fa-thumbs-up"></i></span>
                  <span className="option comment">100 <i className="fal fa-comment-alt-lines"></i></span>
                </div>
              </div>
              <div className="blog__contents">
                <div className="blog__time">
                  <p>{blog.blog_date}</p>
                </div>
                <h3 className="blog__title">
                  {blog.blog_title}
                </h3>
                <div className="blog__except">
                  <p>{blog.blog_except}... <Link to={`/blog/${blog.blogID}`} className="blog__more">readmore</Link></p>
                </div>
              </div>
              {/* <div className="blog__option">
                <span className="time">{blog.blog_date}</span>
                <span className="comments"></span>
                <span className="view"></span>
                <span className="like"></span>
              </div> */}
            </div>
          )
          : null  }
        </div>
        <Link to="/blogs" className="view-more">View more</Link>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  homeBlogItem: state.homeBlogItem
})
const mapDispatchToProps = dispacth => ({
  fetchHomeBlogs: () => dispacth( fetchHomeBlogs() )
})

Blogs = connect(mapStateToProps, mapDispatchToProps)(Blogs)

export default Blogs;