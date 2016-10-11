import React from 'react';
import * as Redux from 'react-redux';
import axios from 'axios';

import actions from 'actions';

import Header from 'Header';
import Footer from 'Footer';

export var Main = React.createClass({

	componentDidMount() {
			//fetch user location
			var {dispatch} = this.props;
	    	var coords = axios.get('http://ipinfo.io').then((res) => {
	    	  //console.log(res.data);
		      if (res.data.loc){
		        try{
		          var latLngArray = res.data.loc.split(',');

		          dispatch(
		          	{
					    type: 'STORE_LOCATION',
					    userLat: latLngArray[0],
					    userLng: latLngArray[1]
					 }
		          );
		        } catch (e){
		          //console.log(e);
		        }
		      }
	   		})
	},

	
    render() {
        return (
           	<div className="row overall-container">
           		<Header />
           		<main className="col s12 m10 offset-m1 l7 offset-l4">
           			{this.props.children}
           		</main>
           		<div className="clearfix"></div>
        		<Footer />
      		</div>
        );
    }
});

export default Redux.connect()(Main);