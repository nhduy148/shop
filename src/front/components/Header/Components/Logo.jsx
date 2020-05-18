import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../../assets/image/common/logo_white.png';


export default function Logo() {
  return(
    <div className="logo">
      <h1 title="Homepage">
        <Link to='/'>
          <img src={logo} alt="SpaceD"/>
        </Link>
      </h1>
    </div>
  )
}