import React from 'react';
import * as Redux from 'react-redux';

export var StarsRating = React.createClass({
	

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

	    return (
		    <div className="">
		    	{showStars()}
		    	<span className="chip"><i className="material-icons chip-icon">supervisor_account</i> {count}</span>
		    </div>
	    )
	}
});

export default Redux.connect()(StarsRating);