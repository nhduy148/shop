import React, { Component } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import mouse from '../../../../assets/image/home/mouse_scroll.png';
export default class MainVisual extends Component {
  render(){
    return(
      <div className="main-visual">
        <div className="main-visual__content">
          <h1>SpaceD</h1>
          <Link smooth to='#a' className="main-visual__btn" title="Shop Now">Shop Now</Link>
        </div>
        <Link smooth to='#a' className="scroll" title="Scroll Down">
          <span>&bull;&bull;&bull;&bull;&bull;</span>
          <img src={mouse} alt="Scroll Down" className="scroll__arrow" />
          <span>Scroll</span>
        </Link>
      </div>
    )
  }
}
