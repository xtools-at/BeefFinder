import React from 'react';
import * as Redux from 'react-redux';
import ReactDOM from 'react-dom';

import moment from 'moment';

import * as actions from 'actions';
import StarsRating from 'StarsRating';
import Helper from 'Helper';

export var RatingsHeader = React.createClass({

	componentWillUnmount() {
		var {dispatch} = this.props;
		dispatch(actions.setCheckedRadio(0));
	},
	
	showAddReview(show){
		var {dispatch} = this.props;
    dispatch(actions.showModal(show));

    if (show) {
    	//TODO: handle focus, catch focus,...
    } else {
    	//refocus button
    	$('#show-add-review').focus();
    }
	},

	sendReview(ev) {
		ev.preventDefault();

    if (ReactDOM.findDOMNode(this.refs.add_review_form).checkValidity()) {

      var {dispatch} = this.props;

      var rating = this.props.storage.checkedRadio;
      var name = this.refs.review_name.value;
      var comment = this.refs.review_text.value;
      var reference = this.props.reference;
      var date = moment().format('YYYY-MM-DD');

      dispatch(actions.startAddReview(rating, name, comment, reference, date));
      this.showAddReview(false);

    } else {
      Helper.toast('Something is wrong up there, please check your Input!');
    }
	},

	radioChecked(ev) {
		var {dispatch} = this.props;
		dispatch(actions.setCheckedRadio(parseInt(ev.target.value)));
	},

	onValidate(ev) {
	   	ev.target.checkValidity();
	},

	render() {
		var {avg, count} = this.props;
		avg = avg.toFixed(2);

		function showRatingsHistogram(){

			var explodeRatings = [5,4,3,2,1];
			var weightsRatings = [0.55, 0.25, 0.05, 0.10, 0.05];
			var parsedRatings = [];

			explodeRatings.map((number, index)=>{
				var ratingAbs = Math.round(count * weightsRatings[index]).toFixed(0);

				var ratingLine = {
					num: number,
					count: ratingAbs,
					width : {width : (weightsRatings[index] / weightsRatings[0] * 100 + "%")}
				};
				parsedRatings.push(ratingLine);
			});
			return parsedRatings.map((rating, index) => {
				return (
					<div className="rating-bar-container" key={index}>
		    			<span className="bar-label"><i className="material-icons">star</i>{rating.num}</span>
		    			<span className={`bar r${rating.num}`} style={rating.width}></span>
		    			<span className="bar-number" aria-label={`${rating.count} ${rating.num}-star ratings`}>{rating.count}</span>
			    	</div>
				);
			});
		}


		var renderModal;
		if (!this.props.storage.showModal) {
			renderModal = '';
		} else {
			renderModal = (
				<div>
					<div id="modal-container" aria-live="assertive" className="modal bottom-sheet open">
						<form className="row" autoComplete="on" ref="add_review_form">
							<div className="modal-content">
								<h4 tabIndex="-1">Add Review</h4>
								 
								<div className="">
									  <input name="stars" type="radio" id="star1" value="1" onChange={this.radioChecked} required className="validate" />
      							<label className="sr-only" htmlFor="star1" data-error="Please choose a Rating">1 Star</label>

      							<input name="stars" type="radio" id="star2" value="2" onChange={this.radioChecked} />
      							<label className="sr-only" htmlFor="star2">2 Stars</label>

      							<input name="stars" type="radio" id="star3" value="3" onChange={this.radioChecked} />
      							<label className="sr-only" htmlFor="star3">3 Stars</label>

      							<input name="stars" type="radio" id="star4" value="4" onChange={this.radioChecked} />
      							<label className="sr-only" htmlFor="star4">4 Stars</label>

      							<input name="stars" type="radio" id="star5" value="5" onChange={this.radioChecked} />
      							<label className="sr-only" htmlFor="star5">5 Stars</label>
								</div>


								<div className="input-field col s12">
				            <input type="text" 
				              className="validate" 
				              onBlur={this.onValidate} 
				              placeholder="Guybrush Threepwood or Frank-the-Tank" 
				              id="review_name" 
				              ref="review_name" 
				              name="name" 
				              autoComplete="name"
				              autoFocus="true" 
				              pattern="^.{3,}$"
				              required/>
				          <label htmlFor="review_name" className="active" data-error="Please enter at least 3 Characters">Your Name</label>
				        </div>

			          <div className="input-field col s12">
			            <textarea id="review_text" 
			            	className="materialize-textarea"
			            	ref="review_text"
			            	placeholder="Best Beef in Town!"
			            	name="review">
			            </textarea>
			            <label htmlFor="review_text" className="active">Your Review (optional)</label>
			        	</div>

							</div>
							<div className="modal-footer">
			      		<button className="waves-effect waves-red btn-flat" type="submit" name="action" onClick={this.sendReview}>
			      			Send
			      			<i className="material-icons right">send</i>
			      		</button>
			      		<button className="sr-only sr-only-focusable modal-close waves-effect waves-red btn-flat" onClick={() => {this.showAddReview(false)}}>Close</button>
			    		</div>
		    		</form>
		    	</div>

		    	<div className="lean-overlay open" id="lean-overlay" onClick={() => {this.showAddReview(false)}}></div>
	    	</div>
			);
		}

	  return (
	    	<section id="restaurant-ratings" className="">

		    	<div className="col s12 m6 l4 offset-l1 center">
		    		<div className="">{avg}</div>
				    <div className="stars-rating stars-rating-small center">
				    	<StarsRating avg={avg} />
				    </div>
				    <div className="">
						<span><i className="material-icons">supervisor_account</i>{count} ratings</span>
				    </div>
				    <div>
				    	<button id="show-add-review" className="waves-effect waves-red btn-flat" onClick={() => {this.showAddReview(true)}}>Add Review</button>
				    </div>
			    </div>

			    <div className="col s12 m5 offset-m1 l4 offset-l2">
			    	<div className="rating-histogram">
			    		{showRatingsHistogram()}
			    	</div>
			    </div>

			    <div className="clearfix"></div>
			    {renderModal}
			</section>
	  );
	}
});

export default Redux.connect(
  (state) => {
    return {
      storage: state.storage
    };
  }
)(RatingsHeader);