var AwarenessAdapter = function (coordinator, textEditorAdapter, itemNbOperations, itemLastModificationDate) ***REMOVED***
	var awarenessAdapter = this;
	this.coordinator = coordinator;
    this.textEditorAdapter = textEditorAdapter;

    this.nbColors = 3;

	this.itemNbOperations = itemNbOperations;
    this.itemLastModificationDate = itemLastModificationDate;

    this.coordinator.on('awareness', function (data) ***REMOVED***
		awarenessAdapter.updateItems(data);
	***REMOVED***);
    this.coordinator.on('updateLastModificationDate', function (data) ***REMOVED***
        awarenessAdapter.updateLastModificationDate(data);
***REMOVED***);
    this.coordinator.on('updateRemoteIndicators', function (data) ***REMOVED***
        awarenessAdapter.updateRemoteIndicators(data);
***REMOVED***);
***REMOVED***;

AwarenessAdapter.prototype.updateItems = function (data) ***REMOVED***
	$('#'+this.itemNbOperations.id).html(data.nbLogootSOp + ' operation(s)');
    // Changing the text color according to the number of operations waiting
    if(data.nbLogootSOp >= 0 && data.nbLogootSOp < 10) ***REMOVED***
        $('#'+this.itemNbOperations.id).attr('class', 'text-success');
***REMOVED***
    else if(data.nbLogootSOp >= 10 && data.nbLogootSOp < 20) ***REMOVED***
        $('#'+this.itemNbOperations.id).attr('class', 'text-warning');
***REMOVED***
    else ***REMOVED***
        $('#'+this.itemNbOperations.id).attr('class', 'text-danger');
***REMOVED***
***REMOVED***;

AwarenessAdapter.prototype.updateLastModificationDate = function (data) ***REMOVED***
    $('#'+this.itemLastModificationDate.id).html(data.lastModificationDate);
***REMOVED***;

AwarenessAdapter.prototype.updateRemoteIndicators = function (data) ***REMOVED***
    var infosUsers = data.infosUsers;
    var infosUser;
    var userID;
    var indexCursor;
    var rangeSelection;
    var color;

    this.textEditorAdapter.clearRemoteIndicators();
    for(userID in infosUsers) ***REMOVED***
        color = userID%this.nbColors;
        infosUser = infosUsers[userID];
        this.textEditorAdapter.addRemoteCursor(infosUser.indexCursor, userID, 'mute-remote-cursor-'+color);
        this.textEditorAdapter.addRemoteSelection(infosUser.selections, 'mute-remote-selection-'+color);
***REMOVED***;

    // Remove the Ace Editor's CSS rule 'overflow'
    $('.ace_scroller').css('overflow', 'visible');
    $('.ace_layer.ace_marker-layer:last').css('overflow', 'visible');
***REMOVED***;