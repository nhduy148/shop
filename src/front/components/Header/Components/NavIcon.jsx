import React, { Component } from 'react';
import Cart from './Cart';
import Search from './Search';
import User from './User'
import Wish from './Wish'

class NavIcon extends Component{

  render(){
    return(
      <div className="nav-icon">
        <Search/>
        <Cart />
        <Wish />
        <User />
      </div>
    )
  }
}
export default NavIcon