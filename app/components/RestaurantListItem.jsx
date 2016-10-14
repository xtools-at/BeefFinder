import React from 'react';
import * as Redux from 'react-redux';
import moment from 'moment';

import * as actions from 'actions';
import StarsRating from 'StarsRating';
import TagDistance from 'TagDistance';
import TagPrice from 'TagPrice';
import TagCategories from 'TagCategories';

export var RestaurantListItem = React.createClass({
	render() {

	  	var {id, title, tel, priceLevel, categories, address, hours, rating, userLat, userLng, index} = this.props;

	    return (
		    <div className="card horizontal" id={id} onClick={this.onItemClick}>
		      <div className="card-image">
		        <img src={"https://loremflickr.com/280/360/steak,food,meat/all?random="+index} alt="" />
		      </div>
		      <div className="card-stacked">
		        <div className="card-content">
		        	<h2>
		        		<a href={`#/restaurant?r=${id}`} className="card-title" title={`Open Details for {title}`}><span>{title}</span></a>
		        	</h2>
		        	<div className="stars-rating">
	                  <StarsRating avg={rating.avg}/>
	                  <span className="chip"><i className="material-icons chip-icon">supervisor_account</i>{rating.count}</span>
	                </div>
		        	<div className="">
	                  <TagCategories categories={categories} />
	                  <TagPrice priceLevel={priceLevel} />
	                </div>
		        	<ul className="collection">
					    <li className="collection-item">
					    	<i className="material-icons">location_on</i>
					    	<a href={`https://www.google.com/maps?q=${encodeURIComponent(title)}&near=${address.lat},${address.lng}`} target="_blank" title={`View ${title} on GoogleMaps`}>{address.street}, {address.zip}</a>
					    	<TagDistance address={address} userLat={userLat} userLng={userLng} />
					    </li>
					    <li className="collection-item">
					    	<i className="material-icons">phone</i>
					    	<a href={`tel:${tel.replace(/ /g,'')}`} target="_blank" title={`Call ${title}`}>{tel}</a>
					    </li>
				    </ul>
		        </div>
		      </div>
		    </div>
	    )
	  }
	});

export default Redux.connect()(RestaurantListItem);