(function($) {
    $.fn.remoteIndicatorsModule = function (options) {
    	/*
    	*	options : {
		*		infosUsersModule,
		*		textEditorAdapter,
        *       networkAdapter,
		*		cursorsCSSClasses,
		*		selectionsCSSClasses
    	*	}
    	*/
        var infosUsers;
        var disposed = false;

    	var generateCursorHTML = function (userID, username, posCursor, cssClass) {
    		// Since the top and left attributes are only set at the marker creation in AceEditor
    		// We have to put some flag in the HTMl which will be replace at the creation
            return [
				'<div id="cursor-'+userID+'" data-remote-cursor="true" data-remote-cursor-row="'+posCursor.row+'" data-remote-cursor-column="'+posCursor.column+'" class="'+cssClass+'" style="height: 12px; width:300px; top:FLAG_TOPpx; left:FLAG_LEFTpx;">',
				'<div class="nubbin" style="bottom: '+0+'px; top:-4px;"></div>',
				'<div class="name" style="display: none; bottom: 4px">'+username+'</div>',
			 	'</div>'
			].join('\n');
    	};

    	var updateRemoteIndicators = function () {
	    	var infosUser;
		    var userID;
		    var cursorHTMl = '';
		    var cursorClassIndex;
		    var selectionClassIndex;
		    var rangeSelection;
		    var remoteCursorClass;

		    options.textEditorAdapter.clearRemoteIndicators();
		    
            for(userID in infosUsers) {
                infosUser = infosUsers[userID];
                cursorCSSClass = options.cursorsCSSClasses[userID%options.cursorsCSSClasses.length];
                selectionCSSClass = options.selectionsCSSClasses[userID%options.selectionsCSSClasses.length];
                cursorHTML = generateCursorHTML(userID, infosUser.username, options.textEditorAdapter.indexToPosition(infosUser.cursorIndex), cursorCSSClass);
                options.textEditorAdapter.addRemoteCursor(infosUser.cursorIndex, cursorHTML);
                options.textEditorAdapter.addRemoteSelection(infosUser.selections, selectionCSSClass);
            };

            // Remove the Ace Editor's CSS rule 'overflow'
            $('.ace_scroller').css('overflow', 'visible');
            $('.ace_layer.ace_marker-layer:last').css('overflow', 'visible'); 
    	};
        
        var onInfosUsersModuleDisposedHandler = function () {
            disposed = true;
            infosUsers = {};
        };

        infosUsersModule.on('updateRemoteIndicators', function (data) {
            if(disposed === false) {
                infosUsers = data.infosUsers;
                updateRemoteIndicators();
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