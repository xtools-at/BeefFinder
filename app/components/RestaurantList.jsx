import React from 'react';
import * as Redux from 'react-redux';

import RestaurantListItem from 'RestaurantListItem';

export var RestaurantList = React.createClass({
  render() {
    var {restaurants, storage} = this.props;
    var renderRestaurants = () => {

      if (restaurants.length === 0) {
        return (
          <div className="preloader-wrapper big active">
	          <div className="spinner-layer">
	            <div className="circle-clipper left">
	              <div className="circle"></div>
	             </div><div className="gap-patch">
	              <div className="circle"></div>
	            </div><div className="circle-clipper right">
	              <div className="circle"></div>
	            </div>
	          </div>
	        </div>
        );
      }

      return restaurants.map((restaurant, index) => {
        return (
          <RestaurantListItem key={index} index={index} userLat={storage.userLat} userLng={storage.userLng} {...restaurant}/>
        );
      });
    };

    return (
      <div id="event-list">
        <h1 className="center">Best Beef in Vienna</h1>
        <p className="center">You should check these out!</p>
        {renderRestaurants()}
      </div>
    )
  }
});

export default Redux.connect(
  (state) => {
    return {
      restaurants: state.restaurants,
      storage: state.storage
    };
  }
)(RestaurantList);
