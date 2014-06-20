__ace_shadowed__.define('ace/mode/powershell', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text', 'ace/mode/powershell_highlight_rules', 'ace/mode/matching_brace_outdent', 'ace/mode/behaviour/cstyle', 'ace/mode/folding/cstyle'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var PowershellHighlightRules = require("./powershell_highlight_rules").PowershellHighlightRules;
var MatchingBraceOutdent = require("./matching_brace_outdent").MatchingBraceOutdent;
var CstyleBehaviour = require("./behaviour/cstyle").CstyleBehaviour;
var CStyleFoldMode = require("./folding/cstyle").FoldMode;

var Mode = function() ***REMOVED***
    this.HighlightRules = PowershellHighlightRules;
    this.$outdent = new MatchingBraceOutdent();
    this.$behaviour = new CstyleBehaviour();
    this.foldingRules = new CStyleFoldMode(***REMOVED***start: "^\\s*(<#)", end: "^[#\\s]>\\s*$"***REMOVED***);
***REMOVED***;
oop.inherits(Mode, TextMode);

(function() ***REMOVED***

    this.lineCommentStart = "#";
    this.blockComment = ***REMOVED***start: "<#", end: "#>"***REMOVED***;
    
    this.getNextLineIndent = function(state, line, tab) ***REMOVED***
        var indent = this.$getIndent(line);

        var tokenizedLine = this.getTokenizer().getLineTokens(line, state);
        var tokens = tokenizedLine.tokens;

        if (tokens.length && tokens[tokens.length-1].type == "comment") ***REMOVED***
            return indent;
    ***REMOVED***
      
        if (state == "start") ***REMOVED***
            var match = line.match(/^.*[\***REMOVED***\(\[]\s*$/);
            if (match) ***REMOVED***
                indent += tab;
        ***REMOVED***
    ***REMOVED***

        return indent;
***REMOVED***;

    this.checkOutdent = function(state, line, input) ***REMOVED***
        return this.$outdent.checkOutdent(line, input);
***REMOVED***;

    this.autoOutdent = function(state, doc, row) ***REMOVED***
        this.$outdent.autoOutdent(doc, row);
***REMOVED***;


    this.createWorker = function(session) ***REMOVED***
        return null;
***REMOVED***;

    this.$id = "ace/mode/powershell";
***REMOVED***).call(Mode.prototype);

exports.Mode = Mode;
***REMOVED***);
__ace_shadowed__.define('ace/mode/powershell_highlight_rules', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text_highlight_rules'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var PowershellHighlightRules = function() ***REMOVED***

    var keywords = (
      "function|if|else|elseif|switch|while|default|for|do|until|break|continue|" +
       "foreach|return|filter|in|trap|throw|param|begin|process|end"
    );

    var builtinFunctions = (
      "Get-Alias|Import-Alias|New-Alias|Set-Alias|Get-AuthenticodeSignature|Set-AuthenticodeSignature|" +
       "Set-Location|Get-ChildItem|Clear-Item|Get-Command|Measure-Command|Trace-Command|" +
       "Add-Computer|Checkpoint-Computer|Remove-Computer|Restart-Computer|Restore-Computer|Stop-Computer|" +
       "Reset-ComputerMachinePassword|Test-ComputerSecureChannel|Add-Content|Get-Content|Set-Content|Clear-Content|" +
       "Get-Command|Invoke-Command|Enable-ComputerRestore|Disable-ComputerRestore|Get-ComputerRestorePoint|Test-Connection|" +
       "ConvertFrom-CSV|ConvertTo-CSV|ConvertTo-Html|ConvertTo-Xml|ConvertFrom-SecureString|ConvertTo-SecureString|" +
       "Copy-Item|Export-Counter|Get-Counter|Import-Counter|Get-Credential|Get-Culture|" +
       "Get-ChildItem|Get-Date|Set-Date|Remove-Item|Compare-Object|Get-Event|" +
       "Get-WinEvent|New-Event|Remove-Event|Unregister-Event|Wait-Event|Clear-EventLog|" +
       "Get-Eventlog|Limit-EventLog|New-Eventlog|Remove-EventLog|Show-EventLog|Write-EventLog|" +
       "Get-EventSubscriber|Register-EngineEvent|Register-ObjectEvent|Register-WmiEvent|Get-ExecutionPolicy|Set-ExecutionPolicy|" +
       "Export-Alias|Export-Clixml|Export-Console|Export-Csv|ForEach-Object|Format-Custom|" +
       "Format-List|Format-Table|Format-Wide|Export-FormatData|Get-FormatData|Get-Item|" +
       "Get-ChildItem|Get-Help|Add-History|Clear-History|Get-History|Invoke-History|" +
       "Get-Host|Read-Host|Write-Host|Get-HotFix|Import-Clixml|Import-Csv|" +
       "Invoke-Command|Invoke-Expression|Get-Item|Invoke-Item|New-Item|Remove-Item|" +
       "Set-Item|Clear-ItemProperty|Copy-ItemProperty|Get-ItemProperty|Move-ItemProperty|New-ItemProperty|" +
       "Remove-ItemProperty|Rename-ItemProperty|Set-ItemProperty|Get-Job|Receive-Job|Remove-Job|" +
       "Start-Job|Stop-Job|Wait-Job|Stop-Process|Update-List|Get-Location|" +
       "Pop-Location|Push-Location|Set-Location|Send-MailMessage|Add-Member|Get-Member|" +
       "Move-Item|Compare-Object|Group-Object|Measure-Object|New-Object|Select-Object|" +
       "Sort-Object|Where-Object|Out-Default|Out-File|Out-GridView|Out-Host|" +
       "Out-Null|Out-Printer|Out-String|Convert-Path|Join-Path|Resolve-Path|" +
       "Split-Path|Test-Path|Get-Pfxcertificate|Pop-Location|Push-Location|Get-Process|" +
       "Start-Process|Stop-Process|Wait-Process|Enable-PSBreakpoint|Disable-PSBreakpoint|Get-PSBreakpoint|" +
       "Set-PSBreakpoint|Remove-PSBreakpoint|Get-PSDrive|New-PSDrive|Remove-PSDrive|Get-PSProvider|" +
       "Set-PSdebug|Enter-PSSession|Exit-PSSession|Export-PSSession|Get-PSSession|Import-PSSession|" +
       "New-PSSession|Remove-PSSession|Disable-PSSessionConfiguration|Enable-PSSessionConfiguration|Get-PSSessionConfiguration|Register-PSSessionConfiguration|" +
       "Set-PSSessionConfiguration|Unregister-PSSessionConfiguration|New-PSSessionOption|Add-PsSnapIn|Get-PsSnapin|Remove-PSSnapin|" +
       "Get-Random|Read-Host|Remove-Item|Rename-Item|Rename-ItemProperty|Select-Object|" +
       "Select-XML|Send-MailMessage|Get-Service|New-Service|Restart-Service|Resume-Service|" +
       "Set-Service|Start-Service|Stop-Service|Suspend-Service|Sort-Object|Start-Sleep|" +
       "ConvertFrom-StringData|Select-String|Tee-Object|New-Timespan|Trace-Command|Get-Tracesource|" +
       "Set-Tracesource|Start-Transaction|Complete-Transaction|Get-Transaction|Use-Transaction|Undo-Transaction|" +
       "Start-Transcript|Stop-Transcript|Add-Type|Update-TypeData|Get-Uiculture|Get-Unique|" +
       "Update-Formatdata|Update-Typedata|Clear-Variable|Get-Variable|New-Variable|Remove-Variable|" +
       "Set-Variable|New-WebServiceProxy|Where-Object|Write-Debug|Write-Error|Write-Host|" +
       "Write-Output|Write-Progress|Write-Verbose|Write-Warning|Set-WmiInstance|Invoke-WmiMethod|" +
       "Get-WmiObject|Remove-WmiObject|Connect-WSMan|Disconnect-WSMan|Test-WSMan|Invoke-WSManAction|" +
       "Disable-WSManCredSSP|Enable-WSManCredSSP|Get-WSManCredSSP|New-WSManInstance|Get-WSManInstance|Set-WSManInstance|" +
       "Remove-WSManInstance|Set-WSManQuickConfig|New-WSManSessionOption"
       );

    var keywordMapper = this.createKeywordMapper(***REMOVED***
        "support.function": builtinFunctions,
        "keyword": keywords
***REMOVED*** "identifier");

    var binaryOperatorsRe = "eq|ne|ge|gt|lt|le|like|notlike|match|notmatch|replace|contains|notcontains|" +
                            "ieq|ine|ige|igt|ile|ilt|ilike|inotlike|imatch|inotmatch|ireplace|icontains|inotcontains|" +
                            "is|isnot|as|" +
                            "and|or|band|bor|not";

    this.$rules = ***REMOVED***
        "start" : [
            ***REMOVED***
                token : "comment",
                regex : "#.*$"
        ***REMOVED*** ***REMOVED***
                token : "comment.start",
                regex : "<#",
                next : "comment"
        ***REMOVED*** ***REMOVED***
                token : "string", // single line
                regex : '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'
        ***REMOVED*** ***REMOVED***
                token : "string", // single line
                regex : "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"
        ***REMOVED*** ***REMOVED***
                token : "constant.numeric", // hex
                regex : "0[xX][0-9a-fA-F]+\\b"
        ***REMOVED*** ***REMOVED***
                token : "constant.numeric", // float
                regex : "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
        ***REMOVED*** ***REMOVED***
                token : "constant.language.boolean",
                regex : "[$](?:[Tt]rue|[Ff]alse)\\b"
        ***REMOVED*** ***REMOVED***
                token : "constant.language",
                regex : "[$][Nn]ull\\b"
        ***REMOVED*** ***REMOVED***
                token : "variable.instance",
                regex : "[$][a-zA-Z][a-zA-Z0-9_]*\\b"
        ***REMOVED*** ***REMOVED***
                token : keywordMapper,
                regex : "[a-zA-Z_$][a-zA-Z0-9_$\\-]*\\b"
        ***REMOVED*** ***REMOVED***
                token : "keyword.operator",
                regex : "\\-(?:" + binaryOperatorsRe + ")"
        ***REMOVED*** ***REMOVED***
                token : "keyword.operator",
                regex : "&|\\*|\\+|\\-|\\=|\\+=|\\-="
        ***REMOVED*** ***REMOVED***
                token : "lparen",
                regex : "[[(***REMOVED***]"
        ***REMOVED*** ***REMOVED***
                token : "rparen",
                regex : "[\\])***REMOVED***]"
        ***REMOVED*** ***REMOVED***
                token : "text",
                regex : "\\s+"
        ***REMOVED***
        ],
        "comment" : [
            ***REMOVED***
                token : "comment.end",
                regex : "#>",
                next : "start"
        ***REMOVED*** ***REMOVED***
                token : "doc.comment.tag",
                regex : "^\\.\\w+"
        ***REMOVED*** ***REMOVED***
                token : "comment",
                regex : "\\w+"
        ***REMOVED*** ***REMOVED***
                token : "comment",
                regex : "."
        ***REMOVED***
        ]
***REMOVED***;
***REMOVED***;

oop.inherits(PowershellHighlightRules, TextHighlightRules);

exports.PowershellHighlightRules = PowershellHighlightRules;
***REMOVED***);

__ace_shadowed__.define('ace/mode/matching_brace_outdent', ['require', 'exports', 'module' , 'ace/range'], function(require, exports, module) ***REMOVED***


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

__ace_shadowed__.define('ace/mode/behaviour/cstyle', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/behaviour', 'ace/token_iterator', 'ace/lib/lang'], function(require, exports, module) ***REMOVED***


var oop = require("../../lib/oop");
var Behaviour = require("../behaviour").Behaviour;
var TokenIterator = require("../../token_iterator").TokenIterator;
var lang = require("../../lib/lang");

var SAFE_INSERT_IN_TOKENS =
    ["text", "paren.rparen", "punctuation.operator"];
var SAFE_INSERT_BEFORE_TOKENS =
    ["text", "paren.rparen", "punctuation.operator", "comment"];

var context;
var contextCache = ***REMOVED******REMOVED***
var initContext = function(editor) ***REMOVED***
    var id = -1;
    if (editor.multiSelect) ***REMOVED***
        id = editor.selection.id;
        if (contextCache.rangeCount != editor.multiSelect.rangeCount)
            contextCache = ***REMOVED***rangeCount: editor.multiSelect.rangeCount***REMOVED***;
***REMOVED***
    if (contextCache[id])
        return context = contextCache[id];
    context = contextCache[id] = ***REMOVED***
        autoInsertedBrackets: 0,
        autoInsertedRow: -1,
        autoInsertedLineEnd: "",
        maybeInsertedBrackets: 0,
        maybeInsertedRow: -1,
        maybeInsertedLineStart: "",
        maybeInsertedLineEnd: ""
***REMOVED***;
***REMOVED***;

var CstyleBehaviour = function() ***REMOVED***
    this.add("braces", "insertion", function(state, action, editor, session, text) ***REMOVED***
        var cursor = editor.getCursorPosition();
        var line = session.doc.getLine(cursor.row);
        if (text == '***REMOVED***') ***REMOVED***
            initContext(editor);
            var selection = editor.getSelectionRange();
            var selected = session.doc.getTextRange(selection);
            if (selected !== "" && selected !== "***REMOVED***" && editor.getWrapBehavioursEnabled()) ***REMOVED***
                return ***REMOVED***
                    text: '***REMOVED***' + selected + '***REMOVED***',
                    selection: false
            ***REMOVED***;
        ***REMOVED*** else if (CstyleBehaviour.isSaneInsertion(editor, session)) ***REMOVED***
                if (/[\]\***REMOVED***\)]/.test(line[cursor.column]) || editor.inMultiSelectMode) ***REMOVED***
                    CstyleBehaviour.recordAutoInsert(editor, session, "***REMOVED***");
                    return ***REMOVED***
                        text: '***REMOVED******REMOVED***',
                        selection: [1, 1]
                ***REMOVED***;
            ***REMOVED*** else ***REMOVED***
                    CstyleBehaviour.recordMaybeInsert(editor, session, "***REMOVED***");
                    return ***REMOVED***
                        text: '***REMOVED***',
                        selection: [1, 1]
                ***REMOVED***;
            ***REMOVED***
        ***REMOVED***
    ***REMOVED*** else if (text == '***REMOVED***') ***REMOVED***
            initContext(editor);
            var rightChar = line.substring(cursor.column, cursor.column + 1);
            if (rightChar == '***REMOVED***') ***REMOVED***
                var matching = session.$findOpeningBracket('***REMOVED***', ***REMOVED***column: cursor.column + 1, row: cursor.row***REMOVED***);
                if (matching !== null && CstyleBehaviour.isAutoInsertedClosing(cursor, line, text)) ***REMOVED***
                    CstyleBehaviour.popAutoInsertedClosing();
                    return ***REMOVED***
                        text: '',
                        selection: [1, 1]
                ***REMOVED***;
            ***REMOVED***
        ***REMOVED***
    ***REMOVED*** else if (text == "\n" || text == "\r\n") ***REMOVED***
            initContext(editor);
            var closing = "";
            if (CstyleBehaviour.isMaybeInsertedClosing(cursor, line)) ***REMOVED***
                closing = lang.stringRepeat("***REMOVED***", context.maybeInsertedBrackets);
                CstyleBehaviour.clearMaybeInsertedClosing();
        ***REMOVED***
            var rightChar = line.substring(cursor.column, cursor.column + 1);
            if (rightChar === '***REMOVED***') ***REMOVED***
                var openBracePos = session.findMatchingBracket(***REMOVED***row: cursor.row, column: cursor.column+1***REMOVED***, '***REMOVED***');
                if (!openBracePos)
                     return null;
                var next_indent = this.$getIndent(session.getLine(openBracePos.row));
        ***REMOVED*** else if (closing) ***REMOVED***
                var next_indent = this.$getIndent(line);
        ***REMOVED*** else ***REMOVED***
                CstyleBehaviour.clearMaybeInsertedClosing();
                return;
        ***REMOVED***
            var indent = next_indent + session.getTabString();

            return ***REMOVED***
                text: '\n' + indent + '\n' + next_indent + closing,
                selection: [1, indent.length, 1, indent.length]
        ***REMOVED***;
    ***REMOVED*** else ***REMOVED***
            CstyleBehaviour.clearMaybeInsertedClosing();
    ***REMOVED***
***REMOVED***);

    this.add("braces", "deletion", function(state, action, editor, session, range) ***REMOVED***
        var selected = session.doc.getTextRange(range);
        if (!range.isMultiLine() && selected == '***REMOVED***') ***REMOVED***
            initContext(editor);
            var line = session.doc.getLine(range.start.row);
            var rightChar = line.substring(range.end.column, range.end.column + 1);
            if (rightChar == '***REMOVED***') ***REMOVED***
                range.end.column++;
                return range;
        ***REMOVED*** else ***REMOVED***
                context.maybeInsertedBrackets--;
        ***REMOVED***
    ***REMOVED***
***REMOVED***);

    this.add("parens", "insertion", function(state, action, editor, session, text) ***REMOVED***
        if (text == '(') ***REMOVED***
            initContext(editor);
            var selection = editor.getSelectionRange();
            var selected = session.doc.getTextRange(selection);
            if (selected !== "" && editor.getWrapBehavioursEnabled()) ***REMOVED***
                return ***REMOVED***
                    text: '(' + selected + ')',
                    selection: false
            ***REMOVED***;
        ***REMOVED*** else if (CstyleBehaviour.isSaneInsertion(editor, session)) ***REMOVED***
                CstyleBehaviour.recordAutoInsert(editor, session, ")");
                return ***REMOVED***
                    text: '()',
                    selection: [1, 1]
            ***REMOVED***;
        ***REMOVED***
    ***REMOVED*** else if (text == ')') ***REMOVED***
            initContext(editor);
            var cursor = editor.getCursorPosition();
            var line = session.doc.getLine(cursor.row);
            var rightChar = line.substring(cursor.column, cursor.column + 1);
            if (rightChar == ')') ***REMOVED***
                var matching = session.$findOpeningBracket(')', ***REMOVED***column: cursor.column + 1, row: cursor.row***REMOVED***);
                if (matching !== null && CstyleBehaviour.isAutoInsertedClosing(cursor, line, text)) ***REMOVED***
                    CstyleBehaviour.popAutoInsertedClosing();
                    return ***REMOVED***
                        text: '',
                        selection: [1, 1]
                ***REMOVED***;
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***
***REMOVED***);

    this.add("parens", "deletion", function(state, action, editor, session, range) ***REMOVED***
        var selected = session.doc.getTextRange(range);
        if (!range.isMultiLine() && selected == '(') ***REMOVED***
            initContext(editor);
            var line = session.doc.getLine(range.start.row);
            var rightChar = line.substring(range.start.column + 1, range.start.column + 2);
            if (rightChar == ')') ***REMOVED***
                range.end.column++;
                return range;
        ***REMOVED***
    ***REMOVED***
***REMOVED***);

    this.add("brackets", "insertion", function(state, action, editor, session, text) ***REMOVED***
        if (text == '[') ***REMOVED***
            initContext(editor);
            var selection = editor.getSelectionRange();
            var selected = session.doc.getTextRange(selection);
            if (selected !== "" && editor.getWrapBehavioursEnabled()) ***REMOVED***
                return ***REMOVED***
                    text: '[' + selected + ']',
                    selection: false
            ***REMOVED***;
        ***REMOVED*** else if (CstyleBehaviour.isSaneInsertion(editor, session)) ***REMOVED***
                CstyleBehaviour.recordAutoInsert(editor, session, "]");
                return ***REMOVED***
                    text: '[]',
                    selection: [1, 1]
            ***REMOVED***;
        ***REMOVED***
    ***REMOVED*** else if (text == ']') ***REMOVED***
            initContext(editor);
            var cursor = editor.getCursorPosition();
            var line = session.doc.getLine(cursor.row);
            var rightChar = line.substring(cursor.column, cursor.column + 1);
            if (rightChar == ']') ***REMOVED***
                var matching = session.$findOpeningBracket(']', ***REMOVED***column: cursor.column + 1, row: cursor.row***REMOVED***);
                if (matching !== null && CstyleBehaviour.isAutoInsertedClosing(cursor, line, text)) ***REMOVED***
                    CstyleBehaviour.popAutoInsertedClosing();
                    return ***REMOVED***
                        text: '',
                        selection: [1, 1]
                ***REMOVED***;
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***
***REMOVED***);

    this.add("brackets", "deletion", function(state, action, editor, session, range) ***REMOVED***
        var selected = session.doc.getTextRange(range);
        if (!range.isMultiLine() && selected == '[') ***REMOVED***
            initContext(editor);
            var line = session.doc.getLine(range.start.row);
            var rightChar = line.substring(range.start.column + 1, range.start.column + 2);
            if (rightChar == ']') ***REMOVED***
                range.end.column++;
                return range;
        ***REMOVED***
    ***REMOVED***
***REMOVED***);

    this.add("string_dquotes", "insertion", function(state, action, editor, session, text) ***REMOVED***
        if (text == '"' || text == "'") ***REMOVED***
            initContext(editor);
            var quote = text;
            var selection = editor.getSelectionRange();
            var selected = session.doc.getTextRange(selection);
            if (selected !== "" && selected !== "'" && selected != '"' && editor.getWrapBehavioursEnabled()) ***REMOVED***
                return ***REMOVED***
                    text: quote + selected + quote,
                    selection: false
            ***REMOVED***;
        ***REMOVED*** else ***REMOVED***
                var cursor = editor.getCursorPosition();
                var line = session.doc.getLine(cursor.row);
                var leftChar = line.substring(cursor.column-1, cursor.column);
                if (leftChar == '\\') ***REMOVED***
                    return null;
            ***REMOVED***
                var tokens = session.getTokens(selection.start.row);
                var col = 0, token;
                var quotepos = -1; // Track whether we're inside an open quote.

                for (var x = 0; x < tokens.length; x++) ***REMOVED***
                    token = tokens[x];
                    if (token.type == "string") ***REMOVED***
                      quotepos = -1;
                ***REMOVED*** else if (quotepos < 0) ***REMOVED***
                      quotepos = token.value.indexOf(quote);
                ***REMOVED***
                    if ((token.value.length + col) > selection.start.column) ***REMOVED***
                        break;
                ***REMOVED***
                    col += tokens[x].value.length;
            ***REMOVED***
                if (!token || (quotepos < 0 && token.type !== "comment" && (token.type !== "string" || ((selection.start.column !== token.value.length+col-1) && token.value.lastIndexOf(quote) === token.value.length-1)))) ***REMOVED***
                    if (!CstyleBehaviour.isSaneInsertion(editor, session))
                        return;
                    return ***REMOVED***
                        text: quote + quote,
                        selection: [1,1]
                ***REMOVED***;
            ***REMOVED*** else if (token && token.type === "string") ***REMOVED***
                    var rightChar = line.substring(cursor.column, cursor.column + 1);
                    if (rightChar == quote) ***REMOVED***
                        return ***REMOVED***
                            text: '',
                            selection: [1, 1]
                    ***REMOVED***;
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***
***REMOVED***);

    this.add("string_dquotes", "deletion", function(state, action, editor, session, range) ***REMOVED***
        var selected = session.doc.getTextRange(range);
        if (!range.isMultiLine() && (selected == '"' || selected == "'")) ***REMOVED***
            initContext(editor);
            var line = session.doc.getLine(range.start.row);
            var rightChar = line.substring(range.start.column + 1, range.start.column + 2);
            if (rightChar == selected) ***REMOVED***
                range.end.column++;
                return range;
        ***REMOVED***
    ***REMOVED***
***REMOVED***);

***REMOVED***;

    
CstyleBehaviour.isSaneInsertion = function(editor, session) ***REMOVED***
    var cursor = editor.getCursorPosition();
    var iterator = new TokenIterator(session, cursor.row, cursor.column);
    if (!this.$matchTokenType(iterator.getCurrentToken() || "text", SAFE_INSERT_IN_TOKENS)) ***REMOVED***
        var iterator2 = new TokenIterator(session, cursor.row, cursor.column + 1);
        if (!this.$matchTokenType(iterator2.getCurrentToken() || "text", SAFE_INSERT_IN_TOKENS))
            return false;
***REMOVED***
    iterator.stepForward();
    return iterator.getCurrentTokenRow() !== cursor.row ||
        this.$matchTokenType(iterator.getCurrentToken() || "text", SAFE_INSERT_BEFORE_TOKENS);
***REMOVED***;

CstyleBehaviour.$matchTokenType = function(token, types) ***REMOVED***
    return types.indexOf(token.type || token) > -1;
***REMOVED***;

CstyleBehaviour.recordAutoInsert = function(editor, session, bracket) ***REMOVED***
    var cursor = editor.getCursorPosition();
    var line = session.doc.getLine(cursor.row);
    if (!this.isAutoInsertedClosing(cursor, line, context.autoInsertedLineEnd[0]))
        context.autoInsertedBrackets = 0;
    context.autoInsertedRow = cursor.row;
    context.autoInsertedLineEnd = bracket + line.substr(cursor.column);
    context.autoInsertedBrackets++;
***REMOVED***;

CstyleBehaviour.recordMaybeInsert = function(editor, session, bracket) ***REMOVED***
    var cursor = editor.getCursorPosition();
    var line = session.doc.getLine(cursor.row);
    if (!this.isMaybeInsertedClosing(cursor, line))
        context.maybeInsertedBrackets = 0;
    context.maybeInsertedRow = cursor.row;
    context.maybeInsertedLineStart = line.substr(0, cursor.column) + bracket;
    context.maybeInsertedLineEnd = line.substr(cursor.column);
    context.maybeInsertedBrackets++;
***REMOVED***;

CstyleBehaviour.isAutoInsertedClosing = function(cursor, line, bracket) ***REMOVED***
    return context.autoInsertedBrackets > 0 &&
        cursor.row === context.autoInsertedRow &&
        bracket === context.autoInsertedLineEnd[0] &&
        line.substr(cursor.column) === context.autoInsertedLineEnd;
***REMOVED***;

CstyleBehaviour.isMaybeInsertedClosing = function(cursor, line) ***REMOVED***
    return context.maybeInsertedBrackets > 0 &&
        cursor.row === context.maybeInsertedRow &&
        line.substr(cursor.column) === context.maybeInsertedLineEnd &&
        line.substr(0, cursor.column) == context.maybeInsertedLineStart;
***REMOVED***;

CstyleBehaviour.popAutoInsertedClosing = function() ***REMOVED***
    context.autoInsertedLineEnd = context.autoInsertedLineEnd.substr(1);
    context.autoInsertedBrackets--;
***REMOVED***;

CstyleBehaviour.clearMaybeInsertedClosing = function() ***REMOVED***
    if (context) ***REMOVED***
        context.maybeInsertedBrackets = 0;
        context.maybeInsertedRow = -1;
***REMOVED***
***REMOVED***;



oop.inherits(CstyleBehaviour, Behaviour);

exports.CstyleBehaviour = CstyleBehaviour;
***REMOVED***);

__ace_shadowed__.define('ace/mode/folding/cstyle', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/range', 'ace/mode/folding/fold_mode'], function(require, exports, module) ***REMOVED***


var oop = require("../../lib/oop");
var Range = require("../../range").Range;
var BaseFoldMode = require("./fold_mode").FoldMode;

var FoldMode = exports.FoldMode = function(commentRegex) ***REMOVED***
    if (commentRegex) ***REMOVED***
        this.foldingStartMarker = new RegExp(
            this.foldingStartMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.start)
        );
        this.foldingStopMarker = new RegExp(
            this.foldingStopMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.end)
        );
***REMOVED***
***REMOVED***;
oop.inherits(FoldMode, BaseFoldMode);

(function() ***REMOVED***

    this.foldingStartMarker = /(\***REMOVED***|\[)[^\***REMOVED***\]]*$|^\s*(\/\*)/;
    this.foldingStopMarker = /^[^\[\***REMOVED***]*(\***REMOVED***|\])|^[\s\*]*(\*\/)/;

    this.getFoldWidgetRange = function(session, foldStyle, row, forceMultiline) ***REMOVED***
        var line = session.getLine(row);
        var match = line.match(this.foldingStartMarker);
        if (match) ***REMOVED***
            var i = match.index;

            if (match[1])
                return this.openingBracketBlock(session, match[1], row, i);
                
            var range = session.getCommentFoldRange(row, i + match[0].length, 1);
            
            if (range && !range.isMultiLine()) ***REMOVED***
                if (forceMultiline) ***REMOVED***
                    range = this.getSectionRange(session, row);
            ***REMOVED*** else if (foldStyle != "all")
                    range = null;
        ***REMOVED***
            
            return range;
    ***REMOVED***

        if (foldStyle === "markbegin")
            return;

        var match = line.match(this.foldingStopMarker);
        if (match) ***REMOVED***
            var i = match.index + match[0].length;

            if (match[1])
                return this.closingBracketBlock(session, match[1], row, i);

            return session.getCommentFoldRange(row, i, -1);
    ***REMOVED***
***REMOVED***;
    
    this.getSectionRange = function(session, row) ***REMOVED***
        var line = session.getLine(row);
        var startIndent = line.search(/\S/);
        var startRow = row;
        var startColumn = line.length;
        row = row + 1;
        var endRow = row;
        var maxRow = session.getLength();
        while (++row < maxRow) ***REMOVED***
            line = session.getLine(row);
            var indent = line.search(/\S/);
            if (indent === -1)
                continue;
            if  (startIndent > indent)
                break;
            var subRange = this.getFoldWidgetRange(session, "all", row);
            
            if (subRange) ***REMOVED***
                if (subRange.start.row <= startRow) ***REMOVED***
                    break;
            ***REMOVED*** else if (subRange.isMultiLine()) ***REMOVED***
                    row = subRange.end.row;
            ***REMOVED*** else if (startIndent == indent) ***REMOVED***
                    break;
            ***REMOVED***
        ***REMOVED***
            endRow = row;
    ***REMOVED***
        
        return new Range(startRow, startColumn, endRow, session.getLine(endRow).length);
***REMOVED***;

***REMOVED***).call(FoldMode.prototype);

***REMOVED***);
