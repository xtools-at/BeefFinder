import React from 'react';
import * as Redux from 'react-redux';
import moment from 'moment';

import StarsRating from 'StarsRating';

export var RatingsListItem = React.createClass({

	render() {

	  	var {id, name, date, rating, comment, index} = this.props;

	    return (

		    <div class="card-panel" id={id}>
	          <div class="row valign-wrapper">
	            <div class="col s3 m2">
	              <img src={`https://loremflickr.com/200/200/person,face/all?random=${key}`} alt="" class="circle responsive-img" />
	            </div>
	            <div class="col s9 m10">
	              <span class="black-text">
	                {name}
	              </span>
	              <span class="black-text">
	                {moment(date).format('@ D.MMM.\'YY');}
	              </span>
	              <StarsRating avg={rating} />
	              <span class="black-text">
	                {comment}
	              </span>
	            </div>
	          </div>
	        </div>
	    )
	  }
	});

export default Redux.connect()(RatingsListItem);