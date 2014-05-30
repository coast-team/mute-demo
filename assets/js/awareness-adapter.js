var AwarenessAdapter = function (coordinator, items) ***REMOVED***
	var awarenessAdapter = this;
	this.coordinator = coordinator;
    console.log(items);
	this.item = items[0];
	this.coordinator.on('awareness', function (data) ***REMOVED***
        console.log('On a bien reçu un message');
		awarenessAdapter.updateItem(data);
	***REMOVED***);
***REMOVED***;

AwarenessAdapter.prototype.updateItem = function (data) ***REMOVED***
    console.log(this.item);
    console.log(this.item.id);
	$('#'+this.item.id).html(data.nbLogootSOp + ' opération(s)');
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