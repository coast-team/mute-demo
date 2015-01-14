(function($) {
    $.fn.collaboratorsListModule = function (options) {
    	/*
    	*	options : {
		*		infosUsersModule,
		*		cssClasses
    	*	}
    	*/

        var item = this;
        var disposed = false;

        var generateCollaboratorsListHTML = function (infosUsers) {
            var listHTML = '';
            var infosUser;
            var userID;
            var cssClass;

            for(userID in infosUsers) {
                infosUser = infosUsers[userID];
                cssClass = options.listCSSClasses[userID%options.listCSSClasses.length];

                listHTML += [
                    '<li class="list-group-item">',
                    '<span class="glyphicon glyphicon-user text-primary '+cssClass+'"></span>',
                    '<strong>'+infosUser.username+'</strong>',
                    '</li>'
                ].join('\n');
            }
            return listHTML;
        };

        var onInfosUsersModuleDisposedHandler = function () {
            var infosUsers = {};
            disposed = true;
            item.html(generateCollaboratorsListHTML(infosUsers));
        };

    	var updateCollaboratorsList = function (data) {
	    	var infosUsers = data.infosUsers;
		    item.html(generateCollaboratorsListHTML(infosUsers));
    	};

        options.infosUsersModule.on('updateCollaboratorsList', function (data) {
            if(disposed === false) {
                updateCollaboratorsList(data);
            }
    	});

        options.infosUsersModule.on('infosUsersModuleDisposed', function () {
            if(disposed === false) {
                onInfosUsersModuleDisposedHandler();
            }
        });

    	return this;
    }
}( jQuery ));