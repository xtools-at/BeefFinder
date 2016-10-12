import React from 'react';
import * as Redux from 'react-redux';
import firebase from 'app/firebase/';
import sideNav from 'materialize-css/dist/js/materialize.min';
//import ExecutionEnvironment from 'react/lib/ExecutionEnvironment';
//import {hashHistory} from 'react-router';

import * as actions from 'actions';

export var Header = React.createClass({
	componentDidMount() {
      //init sideNav
    	$(".button-collapse").sideNav();
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
  	toggleMap(ev){
  		ev.preventDefault();
  		var {dispatch} = this.props;
  		dispatch(actions.toggleMap());
  	},
  	untoggleMap(){
        var {dispatch} = this.props;
        dispatch(
            {
                type: 'SET_TOGGLE_MAP',
                toggleMap: false
            }
        );
    },
    render() {
    	var user = firebase.auth().currentUser;
    	var {toggleMap} = this.props.storage;
    	
    	var navIconActive ='';
    	if (toggleMap){
    		//show Map on Mobile -> set Icon to active
    		navIconActive="active"
    	}

      return (
        <header className="navbar-fixed">
         	<nav>
			    <div className="nav-wrapper">
		      	<a href="#/" className="brand-logo"><i className="material-icons">restaurant</i>BeefFinder</a>
		      	<a data-activates="nav" className="button-collapse"><i className="material-icons">menu</i></a>
				  		<ul className="right">
				        	<li><a className="waves-effect" href="https://github.com/xtools-at/BeefFinder" target="_blank">
				        		<i className="material-icons left">code</i>
				        		<span className="hide-on-med-and-down">Fork on Github</span>
				        	</a></li>
				      	</ul>
			  			<ul id="nav" className="side-nav">
				  			<li className="hide-on-large-only"><div className="userView center">
							      <img className="background" src="/images/bg_nav.png" />
							      <i className="material-icons">restaurant_menu</i>
							      <span className="white-text name">Menu</span>
							</div></li>
						    <li><a className="waves-effect" href="#/login" onClick={self.hideNav}><i className="material-icons">account_circle</i>Login</a></li>
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