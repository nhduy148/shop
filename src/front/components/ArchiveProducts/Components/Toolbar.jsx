import React from 'react';

const Toolbar = ({...props}) => {
  let { /*limit, numberOfProducts, */newLimit, total , disabledSelectLimit, tagPrice, tagBrand, filterPrice, filterBrand} = props;
  tagPrice = !!tagPrice ? tagPrice.replace('From ', '') : tagPrice;
  tagPrice = !!tagPrice ? tagPrice.replace('Under ', '< ') : tagPrice;
  tagPrice = !!tagPrice ? tagPrice.replace('Over ', '> ') : tagPrice;

  let { changeViewMode } = props;

  return(
    <div className="toolbar">
      <div className="toolbar__tag">
        {!!tagBrand ? <span className="tag">{tagBrand}<i className="fal fa-times" onClick={ e => filterBrand(e, null, null)}></i></span> : null}
        {!!tagPrice ? <span className="tag">{tagPrice}<i className="fal fa-times" onClick={ e => filterPrice(e, null, null)} ></i></span> : null}
      </div>
      <div className="toolbar__item">
        {/* <select name="show-item" id="show-item" 
          defaultValue={limit}
          onChange={(e) => numberOfProducts(e)}
          style={{display: disabledSelectLimit ? "none" : "block"}}
        >
          <option value="9">Show 9</option>
          <option value="12">Show 12</option>
          <option value="15">Show 15</option>
          <option value="18">Show 18</option>
        </select> */}
        <div className="show">
          <p style={{display: !disabledSelectLimit ? "block" : "none"}}>Show {newLimit}</p>
          <p> of {total} {newLimit === 1 ? 'item' : 'items'}</p>
        </div>
        <div className="view">
          <span className="list" onClick={e => changeViewMode(e)}><i className="fas fa-th-list"></i></span>
          <span className="grid" onClick = {e => changeViewMode(e)}><i className="fas fa-th-large"></i></span>
        </div>
      </div>
    </div>
  )
}

export default Toolbar;