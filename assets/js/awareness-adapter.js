var AwarenessAdapter = function (coordinator, items) {
	var awarenessAdapter = this;
	this.coordinator = coordinator;
    console.log(items);
	this.item = items[0];
	this.coordinator.on('awareness', function (data) {
		awarenessAdapter.updateItem(data);
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