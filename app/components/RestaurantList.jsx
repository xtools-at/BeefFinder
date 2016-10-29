import React from 'react';
import * as Redux from 'react-redux';

import {Filter} from 'Helper';
import RestaurantListItem from 'RestaurantListItem';
import Preloader from 'Preloader';

export var RestaurantList = React.createClass({
  componentDidMount() {
      $('h1').focus();  
  },
  render() {
    var {restaurants, storage, filter} = this.props;
    
    var renderRestaurants = () => {

      if (restaurants.length === 0) {
        return (
          <Preloader />
        );
      }

      //filter the list
      var filteredRestaurants = Filter.filterRestaurants(restaurants, filter.filters, filter.sortBy);
      return filteredRestaurants.map((restaurant, index) => {
        return (
          <RestaurantListItem key={index} index={index} userLat={storage.userLat} userLng={storage.userLng} {...restaurant}/>
        );
      });
    };

    return (
      <section id="restaurant-list" className="col s12 m10 offset-m1 l7 offset-l4">
        <h1 className="center" tabIndex="-1">Best Beef in Vienna</h1>
        <p className="center">You should check these out!</p>
        {renderRestaurants()}
      </section>
    )
  }
});

export default Redux.connect(
  (state) => {
    return state;
  }
)(RestaurantList);
