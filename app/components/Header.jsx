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

    filtersChanged(ev){

      //do not fiddle with select-box
      var $t = $(ev.target);
      if ($t.is('input[type="checkbox"]')){
        $t.attr('checked','false');
      }
      
      var {dispatch} = this.props;

      var sortingString = $('#select-sorting').val();
      var filtersObj = {};
      
      $('#nav input[type="checkbox"]').each(function(){
        var key = $(this).attr('id');
        var val = $(this).is(':checked');

        filtersObj[key] = val;
      });

      //console.log(sortingString, filtersObj);

      dispatch(actions.setFilters(filtersObj, sortingString));
    },

    render() {
      var { filters, sortBy } = this.props.filter;

      //console.log('props',this.props.filter);
      //console.log('filters',filters);

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
                  <label htmlFor="select-sorting" className="subheader a"><i className="material-icons left">sort</i>Sort Restaurants by</label>
                  <select id="select-sorting" className="browser-default a waves-effect" defaultValue={sortBy} onChange={this.filtersChanged}>
                    <option value="BEST">Best Rated</option>
                    <option value="MOST">Most Rated</option>
                    <option value="PRICE_ASC">Cheapest</option>
                    <option value="PRICE_DESC">Most Expensive</option>
                    <option value="ALGO">Secret Algorithm</option>
                  </select>
                </li>
                <li><div className="divider"></div></li>
                <li className="">
                  <h3 className="subheader a"><i className="material-icons left">filter_list</i>Filter Restaurants by Category</h3>
                  <div className="clearfix"></div>
                  <div className="switch waves-effect">
                    <label htmlFor="switch_steak">
                      <input id="switch_steak" type="checkbox" onChange={this.filtersChanged} checked={filters.switch_steak}></input>
                      <span className="lever"></span>
                      Steak
                    </label>
                  </div>
                  <div className="switch waves-effect">
                    <label htmlFor="switch_burgers">
                      <input id="switch_burgers" type="checkbox" onChange={this.filtersChanged} checked={filters.switch_burgers}></input>
                      <span className="lever"></span>
                      Burgers
                    </label>
                  </div>
                  <div className="switch waves-effect">
                    <label htmlFor="switch_grill">
                      <input id="switch_grill" type="checkbox" onChange={this.filtersChanged} checked={filters.switch_grill}></input>
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
                    <label htmlFor="switch_price1">
                      <input id="switch_price1" type="checkbox" onChange={this.filtersChanged} checked={filters.switch_price1}></input>
                      <span className="lever"></span>
                      Cheap
                    </label>
                  </div>
                  <div className="switch waves-effect">
                    <label htmlFor="switch_price2">
                      <input id="switch_price2" type="checkbox" onChange={this.filtersChanged} checked={filters.switch_price2}></input>
                      <span className="lever"></span>
                      Moderate
                    </label>
                  </div>
                  <div className="switch waves-effect">
                    <label htmlFor="switch_price3">
                      <input id="switch_price3" type="checkbox" onChange={this.filtersChanged} checked={filters.switch_price3}></input>
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