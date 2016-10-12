import React from 'react';
import * as Redux from 'react-redux';

export var TagDistance = React.createClass({

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
	  	var {address, userLat, userLng} = this.props;
		//console.log("Event LatLng:",lat, lng, userLat, userLng);
		if (typeof address.lat != 'undefined' && typeof address.lng != 'undefined' && address.lat != '' && address.lng != ''){
			var distance = this.calculateDistanceInKm(address.lat, address.lng, userLat, userLng);
			if (distance !== distance){
				//value is NaN
				return;
			}
			//change some inproper values
			if (distance < 1){
				distance = "< 1";
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
  
});

export default Redux.connect()(TagDistance);