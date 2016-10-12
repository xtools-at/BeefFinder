import React from 'react';
import * as Redux from 'react-redux';

export var TagCategories = React.createClass({

	render() {
	  	var {categories} = this.props;

	  	var tags = categories.map((cat, index) =>{
	  		return (
				<span key={index} className="chip"><i className="material-icons chip-icon">restaurant_menu</i>{cat}</span>
			);
	  	});

	  	return (
	  		<span>
	  			{tags}
	  		</span>
	  	);
  	}
});

export default Redux.connect()(TagCategories);