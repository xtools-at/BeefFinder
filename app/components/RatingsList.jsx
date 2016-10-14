import React from 'react';
import * as Redux from 'react-redux';

import RatingsListItem from 'RatingsListItem';
import Preloader from 'Preloader';

export var RatingsList = React.createClass({
  render() {
    var {ratings} = this.props;
    var renderRatings = () => {

      if (ratings.length === 0) {
        return (
          <Preloader />
        );
      }

      return ratings.map((rating, index) => {
        return (
          <RatingsListItem key={index} index={index} {...rating}/>
        );
      });
    };

    return (
      <section id="ratings-list" className="">
        {renderRatings()}
      </section>
    )
  }
});

export default Redux.connect(
  (state) => {
    return {
      ratings : state.ratings
    };
  }
)(RatingsList);
