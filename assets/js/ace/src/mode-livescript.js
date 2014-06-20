define('ace/mode/livescript', ['require', 'exports', 'module' , 'ace/tokenizer', 'ace/mode/matching_brace_outdent', 'ace/range', 'ace/mode/text'], function(require, exports, module) ***REMOVED***
  var identifier, LiveScriptMode, keywordend, stringfill;
  identifier = '(?![\\d\\s])[$\\w\\xAA-\\uFFDC](?:(?!\\s)[$\\w\\xAA-\\uFFDC]|-[A-Za-z])*';
  exports.Mode = LiveScriptMode = (function(superclass)***REMOVED***
    var indenter, prototype = extend$((import$(LiveScriptMode, superclass).displayName = 'LiveScriptMode', LiveScriptMode), superclass).prototype, constructor = LiveScriptMode;
    function LiveScriptMode()***REMOVED***
      var that;
      this.$tokenizer = new (require('../tokenizer')).Tokenizer(LiveScriptMode.Rules);
      if (that = require('../mode/matching_brace_outdent')) ***REMOVED***
        this.$outdent = new that.MatchingBraceOutdent;
  ***REMOVED***
      this.$id = "ace/mode/livescript";
***REMOVED***
    indenter = RegExp('(?:[(***REMOVED***[=:]|[-~]>|\\b(?:e(?:lse|xport)|d(?:o|efault)|t(?:ry|hen)|finally|import(?:\\s*all)?|const|var|let|new|catch(?:\\s*' + identifier + ')?))\\s*$');
    prototype.getNextLineIndent = function(state, line, tab)***REMOVED***
      var indent, tokens;
      indent = this.$getIndent(line);
      tokens = this.$tokenizer.getLineTokens(line, state).tokens;
      if (!(tokens.length && tokens[tokens.length - 1].type === 'comment')) ***REMOVED***
        if (state === 'start' && indenter.test(line)) ***REMOVED***
          indent += tab;
    ***REMOVED***
  ***REMOVED***
      return indent;
***REMOVED***;
    prototype.toggleCommentLines = function(state, doc, startRow, endRow)***REMOVED***
      var comment, range, i$, i, out, line;
      comment = /^(\s*)#/;
      range = new (require('../range')).Range(0, 0, 0, 0);
      for (i$ = startRow; i$ <= endRow; ++i$) ***REMOVED***
        i = i$;
        if (out = comment.test(line = doc.getLine(i))) ***REMOVED***
          line = line.replace(comment, '$1');
    ***REMOVED*** else ***REMOVED***
          line = line.replace(/^\s*/, '$&#');
    ***REMOVED***
        range.end.row = range.start.row = i;
        range.end.column = line.length + 1;
        doc.replace(range, line);
  ***REMOVED***
      return 1 - out * 2;
***REMOVED***;
    prototype.checkOutdent = function(state, line, input)***REMOVED***
      var ref$;
      return (ref$ = this.$outdent) != null ? ref$.checkOutdent(line, input) : void 8;
***REMOVED***;
    prototype.autoOutdent = function(state, doc, row)***REMOVED***
      var ref$;
      return (ref$ = this.$outdent) != null ? ref$.autoOutdent(doc, row) : void 8;
***REMOVED***;
    return LiveScriptMode;
  ***REMOVED***(require('../mode/text').Mode));
  keywordend = '(?![$\\w]|-[A-Za-z]|\\s*:(?![:=]))';
  stringfill = ***REMOVED***
    token: 'string',
    regex: '.+'
  ***REMOVED***;
  LiveScriptMode.Rules = ***REMOVED***
    start: [
      ***REMOVED***
        token: 'keyword',
        regex: '(?:t(?:h(?:is|row|en)|ry|ypeof!?)|c(?:on(?:tinue|st)|a(?:se|tch)|lass)|i(?:n(?:stanceof)?|mp(?:ort(?:\\s+all)?|lements)|[fs])|d(?:e(?:fault|lete|bugger)|o)|f(?:or(?:\\s+own)?|inally|unction)|s(?:uper|witch)|e(?:lse|x(?:tends|port)|val)|a(?:nd|rguments)|n(?:ew|ot)|un(?:less|til)|w(?:hile|ith)|o[fr]|return|break|let|var|loop)' + keywordend
  ***REMOVED*** ***REMOVED***
        token: 'constant.language',
        regex: '(?:true|false|yes|no|on|off|null|void|undefined)' + keywordend
  ***REMOVED*** ***REMOVED***
        token: 'invalid.illegal',
        regex: '(?:p(?:ackage|r(?:ivate|otected)|ublic)|i(?:mplements|nterface)|enum|static|yield)' + keywordend
  ***REMOVED*** ***REMOVED***
        token: 'language.support.class',
        regex: '(?:R(?:e(?:gExp|ferenceError)|angeError)|S(?:tring|yntaxError)|E(?:rror|valError)|Array|Boolean|Date|Function|Number|Object|TypeError|URIError)' + keywordend
  ***REMOVED*** ***REMOVED***
        token: 'language.support.function',
        regex: '(?:is(?:NaN|Finite)|parse(?:Int|Float)|Math|JSON|(?:en|de)codeURI(?:Component)?)' + keywordend
  ***REMOVED*** ***REMOVED***
        token: 'variable.language',
        regex: '(?:t(?:hat|il|o)|f(?:rom|allthrough)|it|by|e)' + keywordend
  ***REMOVED*** ***REMOVED***
        token: 'identifier',
        regex: identifier + '\\s*:(?![:=])'
  ***REMOVED*** ***REMOVED***
        token: 'variable',
        regex: identifier
  ***REMOVED*** ***REMOVED***
        token: 'keyword.operator',
        regex: '(?:\\.***REMOVED***3***REMOVED***|\\s+\\?)'
  ***REMOVED*** ***REMOVED***
        token: 'keyword.variable',
        regex: '(?:@+|::|\\.\\.)',
        next: 'key'
  ***REMOVED*** ***REMOVED***
        token: 'keyword.operator',
        regex: '\\.\\s*',
        next: 'key'
  ***REMOVED*** ***REMOVED***
        token: 'string',
        regex: '\\\\\\S[^\\s,;)***REMOVED***\\]]*'
  ***REMOVED*** ***REMOVED***
        token: 'string.doc',
        regex: '\'\'\'',
        next: 'qdoc'
  ***REMOVED*** ***REMOVED***
        token: 'string.doc',
        regex: '"""',
        next: 'qqdoc'
  ***REMOVED*** ***REMOVED***
        token: 'string',
        regex: '\'',
        next: 'qstring'
  ***REMOVED*** ***REMOVED***
        token: 'string',
        regex: '"',
        next: 'qqstring'
  ***REMOVED*** ***REMOVED***
        token: 'string',
        regex: '`',
        next: 'js'
  ***REMOVED*** ***REMOVED***
        token: 'string',
        regex: '<\\[',
        next: 'words'
  ***REMOVED*** ***REMOVED***
        token: 'string.regex',
        regex: '//',
        next: 'heregex'
  ***REMOVED*** ***REMOVED***
        token: 'comment.doc',
        regex: '/\\*',
        next: 'comment'
  ***REMOVED*** ***REMOVED***
        token: 'comment',
        regex: '#.*'
  ***REMOVED*** ***REMOVED***
        token: 'string.regex',
        regex: '\\/(?:[^[\\/\\n\\\\]*(?:(?:\\\\.|\\[[^\\]\\n\\\\]*(?:\\\\.[^\\]\\n\\\\]*)*\\])[^[\\/\\n\\\\]*)*)\\/[gimy$]***REMOVED***0,4***REMOVED***',
        next: 'key'
  ***REMOVED*** ***REMOVED***
        token: 'constant.numeric',
        regex: '(?:0x[\\da-fA-F][\\da-fA-F_]*|(?:[2-9]|[12]\\d|3[0-6])r[\\da-zA-Z][\\da-zA-Z_]*|(?:\\d[\\d_]*(?:\\.\\d[\\d_]*)?|\\.\\d[\\d_]*)(?:e[+-]?\\d[\\d_]*)?[\\w$]*)'
  ***REMOVED*** ***REMOVED***
        token: 'lparen',
        regex: '[(***REMOVED***[]'
  ***REMOVED*** ***REMOVED***
        token: 'rparen',
        regex: '[)***REMOVED***\\]]',
        next: 'key'
  ***REMOVED*** ***REMOVED***
        token: 'keyword.operator',
        regex: '\\S+'
  ***REMOVED*** ***REMOVED***
        token: 'text',
        regex: '\\s+'
  ***REMOVED***
    ],
    heregex: [
      ***REMOVED***
        token: 'string.regex',
        regex: '.*?//[gimy$?]***REMOVED***0,4***REMOVED***',
        next: 'start'
  ***REMOVED*** ***REMOVED***
        token: 'string.regex',
        regex: '\\s*#***REMOVED***'
  ***REMOVED*** ***REMOVED***
        token: 'comment.regex',
        regex: '\\s+(?:#.*)?'
  ***REMOVED*** ***REMOVED***
        token: 'string.regex',
        regex: '\\S+'
  ***REMOVED***
    ],
    key: [
      ***REMOVED***
        token: 'keyword.operator',
        regex: '[.?@!]+'
  ***REMOVED*** ***REMOVED***
        token: 'identifier',
        regex: identifier,
        next: 'start'
  ***REMOVED*** ***REMOVED***
        token: 'text',
        regex: '.',
        next: 'start'
  ***REMOVED***
    ],
    comment: [
      ***REMOVED***
        token: 'comment.doc',
        regex: '.*?\\*/',
        next: 'start'
  ***REMOVED*** ***REMOVED***
        token: 'comment.doc',
        regex: '.+'
  ***REMOVED***
    ],
    qdoc: [
      ***REMOVED***
        token: 'string',
        regex: ".*?'''",
        next: 'key'
  ***REMOVED*** stringfill
    ],
    qqdoc: [
      ***REMOVED***
        token: 'string',
        regex: '.*?"""',
        next: 'key'
  ***REMOVED*** stringfill
    ],
    qstring: [
      ***REMOVED***
        token: 'string',
        regex: '[^\\\\\']*(?:\\\\.[^\\\\\']*)*\'',
        next: 'key'
  ***REMOVED*** stringfill
    ],
    qqstring: [
      ***REMOVED***
        token: 'string',
        regex: '[^\\\\"]*(?:\\\\.[^\\\\"]*)*"',
        next: 'key'
  ***REMOVED*** stringfill
    ],
    js: [
      ***REMOVED***
        token: 'string',
        regex: '[^\\\\`]*(?:\\\\.[^\\\\`]*)*`',
        next: 'key'
  ***REMOVED*** stringfill
    ],
    words: [
      ***REMOVED***
        token: 'string',
        regex: '.*?\\]>',
        next: 'key'
  ***REMOVED*** stringfill
    ]
  ***REMOVED***;
function extend$(sub, sup)***REMOVED***
  function fun()***REMOVED******REMOVED*** fun.prototype = (sub.superclass = sup).prototype;
  (sub.prototype = new fun).constructor = sub;
  if (typeof sup.extended == 'function') sup.extended(sub);
  return sub;
***REMOVED***
function import$(obj, src)***REMOVED***
  var own = ***REMOVED******REMOVED***.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
***REMOVED***
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
