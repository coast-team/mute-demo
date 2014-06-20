define('ace/ext/options', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***


var modesByName = modelist.modesByName;

var options = [
    ["Document", function(name) ***REMOVED***
        doclist.loadDoc(name, function(session) ***REMOVED***
            if (!session)
                return;
            session = env.split.setSession(session);
            updateUIEditorOptions();
            env.editor.focus();
    ***REMOVED***);
***REMOVED*** doclist.all],
	["Mode", function(value) ***REMOVED***
        env.editor.session.setMode(modesByName[value].mode || modesByName.text.mode);
        env.editor.session.modeName = value;
	***REMOVED***, function(value) ***REMOVED***
		return env.editor.session.modeName || "text"
	***REMOVED***, modelist.modes],
	["Split", function(value) ***REMOVED***
		var sp = env.split;
		if (value == "none") ***REMOVED***
			if (sp.getSplits() == 2) ***REMOVED***
				env.secondSession = sp.getEditor(1).session;
    ***REMOVED***
        sp.setSplits(1);
***REMOVED*** else ***REMOVED***
        var newEditor = (sp.getSplits() == 1);
        if (value == "below") ***REMOVED***
            sp.setOrientation(sp.BELOW);
    ***REMOVED*** else ***REMOVED***
            sp.setOrientation(sp.BESIDE);
    ***REMOVED***
        sp.setSplits(2);

        if (newEditor) ***REMOVED***
				var session = env.secondSession || sp.getEditor(0).session;
            var newSession = sp.setSession(session, 1);
            newSession.name = session.name;
    ***REMOVED***
***REMOVED***
	***REMOVED***, ["None", "Beside", "Below"]],
	["Theme", function(value) ***REMOVED***
		if (!value)
			return;
		env.editor.setTheme("ace/theme/" + value);
		themeEl.selectedValue = value;
	***REMOVED***, function() ***REMOVED***
		return env.editor.getTheme();
	***REMOVED***, ***REMOVED***
		"Bright": ***REMOVED***
            chrome: "Chrome",
            clouds: "Clouds",
            crimson_editor: "Crimson Editor",
            dawn: "Dawn",
            dreamweaver: "Dreamweaver",
            eclipse: "Eclipse",
            github: "GitHub",
            solarized_light: "Solarized Light",
            textmate: "TextMate",
            tomorrow: "Tomorrow",
            xcode: "XCode"
    ***REMOVED***
        "Dark": ***REMOVED***
            ambiance: "Ambiance",
            chaos: "Chaos",
            clouds_midnight: "Clouds Midnight",
            cobalt: "Cobalt",
            idle_fingers: "idleFingers",
            kr_theme: "krTheme",
            merbivore: "Merbivore",
            merbivore_soft: "Merbivore Soft",
            mono_industrial: "Mono Industrial",
            monokai: "Monokai",
            pastel_on_dark: "Pastel on dark",
            solarized_dark: "Solarized Dark",
            twilight: "Twilight",
            tomorrow_night: "Tomorrow Night",
            tomorrow_night_blue: "Tomorrow Night Blue",
            tomorrow_night_bright: "Tomorrow Night Bright",
            tomorrow_night_eighties: "Tomorrow Night 80s",
            vibrant_ink: "Vibrant Ink",
    ***REMOVED***
	***REMOVED***],
	["Code Folding", function(value) ***REMOVED***
		env.editor.getSession().setFoldStyle(value);
		env.editor.setShowFoldWidgets(value !== "manual");
	***REMOVED***, ["manual", "mark begin", "mark begin and end"]],
	["Soft Wrap", function(value) ***REMOVED***
		value = value.toLowerCase()
		var session = env.editor.getSession();
		var renderer = env.editor.renderer;
		session.setUseWrapMode(value == "off");
		var col = parseInt(value) || null;
		renderer.setPrintMarginColumn(col || 80);
		session.setWrapLimitRange(col, col);
	***REMOVED***, ["Off", "40 Chars", "80 Chars", "Free"]],
	["Key Binding", function(value) ***REMOVED***
		env.editor.setKeyboardHandler(keybindings[value]);
	***REMOVED***, ["Ace", "Vim", "Emacs", "Custom"]],
	["Font Size", function(value) ***REMOVED***
		env.split.setFontSize(value + "px");
	***REMOVED***, [10, 11, 12, 14, 16, 20, 24]],
    ["Full Line Selection", function(checked) ***REMOVED***
		env.editor.setSelectionStyle(checked ? "line" : "text");
	***REMOVED***],
	["Highlight Active Line", function(checked) ***REMOVED***
		env.editor.setHighlightActiveLine(checked);
	***REMOVED***],
	["Show Invisibles", function(checked) ***REMOVED***
		env.editor.setShowInvisibles(checked);
	***REMOVED***],
	["Show Gutter", function(checked) ***REMOVED***
		env.editor.renderer.setShowGutter(checked);
	***REMOVED***],
    ["Show Indent Guides", function(checked) ***REMOVED***
		env.editor.renderer.setDisplayIndentGuides(checked);
	***REMOVED***],
	["Show Print Margin", function(checked) ***REMOVED***
		env.editor.renderer.setShowPrintMargin(checked);
	***REMOVED***],
	["Persistent HScroll", function(checked) ***REMOVED***
		env.editor.renderer.setHScrollBarAlwaysVisible(checked);
	***REMOVED***],
	["Animate Scrolling", function(checked) ***REMOVED***
		env.editor.setAnimatedScroll(checked);
	***REMOVED***],
	["Use Soft Tab", function(checked) ***REMOVED***
		env.editor.getSession().setUseSoftTabs(checked);
	***REMOVED***],
	["Highlight Selected Word", function(checked) ***REMOVED***
		env.editor.setHighlightSelectedWord(checked);
	***REMOVED***],
	["Enable Behaviours", function(checked) ***REMOVED***
		env.editor.setBehavioursEnabled(checked);
	***REMOVED***],
	["Fade Fold Widgets", function(checked) ***REMOVED***
		env.editor.setFadeFoldWidgets(checked);
	***REMOVED***],
	["Show Token info", function(checked) ***REMOVED***
		env.editor.setFadeFoldWidgets(checked);
	***REMOVED***]
]

var createOptionsPanel = function(options) ***REMOVED***
	var html = []
	var container = document.createElement("div");
	container.style.cssText = "position: absolute; overflow: hidden";
	var inner = document.createElement("div");
	inner.style.cssText = "width: 120%;height:100%;overflow: scroll";
	container.appendChild(inner);
	html.push("<table><tbody>");
	
	options.forEach(function(o) ***REMOVED***
		
***REMOVED***);

	html.push(
		'<tr>',
		  '<td>',
			'<label for="', s,'"></label>',
		  '</td><td>',
			'<input type="', s,'" name="', s,'" id="',s ,'">',
		  '</td>',
		'</tr>'
	)
	html.push("</tbody></table>");	
	return container;
***REMOVED***

function bindCheckbox(id, callback) ***REMOVED***
    var el = document.getElementById(id);
    if (localStorage && localStorage.getItem(id))
        el.checked = localStorage.getItem(id) == "1";

    var onCheck = function() ***REMOVED***
        callback(!!el.checked);
        saveOption(el);
***REMOVED***;
    el.onclick = onCheck;
    onCheck();
***REMOVED***

function bindDropdown(id, callback) ***REMOVED***
    var el = document.getElementById(id);
    if (localStorage && localStorage.getItem(id))
        el.value = localStorage.getItem(id);

    var onChange = function() ***REMOVED***
        callback(el.value);
        saveOption(el);
***REMOVED***;

    el.onchange = onChange;
    onChange();
***REMOVED***

function fillOptgroup(list, el) ***REMOVED***
    list.forEach(function(item) ***REMOVED***
        var option = document.createElement("option");
        option.setAttribute("value", item.name);
        option.innerHTML = item.desc;
        el.appendChild(option);
***REMOVED***);
***REMOVED***

function fillDropdown(list, el) ***REMOVED***
	if (Array.isArray(list)) ***REMOVED***
		fillOptgroup(list, el);
		return;
	***REMOVED***
	for(var i in list) ***REMOVED***
		var group = document.createElement("optgroup");
		group.setAttribute("label", i);
		fillOptgroup(list[i], group);
		el.appendChild(group);
	***REMOVED***
***REMOVED***

function createOptionControl(opt) ***REMOVED***
    if (opt.values) ***REMOVED***
        var el = dom.createElement("select");
        el.setAttribute("size", opt.visibleSize || 1);
        fillDropdown(opt.values, el)        
***REMOVED*** else ***REMOVED***
        var el = dom.createElement("checkbox");
***REMOVED***
    el.setAttribute("name", "opt_" + opt.name)
    return el;
***REMOVED***

function createOptionCell(opt) ***REMOVED***
    if (opt.values) ***REMOVED***
        var el = dom.createElement("select");
        el.setAttribute("size", opt.visibleSize || 1);
        fillDropdown(opt.values, el)        
***REMOVED*** else ***REMOVED***
        var el = dom.createElement("checkbox");
***REMOVED***
    el.setAttribute("name", "opt_" + opt.name)
    return el;
***REMOVED***


createOptionsPanel(options)



***REMOVED***);

