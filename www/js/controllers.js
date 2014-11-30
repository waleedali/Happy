angular.module('starter.controllers', ['ionic', 'ionic.contrib.ui.cards'])




.controller('MoodCtrl', function($scope, $ionicSwipeCardDelegate, $ionicTabsDelegate, DataSvc, userDataCrunch) {
  //to track index postion of moods
  var index = 0;
  console.log('index: '+index);
  //updates the index 
  function postionTracker(){
    if(index == 12) index = 0;
    else index++;
    console.log('index: '+index);
  }//fend


  console.log('CARDS CTRL');
  var cardTypes = [{
    image: 'img/pic.png',
    keyFeeling:'Happy',
    positiveScale: 'positive'
  },{
    image: 'img/pic.png',
    keyFeeling:'Relaxed',
    positiveScale: 'neutral'
  },{
    image: 'img/pic.png',
    keyFeeling:'Creative',
    positiveScale: 'positive'
  },{
    image: 'img/pic.png',
    keyFeeling:'Active',
    positiveScale: 'positive'
  },{
    image: 'img/pic.png',
    keyFeeling:'Peaceful',
    positiveScale: 'positive'
  },{
    image: 'img/pic.png',
    keyFeeling:'Excited',
    positiveScale: 'positive'
  },{
    image: 'img/pic.png',
    keyFeeling:'Tired',
    positiveScale: 'neutral'
  },{
    image: 'img/pic.png',
    keyFeeling:'Bored',
    positiveScale: 'neutral'
  },{
    image: 'img/pic.png',
    keyFeeling:'Stressed',
    positiveScale: 'negative'
  },{
    image: 'img/pic.png',
    keyFeeling:'Nervous',
    positiveScale: 'negative'
  },{
    image: 'img/pic.png',
    keyFeeling:'Upset',
    positiveScale: 'negative'
  },{
    image: 'img/pic.png',
    keyFeeling:'Angry',
    positiveScale: 'negative'
  },{
    image: 'img/pic.png',
    keyFeeling:'Scared',
    positiveScale: 'negative'
  }];

  $scope.cards = Array.prototype.slice.call(cardTypes[0]);


  console.log('Cards', $scope.cards);


  $scope.cardSwiped = function(index) {
    $scope.addCard();
  };

  $scope.cardDestroyed = function(index) {
    //$scope.cards.splice(index, 1);

  };

  $scope.addCard = function() {
  var newCard = cardTypes[index];
  postionTracker();
  //var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
    newCard.id = Math.random();
    $scope.cards.push(angular.extend({}, newCard));
  }

  //save user mood input
  $scope.saveMood = function(){

    //THERE IS ONE BUG AND THAT IS AFTER FIRST SUBMISSION WITHOUT RESTARTING THE APP THE INTESISTY LEVEL 
    //WILL NOT CHANGE AND ANY OTHER SUBMITS WILL HOLD THE PREVIOS LEVEL
    
    var optionListIndex = document.getElementById("intensityLevel").selectedIndex;
    var currentIntensity = parseInt(document.getElementById("intensityLevel").options[optionListIndex].value);
    
    console.log('Intensity Level: ' + currentIntensity);
    //alert('Intensity Level: ' + currentIntensity);
    var currentKeyFeeling = cardTypes[index-1].keyFeeling;
    var thisScaleLevel = cardTypes[index-1].positiveScale;

    console.log(currentKeyFeeling);
    alert(currentKeyFeeling + '      ' + 'Intensity Level: ' + currentIntensity  );

    //create new mood object based upon user input
    var moodData = new MoodObject(currentKeyFeeling , currentIntensity, thisScaleLevel, new Date());
    console.log(moodData);
    //prepare local storage key and unpack json from local storage
    //var userMoodLog = JSON.parse(localStorage.getItem('happyMoodLogger.1.0'))|| [];
    var userMoodLog = DataSvc.get();
    //control mechanism for the array
    if (typeof(userMoodLog) === undefined||userMoodLog === null) userMoodLog=[];

    console.log(userMoodLog);
    //push the current user selection into array
    userMoodLog.push(moodData);
    //send entry to data crunch
    userDataCrunch.updateData(moodData);
    //send updates to local storage
    DataSvc.put(userMoodLog);

  }//fend
   


  
})//end of mood controller

.controller('AnalyticsCtrl', function($scope, $ionicModal, $timeout, $ionicListDelegate, $ionicSideMenuDelegate, userDataCrunch){

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

  $scope.updateAnalyticalData = function(){

  }


  ///////DISPLAY FROM LOCAL STORAGE////////////////////
  //fetch user mood log from local storage
  
  

        





})//end of Analytics Controller


 .controller('NavController', function($scope, $ionicSideMenuDelegate) {
      $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
      };
    })



//////////////////////////////////////////////////////////////////////////////////////////////////////




