var AwarenessAdapter = function (coordinator, items) ***REMOVED***
	var awarenessAdapter = this;
	this.coordinator = coordinator;
    console.log(items);
	this.item = items[0];
	this.coordinator.on('awareness', function (data) ***REMOVED***
		awarenessAdapter.updateItem(data);
	***REMOVED***);
***REMOVED***;

AwarenessAdapter.prototype.updateItem = function (data) ***REMOVED***
	$('#'+this.item.id).html(data.nbLogootSOp + ' operation(s)');
    // Changing the text color according to the number of operations waiting
    if(data.nbLogootSOp >= 0 && data.nbLogootSOp < 10) ***REMOVED***
        $('#'+this.item.id).attr('class', 'text-success');
***REMOVED***
    else if(data.nbLogootSOp >= 10 && data.nbLogootSOp < 20) ***REMOVED***
        $('#'+this.item.id).attr('class', 'text-warning');
***REMOVED***
    else ***REMOVED***
        $('#'+this.item.id).attr('class', 'text-danger');
***REMOVED***
***REMOVED***;