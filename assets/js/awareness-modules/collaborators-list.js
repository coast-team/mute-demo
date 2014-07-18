(function($) {
    $.fn.collaboratorsListModule = function (options) {
    	/*
    	*	options : {
		*		infosUsersModule,
		*		cssClasses
    	*	}
    	*/

        var item = this;

    	var generateCollaboratorsListHTML = function (infosUsers) {
            var listHTML = '';
            var infosUser;
            var userID;
            var cssClass;

            for(userID in infosUsers) {
                infosUser = infosUsers[userID];
                cssClass = options.listCSSClasses[userID%options.listCSSClasses.length];

                listHTML = [
                    '<li class="list-group-item">',
                    '<span class="glyphicon glyphicon-user text-primary '+cssClass+'"></span>',
                    '<strong>'+infosUser.username+'</strong>',
                    '</li>'
                ].join('\n');
            }
            return listHTML;
        };

    	var updateCollaboratorsList = function (data) {
	    	var infosUsers = data.infosUsers;
		    item.html(generateCollaboratorsListHTML(infosUsers));
    	};

        options.infosUsersModule.on('updateCollaboratorsList', function (data) {
		    updateCollaboratorsList(data);
    	});

    	return this;
    }
}( jQuery ));