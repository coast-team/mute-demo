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

(function() ***REMOVED***

var ACE_NAMESPACE = "__ace_shadowed__";

var global = (function() ***REMOVED***
    return this;
***REMOVED***)();


if (!ACE_NAMESPACE && typeof requirejs !== "undefined")
    return;


var _define = function(module, deps, payload) ***REMOVED***
    if (typeof module !== 'string') ***REMOVED***
        if (_define.original)
            _define.original.apply(window, arguments);
        else ***REMOVED***
            console.error('dropping module because define wasn\'t a string.');
            console.trace();
    ***REMOVED***
        return;
***REMOVED***

    if (arguments.length == 2)
        payload = deps;

    if (!_define.modules) ***REMOVED***
        _define.modules = ***REMOVED******REMOVED***;
        _define.payloads = ***REMOVED******REMOVED***;
***REMOVED***
    
    _define.payloads[module] = payload;
    _define.modules[module] = null;
***REMOVED***;
var _require = function(parentId, module, callback) ***REMOVED***
    if (Object.prototype.toString.call(module) === "[object Array]") ***REMOVED***
        var params = [];
        for (var i = 0, l = module.length; i < l; ++i) ***REMOVED***
            var dep = lookup(parentId, module[i]);
            if (!dep && _require.original)
                return _require.original.apply(window, arguments);
            params.push(dep);
    ***REMOVED***
        if (callback) ***REMOVED***
            callback.apply(null, params);
    ***REMOVED***
***REMOVED***
    else if (typeof module === 'string') ***REMOVED***
        var payload = lookup(parentId, module);
        if (!payload && _require.original)
            return _require.original.apply(window, arguments);

        if (callback) ***REMOVED***
            callback();
    ***REMOVED***

        return payload;
***REMOVED***
    else ***REMOVED***
        if (_require.original)
            return _require.original.apply(window, arguments);
***REMOVED***
***REMOVED***;

var normalizeModule = function(parentId, moduleName) ***REMOVED***
    if (moduleName.indexOf("!") !== -1) ***REMOVED***
        var chunks = moduleName.split("!");
        return normalizeModule(parentId, chunks[0]) + "!" + normalizeModule(parentId, chunks[1]);
***REMOVED***
    if (moduleName.charAt(0) == ".") ***REMOVED***
        var base = parentId.split("/").slice(0, -1).join("/");
        moduleName = base + "/" + moduleName;

        while(moduleName.indexOf(".") !== -1 && previous != moduleName) ***REMOVED***
            var previous = moduleName;
            moduleName = moduleName.replace(/\/\.\//, "/").replace(/[^\/]+\/\.\.\//, "");
    ***REMOVED***
***REMOVED***

    return moduleName;
***REMOVED***;
var lookup = function(parentId, moduleName) ***REMOVED***

    moduleName = normalizeModule(parentId, moduleName);

    var module = _define.modules[moduleName];
    if (!module) ***REMOVED***
        module = _define.payloads[moduleName];
        if (typeof module === 'function') ***REMOVED***
            var exports = ***REMOVED******REMOVED***;
            var mod = ***REMOVED***
                id: moduleName,
                uri: '',
                exports: exports,
                packaged: true
        ***REMOVED***;

            var req = function(module, callback) ***REMOVED***
                return _require(moduleName, module, callback);
        ***REMOVED***;

            var returnValue = module(req, exports, mod);
            exports = returnValue || mod.exports;
            _define.modules[moduleName] = exports;
            delete _define.payloads[moduleName];
    ***REMOVED***
        module = _define.modules[moduleName] = exports || module;
***REMOVED***
    return module;
***REMOVED***;

function exportAce(ns) ***REMOVED***
    var require = function(module, callback) ***REMOVED***
        return _require("", module, callback);
***REMOVED***;    

    var root = global;
    if (ns) ***REMOVED***
        if (!global[ns])
            global[ns] = ***REMOVED******REMOVED***;
        root = global[ns];
***REMOVED***

    if (!root.define || !root.define.packaged) ***REMOVED***
        _define.original = root.define;
        root.define = _define;
        root.define.packaged = true;
***REMOVED***

    if (!root.require || !root.require.packaged) ***REMOVED***
        _require.original = root.require;
        root.require = require;
        root.require.packaged = true;
***REMOVED***
***REMOVED***

exportAce(ACE_NAMESPACE);

***REMOVED***)();

__ace_shadowed__.define('ace/ext/textarea', ['require', 'exports', 'module' , 'ace/lib/event', 'ace/lib/useragent', 'ace/lib/net', 'ace/ace', 'ace/theme/textmate', 'ace/mode/text'], function(require, exports, module) ***REMOVED***


var event = require("../lib/event");
var UA = require("../lib/useragent");
var net = require("../lib/net");
var ace = require("../ace");

require("../theme/textmate");

module.exports = exports = ace;
var getCSSProperty = function(element, container, property) ***REMOVED***
    var ret = element.style[property];

    if (!ret) ***REMOVED***
        if (window.getComputedStyle) ***REMOVED***
            ret = window.getComputedStyle(element, '').getPropertyValue(property);
    ***REMOVED*** else ***REMOVED***
            ret = element.currentStyle[property];
    ***REMOVED***
***REMOVED***

    if (!ret || ret == 'auto' || ret == 'intrinsic') ***REMOVED***
        ret = container.style[property];
***REMOVED***
    return ret;
***REMOVED***;

function applyStyles(elm, styles) ***REMOVED***
    for (var style in styles) ***REMOVED***
        elm.style[style] = styles[style];
***REMOVED***
***REMOVED***

function setupContainer(element, getValue) ***REMOVED***
    if (element.type != 'textarea') ***REMOVED***
        throw new Error("Textarea required!");
***REMOVED***

    var parentNode = element.parentNode;
    var container = document.createElement('div');
    var resizeEvent = function() ***REMOVED***
        var style = 'position:relative;';
        [
            'margin-top', 'margin-left', 'margin-right', 'margin-bottom'
        ].forEach(function(item) ***REMOVED***
            style += item + ':' +
                        getCSSProperty(element, container, item) + ';';
    ***REMOVED***);
        var width = getCSSProperty(element, container, 'width') || (element.clientWidth + "px");
        var height = getCSSProperty(element, container, 'height')  || (element.clientHeight + "px");
        style += 'height:' + height + ';width:' + width + ';';
        style += 'display:inline-block;';
        container.setAttribute('style', style);
***REMOVED***;
    event.addListener(window, 'resize', resizeEvent);
    resizeEvent();
    parentNode.insertBefore(container, element.nextSibling);
    while (parentNode !== document) ***REMOVED***
        if (parentNode.tagName.toUpperCase() === 'FORM') ***REMOVED***
            var oldSumit = parentNode.onsubmit;
            parentNode.onsubmit = function(evt) ***REMOVED***
                element.value = getValue();
                if (oldSumit) ***REMOVED***
                    oldSumit.call(this, evt);
            ***REMOVED***
        ***REMOVED***;
            break;
    ***REMOVED***
        parentNode = parentNode.parentNode;
***REMOVED***
    return container;
***REMOVED***

exports.transformTextarea = function(element, loader) ***REMOVED***
    var session;
    var container = setupContainer(element, function() ***REMOVED***
        return session.getValue();
***REMOVED***);
    element.style.display = 'none';
    container.style.background = 'white';
    var editorDiv = document.createElement("div");
    applyStyles(editorDiv, ***REMOVED***
        top: "0px",
        left: "0px",
        right: "0px",
        bottom: "0px",
        border: "1px solid gray",
        position: "absolute"
***REMOVED***);
    container.appendChild(editorDiv);

    var settingOpener = document.createElement("div");
    applyStyles(settingOpener, ***REMOVED***
        position: "absolute",
        right: "0px",
        bottom: "0px",
        background: "red",
        cursor: "nw-resize",
        borderStyle: "solid",
        borderWidth: "9px 8px 10px 9px",
        width: "2px",
        borderColor: "lightblue gray gray lightblue",
        zIndex: 101
***REMOVED***);

    var settingDiv = document.createElement("div");
    var settingDivStyles = ***REMOVED***
        top: "0px",
        left: "20%",
        right: "0px",
        bottom: "0px",
        position: "absolute",
        padding: "5px",
        zIndex: 100,
        color: "white",
        display: "none",
        overflow: "auto",
        fontSize: "14px",
        boxShadow: "-5px 2px 3px gray"
***REMOVED***;
    if (!UA.isOldIE) ***REMOVED***
        settingDivStyles.backgroundColor = "rgba(0, 0, 0, 0.6)";
***REMOVED*** else ***REMOVED***
        settingDivStyles.backgroundColor = "#333";
***REMOVED***

    applyStyles(settingDiv, settingDivStyles);
    container.appendChild(settingDiv);
    var options = ***REMOVED******REMOVED***;

    var editor = ace.edit(editorDiv);
    session = editor.getSession();

    session.setValue(element.value || element.innerHTML);
    editor.focus();
    container.appendChild(settingOpener);
    setupApi(editor, editorDiv, settingDiv, ace, options, loader);
    setupSettingPanel(settingDiv, settingOpener, editor, options);

    var state = "";
    event.addListener(settingOpener, "mousemove", function(e) ***REMOVED***
        var rect = this.getBoundingClientRect();
        var x = e.clientX - rect.left, y = e.clientY - rect.top;
        if (x + y < (rect.width + rect.height)/2) ***REMOVED***
            this.style.cursor = "pointer";
            state = "toggle";
    ***REMOVED*** else ***REMOVED***
            state = "resize";
            this.style.cursor = "nw-resize";
    ***REMOVED***
***REMOVED***);

    event.addListener(settingOpener, "mousedown", function(e) ***REMOVED***
        if (state == "toggle") ***REMOVED***
            editor.setDisplaySettings();
            return;
    ***REMOVED***
        container.style.zIndex = 100000;
        var rect = container.getBoundingClientRect();
        var startX = rect.width  + rect.left - e.clientX;
        var startY = rect.height  + rect.top - e.clientY;
        event.capture(settingOpener, function(e) ***REMOVED***
            container.style.width = e.clientX - rect.left + startX + "px";
            container.style.height = e.clientY - rect.top + startY + "px";
            editor.resize();
    ***REMOVED*** function() ***REMOVED******REMOVED***);
***REMOVED***);

    return editor;
***REMOVED***;

function load(url, module, callback) ***REMOVED***
    net.loadScript(url, function() ***REMOVED***
        require([module], callback);
***REMOVED***);
***REMOVED***

function setupApi(editor, editorDiv, settingDiv, ace, options, loader) ***REMOVED***
    var session = editor.getSession();
    var renderer = editor.renderer;
    loader = loader || load;

    function toBool(value) ***REMOVED***
        return value === "true" || value == true;
***REMOVED***

    editor.setDisplaySettings = function(display) ***REMOVED***
        if (display == null)
            display = settingDiv.style.display == "none";
        if (display) ***REMOVED***
            settingDiv.style.display = "block";
            settingDiv.hideButton.focus();
            editor.on("focus", function onFocus() ***REMOVED***
                editor.removeListener("focus", onFocus);
                settingDiv.style.display = "none";
        ***REMOVED***);
    ***REMOVED*** else ***REMOVED***
            editor.focus();
    ***REMOVED***
***REMOVED***;

    editor.$setOption = editor.setOption;
    editor.setOption = function(key, value) ***REMOVED***
        if (options[key] == value) return;

        switch (key) ***REMOVED***
            case "mode":
                if (value != "text") ***REMOVED***
                    loader("mode-" + value + ".js", "ace/mode/" + value, function() ***REMOVED***
                        var aceMode = require("../mode/" + value).Mode;
                        session.setMode(new aceMode());
                ***REMOVED***);
            ***REMOVED*** else ***REMOVED***
                    session.setMode(new (require("../mode/text").Mode));
            ***REMOVED***
            break;

            case "theme":
                if (value != "textmate") ***REMOVED***
                    loader("theme-" + value + ".js", "ace/theme/" + value, function() ***REMOVED***
                        editor.setTheme("ace/theme/" + value);
                ***REMOVED***);
            ***REMOVED*** else ***REMOVED***
                    editor.setTheme("ace/theme/textmate");
            ***REMOVED***
            break;

            case "fontSize":
                editorDiv.style.fontSize = value;
            break;

            case "keybindings":
                switch (value) ***REMOVED***
                    case "vim":
                        editor.setKeyboardHandler("ace/keyboard/vim");
                        break;
                    case "emacs":
                        editor.setKeyboardHandler("ace/keyboard/emacs");
                        break;
                    default:
                        editor.setKeyboardHandler(null);
            ***REMOVED***
            break;

            case "softWrap":
                switch (value) ***REMOVED***
                    case "off":
                        session.setUseWrapMode(false);
                        renderer.setPrintMarginColumn(80);
                    break;
                    case "40":
                        session.setUseWrapMode(true);
                        session.setWrapLimitRange(40, 40);
                        renderer.setPrintMarginColumn(40);
                    break;
                    case "80":
                        session.setUseWrapMode(true);
                        session.setWrapLimitRange(80, 80);
                        renderer.setPrintMarginColumn(80);
                    break;
                    case "free":
                        session.setUseWrapMode(true);
                        session.setWrapLimitRange(null, null);
                        renderer.setPrintMarginColumn(80);
                    break;
            ***REMOVED***
            break;
            
            default:
                editor.$setOption(key, toBool(value));
    ***REMOVED***

        options[key] = value;
***REMOVED***;

    editor.getOption = function(key) ***REMOVED***
        return options[key];
***REMOVED***;

    editor.getOptions = function() ***REMOVED***
        return options;
***REMOVED***;

    editor.setOptions(exports.options);

    return editor;
***REMOVED***

function setupSettingPanel(settingDiv, settingOpener, editor, options) ***REMOVED***
    var BOOL = null;

    var desc = ***REMOVED***
        mode:            "Mode:",
        gutter:          "Display Gutter:",
        theme:           "Theme:",
        fontSize:        "Font Size:",
        softWrap:        "Soft Wrap:",
        keybindings:     "Keyboard",
        showPrintMargin: "Show Print Margin:",
        useSoftTabs:     "Use Soft Tabs:",
        showInvisibles:  "Show Invisibles"
***REMOVED***;

    var optionValues = ***REMOVED***
        mode: ***REMOVED***
            text:       "Plain",
            javascript: "JavaScript",
            xml:        "XML",
            html:       "HTML",
            css:        "CSS",
            scss:       "SCSS",
            python:     "Python",
            php:        "PHP",
            java:       "Java",
            ruby:       "Ruby",
            c_cpp:      "C/C++",
            coffee:     "CoffeeScript",
            json:       "json",
            perl:       "Perl",
            clojure:    "Clojure",
            ocaml:      "OCaml",
            csharp:     "C#",
            haxe:       "haXe",
            svg:        "SVG",
            textile:    "Textile",
            groovy:     "Groovy",
            liquid:     "Liquid",
            Scala:      "Scala"
    ***REMOVED***
        theme: ***REMOVED***
            clouds:           "Clouds",
            clouds_midnight:  "Clouds Midnight",
            cobalt:           "Cobalt",
            crimson_editor:   "Crimson Editor",
            dawn:             "Dawn",
            eclipse:          "Eclipse",
            idle_fingers:     "Idle Fingers",
            kr_theme:         "Kr Theme",
            merbivore:        "Merbivore",
            merbivore_soft:   "Merbivore Soft",
            mono_industrial:  "Mono Industrial",
            monokai:          "Monokai",
            pastel_on_dark:   "Pastel On Dark",
            solarized_dark:   "Solarized Dark",
            solarized_light:  "Solarized Light",
            textmate:         "Textmate",
            twilight:         "Twilight",
            vibrant_ink:      "Vibrant Ink"
    ***REMOVED***
        gutter: BOOL,
        fontSize: ***REMOVED***
            "10px": "10px",
            "11px": "11px",
            "12px": "12px",
            "14px": "14px",
            "16px": "16px"
    ***REMOVED***
        softWrap: ***REMOVED***
            off:    "Off",
            40:     "40",
            80:     "80",
            free:   "Free"
    ***REMOVED***
        keybindings: ***REMOVED***
            ace: "ace",
            vim: "vim",
            emacs: "emacs"
    ***REMOVED***
        showPrintMargin:    BOOL,
        useSoftTabs:        BOOL,
        showInvisibles:     BOOL
***REMOVED***;

    var table = [];
    table.push("<table><tr><th>Setting</th><th>Value</th></tr>");

    function renderOption(builder, option, obj, cValue) ***REMOVED***
        if (!obj) ***REMOVED***
            builder.push(
                "<input type='checkbox' title='", option, "' ",
                    cValue == "true" ? "checked='true'" : "",
               "'></input>"
            );
            return;
    ***REMOVED***
        builder.push("<select title='" + option + "'>");
        for (var value in obj) ***REMOVED***
            builder.push("<option value='" + value + "' ");

            if (cValue == value) ***REMOVED***
                builder.push(" selected ");
        ***REMOVED***

            builder.push(">",
                obj[value],
                "</option>");
    ***REMOVED***
        builder.push("</select>");
***REMOVED***

    for (var option in options) ***REMOVED***
        table.push("<tr><td>", desc[option], "</td>");
        table.push("<td>");
        renderOption(table, option, optionValues[option], options[option]);
        table.push("</td></tr>");
***REMOVED***
    table.push("</table>");
    settingDiv.innerHTML = table.join("");

    var onChange = function(e) ***REMOVED***
        var select = e.currentTarget;
        editor.setOption(select.title, select.value);
***REMOVED***;
    var onClick = function(e) ***REMOVED***
        var cb = e.currentTarget;
        editor.setOption(cb.title, cb.checked);
***REMOVED***;
    var selects = settingDiv.getElementsByTagName("select");
    for (var i = 0; i < selects.length; i++)
        selects[i].onchange = onChange;
    var cbs = settingDiv.getElementsByTagName("input");
    for (var i = 0; i < cbs.length; i++)
        cbs[i].onclick = onClick;


    var button = document.createElement("input");
    button.type = "button";
    button.value = "Hide";
    event.addListener(button, "click", function() ***REMOVED***
        editor.setDisplaySettings(false);
***REMOVED***);
    settingDiv.appendChild(button);
    settingDiv.hideButton = button;
***REMOVED***
exports.options = ***REMOVED***
    mode:               "text",
    theme:              "textmate",
    gutter:             "false",
    fontSize:           "12px",
    softWrap:           "off",
    keybindings:        "ace",
    showPrintMargin:    "false",
    useSoftTabs:        "true",
    showInvisibles:     "false"
***REMOVED***;

***REMOVED***);

__ace_shadowed__.define('ace/lib/event', ['require', 'exports', 'module' , 'ace/lib/keys', 'ace/lib/useragent'], function(require, exports, module) ***REMOVED***


var keys = require("./keys");
var useragent = require("./useragent");

exports.addListener = function(elem, type, callback) ***REMOVED***
    if (elem.addEventListener) ***REMOVED***
        return elem.addEventListener(type, callback, false);
***REMOVED***
    if (elem.attachEvent) ***REMOVED***
        var wrapper = function() ***REMOVED***
            callback.call(elem, window.event);
    ***REMOVED***;
        callback._wrapper = wrapper;
        elem.attachEvent("on" + type, wrapper);
***REMOVED***
***REMOVED***;

exports.removeListener = function(elem, type, callback) ***REMOVED***
    if (elem.removeEventListener) ***REMOVED***
        return elem.removeEventListener(type, callback, false);
***REMOVED***
    if (elem.detachEvent) ***REMOVED***
        elem.detachEvent("on" + type, callback._wrapper || callback);
***REMOVED***
***REMOVED***;
exports.stopEvent = function(e) ***REMOVED***
    exports.stopPropagation(e);
    exports.preventDefault(e);
    return false;
***REMOVED***;

exports.stopPropagation = function(e) ***REMOVED***
    if (e.stopPropagation)
        e.stopPropagation();
    else
        e.cancelBubble = true;
***REMOVED***;

exports.preventDefault = function(e) ***REMOVED***
    if (e.preventDefault)
        e.preventDefault();
    else
        e.returnValue = false;
***REMOVED***;
exports.getButton = function(e) ***REMOVED***
    if (e.type == "dblclick")
        return 0;
    if (e.type == "contextmenu" || (e.ctrlKey && useragent.isMac))
        return 2;
    if (e.preventDefault) ***REMOVED***
        return e.button;
***REMOVED***
    else ***REMOVED***
        return ***REMOVED***1:0, 2:2, 4:1***REMOVED***[e.button];
***REMOVED***
***REMOVED***;

exports.capture = function(el, eventHandler, releaseCaptureHandler) ***REMOVED***
    function onMouseUp(e) ***REMOVED***
        eventHandler && eventHandler(e);
        releaseCaptureHandler && releaseCaptureHandler(e);

        exports.removeListener(document, "mousemove", eventHandler, true);
        exports.removeListener(document, "mouseup", onMouseUp, true);
        exports.removeListener(document, "dragstart", onMouseUp, true);
***REMOVED***

    exports.addListener(document, "mousemove", eventHandler, true);
    exports.addListener(document, "mouseup", onMouseUp, true);
    exports.addListener(document, "dragstart", onMouseUp, true);
    
    return onMouseUp;
***REMOVED***;

exports.addMouseWheelListener = function(el, callback) ***REMOVED***
    if ("onmousewheel" in el) ***REMOVED***
        exports.addListener(el, "mousewheel", function(e) ***REMOVED***
            var factor = 8;
            if (e.wheelDeltaX !== undefined) ***REMOVED***
                e.wheelX = -e.wheelDeltaX / factor;
                e.wheelY = -e.wheelDeltaY / factor;
        ***REMOVED*** else ***REMOVED***
                e.wheelX = 0;
                e.wheelY = -e.wheelDelta / factor;
        ***REMOVED***
            callback(e);
    ***REMOVED***);
***REMOVED*** else if ("onwheel" in el) ***REMOVED***
        exports.addListener(el, "wheel",  function(e) ***REMOVED***
            var factor = 0.35;
            switch (e.deltaMode) ***REMOVED***
                case e.DOM_DELTA_PIXEL:
                    e.wheelX = e.deltaX * factor || 0;
                    e.wheelY = e.deltaY * factor || 0;
                    break;
                case e.DOM_DELTA_LINE:
                case e.DOM_DELTA_PAGE:
                    e.wheelX = (e.deltaX || 0) * 5;
                    e.wheelY = (e.deltaY || 0) * 5;
                    break;
        ***REMOVED***
            
            callback(e);
    ***REMOVED***);
***REMOVED*** else ***REMOVED***
        exports.addListener(el, "DOMMouseScroll", function(e) ***REMOVED***
            if (e.axis && e.axis == e.HORIZONTAL_AXIS) ***REMOVED***
                e.wheelX = (e.detail || 0) * 5;
                e.wheelY = 0;
        ***REMOVED*** else ***REMOVED***
                e.wheelX = 0;
                e.wheelY = (e.detail || 0) * 5;
        ***REMOVED***
            callback(e);
    ***REMOVED***);
***REMOVED***
***REMOVED***;

exports.addMultiMouseDownListener = function(el, timeouts, eventHandler, callbackName) ***REMOVED***
    var clicks = 0;
    var startX, startY, timer; 
    var eventNames = ***REMOVED***
        2: "dblclick",
        3: "tripleclick",
        4: "quadclick"
***REMOVED***;

    exports.addListener(el, "mousedown", function(e) ***REMOVED***
        if (exports.getButton(e) !== 0) ***REMOVED***
            clicks = 0;
    ***REMOVED*** else if (e.detail > 1) ***REMOVED***
            clicks++;
            if (clicks > 4)
                clicks = 1;
    ***REMOVED*** else ***REMOVED***
            clicks = 1;
    ***REMOVED***
        if (useragent.isIE) ***REMOVED***
            var isNewClick = Math.abs(e.clientX - startX) > 5 || Math.abs(e.clientY - startY) > 5;
            if (!timer || isNewClick)
                clicks = 1;
            if (timer)
                clearTimeout(timer)
            timer = setTimeout(function() ***REMOVED***timer = null***REMOVED***, timeouts[clicks - 1] || 600);

            if (clicks == 1) ***REMOVED***
                startX = e.clientX;
                startY = e.clientY;
        ***REMOVED***
    ***REMOVED***

        eventHandler[callbackName]("mousedown", e);

        if (clicks > 4)
            clicks = 0;
        else if (clicks > 1)
            return eventHandler[callbackName](eventNames[clicks], e);
***REMOVED***);

    if (useragent.isOldIE) ***REMOVED***
        exports.addListener(el, "dblclick", function(e) ***REMOVED***
            clicks = 2;
            if (timer)
                clearTimeout(timer);
            timer = setTimeout(function() ***REMOVED***timer = null***REMOVED***, timeouts[clicks - 1] || 600);
            eventHandler[callbackName]("mousedown", e);
            eventHandler[callbackName](eventNames[clicks], e);
    ***REMOVED***);
***REMOVED***
***REMOVED***;

var getModifierHash = useragent.isMac && useragent.isOpera && !("KeyboardEvent" in window)
    ? function(e) ***REMOVED***
        return 0 | (e.metaKey ? 1 : 0) | (e.altKey ? 2 : 0) | (e.shiftKey ? 4 : 0) | (e.ctrlKey ? 8 : 0);
***REMOVED***
    : function(e) ***REMOVED***
        return 0 | (e.ctrlKey ? 1 : 0) | (e.altKey ? 2 : 0) | (e.shiftKey ? 4 : 0) | (e.metaKey ? 8 : 0);
***REMOVED***;

exports.getModifierString = function(e) ***REMOVED***
    return keys.KEY_MODS[getModifierHash(e)];
***REMOVED***;

function normalizeCommandKeys(callback, e, keyCode) ***REMOVED***
    var hashId = getModifierHash(e);

    if (!useragent.isMac && pressedKeys) ***REMOVED***
        if (pressedKeys[91] || pressedKeys[92])
            hashId |= 8;
        if (pressedKeys.altGr) ***REMOVED***
            if ((3 & hashId) != 3)
                pressedKeys.altGr = 0;
            else
                return;
    ***REMOVED***
        if (keyCode === 18 || keyCode === 17) ***REMOVED***
            var location = e.location || e.keyLocation;
            if (keyCode === 17 && location === 1) ***REMOVED***
                ts = e.timeStamp;
        ***REMOVED*** else if (keyCode === 18 && hashId === 3 && location === 2) ***REMOVED***
                var dt = -ts;
                ts = e.timeStamp;
                dt += ts;
                if (dt < 3)
                    pressedKeys.altGr = true;
        ***REMOVED***
    ***REMOVED***
***REMOVED***
    
    if (keyCode in keys.MODIFIER_KEYS) ***REMOVED***
        switch (keys.MODIFIER_KEYS[keyCode]) ***REMOVED***
            case "Alt":
                hashId = 2;
                break;
            case "Shift":
                hashId = 4;
                break;
            case "Ctrl":
                hashId = 1;
                break;
            default:
                hashId = 8;
                break;
    ***REMOVED***
        keyCode = -1;
***REMOVED***

    if (hashId & 8 && (keyCode === 91 || keyCode === 93)) ***REMOVED***
        keyCode = -1;
***REMOVED***
    
    if (!hashId && keyCode === 13) ***REMOVED***
        if (e.location || e.keyLocation === 3) ***REMOVED***
            callback(e, hashId, -keyCode);
            if (e.defaultPrevented)
                return;
    ***REMOVED***
***REMOVED***
    if (!hashId && !(keyCode in keys.FUNCTION_KEYS) && !(keyCode in keys.PRINTABLE_KEYS)) ***REMOVED***
        return false;
***REMOVED***
    
    return callback(e, hashId, keyCode);
***REMOVED***

var pressedKeys = null;
var ts = 0;
exports.addCommandKeyListener = function(el, callback) ***REMOVED***
    var addListener = exports.addListener;
    if (useragent.isOldGecko || (useragent.isOpera && !("KeyboardEvent" in window))) ***REMOVED***
        var lastKeyDownKeyCode = null;
        addListener(el, "keydown", function(e) ***REMOVED***
            lastKeyDownKeyCode = e.keyCode;
    ***REMOVED***);
        addListener(el, "keypress", function(e) ***REMOVED***
            return normalizeCommandKeys(callback, e, lastKeyDownKeyCode);
    ***REMOVED***);
***REMOVED*** else ***REMOVED***
        var lastDefaultPrevented = null;

        addListener(el, "keydown", function(e) ***REMOVED***
            pressedKeys[e.keyCode] = true;
            var result = normalizeCommandKeys(callback, e, e.keyCode);
            lastDefaultPrevented = e.defaultPrevented;
            return result;
    ***REMOVED***);

        addListener(el, "keypress", function(e) ***REMOVED***
            if (lastDefaultPrevented && (e.ctrlKey || e.altKey || e.shiftKey || e.metaKey)) ***REMOVED***
                exports.stopEvent(e);
                lastDefaultPrevented = null;
        ***REMOVED***
    ***REMOVED***);

        addListener(el, "keyup", function(e) ***REMOVED***
            pressedKeys[e.keyCode] = null;
    ***REMOVED***);

        if (!pressedKeys) ***REMOVED***
            pressedKeys = Object.create(null);
            addListener(window, "focus", function(e) ***REMOVED***
                pressedKeys = Object.create(null);
        ***REMOVED***);
    ***REMOVED***
***REMOVED***
***REMOVED***;

if (window.postMessage && !useragent.isOldIE) ***REMOVED***
    var postMessageId = 1;
    exports.nextTick = function(callback, win) ***REMOVED***
        win = win || window;
        var messageName = "zero-timeout-message-" + postMessageId;
        exports.addListener(win, "message", function listener(e) ***REMOVED***
            if (e.data == messageName) ***REMOVED***
                exports.stopPropagation(e);
                exports.removeListener(win, "message", listener);
                callback();
        ***REMOVED***
    ***REMOVED***);
        win.postMessage(messageName, "*");
***REMOVED***;
***REMOVED***


exports.nextFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.oRequestAnimationFrame;

if (exports.nextFrame)
    exports.nextFrame = exports.nextFrame.bind(window);
else
    exports.nextFrame = function(callback) ***REMOVED***
        setTimeout(callback, 17);
***REMOVED***;
***REMOVED***);

__ace_shadowed__.define('ace/lib/keys', ['require', 'exports', 'module' , 'ace/lib/oop'], function(require, exports, module) ***REMOVED***


var oop = require("./oop");
var Keys = (function() ***REMOVED***
    var ret = ***REMOVED***
        MODIFIER_KEYS: ***REMOVED***
            16: 'Shift', 17: 'Ctrl', 18: 'Alt', 224: 'Meta'
    ***REMOVED***

        KEY_MODS: ***REMOVED***
            "ctrl": 1, "alt": 2, "option" : 2, "shift": 4,
            "super": 8, "meta": 8, "command": 8, "cmd": 8
    ***REMOVED***

        FUNCTION_KEYS : ***REMOVED***
            8  : "Backspace",
            9  : "Tab",
            13 : "Return",
            19 : "Pause",
            27 : "Esc",
            32 : "Space",
            33 : "PageUp",
            34 : "PageDown",
            35 : "End",
            36 : "Home",
            37 : "Left",
            38 : "Up",
            39 : "Right",
            40 : "Down",
            44 : "Print",
            45 : "Insert",
            46 : "Delete",
            96 : "Numpad0",
            97 : "Numpad1",
            98 : "Numpad2",
            99 : "Numpad3",
            100: "Numpad4",
            101: "Numpad5",
            102: "Numpad6",
            103: "Numpad7",
            104: "Numpad8",
            105: "Numpad9",
            '-13': "NumpadEnter",
            112: "F1",
            113: "F2",
            114: "F3",
            115: "F4",
            116: "F5",
            117: "F6",
            118: "F7",
            119: "F8",
            120: "F9",
            121: "F10",
            122: "F11",
            123: "F12",
            144: "Numlock",
            145: "Scrolllock"
    ***REMOVED***

        PRINTABLE_KEYS: ***REMOVED***
           32: ' ',  48: '0',  49: '1',  50: '2',  51: '3',  52: '4', 53:  '5',
           54: '6',  55: '7',  56: '8',  57: '9',  59: ';',  61: '=', 65:  'a',
           66: 'b',  67: 'c',  68: 'd',  69: 'e',  70: 'f',  71: 'g', 72:  'h',
           73: 'i',  74: 'j',  75: 'k',  76: 'l',  77: 'm',  78: 'n', 79:  'o',
           80: 'p',  81: 'q',  82: 'r',  83: 's',  84: 't',  85: 'u', 86:  'v',
           87: 'w',  88: 'x',  89: 'y',  90: 'z', 107: '+', 109: '-', 110: '.',
          187: '=', 188: ',', 189: '-', 190: '.', 191: '/', 192: '`', 219: '[',
          220: '\\',221: ']', 222: '\'',
    ***REMOVED***
***REMOVED***;
    var name, i;
    for (i in ret.FUNCTION_KEYS) ***REMOVED***
        name = ret.FUNCTION_KEYS[i].toLowerCase();
        ret[name] = parseInt(i, 10);
***REMOVED***
    for (i in ret.PRINTABLE_KEYS) ***REMOVED***
        name = ret.PRINTABLE_KEYS[i].toLowerCase();
        ret[name] = parseInt(i, 10);
***REMOVED***
    oop.mixin(ret, ret.MODIFIER_KEYS);
    oop.mixin(ret, ret.PRINTABLE_KEYS);
    oop.mixin(ret, ret.FUNCTION_KEYS);
    ret.enter = ret["return"];
    ret.escape = ret.esc;
    ret.del = ret["delete"];
    ret[173] = '-';

    (function() ***REMOVED***
        var mods = ["cmd", "ctrl", "alt", "shift"];
        for (var i = Math.pow(2, mods.length); i--;) ***REMOVED***
            ret.KEY_MODS[i] = mods.filter(function(x) ***REMOVED***
                return i & ret.KEY_MODS[x];
        ***REMOVED***).join("-") + "-";
    ***REMOVED***
***REMOVED***)();

    return ret;
***REMOVED***)();
oop.mixin(exports, Keys);

exports.keyCodeToString = function(keyCode) ***REMOVED***
    var keyString = Keys[keyCode];
    if (typeof keyString != "string")
        keyString = String.fromCharCode(keyCode);
    return keyString.toLowerCase();
***REMOVED***;

***REMOVED***);

__ace_shadowed__.define('ace/lib/oop', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***


exports.inherits = function(ctor, superCtor) ***REMOVED***
    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, ***REMOVED***
        constructor: ***REMOVED***
            value: ctor,
            enumerable: false,
            writable: true,
            configurable: true
    ***REMOVED***
***REMOVED***);
***REMOVED***;

exports.mixin = function(obj, mixin) ***REMOVED***
    for (var key in mixin) ***REMOVED***
        obj[key] = mixin[key];
***REMOVED***
    return obj;
***REMOVED***;

exports.implement = function(proto, mixin) ***REMOVED***
    exports.mixin(proto, mixin);
***REMOVED***;

***REMOVED***);

__ace_shadowed__.define('ace/lib/useragent', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***
exports.OS = ***REMOVED***
    LINUX: "LINUX",
    MAC: "MAC",
    WINDOWS: "WINDOWS"
***REMOVED***;
exports.getOS = function() ***REMOVED***
    if (exports.isMac) ***REMOVED***
        return exports.OS.MAC;
***REMOVED*** else if (exports.isLinux) ***REMOVED***
        return exports.OS.LINUX;
***REMOVED*** else ***REMOVED***
        return exports.OS.WINDOWS;
***REMOVED***
***REMOVED***;
if (typeof navigator != "object")
    return;

var os = (navigator.platform.match(/mac|win|linux/i) || ["other"])[0].toLowerCase();
var ua = navigator.userAgent;
exports.isWin = (os == "win");
exports.isMac = (os == "mac");
exports.isLinux = (os == "linux");
exports.isIE = 
    (navigator.appName == "Microsoft Internet Explorer" || navigator.appName.indexOf("MSAppHost") >= 0)
    ? parseFloat((ua.match(/(?:MSIE |Trident\/[0-9]+[\.0-9]+;.*rv:)([0-9]+[\.0-9]+)/)||[])[1])
    : parseFloat((ua.match(/(?:Trident\/[0-9]+[\.0-9]+;.*rv:)([0-9]+[\.0-9]+)/)||[])[1]); // for ie
    
exports.isOldIE = exports.isIE && exports.isIE < 9;
exports.isGecko = exports.isMozilla = window.controllers && window.navigator.product === "Gecko";
exports.isOldGecko = exports.isGecko && parseInt((ua.match(/rv\:(\d+)/)||[])[1], 10) < 4;
exports.isOpera = window.opera && Object.prototype.toString.call(window.opera) == "[object Opera]";
exports.isWebKit = parseFloat(ua.split("WebKit/")[1]) || undefined;

exports.isChrome = parseFloat(ua.split(" Chrome/")[1]) || undefined;

exports.isAIR = ua.indexOf("AdobeAIR") >= 0;

exports.isIPad = ua.indexOf("iPad") >= 0;

exports.isTouchPad = ua.indexOf("TouchPad") >= 0;

***REMOVED***);
__ace_shadowed__.define('ace/lib/net', ['require', 'exports', 'module' , 'ace/lib/dom'], function(require, exports, module) ***REMOVED***

var dom = require("./dom");

exports.get = function (url, callback) ***REMOVED***
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function () ***REMOVED***
        if (xhr.readyState === 4) ***REMOVED***
            callback(xhr.responseText);
    ***REMOVED***
***REMOVED***;
    xhr.send(null);
***REMOVED***;

exports.loadScript = function(path, callback) ***REMOVED***
    var head = dom.getDocumentHead();
    var s = document.createElement('script');

    s.src = path;
    head.appendChild(s);

    s.onload = s.onreadystatechange = function(_, isAbort) ***REMOVED***
        if (isAbort || !s.readyState || s.readyState == "loaded" || s.readyState == "complete") ***REMOVED***
            s = s.onload = s.onreadystatechange = null;
            if (!isAbort)
                callback();
    ***REMOVED***
***REMOVED***;
***REMOVED***;
exports.qualifyURL = function(url) ***REMOVED***
    var a = document.createElement('a');
    a.href = url;
    return a.href;
***REMOVED***

***REMOVED***);

__ace_shadowed__.define('ace/lib/dom', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***


if (typeof document == "undefined")
    return;

var XHTML_NS = "http://www.w3.org/1999/xhtml";

exports.getDocumentHead = function(doc) ***REMOVED***
    if (!doc)
        doc = document;
    return doc.head || doc.getElementsByTagName("head")[0] || doc.documentElement;
***REMOVED***

exports.createElement = function(tag, ns) ***REMOVED***
    return document.createElementNS ?
           document.createElementNS(ns || XHTML_NS, tag) :
           document.createElement(tag);
***REMOVED***;

exports.hasCssClass = function(el, name) ***REMOVED***
    var classes = el.className.split(/\s+/g);
    return classes.indexOf(name) !== -1;
***REMOVED***;
exports.addCssClass = function(el, name) ***REMOVED***
    if (!exports.hasCssClass(el, name)) ***REMOVED***
        el.className += " " + name;
***REMOVED***
***REMOVED***;
exports.removeCssClass = function(el, name) ***REMOVED***
    var classes = el.className.split(/\s+/g);
    while (true) ***REMOVED***
        var index = classes.indexOf(name);
        if (index == -1) ***REMOVED***
            break;
    ***REMOVED***
        classes.splice(index, 1);
***REMOVED***
    el.className = classes.join(" ");
***REMOVED***;

exports.toggleCssClass = function(el, name) ***REMOVED***
    var classes = el.className.split(/\s+/g), add = true;
    while (true) ***REMOVED***
        var index = classes.indexOf(name);
        if (index == -1) ***REMOVED***
            break;
    ***REMOVED***
        add = false;
        classes.splice(index, 1);
***REMOVED***
    if(add)
        classes.push(name);

    el.className = classes.join(" ");
    return add;
***REMOVED***;
exports.setCssClass = function(node, className, include) ***REMOVED***
    if (include) ***REMOVED***
        exports.addCssClass(node, className);
***REMOVED*** else ***REMOVED***
        exports.removeCssClass(node, className);
***REMOVED***
***REMOVED***;

exports.hasCssString = function(id, doc) ***REMOVED***
    var index = 0, sheets;
    doc = doc || document;

    if (doc.createStyleSheet && (sheets = doc.styleSheets)) ***REMOVED***
        while (index < sheets.length)
            if (sheets[index++].owningElement.id === id) return true;
***REMOVED*** else if ((sheets = doc.getElementsByTagName("style"))) ***REMOVED***
        while (index < sheets.length)
            if (sheets[index++].id === id) return true;
***REMOVED***

    return false;
***REMOVED***;

exports.importCssString = function importCssString(cssText, id, doc) ***REMOVED***
    doc = doc || document;
    if (id && exports.hasCssString(id, doc))
        return null;
    
    var style;
    
    if (doc.createStyleSheet) ***REMOVED***
        style = doc.createStyleSheet();
        style.cssText = cssText;
        if (id)
            style.owningElement.id = id;
***REMOVED*** else ***REMOVED***
        style = doc.createElementNS
            ? doc.createElementNS(XHTML_NS, "style")
            : doc.createElement("style");

        style.appendChild(doc.createTextNode(cssText));
        if (id)
            style.id = id;

        exports.getDocumentHead(doc).appendChild(style);
***REMOVED***
***REMOVED***;

exports.importCssStylsheet = function(uri, doc) ***REMOVED***
    if (doc.createStyleSheet) ***REMOVED***
        doc.createStyleSheet(uri);
***REMOVED*** else ***REMOVED***
        var link = exports.createElement('link');
        link.rel = 'stylesheet';
        link.href = uri;

        exports.getDocumentHead(doc).appendChild(link);
***REMOVED***
***REMOVED***;

exports.getInnerWidth = function(element) ***REMOVED***
    return (
        parseInt(exports.computedStyle(element, "paddingLeft"), 10) +
        parseInt(exports.computedStyle(element, "paddingRight"), 10) + 
        element.clientWidth
    );
***REMOVED***;

exports.getInnerHeight = function(element) ***REMOVED***
    return (
        parseInt(exports.computedStyle(element, "paddingTop"), 10) +
        parseInt(exports.computedStyle(element, "paddingBottom"), 10) +
        element.clientHeight
    );
***REMOVED***;

if (window.pageYOffset !== undefined) ***REMOVED***
    exports.getPageScrollTop = function() ***REMOVED***
        return window.pageYOffset;
***REMOVED***;

    exports.getPageScrollLeft = function() ***REMOVED***
        return window.pageXOffset;
***REMOVED***;
***REMOVED***
else ***REMOVED***
    exports.getPageScrollTop = function() ***REMOVED***
        return document.body.scrollTop;
***REMOVED***;

    exports.getPageScrollLeft = function() ***REMOVED***
        return document.body.scrollLeft;
***REMOVED***;
***REMOVED***

if (window.getComputedStyle)
    exports.computedStyle = function(element, style) ***REMOVED***
        if (style)
            return (window.getComputedStyle(element, "") || ***REMOVED******REMOVED***)[style] || "";
        return window.getComputedStyle(element, "") || ***REMOVED******REMOVED***;
***REMOVED***;
else
    exports.computedStyle = function(element, style) ***REMOVED***
        if (style)
            return element.currentStyle[style];
        return element.currentStyle;
***REMOVED***;

exports.scrollbarWidth = function(document) ***REMOVED***
    var inner = exports.createElement("ace_inner");
    inner.style.width = "100%";
    inner.style.minWidth = "0px";
    inner.style.height = "200px";
    inner.style.display = "block";

    var outer = exports.createElement("ace_outer");
    var style = outer.style;

    style.position = "absolute";
    style.left = "-10000px";
    style.overflow = "hidden";
    style.width = "200px";
    style.minWidth = "0px";
    style.height = "150px";
    style.display = "block";

    outer.appendChild(inner);

    var body = document.documentElement;
    body.appendChild(outer);

    var noScrollbar = inner.offsetWidth;

    style.overflow = "scroll";
    var withScrollbar = inner.offsetWidth;

    if (noScrollbar == withScrollbar) ***REMOVED***
        withScrollbar = outer.clientWidth;
***REMOVED***

    body.removeChild(outer);

    return noScrollbar-withScrollbar;
***REMOVED***;
exports.setInnerHtml = function(el, innerHtml) ***REMOVED***
    var element = el.cloneNode(false);//document.createElement("div");
    element.innerHTML = innerHtml;
    el.parentNode.replaceChild(element, el);
    return element;
***REMOVED***;

if ("textContent" in document.documentElement) ***REMOVED***
    exports.setInnerText = function(el, innerText) ***REMOVED***
        el.textContent = innerText;
***REMOVED***;

    exports.getInnerText = function(el) ***REMOVED***
        return el.textContent;
***REMOVED***;
***REMOVED***
else ***REMOVED***
    exports.setInnerText = function(el, innerText) ***REMOVED***
        el.innerText = innerText;
***REMOVED***;

    exports.getInnerText = function(el) ***REMOVED***
        return el.innerText;
***REMOVED***;
***REMOVED***

exports.getParentWindow = function(document) ***REMOVED***
    return document.defaultView || document.parentWindow;
***REMOVED***;

***REMOVED***);

__ace_shadowed__.define('ace/ace', ['require', 'exports', 'module' , 'ace/lib/fixoldbrowsers', 'ace/lib/dom', 'ace/lib/event', 'ace/editor', 'ace/edit_session', 'ace/undomanager', 'ace/virtual_renderer', 'ace/multi_select', 'ace/worker/worker_client', 'ace/keyboard/hash_handler', 'ace/placeholder', 'ace/mode/folding/fold_mode', 'ace/theme/textmate', 'ace/ext/error_marker', 'ace/config'], function(require, exports, module) ***REMOVED***


require("./lib/fixoldbrowsers");

var dom = require("./lib/dom");
var event = require("./lib/event");

var Editor = require("./editor").Editor;
var EditSession = require("./edit_session").EditSession;
var UndoManager = require("./undomanager").UndoManager;
var Renderer = require("./virtual_renderer").VirtualRenderer;
var MultiSelect = require("./multi_select").MultiSelect;
require("./worker/worker_client");
require("./keyboard/hash_handler");
require("./placeholder");
require("./mode/folding/fold_mode");
require("./theme/textmate");
require("./ext/error_marker");

exports.config = require("./config");
exports.require = require;
exports.edit = function(el) ***REMOVED***
    if (typeof(el) == "string") ***REMOVED***
        var _id = el;
        var el = document.getElementById(_id);
        if (!el)
            throw new Error("ace.edit can't find div #" + _id);
***REMOVED***

    if (el.env && el.env.editor instanceof Editor)
        return el.env.editor;

    var doc = exports.createEditSession(dom.getInnerText(el));
    el.innerHTML = '';

    var editor = new Editor(new Renderer(el));
    new MultiSelect(editor);
    editor.setSession(doc);

    var env = ***REMOVED***
        document: doc,
        editor: editor,
        onResize: editor.resize.bind(editor, null)
***REMOVED***;
    event.addListener(window, "resize", env.onResize);
    editor.on("destroy", function() ***REMOVED***
        event.removeListener(window, "resize", env.onResize);
***REMOVED***);
    el.env = editor.env = env;
    return editor;
***REMOVED***;
exports.createEditSession = function(text, mode) ***REMOVED***
    var doc = new EditSession(text, mode);
    doc.setUndoManager(new UndoManager());
    return doc;
***REMOVED***
exports.EditSession = EditSession;
exports.UndoManager = UndoManager;
***REMOVED***);

__ace_shadowed__.define('ace/lib/fixoldbrowsers', ['require', 'exports', 'module' , 'ace/lib/regexp', 'ace/lib/es5-shim'], function(require, exports, module) ***REMOVED***


require("./regexp");
require("./es5-shim");

***REMOVED***);
 
__ace_shadowed__.define('ace/lib/regexp', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***

    var real = ***REMOVED***
            exec: RegExp.prototype.exec,
            test: RegExp.prototype.test,
            match: String.prototype.match,
            replace: String.prototype.replace,
            split: String.prototype.split
    ***REMOVED***
        compliantExecNpcg = real.exec.call(/()??/, "")[1] === undefined, // check `exec` handling of nonparticipating capturing groups
        compliantLastIndexIncrement = function () ***REMOVED***
            var x = /^/g;
            real.test.call(x, "");
            return !x.lastIndex;
    ***REMOVED***();

    if (compliantLastIndexIncrement && compliantExecNpcg)
        return;
    RegExp.prototype.exec = function (str) ***REMOVED***
        var match = real.exec.apply(this, arguments),
            name, r2;
        if ( typeof(str) == 'string' && match) ***REMOVED***
            if (!compliantExecNpcg && match.length > 1 && indexOf(match, "") > -1) ***REMOVED***
                r2 = RegExp(this.source, real.replace.call(getNativeFlags(this), "g", ""));
                real.replace.call(str.slice(match.index), r2, function () ***REMOVED***
                    for (var i = 1; i < arguments.length - 2; i++) ***REMOVED***
                        if (arguments[i] === undefined)
                            match[i] = undefined;
                ***REMOVED***
            ***REMOVED***);
        ***REMOVED***
            if (this._xregexp && this._xregexp.captureNames) ***REMOVED***
                for (var i = 1; i < match.length; i++) ***REMOVED***
                    name = this._xregexp.captureNames[i - 1];
                    if (name)
                       match[name] = match[i];
            ***REMOVED***
        ***REMOVED***
            if (!compliantLastIndexIncrement && this.global && !match[0].length && (this.lastIndex > match.index))
                this.lastIndex--;
    ***REMOVED***
        return match;
***REMOVED***;
    if (!compliantLastIndexIncrement) ***REMOVED***
        RegExp.prototype.test = function (str) ***REMOVED***
            var match = real.exec.call(this, str);
            if (match && this.global && !match[0].length && (this.lastIndex > match.index))
                this.lastIndex--;
            return !!match;
    ***REMOVED***;
***REMOVED***

    function getNativeFlags (regex) ***REMOVED***
        return (regex.global     ? "g" : "") +
               (regex.ignoreCase ? "i" : "") +
               (regex.multiline  ? "m" : "") +
               (regex.extended   ? "x" : "") + // Proposed for ES4; included in AS3
               (regex.sticky     ? "y" : "");
***REMOVED***

    function indexOf (array, item, from) ***REMOVED***
        if (Array.prototype.indexOf) // Use the native array method if available
            return array.indexOf(item, from);
        for (var i = from || 0; i < array.length; i++) ***REMOVED***
            if (array[i] === item)
                return i;
    ***REMOVED***
        return -1;
***REMOVED***

***REMOVED***);

__ace_shadowed__.define('ace/lib/es5-shim', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***

function Empty() ***REMOVED******REMOVED***

if (!Function.prototype.bind) ***REMOVED***
    Function.prototype.bind = function bind(that) ***REMOVED*** // .length is 1
        var target = this;
        if (typeof target != "function") ***REMOVED***
            throw new TypeError("Function.prototype.bind called on incompatible " + target);
    ***REMOVED***
        var args = slice.call(arguments, 1); // for normal call
        var bound = function () ***REMOVED***

            if (this instanceof bound) ***REMOVED***

                var result = target.apply(
                    this,
                    args.concat(slice.call(arguments))
                );
                if (Object(result) === result) ***REMOVED***
                    return result;
            ***REMOVED***
                return this;

        ***REMOVED*** else ***REMOVED***
                return target.apply(
                    that,
                    args.concat(slice.call(arguments))
                );

        ***REMOVED***

    ***REMOVED***;
        if(target.prototype) ***REMOVED***
            Empty.prototype = target.prototype;
            bound.prototype = new Empty();
            Empty.prototype = null;
    ***REMOVED***
        return bound;
***REMOVED***;
***REMOVED***
var call = Function.prototype.call;
var prototypeOfArray = Array.prototype;
var prototypeOfObject = Object.prototype;
var slice = prototypeOfArray.slice;
var _toString = call.bind(prototypeOfObject.toString);
var owns = call.bind(prototypeOfObject.hasOwnProperty);
var defineGetter;
var defineSetter;
var lookupGetter;
var lookupSetter;
var supportsAccessors;
if ((supportsAccessors = owns(prototypeOfObject, "__defineGetter__"))) ***REMOVED***
    defineGetter = call.bind(prototypeOfObject.__defineGetter__);
    defineSetter = call.bind(prototypeOfObject.__defineSetter__);
    lookupGetter = call.bind(prototypeOfObject.__lookupGetter__);
    lookupSetter = call.bind(prototypeOfObject.__lookupSetter__);
***REMOVED***
if ([1,2].splice(0).length != 2) ***REMOVED***
    if(function() ***REMOVED*** // test IE < 9 to splice bug - see issue #138
        function makeArray(l) ***REMOVED***
            var a = new Array(l+2);
            a[0] = a[1] = 0;
            return a;
    ***REMOVED***
        var array = [], lengthBefore;
        
        array.splice.apply(array, makeArray(20));
        array.splice.apply(array, makeArray(26));

        lengthBefore = array.length; //46
        array.splice(5, 0, "XXX"); // add one element

        lengthBefore + 1 == array.length

        if (lengthBefore + 1 == array.length) ***REMOVED***
            return true;// has right splice implementation without bugs
    ***REMOVED***
***REMOVED***()) ***REMOVED***//IE 6/7
        var array_splice = Array.prototype.splice;
        Array.prototype.splice = function(start, deleteCount) ***REMOVED***
            if (!arguments.length) ***REMOVED***
                return [];
        ***REMOVED*** else ***REMOVED***
                return array_splice.apply(this, [
                    start === void 0 ? 0 : start,
                    deleteCount === void 0 ? (this.length - start) : deleteCount
                ].concat(slice.call(arguments, 2)))
        ***REMOVED***
    ***REMOVED***;
***REMOVED*** else ***REMOVED***//IE8
        Array.prototype.splice = function(pos, removeCount)***REMOVED***
            var length = this.length;
            if (pos > 0) ***REMOVED***
                if (pos > length)
                    pos = length;
        ***REMOVED*** else if (pos == void 0) ***REMOVED***
                pos = 0;
        ***REMOVED*** else if (pos < 0) ***REMOVED***
                pos = Math.max(length + pos, 0);
        ***REMOVED***

            if (!(pos+removeCount < length))
                removeCount = length - pos;

            var removed = this.slice(pos, pos+removeCount);
            var insert = slice.call(arguments, 2);
            var add = insert.length;            
            if (pos === length) ***REMOVED***
                if (add) ***REMOVED***
                    this.push.apply(this, insert);
            ***REMOVED***
        ***REMOVED*** else ***REMOVED***
                var remove = Math.min(removeCount, length - pos);
                var tailOldPos = pos + remove;
                var tailNewPos = tailOldPos + add - remove;
                var tailCount = length - tailOldPos;
                var lengthAfterRemove = length - remove;

                if (tailNewPos < tailOldPos) ***REMOVED*** // case A
                    for (var i = 0; i < tailCount; ++i) ***REMOVED***
                        this[tailNewPos+i] = this[tailOldPos+i];
                ***REMOVED***
            ***REMOVED*** else if (tailNewPos > tailOldPos) ***REMOVED*** // case B
                    for (i = tailCount; i--; ) ***REMOVED***
                        this[tailNewPos+i] = this[tailOldPos+i];
                ***REMOVED***
            ***REMOVED*** // else, add == remove (nothing to do)

                if (add && pos === lengthAfterRemove) ***REMOVED***
                    this.length = lengthAfterRemove; // truncate array
                    this.push.apply(this, insert);
            ***REMOVED*** else ***REMOVED***
                    this.length = lengthAfterRemove + add; // reserves space
                    for (i = 0; i < add; ++i) ***REMOVED***
                        this[pos+i] = insert[i];
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
            return removed;
    ***REMOVED***;
***REMOVED***
***REMOVED***
if (!Array.isArray) ***REMOVED***
    Array.isArray = function isArray(obj) ***REMOVED***
        return _toString(obj) == "[object Array]";
***REMOVED***;
***REMOVED***
var boxedString = Object("a"),
    splitString = boxedString[0] != "a" || !(0 in boxedString);

if (!Array.prototype.forEach) ***REMOVED***
    Array.prototype.forEach = function forEach(fun /*, thisp*/) ***REMOVED***
        var object = toObject(this),
            self = splitString && _toString(this) == "[object String]" ?
                this.split("") :
                object,
            thisp = arguments[1],
            i = -1,
            length = self.length >>> 0;
        if (_toString(fun) != "[object Function]") ***REMOVED***
            throw new TypeError(); // TODO message
    ***REMOVED***

        while (++i < length) ***REMOVED***
            if (i in self) ***REMOVED***
                fun.call(thisp, self[i], i, object);
        ***REMOVED***
    ***REMOVED***
***REMOVED***;
***REMOVED***
if (!Array.prototype.map) ***REMOVED***
    Array.prototype.map = function map(fun /*, thisp*/) ***REMOVED***
        var object = toObject(this),
            self = splitString && _toString(this) == "[object String]" ?
                this.split("") :
                object,
            length = self.length >>> 0,
            result = Array(length),
            thisp = arguments[1];
        if (_toString(fun) != "[object Function]") ***REMOVED***
            throw new TypeError(fun + " is not a function");
    ***REMOVED***

        for (var i = 0; i < length; i++) ***REMOVED***
            if (i in self)
                result[i] = fun.call(thisp, self[i], i, object);
    ***REMOVED***
        return result;
***REMOVED***;
***REMOVED***
if (!Array.prototype.filter) ***REMOVED***
    Array.prototype.filter = function filter(fun /*, thisp */) ***REMOVED***
        var object = toObject(this),
            self = splitString && _toString(this) == "[object String]" ?
                this.split("") :
                    object,
            length = self.length >>> 0,
            result = [],
            value,
            thisp = arguments[1];
        if (_toString(fun) != "[object Function]") ***REMOVED***
            throw new TypeError(fun + " is not a function");
    ***REMOVED***

        for (var i = 0; i < length; i++) ***REMOVED***
            if (i in self) ***REMOVED***
                value = self[i];
                if (fun.call(thisp, value, i, object)) ***REMOVED***
                    result.push(value);
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***
        return result;
***REMOVED***;
***REMOVED***
if (!Array.prototype.every) ***REMOVED***
    Array.prototype.every = function every(fun /*, thisp */) ***REMOVED***
        var object = toObject(this),
            self = splitString && _toString(this) == "[object String]" ?
                this.split("") :
                object,
            length = self.length >>> 0,
            thisp = arguments[1];
        if (_toString(fun) != "[object Function]") ***REMOVED***
            throw new TypeError(fun + " is not a function");
    ***REMOVED***

        for (var i = 0; i < length; i++) ***REMOVED***
            if (i in self && !fun.call(thisp, self[i], i, object)) ***REMOVED***
                return false;
        ***REMOVED***
    ***REMOVED***
        return true;
***REMOVED***;
***REMOVED***
if (!Array.prototype.some) ***REMOVED***
    Array.prototype.some = function some(fun /*, thisp */) ***REMOVED***
        var object = toObject(this),
            self = splitString && _toString(this) == "[object String]" ?
                this.split("") :
                object,
            length = self.length >>> 0,
            thisp = arguments[1];
        if (_toString(fun) != "[object Function]") ***REMOVED***
            throw new TypeError(fun + " is not a function");
    ***REMOVED***

        for (var i = 0; i < length; i++) ***REMOVED***
            if (i in self && fun.call(thisp, self[i], i, object)) ***REMOVED***
                return true;
        ***REMOVED***
    ***REMOVED***
        return false;
***REMOVED***;
***REMOVED***
if (!Array.prototype.reduce) ***REMOVED***
    Array.prototype.reduce = function reduce(fun /*, initial*/) ***REMOVED***
        var object = toObject(this),
            self = splitString && _toString(this) == "[object String]" ?
                this.split("") :
                object,
            length = self.length >>> 0;
        if (_toString(fun) != "[object Function]") ***REMOVED***
            throw new TypeError(fun + " is not a function");
    ***REMOVED***
        if (!length && arguments.length == 1) ***REMOVED***
            throw new TypeError("reduce of empty array with no initial value");
    ***REMOVED***

        var i = 0;
        var result;
        if (arguments.length >= 2) ***REMOVED***
            result = arguments[1];
    ***REMOVED*** else ***REMOVED***
            do ***REMOVED***
                if (i in self) ***REMOVED***
                    result = self[i++];
                    break;
            ***REMOVED***
                if (++i >= length) ***REMOVED***
                    throw new TypeError("reduce of empty array with no initial value");
            ***REMOVED***
        ***REMOVED*** while (true);
    ***REMOVED***

        for (; i < length; i++) ***REMOVED***
            if (i in self) ***REMOVED***
                result = fun.call(void 0, result, self[i], i, object);
        ***REMOVED***
    ***REMOVED***

        return result;
***REMOVED***;
***REMOVED***
if (!Array.prototype.reduceRight) ***REMOVED***
    Array.prototype.reduceRight = function reduceRight(fun /*, initial*/) ***REMOVED***
        var object = toObject(this),
            self = splitString && _toString(this) == "[object String]" ?
                this.split("") :
                object,
            length = self.length >>> 0;
        if (_toString(fun) != "[object Function]") ***REMOVED***
            throw new TypeError(fun + " is not a function");
    ***REMOVED***
        if (!length && arguments.length == 1) ***REMOVED***
            throw new TypeError("reduceRight of empty array with no initial value");
    ***REMOVED***

        var result, i = length - 1;
        if (arguments.length >= 2) ***REMOVED***
            result = arguments[1];
    ***REMOVED*** else ***REMOVED***
            do ***REMOVED***
                if (i in self) ***REMOVED***
                    result = self[i--];
                    break;
            ***REMOVED***
                if (--i < 0) ***REMOVED***
                    throw new TypeError("reduceRight of empty array with no initial value");
            ***REMOVED***
        ***REMOVED*** while (true);
    ***REMOVED***

        do ***REMOVED***
            if (i in this) ***REMOVED***
                result = fun.call(void 0, result, self[i], i, object);
        ***REMOVED***
    ***REMOVED*** while (i--);

        return result;
***REMOVED***;
***REMOVED***
if (!Array.prototype.indexOf || ([0, 1].indexOf(1, 2) != -1)) ***REMOVED***
    Array.prototype.indexOf = function indexOf(sought /*, fromIndex */ ) ***REMOVED***
        var self = splitString && _toString(this) == "[object String]" ?
                this.split("") :
                toObject(this),
            length = self.length >>> 0;

        if (!length) ***REMOVED***
            return -1;
    ***REMOVED***

        var i = 0;
        if (arguments.length > 1) ***REMOVED***
            i = toInteger(arguments[1]);
    ***REMOVED***
        i = i >= 0 ? i : Math.max(0, length + i);
        for (; i < length; i++) ***REMOVED***
            if (i in self && self[i] === sought) ***REMOVED***
                return i;
        ***REMOVED***
    ***REMOVED***
        return -1;
***REMOVED***;
***REMOVED***
if (!Array.prototype.lastIndexOf || ([0, 1].lastIndexOf(0, -3) != -1)) ***REMOVED***
    Array.prototype.lastIndexOf = function lastIndexOf(sought /*, fromIndex */) ***REMOVED***
        var self = splitString && _toString(this) == "[object String]" ?
                this.split("") :
                toObject(this),
            length = self.length >>> 0;

        if (!length) ***REMOVED***
            return -1;
    ***REMOVED***
        var i = length - 1;
        if (arguments.length > 1) ***REMOVED***
            i = Math.min(i, toInteger(arguments[1]));
    ***REMOVED***
        i = i >= 0 ? i : length - Math.abs(i);
        for (; i >= 0; i--) ***REMOVED***
            if (i in self && sought === self[i]) ***REMOVED***
                return i;
        ***REMOVED***
    ***REMOVED***
        return -1;
***REMOVED***;
***REMOVED***
if (!Object.getPrototypeOf) ***REMOVED***
    Object.getPrototypeOf = function getPrototypeOf(object) ***REMOVED***
        return object.__proto__ || (
            object.constructor ?
            object.constructor.prototype :
            prototypeOfObject
        );
***REMOVED***;
***REMOVED***
if (!Object.getOwnPropertyDescriptor) ***REMOVED***
    var ERR_NON_OBJECT = "Object.getOwnPropertyDescriptor called on a " +
                         "non-object: ";
    Object.getOwnPropertyDescriptor = function getOwnPropertyDescriptor(object, property) ***REMOVED***
        if ((typeof object != "object" && typeof object != "function") || object === null)
            throw new TypeError(ERR_NON_OBJECT + object);
        if (!owns(object, property))
            return;

        var descriptor, getter, setter;
        descriptor =  ***REMOVED*** enumerable: true, configurable: true ***REMOVED***;
        if (supportsAccessors) ***REMOVED***
            var prototype = object.__proto__;
            object.__proto__ = prototypeOfObject;

            var getter = lookupGetter(object, property);
            var setter = lookupSetter(object, property);
            object.__proto__ = prototype;

            if (getter || setter) ***REMOVED***
                if (getter) descriptor.get = getter;
                if (setter) descriptor.set = setter;
                return descriptor;
        ***REMOVED***
    ***REMOVED***
        descriptor.value = object[property];
        return descriptor;
***REMOVED***;
***REMOVED***
if (!Object.getOwnPropertyNames) ***REMOVED***
    Object.getOwnPropertyNames = function getOwnPropertyNames(object) ***REMOVED***
        return Object.keys(object);
***REMOVED***;
***REMOVED***
if (!Object.create) ***REMOVED***
    var createEmpty;
    if (Object.prototype.__proto__ === null) ***REMOVED***
        createEmpty = function () ***REMOVED***
            return ***REMOVED*** "__proto__": null ***REMOVED***;
    ***REMOVED***;
***REMOVED*** else ***REMOVED***
        createEmpty = function () ***REMOVED***
            var empty = ***REMOVED******REMOVED***;
            for (var i in empty)
                empty[i] = null;
            empty.constructor =
            empty.hasOwnProperty =
            empty.propertyIsEnumerable =
            empty.isPrototypeOf =
            empty.toLocaleString =
            empty.toString =
            empty.valueOf =
            empty.__proto__ = null;
            return empty;
    ***REMOVED***
***REMOVED***

    Object.create = function create(prototype, properties) ***REMOVED***
        var object;
        if (prototype === null) ***REMOVED***
            object = createEmpty();
    ***REMOVED*** else ***REMOVED***
            if (typeof prototype != "object")
                throw new TypeError("typeof prototype["+(typeof prototype)+"] != 'object'");
            var Type = function () ***REMOVED******REMOVED***;
            Type.prototype = prototype;
            object = new Type();
            object.__proto__ = prototype;
    ***REMOVED***
        if (properties !== void 0)
            Object.defineProperties(object, properties);
        return object;
***REMOVED***;
***REMOVED***

function doesDefinePropertyWork(object) ***REMOVED***
    try ***REMOVED***
        Object.defineProperty(object, "sentinel", ***REMOVED******REMOVED***);
        return "sentinel" in object;
***REMOVED*** catch (exception) ***REMOVED***
***REMOVED***
***REMOVED***
if (Object.defineProperty) ***REMOVED***
    var definePropertyWorksOnObject = doesDefinePropertyWork(***REMOVED******REMOVED***);
    var definePropertyWorksOnDom = typeof document == "undefined" ||
        doesDefinePropertyWork(document.createElement("div"));
    if (!definePropertyWorksOnObject || !definePropertyWorksOnDom) ***REMOVED***
        var definePropertyFallback = Object.defineProperty;
***REMOVED***
***REMOVED***

if (!Object.defineProperty || definePropertyFallback) ***REMOVED***
    var ERR_NON_OBJECT_DESCRIPTOR = "Property description must be an object: ";
    var ERR_NON_OBJECT_TARGET = "Object.defineProperty called on non-object: "
    var ERR_ACCESSORS_NOT_SUPPORTED = "getters & setters can not be defined " +
                                      "on this javascript engine";

    Object.defineProperty = function defineProperty(object, property, descriptor) ***REMOVED***
        if ((typeof object != "object" && typeof object != "function") || object === null)
            throw new TypeError(ERR_NON_OBJECT_TARGET + object);
        if ((typeof descriptor != "object" && typeof descriptor != "function") || descriptor === null)
            throw new TypeError(ERR_NON_OBJECT_DESCRIPTOR + descriptor);
        if (definePropertyFallback) ***REMOVED***
            try ***REMOVED***
                return definePropertyFallback.call(Object, object, property, descriptor);
        ***REMOVED*** catch (exception) ***REMOVED***
        ***REMOVED***
    ***REMOVED***
        if (owns(descriptor, "value")) ***REMOVED***

            if (supportsAccessors && (lookupGetter(object, property) ||
                                      lookupSetter(object, property)))
            ***REMOVED***
                var prototype = object.__proto__;
                object.__proto__ = prototypeOfObject;
                delete object[property];
                object[property] = descriptor.value;
                object.__proto__ = prototype;
        ***REMOVED*** else ***REMOVED***
                object[property] = descriptor.value;
        ***REMOVED***
    ***REMOVED*** else ***REMOVED***
            if (!supportsAccessors)
                throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
            if (owns(descriptor, "get"))
                defineGetter(object, property, descriptor.get);
            if (owns(descriptor, "set"))
                defineSetter(object, property, descriptor.set);
    ***REMOVED***

        return object;
***REMOVED***;
***REMOVED***
if (!Object.defineProperties) ***REMOVED***
    Object.defineProperties = function defineProperties(object, properties) ***REMOVED***
        for (var property in properties) ***REMOVED***
            if (owns(properties, property))
                Object.defineProperty(object, property, properties[property]);
    ***REMOVED***
        return object;
***REMOVED***;
***REMOVED***
if (!Object.seal) ***REMOVED***
    Object.seal = function seal(object) ***REMOVED***
        return object;
***REMOVED***;
***REMOVED***
if (!Object.freeze) ***REMOVED***
    Object.freeze = function freeze(object) ***REMOVED***
        return object;
***REMOVED***;
***REMOVED***
try ***REMOVED***
    Object.freeze(function () ***REMOVED******REMOVED***);
***REMOVED*** catch (exception) ***REMOVED***
    Object.freeze = (function freeze(freezeObject) ***REMOVED***
        return function freeze(object) ***REMOVED***
            if (typeof object == "function") ***REMOVED***
                return object;
        ***REMOVED*** else ***REMOVED***
                return freezeObject(object);
        ***REMOVED***
    ***REMOVED***;
***REMOVED***)(Object.freeze);
***REMOVED***
if (!Object.preventExtensions) ***REMOVED***
    Object.preventExtensions = function preventExtensions(object) ***REMOVED***
        return object;
***REMOVED***;
***REMOVED***
if (!Object.isSealed) ***REMOVED***
    Object.isSealed = function isSealed(object) ***REMOVED***
        return false;
***REMOVED***;
***REMOVED***
if (!Object.isFrozen) ***REMOVED***
    Object.isFrozen = function isFrozen(object) ***REMOVED***
        return false;
***REMOVED***;
***REMOVED***
if (!Object.isExtensible) ***REMOVED***
    Object.isExtensible = function isExtensible(object) ***REMOVED***
        if (Object(object) === object) ***REMOVED***
            throw new TypeError(); // TODO message
    ***REMOVED***
        var name = '';
        while (owns(object, name)) ***REMOVED***
            name += '?';
    ***REMOVED***
        object[name] = true;
        var returnValue = owns(object, name);
        delete object[name];
        return returnValue;
***REMOVED***;
***REMOVED***
if (!Object.keys) ***REMOVED***
    var hasDontEnumBug = true,
        dontEnums = [
            "toString",
            "toLocaleString",
            "valueOf",
            "hasOwnProperty",
            "isPrototypeOf",
            "propertyIsEnumerable",
            "constructor"
        ],
        dontEnumsLength = dontEnums.length;

    for (var key in ***REMOVED***"toString": null***REMOVED***) ***REMOVED***
        hasDontEnumBug = false;
***REMOVED***

    Object.keys = function keys(object) ***REMOVED***

        if (
            (typeof object != "object" && typeof object != "function") ||
            object === null
        ) ***REMOVED***
            throw new TypeError("Object.keys called on a non-object");
    ***REMOVED***

        var keys = [];
        for (var name in object) ***REMOVED***
            if (owns(object, name)) ***REMOVED***
                keys.push(name);
        ***REMOVED***
    ***REMOVED***

        if (hasDontEnumBug) ***REMOVED***
            for (var i = 0, ii = dontEnumsLength; i < ii; i++) ***REMOVED***
                var dontEnum = dontEnums[i];
                if (owns(object, dontEnum)) ***REMOVED***
                    keys.push(dontEnum);
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***
        return keys;
***REMOVED***;

***REMOVED***
if (!Date.now) ***REMOVED***
    Date.now = function now() ***REMOVED***
        return new Date().getTime();
***REMOVED***;
***REMOVED***
var ws = "\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003" +
    "\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028" +
    "\u2029\uFEFF";
if (!String.prototype.trim || ws.trim()) ***REMOVED***
    ws = "[" + ws + "]";
    var trimBeginRegexp = new RegExp("^" + ws + ws + "*"),
        trimEndRegexp = new RegExp(ws + ws + "*$");
    String.prototype.trim = function trim() ***REMOVED***
        return String(this).replace(trimBeginRegexp, "").replace(trimEndRegexp, "");
***REMOVED***;
***REMOVED***

function toInteger(n) ***REMOVED***
    n = +n;
    if (n !== n) ***REMOVED*** // isNaN
        n = 0;
***REMOVED*** else if (n !== 0 && n !== (1/0) && n !== -(1/0)) ***REMOVED***
        n = (n > 0 || -1) * Math.floor(Math.abs(n));
***REMOVED***
    return n;
***REMOVED***

function isPrimitive(input) ***REMOVED***
    var type = typeof input;
    return (
        input === null ||
        type === "undefined" ||
        type === "boolean" ||
        type === "number" ||
        type === "string"
    );
***REMOVED***

function toPrimitive(input) ***REMOVED***
    var val, valueOf, toString;
    if (isPrimitive(input)) ***REMOVED***
        return input;
***REMOVED***
    valueOf = input.valueOf;
    if (typeof valueOf === "function") ***REMOVED***
        val = valueOf.call(input);
        if (isPrimitive(val)) ***REMOVED***
            return val;
    ***REMOVED***
***REMOVED***
    toString = input.toString;
    if (typeof toString === "function") ***REMOVED***
        val = toString.call(input);
        if (isPrimitive(val)) ***REMOVED***
            return val;
    ***REMOVED***
***REMOVED***
    throw new TypeError();
***REMOVED***
var toObject = function (o) ***REMOVED***
    if (o == null) ***REMOVED*** // this matches both null and undefined
        throw new TypeError("can't convert "+o+" to object");
***REMOVED***
    return Object(o);
***REMOVED***;

***REMOVED***);

__ace_shadowed__.define('ace/editor', ['require', 'exports', 'module' , 'ace/lib/fixoldbrowsers', 'ace/lib/oop', 'ace/lib/dom', 'ace/lib/lang', 'ace/lib/useragent', 'ace/keyboard/textinput', 'ace/mouse/mouse_handler', 'ace/mouse/fold_handler', 'ace/keyboard/keybinding', 'ace/edit_session', 'ace/search', 'ace/range', 'ace/lib/event_emitter', 'ace/commands/command_manager', 'ace/commands/default_commands', 'ace/config'], function(require, exports, module) ***REMOVED***


require("./lib/fixoldbrowsers");

var oop = require("./lib/oop");
var dom = require("./lib/dom");
var lang = require("./lib/lang");
var useragent = require("./lib/useragent");
var TextInput = require("./keyboard/textinput").TextInput;
var MouseHandler = require("./mouse/mouse_handler").MouseHandler;
var FoldHandler = require("./mouse/fold_handler").FoldHandler;
var KeyBinding = require("./keyboard/keybinding").KeyBinding;
var EditSession = require("./edit_session").EditSession;
var Search = require("./search").Search;
var Range = require("./range").Range;
var EventEmitter = require("./lib/event_emitter").EventEmitter;
var CommandManager = require("./commands/command_manager").CommandManager;
var defaultCommands = require("./commands/default_commands").commands;
var config = require("./config");
var Editor = function(renderer, session) ***REMOVED***
    var container = renderer.getContainerElement();
    this.container = container;
    this.renderer = renderer;

    this.commands = new CommandManager(useragent.isMac ? "mac" : "win", defaultCommands);
    this.textInput  = new TextInput(renderer.getTextAreaContainer(), this);
    this.renderer.textarea = this.textInput.getElement();
    this.keyBinding = new KeyBinding(this);
    this.$mouseHandler = new MouseHandler(this);
    new FoldHandler(this);

    this.$blockScrolling = 0;
    this.$search = new Search().set(***REMOVED***
        wrap: true
***REMOVED***);

    this.$historyTracker = this.$historyTracker.bind(this);
    this.commands.on("exec", this.$historyTracker);

    this.$initOperationListeners();
    
    this._$emitInputEvent = lang.delayedCall(function() ***REMOVED***
        this._signal("input", ***REMOVED******REMOVED***);
        this.session.bgTokenizer && this.session.bgTokenizer.scheduleStart();
***REMOVED***.bind(this));
    
    this.on("change", function(_, _self) ***REMOVED***
        _self._$emitInputEvent.schedule(31);
***REMOVED***);

    this.setSession(session || new EditSession(""));
    config.resetOptions(this);
    config._signal("editor", this);
***REMOVED***;

(function()***REMOVED***

    oop.implement(this, EventEmitter);

    this.$initOperationListeners = function() ***REMOVED***
        function last(a) ***REMOVED***return a[a.length - 1]***REMOVED***

        this.selections = [];
        this.commands.on("exec", function(e) ***REMOVED***
            this.startOperation(e);

            var command = e.command;
            if (command.aceCommandGroup == "fileJump") ***REMOVED***
                var prev = this.prevOp;
                if (!prev || prev.command.aceCommandGroup != "fileJump") ***REMOVED***
                    this.lastFileJumpPos = last(this.selections);
            ***REMOVED***
        ***REMOVED*** else ***REMOVED***
                this.lastFileJumpPos = null;
        ***REMOVED***
    ***REMOVED***.bind(this), true);

        this.commands.on("afterExec", function(e) ***REMOVED***
            var command = e.command;

            if (command.aceCommandGroup == "fileJump") ***REMOVED***
                if (this.lastFileJumpPos && !this.curOp.selectionChanged) ***REMOVED***
                    this.selection.fromJSON(this.lastFileJumpPos);
            ***REMOVED***
        ***REMOVED***
            this.endOperation(e);
    ***REMOVED***.bind(this), true);

        this.$opResetTimer = lang.delayedCall(this.endOperation.bind(this));

        this.on("change", function() ***REMOVED***
            this.curOp || this.startOperation();
            this.curOp.docChanged = true;
    ***REMOVED***.bind(this), true);

        this.on("changeSelection", function() ***REMOVED***
            this.curOp || this.startOperation();
            this.curOp.selectionChanged = true;
    ***REMOVED***.bind(this), true);
***REMOVED***;

    this.curOp = null;
    this.prevOp = ***REMOVED******REMOVED***;
    this.startOperation = function(commadEvent) ***REMOVED***
        if (this.curOp) ***REMOVED***
            if (!commadEvent || this.curOp.command)
                return;
            this.prevOp = this.curOp;
    ***REMOVED***
        if (!commadEvent) ***REMOVED***
            this.previousCommand = null;
            commadEvent = ***REMOVED******REMOVED***;
    ***REMOVED***

        this.$opResetTimer.schedule();
        this.curOp = ***REMOVED***
            command: commadEvent.command || ***REMOVED******REMOVED***,
            args: commadEvent.args,
            scrollTop: this.renderer.scrollTop
    ***REMOVED***;
        
        var command = this.curOp.command;
        if (command && command.scrollIntoView)
            this.$blockScrolling++;

        this.selections.push(this.selection.toJSON());
***REMOVED***;

    this.endOperation = function() ***REMOVED***
        if (this.curOp) ***REMOVED***
            var command = this.curOp.command;
            if (command && command.scrollIntoView) ***REMOVED***
                this.$blockScrolling--;
                switch (command.scrollIntoView) ***REMOVED***
                    case "center":
                        this.renderer.scrollCursorIntoView(null, 0.5);
                        break;
                    case "animate":
                    case "cursor":
                        this.renderer.scrollCursorIntoView();
                        break;
                    case "selectionPart":
                        var range = this.selection.getRange();
                        var config = this.renderer.layerConfig;
                        if (range.start.row >= config.lastRow || range.end.row <= config.firstRow) ***REMOVED***
                            this.renderer.scrollSelectionIntoView(this.selection.anchor, this.selection.lead);
                    ***REMOVED***
                        break;
                    default:
                        break;
            ***REMOVED***
                if (command.scrollIntoView == "animate")
                    this.renderer.animateScrolling(this.curOp.scrollTop);
        ***REMOVED***
            
            this.prevOp = this.curOp;
            this.curOp = null;
    ***REMOVED***
***REMOVED***;

    this.$historyTracker = function(e) ***REMOVED***
        if (!this.$mergeUndoDeltas)
            return;


        var prev = this.prevOp;
        var mergeableCommands = ["backspace", "del", "insertstring"];
        var shouldMerge = prev.command && (e.command.name == prev.command.name);
        if (e.command.name == "insertstring") ***REMOVED***
            var text = e.args;
            if (this.mergeNextCommand === undefined)
                this.mergeNextCommand = true;

            shouldMerge = shouldMerge
                && this.mergeNextCommand // previous command allows to coalesce with
                && (!/\s/.test(text) || /\s/.test(prev.args)); // previous insertion was of same type

            this.mergeNextCommand = true;
    ***REMOVED*** else ***REMOVED***
            shouldMerge = shouldMerge
                && mergeableCommands.indexOf(e.command.name) !== -1; // the command is mergeable
    ***REMOVED***

        if (
            this.$mergeUndoDeltas != "always"
            && Date.now() - this.sequenceStartTime > 2000
        ) ***REMOVED***
            shouldMerge = false; // the sequence is too long
    ***REMOVED***

        if (shouldMerge)
            this.session.mergeUndoDeltas = true;
        else if (mergeableCommands.indexOf(e.command.name) !== -1)
            this.sequenceStartTime = Date.now();
***REMOVED***;
    this.setKeyboardHandler = function(keyboardHandler) ***REMOVED***
        if (!keyboardHandler) ***REMOVED***
            this.keyBinding.setKeyboardHandler(null);
    ***REMOVED*** else if (typeof keyboardHandler === "string") ***REMOVED***
            this.$keybindingId = keyboardHandler;
            var _self = this;
            config.loadModule(["keybinding", keyboardHandler], function(module) ***REMOVED***
                if (_self.$keybindingId == keyboardHandler)
                    _self.keyBinding.setKeyboardHandler(module && module.handler);
        ***REMOVED***);
    ***REMOVED*** else ***REMOVED***
            this.$keybindingId = null;
            this.keyBinding.setKeyboardHandler(keyboardHandler);
    ***REMOVED***
***REMOVED***;
    this.getKeyboardHandler = function() ***REMOVED***
        return this.keyBinding.getKeyboardHandler();
***REMOVED***;
    this.setSession = function(session) ***REMOVED***
        if (this.session == session)
            return;

        var oldSession = this.session;
        if (oldSession) ***REMOVED***
            this.session.removeEventListener("change", this.$onDocumentChange);
            this.session.removeEventListener("changeMode", this.$onChangeMode);
            this.session.removeEventListener("tokenizerUpdate", this.$onTokenizerUpdate);
            this.session.removeEventListener("changeTabSize", this.$onChangeTabSize);
            this.session.removeEventListener("changeWrapLimit", this.$onChangeWrapLimit);
            this.session.removeEventListener("changeWrapMode", this.$onChangeWrapMode);
            this.session.removeEventListener("onChangeFold", this.$onChangeFold);
            this.session.removeEventListener("changeFrontMarker", this.$onChangeFrontMarker);
            this.session.removeEventListener("changeBackMarker", this.$onChangeBackMarker);
            this.session.removeEventListener("changeBreakpoint", this.$onChangeBreakpoint);
            this.session.removeEventListener("changeAnnotation", this.$onChangeAnnotation);
            this.session.removeEventListener("changeOverwrite", this.$onCursorChange);
            this.session.removeEventListener("changeScrollTop", this.$onScrollTopChange);
            this.session.removeEventListener("changeScrollLeft", this.$onScrollLeftChange);

            var selection = this.session.getSelection();
            selection.removeEventListener("changeCursor", this.$onCursorChange);
            selection.removeEventListener("changeSelection", this.$onSelectionChange);
    ***REMOVED***

        this.session = session;
        if (session) ***REMOVED***
            this.$onDocumentChange = this.onDocumentChange.bind(this);
            session.addEventListener("change", this.$onDocumentChange);
            this.renderer.setSession(session);
    
            this.$onChangeMode = this.onChangeMode.bind(this);
            session.addEventListener("changeMode", this.$onChangeMode);
    
            this.$onTokenizerUpdate = this.onTokenizerUpdate.bind(this);
            session.addEventListener("tokenizerUpdate", this.$onTokenizerUpdate);
    
            this.$onChangeTabSize = this.renderer.onChangeTabSize.bind(this.renderer);
            session.addEventListener("changeTabSize", this.$onChangeTabSize);
    
            this.$onChangeWrapLimit = this.onChangeWrapLimit.bind(this);
            session.addEventListener("changeWrapLimit", this.$onChangeWrapLimit);
    
            this.$onChangeWrapMode = this.onChangeWrapMode.bind(this);
            session.addEventListener("changeWrapMode", this.$onChangeWrapMode);
    
            this.$onChangeFold = this.onChangeFold.bind(this);
            session.addEventListener("changeFold", this.$onChangeFold);
    
            this.$onChangeFrontMarker = this.onChangeFrontMarker.bind(this);
            this.session.addEventListener("changeFrontMarker", this.$onChangeFrontMarker);
    
            this.$onChangeBackMarker = this.onChangeBackMarker.bind(this);
            this.session.addEventListener("changeBackMarker", this.$onChangeBackMarker);
    
            this.$onChangeBreakpoint = this.onChangeBreakpoint.bind(this);
            this.session.addEventListener("changeBreakpoint", this.$onChangeBreakpoint);
    
            this.$onChangeAnnotation = this.onChangeAnnotation.bind(this);
            this.session.addEventListener("changeAnnotation", this.$onChangeAnnotation);
    
            this.$onCursorChange = this.onCursorChange.bind(this);
            this.session.addEventListener("changeOverwrite", this.$onCursorChange);
    
            this.$onScrollTopChange = this.onScrollTopChange.bind(this);
            this.session.addEventListener("changeScrollTop", this.$onScrollTopChange);
    
            this.$onScrollLeftChange = this.onScrollLeftChange.bind(this);
            this.session.addEventListener("changeScrollLeft", this.$onScrollLeftChange);
    
            this.selection = session.getSelection();
            this.selection.addEventListener("changeCursor", this.$onCursorChange);
    
            this.$onSelectionChange = this.onSelectionChange.bind(this);
            this.selection.addEventListener("changeSelection", this.$onSelectionChange);
    
            this.onChangeMode();
    
            this.$blockScrolling += 1;
            this.onCursorChange();
            this.$blockScrolling -= 1;
    
            this.onScrollTopChange();
            this.onScrollLeftChange();
            this.onSelectionChange();
            this.onChangeFrontMarker();
            this.onChangeBackMarker();
            this.onChangeBreakpoint();
            this.onChangeAnnotation();
            this.session.getUseWrapMode() && this.renderer.adjustWrapLimit();
            this.renderer.updateFull();
    ***REMOVED***

        this._signal("changeSession", ***REMOVED***
            session: session,
            oldSession: oldSession
    ***REMOVED***);
        
        oldSession && oldSession._signal("changeEditor", ***REMOVED***oldEditor: this***REMOVED***);
        session && session._signal("changeEditor", ***REMOVED***editor: this***REMOVED***);
***REMOVED***;
    this.getSession = function() ***REMOVED***
        return this.session;
***REMOVED***;
    this.setValue = function(val, cursorPos) ***REMOVED***
        this.session.doc.setValue(val);

        if (!cursorPos)
            this.selectAll();
        else if (cursorPos == 1)
            this.navigateFileEnd();
        else if (cursorPos == -1)
            this.navigateFileStart();

        return val;
***REMOVED***;
    this.getValue = function() ***REMOVED***
        return this.session.getValue();
***REMOVED***;
    this.getSelection = function() ***REMOVED***
        return this.selection;
***REMOVED***;
    this.resize = function(force) ***REMOVED***
        this.renderer.onResize(force);
***REMOVED***;
    this.setTheme = function(theme, cb) ***REMOVED***
        this.renderer.setTheme(theme, cb);
***REMOVED***;
    this.getTheme = function() ***REMOVED***
        return this.renderer.getTheme();
***REMOVED***;
    this.setStyle = function(style) ***REMOVED***
        this.renderer.setStyle(style);
***REMOVED***;
    this.unsetStyle = function(style) ***REMOVED***
        this.renderer.unsetStyle(style);
***REMOVED***;
    this.getFontSize = function () ***REMOVED***
        return this.getOption("fontSize") ||
           dom.computedStyle(this.container, "fontSize");
***REMOVED***;
    this.setFontSize = function(size) ***REMOVED***
        this.setOption("fontSize", size);
***REMOVED***;

    this.$highlightBrackets = function() ***REMOVED***
        if (this.session.$bracketHighlight) ***REMOVED***
            this.session.removeMarker(this.session.$bracketHighlight);
            this.session.$bracketHighlight = null;
    ***REMOVED***

        if (this.$highlightPending) ***REMOVED***
            return;
    ***REMOVED***
        var self = this;
        this.$highlightPending = true;
        setTimeout(function() ***REMOVED***
            self.$highlightPending = false;

            var pos = self.session.findMatchingBracket(self.getCursorPosition());
            if (pos) ***REMOVED***
                var range = new Range(pos.row, pos.column, pos.row, pos.column+1);
        ***REMOVED*** else if (self.session.$mode.getMatching) ***REMOVED***
                var range = self.session.$mode.getMatching(self.session);
        ***REMOVED***
            if (range)
                self.session.$bracketHighlight = self.session.addMarker(range, "ace_bracket", "text");
    ***REMOVED*** 50);
***REMOVED***;
    this.focus = function() ***REMOVED***
        var _self = this;
        setTimeout(function() ***REMOVED***
            _self.textInput.focus();
    ***REMOVED***);
        this.textInput.focus();
***REMOVED***;
    this.isFocused = function() ***REMOVED***
        return this.textInput.isFocused();
***REMOVED***;
    this.blur = function() ***REMOVED***
        this.textInput.blur();
***REMOVED***;
    this.onFocus = function() ***REMOVED***
        if (this.$isFocused)
            return;
        this.$isFocused = true;
        this.renderer.showCursor();
        this.renderer.visualizeFocus();
        this._emit("focus");
***REMOVED***;
    this.onBlur = function() ***REMOVED***
        if (!this.$isFocused)
            return;
        this.$isFocused = false;
        this.renderer.hideCursor();
        this.renderer.visualizeBlur();
        this._emit("blur");
***REMOVED***;

    this.$cursorChange = function() ***REMOVED***
        this.renderer.updateCursor();
***REMOVED***;
    this.onDocumentChange = function(e) ***REMOVED***
        var delta = e.data;
        var range = delta.range;
        var lastRow;

        if (range.start.row == range.end.row && delta.action != "insertLines" && delta.action != "removeLines")
            lastRow = range.end.row;
        else
            lastRow = Infinity;
        this.renderer.updateLines(range.start.row, lastRow);

        this._signal("change", e);
        this.$cursorChange();
***REMOVED***;

    this.onTokenizerUpdate = function(e) ***REMOVED***
        var rows = e.data;
        this.renderer.updateLines(rows.first, rows.last);
***REMOVED***;


    this.onScrollTopChange = function() ***REMOVED***
        this.renderer.scrollToY(this.session.getScrollTop());
***REMOVED***;

    this.onScrollLeftChange = function() ***REMOVED***
        this.renderer.scrollToX(this.session.getScrollLeft());
***REMOVED***;
    this.onCursorChange = function() ***REMOVED***
        this.$cursorChange();

        if (!this.$blockScrolling) ***REMOVED***
            this.renderer.scrollCursorIntoView();
    ***REMOVED***

        this.$highlightBrackets();
        this.$updateHighlightActiveLine();
        this._signal("changeSelection");
***REMOVED***;

    this.$updateHighlightActiveLine = function() ***REMOVED***
        var session = this.getSession();

        var highlight;
        if (this.$highlightActiveLine) ***REMOVED***
            if ((this.$selectionStyle != "line" || !this.selection.isMultiLine()))
                highlight = this.getCursorPosition();
            if (this.renderer.$maxLines && this.session.getLength() === 1 && !(this.renderer.$minLines > 1))
                highlight = false;
    ***REMOVED***

        if (session.$highlightLineMarker && !highlight) ***REMOVED***
            session.removeMarker(session.$highlightLineMarker.id);
            session.$highlightLineMarker = null;
    ***REMOVED*** else if (!session.$highlightLineMarker && highlight) ***REMOVED***
            var range = new Range(highlight.row, highlight.column, highlight.row, Infinity);
            range.id = session.addMarker(range, "ace_active-line", "screenLine");
            session.$highlightLineMarker = range;
    ***REMOVED*** else if (highlight) ***REMOVED***
            session.$highlightLineMarker.start.row = highlight.row;
            session.$highlightLineMarker.end.row = highlight.row;
            session.$highlightLineMarker.start.column = highlight.column;
            session._signal("changeBackMarker");
    ***REMOVED***
***REMOVED***;

    this.onSelectionChange = function(e) ***REMOVED***
        var session = this.session;

        if (session.$selectionMarker) ***REMOVED***
            session.removeMarker(session.$selectionMarker);
    ***REMOVED***
        session.$selectionMarker = null;

        if (!this.selection.isEmpty()) ***REMOVED***
            var range = this.selection.getRange();
            var style = this.getSelectionStyle();
            session.$selectionMarker = session.addMarker(range, "ace_selection", style);
    ***REMOVED*** else ***REMOVED***
            this.$updateHighlightActiveLine();
    ***REMOVED***

        var re = this.$highlightSelectedWord && this.$getSelectionHighLightRegexp();
        this.session.highlight(re);

        this._signal("changeSelection");
***REMOVED***;

    this.$getSelectionHighLightRegexp = function() ***REMOVED***
        var session = this.session;

        var selection = this.getSelectionRange();
        if (selection.isEmpty() || selection.isMultiLine())
            return;

        var startOuter = selection.start.column - 1;
        var endOuter = selection.end.column + 1;
        var line = session.getLine(selection.start.row);
        var lineCols = line.length;
        var needle = line.substring(Math.max(startOuter, 0),
                                    Math.min(endOuter, lineCols));
        if ((startOuter >= 0 && /^[\w\d]/.test(needle)) ||
            (endOuter <= lineCols && /[\w\d]$/.test(needle)))
            return;

        needle = line.substring(selection.start.column, selection.end.column);
        if (!/^[\w\d]+$/.test(needle))
            return;

        var re = this.$search.$assembleRegExp(***REMOVED***
            wholeWord: true,
            caseSensitive: true,
            needle: needle
    ***REMOVED***);

        return re;
***REMOVED***;


    this.onChangeFrontMarker = function() ***REMOVED***
        this.renderer.updateFrontMarkers();
***REMOVED***;

    this.onChangeBackMarker = function() ***REMOVED***
        this.renderer.updateBackMarkers();
***REMOVED***;


    this.onChangeBreakpoint = function() ***REMOVED***
        this.renderer.updateBreakpoints();
***REMOVED***;

    this.onChangeAnnotation = function() ***REMOVED***
        this.renderer.setAnnotations(this.session.getAnnotations());
***REMOVED***;


    this.onChangeMode = function(e) ***REMOVED***
        this.renderer.updateText();
        this._emit("changeMode", e);
***REMOVED***;


    this.onChangeWrapLimit = function() ***REMOVED***
        this.renderer.updateFull();
***REMOVED***;

    this.onChangeWrapMode = function() ***REMOVED***
        this.renderer.onResize(true);
***REMOVED***;


    this.onChangeFold = function() ***REMOVED***
        this.$updateHighlightActiveLine();
        this.renderer.updateFull();
***REMOVED***;
    this.getSelectedText = function() ***REMOVED***
        return this.session.getTextRange(this.getSelectionRange());
***REMOVED***;
    this.getCopyText = function() ***REMOVED***
        var text = this.getSelectedText();
        this._signal("copy", text);
        return text;
***REMOVED***;
    this.onCopy = function() ***REMOVED***
        this.commands.exec("copy", this);
***REMOVED***;
    this.onCut = function() ***REMOVED***
        this.commands.exec("cut", this);
***REMOVED***;
    this.onPaste = function(text) ***REMOVED***
        if (this.$readOnly)
            return;
        var e = ***REMOVED***text: text***REMOVED***;
        this._signal("paste", e);
        this.insert(e.text, true);
***REMOVED***;


    this.execCommand = function(command, args) ***REMOVED***
        this.commands.exec(command, this, args);
***REMOVED***;
    this.insert = function(text, pasted) ***REMOVED***
        var session = this.session;
        var mode = session.getMode();
        var cursor = this.getCursorPosition();

        if (this.getBehavioursEnabled() && !pasted) ***REMOVED***
            var transform = mode.transformAction(session.getState(cursor.row), 'insertion', this, session, text);
            if (transform) ***REMOVED***
                if (text !== transform.text) ***REMOVED***
                    this.session.mergeUndoDeltas = false;
                    this.$mergeNextCommand = false;
            ***REMOVED***
                text = transform.text;

        ***REMOVED***
    ***REMOVED***
        
        if (text == "\t")
            text = this.session.getTabString();
        if (!this.selection.isEmpty()) ***REMOVED***
            var range = this.getSelectionRange();
            cursor = this.session.remove(range);
            this.clearSelection();
    ***REMOVED***
        else if (this.session.getOverwrite()) ***REMOVED***
            var range = new Range.fromPoints(cursor, cursor);
            range.end.column += text.length;
            this.session.remove(range);
    ***REMOVED***

        if (text == "\n" || text == "\r\n") ***REMOVED***
            var line = session.getLine(cursor.row);
            if (cursor.column > line.search(/\S|$/)) ***REMOVED***
                var d = line.substr(cursor.column).search(/\S|$/);
                session.doc.removeInLine(cursor.row, cursor.column, cursor.column + d);
        ***REMOVED***
    ***REMOVED***
        this.clearSelection();

        var start = cursor.column;
        var lineState = session.getState(cursor.row);
        var line = session.getLine(cursor.row);
        var shouldOutdent = mode.checkOutdent(lineState, line, text);
        var end = session.insert(cursor, text);

        if (transform && transform.selection) ***REMOVED***
            if (transform.selection.length == 2) ***REMOVED*** // Transform relative to the current column
                this.selection.setSelectionRange(
                    new Range(cursor.row, start + transform.selection[0],
                              cursor.row, start + transform.selection[1]));
        ***REMOVED*** else ***REMOVED*** // Transform relative to the current row.
                this.selection.setSelectionRange(
                    new Range(cursor.row + transform.selection[0],
                              transform.selection[1],
                              cursor.row + transform.selection[2],
                              transform.selection[3]));
        ***REMOVED***
    ***REMOVED***

        if (session.getDocument().isNewLine(text)) ***REMOVED***
            var lineIndent = mode.getNextLineIndent(lineState, line.slice(0, cursor.column), session.getTabString());

            session.insert(***REMOVED***row: cursor.row+1, column: 0***REMOVED***, lineIndent);
    ***REMOVED***
        if (shouldOutdent)
            mode.autoOutdent(lineState, session, cursor.row);
***REMOVED***;

    this.onTextInput = function(text) ***REMOVED***
        this.keyBinding.onTextInput(text);
***REMOVED***;

    this.onCommandKey = function(e, hashId, keyCode) ***REMOVED***
        this.keyBinding.onCommandKey(e, hashId, keyCode);
***REMOVED***;
    this.setOverwrite = function(overwrite) ***REMOVED***
        this.session.setOverwrite(overwrite);
***REMOVED***;
    this.getOverwrite = function() ***REMOVED***
        return this.session.getOverwrite();
***REMOVED***;
    this.toggleOverwrite = function() ***REMOVED***
        this.session.toggleOverwrite();
***REMOVED***;
    this.setScrollSpeed = function(speed) ***REMOVED***
        this.setOption("scrollSpeed", speed);
***REMOVED***;
    this.getScrollSpeed = function() ***REMOVED***
        return this.getOption("scrollSpeed");
***REMOVED***;
    this.setDragDelay = function(dragDelay) ***REMOVED***
        this.setOption("dragDelay", dragDelay);
***REMOVED***;
    this.getDragDelay = function() ***REMOVED***
        return this.getOption("dragDelay");
***REMOVED***;
    this.setSelectionStyle = function(val) ***REMOVED***
        this.setOption("selectionStyle", val);
***REMOVED***;
    this.getSelectionStyle = function() ***REMOVED***
        return this.getOption("selectionStyle");
***REMOVED***;
    this.setHighlightActiveLine = function(shouldHighlight) ***REMOVED***
        this.setOption("highlightActiveLine", shouldHighlight);
***REMOVED***;
    this.getHighlightActiveLine = function() ***REMOVED***
        return this.getOption("highlightActiveLine");
***REMOVED***;
    this.setHighlightGutterLine = function(shouldHighlight) ***REMOVED***
        this.setOption("highlightGutterLine", shouldHighlight);
***REMOVED***;

    this.getHighlightGutterLine = function() ***REMOVED***
        return this.getOption("highlightGutterLine");
***REMOVED***;
    this.setHighlightSelectedWord = function(shouldHighlight) ***REMOVED***
        this.setOption("highlightSelectedWord", shouldHighlight);
***REMOVED***;
    this.getHighlightSelectedWord = function() ***REMOVED***
        return this.$highlightSelectedWord;
***REMOVED***;

    this.setAnimatedScroll = function(shouldAnimate)***REMOVED***
        this.renderer.setAnimatedScroll(shouldAnimate);
***REMOVED***;

    this.getAnimatedScroll = function()***REMOVED***
        return this.renderer.getAnimatedScroll();
***REMOVED***;
    this.setShowInvisibles = function(showInvisibles) ***REMOVED***
        this.renderer.setShowInvisibles(showInvisibles);
***REMOVED***;
    this.getShowInvisibles = function() ***REMOVED***
        return this.renderer.getShowInvisibles();
***REMOVED***;

    this.setDisplayIndentGuides = function(display) ***REMOVED***
        this.renderer.setDisplayIndentGuides(display);
***REMOVED***;

    this.getDisplayIndentGuides = function() ***REMOVED***
        return this.renderer.getDisplayIndentGuides();
***REMOVED***;
    this.setShowPrintMargin = function(showPrintMargin) ***REMOVED***
        this.renderer.setShowPrintMargin(showPrintMargin);
***REMOVED***;
    this.getShowPrintMargin = function() ***REMOVED***
        return this.renderer.getShowPrintMargin();
***REMOVED***;
    this.setPrintMarginColumn = function(showPrintMargin) ***REMOVED***
        this.renderer.setPrintMarginColumn(showPrintMargin);
***REMOVED***;
    this.getPrintMarginColumn = function() ***REMOVED***
        return this.renderer.getPrintMarginColumn();
***REMOVED***;
    this.setReadOnly = function(readOnly) ***REMOVED***
        this.setOption("readOnly", readOnly);
***REMOVED***;
    this.getReadOnly = function() ***REMOVED***
        return this.getOption("readOnly");
***REMOVED***;
    this.setBehavioursEnabled = function (enabled) ***REMOVED***
        this.setOption("behavioursEnabled", enabled);
***REMOVED***;
    this.getBehavioursEnabled = function () ***REMOVED***
        return this.getOption("behavioursEnabled");
***REMOVED***;
    this.setWrapBehavioursEnabled = function (enabled) ***REMOVED***
        this.setOption("wrapBehavioursEnabled", enabled);
***REMOVED***;
    this.getWrapBehavioursEnabled = function () ***REMOVED***
        return this.getOption("wrapBehavioursEnabled");
***REMOVED***;
    this.setShowFoldWidgets = function(show) ***REMOVED***
        this.setOption("showFoldWidgets", show);

***REMOVED***;
    this.getShowFoldWidgets = function() ***REMOVED***
        return this.getOption("showFoldWidgets");
***REMOVED***;

    this.setFadeFoldWidgets = function(fade) ***REMOVED***
        this.setOption("fadeFoldWidgets", fade);
***REMOVED***;

    this.getFadeFoldWidgets = function() ***REMOVED***
        return this.getOption("fadeFoldWidgets");
***REMOVED***;
    this.remove = function(dir) ***REMOVED***
        if (this.selection.isEmpty())***REMOVED***
            if (dir == "left")
                this.selection.selectLeft();
            else
                this.selection.selectRight();
    ***REMOVED***

        var range = this.getSelectionRange();
        if (this.getBehavioursEnabled()) ***REMOVED***
            var session = this.session;
            var state = session.getState(range.start.row);
            var new_range = session.getMode().transformAction(state, 'deletion', this, session, range);

            if (range.end.column === 0) ***REMOVED***
                var text = session.getTextRange(range);
                if (text[text.length - 1] == "\n") ***REMOVED***
                    var line = session.getLine(range.end.row);
                    if (/^\s+$/.test(line)) ***REMOVED***
                        range.end.column = line.length;
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
            if (new_range)
                range = new_range;
    ***REMOVED***

        this.session.remove(range);
        this.clearSelection();
***REMOVED***;
    this.removeWordRight = function() ***REMOVED***
        if (this.selection.isEmpty())
            this.selection.selectWordRight();

        this.session.remove(this.getSelectionRange());
        this.clearSelection();
***REMOVED***;
    this.removeWordLeft = function() ***REMOVED***
        if (this.selection.isEmpty())
            this.selection.selectWordLeft();

        this.session.remove(this.getSelectionRange());
        this.clearSelection();
***REMOVED***;
    this.removeToLineStart = function() ***REMOVED***
        if (this.selection.isEmpty())
            this.selection.selectLineStart();

        this.session.remove(this.getSelectionRange());
        this.clearSelection();
***REMOVED***;
    this.removeToLineEnd = function() ***REMOVED***
        if (this.selection.isEmpty())
            this.selection.selectLineEnd();

        var range = this.getSelectionRange();
        if (range.start.column == range.end.column && range.start.row == range.end.row) ***REMOVED***
            range.end.column = 0;
            range.end.row++;
    ***REMOVED***

        this.session.remove(range);
        this.clearSelection();
***REMOVED***;
    this.splitLine = function() ***REMOVED***
        if (!this.selection.isEmpty()) ***REMOVED***
            this.session.remove(this.getSelectionRange());
            this.clearSelection();
    ***REMOVED***

        var cursor = this.getCursorPosition();
        this.insert("\n");
        this.moveCursorToPosition(cursor);
***REMOVED***;
    this.transposeLetters = function() ***REMOVED***
        if (!this.selection.isEmpty()) ***REMOVED***
            return;
    ***REMOVED***

        var cursor = this.getCursorPosition();
        var column = cursor.column;
        if (column === 0)
            return;

        var line = this.session.getLine(cursor.row);
        var swap, range;
        if (column < line.length) ***REMOVED***
            swap = line.charAt(column) + line.charAt(column-1);
            range = new Range(cursor.row, column-1, cursor.row, column+1);
    ***REMOVED***
        else ***REMOVED***
            swap = line.charAt(column-1) + line.charAt(column-2);
            range = new Range(cursor.row, column-2, cursor.row, column);
    ***REMOVED***
        this.session.replace(range, swap);
***REMOVED***;
    this.toLowerCase = function() ***REMOVED***
        var originalRange = this.getSelectionRange();
        if (this.selection.isEmpty()) ***REMOVED***
            this.selection.selectWord();
    ***REMOVED***

        var range = this.getSelectionRange();
        var text = this.session.getTextRange(range);
        this.session.replace(range, text.toLowerCase());
        this.selection.setSelectionRange(originalRange);
***REMOVED***;
    this.toUpperCase = function() ***REMOVED***
        var originalRange = this.getSelectionRange();
        if (this.selection.isEmpty()) ***REMOVED***
            this.selection.selectWord();
    ***REMOVED***

        var range = this.getSelectionRange();
        var text = this.session.getTextRange(range);
        this.session.replace(range, text.toUpperCase());
        this.selection.setSelectionRange(originalRange);
***REMOVED***;
    this.indent = function() ***REMOVED***
        var session = this.session;
        var range = this.getSelectionRange();

        if (range.start.row < range.end.row) ***REMOVED***
            var rows = this.$getSelectedRows();
            session.indentRows(rows.first, rows.last, "\t");
            return;
    ***REMOVED*** else if (range.start.column < range.end.column) ***REMOVED***
            var text = session.getTextRange(range);
            if (!/^\s+$/.test(text)) ***REMOVED***
                var rows = this.$getSelectedRows();
                session.indentRows(rows.first, rows.last, "\t");
                return;
        ***REMOVED***
    ***REMOVED***
        
        var line = session.getLine(range.start.row);
        var position = range.start;
        var size = session.getTabSize();
        var column = session.documentToScreenColumn(position.row, position.column);

        if (this.session.getUseSoftTabs()) ***REMOVED***
            var count = (size - column % size);
            var indentString = lang.stringRepeat(" ", count);
    ***REMOVED*** else ***REMOVED***
            var count = column % size;
            while (line[range.start.column] == " " && count) ***REMOVED***
                range.start.column--;
                count--;
        ***REMOVED***
            this.selection.setSelectionRange(range);
            indentString = "\t";
    ***REMOVED***
        return this.insert(indentString);
***REMOVED***;
    this.blockIndent = function() ***REMOVED***
        var rows = this.$getSelectedRows();
        this.session.indentRows(rows.first, rows.last, "\t");
***REMOVED***;
    this.blockOutdent = function() ***REMOVED***
        var selection = this.session.getSelection();
        this.session.outdentRows(selection.getRange());
***REMOVED***;
    this.sortLines = function() ***REMOVED***
        var rows = this.$getSelectedRows();
        var session = this.session;

        var lines = [];
        for (i = rows.first; i <= rows.last; i++)
            lines.push(session.getLine(i));

        lines.sort(function(a, b) ***REMOVED***
            if (a.toLowerCase() < b.toLowerCase()) return -1;
            if (a.toLowerCase() > b.toLowerCase()) return 1;
            return 0;
    ***REMOVED***);

        var deleteRange = new Range(0, 0, 0, 0);
        for (var i = rows.first; i <= rows.last; i++) ***REMOVED***
            var line = session.getLine(i);
            deleteRange.start.row = i;
            deleteRange.end.row = i;
            deleteRange.end.column = line.length;
            session.replace(deleteRange, lines[i-rows.first]);
    ***REMOVED***
***REMOVED***;
    this.toggleCommentLines = function() ***REMOVED***
        var state = this.session.getState(this.getCursorPosition().row);
        var rows = this.$getSelectedRows();
        this.session.getMode().toggleCommentLines(state, this.session, rows.first, rows.last);
***REMOVED***;

    this.toggleBlockComment = function() ***REMOVED***
        var cursor = this.getCursorPosition();
        var state = this.session.getState(cursor.row);
        var range = this.getSelectionRange();
        this.session.getMode().toggleBlockComment(state, this.session, range, cursor);
***REMOVED***;
    this.getNumberAt = function(row, column) ***REMOVED***
        var _numberRx = /[\-]?[0-9]+(?:\.[0-9]+)?/g;
        _numberRx.lastIndex = 0;

        var s = this.session.getLine(row);
        while (_numberRx.lastIndex < column) ***REMOVED***
            var m = _numberRx.exec(s);
            if(m.index <= column && m.index+m[0].length >= column)***REMOVED***
                var number = ***REMOVED***
                    value: m[0],
                    start: m.index,
                    end: m.index+m[0].length
            ***REMOVED***;
                return number;
        ***REMOVED***
    ***REMOVED***
        return null;
***REMOVED***;
    this.modifyNumber = function(amount) ***REMOVED***
        var row = this.selection.getCursor().row;
        var column = this.selection.getCursor().column;
        var charRange = new Range(row, column-1, row, column);

        var c = this.session.getTextRange(charRange);
        if (!isNaN(parseFloat(c)) && isFinite(c)) ***REMOVED***
            var nr = this.getNumberAt(row, column);
            if (nr) ***REMOVED***
                var fp = nr.value.indexOf(".") >= 0 ? nr.start + nr.value.indexOf(".") + 1 : nr.end;
                var decimals = nr.start + nr.value.length - fp;

                var t = parseFloat(nr.value);
                t *= Math.pow(10, decimals);


                if(fp !== nr.end && column < fp)***REMOVED***
                    amount *= Math.pow(10, nr.end - column - 1);
            ***REMOVED*** else ***REMOVED***
                    amount *= Math.pow(10, nr.end - column);
            ***REMOVED***

                t += amount;
                t /= Math.pow(10, decimals);
                var nnr = t.toFixed(decimals);
                var replaceRange = new Range(row, nr.start, row, nr.end);
                this.session.replace(replaceRange, nnr);
                this.moveCursorTo(row, Math.max(nr.start +1, column + nnr.length - nr.value.length));

        ***REMOVED***
    ***REMOVED***
***REMOVED***;
    this.removeLines = function() ***REMOVED***
        var rows = this.$getSelectedRows();
        var range;
        if (rows.first === 0 || rows.last+1 < this.session.getLength())
            range = new Range(rows.first, 0, rows.last+1, 0);
        else
            range = new Range(
                rows.first-1, this.session.getLine(rows.first-1).length,
                rows.last, this.session.getLine(rows.last).length
            );
        this.session.remove(range);
        this.clearSelection();
***REMOVED***;

    this.duplicateSelection = function() ***REMOVED***
        var sel = this.selection;
        var doc = this.session;
        var range = sel.getRange();
        var reverse = sel.isBackwards();
        if (range.isEmpty()) ***REMOVED***
            var row = range.start.row;
            doc.duplicateLines(row, row);
    ***REMOVED*** else ***REMOVED***
            var point = reverse ? range.start : range.end;
            var endPoint = doc.insert(point, doc.getTextRange(range), false);
            range.start = point;
            range.end = endPoint;

            sel.setSelectionRange(range, reverse);
    ***REMOVED***
***REMOVED***;
    this.moveLinesDown = function() ***REMOVED***
        this.$moveLines(function(firstRow, lastRow) ***REMOVED***
            return this.session.moveLinesDown(firstRow, lastRow);
    ***REMOVED***);
***REMOVED***;
    this.moveLinesUp = function() ***REMOVED***
        this.$moveLines(function(firstRow, lastRow) ***REMOVED***
            return this.session.moveLinesUp(firstRow, lastRow);
    ***REMOVED***);
***REMOVED***;
    this.moveText = function(range, toPosition, copy) ***REMOVED***
        return this.session.moveText(range, toPosition, copy);
***REMOVED***;
    this.copyLinesUp = function() ***REMOVED***
        this.$moveLines(function(firstRow, lastRow) ***REMOVED***
            this.session.duplicateLines(firstRow, lastRow);
            return 0;
    ***REMOVED***);
***REMOVED***;
    this.copyLinesDown = function() ***REMOVED***
        this.$moveLines(function(firstRow, lastRow) ***REMOVED***
            return this.session.duplicateLines(firstRow, lastRow);
    ***REMOVED***);
***REMOVED***;
    this.$moveLines = function(mover) ***REMOVED***
        var selection = this.selection;
        if (!selection.inMultiSelectMode || this.inVirtualSelectionMode) ***REMOVED***
            var range = selection.toOrientedRange();
            var rows = this.$getSelectedRows(range);
            var linesMoved = mover.call(this, rows.first, rows.last);
            range.moveBy(linesMoved, 0);
            selection.fromOrientedRange(range);
    ***REMOVED*** else ***REMOVED***
            var ranges = selection.rangeList.ranges;
            selection.rangeList.detach(this.session);

            for (var i = ranges.length; i--; ) ***REMOVED***
                var rangeIndex = i;
                var rows = ranges[i].collapseRows();
                var last = rows.end.row;
                var first = rows.start.row;
                while (i--) ***REMOVED***
                    rows = ranges[i].collapseRows();
                    if (first - rows.end.row <= 1)
                        first = rows.end.row;
                    else
                        break;
            ***REMOVED***
                i++;

                var linesMoved = mover.call(this, first, last);
                while (rangeIndex >= i) ***REMOVED***
                    ranges[rangeIndex].moveBy(linesMoved, 0);
                    rangeIndex--;
            ***REMOVED***
        ***REMOVED***
            selection.fromOrientedRange(selection.ranges[0]);
            selection.rangeList.attach(this.session);
    ***REMOVED***
***REMOVED***;
    this.$getSelectedRows = function() ***REMOVED***
        var range = this.getSelectionRange().collapseRows();

        return ***REMOVED***
            first: this.session.getRowFoldStart(range.start.row),
            last: this.session.getRowFoldEnd(range.end.row)
    ***REMOVED***;
***REMOVED***;

    this.onCompositionStart = function(text) ***REMOVED***
        this.renderer.showComposition(this.getCursorPosition());
***REMOVED***;

    this.onCompositionUpdate = function(text) ***REMOVED***
        this.renderer.setCompositionText(text);
***REMOVED***;

    this.onCompositionEnd = function() ***REMOVED***
        this.renderer.hideComposition();
***REMOVED***;
    this.getFirstVisibleRow = function() ***REMOVED***
        return this.renderer.getFirstVisibleRow();
***REMOVED***;
    this.getLastVisibleRow = function() ***REMOVED***
        return this.renderer.getLastVisibleRow();
***REMOVED***;
    this.isRowVisible = function(row) ***REMOVED***
        return (row >= this.getFirstVisibleRow() && row <= this.getLastVisibleRow());
***REMOVED***;
    this.isRowFullyVisible = function(row) ***REMOVED***
        return (row >= this.renderer.getFirstFullyVisibleRow() && row <= this.renderer.getLastFullyVisibleRow());
***REMOVED***;
    this.$getVisibleRowCount = function() ***REMOVED***
        return this.renderer.getScrollBottomRow() - this.renderer.getScrollTopRow() + 1;
***REMOVED***;

    this.$moveByPage = function(dir, select) ***REMOVED***
        var renderer = this.renderer;
        var config = this.renderer.layerConfig;
        var rows = dir * Math.floor(config.height / config.lineHeight);

        this.$blockScrolling++;
        if (select === true) ***REMOVED***
            this.selection.$moveSelection(function()***REMOVED***
                this.moveCursorBy(rows, 0);
        ***REMOVED***);
    ***REMOVED*** else if (select === false) ***REMOVED***
            this.selection.moveCursorBy(rows, 0);
            this.selection.clearSelection();
    ***REMOVED***
        this.$blockScrolling--;

        var scrollTop = renderer.scrollTop;

        renderer.scrollBy(0, rows * config.lineHeight);
        if (select != null)
            renderer.scrollCursorIntoView(null, 0.5);

        renderer.animateScrolling(scrollTop);
***REMOVED***;
    this.selectPageDown = function() ***REMOVED***
        this.$moveByPage(1, true);
***REMOVED***;
    this.selectPageUp = function() ***REMOVED***
        this.$moveByPage(-1, true);
***REMOVED***;
    this.gotoPageDown = function() ***REMOVED***
       this.$moveByPage(1, false);
***REMOVED***;
    this.gotoPageUp = function() ***REMOVED***
        this.$moveByPage(-1, false);
***REMOVED***;
    this.scrollPageDown = function() ***REMOVED***
        this.$moveByPage(1);
***REMOVED***;
    this.scrollPageUp = function() ***REMOVED***
        this.$moveByPage(-1);
***REMOVED***;
    this.scrollToRow = function(row) ***REMOVED***
        this.renderer.scrollToRow(row);
***REMOVED***;
    this.scrollToLine = function(line, center, animate, callback) ***REMOVED***
        this.renderer.scrollToLine(line, center, animate, callback);
***REMOVED***;
    this.centerSelection = function() ***REMOVED***
        var range = this.getSelectionRange();
        var pos = ***REMOVED***
            row: Math.floor(range.start.row + (range.end.row - range.start.row) / 2),
            column: Math.floor(range.start.column + (range.end.column - range.start.column) / 2)
    ***REMOVED***;
        this.renderer.alignCursor(pos, 0.5);
***REMOVED***;
    this.getCursorPosition = function() ***REMOVED***
        return this.selection.getCursor();
***REMOVED***;
    this.getCursorPositionScreen = function() ***REMOVED***
        return this.session.documentToScreenPosition(this.getCursorPosition());
***REMOVED***;
    this.getSelectionRange = function() ***REMOVED***
        return this.selection.getRange();
***REMOVED***;
    this.selectAll = function() ***REMOVED***
        this.$blockScrolling += 1;
        this.selection.selectAll();
        this.$blockScrolling -= 1;
***REMOVED***;
    this.clearSelection = function() ***REMOVED***
        this.selection.clearSelection();
***REMOVED***;
    this.moveCursorTo = function(row, column) ***REMOVED***
        this.selection.moveCursorTo(row, column);
***REMOVED***;
    this.moveCursorToPosition = function(pos) ***REMOVED***
        this.selection.moveCursorToPosition(pos);
***REMOVED***;
    this.jumpToMatching = function(select) ***REMOVED***
        var cursor = this.getCursorPosition();

        var range = this.session.getBracketRange(cursor);
        if (!range) ***REMOVED***
            range = this.find(***REMOVED***
                needle: /[***REMOVED******REMOVED***()\[\]]/g,
                preventScroll:true,
                start: ***REMOVED***row: cursor.row, column: cursor.column - 1***REMOVED***
        ***REMOVED***);
            if (!range)
                return;
            var pos = range.start;
            if (pos.row == cursor.row && Math.abs(pos.column - cursor.column) < 2)
                range = this.session.getBracketRange(pos);
    ***REMOVED***

        pos = range && range.cursor || pos;
        if (pos) ***REMOVED***
            if (select) ***REMOVED***
                if (range && range.isEqual(this.getSelectionRange()))
                    this.clearSelection();
                else
                    this.selection.selectTo(pos.row, pos.column);
        ***REMOVED*** else ***REMOVED***
                this.selection.moveTo(pos.row, pos.column);
        ***REMOVED***
    ***REMOVED***
***REMOVED***;
    this.gotoLine = function(lineNumber, column, animate) ***REMOVED***
        this.selection.clearSelection();
        this.session.unfold(***REMOVED***row: lineNumber - 1, column: column || 0***REMOVED***);

        this.$blockScrolling += 1;
        this.exitMultiSelectMode && this.exitMultiSelectMode();
        this.moveCursorTo(lineNumber - 1, column || 0);
        this.$blockScrolling -= 1;

        if (!this.isRowFullyVisible(lineNumber - 1))
            this.scrollToLine(lineNumber - 1, true, animate);
***REMOVED***;
    this.navigateTo = function(row, column) ***REMOVED***
        this.selection.moveTo(row, column);
***REMOVED***;
    this.navigateUp = function(times) ***REMOVED***
        if (this.selection.isMultiLine() && !this.selection.isBackwards()) ***REMOVED***
            var selectionStart = this.selection.anchor.getPosition();
            return this.moveCursorToPosition(selectionStart);
    ***REMOVED***
        this.selection.clearSelection();
        this.selection.moveCursorBy(-times || -1, 0);
***REMOVED***;
    this.navigateDown = function(times) ***REMOVED***
        if (this.selection.isMultiLine() && this.selection.isBackwards()) ***REMOVED***
            var selectionEnd = this.selection.anchor.getPosition();
            return this.moveCursorToPosition(selectionEnd);
    ***REMOVED***
        this.selection.clearSelection();
        this.selection.moveCursorBy(times || 1, 0);
***REMOVED***;
    this.navigateLeft = function(times) ***REMOVED***
        if (!this.selection.isEmpty()) ***REMOVED***
            var selectionStart = this.getSelectionRange().start;
            this.moveCursorToPosition(selectionStart);
    ***REMOVED***
        else ***REMOVED***
            times = times || 1;
            while (times--) ***REMOVED***
                this.selection.moveCursorLeft();
        ***REMOVED***
    ***REMOVED***
        this.clearSelection();
***REMOVED***;
    this.navigateRight = function(times) ***REMOVED***
        if (!this.selection.isEmpty()) ***REMOVED***
            var selectionEnd = this.getSelectionRange().end;
            this.moveCursorToPosition(selectionEnd);
    ***REMOVED***
        else ***REMOVED***
            times = times || 1;
            while (times--) ***REMOVED***
                this.selection.moveCursorRight();
        ***REMOVED***
    ***REMOVED***
        this.clearSelection();
***REMOVED***;
    this.navigateLineStart = function() ***REMOVED***
        this.selection.moveCursorLineStart();
        this.clearSelection();
***REMOVED***;
    this.navigateLineEnd = function() ***REMOVED***
        this.selection.moveCursorLineEnd();
        this.clearSelection();
***REMOVED***;
    this.navigateFileEnd = function() ***REMOVED***
        this.selection.moveCursorFileEnd();
        this.clearSelection();
***REMOVED***;
    this.navigateFileStart = function() ***REMOVED***
        this.selection.moveCursorFileStart();
        this.clearSelection();
***REMOVED***;
    this.navigateWordRight = function() ***REMOVED***
        this.selection.moveCursorWordRight();
        this.clearSelection();
***REMOVED***;
    this.navigateWordLeft = function() ***REMOVED***
        this.selection.moveCursorWordLeft();
        this.clearSelection();
***REMOVED***;
    this.replace = function(replacement, options) ***REMOVED***
        if (options)
            this.$search.set(options);

        var range = this.$search.find(this.session);
        var replaced = 0;
        if (!range)
            return replaced;

        if (this.$tryReplace(range, replacement)) ***REMOVED***
            replaced = 1;
    ***REMOVED***
        if (range !== null) ***REMOVED***
            this.selection.setSelectionRange(range);
            this.renderer.scrollSelectionIntoView(range.start, range.end);
    ***REMOVED***

        return replaced;
***REMOVED***;
    this.replaceAll = function(replacement, options) ***REMOVED***
        if (options) ***REMOVED***
            this.$search.set(options);
    ***REMOVED***

        var ranges = this.$search.findAll(this.session);
        var replaced = 0;
        if (!ranges.length)
            return replaced;

        this.$blockScrolling += 1;

        var selection = this.getSelectionRange();
        this.selection.moveTo(0, 0);

        for (var i = ranges.length - 1; i >= 0; --i) ***REMOVED***
            if(this.$tryReplace(ranges[i], replacement)) ***REMOVED***
                replaced++;
        ***REMOVED***
    ***REMOVED***

        this.selection.setSelectionRange(selection);
        this.$blockScrolling -= 1;

        return replaced;
***REMOVED***;

    this.$tryReplace = function(range, replacement) ***REMOVED***
        var input = this.session.getTextRange(range);
        replacement = this.$search.replace(input, replacement);
        if (replacement !== null) ***REMOVED***
            range.end = this.session.replace(range, replacement);
            return range;
    ***REMOVED*** else ***REMOVED***
            return null;
    ***REMOVED***
***REMOVED***;
    this.getLastSearchOptions = function() ***REMOVED***
        return this.$search.getOptions();
***REMOVED***;
    this.find = function(needle, options, animate) ***REMOVED***
        if (!options)
            options = ***REMOVED******REMOVED***;

        if (typeof needle == "string" || needle instanceof RegExp)
            options.needle = needle;
        else if (typeof needle == "object")
            oop.mixin(options, needle);

        var range = this.selection.getRange();
        if (options.needle == null) ***REMOVED***
            needle = this.session.getTextRange(range)
                || this.$search.$options.needle;
            if (!needle) ***REMOVED***
                range = this.session.getWordRange(range.start.row, range.start.column);
                needle = this.session.getTextRange(range);
        ***REMOVED***
            this.$search.set(***REMOVED***needle: needle***REMOVED***);
    ***REMOVED***

        this.$search.set(options);
        if (!options.start)
            this.$search.set(***REMOVED***start: range***REMOVED***);

        var newRange = this.$search.find(this.session);
        if (options.preventScroll)
            return newRange;
        if (newRange) ***REMOVED***
            this.revealRange(newRange, animate);
            return newRange;
    ***REMOVED***
        if (options.backwards)
            range.start = range.end;
        else
            range.end = range.start;
        this.selection.setRange(range);
***REMOVED***;
    this.findNext = function(options, animate) ***REMOVED***
        this.find(***REMOVED***skipCurrent: true, backwards: false***REMOVED***, options, animate);
***REMOVED***;
    this.findPrevious = function(options, animate) ***REMOVED***
        this.find(options, ***REMOVED***skipCurrent: true, backwards: true***REMOVED***, animate);
***REMOVED***;

    this.revealRange = function(range, animate) ***REMOVED***
        this.$blockScrolling += 1;
        this.session.unfold(range);
        this.selection.setSelectionRange(range);
        this.$blockScrolling -= 1;

        var scrollTop = this.renderer.scrollTop;
        this.renderer.scrollSelectionIntoView(range.start, range.end, 0.5);
        if (animate !== false)
            this.renderer.animateScrolling(scrollTop);
***REMOVED***;
    this.undo = function() ***REMOVED***
        this.$blockScrolling++;
        this.session.getUndoManager().undo();
        this.$blockScrolling--;
        this.renderer.scrollCursorIntoView(null, 0.5);
***REMOVED***;
    this.redo = function() ***REMOVED***
        this.$blockScrolling++;
        this.session.getUndoManager().redo();
        this.$blockScrolling--;
        this.renderer.scrollCursorIntoView(null, 0.5);
***REMOVED***;
    this.destroy = function() ***REMOVED***
        this.renderer.destroy();
        this._signal("destroy", this);
***REMOVED***;
    this.setAutoScrollEditorIntoView = function(enable) ***REMOVED***
        if (!enable)
            return;
        var rect;
        var self = this;
        var shouldScroll = false;
        if (!this.$scrollAnchor)
            this.$scrollAnchor = document.createElement("div");
        var scrollAnchor = this.$scrollAnchor;
        scrollAnchor.style.cssText = "position:absolute";
        this.container.insertBefore(scrollAnchor, this.container.firstChild);
        var onChangeSelection = this.on("changeSelection", function() ***REMOVED***
            shouldScroll = true;
    ***REMOVED***);
        var onBeforeRender = this.renderer.on("beforeRender", function() ***REMOVED***
            if (shouldScroll)
                rect = self.renderer.container.getBoundingClientRect();
    ***REMOVED***);
        var onAfterRender = this.renderer.on("afterRender", function() ***REMOVED***
            if (shouldScroll && rect && self.isFocused()) ***REMOVED***
                var renderer = self.renderer;
                var pos = renderer.$cursorLayer.$pixelPos;
                var config = renderer.layerConfig;
                var top = pos.top - config.offset;
                if (pos.top >= 0 && top + rect.top < 0) ***REMOVED***
                    shouldScroll = true;
            ***REMOVED*** else if (pos.top < config.height &&
                    pos.top + rect.top + config.lineHeight > window.innerHeight) ***REMOVED***
                    shouldScroll = false;
            ***REMOVED*** else ***REMOVED***
                    shouldScroll = null;
            ***REMOVED***
                if (shouldScroll != null) ***REMOVED***
                    scrollAnchor.style.top = top + "px";
                    scrollAnchor.style.left = pos.left + "px";
                    scrollAnchor.style.height = config.lineHeight + "px";
                    scrollAnchor.scrollIntoView(shouldScroll);
            ***REMOVED***
                shouldScroll = rect = null;
        ***REMOVED***
    ***REMOVED***);
        this.setAutoScrollEditorIntoView = function(enable) ***REMOVED***
            if (enable)
                return;
            delete this.setAutoScrollEditorIntoView;
            this.removeEventListener("changeSelection", onChangeSelection);
            this.renderer.removeEventListener("afterRender", onAfterRender);
            this.renderer.removeEventListener("beforeRender", onBeforeRender);
    ***REMOVED***;
***REMOVED***;


    this.$resetCursorStyle = function() ***REMOVED***
        var style = this.$cursorStyle || "ace";
        var cursorLayer = this.renderer.$cursorLayer;
        if (!cursorLayer)
            return;
        cursorLayer.setSmoothBlinking(style == "smooth");
        cursorLayer.isBlinking = !this.$readOnly && style != "wide";
***REMOVED***;

***REMOVED***).call(Editor.prototype);



config.defineOptions(Editor.prototype, "editor", ***REMOVED***
    selectionStyle: ***REMOVED***
        set: function(style) ***REMOVED***
            this.onSelectionChange();
            this._signal("changeSelectionStyle", ***REMOVED***data: style***REMOVED***);
    ***REMOVED***
        initialValue: "line"
***REMOVED***
    highlightActiveLine: ***REMOVED***
        set: function() ***REMOVED***this.$updateHighlightActiveLine();***REMOVED***,
        initialValue: true
***REMOVED***
    highlightSelectedWord: ***REMOVED***
        set: function(shouldHighlight) ***REMOVED***this.$onSelectionChange();***REMOVED***,
        initialValue: true
***REMOVED***
    readOnly: ***REMOVED***
        set: function(readOnly) ***REMOVED***
            this.$resetCursorStyle(); 
    ***REMOVED***
        initialValue: false
***REMOVED***
    cursorStyle: ***REMOVED***
        set: function(val) ***REMOVED*** this.$resetCursorStyle(); ***REMOVED***,
        values: ["ace", "slim", "smooth", "wide"],
        initialValue: "ace"
***REMOVED***
    mergeUndoDeltas: ***REMOVED***
        values: [false, true, "always"],
        initialValue: true
***REMOVED***
    behavioursEnabled: ***REMOVED***initialValue: true***REMOVED***,
    wrapBehavioursEnabled: ***REMOVED***initialValue: true***REMOVED***,
    autoScrollEditorIntoView: ***REMOVED***
        set: function(val) ***REMOVED***this.setAutoScrollEditorIntoView(val)***REMOVED***
***REMOVED***

    hScrollBarAlwaysVisible: "renderer",
    vScrollBarAlwaysVisible: "renderer",
    highlightGutterLine: "renderer",
    animatedScroll: "renderer",
    showInvisibles: "renderer",
    showPrintMargin: "renderer",
    printMarginColumn: "renderer",
    printMargin: "renderer",
    fadeFoldWidgets: "renderer",
    showFoldWidgets: "renderer",
    showLineNumbers: "renderer",
    showGutter: "renderer",
    displayIndentGuides: "renderer",
    fontSize: "renderer",
    fontFamily: "renderer",
    maxLines: "renderer",
    minLines: "renderer",
    scrollPastEnd: "renderer",
    fixedWidthGutter: "renderer",
    theme: "renderer",

    scrollSpeed: "$mouseHandler",
    dragDelay: "$mouseHandler",
    dragEnabled: "$mouseHandler",
    focusTimout: "$mouseHandler",
    tooltipFollowsMouse: "$mouseHandler",

    firstLineNumber: "session",
    overwrite: "session",
    newLineMode: "session",
    useWorker: "session",
    useSoftTabs: "session",
    tabSize: "session",
    wrap: "session",
    foldStyle: "session",
    mode: "session"
***REMOVED***);

exports.Editor = Editor;
***REMOVED***);

__ace_shadowed__.define('ace/lib/lang', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***


exports.last = function(a) ***REMOVED***
    return a[a.length - 1];
***REMOVED***;

exports.stringReverse = function(string) ***REMOVED***
    return string.split("").reverse().join("");
***REMOVED***;

exports.stringRepeat = function (string, count) ***REMOVED***
    var result = '';
    while (count > 0) ***REMOVED***
        if (count & 1)
            result += string;

        if (count >>= 1)
            string += string;
***REMOVED***
    return result;
***REMOVED***;

var trimBeginRegexp = /^\s\s*/;
var trimEndRegexp = /\s\s*$/;

exports.stringTrimLeft = function (string) ***REMOVED***
    return string.replace(trimBeginRegexp, '');
***REMOVED***;

exports.stringTrimRight = function (string) ***REMOVED***
    return string.replace(trimEndRegexp, '');
***REMOVED***;

exports.copyObject = function(obj) ***REMOVED***
    var copy = ***REMOVED******REMOVED***;
    for (var key in obj) ***REMOVED***
        copy[key] = obj[key];
***REMOVED***
    return copy;
***REMOVED***;

exports.copyArray = function(array)***REMOVED***
    var copy = [];
    for (var i=0, l=array.length; i<l; i++) ***REMOVED***
        if (array[i] && typeof array[i] == "object")
            copy[i] = this.copyObject( array[i] );
        else 
            copy[i] = array[i];
***REMOVED***
    return copy;
***REMOVED***;

exports.deepCopy = function (obj) ***REMOVED***
    if (typeof obj !== "object" || !obj)
        return obj;
    var cons = obj.constructor;
    if (cons === RegExp)
        return obj;
    
    var copy = cons();
    for (var key in obj) ***REMOVED***
        if (typeof obj[key] === "object") ***REMOVED***
            copy[key] = exports.deepCopy(obj[key]);
    ***REMOVED*** else ***REMOVED***
            copy[key] = obj[key];
    ***REMOVED***
***REMOVED***
    return copy;
***REMOVED***;

exports.arrayToMap = function(arr) ***REMOVED***
    var map = ***REMOVED******REMOVED***;
    for (var i=0; i<arr.length; i++) ***REMOVED***
        map[arr[i]] = 1;
***REMOVED***
    return map;

***REMOVED***;

exports.createMap = function(props) ***REMOVED***
    var map = Object.create(null);
    for (var i in props) ***REMOVED***
        map[i] = props[i];
***REMOVED***
    return map;
***REMOVED***;
exports.arrayRemove = function(array, value) ***REMOVED***
  for (var i = 0; i <= array.length; i++) ***REMOVED***
    if (value === array[i]) ***REMOVED***
      array.splice(i, 1);
***REMOVED***
  ***REMOVED***
***REMOVED***;

exports.escapeRegExp = function(str) ***REMOVED***
    return str.replace(/([.*+?^$***REMOVED******REMOVED***()|[\]\/\\])/g, '\\$1');
***REMOVED***;

exports.escapeHTML = function(str) ***REMOVED***
    return str.replace(/&/g, "&#38;").replace(/"/g, "&#34;").replace(/'/g, "&#39;").replace(/</g, "&#60;");
***REMOVED***;

exports.getMatchOffsets = function(string, regExp) ***REMOVED***
    var matches = [];

    string.replace(regExp, function(str) ***REMOVED***
        matches.push(***REMOVED***
            offset: arguments[arguments.length-2],
            length: str.length
    ***REMOVED***);
***REMOVED***);

    return matches;
***REMOVED***;
exports.deferredCall = function(fcn) ***REMOVED***

    var timer = null;
    var callback = function() ***REMOVED***
        timer = null;
        fcn();
***REMOVED***;

    var deferred = function(timeout) ***REMOVED***
        deferred.cancel();
        timer = setTimeout(callback, timeout || 0);
        return deferred;
***REMOVED***;

    deferred.schedule = deferred;

    deferred.call = function() ***REMOVED***
        this.cancel();
        fcn();
        return deferred;
***REMOVED***;

    deferred.cancel = function() ***REMOVED***
        clearTimeout(timer);
        timer = null;
        return deferred;
***REMOVED***;
    
    deferred.isPending = function() ***REMOVED***
        return timer;
***REMOVED***;

    return deferred;
***REMOVED***;


exports.delayedCall = function(fcn, defaultTimeout) ***REMOVED***
    var timer = null;
    var callback = function() ***REMOVED***
        timer = null;
        fcn();
***REMOVED***;

    var _self = function(timeout) ***REMOVED***
        if (timer == null)
            timer = setTimeout(callback, timeout || defaultTimeout);
***REMOVED***;

    _self.delay = function(timeout) ***REMOVED***
        timer && clearTimeout(timer);
        timer = setTimeout(callback, timeout || defaultTimeout);
***REMOVED***;
    _self.schedule = _self;

    _self.call = function() ***REMOVED***
        this.cancel();
        fcn();
***REMOVED***;

    _self.cancel = function() ***REMOVED***
        timer && clearTimeout(timer);
        timer = null;
***REMOVED***;

    _self.isPending = function() ***REMOVED***
        return timer;
***REMOVED***;

    return _self;
***REMOVED***;
***REMOVED***);

__ace_shadowed__.define('ace/keyboard/textinput', ['require', 'exports', 'module' , 'ace/lib/event', 'ace/lib/useragent', 'ace/lib/dom', 'ace/lib/lang'], function(require, exports, module) ***REMOVED***


var event = require("../lib/event");
var useragent = require("../lib/useragent");
var dom = require("../lib/dom");
var lang = require("../lib/lang");
var BROKEN_SETDATA = useragent.isChrome < 18;
var USE_IE_MIME_TYPE =  useragent.isIE;

var TextInput = function(parentNode, host) ***REMOVED***
    var text = dom.createElement("textarea");
    text.className = "ace_text-input";

    if (useragent.isTouchPad)
        text.setAttribute("x-palm-disable-auto-cap", true);

    text.wrap = "off";
    text.autocorrect = "off";
    text.autocapitalize = "off";
    text.spellcheck = false;

    text.style.opacity = "0";
    parentNode.insertBefore(text, parentNode.firstChild);

    var PLACEHOLDER = "\x01\x01";

    var copied = false;
    var pasted = false;
    var inComposition = false;
    var tempStyle = '';
    var isSelectionEmpty = true;
    try ***REMOVED*** var isFocused = document.activeElement === text; ***REMOVED*** catch(e) ***REMOVED******REMOVED***
    
    event.addListener(text, "blur", function() ***REMOVED***
        host.onBlur();
        isFocused = false;
***REMOVED***);
    event.addListener(text, "focus", function() ***REMOVED***
        isFocused = true;
        host.onFocus();
        resetSelection();
***REMOVED***);
    this.focus = function() ***REMOVED*** text.focus(); ***REMOVED***;
    this.blur = function() ***REMOVED*** text.blur(); ***REMOVED***;
    this.isFocused = function() ***REMOVED***
        return isFocused;
***REMOVED***;
    var syncSelection = lang.delayedCall(function() ***REMOVED***
        isFocused && resetSelection(isSelectionEmpty);
***REMOVED***);
    var syncValue = lang.delayedCall(function() ***REMOVED***
         if (!inComposition) ***REMOVED***
            text.value = PLACEHOLDER;
            isFocused && resetSelection();
     ***REMOVED***
***REMOVED***);

    function resetSelection(isEmpty) ***REMOVED***
        if (inComposition)
            return;
        if (inputHandler) ***REMOVED***
            selectionStart = 0;
            selectionEnd = isEmpty ? 0 : text.value.length - 1;
    ***REMOVED*** else ***REMOVED***
            var selectionStart = isEmpty ? 2 : 1;
            var selectionEnd = 2;
    ***REMOVED***
        try ***REMOVED***
            text.setSelectionRange(selectionStart, selectionEnd);
    ***REMOVED*** catch(e)***REMOVED******REMOVED***
***REMOVED***

    function resetValue() ***REMOVED***
        if (inComposition)
            return;
        text.value = PLACEHOLDER;
        if (useragent.isWebKit)
            syncValue.schedule();
***REMOVED***

    useragent.isWebKit || host.addEventListener('changeSelection', function() ***REMOVED***
        if (host.selection.isEmpty() != isSelectionEmpty) ***REMOVED***
            isSelectionEmpty = !isSelectionEmpty;
            syncSelection.schedule();
    ***REMOVED***
***REMOVED***);

    resetValue();
    if (isFocused)
        host.onFocus();


    var isAllSelected = function(text) ***REMOVED***
        return text.selectionStart === 0 && text.selectionEnd === text.value.length;
***REMOVED***;
    if (!text.setSelectionRange && text.createTextRange) ***REMOVED***
        text.setSelectionRange = function(selectionStart, selectionEnd) ***REMOVED***
            var range = this.createTextRange();
            range.collapse(true);
            range.moveStart('character', selectionStart);
            range.moveEnd('character', selectionEnd);
            range.select();
    ***REMOVED***;
        isAllSelected = function(text) ***REMOVED***
            try ***REMOVED***
                var range = text.ownerDocument.selection.createRange();
        ***REMOVED***catch(e) ***REMOVED******REMOVED***
            if (!range || range.parentElement() != text) return false;
                return range.text == text.value;
    ***REMOVED***
***REMOVED***
    if (useragent.isOldIE) ***REMOVED***
        var inPropertyChange = false;
        var onPropertyChange = function(e)***REMOVED***
            if (inPropertyChange)
                return;
            var data = text.value;
            if (inComposition || !data || data == PLACEHOLDER)
                return;
            if (e && data == PLACEHOLDER[0])
                return syncProperty.schedule();

            sendText(data);
            inPropertyChange = true;
            resetValue();
            inPropertyChange = false;
    ***REMOVED***;
        var syncProperty = lang.delayedCall(onPropertyChange);
        event.addListener(text, "propertychange", onPropertyChange);

        var keytable = ***REMOVED*** 13:1, 27:1 ***REMOVED***;
        event.addListener(text, "keyup", function (e) ***REMOVED***
            if (inComposition && (!text.value || keytable[e.keyCode]))
                setTimeout(onCompositionEnd, 0);
            if ((text.value.charCodeAt(0)||0) < 129) ***REMOVED***
                return syncProperty.call();
        ***REMOVED***
            inComposition ? onCompositionUpdate() : onCompositionStart();
    ***REMOVED***);
        event.addListener(text, "keydown", function (e) ***REMOVED***
            syncProperty.schedule(50);
    ***REMOVED***);
***REMOVED***

    var onSelect = function(e) ***REMOVED***
        if (copied) ***REMOVED***
            copied = false;
    ***REMOVED*** else if (isAllSelected(text)) ***REMOVED***
            host.selectAll();
            resetSelection();
    ***REMOVED*** else if (inputHandler) ***REMOVED***
            resetSelection(host.selection.isEmpty());
    ***REMOVED***
***REMOVED***;

    var inputHandler = null;
    this.setInputHandler = function(cb) ***REMOVED***inputHandler = cb***REMOVED***;
    this.getInputHandler = function() ***REMOVED***return inputHandler***REMOVED***;
    var afterContextMenu = false;
    
    var sendText = function(data) ***REMOVED***
        if (inputHandler) ***REMOVED***
            data = inputHandler(data);
            inputHandler = null;
    ***REMOVED***
        if (pasted) ***REMOVED***
            resetSelection();
            if (data)
                host.onPaste(data);
            pasted = false;
    ***REMOVED*** else if (data == PLACEHOLDER.charAt(0)) ***REMOVED***
            if (afterContextMenu)
                host.execCommand("del", ***REMOVED***source: "ace"***REMOVED***);
            else // some versions of android do not fire keydown when pressing backspace
                host.execCommand("backspace", ***REMOVED***source: "ace"***REMOVED***);
    ***REMOVED*** else ***REMOVED***
            if (data.substring(0, 2) == PLACEHOLDER)
                data = data.substr(2);
            else if (data.charAt(0) == PLACEHOLDER.charAt(0))
                data = data.substr(1);
            else if (data.charAt(data.length - 1) == PLACEHOLDER.charAt(0))
                data = data.slice(0, -1);
            if (data.charAt(data.length - 1) == PLACEHOLDER.charAt(0))
                data = data.slice(0, -1);
            
            if (data)
                host.onTextInput(data);
    ***REMOVED***
        if (afterContextMenu)
            afterContextMenu = false;
***REMOVED***;
    var onInput = function(e) ***REMOVED***
        if (inComposition)
            return;
        var data = text.value;
        sendText(data);
        resetValue();
***REMOVED***;
    
    var handleClipboardData = function(e, data) ***REMOVED***
        var clipboardData = e.clipboardData || window.clipboardData;
        if (!clipboardData || BROKEN_SETDATA)
            return;
        var mime = USE_IE_MIME_TYPE ? "Text" : "text/plain";
        if (data) ***REMOVED***
            return clipboardData.setData(mime, data) !== false;
    ***REMOVED*** else ***REMOVED***
            return clipboardData.getData(mime);
    ***REMOVED***
***REMOVED***

    var doCopy = function(e, isCut) ***REMOVED***
        var data = host.getCopyText();
        if (!data)
            return event.preventDefault(e);

        if (handleClipboardData(e, data)) ***REMOVED***
            isCut ? host.onCut() : host.onCopy();
            event.preventDefault(e);
    ***REMOVED*** else ***REMOVED***
            copied = true;
            text.value = data;
            text.select();
            setTimeout(function()***REMOVED***
                copied = false;
                resetValue();
                resetSelection();
                isCut ? host.onCut() : host.onCopy();
        ***REMOVED***);
    ***REMOVED***
***REMOVED***;
    
    var onCut = function(e) ***REMOVED***
        doCopy(e, true);
***REMOVED***
    
    var onCopy = function(e) ***REMOVED***
        doCopy(e, false);
***REMOVED***
    
    var onPaste = function(e) ***REMOVED***
        var data = handleClipboardData(e);
        if (typeof data == "string") ***REMOVED***
            if (data)
                host.onPaste(data);
            if (useragent.isIE)
                setTimeout(resetSelection);
            event.preventDefault(e);
    ***REMOVED***
        else ***REMOVED***
            text.value = "";
            pasted = true;
    ***REMOVED***
***REMOVED***;

    event.addCommandKeyListener(text, host.onCommandKey.bind(host));

    event.addListener(text, "select", onSelect);

    event.addListener(text, "input", onInput);

    event.addListener(text, "cut", onCut);
    event.addListener(text, "copy", onCopy);
    event.addListener(text, "paste", onPaste);
    if (!('oncut' in text) || !('oncopy' in text) || !('onpaste' in text))***REMOVED***
        event.addListener(parentNode, "keydown", function(e) ***REMOVED***
            if ((useragent.isMac && !e.metaKey) || !e.ctrlKey)
                return;

            switch (e.keyCode) ***REMOVED***
                case 67:
                    onCopy(e);
                    break;
                case 86:
                    onPaste(e);
                    break;
                case 88:
                    onCut(e);
                    break;
        ***REMOVED***
    ***REMOVED***);
***REMOVED***
    var onCompositionStart = function(e) ***REMOVED***
        if (inComposition || !host.onCompositionStart) return;
        inComposition = ***REMOVED******REMOVED***;
        host.onCompositionStart();
        setTimeout(onCompositionUpdate, 0);
        host.on("mousedown", onCompositionEnd);
        if (!host.selection.isEmpty()) ***REMOVED***
            host.insert("");
            host.session.markUndoGroup();
            host.selection.clearSelection();
    ***REMOVED***
        host.session.markUndoGroup();
***REMOVED***;

    var onCompositionUpdate = function() ***REMOVED***
        if (!inComposition || !host.onCompositionUpdate) return;
        var val = text.value.replace(/\x01/g, "");
        if (inComposition.lastValue === val) return;
        
        host.onCompositionUpdate(val);
        if (inComposition.lastValue)
            host.undo();
        inComposition.lastValue = val;
        if (inComposition.lastValue) ***REMOVED***
            var r = host.selection.getRange();
            host.insert(inComposition.lastValue);
            host.session.markUndoGroup();
            inComposition.range = host.selection.getRange();
            host.selection.setRange(r);
            host.selection.clearSelection();
    ***REMOVED***
***REMOVED***;

    var onCompositionEnd = function(e) ***REMOVED***
        if (!host.onCompositionEnd) return;
        var c = inComposition;
        inComposition = false;
        var timer = setTimeout(function() ***REMOVED***
            timer = null;
            var str = text.value.replace(/\x01/g, "");
            if (inComposition)
                return
            else if (str == c.lastValue)
                resetValue();
            else if (!c.lastValue && str) ***REMOVED***
                resetValue();
                sendText(str);
        ***REMOVED***
    ***REMOVED***);
        inputHandler = function compositionInputHandler(str) ***REMOVED***
            if (timer)
                clearTimeout(timer);
            str = str.replace(/\x01/g, "");
            if (str == c.lastValue)
                return "";
            if (c.lastValue && timer)
                host.undo();
            return str;
    ***REMOVED***;
        host.onCompositionEnd();
        host.removeListener("mousedown", onCompositionEnd);
        if (e.type == "compositionend" && c.range) ***REMOVED***
            host.selection.setRange(c.range);
    ***REMOVED***
***REMOVED***;
    
    

    var syncComposition = lang.delayedCall(onCompositionUpdate, 50);

    event.addListener(text, "compositionstart", onCompositionStart);
    if (useragent.isGecko) ***REMOVED***
        event.addListener(text, "text", function()***REMOVED***syncComposition.schedule()***REMOVED***);
***REMOVED*** else ***REMOVED***
        event.addListener(text, "keyup", function()***REMOVED***syncComposition.schedule()***REMOVED***);
        event.addListener(text, "keydown", function()***REMOVED***syncComposition.schedule()***REMOVED***);
***REMOVED***
    event.addListener(text, "compositionend", onCompositionEnd);

    this.getElement = function() ***REMOVED***
        return text;
***REMOVED***;

    this.setReadOnly = function(readOnly) ***REMOVED***
       text.readOnly = readOnly;
***REMOVED***;

    this.onContextMenu = function(e) ***REMOVED***
        afterContextMenu = true;
        if (!tempStyle)
            tempStyle = text.style.cssText;

        text.style.cssText = "z-index:100000;" + (useragent.isIE ? "opacity:0.1;" : "");

        resetSelection(host.selection.isEmpty());
        host._emit("nativecontextmenu", ***REMOVED***target: host, domEvent: e***REMOVED***);
        var rect = host.container.getBoundingClientRect();
        var style = dom.computedStyle(host.container);
        var top = rect.top + (parseInt(style.borderTopWidth) || 0);
        var left = rect.left + (parseInt(rect.borderLeftWidth) || 0);
        var maxTop = rect.bottom - top - text.clientHeight;
        var move = function(e) ***REMOVED***
            text.style.left = e.clientX - left - 2 + "px";
            text.style.top = Math.min(e.clientY - top - 2, maxTop) + "px";
    ***REMOVED***; 
        move(e);

        if (e.type != "mousedown")
            return;

        if (host.renderer.$keepTextAreaAtCursor)
            host.renderer.$keepTextAreaAtCursor = null;
        if (useragent.isWin)
            event.capture(host.container, move, onContextMenuClose);
***REMOVED***;

    this.onContextMenuClose = onContextMenuClose;
    function onContextMenuClose() ***REMOVED***
        setTimeout(function () ***REMOVED***
            if (tempStyle) ***REMOVED***
                text.style.cssText = tempStyle;
                tempStyle = '';
        ***REMOVED***
            if (host.renderer.$keepTextAreaAtCursor == null) ***REMOVED***
                host.renderer.$keepTextAreaAtCursor = true;
                host.renderer.$moveTextAreaToCursor();
        ***REMOVED***
    ***REMOVED*** 0);
***REMOVED***
    if (!useragent.isGecko || useragent.isMac) ***REMOVED***
        var onContextMenu = function(e) ***REMOVED***
            host.textInput.onContextMenu(e);
            onContextMenuClose();
    ***REMOVED***;
        event.addListener(host.renderer.scroller, "contextmenu", onContextMenu);
        event.addListener(text, "contextmenu", onContextMenu);
***REMOVED***
***REMOVED***;

exports.TextInput = TextInput;
***REMOVED***);

__ace_shadowed__.define('ace/mouse/mouse_handler', ['require', 'exports', 'module' , 'ace/lib/event', 'ace/lib/useragent', 'ace/mouse/default_handlers', 'ace/mouse/default_gutter_handler', 'ace/mouse/mouse_event', 'ace/mouse/dragdrop_handler', 'ace/config'], function(require, exports, module) ***REMOVED***


var event = require("../lib/event");
var useragent = require("../lib/useragent");
var DefaultHandlers = require("./default_handlers").DefaultHandlers;
var DefaultGutterHandler = require("./default_gutter_handler").GutterHandler;
var MouseEvent = require("./mouse_event").MouseEvent;
var DragdropHandler = require("./dragdrop_handler").DragdropHandler;
var config = require("../config");

var MouseHandler = function(editor) ***REMOVED***
    this.editor = editor;

    new DefaultHandlers(this);
    new DefaultGutterHandler(this);
    new DragdropHandler(this);
    
    var focusEditor = function(e) ***REMOVED*** editor.focus() ***REMOVED***;
    
    var mouseTarget = editor.renderer.getMouseEventTarget();
    event.addListener(mouseTarget, "click", this.onMouseEvent.bind(this, "click"));
    event.addListener(mouseTarget, "mousemove", this.onMouseMove.bind(this, "mousemove"));
    event.addMultiMouseDownListener(mouseTarget, [400, 300, 250], this, "onMouseEvent");
    if (editor.renderer.scrollBarV) ***REMOVED***
        event.addMultiMouseDownListener(editor.renderer.scrollBarV.inner, [400, 300, 250], this, "onMouseEvent");
        event.addMultiMouseDownListener(editor.renderer.scrollBarH.inner, [400, 300, 250], this, "onMouseEvent");
        if (useragent.isIE) ***REMOVED***
            event.addListener(editor.renderer.scrollBarV.element, "mousedown", focusEditor);
            event.addListener(editor.renderer.scrollBarH.element, "mousemove", focusEditor);
    ***REMOVED***
***REMOVED***
    event.addMouseWheelListener(editor.container, this.onMouseWheel.bind(this, "mousewheel"));

    var gutterEl = editor.renderer.$gutter;
    event.addListener(gutterEl, "mousedown", this.onMouseEvent.bind(this, "guttermousedown"));
    event.addListener(gutterEl, "click", this.onMouseEvent.bind(this, "gutterclick"));
    event.addListener(gutterEl, "dblclick", this.onMouseEvent.bind(this, "gutterdblclick"));
    event.addListener(gutterEl, "mousemove", this.onMouseEvent.bind(this, "guttermousemove"));

    event.addListener(mouseTarget, "mousedown", focusEditor);

    event.addListener(gutterEl, "mousedown", function(e) ***REMOVED***
        editor.focus();
        return event.preventDefault(e);
***REMOVED***);
***REMOVED***;

(function() ***REMOVED***
    this.onMouseEvent = function(name, e) ***REMOVED***
        this.editor._emit(name, new MouseEvent(e, this.editor));
***REMOVED***;

    this.onMouseMove = function(name, e) ***REMOVED***
        var listeners = this.editor._eventRegistry && this.editor._eventRegistry.mousemove;
        if (!listeners || !listeners.length)
            return;

        this.editor._emit(name, new MouseEvent(e, this.editor));
***REMOVED***;

    this.onMouseWheel = function(name, e) ***REMOVED***
        var mouseEvent = new MouseEvent(e, this.editor);
        mouseEvent.speed = this.$scrollSpeed * 2;
        mouseEvent.wheelX = e.wheelX;
        mouseEvent.wheelY = e.wheelY;

        this.editor._emit(name, mouseEvent);
***REMOVED***;

    this.setState = function(state) ***REMOVED***
        this.state = state;
***REMOVED***;

    this.captureMouse = function(ev, mouseMoveHandler) ***REMOVED***
        this.x = ev.x;
        this.y = ev.y;

        this.isMousePressed = true;
        var renderer = this.editor.renderer;
        if (renderer.$keepTextAreaAtCursor)
            renderer.$keepTextAreaAtCursor = null;

        var self = this;
        var onMouseMove = function(e) ***REMOVED***
            if (!e) return;
            if (useragent.isWebKit && !e.which && self.releaseMouse)
                return self.releaseMouse();

            self.x = e.clientX;
            self.y = e.clientY;
            mouseMoveHandler && mouseMoveHandler(e);
            self.mouseEvent = new MouseEvent(e, self.editor);
            self.$mouseMoved = true;
    ***REMOVED***;

        var onCaptureEnd = function(e) ***REMOVED***
            clearInterval(timerId);
            onCaptureInterval();
            self[self.state + "End"] && self[self.state + "End"](e);
            self.state = "";
            if (renderer.$keepTextAreaAtCursor == null) ***REMOVED***
                renderer.$keepTextAreaAtCursor = true;
                renderer.$moveTextAreaToCursor();
        ***REMOVED***
            self.isMousePressed = false;
            self.$onCaptureMouseMove = self.releaseMouse = null;
            e && self.onMouseEvent("mouseup", e);
    ***REMOVED***;

        var onCaptureInterval = function() ***REMOVED***
            self[self.state] && self[self.state]();
            self.$mouseMoved = false;
    ***REMOVED***;

        if (useragent.isOldIE && ev.domEvent.type == "dblclick") ***REMOVED***
            return setTimeout(function() ***REMOVED***onCaptureEnd(ev);***REMOVED***);
    ***REMOVED***

        self.$onCaptureMouseMove = onMouseMove;
        self.releaseMouse = event.capture(this.editor.container, onMouseMove, onCaptureEnd);
        var timerId = setInterval(onCaptureInterval, 20);
***REMOVED***;
    this.releaseMouse = null;
***REMOVED***).call(MouseHandler.prototype);

config.defineOptions(MouseHandler.prototype, "mouseHandler", ***REMOVED***
    scrollSpeed: ***REMOVED***initialValue: 2***REMOVED***,
    dragDelay: ***REMOVED***initialValue: 150***REMOVED***,
    dragEnabled: ***REMOVED***initialValue: true***REMOVED***,
    focusTimout: ***REMOVED***initialValue: 0***REMOVED***,
    tooltipFollowsMouse: ***REMOVED***initialValue: true***REMOVED***
***REMOVED***);


exports.MouseHandler = MouseHandler;
***REMOVED***);

__ace_shadowed__.define('ace/mouse/default_handlers', ['require', 'exports', 'module' , 'ace/lib/dom', 'ace/lib/event', 'ace/lib/useragent'], function(require, exports, module) ***REMOVED***


var dom = require("../lib/dom");
var event = require("../lib/event");
var useragent = require("../lib/useragent");

var DRAG_OFFSET = 0; // pixels

function DefaultHandlers(mouseHandler) ***REMOVED***
    mouseHandler.$clickSelection = null;

    var editor = mouseHandler.editor;
    editor.setDefaultHandler("mousedown", this.onMouseDown.bind(mouseHandler));
    editor.setDefaultHandler("dblclick", this.onDoubleClick.bind(mouseHandler));
    editor.setDefaultHandler("tripleclick", this.onTripleClick.bind(mouseHandler));
    editor.setDefaultHandler("quadclick", this.onQuadClick.bind(mouseHandler));
    editor.setDefaultHandler("mousewheel", this.onMouseWheel.bind(mouseHandler));

    var exports = ["select", "startSelect", "selectEnd", "selectAllEnd", "selectByWordsEnd",
        "selectByLinesEnd", "dragWait", "dragWaitEnd", "focusWait"];

    exports.forEach(function(x) ***REMOVED***
        mouseHandler[x] = this[x];
***REMOVED*** this);

    mouseHandler.selectByLines = this.extendSelectionBy.bind(mouseHandler, "getLineRange");
    mouseHandler.selectByWords = this.extendSelectionBy.bind(mouseHandler, "getWordRange");
***REMOVED***

(function() ***REMOVED***

    this.onMouseDown = function(ev) ***REMOVED***
        var inSelection = ev.inSelection();
        var pos = ev.getDocumentPosition();
        this.mousedownEvent = ev;
        var editor = this.editor;

        var button = ev.getButton();
        if (button !== 0) ***REMOVED***
            var selectionRange = editor.getSelectionRange();
            var selectionEmpty = selectionRange.isEmpty();

            if (selectionEmpty) ***REMOVED***
                editor.selection.moveToPosition(pos);
        ***REMOVED***
            editor.textInput.onContextMenu(ev.domEvent);
            return; // stopping event here breaks contextmenu on ff mac
    ***REMOVED***
        if (inSelection && !editor.isFocused()) ***REMOVED***
            editor.focus();
            if (this.$focusTimout && !this.$clickSelection && !editor.inMultiSelectMode) ***REMOVED***
                this.mousedownEvent.time = Date.now();
                this.setState("focusWait");
                this.captureMouse(ev);
                return;
        ***REMOVED***
    ***REMOVED***

        this.captureMouse(ev);
        if (!inSelection || this.$clickSelection || ev.getShiftKey() || editor.inMultiSelectMode) ***REMOVED***
            this.startSelect(pos);
    ***REMOVED*** else if (inSelection) ***REMOVED***
            this.mousedownEvent.time = Date.now();
            this.startSelect(pos);
    ***REMOVED***
        return ev.preventDefault();
***REMOVED***;

    this.startSelect = function(pos) ***REMOVED***
        pos = pos || this.editor.renderer.screenToTextCoordinates(this.x, this.y);
        var editor = this.editor;
        var shiftPressed = this.mousedownEvent.getShiftKey();
        if (shiftPressed) ***REMOVED***
            editor.selection.selectToPosition(pos);
    ***REMOVED***
        else if (!this.$clickSelection) ***REMOVED***
            editor.selection.moveToPosition(pos);
    ***REMOVED***
        if (editor.renderer.scroller.setCapture) ***REMOVED***
            editor.renderer.scroller.setCapture();
    ***REMOVED***
        editor.setStyle("ace_selecting");
        this.setState("select");
***REMOVED***;

    this.select = function() ***REMOVED***
        var anchor, editor = this.editor;
        var cursor = editor.renderer.screenToTextCoordinates(this.x, this.y);

        if (this.$clickSelection) ***REMOVED***
            var cmp = this.$clickSelection.comparePoint(cursor);

            if (cmp == -1) ***REMOVED***
                anchor = this.$clickSelection.end;
        ***REMOVED*** else if (cmp == 1) ***REMOVED***
                anchor = this.$clickSelection.start;
        ***REMOVED*** else ***REMOVED***
                var orientedRange = calcRangeOrientation(this.$clickSelection, cursor);
                cursor = orientedRange.cursor;
                anchor = orientedRange.anchor;
        ***REMOVED***
            editor.selection.setSelectionAnchor(anchor.row, anchor.column);
    ***REMOVED***
        editor.selection.selectToPosition(cursor);

        editor.renderer.scrollCursorIntoView();
***REMOVED***;

    this.extendSelectionBy = function(unitName) ***REMOVED***
        var anchor, editor = this.editor;
        var cursor = editor.renderer.screenToTextCoordinates(this.x, this.y);
        var range = editor.selection[unitName](cursor.row, cursor.column);

        if (this.$clickSelection) ***REMOVED***
            var cmpStart = this.$clickSelection.comparePoint(range.start);
            var cmpEnd = this.$clickSelection.comparePoint(range.end);

            if (cmpStart == -1 && cmpEnd <= 0) ***REMOVED***
                anchor = this.$clickSelection.end;
                if (range.end.row != cursor.row || range.end.column != cursor.column)
                    cursor = range.start;
        ***REMOVED*** else if (cmpEnd == 1 && cmpStart >= 0) ***REMOVED***
                anchor = this.$clickSelection.start;
                if (range.start.row != cursor.row || range.start.column != cursor.column)
                    cursor = range.end;
        ***REMOVED*** else if (cmpStart == -1 && cmpEnd == 1) ***REMOVED***
                cursor = range.end;
                anchor = range.start;
        ***REMOVED*** else ***REMOVED***
                var orientedRange = calcRangeOrientation(this.$clickSelection, cursor);
                cursor = orientedRange.cursor;
                anchor = orientedRange.anchor;
        ***REMOVED***
            editor.selection.setSelectionAnchor(anchor.row, anchor.column);
    ***REMOVED***
        editor.selection.selectToPosition(cursor);

        editor.renderer.scrollCursorIntoView();
***REMOVED***;

    this.selectEnd =
    this.selectAllEnd =
    this.selectByWordsEnd =
    this.selectByLinesEnd = function() ***REMOVED***
        this.$clickSelection = null;
        this.editor.unsetStyle("ace_selecting");
        if (this.editor.renderer.scroller.releaseCapture) ***REMOVED***
            this.editor.renderer.scroller.releaseCapture();
    ***REMOVED***
***REMOVED***;

    this.focusWait = function() ***REMOVED***
        var distance = calcDistance(this.mousedownEvent.x, this.mousedownEvent.y, this.x, this.y);
        var time = Date.now();

        if (distance > DRAG_OFFSET || time - this.mousedownEvent.time > this.$focusTimout)
            this.startSelect(this.mousedownEvent.getDocumentPosition());
***REMOVED***;

    this.onDoubleClick = function(ev) ***REMOVED***
        var pos = ev.getDocumentPosition();
        var editor = this.editor;
        var session = editor.session;

        var range = session.getBracketRange(pos);
        if (range) ***REMOVED***
            if (range.isEmpty()) ***REMOVED***
                range.start.column--;
                range.end.column++;
        ***REMOVED***
            this.setState("select");
    ***REMOVED*** else ***REMOVED***
            range = editor.selection.getWordRange(pos.row, pos.column);
            this.setState("selectByWords");
    ***REMOVED***
        this.$clickSelection = range;
        this[this.state] && this[this.state](ev);
***REMOVED***;

    this.onTripleClick = function(ev) ***REMOVED***
        var pos = ev.getDocumentPosition();
        var editor = this.editor;

        this.setState("selectByLines");
        this.$clickSelection = editor.selection.getLineRange(pos.row);
        this[this.state] && this[this.state](ev);
***REMOVED***;

    this.onQuadClick = function(ev) ***REMOVED***
        var editor = this.editor;

        editor.selectAll();
        this.$clickSelection = editor.getSelectionRange();
        this.setState("selectAll");
***REMOVED***;

    this.onMouseWheel = function(ev) ***REMOVED***
        if (ev.getAccelKey())
            return;
        if (ev.getShiftKey() && ev.wheelY && !ev.wheelX) ***REMOVED***
            ev.wheelX = ev.wheelY;
            ev.wheelY = 0;
    ***REMOVED***

        var t = ev.domEvent.timeStamp;
        var dt = t - (this.$lastScrollTime||0);
        
        var editor = this.editor;
        var isScrolable = editor.renderer.isScrollableBy(ev.wheelX * ev.speed, ev.wheelY * ev.speed);
        if (isScrolable || dt < 200) ***REMOVED***
            this.$lastScrollTime = t;
            editor.renderer.scrollBy(ev.wheelX * ev.speed, ev.wheelY * ev.speed);
            return ev.stop();
    ***REMOVED***
***REMOVED***;

***REMOVED***).call(DefaultHandlers.prototype);

exports.DefaultHandlers = DefaultHandlers;

function calcDistance(ax, ay, bx, by) ***REMOVED***
    return Math.sqrt(Math.pow(bx - ax, 2) + Math.pow(by - ay, 2));
***REMOVED***

function calcRangeOrientation(range, cursor) ***REMOVED***
    if (range.start.row == range.end.row)
        var cmp = 2 * cursor.column - range.start.column - range.end.column;
    else if (range.start.row == range.end.row - 1 && !range.start.column && !range.end.column)
        var cmp = cursor.column - 4;
    else
        var cmp = 2 * cursor.row - range.start.row - range.end.row;

    if (cmp < 0)
        return ***REMOVED***cursor: range.start, anchor: range.end***REMOVED***;
    else
        return ***REMOVED***cursor: range.end, anchor: range.start***REMOVED***;
***REMOVED***

***REMOVED***);

__ace_shadowed__.define('ace/mouse/default_gutter_handler', ['require', 'exports', 'module' , 'ace/lib/dom', 'ace/lib/oop', 'ace/lib/event', 'ace/tooltip'], function(require, exports, module) ***REMOVED***

var dom = require("../lib/dom");
var oop = require("../lib/oop");
var event = require("../lib/event");
var Tooltip = require("../tooltip").Tooltip;

function GutterHandler(mouseHandler) ***REMOVED***
    var editor = mouseHandler.editor;
    var gutter = editor.renderer.$gutterLayer;
    var tooltip = new GutterTooltip(editor.container);

    mouseHandler.editor.setDefaultHandler("guttermousedown", function(e) ***REMOVED***
        if (!editor.isFocused() || e.getButton() != 0)
            return;
        var gutterRegion = gutter.getRegion(e);

        if (gutterRegion == "foldWidgets")
            return;

        var row = e.getDocumentPosition().row;
        var selection = editor.session.selection;

        if (e.getShiftKey())
            selection.selectTo(row, 0);
        else ***REMOVED***
            if (e.domEvent.detail == 2) ***REMOVED***
                editor.selectAll();
                return e.preventDefault();
        ***REMOVED***
            mouseHandler.$clickSelection = editor.selection.getLineRange(row);
    ***REMOVED***
        mouseHandler.setState("selectByLines");
        mouseHandler.captureMouse(e);
        return e.preventDefault();
***REMOVED***);


    var tooltipTimeout, mouseEvent, tooltipAnnotation;

    function showTooltip() ***REMOVED***
        var row = mouseEvent.getDocumentPosition().row;
        var annotation = gutter.$annotations[row];
        if (!annotation)
            return hideTooltip();

        var maxRow = editor.session.getLength();
        if (row == maxRow) ***REMOVED***
            var screenRow = editor.renderer.pixelToScreenCoordinates(0, mouseEvent.y).row;
            var pos = mouseEvent.$pos;
            if (screenRow > editor.session.documentToScreenRow(pos.row, pos.column))
                return hideTooltip();
    ***REMOVED***

        if (tooltipAnnotation == annotation)
            return;
        tooltipAnnotation = annotation.text.join("<br/>");

        tooltip.setHtml(tooltipAnnotation);
        tooltip.show();
        editor.on("mousewheel", hideTooltip);

        if (mouseHandler.$tooltipFollowsMouse) ***REMOVED***
            moveTooltip(mouseEvent);
    ***REMOVED*** else ***REMOVED***
            var gutterElement = gutter.$cells[editor.session.documentToScreenRow(row, 0)].element;
            var rect = gutterElement.getBoundingClientRect();
            var style = tooltip.getElement().style;
            style.left = rect.right + "px";
            style.top = rect.bottom + "px";
    ***REMOVED***
***REMOVED***

    function hideTooltip() ***REMOVED***
        if (tooltipTimeout)
            tooltipTimeout = clearTimeout(tooltipTimeout);
        if (tooltipAnnotation) ***REMOVED***
            tooltip.hide();
            tooltipAnnotation = null;
            editor.removeEventListener("mousewheel", hideTooltip);
    ***REMOVED***
***REMOVED***

    function moveTooltip(e) ***REMOVED***
        tooltip.setPosition(e.x, e.y);
***REMOVED***

    mouseHandler.editor.setDefaultHandler("guttermousemove", function(e) ***REMOVED***
        var target = e.domEvent.target || e.domEvent.srcElement;
        if (dom.hasCssClass(target, "ace_fold-widget"))
            return hideTooltip();

        if (tooltipAnnotation && mouseHandler.$tooltipFollowsMouse)
            moveTooltip(e);

        mouseEvent = e;
        if (tooltipTimeout)
            return;
        tooltipTimeout = setTimeout(function() ***REMOVED***
            tooltipTimeout = null;
            if (mouseEvent && !mouseHandler.isMousePressed)
                showTooltip();
            else
                hideTooltip();
    ***REMOVED*** 50);
***REMOVED***);

    event.addListener(editor.renderer.$gutter, "mouseout", function(e) ***REMOVED***
        mouseEvent = null;
        if (!tooltipAnnotation || tooltipTimeout)
            return;

        tooltipTimeout = setTimeout(function() ***REMOVED***
            tooltipTimeout = null;
            hideTooltip();
    ***REMOVED*** 50);
***REMOVED***);
    
    editor.on("changeSession", hideTooltip);
***REMOVED***

function GutterTooltip(parentNode) ***REMOVED***
    Tooltip.call(this, parentNode);
***REMOVED***

oop.inherits(GutterTooltip, Tooltip);

(function()***REMOVED***
    this.setPosition = function(x, y) ***REMOVED***
        var windowWidth = window.innerWidth || document.documentElement.clientWidth;
        var windowHeight = window.innerHeight || document.documentElement.clientHeight;
        var width = this.getWidth();
        var height = this.getHeight();
        x += 15;
        y += 15;
        if (x + width > windowWidth) ***REMOVED***
            x -= (x + width) - windowWidth;
    ***REMOVED***
        if (y + height > windowHeight) ***REMOVED***
            y -= 20 + height;
    ***REMOVED***
        Tooltip.prototype.setPosition.call(this, x, y);
***REMOVED***;

***REMOVED***).call(GutterTooltip.prototype);



exports.GutterHandler = GutterHandler;

***REMOVED***);

__ace_shadowed__.define('ace/tooltip', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/lib/dom'], function(require, exports, module) ***REMOVED***


var oop = require("./lib/oop");
var dom = require("./lib/dom");
function Tooltip (parentNode) ***REMOVED***
    this.isOpen = false;
    this.$element = null;
    this.$parentNode = parentNode;
***REMOVED***

(function() ***REMOVED***
    this.$init = function() ***REMOVED***
        this.$element = dom.createElement("div");
        this.$element.className = "ace_tooltip";
        this.$element.style.display = "none";
        this.$parentNode.appendChild(this.$element);
        return this.$element;
***REMOVED***;
    this.getElement = function() ***REMOVED***
        return this.$element || this.$init();
***REMOVED***;
    this.setText = function(text) ***REMOVED***
        dom.setInnerText(this.getElement(), text);
***REMOVED***;
    this.setHtml = function(html) ***REMOVED***
        this.getElement().innerHTML = html;
***REMOVED***;
    this.setPosition = function(x, y) ***REMOVED***
        this.getElement().style.left = x + "px";
        this.getElement().style.top = y + "px";
***REMOVED***;
    this.setClassName = function(className) ***REMOVED***
        dom.addCssClass(this.getElement(), className);
***REMOVED***;
    this.show = function(text, x, y) ***REMOVED***
        if (text != null)
            this.setText(text);
        if (x != null && y != null)
            this.setPosition(x, y);
        if (!this.isOpen) ***REMOVED***
            this.getElement().style.display = "block";
            this.isOpen = true;
    ***REMOVED***
***REMOVED***;

    this.hide = function() ***REMOVED***
        if (this.isOpen) ***REMOVED***
            this.getElement().style.display = "none";
            this.isOpen = false;
    ***REMOVED***
***REMOVED***;
    this.getHeight = function() ***REMOVED***
        return this.getElement().offsetHeight;
***REMOVED***;
    this.getWidth = function() ***REMOVED***
        return this.getElement().offsetWidth;
***REMOVED***;

***REMOVED***).call(Tooltip.prototype);

exports.Tooltip = Tooltip;
***REMOVED***);

__ace_shadowed__.define('ace/mouse/mouse_event', ['require', 'exports', 'module' , 'ace/lib/event', 'ace/lib/useragent'], function(require, exports, module) ***REMOVED***


var event = require("../lib/event");
var useragent = require("../lib/useragent");
var MouseEvent = exports.MouseEvent = function(domEvent, editor) ***REMOVED***
    this.domEvent = domEvent;
    this.editor = editor;
    
    this.x = this.clientX = domEvent.clientX;
    this.y = this.clientY = domEvent.clientY;

    this.$pos = null;
    this.$inSelection = null;
    
    this.propagationStopped = false;
    this.defaultPrevented = false;
***REMOVED***;

(function() ***REMOVED***  
    
    this.stopPropagation = function() ***REMOVED***
        event.stopPropagation(this.domEvent);
        this.propagationStopped = true;
***REMOVED***;
    
    this.preventDefault = function() ***REMOVED***
        event.preventDefault(this.domEvent);
        this.defaultPrevented = true;
***REMOVED***;
    
    this.stop = function() ***REMOVED***
        this.stopPropagation();
        this.preventDefault();
***REMOVED***;
    this.getDocumentPosition = function() ***REMOVED***
        if (this.$pos)
            return this.$pos;
        
        this.$pos = this.editor.renderer.screenToTextCoordinates(this.clientX, this.clientY);
        return this.$pos;
***REMOVED***;
    this.inSelection = function() ***REMOVED***
        if (this.$inSelection !== null)
            return this.$inSelection;
            
        var editor = this.editor;
        

        var selectionRange = editor.getSelectionRange();
        if (selectionRange.isEmpty())
            this.$inSelection = false;
        else ***REMOVED***
            var pos = this.getDocumentPosition();
            this.$inSelection = selectionRange.contains(pos.row, pos.column);
    ***REMOVED***

        return this.$inSelection;
***REMOVED***;
    this.getButton = function() ***REMOVED***
        return event.getButton(this.domEvent);
***REMOVED***;
    this.getShiftKey = function() ***REMOVED***
        return this.domEvent.shiftKey;
***REMOVED***;
    
    this.getAccelKey = useragent.isMac
        ? function() ***REMOVED*** return this.domEvent.metaKey; ***REMOVED***
        : function() ***REMOVED*** return this.domEvent.ctrlKey; ***REMOVED***;
    
***REMOVED***).call(MouseEvent.prototype);

***REMOVED***);

__ace_shadowed__.define('ace/mouse/dragdrop_handler', ['require', 'exports', 'module' , 'ace/lib/dom', 'ace/lib/event', 'ace/lib/useragent'], function(require, exports, module) ***REMOVED***


var dom = require("../lib/dom");
var event = require("../lib/event");
var useragent = require("../lib/useragent");

var AUTOSCROLL_DELAY = 200;
var SCROLL_CURSOR_DELAY = 200;
var SCROLL_CURSOR_HYSTERESIS = 5;

function DragdropHandler(mouseHandler) ***REMOVED***

    var editor = mouseHandler.editor;

    var blankImage = dom.createElement("img");
    blankImage.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
    if (useragent.isOpera)
        blankImage.style.cssText = "width:1px;height:1px;position:fixed;top:0;left:0;z-index:2147483647;opacity:0;";

    var exports = ["dragWait", "dragWaitEnd", "startDrag", "dragReadyEnd", "onMouseDrag"];

     exports.forEach(function(x) ***REMOVED***
         mouseHandler[x] = this[x];
***REMOVED*** this);
    editor.addEventListener("mousedown", this.onMouseDown.bind(mouseHandler));


    var mouseTarget = editor.container;
    var dragSelectionMarker, x, y;
    var timerId, range;
    var dragCursor, counter = 0;
    var dragOperation;
    var isInternal;
    var autoScrollStartTime;
    var cursorMovedTime;
    var cursorPointOnCaretMoved;

    this.onDragStart = function(e) ***REMOVED***
        if (this.cancelDrag || !mouseTarget.draggable) ***REMOVED***
            var self = this;
            setTimeout(function()***REMOVED***
                self.startSelect();
                self.captureMouse(e);
        ***REMOVED*** 0);
            return e.preventDefault();
    ***REMOVED***
        range = editor.getSelectionRange();

        var dataTransfer = e.dataTransfer;
        dataTransfer.effectAllowed = editor.getReadOnly() ? "copy" : "copyMove";
        if (useragent.isOpera) ***REMOVED***
            editor.container.appendChild(blankImage);
            blankImage._top = blankImage.offsetTop;
    ***REMOVED***
        dataTransfer.setDragImage && dataTransfer.setDragImage(blankImage, 0, 0);
        if (useragent.isOpera) ***REMOVED***
            editor.container.removeChild(blankImage);
    ***REMOVED***
        dataTransfer.clearData();
        dataTransfer.setData("Text", editor.session.getTextRange());

        isInternal = true;
        this.setState("drag");
***REMOVED***;

    this.onDragEnd = function(e) ***REMOVED***
        mouseTarget.draggable = false;
        isInternal = false;
        this.setState(null);
        if (!editor.getReadOnly()) ***REMOVED***
            var dropEffect = e.dataTransfer.dropEffect;
            if (!dragOperation && dropEffect == "move")
                editor.session.remove(editor.getSelectionRange());
            editor.renderer.$cursorLayer.setBlinking(true);
    ***REMOVED***
        this.editor.unsetStyle("ace_dragging");
***REMOVED***;

    this.onDragEnter = function(e) ***REMOVED***
        if (editor.getReadOnly() || !canAccept(e.dataTransfer))
            return;
        if (!dragSelectionMarker)
            addDragMarker();
        counter++;
        e.dataTransfer.dropEffect = dragOperation = getDropEffect(e);
        return event.preventDefault(e);
***REMOVED***;

    this.onDragOver = function(e) ***REMOVED***
        if (editor.getReadOnly() || !canAccept(e.dataTransfer))
            return;
        if (!dragSelectionMarker) ***REMOVED***
            addDragMarker();
            counter++;
    ***REMOVED***
        if (onMouseMoveTimer !== null)
            onMouseMoveTimer = null;
        x = e.clientX;
        y = e.clientY;

        e.dataTransfer.dropEffect = dragOperation = getDropEffect(e);
        return event.preventDefault(e);
***REMOVED***;

    this.onDragLeave = function(e) ***REMOVED***
        counter--;
        if (counter <= 0 && dragSelectionMarker) ***REMOVED***
            clearDragMarker();
            dragOperation = null;
            return event.preventDefault(e);
    ***REMOVED***
***REMOVED***;

    this.onDrop = function(e) ***REMOVED***
        if (!dragSelectionMarker)
            return;
        var dataTransfer = e.dataTransfer;
        if (isInternal) ***REMOVED***
            switch (dragOperation) ***REMOVED***
                case "move":
                    if (range.contains(dragCursor.row, dragCursor.column)) ***REMOVED***
                        range = ***REMOVED***
                            start: dragCursor,
                            end: dragCursor
                    ***REMOVED***;
                ***REMOVED*** else ***REMOVED***
                        range = editor.moveText(range, dragCursor);
                ***REMOVED***
                    break;
                case "copy":
                    range = editor.moveText(range, dragCursor, true);
                    break;
        ***REMOVED***
    ***REMOVED*** else ***REMOVED***
            var dropData = dataTransfer.getData('Text');
            range = ***REMOVED***
                start: dragCursor,
                end: editor.session.insert(dragCursor, dropData)
        ***REMOVED***;
            editor.focus();
            dragOperation = null;
    ***REMOVED***
        clearDragMarker();
        return event.preventDefault(e);
***REMOVED***;

    event.addListener(mouseTarget, "dragstart", this.onDragStart.bind(mouseHandler));
    event.addListener(mouseTarget, "dragend", this.onDragEnd.bind(mouseHandler));
    event.addListener(mouseTarget, "dragenter", this.onDragEnter.bind(mouseHandler));
    event.addListener(mouseTarget, "dragover", this.onDragOver.bind(mouseHandler));
    event.addListener(mouseTarget, "dragleave", this.onDragLeave.bind(mouseHandler));
    event.addListener(mouseTarget, "drop", this.onDrop.bind(mouseHandler));

    function scrollCursorIntoView(cursor, prevCursor) ***REMOVED***
        var now = Date.now();
        var vMovement = !prevCursor || cursor.row != prevCursor.row;
        var hMovement = !prevCursor || cursor.column != prevCursor.column;
        if (!cursorMovedTime || vMovement || hMovement) ***REMOVED***
            editor.$blockScrolling += 1;
            editor.moveCursorToPosition(cursor);
            editor.$blockScrolling -= 1;
            cursorMovedTime = now;
            cursorPointOnCaretMoved = ***REMOVED***x: x, y: y***REMOVED***;
    ***REMOVED*** else ***REMOVED***
            var distance = calcDistance(cursorPointOnCaretMoved.x, cursorPointOnCaretMoved.y, x, y);
            if (distance > SCROLL_CURSOR_HYSTERESIS) ***REMOVED***
                cursorMovedTime = null;
        ***REMOVED*** else if (now - cursorMovedTime >= SCROLL_CURSOR_DELAY) ***REMOVED***
                editor.renderer.scrollCursorIntoView();
                cursorMovedTime = null;
        ***REMOVED***
    ***REMOVED***
***REMOVED***

    function autoScroll(cursor, prevCursor) ***REMOVED***
        var now = Date.now();
        var lineHeight = editor.renderer.layerConfig.lineHeight;
        var characterWidth = editor.renderer.layerConfig.characterWidth;
        var editorRect = editor.renderer.scroller.getBoundingClientRect();
        var offsets = ***REMOVED***
           x: ***REMOVED***
               left: x - editorRect.left,
               right: editorRect.right - x
       ***REMOVED***
           y: ***REMOVED***
               top: y - editorRect.top,
               bottom: editorRect.bottom - y
       ***REMOVED***
    ***REMOVED***;
        var nearestXOffset = Math.min(offsets.x.left, offsets.x.right);
        var nearestYOffset = Math.min(offsets.y.top, offsets.y.bottom);
        var scrollCursor = ***REMOVED***row: cursor.row, column: cursor.column***REMOVED***;
        if (nearestXOffset / characterWidth <= 2) ***REMOVED***
            scrollCursor.column += (offsets.x.left < offsets.x.right ? -3 : +2);
    ***REMOVED***
        if (nearestYOffset / lineHeight <= 1) ***REMOVED***
            scrollCursor.row += (offsets.y.top < offsets.y.bottom ? -1 : +1);
    ***REMOVED***
        var vScroll = cursor.row != scrollCursor.row;
        var hScroll = cursor.column != scrollCursor.column;
        var vMovement = !prevCursor || cursor.row != prevCursor.row;
        if (vScroll || (hScroll && !vMovement)) ***REMOVED***
            if (!autoScrollStartTime)
                autoScrollStartTime = now;
            else if (now - autoScrollStartTime >= AUTOSCROLL_DELAY)
                editor.renderer.scrollCursorIntoView(scrollCursor);
    ***REMOVED*** else ***REMOVED***
            autoScrollStartTime = null;
    ***REMOVED***
***REMOVED***

    function onDragInterval() ***REMOVED***
        var prevCursor = dragCursor;
        dragCursor = editor.renderer.screenToTextCoordinates(x, y);
        scrollCursorIntoView(dragCursor, prevCursor);
        autoScroll(dragCursor, prevCursor);
***REMOVED***

    function addDragMarker() ***REMOVED***
        range = editor.selection.toOrientedRange();
        dragSelectionMarker = editor.session.addMarker(range, "ace_selection", editor.getSelectionStyle());
        editor.clearSelection();
        if (editor.isFocused())
            editor.renderer.$cursorLayer.setBlinking(false);
        clearInterval(timerId);
        timerId = setInterval(onDragInterval, 20);
        counter = 0;
        event.addListener(document, "mousemove", onMouseMove);
***REMOVED***

    function clearDragMarker() ***REMOVED***
        clearInterval(timerId);
        editor.session.removeMarker(dragSelectionMarker);
        dragSelectionMarker = null;
        editor.$blockScrolling += 1;
        editor.selection.fromOrientedRange(range);
        editor.$blockScrolling -= 1;
        if (editor.isFocused() && !isInternal)
            editor.renderer.$cursorLayer.setBlinking(!editor.getReadOnly());
        range = null;
        counter = 0;
        autoScrollStartTime = null;
        cursorMovedTime = null;
        event.removeListener(document, "mousemove", onMouseMove);
***REMOVED***
    var onMouseMoveTimer = null;
    function onMouseMove() ***REMOVED***
        if (onMouseMoveTimer == null) ***REMOVED***
            onMouseMoveTimer = setTimeout(function() ***REMOVED***
                if (onMouseMoveTimer != null && dragSelectionMarker)
                    clearDragMarker();
        ***REMOVED*** 20);
    ***REMOVED***
***REMOVED***

    function canAccept(dataTransfer) ***REMOVED***
        var types = dataTransfer.types;
        return !types || Array.prototype.some.call(types, function(type) ***REMOVED***
            return type == 'text/plain' || type == 'Text';
    ***REMOVED***);
***REMOVED***

    function getDropEffect(e) ***REMOVED***
        var copyAllowed = ['copy', 'copymove', 'all', 'uninitialized'];
        var moveAllowed = ['move', 'copymove', 'linkmove', 'all', 'uninitialized'];

        var copyModifierState = useragent.isMac ? e.altKey : e.ctrlKey;
        var effectAllowed = "uninitialized";
        try ***REMOVED***
            effectAllowed = e.dataTransfer.effectAllowed.toLowerCase();
    ***REMOVED*** catch (e) ***REMOVED******REMOVED***
        var dropEffect = "none";

        if (copyModifierState && copyAllowed.indexOf(effectAllowed) >= 0)
            dropEffect = "copy";
        else if (moveAllowed.indexOf(effectAllowed) >= 0)
            dropEffect = "move";
        else if (copyAllowed.indexOf(effectAllowed) >= 0)
            dropEffect = "copy";

        return dropEffect;
***REMOVED***
***REMOVED***

(function() ***REMOVED***

    this.dragWait = function() ***REMOVED***
        var interval = Date.now() - this.mousedownEvent.time;
        if (interval > this.editor.getDragDelay())
            this.startDrag();
***REMOVED***;

    this.dragWaitEnd = function() ***REMOVED***
        var target = this.editor.container;
        target.draggable = false;
        this.startSelect(this.mousedownEvent.getDocumentPosition());
        this.selectEnd();
***REMOVED***;

    this.dragReadyEnd = function(e) ***REMOVED***
        this.editor.renderer.$cursorLayer.setBlinking(!this.editor.getReadOnly());
        this.editor.unsetStyle("ace_dragging");
        this.dragWaitEnd();
***REMOVED***;

    this.startDrag = function()***REMOVED***
        this.cancelDrag = false;
        var target = this.editor.container;
        target.draggable = true;
        this.editor.renderer.$cursorLayer.setBlinking(false);
        this.editor.setStyle("ace_dragging");
        this.setState("dragReady");
***REMOVED***;

    this.onMouseDrag = function(e) ***REMOVED***
        var target = this.editor.container;
        if (useragent.isIE && this.state == "dragReady") ***REMOVED***
            var distance = calcDistance(this.mousedownEvent.x, this.mousedownEvent.y, this.x, this.y);
            if (distance > 3)
                target.dragDrop();
    ***REMOVED***
        if (this.state === "dragWait") ***REMOVED***
            var distance = calcDistance(this.mousedownEvent.x, this.mousedownEvent.y, this.x, this.y);
            if (distance > 0) ***REMOVED***
                target.draggable = false;
                this.startSelect(this.mousedownEvent.getDocumentPosition());
        ***REMOVED***
    ***REMOVED***
***REMOVED***;

    this.onMouseDown = function(e) ***REMOVED***
        if (!this.$dragEnabled)
            return;
        this.mousedownEvent = e;
        var editor = this.editor;

        var inSelection = e.inSelection();
        var button = e.getButton();
        var clickCount = e.domEvent.detail || 1;
        if (clickCount === 1 && button === 0 && inSelection) ***REMOVED***
            if (e.editor.inMultiSelectMode && (e.getAccelKey() || e.getShiftKey()))
                return;
            this.mousedownEvent.time = Date.now();
            var eventTarget = e.domEvent.target || e.domEvent.srcElement;
            if ("unselectable" in eventTarget)
                eventTarget.unselectable = "on";
            if (editor.getDragDelay()) ***REMOVED***
                if (useragent.isWebKit) ***REMOVED***
                    this.cancelDrag = true;
                    var mouseTarget = editor.container;
                    mouseTarget.draggable = true;
            ***REMOVED***
                this.setState("dragWait");
        ***REMOVED*** else ***REMOVED***
                this.startDrag();
        ***REMOVED***
            this.captureMouse(e, this.onMouseDrag.bind(this));
            e.defaultPrevented = true;
    ***REMOVED***
***REMOVED***;

***REMOVED***).call(DragdropHandler.prototype);


function calcDistance(ax, ay, bx, by) ***REMOVED***
    return Math.sqrt(Math.pow(bx - ax, 2) + Math.pow(by - ay, 2));
***REMOVED***

exports.DragdropHandler = DragdropHandler;

***REMOVED***);

__ace_shadowed__.define('ace/config', ['require', 'exports', 'module' , 'ace/lib/lang', 'ace/lib/oop', 'ace/lib/net', 'ace/lib/event_emitter'], function(require, exports, module) ***REMOVED***
"no use strict";

var lang = require("./lib/lang");
var oop = require("./lib/oop");
var net = require("./lib/net");
var EventEmitter = require("./lib/event_emitter").EventEmitter;

var global = (function() ***REMOVED***
    return this;
***REMOVED***)();

var options = ***REMOVED***
    packaged: false,
    workerPath: null,
    modePath: null,
    themePath: null,
    basePath: "",
    suffix: ".js",
    $moduleUrls: ***REMOVED******REMOVED***
***REMOVED***;

exports.get = function(key) ***REMOVED***
    if (!options.hasOwnProperty(key))
        throw new Error("Unknown config key: " + key);

    return options[key];
***REMOVED***;

exports.set = function(key, value) ***REMOVED***
    if (!options.hasOwnProperty(key))
        throw new Error("Unknown config key: " + key);

    options[key] = value;
***REMOVED***;

exports.all = function() ***REMOVED***
    return lang.copyObject(options);
***REMOVED***;
oop.implement(exports, EventEmitter);

exports.moduleUrl = function(name, component) ***REMOVED***
    if (options.$moduleUrls[name])
        return options.$moduleUrls[name];

    var parts = name.split("/");
    component = component || parts[parts.length - 2] || "";
    var sep = component == "snippets" ? "/" : "-";
    var base = parts[parts.length - 1];    
    if (sep == "-") ***REMOVED***
        var re = new RegExp("^" + component + "[\\-_]|[\\-_]" + component + "$", "g");
        base = base.replace(re, "");
***REMOVED***

    if ((!base || base == component) && parts.length > 1)
        base = parts[parts.length - 2];
    var path = options[component + "Path"];
    if (path == null) ***REMOVED***
        path = options.basePath;
***REMOVED*** else if (sep == "/") ***REMOVED***
        component = sep = "";
***REMOVED***
    if (path && path.slice(-1) != "/")
        path += "/";
    return path + component + sep + base + this.get("suffix");
***REMOVED***;

exports.setModuleUrl = function(name, subst) ***REMOVED***
    return options.$moduleUrls[name] = subst;
***REMOVED***;

exports.$loading = ***REMOVED******REMOVED***;
exports.loadModule = function(moduleName, onLoad) ***REMOVED***
    var module, moduleType;
    if (Array.isArray(moduleName)) ***REMOVED***
        moduleType = moduleName[0];
        moduleName = moduleName[1];
***REMOVED***

    try ***REMOVED***
        module = require(moduleName);
***REMOVED*** catch (e) ***REMOVED******REMOVED***
    if (module && !exports.$loading[moduleName])
        return onLoad && onLoad(module);

    if (!exports.$loading[moduleName])
        exports.$loading[moduleName] = [];

    exports.$loading[moduleName].push(onLoad);

    if (exports.$loading[moduleName].length > 1)
        return;

    var afterLoad = function() ***REMOVED***
        require([moduleName], function(module) ***REMOVED***
            exports._emit("load.module", ***REMOVED***name: moduleName, module: module***REMOVED***);
            var listeners = exports.$loading[moduleName];
            exports.$loading[moduleName] = null;
            listeners.forEach(function(onLoad) ***REMOVED***
                onLoad && onLoad(module);
        ***REMOVED***);
    ***REMOVED***);
***REMOVED***;

    if (!exports.get("packaged"))
        return afterLoad();
    net.loadScript(exports.moduleUrl(moduleName, moduleType), afterLoad);
***REMOVED***;
function init(packaged) ***REMOVED***
    options.packaged = packaged || require.packaged || module.packaged || (global.define && define.packaged);

    if (!global.document)
        return "";

    var scriptOptions = ***REMOVED******REMOVED***;
    var scriptUrl = "";

    var scripts = document.getElementsByTagName("script");
    for (var i=0; i<scripts.length; i++) ***REMOVED***
        var script = scripts[i];

        var src = script.src || script.getAttribute("src");
        if (!src)
            continue;

        var attributes = script.attributes;
        for (var j=0, l=attributes.length; j < l; j++) ***REMOVED***
            var attr = attributes[j];
            if (attr.name.indexOf("data-ace-") === 0) ***REMOVED***
                scriptOptions[deHyphenate(attr.name.replace(/^data-ace-/, ""))] = attr.value;
        ***REMOVED***
    ***REMOVED***

        var m = src.match(/^(.*)\/ace(\-\w+)?\.js(\?|$)/);
        if (m)
            scriptUrl = m[1];
***REMOVED***

    if (scriptUrl) ***REMOVED***
        scriptOptions.base = scriptOptions.base || scriptUrl;
        scriptOptions.packaged = true;
***REMOVED***

    scriptOptions.basePath = scriptOptions.base;
    scriptOptions.workerPath = scriptOptions.workerPath || scriptOptions.base;
    scriptOptions.modePath = scriptOptions.modePath || scriptOptions.base;
    scriptOptions.themePath = scriptOptions.themePath || scriptOptions.base;
    delete scriptOptions.base;

    for (var key in scriptOptions)
        if (typeof scriptOptions[key] !== "undefined")
            exports.set(key, scriptOptions[key]);
***REMOVED***;

exports.init = init;

function deHyphenate(str) ***REMOVED***
    return str.replace(/-(.)/g, function(m, m1) ***REMOVED*** return m1.toUpperCase(); ***REMOVED***);
***REMOVED***

var optionsProvider = ***REMOVED***
    setOptions: function(optList) ***REMOVED***
        Object.keys(optList).forEach(function(key) ***REMOVED***
            this.setOption(key, optList[key]);
    ***REMOVED*** this);
***REMOVED***
    getOptions: function(optionNames) ***REMOVED***
        var result = ***REMOVED******REMOVED***;
        if (!optionNames) ***REMOVED***
            optionNames = Object.keys(this.$options);
    ***REMOVED*** else if (!Array.isArray(optionNames)) ***REMOVED***
            result = optionNames;
            optionNames = Object.keys(result);
    ***REMOVED***
        optionNames.forEach(function(key) ***REMOVED***
            result[key] = this.getOption(key);
    ***REMOVED*** this);
        return result;
***REMOVED***
    setOption: function(name, value) ***REMOVED***
        if (this["$" + name] === value)
            return;
        var opt = this.$options[name];
        if (!opt) ***REMOVED***
            if (typeof console != "undefined" && console.warn)
                console.warn('misspelled option "' + name + '"');
            return undefined;
    ***REMOVED***
        if (opt.forwardTo)
            return this[opt.forwardTo] && this[opt.forwardTo].setOption(name, value);

        if (!opt.handlesSet)
            this["$" + name] = value;
        if (opt && opt.set)
            opt.set.call(this, value);
***REMOVED***
    getOption: function(name) ***REMOVED***
        var opt = this.$options[name];
        if (!opt) ***REMOVED***
            if (typeof console != "undefined" && console.warn)
                console.warn('misspelled option "' + name + '"');
            return undefined;
    ***REMOVED***
        if (opt.forwardTo)
            return this[opt.forwardTo] && this[opt.forwardTo].getOption(name);
        return opt && opt.get ? opt.get.call(this) : this["$" + name];
***REMOVED***
***REMOVED***;

var defaultOptions = ***REMOVED******REMOVED***;
exports.defineOptions = function(obj, path, options) ***REMOVED***
    if (!obj.$options)
        defaultOptions[path] = obj.$options = ***REMOVED******REMOVED***;

    Object.keys(options).forEach(function(key) ***REMOVED***
        var opt = options[key];
        if (typeof opt == "string")
            opt = ***REMOVED***forwardTo: opt***REMOVED***;

        opt.name || (opt.name = key);
        obj.$options[opt.name] = opt;
        if ("initialValue" in opt)
            obj["$" + opt.name] = opt.initialValue;
***REMOVED***);
    oop.implement(obj, optionsProvider);

    return this;
***REMOVED***;

exports.resetOptions = function(obj) ***REMOVED***
    Object.keys(obj.$options).forEach(function(key) ***REMOVED***
        var opt = obj.$options[key];
        if ("value" in opt)
            obj.setOption(key, opt.value);
***REMOVED***);
***REMOVED***;

exports.setDefaultValue = function(path, name, value) ***REMOVED***
    var opts = defaultOptions[path] || (defaultOptions[path] = ***REMOVED******REMOVED***);
    if (opts[name]) ***REMOVED***
        if (opts.forwardTo)
            exports.setDefaultValue(opts.forwardTo, name, value);
        else
            opts[name].value = value;
***REMOVED***
***REMOVED***;

exports.setDefaultValues = function(path, optionHash) ***REMOVED***
    Object.keys(optionHash).forEach(function(key) ***REMOVED***
        exports.setDefaultValue(path, key, optionHash[key]);
***REMOVED***);
***REMOVED***;

***REMOVED***);

__ace_shadowed__.define('ace/lib/event_emitter', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***


var EventEmitter = ***REMOVED******REMOVED***;
var stopPropagation = function() ***REMOVED*** this.propagationStopped = true; ***REMOVED***;
var preventDefault = function() ***REMOVED*** this.defaultPrevented = true; ***REMOVED***;

EventEmitter._emit =
EventEmitter._dispatchEvent = function(eventName, e) ***REMOVED***
    this._eventRegistry || (this._eventRegistry = ***REMOVED******REMOVED***);
    this._defaultHandlers || (this._defaultHandlers = ***REMOVED******REMOVED***);

    var listeners = this._eventRegistry[eventName] || [];
    var defaultHandler = this._defaultHandlers[eventName];
    if (!listeners.length && !defaultHandler)
        return;

    if (typeof e != "object" || !e)
        e = ***REMOVED******REMOVED***;

    if (!e.type)
        e.type = eventName;
    if (!e.stopPropagation)
        e.stopPropagation = stopPropagation;
    if (!e.preventDefault)
        e.preventDefault = preventDefault;

    listeners = listeners.slice();
    for (var i=0; i<listeners.length; i++) ***REMOVED***
        listeners[i](e, this);
        if (e.propagationStopped)
            break;
***REMOVED***
    
    if (defaultHandler && !e.defaultPrevented)
        return defaultHandler(e, this);
***REMOVED***;


EventEmitter._signal = function(eventName, e) ***REMOVED***
    var listeners = (this._eventRegistry || ***REMOVED******REMOVED***)[eventName];
    if (!listeners)
        return;
    listeners = listeners.slice();
    for (var i=0; i<listeners.length; i++)
        listeners[i](e, this);
***REMOVED***;

EventEmitter.once = function(eventName, callback) ***REMOVED***
    var _self = this;
    callback && this.addEventListener(eventName, function newCallback() ***REMOVED***
        _self.removeEventListener(eventName, newCallback);
        callback.apply(null, arguments);
***REMOVED***);
***REMOVED***;


EventEmitter.setDefaultHandler = function(eventName, callback) ***REMOVED***
    var handlers = this._defaultHandlers
    if (!handlers)
        handlers = this._defaultHandlers = ***REMOVED***_disabled_: ***REMOVED******REMOVED******REMOVED***;
    
    if (handlers[eventName]) ***REMOVED***
        var old = handlers[eventName];
        var disabled = handlers._disabled_[eventName];
        if (!disabled)
            handlers._disabled_[eventName] = disabled = [];
        disabled.push(old);
        var i = disabled.indexOf(callback);
        if (i != -1) 
            disabled.splice(i, 1);
***REMOVED***
    handlers[eventName] = callback;
***REMOVED***;
EventEmitter.removeDefaultHandler = function(eventName, callback) ***REMOVED***
    var handlers = this._defaultHandlers
    if (!handlers)
        return;
    var disabled = handlers._disabled_[eventName];
    
    if (handlers[eventName] == callback) ***REMOVED***
        var old = handlers[eventName];
        if (disabled)
            this.setDefaultHandler(eventName, disabled.pop());
***REMOVED*** else if (disabled) ***REMOVED***
        var i = disabled.indexOf(callback);
        if (i != -1)
            disabled.splice(i, 1);
***REMOVED***
***REMOVED***;

EventEmitter.on =
EventEmitter.addEventListener = function(eventName, callback, capturing) ***REMOVED***
    this._eventRegistry = this._eventRegistry || ***REMOVED******REMOVED***;

    var listeners = this._eventRegistry[eventName];
    if (!listeners)
        listeners = this._eventRegistry[eventName] = [];

    if (listeners.indexOf(callback) == -1)
        listeners[capturing ? "unshift" : "push"](callback);
    return callback;
***REMOVED***;

EventEmitter.off =
EventEmitter.removeListener =
EventEmitter.removeEventListener = function(eventName, callback) ***REMOVED***
    this._eventRegistry = this._eventRegistry || ***REMOVED******REMOVED***;

    var listeners = this._eventRegistry[eventName];
    if (!listeners)
        return;

    var index = listeners.indexOf(callback);
    if (index !== -1)
        listeners.splice(index, 1);
***REMOVED***;

EventEmitter.removeAllListeners = function(eventName) ***REMOVED***
    if (this._eventRegistry) this._eventRegistry[eventName] = [];
***REMOVED***;

exports.EventEmitter = EventEmitter;

***REMOVED***);

__ace_shadowed__.define('ace/mouse/fold_handler', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***


function FoldHandler(editor) ***REMOVED***

    editor.on("click", function(e) ***REMOVED***
        var position = e.getDocumentPosition();
        var session = editor.session;
        var fold = session.getFoldAt(position.row, position.column, 1);
        if (fold) ***REMOVED***
            if (e.getAccelKey())
                session.removeFold(fold);
            else
                session.expandFold(fold);

            e.stop();
    ***REMOVED***
***REMOVED***);

    editor.on("gutterclick", function(e) ***REMOVED***
        var gutterRegion = editor.renderer.$gutterLayer.getRegion(e);

        if (gutterRegion == "foldWidgets") ***REMOVED***
            var row = e.getDocumentPosition().row;
            var session = editor.session;
            if (session.foldWidgets && session.foldWidgets[row])
                editor.session.onFoldWidgetClick(row, e);
            if (!editor.isFocused())
                editor.focus();
            e.stop();
    ***REMOVED***
***REMOVED***);

    editor.on("gutterdblclick", function(e) ***REMOVED***
        var gutterRegion = editor.renderer.$gutterLayer.getRegion(e);

        if (gutterRegion == "foldWidgets") ***REMOVED***
            var row = e.getDocumentPosition().row;
            var session = editor.session;
            var data = session.getParentFoldRangeData(row, true);
            var range = data.range || data.firstRange;

            if (range) ***REMOVED***
                row = range.start.row;
                var fold = session.getFoldAt(row, session.getLine(row).length, 1);

                if (fold) ***REMOVED***
                    session.removeFold(fold);
            ***REMOVED*** else ***REMOVED***
                    session.addFold("...", range);
                    editor.renderer.scrollCursorIntoView(***REMOVED***row: range.start.row, column: 0***REMOVED***);
            ***REMOVED***
        ***REMOVED***
            e.stop();
    ***REMOVED***
***REMOVED***);
***REMOVED***

exports.FoldHandler = FoldHandler;

***REMOVED***);

__ace_shadowed__.define('ace/keyboard/keybinding', ['require', 'exports', 'module' , 'ace/lib/keys', 'ace/lib/event'], function(require, exports, module) ***REMOVED***


var keyUtil  = require("../lib/keys");
var event = require("../lib/event");

var KeyBinding = function(editor) ***REMOVED***
    this.$editor = editor;
    this.$data = ***REMOVED******REMOVED***;
    this.$handlers = [];
    this.setDefaultHandler(editor.commands);
***REMOVED***;

(function() ***REMOVED***
    this.setDefaultHandler = function(kb) ***REMOVED***
        this.removeKeyboardHandler(this.$defaultHandler);
        this.$defaultHandler = kb;
        this.addKeyboardHandler(kb, 0);
        this.$data = ***REMOVED***editor: this.$editor***REMOVED***;
***REMOVED***;

    this.setKeyboardHandler = function(kb) ***REMOVED***
        var h = this.$handlers;
        if (h[h.length - 1] == kb)
            return;

        while (h[h.length - 1] && h[h.length - 1] != this.$defaultHandler)
            this.removeKeyboardHandler(h[h.length - 1]);

        this.addKeyboardHandler(kb, 1);
***REMOVED***;

    this.addKeyboardHandler = function(kb, pos) ***REMOVED***
        if (!kb)
            return;
        if (typeof kb == "function" && !kb.handleKeyboard)
            kb.handleKeyboard = kb;
        var i = this.$handlers.indexOf(kb);
        if (i != -1)
            this.$handlers.splice(i, 1);

        if (pos == undefined)
            this.$handlers.push(kb);
        else
            this.$handlers.splice(pos, 0, kb);

        if (i == -1 && kb.attach)
            kb.attach(this.$editor);
***REMOVED***;

    this.removeKeyboardHandler = function(kb) ***REMOVED***
        var i = this.$handlers.indexOf(kb);
        if (i == -1)
            return false;
        this.$handlers.splice(i, 1);
        kb.detach && kb.detach(this.$editor);
        return true;
***REMOVED***;

    this.getKeyboardHandler = function() ***REMOVED***
        return this.$handlers[this.$handlers.length - 1];
***REMOVED***;

    this.$callKeyboardHandlers = function (hashId, keyString, keyCode, e) ***REMOVED***
        var toExecute;
        var success = false;
        var commands = this.$editor.commands;

        for (var i = this.$handlers.length; i--;) ***REMOVED***
            toExecute = this.$handlers[i].handleKeyboard(
                this.$data, hashId, keyString, keyCode, e
            );
            if (!toExecute || !toExecute.command)
                continue;
            if (toExecute.command == "null") ***REMOVED***
                success = true;
        ***REMOVED*** else ***REMOVED***
                success = commands.exec(toExecute.command, this.$editor, toExecute.args, e);                
        ***REMOVED***
            if (success && e && hashId != -1 && 
                toExecute.passEvent != true && toExecute.command.passEvent != true
            ) ***REMOVED***
                event.stopEvent(e);
        ***REMOVED***
            if (success)
                break;
    ***REMOVED***
        return success;
***REMOVED***;

    this.onCommandKey = function(e, hashId, keyCode) ***REMOVED***
        var keyString = keyUtil.keyCodeToString(keyCode);
        this.$callKeyboardHandlers(hashId, keyString, keyCode, e);
***REMOVED***;

    this.onTextInput = function(text) ***REMOVED***
        var success = this.$callKeyboardHandlers(-1, text);
        if (!success)
            this.$editor.commands.exec("insertstring", this.$editor, text);
***REMOVED***;

***REMOVED***).call(KeyBinding.prototype);

exports.KeyBinding = KeyBinding;
***REMOVED***);

__ace_shadowed__.define('ace/edit_session', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/lib/lang', 'ace/config', 'ace/lib/event_emitter', 'ace/selection', 'ace/mode/text', 'ace/range', 'ace/document', 'ace/background_tokenizer', 'ace/search_highlight', 'ace/edit_session/folding', 'ace/edit_session/bracket_match'], function(require, exports, module) ***REMOVED***


var oop = require("./lib/oop");
var lang = require("./lib/lang");
var config = require("./config");
var EventEmitter = require("./lib/event_emitter").EventEmitter;
var Selection = require("./selection").Selection;
var TextMode = require("./mode/text").Mode;
var Range = require("./range").Range;
var Document = require("./document").Document;
var BackgroundTokenizer = require("./background_tokenizer").BackgroundTokenizer;
var SearchHighlight = require("./search_highlight").SearchHighlight;

var EditSession = function(text, mode) ***REMOVED***
    this.$breakpoints = [];
    this.$decorations = [];
    this.$frontMarkers = ***REMOVED******REMOVED***;
    this.$backMarkers = ***REMOVED******REMOVED***;
    this.$markerId = 1;
    this.$undoSelect = true;

    this.$foldData = [];
    this.$foldData.toString = function() ***REMOVED***
        return this.join("\n");
***REMOVED***
    this.on("changeFold", this.onChangeFold.bind(this));
    this.$onChange = this.onChange.bind(this);

    if (typeof text != "object" || !text.getLine)
        text = new Document(text);

    this.setDocument(text);
    this.selection = new Selection(this);

    config.resetOptions(this);
    this.setMode(mode);
    config._signal("session", this);
***REMOVED***;


(function() ***REMOVED***

    oop.implement(this, EventEmitter);
    this.setDocument = function(doc) ***REMOVED***
        if (this.doc)
            this.doc.removeListener("change", this.$onChange);

        this.doc = doc;
        doc.on("change", this.$onChange);

        if (this.bgTokenizer)
            this.bgTokenizer.setDocument(this.getDocument());

        this.resetCaches();
***REMOVED***;
    this.getDocument = function() ***REMOVED***
        return this.doc;
***REMOVED***;
    this.$resetRowCache = function(docRow) ***REMOVED***
        if (!docRow) ***REMOVED***
            this.$docRowCache = [];
            this.$screenRowCache = [];
            return;
    ***REMOVED***
        var l = this.$docRowCache.length;
        var i = this.$getRowCacheIndex(this.$docRowCache, docRow) + 1;
        if (l > i) ***REMOVED***
            this.$docRowCache.splice(i, l);
            this.$screenRowCache.splice(i, l);
    ***REMOVED***
***REMOVED***;

    this.$getRowCacheIndex = function(cacheArray, val) ***REMOVED***
        var low = 0;
        var hi = cacheArray.length - 1;

        while (low <= hi) ***REMOVED***
            var mid = (low + hi) >> 1;
            var c = cacheArray[mid];

            if (val > c)
                low = mid + 1;
            else if (val < c)
                hi = mid - 1;
            else
                return mid;
    ***REMOVED***

        return low -1;
***REMOVED***;

    this.resetCaches = function() ***REMOVED***
        this.$modified = true;
        this.$wrapData = [];
        this.$rowLengthCache = [];
        this.$resetRowCache(0);
        if (this.bgTokenizer)
            this.bgTokenizer.start(0);
***REMOVED***;

    this.onChangeFold = function(e) ***REMOVED***
        var fold = e.data;
        this.$resetRowCache(fold.start.row);
***REMOVED***;

    this.onChange = function(e) ***REMOVED***
        var delta = e.data;
        this.$modified = true;

        this.$resetRowCache(delta.range.start.row);

        var removedFolds = this.$updateInternalDataOnChange(e);
        if (!this.$fromUndo && this.$undoManager && !delta.ignore) ***REMOVED***
            this.$deltasDoc.push(delta);
            if (removedFolds && removedFolds.length != 0) ***REMOVED***
                this.$deltasFold.push(***REMOVED***
                    action: "removeFolds",
                    folds:  removedFolds
            ***REMOVED***);
        ***REMOVED***

            this.$informUndoManager.schedule();
    ***REMOVED***

        this.bgTokenizer.$updateOnChange(delta);
        this._signal("change", e);
***REMOVED***;
    this.setValue = function(text) ***REMOVED***
        this.doc.setValue(text);
        this.selection.moveTo(0, 0);

        this.$resetRowCache(0);
        this.$deltas = [];
        this.$deltasDoc = [];
        this.$deltasFold = [];
        this.setUndoManager(this.$undoManager);
        this.getUndoManager().reset();
***REMOVED***;
    this.getValue =
    this.toString = function() ***REMOVED***
        return this.doc.getValue();
***REMOVED***;
    this.getSelection = function() ***REMOVED***
        return this.selection;
***REMOVED***;
    this.getState = function(row) ***REMOVED***
        return this.bgTokenizer.getState(row);
***REMOVED***;
    this.getTokens = function(row) ***REMOVED***
        return this.bgTokenizer.getTokens(row);
***REMOVED***;
    this.getTokenAt = function(row, column) ***REMOVED***
        var tokens = this.bgTokenizer.getTokens(row);
        var token, c = 0;
        if (column == null) ***REMOVED***
            i = tokens.length - 1;
            c = this.getLine(row).length;
    ***REMOVED*** else ***REMOVED***
            for (var i = 0; i < tokens.length; i++) ***REMOVED***
                c += tokens[i].value.length;
                if (c >= column)
                    break;
        ***REMOVED***
    ***REMOVED***
        token = tokens[i];
        if (!token)
            return null;
        token.index = i;
        token.start = c - token.value.length;
        return token;
***REMOVED***;
    this.setUndoManager = function(undoManager) ***REMOVED***
        this.$undoManager = undoManager;
        this.$deltas = [];
        this.$deltasDoc = [];
        this.$deltasFold = [];

        if (this.$informUndoManager)
            this.$informUndoManager.cancel();

        if (undoManager) ***REMOVED***
            var self = this;

            this.$syncInformUndoManager = function() ***REMOVED***
                self.$informUndoManager.cancel();

                if (self.$deltasFold.length) ***REMOVED***
                    self.$deltas.push(***REMOVED***
                        group: "fold",
                        deltas: self.$deltasFold
                ***REMOVED***);
                    self.$deltasFold = [];
            ***REMOVED***

                if (self.$deltasDoc.length) ***REMOVED***
                    self.$deltas.push(***REMOVED***
                        group: "doc",
                        deltas: self.$deltasDoc
                ***REMOVED***);
                    self.$deltasDoc = [];
            ***REMOVED***

                if (self.$deltas.length > 0) ***REMOVED***
                    undoManager.execute(***REMOVED***
                        action: "aceupdate",
                        args: [self.$deltas, self],
                        merge: self.mergeUndoDeltas
                ***REMOVED***);
            ***REMOVED***
                self.mergeUndoDeltas = false;
                self.$deltas = [];
        ***REMOVED***;
            this.$informUndoManager = lang.delayedCall(this.$syncInformUndoManager);
    ***REMOVED***
***REMOVED***;
    this.markUndoGroup = function() ***REMOVED***
        if (this.$syncInformUndoManager)
            this.$syncInformUndoManager();
***REMOVED***;
    
    this.$defaultUndoManager = ***REMOVED***
        undo: function() ***REMOVED******REMOVED***,
        redo: function() ***REMOVED******REMOVED***,
        reset: function() ***REMOVED******REMOVED***
***REMOVED***;
    this.getUndoManager = function() ***REMOVED***
        return this.$undoManager || this.$defaultUndoManager;
***REMOVED***;
    this.getTabString = function() ***REMOVED***
        if (this.getUseSoftTabs()) ***REMOVED***
            return lang.stringRepeat(" ", this.getTabSize());
    ***REMOVED*** else ***REMOVED***
            return "\t";
    ***REMOVED***
***REMOVED***;
    this.setUseSoftTabs = function(val) ***REMOVED***
        this.setOption("useSoftTabs", val);
***REMOVED***;
    this.getUseSoftTabs = function() ***REMOVED***
        return this.$useSoftTabs && !this.$mode.$indentWithTabs;
***REMOVED***;
    this.setTabSize = function(tabSize) ***REMOVED***
        this.setOption("tabSize", tabSize);
***REMOVED***;
    this.getTabSize = function() ***REMOVED***
        return this.$tabSize;
***REMOVED***;
    this.isTabStop = function(position) ***REMOVED***
        return this.$useSoftTabs && (position.column % this.$tabSize === 0);
***REMOVED***;

    this.$overwrite = false;
    this.setOverwrite = function(overwrite) ***REMOVED***
        this.setOption("overwrite", overwrite);
***REMOVED***;
    this.getOverwrite = function() ***REMOVED***
        return this.$overwrite;
***REMOVED***;
    this.toggleOverwrite = function() ***REMOVED***
        this.setOverwrite(!this.$overwrite);
***REMOVED***;
    this.addGutterDecoration = function(row, className) ***REMOVED***
        if (!this.$decorations[row])
            this.$decorations[row] = "";
        this.$decorations[row] += " " + className;
        this._signal("changeBreakpoint", ***REMOVED******REMOVED***);
***REMOVED***;
    this.removeGutterDecoration = function(row, className) ***REMOVED***
        this.$decorations[row] = (this.$decorations[row] || "").replace(" " + className, "");
        this._signal("changeBreakpoint", ***REMOVED******REMOVED***);
***REMOVED***;
    this.getBreakpoints = function() ***REMOVED***
        return this.$breakpoints;
***REMOVED***;
    this.setBreakpoints = function(rows) ***REMOVED***
        this.$breakpoints = [];
        for (var i=0; i<rows.length; i++) ***REMOVED***
            this.$breakpoints[rows[i]] = "ace_breakpoint";
    ***REMOVED***
        this._signal("changeBreakpoint", ***REMOVED******REMOVED***);
***REMOVED***;
    this.clearBreakpoints = function() ***REMOVED***
        this.$breakpoints = [];
        this._signal("changeBreakpoint", ***REMOVED******REMOVED***);
***REMOVED***;
    this.setBreakpoint = function(row, className) ***REMOVED***
        if (className === undefined)
            className = "ace_breakpoint";
        if (className)
            this.$breakpoints[row] = className;
        else
            delete this.$breakpoints[row];
        this._signal("changeBreakpoint", ***REMOVED******REMOVED***);
***REMOVED***;
    this.clearBreakpoint = function(row) ***REMOVED***
        delete this.$breakpoints[row];
        this._signal("changeBreakpoint", ***REMOVED******REMOVED***);
***REMOVED***;
    this.addMarker = function(range, clazz, type, inFront) ***REMOVED***
        var id = this.$markerId++;

        var marker = ***REMOVED***
            range : range,
            type : type || "line",
            renderer: typeof type == "function" ? type : null,
            clazz : clazz,
            inFront: !!inFront,
            id: id
    ***REMOVED***;

        if (inFront) ***REMOVED***
            this.$frontMarkers[id] = marker;
            this._signal("changeFrontMarker");
    ***REMOVED*** else ***REMOVED***
            this.$backMarkers[id] = marker;
            this._signal("changeBackMarker");
    ***REMOVED***

        return id;
***REMOVED***;
    this.addDynamicMarker = function(marker, inFront) ***REMOVED***
        if (!marker.update)
            return;
        var id = this.$markerId++;
        marker.id = id;
        marker.inFront = !!inFront;

        if (inFront) ***REMOVED***
            this.$frontMarkers[id] = marker;
            this._signal("changeFrontMarker");
    ***REMOVED*** else ***REMOVED***
            this.$backMarkers[id] = marker;
            this._signal("changeBackMarker");
    ***REMOVED***

        return marker;
***REMOVED***;
    this.removeMarker = function(markerId) ***REMOVED***
        var marker = this.$frontMarkers[markerId] || this.$backMarkers[markerId];
        if (!marker)
            return;

        var markers = marker.inFront ? this.$frontMarkers : this.$backMarkers;
        if (marker) ***REMOVED***
            delete (markers[markerId]);
            this._signal(marker.inFront ? "changeFrontMarker" : "changeBackMarker");
    ***REMOVED***
***REMOVED***;
    this.getMarkers = function(inFront) ***REMOVED***
        return inFront ? this.$frontMarkers : this.$backMarkers;
***REMOVED***;

    this.highlight = function(re) ***REMOVED***
        if (!this.$searchHighlight) ***REMOVED***
            var highlight = new SearchHighlight(null, "ace_selected-word", "text");
            this.$searchHighlight = this.addDynamicMarker(highlight);
    ***REMOVED***
        this.$searchHighlight.setRegexp(re);
***REMOVED***;
    this.highlightLines = function(startRow, endRow, clazz, inFront) ***REMOVED***
        if (typeof endRow != "number") ***REMOVED***
            clazz = endRow;
            endRow = startRow;
    ***REMOVED***
        if (!clazz)
            clazz = "ace_step";

        var range = new Range(startRow, 0, endRow, Infinity);
        range.id = this.addMarker(range, clazz, "fullLine", inFront);
        return range;
***REMOVED***;
    this.setAnnotations = function(annotations) ***REMOVED***
        this.$annotations = annotations;
        this._signal("changeAnnotation", ***REMOVED******REMOVED***);
***REMOVED***;
    this.getAnnotations = function() ***REMOVED***
        return this.$annotations || [];
***REMOVED***;
    this.clearAnnotations = function() ***REMOVED***
        this.setAnnotations([]);
***REMOVED***;
    this.$detectNewLine = function(text) ***REMOVED***
        var match = text.match(/^.*?(\r?\n)/m);
        if (match) ***REMOVED***
            this.$autoNewLine = match[1];
    ***REMOVED*** else ***REMOVED***
            this.$autoNewLine = "\n";
    ***REMOVED***
***REMOVED***;
    this.getWordRange = function(row, column) ***REMOVED***
        var line = this.getLine(row);

        var inToken = false;
        if (column > 0)
            inToken = !!line.charAt(column - 1).match(this.tokenRe);

        if (!inToken)
            inToken = !!line.charAt(column).match(this.tokenRe);

        if (inToken)
            var re = this.tokenRe;
        else if (/^\s+$/.test(line.slice(column-1, column+1)))
            var re = /\s/;
        else
            var re = this.nonTokenRe;

        var start = column;
        if (start > 0) ***REMOVED***
            do ***REMOVED***
                start--;
        ***REMOVED***
            while (start >= 0 && line.charAt(start).match(re));
            start++;
    ***REMOVED***

        var end = column;
        while (end < line.length && line.charAt(end).match(re)) ***REMOVED***
            end++;
    ***REMOVED***

        return new Range(row, start, row, end);
***REMOVED***;
    this.getAWordRange = function(row, column) ***REMOVED***
        var wordRange = this.getWordRange(row, column);
        var line = this.getLine(wordRange.end.row);

        while (line.charAt(wordRange.end.column).match(/[ \t]/)) ***REMOVED***
            wordRange.end.column += 1;
    ***REMOVED***
        return wordRange;
***REMOVED***;
    this.setNewLineMode = function(newLineMode) ***REMOVED***
        this.doc.setNewLineMode(newLineMode);
***REMOVED***;
    this.getNewLineMode = function() ***REMOVED***
        return this.doc.getNewLineMode();
***REMOVED***;
    this.setUseWorker = function(useWorker) ***REMOVED*** this.setOption("useWorker", useWorker); ***REMOVED***;
    this.getUseWorker = function() ***REMOVED*** return this.$useWorker; ***REMOVED***;
    this.onReloadTokenizer = function(e) ***REMOVED***
        var rows = e.data;
        this.bgTokenizer.start(rows.first);
        this._signal("tokenizerUpdate", e);
***REMOVED***;

    this.$modes = ***REMOVED******REMOVED***;
    this.$mode = null;
    this.$modeId = null;
    this.setMode = function(mode, cb) ***REMOVED***
        if (mode && typeof mode === "object") ***REMOVED***
            if (mode.getTokenizer)
                return this.$onChangeMode(mode);
            var options = mode;
            var path = options.path;
    ***REMOVED*** else ***REMOVED***
            path = mode || "ace/mode/text";
    ***REMOVED***
        if (!this.$modes["ace/mode/text"])
            this.$modes["ace/mode/text"] = new TextMode();

        if (this.$modes[path] && !options) ***REMOVED***
            this.$onChangeMode(this.$modes[path]);
            cb && cb();
            return;
    ***REMOVED***
        this.$modeId = path;
        config.loadModule(["mode", path], function(m) ***REMOVED***
            if (this.$modeId !== path)
                return cb && cb();
            if (this.$modes[path] && !options)
                return this.$onChangeMode(this.$modes[path]);
            if (m && m.Mode) ***REMOVED***
                m = new m.Mode(options);
                if (!options) ***REMOVED***
                    this.$modes[path] = m;
                    m.$id = path;
            ***REMOVED***
                this.$onChangeMode(m);
                cb && cb();
        ***REMOVED***
    ***REMOVED***.bind(this));
        if (!this.$mode)
            this.$onChangeMode(this.$modes["ace/mode/text"], true);
***REMOVED***;

    this.$onChangeMode = function(mode, $isPlaceholder) ***REMOVED***
        if (!$isPlaceholder)
            this.$modeId = mode.$id;
        if (this.$mode === mode) 
            return;

        this.$mode = mode;

        this.$stopWorker();

        if (this.$useWorker)
            this.$startWorker();

        var tokenizer = mode.getTokenizer();

        if(tokenizer.addEventListener !== undefined) ***REMOVED***
            var onReloadTokenizer = this.onReloadTokenizer.bind(this);
            tokenizer.addEventListener("update", onReloadTokenizer);
    ***REMOVED***

        if (!this.bgTokenizer) ***REMOVED***
            this.bgTokenizer = new BackgroundTokenizer(tokenizer);
            var _self = this;
            this.bgTokenizer.addEventListener("update", function(e) ***REMOVED***
                _self._signal("tokenizerUpdate", e);
        ***REMOVED***);
    ***REMOVED*** else ***REMOVED***
            this.bgTokenizer.setTokenizer(tokenizer);
    ***REMOVED***

        this.bgTokenizer.setDocument(this.getDocument());

        this.tokenRe = mode.tokenRe;
        this.nonTokenRe = mode.nonTokenRe;

        
        if (!$isPlaceholder) ***REMOVED***
            this.$options.wrapMethod.set.call(this, this.$wrapMethod);
            this.$setFolding(mode.foldingRules);
            this.bgTokenizer.start(0);
            this._emit("changeMode");
    ***REMOVED***
***REMOVED***;


    this.$stopWorker = function() ***REMOVED***
        if (this.$worker)
            this.$worker.terminate();

        this.$worker = null;
***REMOVED***;

    this.$startWorker = function() ***REMOVED***
        if (typeof Worker !== "undefined" && !require.noWorker) ***REMOVED***
            try ***REMOVED***
                this.$worker = this.$mode.createWorker(this);
        ***REMOVED*** catch (e) ***REMOVED***
                console.log("Could not load worker");
                console.log(e);
                this.$worker = null;
        ***REMOVED***
    ***REMOVED***
        else
            this.$worker = null;
***REMOVED***;
    this.getMode = function() ***REMOVED***
        return this.$mode;
***REMOVED***;

    this.$scrollTop = 0;
    this.setScrollTop = function(scrollTop) ***REMOVED***
        if (this.$scrollTop === scrollTop || isNaN(scrollTop))
            return;

        this.$scrollTop = scrollTop;
        this._signal("changeScrollTop", scrollTop);
***REMOVED***;
    this.getScrollTop = function() ***REMOVED***
        return this.$scrollTop;
***REMOVED***;

    this.$scrollLeft = 0;
    this.setScrollLeft = function(scrollLeft) ***REMOVED***
        if (this.$scrollLeft === scrollLeft || isNaN(scrollLeft))
            return;

        this.$scrollLeft = scrollLeft;
        this._signal("changeScrollLeft", scrollLeft);
***REMOVED***;
    this.getScrollLeft = function() ***REMOVED***
        return this.$scrollLeft;
***REMOVED***;
    this.getScreenWidth = function() ***REMOVED***
        this.$computeWidth();
        if (this.lineWidgets) 
            return Math.max(this.getLineWidgetMaxWidth(), this.screenWidth);
        return this.screenWidth;
***REMOVED***;
    
    this.getLineWidgetMaxWidth = function() ***REMOVED***
        if (this.lineWidgetsWidth != null) return this.lineWidgetsWidth;
        var width = 0;
        this.lineWidgets.forEach(function(w) ***REMOVED***
            if (w && w.screenWidth > width)
                width = w.screenWidth;
    ***REMOVED***);
        return this.lineWidgetWidth = width;
***REMOVED***;

    this.$computeWidth = function(force) ***REMOVED***
        if (this.$modified || force) ***REMOVED***
            this.$modified = false;

            if (this.$useWrapMode)
                return this.screenWidth = this.$wrapLimit;

            var lines = this.doc.getAllLines();
            var cache = this.$rowLengthCache;
            var longestScreenLine = 0;
            var foldIndex = 0;
            var foldLine = this.$foldData[foldIndex];
            var foldStart = foldLine ? foldLine.start.row : Infinity;
            var len = lines.length;

            for (var i = 0; i < len; i++) ***REMOVED***
                if (i > foldStart) ***REMOVED***
                    i = foldLine.end.row + 1;
                    if (i >= len)
                        break;
                    foldLine = this.$foldData[foldIndex++];
                    foldStart = foldLine ? foldLine.start.row : Infinity;
            ***REMOVED***

                if (cache[i] == null)
                    cache[i] = this.$getStringScreenWidth(lines[i])[0];

                if (cache[i] > longestScreenLine)
                    longestScreenLine = cache[i];
        ***REMOVED***
            this.screenWidth = longestScreenLine;
    ***REMOVED***
***REMOVED***;
    this.getLine = function(row) ***REMOVED***
        return this.doc.getLine(row);
***REMOVED***;
    this.getLines = function(firstRow, lastRow) ***REMOVED***
        return this.doc.getLines(firstRow, lastRow);
***REMOVED***;
    this.getLength = function() ***REMOVED***
        return this.doc.getLength();
***REMOVED***;
    this.getTextRange = function(range) ***REMOVED***
        return this.doc.getTextRange(range || this.selection.getRange());
***REMOVED***;
    this.insert = function(position, text) ***REMOVED***
        return this.doc.insert(position, text);
***REMOVED***;
    this.remove = function(range) ***REMOVED***
        return this.doc.remove(range);
***REMOVED***;
    this.undoChanges = function(deltas, dontSelect) ***REMOVED***
        if (!deltas.length)
            return;

        this.$fromUndo = true;
        var lastUndoRange = null;
        for (var i = deltas.length - 1; i != -1; i--) ***REMOVED***
            var delta = deltas[i];
            if (delta.group == "doc") ***REMOVED***
                this.doc.revertDeltas(delta.deltas);
                lastUndoRange =
                    this.$getUndoSelection(delta.deltas, true, lastUndoRange);
        ***REMOVED*** else ***REMOVED***
                delta.deltas.forEach(function(foldDelta) ***REMOVED***
                    this.addFolds(foldDelta.folds);
            ***REMOVED*** this);
        ***REMOVED***
    ***REMOVED***
        this.$fromUndo = false;
        lastUndoRange &&
            this.$undoSelect &&
            !dontSelect &&
            this.selection.setSelectionRange(lastUndoRange);
        return lastUndoRange;
***REMOVED***;
    this.redoChanges = function(deltas, dontSelect) ***REMOVED***
        if (!deltas.length)
            return;

        this.$fromUndo = true;
        var lastUndoRange = null;
        for (var i = 0; i < deltas.length; i++) ***REMOVED***
            var delta = deltas[i];
            if (delta.group == "doc") ***REMOVED***
                this.doc.applyDeltas(delta.deltas);
                lastUndoRange =
                    this.$getUndoSelection(delta.deltas, false, lastUndoRange);
        ***REMOVED***
    ***REMOVED***
        this.$fromUndo = false;
        lastUndoRange &&
            this.$undoSelect &&
            !dontSelect &&
            this.selection.setSelectionRange(lastUndoRange);
        return lastUndoRange;
***REMOVED***;
    this.setUndoSelect = function(enable) ***REMOVED***
        this.$undoSelect = enable;
***REMOVED***;

    this.$getUndoSelection = function(deltas, isUndo, lastUndoRange) ***REMOVED***
        function isInsert(delta) ***REMOVED***
            var insert =
                delta.action === "insertText" || delta.action === "insertLines";
            return isUndo ? !insert : insert;
    ***REMOVED***

        var delta = deltas[0];
        var range, point;
        var lastDeltaIsInsert = false;
        if (isInsert(delta)) ***REMOVED***
            range = Range.fromPoints(delta.range.start, delta.range.end);
            lastDeltaIsInsert = true;
    ***REMOVED*** else ***REMOVED***
            range = Range.fromPoints(delta.range.start, delta.range.start);
            lastDeltaIsInsert = false;
    ***REMOVED***

        for (var i = 1; i < deltas.length; i++) ***REMOVED***
            delta = deltas[i];
            if (isInsert(delta)) ***REMOVED***
                point = delta.range.start;
                if (range.compare(point.row, point.column) == -1) ***REMOVED***
                    range.setStart(delta.range.start);
            ***REMOVED***
                point = delta.range.end;
                if (range.compare(point.row, point.column) == 1) ***REMOVED***
                    range.setEnd(delta.range.end);
            ***REMOVED***
                lastDeltaIsInsert = true;
        ***REMOVED*** else ***REMOVED***
                point = delta.range.start;
                if (range.compare(point.row, point.column) == -1) ***REMOVED***
                    range =
                        Range.fromPoints(delta.range.start, delta.range.start);
            ***REMOVED***
                lastDeltaIsInsert = false;
        ***REMOVED***
    ***REMOVED***
        if (lastUndoRange != null) ***REMOVED***
            if (Range.comparePoints(lastUndoRange.start, range.start) === 0) ***REMOVED***
                lastUndoRange.start.column += range.end.column - range.start.column;
                lastUndoRange.end.column += range.end.column - range.start.column;
        ***REMOVED***

            var cmp = lastUndoRange.compareRange(range);
            if (cmp == 1) ***REMOVED***
                range.setStart(lastUndoRange.start);
        ***REMOVED*** else if (cmp == -1) ***REMOVED***
                range.setEnd(lastUndoRange.end);
        ***REMOVED***
    ***REMOVED***

        return range;
***REMOVED***;
    this.replace = function(range, text) ***REMOVED***
        return this.doc.replace(range, text);
***REMOVED***;
    this.moveText = function(fromRange, toPosition, copy) ***REMOVED***
        var text = this.getTextRange(fromRange);
        var folds = this.getFoldsInRange(fromRange);

        var toRange = Range.fromPoints(toPosition, toPosition);
        if (!copy) ***REMOVED***
            this.remove(fromRange);
            var rowDiff = fromRange.start.row - fromRange.end.row;
            var collDiff = rowDiff ? -fromRange.end.column : fromRange.start.column - fromRange.end.column;
            if (collDiff) ***REMOVED***
                if (toRange.start.row == fromRange.end.row && toRange.start.column > fromRange.end.column)
                    toRange.start.column += collDiff;
                if (toRange.end.row == fromRange.end.row && toRange.end.column > fromRange.end.column)
                    toRange.end.column += collDiff;
        ***REMOVED***
            if (rowDiff && toRange.start.row >= fromRange.end.row) ***REMOVED***
                toRange.start.row += rowDiff;
                toRange.end.row += rowDiff;
        ***REMOVED***
    ***REMOVED***

        toRange.end = this.insert(toRange.start, text);
        if (folds.length) ***REMOVED***
            var oldStart = fromRange.start;
            var newStart = toRange.start;
            var rowDiff = newStart.row - oldStart.row;
            var collDiff = newStart.column - oldStart.column;
            this.addFolds(folds.map(function(x) ***REMOVED***
                x = x.clone();
                if (x.start.row == oldStart.row)
                    x.start.column += collDiff;
                if (x.end.row == oldStart.row)
                    x.end.column += collDiff;
                x.start.row += rowDiff;
                x.end.row += rowDiff;
                return x;
        ***REMOVED***));
    ***REMOVED***

        return toRange;
***REMOVED***;
    this.indentRows = function(startRow, endRow, indentString) ***REMOVED***
        indentString = indentString.replace(/\t/g, this.getTabString());
        for (var row=startRow; row<=endRow; row++)
            this.insert(***REMOVED***row: row, column:0***REMOVED***, indentString);
***REMOVED***;
    this.outdentRows = function (range) ***REMOVED***
        var rowRange = range.collapseRows();
        var deleteRange = new Range(0, 0, 0, 0);
        var size = this.getTabSize();

        for (var i = rowRange.start.row; i <= rowRange.end.row; ++i) ***REMOVED***
            var line = this.getLine(i);

            deleteRange.start.row = i;
            deleteRange.end.row = i;
            for (var j = 0; j < size; ++j)
                if (line.charAt(j) != ' ')
                    break;
            if (j < size && line.charAt(j) == '\t') ***REMOVED***
                deleteRange.start.column = j;
                deleteRange.end.column = j + 1;
        ***REMOVED*** else ***REMOVED***
                deleteRange.start.column = 0;
                deleteRange.end.column = j;
        ***REMOVED***
            this.remove(deleteRange);
    ***REMOVED***
***REMOVED***;

    this.$moveLines = function(firstRow, lastRow, dir) ***REMOVED***
        firstRow = this.getRowFoldStart(firstRow);
        lastRow = this.getRowFoldEnd(lastRow);
        if (dir < 0) ***REMOVED***
            var row = this.getRowFoldStart(firstRow + dir);
            if (row < 0) return 0;
            var diff = row-firstRow;
    ***REMOVED*** else if (dir > 0) ***REMOVED***
            var row = this.getRowFoldEnd(lastRow + dir);
            if (row > this.doc.getLength()-1) return 0;
            var diff = row-lastRow;
    ***REMOVED*** else ***REMOVED***
            firstRow = this.$clipRowToDocument(firstRow);
            lastRow = this.$clipRowToDocument(lastRow);
            var diff = lastRow - firstRow + 1;
    ***REMOVED***

        var range = new Range(firstRow, 0, lastRow, Number.MAX_VALUE);
        var folds = this.getFoldsInRange(range).map(function(x)***REMOVED***
            x = x.clone();
            x.start.row += diff;
            x.end.row += diff;
            return x;
    ***REMOVED***);

        var lines = dir == 0
            ? this.doc.getLines(firstRow, lastRow)
            : this.doc.removeLines(firstRow, lastRow);
        this.doc.insertLines(firstRow+diff, lines);
        folds.length && this.addFolds(folds);
        return diff;
***REMOVED***;
    this.moveLinesUp = function(firstRow, lastRow) ***REMOVED***
        return this.$moveLines(firstRow, lastRow, -1);
***REMOVED***;
    this.moveLinesDown = function(firstRow, lastRow) ***REMOVED***
        return this.$moveLines(firstRow, lastRow, 1);
***REMOVED***;
    this.duplicateLines = function(firstRow, lastRow) ***REMOVED***
        return this.$moveLines(firstRow, lastRow, 0);
***REMOVED***;


    this.$clipRowToDocument = function(row) ***REMOVED***
        return Math.max(0, Math.min(row, this.doc.getLength()-1));
***REMOVED***;

    this.$clipColumnToRow = function(row, column) ***REMOVED***
        if (column < 0)
            return 0;
        return Math.min(this.doc.getLine(row).length, column);
***REMOVED***;


    this.$clipPositionToDocument = function(row, column) ***REMOVED***
        column = Math.max(0, column);

        if (row < 0) ***REMOVED***
            row = 0;
            column = 0;
    ***REMOVED*** else ***REMOVED***
            var len = this.doc.getLength();
            if (row >= len) ***REMOVED***
                row = len - 1;
                column = this.doc.getLine(len-1).length;
        ***REMOVED*** else ***REMOVED***
                column = Math.min(this.doc.getLine(row).length, column);
        ***REMOVED***
    ***REMOVED***

        return ***REMOVED***
            row: row,
            column: column
    ***REMOVED***;
***REMOVED***;

    this.$clipRangeToDocument = function(range) ***REMOVED***
        if (range.start.row < 0) ***REMOVED***
            range.start.row = 0;
            range.start.column = 0;
    ***REMOVED*** else ***REMOVED***
            range.start.column = this.$clipColumnToRow(
                range.start.row,
                range.start.column
            );
    ***REMOVED***

        var len = this.doc.getLength() - 1;
        if (range.end.row > len) ***REMOVED***
            range.end.row = len;
            range.end.column = this.doc.getLine(len).length;
    ***REMOVED*** else ***REMOVED***
            range.end.column = this.$clipColumnToRow(
                range.end.row,
                range.end.column
            );
    ***REMOVED***
        return range;
***REMOVED***;
    this.$wrapLimit = 80;
    this.$useWrapMode = false;
    this.$wrapLimitRange = ***REMOVED***
        min : null,
        max : null
***REMOVED***;
    this.setUseWrapMode = function(useWrapMode) ***REMOVED***
        if (useWrapMode != this.$useWrapMode) ***REMOVED***
            this.$useWrapMode = useWrapMode;
            this.$modified = true;
            this.$resetRowCache(0);
            if (useWrapMode) ***REMOVED***
                var len = this.getLength();
                this.$wrapData = Array(len);
                this.$updateWrapData(0, len - 1);
        ***REMOVED***

            this._signal("changeWrapMode");
    ***REMOVED***
***REMOVED***;
    this.getUseWrapMode = function() ***REMOVED***
        return this.$useWrapMode;
***REMOVED***;
    this.setWrapLimitRange = function(min, max) ***REMOVED***
        if (this.$wrapLimitRange.min !== min || this.$wrapLimitRange.max !== max) ***REMOVED***
            this.$wrapLimitRange = ***REMOVED***
                min: min,
                max: max
        ***REMOVED***;
            this.$modified = true;
            this._signal("changeWrapMode");
    ***REMOVED***
***REMOVED***;
    this.adjustWrapLimit = function(desiredLimit, $printMargin) ***REMOVED***
        var limits = this.$wrapLimitRange
        if (limits.max < 0)
            limits = ***REMOVED***min: $printMargin, max: $printMargin***REMOVED***;
        var wrapLimit = this.$constrainWrapLimit(desiredLimit, limits.min, limits.max);
        if (wrapLimit != this.$wrapLimit && wrapLimit > 1) ***REMOVED***
            this.$wrapLimit = wrapLimit;
            this.$modified = true;
            if (this.$useWrapMode) ***REMOVED***
                this.$updateWrapData(0, this.getLength() - 1);
                this.$resetRowCache(0);
                this._signal("changeWrapLimit");
        ***REMOVED***
            return true;
    ***REMOVED***
        return false;
***REMOVED***;

    this.$constrainWrapLimit = function(wrapLimit, min, max) ***REMOVED***
        if (min)
            wrapLimit = Math.max(min, wrapLimit);

        if (max)
            wrapLimit = Math.min(max, wrapLimit);

        return wrapLimit;
***REMOVED***;
    this.getWrapLimit = function() ***REMOVED***
        return this.$wrapLimit;
***REMOVED***;
    this.setWrapLimit = function (limit) ***REMOVED***
        this.setWrapLimitRange(limit, limit);
***REMOVED***;
    this.getWrapLimitRange = function() ***REMOVED***
        return ***REMOVED***
            min : this.$wrapLimitRange.min,
            max : this.$wrapLimitRange.max
    ***REMOVED***;
***REMOVED***;

    this.$updateInternalDataOnChange = function(e) ***REMOVED***
        var useWrapMode = this.$useWrapMode;
        var len;
        var action = e.data.action;
        var firstRow = e.data.range.start.row;
        var lastRow = e.data.range.end.row;
        var start = e.data.range.start;
        var end = e.data.range.end;
        var removedFolds = null;

        if (action.indexOf("Lines") != -1) ***REMOVED***
            if (action == "insertLines") ***REMOVED***
                lastRow = firstRow + (e.data.lines.length);
        ***REMOVED*** else ***REMOVED***
                lastRow = firstRow;
        ***REMOVED***
            len = e.data.lines ? e.data.lines.length : lastRow - firstRow;
    ***REMOVED*** else ***REMOVED***
            len = lastRow - firstRow;
    ***REMOVED***

        this.$updating = true;
        if (len != 0) ***REMOVED***
            if (action.indexOf("remove") != -1) ***REMOVED***
                this[useWrapMode ? "$wrapData" : "$rowLengthCache"].splice(firstRow, len);

                var foldLines = this.$foldData;
                removedFolds = this.getFoldsInRange(e.data.range);
                this.removeFolds(removedFolds);

                var foldLine = this.getFoldLine(end.row);
                var idx = 0;
                if (foldLine) ***REMOVED***
                    foldLine.addRemoveChars(end.row, end.column, start.column - end.column);
                    foldLine.shiftRow(-len);

                    var foldLineBefore = this.getFoldLine(firstRow);
                    if (foldLineBefore && foldLineBefore !== foldLine) ***REMOVED***
                        foldLineBefore.merge(foldLine);
                        foldLine = foldLineBefore;
                ***REMOVED***
                    idx = foldLines.indexOf(foldLine) + 1;
            ***REMOVED***

                for (idx; idx < foldLines.length; idx++) ***REMOVED***
                    var foldLine = foldLines[idx];
                    if (foldLine.start.row >= end.row) ***REMOVED***
                        foldLine.shiftRow(-len);
                ***REMOVED***
            ***REMOVED***

                lastRow = firstRow;
        ***REMOVED*** else ***REMOVED***
                var args = Array(len);
                args.unshift(firstRow, 0);
                var arr = useWrapMode ? this.$wrapData : this.$rowLengthCache
                arr.splice.apply(arr, args);
                var foldLines = this.$foldData;
                var foldLine = this.getFoldLine(firstRow);
                var idx = 0;
                if (foldLine) ***REMOVED***
                    var cmp = foldLine.range.compareInside(start.row, start.column)
                    if (cmp == 0) ***REMOVED***
                        foldLine = foldLine.split(start.row, start.column);
                        foldLine.shiftRow(len);
                        foldLine.addRemoveChars(
                            lastRow, 0, end.column - start.column);
                ***REMOVED*** else
                    if (cmp == -1) ***REMOVED***
                        foldLine.addRemoveChars(firstRow, 0, end.column - start.column);
                        foldLine.shiftRow(len);
                ***REMOVED***
                    idx = foldLines.indexOf(foldLine) + 1;
            ***REMOVED***

                for (idx; idx < foldLines.length; idx++) ***REMOVED***
                    var foldLine = foldLines[idx];
                    if (foldLine.start.row >= firstRow) ***REMOVED***
                        foldLine.shiftRow(len);
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
    ***REMOVED*** else ***REMOVED***
            len = Math.abs(e.data.range.start.column - e.data.range.end.column);
            if (action.indexOf("remove") != -1) ***REMOVED***
                removedFolds = this.getFoldsInRange(e.data.range);
                this.removeFolds(removedFolds);

                len = -len;
        ***REMOVED***
            var foldLine = this.getFoldLine(firstRow);
            if (foldLine) ***REMOVED***
                foldLine.addRemoveChars(firstRow, start.column, len);
        ***REMOVED***
    ***REMOVED***

        if (useWrapMode && this.$wrapData.length != this.doc.getLength()) ***REMOVED***
            console.error("doc.getLength() and $wrapData.length have to be the same!");
    ***REMOVED***
        this.$updating = false;

        if (useWrapMode)
            this.$updateWrapData(firstRow, lastRow);
        else
            this.$updateRowLengthCache(firstRow, lastRow);

        return removedFolds;
***REMOVED***;

    this.$updateRowLengthCache = function(firstRow, lastRow, b) ***REMOVED***
        this.$rowLengthCache[firstRow] = null;
        this.$rowLengthCache[lastRow] = null;
***REMOVED***;

    this.$updateWrapData = function(firstRow, lastRow) ***REMOVED***
        var lines = this.doc.getAllLines();
        var tabSize = this.getTabSize();
        var wrapData = this.$wrapData;
        var wrapLimit = this.$wrapLimit;
        var tokens;
        var foldLine;

        var row = firstRow;
        lastRow = Math.min(lastRow, lines.length - 1);
        while (row <= lastRow) ***REMOVED***
            foldLine = this.getFoldLine(row, foldLine);
            if (!foldLine) ***REMOVED***
                tokens = this.$getDisplayTokens(lines[row]);
                wrapData[row] = this.$computeWrapSplits(tokens, wrapLimit, tabSize);
                row ++;
        ***REMOVED*** else ***REMOVED***
                tokens = [];
                foldLine.walk(function(placeholder, row, column, lastColumn) ***REMOVED***
                        var walkTokens;
                        if (placeholder != null) ***REMOVED***
                            walkTokens = this.$getDisplayTokens(
                                            placeholder, tokens.length);
                            walkTokens[0] = PLACEHOLDER_START;
                            for (var i = 1; i < walkTokens.length; i++) ***REMOVED***
                                walkTokens[i] = PLACEHOLDER_BODY;
                        ***REMOVED***
                    ***REMOVED*** else ***REMOVED***
                            walkTokens = this.$getDisplayTokens(
                                lines[row].substring(lastColumn, column),
                                tokens.length);
                    ***REMOVED***
                        tokens = tokens.concat(walkTokens);
                ***REMOVED***.bind(this),
                    foldLine.end.row,
                    lines[foldLine.end.row].length + 1
                );

                wrapData[foldLine.start.row] = this.$computeWrapSplits(tokens, wrapLimit, tabSize);
                row = foldLine.end.row + 1;
        ***REMOVED***
    ***REMOVED***
***REMOVED***;
    var CHAR = 1,
        CHAR_EXT = 2,
        PLACEHOLDER_START = 3,
        PLACEHOLDER_BODY =  4,
        PUNCTUATION = 9,
        SPACE = 10,
        TAB = 11,
        TAB_SPACE = 12;


    this.$computeWrapSplits = function(tokens, wrapLimit) ***REMOVED***
        if (tokens.length == 0) ***REMOVED***
            return [];
    ***REMOVED***

        var splits = [];
        var displayLength = tokens.length;
        var lastSplit = 0, lastDocSplit = 0;

        var isCode = this.$wrapAsCode;

        function addSplit(screenPos) ***REMOVED***
            var displayed = tokens.slice(lastSplit, screenPos);
            var len = displayed.length;
            displayed.join("").
                replace(/12/g, function() ***REMOVED***
                    len -= 1;
            ***REMOVED***).
                replace(/2/g, function() ***REMOVED***
                    len -= 1;
            ***REMOVED***);

            lastDocSplit += len;
            splits.push(lastDocSplit);
            lastSplit = screenPos;
    ***REMOVED***

        while (displayLength - lastSplit > wrapLimit) ***REMOVED***
            var split = lastSplit + wrapLimit;
            if (tokens[split - 1] >= SPACE && tokens[split] >= SPACE) ***REMOVED***
                addSplit(split);
                continue;
        ***REMOVED***
            if (tokens[split] == PLACEHOLDER_START || tokens[split] == PLACEHOLDER_BODY) ***REMOVED***
                for (split; split != lastSplit - 1; split--) ***REMOVED***
                    if (tokens[split] == PLACEHOLDER_START) ***REMOVED***
                        break;
                ***REMOVED***
            ***REMOVED***
                if (split > lastSplit) ***REMOVED***
                    addSplit(split);
                    continue;
            ***REMOVED***
                split = lastSplit + wrapLimit;
                for (split; split < tokens.length; split++) ***REMOVED***
                    if (tokens[split] != PLACEHOLDER_BODY) ***REMOVED***
                        break;
                ***REMOVED***
            ***REMOVED***
                if (split == tokens.length) ***REMOVED***
                    break;  // Breaks the while-loop.
            ***REMOVED***
                addSplit(split);
                continue;
        ***REMOVED***
            var minSplit = Math.max(split - (isCode ? 10 : wrapLimit-(wrapLimit>>2)), lastSplit - 1);
            while (split > minSplit && tokens[split] < PLACEHOLDER_START) ***REMOVED***
                split --;
        ***REMOVED***
            if (isCode) ***REMOVED***
                while (split > minSplit && tokens[split] < PLACEHOLDER_START) ***REMOVED***
                    split --;
            ***REMOVED***
                while (split > minSplit && tokens[split] == PUNCTUATION) ***REMOVED***
                    split --;
            ***REMOVED***
        ***REMOVED*** else ***REMOVED***
                while (split > minSplit && tokens[split] < SPACE) ***REMOVED***
                    split --;
            ***REMOVED***
        ***REMOVED***
            if (split > minSplit) ***REMOVED***
                addSplit(++split);
                continue;
        ***REMOVED***
            split = lastSplit + wrapLimit;
            addSplit(split);
    ***REMOVED***
        return splits;
***REMOVED***;
    this.$getDisplayTokens = function(str, offset) ***REMOVED***
        var arr = [];
        var tabSize;
        offset = offset || 0;

        for (var i = 0; i < str.length; i++) ***REMOVED***
            var c = str.charCodeAt(i);
            if (c == 9) ***REMOVED***
                tabSize = this.getScreenTabSize(arr.length + offset);
                arr.push(TAB);
                for (var n = 1; n < tabSize; n++) ***REMOVED***
                    arr.push(TAB_SPACE);
            ***REMOVED***
        ***REMOVED***
            else if (c == 32) ***REMOVED***
                arr.push(SPACE);
        ***REMOVED*** else if((c > 39 && c < 48) || (c > 57 && c < 64)) ***REMOVED***
                arr.push(PUNCTUATION);
        ***REMOVED***
            else if (c >= 0x1100 && isFullWidth(c)) ***REMOVED***
                arr.push(CHAR, CHAR_EXT);
        ***REMOVED*** else ***REMOVED***
                arr.push(CHAR);
        ***REMOVED***
    ***REMOVED***
        return arr;
***REMOVED***;
    this.$getStringScreenWidth = function(str, maxScreenColumn, screenColumn) ***REMOVED***
        if (maxScreenColumn == 0)
            return [0, 0];
        if (maxScreenColumn == null)
            maxScreenColumn = Infinity;
        screenColumn = screenColumn || 0;

        var c, column;
        for (column = 0; column < str.length; column++) ***REMOVED***
            c = str.charCodeAt(column);
            if (c == 9) ***REMOVED***
                screenColumn += this.getScreenTabSize(screenColumn);
        ***REMOVED***
            else if (c >= 0x1100 && isFullWidth(c)) ***REMOVED***
                screenColumn += 2;
        ***REMOVED*** else ***REMOVED***
                screenColumn += 1;
        ***REMOVED***
            if (screenColumn > maxScreenColumn) ***REMOVED***
                break;
        ***REMOVED***
    ***REMOVED***

        return [screenColumn, column];
***REMOVED***;

    this.lineWidgets = null;
    this.getRowLength = function(row) ***REMOVED***
        if (this.lineWidgets)
            var h = this.lineWidgets[row] && this.lineWidgets[row].rowCount || 0;
        else 
            h = 0
        if (!this.$useWrapMode || !this.$wrapData[row]) ***REMOVED***
            return 1 + h;
    ***REMOVED*** else ***REMOVED***
            return this.$wrapData[row].length + 1 + h;
    ***REMOVED***
***REMOVED***;
    this.getRowLineCount = function(row) ***REMOVED***
        if (!this.$useWrapMode || !this.$wrapData[row]) ***REMOVED***
            return 1;
    ***REMOVED*** else ***REMOVED***
            return this.$wrapData[row].length + 1;
    ***REMOVED***
***REMOVED***;
    this.getScreenLastRowColumn = function(screenRow) ***REMOVED***
        var pos = this.screenToDocumentPosition(screenRow, Number.MAX_VALUE);
        return this.documentToScreenColumn(pos.row, pos.column);
***REMOVED***;
    this.getDocumentLastRowColumn = function(docRow, docColumn) ***REMOVED***
        var screenRow = this.documentToScreenRow(docRow, docColumn);
        return this.getScreenLastRowColumn(screenRow);
***REMOVED***;
    this.getDocumentLastRowColumnPosition = function(docRow, docColumn) ***REMOVED***
        var screenRow = this.documentToScreenRow(docRow, docColumn);
        return this.screenToDocumentPosition(screenRow, Number.MAX_VALUE / 10);
***REMOVED***;
    this.getRowSplitData = function(row) ***REMOVED***
        if (!this.$useWrapMode) ***REMOVED***
            return undefined;
    ***REMOVED*** else ***REMOVED***
            return this.$wrapData[row];
    ***REMOVED***
***REMOVED***;
    this.getScreenTabSize = function(screenColumn) ***REMOVED***
        return this.$tabSize - screenColumn % this.$tabSize;
***REMOVED***;


    this.screenToDocumentRow = function(screenRow, screenColumn) ***REMOVED***
        return this.screenToDocumentPosition(screenRow, screenColumn).row;
***REMOVED***;


    this.screenToDocumentColumn = function(screenRow, screenColumn) ***REMOVED***
        return this.screenToDocumentPosition(screenRow, screenColumn).column;
***REMOVED***;
    this.screenToDocumentPosition = function(screenRow, screenColumn) ***REMOVED***
        if (screenRow < 0)
            return ***REMOVED***row: 0, column: 0***REMOVED***;

        var line;
        var docRow = 0;
        var docColumn = 0;
        var column;
        var row = 0;
        var rowLength = 0;

        var rowCache = this.$screenRowCache;
        var i = this.$getRowCacheIndex(rowCache, screenRow);
        var l = rowCache.length;
        if (l && i >= 0) ***REMOVED***
            var row = rowCache[i];
            var docRow = this.$docRowCache[i];
            var doCache = screenRow > rowCache[l - 1];
    ***REMOVED*** else ***REMOVED***
            var doCache = !l;
    ***REMOVED***

        var maxRow = this.getLength() - 1;
        var foldLine = this.getNextFoldLine(docRow);
        var foldStart = foldLine ? foldLine.start.row : Infinity;

        while (row <= screenRow) ***REMOVED***
            rowLength = this.getRowLength(docRow);
            if (row + rowLength > screenRow || docRow >= maxRow) ***REMOVED***
                break;
        ***REMOVED*** else ***REMOVED***
                row += rowLength;
                docRow++;
                if (docRow > foldStart) ***REMOVED***
                    docRow = foldLine.end.row+1;
                    foldLine = this.getNextFoldLine(docRow, foldLine);
                    foldStart = foldLine ? foldLine.start.row : Infinity;
            ***REMOVED***
        ***REMOVED***

            if (doCache) ***REMOVED***
                this.$docRowCache.push(docRow);
                this.$screenRowCache.push(row);
        ***REMOVED***
    ***REMOVED***

        if (foldLine && foldLine.start.row <= docRow) ***REMOVED***
            line = this.getFoldDisplayLine(foldLine);
            docRow = foldLine.start.row;
    ***REMOVED*** else if (row + rowLength <= screenRow || docRow > maxRow) ***REMOVED***
            return ***REMOVED***
                row: maxRow,
                column: this.getLine(maxRow).length
        ***REMOVED***
    ***REMOVED*** else ***REMOVED***
            line = this.getLine(docRow);
            foldLine = null;
    ***REMOVED***

        if (this.$useWrapMode) ***REMOVED***
            var splits = this.$wrapData[docRow];
            if (splits) ***REMOVED***
                var splitIndex = Math.floor(screenRow - row);
                column = splits[splitIndex];
                if(splitIndex > 0 && splits.length) ***REMOVED***
                    docColumn = splits[splitIndex - 1] || splits[splits.length - 1];
                    line = line.substring(docColumn);
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***

        docColumn += this.$getStringScreenWidth(line, screenColumn)[1];
        if (this.$useWrapMode && docColumn >= column)
            docColumn = column - 1;

        if (foldLine)
            return foldLine.idxToPosition(docColumn);

        return ***REMOVED***row: docRow, column: docColumn***REMOVED***;
***REMOVED***;
    this.documentToScreenPosition = function(docRow, docColumn) ***REMOVED***
        if (typeof docColumn === "undefined")
            var pos = this.$clipPositionToDocument(docRow.row, docRow.column);
        else
            pos = this.$clipPositionToDocument(docRow, docColumn);

        docRow = pos.row;
        docColumn = pos.column;

        var screenRow = 0;
        var foldStartRow = null;
        var fold = null;
        fold = this.getFoldAt(docRow, docColumn, 1);
        if (fold) ***REMOVED***
            docRow = fold.start.row;
            docColumn = fold.start.column;
    ***REMOVED***

        var rowEnd, row = 0;


        var rowCache = this.$docRowCache;
        var i = this.$getRowCacheIndex(rowCache, docRow);
        var l = rowCache.length;
        if (l && i >= 0) ***REMOVED***
            var row = rowCache[i];
            var screenRow = this.$screenRowCache[i];
            var doCache = docRow > rowCache[l - 1];
    ***REMOVED*** else ***REMOVED***
            var doCache = !l;
    ***REMOVED***

        var foldLine = this.getNextFoldLine(row);
        var foldStart = foldLine ?foldLine.start.row :Infinity;

        while (row < docRow) ***REMOVED***
            if (row >= foldStart) ***REMOVED***
                rowEnd = foldLine.end.row + 1;
                if (rowEnd > docRow)
                    break;
                foldLine = this.getNextFoldLine(rowEnd, foldLine);
                foldStart = foldLine ?foldLine.start.row :Infinity;
        ***REMOVED***
            else ***REMOVED***
                rowEnd = row + 1;
        ***REMOVED***

            screenRow += this.getRowLength(row);
            row = rowEnd;

            if (doCache) ***REMOVED***
                this.$docRowCache.push(row);
                this.$screenRowCache.push(screenRow);
        ***REMOVED***
    ***REMOVED***
        var textLine = "";
        if (foldLine && row >= foldStart) ***REMOVED***
            textLine = this.getFoldDisplayLine(foldLine, docRow, docColumn);
            foldStartRow = foldLine.start.row;
    ***REMOVED*** else ***REMOVED***
            textLine = this.getLine(docRow).substring(0, docColumn);
            foldStartRow = docRow;
    ***REMOVED***
        if (this.$useWrapMode) ***REMOVED***
            var wrapRow = this.$wrapData[foldStartRow];
            if (wrapRow) ***REMOVED***
                var screenRowOffset = 0;
                while (textLine.length >= wrapRow[screenRowOffset]) ***REMOVED***
                    screenRow ++;
                    screenRowOffset++;
            ***REMOVED***
                textLine = textLine.substring(
                    wrapRow[screenRowOffset - 1] || 0, textLine.length
                );
        ***REMOVED***
    ***REMOVED***

        return ***REMOVED***
            row: screenRow,
            column: this.$getStringScreenWidth(textLine)[0]
    ***REMOVED***;
***REMOVED***;
    this.documentToScreenColumn = function(row, docColumn) ***REMOVED***
        return this.documentToScreenPosition(row, docColumn).column;
***REMOVED***;
    this.documentToScreenRow = function(docRow, docColumn) ***REMOVED***
        return this.documentToScreenPosition(docRow, docColumn).row;
***REMOVED***;
    this.getScreenLength = function() ***REMOVED***
        var screenRows = 0;
        var fold = null;
        if (!this.$useWrapMode) ***REMOVED***
            screenRows = this.getLength();
            var foldData = this.$foldData;
            for (var i = 0; i < foldData.length; i++) ***REMOVED***
                fold = foldData[i];
                screenRows -= fold.end.row - fold.start.row;
        ***REMOVED***
    ***REMOVED*** else ***REMOVED***
            var lastRow = this.$wrapData.length;
            var row = 0, i = 0;
            var fold = this.$foldData[i++];
            var foldStart = fold ? fold.start.row :Infinity;

            while (row < lastRow) ***REMOVED***
                var splits = this.$wrapData[row];
                screenRows += splits ? splits.length + 1 : 1;
                row ++;
                if (row > foldStart) ***REMOVED***
                    row = fold.end.row+1;
                    fold = this.$foldData[i++];
                    foldStart = fold ?fold.start.row :Infinity;
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***
        if (this.lineWidgets)
            screenRows += this.$getWidgetScreenLength();

        return screenRows;
***REMOVED***;
    this.$setFontMetrics = function(fm) ***REMOVED***
***REMOVED***
    function isFullWidth(c) ***REMOVED***
        if (c < 0x1100)
            return false;
        return c >= 0x1100 && c <= 0x115F ||
               c >= 0x11A3 && c <= 0x11A7 ||
               c >= 0x11FA && c <= 0x11FF ||
               c >= 0x2329 && c <= 0x232A ||
               c >= 0x2E80 && c <= 0x2E99 ||
               c >= 0x2E9B && c <= 0x2EF3 ||
               c >= 0x2F00 && c <= 0x2FD5 ||
               c >= 0x2FF0 && c <= 0x2FFB ||
               c >= 0x3000 && c <= 0x303E ||
               c >= 0x3041 && c <= 0x3096 ||
               c >= 0x3099 && c <= 0x30FF ||
               c >= 0x3105 && c <= 0x312D ||
               c >= 0x3131 && c <= 0x318E ||
               c >= 0x3190 && c <= 0x31BA ||
               c >= 0x31C0 && c <= 0x31E3 ||
               c >= 0x31F0 && c <= 0x321E ||
               c >= 0x3220 && c <= 0x3247 ||
               c >= 0x3250 && c <= 0x32FE ||
               c >= 0x3300 && c <= 0x4DBF ||
               c >= 0x4E00 && c <= 0xA48C ||
               c >= 0xA490 && c <= 0xA4C6 ||
               c >= 0xA960 && c <= 0xA97C ||
               c >= 0xAC00 && c <= 0xD7A3 ||
               c >= 0xD7B0 && c <= 0xD7C6 ||
               c >= 0xD7CB && c <= 0xD7FB ||
               c >= 0xF900 && c <= 0xFAFF ||
               c >= 0xFE10 && c <= 0xFE19 ||
               c >= 0xFE30 && c <= 0xFE52 ||
               c >= 0xFE54 && c <= 0xFE66 ||
               c >= 0xFE68 && c <= 0xFE6B ||
               c >= 0xFF01 && c <= 0xFF60 ||
               c >= 0xFFE0 && c <= 0xFFE6;
***REMOVED***;

***REMOVED***).call(EditSession.prototype);

require("./edit_session/folding").Folding.call(EditSession.prototype);
require("./edit_session/bracket_match").BracketMatch.call(EditSession.prototype);


config.defineOptions(EditSession.prototype, "session", ***REMOVED***
    wrap: ***REMOVED***
        set: function(value) ***REMOVED***
            if (!value || value == "off")
                value = false;
            else if (value == "free")
                value = true;
            else if (value == "printMargin")
                value = -1;
            else if (typeof value == "string")
                value = parseInt(value, 10) || false;

            if (this.$wrap == value)
                return;
            if (!value) ***REMOVED***
                this.setUseWrapMode(false);
        ***REMOVED*** else ***REMOVED***
                var col = typeof value == "number" ? value : null;
                this.setWrapLimitRange(col, col);
                this.setUseWrapMode(true);
        ***REMOVED***
            this.$wrap = value;
    ***REMOVED***
        get: function() ***REMOVED***
            if (this.getUseWrapMode()) ***REMOVED***
                if (this.$wrap == -1)
                    return "printMargin";
                if (!this.getWrapLimitRange().min)
                    return "free";
                return this.$wrap;
        ***REMOVED***
            return "off";
    ***REMOVED***
        handlesSet: true
***REMOVED***    
    wrapMethod: ***REMOVED***
        set: function(val) ***REMOVED***
            val = val == "auto"
                ? this.$mode.type != "text"
                : val != "text";
            if (val != this.$wrapAsCode) ***REMOVED***
                this.$wrapAsCode = val;
                if (this.$useWrapMode) ***REMOVED***
                    this.$modified = true;
                    this.$resetRowCache(0);
                    this.$updateWrapData(0, this.getLength() - 1);
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***
        initialValue: "auto"
***REMOVED***
    firstLineNumber: ***REMOVED***
        set: function() ***REMOVED***this._signal("changeBreakpoint");***REMOVED***,
        initialValue: 1
***REMOVED***
    useWorker: ***REMOVED***
        set: function(useWorker) ***REMOVED***
            this.$useWorker = useWorker;

            this.$stopWorker();
            if (useWorker)
                this.$startWorker();
    ***REMOVED***
        initialValue: true
***REMOVED***
    useSoftTabs: ***REMOVED***initialValue: true***REMOVED***,
    tabSize: ***REMOVED***
        set: function(tabSize) ***REMOVED***
            if (isNaN(tabSize) || this.$tabSize === tabSize) return;

            this.$modified = true;
            this.$rowLengthCache = [];
            this.$tabSize = tabSize;
            this._signal("changeTabSize");
    ***REMOVED***
        initialValue: 4,
        handlesSet: true
***REMOVED***
    overwrite: ***REMOVED***
        set: function(val) ***REMOVED***this._signal("changeOverwrite");***REMOVED***,
        initialValue: false
***REMOVED***
    newLineMode: ***REMOVED***
        set: function(val) ***REMOVED***this.doc.setNewLineMode(val)***REMOVED***,
        get: function() ***REMOVED***return this.doc.getNewLineMode()***REMOVED***,
        handlesSet: true
***REMOVED***
    mode: ***REMOVED***
        set: function(val) ***REMOVED*** this.setMode(val) ***REMOVED***,
        get: function() ***REMOVED*** return this.$modeId ***REMOVED***
***REMOVED***
***REMOVED***);

exports.EditSession = EditSession;
***REMOVED***);

__ace_shadowed__.define('ace/selection', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/lib/lang', 'ace/lib/event_emitter', 'ace/range'], function(require, exports, module) ***REMOVED***


var oop = require("./lib/oop");
var lang = require("./lib/lang");
var EventEmitter = require("./lib/event_emitter").EventEmitter;
var Range = require("./range").Range;
var Selection = function(session) ***REMOVED***
    this.session = session;
    this.doc = session.getDocument();

    this.clearSelection();
    this.lead = this.selectionLead = this.doc.createAnchor(0, 0);
    this.anchor = this.selectionAnchor = this.doc.createAnchor(0, 0);

    var self = this;
    this.lead.on("change", function(e) ***REMOVED***
        self._emit("changeCursor");
        if (!self.$isEmpty)
            self._emit("changeSelection");
        if (!self.$keepDesiredColumnOnChange && e.old.column != e.value.column)
            self.$desiredColumn = null;
***REMOVED***);

    this.selectionAnchor.on("change", function() ***REMOVED***
        if (!self.$isEmpty)
            self._emit("changeSelection");
***REMOVED***);
***REMOVED***;

(function() ***REMOVED***

    oop.implement(this, EventEmitter);
    this.isEmpty = function() ***REMOVED***
        return (this.$isEmpty || (
            this.anchor.row == this.lead.row &&
            this.anchor.column == this.lead.column
        ));
***REMOVED***;
    this.isMultiLine = function() ***REMOVED***
        if (this.isEmpty()) ***REMOVED***
            return false;
    ***REMOVED***

        return this.getRange().isMultiLine();
***REMOVED***;
    this.getCursor = function() ***REMOVED***
        return this.lead.getPosition();
***REMOVED***;
    this.setSelectionAnchor = function(row, column) ***REMOVED***
        this.anchor.setPosition(row, column);

        if (this.$isEmpty) ***REMOVED***
            this.$isEmpty = false;
            this._emit("changeSelection");
    ***REMOVED***
***REMOVED***;
    this.getSelectionAnchor = function() ***REMOVED***
        if (this.$isEmpty)
            return this.getSelectionLead()
        else
            return this.anchor.getPosition();
***REMOVED***;
    this.getSelectionLead = function() ***REMOVED***
        return this.lead.getPosition();
***REMOVED***;
    this.shiftSelection = function(columns) ***REMOVED***
        if (this.$isEmpty) ***REMOVED***
            this.moveCursorTo(this.lead.row, this.lead.column + columns);
            return;
    ***REMOVED***;

        var anchor = this.getSelectionAnchor();
        var lead = this.getSelectionLead();

        var isBackwards = this.isBackwards();

        if (!isBackwards || anchor.column !== 0)
            this.setSelectionAnchor(anchor.row, anchor.column + columns);

        if (isBackwards || lead.column !== 0) ***REMOVED***
            this.$moveSelection(function() ***REMOVED***
                this.moveCursorTo(lead.row, lead.column + columns);
        ***REMOVED***);
    ***REMOVED***
***REMOVED***;
    this.isBackwards = function() ***REMOVED***
        var anchor = this.anchor;
        var lead = this.lead;
        return (anchor.row > lead.row || (anchor.row == lead.row && anchor.column > lead.column));
***REMOVED***;
    this.getRange = function() ***REMOVED***
        var anchor = this.anchor;
        var lead = this.lead;

        if (this.isEmpty())
            return Range.fromPoints(lead, lead);

        if (this.isBackwards()) ***REMOVED***
            return Range.fromPoints(lead, anchor);
    ***REMOVED***
        else ***REMOVED***
            return Range.fromPoints(anchor, lead);
    ***REMOVED***
***REMOVED***;
    this.clearSelection = function() ***REMOVED***
        if (!this.$isEmpty) ***REMOVED***
            this.$isEmpty = true;
            this._emit("changeSelection");
    ***REMOVED***
***REMOVED***;
    this.selectAll = function() ***REMOVED***
        var lastRow = this.doc.getLength() - 1;
        this.setSelectionAnchor(0, 0);
        this.moveCursorTo(lastRow, this.doc.getLine(lastRow).length);
***REMOVED***;
    this.setRange =
    this.setSelectionRange = function(range, reverse) ***REMOVED***
        if (reverse) ***REMOVED***
            this.setSelectionAnchor(range.end.row, range.end.column);
            this.selectTo(range.start.row, range.start.column);
    ***REMOVED*** else ***REMOVED***
            this.setSelectionAnchor(range.start.row, range.start.column);
            this.selectTo(range.end.row, range.end.column);
    ***REMOVED***
        if (this.getRange().isEmpty())
            this.$isEmpty = true;
        this.$desiredColumn = null;
***REMOVED***;

    this.$moveSelection = function(mover) ***REMOVED***
        var lead = this.lead;
        if (this.$isEmpty)
            this.setSelectionAnchor(lead.row, lead.column);

        mover.call(this);
***REMOVED***;
    this.selectTo = function(row, column) ***REMOVED***
        this.$moveSelection(function() ***REMOVED***
            this.moveCursorTo(row, column);
    ***REMOVED***);
***REMOVED***;
    this.selectToPosition = function(pos) ***REMOVED***
        this.$moveSelection(function() ***REMOVED***
            this.moveCursorToPosition(pos);
    ***REMOVED***);
***REMOVED***;
    this.moveTo = function(row, column) ***REMOVED***
        this.clearSelection();
        this.moveCursorTo(row, column);
***REMOVED***;
    this.moveToPosition = function(pos) ***REMOVED***
        this.clearSelection();
        this.moveCursorToPosition(pos);
***REMOVED***;
    this.selectUp = function() ***REMOVED***
        this.$moveSelection(this.moveCursorUp);
***REMOVED***;
    this.selectDown = function() ***REMOVED***
        this.$moveSelection(this.moveCursorDown);
***REMOVED***;
    this.selectRight = function() ***REMOVED***
        this.$moveSelection(this.moveCursorRight);
***REMOVED***;
    this.selectLeft = function() ***REMOVED***
        this.$moveSelection(this.moveCursorLeft);
***REMOVED***;
    this.selectLineStart = function() ***REMOVED***
        this.$moveSelection(this.moveCursorLineStart);
***REMOVED***;
    this.selectLineEnd = function() ***REMOVED***
        this.$moveSelection(this.moveCursorLineEnd);
***REMOVED***;
    this.selectFileEnd = function() ***REMOVED***
        this.$moveSelection(this.moveCursorFileEnd);
***REMOVED***;
    this.selectFileStart = function() ***REMOVED***
        this.$moveSelection(this.moveCursorFileStart);
***REMOVED***;
    this.selectWordRight = function() ***REMOVED***
        this.$moveSelection(this.moveCursorWordRight);
***REMOVED***;
    this.selectWordLeft = function() ***REMOVED***
        this.$moveSelection(this.moveCursorWordLeft);
***REMOVED***;
    this.getWordRange = function(row, column) ***REMOVED***
        if (typeof column == "undefined") ***REMOVED***
            var cursor = row || this.lead;
            row = cursor.row;
            column = cursor.column;
    ***REMOVED***
        return this.session.getWordRange(row, column);
***REMOVED***;
    this.selectWord = function() ***REMOVED***
        this.setSelectionRange(this.getWordRange());
***REMOVED***;
    this.selectAWord = function() ***REMOVED***
        var cursor = this.getCursor();
        var range = this.session.getAWordRange(cursor.row, cursor.column);
        this.setSelectionRange(range);
***REMOVED***;

    this.getLineRange = function(row, excludeLastChar) ***REMOVED***
        var rowStart = typeof row == "number" ? row : this.lead.row;
        var rowEnd;

        var foldLine = this.session.getFoldLine(rowStart);
        if (foldLine) ***REMOVED***
            rowStart = foldLine.start.row;
            rowEnd = foldLine.end.row;
    ***REMOVED*** else ***REMOVED***
            rowEnd = rowStart;
    ***REMOVED***
        if (excludeLastChar === true)
            return new Range(rowStart, 0, rowEnd, this.session.getLine(rowEnd).length);
        else
            return new Range(rowStart, 0, rowEnd + 1, 0);
***REMOVED***;
    this.selectLine = function() ***REMOVED***
        this.setSelectionRange(this.getLineRange());
***REMOVED***;
    this.moveCursorUp = function() ***REMOVED***
        this.moveCursorBy(-1, 0);
***REMOVED***;
    this.moveCursorDown = function() ***REMOVED***
        this.moveCursorBy(1, 0);
***REMOVED***;
    this.moveCursorLeft = function() ***REMOVED***
        var cursor = this.lead.getPosition(),
            fold;

        if (fold = this.session.getFoldAt(cursor.row, cursor.column, -1)) ***REMOVED***
            this.moveCursorTo(fold.start.row, fold.start.column);
    ***REMOVED*** else if (cursor.column == 0) ***REMOVED***
            if (cursor.row > 0) ***REMOVED***
                this.moveCursorTo(cursor.row - 1, this.doc.getLine(cursor.row - 1).length);
        ***REMOVED***
    ***REMOVED***
        else ***REMOVED***
            var tabSize = this.session.getTabSize();
            if (this.session.isTabStop(cursor) && this.doc.getLine(cursor.row).slice(cursor.column-tabSize, cursor.column).split(" ").length-1 == tabSize)
                this.moveCursorBy(0, -tabSize);
            else
                this.moveCursorBy(0, -1);
    ***REMOVED***
***REMOVED***;
    this.moveCursorRight = function() ***REMOVED***
        var cursor = this.lead.getPosition(),
            fold;
        if (fold = this.session.getFoldAt(cursor.row, cursor.column, 1)) ***REMOVED***
            this.moveCursorTo(fold.end.row, fold.end.column);
    ***REMOVED***
        else if (this.lead.column == this.doc.getLine(this.lead.row).length) ***REMOVED***
            if (this.lead.row < this.doc.getLength() - 1) ***REMOVED***
                this.moveCursorTo(this.lead.row + 1, 0);
        ***REMOVED***
    ***REMOVED***
        else ***REMOVED***
            var tabSize = this.session.getTabSize();
            var cursor = this.lead;
            if (this.session.isTabStop(cursor) && this.doc.getLine(cursor.row).slice(cursor.column, cursor.column+tabSize).split(" ").length-1 == tabSize)
                this.moveCursorBy(0, tabSize);
            else
                this.moveCursorBy(0, 1);
    ***REMOVED***
***REMOVED***;
    this.moveCursorLineStart = function() ***REMOVED***
        var row = this.lead.row;
        var column = this.lead.column;
        var screenRow = this.session.documentToScreenRow(row, column);
        var firstColumnPosition = this.session.screenToDocumentPosition(screenRow, 0);
        var beforeCursor = this.session.getDisplayLine(
            row, null, firstColumnPosition.row,
            firstColumnPosition.column
        );

        var leadingSpace = beforeCursor.match(/^\s*/);
        if (leadingSpace[0].length != column && !this.session.$useEmacsStyleLineStart)
            firstColumnPosition.column += leadingSpace[0].length;
        this.moveCursorToPosition(firstColumnPosition);
***REMOVED***;
    this.moveCursorLineEnd = function() ***REMOVED***
        var lead = this.lead;
        var lineEnd = this.session.getDocumentLastRowColumnPosition(lead.row, lead.column);
        if (this.lead.column == lineEnd.column) ***REMOVED***
            var line = this.session.getLine(lineEnd.row);
            if (lineEnd.column == line.length) ***REMOVED***
                var textEnd = line.search(/\s+$/);
                if (textEnd > 0)
                    lineEnd.column = textEnd;
        ***REMOVED***
    ***REMOVED***

        this.moveCursorTo(lineEnd.row, lineEnd.column);
***REMOVED***;
    this.moveCursorFileEnd = function() ***REMOVED***
        var row = this.doc.getLength() - 1;
        var column = this.doc.getLine(row).length;
        this.moveCursorTo(row, column);
***REMOVED***;
    this.moveCursorFileStart = function() ***REMOVED***
        this.moveCursorTo(0, 0);
***REMOVED***;
    this.moveCursorLongWordRight = function() ***REMOVED***
        var row = this.lead.row;
        var column = this.lead.column;
        var line = this.doc.getLine(row);
        var rightOfCursor = line.substring(column);

        var match;
        this.session.nonTokenRe.lastIndex = 0;
        this.session.tokenRe.lastIndex = 0;
        var fold = this.session.getFoldAt(row, column, 1);
        if (fold) ***REMOVED***
            this.moveCursorTo(fold.end.row, fold.end.column);
            return;
    ***REMOVED***
        if (match = this.session.nonTokenRe.exec(rightOfCursor)) ***REMOVED***
            column += this.session.nonTokenRe.lastIndex;
            this.session.nonTokenRe.lastIndex = 0;
            rightOfCursor = line.substring(column);
    ***REMOVED***
        if (column >= line.length) ***REMOVED***
            this.moveCursorTo(row, line.length);
            this.moveCursorRight();
            if (row < this.doc.getLength() - 1)
                this.moveCursorWordRight();
            return;
    ***REMOVED***
        if (match = this.session.tokenRe.exec(rightOfCursor)) ***REMOVED***
            column += this.session.tokenRe.lastIndex;
            this.session.tokenRe.lastIndex = 0;
    ***REMOVED***

        this.moveCursorTo(row, column);
***REMOVED***;
    this.moveCursorLongWordLeft = function() ***REMOVED***
        var row = this.lead.row;
        var column = this.lead.column;
        var fold;
        if (fold = this.session.getFoldAt(row, column, -1)) ***REMOVED***
            this.moveCursorTo(fold.start.row, fold.start.column);
            return;
    ***REMOVED***

        var str = this.session.getFoldStringAt(row, column, -1);
        if (str == null) ***REMOVED***
            str = this.doc.getLine(row).substring(0, column)
    ***REMOVED***

        var leftOfCursor = lang.stringReverse(str);
        var match;
        this.session.nonTokenRe.lastIndex = 0;
        this.session.tokenRe.lastIndex = 0;
        if (match = this.session.nonTokenRe.exec(leftOfCursor)) ***REMOVED***
            column -= this.session.nonTokenRe.lastIndex;
            leftOfCursor = leftOfCursor.slice(this.session.nonTokenRe.lastIndex);
            this.session.nonTokenRe.lastIndex = 0;
    ***REMOVED***
        if (column <= 0) ***REMOVED***
            this.moveCursorTo(row, 0);
            this.moveCursorLeft();
            if (row > 0)
                this.moveCursorWordLeft();
            return;
    ***REMOVED***
        if (match = this.session.tokenRe.exec(leftOfCursor)) ***REMOVED***
            column -= this.session.tokenRe.lastIndex;
            this.session.tokenRe.lastIndex = 0;
    ***REMOVED***

        this.moveCursorTo(row, column);
***REMOVED***;

    this.$shortWordEndIndex = function(rightOfCursor) ***REMOVED***
        var match, index = 0, ch;
        var whitespaceRe = /\s/;
        var tokenRe = this.session.tokenRe;

        tokenRe.lastIndex = 0;
        if (match = this.session.tokenRe.exec(rightOfCursor)) ***REMOVED***
            index = this.session.tokenRe.lastIndex;
    ***REMOVED*** else ***REMOVED***
            while ((ch = rightOfCursor[index]) && whitespaceRe.test(ch))
                index ++;

            if (index < 1) ***REMOVED***
                tokenRe.lastIndex = 0;
                 while ((ch = rightOfCursor[index]) && !tokenRe.test(ch)) ***REMOVED***
                    tokenRe.lastIndex = 0;
                    index ++;
                    if (whitespaceRe.test(ch)) ***REMOVED***
                        if (index > 2) ***REMOVED***
                            index--
                            break;
                    ***REMOVED*** else ***REMOVED***
                            while ((ch = rightOfCursor[index]) && whitespaceRe.test(ch))
                                index ++;
                            if (index > 2)
                                break
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***
        tokenRe.lastIndex = 0;

        return index;
***REMOVED***;

    this.moveCursorShortWordRight = function() ***REMOVED***
        var row = this.lead.row;
        var column = this.lead.column;
        var line = this.doc.getLine(row);
        var rightOfCursor = line.substring(column);

        var fold = this.session.getFoldAt(row, column, 1);
        if (fold)
            return this.moveCursorTo(fold.end.row, fold.end.column);

        if (column == line.length) ***REMOVED***
            var l = this.doc.getLength();
            do ***REMOVED***
                row++;
                rightOfCursor = this.doc.getLine(row)
        ***REMOVED*** while (row < l && /^\s*$/.test(rightOfCursor))

            if (!/^\s+/.test(rightOfCursor))
                rightOfCursor = ""
            column = 0;
    ***REMOVED***

        var index = this.$shortWordEndIndex(rightOfCursor);

        this.moveCursorTo(row, column + index);
***REMOVED***;

    this.moveCursorShortWordLeft = function() ***REMOVED***
        var row = this.lead.row;
        var column = this.lead.column;

        var fold;
        if (fold = this.session.getFoldAt(row, column, -1))
            return this.moveCursorTo(fold.start.row, fold.start.column);

        var line = this.session.getLine(row).substring(0, column);
        if (column == 0) ***REMOVED***
            do ***REMOVED***
                row--;
                line = this.doc.getLine(row);
        ***REMOVED*** while (row > 0 && /^\s*$/.test(line))

            column = line.length;
            if (!/\s+$/.test(line))
                line = ""
    ***REMOVED***

        var leftOfCursor = lang.stringReverse(line);
        var index = this.$shortWordEndIndex(leftOfCursor);

        return this.moveCursorTo(row, column - index);
***REMOVED***;

    this.moveCursorWordRight = function() ***REMOVED***
        if (this.session.$selectLongWords)
            this.moveCursorLongWordRight();
        else
            this.moveCursorShortWordRight();
***REMOVED***;

    this.moveCursorWordLeft = function() ***REMOVED***
        if (this.session.$selectLongWords)
            this.moveCursorLongWordLeft();
        else
            this.moveCursorShortWordLeft();
***REMOVED***;
    this.moveCursorBy = function(rows, chars) ***REMOVED***
        var screenPos = this.session.documentToScreenPosition(
            this.lead.row,
            this.lead.column
        );

        if (chars === 0) ***REMOVED***
            if (this.$desiredColumn)
                screenPos.column = this.$desiredColumn;
            else
                this.$desiredColumn = screenPos.column;
    ***REMOVED***

        var docPos = this.session.screenToDocumentPosition(screenPos.row + rows, screenPos.column);
        
        if (rows !== 0 && chars === 0 && docPos.row === this.lead.row && docPos.column === this.lead.column) ***REMOVED***
            if (this.session.lineWidgets && this.session.lineWidgets[docPos.row])
                docPos.row++;
    ***REMOVED***
        this.moveCursorTo(docPos.row, docPos.column + chars, chars === 0);
***REMOVED***;
    this.moveCursorToPosition = function(position) ***REMOVED***
        this.moveCursorTo(position.row, position.column);
***REMOVED***;
    this.moveCursorTo = function(row, column, keepDesiredColumn) ***REMOVED***
        var fold = this.session.getFoldAt(row, column, 1);
        if (fold) ***REMOVED***
            row = fold.start.row;
            column = fold.start.column;
    ***REMOVED***

        this.$keepDesiredColumnOnChange = true;
        this.lead.setPosition(row, column);
        this.$keepDesiredColumnOnChange = false;

        if (!keepDesiredColumn)
            this.$desiredColumn = null;
***REMOVED***;
    this.moveCursorToScreen = function(row, column, keepDesiredColumn) ***REMOVED***
        var pos = this.session.screenToDocumentPosition(row, column);
        this.moveCursorTo(pos.row, pos.column, keepDesiredColumn);
***REMOVED***;
    this.detach = function() ***REMOVED***
        this.lead.detach();
        this.anchor.detach();
        this.session = this.doc = null;
***REMOVED***

    this.fromOrientedRange = function(range) ***REMOVED***
        this.setSelectionRange(range, range.cursor == range.start);
        this.$desiredColumn = range.desiredColumn || this.$desiredColumn;
***REMOVED***

    this.toOrientedRange = function(range) ***REMOVED***
        var r = this.getRange();
        if (range) ***REMOVED***
            range.start.column = r.start.column;
            range.start.row = r.start.row;
            range.end.column = r.end.column;
            range.end.row = r.end.row;
    ***REMOVED*** else ***REMOVED***
            range = r;
    ***REMOVED***

        range.cursor = this.isBackwards() ? range.start : range.end;
        range.desiredColumn = this.$desiredColumn;
        return range;
***REMOVED***
    this.getRangeOfMovements = function(func) ***REMOVED***
        var start = this.getCursor();
        try ***REMOVED***
            func.call(null, this);
            var end = this.getCursor();
            return Range.fromPoints(start,end);
    ***REMOVED*** catch(e) ***REMOVED***
            return Range.fromPoints(start,start);
    ***REMOVED*** finally ***REMOVED***
            this.moveCursorToPosition(start);
    ***REMOVED***
***REMOVED***

    this.toJSON = function() ***REMOVED***
        if (this.rangeCount) ***REMOVED***
            var data = this.ranges.map(function(r) ***REMOVED***
                var r1 = r.clone();
                r1.isBackwards = r.cursor == r.start;
                return r1;
        ***REMOVED***);
    ***REMOVED*** else ***REMOVED***
            var data = this.getRange();
            data.isBackwards = this.isBackwards();
    ***REMOVED***
        return data;
***REMOVED***;

    this.fromJSON = function(data) ***REMOVED***
        if (data.start == undefined) ***REMOVED***
            if (this.rangeList) ***REMOVED***
                this.toSingleRange(data[0]);
                for (var i = data.length; i--; ) ***REMOVED***
                    var r = Range.fromPoints(data[i].start, data[i].end);
                    if (data.isBackwards)
                        r.cursor = r.start;
                    this.addRange(r, true);
            ***REMOVED***
                return;
        ***REMOVED*** else
                data = data[0];
    ***REMOVED***
        if (this.rangeList)
            this.toSingleRange(data);
        this.setSelectionRange(data, data.isBackwards);
***REMOVED***;

    this.isEqual = function(data) ***REMOVED***
        if ((data.length || this.rangeCount) && data.length != this.rangeCount)
            return false;
        if (!data.length || !this.ranges)
            return this.getRange().isEqual(data);

        for (var i = this.ranges.length; i--; ) ***REMOVED***
            if (!this.ranges[i].isEqual(data[i]))
                return false
    ***REMOVED***
        return true;
***REMOVED***

***REMOVED***).call(Selection.prototype);

exports.Selection = Selection;
***REMOVED***);

__ace_shadowed__.define('ace/range', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***

var comparePoints = function(p1, p2) ***REMOVED***
    return p1.row - p2.row || p1.column - p2.column;
***REMOVED***;
var Range = function(startRow, startColumn, endRow, endColumn) ***REMOVED***
    this.start = ***REMOVED***
        row: startRow,
        column: startColumn
***REMOVED***;

    this.end = ***REMOVED***
        row: endRow,
        column: endColumn
***REMOVED***;
***REMOVED***;

(function() ***REMOVED***
    this.isEqual = function(range) ***REMOVED***
        return this.start.row === range.start.row &&
            this.end.row === range.end.row &&
            this.start.column === range.start.column &&
            this.end.column === range.end.column;
***REMOVED***;
    this.toString = function() ***REMOVED***
        return ("Range: [" + this.start.row + "/" + this.start.column +
            "] -> [" + this.end.row + "/" + this.end.column + "]");
***REMOVED***;

    this.contains = function(row, column) ***REMOVED***
        return this.compare(row, column) == 0;
***REMOVED***;
    this.compareRange = function(range) ***REMOVED***
        var cmp,
            end = range.end,
            start = range.start;

        cmp = this.compare(end.row, end.column);
        if (cmp == 1) ***REMOVED***
            cmp = this.compare(start.row, start.column);
            if (cmp == 1) ***REMOVED***
                return 2;
        ***REMOVED*** else if (cmp == 0) ***REMOVED***
                return 1;
        ***REMOVED*** else ***REMOVED***
                return 0;
        ***REMOVED***
    ***REMOVED*** else if (cmp == -1) ***REMOVED***
            return -2;
    ***REMOVED*** else ***REMOVED***
            cmp = this.compare(start.row, start.column);
            if (cmp == -1) ***REMOVED***
                return -1;
        ***REMOVED*** else if (cmp == 1) ***REMOVED***
                return 42;
        ***REMOVED*** else ***REMOVED***
                return 0;
        ***REMOVED***
    ***REMOVED***
***REMOVED***;
    this.comparePoint = function(p) ***REMOVED***
        return this.compare(p.row, p.column);
***REMOVED***;
    this.containsRange = function(range) ***REMOVED***
        return this.comparePoint(range.start) == 0 && this.comparePoint(range.end) == 0;
***REMOVED***;
    this.intersects = function(range) ***REMOVED***
        var cmp = this.compareRange(range);
        return (cmp == -1 || cmp == 0 || cmp == 1);
***REMOVED***;
    this.isEnd = function(row, column) ***REMOVED***
        return this.end.row == row && this.end.column == column;
***REMOVED***;
    this.isStart = function(row, column) ***REMOVED***
        return this.start.row == row && this.start.column == column;
***REMOVED***;
    this.setStart = function(row, column) ***REMOVED***
        if (typeof row == "object") ***REMOVED***
            this.start.column = row.column;
            this.start.row = row.row;
    ***REMOVED*** else ***REMOVED***
            this.start.row = row;
            this.start.column = column;
    ***REMOVED***
***REMOVED***;
    this.setEnd = function(row, column) ***REMOVED***
        if (typeof row == "object") ***REMOVED***
            this.end.column = row.column;
            this.end.row = row.row;
    ***REMOVED*** else ***REMOVED***
            this.end.row = row;
            this.end.column = column;
    ***REMOVED***
***REMOVED***;
    this.inside = function(row, column) ***REMOVED***
        if (this.compare(row, column) == 0) ***REMOVED***
            if (this.isEnd(row, column) || this.isStart(row, column)) ***REMOVED***
                return false;
        ***REMOVED*** else ***REMOVED***
                return true;
        ***REMOVED***
    ***REMOVED***
        return false;
***REMOVED***;
    this.insideStart = function(row, column) ***REMOVED***
        if (this.compare(row, column) == 0) ***REMOVED***
            if (this.isEnd(row, column)) ***REMOVED***
                return false;
        ***REMOVED*** else ***REMOVED***
                return true;
        ***REMOVED***
    ***REMOVED***
        return false;
***REMOVED***;
    this.insideEnd = function(row, column) ***REMOVED***
        if (this.compare(row, column) == 0) ***REMOVED***
            if (this.isStart(row, column)) ***REMOVED***
                return false;
        ***REMOVED*** else ***REMOVED***
                return true;
        ***REMOVED***
    ***REMOVED***
        return false;
***REMOVED***;
    this.compare = function(row, column) ***REMOVED***
        if (!this.isMultiLine()) ***REMOVED***
            if (row === this.start.row) ***REMOVED***
                return column < this.start.column ? -1 : (column > this.end.column ? 1 : 0);
        ***REMOVED***;
    ***REMOVED***

        if (row < this.start.row)
            return -1;

        if (row > this.end.row)
            return 1;

        if (this.start.row === row)
            return column >= this.start.column ? 0 : -1;

        if (this.end.row === row)
            return column <= this.end.column ? 0 : 1;

        return 0;
***REMOVED***;
    this.compareStart = function(row, column) ***REMOVED***
        if (this.start.row == row && this.start.column == column) ***REMOVED***
            return -1;
    ***REMOVED*** else ***REMOVED***
            return this.compare(row, column);
    ***REMOVED***
***REMOVED***;
    this.compareEnd = function(row, column) ***REMOVED***
        if (this.end.row == row && this.end.column == column) ***REMOVED***
            return 1;
    ***REMOVED*** else ***REMOVED***
            return this.compare(row, column);
    ***REMOVED***
***REMOVED***;
    this.compareInside = function(row, column) ***REMOVED***
        if (this.end.row == row && this.end.column == column) ***REMOVED***
            return 1;
    ***REMOVED*** else if (this.start.row == row && this.start.column == column) ***REMOVED***
            return -1;
    ***REMOVED*** else ***REMOVED***
            return this.compare(row, column);
    ***REMOVED***
***REMOVED***;
    this.clipRows = function(firstRow, lastRow) ***REMOVED***
        if (this.end.row > lastRow)
            var end = ***REMOVED***row: lastRow + 1, column: 0***REMOVED***;
        else if (this.end.row < firstRow)
            var end = ***REMOVED***row: firstRow, column: 0***REMOVED***;

        if (this.start.row > lastRow)
            var start = ***REMOVED***row: lastRow + 1, column: 0***REMOVED***;
        else if (this.start.row < firstRow)
            var start = ***REMOVED***row: firstRow, column: 0***REMOVED***;

        return Range.fromPoints(start || this.start, end || this.end);
***REMOVED***;
    this.extend = function(row, column) ***REMOVED***
        var cmp = this.compare(row, column);

        if (cmp == 0)
            return this;
        else if (cmp == -1)
            var start = ***REMOVED***row: row, column: column***REMOVED***;
        else
            var end = ***REMOVED***row: row, column: column***REMOVED***;

        return Range.fromPoints(start || this.start, end || this.end);
***REMOVED***;

    this.isEmpty = function() ***REMOVED***
        return (this.start.row === this.end.row && this.start.column === this.end.column);
***REMOVED***;
    this.isMultiLine = function() ***REMOVED***
        return (this.start.row !== this.end.row);
***REMOVED***;
    this.clone = function() ***REMOVED***
        return Range.fromPoints(this.start, this.end);
***REMOVED***;
    this.collapseRows = function() ***REMOVED***
        if (this.end.column == 0)
            return new Range(this.start.row, 0, Math.max(this.start.row, this.end.row-1), 0)
        else
            return new Range(this.start.row, 0, this.end.row, 0)
***REMOVED***;
    this.toScreenRange = function(session) ***REMOVED***
        var screenPosStart = session.documentToScreenPosition(this.start);
        var screenPosEnd = session.documentToScreenPosition(this.end);

        return new Range(
            screenPosStart.row, screenPosStart.column,
            screenPosEnd.row, screenPosEnd.column
        );
***REMOVED***;
    this.moveBy = function(row, column) ***REMOVED***
        this.start.row += row;
        this.start.column += column;
        this.end.row += row;
        this.end.column += column;
***REMOVED***;

***REMOVED***).call(Range.prototype);
Range.fromPoints = function(start, end) ***REMOVED***
    return new Range(start.row, start.column, end.row, end.column);
***REMOVED***;
Range.comparePoints = comparePoints;

Range.comparePoints = function(p1, p2) ***REMOVED***
    return p1.row - p2.row || p1.column - p2.column;
***REMOVED***;


exports.Range = Range;
***REMOVED***);

__ace_shadowed__.define('ace/mode/text', ['require', 'exports', 'module' , 'ace/tokenizer', 'ace/mode/text_highlight_rules', 'ace/mode/behaviour', 'ace/unicode', 'ace/lib/lang', 'ace/token_iterator', 'ace/range'], function(require, exports, module) ***REMOVED***


var Tokenizer = require("../tokenizer").Tokenizer;
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;
var Behaviour = require("./behaviour").Behaviour;
var unicode = require("../unicode");
var lang = require("../lib/lang");
var TokenIterator = require("../token_iterator").TokenIterator;
var Range = require("../range").Range;

var Mode = function() ***REMOVED***
    this.HighlightRules = TextHighlightRules;
    this.$behaviour = new Behaviour();
***REMOVED***;

(function() ***REMOVED***

    this.tokenRe = new RegExp("^["
        + unicode.packages.L
        + unicode.packages.Mn + unicode.packages.Mc
        + unicode.packages.Nd
        + unicode.packages.Pc + "\\$_]+", "g"
    );

    this.nonTokenRe = new RegExp("^(?:[^"
        + unicode.packages.L
        + unicode.packages.Mn + unicode.packages.Mc
        + unicode.packages.Nd
        + unicode.packages.Pc + "\\$_]|\\s])+", "g"
    );

    this.getTokenizer = function() ***REMOVED***
        if (!this.$tokenizer) ***REMOVED***
            this.$highlightRules = new this.HighlightRules();
            this.$tokenizer = new Tokenizer(this.$highlightRules.getRules());
    ***REMOVED***
        return this.$tokenizer;
***REMOVED***;

    this.lineCommentStart = "";
    this.blockComment = "";

    this.toggleCommentLines = function(state, session, startRow, endRow) ***REMOVED***
        var doc = session.doc;

        var ignoreBlankLines = true;
        var shouldRemove = true;
        var minIndent = Infinity;
        var tabSize = session.getTabSize();
        var insertAtTabStop = false;

        if (!this.lineCommentStart) ***REMOVED***
            if (!this.blockComment)
                return false;
            var lineCommentStart = this.blockComment.start;
            var lineCommentEnd = this.blockComment.end;
            var regexpStart = new RegExp("^(\\s*)(?:" + lang.escapeRegExp(lineCommentStart) + ")");
            var regexpEnd = new RegExp("(?:" + lang.escapeRegExp(lineCommentEnd) + ")\\s*$");

            var comment = function(line, i) ***REMOVED***
                if (testRemove(line, i))
                    return;
                if (!ignoreBlankLines || /\S/.test(line)) ***REMOVED***
                    doc.insertInLine(***REMOVED***row: i, column: line.length***REMOVED***, lineCommentEnd);
                    doc.insertInLine(***REMOVED***row: i, column: minIndent***REMOVED***, lineCommentStart);
            ***REMOVED***
        ***REMOVED***;

            var uncomment = function(line, i) ***REMOVED***
                var m;
                if (m = line.match(regexpEnd))
                    doc.removeInLine(i, line.length - m[0].length, line.length);
                if (m = line.match(regexpStart))
                    doc.removeInLine(i, m[1].length, m[0].length);
        ***REMOVED***;

            var testRemove = function(line, row) ***REMOVED***
                if (regexpStart.test(line))
                    return true;
                var tokens = session.getTokens(row);
                for (var i = 0; i < tokens.length; i++) ***REMOVED***
                    if (tokens[i].type === 'comment')
                        return true;
            ***REMOVED***
        ***REMOVED***;
    ***REMOVED*** else ***REMOVED***
            if (Array.isArray(this.lineCommentStart)) ***REMOVED***
                var regexpStart = this.lineCommentStart.map(lang.escapeRegExp).join("|");
                var lineCommentStart = this.lineCommentStart[0];
        ***REMOVED*** else ***REMOVED***
                var regexpStart = lang.escapeRegExp(this.lineCommentStart);
                var lineCommentStart = this.lineCommentStart;
        ***REMOVED***
            regexpStart = new RegExp("^(\\s*)(?:" + regexpStart + ") ?");
            
            insertAtTabStop = session.getUseSoftTabs();

            var uncomment = function(line, i) ***REMOVED***
                var m = line.match(regexpStart);
                if (!m) return;
                var start = m[1].length, end = m[0].length;
                if (!shouldInsertSpace(line, start, end) && m[0][end - 1] == " ")
                    end--;
                doc.removeInLine(i, start, end);
        ***REMOVED***;
            var commentWithSpace = lineCommentStart + " ";
            var comment = function(line, i) ***REMOVED***
                if (!ignoreBlankLines || /\S/.test(line)) ***REMOVED***
                    if (shouldInsertSpace(line, minIndent, minIndent))
                        doc.insertInLine(***REMOVED***row: i, column: minIndent***REMOVED***, commentWithSpace);
                    else
                        doc.insertInLine(***REMOVED***row: i, column: minIndent***REMOVED***, lineCommentStart);
            ***REMOVED***
        ***REMOVED***;
            var testRemove = function(line, i) ***REMOVED***
                return regexpStart.test(line);
        ***REMOVED***;
            
            var shouldInsertSpace = function(line, before, after) ***REMOVED***
                var spaces = 0;
                while (before-- && line.charAt(before) == " ")
                    spaces++;
                if (spaces % tabSize != 0)
                    return false;
                var spaces = 0;
                while (line.charAt(after++) == " ")
                    spaces++;
                if (tabSize > 2)
                    return spaces % tabSize != tabSize - 1;
                else
                    return spaces % tabSize == 0;
                return true;
        ***REMOVED***;
    ***REMOVED***

        function iter(fun) ***REMOVED***
            for (var i = startRow; i <= endRow; i++)
                fun(doc.getLine(i), i);
    ***REMOVED***


        var minEmptyLength = Infinity;
        iter(function(line, i) ***REMOVED***
            var indent = line.search(/\S/);
            if (indent !== -1) ***REMOVED***
                if (indent < minIndent)
                    minIndent = indent;
                if (shouldRemove && !testRemove(line, i))
                    shouldRemove = false;
        ***REMOVED*** else if (minEmptyLength > line.length) ***REMOVED***
                minEmptyLength = line.length;
        ***REMOVED***
    ***REMOVED***);

        if (minIndent == Infinity) ***REMOVED***
            minIndent = minEmptyLength;
            ignoreBlankLines = false;
            shouldRemove = false;
    ***REMOVED***

        if (insertAtTabStop && minIndent % tabSize != 0)
            minIndent = Math.floor(minIndent / tabSize) * tabSize;

        iter(shouldRemove ? uncomment : comment);
***REMOVED***;

    this.toggleBlockComment = function(state, session, range, cursor) ***REMOVED***
        var comment = this.blockComment;
        if (!comment)
            return;
        if (!comment.start && comment[0])
            comment = comment[0];

        var iterator = new TokenIterator(session, cursor.row, cursor.column);
        var token = iterator.getCurrentToken();

        var sel = session.selection;
        var initialRange = session.selection.toOrientedRange();
        var startRow, colDiff;

        if (token && /comment/.test(token.type)) ***REMOVED***
            var startRange, endRange;
            while (token && /comment/.test(token.type)) ***REMOVED***
                var i = token.value.indexOf(comment.start);
                if (i != -1) ***REMOVED***
                    var row = iterator.getCurrentTokenRow();
                    var column = iterator.getCurrentTokenColumn() + i;
                    startRange = new Range(row, column, row, column + comment.start.length);
                    break;
            ***REMOVED***
                token = iterator.stepBackward();
        ***REMOVED***

            var iterator = new TokenIterator(session, cursor.row, cursor.column);
            var token = iterator.getCurrentToken();
            while (token && /comment/.test(token.type)) ***REMOVED***
                var i = token.value.indexOf(comment.end);
                if (i != -1) ***REMOVED***
                    var row = iterator.getCurrentTokenRow();
                    var column = iterator.getCurrentTokenColumn() + i;
                    endRange = new Range(row, column, row, column + comment.end.length);
                    break;
            ***REMOVED***
                token = iterator.stepForward();
        ***REMOVED***
            if (endRange)
                session.remove(endRange);
            if (startRange) ***REMOVED***
                session.remove(startRange);
                startRow = startRange.start.row;
                colDiff = -comment.start.length;
        ***REMOVED***
    ***REMOVED*** else ***REMOVED***
            colDiff = comment.start.length;
            startRow = range.start.row;
            session.insert(range.end, comment.end);
            session.insert(range.start, comment.start);
    ***REMOVED***
        if (initialRange.start.row == startRow)
            initialRange.start.column += colDiff;
        if (initialRange.end.row == startRow)
            initialRange.end.column += colDiff;
        session.selection.fromOrientedRange(initialRange);
***REMOVED***;

    this.getNextLineIndent = function(state, line, tab) ***REMOVED***
        return this.$getIndent(line);
***REMOVED***;

    this.checkOutdent = function(state, line, input) ***REMOVED***
        return false;
***REMOVED***;

    this.autoOutdent = function(state, doc, row) ***REMOVED***
***REMOVED***;

    this.$getIndent = function(line) ***REMOVED***
        return line.match(/^\s*/)[0];
***REMOVED***;

    this.createWorker = function(session) ***REMOVED***
        return null;
***REMOVED***;

    this.createModeDelegates = function (mapping) ***REMOVED***
        this.$embeds = [];
        this.$modes = ***REMOVED******REMOVED***;
        for (var i in mapping) ***REMOVED***
            if (mapping[i]) ***REMOVED***
                this.$embeds.push(i);
                this.$modes[i] = new mapping[i]();
        ***REMOVED***
    ***REMOVED***

        var delegations = ['toggleBlockComment', 'toggleCommentLines', 'getNextLineIndent', 
            'checkOutdent', 'autoOutdent', 'transformAction', 'getCompletions'];

        for (var i = 0; i < delegations.length; i++) ***REMOVED***
            (function(scope) ***REMOVED***
              var functionName = delegations[i];
              var defaultHandler = scope[functionName];
              scope[delegations[i]] = function() ***REMOVED***
                  return this.$delegator(functionName, arguments, defaultHandler);
          ***REMOVED***;
        ***REMOVED*** (this));
    ***REMOVED***
***REMOVED***;

    this.$delegator = function(method, args, defaultHandler) ***REMOVED***
        var state = args[0];
        if (typeof state != "string")
            state = state[0];
        for (var i = 0; i < this.$embeds.length; i++) ***REMOVED***
            if (!this.$modes[this.$embeds[i]]) continue;

            var split = state.split(this.$embeds[i]);
            if (!split[0] && split[1]) ***REMOVED***
                args[0] = split[1];
                var mode = this.$modes[this.$embeds[i]];
                return mode[method].apply(mode, args);
        ***REMOVED***
    ***REMOVED***
        var ret = defaultHandler.apply(this, args);
        return defaultHandler ? ret : undefined;
***REMOVED***;

    this.transformAction = function(state, action, editor, session, param) ***REMOVED***
        if (this.$behaviour) ***REMOVED***
            var behaviours = this.$behaviour.getBehaviours();
            for (var key in behaviours) ***REMOVED***
                if (behaviours[key][action]) ***REMOVED***
                    var ret = behaviours[key][action].apply(this, arguments);
                    if (ret) ***REMOVED***
                        return ret;
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***
***REMOVED***;
    
    this.getKeywords = function(append) ***REMOVED***
        if (!this.completionKeywords) ***REMOVED***
            var rules = this.$tokenizer.rules;
            var completionKeywords = [];
            for (var rule in rules) ***REMOVED***
                var ruleItr = rules[rule];
                for (var r = 0, l = ruleItr.length; r < l; r++) ***REMOVED***
                    if (typeof ruleItr[r].token === "string") ***REMOVED***
                        if (/keyword|support|storage/.test(ruleItr[r].token))
                            completionKeywords.push(ruleItr[r].regex);
                ***REMOVED***
                    else if (typeof ruleItr[r].token === "object") ***REMOVED***
                        for (var a = 0, aLength = ruleItr[r].token.length; a < aLength; a++) ***REMOVED***    
                            if (/keyword|support|storage/.test(ruleItr[r].token[a])) ***REMOVED***
                                var rule = ruleItr[r].regex.match(/\(.+?\)/g)[a];
                                completionKeywords.push(rule.substr(1, rule.length - 2));
                        ***REMOVED***
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
            this.completionKeywords = completionKeywords;
    ***REMOVED***
        if (!append)
            return this.$keywordList;
        return completionKeywords.concat(this.$keywordList || []);
***REMOVED***;
    
    this.$createKeywordList = function() ***REMOVED***
        if (!this.$highlightRules)
            this.getTokenizer();
        return this.$keywordList = this.$highlightRules.$keywordList || [];
***REMOVED***;

    this.getCompletions = function(state, session, pos, prefix) ***REMOVED***
        var keywords = this.$keywordList || this.$createKeywordList();
        return keywords.map(function(word) ***REMOVED***
            return ***REMOVED***
                name: word,
                value: word,
                score: 0,
                meta: "keyword"
        ***REMOVED***;
    ***REMOVED***);
***REMOVED***;

    this.$id = "ace/mode/text";
***REMOVED***).call(Mode.prototype);

exports.Mode = Mode;
***REMOVED***);

__ace_shadowed__.define('ace/tokenizer', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***
var MAX_TOKEN_COUNT = 1000;
var Tokenizer = function(rules) ***REMOVED***
    this.states = rules;

    this.regExps = ***REMOVED******REMOVED***;
    this.matchMappings = ***REMOVED******REMOVED***;
    for (var key in this.states) ***REMOVED***
        var state = this.states[key];
        var ruleRegExps = [];
        var matchTotal = 0;
        var mapping = this.matchMappings[key] = ***REMOVED***defaultToken: "text"***REMOVED***;
        var flag = "g";

        var splitterRurles = [];
        for (var i = 0; i < state.length; i++) ***REMOVED***
            var rule = state[i];
            if (rule.defaultToken)
                mapping.defaultToken = rule.defaultToken;
            if (rule.caseInsensitive)
                flag = "gi";
            if (rule.regex == null)
                continue;

            if (rule.regex instanceof RegExp)
                rule.regex = rule.regex.toString().slice(1, -1);
            var adjustedregex = rule.regex;
            var matchcount = new RegExp("(?:(" + adjustedregex + ")|(.))").exec("a").length - 2;
            if (Array.isArray(rule.token)) ***REMOVED***
                if (rule.token.length == 1 || matchcount == 1) ***REMOVED***
                    rule.token = rule.token[0];
            ***REMOVED*** else if (matchcount - 1 != rule.token.length) ***REMOVED***
                    throw new Error("number of classes and regexp groups in '" + 
                        rule.token + "'\n'" + rule.regex +  "' doesn't match\n"
                        + (matchcount - 1) + "!=" + rule.token.length);
            ***REMOVED*** else ***REMOVED***
                    rule.tokenArray = rule.token;
                    rule.token = null;
                    rule.onMatch = this.$arrayTokens;
            ***REMOVED***
        ***REMOVED*** else if (typeof rule.token == "function" && !rule.onMatch) ***REMOVED***
                if (matchcount > 1)
                    rule.onMatch = this.$applyToken;
                else
                    rule.onMatch = rule.token;
        ***REMOVED***

            if (matchcount > 1) ***REMOVED***
                if (/\\\d/.test(rule.regex)) ***REMOVED***
                    adjustedregex = rule.regex.replace(/\\([0-9]+)/g, function(match, digit) ***REMOVED***
                        return "\\" + (parseInt(digit, 10) + matchTotal + 1);
                ***REMOVED***);
            ***REMOVED*** else ***REMOVED***
                    matchcount = 1;
                    adjustedregex = this.removeCapturingGroups(rule.regex);
            ***REMOVED***
                if (!rule.splitRegex && typeof rule.token != "string")
                    splitterRurles.push(rule); // flag will be known only at the very end
        ***REMOVED***

            mapping[matchTotal] = i;
            matchTotal += matchcount;

            ruleRegExps.push(adjustedregex);
            if (!rule.onMatch)
                rule.onMatch = null;
    ***REMOVED***
        
        splitterRurles.forEach(function(rule) ***REMOVED***
            rule.splitRegex = this.createSplitterRegexp(rule.regex, flag);
    ***REMOVED*** this);

        this.regExps[key] = new RegExp("(" + ruleRegExps.join(")|(") + ")|($)", flag);
***REMOVED***
***REMOVED***;

(function() ***REMOVED***
    this.$setMaxTokenCount = function(m) ***REMOVED***
        MAX_TOKEN_COUNT = m | 0;
***REMOVED***;
    
    this.$applyToken = function(str) ***REMOVED***
        var values = this.splitRegex.exec(str).slice(1);
        var types = this.token.apply(this, values);
        if (typeof types === "string")
            return [***REMOVED***type: types, value: str***REMOVED***];

        var tokens = [];
        for (var i = 0, l = types.length; i < l; i++) ***REMOVED***
            if (values[i])
                tokens[tokens.length] = ***REMOVED***
                    type: types[i],
                    value: values[i]
            ***REMOVED***;
    ***REMOVED***
        return tokens;
***REMOVED***

    this.$arrayTokens = function(str) ***REMOVED***
        if (!str)
            return [];
        var values = this.splitRegex.exec(str);
        if (!values)
            return "text";
        var tokens = [];
        var types = this.tokenArray;
        for (var i = 0, l = types.length; i < l; i++) ***REMOVED***
            if (values[i + 1])
                tokens[tokens.length] = ***REMOVED***
                    type: types[i],
                    value: values[i + 1]
            ***REMOVED***;
    ***REMOVED***
        return tokens;
***REMOVED***;

    this.removeCapturingGroups = function(src) ***REMOVED***
        var r = src.replace(
            /\[(?:\\.|[^\]])*?\]|\\.|\(\?[:=!]|(\()/g,
            function(x, y) ***REMOVED***return y ? "(?:" : x;***REMOVED***
        );
        return r;
***REMOVED***;

    this.createSplitterRegexp = function(src, flag) ***REMOVED***
        if (src.indexOf("(?=") != -1) ***REMOVED***
            var stack = 0;
            var inChClass = false;
            var lastCapture = ***REMOVED******REMOVED***;
            src.replace(/(\\.)|(\((?:\?[=!])?)|(\))|([\[\]])/g, function(
                m, esc, parenOpen, parenClose, square, index
            ) ***REMOVED***
                if (inChClass) ***REMOVED***
                    inChClass = square != "]";
            ***REMOVED*** else if (square) ***REMOVED***
                    inChClass = true;
            ***REMOVED*** else if (parenClose) ***REMOVED***
                    if (stack == lastCapture.stack) ***REMOVED***
                        lastCapture.end = index+1;
                        lastCapture.stack = -1;
                ***REMOVED***
                    stack--;
            ***REMOVED*** else if (parenOpen) ***REMOVED***
                    stack++;
                    if (parenOpen.length != 1) ***REMOVED***
                        lastCapture.stack = stack
                        lastCapture.start = index;
                ***REMOVED***
            ***REMOVED***
                return m;
        ***REMOVED***);

            if (lastCapture.end != null && /^\)*$/.test(src.substr(lastCapture.end)))
                src = src.substring(0, lastCapture.start) + src.substr(lastCapture.end);
    ***REMOVED***
        return new RegExp(src, (flag||"").replace("g", ""));
***REMOVED***;
    this.getLineTokens = function(line, startState) ***REMOVED***
        if (startState && typeof startState != "string") ***REMOVED***
            var stack = startState.slice(0);
            startState = stack[0];
    ***REMOVED*** else
            var stack = [];

        var currentState = startState || "start";
        var state = this.states[currentState];
        if (!state) ***REMOVED***
            currentState = "start";
            state = this.states[currentState];
    ***REMOVED***
        var mapping = this.matchMappings[currentState];
        var re = this.regExps[currentState];
        re.lastIndex = 0;

        var match, tokens = [];
        var lastIndex = 0;

        var token = ***REMOVED***type: null, value: ""***REMOVED***;

        while (match = re.exec(line)) ***REMOVED***
            var type = mapping.defaultToken;
            var rule = null;
            var value = match[0];
            var index = re.lastIndex;

            if (index - value.length > lastIndex) ***REMOVED***
                var skipped = line.substring(lastIndex, index - value.length);
                if (token.type == type) ***REMOVED***
                    token.value += skipped;
            ***REMOVED*** else ***REMOVED***
                    if (token.type)
                        tokens.push(token);
                    token = ***REMOVED***type: type, value: skipped***REMOVED***;
            ***REMOVED***
        ***REMOVED***

            for (var i = 0; i < match.length-2; i++) ***REMOVED***
                if (match[i + 1] === undefined)
                    continue;

                rule = state[mapping[i]];

                if (rule.onMatch)
                    type = rule.onMatch(value, currentState, stack);
                else
                    type = rule.token;

                if (rule.next) ***REMOVED***
                    if (typeof rule.next == "string")
                        currentState = rule.next;
                    else
                        currentState = rule.next(currentState, stack);

                    state = this.states[currentState];
                    if (!state) ***REMOVED***
                        window.console && console.error && console.error(currentState, "doesn't exist");
                        currentState = "start";
                        state = this.states[currentState];
                ***REMOVED***
                    mapping = this.matchMappings[currentState];
                    lastIndex = index;
                    re = this.regExps[currentState];
                    re.lastIndex = index;
            ***REMOVED***
                break;
        ***REMOVED***

            if (value) ***REMOVED***
                if (typeof type == "string") ***REMOVED***
                    if ((!rule || rule.merge !== false) && token.type === type) ***REMOVED***
                        token.value += value;
                ***REMOVED*** else ***REMOVED***
                        if (token.type)
                            tokens.push(token);
                        token = ***REMOVED***type: type, value: value***REMOVED***;
                ***REMOVED***
            ***REMOVED*** else if (type) ***REMOVED***
                    if (token.type)
                        tokens.push(token);
                    token = ***REMOVED***type: null, value: ""***REMOVED***;
                    for (var i = 0; i < type.length; i++)
                        tokens.push(type[i]);
            ***REMOVED***
        ***REMOVED***

            if (lastIndex == line.length)
                break;

            lastIndex = index;

            if (tokens.length > MAX_TOKEN_COUNT) ***REMOVED***
                while (lastIndex < line.length) ***REMOVED***
                    if (token.type)
                        tokens.push(token);
                    token = ***REMOVED***
                        value: line.substring(lastIndex, lastIndex += 2000),
                        type: "overflow"
                ***REMOVED***;
            ***REMOVED***
                currentState = "start";
                stack = [];
                break;
        ***REMOVED***
    ***REMOVED***

        if (token.type)
            tokens.push(token);
        
        if (stack.length > 1) ***REMOVED***
            if (stack[0] !== currentState)
                stack.unshift(currentState);
    ***REMOVED***
        return ***REMOVED***
            tokens : tokens,
            state : stack.length ? stack : currentState
    ***REMOVED***;
***REMOVED***;

***REMOVED***).call(Tokenizer.prototype);

exports.Tokenizer = Tokenizer;
***REMOVED***);

__ace_shadowed__.define('ace/mode/text_highlight_rules', ['require', 'exports', 'module' , 'ace/lib/lang'], function(require, exports, module) ***REMOVED***


var lang = require("../lib/lang");

var TextHighlightRules = function() ***REMOVED***

    this.$rules = ***REMOVED***
        "start" : [***REMOVED***
            token : "empty_line",
            regex : '^$'
    ***REMOVED*** ***REMOVED***
            defaultToken : "text"
    ***REMOVED***]
***REMOVED***;
***REMOVED***;

(function() ***REMOVED***

    this.addRules = function(rules, prefix) ***REMOVED***
        if (!prefix) ***REMOVED***
            for (var key in rules)
                this.$rules[key] = rules[key];
            return;
    ***REMOVED***
        for (var key in rules) ***REMOVED***
            var state = rules[key];
            for (var i = 0; i < state.length; i++) ***REMOVED***
                var rule = state[i];
                if (rule.next) ***REMOVED***
                    if (typeof rule.next != "string") ***REMOVED***
                        if (rule.nextState && rule.nextState.indexOf(prefix) !== 0)
                            rule.nextState = prefix + rule.nextState;
                ***REMOVED*** else ***REMOVED***
                        if (rule.next.indexOf(prefix) !== 0)
                            rule.next = prefix + rule.next;
                ***REMOVED***

            ***REMOVED***
        ***REMOVED***
            this.$rules[prefix + key] = state;
    ***REMOVED***
***REMOVED***;

    this.getRules = function() ***REMOVED***
        return this.$rules;
***REMOVED***;

    this.embedRules = function (HighlightRules, prefix, escapeRules, states, append) ***REMOVED***
        var embedRules = typeof HighlightRules == "function"
            ? new HighlightRules().getRules()
            : HighlightRules;
        if (states) ***REMOVED***
            for (var i = 0; i < states.length; i++)
                states[i] = prefix + states[i];
    ***REMOVED*** else ***REMOVED***
            states = [];
            for (var key in embedRules)
                states.push(prefix + key);
    ***REMOVED***

        this.addRules(embedRules, prefix);

        if (escapeRules) ***REMOVED***
            var addRules = Array.prototype[append ? "push" : "unshift"];
            for (var i = 0; i < states.length; i++)
                addRules.apply(this.$rules[states[i]], lang.deepCopy(escapeRules));
    ***REMOVED***

        if (!this.$embeds)
            this.$embeds = [];
        this.$embeds.push(prefix);
***REMOVED***;

    this.getEmbeds = function() ***REMOVED***
        return this.$embeds;
***REMOVED***;

    var pushState = function(currentState, stack) ***REMOVED***
        if (currentState != "start" || stack.length)
            stack.unshift(this.nextState, currentState);
        return this.nextState;
***REMOVED***;
    var popState = function(currentState, stack) ***REMOVED***
        stack.shift();
        return stack.shift() || "start";
***REMOVED***;

    this.normalizeRules = function() ***REMOVED***
        var id = 0;
        var rules = this.$rules;
        function processState(key) ***REMOVED***
            var state = rules[key];
            state.processed = true;
            for (var i = 0; i < state.length; i++) ***REMOVED***
                var rule = state[i];
                if (!rule.regex && rule.start) ***REMOVED***
                    rule.regex = rule.start;
                    if (!rule.next)
                        rule.next = [];
                    rule.next.push(***REMOVED***
                        defaultToken: rule.token
                ***REMOVED*** ***REMOVED***
                        token: rule.token + ".end",
                        regex: rule.end || rule.start,
                        next: "pop"
                ***REMOVED***);
                    rule.token = rule.token + ".start";
                    rule.push = true;
            ***REMOVED***
                var next = rule.next || rule.push;
                if (next && Array.isArray(next)) ***REMOVED***
                    var stateName = rule.stateName;
                    if (!stateName)  ***REMOVED***
                        stateName = rule.token;
                        if (typeof stateName != "string")
                            stateName = stateName[0] || "";
                        if (rules[stateName])
                            stateName += id++;
                ***REMOVED***
                    rules[stateName] = next;
                    rule.next = stateName;
                    processState(stateName);
            ***REMOVED*** else if (next == "pop") ***REMOVED***
                    rule.next = popState;
            ***REMOVED***

                if (rule.push) ***REMOVED***
                    rule.nextState = rule.next || rule.push;
                    rule.next = pushState;
                    delete rule.push;
            ***REMOVED***

                if (rule.rules) ***REMOVED***
                    for (var r in rule.rules) ***REMOVED***
                        if (rules[r]) ***REMOVED***
                            if (rules[r].push)
                                rules[r].push.apply(rules[r], rule.rules[r]);
                    ***REMOVED*** else ***REMOVED***
                            rules[r] = rule.rules[r];
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
                if (rule.include || typeof rule == "string") ***REMOVED***
                    var includeName = rule.include || rule;
                    var toInsert = rules[includeName];
            ***REMOVED*** else if (Array.isArray(rule))
                    toInsert = rule;

                if (toInsert) ***REMOVED***
                    var args = [i, 1].concat(toInsert);
                    if (rule.noEscape)
                        args = args.filter(function(x) ***REMOVED***return !x.next;***REMOVED***);
                    state.splice.apply(state, args);
                    i--;
                    toInsert = null
            ***REMOVED***
                
                if (rule.keywordMap) ***REMOVED***
                    rule.token = this.createKeywordMapper(
                        rule.keywordMap, rule.defaultToken || "text", rule.caseInsensitive
                    );
                    delete rule.defaultToken;
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***;
        Object.keys(rules).forEach(processState, this);
***REMOVED***;

    this.createKeywordMapper = function(map, defaultToken, ignoreCase, splitChar) ***REMOVED***
        var keywords = Object.create(null);
        Object.keys(map).forEach(function(className) ***REMOVED***
            var a = map[className];
            if (ignoreCase)
                a = a.toLowerCase();
            var list = a.split(splitChar || "|");
            for (var i = list.length; i--; )
                keywords[list[i]] = className;
    ***REMOVED***);
        if (Object.getPrototypeOf(keywords)) ***REMOVED***
            keywords.__proto__ = null;
    ***REMOVED***
        this.$keywordList = Object.keys(keywords);
        map = null;
        return ignoreCase
            ? function(value) ***REMOVED***return keywords[value.toLowerCase()] || defaultToken ***REMOVED***
            : function(value) ***REMOVED***return keywords[value] || defaultToken ***REMOVED***;
***REMOVED***

    this.getKeywords = function() ***REMOVED***
        return this.$keywords;
***REMOVED***;

***REMOVED***).call(TextHighlightRules.prototype);

exports.TextHighlightRules = TextHighlightRules;
***REMOVED***);

__ace_shadowed__.define('ace/mode/behaviour', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***


var Behaviour = function() ***REMOVED***
   this.$behaviours = ***REMOVED******REMOVED***;
***REMOVED***;

(function () ***REMOVED***

    this.add = function (name, action, callback) ***REMOVED***
        switch (undefined) ***REMOVED***
          case this.$behaviours:
              this.$behaviours = ***REMOVED******REMOVED***;
          case this.$behaviours[name]:
              this.$behaviours[name] = ***REMOVED******REMOVED***;
    ***REMOVED***
        this.$behaviours[name][action] = callback;
***REMOVED***
    
    this.addBehaviours = function (behaviours) ***REMOVED***
        for (var key in behaviours) ***REMOVED***
            for (var action in behaviours[key]) ***REMOVED***
                this.add(key, action, behaviours[key][action]);
        ***REMOVED***
    ***REMOVED***
***REMOVED***
    
    this.remove = function (name) ***REMOVED***
        if (this.$behaviours && this.$behaviours[name]) ***REMOVED***
            delete this.$behaviours[name];
    ***REMOVED***
***REMOVED***
    
    this.inherit = function (mode, filter) ***REMOVED***
        if (typeof mode === "function") ***REMOVED***
            var behaviours = new mode().getBehaviours(filter);
    ***REMOVED*** else ***REMOVED***
            var behaviours = mode.getBehaviours(filter);
    ***REMOVED***
        this.addBehaviours(behaviours);
***REMOVED***
    
    this.getBehaviours = function (filter) ***REMOVED***
        if (!filter) ***REMOVED***
            return this.$behaviours;
    ***REMOVED*** else ***REMOVED***
            var ret = ***REMOVED******REMOVED***
            for (var i = 0; i < filter.length; i++) ***REMOVED***
                if (this.$behaviours[filter[i]]) ***REMOVED***
                    ret[filter[i]] = this.$behaviours[filter[i]];
            ***REMOVED***
        ***REMOVED***
            return ret;
    ***REMOVED***
***REMOVED***

***REMOVED***).call(Behaviour.prototype);

exports.Behaviour = Behaviour;
***REMOVED***);
__ace_shadowed__.define('ace/unicode', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***
exports.packages = ***REMOVED******REMOVED***;

addUnicodePackage(***REMOVED***
    L:  "0041-005A0061-007A00AA00B500BA00C0-00D600D8-00F600F8-02C102C6-02D102E0-02E402EC02EE0370-037403760377037A-037D03860388-038A038C038E-03A103A3-03F503F7-0481048A-05250531-055605590561-058705D0-05EA05F0-05F20621-064A066E066F0671-06D306D506E506E606EE06EF06FA-06FC06FF07100712-072F074D-07A507B107CA-07EA07F407F507FA0800-0815081A082408280904-0939093D09500958-0961097109720979-097F0985-098C098F09900993-09A809AA-09B009B209B6-09B909BD09CE09DC09DD09DF-09E109F009F10A05-0A0A0A0F0A100A13-0A280A2A-0A300A320A330A350A360A380A390A59-0A5C0A5E0A72-0A740A85-0A8D0A8F-0A910A93-0AA80AAA-0AB00AB20AB30AB5-0AB90ABD0AD00AE00AE10B05-0B0C0B0F0B100B13-0B280B2A-0B300B320B330B35-0B390B3D0B5C0B5D0B5F-0B610B710B830B85-0B8A0B8E-0B900B92-0B950B990B9A0B9C0B9E0B9F0BA30BA40BA8-0BAA0BAE-0BB90BD00C05-0C0C0C0E-0C100C12-0C280C2A-0C330C35-0C390C3D0C580C590C600C610C85-0C8C0C8E-0C900C92-0CA80CAA-0CB30CB5-0CB90CBD0CDE0CE00CE10D05-0D0C0D0E-0D100D12-0D280D2A-0D390D3D0D600D610D7A-0D7F0D85-0D960D9A-0DB10DB3-0DBB0DBD0DC0-0DC60E01-0E300E320E330E40-0E460E810E820E840E870E880E8A0E8D0E94-0E970E99-0E9F0EA1-0EA30EA50EA70EAA0EAB0EAD-0EB00EB20EB30EBD0EC0-0EC40EC60EDC0EDD0F000F40-0F470F49-0F6C0F88-0F8B1000-102A103F1050-1055105A-105D106110651066106E-10701075-1081108E10A0-10C510D0-10FA10FC1100-1248124A-124D1250-12561258125A-125D1260-1288128A-128D1290-12B012B2-12B512B8-12BE12C012C2-12C512C8-12D612D8-13101312-13151318-135A1380-138F13A0-13F41401-166C166F-167F1681-169A16A0-16EA1700-170C170E-17111720-17311740-17511760-176C176E-17701780-17B317D717DC1820-18771880-18A818AA18B0-18F51900-191C1950-196D1970-19741980-19AB19C1-19C71A00-1A161A20-1A541AA71B05-1B331B45-1B4B1B83-1BA01BAE1BAF1C00-1C231C4D-1C4F1C5A-1C7D1CE9-1CEC1CEE-1CF11D00-1DBF1E00-1F151F18-1F1D1F20-1F451F48-1F4D1F50-1F571F591F5B1F5D1F5F-1F7D1F80-1FB41FB6-1FBC1FBE1FC2-1FC41FC6-1FCC1FD0-1FD31FD6-1FDB1FE0-1FEC1FF2-1FF41FF6-1FFC2071207F2090-209421022107210A-211321152119-211D212421262128212A-212D212F-2139213C-213F2145-2149214E218321842C00-2C2E2C30-2C5E2C60-2CE42CEB-2CEE2D00-2D252D30-2D652D6F2D80-2D962DA0-2DA62DA8-2DAE2DB0-2DB62DB8-2DBE2DC0-2DC62DC8-2DCE2DD0-2DD62DD8-2DDE2E2F300530063031-3035303B303C3041-3096309D-309F30A1-30FA30FC-30FF3105-312D3131-318E31A0-31B731F0-31FF3400-4DB54E00-9FCBA000-A48CA4D0-A4FDA500-A60CA610-A61FA62AA62BA640-A65FA662-A66EA67F-A697A6A0-A6E5A717-A71FA722-A788A78BA78CA7FB-A801A803-A805A807-A80AA80C-A822A840-A873A882-A8B3A8F2-A8F7A8FBA90A-A925A930-A946A960-A97CA984-A9B2A9CFAA00-AA28AA40-AA42AA44-AA4BAA60-AA76AA7AAA80-AAAFAAB1AAB5AAB6AAB9-AABDAAC0AAC2AADB-AADDABC0-ABE2AC00-D7A3D7B0-D7C6D7CB-D7FBF900-FA2DFA30-FA6DFA70-FAD9FB00-FB06FB13-FB17FB1DFB1F-FB28FB2A-FB36FB38-FB3CFB3EFB40FB41FB43FB44FB46-FBB1FBD3-FD3DFD50-FD8FFD92-FDC7FDF0-FDFBFE70-FE74FE76-FEFCFF21-FF3AFF41-FF5AFF66-FFBEFFC2-FFC7FFCA-FFCFFFD2-FFD7FFDA-FFDC",
    Ll: "0061-007A00AA00B500BA00DF-00F600F8-00FF01010103010501070109010B010D010F01110113011501170119011B011D011F01210123012501270129012B012D012F01310133013501370138013A013C013E014001420144014601480149014B014D014F01510153015501570159015B015D015F01610163016501670169016B016D016F0171017301750177017A017C017E-0180018301850188018C018D019201950199-019B019E01A101A301A501A801AA01AB01AD01B001B401B601B901BA01BD-01BF01C601C901CC01CE01D001D201D401D601D801DA01DC01DD01DF01E101E301E501E701E901EB01ED01EF01F001F301F501F901FB01FD01FF02010203020502070209020B020D020F02110213021502170219021B021D021F02210223022502270229022B022D022F02310233-0239023C023F0240024202470249024B024D024F-02930295-02AF037103730377037B-037D039003AC-03CE03D003D103D5-03D703D903DB03DD03DF03E103E303E503E703E903EB03ED03EF-03F303F503F803FB03FC0430-045F04610463046504670469046B046D046F04710473047504770479047B047D047F0481048B048D048F04910493049504970499049B049D049F04A104A304A504A704A904AB04AD04AF04B104B304B504B704B904BB04BD04BF04C204C404C604C804CA04CC04CE04CF04D104D304D504D704D904DB04DD04DF04E104E304E504E704E904EB04ED04EF04F104F304F504F704F904FB04FD04FF05010503050505070509050B050D050F05110513051505170519051B051D051F0521052305250561-05871D00-1D2B1D62-1D771D79-1D9A1E011E031E051E071E091E0B1E0D1E0F1E111E131E151E171E191E1B1E1D1E1F1E211E231E251E271E291E2B1E2D1E2F1E311E331E351E371E391E3B1E3D1E3F1E411E431E451E471E491E4B1E4D1E4F1E511E531E551E571E591E5B1E5D1E5F1E611E631E651E671E691E6B1E6D1E6F1E711E731E751E771E791E7B1E7D1E7F1E811E831E851E871E891E8B1E8D1E8F1E911E931E95-1E9D1E9F1EA11EA31EA51EA71EA91EAB1EAD1EAF1EB11EB31EB51EB71EB91EBB1EBD1EBF1EC11EC31EC51EC71EC91ECB1ECD1ECF1ED11ED31ED51ED71ED91EDB1EDD1EDF1EE11EE31EE51EE71EE91EEB1EED1EEF1EF11EF31EF51EF71EF91EFB1EFD1EFF-1F071F10-1F151F20-1F271F30-1F371F40-1F451F50-1F571F60-1F671F70-1F7D1F80-1F871F90-1F971FA0-1FA71FB0-1FB41FB61FB71FBE1FC2-1FC41FC61FC71FD0-1FD31FD61FD71FE0-1FE71FF2-1FF41FF61FF7210A210E210F2113212F21342139213C213D2146-2149214E21842C30-2C5E2C612C652C662C682C6A2C6C2C712C732C742C76-2C7C2C812C832C852C872C892C8B2C8D2C8F2C912C932C952C972C992C9B2C9D2C9F2CA12CA32CA52CA72CA92CAB2CAD2CAF2CB12CB32CB52CB72CB92CBB2CBD2CBF2CC12CC32CC52CC72CC92CCB2CCD2CCF2CD12CD32CD52CD72CD92CDB2CDD2CDF2CE12CE32CE42CEC2CEE2D00-2D25A641A643A645A647A649A64BA64DA64FA651A653A655A657A659A65BA65DA65FA663A665A667A669A66BA66DA681A683A685A687A689A68BA68DA68FA691A693A695A697A723A725A727A729A72BA72DA72F-A731A733A735A737A739A73BA73DA73FA741A743A745A747A749A74BA74DA74FA751A753A755A757A759A75BA75DA75FA761A763A765A767A769A76BA76DA76FA771-A778A77AA77CA77FA781A783A785A787A78CFB00-FB06FB13-FB17FF41-FF5A",
    Lu: "0041-005A00C0-00D600D8-00DE01000102010401060108010A010C010E01100112011401160118011A011C011E01200122012401260128012A012C012E01300132013401360139013B013D013F0141014301450147014A014C014E01500152015401560158015A015C015E01600162016401660168016A016C016E017001720174017601780179017B017D018101820184018601870189-018B018E-0191019301940196-0198019C019D019F01A001A201A401A601A701A901AC01AE01AF01B1-01B301B501B701B801BC01C401C701CA01CD01CF01D101D301D501D701D901DB01DE01E001E201E401E601E801EA01EC01EE01F101F401F6-01F801FA01FC01FE02000202020402060208020A020C020E02100212021402160218021A021C021E02200222022402260228022A022C022E02300232023A023B023D023E02410243-02460248024A024C024E03700372037603860388-038A038C038E038F0391-03A103A3-03AB03CF03D2-03D403D803DA03DC03DE03E003E203E403E603E803EA03EC03EE03F403F703F903FA03FD-042F04600462046404660468046A046C046E04700472047404760478047A047C047E0480048A048C048E04900492049404960498049A049C049E04A004A204A404A604A804AA04AC04AE04B004B204B404B604B804BA04BC04BE04C004C104C304C504C704C904CB04CD04D004D204D404D604D804DA04DC04DE04E004E204E404E604E804EA04EC04EE04F004F204F404F604F804FA04FC04FE05000502050405060508050A050C050E05100512051405160518051A051C051E0520052205240531-055610A0-10C51E001E021E041E061E081E0A1E0C1E0E1E101E121E141E161E181E1A1E1C1E1E1E201E221E241E261E281E2A1E2C1E2E1E301E321E341E361E381E3A1E3C1E3E1E401E421E441E461E481E4A1E4C1E4E1E501E521E541E561E581E5A1E5C1E5E1E601E621E641E661E681E6A1E6C1E6E1E701E721E741E761E781E7A1E7C1E7E1E801E821E841E861E881E8A1E8C1E8E1E901E921E941E9E1EA01EA21EA41EA61EA81EAA1EAC1EAE1EB01EB21EB41EB61EB81EBA1EBC1EBE1EC01EC21EC41EC61EC81ECA1ECC1ECE1ED01ED21ED41ED61ED81EDA1EDC1EDE1EE01EE21EE41EE61EE81EEA1EEC1EEE1EF01EF21EF41EF61EF81EFA1EFC1EFE1F08-1F0F1F18-1F1D1F28-1F2F1F38-1F3F1F48-1F4D1F591F5B1F5D1F5F1F68-1F6F1FB8-1FBB1FC8-1FCB1FD8-1FDB1FE8-1FEC1FF8-1FFB21022107210B-210D2110-211221152119-211D212421262128212A-212D2130-2133213E213F214521832C00-2C2E2C602C62-2C642C672C692C6B2C6D-2C702C722C752C7E-2C802C822C842C862C882C8A2C8C2C8E2C902C922C942C962C982C9A2C9C2C9E2CA02CA22CA42CA62CA82CAA2CAC2CAE2CB02CB22CB42CB62CB82CBA2CBC2CBE2CC02CC22CC42CC62CC82CCA2CCC2CCE2CD02CD22CD42CD62CD82CDA2CDC2CDE2CE02CE22CEB2CEDA640A642A644A646A648A64AA64CA64EA650A652A654A656A658A65AA65CA65EA662A664A666A668A66AA66CA680A682A684A686A688A68AA68CA68EA690A692A694A696A722A724A726A728A72AA72CA72EA732A734A736A738A73AA73CA73EA740A742A744A746A748A74AA74CA74EA750A752A754A756A758A75AA75CA75EA760A762A764A766A768A76AA76CA76EA779A77BA77DA77EA780A782A784A786A78BFF21-FF3A",
    Lt: "01C501C801CB01F21F88-1F8F1F98-1F9F1FA8-1FAF1FBC1FCC1FFC",
    Lm: "02B0-02C102C6-02D102E0-02E402EC02EE0374037A0559064006E506E607F407F507FA081A0824082809710E460EC610FC17D718431AA71C78-1C7D1D2C-1D611D781D9B-1DBF2071207F2090-20942C7D2D6F2E2F30053031-3035303B309D309E30FC-30FEA015A4F8-A4FDA60CA67FA717-A71FA770A788A9CFAA70AADDFF70FF9EFF9F",
    Lo: "01BB01C0-01C3029405D0-05EA05F0-05F20621-063F0641-064A066E066F0671-06D306D506EE06EF06FA-06FC06FF07100712-072F074D-07A507B107CA-07EA0800-08150904-0939093D09500958-096109720979-097F0985-098C098F09900993-09A809AA-09B009B209B6-09B909BD09CE09DC09DD09DF-09E109F009F10A05-0A0A0A0F0A100A13-0A280A2A-0A300A320A330A350A360A380A390A59-0A5C0A5E0A72-0A740A85-0A8D0A8F-0A910A93-0AA80AAA-0AB00AB20AB30AB5-0AB90ABD0AD00AE00AE10B05-0B0C0B0F0B100B13-0B280B2A-0B300B320B330B35-0B390B3D0B5C0B5D0B5F-0B610B710B830B85-0B8A0B8E-0B900B92-0B950B990B9A0B9C0B9E0B9F0BA30BA40BA8-0BAA0BAE-0BB90BD00C05-0C0C0C0E-0C100C12-0C280C2A-0C330C35-0C390C3D0C580C590C600C610C85-0C8C0C8E-0C900C92-0CA80CAA-0CB30CB5-0CB90CBD0CDE0CE00CE10D05-0D0C0D0E-0D100D12-0D280D2A-0D390D3D0D600D610D7A-0D7F0D85-0D960D9A-0DB10DB3-0DBB0DBD0DC0-0DC60E01-0E300E320E330E40-0E450E810E820E840E870E880E8A0E8D0E94-0E970E99-0E9F0EA1-0EA30EA50EA70EAA0EAB0EAD-0EB00EB20EB30EBD0EC0-0EC40EDC0EDD0F000F40-0F470F49-0F6C0F88-0F8B1000-102A103F1050-1055105A-105D106110651066106E-10701075-1081108E10D0-10FA1100-1248124A-124D1250-12561258125A-125D1260-1288128A-128D1290-12B012B2-12B512B8-12BE12C012C2-12C512C8-12D612D8-13101312-13151318-135A1380-138F13A0-13F41401-166C166F-167F1681-169A16A0-16EA1700-170C170E-17111720-17311740-17511760-176C176E-17701780-17B317DC1820-18421844-18771880-18A818AA18B0-18F51900-191C1950-196D1970-19741980-19AB19C1-19C71A00-1A161A20-1A541B05-1B331B45-1B4B1B83-1BA01BAE1BAF1C00-1C231C4D-1C4F1C5A-1C771CE9-1CEC1CEE-1CF12135-21382D30-2D652D80-2D962DA0-2DA62DA8-2DAE2DB0-2DB62DB8-2DBE2DC0-2DC62DC8-2DCE2DD0-2DD62DD8-2DDE3006303C3041-3096309F30A1-30FA30FF3105-312D3131-318E31A0-31B731F0-31FF3400-4DB54E00-9FCBA000-A014A016-A48CA4D0-A4F7A500-A60BA610-A61FA62AA62BA66EA6A0-A6E5A7FB-A801A803-A805A807-A80AA80C-A822A840-A873A882-A8B3A8F2-A8F7A8FBA90A-A925A930-A946A960-A97CA984-A9B2AA00-AA28AA40-AA42AA44-AA4BAA60-AA6FAA71-AA76AA7AAA80-AAAFAAB1AAB5AAB6AAB9-AABDAAC0AAC2AADBAADCABC0-ABE2AC00-D7A3D7B0-D7C6D7CB-D7FBF900-FA2DFA30-FA6DFA70-FAD9FB1DFB1F-FB28FB2A-FB36FB38-FB3CFB3EFB40FB41FB43FB44FB46-FBB1FBD3-FD3DFD50-FD8FFD92-FDC7FDF0-FDFBFE70-FE74FE76-FEFCFF66-FF6FFF71-FF9DFFA0-FFBEFFC2-FFC7FFCA-FFCFFFD2-FFD7FFDA-FFDC",
    M:  "0300-036F0483-04890591-05BD05BF05C105C205C405C505C70610-061A064B-065E067006D6-06DC06DE-06E406E706E806EA-06ED07110730-074A07A6-07B007EB-07F30816-0819081B-08230825-08270829-082D0900-0903093C093E-094E0951-0955096209630981-098309BC09BE-09C409C709C809CB-09CD09D709E209E30A01-0A030A3C0A3E-0A420A470A480A4B-0A4D0A510A700A710A750A81-0A830ABC0ABE-0AC50AC7-0AC90ACB-0ACD0AE20AE30B01-0B030B3C0B3E-0B440B470B480B4B-0B4D0B560B570B620B630B820BBE-0BC20BC6-0BC80BCA-0BCD0BD70C01-0C030C3E-0C440C46-0C480C4A-0C4D0C550C560C620C630C820C830CBC0CBE-0CC40CC6-0CC80CCA-0CCD0CD50CD60CE20CE30D020D030D3E-0D440D46-0D480D4A-0D4D0D570D620D630D820D830DCA0DCF-0DD40DD60DD8-0DDF0DF20DF30E310E34-0E3A0E47-0E4E0EB10EB4-0EB90EBB0EBC0EC8-0ECD0F180F190F350F370F390F3E0F3F0F71-0F840F860F870F90-0F970F99-0FBC0FC6102B-103E1056-1059105E-10601062-10641067-106D1071-10741082-108D108F109A-109D135F1712-17141732-1734175217531772177317B6-17D317DD180B-180D18A91920-192B1930-193B19B0-19C019C819C91A17-1A1B1A55-1A5E1A60-1A7C1A7F1B00-1B041B34-1B441B6B-1B731B80-1B821BA1-1BAA1C24-1C371CD0-1CD21CD4-1CE81CED1CF21DC0-1DE61DFD-1DFF20D0-20F02CEF-2CF12DE0-2DFF302A-302F3099309AA66F-A672A67CA67DA6F0A6F1A802A806A80BA823-A827A880A881A8B4-A8C4A8E0-A8F1A926-A92DA947-A953A980-A983A9B3-A9C0AA29-AA36AA43AA4CAA4DAA7BAAB0AAB2-AAB4AAB7AAB8AABEAABFAAC1ABE3-ABEAABECABEDFB1EFE00-FE0FFE20-FE26",
    Mn: "0300-036F0483-04870591-05BD05BF05C105C205C405C505C70610-061A064B-065E067006D6-06DC06DF-06E406E706E806EA-06ED07110730-074A07A6-07B007EB-07F30816-0819081B-08230825-08270829-082D0900-0902093C0941-0948094D0951-095509620963098109BC09C1-09C409CD09E209E30A010A020A3C0A410A420A470A480A4B-0A4D0A510A700A710A750A810A820ABC0AC1-0AC50AC70AC80ACD0AE20AE30B010B3C0B3F0B41-0B440B4D0B560B620B630B820BC00BCD0C3E-0C400C46-0C480C4A-0C4D0C550C560C620C630CBC0CBF0CC60CCC0CCD0CE20CE30D41-0D440D4D0D620D630DCA0DD2-0DD40DD60E310E34-0E3A0E47-0E4E0EB10EB4-0EB90EBB0EBC0EC8-0ECD0F180F190F350F370F390F71-0F7E0F80-0F840F860F870F90-0F970F99-0FBC0FC6102D-10301032-10371039103A103D103E10581059105E-10601071-1074108210851086108D109D135F1712-17141732-1734175217531772177317B7-17BD17C617C9-17D317DD180B-180D18A91920-19221927192819321939-193B1A171A181A561A58-1A5E1A601A621A65-1A6C1A73-1A7C1A7F1B00-1B031B341B36-1B3A1B3C1B421B6B-1B731B801B811BA2-1BA51BA81BA91C2C-1C331C361C371CD0-1CD21CD4-1CE01CE2-1CE81CED1DC0-1DE61DFD-1DFF20D0-20DC20E120E5-20F02CEF-2CF12DE0-2DFF302A-302F3099309AA66FA67CA67DA6F0A6F1A802A806A80BA825A826A8C4A8E0-A8F1A926-A92DA947-A951A980-A982A9B3A9B6-A9B9A9BCAA29-AA2EAA31AA32AA35AA36AA43AA4CAAB0AAB2-AAB4AAB7AAB8AABEAABFAAC1ABE5ABE8ABEDFB1EFE00-FE0FFE20-FE26",
    Mc: "0903093E-09400949-094C094E0982098309BE-09C009C709C809CB09CC09D70A030A3E-0A400A830ABE-0AC00AC90ACB0ACC0B020B030B3E0B400B470B480B4B0B4C0B570BBE0BBF0BC10BC20BC6-0BC80BCA-0BCC0BD70C01-0C030C41-0C440C820C830CBE0CC0-0CC40CC70CC80CCA0CCB0CD50CD60D020D030D3E-0D400D46-0D480D4A-0D4C0D570D820D830DCF-0DD10DD8-0DDF0DF20DF30F3E0F3F0F7F102B102C10311038103B103C105610571062-10641067-106D108310841087-108C108F109A-109C17B617BE-17C517C717C81923-19261929-192B193019311933-193819B0-19C019C819C91A19-1A1B1A551A571A611A631A641A6D-1A721B041B351B3B1B3D-1B411B431B441B821BA11BA61BA71BAA1C24-1C2B1C341C351CE11CF2A823A824A827A880A881A8B4-A8C3A952A953A983A9B4A9B5A9BAA9BBA9BD-A9C0AA2FAA30AA33AA34AA4DAA7BABE3ABE4ABE6ABE7ABE9ABEAABEC",
    Me: "0488048906DE20DD-20E020E2-20E4A670-A672",
    N:  "0030-003900B200B300B900BC-00BE0660-066906F0-06F907C0-07C90966-096F09E6-09EF09F4-09F90A66-0A6F0AE6-0AEF0B66-0B6F0BE6-0BF20C66-0C6F0C78-0C7E0CE6-0CEF0D66-0D750E50-0E590ED0-0ED90F20-0F331040-10491090-10991369-137C16EE-16F017E0-17E917F0-17F91810-18191946-194F19D0-19DA1A80-1A891A90-1A991B50-1B591BB0-1BB91C40-1C491C50-1C5920702074-20792080-20892150-21822185-21892460-249B24EA-24FF2776-27932CFD30073021-30293038-303A3192-31953220-32293251-325F3280-328932B1-32BFA620-A629A6E6-A6EFA830-A835A8D0-A8D9A900-A909A9D0-A9D9AA50-AA59ABF0-ABF9FF10-FF19",
    Nd: "0030-00390660-066906F0-06F907C0-07C90966-096F09E6-09EF0A66-0A6F0AE6-0AEF0B66-0B6F0BE6-0BEF0C66-0C6F0CE6-0CEF0D66-0D6F0E50-0E590ED0-0ED90F20-0F291040-10491090-109917E0-17E91810-18191946-194F19D0-19DA1A80-1A891A90-1A991B50-1B591BB0-1BB91C40-1C491C50-1C59A620-A629A8D0-A8D9A900-A909A9D0-A9D9AA50-AA59ABF0-ABF9FF10-FF19",
    Nl: "16EE-16F02160-21822185-218830073021-30293038-303AA6E6-A6EF",
    No: "00B200B300B900BC-00BE09F4-09F90BF0-0BF20C78-0C7E0D70-0D750F2A-0F331369-137C17F0-17F920702074-20792080-20892150-215F21892460-249B24EA-24FF2776-27932CFD3192-31953220-32293251-325F3280-328932B1-32BFA830-A835",
    P:  "0021-00230025-002A002C-002F003A003B003F0040005B-005D005F007B007D00A100AB00B700BB00BF037E0387055A-055F0589058A05BE05C005C305C605F305F40609060A060C060D061B061E061F066A-066D06D40700-070D07F7-07F90830-083E0964096509700DF40E4F0E5A0E5B0F04-0F120F3A-0F3D0F850FD0-0FD4104A-104F10FB1361-13681400166D166E169B169C16EB-16ED1735173617D4-17D617D8-17DA1800-180A1944194519DE19DF1A1E1A1F1AA0-1AA61AA8-1AAD1B5A-1B601C3B-1C3F1C7E1C7F1CD32010-20272030-20432045-20512053-205E207D207E208D208E2329232A2768-277527C527C627E6-27EF2983-299829D8-29DB29FC29FD2CF9-2CFC2CFE2CFF2E00-2E2E2E302E313001-30033008-30113014-301F3030303D30A030FBA4FEA4FFA60D-A60FA673A67EA6F2-A6F7A874-A877A8CEA8CFA8F8-A8FAA92EA92FA95FA9C1-A9CDA9DEA9DFAA5C-AA5FAADEAADFABEBFD3EFD3FFE10-FE19FE30-FE52FE54-FE61FE63FE68FE6AFE6BFF01-FF03FF05-FF0AFF0C-FF0FFF1AFF1BFF1FFF20FF3B-FF3DFF3FFF5BFF5DFF5F-FF65",
    Pd: "002D058A05BE140018062010-20152E172E1A301C303030A0FE31FE32FE58FE63FF0D",
    Ps: "0028005B007B0F3A0F3C169B201A201E2045207D208D23292768276A276C276E27702772277427C527E627E827EA27EC27EE2983298529872989298B298D298F299129932995299729D829DA29FC2E222E242E262E283008300A300C300E3010301430163018301A301DFD3EFE17FE35FE37FE39FE3BFE3DFE3FFE41FE43FE47FE59FE5BFE5DFF08FF3BFF5BFF5FFF62",
    Pe: "0029005D007D0F3B0F3D169C2046207E208E232A2769276B276D276F27712773277527C627E727E927EB27ED27EF298429862988298A298C298E2990299229942996299829D929DB29FD2E232E252E272E293009300B300D300F3011301530173019301B301E301FFD3FFE18FE36FE38FE3AFE3CFE3EFE40FE42FE44FE48FE5AFE5CFE5EFF09FF3DFF5DFF60FF63",
    Pi: "00AB2018201B201C201F20392E022E042E092E0C2E1C2E20",
    Pf: "00BB2019201D203A2E032E052E0A2E0D2E1D2E21",
    Pc: "005F203F20402054FE33FE34FE4D-FE4FFF3F",
    Po: "0021-00230025-0027002A002C002E002F003A003B003F0040005C00A100B700BF037E0387055A-055F058905C005C305C605F305F40609060A060C060D061B061E061F066A-066D06D40700-070D07F7-07F90830-083E0964096509700DF40E4F0E5A0E5B0F04-0F120F850FD0-0FD4104A-104F10FB1361-1368166D166E16EB-16ED1735173617D4-17D617D8-17DA1800-18051807-180A1944194519DE19DF1A1E1A1F1AA0-1AA61AA8-1AAD1B5A-1B601C3B-1C3F1C7E1C7F1CD3201620172020-20272030-2038203B-203E2041-20432047-205120532055-205E2CF9-2CFC2CFE2CFF2E002E012E06-2E082E0B2E0E-2E162E182E192E1B2E1E2E1F2E2A-2E2E2E302E313001-3003303D30FBA4FEA4FFA60D-A60FA673A67EA6F2-A6F7A874-A877A8CEA8CFA8F8-A8FAA92EA92FA95FA9C1-A9CDA9DEA9DFAA5C-AA5FAADEAADFABEBFE10-FE16FE19FE30FE45FE46FE49-FE4CFE50-FE52FE54-FE57FE5F-FE61FE68FE6AFE6BFF01-FF03FF05-FF07FF0AFF0CFF0EFF0FFF1AFF1BFF1FFF20FF3CFF61FF64FF65",
    S:  "0024002B003C-003E005E0060007C007E00A2-00A900AC00AE-00B100B400B600B800D700F702C2-02C502D2-02DF02E5-02EB02ED02EF-02FF03750384038503F604820606-0608060B060E060F06E906FD06FE07F609F209F309FA09FB0AF10B700BF3-0BFA0C7F0CF10CF20D790E3F0F01-0F030F13-0F170F1A-0F1F0F340F360F380FBE-0FC50FC7-0FCC0FCE0FCF0FD5-0FD8109E109F13601390-139917DB194019E0-19FF1B61-1B6A1B74-1B7C1FBD1FBF-1FC11FCD-1FCF1FDD-1FDF1FED-1FEF1FFD1FFE20442052207A-207C208A-208C20A0-20B8210021012103-21062108210921142116-2118211E-2123212521272129212E213A213B2140-2144214A-214D214F2190-2328232B-23E82400-24262440-244A249C-24E92500-26CD26CF-26E126E326E8-26FF2701-27042706-2709270C-27272729-274B274D274F-27522756-275E2761-276727942798-27AF27B1-27BE27C0-27C427C7-27CA27CC27D0-27E527F0-29822999-29D729DC-29FB29FE-2B4C2B50-2B592CE5-2CEA2E80-2E992E9B-2EF32F00-2FD52FF0-2FFB300430123013302030363037303E303F309B309C319031913196-319F31C0-31E33200-321E322A-32503260-327F328A-32B032C0-32FE3300-33FF4DC0-4DFFA490-A4C6A700-A716A720A721A789A78AA828-A82BA836-A839AA77-AA79FB29FDFCFDFDFE62FE64-FE66FE69FF04FF0BFF1C-FF1EFF3EFF40FF5CFF5EFFE0-FFE6FFE8-FFEEFFFCFFFD",
    Sm: "002B003C-003E007C007E00AC00B100D700F703F60606-060820442052207A-207C208A-208C2140-2144214B2190-2194219A219B21A021A321A621AE21CE21CF21D221D421F4-22FF2308-230B23202321237C239B-23B323DC-23E125B725C125F8-25FF266F27C0-27C427C7-27CA27CC27D0-27E527F0-27FF2900-29822999-29D729DC-29FB29FE-2AFF2B30-2B442B47-2B4CFB29FE62FE64-FE66FF0BFF1C-FF1EFF5CFF5EFFE2FFE9-FFEC",
    Sc: "002400A2-00A5060B09F209F309FB0AF10BF90E3F17DB20A0-20B8A838FDFCFE69FF04FFE0FFE1FFE5FFE6",
    Sk: "005E006000A800AF00B400B802C2-02C502D2-02DF02E5-02EB02ED02EF-02FF0375038403851FBD1FBF-1FC11FCD-1FCF1FDD-1FDF1FED-1FEF1FFD1FFE309B309CA700-A716A720A721A789A78AFF3EFF40FFE3",
    So: "00A600A700A900AE00B000B60482060E060F06E906FD06FE07F609FA0B700BF3-0BF80BFA0C7F0CF10CF20D790F01-0F030F13-0F170F1A-0F1F0F340F360F380FBE-0FC50FC7-0FCC0FCE0FCF0FD5-0FD8109E109F13601390-1399194019E0-19FF1B61-1B6A1B74-1B7C210021012103-21062108210921142116-2118211E-2123212521272129212E213A213B214A214C214D214F2195-2199219C-219F21A121A221A421A521A7-21AD21AF-21CD21D021D121D321D5-21F32300-2307230C-231F2322-2328232B-237B237D-239A23B4-23DB23E2-23E82400-24262440-244A249C-24E92500-25B625B8-25C025C2-25F72600-266E2670-26CD26CF-26E126E326E8-26FF2701-27042706-2709270C-27272729-274B274D274F-27522756-275E2761-276727942798-27AF27B1-27BE2800-28FF2B00-2B2F2B452B462B50-2B592CE5-2CEA2E80-2E992E9B-2EF32F00-2FD52FF0-2FFB300430123013302030363037303E303F319031913196-319F31C0-31E33200-321E322A-32503260-327F328A-32B032C0-32FE3300-33FF4DC0-4DFFA490-A4C6A828-A82BA836A837A839AA77-AA79FDFDFFE4FFE8FFEDFFEEFFFCFFFD",
    Z:  "002000A01680180E2000-200A20282029202F205F3000",
    Zs: "002000A01680180E2000-200A202F205F3000",
    Zl: "2028",
    Zp: "2029",
    C:  "0000-001F007F-009F00AD03780379037F-0383038B038D03A20526-05300557055805600588058B-059005C8-05CF05EB-05EF05F5-0605061C061D0620065F06DD070E070F074B074C07B2-07BF07FB-07FF082E082F083F-08FF093A093B094F095609570973-097809800984098D098E0991099209A909B109B3-09B509BA09BB09C509C609C909CA09CF-09D609D8-09DB09DE09E409E509FC-0A000A040A0B-0A0E0A110A120A290A310A340A370A3A0A3B0A3D0A43-0A460A490A4A0A4E-0A500A52-0A580A5D0A5F-0A650A76-0A800A840A8E0A920AA90AB10AB40ABA0ABB0AC60ACA0ACE0ACF0AD1-0ADF0AE40AE50AF00AF2-0B000B040B0D0B0E0B110B120B290B310B340B3A0B3B0B450B460B490B4A0B4E-0B550B58-0B5B0B5E0B640B650B72-0B810B840B8B-0B8D0B910B96-0B980B9B0B9D0BA0-0BA20BA5-0BA70BAB-0BAD0BBA-0BBD0BC3-0BC50BC90BCE0BCF0BD1-0BD60BD8-0BE50BFB-0C000C040C0D0C110C290C340C3A-0C3C0C450C490C4E-0C540C570C5A-0C5F0C640C650C70-0C770C800C810C840C8D0C910CA90CB40CBA0CBB0CC50CC90CCE-0CD40CD7-0CDD0CDF0CE40CE50CF00CF3-0D010D040D0D0D110D290D3A-0D3C0D450D490D4E-0D560D58-0D5F0D640D650D76-0D780D800D810D840D97-0D990DB20DBC0DBE0DBF0DC7-0DC90DCB-0DCE0DD50DD70DE0-0DF10DF5-0E000E3B-0E3E0E5C-0E800E830E850E860E890E8B0E8C0E8E-0E930E980EA00EA40EA60EA80EA90EAC0EBA0EBE0EBF0EC50EC70ECE0ECF0EDA0EDB0EDE-0EFF0F480F6D-0F700F8C-0F8F0F980FBD0FCD0FD9-0FFF10C6-10CF10FD-10FF1249124E124F12571259125E125F1289128E128F12B112B612B712BF12C112C612C712D7131113161317135B-135E137D-137F139A-139F13F5-13FF169D-169F16F1-16FF170D1715-171F1737-173F1754-175F176D17711774-177F17B417B517DE17DF17EA-17EF17FA-17FF180F181A-181F1878-187F18AB-18AF18F6-18FF191D-191F192C-192F193C-193F1941-1943196E196F1975-197F19AC-19AF19CA-19CF19DB-19DD1A1C1A1D1A5F1A7D1A7E1A8A-1A8F1A9A-1A9F1AAE-1AFF1B4C-1B4F1B7D-1B7F1BAB-1BAD1BBA-1BFF1C38-1C3A1C4A-1C4C1C80-1CCF1CF3-1CFF1DE7-1DFC1F161F171F1E1F1F1F461F471F4E1F4F1F581F5A1F5C1F5E1F7E1F7F1FB51FC51FD41FD51FDC1FF01FF11FF51FFF200B-200F202A-202E2060-206F20722073208F2095-209F20B9-20CF20F1-20FF218A-218F23E9-23FF2427-243F244B-245F26CE26E226E4-26E727002705270A270B2728274C274E2753-2755275F27602795-279727B027BF27CB27CD-27CF2B4D-2B4F2B5A-2BFF2C2F2C5F2CF2-2CF82D26-2D2F2D66-2D6E2D70-2D7F2D97-2D9F2DA72DAF2DB72DBF2DC72DCF2DD72DDF2E32-2E7F2E9A2EF4-2EFF2FD6-2FEF2FFC-2FFF3040309730983100-3104312E-3130318F31B8-31BF31E4-31EF321F32FF4DB6-4DBF9FCC-9FFFA48D-A48FA4C7-A4CFA62C-A63FA660A661A674-A67BA698-A69FA6F8-A6FFA78D-A7FAA82C-A82FA83A-A83FA878-A87FA8C5-A8CDA8DA-A8DFA8FC-A8FFA954-A95EA97D-A97FA9CEA9DA-A9DDA9E0-A9FFAA37-AA3FAA4EAA4FAA5AAA5BAA7C-AA7FAAC3-AADAAAE0-ABBFABEEABEFABFA-ABFFD7A4-D7AFD7C7-D7CAD7FC-F8FFFA2EFA2FFA6EFA6FFADA-FAFFFB07-FB12FB18-FB1CFB37FB3DFB3FFB42FB45FBB2-FBD2FD40-FD4FFD90FD91FDC8-FDEFFDFEFDFFFE1A-FE1FFE27-FE2FFE53FE67FE6C-FE6FFE75FEFD-FF00FFBF-FFC1FFC8FFC9FFD0FFD1FFD8FFD9FFDD-FFDFFFE7FFEF-FFFBFFFEFFFF",
    Cc: "0000-001F007F-009F",
    Cf: "00AD0600-060306DD070F17B417B5200B-200F202A-202E2060-2064206A-206FFEFFFFF9-FFFB",
    Co: "E000-F8FF",
    Cs: "D800-DFFF",
    Cn: "03780379037F-0383038B038D03A20526-05300557055805600588058B-059005C8-05CF05EB-05EF05F5-05FF06040605061C061D0620065F070E074B074C07B2-07BF07FB-07FF082E082F083F-08FF093A093B094F095609570973-097809800984098D098E0991099209A909B109B3-09B509BA09BB09C509C609C909CA09CF-09D609D8-09DB09DE09E409E509FC-0A000A040A0B-0A0E0A110A120A290A310A340A370A3A0A3B0A3D0A43-0A460A490A4A0A4E-0A500A52-0A580A5D0A5F-0A650A76-0A800A840A8E0A920AA90AB10AB40ABA0ABB0AC60ACA0ACE0ACF0AD1-0ADF0AE40AE50AF00AF2-0B000B040B0D0B0E0B110B120B290B310B340B3A0B3B0B450B460B490B4A0B4E-0B550B58-0B5B0B5E0B640B650B72-0B810B840B8B-0B8D0B910B96-0B980B9B0B9D0BA0-0BA20BA5-0BA70BAB-0BAD0BBA-0BBD0BC3-0BC50BC90BCE0BCF0BD1-0BD60BD8-0BE50BFB-0C000C040C0D0C110C290C340C3A-0C3C0C450C490C4E-0C540C570C5A-0C5F0C640C650C70-0C770C800C810C840C8D0C910CA90CB40CBA0CBB0CC50CC90CCE-0CD40CD7-0CDD0CDF0CE40CE50CF00CF3-0D010D040D0D0D110D290D3A-0D3C0D450D490D4E-0D560D58-0D5F0D640D650D76-0D780D800D810D840D97-0D990DB20DBC0DBE0DBF0DC7-0DC90DCB-0DCE0DD50DD70DE0-0DF10DF5-0E000E3B-0E3E0E5C-0E800E830E850E860E890E8B0E8C0E8E-0E930E980EA00EA40EA60EA80EA90EAC0EBA0EBE0EBF0EC50EC70ECE0ECF0EDA0EDB0EDE-0EFF0F480F6D-0F700F8C-0F8F0F980FBD0FCD0FD9-0FFF10C6-10CF10FD-10FF1249124E124F12571259125E125F1289128E128F12B112B612B712BF12C112C612C712D7131113161317135B-135E137D-137F139A-139F13F5-13FF169D-169F16F1-16FF170D1715-171F1737-173F1754-175F176D17711774-177F17DE17DF17EA-17EF17FA-17FF180F181A-181F1878-187F18AB-18AF18F6-18FF191D-191F192C-192F193C-193F1941-1943196E196F1975-197F19AC-19AF19CA-19CF19DB-19DD1A1C1A1D1A5F1A7D1A7E1A8A-1A8F1A9A-1A9F1AAE-1AFF1B4C-1B4F1B7D-1B7F1BAB-1BAD1BBA-1BFF1C38-1C3A1C4A-1C4C1C80-1CCF1CF3-1CFF1DE7-1DFC1F161F171F1E1F1F1F461F471F4E1F4F1F581F5A1F5C1F5E1F7E1F7F1FB51FC51FD41FD51FDC1FF01FF11FF51FFF2065-206920722073208F2095-209F20B9-20CF20F1-20FF218A-218F23E9-23FF2427-243F244B-245F26CE26E226E4-26E727002705270A270B2728274C274E2753-2755275F27602795-279727B027BF27CB27CD-27CF2B4D-2B4F2B5A-2BFF2C2F2C5F2CF2-2CF82D26-2D2F2D66-2D6E2D70-2D7F2D97-2D9F2DA72DAF2DB72DBF2DC72DCF2DD72DDF2E32-2E7F2E9A2EF4-2EFF2FD6-2FEF2FFC-2FFF3040309730983100-3104312E-3130318F31B8-31BF31E4-31EF321F32FF4DB6-4DBF9FCC-9FFFA48D-A48FA4C7-A4CFA62C-A63FA660A661A674-A67BA698-A69FA6F8-A6FFA78D-A7FAA82C-A82FA83A-A83FA878-A87FA8C5-A8CDA8DA-A8DFA8FC-A8FFA954-A95EA97D-A97FA9CEA9DA-A9DDA9E0-A9FFAA37-AA3FAA4EAA4FAA5AAA5BAA7C-AA7FAAC3-AADAAAE0-ABBFABEEABEFABFA-ABFFD7A4-D7AFD7C7-D7CAD7FC-D7FFFA2EFA2FFA6EFA6FFADA-FAFFFB07-FB12FB18-FB1CFB37FB3DFB3FFB42FB45FBB2-FBD2FD40-FD4FFD90FD91FDC8-FDEFFDFEFDFFFE1A-FE1FFE27-FE2FFE53FE67FE6C-FE6FFE75FEFDFEFEFF00FFBF-FFC1FFC8FFC9FFD0FFD1FFD8FFD9FFDD-FFDFFFE7FFEF-FFF8FFFEFFFF"
***REMOVED***);

function addUnicodePackage (pack) ***REMOVED***
    var codePoint = /\w***REMOVED***4***REMOVED***/g;
    for (var name in pack)
        exports.packages[name] = pack[name].replace(codePoint, "\\u$&");
***REMOVED***;

***REMOVED***);

__ace_shadowed__.define('ace/token_iterator', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***
var TokenIterator = function(session, initialRow, initialColumn) ***REMOVED***
    this.$session = session;
    this.$row = initialRow;
    this.$rowTokens = session.getTokens(initialRow);

    var token = session.getTokenAt(initialRow, initialColumn);
    this.$tokenIndex = token ? token.index : -1;
***REMOVED***;

(function() ***REMOVED*** 
    this.stepBackward = function() ***REMOVED***
        this.$tokenIndex -= 1;
        
        while (this.$tokenIndex < 0) ***REMOVED***
            this.$row -= 1;
            if (this.$row < 0) ***REMOVED***
                this.$row = 0;
                return null;
        ***REMOVED***
                
            this.$rowTokens = this.$session.getTokens(this.$row);
            this.$tokenIndex = this.$rowTokens.length - 1;
    ***REMOVED***
            
        return this.$rowTokens[this.$tokenIndex];
***REMOVED***;   
    this.stepForward = function() ***REMOVED***
        this.$tokenIndex += 1;
        var rowCount;
        while (this.$tokenIndex >= this.$rowTokens.length) ***REMOVED***
            this.$row += 1;
            if (!rowCount)
                rowCount = this.$session.getLength();
            if (this.$row >= rowCount) ***REMOVED***
                this.$row = rowCount - 1;
                return null;
        ***REMOVED***

            this.$rowTokens = this.$session.getTokens(this.$row);
            this.$tokenIndex = 0;
    ***REMOVED***
            
        return this.$rowTokens[this.$tokenIndex];
***REMOVED***;      
    this.getCurrentToken = function () ***REMOVED***
        return this.$rowTokens[this.$tokenIndex];
***REMOVED***;      
    this.getCurrentTokenRow = function () ***REMOVED***
        return this.$row;
***REMOVED***;     
    this.getCurrentTokenColumn = function() ***REMOVED***
        var rowTokens = this.$rowTokens;
        var tokenIndex = this.$tokenIndex;
        var column = rowTokens[tokenIndex].start;
        if (column !== undefined)
            return column;
            
        column = 0;
        while (tokenIndex > 0) ***REMOVED***
            tokenIndex -= 1;
            column += rowTokens[tokenIndex].value.length;
    ***REMOVED***
        
        return column;  
***REMOVED***;
            
***REMOVED***).call(TokenIterator.prototype);

exports.TokenIterator = TokenIterator;
***REMOVED***);

__ace_shadowed__.define('ace/document', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/lib/event_emitter', 'ace/range', 'ace/anchor'], function(require, exports, module) ***REMOVED***


var oop = require("./lib/oop");
var EventEmitter = require("./lib/event_emitter").EventEmitter;
var Range = require("./range").Range;
var Anchor = require("./anchor").Anchor;

var Document = function(text) ***REMOVED***
    this.$lines = [];
    if (text.length === 0) ***REMOVED***
        this.$lines = [""];
***REMOVED*** else if (Array.isArray(text)) ***REMOVED***
        this._insertLines(0, text);
***REMOVED*** else ***REMOVED***
        this.insert(***REMOVED***row: 0, column:0***REMOVED***, text);
***REMOVED***
***REMOVED***;

(function() ***REMOVED***

    oop.implement(this, EventEmitter);
    this.setValue = function(text) ***REMOVED***
        var len = this.getLength();
        this.remove(new Range(0, 0, len, this.getLine(len-1).length));
        this.insert(***REMOVED***row: 0, column:0***REMOVED***, text);
***REMOVED***;
    this.getValue = function() ***REMOVED***
        return this.getAllLines().join(this.getNewLineCharacter());
***REMOVED***;
    this.createAnchor = function(row, column) ***REMOVED***
        return new Anchor(this, row, column);
***REMOVED***;
    if ("aaa".split(/a/).length === 0)
        this.$split = function(text) ***REMOVED***
            return text.replace(/\r\n|\r/g, "\n").split("\n");
    ***REMOVED***;
    else
        this.$split = function(text) ***REMOVED***
            return text.split(/\r\n|\r|\n/);
    ***REMOVED***;


    this.$detectNewLine = function(text) ***REMOVED***
        var match = text.match(/^.*?(\r\n|\r|\n)/m);
        this.$autoNewLine = match ? match[1] : "\n";
        this._signal("changeNewLineMode");
***REMOVED***;
    this.getNewLineCharacter = function() ***REMOVED***
        switch (this.$newLineMode) ***REMOVED***
          case "windows":
            return "\r\n";
          case "unix":
            return "\n";
          default:
            return this.$autoNewLine || "\n";
    ***REMOVED***
***REMOVED***;

    this.$autoNewLine = "";
    this.$newLineMode = "auto";
    this.setNewLineMode = function(newLineMode) ***REMOVED***
        if (this.$newLineMode === newLineMode)
            return;

        this.$newLineMode = newLineMode;
        this._signal("changeNewLineMode");
***REMOVED***;
    this.getNewLineMode = function() ***REMOVED***
        return this.$newLineMode;
***REMOVED***;
    this.isNewLine = function(text) ***REMOVED***
        return (text == "\r\n" || text == "\r" || text == "\n");
***REMOVED***;
    this.getLine = function(row) ***REMOVED***
        return this.$lines[row] || "";
***REMOVED***;
    this.getLines = function(firstRow, lastRow) ***REMOVED***
        return this.$lines.slice(firstRow, lastRow + 1);
***REMOVED***;
    this.getAllLines = function() ***REMOVED***
        return this.getLines(0, this.getLength());
***REMOVED***;
    this.getLength = function() ***REMOVED***
        return this.$lines.length;
***REMOVED***;
    this.getTextRange = function(range) ***REMOVED***
        if (range.start.row == range.end.row) ***REMOVED***
            return this.getLine(range.start.row)
                .substring(range.start.column, range.end.column);
    ***REMOVED***
        var lines = this.getLines(range.start.row, range.end.row);
        lines[0] = (lines[0] || "").substring(range.start.column);
        var l = lines.length - 1;
        if (range.end.row - range.start.row == l)
            lines[l] = lines[l].substring(0, range.end.column);
        return lines.join(this.getNewLineCharacter());
***REMOVED***;

    this.$clipPosition = function(position) ***REMOVED***
        var length = this.getLength();
        if (position.row >= length) ***REMOVED***
            position.row = Math.max(0, length - 1);
            position.column = this.getLine(length-1).length;
    ***REMOVED*** else if (position.row < 0)
            position.row = 0;
        return position;
***REMOVED***;
    this.insert = function(position, text) ***REMOVED***
        if (!text || text.length === 0)
            return position;

        position = this.$clipPosition(position);
        if (this.getLength() <= 1)
            this.$detectNewLine(text);

        var lines = this.$split(text);
        var firstLine = lines.splice(0, 1)[0];
        var lastLine = lines.length == 0 ? null : lines.splice(lines.length - 1, 1)[0];

        position = this.insertInLine(position, firstLine);
        if (lastLine !== null) ***REMOVED***
            position = this.insertNewLine(position); // terminate first line
            position = this._insertLines(position.row, lines);
            position = this.insertInLine(position, lastLine || "");
    ***REMOVED***
        return position;
***REMOVED***;
    this.insertLines = function(row, lines) ***REMOVED***
        if (row >= this.getLength())
            return this.insert(***REMOVED***row: row, column: 0***REMOVED***, "\n" + lines.join("\n"));
        return this._insertLines(Math.max(row, 0), lines);
***REMOVED***;
    this._insertLines = function(row, lines) ***REMOVED***
        if (lines.length == 0)
            return ***REMOVED***row: row, column: 0***REMOVED***;
        while (lines.length > 0xF000) ***REMOVED***
            var end = this._insertLines(row, lines.slice(0, 0xF000));
            lines = lines.slice(0xF000);
            row = end.row;
    ***REMOVED***

        var args = [row, 0];
        args.push.apply(args, lines);
        this.$lines.splice.apply(this.$lines, args);

        var range = new Range(row, 0, row + lines.length, 0);
        var delta = ***REMOVED***
            action: "insertLines",
            range: range,
            lines: lines
    ***REMOVED***;
        this._signal("change", ***REMOVED*** data: delta ***REMOVED***);
        return range.end;
***REMOVED***;
    this.insertNewLine = function(position) ***REMOVED***
        position = this.$clipPosition(position);
        var line = this.$lines[position.row] || "";

        this.$lines[position.row] = line.substring(0, position.column);
        this.$lines.splice(position.row + 1, 0, line.substring(position.column, line.length));

        var end = ***REMOVED***
            row : position.row + 1,
            column : 0
    ***REMOVED***;

        var delta = ***REMOVED***
            action: "insertText",
            range: Range.fromPoints(position, end),
            text: this.getNewLineCharacter()
    ***REMOVED***;
        this._signal("change", ***REMOVED*** data: delta ***REMOVED***);

        return end;
***REMOVED***;
    this.insertInLine = function(position, text) ***REMOVED***
        if (text.length == 0)
            return position;

        var line = this.$lines[position.row] || "";

        this.$lines[position.row] = line.substring(0, position.column) + text
                + line.substring(position.column);

        var end = ***REMOVED***
            row : position.row,
            column : position.column + text.length
    ***REMOVED***;

        var delta = ***REMOVED***
            action: "insertText",
            range: Range.fromPoints(position, end),
            text: text
    ***REMOVED***;
        this._signal("change", ***REMOVED*** data: delta ***REMOVED***);

        return end;
***REMOVED***;
    this.remove = function(range) ***REMOVED***
        if (!(range instanceof Range))
            range = Range.fromPoints(range.start, range.end);
        range.start = this.$clipPosition(range.start);
        range.end = this.$clipPosition(range.end);

        if (range.isEmpty())
            return range.start;

        var firstRow = range.start.row;
        var lastRow = range.end.row;

        if (range.isMultiLine()) ***REMOVED***
            var firstFullRow = range.start.column == 0 ? firstRow : firstRow + 1;
            var lastFullRow = lastRow - 1;

            if (range.end.column > 0)
                this.removeInLine(lastRow, 0, range.end.column);

            if (lastFullRow >= firstFullRow)
                this._removeLines(firstFullRow, lastFullRow);

            if (firstFullRow != firstRow) ***REMOVED***
                this.removeInLine(firstRow, range.start.column, this.getLine(firstRow).length);
                this.removeNewLine(range.start.row);
        ***REMOVED***
    ***REMOVED***
        else ***REMOVED***
            this.removeInLine(firstRow, range.start.column, range.end.column);
    ***REMOVED***
        return range.start;
***REMOVED***;
    this.removeInLine = function(row, startColumn, endColumn) ***REMOVED***
        if (startColumn == endColumn)
            return;

        var range = new Range(row, startColumn, row, endColumn);
        var line = this.getLine(row);
        var removed = line.substring(startColumn, endColumn);
        var newLine = line.substring(0, startColumn) + line.substring(endColumn, line.length);
        this.$lines.splice(row, 1, newLine);

        var delta = ***REMOVED***
            action: "removeText",
            range: range,
            text: removed
    ***REMOVED***;
        this._signal("change", ***REMOVED*** data: delta ***REMOVED***);
        return range.start;
***REMOVED***;
    this.removeLines = function(firstRow, lastRow) ***REMOVED***
        if (firstRow < 0 || lastRow >= this.getLength())
            return this.remove(new Range(firstRow, 0, lastRow + 1, 0));
        return this._removeLines(firstRow, lastRow);
***REMOVED***;

    this._removeLines = function(firstRow, lastRow) ***REMOVED***
        var range = new Range(firstRow, 0, lastRow + 1, 0);
        var removed = this.$lines.splice(firstRow, lastRow - firstRow + 1);

        var delta = ***REMOVED***
            action: "removeLines",
            range: range,
            nl: this.getNewLineCharacter(),
            lines: removed
    ***REMOVED***;
        this._signal("change", ***REMOVED*** data: delta ***REMOVED***);
        return removed;
***REMOVED***;
    this.removeNewLine = function(row) ***REMOVED***
        var firstLine = this.getLine(row);
        var secondLine = this.getLine(row+1);

        var range = new Range(row, firstLine.length, row+1, 0);
        var line = firstLine + secondLine;

        this.$lines.splice(row, 2, line);

        var delta = ***REMOVED***
            action: "removeText",
            range: range,
            text: this.getNewLineCharacter()
    ***REMOVED***;
        this._signal("change", ***REMOVED*** data: delta ***REMOVED***);
***REMOVED***;
    this.replace = function(range, text) ***REMOVED***
        if (!(range instanceof Range))
            range = Range.fromPoints(range.start, range.end);
        if (text.length == 0 && range.isEmpty())
            return range.start;
        if (text == this.getTextRange(range))
            return range.end;

        this.remove(range);
        if (text) ***REMOVED***
            var end = this.insert(range.start, text);
    ***REMOVED***
        else ***REMOVED***
            end = range.start;
    ***REMOVED***

        return end;
***REMOVED***;
    this.applyDeltas = function(deltas) ***REMOVED***
        for (var i=0; i<deltas.length; i++) ***REMOVED***
            var delta = deltas[i];
            var range = Range.fromPoints(delta.range.start, delta.range.end);

            if (delta.action == "insertLines")
                this.insertLines(range.start.row, delta.lines);
            else if (delta.action == "insertText")
                this.insert(range.start, delta.text);
            else if (delta.action == "removeLines")
                this._removeLines(range.start.row, range.end.row - 1);
            else if (delta.action == "removeText")
                this.remove(range);
    ***REMOVED***
***REMOVED***;
    this.revertDeltas = function(deltas) ***REMOVED***
        for (var i=deltas.length-1; i>=0; i--) ***REMOVED***
            var delta = deltas[i];

            var range = Range.fromPoints(delta.range.start, delta.range.end);

            if (delta.action == "insertLines")
                this._removeLines(range.start.row, range.end.row - 1);
            else if (delta.action == "insertText")
                this.remove(range);
            else if (delta.action == "removeLines")
                this._insertLines(range.start.row, delta.lines);
            else if (delta.action == "removeText")
                this.insert(range.start, delta.text);
    ***REMOVED***
***REMOVED***;
    this.indexToPosition = function(index, startRow) ***REMOVED***
        var lines = this.$lines || this.getAllLines();
        var newlineLength = this.getNewLineCharacter().length;
        for (var i = startRow || 0, l = lines.length; i < l; i++) ***REMOVED***
            index -= lines[i].length + newlineLength;
            if (index < 0)
                return ***REMOVED***row: i, column: index + lines[i].length + newlineLength***REMOVED***;
    ***REMOVED***
        return ***REMOVED***row: l-1, column: lines[l-1].length***REMOVED***;
***REMOVED***;
    this.positionToIndex = function(pos, startRow) ***REMOVED***
        var lines = this.$lines || this.getAllLines();
        var newlineLength = this.getNewLineCharacter().length;
        var index = 0;
        var row = Math.min(pos.row, lines.length);
        for (var i = startRow || 0; i < row; ++i)
            index += lines[i].length + newlineLength;

        return index + pos.column;
***REMOVED***;

***REMOVED***).call(Document.prototype);

exports.Document = Document;
***REMOVED***);

__ace_shadowed__.define('ace/anchor', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/lib/event_emitter'], function(require, exports, module) ***REMOVED***


var oop = require("./lib/oop");
var EventEmitter = require("./lib/event_emitter").EventEmitter;

var Anchor = exports.Anchor = function(doc, row, column) ***REMOVED***
    this.$onChange = this.onChange.bind(this);
    this.attach(doc);
    
    if (typeof column == "undefined")
        this.setPosition(row.row, row.column);
    else
        this.setPosition(row, column);
***REMOVED***;

(function() ***REMOVED***

    oop.implement(this, EventEmitter);
    this.getPosition = function() ***REMOVED***
        return this.$clipPositionToDocument(this.row, this.column);
***REMOVED***;
    this.getDocument = function() ***REMOVED***
        return this.document;
***REMOVED***;
    this.$insertRight = false;
    this.onChange = function(e) ***REMOVED***
        var delta = e.data;
        var range = delta.range;

        if (range.start.row == range.end.row && range.start.row != this.row)
            return;

        if (range.start.row > this.row)
            return;

        if (range.start.row == this.row && range.start.column > this.column)
            return;

        var row = this.row;
        var column = this.column;
        var start = range.start;
        var end = range.end;

        if (delta.action === "insertText") ***REMOVED***
            if (start.row === row && start.column <= column) ***REMOVED***
                if (start.column === column && this.$insertRight) ***REMOVED***
            ***REMOVED*** else if (start.row === end.row) ***REMOVED***
                    column += end.column - start.column;
            ***REMOVED*** else ***REMOVED***
                    column -= start.column;
                    row += end.row - start.row;
            ***REMOVED***
        ***REMOVED*** else if (start.row !== end.row && start.row < row) ***REMOVED***
                row += end.row - start.row;
        ***REMOVED***
    ***REMOVED*** else if (delta.action === "insertLines") ***REMOVED***
            if (start.row === row && column === 0 && this.$insertRight) ***REMOVED***
        ***REMOVED***
            else if (start.row <= row) ***REMOVED***
                row += end.row - start.row;
        ***REMOVED***
    ***REMOVED*** else if (delta.action === "removeText") ***REMOVED***
            if (start.row === row && start.column < column) ***REMOVED***
                if (end.column >= column)
                    column = start.column;
                else
                    column = Math.max(0, column - (end.column - start.column));

        ***REMOVED*** else if (start.row !== end.row && start.row < row) ***REMOVED***
                if (end.row === row)
                    column = Math.max(0, column - end.column) + start.column;
                row -= (end.row - start.row);
        ***REMOVED*** else if (end.row === row) ***REMOVED***
                row -= end.row - start.row;
                column = Math.max(0, column - end.column) + start.column;
        ***REMOVED***
    ***REMOVED*** else if (delta.action == "removeLines") ***REMOVED***
            if (start.row <= row) ***REMOVED***
                if (end.row <= row)
                    row -= end.row - start.row;
                else ***REMOVED***
                    row = start.row;
                    column = 0;
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***

        this.setPosition(row, column, true);
***REMOVED***;
    this.setPosition = function(row, column, noClip) ***REMOVED***
        var pos;
        if (noClip) ***REMOVED***
            pos = ***REMOVED***
                row: row,
                column: column
        ***REMOVED***;
    ***REMOVED*** else ***REMOVED***
            pos = this.$clipPositionToDocument(row, column);
    ***REMOVED***

        if (this.row == pos.row && this.column == pos.column)
            return;

        var old = ***REMOVED***
            row: this.row,
            column: this.column
    ***REMOVED***;

        this.row = pos.row;
        this.column = pos.column;
        this._signal("change", ***REMOVED***
            old: old,
            value: pos
    ***REMOVED***);
***REMOVED***;
    this.detach = function() ***REMOVED***
        this.document.removeEventListener("change", this.$onChange);
***REMOVED***;
    this.attach = function(doc) ***REMOVED***
        this.document = doc || this.document;
        this.document.on("change", this.$onChange);
***REMOVED***;
    this.$clipPositionToDocument = function(row, column) ***REMOVED***
        var pos = ***REMOVED******REMOVED***;

        if (row >= this.document.getLength()) ***REMOVED***
            pos.row = Math.max(0, this.document.getLength() - 1);
            pos.column = this.document.getLine(pos.row).length;
    ***REMOVED***
        else if (row < 0) ***REMOVED***
            pos.row = 0;
            pos.column = 0;
    ***REMOVED***
        else ***REMOVED***
            pos.row = row;
            pos.column = Math.min(this.document.getLine(pos.row).length, Math.max(0, column));
    ***REMOVED***

        if (column < 0)
            pos.column = 0;

        return pos;
***REMOVED***;

***REMOVED***).call(Anchor.prototype);

***REMOVED***);

__ace_shadowed__.define('ace/background_tokenizer', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/lib/event_emitter'], function(require, exports, module) ***REMOVED***


var oop = require("./lib/oop");
var EventEmitter = require("./lib/event_emitter").EventEmitter;

var BackgroundTokenizer = function(tokenizer, editor) ***REMOVED***
    this.running = false;
    this.lines = [];
    this.states = [];
    this.currentLine = 0;
    this.tokenizer = tokenizer;

    var self = this;

    this.$worker = function() ***REMOVED***
        if (!self.running) ***REMOVED*** return; ***REMOVED***

        var workerStart = new Date();
        var currentLine = self.currentLine;
        var endLine = -1;
        var doc = self.doc;

        while (self.lines[currentLine])
            currentLine++;

        var startLine = currentLine;

        var len = doc.getLength();
        var processedLines = 0;
        self.running = false;
        while (currentLine < len) ***REMOVED***
            self.$tokenizeRow(currentLine);
            endLine = currentLine;
            do ***REMOVED***
                currentLine++;
        ***REMOVED*** while (self.lines[currentLine]);
            processedLines ++;
            if ((processedLines % 5 == 0) && (new Date() - workerStart) > 20) ***REMOVED***                
                self.running = setTimeout(self.$worker, 20);
                self.currentLine = currentLine;
                return;
        ***REMOVED***
    ***REMOVED***
        self.currentLine = currentLine;
        
        if (startLine <= endLine)
            self.fireUpdateEvent(startLine, endLine);
***REMOVED***;
***REMOVED***;

(function()***REMOVED***

    oop.implement(this, EventEmitter);
    this.setTokenizer = function(tokenizer) ***REMOVED***
        this.tokenizer = tokenizer;
        this.lines = [];
        this.states = [];

        this.start(0);
***REMOVED***;
    this.setDocument = function(doc) ***REMOVED***
        this.doc = doc;
        this.lines = [];
        this.states = [];

        this.stop();
***REMOVED***;
    this.fireUpdateEvent = function(firstRow, lastRow) ***REMOVED***
        var data = ***REMOVED***
            first: firstRow,
            last: lastRow
    ***REMOVED***;
        this._signal("update", ***REMOVED***data: data***REMOVED***);
***REMOVED***;
    this.start = function(startRow) ***REMOVED***
        this.currentLine = Math.min(startRow || 0, this.currentLine, this.doc.getLength());
        this.lines.splice(this.currentLine, this.lines.length);
        this.states.splice(this.currentLine, this.states.length);

        this.stop();
        this.running = setTimeout(this.$worker, 700);
***REMOVED***;
    
    this.scheduleStart = function() ***REMOVED***
        if (!this.running)
            this.running = setTimeout(this.$worker, 700);
***REMOVED***

    this.$updateOnChange = function(delta) ***REMOVED***
        var range = delta.range;
        var startRow = range.start.row;
        var len = range.end.row - startRow;

        if (len === 0) ***REMOVED***
            this.lines[startRow] = null;
    ***REMOVED*** else if (delta.action == "removeText" || delta.action == "removeLines") ***REMOVED***
            this.lines.splice(startRow, len + 1, null);
            this.states.splice(startRow, len + 1, null);
    ***REMOVED*** else ***REMOVED***
            var args = Array(len + 1);
            args.unshift(startRow, 1);
            this.lines.splice.apply(this.lines, args);
            this.states.splice.apply(this.states, args);
    ***REMOVED***

        this.currentLine = Math.min(startRow, this.currentLine, this.doc.getLength());

        this.stop();
***REMOVED***;
    this.stop = function() ***REMOVED***
        if (this.running)
            clearTimeout(this.running);
        this.running = false;
***REMOVED***;
    this.getTokens = function(row) ***REMOVED***
        return this.lines[row] || this.$tokenizeRow(row);
***REMOVED***;
    this.getState = function(row) ***REMOVED***
        if (this.currentLine == row)
            this.$tokenizeRow(row);
        return this.states[row] || "start";
***REMOVED***;

    this.$tokenizeRow = function(row) ***REMOVED***
        var line = this.doc.getLine(row);
        var state = this.states[row - 1];

        var data = this.tokenizer.getLineTokens(line, state, row);

        if (this.states[row] + "" !== data.state + "") ***REMOVED***
            this.states[row] = data.state;
            this.lines[row + 1] = null;
            if (this.currentLine > row + 1)
                this.currentLine = row + 1;
    ***REMOVED*** else if (this.currentLine == row) ***REMOVED***
            this.currentLine = row + 1;
    ***REMOVED***

        return this.lines[row] = data.tokens;
***REMOVED***;

***REMOVED***).call(BackgroundTokenizer.prototype);

exports.BackgroundTokenizer = BackgroundTokenizer;
***REMOVED***);

__ace_shadowed__.define('ace/search_highlight', ['require', 'exports', 'module' , 'ace/lib/lang', 'ace/lib/oop', 'ace/range'], function(require, exports, module) ***REMOVED***


var lang = require("./lib/lang");
var oop = require("./lib/oop");
var Range = require("./range").Range;

var SearchHighlight = function(regExp, clazz, type) ***REMOVED***
    this.setRegexp(regExp);
    this.clazz = clazz;
    this.type = type || "text";
***REMOVED***;

(function() ***REMOVED***
    this.MAX_RANGES = 500;
    
    this.setRegexp = function(regExp) ***REMOVED***
        if (this.regExp+"" == regExp+"")
            return;
        this.regExp = regExp;
        this.cache = [];
***REMOVED***;

    this.update = function(html, markerLayer, session, config) ***REMOVED***
        if (!this.regExp)
            return;
        var start = config.firstRow, end = config.lastRow;

        for (var i = start; i <= end; i++) ***REMOVED***
            var ranges = this.cache[i];
            if (ranges == null) ***REMOVED***
                ranges = lang.getMatchOffsets(session.getLine(i), this.regExp);
                if (ranges.length > this.MAX_RANGES)
                    ranges = ranges.slice(0, this.MAX_RANGES);
                ranges = ranges.map(function(match) ***REMOVED***
                    return new Range(i, match.offset, i, match.offset + match.length);
            ***REMOVED***);
                this.cache[i] = ranges.length ? ranges : "";
        ***REMOVED***

            for (var j = ranges.length; j --; ) ***REMOVED***
                markerLayer.drawSingleLineMarker(
                    html, ranges[j].toScreenRange(session), this.clazz, config);
        ***REMOVED***
    ***REMOVED***
***REMOVED***;

***REMOVED***).call(SearchHighlight.prototype);

exports.SearchHighlight = SearchHighlight;
***REMOVED***);

__ace_shadowed__.define('ace/edit_session/folding', ['require', 'exports', 'module' , 'ace/range', 'ace/edit_session/fold_line', 'ace/edit_session/fold', 'ace/token_iterator'], function(require, exports, module) ***REMOVED***


var Range = require("../range").Range;
var FoldLine = require("./fold_line").FoldLine;
var Fold = require("./fold").Fold;
var TokenIterator = require("../token_iterator").TokenIterator;

function Folding() ***REMOVED***
    this.getFoldAt = function(row, column, side) ***REMOVED***
        var foldLine = this.getFoldLine(row);
        if (!foldLine)
            return null;

        var folds = foldLine.folds;
        for (var i = 0; i < folds.length; i++) ***REMOVED***
            var fold = folds[i];
            if (fold.range.contains(row, column)) ***REMOVED***
                if (side == 1 && fold.range.isEnd(row, column)) ***REMOVED***
                    continue;
            ***REMOVED*** else if (side == -1 && fold.range.isStart(row, column)) ***REMOVED***
                    continue;
            ***REMOVED***
                return fold;
        ***REMOVED***
    ***REMOVED***
***REMOVED***;
    this.getFoldsInRange = function(range) ***REMOVED***
        var start = range.start;
        var end = range.end;
        var foldLines = this.$foldData;
        var foundFolds = [];

        start.column += 1;
        end.column -= 1;

        for (var i = 0; i < foldLines.length; i++) ***REMOVED***
            var cmp = foldLines[i].range.compareRange(range);
            if (cmp == 2) ***REMOVED***
                continue;
        ***REMOVED***
            else if (cmp == -2) ***REMOVED***
                break;
        ***REMOVED***

            var folds = foldLines[i].folds;
            for (var j = 0; j < folds.length; j++) ***REMOVED***
                var fold = folds[j];
                cmp = fold.range.compareRange(range);
                if (cmp == -2) ***REMOVED***
                    break;
            ***REMOVED*** else if (cmp == 2) ***REMOVED***
                    continue;
            ***REMOVED*** else
                if (cmp == 42) ***REMOVED***
                    break;
            ***REMOVED***
                foundFolds.push(fold);
        ***REMOVED***
    ***REMOVED***
        start.column -= 1;
        end.column += 1;

        return foundFolds;
***REMOVED***;

    this.getFoldsInRangeList = function(ranges) ***REMOVED***
        if (Array.isArray(ranges)) ***REMOVED***
            var folds = [];
            ranges.forEach(function(range) ***REMOVED***
                folds = folds.concat(this.getFoldsInRange(range));
        ***REMOVED*** this);
    ***REMOVED*** else ***REMOVED***
            var folds = this.getFoldsInRange(ranges);
    ***REMOVED***
        return folds;
***REMOVED***
    this.getAllFolds = function() ***REMOVED***
        var folds = [];
        var foldLines = this.$foldData;
        
        for (var i = 0; i < foldLines.length; i++)
            for (var j = 0; j < foldLines[i].folds.length; j++)
                folds.push(foldLines[i].folds[j]);

        return folds;
***REMOVED***;
    this.getFoldStringAt = function(row, column, trim, foldLine) ***REMOVED***
        foldLine = foldLine || this.getFoldLine(row);
        if (!foldLine)
            return null;

        var lastFold = ***REMOVED***
            end: ***REMOVED*** column: 0 ***REMOVED***
    ***REMOVED***;
        var str, fold;
        for (var i = 0; i < foldLine.folds.length; i++) ***REMOVED***
            fold = foldLine.folds[i];
            var cmp = fold.range.compareEnd(row, column);
            if (cmp == -1) ***REMOVED***
                str = this
                    .getLine(fold.start.row)
                    .substring(lastFold.end.column, fold.start.column);
                break;
        ***REMOVED***
            else if (cmp === 0) ***REMOVED***
                return null;
        ***REMOVED***
            lastFold = fold;
    ***REMOVED***
        if (!str)
            str = this.getLine(fold.start.row).substring(lastFold.end.column);

        if (trim == -1)
            return str.substring(0, column - lastFold.end.column);
        else if (trim == 1)
            return str.substring(column - lastFold.end.column);
        else
            return str;
***REMOVED***;

    this.getFoldLine = function(docRow, startFoldLine) ***REMOVED***
        var foldData = this.$foldData;
        var i = 0;
        if (startFoldLine)
            i = foldData.indexOf(startFoldLine);
        if (i == -1)
            i = 0;
        for (i; i < foldData.length; i++) ***REMOVED***
            var foldLine = foldData[i];
            if (foldLine.start.row <= docRow && foldLine.end.row >= docRow) ***REMOVED***
                return foldLine;
        ***REMOVED*** else if (foldLine.end.row > docRow) ***REMOVED***
                return null;
        ***REMOVED***
    ***REMOVED***
        return null;
***REMOVED***;
    this.getNextFoldLine = function(docRow, startFoldLine) ***REMOVED***
        var foldData = this.$foldData;
        var i = 0;
        if (startFoldLine)
            i = foldData.indexOf(startFoldLine);
        if (i == -1)
            i = 0;
        for (i; i < foldData.length; i++) ***REMOVED***
            var foldLine = foldData[i];
            if (foldLine.end.row >= docRow) ***REMOVED***
                return foldLine;
        ***REMOVED***
    ***REMOVED***
        return null;
***REMOVED***;

    this.getFoldedRowCount = function(first, last) ***REMOVED***
        var foldData = this.$foldData, rowCount = last-first+1;
        for (var i = 0; i < foldData.length; i++) ***REMOVED***
            var foldLine = foldData[i],
                end = foldLine.end.row,
                start = foldLine.start.row;
            if (end >= last) ***REMOVED***
                if(start < last) ***REMOVED***
                    if(start >= first)
                        rowCount -= last-start;
                    else
                        rowCount = 0;//in one fold
            ***REMOVED***
                break;
        ***REMOVED*** else if(end >= first)***REMOVED***
                if (start >= first) //fold inside range
                    rowCount -=  end-start;
                else
                    rowCount -=  end-first+1;
        ***REMOVED***
    ***REMOVED***
        return rowCount;
***REMOVED***;

    this.$addFoldLine = function(foldLine) ***REMOVED***
        this.$foldData.push(foldLine);
        this.$foldData.sort(function(a, b) ***REMOVED***
            return a.start.row - b.start.row;
    ***REMOVED***);
        return foldLine;
***REMOVED***;
    this.addFold = function(placeholder, range) ***REMOVED***
        var foldData = this.$foldData;
        var added = false;
        var fold;
        
        if (placeholder instanceof Fold)
            fold = placeholder;
        else ***REMOVED***
            fold = new Fold(range, placeholder);
            fold.collapseChildren = range.collapseChildren;
    ***REMOVED***
        this.$clipRangeToDocument(fold.range);

        var startRow = fold.start.row;
        var startColumn = fold.start.column;
        var endRow = fold.end.row;
        var endColumn = fold.end.column;
        if (!(startRow < endRow || 
            startRow == endRow && startColumn <= endColumn - 2))
            throw new Error("The range has to be at least 2 characters width");

        var startFold = this.getFoldAt(startRow, startColumn, 1);
        var endFold = this.getFoldAt(endRow, endColumn, -1);
        if (startFold && endFold == startFold)
            return startFold.addSubFold(fold);

        if (
            (startFold && !startFold.range.isStart(startRow, startColumn))
            || (endFold && !endFold.range.isEnd(endRow, endColumn))
        ) ***REMOVED***
            throw new Error("A fold can't intersect already existing fold" + fold.range + startFold.range);
    ***REMOVED***
        var folds = this.getFoldsInRange(fold.range);
        if (folds.length > 0) ***REMOVED***
            this.removeFolds(folds);
            folds.forEach(function(subFold) ***REMOVED***
                fold.addSubFold(subFold);
        ***REMOVED***);
    ***REMOVED***

        for (var i = 0; i < foldData.length; i++) ***REMOVED***
            var foldLine = foldData[i];
            if (endRow == foldLine.start.row) ***REMOVED***
                foldLine.addFold(fold);
                added = true;
                break;
        ***REMOVED*** else if (startRow == foldLine.end.row) ***REMOVED***
                foldLine.addFold(fold);
                added = true;
                if (!fold.sameRow) ***REMOVED***
                    var foldLineNext = foldData[i + 1];
                    if (foldLineNext && foldLineNext.start.row == endRow) ***REMOVED***
                        foldLine.merge(foldLineNext);
                        break;
                ***REMOVED***
            ***REMOVED***
                break;
        ***REMOVED*** else if (endRow <= foldLine.start.row) ***REMOVED***
                break;
        ***REMOVED***
    ***REMOVED***

        if (!added)
            foldLine = this.$addFoldLine(new FoldLine(this.$foldData, fold));

        if (this.$useWrapMode)
            this.$updateWrapData(foldLine.start.row, foldLine.start.row);
        else
            this.$updateRowLengthCache(foldLine.start.row, foldLine.start.row);
        this.$modified = true;
        this._emit("changeFold", ***REMOVED*** data: fold, action: "add" ***REMOVED***);

        return fold;
***REMOVED***;

    this.addFolds = function(folds) ***REMOVED***
        folds.forEach(function(fold) ***REMOVED***
            this.addFold(fold);
    ***REMOVED*** this);
***REMOVED***;

    this.removeFold = function(fold) ***REMOVED***
        var foldLine = fold.foldLine;
        var startRow = foldLine.start.row;
        var endRow = foldLine.end.row;

        var foldLines = this.$foldData;
        var folds = foldLine.folds;
        if (folds.length == 1) ***REMOVED***
            foldLines.splice(foldLines.indexOf(foldLine), 1);
    ***REMOVED*** else
        if (foldLine.range.isEnd(fold.end.row, fold.end.column)) ***REMOVED***
            folds.pop();
            foldLine.end.row = folds[folds.length - 1].end.row;
            foldLine.end.column = folds[folds.length - 1].end.column;
    ***REMOVED*** else
        if (foldLine.range.isStart(fold.start.row, fold.start.column)) ***REMOVED***
            folds.shift();
            foldLine.start.row = folds[0].start.row;
            foldLine.start.column = folds[0].start.column;
    ***REMOVED*** else
        if (fold.sameRow) ***REMOVED***
            folds.splice(folds.indexOf(fold), 1);
    ***REMOVED*** else
        ***REMOVED***
            var newFoldLine = foldLine.split(fold.start.row, fold.start.column);
            folds = newFoldLine.folds;
            folds.shift();
            newFoldLine.start.row = folds[0].start.row;
            newFoldLine.start.column = folds[0].start.column;
    ***REMOVED***

        if (!this.$updating) ***REMOVED***
            if (this.$useWrapMode)
                this.$updateWrapData(startRow, endRow);
            else
                this.$updateRowLengthCache(startRow, endRow);
    ***REMOVED***
        this.$modified = true;
        this._emit("changeFold", ***REMOVED*** data: fold, action: "remove" ***REMOVED***);
***REMOVED***;

    this.removeFolds = function(folds) ***REMOVED***
        var cloneFolds = [];
        for (var i = 0; i < folds.length; i++) ***REMOVED***
            cloneFolds.push(folds[i]);
    ***REMOVED***

        cloneFolds.forEach(function(fold) ***REMOVED***
            this.removeFold(fold);
    ***REMOVED*** this);
        this.$modified = true;
***REMOVED***;

    this.expandFold = function(fold) ***REMOVED***
        this.removeFold(fold);
        fold.subFolds.forEach(function(subFold) ***REMOVED***
            fold.restoreRange(subFold);
            this.addFold(subFold);
    ***REMOVED*** this);
        if (fold.collapseChildren > 0) ***REMOVED***
            this.foldAll(fold.start.row+1, fold.end.row, fold.collapseChildren-1);
    ***REMOVED***
        fold.subFolds = [];
***REMOVED***;

    this.expandFolds = function(folds) ***REMOVED***
        folds.forEach(function(fold) ***REMOVED***
            this.expandFold(fold);
    ***REMOVED*** this);
***REMOVED***;

    this.unfold = function(location, expandInner) ***REMOVED***
        var range, folds;
        if (location == null) ***REMOVED***
            range = new Range(0, 0, this.getLength(), 0);
            expandInner = true;
    ***REMOVED*** else if (typeof location == "number")
            range = new Range(location, 0, location, this.getLine(location).length);
        else if ("row" in location)
            range = Range.fromPoints(location, location);
        else
            range = location;
        
        folds = this.getFoldsInRangeList(range);
        if (expandInner) ***REMOVED***
            this.removeFolds(folds);
    ***REMOVED*** else ***REMOVED***
            var subFolds = folds;
            while (subFolds.length) ***REMOVED***
                this.expandFolds(subFolds);
                subFolds = this.getFoldsInRangeList(range);
        ***REMOVED***
    ***REMOVED***
        if (folds.length)
            return folds;
***REMOVED***;
    this.isRowFolded = function(docRow, startFoldRow) ***REMOVED***
        return !!this.getFoldLine(docRow, startFoldRow);
***REMOVED***;

    this.getRowFoldEnd = function(docRow, startFoldRow) ***REMOVED***
        var foldLine = this.getFoldLine(docRow, startFoldRow);
        return foldLine ? foldLine.end.row : docRow;
***REMOVED***;

    this.getRowFoldStart = function(docRow, startFoldRow) ***REMOVED***
        var foldLine = this.getFoldLine(docRow, startFoldRow);
        return foldLine ? foldLine.start.row : docRow;
***REMOVED***;

    this.getFoldDisplayLine = function(foldLine, endRow, endColumn, startRow, startColumn) ***REMOVED***
        if (startRow == null) ***REMOVED***
            startRow = foldLine.start.row;
            startColumn = 0;
    ***REMOVED***

        if (endRow == null) ***REMOVED***
            endRow = foldLine.end.row;
            endColumn = this.getLine(endRow).length;
    ***REMOVED***
        var doc = this.doc;
        var textLine = "";

        foldLine.walk(function(placeholder, row, column, lastColumn) ***REMOVED***
            if (row < startRow)
                return;
            if (row == startRow) ***REMOVED***
                if (column < startColumn)
                    return;
                lastColumn = Math.max(startColumn, lastColumn);
        ***REMOVED***

            if (placeholder != null) ***REMOVED***
                textLine += placeholder;
        ***REMOVED*** else ***REMOVED***
                textLine += doc.getLine(row).substring(lastColumn, column);
        ***REMOVED***
    ***REMOVED*** endRow, endColumn);
        return textLine;
***REMOVED***;

    this.getDisplayLine = function(row, endColumn, startRow, startColumn) ***REMOVED***
        var foldLine = this.getFoldLine(row);

        if (!foldLine) ***REMOVED***
            var line;
            line = this.doc.getLine(row);
            return line.substring(startColumn || 0, endColumn || line.length);
    ***REMOVED*** else ***REMOVED***
            return this.getFoldDisplayLine(
                foldLine, row, endColumn, startRow, startColumn);
    ***REMOVED***
***REMOVED***;

    this.$cloneFoldData = function() ***REMOVED***
        var fd = [];
        fd = this.$foldData.map(function(foldLine) ***REMOVED***
            var folds = foldLine.folds.map(function(fold) ***REMOVED***
                return fold.clone();
        ***REMOVED***);
            return new FoldLine(fd, folds);
    ***REMOVED***);

        return fd;
***REMOVED***;

    this.toggleFold = function(tryToUnfold) ***REMOVED***
        var selection = this.selection;
        var range = selection.getRange();
        var fold;
        var bracketPos;

        if (range.isEmpty()) ***REMOVED***
            var cursor = range.start;
            fold = this.getFoldAt(cursor.row, cursor.column);

            if (fold) ***REMOVED***
                this.expandFold(fold);
                return;
        ***REMOVED*** else if (bracketPos = this.findMatchingBracket(cursor)) ***REMOVED***
                if (range.comparePoint(bracketPos) == 1) ***REMOVED***
                    range.end = bracketPos;
            ***REMOVED*** else ***REMOVED***
                    range.start = bracketPos;
                    range.start.column++;
                    range.end.column--;
            ***REMOVED***
        ***REMOVED*** else if (bracketPos = this.findMatchingBracket(***REMOVED***row: cursor.row, column: cursor.column + 1***REMOVED***)) ***REMOVED***
                if (range.comparePoint(bracketPos) == 1)
                    range.end = bracketPos;
                else
                    range.start = bracketPos;

                range.start.column++;
        ***REMOVED*** else ***REMOVED***
                range = this.getCommentFoldRange(cursor.row, cursor.column) || range;
        ***REMOVED***
    ***REMOVED*** else ***REMOVED***
            var folds = this.getFoldsInRange(range);
            if (tryToUnfold && folds.length) ***REMOVED***
                this.expandFolds(folds);
                return;
        ***REMOVED*** else if (folds.length == 1 ) ***REMOVED***
                fold = folds[0];
        ***REMOVED***
    ***REMOVED***

        if (!fold)
            fold = this.getFoldAt(range.start.row, range.start.column);

        if (fold && fold.range.toString() == range.toString()) ***REMOVED***
            this.expandFold(fold);
            return;
    ***REMOVED***

        var placeholder = "...";
        if (!range.isMultiLine()) ***REMOVED***
            placeholder = this.getTextRange(range);
            if(placeholder.length < 4)
                return;
            placeholder = placeholder.trim().substring(0, 2) + "..";
    ***REMOVED***

        this.addFold(placeholder, range);
***REMOVED***;

    this.getCommentFoldRange = function(row, column, dir) ***REMOVED***
        var iterator = new TokenIterator(this, row, column);
        var token = iterator.getCurrentToken();
        if (token && /^comment|string/.test(token.type)) ***REMOVED***
            var range = new Range();
            var re = new RegExp(token.type.replace(/\..*/, "\\."));
            if (dir != 1) ***REMOVED***
                do ***REMOVED***
                    token = iterator.stepBackward();
            ***REMOVED*** while(token && re.test(token.type));
                iterator.stepForward();
        ***REMOVED***
            
            range.start.row = iterator.getCurrentTokenRow();
            range.start.column = iterator.getCurrentTokenColumn() + 2;

            iterator = new TokenIterator(this, row, column);
            
            if (dir != -1) ***REMOVED***
                do ***REMOVED***
                    token = iterator.stepForward();
            ***REMOVED*** while(token && re.test(token.type));
                token = iterator.stepBackward();
        ***REMOVED*** else
                token = iterator.getCurrentToken();

            range.end.row = iterator.getCurrentTokenRow();
            range.end.column = iterator.getCurrentTokenColumn() + token.value.length - 2;
            return range;
    ***REMOVED***
***REMOVED***;

    this.foldAll = function(startRow, endRow, depth) ***REMOVED***
        if (depth == undefined)
            depth = 100000; // JSON.stringify doesn't hanle Infinity
        var foldWidgets = this.foldWidgets;
        if (!foldWidgets)
            return; // mode doesn't support folding
        endRow = endRow || this.getLength();
        startRow = startRow || 0;
        for (var row = startRow; row < endRow; row++) ***REMOVED***
            if (foldWidgets[row] == null)
                foldWidgets[row] = this.getFoldWidget(row);
            if (foldWidgets[row] != "start")
                continue;

            var range = this.getFoldWidgetRange(row);
            if (range && range.isMultiLine()
                && range.end.row <= endRow
                && range.start.row >= startRow
            ) ***REMOVED***
                row = range.end.row;
                try ***REMOVED***
                    var fold = this.addFold("...", range);
                    if (fold)
                        fold.collapseChildren = depth;
            ***REMOVED*** catch(e) ***REMOVED******REMOVED***
        ***REMOVED***
    ***REMOVED***
***REMOVED***;
    this.$foldStyles = ***REMOVED***
        "manual": 1,
        "markbegin": 1,
        "markbeginend": 1
***REMOVED***;
    this.$foldStyle = "markbegin";
    this.setFoldStyle = function(style) ***REMOVED***
        if (!this.$foldStyles[style])
            throw new Error("invalid fold style: " + style + "[" + Object.keys(this.$foldStyles).join(", ") + "]");
        
        if (this.$foldStyle == style)
            return;

        this.$foldStyle = style;
        
        if (style == "manual")
            this.unfold();
        var mode = this.$foldMode;
        this.$setFolding(null);
        this.$setFolding(mode);
***REMOVED***;

    this.$setFolding = function(foldMode) ***REMOVED***
        if (this.$foldMode == foldMode)
            return;
            
        this.$foldMode = foldMode;
        
        this.removeListener('change', this.$updateFoldWidgets);
        this._emit("changeAnnotation");
        
        if (!foldMode || this.$foldStyle == "manual") ***REMOVED***
            this.foldWidgets = null;
            return;
    ***REMOVED***
        
        this.foldWidgets = [];
        this.getFoldWidget = foldMode.getFoldWidget.bind(foldMode, this, this.$foldStyle);
        this.getFoldWidgetRange = foldMode.getFoldWidgetRange.bind(foldMode, this, this.$foldStyle);
        
        this.$updateFoldWidgets = this.updateFoldWidgets.bind(this);
        this.on('change', this.$updateFoldWidgets);
        
***REMOVED***;

    this.getParentFoldRangeData = function (row, ignoreCurrent) ***REMOVED***
        var fw = this.foldWidgets;
        if (!fw || (ignoreCurrent && fw[row]))
            return ***REMOVED******REMOVED***;

        var i = row - 1, firstRange;
        while (i >= 0) ***REMOVED***
            var c = fw[i];
            if (c == null)
                c = fw[i] = this.getFoldWidget(i);

            if (c == "start") ***REMOVED***
                var range = this.getFoldWidgetRange(i);
                if (!firstRange)
                    firstRange = range;
                if (range && range.end.row >= row)
                    break;
        ***REMOVED***
            i--;
    ***REMOVED***

        return ***REMOVED***
            range: i !== -1 && range,
            firstRange: firstRange
    ***REMOVED***;
***REMOVED***

    this.onFoldWidgetClick = function(row, e) ***REMOVED***
        e = e.domEvent;
        var options = ***REMOVED***
            children: e.shiftKey,
            all: e.ctrlKey || e.metaKey,
            siblings: e.altKey
    ***REMOVED***;
        
        var range = this.$toggleFoldWidget(row, options);
        if (!range) ***REMOVED***
            var el = (e.target || e.srcElement)
            if (el && /ace_fold-widget/.test(el.className))
                el.className += " ace_invalid";
    ***REMOVED***
***REMOVED***;
    
    this.$toggleFoldWidget = function(row, options) ***REMOVED***
        if (!this.getFoldWidget)
            return;
        var type = this.getFoldWidget(row);
        var line = this.getLine(row);

        var dir = type === "end" ? -1 : 1;
        var fold = this.getFoldAt(row, dir === -1 ? 0 : line.length, dir);

        if (fold) ***REMOVED***
            if (options.children || options.all)
                this.removeFold(fold);
            else
                this.expandFold(fold);
            return;
    ***REMOVED***

        var range = this.getFoldWidgetRange(row, true);
        if (range && !range.isMultiLine()) ***REMOVED***
            fold = this.getFoldAt(range.start.row, range.start.column, 1);
            if (fold && range.isEqual(fold.range)) ***REMOVED***
                this.removeFold(fold);
                return;
        ***REMOVED***
    ***REMOVED***
        
        if (options.siblings) ***REMOVED***
            var data = this.getParentFoldRangeData(row);
            if (data.range) ***REMOVED***
                var startRow = data.range.start.row + 1;
                var endRow = data.range.end.row;
        ***REMOVED***
            this.foldAll(startRow, endRow, options.all ? 10000 : 0);
    ***REMOVED*** else if (options.children) ***REMOVED***
            endRow = range ? range.end.row : this.getLength();
            this.foldAll(row + 1, range.end.row, options.all ? 10000 : 0);
    ***REMOVED*** else if (range) ***REMOVED***
            if (options.all) 
                range.collapseChildren = 10000;
            this.addFold("...", range);
    ***REMOVED***
        
        return range;
***REMOVED***;
    
    
    
    this.toggleFoldWidget = function(toggleParent) ***REMOVED***
        var row = this.selection.getCursor().row;
        row = this.getRowFoldStart(row);
        var range = this.$toggleFoldWidget(row, ***REMOVED******REMOVED***);
        
        if (range)
            return;
        var data = this.getParentFoldRangeData(row, true);
        range = data.range || data.firstRange;
        
        if (range) ***REMOVED***
            row = range.start.row;
            var fold = this.getFoldAt(row, this.getLine(row).length, 1);

            if (fold) ***REMOVED***
                this.removeFold(fold);
        ***REMOVED*** else ***REMOVED***
                this.addFold("...", range);
        ***REMOVED***
    ***REMOVED***
***REMOVED***;

    this.updateFoldWidgets = function(e) ***REMOVED***
        var delta = e.data;
        var range = delta.range;
        var firstRow = range.start.row;
        var len = range.end.row - firstRow;

        if (len === 0) ***REMOVED***
            this.foldWidgets[firstRow] = null;
    ***REMOVED*** else if (delta.action == "removeText" || delta.action == "removeLines") ***REMOVED***
            this.foldWidgets.splice(firstRow, len + 1, null);
    ***REMOVED*** else ***REMOVED***
            var args = Array(len + 1);
            args.unshift(firstRow, 1);
            this.foldWidgets.splice.apply(this.foldWidgets, args);
    ***REMOVED***
***REMOVED***;

***REMOVED***

exports.Folding = Folding;

***REMOVED***);

__ace_shadowed__.define('ace/edit_session/fold_line', ['require', 'exports', 'module' , 'ace/range'], function(require, exports, module) ***REMOVED***


var Range = require("../range").Range;
function FoldLine(foldData, folds) ***REMOVED***
    this.foldData = foldData;
    if (Array.isArray(folds)) ***REMOVED***
        this.folds = folds;
***REMOVED*** else ***REMOVED***
        folds = this.folds = [ folds ];
***REMOVED***

    var last = folds[folds.length - 1]
    this.range = new Range(folds[0].start.row, folds[0].start.column,
                           last.end.row, last.end.column);
    this.start = this.range.start;
    this.end   = this.range.end;

    this.folds.forEach(function(fold) ***REMOVED***
        fold.setFoldLine(this);
***REMOVED*** this);
***REMOVED***

(function() ***REMOVED***
    this.shiftRow = function(shift) ***REMOVED***
        this.start.row += shift;
        this.end.row += shift;
        this.folds.forEach(function(fold) ***REMOVED***
            fold.start.row += shift;
            fold.end.row += shift;
    ***REMOVED***);
***REMOVED***

    this.addFold = function(fold) ***REMOVED***
        if (fold.sameRow) ***REMOVED***
            if (fold.start.row < this.startRow || fold.endRow > this.endRow) ***REMOVED***
                throw new Error("Can't add a fold to this FoldLine as it has no connection");
        ***REMOVED***
            this.folds.push(fold);
            this.folds.sort(function(a, b) ***REMOVED***
                return -a.range.compareEnd(b.start.row, b.start.column);
        ***REMOVED***);
            if (this.range.compareEnd(fold.start.row, fold.start.column) > 0) ***REMOVED***
                this.end.row = fold.end.row;
                this.end.column =  fold.end.column;
        ***REMOVED*** else if (this.range.compareStart(fold.end.row, fold.end.column) < 0) ***REMOVED***
                this.start.row = fold.start.row;
                this.start.column = fold.start.column;
        ***REMOVED***
    ***REMOVED*** else if (fold.start.row == this.end.row) ***REMOVED***
            this.folds.push(fold);
            this.end.row = fold.end.row;
            this.end.column = fold.end.column;
    ***REMOVED*** else if (fold.end.row == this.start.row) ***REMOVED***
            this.folds.unshift(fold);
            this.start.row = fold.start.row;
            this.start.column = fold.start.column;
    ***REMOVED*** else ***REMOVED***
            throw new Error("Trying to add fold to FoldRow that doesn't have a matching row");
    ***REMOVED***
        fold.foldLine = this;
***REMOVED***

    this.containsRow = function(row) ***REMOVED***
        return row >= this.start.row && row <= this.end.row;
***REMOVED***

    this.walk = function(callback, endRow, endColumn) ***REMOVED***
        var lastEnd = 0,
            folds = this.folds,
            fold,
            comp, stop, isNewRow = true;

        if (endRow == null) ***REMOVED***
            endRow = this.end.row;
            endColumn = this.end.column;
    ***REMOVED***

        for (var i = 0; i < folds.length; i++) ***REMOVED***
            fold = folds[i];

            comp = fold.range.compareStart(endRow, endColumn);
            if (comp == -1) ***REMOVED***
                callback(null, endRow, endColumn, lastEnd, isNewRow);
                return;
        ***REMOVED***

            stop = callback(null, fold.start.row, fold.start.column, lastEnd, isNewRow);
            stop = !stop && callback(fold.placeholder, fold.start.row, fold.start.column, lastEnd);
            if (stop || comp == 0) ***REMOVED***
                return;
        ***REMOVED***
            isNewRow = !fold.sameRow;
            lastEnd = fold.end.column;
    ***REMOVED***
        callback(null, endRow, endColumn, lastEnd, isNewRow);
***REMOVED***

    this.getNextFoldTo = function(row, column) ***REMOVED***
        var fold, cmp;
        for (var i = 0; i < this.folds.length; i++) ***REMOVED***
            fold = this.folds[i];
            cmp = fold.range.compareEnd(row, column);
            if (cmp == -1) ***REMOVED***
                return ***REMOVED***
                    fold: fold,
                    kind: "after"
            ***REMOVED***;
        ***REMOVED*** else if (cmp == 0) ***REMOVED***
                return ***REMOVED***
                    fold: fold,
                    kind: "inside"
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***
        return null;
***REMOVED***

    this.addRemoveChars = function(row, column, len) ***REMOVED***
        var ret = this.getNextFoldTo(row, column),
            fold, folds;
        if (ret) ***REMOVED***
            fold = ret.fold;
            if (ret.kind == "inside"
                && fold.start.column != column
                && fold.start.row != row)
            ***REMOVED***
                window.console && window.console.log(row, column, fold);
        ***REMOVED*** else if (fold.start.row == row) ***REMOVED***
                folds = this.folds;
                var i = folds.indexOf(fold);
                if (i == 0) ***REMOVED***
                    this.start.column += len;
            ***REMOVED***
                for (i; i < folds.length; i++) ***REMOVED***
                    fold = folds[i];
                    fold.start.column += len;
                    if (!fold.sameRow) ***REMOVED***
                        return;
                ***REMOVED***
                    fold.end.column += len;
            ***REMOVED***
                this.end.column += len;
        ***REMOVED***
    ***REMOVED***
***REMOVED***

    this.split = function(row, column) ***REMOVED***
        var fold = this.getNextFoldTo(row, column).fold;
        var folds = this.folds;
        var foldData = this.foldData;

        if (!fold)
            return null;

        var i = folds.indexOf(fold);
        var foldBefore = folds[i - 1];
        this.end.row = foldBefore.end.row;
        this.end.column = foldBefore.end.column;
        folds = folds.splice(i, folds.length - i);

        var newFoldLine = new FoldLine(foldData, folds);
        foldData.splice(foldData.indexOf(this) + 1, 0, newFoldLine);
        return newFoldLine;
***REMOVED***

    this.merge = function(foldLineNext) ***REMOVED***
        var folds = foldLineNext.folds;
        for (var i = 0; i < folds.length; i++) ***REMOVED***
            this.addFold(folds[i]);
    ***REMOVED***
        var foldData = this.foldData;
        foldData.splice(foldData.indexOf(foldLineNext), 1);
***REMOVED***

    this.toString = function() ***REMOVED***
        var ret = [this.range.toString() + ": [" ];

        this.folds.forEach(function(fold) ***REMOVED***
            ret.push("  " + fold.toString());
    ***REMOVED***);
        ret.push("]")
        return ret.join("\n");
***REMOVED***

    this.idxToPosition = function(idx) ***REMOVED***
        var lastFoldEndColumn = 0;
        var fold;

        for (var i = 0; i < this.folds.length; i++) ***REMOVED***
            var fold = this.folds[i];

            idx -= fold.start.column - lastFoldEndColumn;
            if (idx < 0) ***REMOVED***
                return ***REMOVED***
                    row: fold.start.row,
                    column: fold.start.column + idx
            ***REMOVED***;
        ***REMOVED***

            idx -= fold.placeholder.length;
            if (idx < 0) ***REMOVED***
                return fold.start;
        ***REMOVED***

            lastFoldEndColumn = fold.end.column;
    ***REMOVED***

        return ***REMOVED***
            row: this.end.row,
            column: this.end.column + idx
    ***REMOVED***;
***REMOVED***
***REMOVED***).call(FoldLine.prototype);

exports.FoldLine = FoldLine;
***REMOVED***);

__ace_shadowed__.define('ace/edit_session/fold', ['require', 'exports', 'module' , 'ace/range', 'ace/range_list', 'ace/lib/oop'], function(require, exports, module) ***REMOVED***


var Range = require("../range").Range;
var RangeList = require("../range_list").RangeList;
var oop = require("../lib/oop")
var Fold = exports.Fold = function(range, placeholder) ***REMOVED***
    this.foldLine = null;
    this.placeholder = placeholder;
    this.range = range;
    this.start = range.start;
    this.end = range.end;

    this.sameRow = range.start.row == range.end.row;
    this.subFolds = this.ranges = [];
***REMOVED***;

oop.inherits(Fold, RangeList);

(function() ***REMOVED***

    this.toString = function() ***REMOVED***
        return '"' + this.placeholder + '" ' + this.range.toString();
***REMOVED***;

    this.setFoldLine = function(foldLine) ***REMOVED***
        this.foldLine = foldLine;
        this.subFolds.forEach(function(fold) ***REMOVED***
            fold.setFoldLine(foldLine);
    ***REMOVED***);
***REMOVED***;

    this.clone = function() ***REMOVED***
        var range = this.range.clone();
        var fold = new Fold(range, this.placeholder);
        this.subFolds.forEach(function(subFold) ***REMOVED***
            fold.subFolds.push(subFold.clone());
    ***REMOVED***);
        fold.collapseChildren = this.collapseChildren;
        return fold;
***REMOVED***;

    this.addSubFold = function(fold) ***REMOVED***
        if (this.range.isEqual(fold))
            return;

        if (!this.range.containsRange(fold))
            throw new Error("A fold can't intersect already existing fold" + fold.range + this.range);
        consumeRange(fold, this.start);

        var row = fold.start.row, column = fold.start.column;
        for (var i = 0, cmp = -1; i < this.subFolds.length; i++) ***REMOVED***
            cmp = this.subFolds[i].range.compare(row, column);
            if (cmp != 1)
                break;
    ***REMOVED***
        var afterStart = this.subFolds[i];

        if (cmp == 0)
            return afterStart.addSubFold(fold);
        var row = fold.range.end.row, column = fold.range.end.column;
        for (var j = i, cmp = -1; j < this.subFolds.length; j++) ***REMOVED***
            cmp = this.subFolds[j].range.compare(row, column);
            if (cmp != 1)
                break;
    ***REMOVED***
        var afterEnd = this.subFolds[j];

        if (cmp == 0)
            throw new Error("A fold can't intersect already existing fold" + fold.range + this.range);

        var consumedFolds = this.subFolds.splice(i, j - i, fold);
        fold.setFoldLine(this.foldLine);

        return fold;
***REMOVED***;
    
    this.restoreRange = function(range) ***REMOVED***
        return restoreRange(range, this.start);
***REMOVED***;

***REMOVED***).call(Fold.prototype);

function consumePoint(point, anchor) ***REMOVED***
    point.row -= anchor.row;
    if (point.row == 0)
        point.column -= anchor.column;
***REMOVED***
function consumeRange(range, anchor) ***REMOVED***
    consumePoint(range.start, anchor);
    consumePoint(range.end, anchor);
***REMOVED***
function restorePoint(point, anchor) ***REMOVED***
    if (point.row == 0)
        point.column += anchor.column;
    point.row += anchor.row;
***REMOVED***
function restoreRange(range, anchor) ***REMOVED***
    restorePoint(range.start, anchor);
    restorePoint(range.end, anchor);
***REMOVED***

***REMOVED***);

__ace_shadowed__.define('ace/range_list', ['require', 'exports', 'module' , 'ace/range'], function(require, exports, module) ***REMOVED***

var Range = require("./range").Range;
var comparePoints = Range.comparePoints;

var RangeList = function() ***REMOVED***
    this.ranges = [];
***REMOVED***;

(function() ***REMOVED***
    this.comparePoints = comparePoints;

    this.pointIndex = function(pos, excludeEdges, startIndex) ***REMOVED***
        var list = this.ranges;

        for (var i = startIndex || 0; i < list.length; i++) ***REMOVED***
            var range = list[i];
            var cmpEnd = comparePoints(pos, range.end);
            if (cmpEnd > 0)
                continue;
            var cmpStart = comparePoints(pos, range.start);
            if (cmpEnd === 0)
                return excludeEdges && cmpStart !== 0 ? -i-2 : i;
            if (cmpStart > 0 || (cmpStart === 0 && !excludeEdges))
                return i;

            return -i-1;
    ***REMOVED***
        return -i - 1;
***REMOVED***;

    this.add = function(range) ***REMOVED***
        var excludeEdges = !range.isEmpty();
        var startIndex = this.pointIndex(range.start, excludeEdges);
        if (startIndex < 0)
            startIndex = -startIndex - 1;

        var endIndex = this.pointIndex(range.end, excludeEdges, startIndex);

        if (endIndex < 0)
            endIndex = -endIndex - 1;
        else
            endIndex++;
        return this.ranges.splice(startIndex, endIndex - startIndex, range);
***REMOVED***;

    this.addList = function(list) ***REMOVED***
        var removed = [];
        for (var i = list.length; i--; ) ***REMOVED***
            removed.push.call(removed, this.add(list[i]));
    ***REMOVED***
        return removed;
***REMOVED***;

    this.substractPoint = function(pos) ***REMOVED***
        var i = this.pointIndex(pos);

        if (i >= 0)
            return this.ranges.splice(i, 1);
***REMOVED***;
    this.merge = function() ***REMOVED***
        var removed = [];
        var list = this.ranges;
        
        list = list.sort(function(a, b) ***REMOVED***
            return comparePoints(a.start, b.start);
    ***REMOVED***);
        
        var next = list[0], range;
        for (var i = 1; i < list.length; i++) ***REMOVED***
            range = next;
            next = list[i];
            var cmp = comparePoints(range.end, next.start);
            if (cmp < 0)
                continue;

            if (cmp == 0 && !range.isEmpty() && !next.isEmpty())
                continue;

            if (comparePoints(range.end, next.end) < 0) ***REMOVED***
                range.end.row = next.end.row;
                range.end.column = next.end.column;
        ***REMOVED***

            list.splice(i, 1);
            removed.push(next);
            next = range;
            i--;
    ***REMOVED***
        
        this.ranges = list;

        return removed;
***REMOVED***;

    this.contains = function(row, column) ***REMOVED***
        return this.pointIndex(***REMOVED***row: row, column: column***REMOVED***) >= 0;
***REMOVED***;

    this.containsPoint = function(pos) ***REMOVED***
        return this.pointIndex(pos) >= 0;
***REMOVED***;

    this.rangeAtPoint = function(pos) ***REMOVED***
        var i = this.pointIndex(pos);
        if (i >= 0)
            return this.ranges[i];
***REMOVED***;


    this.clipRows = function(startRow, endRow) ***REMOVED***
        var list = this.ranges;
        if (list[0].start.row > endRow || list[list.length - 1].start.row < startRow)
            return [];

        var startIndex = this.pointIndex(***REMOVED***row: startRow, column: 0***REMOVED***);
        if (startIndex < 0)
            startIndex = -startIndex - 1;
        var endIndex = this.pointIndex(***REMOVED***row: endRow, column: 0***REMOVED***, startIndex);
        if (endIndex < 0)
            endIndex = -endIndex - 1;

        var clipped = [];
        for (var i = startIndex; i < endIndex; i++) ***REMOVED***
            clipped.push(list[i]);
    ***REMOVED***
        return clipped;
***REMOVED***;

    this.removeAll = function() ***REMOVED***
        return this.ranges.splice(0, this.ranges.length);
***REMOVED***;

    this.attach = function(session) ***REMOVED***
        if (this.session)
            this.detach();

        this.session = session;
        this.onChange = this.$onChange.bind(this);

        this.session.on('change', this.onChange);
***REMOVED***;

    this.detach = function() ***REMOVED***
        if (!this.session)
            return;
        this.session.removeListener('change', this.onChange);
        this.session = null;
***REMOVED***;

    this.$onChange = function(e) ***REMOVED***
        var changeRange = e.data.range;
        if (e.data.action[0] == "i")***REMOVED***
            var start = changeRange.start;
            var end = changeRange.end;
    ***REMOVED*** else ***REMOVED***
            var end = changeRange.start;
            var start = changeRange.end;
    ***REMOVED***
        var startRow = start.row;
        var endRow = end.row;
        var lineDif = endRow - startRow;

        var colDiff = -start.column + end.column;
        var ranges = this.ranges;

        for (var i = 0, n = ranges.length; i < n; i++) ***REMOVED***
            var r = ranges[i];
            if (r.end.row < startRow)
                continue;
            if (r.start.row > startRow)
                break;

            if (r.start.row == startRow && r.start.column >= start.column ) ***REMOVED***
                if (r.start.column == start.column && this.$insertRight) ***REMOVED***
            ***REMOVED*** else ***REMOVED***
                    r.start.column += colDiff;
                    r.start.row += lineDif;
            ***REMOVED***
        ***REMOVED***
            if (r.end.row == startRow && r.end.column >= start.column) ***REMOVED***
                if (r.end.column == start.column && this.$insertRight) ***REMOVED***
                    continue;
            ***REMOVED***
                if (r.end.column == start.column && colDiff > 0 && i < n - 1) ***REMOVED***                
                    if (r.end.column > r.start.column && r.end.column == ranges[i+1].start.column)
                        r.end.column -= colDiff;
            ***REMOVED***
                r.end.column += colDiff;
                r.end.row += lineDif;
        ***REMOVED***
    ***REMOVED***

        if (lineDif != 0 && i < n) ***REMOVED***
            for (; i < n; i++) ***REMOVED***
                var r = ranges[i];
                r.start.row += lineDif;
                r.end.row += lineDif;
        ***REMOVED***
    ***REMOVED***
***REMOVED***;

***REMOVED***).call(RangeList.prototype);

exports.RangeList = RangeList;
***REMOVED***);

__ace_shadowed__.define('ace/edit_session/bracket_match', ['require', 'exports', 'module' , 'ace/token_iterator', 'ace/range'], function(require, exports, module) ***REMOVED***


var TokenIterator = require("../token_iterator").TokenIterator;
var Range = require("../range").Range;


function BracketMatch() ***REMOVED***

    this.findMatchingBracket = function(position, chr) ***REMOVED***
        if (position.column == 0) return null;

        var charBeforeCursor = chr || this.getLine(position.row).charAt(position.column-1);
        if (charBeforeCursor == "") return null;

        var match = charBeforeCursor.match(/([\(\[\***REMOVED***])|([\)\]\***REMOVED***])/);
        if (!match)
            return null;

        if (match[1])
            return this.$findClosingBracket(match[1], position);
        else
            return this.$findOpeningBracket(match[2], position);
***REMOVED***;
    
    this.getBracketRange = function(pos) ***REMOVED***
        var line = this.getLine(pos.row);
        var before = true, range;

        var chr = line.charAt(pos.column-1);
        var match = chr && chr.match(/([\(\[\***REMOVED***])|([\)\]\***REMOVED***])/);
        if (!match) ***REMOVED***
            chr = line.charAt(pos.column);
            pos = ***REMOVED***row: pos.row, column: pos.column + 1***REMOVED***;
            match = chr && chr.match(/([\(\[\***REMOVED***])|([\)\]\***REMOVED***])/);
            before = false;
    ***REMOVED***
        if (!match)
            return null;

        if (match[1]) ***REMOVED***
            var bracketPos = this.$findClosingBracket(match[1], pos);
            if (!bracketPos)
                return null;
            range = Range.fromPoints(pos, bracketPos);
            if (!before) ***REMOVED***
                range.end.column++;
                range.start.column--;
        ***REMOVED***
            range.cursor = range.end;
    ***REMOVED*** else ***REMOVED***
            var bracketPos = this.$findOpeningBracket(match[2], pos);
            if (!bracketPos)
                return null;
            range = Range.fromPoints(bracketPos, pos);
            if (!before) ***REMOVED***
                range.start.column++;
                range.end.column--;
        ***REMOVED***
            range.cursor = range.start;
    ***REMOVED***
        
        return range;
***REMOVED***;

    this.$brackets = ***REMOVED***
        ")": "(",
        "(": ")",
        "]": "[",
        "[": "]",
        "***REMOVED***": "***REMOVED***",
        "***REMOVED***": "***REMOVED***"
***REMOVED***;

    this.$findOpeningBracket = function(bracket, position, typeRe) ***REMOVED***
        var openBracket = this.$brackets[bracket];
        var depth = 1;

        var iterator = new TokenIterator(this, position.row, position.column);
        var token = iterator.getCurrentToken();
        if (!token)
            token = iterator.stepForward();
        if (!token)
            return;
        
         if (!typeRe)***REMOVED***
            typeRe = new RegExp(
                "(\\.?" +
                token.type.replace(".", "\\.").replace("rparen", ".paren")
                + ")+"
            );
    ***REMOVED***
        var valueIndex = position.column - iterator.getCurrentTokenColumn() - 2;
        var value = token.value;
        
        while (true) ***REMOVED***
        
            while (valueIndex >= 0) ***REMOVED***
                var chr = value.charAt(valueIndex);
                if (chr == openBracket) ***REMOVED***
                    depth -= 1;
                    if (depth == 0) ***REMOVED***
                        return ***REMOVED***row: iterator.getCurrentTokenRow(),
                            column: valueIndex + iterator.getCurrentTokenColumn()***REMOVED***;
                ***REMOVED***
            ***REMOVED***
                else if (chr == bracket) ***REMOVED***
                    depth += 1;
            ***REMOVED***
                valueIndex -= 1;
        ***REMOVED***
            do ***REMOVED***
                token = iterator.stepBackward();
        ***REMOVED*** while (token && !typeRe.test(token.type));

            if (token == null)
                break;
                
            value = token.value;
            valueIndex = value.length - 1;
    ***REMOVED***
        
        return null;
***REMOVED***;

    this.$findClosingBracket = function(bracket, position, typeRe) ***REMOVED***
        var closingBracket = this.$brackets[bracket];
        var depth = 1;

        var iterator = new TokenIterator(this, position.row, position.column);
        var token = iterator.getCurrentToken();
        if (!token)
            token = iterator.stepForward();
        if (!token)
            return;

        if (!typeRe)***REMOVED***
            typeRe = new RegExp(
                "(\\.?" +
                token.type.replace(".", "\\.").replace("lparen", ".paren")
                + ")+"
            );
    ***REMOVED***
        var valueIndex = position.column - iterator.getCurrentTokenColumn();

        while (true) ***REMOVED***

            var value = token.value;
            var valueLength = value.length;
            while (valueIndex < valueLength) ***REMOVED***
                var chr = value.charAt(valueIndex);
                if (chr == closingBracket) ***REMOVED***
                    depth -= 1;
                    if (depth == 0) ***REMOVED***
                        return ***REMOVED***row: iterator.getCurrentTokenRow(),
                            column: valueIndex + iterator.getCurrentTokenColumn()***REMOVED***;
                ***REMOVED***
            ***REMOVED***
                else if (chr == bracket) ***REMOVED***
                    depth += 1;
            ***REMOVED***
                valueIndex += 1;
        ***REMOVED***
            do ***REMOVED***
                token = iterator.stepForward();
        ***REMOVED*** while (token && !typeRe.test(token.type));

            if (token == null)
                break;

            valueIndex = 0;
    ***REMOVED***
        
        return null;
***REMOVED***;
***REMOVED***
exports.BracketMatch = BracketMatch;

***REMOVED***);

__ace_shadowed__.define('ace/search', ['require', 'exports', 'module' , 'ace/lib/lang', 'ace/lib/oop', 'ace/range'], function(require, exports, module) ***REMOVED***


var lang = require("./lib/lang");
var oop = require("./lib/oop");
var Range = require("./range").Range;

var Search = function() ***REMOVED***
    this.$options = ***REMOVED******REMOVED***;
***REMOVED***;

(function() ***REMOVED***
    this.set = function(options) ***REMOVED***
        oop.mixin(this.$options, options);
        return this;
***REMOVED***;
    this.getOptions = function() ***REMOVED***
        return lang.copyObject(this.$options);
***REMOVED***;
    this.setOptions = function(options) ***REMOVED***
        this.$options = options;
***REMOVED***;
    this.find = function(session) ***REMOVED***
        var iterator = this.$matchIterator(session, this.$options);

        if (!iterator)
            return false;

        var firstRange = null;
        iterator.forEach(function(range, row, offset) ***REMOVED***
            if (!range.start) ***REMOVED***
                var column = range.offset + (offset || 0);
                firstRange = new Range(row, column, row, column+range.length);
        ***REMOVED*** else
                firstRange = range;
            return true;
    ***REMOVED***);

        return firstRange;
***REMOVED***;
    this.findAll = function(session) ***REMOVED***
        var options = this.$options;
        if (!options.needle)
            return [];
        this.$assembleRegExp(options);

        var range = options.range;
        var lines = range
            ? session.getLines(range.start.row, range.end.row)
            : session.doc.getAllLines();

        var ranges = [];
        var re = options.re;
        if (options.$isMultiLine) ***REMOVED***
            var len = re.length;
            var maxRow = lines.length - len;
            var prevRange;
            outer: for (var row = re.offset || 0; row <= maxRow; row++) ***REMOVED***
                for (var j = 0; j < len; j++)
                    if (lines[row + j].search(re[j]) == -1)
                        continue outer;
                
                var startLine = lines[row];
                var line = lines[row + len - 1];
                var startIndex = startLine.length - startLine.match(re[0])[0].length;
                var endIndex = line.match(re[len - 1])[0].length;
                
                if (prevRange && prevRange.end.row === row &&
                    prevRange.end.column > startIndex
                ) ***REMOVED***
                    continue;
            ***REMOVED***
                ranges.push(prevRange = new Range(
                    row, startIndex, row + len - 1, endIndex
                ));
                if (len > 2)
                    row = row + len - 2;
        ***REMOVED***
    ***REMOVED*** else ***REMOVED***
            for (var i = 0; i < lines.length; i++) ***REMOVED***
                var matches = lang.getMatchOffsets(lines[i], re);
                for (var j = 0; j < matches.length; j++) ***REMOVED***
                    var match = matches[j];
                    ranges.push(new Range(i, match.offset, i, match.offset + match.length));
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***

        if (range) ***REMOVED***
            var startColumn = range.start.column;
            var endColumn = range.start.column;
            var i = 0, j = ranges.length - 1;
            while (i < j && ranges[i].start.column < startColumn && ranges[i].start.row == range.start.row)
                i++;

            while (i < j && ranges[j].end.column > endColumn && ranges[j].end.row == range.end.row)
                j--;
            
            ranges = ranges.slice(i, j + 1);
            for (i = 0, j = ranges.length; i < j; i++) ***REMOVED***
                ranges[i].start.row += range.start.row;
                ranges[i].end.row += range.start.row;
        ***REMOVED***
    ***REMOVED***

        return ranges;
***REMOVED***;
    this.replace = function(input, replacement) ***REMOVED***
        var options = this.$options;

        var re = this.$assembleRegExp(options);
        if (options.$isMultiLine)
            return replacement;

        if (!re)
            return;

        var match = re.exec(input);
        if (!match || match[0].length != input.length)
            return null;
        
        replacement = input.replace(re, replacement);
        if (options.preserveCase) ***REMOVED***
            replacement = replacement.split("");
            for (var i = Math.min(input.length, input.length); i--; ) ***REMOVED***
                var ch = input[i];
                if (ch && ch.toLowerCase() != ch)
                    replacement[i] = replacement[i].toUpperCase();
                else
                    replacement[i] = replacement[i].toLowerCase();
        ***REMOVED***
            replacement = replacement.join("");
    ***REMOVED***
        
        return replacement;
***REMOVED***;

    this.$matchIterator = function(session, options) ***REMOVED***
        var re = this.$assembleRegExp(options);
        if (!re)
            return false;

        var self = this, callback, backwards = options.backwards;

        if (options.$isMultiLine) ***REMOVED***
            var len = re.length;
            var matchIterator = function(line, row, offset) ***REMOVED***
                var startIndex = line.search(re[0]);
                if (startIndex == -1)
                    return;
                for (var i = 1; i < len; i++) ***REMOVED***
                    line = session.getLine(row + i);
                    if (line.search(re[i]) == -1)
                        return;
            ***REMOVED***

                var endIndex = line.match(re[len - 1])[0].length;

                var range = new Range(row, startIndex, row + len - 1, endIndex);
                if (re.offset == 1) ***REMOVED***
                    range.start.row--;
                    range.start.column = Number.MAX_VALUE;
            ***REMOVED*** else if (offset)
                    range.start.column += offset;

                if (callback(range))
                    return true;
        ***REMOVED***;
    ***REMOVED*** else if (backwards) ***REMOVED***
            var matchIterator = function(line, row, startIndex) ***REMOVED***
                var matches = lang.getMatchOffsets(line, re);
                for (var i = matches.length-1; i >= 0; i--)
                    if (callback(matches[i], row, startIndex))
                        return true;
        ***REMOVED***;
    ***REMOVED*** else ***REMOVED***
            var matchIterator = function(line, row, startIndex) ***REMOVED***
                var matches = lang.getMatchOffsets(line, re);
                for (var i = 0; i < matches.length; i++)
                    if (callback(matches[i], row, startIndex))
                        return true;
        ***REMOVED***;
    ***REMOVED***

        return ***REMOVED***
            forEach: function(_callback) ***REMOVED***
                callback = _callback;
                self.$lineIterator(session, options).forEach(matchIterator);
        ***REMOVED***
    ***REMOVED***;
***REMOVED***;

    this.$assembleRegExp = function(options, $disableFakeMultiline) ***REMOVED***
        if (options.needle instanceof RegExp)
            return options.re = options.needle;

        var needle = options.needle;

        if (!options.needle)
            return options.re = false;

        if (!options.regExp)
            needle = lang.escapeRegExp(needle);

        if (options.wholeWord)
            needle = "\\b" + needle + "\\b";

        var modifier = options.caseSensitive ? "g" : "gi";

        options.$isMultiLine = !$disableFakeMultiline && /[\n\r]/.test(needle);
        if (options.$isMultiLine)
            return options.re = this.$assembleMultilineRegExp(needle, modifier);

        try ***REMOVED***
            var re = new RegExp(needle, modifier);
    ***REMOVED*** catch(e) ***REMOVED***
            re = false;
    ***REMOVED***
        return options.re = re;
***REMOVED***;

    this.$assembleMultilineRegExp = function(needle, modifier) ***REMOVED***
        var parts = needle.replace(/\r\n|\r|\n/g, "$\n^").split("\n");
        var re = [];
        for (var i = 0; i < parts.length; i++) try ***REMOVED***
            re.push(new RegExp(parts[i], modifier));
    ***REMOVED*** catch(e) ***REMOVED***
            return false;
    ***REMOVED***
        if (parts[0] == "") ***REMOVED***
            re.shift();
            re.offset = 1;
    ***REMOVED*** else ***REMOVED***
            re.offset = 0;
    ***REMOVED***
        return re;
***REMOVED***;

    this.$lineIterator = function(session, options) ***REMOVED***
        var backwards = options.backwards == true;
        var skipCurrent = options.skipCurrent != false;

        var range = options.range;
        var start = options.start;
        if (!start)
            start = range ? range[backwards ? "end" : "start"] : session.selection.getRange();
         
        if (start.start)
            start = start[skipCurrent != backwards ? "end" : "start"];

        var firstRow = range ? range.start.row : 0;
        var lastRow = range ? range.end.row : session.getLength() - 1;

        var forEach = backwards ? function(callback) ***REMOVED***
                var row = start.row;

                var line = session.getLine(row).substring(0, start.column);
                if (callback(line, row))
                    return;

                for (row--; row >= firstRow; row--)
                    if (callback(session.getLine(row), row))
                        return;

                if (options.wrap == false)
                    return;

                for (row = lastRow, firstRow = start.row; row >= firstRow; row--)
                    if (callback(session.getLine(row), row))
                        return;
        ***REMOVED*** : function(callback) ***REMOVED***
                var row = start.row;

                var line = session.getLine(row).substr(start.column);
                if (callback(line, row, start.column))
                    return;

                for (row = row+1; row <= lastRow; row++)
                    if (callback(session.getLine(row), row))
                        return;

                if (options.wrap == false)
                    return;

                for (row = firstRow, lastRow = start.row; row <= lastRow; row++)
                    if (callback(session.getLine(row), row))
                        return;
        ***REMOVED***;
        
        return ***REMOVED***forEach: forEach***REMOVED***;
***REMOVED***;

***REMOVED***).call(Search.prototype);

exports.Search = Search;
***REMOVED***);
__ace_shadowed__.define('ace/commands/command_manager', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/keyboard/hash_handler', 'ace/lib/event_emitter'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var HashHandler = require("../keyboard/hash_handler").HashHandler;
var EventEmitter = require("../lib/event_emitter").EventEmitter;

var CommandManager = function(platform, commands) ***REMOVED***
    HashHandler.call(this, commands, platform);
    this.byName = this.commands;
    this.setDefaultHandler("exec", function(e) ***REMOVED***
        return e.command.exec(e.editor, e.args || ***REMOVED******REMOVED***);
***REMOVED***);
***REMOVED***;

oop.inherits(CommandManager, HashHandler);

(function() ***REMOVED***

    oop.implement(this, EventEmitter);

    this.exec = function(command, editor, args) ***REMOVED***
        if (typeof command === 'string')
            command = this.commands[command];

        if (!command)
            return false;

        if (editor && editor.$readOnly && !command.readOnly)
            return false;

        var e = ***REMOVED***editor: editor, command: command, args: args***REMOVED***;
        var retvalue = this._emit("exec", e);
        this._signal("afterExec", e);

        return retvalue === false ? false : true;
***REMOVED***;

    this.toggleRecording = function(editor) ***REMOVED***
        if (this.$inReplay)
            return;

        editor && editor._emit("changeStatus");
        if (this.recording) ***REMOVED***
            this.macro.pop();
            this.removeEventListener("exec", this.$addCommandToMacro);

            if (!this.macro.length)
                this.macro = this.oldMacro;

            return this.recording = false;
    ***REMOVED***
        if (!this.$addCommandToMacro) ***REMOVED***
            this.$addCommandToMacro = function(e) ***REMOVED***
                this.macro.push([e.command, e.args]);
        ***REMOVED***.bind(this);
    ***REMOVED***

        this.oldMacro = this.macro;
        this.macro = [];
        this.on("exec", this.$addCommandToMacro);
        return this.recording = true;
***REMOVED***;

    this.replay = function(editor) ***REMOVED***
        if (this.$inReplay || !this.macro)
            return;

        if (this.recording)
            return this.toggleRecording(editor);

        try ***REMOVED***
            this.$inReplay = true;
            this.macro.forEach(function(x) ***REMOVED***
                if (typeof x == "string")
                    this.exec(x, editor);
                else
                    this.exec(x[0], editor, x[1]);
        ***REMOVED*** this);
    ***REMOVED*** finally ***REMOVED***
            this.$inReplay = false;
    ***REMOVED***
***REMOVED***;

    this.trimMacro = function(m) ***REMOVED***
        return m.map(function(x)***REMOVED***
            if (typeof x[0] != "string")
                x[0] = x[0].name;
            if (!x[1])
                x = x[0];
            return x;
    ***REMOVED***);
***REMOVED***;

***REMOVED***).call(CommandManager.prototype);

exports.CommandManager = CommandManager;

***REMOVED***);

__ace_shadowed__.define('ace/keyboard/hash_handler', ['require', 'exports', 'module' , 'ace/lib/keys', 'ace/lib/useragent'], function(require, exports, module) ***REMOVED***


var keyUtil = require("../lib/keys");
var useragent = require("../lib/useragent");

function HashHandler(config, platform) ***REMOVED***
    this.platform = platform || (useragent.isMac ? "mac" : "win");
    this.commands = ***REMOVED******REMOVED***;
    this.commandKeyBinding = ***REMOVED******REMOVED***;
    if (this.__defineGetter__ && this.__defineSetter__ && typeof console != "undefined" && console.error) ***REMOVED***
        var warned = false;
        var warn = function() ***REMOVED***
            if (!warned) ***REMOVED***
                warned = true;
                console.error("commmandKeyBinding has too many m's. use commandKeyBinding");
        ***REMOVED***
    ***REMOVED***;
        this.__defineGetter__("commmandKeyBinding", function() ***REMOVED***
            warn();
            return this.commandKeyBinding;
    ***REMOVED***);
        this.__defineSetter__("commmandKeyBinding", function(val) ***REMOVED***
            warn();
            return this.commandKeyBinding = val;
    ***REMOVED***);
***REMOVED*** else ***REMOVED***
        this.commmandKeyBinding = this.commandKeyBinding;
***REMOVED***

    this.addCommands(config);
***REMOVED***;

(function() ***REMOVED***

    this.addCommand = function(command) ***REMOVED***
        if (this.commands[command.name])
            this.removeCommand(command);

        this.commands[command.name] = command;

        if (command.bindKey)
            this._buildKeyHash(command);
***REMOVED***;

    this.removeCommand = function(command) ***REMOVED***
        var name = (typeof command === 'string' ? command : command.name);
        command = this.commands[name];
        delete this.commands[name];
        var ckb = this.commandKeyBinding;
        for (var hashId in ckb) ***REMOVED***
            for (var key in ckb[hashId]) ***REMOVED***
                if (ckb[hashId][key] == command)
                    delete ckb[hashId][key];
        ***REMOVED***
    ***REMOVED***
***REMOVED***;

    this.bindKey = function(key, command) ***REMOVED***
        if(!key)
            return;
        if (typeof command == "function") ***REMOVED***
            this.addCommand(***REMOVED***exec: command, bindKey: key, name: command.name || key***REMOVED***);
            return;
    ***REMOVED***

        var ckb = this.commandKeyBinding;
        key.split("|").forEach(function(keyPart) ***REMOVED***
            var binding = this.parseKeys(keyPart, command);
            var hashId = binding.hashId;
            (ckb[hashId] || (ckb[hashId] = ***REMOVED******REMOVED***))[binding.key] = command;
    ***REMOVED*** this);
***REMOVED***;

    this.addCommands = function(commands) ***REMOVED***
        commands && Object.keys(commands).forEach(function(name) ***REMOVED***
            var command = commands[name];
            if (!command)
                return;
            
            if (typeof command === "string")
                return this.bindKey(command, name);

            if (typeof command === "function")
                command = ***REMOVED*** exec: command ***REMOVED***;

            if (typeof command !== "object")
                return;

            if (!command.name)
                command.name = name;

            this.addCommand(command);
    ***REMOVED*** this);
***REMOVED***;

    this.removeCommands = function(commands) ***REMOVED***
        Object.keys(commands).forEach(function(name) ***REMOVED***
            this.removeCommand(commands[name]);
    ***REMOVED*** this);
***REMOVED***;

    this.bindKeys = function(keyList) ***REMOVED***
        Object.keys(keyList).forEach(function(key) ***REMOVED***
            this.bindKey(key, keyList[key]);
    ***REMOVED*** this);
***REMOVED***;

    this._buildKeyHash = function(command) ***REMOVED***
        var binding = command.bindKey;
        if (!binding)
            return;

        var key = typeof binding == "string" ? binding: binding[this.platform];
        this.bindKey(key, command);
***REMOVED***;
    this.parseKeys = function(keys) ***REMOVED***
        if (keys.indexOf(" ") != -1)
            keys = keys.split(/\s+/).pop();

        var parts = keys.toLowerCase().split(/[\-\+]([\-\+])?/).filter(function(x)***REMOVED***return x***REMOVED***);
        var key = parts.pop();

        var keyCode = keyUtil[key];
        if (keyUtil.FUNCTION_KEYS[keyCode])
            key = keyUtil.FUNCTION_KEYS[keyCode].toLowerCase();
        else if (!parts.length)
            return ***REMOVED***key: key, hashId: -1***REMOVED***;
        else if (parts.length == 1 && parts[0] == "shift")
            return ***REMOVED***key: key.toUpperCase(), hashId: -1***REMOVED***;

        var hashId = 0;
        for (var i = parts.length; i--;) ***REMOVED***
            var modifier = keyUtil.KEY_MODS[parts[i]];
            if (modifier == null) ***REMOVED***
                if (typeof console != "undefined")
                console.error("invalid modifier " + parts[i] + " in " + keys);
                return false;
        ***REMOVED***
            hashId |= modifier;
    ***REMOVED***
        return ***REMOVED***key: key, hashId: hashId***REMOVED***;
***REMOVED***;

    this.findKeyCommand = function findKeyCommand(hashId, keyString) ***REMOVED***
        var ckbr = this.commandKeyBinding;
        return ckbr[hashId] && ckbr[hashId][keyString];
***REMOVED***;

    this.handleKeyboard = function(data, hashId, keyString, keyCode) ***REMOVED***
        return ***REMOVED***
            command: this.findKeyCommand(hashId, keyString)
    ***REMOVED***;
***REMOVED***;

***REMOVED***).call(HashHandler.prototype)

exports.HashHandler = HashHandler;
***REMOVED***);

__ace_shadowed__.define('ace/commands/default_commands', ['require', 'exports', 'module' , 'ace/lib/lang', 'ace/config'], function(require, exports, module) ***REMOVED***


var lang = require("../lib/lang");
var config = require("../config");

function bindKey(win, mac) ***REMOVED***
    return ***REMOVED***win: win, mac: mac***REMOVED***;
***REMOVED***
exports.commands = [***REMOVED***
    name: "showSettingsMenu",
    bindKey: bindKey("Ctrl-,", "Command-,"),
    exec: function(editor) ***REMOVED***
        config.loadModule("ace/ext/settings_menu", function(module) ***REMOVED***
            module.init(editor);
            editor.showSettingsMenu();
    ***REMOVED***);
***REMOVED***
    readOnly: true
***REMOVED***, ***REMOVED***
    name: "goToNextError",
    bindKey: bindKey("Alt-E", "Ctrl-E"),
    exec: function(editor) ***REMOVED***
        config.loadModule("ace/ext/error_marker", function(module) ***REMOVED***
            module.showErrorMarker(editor, 1);
    ***REMOVED***);
***REMOVED***
    scrollIntoView: "animate",
    readOnly: true
***REMOVED***, ***REMOVED***
    name: "goToPreviousError",
    bindKey: bindKey("Alt-Shift-E", "Ctrl-Shift-E"),
    exec: function(editor) ***REMOVED***
        config.loadModule("ace/ext/error_marker", function(module) ***REMOVED***
            module.showErrorMarker(editor, -1);
    ***REMOVED***);
***REMOVED***
    scrollIntoView: "animate",
    readOnly: true
***REMOVED***, ***REMOVED***
    name: "selectall",
    bindKey: bindKey("Ctrl-A", "Command-A"),
    exec: function(editor) ***REMOVED*** editor.selectAll(); ***REMOVED***,
    readOnly: true
***REMOVED***, ***REMOVED***
    name: "centerselection",
    bindKey: bindKey(null, "Ctrl-L"),
    exec: function(editor) ***REMOVED*** editor.centerSelection(); ***REMOVED***,
    readOnly: true
***REMOVED***, ***REMOVED***
    name: "gotoline",
    bindKey: bindKey("Ctrl-L", "Command-L"),
    exec: function(editor) ***REMOVED***
        var line = parseInt(prompt("Enter line number:"), 10);
        if (!isNaN(line)) ***REMOVED***
            editor.gotoLine(line);
    ***REMOVED***
***REMOVED***
    readOnly: true
***REMOVED***, ***REMOVED***
    name: "fold",
    bindKey: bindKey("Alt-L|Ctrl-F1", "Command-Alt-L|Command-F1"),
    exec: function(editor) ***REMOVED*** editor.session.toggleFold(false); ***REMOVED***,
    scrollIntoView: "center",
    readOnly: true
***REMOVED***, ***REMOVED***
    name: "unfold",
    bindKey: bindKey("Alt-Shift-L|Ctrl-Shift-F1", "Command-Alt-Shift-L|Command-Shift-F1"),
    exec: function(editor) ***REMOVED*** editor.session.toggleFold(true); ***REMOVED***,
    scrollIntoView: "center",
    readOnly: true
***REMOVED***, ***REMOVED***
    name: "toggleFoldWidget",
    bindKey: bindKey("F2", "F2"),
    exec: function(editor) ***REMOVED*** editor.session.toggleFoldWidget(); ***REMOVED***,
    scrollIntoView: "center",
    readOnly: true
***REMOVED***, ***REMOVED***
    name: "toggleParentFoldWidget",
    bindKey: bindKey("Alt-F2", "Alt-F2"),
    exec: function(editor) ***REMOVED*** editor.session.toggleFoldWidget(true); ***REMOVED***,
    scrollIntoView: "center",
    readOnly: true
***REMOVED***, ***REMOVED***
    name: "foldall",
    bindKey: bindKey("Ctrl-Alt-0", "Ctrl-Command-Option-0"),
    exec: function(editor) ***REMOVED*** editor.session.foldAll(); ***REMOVED***,
    scrollIntoView: "center",
    readOnly: true
***REMOVED***, ***REMOVED***
    name: "foldOther",
    bindKey: bindKey("Alt-0", "Command-Option-0"),
    exec: function(editor) ***REMOVED*** 
        editor.session.foldAll();
        editor.session.unfold(editor.selection.getAllRanges());
***REMOVED***
    scrollIntoView: "center",
    readOnly: true
***REMOVED***, ***REMOVED***
    name: "unfoldall",
    bindKey: bindKey("Alt-Shift-0", "Command-Option-Shift-0"),
    exec: function(editor) ***REMOVED*** editor.session.unfold(); ***REMOVED***,
    scrollIntoView: "center",
    readOnly: true
***REMOVED***, ***REMOVED***
    name: "findnext",
    bindKey: bindKey("Ctrl-K", "Command-G"),
    exec: function(editor) ***REMOVED*** editor.findNext(); ***REMOVED***,
    readOnly: true
***REMOVED***, ***REMOVED***
    name: "findprevious",
    bindKey: bindKey("Ctrl-Shift-K", "Command-Shift-G"),
    exec: function(editor) ***REMOVED*** editor.findPrevious(); ***REMOVED***,
    readOnly: true
***REMOVED***, ***REMOVED***
    name: "selectOrFindNext",
    bindKey: bindKey("ALt-K", "Ctrl-G"),
    exec: function(editor) ***REMOVED***
        if (editor.selection.isEmpty())
            editor.selection.selectWord();
        else
            editor.findNext(); 
***REMOVED***
    readOnly: true
***REMOVED***, ***REMOVED***
    name: "selectOrFindPrevious",
    bindKey: bindKey("Alt-Shift-K", "Ctrl-Shift-G"),
    exec: function(editor) ***REMOVED*** 
        if (editor.selection.isEmpty())
            editor.selection.selectWord();
        else
            editor.findPrevious();
***REMOVED***
    readOnly: true
***REMOVED***, ***REMOVED***
    name: "find",
    bindKey: bindKey("Ctrl-F", "Command-F"),
    exec: function(editor) ***REMOVED***
        config.loadModule("ace/ext/searchbox", function(e) ***REMOVED***e.Search(editor)***REMOVED***);
***REMOVED***
    readOnly: true
***REMOVED***, ***REMOVED***
    name: "overwrite",
    bindKey: "Insert",
    exec: function(editor) ***REMOVED*** editor.toggleOverwrite(); ***REMOVED***,
    readOnly: true
***REMOVED***, ***REMOVED***
    name: "selecttostart",
    bindKey: bindKey("Ctrl-Shift-Home", "Command-Shift-Up"),
    exec: function(editor) ***REMOVED*** editor.getSelection().selectFileStart(); ***REMOVED***,
    multiSelectAction: "forEach",
    readOnly: true,
    scrollIntoView: "animate",
    aceCommandGroup: "fileJump"
***REMOVED***, ***REMOVED***
    name: "gotostart",
    bindKey: bindKey("Ctrl-Home", "Command-Home|Command-Up"),
    exec: function(editor) ***REMOVED*** editor.navigateFileStart(); ***REMOVED***,
    multiSelectAction: "forEach",
    readOnly: true,
    scrollIntoView: "animate",
    aceCommandGroup: "fileJump"
***REMOVED***, ***REMOVED***
    name: "selectup",
    bindKey: bindKey("Shift-Up", "Shift-Up"),
    exec: function(editor) ***REMOVED*** editor.getSelection().selectUp(); ***REMOVED***,
    multiSelectAction: "forEach",
    readOnly: true
***REMOVED***, ***REMOVED***
    name: "golineup",
    bindKey: bindKey("Up", "Up|Ctrl-P"),
    exec: function(editor, args) ***REMOVED*** editor.navigateUp(args.times); ***REMOVED***,
    multiSelectAction: "forEach",
    readOnly: true
***REMOVED***, ***REMOVED***
    name: "selecttoend",
    bindKey: bindKey("Ctrl-Shift-End", "Command-Shift-Down"),
    exec: function(editor) ***REMOVED*** editor.getSelection().selectFileEnd(); ***REMOVED***,
    multiSelectAction: "forEach",
    readOnly: true,
    scrollIntoView: "animate",
    aceCommandGroup: "fileJump"
***REMOVED***, ***REMOVED***
    name: "gotoend",
    bindKey: bindKey("Ctrl-End", "Command-End|Command-Down"),
    exec: function(editor) ***REMOVED*** editor.navigateFileEnd(); ***REMOVED***,
    multiSelectAction: "forEach",
    readOnly: true,
    scrollIntoView: "animate",
    aceCommandGroup: "fileJump"
***REMOVED***, ***REMOVED***
    name: "selectdown",
    bindKey: bindKey("Shift-Down", "Shift-Down"),
    exec: function(editor) ***REMOVED*** editor.getSelection().selectDown(); ***REMOVED***,
    multiSelectAction: "forEach",
    scrollIntoView: "cursor",
    readOnly: true
***REMOVED***, ***REMOVED***
    name: "golinedown",
    bindKey: bindKey("Down", "Down|Ctrl-N"),
    exec: function(editor, args) ***REMOVED*** editor.navigateDown(args.times); ***REMOVED***,
    multiSelectAction: "forEach",
    scrollIntoView: "cursor",
    readOnly: true
***REMOVED***, ***REMOVED***
    name: "selectwordleft",
    bindKey: bindKey("Ctrl-Shift-Left", "Option-Shift-Left"),
    exec: function(editor) ***REMOVED*** editor.getSelection().selectWordLeft(); ***REMOVED***,
    multiSelectAction: "forEach",
    scrollIntoView: "cursor",
    readOnly: true
***REMOVED***, ***REMOVED***
    name: "gotowordleft",
    bindKey: bindKey("Ctrl-Left", "Option-Left"),
    exec: function(editor) ***REMOVED*** editor.navigateWordLeft(); ***REMOVED***,
    multiSelectAction: "forEach",
    scrollIntoView: "cursor",
    readOnly: true
***REMOVED***, ***REMOVED***
    name: "selecttolinestart",
    bindKey: bindKey("Alt-Shift-Left", "Command-Shift-Left"),
    exec: function(editor) ***REMOVED*** editor.getSelection().selectLineStart(); ***REMOVED***,
    multiSelectAction: "forEach",
    scrollIntoView: "cursor",
    readOnly: true
***REMOVED***, ***REMOVED***
    name: "gotolinestart",
    bindKey: bindKey("Alt-Left|Home", "Command-Left|Home|Ctrl-A"),
    exec: function(editor) ***REMOVED*** editor.navigateLineStart(); ***REMOVED***,
    multiSelectAction: "forEach",
    scrollIntoView: "cursor",
    readOnly: true
***REMOVED***, ***REMOVED***
    name: "selectleft",
    bindKey: bindKey("Shift-Left", "Shift-Left"),
    exec: function(editor) ***REMOVED*** editor.getSelection().selectLeft(); ***REMOVED***,
    multiSelectAction: "forEach",
    scrollIntoView: "cursor",
    readOnly: true
***REMOVED***, ***REMOVED***
    name: "gotoleft",
    bindKey: bindKey("Left", "Left|Ctrl-B"),
    exec: function(editor, args) ***REMOVED*** editor.navigateLeft(args.times); ***REMOVED***,
    multiSelectAction: "forEach",
    scrollIntoView: "cursor",
    readOnly: true
***REMOVED***, ***REMOVED***
    name: "selectwordright",
    bindKey: bindKey("Ctrl-Shift-Right", "Option-Shift-Right"),
    exec: function(editor) ***REMOVED*** editor.getSelection().selectWordRight(); ***REMOVED***,
    multiSelectAction: "forEach",
    scrollIntoView: "cursor",
    readOnly: true
***REMOVED***, ***REMOVED***
    name: "gotowordright",
    bindKey: bindKey("Ctrl-Right", "Option-Right"),
    exec: function(editor) ***REMOVED*** editor.navigateWordRight(); ***REMOVED***,
    multiSelectAction: "forEach",
    scrollIntoView: "cursor",
    readOnly: true
***REMOVED***, ***REMOVED***
    name: "selecttolineend",
    bindKey: bindKey("Alt-Shift-Right", "Command-Shift-Right"),
    exec: function(editor) ***REMOVED*** editor.getSelection().selectLineEnd(); ***REMOVED***,
    multiSelectAction: "forEach",
    scrollIntoView: "cursor",
    readOnly: true
***REMOVED***, ***REMOVED***
    name: "gotolineend",
    bindKey: bindKey("Alt-Right|End", "Command-Right|End|Ctrl-E"),
    exec: function(editor) ***REMOVED*** editor.navigateLineEnd(); ***REMOVED***,
    multiSelectAction: "forEach",
    scrollIntoView: "cursor",
    readOnly: true
***REMOVED***, ***REMOVED***
    name: "selectright",
    bindKey: bindKey("Shift-Right", "Shift-Right"),
    exec: function(editor) ***REMOVED*** editor.getSelection().selectRight(); ***REMOVED***,
    multiSelectAction: "forEach",
    scrollIntoView: "cursor",
    readOnly: true
***REMOVED***, ***REMOVED***
    name: "gotoright",
    bindKey: bindKey("Right", "Right|Ctrl-F"),
    exec: function(editor, args) ***REMOVED*** editor.navigateRight(args.times); ***REMOVED***,
    multiSelectAction: "forEach",
    scrollIntoView: "cursor",
    readOnly: true
***REMOVED***, ***REMOVED***
    name: "selectpagedown",
    bindKey: "Shift-PageDown",
    exec: function(editor) ***REMOVED*** editor.selectPageDown(); ***REMOVED***,
    readOnly: true
***REMOVED***, ***REMOVED***
    name: "pagedown",
    bindKey: bindKey(null, "Option-PageDown"),
    exec: function(editor) ***REMOVED*** editor.scrollPageDown(); ***REMOVED***,
    readOnly: true
***REMOVED***, ***REMOVED***
    name: "gotopagedown",
    bindKey: bindKey("PageDown", "PageDown|Ctrl-V"),
    exec: function(editor) ***REMOVED*** editor.gotoPageDown(); ***REMOVED***,
    readOnly: true
***REMOVED***, ***REMOVED***
    name: "selectpageup",
    bindKey: "Shift-PageUp",
    exec: function(editor) ***REMOVED*** editor.selectPageUp(); ***REMOVED***,
    readOnly: true
***REMOVED***, ***REMOVED***
    name: "pageup",
    bindKey: bindKey(null, "Option-PageUp"),
    exec: function(editor) ***REMOVED*** editor.scrollPageUp(); ***REMOVED***,
    readOnly: true
***REMOVED***, ***REMOVED***
    name: "gotopageup",
    bindKey: "PageUp",
    exec: function(editor) ***REMOVED*** editor.gotoPageUp(); ***REMOVED***,
    readOnly: true
***REMOVED***, ***REMOVED***
    name: "scrollup",
    bindKey: bindKey("Ctrl-Up", null),
    exec: function(e) ***REMOVED*** e.renderer.scrollBy(0, -2 * e.renderer.layerConfig.lineHeight); ***REMOVED***,
    readOnly: true
***REMOVED***, ***REMOVED***
    name: "scrolldown",
    bindKey: bindKey("Ctrl-Down", null),
    exec: function(e) ***REMOVED*** e.renderer.scrollBy(0, 2 * e.renderer.layerConfig.lineHeight); ***REMOVED***,
    readOnly: true
***REMOVED***, ***REMOVED***
    name: "selectlinestart",
    bindKey: "Shift-Home",
    exec: function(editor) ***REMOVED*** editor.getSelection().selectLineStart(); ***REMOVED***,
    multiSelectAction: "forEach",
    scrollIntoView: "cursor",
    readOnly: true
***REMOVED***, ***REMOVED***
    name: "selectlineend",
    bindKey: "Shift-End",
    exec: function(editor) ***REMOVED*** editor.getSelection().selectLineEnd(); ***REMOVED***,
    multiSelectAction: "forEach",
    scrollIntoView: "cursor",
    readOnly: true
***REMOVED***, ***REMOVED***
    name: "togglerecording",
    bindKey: bindKey("Ctrl-Alt-E", "Command-Option-E"),
    exec: function(editor) ***REMOVED*** editor.commands.toggleRecording(editor); ***REMOVED***,
    readOnly: true
***REMOVED***, ***REMOVED***
    name: "replaymacro",
    bindKey: bindKey("Ctrl-Shift-E", "Command-Shift-E"),
    exec: function(editor) ***REMOVED*** editor.commands.replay(editor); ***REMOVED***,
    readOnly: true
***REMOVED***, ***REMOVED***
    name: "jumptomatching",
    bindKey: bindKey("Ctrl-P", "Ctrl-Shift-P"),
    exec: function(editor) ***REMOVED*** editor.jumpToMatching(); ***REMOVED***,
    multiSelectAction: "forEach",
    readOnly: true
***REMOVED***, ***REMOVED***
    name: "selecttomatching",
    bindKey: bindKey("Ctrl-Shift-P", null),
    exec: function(editor) ***REMOVED*** editor.jumpToMatching(true); ***REMOVED***,
    multiSelectAction: "forEach",
    readOnly: true
***REMOVED***, 
***REMOVED***
    name: "cut",
    exec: function(editor) ***REMOVED***
        var range = editor.getSelectionRange();
        editor._emit("cut", range);

        if (!editor.selection.isEmpty()) ***REMOVED***
            editor.session.remove(range);
            editor.clearSelection();
    ***REMOVED***
***REMOVED***
    scrollIntoView: "cursor",
    multiSelectAction: "forEach"
***REMOVED***, ***REMOVED***
    name: "removeline",
    bindKey: bindKey("Ctrl-D", "Command-D"),
    exec: function(editor) ***REMOVED*** editor.removeLines(); ***REMOVED***,
    scrollIntoView: "cursor",
    multiSelectAction: "forEachLine"
***REMOVED***, ***REMOVED***
    name: "duplicateSelection",
    bindKey: bindKey("Ctrl-Shift-D", "Command-Shift-D"),
    exec: function(editor) ***REMOVED*** editor.duplicateSelection(); ***REMOVED***,
    scrollIntoView: "cursor",
    multiSelectAction: "forEach"
***REMOVED***, ***REMOVED***
    name: "sortlines",
    bindKey: bindKey("Ctrl-Alt-S", "Command-Alt-S"),
    exec: function(editor) ***REMOVED*** editor.sortLines(); ***REMOVED***,
    scrollIntoView: "selection",
    multiSelectAction: "forEachLine"
***REMOVED***, ***REMOVED***
    name: "togglecomment",
    bindKey: bindKey("Ctrl-/", "Command-/"),
    exec: function(editor) ***REMOVED*** editor.toggleCommentLines(); ***REMOVED***,
    multiSelectAction: "forEachLine",
    scrollIntoView: "selectionPart"
***REMOVED***, ***REMOVED***
    name: "toggleBlockComment",
    bindKey: bindKey("Ctrl-Shift-/", "Command-Shift-/"),
    exec: function(editor) ***REMOVED*** editor.toggleBlockComment(); ***REMOVED***,
    multiSelectAction: "forEach",
    scrollIntoView: "selectionPart"
***REMOVED***, ***REMOVED***
    name: "modifyNumberUp",
    bindKey: bindKey("Ctrl-Shift-Up", "Alt-Shift-Up"),
    exec: function(editor) ***REMOVED*** editor.modifyNumber(1); ***REMOVED***,
    multiSelectAction: "forEach"
***REMOVED***, ***REMOVED***
    name: "modifyNumberDown",
    bindKey: bindKey("Ctrl-Shift-Down", "Alt-Shift-Down"),
    exec: function(editor) ***REMOVED*** editor.modifyNumber(-1); ***REMOVED***,
    multiSelectAction: "forEach"
***REMOVED***, ***REMOVED***
    name: "replace",
    bindKey: bindKey("Ctrl-H", "Command-Option-F"),
    exec: function(editor) ***REMOVED***
        config.loadModule("ace/ext/searchbox", function(e) ***REMOVED***e.Search(editor, true)***REMOVED***);
***REMOVED***
***REMOVED***, ***REMOVED***
    name: "undo",
    bindKey: bindKey("Ctrl-Z", "Command-Z"),
    exec: function(editor) ***REMOVED*** editor.undo(); ***REMOVED***
***REMOVED***, ***REMOVED***
    name: "redo",
    bindKey: bindKey("Ctrl-Shift-Z|Ctrl-Y", "Command-Shift-Z|Command-Y"),
    exec: function(editor) ***REMOVED*** editor.redo(); ***REMOVED***
***REMOVED***, ***REMOVED***
    name: "copylinesup",
    bindKey: bindKey("Alt-Shift-Up", "Command-Option-Up"),
    exec: function(editor) ***REMOVED*** editor.copyLinesUp(); ***REMOVED***,
    scrollIntoView: "cursor"
***REMOVED***, ***REMOVED***
    name: "movelinesup",
    bindKey: bindKey("Alt-Up", "Option-Up"),
    exec: function(editor) ***REMOVED*** editor.moveLinesUp(); ***REMOVED***,
    scrollIntoView: "cursor"
***REMOVED***, ***REMOVED***
    name: "copylinesdown",
    bindKey: bindKey("Alt-Shift-Down", "Command-Option-Down"),
    exec: function(editor) ***REMOVED*** editor.copyLinesDown(); ***REMOVED***,
    scrollIntoView: "cursor"
***REMOVED***, ***REMOVED***
    name: "movelinesdown",
    bindKey: bindKey("Alt-Down", "Option-Down"),
    exec: function(editor) ***REMOVED*** editor.moveLinesDown(); ***REMOVED***,
    scrollIntoView: "cursor"
***REMOVED***, ***REMOVED***
    name: "del",
    bindKey: bindKey("Delete", "Delete|Ctrl-D|Shift-Delete"),
    exec: function(editor) ***REMOVED*** editor.remove("right"); ***REMOVED***,
    multiSelectAction: "forEach",
    scrollIntoView: "cursor"
***REMOVED***, ***REMOVED***
    name: "backspace",
    bindKey: bindKey(
        "Shift-Backspace|Backspace",
        "Ctrl-Backspace|Shift-Backspace|Backspace|Ctrl-H"
    ),
    exec: function(editor) ***REMOVED*** editor.remove("left"); ***REMOVED***,
    multiSelectAction: "forEach",
    scrollIntoView: "cursor"
***REMOVED***, ***REMOVED***
    name: "cut_or_delete",
    bindKey: bindKey("Shift-Delete", null),
    exec: function(editor) ***REMOVED*** 
        if (editor.selection.isEmpty()) ***REMOVED***
            editor.remove("left");
    ***REMOVED*** else ***REMOVED***
            return false;
    ***REMOVED***
***REMOVED***
    multiSelectAction: "forEach",
    scrollIntoView: "cursor"
***REMOVED***, ***REMOVED***
    name: "removetolinestart",
    bindKey: bindKey("Alt-Backspace", "Command-Backspace"),
    exec: function(editor) ***REMOVED*** editor.removeToLineStart(); ***REMOVED***,
    multiSelectAction: "forEach",
    scrollIntoView: "cursor"
***REMOVED***, ***REMOVED***
    name: "removetolineend",
    bindKey: bindKey("Alt-Delete", "Ctrl-K"),
    exec: function(editor) ***REMOVED*** editor.removeToLineEnd(); ***REMOVED***,
    multiSelectAction: "forEach",
    scrollIntoView: "cursor"
***REMOVED***, ***REMOVED***
    name: "removewordleft",
    bindKey: bindKey("Ctrl-Backspace", "Alt-Backspace|Ctrl-Alt-Backspace"),
    exec: function(editor) ***REMOVED*** editor.removeWordLeft(); ***REMOVED***,
    multiSelectAction: "forEach",
    scrollIntoView: "cursor"
***REMOVED***, ***REMOVED***
    name: "removewordright",
    bindKey: bindKey("Ctrl-Delete", "Alt-Delete"),
    exec: function(editor) ***REMOVED*** editor.removeWordRight(); ***REMOVED***,
    multiSelectAction: "forEach",
    scrollIntoView: "cursor"
***REMOVED***, ***REMOVED***
    name: "outdent",
    bindKey: bindKey("Shift-Tab", "Shift-Tab"),
    exec: function(editor) ***REMOVED*** editor.blockOutdent(); ***REMOVED***,
    multiSelectAction: "forEach",
    scrollIntoView: "selectionPart"
***REMOVED***, ***REMOVED***
    name: "indent",
    bindKey: bindKey("Tab", "Tab"),
    exec: function(editor) ***REMOVED*** editor.indent(); ***REMOVED***,
    multiSelectAction: "forEach",
    scrollIntoView: "selectionPart"
***REMOVED***, ***REMOVED***
    name: "blockoutdent",
    bindKey: bindKey("Ctrl-[", "Ctrl-["),
    exec: function(editor) ***REMOVED*** editor.blockOutdent(); ***REMOVED***,
    multiSelectAction: "forEachLine",
    scrollIntoView: "selectionPart"
***REMOVED***, ***REMOVED***
    name: "blockindent",
    bindKey: bindKey("Ctrl-]", "Ctrl-]"),
    exec: function(editor) ***REMOVED*** editor.blockIndent(); ***REMOVED***,
    multiSelectAction: "forEachLine",
    scrollIntoView: "selectionPart"
***REMOVED***, ***REMOVED***
    name: "insertstring",
    exec: function(editor, str) ***REMOVED*** editor.insert(str); ***REMOVED***,
    multiSelectAction: "forEach",
    scrollIntoView: "cursor"
***REMOVED***, ***REMOVED***
    name: "inserttext",
    exec: function(editor, args) ***REMOVED***
        editor.insert(lang.stringRepeat(args.text  || "", args.times || 1));
***REMOVED***
    multiSelectAction: "forEach",
    scrollIntoView: "cursor"
***REMOVED***, ***REMOVED***
    name: "splitline",
    bindKey: bindKey(null, "Ctrl-O"),
    exec: function(editor) ***REMOVED*** editor.splitLine(); ***REMOVED***,
    multiSelectAction: "forEach",
    scrollIntoView: "cursor"
***REMOVED***, ***REMOVED***
    name: "transposeletters",
    bindKey: bindKey("Ctrl-T", "Ctrl-T"),
    exec: function(editor) ***REMOVED*** editor.transposeLetters(); ***REMOVED***,
    multiSelectAction: function(editor) ***REMOVED***editor.transposeSelections(1); ***REMOVED***,
    scrollIntoView: "cursor"
***REMOVED***, ***REMOVED***
    name: "touppercase",
    bindKey: bindKey("Ctrl-U", "Ctrl-U"),
    exec: function(editor) ***REMOVED*** editor.toUpperCase(); ***REMOVED***,
    multiSelectAction: "forEach",
    scrollIntoView: "cursor"
***REMOVED***, ***REMOVED***
    name: "tolowercase",
    bindKey: bindKey("Ctrl-Shift-U", "Ctrl-Shift-U"),
    exec: function(editor) ***REMOVED*** editor.toLowerCase(); ***REMOVED***,
    multiSelectAction: "forEach",
    scrollIntoView: "cursor"
***REMOVED***];

***REMOVED***);

__ace_shadowed__.define('ace/undomanager', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***
var UndoManager = function() ***REMOVED***
    this.reset();
***REMOVED***;

(function() ***REMOVED***
    this.execute = function(options) ***REMOVED***
        var deltas = options.args[0];
        this.$doc  = options.args[1];
        if (options.merge && this.hasUndo())***REMOVED***
            this.dirtyCounter--;
            deltas = this.$undoStack.pop().concat(deltas);
    ***REMOVED***
        this.$undoStack.push(deltas);
        this.$redoStack = [];

        if (this.dirtyCounter < 0) ***REMOVED***
            this.dirtyCounter = NaN;
    ***REMOVED***
        this.dirtyCounter++;
***REMOVED***;
    this.undo = function(dontSelect) ***REMOVED***
        var deltas = this.$undoStack.pop();
        var undoSelectionRange = null;
        if (deltas) ***REMOVED***
            undoSelectionRange =
                this.$doc.undoChanges(deltas, dontSelect);
            this.$redoStack.push(deltas);
            this.dirtyCounter--;
    ***REMOVED***

        return undoSelectionRange;
***REMOVED***;
    this.redo = function(dontSelect) ***REMOVED***
        var deltas = this.$redoStack.pop();
        var redoSelectionRange = null;
        if (deltas) ***REMOVED***
            redoSelectionRange =
                this.$doc.redoChanges(deltas, dontSelect);
            this.$undoStack.push(deltas);
            this.dirtyCounter++;
    ***REMOVED***

        return redoSelectionRange;
***REMOVED***;
    this.reset = function() ***REMOVED***
        this.$undoStack = [];
        this.$redoStack = [];
        this.dirtyCounter = 0;
***REMOVED***;
    this.hasUndo = function() ***REMOVED***
        return this.$undoStack.length > 0;
***REMOVED***;
    this.hasRedo = function() ***REMOVED***
        return this.$redoStack.length > 0;
***REMOVED***;
    this.markClean = function() ***REMOVED***
        this.dirtyCounter = 0;
***REMOVED***;
    this.isClean = function() ***REMOVED***
        return this.dirtyCounter === 0;
***REMOVED***;

***REMOVED***).call(UndoManager.prototype);

exports.UndoManager = UndoManager;
***REMOVED***);

__ace_shadowed__.define('ace/virtual_renderer', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/lib/dom', 'ace/config', 'ace/lib/useragent', 'ace/layer/gutter', 'ace/layer/marker', 'ace/layer/text', 'ace/layer/cursor', 'ace/scrollbar', 'ace/renderloop', 'ace/layer/font_metrics', 'ace/lib/event_emitter'], function(require, exports, module) ***REMOVED***


var oop = require("./lib/oop");
var dom = require("./lib/dom");
var config = require("./config");
var useragent = require("./lib/useragent");
var GutterLayer = require("./layer/gutter").Gutter;
var MarkerLayer = require("./layer/marker").Marker;
var TextLayer = require("./layer/text").Text;
var CursorLayer = require("./layer/cursor").Cursor;
var HScrollBar = require("./scrollbar").HScrollBar;
var VScrollBar = require("./scrollbar").VScrollBar;
var RenderLoop = require("./renderloop").RenderLoop;
var FontMetrics = require("./layer/font_metrics").FontMetrics;
var EventEmitter = require("./lib/event_emitter").EventEmitter;
var editorCss = ".ace_editor ***REMOVED***\
position: relative;\
overflow: hidden;\
font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace;\
font-size: 12px;\
line-height: normal;\
direction: ltr;\
***REMOVED***\
.ace_scroller ***REMOVED***\
position: absolute;\
overflow: hidden;\
top: 0;\
bottom: 0;\
background-color: inherit;\
-ms-user-select: none;\
-moz-user-select: none;\
-webkit-user-select: none;\
user-select: none;\
***REMOVED***\
.ace_content ***REMOVED***\
position: absolute;\
-moz-box-sizing: border-box;\
-webkit-box-sizing: border-box;\
box-sizing: border-box;\
cursor: text;\
min-width: 100%;\
***REMOVED***\
.ace_dragging, .ace_dragging * ***REMOVED***\
cursor: move !important;\
***REMOVED***\
.ace_dragging .ace_scroller:before***REMOVED***\
position: absolute;\
top: 0;\
left: 0;\
right: 0;\
bottom: 0;\
content: '';\
background: rgba(250, 250, 250, 0.01);\
z-index: 1000;\
***REMOVED***\
.ace_dragging.ace_dark .ace_scroller:before***REMOVED***\
background: rgba(0, 0, 0, 0.01);\
***REMOVED***\
.ace_selecting, .ace_selecting * ***REMOVED***\
cursor: text !important;\
***REMOVED***\
.ace_gutter ***REMOVED***\
position: absolute;\
overflow : hidden;\
width: auto;\
top: 0;\
bottom: 0;\
left: 0;\
cursor: default;\
z-index: 4;\
-ms-user-select: none;\
-moz-user-select: none;\
-webkit-user-select: none;\
user-select: none;\
***REMOVED***\
.ace_gutter-active-line ***REMOVED***\
position: absolute;\
left: 0;\
right: 0;\
***REMOVED***\
.ace_scroller.ace_scroll-left ***REMOVED***\
box-shadow: 17px 0 16px -16px rgba(0, 0, 0, 0.4) inset;\
***REMOVED***\
.ace_gutter-cell ***REMOVED***\
padding-left: 19px;\
padding-right: 6px;\
background-repeat: no-repeat;\
***REMOVED***\
.ace_gutter-cell.ace_error ***REMOVED***\
background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABOFBMVEX/////////QRswFAb/Ui4wFAYwFAYwFAaWGAfDRymzOSH/PxswFAb/SiUwFAYwFAbUPRvjQiDllog5HhHdRybsTi3/Tyv9Tir+Syj/UC3////XurebMBIwFAb/RSHbPx/gUzfdwL3kzMivKBAwFAbbvbnhPx66NhowFAYwFAaZJg8wFAaxKBDZurf/RB6mMxb/SCMwFAYwFAbxQB3+RB4wFAb/Qhy4Oh+4QifbNRcwFAYwFAYwFAb/QRzdNhgwFAYwFAbav7v/Uy7oaE68MBK5LxLewr/r2NXewLswFAaxJw4wFAbkPRy2PyYwFAaxKhLm1tMwFAazPiQwFAaUGAb/QBrfOx3bvrv/VC/maE4wFAbRPBq6MRO8Qynew8Dp2tjfwb0wFAbx6eju5+by6uns4uH9/f36+vr/GkHjAAAAYnRSTlMAGt+64rnWu/bo8eAA4InH3+DwoN7j4eLi4xP99Nfg4+b+/u9B/eDs1MD1mO7+4PHg2MXa347g7vDizMLN4eG+Pv7i5evs/v79yu7S3/DV7/498Yv24eH+4ufQ3Ozu/v7+y13sRqwAAADLSURBVHjaZc/XDsFgGIBhtDrshlitmk2IrbHFqL2pvXf/+78DPokj7+Fz9qpU/9UXJIlhmPaTaQ6QPaz0mm+5gwkgovcV6GZzd5JtCQwgsxoHOvJO15kleRLAnMgHFIESUEPmawB9ngmelTtipwwfASilxOLyiV5UVUyVAfbG0cCPHig+GBkzAENHS0AstVF6bacZIOzgLmxsHbt2OecNgJC83JERmePUYq8ARGkJx6XtFsdddBQgZE2nPR6CICZhawjA4Fb/chv+399kfR+MMMDGOQAAAABJRU5ErkJggg==\");\
background-repeat: no-repeat;\
background-position: 2px center;\
***REMOVED***\
.ace_gutter-cell.ace_warning ***REMOVED***\
background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAmVBMVEX///8AAAD///8AAAAAAABPSzb/5sAAAAB/blH/73z/ulkAAAAAAAD85pkAAAAAAAACAgP/vGz/rkDerGbGrV7/pkQICAf////e0IsAAAD/oED/qTvhrnUAAAD/yHD/njcAAADuv2r/nz//oTj/p064oGf/zHAAAAA9Nir/tFIAAAD/tlTiuWf/tkIAAACynXEAAAAAAAAtIRW7zBpBAAAAM3RSTlMAABR1m7RXO8Ln31Z36zT+neXe5OzooRDfn+TZ4p3h2hTf4t3k3ucyrN1K5+Xaks52Sfs9CXgrAAAAjklEQVR42o3PbQ+CIBQFYEwboPhSYgoYunIqqLn6/z8uYdH8Vmdnu9vz4WwXgN/xTPRD2+sgOcZjsge/whXZgUaYYvT8QnuJaUrjrHUQreGczuEafQCO/SJTufTbroWsPgsllVhq3wJEk2jUSzX3CUEDJC84707djRc5MTAQxoLgupWRwW6UB5fS++NV8AbOZgnsC7BpEAAAAABJRU5ErkJggg==\");\
background-position: 2px center;\
***REMOVED***\
.ace_gutter-cell.ace_info ***REMOVED***\
background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAAAAAA6mKC9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAJ0Uk5TAAB2k804AAAAPklEQVQY02NgIB68QuO3tiLznjAwpKTgNyDbMegwisCHZUETUZV0ZqOquBpXj2rtnpSJT1AEnnRmL2OgGgAAIKkRQap2htgAAAAASUVORK5CYII=\");\
background-position: 2px center;\
***REMOVED***\
.ace_dark .ace_gutter-cell.ace_info ***REMOVED***\
background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAJFBMVEUAAAChoaGAgIAqKiq+vr6tra1ZWVmUlJSbm5s8PDxubm56enrdgzg3AAAAAXRSTlMAQObYZgAAAClJREFUeNpjYMAPdsMYHegyJZFQBlsUlMFVCWUYKkAZMxZAGdxlDMQBAG+TBP4B6RyJAAAAAElFTkSuQmCC\");\
***REMOVED***\
.ace_scrollbar ***REMOVED***\
position: absolute;\
right: 0;\
bottom: 0;\
z-index: 6;\
***REMOVED***\
.ace_scrollbar-inner ***REMOVED***\
position: absolute;\
cursor: text;\
left: 0;\
top: 0;\
***REMOVED***\
.ace_scrollbar-v***REMOVED***\
overflow-x: hidden;\
overflow-y: scroll;\
top: 0;\
***REMOVED***\
.ace_scrollbar-h ***REMOVED***\
overflow-x: scroll;\
overflow-y: hidden;\
left: 0;\
***REMOVED***\
.ace_print-margin ***REMOVED***\
position: absolute;\
height: 100%;\
***REMOVED***\
.ace_text-input ***REMOVED***\
position: absolute;\
z-index: 0;\
width: 0.5em;\
height: 1em;\
opacity: 0;\
background: transparent;\
-moz-appearance: none;\
appearance: none;\
border: none;\
resize: none;\
outline: none;\
overflow: hidden;\
font: inherit;\
padding: 0 1px;\
margin: 0 -1px;\
text-indent: -1em;\
-ms-user-select: text;\
-moz-user-select: text;\
-webkit-user-select: text;\
user-select: text;\
***REMOVED***\
.ace_text-input.ace_composition ***REMOVED***\
background: #f8f8f8;\
color: #111;\
z-index: 1000;\
opacity: 1;\
text-indent: 0;\
***REMOVED***\
.ace_layer ***REMOVED***\
z-index: 1;\
position: absolute;\
overflow: hidden;\
white-space: pre;\
height: 100%;\
width: 100%;\
-moz-box-sizing: border-box;\
-webkit-box-sizing: border-box;\
box-sizing: border-box;\
/* setting pointer-events: auto; on node under the mouse, which changes\
during scroll, will break mouse wheel scrolling in Safari */\
pointer-events: none;\
***REMOVED***\
.ace_gutter-layer ***REMOVED***\
position: relative;\
width: auto;\
text-align: right;\
pointer-events: auto;\
***REMOVED***\
.ace_text-layer ***REMOVED***\
font: inherit !important;\
***REMOVED***\
.ace_cjk ***REMOVED***\
display: inline-block;\
text-align: center;\
***REMOVED***\
.ace_cursor-layer ***REMOVED***\
z-index: 4;\
***REMOVED***\
.ace_cursor ***REMOVED***\
z-index: 4;\
position: absolute;\
-moz-box-sizing: border-box;\
-webkit-box-sizing: border-box;\
box-sizing: border-box;\
border-left: 2px solid\
***REMOVED***\
.ace_slim-cursors .ace_cursor ***REMOVED***\
border-left-width: 1px;\
***REMOVED***\
.ace_overwrite-cursors .ace_cursor ***REMOVED***\
border-left-width: 0px;\
border-bottom: 1px solid;\
***REMOVED***\
.ace_hidden-cursors .ace_cursor ***REMOVED***\
opacity: 0.2;\
***REMOVED***\
.ace_smooth-blinking .ace_cursor ***REMOVED***\
-moz-transition: opacity 0.18s;\
-webkit-transition: opacity 0.18s;\
-o-transition: opacity 0.18s;\
-ms-transition: opacity 0.18s;\
transition: opacity 0.18s;\
***REMOVED***\
.ace_editor.ace_multiselect .ace_cursor ***REMOVED***\
border-left-width: 1px;\
***REMOVED***\
.ace_marker-layer .ace_step, .ace_marker-layer .ace_stack ***REMOVED***\
position: absolute;\
z-index: 3;\
***REMOVED***\
.ace_marker-layer .ace_selection ***REMOVED***\
position: absolute;\
z-index: 5;\
***REMOVED***\
.ace_marker-layer .ace_bracket ***REMOVED***\
position: absolute;\
z-index: 6;\
***REMOVED***\
.ace_marker-layer .ace_active-line ***REMOVED***\
position: absolute;\
z-index: 2;\
***REMOVED***\
.ace_marker-layer .ace_selected-word ***REMOVED***\
position: absolute;\
z-index: 4;\
-moz-box-sizing: border-box;\
-webkit-box-sizing: border-box;\
box-sizing: border-box;\
***REMOVED***\
.ace_line .ace_fold ***REMOVED***\
-moz-box-sizing: border-box;\
-webkit-box-sizing: border-box;\
box-sizing: border-box;\
display: inline-block;\
height: 11px;\
margin-top: -2px;\
vertical-align: middle;\
background-image:\
url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAJCAYAAADU6McMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJpJREFUeNpi/P//PwOlgAXGYGRklAVSokD8GmjwY1wasKljQpYACtpCFeADcHVQfQyMQAwzwAZI3wJKvCLkfKBaMSClBlR7BOQikCFGQEErIH0VqkabiGCAqwUadAzZJRxQr/0gwiXIal8zQQPnNVTgJ1TdawL0T5gBIP1MUJNhBv2HKoQHHjqNrA4WO4zY0glyNKLT2KIfIMAAQsdgGiXvgnYAAAAASUVORK5CYII=\"),\
url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAA3CAYAAADNNiA5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACJJREFUeNpi+P//fxgTAwPDBxDxD078RSX+YeEyDFMCIMAAI3INmXiwf2YAAAAASUVORK5CYII=\");\
background-repeat: no-repeat, repeat-x;\
background-position: center center, top left;\
color: transparent;\
border: 1px solid black;\
-moz-border-radius: 2px;\
-webkit-border-radius: 2px;\
border-radius: 2px;\
cursor: pointer;\
pointer-events: auto;\
***REMOVED***\
.ace_dark .ace_fold ***REMOVED***\
***REMOVED***\
.ace_fold:hover***REMOVED***\
background-image:\
url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAJCAYAAADU6McMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJpJREFUeNpi/P//PwOlgAXGYGRklAVSokD8GmjwY1wasKljQpYACtpCFeADcHVQfQyMQAwzwAZI3wJKvCLkfKBaMSClBlR7BOQikCFGQEErIH0VqkabiGCAqwUadAzZJRxQr/0gwiXIal8zQQPnNVTgJ1TdawL0T5gBIP1MUJNhBv2HKoQHHjqNrA4WO4zY0glyNKLT2KIfIMAAQsdgGiXvgnYAAAAASUVORK5CYII=\"),\
url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAA3CAYAAADNNiA5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACBJREFUeNpi+P//fz4TAwPDZxDxD5X4i5fLMEwJgAADAEPVDbjNw87ZAAAAAElFTkSuQmCC\");\
***REMOVED***\
.ace_tooltip ***REMOVED***\
background-color: #FFF;\
background-image: -webkit-linear-gradient(top, transparent, rgba(0, 0, 0, 0.1));\
background-image: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.1));\
border: 1px solid gray;\
border-radius: 1px;\
box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);\
color: black;\
display: block;\
max-width: 100%;\
padding: 3px 4px;\
position: fixed;\
z-index: 999999;\
-moz-box-sizing: border-box;\
-webkit-box-sizing: border-box;\
box-sizing: border-box;\
cursor: default;\
white-space: pre;\
word-wrap: break-word;\
line-height: normal;\
font-style: normal;\
font-weight: normal;\
letter-spacing: normal;\
pointer-events: none;\
***REMOVED***\
.ace_folding-enabled > .ace_gutter-cell ***REMOVED***\
padding-right: 13px;\
***REMOVED***\
.ace_fold-widget ***REMOVED***\
-moz-box-sizing: border-box;\
-webkit-box-sizing: border-box;\
box-sizing: border-box;\
margin: 0 -12px 0 1px;\
display: none;\
width: 11px;\
vertical-align: top;\
background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAANElEQVR42mWKsQ0AMAzC8ixLlrzQjzmBiEjp0A6WwBCSPgKAXoLkqSot7nN3yMwR7pZ32NzpKkVoDBUxKAAAAABJRU5ErkJggg==\");\
background-repeat: no-repeat;\
background-position: center;\
border-radius: 3px;\
border: 1px solid transparent;\
cursor: pointer;\
***REMOVED***\
.ace_folding-enabled .ace_fold-widget ***REMOVED***\
display: inline-block;   \
***REMOVED***\
.ace_fold-widget.ace_end ***REMOVED***\
background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAANElEQVR42m3HwQkAMAhD0YzsRchFKI7sAikeWkrxwScEB0nh5e7KTPWimZki4tYfVbX+MNl4pyZXejUO1QAAAABJRU5ErkJggg==\");\
***REMOVED***\
.ace_fold-widget.ace_closed ***REMOVED***\
background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAGCAYAAAAG5SQMAAAAOUlEQVR42jXKwQkAMAgDwKwqKD4EwQ26sSOkVWjgIIHAzPiCgaqiqnJHZnKICBERHN194O5b9vbLuAVRL+l0YWnZAAAAAElFTkSuQmCCXA==\");\
***REMOVED***\
.ace_fold-widget:hover ***REMOVED***\
border: 1px solid rgba(0, 0, 0, 0.3);\
background-color: rgba(255, 255, 255, 0.2);\
-moz-box-shadow: 0 1px 1px rgba(255, 255, 255, 0.7);\
-webkit-box-shadow: 0 1px 1px rgba(255, 255, 255, 0.7);\
box-shadow: 0 1px 1px rgba(255, 255, 255, 0.7);\
***REMOVED***\
.ace_fold-widget:active ***REMOVED***\
border: 1px solid rgba(0, 0, 0, 0.4);\
background-color: rgba(0, 0, 0, 0.05);\
-moz-box-shadow: 0 1px 1px rgba(255, 255, 255, 0.8);\
-webkit-box-shadow: 0 1px 1px rgba(255, 255, 255, 0.8);\
box-shadow: 0 1px 1px rgba(255, 255, 255, 0.8);\
***REMOVED***\
/**\
* Dark version for fold widgets\
*/\
.ace_dark .ace_fold-widget ***REMOVED***\
background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHklEQVQIW2P4//8/AzoGEQ7oGCaLLAhWiSwB146BAQCSTPYocqT0AAAAAElFTkSuQmCC\");\
***REMOVED***\
.ace_dark .ace_fold-widget.ace_end ***REMOVED***\
background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAH0lEQVQIW2P4//8/AxQ7wNjIAjDMgC4AxjCVKBirIAAF0kz2rlhxpAAAAABJRU5ErkJggg==\");\
***REMOVED***\
.ace_dark .ace_fold-widget.ace_closed ***REMOVED***\
background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAHElEQVQIW2P4//+/AxAzgDADlOOAznHAKgPWAwARji8UIDTfQQAAAABJRU5ErkJggg==\");\
***REMOVED***\
.ace_dark .ace_fold-widget:hover ***REMOVED***\
box-shadow: 0 1px 1px rgba(255, 255, 255, 0.2);\
background-color: rgba(255, 255, 255, 0.1);\
***REMOVED***\
.ace_dark .ace_fold-widget:active ***REMOVED***\
-moz-box-shadow: 0 1px 1px rgba(255, 255, 255, 0.2);\
-webkit-box-shadow: 0 1px 1px rgba(255, 255, 255, 0.2);\
box-shadow: 0 1px 1px rgba(255, 255, 255, 0.2);\
***REMOVED***\
.ace_fold-widget.ace_invalid ***REMOVED***\
background-color: #FFB4B4;\
border-color: #DE5555;\
***REMOVED***\
.ace_fade-fold-widgets .ace_fold-widget ***REMOVED***\
-moz-transition: opacity 0.4s ease 0.05s;\
-webkit-transition: opacity 0.4s ease 0.05s;\
-o-transition: opacity 0.4s ease 0.05s;\
-ms-transition: opacity 0.4s ease 0.05s;\
transition: opacity 0.4s ease 0.05s;\
opacity: 0;\
***REMOVED***\
.ace_fade-fold-widgets:hover .ace_fold-widget ***REMOVED***\
-moz-transition: opacity 0.05s ease 0.05s;\
-webkit-transition: opacity 0.05s ease 0.05s;\
-o-transition: opacity 0.05s ease 0.05s;\
-ms-transition: opacity 0.05s ease 0.05s;\
transition: opacity 0.05s ease 0.05s;\
opacity:1;\
***REMOVED***\
.ace_underline ***REMOVED***\
text-decoration: underline;\
***REMOVED***\
.ace_bold ***REMOVED***\
font-weight: bold;\
***REMOVED***\
.ace_nobold .ace_bold ***REMOVED***\
font-weight: normal;\
***REMOVED***\
.ace_italic ***REMOVED***\
font-style: italic;\
***REMOVED***\
.ace_error-marker ***REMOVED***\
background-color: rgba(255, 0, 0,0.2);\
position: absolute;\
z-index: 9;\
***REMOVED***\
.ace_highlight-marker ***REMOVED***\
background-color: rgba(255, 255, 0,0.2);\
position: absolute;\
z-index: 8;\
***REMOVED***\
";

dom.importCssString(editorCss, "ace_editor");

var VirtualRenderer = function(container, theme) ***REMOVED***
    var _self = this;

    this.container = container || dom.createElement("div");
    this.$keepTextAreaAtCursor = !useragent.isOldIE;

    dom.addCssClass(this.container, "ace_editor");

    this.setTheme(theme);

    this.$gutter = dom.createElement("div");
    this.$gutter.className = "ace_gutter";
    this.container.appendChild(this.$gutter);

    this.scroller = dom.createElement("div");
    this.scroller.className = "ace_scroller";
    this.container.appendChild(this.scroller);

    this.content = dom.createElement("div");
    this.content.className = "ace_content";
    this.scroller.appendChild(this.content);

    this.$gutterLayer = new GutterLayer(this.$gutter);
    this.$gutterLayer.on("changeGutterWidth", this.onGutterResize.bind(this));

    this.$markerBack = new MarkerLayer(this.content);

    var textLayer = this.$textLayer = new TextLayer(this.content);
    this.canvas = textLayer.element;

    this.$markerFront = new MarkerLayer(this.content);

    this.$cursorLayer = new CursorLayer(this.content);
    this.$horizScroll = false;
    this.$vScroll = false;

    this.scrollBar = 
    this.scrollBarV = new VScrollBar(this.container, this);
    this.scrollBarH = new HScrollBar(this.container, this);
    this.scrollBarV.addEventListener("scroll", function(e) ***REMOVED***
        if (!_self.$scrollAnimation)
            _self.session.setScrollTop(e.data - _self.scrollMargin.top);
***REMOVED***);
    this.scrollBarH.addEventListener("scroll", function(e) ***REMOVED***
        if (!_self.$scrollAnimation)
            _self.session.setScrollLeft(e.data - _self.scrollMargin.left);
***REMOVED***);

    this.scrollTop = 0;
    this.scrollLeft = 0;

    this.cursorPos = ***REMOVED***
        row : 0,
        column : 0
***REMOVED***;

    this.$fontMetrics = new FontMetrics(this.container, 500);
    this.$textLayer.$setFontMetrics(this.$fontMetrics);
    this.$textLayer.addEventListener("changeCharacterSize", function(e) ***REMOVED***
        _self.updateCharacterSize();
        _self.onResize(true, _self.gutterWidth, _self.$size.width, _self.$size.height);
        _self._signal("changeCharacterSize", e);
***REMOVED***);

    this.$size = ***REMOVED***
        width: 0,
        height: 0,
        scrollerHeight: 0,
        scrollerWidth: 0,
        $dirty: true
***REMOVED***;

    this.layerConfig = ***REMOVED***
        width : 1,
        padding : 0,
        firstRow : 0,
        firstRowScreen: 0,
        lastRow : 0,
        lineHeight : 0,
        characterWidth : 0,
        minHeight : 1,
        maxHeight : 1,
        offset : 0,
        height : 1,
        gutterOffset: 1
***REMOVED***;
    
    this.scrollMargin = ***REMOVED***
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        v: 0,
        h: 0
***REMOVED***;

    this.$loop = new RenderLoop(
        this.$renderChanges.bind(this),
        this.container.ownerDocument.defaultView
    );
    this.$loop.schedule(this.CHANGE_FULL);

    this.updateCharacterSize();
    this.setPadding(4);
    config.resetOptions(this);
    config._emit("renderer", this);
***REMOVED***;

(function() ***REMOVED***

    this.CHANGE_CURSOR = 1;
    this.CHANGE_MARKER = 2;
    this.CHANGE_GUTTER = 4;
    this.CHANGE_SCROLL = 8;
    this.CHANGE_LINES = 16;
    this.CHANGE_TEXT = 32;
    this.CHANGE_SIZE = 64;
    this.CHANGE_MARKER_BACK = 128;
    this.CHANGE_MARKER_FRONT = 256;
    this.CHANGE_FULL = 512;
    this.CHANGE_H_SCROLL = 1024;

    oop.implement(this, EventEmitter);

    this.updateCharacterSize = function() ***REMOVED***
        if (this.$textLayer.allowBoldFonts != this.$allowBoldFonts) ***REMOVED***
            this.$allowBoldFonts = this.$textLayer.allowBoldFonts;
            this.setStyle("ace_nobold", !this.$allowBoldFonts);
    ***REMOVED***

        this.layerConfig.characterWidth =
        this.characterWidth = this.$textLayer.getCharacterWidth();
        this.layerConfig.lineHeight =
        this.lineHeight = this.$textLayer.getLineHeight();
        this.$updatePrintMargin();
***REMOVED***;
    this.setSession = function(session) ***REMOVED***
        if (this.session)
            this.session.doc.off("changeNewLineMode", this.onChangeNewLineMode);
            
        this.session = session;
        if (!session)
            return;
            
        if (this.scrollMargin.top && session.getScrollTop() <= 0)
            session.setScrollTop(-this.scrollMargin.top);

        this.$cursorLayer.setSession(session);
        this.$markerBack.setSession(session);
        this.$markerFront.setSession(session);
        this.$gutterLayer.setSession(session);
        this.$textLayer.setSession(session);
        this.$loop.schedule(this.CHANGE_FULL);
        this.session.$setFontMetrics(this.$fontMetrics);
        
        this.onChangeNewLineMode = this.onChangeNewLineMode.bind(this);
        this.onChangeNewLineMode()
        this.session.doc.on("changeNewLineMode", this.onChangeNewLineMode);
***REMOVED***;
    this.updateLines = function(firstRow, lastRow) ***REMOVED***
        if (lastRow === undefined)
            lastRow = Infinity;

        if (!this.$changedLines) ***REMOVED***
            this.$changedLines = ***REMOVED***
                firstRow: firstRow,
                lastRow: lastRow
        ***REMOVED***;
    ***REMOVED***
        else ***REMOVED***
            if (this.$changedLines.firstRow > firstRow)
                this.$changedLines.firstRow = firstRow;

            if (this.$changedLines.lastRow < lastRow)
                this.$changedLines.lastRow = lastRow;
    ***REMOVED***

        if (this.$changedLines.firstRow > this.layerConfig.lastRow ||
            this.$changedLines.lastRow < this.layerConfig.firstRow)
            return;
        this.$loop.schedule(this.CHANGE_LINES);
***REMOVED***;

    this.onChangeNewLineMode = function() ***REMOVED***
        this.$loop.schedule(this.CHANGE_TEXT);
        this.$textLayer.$updateEolChar();
***REMOVED***;
    
    this.onChangeTabSize = function() ***REMOVED***
        this.$loop.schedule(this.CHANGE_TEXT | this.CHANGE_MARKER);
        this.$textLayer.onChangeTabSize();
***REMOVED***;
    this.updateText = function() ***REMOVED***
        this.$loop.schedule(this.CHANGE_TEXT);
***REMOVED***;
    this.updateFull = function(force) ***REMOVED***
        if (force)
            this.$renderChanges(this.CHANGE_FULL, true);
        else
            this.$loop.schedule(this.CHANGE_FULL);
***REMOVED***;
    this.updateFontSize = function() ***REMOVED***
        this.$textLayer.checkForSizeChanges();
***REMOVED***;

    this.$changes = 0;
    this.$updateSizeAsync = function() ***REMOVED***
        if (this.$loop.pending)
            this.$size.$dirty = true;
        else
            this.onResize();
***REMOVED***;
    this.onResize = function(force, gutterWidth, width, height) ***REMOVED***
        if (this.resizing > 2)
            return;
        else if (this.resizing > 0)
            this.resizing++;
        else
            this.resizing = force ? 1 : 0;
        var el = this.container;
        if (!height)
            height = el.clientHeight || el.scrollHeight;
        if (!width)
            width = el.clientWidth || el.scrollWidth;
        var changes = this.$updateCachedSize(force, gutterWidth, width, height);
        
        if (!this.$size.scrollerHeight || (!width && !height))
            return this.resizing = 0;

        if (force)
            this.$gutterLayer.$padding = null;

        if (force)
            this.$renderChanges(changes | this.$changes, true);
        else
            this.$loop.schedule(changes | this.$changes);

        if (this.resizing)
            this.resizing = 0;
***REMOVED***;
    
    this.$updateCachedSize = function(force, gutterWidth, width, height) ***REMOVED***
        height -= (this.$extraHeight || 0);
        var changes = 0;
        var size = this.$size;
        var oldSize = ***REMOVED***
            width: size.width,
            height: size.height,
            scrollerHeight: size.scrollerHeight,
            scrollerWidth: size.scrollerWidth
    ***REMOVED***;
        if (height && (force || size.height != height)) ***REMOVED***
            size.height = height;
            changes |= this.CHANGE_SIZE;

            size.scrollerHeight = size.height;
            if (this.$horizScroll)
                size.scrollerHeight -= this.scrollBarH.getHeight();
            this.scrollBarV.element.style.bottom = this.scrollBarH.getHeight() + "px";

            changes = changes | this.CHANGE_SCROLL;
    ***REMOVED***

        if (width && (force || size.width != width)) ***REMOVED***
            changes |= this.CHANGE_SIZE;
            size.width = width;
            
            if (gutterWidth == null)
                gutterWidth = this.$showGutter ? this.$gutter.offsetWidth : 0;
            
            this.gutterWidth = gutterWidth;
            
            this.scrollBarH.element.style.left = 
            this.scroller.style.left = gutterWidth + "px";
            size.scrollerWidth = Math.max(0, width - gutterWidth - this.scrollBarV.getWidth());           
            
            this.scrollBarH.element.style.right = 
            this.scroller.style.right = this.scrollBarV.getWidth() + "px";
            this.scroller.style.bottom = this.scrollBarH.getHeight() + "px";

            if (this.session && this.session.getUseWrapMode() && this.adjustWrapLimit() || force)
                changes |= this.CHANGE_FULL;
    ***REMOVED***
        
        size.$dirty = !width || !height;

        if (changes)
            this._signal("resize", oldSize);

        return changes;
***REMOVED***;

    this.onGutterResize = function() ***REMOVED***
        var gutterWidth = this.$showGutter ? this.$gutter.offsetWidth : 0;
        if (gutterWidth != this.gutterWidth)
            this.$changes |= this.$updateCachedSize(true, gutterWidth, this.$size.width, this.$size.height);

        if (this.session.getUseWrapMode() && this.adjustWrapLimit()) ***REMOVED***
            this.$loop.schedule(this.CHANGE_FULL);
    ***REMOVED*** else if (this.$size.$dirty) ***REMOVED***
            this.$loop.schedule(this.CHANGE_FULL);
    ***REMOVED*** else ***REMOVED***
            this.$computeLayerConfig();
            this.$loop.schedule(this.CHANGE_MARKER);
    ***REMOVED***
***REMOVED***;
    this.adjustWrapLimit = function() ***REMOVED***
        var availableWidth = this.$size.scrollerWidth - this.$padding * 2;
        var limit = Math.floor(availableWidth / this.characterWidth);
        return this.session.adjustWrapLimit(limit, this.$showPrintMargin && this.$printMarginColumn);
***REMOVED***;
    this.setAnimatedScroll = function(shouldAnimate)***REMOVED***
        this.setOption("animatedScroll", shouldAnimate);
***REMOVED***;
    this.getAnimatedScroll = function() ***REMOVED***
        return this.$animatedScroll;
***REMOVED***;
    this.setShowInvisibles = function(showInvisibles) ***REMOVED***
        this.setOption("showInvisibles", showInvisibles);
***REMOVED***;
    this.getShowInvisibles = function() ***REMOVED***
        return this.getOption("showInvisibles");
***REMOVED***;
    this.getDisplayIndentGuides = function() ***REMOVED***
        return this.getOption("displayIndentGuides");
***REMOVED***;

    this.setDisplayIndentGuides = function(display) ***REMOVED***
        this.setOption("displayIndentGuides", display);
***REMOVED***;
    this.setShowPrintMargin = function(showPrintMargin) ***REMOVED***
        this.setOption("showPrintMargin", showPrintMargin);
***REMOVED***;
    this.getShowPrintMargin = function() ***REMOVED***
        return this.getOption("showPrintMargin");
***REMOVED***;
    this.setPrintMarginColumn = function(showPrintMargin) ***REMOVED***
        this.setOption("printMarginColumn", showPrintMargin);
***REMOVED***;
    this.getPrintMarginColumn = function() ***REMOVED***
        return this.getOption("printMarginColumn");
***REMOVED***;
    this.getShowGutter = function()***REMOVED***
        return this.getOption("showGutter");
***REMOVED***;
    this.setShowGutter = function(show)***REMOVED***
        return this.setOption("showGutter", show);
***REMOVED***;

    this.getFadeFoldWidgets = function()***REMOVED***
        return this.getOption("fadeFoldWidgets")
***REMOVED***;

    this.setFadeFoldWidgets = function(show) ***REMOVED***
        this.setOption("fadeFoldWidgets", show);
***REMOVED***;

    this.setHighlightGutterLine = function(shouldHighlight) ***REMOVED***
        this.setOption("highlightGutterLine", shouldHighlight);
***REMOVED***;

    this.getHighlightGutterLine = function() ***REMOVED***
        return this.getOption("highlightGutterLine");
***REMOVED***;

    this.$updateGutterLineHighlight = function() ***REMOVED***
        var pos = this.$cursorLayer.$pixelPos;
        var height = this.layerConfig.lineHeight;
        if (this.session.getUseWrapMode()) ***REMOVED***
            var cursor = this.session.selection.getCursor();
            cursor.column = 0;
            pos = this.$cursorLayer.getPixelPosition(cursor, true);
            height *= this.session.getRowLength(cursor.row);
    ***REMOVED***
        this.$gutterLineHighlight.style.top = pos.top - this.layerConfig.offset + "px";
        this.$gutterLineHighlight.style.height = height + "px";
***REMOVED***;

    this.$updatePrintMargin = function() ***REMOVED***
        if (!this.$showPrintMargin && !this.$printMarginEl)
            return;

        if (!this.$printMarginEl) ***REMOVED***
            var containerEl = dom.createElement("div");
            containerEl.className = "ace_layer ace_print-margin-layer";
            this.$printMarginEl = dom.createElement("div");
            this.$printMarginEl.className = "ace_print-margin";
            containerEl.appendChild(this.$printMarginEl);
            this.content.insertBefore(containerEl, this.content.firstChild);
    ***REMOVED***

        var style = this.$printMarginEl.style;
        style.left = ((this.characterWidth * this.$printMarginColumn) + this.$padding) + "px";
        style.visibility = this.$showPrintMargin ? "visible" : "hidden";
        
        if (this.session && this.session.$wrap == -1)
            this.adjustWrapLimit();
***REMOVED***;
    this.getContainerElement = function() ***REMOVED***
        return this.container;
***REMOVED***;
    this.getMouseEventTarget = function() ***REMOVED***
        return this.content;
***REMOVED***;
    this.getTextAreaContainer = function() ***REMOVED***
        return this.container;
***REMOVED***;
    this.$moveTextAreaToCursor = function() ***REMOVED***
        if (!this.$keepTextAreaAtCursor)
            return;
        var config = this.layerConfig;
        var posTop = this.$cursorLayer.$pixelPos.top;
        var posLeft = this.$cursorLayer.$pixelPos.left;
        posTop -= config.offset;

        var h = this.lineHeight;
        if (posTop < 0 || posTop > config.height - h)
            return;

        var w = this.characterWidth;
        if (this.$composition) ***REMOVED***
            var val = this.textarea.value.replace(/^\x01+/, "");
            w *= (this.session.$getStringScreenWidth(val)[0]+2);
            h += 2;
            posTop -= 1;
    ***REMOVED***
        posLeft -= this.scrollLeft;
        if (posLeft > this.$size.scrollerWidth - w)
            posLeft = this.$size.scrollerWidth - w;

        posLeft -= this.scrollBar.width;

        this.textarea.style.height = h + "px";
        this.textarea.style.width = w + "px";
        this.textarea.style.right = Math.max(0, this.$size.scrollerWidth - posLeft - w) + "px";
        this.textarea.style.bottom = Math.max(0, this.$size.height - posTop - h) + "px";
***REMOVED***;
    this.getFirstVisibleRow = function() ***REMOVED***
        return this.layerConfig.firstRow;
***REMOVED***;
    this.getFirstFullyVisibleRow = function() ***REMOVED***
        return this.layerConfig.firstRow + (this.layerConfig.offset === 0 ? 0 : 1);
***REMOVED***;
    this.getLastFullyVisibleRow = function() ***REMOVED***
        var flint = Math.floor((this.layerConfig.height + this.layerConfig.offset) / this.layerConfig.lineHeight);
        return this.layerConfig.firstRow - 1 + flint;
***REMOVED***;
    this.getLastVisibleRow = function() ***REMOVED***
        return this.layerConfig.lastRow;
***REMOVED***;

    this.$padding = null;
    this.setPadding = function(padding) ***REMOVED***
        this.$padding = padding;
        this.$textLayer.setPadding(padding);
        this.$cursorLayer.setPadding(padding);
        this.$markerFront.setPadding(padding);
        this.$markerBack.setPadding(padding);
        this.$loop.schedule(this.CHANGE_FULL);
        this.$updatePrintMargin();
***REMOVED***;
    
    this.setScrollMargin = function(top, bottom, left, right) ***REMOVED***
        var sm = this.scrollMargin;
        sm.top = top|0;
        sm.bottom = bottom|0;
        sm.right = right|0;
        sm.left = left|0;
        sm.v = sm.top + sm.bottom;
        sm.h = sm.left + sm.right;
        if (sm.top && this.scrollTop <= 0 && this.session)
            this.session.setScrollTop(-sm.top);
        this.updateFull();
***REMOVED***;
    this.getHScrollBarAlwaysVisible = function() ***REMOVED***
        return this.$hScrollBarAlwaysVisible;
***REMOVED***;
    this.setHScrollBarAlwaysVisible = function(alwaysVisible) ***REMOVED***
        this.setOption("hScrollBarAlwaysVisible", alwaysVisible);
***REMOVED***;
    this.getVScrollBarAlwaysVisible = function() ***REMOVED***
        return this.$hScrollBarAlwaysVisible;
***REMOVED***;
    this.setVScrollBarAlwaysVisible = function(alwaysVisible) ***REMOVED***
        this.setOption("vScrollBarAlwaysVisible", alwaysVisible);
***REMOVED***;

    this.$updateScrollBarV = function() ***REMOVED***
        this.scrollBarV.setScrollHeight(this.layerConfig.maxHeight + this.scrollMargin.v);
        this.scrollBarV.setScrollTop(this.scrollTop + this.scrollMargin.top);
***REMOVED***;
    this.$updateScrollBarH = function() ***REMOVED***
        this.scrollBarH.setScrollWidth(this.layerConfig.width + 2 * this.$padding + this.scrollMargin.h);
        this.scrollBarH.setScrollLeft(this.scrollLeft + this.scrollMargin.left);
***REMOVED***;
    
    this.$frozen = false;
    this.freeze = function() ***REMOVED***
        this.$frozen = true;
***REMOVED***;
    
    this.unfreeze = function() ***REMOVED***
        this.$frozen = false;
***REMOVED***;

    this.$renderChanges = function(changes, force) ***REMOVED***
        if (this.$changes) ***REMOVED***
            changes |= this.$changes;
            this.$changes = 0;
    ***REMOVED***
        if ((!this.session || !this.container.offsetWidth || this.$frozen) || (!changes && !force)) ***REMOVED***
            this.$changes |= changes;
            return; 
    ***REMOVED*** 
        if (this.$size.$dirty) ***REMOVED***
            this.$changes |= changes;
            return this.onResize(true);
    ***REMOVED***
        if (!this.lineHeight) ***REMOVED***
            this.$textLayer.checkForSizeChanges();
    ***REMOVED***
        
        this._signal("beforeRender");
        var config = this.layerConfig;
        if (changes & this.CHANGE_FULL ||
            changes & this.CHANGE_SIZE ||
            changes & this.CHANGE_TEXT ||
            changes & this.CHANGE_LINES ||
            changes & this.CHANGE_SCROLL ||
            changes & this.CHANGE_H_SCROLL
        ) ***REMOVED***
            changes |= this.$computeLayerConfig();
            config = this.layerConfig;
            this.$updateScrollBarV();
            if (changes & this.CHANGE_H_SCROLL)
                this.$updateScrollBarH();
            this.$gutterLayer.element.style.marginTop = (-config.offset) + "px";
            this.content.style.marginTop = (-config.offset) + "px";
            this.content.style.width = config.width + 2 * this.$padding + "px";
            this.content.style.height = config.minHeight + "px";
    ***REMOVED***
        if (changes & this.CHANGE_H_SCROLL) ***REMOVED***
            this.content.style.marginLeft = -this.scrollLeft + "px";
            this.scroller.className = this.scrollLeft <= 0 ? "ace_scroller" : "ace_scroller ace_scroll-left";
    ***REMOVED***
        if (changes & this.CHANGE_FULL) ***REMOVED***
            this.$textLayer.update(config);
            if (this.$showGutter)
                this.$gutterLayer.update(config);
            this.$markerBack.update(config);
            this.$markerFront.update(config);
            this.$cursorLayer.update(config);
            this.$moveTextAreaToCursor();
            this.$highlightGutterLine && this.$updateGutterLineHighlight();
            this._signal("afterRender");
            return;
    ***REMOVED***
        if (changes & this.CHANGE_SCROLL) ***REMOVED***
            if (changes & this.CHANGE_TEXT || changes & this.CHANGE_LINES)
                this.$textLayer.update(config);
            else
                this.$textLayer.scrollLines(config);

            if (this.$showGutter)
                this.$gutterLayer.update(config);
            this.$markerBack.update(config);
            this.$markerFront.update(config);
            this.$cursorLayer.update(config);
            this.$highlightGutterLine && this.$updateGutterLineHighlight();
            this.$moveTextAreaToCursor();
            this._signal("afterRender");
            return;
    ***REMOVED***

        if (changes & this.CHANGE_TEXT) ***REMOVED***
            this.$textLayer.update(config);
            if (this.$showGutter)
                this.$gutterLayer.update(config);
    ***REMOVED***
        else if (changes & this.CHANGE_LINES) ***REMOVED***
            if (this.$updateLines() || (changes & this.CHANGE_GUTTER) && this.$showGutter)
                this.$gutterLayer.update(config);
    ***REMOVED***
        else if (changes & this.CHANGE_TEXT || changes & this.CHANGE_GUTTER) ***REMOVED***
            if (this.$showGutter)
                this.$gutterLayer.update(config);
    ***REMOVED***

        if (changes & this.CHANGE_CURSOR) ***REMOVED***
            this.$cursorLayer.update(config);
            this.$moveTextAreaToCursor();
            this.$highlightGutterLine && this.$updateGutterLineHighlight();
    ***REMOVED***

        if (changes & (this.CHANGE_MARKER | this.CHANGE_MARKER_FRONT)) ***REMOVED***
            this.$markerFront.update(config);
    ***REMOVED***

        if (changes & (this.CHANGE_MARKER | this.CHANGE_MARKER_BACK)) ***REMOVED***
            this.$markerBack.update(config);
    ***REMOVED***

        this._signal("afterRender");
***REMOVED***;

    
    this.$autosize = function() ***REMOVED***
        var height = this.session.getScreenLength() * this.lineHeight;
        var maxHeight = this.$maxLines * this.lineHeight;
        var desiredHeight = Math.max(
            (this.$minLines||1) * this.lineHeight,
            Math.min(maxHeight, height)
        ) + this.scrollMargin.v + (this.$extraHeight || 0);
        var vScroll = height > maxHeight;
        
        if (desiredHeight != this.desiredHeight ||
            this.$size.height != this.desiredHeight || vScroll != this.$vScroll) ***REMOVED***
            if (vScroll != this.$vScroll) ***REMOVED***
                this.$vScroll = vScroll;
                this.scrollBarV.setVisible(vScroll);
        ***REMOVED***
            
            var w = this.container.clientWidth;
            this.container.style.height = desiredHeight + "px";
            this.$updateCachedSize(true, this.$gutterWidth, w, desiredHeight);
            this.desiredHeight = desiredHeight;
    ***REMOVED***
***REMOVED***;
    
    this.$computeLayerConfig = function() ***REMOVED***
        if (this.$maxLines && this.lineHeight > 1)
            this.$autosize();

        var session = this.session;
        var size = this.$size;
        
        var hideScrollbars = size.height <= 2 * this.lineHeight;
        var screenLines = this.session.getScreenLength();
        var maxHeight = screenLines * this.lineHeight;

        var offset = this.scrollTop % this.lineHeight;
        var minHeight = size.scrollerHeight + this.lineHeight;

        var longestLine = this.$getLongestLine();
        
        var horizScroll = !hideScrollbars && (this.$hScrollBarAlwaysVisible ||
            size.scrollerWidth - longestLine - 2 * this.$padding < 0);

        var hScrollChanged = this.$horizScroll !== horizScroll;
        if (hScrollChanged) ***REMOVED***
            this.$horizScroll = horizScroll;
            this.scrollBarH.setVisible(horizScroll);
    ***REMOVED***
        
        if (!this.$maxLines && this.$scrollPastEnd) ***REMOVED***
            if (this.scrollTop > maxHeight - size.scrollerHeight)
                maxHeight += Math.min(
                    (size.scrollerHeight - this.lineHeight) * this.$scrollPastEnd,
                    this.scrollTop - maxHeight + size.scrollerHeight
                );
    ***REMOVED***
        
        var vScroll = !hideScrollbars && (this.$vScrollBarAlwaysVisible ||
            size.scrollerHeight - maxHeight < 0);
        var vScrollChanged = this.$vScroll !== vScroll;
        if (vScrollChanged) ***REMOVED***
            this.$vScroll = vScroll;
            this.scrollBarV.setVisible(vScroll);
    ***REMOVED***
        
        this.session.setScrollTop(Math.max(-this.scrollMargin.top,
            Math.min(this.scrollTop, maxHeight - size.scrollerHeight + this.scrollMargin.bottom)));

        this.session.setScrollLeft(Math.max(-this.scrollMargin.left, Math.min(this.scrollLeft, 
            longestLine + 2 * this.$padding - size.scrollerWidth + this.scrollMargin.right)));

        var lineCount = Math.ceil(minHeight / this.lineHeight) - 1;
        var firstRow = Math.max(0, Math.round((this.scrollTop - offset) / this.lineHeight));
        var lastRow = firstRow + lineCount;
        var firstRowScreen, firstRowHeight;
        var lineHeight = this.lineHeight;
        firstRow = session.screenToDocumentRow(firstRow, 0);
        var foldLine = session.getFoldLine(firstRow);
        if (foldLine) ***REMOVED***
            firstRow = foldLine.start.row;
    ***REMOVED***

        firstRowScreen = session.documentToScreenRow(firstRow, 0);
        firstRowHeight = session.getRowLength(firstRow) * lineHeight;

        lastRow = Math.min(session.screenToDocumentRow(lastRow, 0), session.getLength() - 1);
        minHeight = size.scrollerHeight + session.getRowLength(lastRow) * lineHeight +
                                                firstRowHeight;

        offset = this.scrollTop - firstRowScreen * lineHeight;

        var changes = 0;
        if (this.layerConfig.width != longestLine) 
            changes = this.CHANGE_H_SCROLL;
        if (hScrollChanged || vScrollChanged) ***REMOVED***
            changes = this.$updateCachedSize(true, this.gutterWidth, size.width, size.height);
            this._signal("scrollbarVisibilityChanged");
            if (vScrollChanged)
                longestLine = this.$getLongestLine();
    ***REMOVED***
        
        this.layerConfig = ***REMOVED***
            width : longestLine,
            padding : this.$padding,
            firstRow : firstRow,
            firstRowScreen: firstRowScreen,
            lastRow : lastRow,
            lineHeight : lineHeight,
            characterWidth : this.characterWidth,
            minHeight : minHeight,
            maxHeight : maxHeight,
            offset : offset,
            gutterOffset : Math.max(0, Math.ceil((offset + size.height - size.scrollerHeight) / lineHeight)),
            height : this.$size.scrollerHeight
    ***REMOVED***;

        return changes;
***REMOVED***;

    this.$updateLines = function() ***REMOVED***
        var firstRow = this.$changedLines.firstRow;
        var lastRow = this.$changedLines.lastRow;
        this.$changedLines = null;

        var layerConfig = this.layerConfig;

        if (firstRow > layerConfig.lastRow + 1) ***REMOVED*** return; ***REMOVED***
        if (lastRow < layerConfig.firstRow) ***REMOVED*** return; ***REMOVED***
        if (lastRow === Infinity) ***REMOVED***
            if (this.$showGutter)
                this.$gutterLayer.update(layerConfig);
            this.$textLayer.update(layerConfig);
            return;
    ***REMOVED***
        this.$textLayer.updateLines(layerConfig, firstRow, lastRow);
        return true;
***REMOVED***;

    this.$getLongestLine = function() ***REMOVED***
        var charCount = this.session.getScreenWidth();
        if (this.showInvisibles && !this.session.$useWrapMode)
            charCount += 1;

        return Math.max(this.$size.scrollerWidth - 2 * this.$padding, Math.round(charCount * this.characterWidth));
***REMOVED***;
    this.updateFrontMarkers = function() ***REMOVED***
        this.$markerFront.setMarkers(this.session.getMarkers(true));
        this.$loop.schedule(this.CHANGE_MARKER_FRONT);
***REMOVED***;
    this.updateBackMarkers = function() ***REMOVED***
        this.$markerBack.setMarkers(this.session.getMarkers());
        this.$loop.schedule(this.CHANGE_MARKER_BACK);
***REMOVED***;
    this.addGutterDecoration = function(row, className)***REMOVED***
        this.$gutterLayer.addGutterDecoration(row, className);
***REMOVED***;
    this.removeGutterDecoration = function(row, className)***REMOVED***
        this.$gutterLayer.removeGutterDecoration(row, className);
***REMOVED***;
    this.updateBreakpoints = function(rows) ***REMOVED***
        this.$loop.schedule(this.CHANGE_GUTTER);
***REMOVED***;
    this.setAnnotations = function(annotations) ***REMOVED***
        this.$gutterLayer.setAnnotations(annotations);
        this.$loop.schedule(this.CHANGE_GUTTER);
***REMOVED***;
    this.updateCursor = function() ***REMOVED***
        this.$loop.schedule(this.CHANGE_CURSOR);
***REMOVED***;
    this.hideCursor = function() ***REMOVED***
        this.$cursorLayer.hideCursor();
***REMOVED***;
    this.showCursor = function() ***REMOVED***
        this.$cursorLayer.showCursor();
***REMOVED***;

    this.scrollSelectionIntoView = function(anchor, lead, offset) ***REMOVED***
        this.scrollCursorIntoView(anchor, offset);
        this.scrollCursorIntoView(lead, offset);
***REMOVED***;
    this.scrollCursorIntoView = function(cursor, offset, $viewMargin) ***REMOVED***
        if (this.$size.scrollerHeight === 0)
            return;

        var pos = this.$cursorLayer.getPixelPosition(cursor);

        var left = pos.left;
        var top = pos.top;
        
        var topMargin = $viewMargin && $viewMargin.top || 0;
        var bottomMargin = $viewMargin && $viewMargin.bottom || 0;
        
        var scrollTop = this.$scrollAnimation ? this.session.getScrollTop() : this.scrollTop;
        
        if (scrollTop + topMargin > top) ***REMOVED***
            if (offset)
                top -= offset * this.$size.scrollerHeight;
            if (top === 0)
                top = -this.scrollMargin.top;
            this.session.setScrollTop(top);
    ***REMOVED*** else if (scrollTop + this.$size.scrollerHeight - bottomMargin < top + this.lineHeight) ***REMOVED***
            if (offset)
                top += offset * this.$size.scrollerHeight;
            this.session.setScrollTop(top + this.lineHeight - this.$size.scrollerHeight);
    ***REMOVED***

        var scrollLeft = this.scrollLeft;

        if (scrollLeft > left) ***REMOVED***
            if (left < this.$padding + 2 * this.layerConfig.characterWidth)
                left = -this.scrollMargin.left;
            this.session.setScrollLeft(left);
    ***REMOVED*** else if (scrollLeft + this.$size.scrollerWidth < left + this.characterWidth) ***REMOVED***
            this.session.setScrollLeft(Math.round(left + this.characterWidth - this.$size.scrollerWidth));
    ***REMOVED*** else if (scrollLeft <= this.$padding && left - scrollLeft < this.characterWidth) ***REMOVED***
            this.session.setScrollLeft(0);
    ***REMOVED***
***REMOVED***;
    this.getScrollTop = function() ***REMOVED***
        return this.session.getScrollTop();
***REMOVED***;
    this.getScrollLeft = function() ***REMOVED***
        return this.session.getScrollLeft();
***REMOVED***;
    this.getScrollTopRow = function() ***REMOVED***
        return this.scrollTop / this.lineHeight;
***REMOVED***;
    this.getScrollBottomRow = function() ***REMOVED***
        return Math.max(0, Math.floor((this.scrollTop + this.$size.scrollerHeight) / this.lineHeight) - 1);
***REMOVED***;
    this.scrollToRow = function(row) ***REMOVED***
        this.session.setScrollTop(row * this.lineHeight);
***REMOVED***;

    this.alignCursor = function(cursor, alignment) ***REMOVED***
        if (typeof cursor == "number")
            cursor = ***REMOVED***row: cursor, column: 0***REMOVED***;

        var pos = this.$cursorLayer.getPixelPosition(cursor);
        var h = this.$size.scrollerHeight - this.lineHeight;
        var offset = pos.top - h * (alignment || 0);

        this.session.setScrollTop(offset);
        return offset;
***REMOVED***;

    this.STEPS = 8;
    this.$calcSteps = function(fromValue, toValue)***REMOVED***
        var i = 0;
        var l = this.STEPS;
        var steps = [];

        var func  = function(t, x_min, dx) ***REMOVED***
            return dx * (Math.pow(t - 1, 3) + 1) + x_min;
    ***REMOVED***;

        for (i = 0; i < l; ++i)
            steps.push(func(i / this.STEPS, fromValue, toValue - fromValue));

        return steps;
***REMOVED***;
    this.scrollToLine = function(line, center, animate, callback) ***REMOVED***
        var pos = this.$cursorLayer.getPixelPosition(***REMOVED***row: line, column: 0***REMOVED***);
        var offset = pos.top;
        if (center)
            offset -= this.$size.scrollerHeight / 2;

        var initialScroll = this.scrollTop;
        this.session.setScrollTop(offset);
        if (animate !== false)
            this.animateScrolling(initialScroll, callback);
***REMOVED***;

    this.animateScrolling = function(fromValue, callback) ***REMOVED***
        var toValue = this.scrollTop;
        if (!this.$animatedScroll)
            return;
        var _self = this;
        
        if (fromValue == toValue)
            return;
        
        if (this.$scrollAnimation) ***REMOVED***
            var oldSteps = this.$scrollAnimation.steps;
            if (oldSteps.length) ***REMOVED***
                fromValue = oldSteps[0];
                if (fromValue == toValue)
                    return;
        ***REMOVED***
    ***REMOVED***
        
        var steps = _self.$calcSteps(fromValue, toValue);
        this.$scrollAnimation = ***REMOVED***from: fromValue, to: toValue, steps: steps***REMOVED***;

        clearInterval(this.$timer);

        _self.session.setScrollTop(steps.shift());
        _self.session.$scrollTop = toValue;
        this.$timer = setInterval(function() ***REMOVED***
            if (steps.length) ***REMOVED***
                _self.session.setScrollTop(steps.shift());
                _self.session.$scrollTop = toValue;
        ***REMOVED*** else if (toValue != null) ***REMOVED***
                _self.session.$scrollTop = -1;
                _self.session.setScrollTop(toValue);
                toValue = null;
        ***REMOVED*** else ***REMOVED***
                _self.$timer = clearInterval(_self.$timer);
                _self.$scrollAnimation = null;
                callback && callback();
        ***REMOVED***
    ***REMOVED*** 10);
***REMOVED***;
    this.scrollToY = function(scrollTop) ***REMOVED***
        if (this.scrollTop !== scrollTop) ***REMOVED***
            this.$loop.schedule(this.CHANGE_SCROLL);
            this.scrollTop = scrollTop;
    ***REMOVED***
***REMOVED***;
    this.scrollToX = function(scrollLeft) ***REMOVED***
        if (this.scrollLeft !== scrollLeft)
            this.scrollLeft = scrollLeft;
        this.$loop.schedule(this.CHANGE_H_SCROLL);
***REMOVED***;
    this.scrollTo = function(x, y) ***REMOVED***
        this.session.setScrollTop(y);
        this.session.setScrollLeft(y);
***REMOVED***;
    this.scrollBy = function(deltaX, deltaY) ***REMOVED***
        deltaY && this.session.setScrollTop(this.session.getScrollTop() + deltaY);
        deltaX && this.session.setScrollLeft(this.session.getScrollLeft() + deltaX);
***REMOVED***;
    this.isScrollableBy = function(deltaX, deltaY) ***REMOVED***
        if (deltaY < 0 && this.session.getScrollTop() >= 1 - this.scrollMargin.top)
           return true;
        if (deltaY > 0 && this.session.getScrollTop() + this.$size.scrollerHeight
            - this.layerConfig.maxHeight - (this.$size.scrollerHeight - this.lineHeight) * this.$scrollPastEnd
            < -1 + this.scrollMargin.bottom)
           return true;
        if (deltaX < 0 && this.session.getScrollLeft() >= 1 - this.scrollMargin.left)
            return true;
        if (deltaX > 0 && this.session.getScrollLeft() + this.$size.scrollerWidth
            - this.layerConfig.width < -1 + this.scrollMargin.right)
           return true;
***REMOVED***;

    this.pixelToScreenCoordinates = function(x, y) ***REMOVED***
        var canvasPos = this.scroller.getBoundingClientRect();

        var offset = (x + this.scrollLeft - canvasPos.left - this.$padding) / this.characterWidth;
        var row = Math.floor((y + this.scrollTop - canvasPos.top) / this.lineHeight);
        var col = Math.round(offset);

        return ***REMOVED***row: row, column: col, side: offset - col > 0 ? 1 : -1***REMOVED***;
***REMOVED***;

    this.screenToTextCoordinates = function(x, y) ***REMOVED***
        var canvasPos = this.scroller.getBoundingClientRect();

        var col = Math.round(
            (x + this.scrollLeft - canvasPos.left - this.$padding) / this.characterWidth
        );

        var row = (y + this.scrollTop - canvasPos.top) / this.lineHeight;

        return this.session.screenToDocumentPosition(row, Math.max(col, 0));
***REMOVED***;
    this.textToScreenCoordinates = function(row, column) ***REMOVED***
        var canvasPos = this.scroller.getBoundingClientRect();
        var pos = this.session.documentToScreenPosition(row, column);

        var x = this.$padding + Math.round(pos.column * this.characterWidth);
        var y = pos.row * this.lineHeight;

        return ***REMOVED***
            pageX: canvasPos.left + x - this.scrollLeft,
            pageY: canvasPos.top + y - this.scrollTop
    ***REMOVED***;
***REMOVED***;
    this.visualizeFocus = function() ***REMOVED***
        dom.addCssClass(this.container, "ace_focus");
***REMOVED***;
    this.visualizeBlur = function() ***REMOVED***
        dom.removeCssClass(this.container, "ace_focus");
***REMOVED***;
    this.showComposition = function(position) ***REMOVED***
        if (!this.$composition)
            this.$composition = ***REMOVED***
                keepTextAreaAtCursor: this.$keepTextAreaAtCursor,
                cssText: this.textarea.style.cssText
        ***REMOVED***;

        this.$keepTextAreaAtCursor = true;
        dom.addCssClass(this.textarea, "ace_composition");
        this.textarea.style.cssText = "";
        this.$moveTextAreaToCursor();
***REMOVED***;
    this.setCompositionText = function(text) ***REMOVED***
        this.$moveTextAreaToCursor();
***REMOVED***;
    this.hideComposition = function() ***REMOVED***
        if (!this.$composition)
            return;

        dom.removeCssClass(this.textarea, "ace_composition");
        this.$keepTextAreaAtCursor = this.$composition.keepTextAreaAtCursor;
        this.textarea.style.cssText = this.$composition.cssText;
        this.$composition = null;
***REMOVED***;
    this.setTheme = function(theme, cb) ***REMOVED***
        var _self = this;
        this.$themeId = theme;
        _self._dispatchEvent('themeChange',***REMOVED***theme:theme***REMOVED***);

        if (!theme || typeof theme == "string") ***REMOVED***
            var moduleName = theme || this.$options.theme.initialValue;
            config.loadModule(["theme", moduleName], afterLoad);
    ***REMOVED*** else ***REMOVED***
            afterLoad(theme);
    ***REMOVED***

        function afterLoad(module) ***REMOVED***
            if (_self.$themeId != theme)
                return cb && cb();
            if (!module.cssClass)
                return;
            dom.importCssString(
                module.cssText,
                module.cssClass,
                _self.container.ownerDocument
            );

            if (_self.theme)
                dom.removeCssClass(_self.container, _self.theme.cssClass);

            var padding = "padding" in module ? module.padding 
                : "padding" in (_self.theme || ***REMOVED******REMOVED***) ? 4 : _self.$padding;
            if (_self.$padding && padding != _self.$padding)
                _self.setPadding(padding);
            _self.$theme = module.cssClass;

            _self.theme = module;
            dom.addCssClass(_self.container, module.cssClass);
            dom.setCssClass(_self.container, "ace_dark", module.isDark);
            if (_self.$size) ***REMOVED***
                _self.$size.width = 0;
                _self.$updateSizeAsync();
        ***REMOVED***

            _self._dispatchEvent('themeLoaded', ***REMOVED***theme:module***REMOVED***);
            cb && cb();
    ***REMOVED***
***REMOVED***;
    this.getTheme = function() ***REMOVED***
        return this.$themeId;
***REMOVED***;
    this.setStyle = function(style, include) ***REMOVED***
        dom.setCssClass(this.container, style, include !== false);
***REMOVED***;
    this.unsetStyle = function(style) ***REMOVED***
        dom.removeCssClass(this.container, style);
***REMOVED***;
    
    this.setCursorStyle = function(style) ***REMOVED***
        if (this.content.style.cursor != style)
            this.content.style.cursor = style;
***REMOVED***;
    this.setMouseCursor = function(cursorStyle) ***REMOVED***
        this.content.style.cursor = cursorStyle;
***REMOVED***;
    this.destroy = function() ***REMOVED***
        this.$textLayer.destroy();
        this.$cursorLayer.destroy();
***REMOVED***;

***REMOVED***).call(VirtualRenderer.prototype);


config.defineOptions(VirtualRenderer.prototype, "renderer", ***REMOVED***
    animatedScroll: ***REMOVED***initialValue: false***REMOVED***,
    showInvisibles: ***REMOVED***
        set: function(value) ***REMOVED***
            if (this.$textLayer.setShowInvisibles(value))
                this.$loop.schedule(this.CHANGE_TEXT);
    ***REMOVED***
        initialValue: false
***REMOVED***
    showPrintMargin: ***REMOVED***
        set: function() ***REMOVED*** this.$updatePrintMargin(); ***REMOVED***,
        initialValue: true
***REMOVED***
    printMarginColumn: ***REMOVED***
        set: function() ***REMOVED*** this.$updatePrintMargin(); ***REMOVED***,
        initialValue: 80
***REMOVED***
    printMargin: ***REMOVED***
        set: function(val) ***REMOVED***
            if (typeof val == "number")
                this.$printMarginColumn = val;
            this.$showPrintMargin = !!val;
            this.$updatePrintMargin();
    ***REMOVED***
        get: function() ***REMOVED***
            return this.$showPrintMargin && this.$printMarginColumn; 
    ***REMOVED***
***REMOVED***
    showGutter: ***REMOVED***
        set: function(show)***REMOVED***
            this.$gutter.style.display = show ? "block" : "none";
            this.$loop.schedule(this.CHANGE_FULL);
            this.onGutterResize();
    ***REMOVED***
        initialValue: true
***REMOVED***
    fadeFoldWidgets: ***REMOVED***
        set: function(show) ***REMOVED***
            dom.setCssClass(this.$gutter, "ace_fade-fold-widgets", show);
    ***REMOVED***
        initialValue: false
***REMOVED***
    showFoldWidgets: ***REMOVED***
        set: function(show) ***REMOVED***this.$gutterLayer.setShowFoldWidgets(show)***REMOVED***,
        initialValue: true
***REMOVED***
    showLineNumbers: ***REMOVED***
        set: function(show) ***REMOVED***
            this.$gutterLayer.setShowLineNumbers(show);
            this.$loop.schedule(this.CHANGE_GUTTER);
    ***REMOVED***
        initialValue: true
***REMOVED***
    displayIndentGuides: ***REMOVED***
        set: function(show) ***REMOVED***
            if (this.$textLayer.setDisplayIndentGuides(show))
                this.$loop.schedule(this.CHANGE_TEXT);
    ***REMOVED***
        initialValue: true
***REMOVED***
    highlightGutterLine: ***REMOVED***
        set: function(shouldHighlight) ***REMOVED***
            if (!this.$gutterLineHighlight) ***REMOVED***
                this.$gutterLineHighlight = dom.createElement("div");
                this.$gutterLineHighlight.className = "ace_gutter-active-line";
                this.$gutter.appendChild(this.$gutterLineHighlight);
                return;
        ***REMOVED***

            this.$gutterLineHighlight.style.display = shouldHighlight ? "" : "none";
            if (this.$cursorLayer.$pixelPos)
                this.$updateGutterLineHighlight();
    ***REMOVED***
        initialValue: false,
        value: true
***REMOVED***
    hScrollBarAlwaysVisible: ***REMOVED***
        set: function(val) ***REMOVED***
            if (!this.$hScrollBarAlwaysVisible || !this.$horizScroll)
                this.$loop.schedule(this.CHANGE_SCROLL);
    ***REMOVED***
        initialValue: false
***REMOVED***
    vScrollBarAlwaysVisible: ***REMOVED***
        set: function(val) ***REMOVED***
            if (!this.$vScrollBarAlwaysVisible || !this.$vScroll)
                this.$loop.schedule(this.CHANGE_SCROLL);
    ***REMOVED***
        initialValue: false
***REMOVED***
    fontSize:  ***REMOVED***
        set: function(size) ***REMOVED***
            if (typeof size == "number")
                size = size + "px";
            this.container.style.fontSize = size;
            this.updateFontSize();
    ***REMOVED***
        initialValue: 12
***REMOVED***
    fontFamily: ***REMOVED***
        set: function(name) ***REMOVED***
            this.container.style.fontFamily = name;
            this.updateFontSize();
    ***REMOVED***
***REMOVED***
    maxLines: ***REMOVED***
        set: function(val) ***REMOVED***
            this.updateFull();
    ***REMOVED***
***REMOVED***
    minLines: ***REMOVED***
        set: function(val) ***REMOVED***
            this.updateFull();
    ***REMOVED***
***REMOVED***
    scrollPastEnd: ***REMOVED***
        set: function(val) ***REMOVED***
            val = +val || 0;
            if (this.$scrollPastEnd == val)
                return;
            this.$scrollPastEnd = val;
            this.$loop.schedule(this.CHANGE_SCROLL);
    ***REMOVED***
        initialValue: 0,
        handlesSet: true
***REMOVED***
    fixedWidthGutter: ***REMOVED***
        set: function(val) ***REMOVED***
            this.$gutterLayer.$fixedWidth = !!val;
            this.$loop.schedule(this.CHANGE_GUTTER);
    ***REMOVED***
***REMOVED***
    theme: ***REMOVED***
        set: function(val) ***REMOVED*** this.setTheme(val) ***REMOVED***,
        get: function() ***REMOVED*** return this.$themeId || this.theme; ***REMOVED***,
        initialValue: "./theme/textmate",
        handlesSet: true
***REMOVED***
***REMOVED***);

exports.VirtualRenderer = VirtualRenderer;
***REMOVED***);

__ace_shadowed__.define('ace/layer/gutter', ['require', 'exports', 'module' , 'ace/lib/dom', 'ace/lib/oop', 'ace/lib/lang', 'ace/lib/event_emitter'], function(require, exports, module) ***REMOVED***


var dom = require("../lib/dom");
var oop = require("../lib/oop");
var lang = require("../lib/lang");
var EventEmitter = require("../lib/event_emitter").EventEmitter;

var Gutter = function(parentEl) ***REMOVED***
    this.element = dom.createElement("div");
    this.element.className = "ace_layer ace_gutter-layer";
    parentEl.appendChild(this.element);
    this.setShowFoldWidgets(this.$showFoldWidgets);
    
    this.gutterWidth = 0;

    this.$annotations = [];
    this.$updateAnnotations = this.$updateAnnotations.bind(this);

    this.$cells = [];
***REMOVED***;

(function() ***REMOVED***

    oop.implement(this, EventEmitter);

    this.setSession = function(session) ***REMOVED***
        if (this.session)
            this.session.removeEventListener("change", this.$updateAnnotations);
        this.session = session;
        session.on("change", this.$updateAnnotations);
***REMOVED***;

    this.addGutterDecoration = function(row, className)***REMOVED***
        if (window.console)
            console.warn && console.warn("deprecated use session.addGutterDecoration");
        this.session.addGutterDecoration(row, className);
***REMOVED***;

    this.removeGutterDecoration = function(row, className)***REMOVED***
        if (window.console)
            console.warn && console.warn("deprecated use session.removeGutterDecoration");
        this.session.removeGutterDecoration(row, className);
***REMOVED***;

    this.setAnnotations = function(annotations) ***REMOVED***
        this.$annotations = [];
        for (var i = 0; i < annotations.length; i++) ***REMOVED***
            var annotation = annotations[i];
            var row = annotation.row;
            var rowInfo = this.$annotations[row];
            if (!rowInfo)
                rowInfo = this.$annotations[row] = ***REMOVED***text: []***REMOVED***;
           
            var annoText = annotation.text;
            annoText = annoText ? lang.escapeHTML(annoText) : annotation.html || "";

            if (rowInfo.text.indexOf(annoText) === -1)
                rowInfo.text.push(annoText);

            var type = annotation.type;
            if (type == "error")
                rowInfo.className = " ace_error";
            else if (type == "warning" && rowInfo.className != " ace_error")
                rowInfo.className = " ace_warning";
            else if (type == "info" && (!rowInfo.className))
                rowInfo.className = " ace_info";
    ***REMOVED***
***REMOVED***;

    this.$updateAnnotations = function (e) ***REMOVED***
        if (!this.$annotations.length)
            return;
        var delta = e.data;
        var range = delta.range;
        var firstRow = range.start.row;
        var len = range.end.row - firstRow;
        if (len === 0) ***REMOVED***
    ***REMOVED*** else if (delta.action == "removeText" || delta.action == "removeLines") ***REMOVED***
            this.$annotations.splice(firstRow, len + 1, null);
    ***REMOVED*** else ***REMOVED***
            var args = new Array(len + 1);
            args.unshift(firstRow, 1);
            this.$annotations.splice.apply(this.$annotations, args);
    ***REMOVED***
***REMOVED***;

    this.update = function(config) ***REMOVED***
        var session = this.session;
        var firstRow = config.firstRow;
        var lastRow = Math.min(config.lastRow + config.gutterOffset,  // needed to compensate for hor scollbar
            session.getLength() - 1);
        var fold = session.getNextFoldLine(firstRow);
        var foldStart = fold ? fold.start.row : Infinity;
        var foldWidgets = this.$showFoldWidgets && session.foldWidgets;
        var breakpoints = session.$breakpoints;
        var decorations = session.$decorations;
        var firstLineNumber = session.$firstLineNumber;
        var lastLineNumber = 0;
        
        var gutterRenderer = session.gutterRenderer || this.$renderer;

        var cell = null;
        var index = -1;
        var row = firstRow;
        while (true) ***REMOVED***
            if (row > foldStart) ***REMOVED***
                row = fold.end.row + 1;
                fold = session.getNextFoldLine(row, fold);
                foldStart = fold ? fold.start.row : Infinity;
        ***REMOVED***
            if (row > lastRow) ***REMOVED***
                while (this.$cells.length > index + 1) ***REMOVED***
                    cell = this.$cells.pop();
                    this.element.removeChild(cell.element);
            ***REMOVED***
                break;
        ***REMOVED***

            cell = this.$cells[++index];
            if (!cell) ***REMOVED***
                cell = ***REMOVED***element: null, textNode: null, foldWidget: null***REMOVED***;
                cell.element = dom.createElement("div");
                cell.textNode = document.createTextNode('');
                cell.element.appendChild(cell.textNode);
                this.element.appendChild(cell.element);
                this.$cells[index] = cell;
        ***REMOVED***

            var className = "ace_gutter-cell ";
            if (breakpoints[row])
                className += breakpoints[row];
            if (decorations[row])
                className += decorations[row];
            if (this.$annotations[row])
                className += this.$annotations[row].className;
            if (cell.element.className != className)
                cell.element.className = className;

            var height = session.getRowLength(row) * config.lineHeight + "px";
            if (height != cell.element.style.height)
                cell.element.style.height = height;

            if (foldWidgets) ***REMOVED***
                var c = foldWidgets[row];
                if (c == null)
                    c = foldWidgets[row] = session.getFoldWidget(row);
        ***REMOVED***

            if (c) ***REMOVED***
                if (!cell.foldWidget) ***REMOVED***
                    cell.foldWidget = dom.createElement("span");
                    cell.element.appendChild(cell.foldWidget);
            ***REMOVED***
                var className = "ace_fold-widget ace_" + c;
                if (c == "start" && row == foldStart && row < fold.end.row)
                    className += " ace_closed";
                else
                    className += " ace_open";
                if (cell.foldWidget.className != className)
                    cell.foldWidget.className = className;

                var height = config.lineHeight + "px";
                if (cell.foldWidget.style.height != height)
                    cell.foldWidget.style.height = height;
        ***REMOVED*** else ***REMOVED***
                if (cell.foldWidget) ***REMOVED***
                    cell.element.removeChild(cell.foldWidget);
                    cell.foldWidget = null;
            ***REMOVED***
        ***REMOVED***
            
            var text = lastLineNumber = gutterRenderer
                ? gutterRenderer.getText(session, row)
                : row + firstLineNumber;
            if (text != cell.textNode.data)
                cell.textNode.data = text;

            row++;
    ***REMOVED***

        this.element.style.height = config.minHeight + "px";

        if (this.$fixedWidth || session.$useWrapMode)
            lastLineNumber = session.getLength() + firstLineNumber;

        var gutterWidth = gutterRenderer 
            ? gutterRenderer.getWidth(session, lastLineNumber, config)
            : lastLineNumber.toString().length * config.characterWidth;
        
        var padding = this.$padding || this.$computePadding();
        gutterWidth += padding.left + padding.right;
        if (gutterWidth !== this.gutterWidth && !isNaN(gutterWidth)) ***REMOVED***
            this.gutterWidth = gutterWidth;
            this.element.style.width = Math.ceil(this.gutterWidth) + "px";
            this._emit("changeGutterWidth", gutterWidth);
    ***REMOVED***
***REMOVED***;

    this.$fixedWidth = false;
    
    this.$showLineNumbers = true;
    this.$renderer = "";
    this.setShowLineNumbers = function(show) ***REMOVED***
        this.$renderer = !show && ***REMOVED***
            getWidth: function() ***REMOVED***return ""***REMOVED***,
            getText: function() ***REMOVED***return ""***REMOVED***
    ***REMOVED***;
***REMOVED***;
    
    this.getShowLineNumbers = function() ***REMOVED***
        return this.$showLineNumbers;
***REMOVED***;
    
    this.$showFoldWidgets = true;
    this.setShowFoldWidgets = function(show) ***REMOVED***
        if (show)
            dom.addCssClass(this.element, "ace_folding-enabled");
        else
            dom.removeCssClass(this.element, "ace_folding-enabled");

        this.$showFoldWidgets = show;
        this.$padding = null;
***REMOVED***;
    
    this.getShowFoldWidgets = function() ***REMOVED***
        return this.$showFoldWidgets;
***REMOVED***;

    this.$computePadding = function() ***REMOVED***
        if (!this.element.firstChild)
            return ***REMOVED***left: 0, right: 0***REMOVED***;
        var style = dom.computedStyle(this.element.firstChild);
        this.$padding = ***REMOVED******REMOVED***;
        this.$padding.left = parseInt(style.paddingLeft) + 1 || 0;
        this.$padding.right = parseInt(style.paddingRight) || 0;
        return this.$padding;
***REMOVED***;

    this.getRegion = function(point) ***REMOVED***
        var padding = this.$padding || this.$computePadding();
        var rect = this.element.getBoundingClientRect();
        if (point.x < padding.left + rect.left)
            return "markers";
        if (this.$showFoldWidgets && point.x > rect.right - padding.right)
            return "foldWidgets";
***REMOVED***;

***REMOVED***).call(Gutter.prototype);

exports.Gutter = Gutter;

***REMOVED***);

__ace_shadowed__.define('ace/layer/marker', ['require', 'exports', 'module' , 'ace/range', 'ace/lib/dom'], function(require, exports, module) ***REMOVED***


var Range = require("../range").Range;
var dom = require("../lib/dom");

var Marker = function(parentEl) ***REMOVED***
    this.element = dom.createElement("div");
    this.element.className = "ace_layer ace_marker-layer";
    parentEl.appendChild(this.element);
***REMOVED***;

(function() ***REMOVED***

    this.$padding = 0;

    this.setPadding = function(padding) ***REMOVED***
        this.$padding = padding;
***REMOVED***;
    this.setSession = function(session) ***REMOVED***
        this.session = session;
***REMOVED***;
    
    this.setMarkers = function(markers) ***REMOVED***
        this.markers = markers;
***REMOVED***;

    this.update = function(config) ***REMOVED***
        var config = config || this.config;
        if (!config)
            return;

        this.config = config;


        var html = [];
        for (var key in this.markers) ***REMOVED***
            var marker = this.markers[key];

            if (!marker.range) ***REMOVED***
                marker.update(html, this, this.session, config);
                continue;
        ***REMOVED***

            var range = marker.range.clipRows(config.firstRow, config.lastRow);
            if (range.isEmpty()) continue;

            range = range.toScreenRange(this.session);
            if (marker.renderer) ***REMOVED***
                var top = this.$getTop(range.start.row, config);
                var left = this.$padding + range.start.column * config.characterWidth;
                marker.renderer(html, range, left, top, config);
        ***REMOVED*** else if (marker.type == "fullLine") ***REMOVED***
                this.drawFullLineMarker(html, range, marker.clazz, config);
        ***REMOVED*** else if (marker.type == "screenLine") ***REMOVED***
                this.drawScreenLineMarker(html, range, marker.clazz, config);
        ***REMOVED*** else if (range.isMultiLine()) ***REMOVED***
                if (marker.type == "text")
                    this.drawTextMarker(html, range, marker.clazz, config);
                else
                    this.drawMultiLineMarker(html, range, marker.clazz, config);
        ***REMOVED*** else ***REMOVED***
                this.drawSingleLineMarker(html, range, marker.clazz + " ace_start", config);
        ***REMOVED***
    ***REMOVED***
        this.element = dom.setInnerHtml(this.element, html.join(""));
***REMOVED***;

    this.$getTop = function(row, layerConfig) ***REMOVED***
        return (row - layerConfig.firstRowScreen) * layerConfig.lineHeight;
***REMOVED***;
    this.drawTextMarker = function(stringBuilder, range, clazz, layerConfig, extraStyle) ***REMOVED***
        var row = range.start.row;

        var lineRange = new Range(
            row, range.start.column,
            row, this.session.getScreenLastRowColumn(row)
        );
        this.drawSingleLineMarker(stringBuilder, lineRange, clazz + " ace_start", layerConfig, 1, extraStyle);
        row = range.end.row;
        lineRange = new Range(row, 0, row, range.end.column);
        this.drawSingleLineMarker(stringBuilder, lineRange, clazz, layerConfig, 0, extraStyle);

        for (row = range.start.row + 1; row < range.end.row; row++) ***REMOVED***
            lineRange.start.row = row;
            lineRange.end.row = row;
            lineRange.end.column = this.session.getScreenLastRowColumn(row);
            this.drawSingleLineMarker(stringBuilder, lineRange, clazz, layerConfig, 1, extraStyle);
    ***REMOVED***
***REMOVED***;
    this.drawMultiLineMarker = function(stringBuilder, range, clazz, config, extraStyle) ***REMOVED***
        var padding = this.$padding;
        var height = config.lineHeight;
        var top = this.$getTop(range.start.row, config);
        var left = padding + range.start.column * config.characterWidth;
        extraStyle = extraStyle || "";

        stringBuilder.push(
            "<div class='", clazz, " ace_start' style='",
            "height:", height, "px;",
            "right:0;",
            "top:", top, "px;",
            "left:", left, "px;", extraStyle, "'></div>"
        );
        top = this.$getTop(range.end.row, config);
        var width = range.end.column * config.characterWidth;

        stringBuilder.push(
            "<div class='", clazz, "' style='",
            "height:", height, "px;",
            "width:", width, "px;",
            "top:", top, "px;",
            "left:", padding, "px;", extraStyle, "'></div>"
        );
        height = (range.end.row - range.start.row - 1) * config.lineHeight;
        if (height < 0)
            return;
        top = this.$getTop(range.start.row + 1, config);

        stringBuilder.push(
            "<div class='", clazz, "' style='",
            "height:", height, "px;",
            "right:0;",
            "top:", top, "px;",
            "left:", padding, "px;", extraStyle, "'></div>"
        );
***REMOVED***;
    this.drawSingleLineMarker = function(stringBuilder, range, clazz, config, extraLength, extraStyle) ***REMOVED***
        var height = config.lineHeight;
        var width = (range.end.column + (extraLength || 0) - range.start.column) * config.characterWidth;

        var top = this.$getTop(range.start.row, config);
        var left = this.$padding + range.start.column * config.characterWidth;

        stringBuilder.push(
            "<div class='", clazz, "' style='",
            "height:", height, "px;",
            "width:", width, "px;",
            "top:", top, "px;",
            "left:", left, "px;", extraStyle || "", "'></div>"
        );
***REMOVED***;

    this.drawFullLineMarker = function(stringBuilder, range, clazz, config, extraStyle) ***REMOVED***
        var top = this.$getTop(range.start.row, config);
        var height = config.lineHeight;
        if (range.start.row != range.end.row)
            height += this.$getTop(range.end.row, config) - top;

        stringBuilder.push(
            "<div class='", clazz, "' style='",
            "height:", height, "px;",
            "top:", top, "px;",
            "left:0;right:0;", extraStyle || "", "'></div>"
        );
***REMOVED***;
    
    this.drawScreenLineMarker = function(stringBuilder, range, clazz, config, extraStyle) ***REMOVED***
        var top = this.$getTop(range.start.row, config);
        var height = config.lineHeight;

        stringBuilder.push(
            "<div class='", clazz, "' style='",
            "height:", height, "px;",
            "top:", top, "px;",
            "left:0;right:0;", extraStyle || "", "'></div>"
        );
***REMOVED***;

***REMOVED***).call(Marker.prototype);

exports.Marker = Marker;

***REMOVED***);

__ace_shadowed__.define('ace/layer/text', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/lib/dom', 'ace/lib/lang', 'ace/lib/useragent', 'ace/lib/event_emitter'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var dom = require("../lib/dom");
var lang = require("../lib/lang");
var useragent = require("../lib/useragent");
var EventEmitter = require("../lib/event_emitter").EventEmitter;

var Text = function(parentEl) ***REMOVED***
    this.element = dom.createElement("div");
    this.element.className = "ace_layer ace_text-layer";
    parentEl.appendChild(this.element);
    this.$updateEolChar = this.$updateEolChar.bind(this);
***REMOVED***;

(function() ***REMOVED***

    oop.implement(this, EventEmitter);

    this.EOF_CHAR = "\xB6";
    this.EOL_CHAR_LF = "\xAC";
    this.EOL_CHAR_CRLF = "\xa4";
    this.EOL_CHAR = this.EOL_CHAR_LF;
    this.TAB_CHAR = "\u2192"; //"\u21E5";
    this.SPACE_CHAR = "\xB7";
    this.$padding = 0;

    this.$updateEolChar = function() ***REMOVED***
        var EOL_CHAR = this.session.doc.getNewLineCharacter() == "\n"
           ? this.EOL_CHAR_LF
           : this.EOL_CHAR_CRLF;
        if (this.EOL_CHAR != EOL_CHAR) ***REMOVED***
            this.EOL_CHAR = EOL_CHAR;
            return true;
    ***REMOVED***
***REMOVED***

    this.setPadding = function(padding) ***REMOVED***
        this.$padding = padding;
        this.element.style.padding = "0 " + padding + "px";
***REMOVED***;

    this.getLineHeight = function() ***REMOVED***
        return this.$fontMetrics.$characterSize.height || 0;
***REMOVED***;

    this.getCharacterWidth = function() ***REMOVED***
        return this.$fontMetrics.$characterSize.width || 0;
***REMOVED***;
    
    this.$setFontMetrics = function(measure) ***REMOVED***
        this.$fontMetrics = measure;
        this.$fontMetrics.on("changeCharacterSize", function(e) ***REMOVED***
            this._signal("changeCharacterSize", e);
    ***REMOVED***.bind(this));
        this.$pollSizeChanges();
***REMOVED***

    this.checkForSizeChanges = function() ***REMOVED***
        this.$fontMetrics.checkForSizeChanges();
***REMOVED***;
    this.$pollSizeChanges = function() ***REMOVED***
        return this.$pollSizeChangesTimer = this.$fontMetrics.$pollSizeChanges();
***REMOVED***;
    this.setSession = function(session) ***REMOVED***
        this.session = session;
        this.$computeTabString();
***REMOVED***;

    this.showInvisibles = false;
    this.setShowInvisibles = function(showInvisibles) ***REMOVED***
        if (this.showInvisibles == showInvisibles)
            return false;

        this.showInvisibles = showInvisibles;
        this.$computeTabString();
        return true;
***REMOVED***;

    this.displayIndentGuides = true;
    this.setDisplayIndentGuides = function(display) ***REMOVED***
        if (this.displayIndentGuides == display)
            return false;

        this.displayIndentGuides = display;
        this.$computeTabString();
        return true;
***REMOVED***;

    this.$tabStrings = [];
    this.onChangeTabSize =
    this.$computeTabString = function() ***REMOVED***
        var tabSize = this.session.getTabSize();
        this.tabSize = tabSize;
        var tabStr = this.$tabStrings = [0];
        for (var i = 1; i < tabSize + 1; i++) ***REMOVED***
            if (this.showInvisibles) ***REMOVED***
                tabStr.push("<span class='ace_invisible ace_invisible_tab'>"
                    + this.TAB_CHAR
                    + lang.stringRepeat("\xa0", i - 1)
                    + "</span>");
        ***REMOVED*** else ***REMOVED***
                tabStr.push(lang.stringRepeat("\xa0", i));
        ***REMOVED***
    ***REMOVED***
        if (this.displayIndentGuides) ***REMOVED***
            this.$indentGuideRe =  /\s\S| \t|\t |\s$/;
            var className = "ace_indent-guide";
            var spaceClass = "";
            var tabClass = "";
            if (this.showInvisibles) ***REMOVED***
                className += " ace_invisible";
                spaceClass = " ace_invisible_space";
                tabClass = " ace_invisible_tab";
                var spaceContent = lang.stringRepeat(this.SPACE_CHAR, this.tabSize);
                var tabContent = this.TAB_CHAR + lang.stringRepeat("\xa0", this.tabSize - 1);
        ***REMOVED*** else***REMOVED***
                var spaceContent = lang.stringRepeat("\xa0", this.tabSize);
                var tabContent = spaceContent;
        ***REMOVED***

            this.$tabStrings[" "] = "<span class='" + className + spaceClass + "'>" + spaceContent + "</span>";
            this.$tabStrings["\t"] = "<span class='" + className + tabClass + "'>" + tabContent + "</span>";
    ***REMOVED***
***REMOVED***;

    this.updateLines = function(config, firstRow, lastRow) ***REMOVED***
        if (this.config.lastRow != config.lastRow ||
            this.config.firstRow != config.firstRow) ***REMOVED***
            this.scrollLines(config);
    ***REMOVED***
        this.config = config;

        var first = Math.max(firstRow, config.firstRow);
        var last = Math.min(lastRow, config.lastRow);

        var lineElements = this.element.childNodes;
        var lineElementsIdx = 0;

        for (var row = config.firstRow; row < first; row++) ***REMOVED***
            var foldLine = this.session.getFoldLine(row);
            if (foldLine) ***REMOVED***
                if (foldLine.containsRow(first)) ***REMOVED***
                    first = foldLine.start.row;
                    break;
            ***REMOVED*** else ***REMOVED***
                    row = foldLine.end.row;
            ***REMOVED***
        ***REMOVED***
            lineElementsIdx ++;
    ***REMOVED***

        var row = first;
        var foldLine = this.session.getNextFoldLine(row);
        var foldStart = foldLine ? foldLine.start.row : Infinity;

        while (true) ***REMOVED***
            if (row > foldStart) ***REMOVED***
                row = foldLine.end.row+1;
                foldLine = this.session.getNextFoldLine(row, foldLine);
                foldStart = foldLine ? foldLine.start.row :Infinity;
        ***REMOVED***
            if (row > last)
                break;

            var lineElement = lineElements[lineElementsIdx++];
            if (lineElement) ***REMOVED***
                var html = [];
                this.$renderLine(
                    html, row, !this.$useLineGroups(), row == foldStart ? foldLine : false
                );
                lineElement.style.height = config.lineHeight * this.session.getRowLength(row) + "px";
                dom.setInnerHtml(lineElement, html.join(""));
        ***REMOVED***
            row++;
    ***REMOVED***
***REMOVED***;

    this.scrollLines = function(config) ***REMOVED***
        var oldConfig = this.config;
        this.config = config;

        if (!oldConfig || oldConfig.lastRow < config.firstRow)
            return this.update(config);

        if (config.lastRow < oldConfig.firstRow)
            return this.update(config);

        var el = this.element;
        if (oldConfig.firstRow < config.firstRow)
            for (var row=this.session.getFoldedRowCount(oldConfig.firstRow, config.firstRow - 1); row>0; row--)
                el.removeChild(el.firstChild);

        if (oldConfig.lastRow > config.lastRow)
            for (var row=this.session.getFoldedRowCount(config.lastRow + 1, oldConfig.lastRow); row>0; row--)
                el.removeChild(el.lastChild);

        if (config.firstRow < oldConfig.firstRow) ***REMOVED***
            var fragment = this.$renderLinesFragment(config, config.firstRow, oldConfig.firstRow - 1);
            if (el.firstChild)
                el.insertBefore(fragment, el.firstChild);
            else
                el.appendChild(fragment);
    ***REMOVED***

        if (config.lastRow > oldConfig.lastRow) ***REMOVED***
            var fragment = this.$renderLinesFragment(config, oldConfig.lastRow + 1, config.lastRow);
            el.appendChild(fragment);
    ***REMOVED***
***REMOVED***;

    this.$renderLinesFragment = function(config, firstRow, lastRow) ***REMOVED***
        var fragment = this.element.ownerDocument.createDocumentFragment();
        var row = firstRow;
        var foldLine = this.session.getNextFoldLine(row);
        var foldStart = foldLine ? foldLine.start.row : Infinity;

        while (true) ***REMOVED***
            if (row > foldStart) ***REMOVED***
                row = foldLine.end.row+1;
                foldLine = this.session.getNextFoldLine(row, foldLine);
                foldStart = foldLine ? foldLine.start.row : Infinity;
        ***REMOVED***
            if (row > lastRow)
                break;

            var container = dom.createElement("div");

            var html = [];
            this.$renderLine(html, row, false, row == foldStart ? foldLine : false);
            container.innerHTML = html.join("");
            if (this.$useLineGroups()) ***REMOVED***
                container.className = 'ace_line_group';
                fragment.appendChild(container);
                container.style.height = config.lineHeight * this.session.getRowLength(row) + "px";

        ***REMOVED*** else ***REMOVED***
                while(container.firstChild)
                    fragment.appendChild(container.firstChild);
        ***REMOVED***

            row++;
    ***REMOVED***
        return fragment;
***REMOVED***;

    this.update = function(config) ***REMOVED***
        this.config = config;

        var html = [];
        var firstRow = config.firstRow, lastRow = config.lastRow;

        var row = firstRow;
        var foldLine = this.session.getNextFoldLine(row);
        var foldStart = foldLine ? foldLine.start.row : Infinity;

        while (true) ***REMOVED***
            if (row > foldStart) ***REMOVED***
                row = foldLine.end.row+1;
                foldLine = this.session.getNextFoldLine(row, foldLine);
                foldStart = foldLine ? foldLine.start.row :Infinity;
        ***REMOVED***
            if (row > lastRow)
                break;

            if (this.$useLineGroups())
                html.push("<div class='ace_line_group' style='height:", config.lineHeight*this.session.getRowLength(row), "px'>")

            this.$renderLine(html, row, false, row == foldStart ? foldLine : false);

            if (this.$useLineGroups())
                html.push("</div>"); // end the line group

            row++;
    ***REMOVED***
        this.element = dom.setInnerHtml(this.element, html.join(""));
***REMOVED***;

    this.$textToken = ***REMOVED***
        "text": true,
        "rparen": true,
        "lparen": true
***REMOVED***;

    this.$renderToken = function(stringBuilder, screenColumn, token, value) ***REMOVED***
        var self = this;
        var replaceReg = /\t|&|<|( +)|([\x00-\x1f\x80-\xa0\u1680\u180E\u2000-\u200f\u2028\u2029\u202F\u205F\u3000\uFEFF])|[\u1100-\u115F\u11A3-\u11A7\u11FA-\u11FF\u2329-\u232A\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFB\u3000-\u303E\u3041-\u3096\u3099-\u30FF\u3105-\u312D\u3131-\u318E\u3190-\u31BA\u31C0-\u31E3\u31F0-\u321E\u3220-\u3247\u3250-\u32FE\u3300-\u4DBF\u4E00-\uA48C\uA490-\uA4C6\uA960-\uA97C\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFAFF\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE66\uFE68-\uFE6B\uFF01-\uFF60\uFFE0-\uFFE6]/g;
        var replaceFunc = function(c, a, b, tabIdx, idx4) ***REMOVED***
            if (a) ***REMOVED***
                return self.showInvisibles ?
                    "<span class='ace_invisible ace_invisible_space'>" + lang.stringRepeat(self.SPACE_CHAR, c.length) + "</span>" :
                    lang.stringRepeat("\xa0", c.length);
        ***REMOVED*** else if (c == "&") ***REMOVED***
                return "&#38;";
        ***REMOVED*** else if (c == "<") ***REMOVED***
                return "&#60;";
        ***REMOVED*** else if (c == "\t") ***REMOVED***
                var tabSize = self.session.getScreenTabSize(screenColumn + tabIdx);
                screenColumn += tabSize - 1;
                return self.$tabStrings[tabSize];
        ***REMOVED*** else if (c == "\u3000") ***REMOVED***
                var classToUse = self.showInvisibles ? "ace_cjk ace_invisible ace_invisible_space" : "ace_cjk";
                var space = self.showInvisibles ? self.SPACE_CHAR : "";
                screenColumn += 1;
                return "<span class='" + classToUse + "' style='width:" +
                    (self.config.characterWidth * 2) +
                    "px'>" + space + "</span>";
        ***REMOVED*** else if (b) ***REMOVED***
                return "<span class='ace_invisible ace_invisible_space ace_invalid'>" + self.SPACE_CHAR + "</span>";
        ***REMOVED*** else ***REMOVED***
                screenColumn += 1;
                return "<span class='ace_cjk' style='width:" +
                    (self.config.characterWidth * 2) +
                    "px'>" + c + "</span>";
        ***REMOVED***
    ***REMOVED***;

        var output = value.replace(replaceReg, replaceFunc);

        if (!this.$textToken[token.type]) ***REMOVED***
            var classes = "ace_" + token.type.replace(/\./g, " ace_");
            var style = "";
            if (token.type == "fold")
                style = " style='width:" + (token.value.length * this.config.characterWidth) + "px;' ";
            stringBuilder.push("<span class='", classes, "'", style, ">", output, "</span>");
    ***REMOVED***
        else ***REMOVED***
            stringBuilder.push(output);
    ***REMOVED***
        return screenColumn + value.length;
***REMOVED***;

    this.renderIndentGuide = function(stringBuilder, value, max) ***REMOVED***
        var cols = value.search(this.$indentGuideRe);
        if (cols <= 0 || cols >= max)
            return value;
        if (value[0] == " ") ***REMOVED***
            cols -= cols % this.tabSize;
            stringBuilder.push(lang.stringRepeat(this.$tabStrings[" "], cols/this.tabSize));
            return value.substr(cols);
    ***REMOVED*** else if (value[0] == "\t") ***REMOVED***
            stringBuilder.push(lang.stringRepeat(this.$tabStrings["\t"], cols));
            return value.substr(cols);
    ***REMOVED***
        return value;
***REMOVED***;

    this.$renderWrappedLine = function(stringBuilder, tokens, splits, onlyContents) ***REMOVED***
        var chars = 0;
        var split = 0;
        var splitChars = splits[0];
        var screenColumn = 0;

        for (var i = 0; i < tokens.length; i++) ***REMOVED***
            var token = tokens[i];
            var value = token.value;
            if (i == 0 && this.displayIndentGuides) ***REMOVED***
                chars = value.length;
                value = this.renderIndentGuide(stringBuilder, value, splitChars);
                if (!value)
                    continue;
                chars -= value.length;
        ***REMOVED***

            if (chars + value.length < splitChars) ***REMOVED***
                screenColumn = this.$renderToken(stringBuilder, screenColumn, token, value);
                chars += value.length;
        ***REMOVED*** else ***REMOVED***
                while (chars + value.length >= splitChars) ***REMOVED***
                    screenColumn = this.$renderToken(
                        stringBuilder, screenColumn,
                        token, value.substring(0, splitChars - chars)
                    );
                    value = value.substring(splitChars - chars);
                    chars = splitChars;

                    if (!onlyContents) ***REMOVED***
                        stringBuilder.push("</div>",
                            "<div class='ace_line' style='height:",
                            this.config.lineHeight, "px'>"
                        );
                ***REMOVED***

                    split ++;
                    screenColumn = 0;
                    splitChars = splits[split] || Number.MAX_VALUE;
            ***REMOVED***
                if (value.length != 0) ***REMOVED***
                    chars += value.length;
                    screenColumn = this.$renderToken(
                        stringBuilder, screenColumn, token, value
                    );
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***
***REMOVED***;

    this.$renderSimpleLine = function(stringBuilder, tokens) ***REMOVED***
        var screenColumn = 0;
        var token = tokens[0];
        var value = token.value;
        if (this.displayIndentGuides)
            value = this.renderIndentGuide(stringBuilder, value);
        if (value)
            screenColumn = this.$renderToken(stringBuilder, screenColumn, token, value);
        for (var i = 1; i < tokens.length; i++) ***REMOVED***
            token = tokens[i];
            value = token.value;
            screenColumn = this.$renderToken(stringBuilder, screenColumn, token, value);
    ***REMOVED***
***REMOVED***;
    this.$renderLine = function(stringBuilder, row, onlyContents, foldLine) ***REMOVED***
        if (!foldLine && foldLine != false)
            foldLine = this.session.getFoldLine(row);

        if (foldLine)
            var tokens = this.$getFoldLineTokens(row, foldLine);
        else
            var tokens = this.session.getTokens(row);


        if (!onlyContents) ***REMOVED***
            stringBuilder.push(
                "<div class='ace_line' style='height:", 
                    this.config.lineHeight * (
                        this.$useLineGroups() ? 1 :this.session.getRowLength(row)
                    ), "px'>"
            );
    ***REMOVED***

        if (tokens.length) ***REMOVED***
            var splits = this.session.getRowSplitData(row);
            if (splits && splits.length)
                this.$renderWrappedLine(stringBuilder, tokens, splits, onlyContents);
            else
                this.$renderSimpleLine(stringBuilder, tokens);
    ***REMOVED***

        if (this.showInvisibles) ***REMOVED***
            if (foldLine)
                row = foldLine.end.row

            stringBuilder.push(
                "<span class='ace_invisible ace_invisible_eol'>",
                row == this.session.getLength() - 1 ? this.EOF_CHAR : this.EOL_CHAR,
                "</span>"
            );
    ***REMOVED***
        if (!onlyContents)
            stringBuilder.push("</div>");
***REMOVED***;

    this.$getFoldLineTokens = function(row, foldLine) ***REMOVED***
        var session = this.session;
        var renderTokens = [];

        function addTokens(tokens, from, to) ***REMOVED***
            var idx = 0, col = 0;
            while ((col + tokens[idx].value.length) < from) ***REMOVED***
                col += tokens[idx].value.length;
                idx++;

                if (idx == tokens.length)
                    return;
        ***REMOVED***
            if (col != from) ***REMOVED***
                var value = tokens[idx].value.substring(from - col);
                if (value.length > (to - from))
                    value = value.substring(0, to - from);

                renderTokens.push(***REMOVED***
                    type: tokens[idx].type,
                    value: value
            ***REMOVED***);

                col = from + value.length;
                idx += 1;
        ***REMOVED***

            while (col < to && idx < tokens.length) ***REMOVED***
                var value = tokens[idx].value;
                if (value.length + col > to) ***REMOVED***
                    renderTokens.push(***REMOVED***
                        type: tokens[idx].type,
                        value: value.substring(0, to - col)
                ***REMOVED***);
            ***REMOVED*** else
                    renderTokens.push(tokens[idx]);
                col += value.length;
                idx += 1;
        ***REMOVED***
    ***REMOVED***

        var tokens = session.getTokens(row);
        foldLine.walk(function(placeholder, row, column, lastColumn, isNewRow) ***REMOVED***
            if (placeholder != null) ***REMOVED***
                renderTokens.push(***REMOVED***
                    type: "fold",
                    value: placeholder
            ***REMOVED***);
        ***REMOVED*** else ***REMOVED***
                if (isNewRow)
                    tokens = session.getTokens(row);

                if (tokens.length)
                    addTokens(tokens, lastColumn, column);
        ***REMOVED***
    ***REMOVED*** foldLine.end.row, this.session.getLine(foldLine.end.row).length);

        return renderTokens;
***REMOVED***;

    this.$useLineGroups = function() ***REMOVED***
        return this.session.getUseWrapMode();
***REMOVED***;

    this.destroy = function() ***REMOVED***
        clearInterval(this.$pollSizeChangesTimer);
        if (this.$measureNode)
            this.$measureNode.parentNode.removeChild(this.$measureNode);
        delete this.$measureNode;
***REMOVED***;

***REMOVED***).call(Text.prototype);

exports.Text = Text;

***REMOVED***);

__ace_shadowed__.define('ace/layer/cursor', ['require', 'exports', 'module' , 'ace/lib/dom'], function(require, exports, module) ***REMOVED***


var dom = require("../lib/dom");
var IE8;

var Cursor = function(parentEl) ***REMOVED***
    this.element = dom.createElement("div");
    this.element.className = "ace_layer ace_cursor-layer";
    parentEl.appendChild(this.element);
    
    if (IE8 === undefined)
        IE8 = "opacity" in this.element;

    this.isVisible = false;
    this.isBlinking = true;
    this.blinkInterval = 1000;
    this.smoothBlinking = false;

    this.cursors = [];
    this.cursor = this.addCursor();
    dom.addCssClass(this.element, "ace_hidden-cursors");
    this.$updateCursors = this.$updateVisibility.bind(this);
***REMOVED***;

(function() ***REMOVED***
    
    this.$updateVisibility = function(val) ***REMOVED***
        var cursors = this.cursors;
        for (var i = cursors.length; i--; )
            cursors[i].style.visibility = val ? "" : "hidden";
***REMOVED***;
    this.$updateOpacity = function(val) ***REMOVED***
        var cursors = this.cursors;
        for (var i = cursors.length; i--; )
            cursors[i].style.opacity = val ? "" : "0";
***REMOVED***;
    

    this.$padding = 0;
    this.setPadding = function(padding) ***REMOVED***
        this.$padding = padding;
***REMOVED***;

    this.setSession = function(session) ***REMOVED***
        this.session = session;
***REMOVED***;

    this.setBlinking = function(blinking) ***REMOVED***
        if (blinking != this.isBlinking)***REMOVED***
            this.isBlinking = blinking;
            this.restartTimer();
    ***REMOVED***
***REMOVED***;

    this.setBlinkInterval = function(blinkInterval) ***REMOVED***
        if (blinkInterval != this.blinkInterval)***REMOVED***
            this.blinkInterval = blinkInterval;
            this.restartTimer();
    ***REMOVED***
***REMOVED***;

    this.setSmoothBlinking = function(smoothBlinking) ***REMOVED***
        if (smoothBlinking != this.smoothBlinking && !IE8) ***REMOVED***
            this.smoothBlinking = smoothBlinking;
            dom.setCssClass(this.element, "ace_smooth-blinking", smoothBlinking);
            this.$updateCursors(true);
            this.$updateCursors = (smoothBlinking 
                ? this.$updateOpacity
                : this.$updateVisibility).bind(this);
            this.restartTimer();
    ***REMOVED***
***REMOVED***;

    this.addCursor = function() ***REMOVED***
        var el = dom.createElement("div");
        el.className = "ace_cursor";
        this.element.appendChild(el);
        this.cursors.push(el);
        return el;
***REMOVED***;

    this.removeCursor = function() ***REMOVED***
        if (this.cursors.length > 1) ***REMOVED***
            var el = this.cursors.pop();
            el.parentNode.removeChild(el);
            return el;
    ***REMOVED***
***REMOVED***;

    this.hideCursor = function() ***REMOVED***
        this.isVisible = false;
        dom.addCssClass(this.element, "ace_hidden-cursors");
        this.restartTimer();
***REMOVED***;

    this.showCursor = function() ***REMOVED***
        this.isVisible = true;
        dom.removeCssClass(this.element, "ace_hidden-cursors");
        this.restartTimer();
***REMOVED***;

    this.restartTimer = function() ***REMOVED***
        var update = this.$updateCursors;
        clearInterval(this.intervalId);
        clearTimeout(this.timeoutId);
        if (this.smoothBlinking) ***REMOVED***
            dom.removeCssClass(this.element, "ace_smooth-blinking");
    ***REMOVED***
        
        update(true);

        if (!this.isBlinking || !this.blinkInterval || !this.isVisible)
            return;

        if (this.smoothBlinking) ***REMOVED***
            setTimeout(function()***REMOVED***
                dom.addCssClass(this.element, "ace_smooth-blinking");
        ***REMOVED***.bind(this));
    ***REMOVED***
        
        var blink = function()***REMOVED***
            this.timeoutId = setTimeout(function() ***REMOVED***
                update(false);
        ***REMOVED*** 0.6 * this.blinkInterval);
    ***REMOVED***.bind(this);

        this.intervalId = setInterval(function() ***REMOVED***
            update(true);
            blink();
    ***REMOVED*** this.blinkInterval);

        blink();
***REMOVED***;

    this.getPixelPosition = function(position, onScreen) ***REMOVED***
        if (!this.config || !this.session)
            return ***REMOVED***left : 0, top : 0***REMOVED***;

        if (!position)
            position = this.session.selection.getCursor();
        var pos = this.session.documentToScreenPosition(position);
        var cursorLeft = this.$padding + pos.column * this.config.characterWidth;
        var cursorTop = (pos.row - (onScreen ? this.config.firstRowScreen : 0)) *
            this.config.lineHeight;

        return ***REMOVED***left : cursorLeft, top : cursorTop***REMOVED***;
***REMOVED***;

    this.update = function(config) ***REMOVED***
        this.config = config;

        var selections = this.session.$selectionMarkers;
        var i = 0, cursorIndex = 0;

        if (selections === undefined || selections.length === 0)***REMOVED***
            selections = [***REMOVED***cursor: null***REMOVED***];
    ***REMOVED***

        for (var i = 0, n = selections.length; i < n; i++) ***REMOVED***
            var pixelPos = this.getPixelPosition(selections[i].cursor, true);
            if ((pixelPos.top > config.height + config.offset ||
                 pixelPos.top < 0) && i > 1) ***REMOVED***
                continue;
        ***REMOVED***

            var style = (this.cursors[cursorIndex++] || this.addCursor()).style;

            style.left = pixelPos.left + "px";
            style.top = pixelPos.top + "px";
            style.width = config.characterWidth + "px";
            style.height = config.lineHeight + "px";
    ***REMOVED***
        while (this.cursors.length > cursorIndex)
            this.removeCursor();

        var overwrite = this.session.getOverwrite();
        this.$setOverwrite(overwrite);
        this.$pixelPos = pixelPos;
        this.restartTimer();
***REMOVED***;

    this.$setOverwrite = function(overwrite) ***REMOVED***
        if (overwrite != this.overwrite) ***REMOVED***
            this.overwrite = overwrite;
            if (overwrite)
                dom.addCssClass(this.element, "ace_overwrite-cursors");
            else
                dom.removeCssClass(this.element, "ace_overwrite-cursors");
    ***REMOVED***
***REMOVED***;

    this.destroy = function() ***REMOVED***
        clearInterval(this.intervalId);
        clearTimeout(this.timeoutId);
***REMOVED***;

***REMOVED***).call(Cursor.prototype);

exports.Cursor = Cursor;

***REMOVED***);

__ace_shadowed__.define('ace/scrollbar', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/lib/dom', 'ace/lib/event', 'ace/lib/event_emitter'], function(require, exports, module) ***REMOVED***


var oop = require("./lib/oop");
var dom = require("./lib/dom");
var event = require("./lib/event");
var EventEmitter = require("./lib/event_emitter").EventEmitter;
var ScrollBar = function(parent) ***REMOVED***
    this.element = dom.createElement("div");
    this.element.className = "ace_scrollbar ace_scrollbar" + this.classSuffix;

    this.inner = dom.createElement("div");
    this.inner.className = "ace_scrollbar-inner";
    this.element.appendChild(this.inner);

    parent.appendChild(this.element);

    this.setVisible(false);
    this.skipEvent = false;

    event.addListener(this.element, "scroll", this.onScroll.bind(this));
    event.addListener(this.element, "mousedown", event.preventDefault);
***REMOVED***;

(function() ***REMOVED***
    oop.implement(this, EventEmitter);

    this.setVisible = function(isVisible) ***REMOVED***
        this.element.style.display = isVisible ? "" : "none";
        this.isVisible = isVisible;
***REMOVED***;
***REMOVED***).call(ScrollBar.prototype);
var VScrollBar = function(parent, renderer) ***REMOVED***
    ScrollBar.call(this, parent);
    this.scrollTop = 0;
    renderer.$scrollbarWidth = 
    this.width = dom.scrollbarWidth(parent.ownerDocument);
    this.inner.style.width =
    this.element.style.width = (this.width || 15) + 5 + "px";
***REMOVED***;

oop.inherits(VScrollBar, ScrollBar);

(function() ***REMOVED***

    this.classSuffix = '-v';
    this.onScroll = function() ***REMOVED***
        if (!this.skipEvent) ***REMOVED***
            this.scrollTop = this.element.scrollTop;
            this._emit("scroll", ***REMOVED***data: this.scrollTop***REMOVED***);
    ***REMOVED***
        this.skipEvent = false;
***REMOVED***;
    this.getWidth = function() ***REMOVED***
        return this.isVisible ? this.width : 0;
***REMOVED***;
    this.setHeight = function(height) ***REMOVED***
        this.element.style.height = height + "px";
***REMOVED***;
    this.setInnerHeight = function(height) ***REMOVED***
        this.inner.style.height = height + "px";
***REMOVED***;
    this.setScrollHeight = function(height) ***REMOVED***
        this.inner.style.height = height + "px";
***REMOVED***;
    this.setScrollTop = function(scrollTop) ***REMOVED***
        if (this.scrollTop != scrollTop) ***REMOVED***
            this.skipEvent = true;
            this.scrollTop = this.element.scrollTop = scrollTop;
    ***REMOVED***
***REMOVED***;

***REMOVED***).call(VScrollBar.prototype);
var HScrollBar = function(parent, renderer) ***REMOVED***
    ScrollBar.call(this, parent);
    this.scrollLeft = 0;
    this.height = renderer.$scrollbarWidth;
    this.inner.style.height =
    this.element.style.height = (this.height || 15) + 5 + "px";
***REMOVED***;

oop.inherits(HScrollBar, ScrollBar);

(function() ***REMOVED***

    this.classSuffix = '-h';
    this.onScroll = function() ***REMOVED***
        if (!this.skipEvent) ***REMOVED***
            this.scrollLeft = this.element.scrollLeft;
            this._emit("scroll", ***REMOVED***data: this.scrollLeft***REMOVED***);
    ***REMOVED***
        this.skipEvent = false;
***REMOVED***;
    this.getHeight = function() ***REMOVED***
        return this.isVisible ? this.height : 0;
***REMOVED***;
    this.setWidth = function(width) ***REMOVED***
        this.element.style.width = width + "px";
***REMOVED***;
    this.setInnerWidth = function(width) ***REMOVED***
        this.inner.style.width = width + "px";
***REMOVED***;
    this.setScrollWidth = function(width) ***REMOVED***
        this.inner.style.width = width + "px";
***REMOVED***;
    this.setScrollLeft = function(scrollLeft) ***REMOVED***
        if (this.scrollLeft != scrollLeft) ***REMOVED***
            this.skipEvent = true;
            this.scrollLeft = this.element.scrollLeft = scrollLeft;
    ***REMOVED***
***REMOVED***;

***REMOVED***).call(HScrollBar.prototype);


exports.ScrollBar = VScrollBar; // backward compatibility
exports.ScrollBarV = VScrollBar; // backward compatibility
exports.ScrollBarH = HScrollBar; // backward compatibility

exports.VScrollBar = VScrollBar;
exports.HScrollBar = HScrollBar;
***REMOVED***);

__ace_shadowed__.define('ace/renderloop', ['require', 'exports', 'module' , 'ace/lib/event'], function(require, exports, module) ***REMOVED***


var event = require("./lib/event");


var RenderLoop = function(onRender, win) ***REMOVED***
    this.onRender = onRender;
    this.pending = false;
    this.changes = 0;
    this.window = win || window;
***REMOVED***;

(function() ***REMOVED***


    this.schedule = function(change) ***REMOVED***
        this.changes = this.changes | change;
        if (!this.pending && this.changes) ***REMOVED***
            this.pending = true;
            var _self = this;
            event.nextFrame(function() ***REMOVED***
                _self.pending = false;
                var changes;
                while (changes = _self.changes) ***REMOVED***
                    _self.changes = 0;
                    _self.onRender(changes);
            ***REMOVED***
        ***REMOVED*** this.window);
    ***REMOVED***
***REMOVED***;

***REMOVED***).call(RenderLoop.prototype);

exports.RenderLoop = RenderLoop;
***REMOVED***);

__ace_shadowed__.define('ace/layer/font_metrics', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/lib/dom', 'ace/lib/lang', 'ace/lib/event_emitter'], function(require, exports, module) ***REMOVED***

var oop = require("../lib/oop");
var dom = require("../lib/dom");
var lang = require("../lib/lang");
var EventEmitter = require("../lib/event_emitter").EventEmitter;

var CHAR_COUNT = 0;

var FontMetrics = exports.FontMetrics = function(parentEl, interval) ***REMOVED***
    this.el = dom.createElement("div");
    this.$setMeasureNodeStyles(this.el.style, true);
    
    this.$main = dom.createElement("div");
    this.$setMeasureNodeStyles(this.$main.style);
    
    this.$measureNode = dom.createElement("div");
    this.$setMeasureNodeStyles(this.$measureNode.style);
    
    
    this.el.appendChild(this.$main);
    this.el.appendChild(this.$measureNode);
    parentEl.appendChild(this.el);
    
    if (!CHAR_COUNT)
        this.$testFractionalRect();
    this.$measureNode.innerHTML = lang.stringRepeat("X", CHAR_COUNT);
    
    this.$characterSize = ***REMOVED***width: 0, height: 0***REMOVED***;
    this.checkForSizeChanges();
***REMOVED***;

(function() ***REMOVED***

    oop.implement(this, EventEmitter);
        
    this.$characterSize = ***REMOVED***width: 0, height: 0***REMOVED***;
    
    this.$testFractionalRect = function() ***REMOVED***
        var el = dom.createElement("div");
        this.$setMeasureNodeStyles(el.style);
        el.style.width = "0.2px";
        document.documentElement.appendChild(el);
        var w = el.getBoundingClientRect().width;
        if (w > 0 && w < 1)
            CHAR_COUNT = 1;
        else
            CHAR_COUNT = 100;
        el.parentNode.removeChild(el);
***REMOVED***;
    
    this.$setMeasureNodeStyles = function(style, isRoot) ***REMOVED***
        style.width = style.height = "auto";
        style.left = style.top = "-100px";
        style.visibility = "hidden";
        style.position = "fixed";
        style.whiteSpace = "pre";
        style.font = "inherit";
        style.overflow = isRoot ? "hidden" : "visible";
***REMOVED***;

    this.checkForSizeChanges = function() ***REMOVED***
        var size = this.$measureSizes();
        if (size && (this.$characterSize.width !== size.width || this.$characterSize.height !== size.height)) ***REMOVED***
            this.$measureNode.style.fontWeight = "bold";
            var boldSize = this.$measureSizes();
            this.$measureNode.style.fontWeight = "";
            this.$characterSize = size;
            this.charSizes = Object.create(null);
            this.allowBoldFonts = boldSize && boldSize.width === size.width && boldSize.height === size.height;
            this._emit("changeCharacterSize", ***REMOVED***data: size***REMOVED***);
    ***REMOVED***
***REMOVED***;

    this.$pollSizeChanges = function() ***REMOVED***
        if (this.$pollSizeChangesTimer)
            return this.$pollSizeChangesTimer;
        var self = this;
        return this.$pollSizeChangesTimer = setInterval(function() ***REMOVED***
            self.checkForSizeChanges();
    ***REMOVED*** 500);
***REMOVED***;
    
    this.setPolling = function(val) ***REMOVED***
        if (val) ***REMOVED***
            this.$pollSizeChanges();
    ***REMOVED*** else ***REMOVED***
            if (this.$pollSizeChangesTimer)
                this.$pollSizeChangesTimer;
    ***REMOVED***
***REMOVED***;

    this.$measureSizes = function() ***REMOVED***
        if (CHAR_COUNT === 1) ***REMOVED***
            var rect = this.$measureNode.getBoundingClientRect();
            var size = ***REMOVED***
                height: rect.height,
                width: rect.width
        ***REMOVED***;
    ***REMOVED*** else ***REMOVED***
            var size = ***REMOVED***
                height: this.$measureNode.clientHeight,
                width: this.$measureNode.clientWidth / CHAR_COUNT
        ***REMOVED***;
    ***REMOVED***
        if (size.width === 0 || size.height === 0)
            return null;
        return size;
***REMOVED***;

    this.$measureCharWidth = function(ch) ***REMOVED***
        this.$main.innerHTML = lang.stringRepeat(ch, CHAR_COUNT);
        var rect = this.$main.getBoundingClientRect();
        return rect.width / CHAR_COUNT;
***REMOVED***;
    
    this.getCharacterWidth = function(ch) ***REMOVED***
        var w = this.charSizes[ch];
        if (w === undefined) ***REMOVED***
            this.charSizes[ch] = this.$measureCharWidth(ch) / this.$characterSize.width;
    ***REMOVED***
        return w;
***REMOVED***;

    this.destroy = function() ***REMOVED***
        clearInterval(this.$pollSizeChangesTimer);
        if (this.el && this.el.parentNode)
            this.el.parentNode.removeChild(this.el);
***REMOVED***;

***REMOVED***).call(FontMetrics.prototype);

***REMOVED***);

__ace_shadowed__.define('ace/multi_select', ['require', 'exports', 'module' , 'ace/range_list', 'ace/range', 'ace/selection', 'ace/mouse/multi_select_handler', 'ace/lib/event', 'ace/lib/lang', 'ace/commands/multi_select_commands', 'ace/search', 'ace/edit_session', 'ace/editor', 'ace/config'], function(require, exports, module) ***REMOVED***

var RangeList = require("./range_list").RangeList;
var Range = require("./range").Range;
var Selection = require("./selection").Selection;
var onMouseDown = require("./mouse/multi_select_handler").onMouseDown;
var event = require("./lib/event");
var lang = require("./lib/lang");
var commands = require("./commands/multi_select_commands");
exports.commands = commands.defaultCommands.concat(commands.multiSelectCommands);
var Search = require("./search").Search;
var search = new Search();

function find(session, needle, dir) ***REMOVED***
    search.$options.wrap = true;
    search.$options.needle = needle;
    search.$options.backwards = dir == -1;
    return search.find(session);
***REMOVED***
var EditSession = require("./edit_session").EditSession;
(function() ***REMOVED***
    this.getSelectionMarkers = function() ***REMOVED***
        return this.$selectionMarkers;
***REMOVED***;
***REMOVED***).call(EditSession.prototype);
(function() ***REMOVED***
    this.ranges = null;
    this.rangeList = null;
    this.addRange = function(range, $blockChangeEvents) ***REMOVED***
        if (!range)
            return;

        if (!this.inMultiSelectMode && this.rangeCount == 0) ***REMOVED***
            var oldRange = this.toOrientedRange();
            this.rangeList.add(oldRange);
            this.rangeList.add(range);
            if (this.rangeList.ranges.length != 2) ***REMOVED***
                this.rangeList.removeAll();
                return $blockChangeEvents || this.fromOrientedRange(range);
        ***REMOVED***
            this.rangeList.removeAll();
            this.rangeList.add(oldRange);
            this.$onAddRange(oldRange);
    ***REMOVED***

        if (!range.cursor)
            range.cursor = range.end;

        var removed = this.rangeList.add(range);

        this.$onAddRange(range);

        if (removed.length)
            this.$onRemoveRange(removed);

        if (this.rangeCount > 1 && !this.inMultiSelectMode) ***REMOVED***
            this._signal("multiSelect");
            this.inMultiSelectMode = true;
            this.session.$undoSelect = false;
            this.rangeList.attach(this.session);
    ***REMOVED***

        return $blockChangeEvents || this.fromOrientedRange(range);
***REMOVED***;

    this.toSingleRange = function(range) ***REMOVED***
        range = range || this.ranges[0];
        var removed = this.rangeList.removeAll();
        if (removed.length)
            this.$onRemoveRange(removed);

        range && this.fromOrientedRange(range);
***REMOVED***;
    this.substractPoint = function(pos) ***REMOVED***
        var removed = this.rangeList.substractPoint(pos);
        if (removed) ***REMOVED***
            this.$onRemoveRange(removed);
            return removed[0];
    ***REMOVED***
***REMOVED***;
    this.mergeOverlappingRanges = function() ***REMOVED***
        var removed = this.rangeList.merge();
        if (removed.length)
            this.$onRemoveRange(removed);
        else if(this.ranges[0])
            this.fromOrientedRange(this.ranges[0]);
***REMOVED***;

    this.$onAddRange = function(range) ***REMOVED***
        this.rangeCount = this.rangeList.ranges.length;
        this.ranges.unshift(range);
        this._signal("addRange", ***REMOVED***range: range***REMOVED***);
***REMOVED***;

    this.$onRemoveRange = function(removed) ***REMOVED***
        this.rangeCount = this.rangeList.ranges.length;
        if (this.rangeCount == 1 && this.inMultiSelectMode) ***REMOVED***
            var lastRange = this.rangeList.ranges.pop();
            removed.push(lastRange);
            this.rangeCount = 0;
    ***REMOVED***

        for (var i = removed.length; i--; ) ***REMOVED***
            var index = this.ranges.indexOf(removed[i]);
            this.ranges.splice(index, 1);
    ***REMOVED***

        this._signal("removeRange", ***REMOVED***ranges: removed***REMOVED***);

        if (this.rangeCount == 0 && this.inMultiSelectMode) ***REMOVED***
            this.inMultiSelectMode = false;
            this._signal("singleSelect");
            this.session.$undoSelect = true;
            this.rangeList.detach(this.session);
    ***REMOVED***

        lastRange = lastRange || this.ranges[0];
        if (lastRange && !lastRange.isEqual(this.getRange()))
            this.fromOrientedRange(lastRange);
***REMOVED***;
    this.$initRangeList = function() ***REMOVED***
        if (this.rangeList)
            return;

        this.rangeList = new RangeList();
        this.ranges = [];
        this.rangeCount = 0;
***REMOVED***;
    this.getAllRanges = function() ***REMOVED***
        return this.rangeCount ? this.rangeList.ranges.concat() : [this.getRange()];
***REMOVED***;

    this.splitIntoLines = function () ***REMOVED***
        if (this.rangeCount > 1) ***REMOVED***
            var ranges = this.rangeList.ranges;
            var lastRange = ranges[ranges.length - 1];
            var range = Range.fromPoints(ranges[0].start, lastRange.end);

            this.toSingleRange();
            this.setSelectionRange(range, lastRange.cursor == lastRange.start);
    ***REMOVED*** else ***REMOVED***
            var range = this.getRange();
            var isBackwards = this.isBackwards();
            var startRow = range.start.row;
            var endRow = range.end.row;
            if (startRow == endRow) ***REMOVED***
                if (isBackwards)
                    var start = range.end, end = range.start;
                else
                    var start = range.start, end = range.end;
                
                this.addRange(Range.fromPoints(end, end));
                this.addRange(Range.fromPoints(start, start));
                return;
        ***REMOVED***

            var rectSel = [];
            var r = this.getLineRange(startRow, true);
            r.start.column = range.start.column;
            rectSel.push(r);

            for (var i = startRow + 1; i < endRow; i++)
                rectSel.push(this.getLineRange(i, true));

            r = this.getLineRange(endRow, true);
            r.end.column = range.end.column;
            rectSel.push(r);

            rectSel.forEach(this.addRange, this);
    ***REMOVED***
***REMOVED***;
    this.toggleBlockSelection = function () ***REMOVED***
        if (this.rangeCount > 1) ***REMOVED***
            var ranges = this.rangeList.ranges;
            var lastRange = ranges[ranges.length - 1];
            var range = Range.fromPoints(ranges[0].start, lastRange.end);

            this.toSingleRange();
            this.setSelectionRange(range, lastRange.cursor == lastRange.start);
    ***REMOVED*** else ***REMOVED***
            var cursor = this.session.documentToScreenPosition(this.selectionLead);
            var anchor = this.session.documentToScreenPosition(this.selectionAnchor);

            var rectSel = this.rectangularRangeBlock(cursor, anchor);
            rectSel.forEach(this.addRange, this);
    ***REMOVED***
***REMOVED***;
    this.rectangularRangeBlock = function(screenCursor, screenAnchor, includeEmptyLines) ***REMOVED***
        var rectSel = [];

        var xBackwards = screenCursor.column < screenAnchor.column;
        if (xBackwards) ***REMOVED***
            var startColumn = screenCursor.column;
            var endColumn = screenAnchor.column;
    ***REMOVED*** else ***REMOVED***
            var startColumn = screenAnchor.column;
            var endColumn = screenCursor.column;
    ***REMOVED***

        var yBackwards = screenCursor.row < screenAnchor.row;
        if (yBackwards) ***REMOVED***
            var startRow = screenCursor.row;
            var endRow = screenAnchor.row;
    ***REMOVED*** else ***REMOVED***
            var startRow = screenAnchor.row;
            var endRow = screenCursor.row;
    ***REMOVED***

        if (startColumn < 0)
            startColumn = 0;
        if (startRow < 0)
            startRow = 0;

        if (startRow == endRow)
            includeEmptyLines = true;

        for (var row = startRow; row <= endRow; row++) ***REMOVED***
            var range = Range.fromPoints(
                this.session.screenToDocumentPosition(row, startColumn),
                this.session.screenToDocumentPosition(row, endColumn)
            );
            if (range.isEmpty()) ***REMOVED***
                if (docEnd && isSamePoint(range.end, docEnd))
                    break;
                var docEnd = range.end;
        ***REMOVED***
            range.cursor = xBackwards ? range.start : range.end;
            rectSel.push(range);
    ***REMOVED***

        if (yBackwards)
            rectSel.reverse();

        if (!includeEmptyLines) ***REMOVED***
            var end = rectSel.length - 1;
            while (rectSel[end].isEmpty() && end > 0)
                end--;
            if (end > 0) ***REMOVED***
                var start = 0;
                while (rectSel[start].isEmpty())
                    start++;
        ***REMOVED***
            for (var i = end; i >= start; i--) ***REMOVED***
                if (rectSel[i].isEmpty())
                    rectSel.splice(i, 1);
        ***REMOVED***
    ***REMOVED***

        return rectSel;
***REMOVED***;
***REMOVED***).call(Selection.prototype);
var Editor = require("./editor").Editor;
(function() ***REMOVED***
    this.updateSelectionMarkers = function() ***REMOVED***
        this.renderer.updateCursor();
        this.renderer.updateBackMarkers();
***REMOVED***;
    this.addSelectionMarker = function(orientedRange) ***REMOVED***
        if (!orientedRange.cursor)
            orientedRange.cursor = orientedRange.end;

        var style = this.getSelectionStyle();
        orientedRange.marker = this.session.addMarker(orientedRange, "ace_selection", style);

        this.session.$selectionMarkers.push(orientedRange);
        this.session.selectionMarkerCount = this.session.$selectionMarkers.length;
        return orientedRange;
***REMOVED***;
    this.removeSelectionMarker = function(range) ***REMOVED***
        if (!range.marker)
            return;
        this.session.removeMarker(range.marker);
        var index = this.session.$selectionMarkers.indexOf(range);
        if (index != -1)
            this.session.$selectionMarkers.splice(index, 1);
        this.session.selectionMarkerCount = this.session.$selectionMarkers.length;
***REMOVED***;

    this.removeSelectionMarkers = function(ranges) ***REMOVED***
        var markerList = this.session.$selectionMarkers;
        for (var i = ranges.length; i--; ) ***REMOVED***
            var range = ranges[i];
            if (!range.marker)
                continue;
            this.session.removeMarker(range.marker);
            var index = markerList.indexOf(range);
            if (index != -1)
                markerList.splice(index, 1);
    ***REMOVED***
        this.session.selectionMarkerCount = markerList.length;
***REMOVED***;

    this.$onAddRange = function(e) ***REMOVED***
        this.addSelectionMarker(e.range);
        this.renderer.updateCursor();
        this.renderer.updateBackMarkers();
***REMOVED***;

    this.$onRemoveRange = function(e) ***REMOVED***
        this.removeSelectionMarkers(e.ranges);
        this.renderer.updateCursor();
        this.renderer.updateBackMarkers();
***REMOVED***;

    this.$onMultiSelect = function(e) ***REMOVED***
        if (this.inMultiSelectMode)
            return;
        this.inMultiSelectMode = true;

        this.setStyle("ace_multiselect");
        this.keyBinding.addKeyboardHandler(commands.keyboardHandler);
        this.commands.setDefaultHandler("exec", this.$onMultiSelectExec);

        this.renderer.updateCursor();
        this.renderer.updateBackMarkers();
***REMOVED***;

    this.$onSingleSelect = function(e) ***REMOVED***
        if (this.session.multiSelect.inVirtualMode)
            return;
        this.inMultiSelectMode = false;

        this.unsetStyle("ace_multiselect");
        this.keyBinding.removeKeyboardHandler(commands.keyboardHandler);

        this.commands.removeDefaultHandler("exec", this.$onMultiSelectExec);
        this.renderer.updateCursor();
        this.renderer.updateBackMarkers();
        this._emit("changeSelection");
***REMOVED***;

    this.$onMultiSelectExec = function(e) ***REMOVED***
        var command = e.command;
        var editor = e.editor;
        if (!editor.multiSelect)
            return;
        if (!command.multiSelectAction) ***REMOVED***
            var result = command.exec(editor, e.args || ***REMOVED******REMOVED***);
            editor.multiSelect.addRange(editor.multiSelect.toOrientedRange());
            editor.multiSelect.mergeOverlappingRanges();
    ***REMOVED*** else if (command.multiSelectAction == "forEach") ***REMOVED***
            result = editor.forEachSelection(command, e.args);
    ***REMOVED*** else if (command.multiSelectAction == "forEachLine") ***REMOVED***
            result = editor.forEachSelection(command, e.args, true);
    ***REMOVED*** else if (command.multiSelectAction == "single") ***REMOVED***
            editor.exitMultiSelectMode();
            result = command.exec(editor, e.args || ***REMOVED******REMOVED***);
    ***REMOVED*** else ***REMOVED***
            result = command.multiSelectAction(editor, e.args || ***REMOVED******REMOVED***);
    ***REMOVED***
        return result;
***REMOVED***; 
    this.forEachSelection = function(cmd, args, $byLines) ***REMOVED***
        if (this.inVirtualSelectionMode)
            return;

        var session = this.session;
        var selection = this.selection;
        var rangeList = selection.rangeList;
        var result;
        
        var reg = selection._eventRegistry;
        selection._eventRegistry = ***REMOVED******REMOVED***;

        var tmpSel = new Selection(session);
        this.inVirtualSelectionMode = true;
        for (var i = rangeList.ranges.length; i--;) ***REMOVED***
            if ($byLines) ***REMOVED***
                while (i > 0 && rangeList.ranges[i].start.row == rangeList.ranges[i - 1].end.row)
                    i--;
        ***REMOVED***
            tmpSel.fromOrientedRange(rangeList.ranges[i]);
            tmpSel.id = rangeList.ranges[i].marker;
            this.selection = session.selection = tmpSel;
            var cmdResult = cmd.exec(this, args || ***REMOVED******REMOVED***);
            if (result !== undefined)
                result = cmdResult;
            tmpSel.toOrientedRange(rangeList.ranges[i]);
    ***REMOVED***
        tmpSel.detach();

        this.selection = session.selection = selection;
        this.inVirtualSelectionMode = false;
        selection._eventRegistry = reg;
        selection.mergeOverlappingRanges();
        
        var anim = this.renderer.$scrollAnimation;
        this.onCursorChange();
        this.onSelectionChange();
        if (anim && anim.from == anim.to)
            this.renderer.animateScrolling(anim.from);
        
        return result;
***REMOVED***;
    this.exitMultiSelectMode = function() ***REMOVED***
        if (!this.inMultiSelectMode || this.inVirtualSelectionMode)
            return;
        this.multiSelect.toSingleRange();
***REMOVED***;

    this.getSelectedText = function() ***REMOVED***
        var text = "";
        if (this.inMultiSelectMode && !this.inVirtualSelectionMode) ***REMOVED***
            var ranges = this.multiSelect.rangeList.ranges;
            var buf = [];
            for (var i = 0; i < ranges.length; i++) ***REMOVED***
                buf.push(this.session.getTextRange(ranges[i]));
        ***REMOVED***
            var nl = this.session.getDocument().getNewLineCharacter();
            text = buf.join(nl);
            if (text.length == (buf.length - 1) * nl.length)
                text = "";
    ***REMOVED*** else if (!this.selection.isEmpty()) ***REMOVED***
            text = this.session.getTextRange(this.getSelectionRange());
    ***REMOVED***
        return text;
***REMOVED***;
    this.onPaste = function(text) ***REMOVED***
        if (this.$readOnly)
            return;


        var e = ***REMOVED***text: text***REMOVED***;
        this._signal("paste", e);
        text = e.text;
        if (!this.inMultiSelectMode || this.inVirtualSelectionMode)
            return this.insert(text);

        var lines = text.split(/\r\n|\r|\n/);
        var ranges = this.selection.rangeList.ranges;

        if (lines.length > ranges.length || lines.length < 2 || !lines[1])
            return this.commands.exec("insertstring", this, text);

        for (var i = ranges.length; i--;) ***REMOVED***
            var range = ranges[i];
            if (!range.isEmpty())
                this.session.remove(range);

            this.session.insert(range.start, lines[i]);
    ***REMOVED***
***REMOVED***;
    this.findAll = function(needle, options, additive) ***REMOVED***
        options = options || ***REMOVED******REMOVED***;
        options.needle = needle || options.needle;
        this.$search.set(options);

        var ranges = this.$search.findAll(this.session);
        if (!ranges.length)
            return 0;

        this.$blockScrolling += 1;
        var selection = this.multiSelect;

        if (!additive)
            selection.toSingleRange(ranges[0]);

        for (var i = ranges.length; i--; )
            selection.addRange(ranges[i], true);

        this.$blockScrolling -= 1;

        return ranges.length;
***REMOVED***;
    this.selectMoreLines = function(dir, skip) ***REMOVED***
        var range = this.selection.toOrientedRange();
        var isBackwards = range.cursor == range.end;

        var screenLead = this.session.documentToScreenPosition(range.cursor);
        if (this.selection.$desiredColumn)
            screenLead.column = this.selection.$desiredColumn;

        var lead = this.session.screenToDocumentPosition(screenLead.row + dir, screenLead.column);

        if (!range.isEmpty()) ***REMOVED***
            var screenAnchor = this.session.documentToScreenPosition(isBackwards ? range.end : range.start);
            var anchor = this.session.screenToDocumentPosition(screenAnchor.row + dir, screenAnchor.column);
    ***REMOVED*** else ***REMOVED***
            var anchor = lead;
    ***REMOVED***

        if (isBackwards) ***REMOVED***
            var newRange = Range.fromPoints(lead, anchor);
            newRange.cursor = newRange.start;
    ***REMOVED*** else ***REMOVED***
            var newRange = Range.fromPoints(anchor, lead);
            newRange.cursor = newRange.end;
    ***REMOVED***

        newRange.desiredColumn = screenLead.column;
        if (!this.selection.inMultiSelectMode) ***REMOVED***
            this.selection.addRange(range);
    ***REMOVED*** else ***REMOVED***
            if (skip)
                var toRemove = range.cursor;
    ***REMOVED***

        this.selection.addRange(newRange);
        if (toRemove)
            this.selection.substractPoint(toRemove);
***REMOVED***;
    this.transposeSelections = function(dir) ***REMOVED***
        var session = this.session;
        var sel = session.multiSelect;
        var all = sel.ranges;

        for (var i = all.length; i--; ) ***REMOVED***
            var range = all[i];
            if (range.isEmpty()) ***REMOVED***
                var tmp = session.getWordRange(range.start.row, range.start.column);
                range.start.row = tmp.start.row;
                range.start.column = tmp.start.column;
                range.end.row = tmp.end.row;
                range.end.column = tmp.end.column;
        ***REMOVED***
    ***REMOVED***
        sel.mergeOverlappingRanges();

        var words = [];
        for (var i = all.length; i--; ) ***REMOVED***
            var range = all[i];
            words.unshift(session.getTextRange(range));
    ***REMOVED***

        if (dir < 0)
            words.unshift(words.pop());
        else
            words.push(words.shift());

        for (var i = all.length; i--; ) ***REMOVED***
            var range = all[i];
            var tmp = range.clone();
            session.replace(range, words[i]);
            range.start.row = tmp.start.row;
            range.start.column = tmp.start.column;
    ***REMOVED***
***REMOVED***;
    this.selectMore = function(dir, skip) ***REMOVED***
        var session = this.session;
        var sel = session.multiSelect;

        var range = sel.toOrientedRange();
        if (range.isEmpty()) ***REMOVED***
            range = session.getWordRange(range.start.row, range.start.column);
            range.cursor = dir == -1 ? range.start : range.end;
            this.multiSelect.addRange(range);
    ***REMOVED***
        var needle = session.getTextRange(range);

        var newRange = find(session, needle, dir);
        if (newRange) ***REMOVED***
            newRange.cursor = dir == -1 ? newRange.start : newRange.end;
            this.$blockScrolling += 1;
            this.session.unfold(newRange);
            this.multiSelect.addRange(newRange);
            this.$blockScrolling -= 1;
            this.renderer.scrollCursorIntoView(null, 0.5);
    ***REMOVED***
        if (skip)
            this.multiSelect.substractPoint(range.cursor);
***REMOVED***;
    this.alignCursors = function() ***REMOVED***
        var session = this.session;
        var sel = session.multiSelect;
        var ranges = sel.ranges;

        if (!ranges.length) ***REMOVED***
            var range = this.selection.getRange();
            var fr = range.start.row, lr = range.end.row;
            var guessRange = fr == lr;
            if (guessRange) ***REMOVED***
                var max = this.session.getLength();
                var line;
                do ***REMOVED***
                    line = this.session.getLine(lr);
            ***REMOVED*** while (/[=:]/.test(line) && ++lr < max);
                do ***REMOVED***
                    line = this.session.getLine(fr);
            ***REMOVED*** while (/[=:]/.test(line) && --fr > 0);
                
                if (fr < 0) fr = 0;
                if (lr >= max) lr = max - 1;
        ***REMOVED***
            var lines = this.session.doc.removeLines(fr, lr);
            lines = this.$reAlignText(lines, guessRange);
            this.session.doc.insert(***REMOVED***row: fr, column: 0***REMOVED***, lines.join("\n") + "\n");
            if (!guessRange) ***REMOVED***
                range.start.column = 0;
                range.end.column = lines[lines.length - 1].length;
        ***REMOVED***
            this.selection.setRange(range);
    ***REMOVED*** else ***REMOVED***
            var row = -1;
            var sameRowRanges = ranges.filter(function(r) ***REMOVED***
                if (r.cursor.row == row)
                    return true;
                row = r.cursor.row;
        ***REMOVED***);
            sel.$onRemoveRange(sameRowRanges);

            var maxCol = 0;
            var minSpace = Infinity;
            var spaceOffsets = ranges.map(function(r) ***REMOVED***
                var p = r.cursor;
                var line = session.getLine(p.row);
                var spaceOffset = line.substr(p.column).search(/\S/g);
                if (spaceOffset == -1)
                    spaceOffset = 0;

                if (p.column > maxCol)
                    maxCol = p.column;
                if (spaceOffset < minSpace)
                    minSpace = spaceOffset;
                return spaceOffset;
        ***REMOVED***);
            ranges.forEach(function(r, i) ***REMOVED***
                var p = r.cursor;
                var l = maxCol - p.column;
                var d = spaceOffsets[i] - minSpace;
                if (l > d)
                    session.insert(p, lang.stringRepeat(" ", l - d));
                else
                    session.remove(new Range(p.row, p.column, p.row, p.column - l + d));

                r.start.column = r.end.column = maxCol;
                r.start.row = r.end.row = p.row;
                r.cursor = r.end;
        ***REMOVED***);
            sel.fromOrientedRange(ranges[0]);
            this.renderer.updateCursor();
            this.renderer.updateBackMarkers();
    ***REMOVED***
***REMOVED***;

    this.$reAlignText = function(lines, forceLeft) ***REMOVED***
        var isLeftAligned = true, isRightAligned = true;
        var startW, textW, endW;

        return lines.map(function(line) ***REMOVED***
            var m = line.match(/(\s*)(.*?)(\s*)([=:].*)/);
            if (!m)
                return [line];

            if (startW == null) ***REMOVED***
                startW = m[1].length;
                textW = m[2].length;
                endW = m[3].length;
                return m;
        ***REMOVED***

            if (startW + textW + endW != m[1].length + m[2].length + m[3].length)
                isRightAligned = false;
            if (startW != m[1].length)
                isLeftAligned = false;

            if (startW > m[1].length)
                startW = m[1].length;
            if (textW < m[2].length)
                textW = m[2].length;
            if (endW > m[3].length)
                endW = m[3].length;

            return m;
    ***REMOVED***).map(forceLeft ? alignLeft :
            isLeftAligned ? isRightAligned ? alignRight : alignLeft : unAlign);

        function spaces(n) ***REMOVED***
            return lang.stringRepeat(" ", n);
    ***REMOVED***

        function alignLeft(m) ***REMOVED***
            return !m[2] ? m[0] : spaces(startW) + m[2]
                + spaces(textW - m[2].length + endW)
                + m[4].replace(/^([=:])\s+/, "$1 ")
    ***REMOVED***
        function alignRight(m) ***REMOVED***
            return !m[2] ? m[0] : spaces(startW + textW - m[2].length) + m[2]
                + spaces(endW, " ")
                + m[4].replace(/^([=:])\s+/, "$1 ")
    ***REMOVED***
        function unAlign(m) ***REMOVED***
            return !m[2] ? m[0] : spaces(startW) + m[2]
                + spaces(endW)
                + m[4].replace(/^([=:])\s+/, "$1 ")
    ***REMOVED***
***REMOVED***
***REMOVED***).call(Editor.prototype);


function isSamePoint(p1, p2) ***REMOVED***
    return p1.row == p2.row && p1.column == p2.column;
***REMOVED***
exports.onSessionChange = function(e) ***REMOVED***
    var session = e.session;
    if (!session.multiSelect) ***REMOVED***
        session.$selectionMarkers = [];
        session.selection.$initRangeList();
        session.multiSelect = session.selection;
***REMOVED***
    this.multiSelect = session.multiSelect;

    var oldSession = e.oldSession;
    if (oldSession) ***REMOVED***
        oldSession.multiSelect.removeEventListener("addRange", this.$onAddRange);
        oldSession.multiSelect.removeEventListener("removeRange", this.$onRemoveRange);
        oldSession.multiSelect.removeEventListener("multiSelect", this.$onMultiSelect);
        oldSession.multiSelect.removeEventListener("singleSelect", this.$onSingleSelect);
***REMOVED***

    session.multiSelect.on("addRange", this.$onAddRange);
    session.multiSelect.on("removeRange", this.$onRemoveRange);
    session.multiSelect.on("multiSelect", this.$onMultiSelect);
    session.multiSelect.on("singleSelect", this.$onSingleSelect);

    if (this.inMultiSelectMode != session.selection.inMultiSelectMode) ***REMOVED***
        if (session.selection.inMultiSelectMode)
            this.$onMultiSelect();
        else
            this.$onSingleSelect();
***REMOVED***
***REMOVED***;
function MultiSelect(editor) ***REMOVED***
    if (editor.$multiselectOnSessionChange)
        return;
    editor.$onAddRange = editor.$onAddRange.bind(editor);
    editor.$onRemoveRange = editor.$onRemoveRange.bind(editor);
    editor.$onMultiSelect = editor.$onMultiSelect.bind(editor);
    editor.$onSingleSelect = editor.$onSingleSelect.bind(editor);
    editor.$multiselectOnSessionChange = exports.onSessionChange.bind(editor);

    editor.$multiselectOnSessionChange(editor);
    editor.on("changeSession", editor.$multiselectOnSessionChange);

    editor.on("mousedown", onMouseDown);
    editor.commands.addCommands(commands.defaultCommands);

    addAltCursorListeners(editor);
***REMOVED***

function addAltCursorListeners(editor)***REMOVED***
    var el = editor.textInput.getElement();
    var altCursor = false;
    event.addListener(el, "keydown", function(e) ***REMOVED***
        if (e.keyCode == 18 && !(e.ctrlKey || e.shiftKey || e.metaKey)) ***REMOVED***
            if (!altCursor) ***REMOVED***
                editor.renderer.setMouseCursor("crosshair");
                altCursor = true;
        ***REMOVED***
    ***REMOVED*** else if (altCursor) ***REMOVED***
            reset();
    ***REMOVED***
***REMOVED***);

    event.addListener(el, "keyup", reset);
    event.addListener(el, "blur", reset);
    function reset(e) ***REMOVED***
        if (altCursor) ***REMOVED***
            editor.renderer.setMouseCursor("");
            altCursor = false;
    ***REMOVED***
***REMOVED***
***REMOVED***

exports.MultiSelect = MultiSelect;


require("./config").defineOptions(Editor.prototype, "editor", ***REMOVED***
    enableMultiselect: ***REMOVED***
        set: function(val) ***REMOVED***
            MultiSelect(this);
            if (val) ***REMOVED***
                this.on("changeSession", this.$multiselectOnSessionChange);
                this.on("mousedown", onMouseDown);
        ***REMOVED*** else ***REMOVED***
                this.off("changeSession", this.$multiselectOnSessionChange);
                this.off("mousedown", onMouseDown);
        ***REMOVED***
    ***REMOVED***
        value: true
***REMOVED***
***REMOVED***)



***REMOVED***);

__ace_shadowed__.define('ace/mouse/multi_select_handler', ['require', 'exports', 'module' , 'ace/lib/event'], function(require, exports, module) ***REMOVED***

var event = require("../lib/event");
function isSamePoint(p1, p2) ***REMOVED***
    return p1.row == p2.row && p1.column == p2.column;
***REMOVED***

function onMouseDown(e) ***REMOVED***
    var ev = e.domEvent;
    var alt = ev.altKey;
    var shift = ev.shiftKey;
    var ctrl = e.getAccelKey();
    var button = e.getButton();

    if (e.editor.inMultiSelectMode && button == 2) ***REMOVED***
        e.editor.textInput.onContextMenu(e.domEvent);
        return;
***REMOVED***
    
    if (!ctrl && !alt) ***REMOVED***
        if (button === 0 && e.editor.inMultiSelectMode)
            e.editor.exitMultiSelectMode();
        return;
***REMOVED***

    var editor = e.editor;
    var selection = editor.selection;
    var isMultiSelect = editor.inMultiSelectMode;
    var pos = e.getDocumentPosition();
    var cursor = selection.getCursor();
    var inSelection = e.inSelection() || (selection.isEmpty() && isSamePoint(pos, cursor));


    var mouseX = e.x, mouseY = e.y;
    var onMouseSelection = function(e) ***REMOVED***
        mouseX = e.clientX;
        mouseY = e.clientY;
***REMOVED***;

    var blockSelect = function() ***REMOVED***
        var newCursor = editor.renderer.pixelToScreenCoordinates(mouseX, mouseY);
        var cursor = session.screenToDocumentPosition(newCursor.row, newCursor.column);

        if (isSamePoint(screenCursor, newCursor)
            && isSamePoint(cursor, selection.selectionLead))
            return;
        screenCursor = newCursor;

        editor.selection.moveToPosition(cursor);
        editor.renderer.scrollCursorIntoView();

        editor.removeSelectionMarkers(rectSel);
        rectSel = selection.rectangularRangeBlock(screenCursor, screenAnchor);
        rectSel.forEach(editor.addSelectionMarker, editor);
        editor.updateSelectionMarkers();
***REMOVED***;
    
    var session = editor.session;
    var screenAnchor = editor.renderer.pixelToScreenCoordinates(mouseX, mouseY);
    var screenCursor = screenAnchor;

    

    if (ctrl && !alt && !shift && button === 0) ***REMOVED***
        if (!isMultiSelect && inSelection)
            return; // dragging

        if (!isMultiSelect) ***REMOVED***
            var range = selection.toOrientedRange();
            editor.addSelectionMarker(range);
    ***REMOVED***

        var oldRange = selection.rangeList.rangeAtPoint(pos);
        
        editor.$blockScrolling++;
        editor.once("mouseup", function() ***REMOVED***
            var tmpSel = selection.toOrientedRange();

            if (oldRange && tmpSel.isEmpty() && isSamePoint(oldRange.cursor, tmpSel.cursor))
                selection.substractPoint(tmpSel.cursor);
            else ***REMOVED***
                if (range) ***REMOVED***
                    editor.removeSelectionMarker(range);
                    selection.addRange(range);
            ***REMOVED***
                selection.addRange(tmpSel);
        ***REMOVED***
            editor.$blockScrolling--;
    ***REMOVED***);

***REMOVED*** else if (alt && button === 0) ***REMOVED***
        e.stop();

        if (isMultiSelect && !ctrl)
            selection.toSingleRange();
        else if (!isMultiSelect && ctrl)
            selection.addRange();

        var rectSel = [];
        if (shift) ***REMOVED***
            screenAnchor = session.documentToScreenPosition(selection.lead);
            blockSelect();
    ***REMOVED*** else ***REMOVED***
            selection.moveToPosition(pos);
    ***REMOVED***


        var onMouseSelectionEnd = function(e) ***REMOVED***
            clearInterval(timerId);
            editor.removeSelectionMarkers(rectSel);
            for (var i = 0; i < rectSel.length; i++)
                selection.addRange(rectSel[i]);
    ***REMOVED***;

        var onSelectionInterval = blockSelect;

        event.capture(editor.container, onMouseSelection, onMouseSelectionEnd);
        var timerId = setInterval(function() ***REMOVED***onSelectionInterval();***REMOVED***, 20);

        return e.preventDefault();
***REMOVED***
***REMOVED***


exports.onMouseDown = onMouseDown;

***REMOVED***);

__ace_shadowed__.define('ace/commands/multi_select_commands', ['require', 'exports', 'module' , 'ace/keyboard/hash_handler'], function(require, exports, module) ***REMOVED***
exports.defaultCommands = [***REMOVED***
    name: "addCursorAbove",
    exec: function(editor) ***REMOVED*** editor.selectMoreLines(-1); ***REMOVED***,
    bindKey: ***REMOVED***win: "Ctrl-Alt-Up", mac: "Ctrl-Alt-Up"***REMOVED***,
    readonly: true
***REMOVED***, ***REMOVED***
    name: "addCursorBelow",
    exec: function(editor) ***REMOVED*** editor.selectMoreLines(1); ***REMOVED***,
    bindKey: ***REMOVED***win: "Ctrl-Alt-Down", mac: "Ctrl-Alt-Down"***REMOVED***,
    readonly: true
***REMOVED***, ***REMOVED***
    name: "addCursorAboveSkipCurrent",
    exec: function(editor) ***REMOVED*** editor.selectMoreLines(-1, true); ***REMOVED***,
    bindKey: ***REMOVED***win: "Ctrl-Alt-Shift-Up", mac: "Ctrl-Alt-Shift-Up"***REMOVED***,
    readonly: true
***REMOVED***, ***REMOVED***
    name: "addCursorBelowSkipCurrent",
    exec: function(editor) ***REMOVED*** editor.selectMoreLines(1, true); ***REMOVED***,
    bindKey: ***REMOVED***win: "Ctrl-Alt-Shift-Down", mac: "Ctrl-Alt-Shift-Down"***REMOVED***,
    readonly: true
***REMOVED***, ***REMOVED***
    name: "selectMoreBefore",
    exec: function(editor) ***REMOVED*** editor.selectMore(-1); ***REMOVED***,
    bindKey: ***REMOVED***win: "Ctrl-Alt-Left", mac: "Ctrl-Alt-Left"***REMOVED***,
    readonly: true
***REMOVED***, ***REMOVED***
    name: "selectMoreAfter",
    exec: function(editor) ***REMOVED*** editor.selectMore(1); ***REMOVED***,
    bindKey: ***REMOVED***win: "Ctrl-Alt-Right", mac: "Ctrl-Alt-Right"***REMOVED***,
    readonly: true
***REMOVED***, ***REMOVED***
    name: "selectNextBefore",
    exec: function(editor) ***REMOVED*** editor.selectMore(-1, true); ***REMOVED***,
    bindKey: ***REMOVED***win: "Ctrl-Alt-Shift-Left", mac: "Ctrl-Alt-Shift-Left"***REMOVED***,
    readonly: true
***REMOVED***, ***REMOVED***
    name: "selectNextAfter",
    exec: function(editor) ***REMOVED*** editor.selectMore(1, true); ***REMOVED***,
    bindKey: ***REMOVED***win: "Ctrl-Alt-Shift-Right", mac: "Ctrl-Alt-Shift-Right"***REMOVED***,
    readonly: true
***REMOVED***, ***REMOVED***
    name: "splitIntoLines",
    exec: function(editor) ***REMOVED*** editor.multiSelect.splitIntoLines(); ***REMOVED***,
    bindKey: ***REMOVED***win: "Ctrl-Alt-L", mac: "Ctrl-Alt-L"***REMOVED***,
    readonly: true
***REMOVED***, ***REMOVED***
    name: "alignCursors",
    exec: function(editor) ***REMOVED*** editor.alignCursors(); ***REMOVED***,
    bindKey: ***REMOVED***win: "Ctrl-Alt-A", mac: "Ctrl-Alt-A"***REMOVED***
***REMOVED***];
exports.multiSelectCommands = [***REMOVED***
    name: "singleSelection",
    bindKey: "esc",
    exec: function(editor) ***REMOVED*** editor.exitMultiSelectMode(); ***REMOVED***,
    readonly: true,
    isAvailable: function(editor) ***REMOVED***return editor && editor.inMultiSelectMode***REMOVED***
***REMOVED***];

var HashHandler = require("../keyboard/hash_handler").HashHandler;
exports.keyboardHandler = new HashHandler(exports.multiSelectCommands);

***REMOVED***);

__ace_shadowed__.define('ace/worker/worker_client', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/lib/net', 'ace/lib/event_emitter', 'ace/config'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var net = require("../lib/net");
var EventEmitter = require("../lib/event_emitter").EventEmitter;
var config = require("../config");

var WorkerClient = function(topLevelNamespaces, mod, classname, workerUrl) ***REMOVED***
    this.$sendDeltaQueue = this.$sendDeltaQueue.bind(this);
    this.changeListener = this.changeListener.bind(this);
    this.onMessage = this.onMessage.bind(this);
    if (require.nameToUrl && !require.toUrl)
        require.toUrl = require.nameToUrl;
    
    if (config.get("packaged") || !require.toUrl) ***REMOVED***
        workerUrl = workerUrl || config.moduleUrl(mod, "worker");
***REMOVED*** else ***REMOVED***
        var normalizePath = this.$normalizePath;
        workerUrl = workerUrl || normalizePath(require.toUrl("ace/worker/worker.js", null, "_"));

        var tlns = ***REMOVED******REMOVED***;
        topLevelNamespaces.forEach(function(ns) ***REMOVED***
            tlns[ns] = normalizePath(require.toUrl(ns, null, "_").replace(/(\.js)?(\?.*)?$/, ""));
    ***REMOVED***);
***REMOVED***

    try ***REMOVED***
        this.$worker = new Worker(workerUrl);
***REMOVED*** catch(e) ***REMOVED***
        if (e instanceof window.DOMException) ***REMOVED***
            var blob = this.$workerBlob(workerUrl);
            var URL = window.URL || window.webkitURL;
            var blobURL = URL.createObjectURL(blob);

            this.$worker = new Worker(blobURL);
            URL.revokeObjectURL(blobURL);
    ***REMOVED*** else ***REMOVED***
            throw e;
    ***REMOVED***
***REMOVED***
    this.$worker.postMessage(***REMOVED***
        init : true,
        tlns : tlns,
        module : mod,
        classname : classname
***REMOVED***);

    this.callbackId = 1;
    this.callbacks = ***REMOVED******REMOVED***;

    this.$worker.onmessage = this.onMessage;
***REMOVED***;

(function()***REMOVED***

    oop.implement(this, EventEmitter);

    this.onMessage = function(e) ***REMOVED***
        var msg = e.data;
        switch(msg.type) ***REMOVED***
            case "log":
                window.console && console.log && console.log.apply(console, msg.data);
                break;

            case "event":
                this._signal(msg.name, ***REMOVED***data: msg.data***REMOVED***);
                break;

            case "call":
                var callback = this.callbacks[msg.id];
                if (callback) ***REMOVED***
                    callback(msg.data);
                    delete this.callbacks[msg.id];
            ***REMOVED***
                break;
    ***REMOVED***
***REMOVED***;

    this.$normalizePath = function(path) ***REMOVED***
        if (!location.host) // needed for file:// protocol
            return path;
        path = path.replace(/^[a-z]+:\/\/[^\/]+/, ""); // Remove domain name and rebuild it
        path = location.protocol + "//" + location.host
            + (path.charAt(0) == "/" ? "" : location.pathname.replace(/\/[^\/]*$/, ""))
            + "/" + path.replace(/^[\/]+/, "");
        return path;
***REMOVED***;

    this.terminate = function() ***REMOVED***
        this._signal("terminate", ***REMOVED******REMOVED***);
        this.deltaQueue = null;
        this.$worker.terminate();
        this.$worker = null;
        this.$doc.removeEventListener("change", this.changeListener);
        this.$doc = null;
***REMOVED***;

    this.send = function(cmd, args) ***REMOVED***
        this.$worker.postMessage(***REMOVED***command: cmd, args: args***REMOVED***);
***REMOVED***;

    this.call = function(cmd, args, callback) ***REMOVED***
        if (callback) ***REMOVED***
            var id = this.callbackId++;
            this.callbacks[id] = callback;
            args.push(id);
    ***REMOVED***
        this.send(cmd, args);
***REMOVED***;

    this.emit = function(event, data) ***REMOVED***
        try ***REMOVED***
            this.$worker.postMessage(***REMOVED***event: event, data: ***REMOVED***data: data.data***REMOVED******REMOVED***);
    ***REMOVED***
        catch(ex) ***REMOVED******REMOVED***
***REMOVED***;

    this.attachToDocument = function(doc) ***REMOVED***
        if(this.$doc)
            this.terminate();

        this.$doc = doc;
        this.call("setValue", [doc.getValue()]);
        doc.on("change", this.changeListener);
***REMOVED***;

    this.changeListener = function(e) ***REMOVED***
        if (!this.deltaQueue) ***REMOVED***
            this.deltaQueue = [e.data];
            setTimeout(this.$sendDeltaQueue, 0);
    ***REMOVED*** else
            this.deltaQueue.push(e.data);
***REMOVED***;

    this.$sendDeltaQueue = function() ***REMOVED***
        var q = this.deltaQueue;
        if (!q) return;
        this.deltaQueue = null;
        if (q.length > 20 && q.length > this.$doc.getLength() >> 1) ***REMOVED***
            this.call("setValue", [this.$doc.getValue()]);
    ***REMOVED*** else
            this.emit("change", ***REMOVED***data: q***REMOVED***);
***REMOVED***;

    this.$workerBlob = function(workerUrl) ***REMOVED***
        var script = "importScripts('" + net.qualifyURL( workerUrl ) + "');";
        try ***REMOVED***
            return new Blob([script], ***REMOVED***"type": "application/javascript"***REMOVED***);
    ***REMOVED*** catch (e) ***REMOVED*** // Backwards-compatibility
            var BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;
            var blobBuilder = new BlobBuilder();
            blobBuilder.append(script);
            return blobBuilder.getBlob("application/javascript");
    ***REMOVED***
***REMOVED***;

***REMOVED***).call(WorkerClient.prototype);


var UIWorkerClient = function(topLevelNamespaces, mod, classname) ***REMOVED***
    this.$sendDeltaQueue = this.$sendDeltaQueue.bind(this);
    this.changeListener = this.changeListener.bind(this);
    this.callbackId = 1;
    this.callbacks = ***REMOVED******REMOVED***;
    this.messageBuffer = [];

    var main = null;
    var emitSync = false;
    var sender = Object.create(EventEmitter);
    var _self = this;

    this.$worker = ***REMOVED******REMOVED***;
    this.$worker.terminate = function() ***REMOVED******REMOVED***;
    this.$worker.postMessage = function(e) ***REMOVED***
        _self.messageBuffer.push(e);
        if (main) ***REMOVED***
            if (emitSync)
                setTimeout(processNext);
            else
                processNext();
    ***REMOVED***
***REMOVED***;
    this.setEmitSync = function(val) ***REMOVED*** emitSync = val ***REMOVED***;

    var processNext = function() ***REMOVED***
        var msg = _self.messageBuffer.shift();
        if (msg.command)
            main[msg.command].apply(main, msg.args);
        else if (msg.event)
            sender._signal(msg.event, msg.data);
***REMOVED***;

    sender.postMessage = function(msg) ***REMOVED***
        _self.onMessage(***REMOVED***data: msg***REMOVED***);
***REMOVED***;
    sender.callback = function(data, callbackId) ***REMOVED***
        this.postMessage(***REMOVED***type: "call", id: callbackId, data: data***REMOVED***);
***REMOVED***;
    sender.emit = function(name, data) ***REMOVED***
        this.postMessage(***REMOVED***type: "event", name: name, data: data***REMOVED***);
***REMOVED***;

    config.loadModule(["worker", mod], function(Main) ***REMOVED***
        main = new Main[classname](sender);
        while (_self.messageBuffer.length)
            processNext();
***REMOVED***);
***REMOVED***;

UIWorkerClient.prototype = WorkerClient.prototype;

exports.UIWorkerClient = UIWorkerClient;
exports.WorkerClient = WorkerClient;

***REMOVED***);
__ace_shadowed__.define('ace/placeholder', ['require', 'exports', 'module' , 'ace/range', 'ace/lib/event_emitter', 'ace/lib/oop'], function(require, exports, module) ***REMOVED***


var Range = require("./range").Range;
var EventEmitter = require("./lib/event_emitter").EventEmitter;
var oop = require("./lib/oop");

var PlaceHolder = function(session, length, pos, others, mainClass, othersClass) ***REMOVED***
    var _self = this;
    this.length = length;
    this.session = session;
    this.doc = session.getDocument();
    this.mainClass = mainClass;
    this.othersClass = othersClass;
    this.$onUpdate = this.onUpdate.bind(this);
    this.doc.on("change", this.$onUpdate);
    this.$others = others;
    
    this.$onCursorChange = function() ***REMOVED***
        setTimeout(function() ***REMOVED***
            _self.onCursorChange();
    ***REMOVED***);
***REMOVED***;
    
    this.$pos = pos;
    var undoStack = session.getUndoManager().$undoStack || session.getUndoManager().$undostack || ***REMOVED***length: -1***REMOVED***;
    this.$undoStackDepth =  undoStack.length;
    this.setup();

    session.selection.on("changeCursor", this.$onCursorChange);
***REMOVED***;

(function() ***REMOVED***

    oop.implement(this, EventEmitter);
    this.setup = function() ***REMOVED***
        var _self = this;
        var doc = this.doc;
        var session = this.session;
        var pos = this.$pos;

        this.pos = doc.createAnchor(pos.row, pos.column);
        this.markerId = session.addMarker(new Range(pos.row, pos.column, pos.row, pos.column + this.length), this.mainClass, null, false);
        this.pos.on("change", function(event) ***REMOVED***
            session.removeMarker(_self.markerId);
            _self.markerId = session.addMarker(new Range(event.value.row, event.value.column, event.value.row, event.value.column+_self.length), _self.mainClass, null, false);
    ***REMOVED***);
        this.others = [];
        this.$others.forEach(function(other) ***REMOVED***
            var anchor = doc.createAnchor(other.row, other.column);
            _self.others.push(anchor);
    ***REMOVED***);
        session.setUndoSelect(false);
***REMOVED***;
    this.showOtherMarkers = function() ***REMOVED***
        if(this.othersActive) return;
        var session = this.session;
        var _self = this;
        this.othersActive = true;
        this.others.forEach(function(anchor) ***REMOVED***
            anchor.markerId = session.addMarker(new Range(anchor.row, anchor.column, anchor.row, anchor.column+_self.length), _self.othersClass, null, false);
            anchor.on("change", function(event) ***REMOVED***
                session.removeMarker(anchor.markerId);
                anchor.markerId = session.addMarker(new Range(event.value.row, event.value.column, event.value.row, event.value.column+_self.length), _self.othersClass, null, false);
        ***REMOVED***);
    ***REMOVED***);
***REMOVED***;
    this.hideOtherMarkers = function() ***REMOVED***
        if(!this.othersActive) return;
        this.othersActive = false;
        for (var i = 0; i < this.others.length; i++) ***REMOVED***
            this.session.removeMarker(this.others[i].markerId);
    ***REMOVED***
***REMOVED***;
    this.onUpdate = function(event) ***REMOVED***
        var delta = event.data;
        var range = delta.range;
        if(range.start.row !== range.end.row) return;
        if(range.start.row !== this.pos.row) return;
        if (this.$updating) return;
        this.$updating = true;
        var lengthDiff = delta.action === "insertText" ? range.end.column - range.start.column : range.start.column - range.end.column;
        
        if(range.start.column >= this.pos.column && range.start.column <= this.pos.column + this.length + 1) ***REMOVED***
            var distanceFromStart = range.start.column - this.pos.column;
            this.length += lengthDiff;
            if(!this.session.$fromUndo) ***REMOVED***
                if(delta.action === "insertText") ***REMOVED***
                    for (var i = this.others.length - 1; i >= 0; i--) ***REMOVED***
                        var otherPos = this.others[i];
                        var newPos = ***REMOVED***row: otherPos.row, column: otherPos.column + distanceFromStart***REMOVED***;
                        if(otherPos.row === range.start.row && range.start.column < otherPos.column)
                            newPos.column += lengthDiff;
                        this.doc.insert(newPos, delta.text);
                ***REMOVED***
            ***REMOVED*** else if(delta.action === "removeText") ***REMOVED***
                    for (var i = this.others.length - 1; i >= 0; i--) ***REMOVED***
                        var otherPos = this.others[i];
                        var newPos = ***REMOVED***row: otherPos.row, column: otherPos.column + distanceFromStart***REMOVED***;
                        if(otherPos.row === range.start.row && range.start.column < otherPos.column)
                            newPos.column += lengthDiff;
                        this.doc.remove(new Range(newPos.row, newPos.column, newPos.row, newPos.column - lengthDiff));
                ***REMOVED***
            ***REMOVED***
                if(range.start.column === this.pos.column && delta.action === "insertText") ***REMOVED***
                    setTimeout(function() ***REMOVED***
                        this.pos.setPosition(this.pos.row, this.pos.column - lengthDiff);
                        for (var i = 0; i < this.others.length; i++) ***REMOVED***
                            var other = this.others[i];
                            var newPos = ***REMOVED***row: other.row, column: other.column - lengthDiff***REMOVED***;
                            if(other.row === range.start.row && range.start.column < other.column)
                                newPos.column += lengthDiff;
                            other.setPosition(newPos.row, newPos.column);
                    ***REMOVED***
                ***REMOVED***.bind(this), 0);
            ***REMOVED***
                else if(range.start.column === this.pos.column && delta.action === "removeText") ***REMOVED***
                    setTimeout(function() ***REMOVED***
                        for (var i = 0; i < this.others.length; i++) ***REMOVED***
                            var other = this.others[i];
                            if(other.row === range.start.row && range.start.column < other.column) ***REMOVED***
                                other.setPosition(other.row, other.column - lengthDiff);
                        ***REMOVED***
                    ***REMOVED***
                ***REMOVED***.bind(this), 0);
            ***REMOVED***
        ***REMOVED***
            this.pos._emit("change", ***REMOVED***value: this.pos***REMOVED***);
            for (var i = 0; i < this.others.length; i++) ***REMOVED***
                this.others[i]._emit("change", ***REMOVED***value: this.others[i]***REMOVED***);
        ***REMOVED***
    ***REMOVED***
        this.$updating = false;
***REMOVED***;

    this.onCursorChange = function(event) ***REMOVED***
        if (this.$updating) return;
        var pos = this.session.selection.getCursor();
        if(pos.row === this.pos.row && pos.column >= this.pos.column && pos.column <= this.pos.column + this.length) ***REMOVED***
            this.showOtherMarkers();
            this._emit("cursorEnter", event);
    ***REMOVED*** else ***REMOVED***
            this.hideOtherMarkers();
            this._emit("cursorLeave", event);
    ***REMOVED***
***REMOVED***;    
    this.detach = function() ***REMOVED***
        this.session.removeMarker(this.markerId);
        this.hideOtherMarkers();
        this.doc.removeEventListener("change", this.$onUpdate);
        this.session.selection.removeEventListener("changeCursor", this.$onCursorChange);
        this.pos.detach();
        for (var i = 0; i < this.others.length; i++) ***REMOVED***
            this.others[i].detach();
    ***REMOVED***
        this.session.setUndoSelect(true);
***REMOVED***;
    this.cancel = function() ***REMOVED***
        if(this.$undoStackDepth === -1)
            throw Error("Canceling placeholders only supported with undo manager attached to session.");
        var undoManager = this.session.getUndoManager();
        var undosRequired = (undoManager.$undoStack || undoManager.$undostack).length - this.$undoStackDepth;
        for (var i = 0; i < undosRequired; i++) ***REMOVED***
            undoManager.undo(true);
    ***REMOVED***
***REMOVED***;
***REMOVED***).call(PlaceHolder.prototype);


exports.PlaceHolder = PlaceHolder;
***REMOVED***);

__ace_shadowed__.define('ace/mode/folding/fold_mode', ['require', 'exports', 'module' , 'ace/range'], function(require, exports, module) ***REMOVED***


var Range = require("../../range").Range;

var FoldMode = exports.FoldMode = function() ***REMOVED******REMOVED***;

(function() ***REMOVED***

    this.foldingStartMarker = null;
    this.foldingStopMarker = null;
    this.getFoldWidget = function(session, foldStyle, row) ***REMOVED***
        var line = session.getLine(row);
        if (this.foldingStartMarker.test(line))
            return "start";
        if (foldStyle == "markbeginend"
                && this.foldingStopMarker
                && this.foldingStopMarker.test(line))
            return "end";
        return "";
***REMOVED***;

    this.getFoldWidgetRange = function(session, foldStyle, row) ***REMOVED***
        return null;
***REMOVED***;

    this.indentationBlock = function(session, row, column) ***REMOVED***
        var re = /\S/;
        var line = session.getLine(row);
        var startLevel = line.search(re);
        if (startLevel == -1)
            return;

        var startColumn = column || line.length;
        var maxRow = session.getLength();
        var startRow = row;
        var endRow = row;

        while (++row < maxRow) ***REMOVED***
            var level = session.getLine(row).search(re);

            if (level == -1)
                continue;

            if (level <= startLevel)
                break;

            endRow = row;
    ***REMOVED***

        if (endRow > startRow) ***REMOVED***
            var endColumn = session.getLine(endRow).length;
            return new Range(startRow, startColumn, endRow, endColumn);
    ***REMOVED***
***REMOVED***;

    this.openingBracketBlock = function(session, bracket, row, column, typeRe) ***REMOVED***
        var start = ***REMOVED***row: row, column: column + 1***REMOVED***;
        var end = session.$findClosingBracket(bracket, start, typeRe);
        if (!end)
            return;

        var fw = session.foldWidgets[end.row];
        if (fw == null)
            fw = session.getFoldWidget(end.row);

        if (fw == "start" && end.row > start.row) ***REMOVED***
            end.row --;
            end.column = session.getLine(end.row).length;
    ***REMOVED***
        return Range.fromPoints(start, end);
***REMOVED***;

    this.closingBracketBlock = function(session, bracket, row, column, typeRe) ***REMOVED***
        var end = ***REMOVED***row: row, column: column***REMOVED***;
        var start = session.$findOpeningBracket(bracket, end);

        if (!start)
            return;

        start.column++;
        end.column--;

        return  Range.fromPoints(start, end);
***REMOVED***;
***REMOVED***).call(FoldMode.prototype);

***REMOVED***);

__ace_shadowed__.define('ace/theme/textmate', ['require', 'exports', 'module' , 'ace/lib/dom'], function(require, exports, module) ***REMOVED***


exports.isDark = false;
exports.cssClass = "ace-tm";
exports.cssText = ".ace-tm .ace_gutter ***REMOVED***\
background: #f0f0f0;\
color: #333;\
***REMOVED***\
.ace-tm .ace_print-margin ***REMOVED***\
width: 1px;\
background: #e8e8e8;\
***REMOVED***\
.ace-tm .ace_fold ***REMOVED***\
background-color: #6B72E6;\
***REMOVED***\
.ace-tm ***REMOVED***\
background-color: #FFFFFF;\
color: black;\
***REMOVED***\
.ace-tm .ace_cursor ***REMOVED***\
color: black;\
***REMOVED***\
.ace-tm .ace_invisible ***REMOVED***\
color: rgb(191, 191, 191);\
***REMOVED***\
.ace-tm .ace_storage,\
.ace-tm .ace_keyword ***REMOVED***\
color: blue;\
***REMOVED***\
.ace-tm .ace_constant ***REMOVED***\
color: rgb(197, 6, 11);\
***REMOVED***\
.ace-tm .ace_constant.ace_buildin ***REMOVED***\
color: rgb(88, 72, 246);\
***REMOVED***\
.ace-tm .ace_constant.ace_language ***REMOVED***\
color: rgb(88, 92, 246);\
***REMOVED***\
.ace-tm .ace_constant.ace_library ***REMOVED***\
color: rgb(6, 150, 14);\
***REMOVED***\
.ace-tm .ace_invalid ***REMOVED***\
background-color: rgba(255, 0, 0, 0.1);\
color: red;\
***REMOVED***\
.ace-tm .ace_support.ace_function ***REMOVED***\
color: rgb(60, 76, 114);\
***REMOVED***\
.ace-tm .ace_support.ace_constant ***REMOVED***\
color: rgb(6, 150, 14);\
***REMOVED***\
.ace-tm .ace_support.ace_type,\
.ace-tm .ace_support.ace_class ***REMOVED***\
color: rgb(109, 121, 222);\
***REMOVED***\
.ace-tm .ace_keyword.ace_operator ***REMOVED***\
color: rgb(104, 118, 135);\
***REMOVED***\
.ace-tm .ace_string ***REMOVED***\
color: rgb(3, 106, 7);\
***REMOVED***\
.ace-tm .ace_comment ***REMOVED***\
color: rgb(76, 136, 107);\
***REMOVED***\
.ace-tm .ace_comment.ace_doc ***REMOVED***\
color: rgb(0, 102, 255);\
***REMOVED***\
.ace-tm .ace_comment.ace_doc.ace_tag ***REMOVED***\
color: rgb(128, 159, 191);\
***REMOVED***\
.ace-tm .ace_constant.ace_numeric ***REMOVED***\
color: rgb(0, 0, 205);\
***REMOVED***\
.ace-tm .ace_variable ***REMOVED***\
color: rgb(49, 132, 149);\
***REMOVED***\
.ace-tm .ace_xml-pe ***REMOVED***\
color: rgb(104, 104, 91);\
***REMOVED***\
.ace-tm .ace_entity.ace_name.ace_function ***REMOVED***\
color: #0000A2;\
***REMOVED***\
.ace-tm .ace_heading ***REMOVED***\
color: rgb(12, 7, 255);\
***REMOVED***\
.ace-tm .ace_list ***REMOVED***\
color:rgb(185, 6, 144);\
***REMOVED***\
.ace-tm .ace_meta.ace_tag ***REMOVED***\
color:rgb(0, 22, 142);\
***REMOVED***\
.ace-tm .ace_string.ace_regex ***REMOVED***\
color: rgb(255, 0, 0)\
***REMOVED***\
.ace-tm .ace_marker-layer .ace_selection ***REMOVED***\
background: rgb(181, 213, 255);\
***REMOVED***\
.ace-tm.ace_multiselect .ace_selection.ace_start ***REMOVED***\
box-shadow: 0 0 3px 0px white;\
border-radius: 2px;\
***REMOVED***\
.ace-tm .ace_marker-layer .ace_step ***REMOVED***\
background: rgb(252, 255, 0);\
***REMOVED***\
.ace-tm .ace_marker-layer .ace_stack ***REMOVED***\
background: rgb(164, 229, 101);\
***REMOVED***\
.ace-tm .ace_marker-layer .ace_bracket ***REMOVED***\
margin: -1px 0 0 -1px;\
border: 1px solid rgb(192, 192, 192);\
***REMOVED***\
.ace-tm .ace_marker-layer .ace_active-line ***REMOVED***\
background: rgba(0, 0, 0, 0.07);\
***REMOVED***\
.ace-tm .ace_gutter-active-line ***REMOVED***\
background-color : #dcdcdc;\
***REMOVED***\
.ace-tm .ace_marker-layer .ace_selected-word ***REMOVED***\
background: rgb(250, 250, 255);\
border: 1px solid rgb(200, 200, 250);\
***REMOVED***\
.ace-tm .ace_indent-guide ***REMOVED***\
background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bLly//BwAmVgd1/w11/gAAAABJRU5ErkJggg==\") right repeat-y;\
***REMOVED***\
";

var dom = require("../lib/dom");
dom.importCssString(exports.cssText, exports.cssClass);
***REMOVED***);

__ace_shadowed__.define('ace/ext/error_marker', ['require', 'exports', 'module' , 'ace/line_widgets', 'ace/lib/dom', 'ace/range'], function(require, exports, module) ***REMOVED***

var LineWidgets = require("ace/line_widgets").LineWidgets;
var dom = require("ace/lib/dom");
var Range = require("ace/range").Range;

function binarySearch(array, needle, comparator) ***REMOVED***
    var first = 0;
    var last = array.length - 1;

    while (first <= last) ***REMOVED***
        var mid = (first + last) >> 1;
        var c = comparator(needle, array[mid]);
        if (c > 0)
            first = mid + 1;
        else if (c < 0)
            last = mid - 1;
        else
            return mid;
***REMOVED***
    return -(first + 1);
***REMOVED***

function findAnnotations(session, row, dir) ***REMOVED***
    var annotations = session.getAnnotations().sort(Range.comparePoints);
    if (!annotations.length)
        return;
    
    var i = binarySearch(annotations, ***REMOVED***row: row, column: -1***REMOVED***, Range.comparePoints);
    if (i < 0)
        i = -i - 1;
    
    if (i >= annotations.length - 1)
        i = dir > 0 ? 0 : annotations.length - 1;
    else if (i === 0 && dir < 0)
        i = annotations.length - 1;
    
    var annotation = annotations[i];
    if (!annotation || !dir)
        return;

    if (annotation.row === row) ***REMOVED***
        do ***REMOVED***
            annotation = annotations[i += dir];
    ***REMOVED*** while (annotation && annotation.row === row);
        if (!annotation)
            return annotations.slice();
***REMOVED***
    
    
    var matched = [];
    row = annotation.row;
    do ***REMOVED***
        matched[dir < 0 ? "unshift" : "push"](annotation);
        annotation = annotations[i += dir];
***REMOVED*** while (annotation && annotation.row == row);
    return matched.length && matched;
***REMOVED***

exports.showErrorMarker = function(editor, dir) ***REMOVED***
    var session = editor.session;
    if (!session.widgetManager) ***REMOVED***
        session.widgetManager = new LineWidgets(session);
        session.widgetManager.attach(editor);
***REMOVED***
    
    var pos = editor.getCursorPosition();
    var row = pos.row;
    var oldWidget = session.lineWidgets && session.lineWidgets[row];
    if (oldWidget) ***REMOVED***
        oldWidget.destroy();
***REMOVED*** else ***REMOVED***
        row -= dir;
***REMOVED***
    var annotations = findAnnotations(session, row, dir);
    var gutterAnno;
    if (annotations) ***REMOVED***
        var annotation = annotations[0];
        pos.column = (annotation.pos && typeof annotation.column != "number"
            ? annotation.pos.sc
            : annotation.column) || 0;
        pos.row = annotation.row;
        gutterAnno = editor.renderer.$gutterLayer.$annotations[pos.row];
***REMOVED*** else if (oldWidget) ***REMOVED***
        return;
***REMOVED*** else ***REMOVED***
        gutterAnno = ***REMOVED***
            text: ["Looks good!"],
            className: "ace_ok"
    ***REMOVED***;
***REMOVED***
    editor.session.unfold(pos.row);
    editor.selection.moveToPosition(pos);
    
    var w = ***REMOVED***
        row: pos.row, 
        fixedWidth: true,
        coverGutter: true,
        el: dom.createElement("div")
***REMOVED***;
    var el = w.el.appendChild(dom.createElement("div"));
    var arrow = w.el.appendChild(dom.createElement("div"));
    arrow.className = "error_widget_arrow " + gutterAnno.className;
    
    var left = editor.renderer.$cursorLayer
        .getPixelPosition(pos).left;
    arrow.style.left = left + editor.renderer.gutterWidth - 5 + "px";
    
    w.el.className = "error_widget_wrapper";
    el.className = "error_widget " + gutterAnno.className;
    el.innerHTML = gutterAnno.text.join("<br>");
    
    el.appendChild(dom.createElement("div"));
    
    var kb = function(_, hashId, keyString) ***REMOVED***
        if (hashId === 0 && (keyString === "esc" || keyString === "return")) ***REMOVED***
            w.destroy();
            return ***REMOVED***command: "null"***REMOVED***;
    ***REMOVED***
***REMOVED***;
    
    w.destroy = function() ***REMOVED***
        if (editor.$mouseHandler.isMousePressed)
            return;
        editor.keyBinding.removeKeyboardHandler(kb);
        session.widgetManager.removeLineWidget(w);
        editor.off("changeSelection", w.destroy);
        editor.off("changeSession", w.destroy);
        editor.off("mouseup", w.destroy);
        editor.off("change", w.destroy);
***REMOVED***;
    
    editor.keyBinding.addKeyboardHandler(kb);
    editor.on("changeSelection", w.destroy);
    editor.on("changeSession", w.destroy);
    editor.on("mouseup", w.destroy);
    editor.on("change", w.destroy);
    
    editor.session.widgetManager.addLineWidget(w);
    
    w.el.onmousedown = editor.focus.bind(editor);
    
    editor.renderer.scrollCursorIntoView(null, 0.5, ***REMOVED***bottom: w.el.offsetHeight***REMOVED***);
***REMOVED***;


dom.importCssString("\
    .error_widget_wrapper ***REMOVED***\
        background: inherit;\
        color: inherit;\
        border:none\
***REMOVED***\
    .error_widget ***REMOVED***\
        border-top: solid 2px;\
        border-bottom: solid 2px;\
        margin: 5px 0;\
        padding: 10px 40px;\
        white-space: pre-wrap;\
***REMOVED***\
    .error_widget.ace_error, .error_widget_arrow.ace_error***REMOVED***\
        border-color: #ff5a5a\
***REMOVED***\
    .error_widget.ace_warning, .error_widget_arrow.ace_warning***REMOVED***\
        border-color: #F1D817\
***REMOVED***\
    .error_widget.ace_info, .error_widget_arrow.ace_info***REMOVED***\
        border-color: #5a5a5a\
***REMOVED***\
    .error_widget.ace_ok, .error_widget_arrow.ace_ok***REMOVED***\
        border-color: #5aaa5a\
***REMOVED***\
    .error_widget_arrow ***REMOVED***\
        position: absolute;\
        border: solid 5px;\
        border-top-color: transparent!important;\
        border-right-color: transparent!important;\
        border-left-color: transparent!important;\
        top: -5px;\
***REMOVED***\
", "");

***REMOVED***);

__ace_shadowed__.define('ace/line_widgets', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/lib/dom', 'ace/range'], function(require, exports, module) ***REMOVED***


var oop = require("./lib/oop");
var dom = require("./lib/dom");
var Range = require("./range").Range;


function LineWidgets(session) ***REMOVED***
    this.session = session;
    this.session.widgetManager = this;
    this.session.getRowLength = this.getRowLength;
    this.session.$getWidgetScreenLength = this.$getWidgetScreenLength;
    this.updateOnChange = this.updateOnChange.bind(this);
    this.renderWidgets = this.renderWidgets.bind(this);
    this.measureWidgets = this.measureWidgets.bind(this);
    this.session._changedWidgets = [];
    this.detach = this.detach.bind(this);
    
    this.session.on("change", this.updateOnChange);
***REMOVED***

(function() ***REMOVED***
    this.getRowLength = function(row) ***REMOVED***
        var h;
        if (this.lineWidgets)
            h = this.lineWidgets[row] && this.lineWidgets[row].rowCount || 0;
        else 
            h = 0;
        if (!this.$useWrapMode || !this.$wrapData[row]) ***REMOVED***
            return 1 + h;
    ***REMOVED*** else ***REMOVED***
            return this.$wrapData[row].length + 1 + h;
    ***REMOVED***
***REMOVED***;

    this.$getWidgetScreenLength = function() ***REMOVED***
        var screenRows = 0;
        this.lineWidgets.forEach(function(w)***REMOVED***
            if (w && w.rowCount)
                screenRows +=w.rowCount;
    ***REMOVED***);
        return screenRows;
***REMOVED***;    
    
    this.attach = function(editor) ***REMOVED***
        if (editor.widgetManager && editor.widgetManager != this)
            editor.widgetManager.detach();

        if (this.editor == editor)
            return;

        this.detach();
        this.editor = editor;
        
        this.editor.on("changeSession", this.detach);
        
        editor.widgetManager = this;

        editor.setOption("enableLineWidgets", true);
        editor.renderer.on("beforeRender", this.measureWidgets);
        editor.renderer.on("afterRender", this.renderWidgets);
***REMOVED***;
    this.detach = function(e) ***REMOVED***
        if (e && e.session == this.session)
            return; // sometimes attach can be called before setSession
        var editor = this.editor;
        if (!editor)
            return;

        editor.off("changeSession", this.detach);
        
        this.editor = null;
        editor.widgetManager = null;
        
        editor.renderer.off("beforeRender", this.measureWidgets);
        editor.renderer.off("afterRender", this.renderWidgets);
        var lineWidgets = this.session.lineWidgets;
        lineWidgets && lineWidgets.forEach(function(w) ***REMOVED***
            if (w && w.el && w.el.parentNode) ***REMOVED***
                w._inDocument = false;
                w.el.parentNode.removeChild(w.el);
        ***REMOVED***
    ***REMOVED***);
***REMOVED***;

    this.updateOnChange = function(e) ***REMOVED***
        var lineWidgets = this.session.lineWidgets;
        if (!lineWidgets) return;
            
        var delta = e.data;
        var range = delta.range;
        var startRow = range.start.row;
        var len = range.end.row - startRow;

        if (len === 0) ***REMOVED***
    ***REMOVED*** else if (delta.action == "removeText" || delta.action == "removeLines") ***REMOVED***
            var removed = lineWidgets.splice(startRow + 1, len);
            removed.forEach(function(w) ***REMOVED***
                w && this.removeLineWidget(w);
        ***REMOVED*** this);
            this.$updateRows();
    ***REMOVED*** else ***REMOVED***
            var args = new Array(len);
            args.unshift(startRow, 0);
            lineWidgets.splice.apply(lineWidgets, args);
            this.$updateRows();
    ***REMOVED***
***REMOVED***;
    
    this.$updateRows = function() ***REMOVED***
        var lineWidgets = this.session.lineWidgets;
        if (!lineWidgets) return;
        var noWidgets = true;
        lineWidgets.forEach(function(w, i) ***REMOVED***
            if (w) ***REMOVED***
                noWidgets = false;
                w.row = i;
        ***REMOVED***
    ***REMOVED***);
        if (noWidgets)
            this.session.lineWidgets = null;
***REMOVED***;

    this.addLineWidget = function(w) ***REMOVED***
        if (!this.session.lineWidgets)
            this.session.lineWidgets = new Array(this.session.getLength());
        
        this.session.lineWidgets[w.row] = w;
        
        var renderer = this.editor.renderer;
        if (w.html && !w.el) ***REMOVED***
            w.el = dom.createElement("div");
            w.el.innerHTML = w.html;
    ***REMOVED***
        if (w.el) ***REMOVED***
            dom.addCssClass(w.el, "ace_lineWidgetContainer");
            w.el.style.position = "absolute";
            w.el.style.zIndex = 5;
            renderer.container.appendChild(w.el);
            w._inDocument = true;
    ***REMOVED***
        
        if (!w.coverGutter) ***REMOVED***
            w.el.style.zIndex = 3;
    ***REMOVED***
        if (!w.pixelHeight) ***REMOVED***
            w.pixelHeight = w.el.offsetHeight;
    ***REMOVED***
        if (w.rowCount == null)
            w.rowCount = w.pixelHeight / renderer.layerConfig.lineHeight;
        
        this.session._emit("changeFold", ***REMOVED***data:***REMOVED***start:***REMOVED***row: w.row***REMOVED******REMOVED******REMOVED***);
        
        this.$updateRows();
        this.renderWidgets(null, renderer);
        return w;
***REMOVED***;
    
    this.removeLineWidget = function(w) ***REMOVED***
        w._inDocument = false;
        if (w.el && w.el.parentNode)
            w.el.parentNode.removeChild(w.el);
        if (w.editor && w.editor.destroy) try ***REMOVED***
            w.editor.destroy();
    ***REMOVED*** catch(e)***REMOVED******REMOVED***
        if (this.session.lineWidgets)
            this.session.lineWidgets[w.row] = undefined;
        this.session._emit("changeFold", ***REMOVED***data:***REMOVED***start:***REMOVED***row: w.row***REMOVED******REMOVED******REMOVED***);
        this.$updateRows();
***REMOVED***;
    
    this.onWidgetChanged = function(w) ***REMOVED***
        this.session._changedWidgets.push(w);
        this.editor && this.editor.renderer.updateFull();
***REMOVED***;
    
    this.measureWidgets = function(e, renderer) ***REMOVED***
        var changedWidgets = this.session._changedWidgets;
        var config = renderer.layerConfig;
        
        if (!changedWidgets || !changedWidgets.length) return;
        var min = Infinity;
        for (var i = 0; i < changedWidgets.length; i++) ***REMOVED***
            var w = changedWidgets[i];
            if (!w._inDocument) ***REMOVED***
                w._inDocument = true;
                renderer.container.appendChild(w.el);
        ***REMOVED***
            
            w.h = w.el.offsetHeight;
            
            if (!w.fixedWidth) ***REMOVED***
                w.w = w.el.offsetWidth;
                w.screenWidth = Math.ceil(w.w / config.characterWidth);
        ***REMOVED***
            
            var rowCount = w.h / config.lineHeight;
            if (w.coverLine) ***REMOVED***
                rowCount -= this.session.getRowLineCount(w.row);
                if (rowCount < 0)
                    rowCount = 0;
        ***REMOVED***
            if (w.rowCount != rowCount) ***REMOVED***
                w.rowCount = rowCount;
                if (w.row < min)
                    min = w.row;
        ***REMOVED***
    ***REMOVED***
        if (min != Infinity) ***REMOVED***
            this.session._emit("changeFold", ***REMOVED***data:***REMOVED***start:***REMOVED***row: min***REMOVED******REMOVED******REMOVED***);
            this.session.lineWidgetWidth = null;
    ***REMOVED***
        this.session._changedWidgets = [];
***REMOVED***;
    
    this.renderWidgets = function(e, renderer) ***REMOVED***
        var config = renderer.layerConfig;
        var lineWidgets = this.session.lineWidgets;
        if (!lineWidgets)
            return;
        var first = Math.min(this.firstRow, config.firstRow);
        var last = Math.max(this.lastRow, config.lastRow, lineWidgets.length);
        
        while (first > 0 && !lineWidgets[first])
            first--;
        
        this.firstRow = config.firstRow;
        this.lastRow = config.lastRow;

        renderer.$cursorLayer.config = config;
        for (var i = first; i <= last; i++) ***REMOVED***
            var w = lineWidgets[i];
            if (!w || !w.el) continue;

            if (!w._inDocument) ***REMOVED***
                w._inDocument = true;
                renderer.container.appendChild(w.el);
        ***REMOVED***
            var top = renderer.$cursorLayer.getPixelPosition(***REMOVED***row: i, column:0***REMOVED***, true).top;
            if (!w.coverLine)
                top += config.lineHeight * this.session.getRowLineCount(w.row);
            w.el.style.top = top - config.offset + "px";
            
            var left = w.coverGutter ? 0 : renderer.gutterWidth;
            if (!w.fixedWidth)
                left -= renderer.scrollLeft;
            w.el.style.left = left + "px";

            if (w.fixedWidth) ***REMOVED***
                w.el.style.right = renderer.scrollBar.getWidth() + "px";
        ***REMOVED*** else ***REMOVED***
                w.el.style.right = "";
        ***REMOVED***
    ***REMOVED***
***REMOVED***;
    
***REMOVED***).call(LineWidgets.prototype);


exports.LineWidgets = LineWidgets;

***REMOVED***);


    

;
            (function() ***REMOVED***
                __ace_shadowed__.require(["ace/ext/textarea"], function(a) ***REMOVED***
                    a && a.config.init();
                    if (!window.__ace_shadowed__)
                        window.__ace_shadowed__ = ***REMOVED******REMOVED***;
                    for (var key in a) if (a.hasOwnProperty(key))
                        __ace_shadowed__[key] = a[key];
            ***REMOVED***);
        ***REMOVED***)();
        