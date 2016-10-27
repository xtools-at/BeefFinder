import React from 'react';
import * as Redux from 'react-redux';
import firebase from 'app/firebase/';
import sideNav from 'materialize-css/dist/js/materialize.min';
//import material_select from 'materialize-css/dist/js/materialize.min';

import {Filter} from 'Helper';

import * as actions from 'actions';

export var Header = React.createClass({
	componentDidMount() {
      //init sideNav
    	$(".button-collapse").sideNav();
      //$('select').material_select();
	},

	onLogout(ev){
		ev.preventDefault();
		this.hideNav();
	    var {dispatch} = this.props;
	    dispatch(actions.startLogout());
  	},

  	hideNav(){
  		$(".button-collapse").sideNav('hide');
  	},

    render() {

      return (
        <header className="navbar-fixed">
         	<nav>
			    <div className="nav-wrapper">
		      	<a href="#/" className="brand-logo"><i className="material-icons">restaurant</i>BeefFinder</a>
		      	<a data-activates="nav" className="button-collapse" tabIndex="-1"><i className="material-icons">menu</i><span className="sr-only">Toggle Menu</span></a>
            <a className="nav-back left hide hide-on-large-only" onClick={()=>{window.history.go(-1)}}><i className="material-icons">keyboard_arrow_left</i><span className="sr-only">Go Back</span></a>
			  		<ul className="right">
			        	<li><a className="waves-effect" title="Fork on Github" href="https://github.com/xtools-at/BeefFinder" target="_blank">
			        		<i className="material-icons left">code</i>
			        		<span className="hide-on-med-and-down">Fork on Github</span>
			        	</a></li>
			      	</ul>
			  			<ul id="nav" className="side-nav">
				  			<li className="hide-on-large-only">
                  <div className="userView center">
							      <img className="background" src="/images/bg_nav.png" />
							      <i className="material-icons">restaurant_menu</i>
							      <span className="white-text name">Menu</span>
							     </div>
                </li>
                <li className="">
                  <label htmlFor="select-sorting" className="subheader a"><i className="material-icons left">sort</i>Sort Restaurants</label>
                  <select id="select-sorting" className="browser-default a waves-effect" defaultValue="1">
                    <option value="1">Best Rated</option>
                    <option value="2">Most Rated</option>
                    <option value="3">Cheapest</option>
                    <option value="4">Most Expensive</option>
                    <option value="5">Secret Algorithm</option>
                  </select>
                </li>
                <li><div className="divider"></div></li>
                <li className="">
                  <h3 className="subheader a"><i className="material-icons left">filter_list</i>Filter Restaurants by Category</h3>
                  <div className="clearfix"></div>
                  <div className="switch waves-effect">
                    <label htmlFor="switch-steak">
                      <input id="switch-steak" type="checkbox"></input>
                      <span className="lever"></span>
                      Steak
                    </label>
                  </div>
                  <div className="switch waves-effect">
                    <label htmlFor="switch-burgers">
                      <input id="switch-burgers" type="checkbox"></input>
                      <span className="lever"></span>
                      Burgers
                    </label>
                  </div>
                  <div className="switch waves-effect">
                    <label htmlFor="switch-grill">
                      <input id="switch-grill" type="checkbox"></input>
                      <span className="lever"></span>
                      Grill
                    </label>
                  </div>
                </li>
                <li><div className="divider"></div></li>
                <li className="">
                  <h3 className="subheader a"><i className="material-icons left">euro_symbol</i>Filter Restaurants by Price</h3>
                  <div className="clearfix"></div>
                  <div className="switch waves-effect">
                    <label htmlFor="switch-price1">
                      <input id="switch-price1" type="checkbox"></input>
                      <span className="lever"></span>
                      Cheap
                    </label>
                  </div>
                  <div className="switch waves-effect">
                    <label htmlFor="switch-price2">
                      <input id="switch-price2" type="checkbox"></input>
                      <span className="lever"></span>
                      Moderate
                    </label>
                  </div>
                  <div className="switch waves-effect">
                    <label htmlFor="switch-price3">
                      <input id="switch-price3" type="checkbox"></input>
                      <span className="lever"></span>
                      Expensive
                    </label>
                  </div>
                </li>
                <li><div className="divider"></div></li>
                <li><a className="waves-effect" href="https://github.com/xtools-at/BeefFinder" target="_blank"><i className="material-icons">code</i>Fork on Github</a></li>
              </ul>
			    </div>
		  	</nav>
      </header>
    );
  }
});

export default Redux.connect(
    (state) => {
    return state;
  }
)(Header);