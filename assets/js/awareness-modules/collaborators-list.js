(function($) ***REMOVED***
    $.fn.collaboratorsListModule = function (options) ***REMOVED***
    	/*
    	*	options : ***REMOVED***
		*		infosUsersModule,
		*		cssClasses
    	*	***REMOVED***
    	*/

        var item = this;

    	var generateCollaboratorsListHTML = function (infosUsers) ***REMOVED***
            var listHTML = '';
            var infosUser;
            var userID;
            var cssClass;

            for(userID in infosUsers) ***REMOVED***
                infosUser = infosUsers[userID];
                cssClass = options.listCSSClasses[userID%options.listCSSClasses.length];

                listHTML += [
                    '<li class="list-group-item">',
                    '<span class="glyphicon glyphicon-user text-primary '+cssClass+'"></span>',
                    '<strong>'+infosUser.username+'</strong>',
                    '</li>'
                ].join('\n');
        ***REMOVED***
            return listHTML;
    ***REMOVED***;

    	var updateCollaboratorsList = function (data) ***REMOVED***
	    	var infosUsers = data.infosUsers;
		    item.html(generateCollaboratorsListHTML(infosUsers));
    	***REMOVED***;

        options.infosUsersModule.on('updateCollaboratorsList', function (data) ***REMOVED***
		    updateCollaboratorsList(data);
    	***REMOVED***);

    	return this;
***REMOVED***
***REMOVED***( jQuery ));