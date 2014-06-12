var AwarenessAdapter = function (coordinator, textEditorAdapter, items) {
	var awarenessAdapter = this;
	this.coordinator = coordinator;
    this.textEditorAdapter = textEditorAdapter;

    this.nbColors = 3;

	this.item = items[0];
    this.coordinator.on('awareness', function (data) {
		awarenessAdapter.updateItem(data);
	});
    this.coordinator.on('updateRemoteIndicators', function (data) {
        awarenessAdapter.updateRemoteIndicators(data);
    });
};

AwarenessAdapter.prototype.updateItem = function (data) {
	$('#'+this.item.id).html(data.nbLogootSOp + ' operation(s)');
    // Changing the text color according to the number of operations waiting
    if(data.nbLogootSOp >= 0 && data.nbLogootSOp < 10) {
        $('#'+this.item.id).attr('class', 'text-success');
    }
    else if(data.nbLogootSOp >= 10 && data.nbLogootSOp < 20) {
        $('#'+this.item.id).attr('class', 'text-warning');
    }
    else {
        $('#'+this.item.id).attr('class', 'text-danger');
    }
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