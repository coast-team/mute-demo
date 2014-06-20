$(function()***REMOVED***
    var prev;
    var n = 0;

    var headings = $('h3[data-item-menu]').map(function(i, el) ***REMOVED***
        return ***REMOVED***
            top: $(el).offset().top,
            id: el.id
    ***REMOVED***
***REMOVED***);

    function closest() ***REMOVED***
        var h;
        var top = $(window).scrollTop();
        var i = headings.length;
        while (i--) ***REMOVED***
            h = headings[i];
            if (i === 0 || top >= h.top - 70) ***REMOVED***
                return h;
        ***REMOVED***
    ***REMOVED***
***REMOVED***

    $(document).scroll(function()***REMOVED***
        var h = closest();
        if (!h) return;

        if (prev) ***REMOVED***
        prev.removeClass('active');
        prev.parent().parent().removeClass('active');
    ***REMOVED***

        var a = $('a[href="#' + h.id + '"]');
        a.addClass('active');
        a.parent().parent().addClass('active');

        prev = a;
***REMOVED***);
***REMOVED***);

function accessDocument() ***REMOVED***
    location.href = '/' + encodeURIComponent($('#access-document').val());
***REMOVED***