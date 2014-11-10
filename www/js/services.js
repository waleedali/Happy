angular.module('happy.services', [])

.factory('DataSvc', function(){

        // localStorage key - increment version when data structure changes
        var STORAGE_ID = 'happyMoodLogger.1.0';

        // sample data to be used if no data exists in localStorage        
        var svc = {
            get: get,
            put: put,
        };

        return svc;

        // get the whole "Mood Object" from localStorage
        function get() {
            return JSON.parse(localStorage.getItem(STORAGE_ID) || {});
            
        }//end of get function

        // put the whole "Mood Object" in localStorage
        function put(moodObj) {
            localStorage.setItem(STORAGE_ID, JSON.stringify(moodObj));
        }//end of put function

});//end of Data factory
