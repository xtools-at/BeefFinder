import React from 'react';
import * as Redux from 'react-redux';

export var TagPrice = React.createClass({

	render() {
	  	var {priceLevel} = this.props;

  		return (
			<span className="chip"><i className="material-icons chip-icon">euro_symbol</i>{priceLevel}</span>
		);

  	}
});

export default Redux.connect()(TagPrice);