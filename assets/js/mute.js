$(function(){
    var prev;
    var n = 0;

    var headings = $('h3').map(function(i, el) {
        return {
            top: $(el).offset().top,
            id: el.id
        }
    });

    console.log(headings);

    function closest() {
        var h;
        var top = $(window).scrollTop();
        console.log(top);
        var i = headings.length;
        while (i--) {
            h = headings[i];
            console.log(h);
            if (top >= h.top - 50 - 1) {
                return h;
            }
        }
    }

    $(document).scroll(function(){
        var h = closest();
        console.log(h);
        if (!h) return;

        if (prev) {
        prev.removeClass('active');
        prev.parent().parent().removeClass('active');
        }

        var a = $('a[href="#' + h.id + '"]');
        a.addClass('active');
        a.parent().parent().addClass('active');

        prev = a;
    });
});

function accessDocument() {
    console.log('/' + encodeURIComponent($('#access-document').val()));
    location.href = '/' + encodeURIComponent($('#access-document').val());
}