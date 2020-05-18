import React from 'react';


export const Banner = ({background, title}) => {
  return(
    <div className="banner" style={{background: `url(${background})`}}>
      <div className="container">
        <h1>{title}</h1>
      </div>
    </div>
  )
}

export default Banner;