import React from 'react';
import { connect } from 'react-redux';
import { getPopup } from '../../redux/actions';

const Popup = ({ head, showPopup, ...props }) => {

  // console.log(props);
  // let { head } = props;

  let { closePopup } = props;

  return(
    <div className={`popup__full${showPopup ? ' -show' : ' -hide' }` }
      onClick={(e) => closePopup(e)}
    >
      <div className="popup__box">
        <div className="popup__head">
          <h3>Your {head}</h3>
          <span className="close" onClick={() => closePopup()}><i className="fal fa-times"></i></span>
        </div>
        <div className="popup__content">
          {props.children}
        </div>
      </div>
    </div>
  )
}

const mapState = state => {
  return{
    popupName: state.popupName,
  }
}

const mapDispatch = dispatch => {
  return{
    closePopup: (e) => {
      if(!!e && e.target === e.currentTarget){
        dispatch( getPopup( null ) )
      } 
      else if ( !(!!e) ){
        dispatch( getPopup( null ) )
      }
    }
  }
}

export default connect(mapState, mapDispatch) (Popup);