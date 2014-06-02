$(function()***REMOVED***
    var prev;
    var n = 0;

    var headings = $('h3').map(function(i, el) ***REMOVED***
        return ***REMOVED***
            top: $(el).offset().top,
            id: el.id
    ***REMOVED***
***REMOVED***);

    console.log(headings);

    function closest() ***REMOVED***
        var h;
        var top = $(window).scrollTop();
        console.log(top);
        var i = headings.length;
        while (i--) ***REMOVED***
            h = headings[i];
            console.log(h);
            console.log(i);
            if (i === 0 || top >= h.top - 70) ***REMOVED***
                return h;
        ***REMOVED***
    ***REMOVED***
***REMOVED***

    $(document).scroll(function()***REMOVED***
        var h = closest();
        console.log(h);
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
    console.log('/' + encodeURIComponent($('#access-document').val()));
    location.href = '/' + encodeURIComponent($('#access-document').val());
***REMOVED***