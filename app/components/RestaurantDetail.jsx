import React from 'react';
import * as Redux from 'react-redux';

import actions from 'actions';

import Preloader from 'Preloader';
import StarsRating from 'StarsRating';
import TagPrice from 'TagPrice';
import TagCategories from 'TagCategories';
import TagDistance from 'TagDistance';
import RatingsHeader from 'RatingsHeader';
import RatingsList from 'RatingsList';


export var RestaurantDetail = React.createClass({
  componentDidMount() {

    //get Ratings
    var {dispatch} = this.props;
    var query = this.props.location.query.r;
    if (query && query.length > 0) {
      dispatch(actions.startGetRatings(query));
    }


    $('h1').focus();
    $('#nav, .button-collapse').addClass('hide');
    $('.nav-back').removeClass('hide');

  },
  componentWillUnmount() {

    var {dispatch} = this.props;
    dispatch(actions.clearRatings());

    $('#nav, .button-collapse').removeClass('hide');
    $('.nav-back').addClass('hide');
  },

  render() {
    var {restaurants, storage} = this.props;
    
    var renderRestaurant = () => {
      if (restaurants.length === 0) {
        return (
          <Preloader />
        );
      }

      //get restaurant from id in query [url?r=ID]
      var query = this.props.location.query.r;
      //console.log('query-param',query);

      if (query && query.length > 0) {
        var restaurantArray = [];
        //extract from restaurants-array in store
        restaurants.map((restaurant, index)=>{
          //console.log('restaurant object',restaurant.id, query);
          if (restaurant.id == query){
            //console.log('hit restaurant object',restaurant.id, query);
            restaurantArray.push(restaurant);
          }
        });

        var queriedRestaurant = restaurantArray[0];

        //get restaurant's values for big return
        //console.log('queried restaurant object', queriedRestaurant, restaurantArray);
        var {id, title, tel, priceLevel, categories, address, hours, rating, description} = queriedRestaurant;
      } else {
        //no restaurant queried
        return (
          <h1>not found</h1>
        );
      }

      //if we've got restaurants
      return (
        <section id="restaurant-detail" className="col s12 m10 offset-m1 l10 offset-l1">
          <div className="card horizontal" id={id}>
            <div className="card-image">
              <img src="https://loremflickr.com/360/250/steak,food,meat/all" alt="" />
            </div>
            <div className="card-stacked">
              <div className="card-content">
                <h1 tabindex="-1">
                 <span>{title}</span>
                </h1>
                <div>
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
                  <TagDistance address={address} userLat={storage.userLat} userLng={storage.userLng} />
                </li>
                <li className="collection-item">
                  <i className="material-icons">phone</i>
                  <a href={`tel:${tel.replace(/ /g,'')}`} target="_blank" title={`Call ${title}`}>{tel}</a>
                </li>
              </ul>
              <div className="">{description}</div>
              </div>
            </div>
          </div>
          <div className="card horizontal">
            <RatingsHeader avg={rating.avg} count={rating.count} />
            <RatingsList />
          </div>
        </section>
      );
    };

    return (
        <div>{renderRestaurant()}</div>
    )
  }
});

export default Redux.connect(
  (state) => {return state;}
)(RestaurantDetail);
