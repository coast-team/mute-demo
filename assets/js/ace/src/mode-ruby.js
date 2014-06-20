/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2010, Ajax.org B.V.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Ajax.org B.V. nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * ***** END LICENSE BLOCK ***** */

define('ace/mode/ruby', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text', 'ace/mode/ruby_highlight_rules', 'ace/mode/matching_brace_outdent', 'ace/range', 'ace/mode/folding/coffee'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var RubyHighlightRules = require("./ruby_highlight_rules").RubyHighlightRules;
var MatchingBraceOutdent = require("./matching_brace_outdent").MatchingBraceOutdent;
var Range = require("../range").Range;
var FoldMode = require("./folding/coffee").FoldMode;

var Mode = function() ***REMOVED***
    this.HighlightRules = RubyHighlightRules;
    this.$outdent = new MatchingBraceOutdent();
    this.foldingRules = new FoldMode();
***REMOVED***;
oop.inherits(Mode, TextMode);

(function() ***REMOVED***


    this.lineCommentStart = "#";

    this.getNextLineIndent = function(state, line, tab) ***REMOVED***
        var indent = this.$getIndent(line);

        var tokenizedLine = this.getTokenizer().getLineTokens(line, state);
        var tokens = tokenizedLine.tokens;

        if (tokens.length && tokens[tokens.length-1].type == "comment") ***REMOVED***
            return indent;
    ***REMOVED***

        if (state == "start") ***REMOVED***
            var match = line.match(/^.*[\***REMOVED***\(\[]\s*$/);
            var startingClassOrMethod = line.match(/^\s*(class|def|module)\s.*$/);
            var startingDoBlock = line.match(/.*do(\s*|\s+\|.*\|\s*)$/);
            var startingConditional = line.match(/^\s*(if|else)\s*/)
            if (match || startingClassOrMethod || startingDoBlock || startingConditional) ***REMOVED***
                indent += tab;
        ***REMOVED***
    ***REMOVED***

        return indent;
***REMOVED***;

    this.checkOutdent = function(state, line, input) ***REMOVED***
        return /^\s+end$/.test(line + input) || /^\s+***REMOVED***$/.test(line + input) || /^\s+else$/.test(line + input);
***REMOVED***;

    this.autoOutdent = function(state, doc, row) ***REMOVED***
        var indent = this.$getIndent(doc.getLine(row));
        var tab = doc.getTabString();
        if (indent.slice(-tab.length) == tab)
            doc.remove(new Range(row, indent.length-tab.length, row, indent.length));
***REMOVED***;

    this.$id = "ace/mode/ruby";
***REMOVED***).call(Mode.prototype);

exports.Mode = Mode;
***REMOVED***);

define('ace/mode/ruby_highlight_rules', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text_highlight_rules'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;
var constantOtherSymbol = exports.constantOtherSymbol = ***REMOVED***
    token : "constant.other.symbol.ruby", // symbol
    regex : "[:](?:[A-Za-z_]|[@$](?=[a-zA-Z0-9_]))[a-zA-Z0-9_]*[!=?]?"
***REMOVED***;

var qString = exports.qString = ***REMOVED***
    token : "string", // single line
    regex : "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"
***REMOVED***;

var qqString = exports.qqString = ***REMOVED***
    token : "string", // single line
    regex : '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'
***REMOVED***;

var tString = exports.tString = ***REMOVED***
    token : "string", // backtick string
    regex : "[`](?:(?:\\\\.)|(?:[^'\\\\]))*?[`]"
***REMOVED***;

var constantNumericHex = exports.constantNumericHex = ***REMOVED***
    token : "constant.numeric", // hex
    regex : "0[xX][0-9a-fA-F](?:[0-9a-fA-F]|_(?=[0-9a-fA-F]))*\\b"
***REMOVED***;

var constantNumericFloat = exports.constantNumericFloat = ***REMOVED***
    token : "constant.numeric", // float
    regex : "[+-]?\\d(?:\\d|_(?=\\d))*(?:(?:\\.\\d(?:\\d|_(?=\\d))*)?(?:[eE][+-]?\\d+)?)?\\b"
***REMOVED***;

var RubyHighlightRules = function() ***REMOVED***

    var builtinFunctions = (
        "abort|Array|assert|assert_equal|assert_not_equal|assert_same|assert_not_same|" +
        "assert_nil|assert_not_nil|assert_match|assert_no_match|assert_in_delta|assert_throws|" +
        "assert_raise|assert_nothing_raised|assert_instance_of|assert_kind_of|assert_respond_to|" +
        "assert_operator|assert_send|assert_difference|assert_no_difference|assert_recognizes|" +
        "assert_generates|assert_response|assert_redirected_to|assert_template|assert_select|" +
        "assert_select_email|assert_select_rjs|assert_select_encoded|css_select|at_exit|" +
        "attr|attr_writer|attr_reader|attr_accessor|attr_accessible|autoload|binding|block_given?|callcc|" +
        "caller|catch|chomp|chomp!|chop|chop!|defined?|delete_via_redirect|eval|exec|exit|" +
        "exit!|fail|Float|flunk|follow_redirect!|fork|form_for|form_tag|format|gets|global_variables|gsub|" +
        "gsub!|get_via_redirect|host!|https?|https!|include|Integer|lambda|link_to|" +
        "link_to_unless_current|link_to_function|link_to_remote|load|local_variables|loop|open|open_session|" +
        "p|print|printf|proc|putc|puts|post_via_redirect|put_via_redirect|raise|rand|" +
        "raw|readline|readlines|redirect?|request_via_redirect|require|scan|select|" +
        "set_trace_func|sleep|split|sprintf|srand|String|stylesheet_link_tag|syscall|system|sub|sub!|test|" +
        "throw|trace_var|trap|untrace_var|atan2|cos|exp|frexp|ldexp|log|log10|sin|sqrt|tan|" +
        "render|javascript_include_tag|csrf_meta_tag|label_tag|text_field_tag|submit_tag|check_box_tag|" +
        "content_tag|radio_button_tag|text_area_tag|password_field_tag|hidden_field_tag|" +
        "fields_for|select_tag|options_for_select|options_from_collection_for_select|collection_select|" +
        "time_zone_select|select_date|select_time|select_datetime|date_select|time_select|datetime_select|" +
        "select_year|select_month|select_day|select_hour|select_minute|select_second|file_field_tag|" +
        "file_field|respond_to|skip_before_filter|around_filter|after_filter|verify|" +
        "protect_from_forgery|rescue_from|helper_method|redirect_to|before_filter|" +
        "send_data|send_file|validates_presence_of|validates_uniqueness_of|validates_length_of|" +
        "validates_format_of|validates_acceptance_of|validates_associated|validates_exclusion_of|" +
        "validates_inclusion_of|validates_numericality_of|validates_with|validates_each|" +
        "authenticate_or_request_with_http_basic|authenticate_or_request_with_http_digest|" +
        "filter_parameter_logging|match|get|post|resources|redirect|scope|assert_routing|" +
        "translate|localize|extract_locale_from_tld|caches_page|expire_page|caches_action|expire_action|" +
        "cache|expire_fragment|expire_cache_for|observe|cache_sweeper|" +
        "has_many|has_one|belongs_to|has_and_belongs_to_many"
    );

    var keywords = (
        "alias|and|BEGIN|begin|break|case|class|def|defined|do|else|elsif|END|end|ensure|" +
        "__FILE__|finally|for|gem|if|in|__LINE__|module|next|not|or|private|protected|public|" +
        "redo|rescue|retry|return|super|then|undef|unless|until|when|while|yield"
    );

    var buildinConstants = (
        "true|TRUE|false|FALSE|nil|NIL|ARGF|ARGV|DATA|ENV|RUBY_PLATFORM|RUBY_RELEASE_DATE|" +
        "RUBY_VERSION|STDERR|STDIN|STDOUT|TOPLEVEL_BINDING"
    );

    var builtinVariables = (
        "\$DEBUG|\$defout|\$FILENAME|\$LOAD_PATH|\$SAFE|\$stdin|\$stdout|\$stderr|\$VERBOSE|" +
        "$!|root_url|flash|session|cookies|params|request|response|logger|self"
    );

    var keywordMapper = this.$keywords = this.createKeywordMapper(***REMOVED***
        "keyword": keywords,
        "constant.language": buildinConstants,
        "variable.language": builtinVariables,
        "support.function": builtinFunctions,
        "invalid.deprecated": "debugger" // TODO is this a remnant from js mode?
***REMOVED*** "identifier");

    this.$rules = ***REMOVED***
        "start" : [
            ***REMOVED***
                token : "comment",
                regex : "#.*$"
        ***REMOVED*** ***REMOVED***
                token : "comment", // multi line comment
                regex : "^=begin(?:$|\\s.*$)",
                next : "comment"
        ***REMOVED*** ***REMOVED***
                token : "string.regexp",
                regex : "[/](?:(?:\\[(?:\\\\]|[^\\]])+\\])|(?:\\\\/|[^\\]/]))*[/]\\w*\\s*(?=[).,;]|$)"
        ***REMOVED***

            qString,
            qqString,
            tString,

            ***REMOVED***
                token : "text", // namespaces aren't symbols
                regex : "::"
        ***REMOVED*** ***REMOVED***
                token : "variable.instance", // instance variable
                regex : "@***REMOVED***1,2***REMOVED***[a-zA-Z_\\d]+"
        ***REMOVED*** ***REMOVED***
                token : "support.class", // class name
                regex : "[A-Z][a-zA-Z_\\d]+"
        ***REMOVED***

            constantOtherSymbol,
            constantNumericHex,
            constantNumericFloat,

            ***REMOVED***
                token : "constant.language.boolean",
                regex : "(?:true|false)\\b"
        ***REMOVED*** ***REMOVED***
                token : keywordMapper,
                regex : "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
        ***REMOVED*** ***REMOVED***
                token : "punctuation.separator.key-value",
                regex : "=>"
        ***REMOVED*** ***REMOVED***
                stateName: "heredoc",
                onMatch : function(value, currentState, stack) ***REMOVED***
                    var next = value[2] == '-' ? "indentedHeredoc" : "heredoc";
                    var tokens = value.split(this.splitRegex);
                    stack.push(next, tokens[3]);
                    return [
                        ***REMOVED***type:"constant", value: tokens[1]***REMOVED***,
                        ***REMOVED***type:"string", value: tokens[2]***REMOVED***,
                        ***REMOVED***type:"support.class", value: tokens[3]***REMOVED***,
                        ***REMOVED***type:"string", value: tokens[4]***REMOVED***
                    ];
            ***REMOVED***
                regex : "(<<-?)(['\"`]?)([\\w]+)(['\"`]?)",
                rules: ***REMOVED***
                    heredoc: [***REMOVED***
                        onMatch:  function(value, currentState, stack) ***REMOVED***
                            if (value === stack[1]) ***REMOVED***
                                stack.shift();
                                stack.shift();
                                this.next = stack[0] || "start";
                                return "support.class";
                        ***REMOVED***
                            this.next = "";
                            return "string";
                    ***REMOVED***
                        regex: ".*$",
                        next: "start"
                ***REMOVED***],
                    indentedHeredoc: [***REMOVED***
                        token: "string",
                        regex: "^ +"
                ***REMOVED*** ***REMOVED***
                        onMatch:  function(value, currentState, stack) ***REMOVED***
                            if (value === stack[1]) ***REMOVED***
                                stack.shift();
                                stack.shift();
                                this.next = stack[0] || "start";
                                return "support.class";
                        ***REMOVED***
                            this.next = "";
                            return "string";
                    ***REMOVED***
                        regex: ".*$",
                        next: "start"
                ***REMOVED***]
            ***REMOVED***
        ***REMOVED*** ***REMOVED***
                regex : "$",
                token : "empty",
                next : function(currentState, stack) ***REMOVED***
                    if (stack[0] === "heredoc" || stack[0] === "indentedHeredoc")
                        return stack[0];
                    return currentState;
            ***REMOVED***
        ***REMOVED*** ***REMOVED***
                token : "keyword.operator",
                regex : "!|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=|\\b(?:in|instanceof|new|delete|typeof|void)"
        ***REMOVED*** ***REMOVED***
                token : "paren.lparen",
                regex : "[[(***REMOVED***]"
        ***REMOVED*** ***REMOVED***
                token : "paren.rparen",
                regex : "[\\])***REMOVED***]"
        ***REMOVED*** ***REMOVED***
                token : "text",
                regex : "\\s+"
        ***REMOVED***
        ],
        "comment" : [
            ***REMOVED***
                token : "comment", // closing comment
                regex : "^=end(?:$|\\s.*$)",
                next : "start"
        ***REMOVED*** ***REMOVED***
                token : "comment", // comment spanning whole line
                regex : ".+"
        ***REMOVED***
        ]
***REMOVED***;

    this.normalizeRules();
***REMOVED***;

oop.inherits(RubyHighlightRules, TextHighlightRules);

exports.RubyHighlightRules = RubyHighlightRules;
***REMOVED***);

define('ace/mode/matching_brace_outdent', ['require', 'exports', 'module' , 'ace/range'], function(require, exports, module) ***REMOVED***


var Range = require("../range").Range;

var MatchingBraceOutdent = function() ***REMOVED******REMOVED***;

(function() ***REMOVED***

    this.checkOutdent = function(line, input) ***REMOVED***
        if (! /^\s+$/.test(line))
            return false;

        return /^\s*\***REMOVED***/.test(input);
***REMOVED***;

    this.autoOutdent = function(doc, row) ***REMOVED***
        var line = doc.getLine(row);
        var match = line.match(/^(\s*\***REMOVED***)/);

        if (!match) return 0;

        var column = match[1].length;
        var openBracePos = doc.findMatchingBracket(***REMOVED***row: row, column: column***REMOVED***);

        if (!openBracePos || openBracePos.row == row) return 0;

        var indent = this.$getIndent(doc.getLine(openBracePos.row));
        doc.replace(new Range(row, 0, row, column-1), indent);
***REMOVED***;

    this.$getIndent = function(line) ***REMOVED***
        return line.match(/^\s*/)[0];
***REMOVED***;

***REMOVED***).call(MatchingBraceOutdent.prototype);

exports.MatchingBraceOutdent = MatchingBraceOutdent;
***REMOVED***);

define('ace/mode/folding/coffee', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/folding/fold_mode', 'ace/range'], function(require, exports, module) ***REMOVED***


var oop = require("../../lib/oop");
var BaseFoldMode = require("./fold_mode").FoldMode;
var Range = require("../../range").Range;

var FoldMode = exports.FoldMode = function() ***REMOVED******REMOVED***;
oop.inherits(FoldMode, BaseFoldMode);

(function() ***REMOVED***

    this.getFoldWidgetRange = function(session, foldStyle, row) ***REMOVED***
        var range = this.indentationBlock(session, row);
        if (range)
            return range;

        var re = /\S/;
        var line = session.getLine(row);
        var startLevel = line.search(re);
        if (startLevel == -1 || line[startLevel] != "#")
            return;

        var startColumn = line.length;
        var maxRow = session.getLength();
        var startRow = row;
        var endRow = row;

        while (++row < maxRow) ***REMOVED***
            line = session.getLine(row);
            var level = line.search(re);

            if (level == -1)
                continue;

            if (line[level] != "#")
                break;

            endRow = row;
    ***REMOVED***

        if (endRow > startRow) ***REMOVED***
            var endColumn = session.getLine(endRow).length;
            return new Range(startRow, startColumn, endRow, endColumn);
    ***REMOVED***
***REMOVED***;
    this.getFoldWidget = function(session, foldStyle, row) ***REMOVED***
        var line = session.getLine(row);
        var indent = line.search(/\S/);
        var next = session.getLine(row + 1);
        var prev = session.getLine(row - 1);
        var prevIndent = prev.search(/\S/);
        var nextIndent = next.search(/\S/);

        if (indent == -1) ***REMOVED***
            session.foldWidgets[row - 1] = prevIndent!= -1 && prevIndent < nextIndent ? "start" : "";
            return "";
    ***REMOVED***
        if (prevIndent == -1) ***REMOVED***
            if (indent == nextIndent && line[indent] == "#" && next[indent] == "#") ***REMOVED***
                session.foldWidgets[row - 1] = "";
                session.foldWidgets[row + 1] = "";
                return "start";
        ***REMOVED***
    ***REMOVED*** else if (prevIndent == indent && line[indent] == "#" && prev[indent] == "#") ***REMOVED***
            if (session.getLine(row - 2).search(/\S/) == -1) ***REMOVED***
                session.foldWidgets[row - 1] = "start";
                session.foldWidgets[row + 1] = "";
                return "";
        ***REMOVED***
    ***REMOVED***

        if (prevIndent!= -1 && prevIndent < indent)
            session.foldWidgets[row - 1] = "start";
        else
            session.foldWidgets[row - 1] = "";

        if (indent < nextIndent)
            return "start";
        else
            return "";
***REMOVED***;

***REMOVED***).call(FoldMode.prototype);

***REMOVED***);
