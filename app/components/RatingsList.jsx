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
      <section id="ratings-list" className="col s12 m10 offset-m1 l7 offset-l4">
        <h2 className="center">How was it?</h2>
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
