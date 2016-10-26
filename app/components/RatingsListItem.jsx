import React from 'react';
import * as Redux from 'react-redux';
import moment from 'moment';

import StarsRating from 'StarsRating';

export var RatingsListItem = React.createClass({

	render() {

	  	var {id, name, date, rating, comment, index} = this.props;

	    return (

		    <div className="card-panel" id={id}>
	          <div className="valign-wrapper">
	            <div className="col s3 m2">
	              <img src={`https://loremflickr.com/200/200/person,face/all?random=${index}`} alt="" className="circle responsive-img" />
	            </div>
	            <div className="col s9 m10">
	              <span className="black-text">
	                {name}
	              </span>
	              <span className="grey-text">
	                {moment(date).format('@ D.MMM.\'YY')}
	              </span>
	              <StarsRating avg={rating} />
	              <span className="black-text">
	                {comment}
	              </span>
	            </div>
	          </div>
	        </div>
	    )
	  }
	});

export default Redux.connect()(RatingsListItem);