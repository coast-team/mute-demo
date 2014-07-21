(function($) ***REMOVED***
    $.fn.remoteIndicatorsModule = function (options) ***REMOVED***
    	/*
    	*	options : ***REMOVED***
		*		infosUsersModule,
		*		textEditorAdapter,
        *       networkAdapter,
		*		cursorsCSSClasses,
		*		selectionsCSSClasses
    	*	***REMOVED***
    	*/
        var infosUsers;

    	var generateCursorHTML = function (userID, username, posCursor, cssClass) ***REMOVED***
    		// Since the top and left attributes are only set at the marker creation in AceEditor
    		// We have to put some flag in the HTMl which will be replace at the creation
            return [
				'<div id="cursor-'+userID+'" data-remote-cursor="true" data-remote-cursor-row="'+posCursor.row+'" data-remote-cursor-column="'+posCursor.column+'" class="'+cssClass+'" style="height: 12px; width:300px; top:FLAG_TOPpx; left:FLAG_LEFTpx;">',
				'<div class="nubbin" style="bottom: '+0+'px; top:-4px;"></div>',
				'<div class="name" style="display: none; bottom: 4px">'+username+'</div>',
			 	'</div>'
			].join('\n');
    	***REMOVED***;

    	var updateRemoteIndicators = function () ***REMOVED***
	    	var infosUser;
		    var userID;
		    var cursorHTMl = '';
		    var cursorClassIndex;
		    var selectionClassIndex;
		    var rangeSelection;
		    var remoteCursorClass;

		    options.textEditorAdapter.clearRemoteIndicators();
		    
            for(userID in infosUsers) ***REMOVED***
                infosUser = infosUsers[userID];
                cursorCSSClass = options.cursorsCSSClasses[userID%options.cursorsCSSClasses.length];
                selectionCSSClass = options.selectionsCSSClasses[userID%options.selectionsCSSClasses.length];
                cursorHTML = generateCursorHTML(userID, infosUser.username, options.textEditorAdapter.indexToPosition(infosUser.cursorIndex), cursorCSSClass);
                options.textEditorAdapter.addRemoteCursor(infosUser.cursorIndex, cursorHTML);
                options.textEditorAdapter.addRemoteSelection(infosUser.selections, selectionCSSClass);
        ***REMOVED***;

            // Remove the Ace Editor's CSS rule 'overflow'
            $('.ace_scroller').css('overflow', 'visible');
            $('.ace_layer.ace_marker-layer:last').css('overflow', 'visible'); 
    	***REMOVED***;
        
        infosUsersModule.on('updateRemoteIndicators', function (data) ***REMOVED***
            infosUsers = data.infosUsers;
            updateRemoteIndicators();
    ***REMOVED***);

    	return this;
***REMOVED***
***REMOVED***( jQuery ));