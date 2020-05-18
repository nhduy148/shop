import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Nav extends Component{
  render(){
    return(
      <nav className="nav-link">
        <ul>            
          <li><Link to='/'>Home</Link></li>
          {/* <li><Link to='/category/mobile'>Mobile</Link></li>
          <li><Link to='/category/laptop'>Laptop</Link></li>
          // <li><Link to='/category/tablet'>Tablet</Link></li> */}
          <li><Link to='/products'>Products</Link></li>
          <li><Link to='/blogs'>Blogs</Link></li>
          <li><Link to='/schedule'>About</Link></li>
        </ul>
      </nav>
    )
  }
}