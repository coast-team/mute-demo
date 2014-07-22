(function($) { 
    $.fn.copyLinkModule = function () {
        var item = this;
        var client = new ZeroClipboard(document.getElementById(this[0].id));

        this.tooltip({ container: 'body', delay: { show: 0, hide: 100 } });
        this.on('mouseout', function () {
             item.attr('data-original-title', 'copy to clipboard');
        });

        client.on('ready', function (readyEvent) {
            client.on('aftercopy', function (event) {
                item.attr('data-original-title', 'copied!');
                item.tooltip('show');
            });
        });

        return this;
    };
}( jQuery ));