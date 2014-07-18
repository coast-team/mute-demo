(function($) ***REMOVED*** 
    $.fn.copyLinkModule = function () ***REMOVED***
        var item = this;
        var client = new ZeroClipboard(document.getElementById(this[0].id));

        this.tooltip(***REMOVED*** container: 'body', delay: ***REMOVED*** show: 0, hide: 100 ***REMOVED*** ***REMOVED***);
        this.on('mouseout', function () ***REMOVED***
             item.attr('data-original-title', 'copy to clipboard');
    ***REMOVED***);

        client.on('ready', function (readyEvent) ***REMOVED***
            client.on('aftercopy', function (event) ***REMOVED***
                item.attr('data-original-title', 'copied!');
                item.tooltip('show');
        ***REMOVED***);
    ***REMOVED***);

        return this;
***REMOVED***;
***REMOVED***( jQuery ));