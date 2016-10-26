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
    	var coords = axios.get('https://ipinfo.io').then((res) => {
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
   		});

    	var tabUsed = false;
   		$('body').on('keydown', function(ev) {
	        if (!tabUsed && ev.which == '9') {
	        	//tab was used
	            tabUsed = true;
	            $('body').addClass('keyboard');
	        }
    	});
	},
	
    render() {
        return (
           	<div className="row overall-container">
           		<Header />
           		<main className="">
           			{this.props.children}
           		</main>
           		<div className="clearfix"></div>
        		<Footer />
      		</div>
        );
    }
});

export default Redux.connect()(Main);