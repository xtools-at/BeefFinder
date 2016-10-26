import React from 'react';
import * as Redux from 'react-redux';
import moment from 'moment';

import StarsRating from 'StarsRating';

export var RatingsListItem = React.createClass({

	render() {

	  	var {id, name, date, rating, comment, index} = this.props;

	    return (

		    <div className="card-panel" id={id}>
	          <div className="">
	            <div className="col s3 m2 valign-wrapper">
	              <img src={`https://loremflickr.com/200/200/person,face/all?random=${index}`} alt="" className="circle responsive-img" />
	            </div>
	            <div className="col s9 m10">
	            	<StarsRating avg={rating} />
	              <p className="black-text clearfix">
	                {name} <span className="grey-text">
	                {moment(date).format('@ D.MMM.\'YY')}
	              	</span>
	              </p>
	              <p className="black-text">
	                {comment}
	              </p>
	            </div>
	            <div className="clearfix"></div>
	          </div>
	        </div>
	    )
	  }
	});

export default Redux.connect()(RatingsListItem);