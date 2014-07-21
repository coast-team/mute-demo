(function($) { 
    $.fn.nameModule = function (options) {
        /*
        * coordinator,
        * network,
        * serverDB
        */

        var item = this;

        var updateName = function (name) {
            item.html(name);
        };

        // TODO: get name at the init
        serverDB.models.query()
        .filter('docID', options.coordinator.docID)
        .execute()
        .done(function (results) {
            var name;

            if(results.length > 0) {
                name = results[0].name;
                item.html(name);
            }
        });

        network.on('updateName', function (data) {
            
        });

        updateName('Unknown user');

        return this;
    };
}( jQuery ));