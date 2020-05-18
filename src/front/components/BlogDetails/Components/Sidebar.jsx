import React, { Component } from 'react'



export default class Sidebar extends Component{
  render(){

    return(
      <div className="ar-blog__sidebar">
        <div className="block">
          <div className="coming">
            <p>Recent Posts Area</p>
          </div>
        </div>
        <div className="block">
          <div className="coming">
            <p>Related Posts Area</p>
          </div>
        </div>
        <div className="block">
          <div className="coming">
            <p>Event Area</p>
          </div>
        </div>
      </div>
    )
  }
}