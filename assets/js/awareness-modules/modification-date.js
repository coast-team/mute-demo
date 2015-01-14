(function($) {
    $.fn.lastModificationDateModule = function (options) {
        /*
        *   options: {
        *       coordinator:    Listen the coordinator to be notified of a modification
        *   }
        */
        var item = this;
        var disposed = false;

        if(options !== null && options !== undefined
            && options.coordinator !== null && options.coordinator !== undefined) {
            options.coordinator.on('updateLastModificationDate', function (data) {
                if(disposed === false) {
                    if(isDateValid(data.lastModificationDate)) {
                        item.updateDisplay(data.lastModificationDate);    
                    }
                    else {
                        console.error('The date passed as a parameter is NOT valid...');
                    }
                }
            });
            options.coordinator.on('coordinatorDisposed', function () {
                disposed = true;
            });
            return this.html('Initializing...');
        }
        else {
            console.error('The date passed as a parameter is NOT valid...');
        }
    };

    $.fn.updateDisplay = function (dateValue) {
        var now = new Date().valueOf();
        var res = '';
        var timeSecond = 1000;
        var timeMinute = timeSecond * 60;
        var timeHour = timeMinute * 60;
        var timeDay = timeHour * 24;
        var timeMonth = timeDay * 31;
        var timeYear = timeMonth * 12;

        if((now - dateValue) / timeYear > 1) {
            res = Math.floor((now - dateValue) / timeYear) + ' year(s) ago';
        }
        else if((now - dateValue) / timeMonth > 1) {
            res = Math.floor((now - dateValue) / timeMonth) + ' month(s) ago';
        }
        else if((now - dateValue) / timeDay > 1) {
            res = Math.floor((now - dateValue) / timeDay) + ' day(s) ago';
        }
        else if((now - dateValue) / timeHour > 1) {
            res = Math.floor((now - dateValue) / timeHour) + ' hour(s) ago';
        }
        else if((now - dateValue) / timeMinute > 1) {
            res = Math.floor((now - dateValue) / timeMinute) + ' minute(s) ago';
        }
        else {
            res = Math.floor((now - dateValue) / timeSecond) + ' second(s) ago';
        }
        return this.html(res);
    };

    function isDateValid(dateValue) {
        var res = false;
        if(!isNaN(new Date(dateValue).valueOf())) {
            res = true;
        }
        return res;
    }

}( jQuery ));