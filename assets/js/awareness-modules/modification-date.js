(function($) ***REMOVED***
    $.fn.lastModificationDateModule = function (options) ***REMOVED***
        /*
        *   options: ***REMOVED***
        *       coordinator:    Listen the coordinator to be notified of a modification
        *   ***REMOVED***
        */
        var item = this;
        if(options !== null && options !== undefined
            && options.coordinator !== null && options.coordinator !== undefined) ***REMOVED***            
            options.coordinator.on('updateLastModificationDate', function (data) ***REMOVED***
                if(isDateValid(data.lastModificationDate)) ***REMOVED***
                    item.updateDisplay(data.lastModificationDate);    
            ***REMOVED***
                else ***REMOVED***
                    console.error('The date passed as a parameter is NOT valid...');
            ***REMOVED***
        ***REMOVED***);
            return this.html('Initializing...');
    ***REMOVED***
        else ***REMOVED***
            console.error('The date passed as a parameter is NOT valid...');
    ***REMOVED***
***REMOVED***;

    $.fn.updateDisplay = function (dateValue) ***REMOVED***
        var now = new Date().valueOf();
        var res = '';
        var timeSecond = 1000;
        var timeMinute = timeSecond * 60;
        var timeHour = timeMinute * 60;
        var timeDay = timeHour * 24;
        var timeMonth = timeDay * 31;
        var timeYear = timeMonth * 12;

        if((now - dateValue) / timeYear > 1) ***REMOVED***
            res = Math.floor((now - dateValue) / timeYear) + ' year(s) ago';
    ***REMOVED***
        else if((now - dateValue) / timeMonth > 1) ***REMOVED***
            res = Math.floor((now - dateValue) / timeMonth) + ' month(s) ago';
    ***REMOVED***
        else if((now - dateValue) / timeDay > 1) ***REMOVED***
            res = Math.floor((now - dateValue) / timeDay) + ' day(s) ago';
    ***REMOVED***
        else if((now - dateValue) / timeHour > 1) ***REMOVED***
            res = Math.floor((now - dateValue) / timeHour) + ' hour(s) ago';
    ***REMOVED***
        else if((now - dateValue) / timeMinute > 1) ***REMOVED***
            res = Math.floor((now - dateValue) / timeMinute) + ' minute(s) ago';
    ***REMOVED***
        else ***REMOVED***
            res = Math.floor((now - dateValue) / timeSecond) + ' second(s) ago';
    ***REMOVED***
        return this.html(res);
***REMOVED***;

    function isDateValid(dateValue) ***REMOVED***
        var res = false;
        if(!isNaN(new Date(dateValue).valueOf())) ***REMOVED***
            res = true;
    ***REMOVED***
        return res;
***REMOVED***

***REMOVED***( jQuery ));