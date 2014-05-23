var AwarenessAdapter = function (coordinator, items) {
	var awarenessAdapter = this;
	this.coordinator = coordinator;
	this.item = items[0];
	this.coordinator.on('awareness', function (data) {
        console.log('On a bien reçu un message');
		awarenessAdapter.updateItem(data);
	});
};

AwarenessAdapter.prototype.updateItem = function (data) {
	$('#'+this.item.id).html(data.nbLogootSOp + ' opération(s)');
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