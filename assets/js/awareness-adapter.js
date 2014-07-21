var AwarenessAdapter = function (coordinator, textEditorAdapter, itemNbOperations, itemLastModificationDate) ***REMOVED***
	var awarenessAdapter = this;
	this.coordinator = coordinator;
    this.textEditorAdapter = textEditorAdapter;
<<<<<<< HEAD
=======

>>>>>>> 5fb21f3348e2e80fed0ac2e179da98f16380295e
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
    var now = new Date().valueOf();
    var lastModificationDate = new Date(data.lastModificationDate).valueOf();
    var res = '';
    var timeSecond = 1000;
    var timeMinute = timeSecond * 60;
    var timeHour = timeMinute * 60;
    var timeDay = timeHour * 24;
    var timeMonth = timeDay * 31;
    var timeYear = timeMonth * 12;

    if((now - lastModificationDate) / timeYear > 1) ***REMOVED***
        res = Math.floor((now - lastModificationDate) / timeYear) + ' year(s) ago';
***REMOVED***
    else if((now - lastModificationDate) / timeMonth > 1) ***REMOVED***
        res = Math.floor((now - lastModificationDate) / timeMonth) + ' month(s) ago';
***REMOVED***
    else if((now - lastModificationDate) / timeDay > 1) ***REMOVED***
        res = Math.floor((now - lastModificationDate) / timeDay) + ' day(s) ago';
***REMOVED***
    else if((now - lastModificationDate) / timeHour > 1) ***REMOVED***
        res = Math.floor((now - lastModificationDate) / timeHour) + ' hour(s) ago';
***REMOVED***
    else if((now - lastModificationDate) / timeMinute > 1) ***REMOVED***
        res = Math.floor((now - lastModificationDate) / timeMinute) + ' minute(s) ago';
***REMOVED***
    else ***REMOVED***
        res = Math.floor((now - lastModificationDate) / timeSecond) + ' second(s) ago';
***REMOVED***
    $('#'+this.itemLastModificationDate.id).html(res);
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
<<<<<<< HEAD
        infosUser = infosUsers[userID];
        console.log('infosUsers: ', infosUsers);
        color = userID/*infosUser.replicaNumber*/%this.nbColors;
        this.textEditorAdapter.addRemoteCursor(infosUser.indexCursor, userID/*infosUser.replicaNumber*/, 'mute-remote-cursor-'+color);
=======
        color = userID%this.nbColors;
        infosUser = infosUsers[userID];
        this.textEditorAdapter.addRemoteCursor(infosUser.indexCursor, userID, 'mute-remote-cursor-'+color);
>>>>>>> 5fb21f3348e2e80fed0ac2e179da98f16380295e
        this.textEditorAdapter.addRemoteSelection(infosUser.selections, 'mute-remote-selection-'+color);
***REMOVED***;

    // Remove the Ace Editor's CSS rule 'overflow'
    $('.ace_scroller').css('overflow', 'visible');
    $('.ace_layer.ace_marker-layer:last').css('overflow', 'visible');
***REMOVED***;