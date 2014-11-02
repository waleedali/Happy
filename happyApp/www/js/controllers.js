angular.module('starter.controllers', [])

.controller('MoodCtrl', function($scope) {

	var init = function () {
	   var mySwiper = new Swiper('.swiper-container',{
	    //Your options here:
	    mode:'vertical',
	    loop: true,
	    centeredSlides: true
	    
	  }); 

	};
	

	// init the view
	init();
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
});
