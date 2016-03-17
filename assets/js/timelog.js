var LoggingService = (function() {
  "use strict";

  var result = function(docID, siteID, socket, flushInterval) {
    this.docID = docID;
    this.siteID = siteID;
    this.logger = new Logger("events", function(a_name, a_data) {
      socket.emit(a_name, a_data);
    });

    var self = this;

    GoTime.setOptions({
      //AjaxURL: "/time",
      WhenSynced: function() {
        setInterval(self.logger.flush.bind(self.logger), flushInterval);
      }, // Is called for the first sync
      OnSync: null, // Calls on ever sync starting with the second sync
      SyncInitialTimeouts: [500, 3000, 9000, 15000],
      SyncInterval: 20000 // Set this often for demo purposes only
    });

    socket.on('time', function(data) {
      GoTime.wsReceived(data);
    });

    GoTime.wsSend(function() {
      if (socket !== null && socket.connected) {
        socket.emit("time");
        return true;
      }
      return false;
    });

  };

  result.prototype = {
    constructor: result,

    logSentOperation: function(opID) {
      this.logger.log_sent_operation(opID, this.docID, this.siteID, GoTime.now());
    },

    logReceivedOperation: function(opID) {
      this.logger.log_received_operation(opID, this.docID, this.siteID, GoTime.now());
    },

    logIntegratedOperation: function(opID) {
      this.logger.log_integrated_operation(opID, this.docID, this.siteID, GoTime.now());
    },

    logJoinedDoc: function() {
      this.logger.log_joined_doc(this.docID, this.siteID, GoTime.now());
    }

  };

  return result;
})();
