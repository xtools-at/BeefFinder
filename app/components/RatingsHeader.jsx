import React from 'react';
import * as Redux from 'react-redux';

import StarsRating from 'StarsRating';

export var RatingsHeader = React.createClass({
	

	render() {
		var {avg, count} = this.props;
		avg = avg.toFixed(2);

		function showRatingsHistogram(){

			var explodeRatings = [5,4,3,2,1];
			var weightsRatings = [0.55, 0.25, 0.05, 0.10, 0.05];
			var parsedRatings = [];

			explodeRatings.map((number, index)=>{
				var ratingAbs = Math.round(count * weightsRatings[index]).toFixed(0);

				var ratingLine = {
					num: number,
					count: ratingAbs,
					width : {width : (weightsRatings[index] / weightsRatings[0] * 100 + "%")}
				};
				parsedRatings.push(ratingLine);
			});
			return parsedRatings.map((rating, index) => {
				return (
					<div className="rating-bar-container" key={index}>
		    			<span className="bar-label"><i className="material-icons">star</i>{rating.num}</span>
		    			<span className={`bar r${rating.num}`} style={rating.width}></span>
		    			<span className="bar-number" aria-label={`${rating.count} ${rating.num}-star ratings`}>{rating.count}</span>
			    	</div>
				);
			});
		}

	    return (
	    	<section id="restaurant-ratings" className="">

		    	<div className="col s12 m6 l4 offset-l2 center">
		    		<div className="">{avg}</div>
				    <div className="stars-rating stars-rating-small center">
				    	<StarsRating avg={avg} />
				    </div>
				    <div className="">
						<span><i className="material-icons">supervisor_account</i>{count} ratings</span>
				    </div>
			    </div>

			    <div className="col s12 m5 offset-m1 l4 offset-l1">
			    	<div className="rating-histogram">
			    		{showRatingsHistogram()}
			    	</div>
			    </div>

			    <div className="clearfix"></div>

			</section>
	    )
	}
});

export default Redux.connect()(RatingsHeader);