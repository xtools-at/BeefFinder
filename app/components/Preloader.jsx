import React from 'react';
import * as Redux from 'react-redux';

export var Preloader = React.createClass({

	render() {
  		return (
  			<div className="preloader-container">
				<div className={`preloader-wrapper big active ${this.props.additionalClass}`}>
		          <div className="spinner-layer">
		            <div className="circle-clipper left">
		              <div className="circle"></div>
		            </div>
		            <div className="gap-patch">
		              <div className="circle"></div>
		            </div>
		            <div className="circle-clipper right">
		              <div className="circle"></div>
		            </div>
		          </div>
		        </div>
	        </div>
		);

  	}
});

export default Redux.connect()(Preloader);