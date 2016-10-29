var $ = require('jquery');

export default {
	toast: function(text) {
		var $tc = $('#toast-container');
		$tc.attr('aria-live','assertive');
		$tc.html('<div class="toast" style="touch-action: pan-y; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); top: 30px; opacity: 0;">'+text+'</div>');
		var $t = $tc.find('.toast');
		$t.animate({opacity:1, top: '0px'},500, function() {
			setTimeout(function(){
				$tc.attr('aria-live','off');
				$t.animate({opacity:0, top: '-40px'},300, function() {
					$t.remove();
				})
			},3000);
		});
	}
};

export var Filter = {
  filterRestaurants: function (restaurants, filterObj, sortBy) {
	console.log('called w/: ',restaurants, filterObj, sortBy);

    var filteredRestaurants = restaurants;

    //get relevant filters
    var categoryFilters = [];
    var priceFilters = [];

    Object.keys(filterObj).forEach((filterId) => {
    	//checks if filter is set to true
        if (filterObj[filterId]) {
        	var cleanFilterId = filterId.replace('switch_','');

        	if (cleanFilterId.startsWith('price')){
        		cleanFilterId = parseInt(cleanFilterId.replace('price',''));
        		priceFilters.push(cleanFilterId);
        	} else {
        		categoryFilters.push(cleanFilterId);
        	}
        }
        //SHOW applied Filters!
    });

    console.log('appliedFilters: ', categoryFilters, priceFilters);

    //filter categories
   	if (categoryFilters.length > 0) {
		filteredRestaurants = filteredRestaurants.filter((restaurant) => {

			//convert to lowercase
			var restaurantCategories = [];
			for (var i = 0; i < restaurant.categories.length; i++) {
				restaurantCategories.push(restaurant.categories[i].toLowerCase());
			}

			//check if categories are contained in filters
			var showRestaurant = false;
			restaurantCategories.filter((cat) => {
				//no match yet
				if (!showRestaurant) {
					showRestaurant = categoryFilters.includes(cat);
				}
			});

			return showRestaurant;
		});

    }

    //filter by price
	if (priceFilters.length > 0) {
		filteredRestaurants = filteredRestaurants.filter((restaurant) => {
			console.log('price filter', priceFilters.includes(restaurant.priceLevel));
			return priceFilters.includes(restaurant.priceLevel);
		});

	}

	//TODO handle no filters at all
	    	
	console.log('restaurants after filtering: ',filteredRestaurants);

    //sort Restaurants
    switch(sortBy){
    	case 'BEST': 
    		filteredRestaurants.sort((a, b) => {
		      if (a.rating.avg > b.rating.avg) {
		        return -1;
		      } else if (a.rating.avg < b.rating.avg) {
		        return 1;
		      } else {
		        if (a.rating.count > b.rating.count) {
			        return -1;
			    } else if (a.rating.count < b.rating.count) {
			        return 1;
			    } else {
			        return 0;
			    }
		      }
		    });
		    break;
    	case 'MOST':
    		filteredRestaurants.sort((a, b) => {
		      if (a.rating.count > b.rating.count) {
		        return -1;
		      } else if (a.rating.count < b.rating.count) {
		        return 1;
		      } else {
		      	if (a.rating.avg > b.rating.avg) {
			        return -1;
			    } else if (a.rating.avg < b.rating.avg) {
			        return 1;
			    } else {
		        	return 0;
		        }
		      }
		    });
		    break;
    	case 'PRICE_ASC':
    		filteredRestaurants.sort((a, b) => {
		      if (a.priceLevel < b.priceLevel) {
		        return -1;
		      } else if (a.priceLevel > b.priceLevel) {
		        return 1;
		      } else {
		      	if (a.rating.avg > b.rating.avg) {
			        return -1;
			    } else if (a.rating.avg < b.rating.avg) {
			        return 1;
			    } else {
		        	return 0;
		        }
		      }
		    });
		    break;
    	case 'PRICE_DESC':
    		filteredRestaurants.sort((a, b) => {
		      if (a.priceLevel > b.priceLevel) {
		        return -1;
		      } else if (a.priceLevel < b.priceLevel) {
		        return 1;
		      } else {
		      	if (a.rating.avg > b.rating.avg) {
			        return -1;
			    } else if (a.rating.avg < b.rating.avg) {
			        return 1;
			    } else {
		        	return 0;
		        }
		      }
		    });
		    break;
    	case 'ALGO':
			filteredRestaurants.sort((a, b) => {
				var scoreA = a.rating.count*0.1 + a.rating.avg*3.0;
				var scoreB = b.rating.count*0.1 + b.rating.avg*3.0;
		      if (scoreA > scoreB) {
		        return -1;
		      } else if (scoreA < scoreB) {
		        return 1;
		      } else {
		      	if (a.rating.avg > b.rating.avg) {
			        return -1;
			    } else if (a.rating.avg < b.rating.avg) {
			        return 1;
			    } else {
		        	return 0;
		        }
		      }
		    });
		    break;
    	default:
    		break;
    }

    console.log('restaurants after sorting: ',filteredRestaurants);

    return filteredRestaurants;
  }
};