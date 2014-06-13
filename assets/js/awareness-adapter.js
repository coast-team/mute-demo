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
    $('#'+this.itemLastModificationDate.id).html(data.lastModificationDate);
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
        color = userID%this.nbColors;
        infosUser = infosUsers[userID];
        this.textEditorAdapter.addRemoteCursor(infosUser.indexCursor, userID, 'mute-remote-cursor-'+color);
        this.textEditorAdapter.addRemoteSelection(infosUser.selections, 'mute-remote-selection-'+color);
    };

    // Remove the Ace Editor's CSS rule 'overflow'
    $('.ace_scroller').css('overflow', 'visible');
    $('.ace_layer.ace_marker-layer:last').css('overflow', 'visible');
};