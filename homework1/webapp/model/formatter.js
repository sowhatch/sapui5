sap.ui.define([], function () {
	"use strict";
	return {
		Time: function(val) {

                  if (val) {
                        val = val.replace(/^PT/, '').replace(/S$/, '');
                        val = val.replace('H', ':').replace('M', ':');
                    
                        var multipler = 60 * 60;
                        var result = 0;
                        val.split(':').forEach(function(token) {
                          result += token * multipler;
                          multipler = multipler/ 60;
                        });
                        var timeinmiliseconds = result * 1000;
                    
                        var timeFormat = sap.ui.core.format.DateFormat.getTimeInstance({
                          pattern: "KK:mm:ss a"
                        });
                        var TZOffsetMs = new Date(0).getTimezoneOffset() * 60 * 1000;
                        return timeFormat.format(new Date(timeinmiliseconds + TZOffsetMs));
                        
                  }
                  console.log('foramtter접근');
            
            },
	};
});