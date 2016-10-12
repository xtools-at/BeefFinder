import React from 'react';
import * as Redux from 'react-redux';
import moment from 'moment';

import * as actions from 'actions';

export var RestaurantListItem = React.createClass({
	onItemClick(){
		var {dispatch, id} = this.props;
		dispatch(actions.setActiveEvent(id));
	},

	calculateDistanceInKm(lat1, lon1, lat2, lon2) {
		var R = 6371; //km
			var toRad = Math.PI / 180;
			var dLat = (lat2-lat1)*toRad;  
			var dLon = (lon2-lon1)*toRad;  
			var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
			                Math.cos(lat1*toRad) * Math.cos(lat2*toRad) * 
			                Math.sin(dLon/2) * Math.sin(dLon/2);  
			var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
			var d = R * c; 

			return(parseInt(d));
			//return Math.round(parseFloat(d)).toFixed(1);
	},

	render() {

	  	var {id, title, description, tel, priceLevel, categories, address, hours, rating, userLat, userLng, index} = this.props;

		function showLocationElement(self) {
			//console.log("Event LatLng:",lat, lng, userLat, userLng);
			if (typeof address.lat != 'undefined' && typeof address.lng != 'undefined' && address.lat != '' && address.lng != ''){
				var distance = self.calculateDistanceInKm(address.lat, address.lng, userLat, userLng);
				if (distance !== distance){
					//value is NaN
					return;
				}
				//change some inproper values
				if (distance < 1){
					distance = "less than 1";
				} else if (distance > 999){
					distance = "1000+";
				} else {
					distance = "~ " + distance;
				}

				return (
					<span className="chip"><i className="material-icons chip-icon">near_me</i>{distance}km away from you</span>
				);
			} else {
				return;
			}
		}

	    return (
		    <div className="card horizontal" id={id} onClick={this.onItemClick}>
		      <div className="card-image">
		        <img src={"https://loremflickr.com/200/380/steak,food/all?random="+index} alt="" />
		      </div>
		      <div className="card-stacked">
		        <div className="card-content">
		        	<h2>
		        		<span className="card-title">{title}</span> <span className="card-title grey-text event-host">, call {tel}</span>
		        	</h2>
		        	<div>
		        		<span className="chip"><i className="material-icons chip-icon">event_note</i>{priceLevel}, {rating.avg}, {rating.count}</span>&nbsp;
		        		{showLocationElement(this)}
		        	</div>
		        	<ul className="collection">
					    <li className="collection-item"><i className="material-icons">access_time</i>starting</li>
					    <li className="collection-item"><i className="material-icons">location_on</i>{address.street}</li>
				    </ul>
		          	<div className="event-description grey-text text-darken-2">"{description}"</div>
		        </div>
		      </div>
		    </div>
	    )
	  }
	});

export default Redux.connect()(RestaurantListItem);