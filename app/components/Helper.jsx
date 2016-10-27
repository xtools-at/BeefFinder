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
  filter: function (restaurants, showCompleted, searchText) {
    var filteredRestaurants = restaurants;

    // Filter by showCompleted
    filteredRestaurants = filteredRestaurants.filter((restaurant) => {
      return !restaurant.completed || showCompleted;
    });

    // Filter by searchText
    filteredRestaurants = filteredRestaurants.filter((restaurant) => {
      var text = restaurant.text.toLowerCase();
      return searchText.length === 0 || text.indexOf(searchText) > -1;
    });

    // Sort restaurants with non-completed first
    filteredRestaurants.sort((a, b) => {
      if (!a.completed && b.completed) {
        return -1;
      } else if (a.completed && !b.completed) {
        return 1;
      } else {
        return 0;
      }
    });

    return filteredRestaurants;
  }
};