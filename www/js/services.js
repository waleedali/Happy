angular.module('starter.services', [])

.factory('DataSvc', function(){

        // localStorage key - increment version when data structure changes
        var STORAGE_ID = 'happyMoodLogger.1.0';

               
        var svc = {
            get: get,
            put: put
        };

        return svc;

        // get the whole "Mood Object" from localStorage
        function get() {
            return JSON.parse(localStorage.getItem(STORAGE_ID) || []);
            
        }//end of get function

        // put the whole "Mood Object" in localStorage
        function put(moodObj) {
            localStorage.setItem(STORAGE_ID, JSON.stringify(moodObj));
        }//end of put function

        

})//end of Data factory



.factory('userDataCrunch', function(DataSvc) {

    var svc = {
            getData: getData,
            putData: putData,
            updateData: updateData
        };

        return svc;
    //sort data based upon three levels. Positive, negative and neutral. Each section will get a specific
    //coefficeint.
    // localStorage key - increment version when data structure changes
        //var STORAGE_ID_DATA = 'happyMoodData.1.0';
        var STORAGE_ID_DATA = 'happyMoodData.1.0';
        var setupFoundation = true;
        
    function ifNewUserSetUpFoundation(){
        console.log('called ifNewUserSetUpFoundation()')
        var userMoods = JSON.parse(localStorage.getItem(STORAGE_ID_DATA));
        console.log(userMoods);
        console.log('----------------------------');
        //control mechanism for the array
        if(typeof(JSON.parse(JSON.parse(localStorage.getItem(STORAGE_ID_DATA)))) == undefined){
        console.log('turns out to be a new user thus i will take care off it!');
        //if new user create the analysis foundation object
        var analysisData = [];
        console.log('userDataCrunch');
        console.log(analysisData);
        //initialize three analysis scale objects
        var neutralEntrys = new analysisScaleObject(0,0,0);
        neutralEntrys.positiveScaleType = 'neutral';

        var positiveEntrys = new analysisScaleObject(0,0,0);
        positiveEntrys.positiveScaleType = 'positive';

        var negativeEntrys = new analysisScaleObject(0,0,0);
        negativeEntrys.positiveScaleType = 'negative';

        //push into array
        analysisData.push(neutralEntrys);
        analysisData.push(positiveEntrys);
        analysisData.push(negativeEntrys);

        //put to local storage
        localStorage.setItem(STORAGE_ID_DATA, JSON.stringify(analysisData));
        }
    }//fend

         function updateData(obj){
            console.log('called userData()');
            //check to see if new user and set up foundation if needed
            if(setupFoundation == false){
            ifNewUserSetUpFoundation();
            setupFoundation = true;
            }

            var scaleObj = JSON.parse(localStorage.getItem(STORAGE_ID_DATA));
            console.log('analytics page');
            console.log('scaleObj');
            console.log(scaleObj);
            if (obj.positiveScale == 'neutral'){
              scaleObj[0].possiblePoints += 5;
              scaleObj[0].userPoints += obj.moodIntensity;
              scaleObj[0].coefficent = scaleObj[0].userPoints/scaleObj[0].possiblePoints;
            }
            if (obj.positiveScale == 'positive'){
              scaleObj[1].possiblePoints += 5;
              scaleObj[1].userPoints += obj.moodIntensity;
              scaleObj[1].coefficent = scaleObj[1].userPoints/scaleObj[1].possiblePoints;;
            }
            if (obj.positiveScale == 'negative'){
              scaleObj[2].possiblePoints += 5;
              scaleObj[2].userPoints += obj.moodIntensity;
              scaleObj[2].coefficent = scaleObj[2].userPoints/scaleObj[2].possiblePoints;
            }
            console.log(scaleObj);
            //return data back to storage
            localStorage.setItem(STORAGE_ID_DATA, JSON.stringify(scaleObj));
            

        
          }//fend
         

        function getData(){
            return JSON.parse(localStorage.getItem(STORAGE_ID_DATA) || []);
        }//fend
        function putData(Obj){
            localStorage.setItem(STORAGE_ID_DATA, JSON.stringify(Obj));
        }//fend
    
})