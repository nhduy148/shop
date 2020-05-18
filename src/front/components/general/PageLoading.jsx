import React from 'react';
import loadImg from '../../../assets/image/common/loading3.gif';

export default function PageLoading({...props}) {
  let { loading } = props;
  return(
    <div className={`loading ${loading ? '' : 'not-loading'}`}>
      <img src={loadImg} alt="" />
    </div>    
  )
}