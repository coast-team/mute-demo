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

define('ace/ext/textarea', ['require', 'exports', 'module' , 'ace/lib/event', 'ace/lib/useragent', 'ace/lib/net', 'ace/ace', 'ace/theme/textmate', 'ace/mode/text'], function(require, exports, module) ***REMOVED***


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
