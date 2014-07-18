var AwarenessAdapter = function (coordinator, textEditorAdapter, itemNbOperations, itemLastModificationDate) {
	var awarenessAdapter = this;
	this.coordinator = coordinator;
    this.textEditorAdapter = textEditorAdapter;
    this.nbColors = 3;

	this.itemNbOperations = itemNbOperations;
    this.itemLastModificationDate = itemLastModificationDate;

    this.coordinator.on('awareness', function (data) {
		awarenessAdapter.updateItems(data);
	});
    this.coordinator.on('updateLastModificationDate', function (data) {
        awarenessAdapter.updateLastModificationDate(data);
    });
    this.coordinator.on('updateRemoteIndicators', function (data) {
        awarenessAdapter.updateRemoteIndicators(data);
    });
};

AwarenessAdapter.prototype.updateItems = function (data) {
	$('#'+this.itemNbOperations.id).html(data.nbLogootSOp + ' operation(s)');
    // Changing the text color according to the number of operations waiting
    if(data.nbLogootSOp >= 0 && data.nbLogootSOp < 10) {
        $('#'+this.itemNbOperations.id).attr('class', 'text-success');
    }
    else if(data.nbLogootSOp >= 10 && data.nbLogootSOp < 20) {
        $('#'+this.itemNbOperations.id).attr('class', 'text-warning');
    }
    else {
        $('#'+this.itemNbOperations.id).attr('class', 'text-danger');
    }
};

AwarenessAdapter.prototype.updateLastModificationDate = function (data) {
    var now = new Date().valueOf();
    var lastModificationDate = new Date(data.lastModificationDate).valueOf();
    var res = '';
    var timeSecond = 1000;
    var timeMinute = timeSecond * 60;
    var timeHour = timeMinute * 60;
    var timeDay = timeHour * 24;
    var timeMonth = timeDay * 31;
    var timeYear = timeMonth * 12;

    if((now - lastModificationDate) / timeYear > 1) {
        res = Math.floor((now - lastModificationDate) / timeYear) + ' year(s) ago';
    }
    else if((now - lastModificationDate) / timeMonth > 1) {
        res = Math.floor((now - lastModificationDate) / timeMonth) + ' month(s) ago';
    }
    else if((now - lastModificationDate) / timeDay > 1) {
        res = Math.floor((now - lastModificationDate) / timeDay) + ' day(s) ago';
    }
    else if((now - lastModificationDate) / timeHour > 1) {
        res = Math.floor((now - lastModificationDate) / timeHour) + ' hour(s) ago';
    }
    else if((now - lastModificationDate) / timeMinute > 1) {
        res = Math.floor((now - lastModificationDate) / timeMinute) + ' minute(s) ago';
    }
    else {
        res = Math.floor((now - lastModificationDate) / timeSecond) + ' second(s) ago';
    }
    $('#'+this.itemLastModificationDate.id).html(res);
};

AwarenessAdapter.prototype.updateRemoteIndicators = function (data) {
    var infosUsers = data.infosUsers;
    var infosUser;
    var userID;
    var indexCursor;
    var rangeSelection;
    var color;

    this.textEditorAdapter.clearRemoteIndicators();
    for(userID in infosUsers) {
        infosUser = infosUsers[userID];
        console.log('infosUsers: ', infosUsers);
        color = userID/*infosUser.replicaNumber*/%this.nbColors;
        this.textEditorAdapter.addRemoteCursor(infosUser.indexCursor, userID/*infosUser.replicaNumber*/, 'mute-remote-cursor-'+color);
        this.textEditorAdapter.addRemoteSelection(infosUser.selections, 'mute-remote-selection-'+color);
    };

    // Remove the Ace Editor's CSS rule 'overflow'
    $('.ace_scroller').css('overflow', 'visible');
    $('.ace_layer.ace_marker-layer:last').css('overflow', 'visible');
};