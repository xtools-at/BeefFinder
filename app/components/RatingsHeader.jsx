import React from 'react';
import * as Redux from 'react-redux';

export var RatingsHeader = React.createClass({
	

	render() {
		var {avg, count} = this.props;

		function showStars(){
			
			var starsElement = [];
			var remainder = avg % 1;
			var blankStarsCount = 5 - (avg - remainder);

			//console.log('debug',avg, blankStarsCount, remainder, count);
			
			for (var i=1; i <= avg; i++) {
				starsElement.push("star");
			}

			if (remainder >= 0.5) {
				//e.g. 4.7
				starsElement.push("star_half");
				blankStarsCount--;
			}

			for (var i=1;i <= blankStarsCount;i++) {
				starsElement.push("star_border");
			}

			return starsElement.map((icon, index) => {
				return <i key={index} className="material-icons">{icon}</i>;
			});
		}

		function showRatingsHistogram(){

			//TODO
			var explodeRatings = [5,4,3,2,1];
			var parsedRatings = [];

			explodeRatings.map((rating, index)=>{
				//this is shit
				var ratingPercent = Math.round(rating / 1.5 / 10).toFixed(0);
				var ratingLine = {
					num: rating,
					count: ratingPercent,
					width : {width : ((ratingPercent * rating / 5) + "%")},

				};
				parsedRatings.push(ratingLine);
			});
			return parsedRatings.map((rating) => {
				return (
					<div class="rating-bar-container">
		    			<span class="bar-label"><i className="material-icons">star</i>{rating.num}</span>
		    			<span class={`bar r${rating.num}`} style={rating.width}></span>
		    			<span class="bar-number" aria-label={`${count} ${id}* ratings`}>{count}</span>
			    	</div>
				);
			});



		}

	    return (
	    	<div id="restaurant-ratings" className="row">

		    	<div className="col s12 m6 l6">
		    		<div className="">{avg}</div>
				    <div className="valign-wrapper stars-rating stars-rating-small">
				    	{showStars()}
				    </div>
				    <div className="">
						<span><i className="material-icons">supervisor_account</i>{count} ratings</span>
				    </div>
			    </div>

			    <div className="col s12 m6 l6">
			    	<div class="rating-histogram">
			    		{showRatingsHistogram()}
			    	</div>
			    </div>

			</div>
	    )
	}
});

export default Redux.connect()(RatingsHeader);