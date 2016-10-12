import React from 'react';
import * as Redux from 'react-redux';
import moment from 'moment';

import * as actions from 'actions';
import StarsRating from 'StarsRating';
import Tags from 'Tags';
import TagDistance from 'TagDistance';

export var RestaurantListItem = React.createClass({
	onItemClick(){
		var {dispatch, id} = this.props;
		dispatch(actions.setActiveEvent(id));
	},

	render() {

	  	var {id, title, tel, priceLevel, categories, address, hours, rating, userLat, userLng, index} = this.props;

	    return (
		    <div className="card horizontal" id={id} onClick={this.onItemClick}>
		      <div className="card-image">
		        <img src={"https://loremflickr.com/200/350/steak,food,meat/all?random="+index} alt="" />
		      </div>
		      <div className="card-stacked">
		        <div className="card-content">
		        	<h2>
		        		<a href={`#/restaurant?r=&{id}`} className="card-title" title={`Open Details for {title}`}><span>{title}</span></a>
		        	</h2>
		        	<StarsRating avg={rating.avg} count={rating.count} />
		        	<Tags categories={categories} address={address} userLat={userLat} userLng={userLng} priceLevel={priceLevel} />
		        	<ul className="collection">
					    <li className="collection-item">
					    	<i className="material-icons">location_on</i>
					    	<a href={`https://www.google.com/maps?q=${address.lat},${address.lng}`} target="_blank" title={`View ${title} on GoogleMaps`}>{address.street}, {address.zip}</a>
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