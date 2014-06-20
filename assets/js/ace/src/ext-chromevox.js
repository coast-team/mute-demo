define('ace/ext/chromevox', ['require', 'exports', 'module' , 'ace/editor', 'ace/config'], function(require, exports, module) ***REMOVED***
var cvoxAce = ***REMOVED******REMOVED***;
cvoxAce.SpeechProperty;
cvoxAce.Cursor;
cvoxAce.Token;
cvoxAce.Annotation;
var CONSTANT_PROP = ***REMOVED***
  'rate': 0.8,
  'pitch': 0.4,
  'volume': 0.9
***REMOVED***;
var DEFAULT_PROP = ***REMOVED***
  'rate': 1,
  'pitch': 0.5,
  'volume': 0.9
***REMOVED***;
var ENTITY_PROP = ***REMOVED***
  'rate': 0.8,
  'pitch': 0.8,
  'volume': 0.9
***REMOVED***;
var KEYWORD_PROP = ***REMOVED***
  'rate': 0.8,
  'pitch': 0.3,
  'volume': 0.9
***REMOVED***;
var STORAGE_PROP = ***REMOVED***
  'rate': 0.8,
  'pitch': 0.7,
  'volume': 0.9
***REMOVED***;
var VARIABLE_PROP = ***REMOVED***
  'rate': 0.8,
  'pitch': 0.8,
  'volume': 0.9
***REMOVED***;
var DELETED_PROP = ***REMOVED***
  'punctuationEcho': 'none',
  'relativePitch': -0.6
***REMOVED***;
var ERROR_EARCON = 'ALERT_NONMODAL';
var MODE_SWITCH_EARCON = 'ALERT_MODAL';
var NO_MATCH_EARCON = 'INVALID_KEYPRESS';
var INSERT_MODE_STATE = 'insertMode';
var COMMAND_MODE_STATE = 'start';

var REPLACE_LIST = [
  ***REMOVED***
    substr: ';',
    newSubstr: ' semicolon '
  ***REMOVED***,
  ***REMOVED***
    substr: ':',
    newSubstr: ' colon '
  ***REMOVED***
];
var Command = ***REMOVED***
  SPEAK_ANNOT: 'annots',
  SPEAK_ALL_ANNOTS: 'all_annots',
  TOGGLE_LOCATION: 'toggle_location',
  SPEAK_MODE: 'mode',
  SPEAK_ROW_COL: 'row_col',
  TOGGLE_DISPLACEMENT: 'toggle_displacement',
  FOCUS_TEXT: 'focus_text'
***REMOVED***;
var KEY_PREFIX = 'CONTROL + SHIFT ';
cvoxAce.editor = null;
var lastCursor = null;
var annotTable = ***REMOVED******REMOVED***;
var shouldSpeakRowLocation = false;
var shouldSpeakDisplacement = false;
var changed = false;
var vimState = null;
var keyCodeToShortcutMap = ***REMOVED******REMOVED***;
var cmdToShortcutMap = ***REMOVED******REMOVED***;
var getKeyShortcutString = function(keyCode) ***REMOVED***
  return KEY_PREFIX + String.fromCharCode(keyCode);
***REMOVED***;
var isVimMode = function() ***REMOVED***
  var keyboardHandler = cvoxAce.editor.keyBinding.getKeyboardHandler();
  return keyboardHandler.$id === 'ace/keyboard/vim';
***REMOVED***;
var getCurrentToken = function(cursor) ***REMOVED***
  return cvoxAce.editor.getSession().getTokenAt(cursor.row, cursor.column + 1);
***REMOVED***;
var getCurrentLine = function(cursor) ***REMOVED***
  return cvoxAce.editor.getSession().getLine(cursor.row);
***REMOVED***;
var onRowChange = function(currCursor) ***REMOVED***
  if (annotTable[currCursor.row]) ***REMOVED***
    cvox.Api.playEarcon(ERROR_EARCON);
  ***REMOVED***
  if (shouldSpeakRowLocation) ***REMOVED***
    cvox.Api.stop();
    speakChar(currCursor);
    speakTokenQueue(getCurrentToken(currCursor));
    speakLine(currCursor.row, 1);
  ***REMOVED*** else ***REMOVED***
    speakLine(currCursor.row, 0);
  ***REMOVED***
***REMOVED***;
var isWord = function(cursor) ***REMOVED***
  var line = getCurrentLine(cursor);
  var lineSuffix = line.substr(cursor.column - 1);
  if (cursor.column === 0) ***REMOVED***
    lineSuffix = ' ' + line;
  ***REMOVED***
  var firstWordRegExp = /^\W(\w+)/;
  var words = firstWordRegExp.exec(lineSuffix);
  return words !== null;
***REMOVED***;
var rules = ***REMOVED***
  'constant': ***REMOVED***
    prop: CONSTANT_PROP
  ***REMOVED***,
  'entity': ***REMOVED***
    prop: ENTITY_PROP
  ***REMOVED***,
  'keyword': ***REMOVED***
    prop: KEYWORD_PROP
  ***REMOVED***,
  'storage': ***REMOVED***
    prop: STORAGE_PROP
  ***REMOVED***,
  'variable': ***REMOVED***
    prop: VARIABLE_PROP
  ***REMOVED***,
  'meta': ***REMOVED***
    prop: DEFAULT_PROP,
    replace: [
      ***REMOVED***
        substr: '</',
        newSubstr: ' closing tag '
  ***REMOVED***
      ***REMOVED***
        substr: '/>',
        newSubstr: ' close tag '
  ***REMOVED***
      ***REMOVED***
        substr: '<',
        newSubstr: ' tag start '
  ***REMOVED***
      ***REMOVED***
        substr: '>',
        newSubstr: ' tag end '
  ***REMOVED***
    ]
  ***REMOVED***
***REMOVED***;
var DEFAULT_RULE = ***REMOVED***
  prop: DEFAULT_RULE
***REMOVED***;
var expand = function(value, replaceRules) ***REMOVED***
  var newValue = value;
  for (var i = 0; i < replaceRules.length; i++) ***REMOVED***
    var replaceRule = replaceRules[i];
    var regexp = new RegExp(replaceRule.substr, 'g');
    newValue = newValue.replace(regexp, replaceRule.newSubstr);
  ***REMOVED***
  return newValue;
***REMOVED***;
var mergeTokens = function(tokens, start, end) ***REMOVED***
  var newToken = ***REMOVED******REMOVED***;
  newToken.value = '';
  newToken.type = tokens[start].type;
  for (var j = start; j < end; j++) ***REMOVED***
    newToken.value += tokens[j].value;
  ***REMOVED***
  return newToken;
***REMOVED***;
var mergeLikeTokens = function(tokens) ***REMOVED***
  if (tokens.length <= 1) ***REMOVED***
    return tokens;
  ***REMOVED***
  var newTokens = [];
  var lastLikeIndex = 0;
  for (var i = 1; i < tokens.length; i++) ***REMOVED***
    var lastLikeToken = tokens[lastLikeIndex];
    var currToken = tokens[i];
    if (getTokenRule(lastLikeToken) !== getTokenRule(currToken)) ***REMOVED***
      newTokens.push(mergeTokens(tokens, lastLikeIndex, i));
      lastLikeIndex = i;
***REMOVED***
  ***REMOVED***
  newTokens.push(mergeTokens(tokens, lastLikeIndex, tokens.length));
  return newTokens;
***REMOVED***;
var isRowWhiteSpace = function(row) ***REMOVED***
  var line = cvoxAce.editor.getSession().getLine(row);
  var whiteSpaceRegexp = /^\s*$/;
  return whiteSpaceRegexp.exec(line) !== null;
***REMOVED***;
var speakLine = function(row, queue) ***REMOVED***
  var tokens = cvoxAce.editor.getSession().getTokens(row);
  if (tokens.length === 0 || isRowWhiteSpace(row)) ***REMOVED***
    cvox.Api.playEarcon('EDITABLE_TEXT');
    return;
  ***REMOVED***
  tokens = mergeLikeTokens(tokens);
  var firstToken = tokens[0];
  tokens = tokens.filter(function(token) ***REMOVED***
    return token !== firstToken;
  ***REMOVED***);
  speakToken_(firstToken, queue);
  tokens.forEach(speakTokenQueue);
***REMOVED***;
var speakTokenFlush = function(token) ***REMOVED***
  speakToken_(token, 0);
***REMOVED***;
var speakTokenQueue = function(token) ***REMOVED***
  speakToken_(token, 1);
***REMOVED***;
var getTokenRule = function(token) ***REMOVED***
  if (!token || !token.type) ***REMOVED***
    return;
  ***REMOVED***
  var split = token.type.split('.');
  if (split.length === 0) ***REMOVED***
    return;
  ***REMOVED***
  var type = split[0];
  var rule = rules[type];
  if (!rule) ***REMOVED***
    return DEFAULT_RULE;
  ***REMOVED***
  return rule;
***REMOVED***;
var speakToken_ = function(token, queue) ***REMOVED***
  var rule = getTokenRule(token);
  var value = expand(token.value, REPLACE_LIST);
  if (rule.replace) ***REMOVED***
    value = expand(value, rule.replace);
  ***REMOVED***
  cvox.Api.speak(value, queue, rule.prop);
***REMOVED***;
var speakChar = function(cursor) ***REMOVED***
  var line = getCurrentLine(cursor);
  cvox.Api.speak(line[cursor.column], 1);
***REMOVED***;
var speakDisplacement = function(lastCursor, currCursor) ***REMOVED***
  var line = getCurrentLine(currCursor);
  var displace = line.substring(lastCursor.column, currCursor.column);
  displace = displace.replace(/ /g, ' space ');
  cvox.Api.speak(displace);
***REMOVED***;
var speakCharOrWordOrLine = function(lastCursor, currCursor) ***REMOVED***
  if (Math.abs(lastCursor.column - currCursor.column) !== 1) ***REMOVED***
    var currLineLength = getCurrentLine(currCursor).length;
    if (currCursor.column === 0 || currCursor.column === currLineLength) ***REMOVED***
      speakLine(currCursor.row, 0);
      return;
***REMOVED***
    if (isWord(currCursor)) ***REMOVED***
      cvox.Api.stop();
      speakTokenQueue(getCurrentToken(currCursor));
      return;
***REMOVED***
  ***REMOVED***
  speakChar(currCursor);
***REMOVED***;
var onColumnChange = function(lastCursor, currCursor) ***REMOVED***
  if (!cvoxAce.editor.selection.isEmpty()) ***REMOVED***
    speakDisplacement(lastCursor, currCursor);
    cvox.Api.speak('selected', 1);
  ***REMOVED***
  else if (shouldSpeakDisplacement) ***REMOVED***
    speakDisplacement(lastCursor, currCursor);
  ***REMOVED*** else ***REMOVED***
    speakCharOrWordOrLine(lastCursor, currCursor);
  ***REMOVED***
***REMOVED***;
var onCursorChange = function(evt) ***REMOVED***
  if (changed) ***REMOVED***
    changed = false;
    return;
  ***REMOVED***
  var currCursor = cvoxAce.editor.selection.getCursor();
  if (currCursor.row !== lastCursor.row) ***REMOVED***
    onRowChange(currCursor);
  ***REMOVED*** else ***REMOVED***
    onColumnChange(lastCursor, currCursor);
  ***REMOVED***
  lastCursor = currCursor;
***REMOVED***;
var onSelectionChange = function(evt) ***REMOVED***
  if (cvoxAce.editor.selection.isEmpty()) ***REMOVED***
    cvox.Api.speak('unselected');
  ***REMOVED***
***REMOVED***;
var onChange = function(evt) ***REMOVED***
  var data = evt.data;
  switch (data.action) ***REMOVED***
  case 'removeText':
    cvox.Api.speak(data.text, 0, DELETED_PROP);
    changed = true;
    break;
  case 'insertText':
    cvox.Api.speak(data.text, 0);
    changed = true;
    break;
  ***REMOVED***
***REMOVED***;
var isNewAnnotation = function(annot) ***REMOVED***
  var row = annot.row;
  var col = annot.column;
  return !annotTable[row] || !annotTable[row][col];
***REMOVED***;
var populateAnnotations = function(annotations) ***REMOVED***
  annotTable = ***REMOVED******REMOVED***;
  for (var i = 0; i < annotations.length; i++) ***REMOVED***
    var annotation = annotations[i];
    var row = annotation.row;
    var col = annotation.column;
    if (!annotTable[row]) ***REMOVED***
      annotTable[row] = ***REMOVED******REMOVED***;
***REMOVED***
    annotTable[row][col] = annotation;
  ***REMOVED***
***REMOVED***;
var onAnnotationChange = function(evt) ***REMOVED***
  var annotations = cvoxAce.editor.getSession().getAnnotations();
  var newAnnotations = annotations.filter(isNewAnnotation);
  if (newAnnotations.length > 0) ***REMOVED***
    cvox.Api.playEarcon(ERROR_EARCON);
  ***REMOVED***
  populateAnnotations(annotations);
***REMOVED***;
var speakAnnot = function(annot) ***REMOVED***
  var annotText = annot.type + ' ' + annot.text + ' on ' +
      rowColToString(annot.row, annot.column);
  annotText = annotText.replace(';', 'semicolon');
  cvox.Api.speak(annotText, 1);
***REMOVED***;
var speakAnnotsByRow = function(row) ***REMOVED***
  var annots = annotTable[row];
  for (var col in annots) ***REMOVED***
    speakAnnot(annots[col]);
  ***REMOVED***
***REMOVED***;
var rowColToString = function(row, col) ***REMOVED***
  return 'row ' + (row + 1) + ' column ' + (col + 1);
***REMOVED***;
var speakCurrRowAndCol = function() ***REMOVED***
  cvox.Api.speak(rowColToString(lastCursor.row, lastCursor.column));
***REMOVED***;
var speakAllAnnots = function() ***REMOVED***
  for (var row in annotTable) ***REMOVED***
    speakAnnotsByRow(row);
  ***REMOVED***
***REMOVED***;
var speakMode = function() ***REMOVED***
  if (!isVimMode()) ***REMOVED***
    return;
  ***REMOVED***
  switch (cvoxAce.editor.keyBinding.$data.state) ***REMOVED***
  case INSERT_MODE_STATE:
    cvox.Api.speak('Insert mode');
    break;
  case COMMAND_MODE_STATE:
    cvox.Api.speak('Command mode');
    break;
  ***REMOVED***
***REMOVED***;
var toggleSpeakRowLocation = function() ***REMOVED***
  shouldSpeakRowLocation = !shouldSpeakRowLocation;
  if (shouldSpeakRowLocation) ***REMOVED***
    cvox.Api.speak('Speak location on row change enabled.');
  ***REMOVED*** else ***REMOVED***
    cvox.Api.speak('Speak location on row change disabled.');
  ***REMOVED***
***REMOVED***;
var toggleSpeakDisplacement = function() ***REMOVED***
  shouldSpeakDisplacement = !shouldSpeakDisplacement;
  if (shouldSpeakDisplacement) ***REMOVED***
    cvox.Api.speak('Speak displacement on column changes.');
  ***REMOVED*** else ***REMOVED***
    cvox.Api.speak('Speak current character or word on column changes.');
  ***REMOVED***
***REMOVED***;
var onKeyDown = function(evt) ***REMOVED***
  if (evt.ctrlKey && evt.shiftKey) ***REMOVED***
    var shortcut = keyCodeToShortcutMap[evt.keyCode];
    if (shortcut) ***REMOVED***
      shortcut.func();
***REMOVED***
  ***REMOVED***
***REMOVED***;
var onChangeStatus = function(evt, editor) ***REMOVED***
  if (!isVimMode()) ***REMOVED***
    return;
  ***REMOVED***
  var state = editor.keyBinding.$data.state;
  if (state === vimState) ***REMOVED***
    return;
  ***REMOVED***
  switch (state) ***REMOVED***
  case INSERT_MODE_STATE:
    cvox.Api.playEarcon(MODE_SWITCH_EARCON);
    cvox.Api.setKeyEcho(true);
    break;
  case COMMAND_MODE_STATE:
    cvox.Api.playEarcon(MODE_SWITCH_EARCON);
    cvox.Api.setKeyEcho(false);
    break;
  ***REMOVED***
  vimState = state;
***REMOVED***;
var contextMenuHandler = function(evt) ***REMOVED***
  var cmd = evt.detail['customCommand'];
  var shortcut = cmdToShortcutMap[cmd];
  if (shortcut) ***REMOVED***
    shortcut.func();
    cvoxAce.editor.focus();
  ***REMOVED***
***REMOVED***;
var initContextMenu = function() ***REMOVED***
  var ACTIONS = SHORTCUTS.map(function(shortcut) ***REMOVED***
    return ***REMOVED***
      desc: shortcut.desc + getKeyShortcutString(shortcut.keyCode),
      cmd: shortcut.cmd
***REMOVED***;
  ***REMOVED***);
  var body = document.querySelector('body');
  body.setAttribute('contextMenuActions', JSON.stringify(ACTIONS));
  body.addEventListener('ATCustomEvent', contextMenuHandler, true);
***REMOVED***;
var onFindSearchbox = function(evt) ***REMOVED***
  if (evt.match) ***REMOVED***
    speakLine(lastCursor.row, 0);
  ***REMOVED*** else ***REMOVED***
    cvox.Api.playEarcon(NO_MATCH_EARCON);
  ***REMOVED***
***REMOVED***;
var focus = function() ***REMOVED***
  cvoxAce.editor.focus();
***REMOVED***;
var SHORTCUTS = [
  ***REMOVED***
    keyCode: 49,
    func: function() ***REMOVED***
      speakAnnotsByRow(lastCursor.row);
***REMOVED***
    cmd: Command.SPEAK_ANNOT,
    desc: 'Speak annotations on line'
  ***REMOVED***,
  ***REMOVED***
    keyCode: 50,
    func: speakAllAnnots,
    cmd: Command.SPEAK_ALL_ANNOTS,
    desc: 'Speak all annotations'
  ***REMOVED***,
  ***REMOVED***
    keyCode: 51,
    func: speakMode,
    cmd: Command.SPEAK_MODE,
    desc: 'Speak Vim mode'
  ***REMOVED***,
  ***REMOVED***
    keyCode: 52,
    func: toggleSpeakRowLocation,
    cmd: Command.TOGGLE_LOCATION,
    desc: 'Toggle speak row location'
  ***REMOVED***,
  ***REMOVED***
    keyCode: 53,
    func: speakCurrRowAndCol,
    cmd: Command.SPEAK_ROW_COL,
    desc: 'Speak row and column'
  ***REMOVED***,
  ***REMOVED***
    keyCode: 54,
    func: toggleSpeakDisplacement,
    cmd: Command.TOGGLE_DISPLACEMENT,
    desc: 'Toggle speak displacement'
  ***REMOVED***,
  ***REMOVED***
    keyCode: 55,
    func: focus,
    cmd: Command.FOCUS_TEXT,
    desc: 'Focus text'
  ***REMOVED***
];
var onFocus = function() ***REMOVED***
  cvoxAce.editor = editor;
  editor.getSession().selection.on('changeCursor', onCursorChange);
  editor.getSession().selection.on('changeSelection', onSelectionChange);
  editor.getSession().on('change', onChange);
  editor.getSession().on('changeAnnotation', onAnnotationChange);
  editor.on('changeStatus', onChangeStatus);
  editor.on('findSearchBox', onFindSearchbox);
  editor.container.addEventListener('keydown', onKeyDown);

  lastCursor = editor.selection.getCursor();
***REMOVED***;
var init = function(editor) ***REMOVED***
  onFocus();
  SHORTCUTS.forEach(function(shortcut) ***REMOVED***
    keyCodeToShortcutMap[shortcut.keyCode] = shortcut;
    cmdToShortcutMap[shortcut.cmd] = shortcut;
  ***REMOVED***);

  editor.on('focus', onFocus);
  if (isVimMode()) ***REMOVED***
    cvox.Api.setKeyEcho(false);
  ***REMOVED***
  initContextMenu();
***REMOVED***;
function cvoxApiExists() ***REMOVED***
  return (typeof(cvox) !== 'undefined') && cvox && cvox.Api;
***REMOVED***
var tries = 0;
var MAX_TRIES = 15;
function watchForCvoxLoad(editor) ***REMOVED***
  if (cvoxApiExists()) ***REMOVED***
    init(editor);
  ***REMOVED*** else ***REMOVED***
    tries++;
    if (tries >= MAX_TRIES) ***REMOVED***
      return;
***REMOVED***
    window.setTimeout(watchForCvoxLoad, 500, editor);
  ***REMOVED***
***REMOVED***

var Editor = require('../editor').Editor;
require('../config').defineOptions(Editor.prototype, 'editor', ***REMOVED***
  enableChromevoxEnhancements: ***REMOVED***
    set: function(val) ***REMOVED***
      if (val) ***REMOVED***
        watchForCvoxLoad(this);
  ***REMOVED***
***REMOVED***
    value: true // turn it on by default or check for window.cvox
  ***REMOVED***
***REMOVED***);

***REMOVED***);
