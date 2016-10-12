import React from 'react';
import * as Redux from 'react-redux';

import TagCategories from 'TagCategories';
import TagPrice from 'TagPrice';

export var Tags = React.createClass({
	

	render() {
		var {categories, distance, priceLevel, userLat, userLng, address} = this.props;

	    return (
		    <div className="">
	    		<TagCategories categories={categories} />
	    		<TagPrice priceLevel={priceLevel} />
		    </div>
	    )
	}
});

export default Redux.connect()(Tags);