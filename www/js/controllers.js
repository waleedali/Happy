angular.module('happy.controllers', ['ionic'])

.controller('MoodCtrl', function($scope, $ionicPopup, DataSvc) {

  //localStorage.removeItem('happyMoodLogger.1.0');

  var saveMood = function(swiper) {
      $ionicPopup.show({
      title: 'Save this mood?',
      scope: $scope,
      buttons: [
        { text: 'Cancel' },
        {
          text: '<b>Save</b>',
          type: 'button-positive',
          onTap: function(e) {

                var moodData = new MoodObject(swiper.activeLoopIndex, new Date());
                //alert(JSON.stringify(moodData));
                var userMoodLog = JSON.parse(localStorage.getItem('happyMoodLogger.1.0'))|| [];
                //var userMoodLog = DataSvc.get();
                if (typeof(userMoodLog) === undefined||userMoodLog === null) {

                  userMoodLog=[];
                  
                };
                
                //alert(userMoodLog);

                userMoodLog.push(moodData);

                DataSvc.put(userMoodLog);

                //localStorage.setItem('happyMoodLogger.1.0', JSON.stringify(userMoodLog));
              
          }//end of function
        },
      ]
    });
  };
            
  

  $scope.init = function () {
    var mySwiper = new Swiper('.swiper-container',{
      //Your options here:
      mode:'vertical',
      loop: true,
      preventLinks: false,
      onSlideClick: saveMood
    });
  };//end of function

  // init the view
  $scope.init();

})//end of Mood Controller



.controller('AnalyticsCtrl', function($scope, $ionicModal, $timeout, $ionicListDelegate, DataSvc){

  ////////////SETTINGS MODAL///////////////////////////
  // Create the settings modal that we will use later
  $ionicModal.fromTemplateUrl('templates/settings.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  //open the settings modal
  $scope.openSettings = function() {
    $scope.modal.show();
  };  

  // Triggered in the settings modal to close it
  $scope.closeSettings = function() {
    $scope.modal.hide();
  };



  ///////DISPLAY FROM LOCAL STORAGE////////////////////
  //fetch user mood log from local storage
  $scope.userMoodLog = DataSvc.get();


})//end of Analytics Controller


/////////////////////////////////////////////////////////////////////////////////////////////////////

.controller('SignInCtrl', function($scope, $state) {
  
  $scope.signIn = function(user) {
    console.log('Sign-In', user);
    $state.go('tab.mood');
  };
  
})

//////////////////////////////////////////////////////////////////////////////////////////////////////

//Side menu js controller 
  function ContentController($scope, $ionicSideMenuDelegate) {
      $scope.toggleLeft = function() {
      $ionicSideMenuDelegate.toggleLeft();
      };//end of toggle eval
  }//end of function


