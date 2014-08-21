$(function(){
    var prev;
    var n = 0;

    var headings = $('h3[data-item-menu]').map(function(i, el) {
        return {
            top: $(el).offset().top,
            id: el.id
        }
    });

    function closest() {
        var h;
        var top = $(window).scrollTop();
        var i = headings.length;
        while (i--) {
            h = headings[i];
            if (i === 0 || top >= h.top - 70) {
                return h;
            }
        }
    }

    $(document).scroll(function(){
        var h = closest();
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
    location.href = '/' + encodeURIComponent($('#access-document').val());
}

function addDisposableEventListener (emitter, event, flag, callback) {
    emitter.on(event, function (data) {
        if(flag === true) {
            callback(data);
        }
    });
};