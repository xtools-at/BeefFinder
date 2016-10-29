import React from 'react';
import * as Redux from 'react-redux';

import moment from 'moment';
import * as actions from 'actions';

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
    console.log('debug',query);
    if (query && query.length > 0) {
      dispatch(actions.startGetRatings(query));
    }


    $('h1').focus();
    $('#nav, .button-collapse').addClass('hide');
    $('.nav-back').removeClass('hide');


    $('.collapsible').collapsible({
      accordion : false
    });
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

      //show opening hours
      var renderHours = () => {
        //TODO: sort by weekdays in DB

        return hours.map((hour, index) => {
          //hour = {day: "Mon", from: "12:00", to: "21:00"}

          //highlight today in list
          var addClass = "";
          var openOrClosed = '';

          if (moment().format('ddd') == hour.day) {
            addClass = " active";

            
            var from = ""+moment().format('YYYY-MM-DD')+"T"+hour.from;
            var to = ""+moment().format('YYYY-MM-DD')+"T"+hour.to;

            //correct glitch with closings after 00:00
            if (hour.to.startsWith('0')){
              var h = parseInt(hour.to.split(':')[0]);
              if (h <= 4) {
                //restaurant closes after 00:00
                to = ""+moment().add(1, 'd').format('YYYY-MM-DD')+"T"+hour.to;
              }
            }

            console.log('hour: ',from, to);
            
            if (moment(from).isBefore(moment()) && moment().isBefore(moment(to))) {
              //it's open!
              openOrClosed = (
                <span className="hours open"> Open Now!</span>
              );
            } else {
              openOrClosed = (
                <span className="hours closed"> Closed</span>
              );
            }
          }


          //fix display "closed - closed"
          var hourItem;
          if (hour.from != 'closed') {
            hourItem = <span>{`${hour.day}:  ${hour.from} - ${hour.to}`}</span>
          } else {
            hourItem = <span>{`${hour.day}:  Closed`}</span>
          }

          return (
            <li className={"collection-item"+addClass} key={index}>
              {hourItem}
              {openOrClosed}
            </li>
          );
        });

      }



      //show opening header
      var renderHoursHeading = () => {

        return hours.map((hour, index) => {
          //hour = {day: "Mon", from: "12:00", to: "21:00"}

          var openOrClosed = '';

          if (moment().format('ddd') == hour.day) {

            
            var from = ""+moment().format('YYYY-MM-DD')+"T"+hour.from;
            var to = ""+moment().format('YYYY-MM-DD')+"T"+hour.to;

            //correct glitch with closings after 00:00
            if (hour.to.startsWith('0')){
              var h = parseInt(hour.to.split(':')[0]);
              if (h <= 4) {
                //restaurant closes after 00:00
                to = ""+moment().add(1, 'd').format('YYYY-MM-DD')+"T"+hour.to;
              }
            }

            if (hour.from != 'closed') {
              if (moment(from).isBefore(moment()) && moment().isBefore(moment(to))) {
                //it's open!
                openOrClosed = (
                  <span className="hours open"> Open Now until {hour.to}</span>
                );
              } else {
                openOrClosed = (
                  <span className="hours closed"> Closed until {hour.from}</span>
                );
              }
            } else {
                openOrClosed = (
                  <span className="hours closed"> Closed Today</span>
                );
            }
          }

          return openOrClosed;
        });

      }

      //if we've got restaurants
      return (
        <div id="restaurant-detail" className="col s12 m10 offset-m1 l10 offset-l1">
          <section className="card horizontal" id={id}>
            <div className="card-image">
              <img src={`https://loremflickr.com/360/250/steak,food,meat/all?random=${id}`} alt="" />
            </div>
            <div className="card-stacked">
              <div className="card-content">
                <h1 tabIndex="-1">
                 <span>{title}</span>
                </h1>
                <div className="stars-rating">
                  <StarsRating avg={rating.avg}/>
                  <span className="chip"><i className="material-icons chip-icon">supervisor_account</i>{rating.count}</span>
                </div>
                <div className="">
                  <TagCategories categories={categories} />
                  <TagPrice priceLevel={priceLevel} />
                </div>

              <ul className="collection collapsible">
                <li className="collection-item collapsible-header">
                  <i className="material-icons">location_on</i>
                  <a href={`https://www.google.com/maps?q=${encodeURIComponent(title)}&near=${address.lat},${address.lng}`} target="_blank" title={`View ${title} on GoogleMaps`}>{address.street}, {address.zip}</a>
                  <TagDistance address={address} userLat={storage.userLat} userLng={storage.userLng} />
                </li>
                <li className="collection-item collapsible-header">
                  <i className="material-icons">phone</i>
                  <a href={`tel:${tel.replace(/ /g,'')}`} target="_blank" title={`Call ${title}`}>{tel}</a>
                </li>
                <li className="">
                  <a className="collapsible-header collection-item" aria-controls="hours-container" >
                    <i className="material-icons">access_time</i>
                    {renderHoursHeading()}
                  </a>
                  <div id="hours-container" className="collapsible-body" aria-live="polite">
                    <ul className="collection hours">
                      {renderHours()}
                    </ul>
                  </div>
                </li>
              </ul>

              <div className="">{description}</div>
              </div>
            </div>
          </section>
          <RatingsHeader avg={rating.avg} count={rating.count} reference={id} />
          <RatingsList />
        </div>
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
