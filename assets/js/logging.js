
var Logger = (function () {
  "use strict";

  var result = function (a_name, a_consumer) {
    this._buffer_ = [];
    this._name_ = a_name;
    this._consumer = a_consumer;
  };

  result.prototype = {
    constructor: result,

    // Constants
    Sent_operation_tag: "sent",

    Received_operation_tag: "received",

    Integrated_operation_tag: "integrated",

    Joined_doc_tag: "joined",

    // Access
    _representation_of: function (a_op_id, a_document_id, a_site_id, a_timestamp, a_event_tag) {
      return {
        operationID: a_op_id,
        docID: a_document_id,
        siteID: a_site_id,
        timestamp: a_timestamp,
        event: a_event_tag
      };
    },

    // change
    log_sent_operation: function (a_op_id, a_document_id, a_site_id, a_timestamp) {
      this._buffer_[this._buffer_.length] = this._representation_of (a_op_id, a_document_id, a_site_id, a_timestamp, this.Sent_operation_tag);
    },

    log_received_operation: function (a_op_id, a_document_id, a_site_id, a_timestamp) {
      this._buffer_[this._buffer_.length] = this._representation_of (a_op_id, a_document_id, a_site_id, a_timestamp, this.Received_operation_tag);
    },

    log_integrated_operation: function (a_op_id, a_document_id, a_site_id, a_timestamp) {
      this._buffer_[this._buffer_.length] = this._representation_of (a_op_id, a_document_id, a_site_id, a_timestamp, this.Integrated_operation_tag);
    },

    log_joined_doc: function (a_document_id, a_site_id, a_timestamp) {
      this._buffer_[this._buffer_.length] = { docID: a_document_id, siteID: a_site_id, timestamp: a_timestamp, event: this.Joined_doc_tag };
    },

    flush: function () {
      console.log("flushing...");
      if (this._buffer_.length > 0) {
        var json = JSON.stringify (this._buffer_);
        this._consumer(this._name_, json);

        this._buffer_ = [];
      }
    }
  };

  return result;
})();
