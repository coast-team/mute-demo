"no use strict";
;(function(window) ***REMOVED***
if (typeof window.window != "undefined" && window.document) ***REMOVED***
    return;
***REMOVED***

window.console = function() ***REMOVED***
    var msgs = Array.prototype.slice.call(arguments, 0);
    postMessage(***REMOVED***type: "log", data: msgs***REMOVED***);
***REMOVED***;
window.console.error =
window.console.warn = 
window.console.log =
window.console.trace = window.console;

window.window = window;
window.ace = window;

window.onerror = function(message, file, line, col, err) ***REMOVED***
    console.error("Worker " + (err ? err.stack : message));
***REMOVED***;

window.normalizeModule = function(parentId, moduleName) ***REMOVED***
    if (moduleName.indexOf("!") !== -1) ***REMOVED***
        var chunks = moduleName.split("!");
        return window.normalizeModule(parentId, chunks[0]) + "!" + window.normalizeModule(parentId, chunks[1]);
***REMOVED***
    if (moduleName.charAt(0) == ".") ***REMOVED***
        var base = parentId.split("/").slice(0, -1).join("/");
        moduleName = (base ? base + "/" : "") + moduleName;
        
        while(moduleName.indexOf(".") !== -1 && previous != moduleName) ***REMOVED***
            var previous = moduleName;
            moduleName = moduleName.replace(/^\.\//, "").replace(/\/\.\//, "/").replace(/[^\/]+\/\.\.\//, "");
    ***REMOVED***
***REMOVED***
    
    return moduleName;
***REMOVED***;

window.require = function(parentId, id) ***REMOVED***
    if (!id) ***REMOVED***
        id = parentId;
        parentId = null;
***REMOVED***
    if (!id.charAt)
        throw new Error("worker.js require() accepts only (parentId, id) as arguments");

    id = window.normalizeModule(parentId, id);

    var module = window.require.modules[id];
    if (module) ***REMOVED***
        if (!module.initialized) ***REMOVED***
            module.initialized = true;
            module.exports = module.factory().exports;
    ***REMOVED***
        return module.exports;
***REMOVED***
    
    var chunks = id.split("/");
    if (!window.require.tlns)
        return console.log("unable to load " + id);
    chunks[0] = window.require.tlns[chunks[0]] || chunks[0];
    var path = chunks.join("/") + ".js";
    
    window.require.id = id;
    importScripts(path);
    return window.require(parentId, id);
***REMOVED***;
window.require.modules = ***REMOVED******REMOVED***;
window.require.tlns = ***REMOVED******REMOVED***;

window.define = function(id, deps, factory) ***REMOVED***
    if (arguments.length == 2) ***REMOVED***
        factory = deps;
        if (typeof id != "string") ***REMOVED***
            deps = id;
            id = window.require.id;
    ***REMOVED***
***REMOVED*** else if (arguments.length == 1) ***REMOVED***
        factory = id;
        deps = [];
        id = window.require.id;
***REMOVED***

    if (!deps.length)
        deps = ['require', 'exports', 'module'];

    if (id.indexOf("text!") === 0) 
        return;
    
    var req = function(childId) ***REMOVED***
        return window.require(id, childId);
***REMOVED***;

    window.require.modules[id] = ***REMOVED***
        exports: ***REMOVED******REMOVED***,
        factory: function() ***REMOVED***
            var module = this;
            var returnExports = factory.apply(this, deps.map(function(dep) ***REMOVED***
              switch(dep) ***REMOVED***
                  case 'require': return req;
                  case 'exports': return module.exports;
                  case 'module':  return module;
                  default:        return req(dep);
          ***REMOVED***
        ***REMOVED***));
            if (returnExports)
                module.exports = returnExports;
            return module;
    ***REMOVED***
***REMOVED***;
***REMOVED***;
window.define.amd = ***REMOVED******REMOVED***;

window.initBaseUrls  = function initBaseUrls(topLevelNamespaces) ***REMOVED***
    require.tlns = topLevelNamespaces;
***REMOVED***;

window.initSender = function initSender() ***REMOVED***

    var EventEmitter = window.require("ace/lib/event_emitter").EventEmitter;
    var oop = window.require("ace/lib/oop");
    
    var Sender = function() ***REMOVED******REMOVED***;
    
    (function() ***REMOVED***
        
        oop.implement(this, EventEmitter);
                
        this.callback = function(data, callbackId) ***REMOVED***
            postMessage(***REMOVED***
                type: "call",
                id: callbackId,
                data: data
        ***REMOVED***);
    ***REMOVED***;
    
        this.emit = function(name, data) ***REMOVED***
            postMessage(***REMOVED***
                type: "event",
                name: name,
                data: data
        ***REMOVED***);
    ***REMOVED***;
        
***REMOVED***).call(Sender.prototype);
    
    return new Sender();
***REMOVED***;

var main = window.main = null;
var sender = window.sender = null;

window.onmessage = function(e) ***REMOVED***
    var msg = e.data;
    if (msg.command) ***REMOVED***
        if (main[msg.command])
            main[msg.command].apply(main, msg.args);
        else
            throw new Error("Unknown command:" + msg.command);
***REMOVED***
    else if (msg.init) ***REMOVED***        
        initBaseUrls(msg.tlns);
        require("ace/lib/es5-shim");
        sender = window.sender = initSender();
        var clazz = require(msg.module)[msg.classname];
        main = window.main = new clazz(sender);
***REMOVED*** 
    else if (msg.event && sender) ***REMOVED***
        sender._signal(msg.event, msg.data);
***REMOVED***
***REMOVED***;
***REMOVED***)(this);// https://github.com/kriskowal/es5-shim

define('ace/lib/es5-shim', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***

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

define('ace/mode/css_worker', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/lib/lang', 'ace/worker/mirror', 'ace/mode/css/csslint'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var lang = require("../lib/lang");
var Mirror = require("../worker/mirror").Mirror;
var CSSLint = require("./css/csslint").CSSLint;

var Worker = exports.Worker = function(sender) ***REMOVED***
    Mirror.call(this, sender);
    this.setTimeout(400);
    this.ruleset = null;
    this.setDisabledRules("ids");
    this.setInfoRules("adjoining-classes|qualified-headings|zero-units|gradients|import|outline-none");
***REMOVED***;

oop.inherits(Worker, Mirror);

(function() ***REMOVED***
    this.setInfoRules = function(ruleNames) ***REMOVED***
        if (typeof ruleNames == "string")
            ruleNames = ruleNames.split("|");
        this.infoRules = lang.arrayToMap(ruleNames);
        this.doc.getValue() && this.deferredUpdate.schedule(100);
***REMOVED***;

    this.setDisabledRules = function(ruleNames) ***REMOVED***
        if (!ruleNames) ***REMOVED***
            this.ruleset = null;
    ***REMOVED*** else ***REMOVED***
            if (typeof ruleNames == "string")
                ruleNames = ruleNames.split("|");
            var all = ***REMOVED******REMOVED***;

            CSSLint.getRules().forEach(function(x)***REMOVED***
                all[x.id] = true;
        ***REMOVED***);
            ruleNames.forEach(function(x) ***REMOVED***
                delete all[x];
        ***REMOVED***);
            
            this.ruleset = all;
    ***REMOVED***
        this.doc.getValue() && this.deferredUpdate.schedule(100);
***REMOVED***;

    this.onUpdate = function() ***REMOVED***
        var value = this.doc.getValue();
        if (!value)
            return this.sender.emit("csslint", []);
        var infoRules = this.infoRules;

        var result = CSSLint.verify(value, this.ruleset);
        this.sender.emit("csslint", result.messages.map(function(msg) ***REMOVED***
            return ***REMOVED***
                row: msg.line - 1,
                column: msg.col - 1,
                text: msg.message,
                type: infoRules[msg.rule.id] ? "info" : msg.type,
                rule: msg.rule.name
        ***REMOVED***
    ***REMOVED***));
***REMOVED***;

***REMOVED***).call(Worker.prototype);

***REMOVED***);

define('ace/lib/oop', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***


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

define('ace/lib/lang', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***


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
define('ace/worker/mirror', ['require', 'exports', 'module' , 'ace/document', 'ace/lib/lang'], function(require, exports, module) ***REMOVED***


var Document = require("../document").Document;
var lang = require("../lib/lang");
    
var Mirror = exports.Mirror = function(sender) ***REMOVED***
    this.sender = sender;
    var doc = this.doc = new Document("");
    
    var deferredUpdate = this.deferredUpdate = lang.delayedCall(this.onUpdate.bind(this));
    
    var _self = this;
    sender.on("change", function(e) ***REMOVED***
        doc.applyDeltas(e.data);
        if (_self.$timeout)
            return deferredUpdate.schedule(_self.$timeout);
        _self.onUpdate();
***REMOVED***);
***REMOVED***;

(function() ***REMOVED***
    
    this.$timeout = 500;
    
    this.setTimeout = function(timeout) ***REMOVED***
        this.$timeout = timeout;
***REMOVED***;
    
    this.setValue = function(value) ***REMOVED***
        this.doc.setValue(value);
        this.deferredUpdate.schedule(this.$timeout);
***REMOVED***;
    
    this.getValue = function(callbackId) ***REMOVED***
        this.sender.callback(this.doc.getValue(), callbackId);
***REMOVED***;
    
    this.onUpdate = function() ***REMOVED***
***REMOVED***;
    
    this.isPending = function() ***REMOVED***
        return this.deferredUpdate.isPending();
***REMOVED***;
    
***REMOVED***).call(Mirror.prototype);

***REMOVED***);

define('ace/document', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/lib/event_emitter', 'ace/range', 'ace/anchor'], function(require, exports, module) ***REMOVED***


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

define('ace/lib/event_emitter', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***


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

define('ace/range', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***

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

define('ace/anchor', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/lib/event_emitter'], function(require, exports, module) ***REMOVED***


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
define('ace/mode/css/csslint', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***
var parserlib = ***REMOVED******REMOVED***;
(function()***REMOVED***
function EventTarget()***REMOVED***
    this._listeners = ***REMOVED******REMOVED***;
***REMOVED***

EventTarget.prototype = ***REMOVED***
    constructor: EventTarget,
    addListener: function(type, listener)***REMOVED***
        if (!this._listeners[type])***REMOVED***
            this._listeners[type] = [];
    ***REMOVED***

        this._listeners[type].push(listener);
***REMOVED***
    fire: function(event)***REMOVED***
        if (typeof event == "string")***REMOVED***
            event = ***REMOVED*** type: event ***REMOVED***;
    ***REMOVED***
        if (typeof event.target != "undefined")***REMOVED***
            event.target = this;
    ***REMOVED***

        if (typeof event.type == "undefined")***REMOVED***
            throw new Error("Event object missing 'type' property.");
    ***REMOVED***

        if (this._listeners[event.type])***REMOVED***
            var listeners = this._listeners[event.type].concat();
            for (var i=0, len=listeners.length; i < len; i++)***REMOVED***
                listeners[i].call(this, event);
        ***REMOVED***
    ***REMOVED***
***REMOVED***
    removeListener: function(type, listener)***REMOVED***
        if (this._listeners[type])***REMOVED***
            var listeners = this._listeners[type];
            for (var i=0, len=listeners.length; i < len; i++)***REMOVED***
                if (listeners[i] === listener)***REMOVED***
                    listeners.splice(i, 1);
                    break;
            ***REMOVED***
        ***REMOVED***


    ***REMOVED***
***REMOVED***
***REMOVED***;
function StringReader(text)***REMOVED***
    this._input = text.replace(/\n\r?/g, "\n");
    this._line = 1;
    this._col = 1;
    this._cursor = 0;
***REMOVED***

StringReader.prototype = ***REMOVED***
    constructor: StringReader,
    getCol: function()***REMOVED***
        return this._col;
***REMOVED***
    getLine: function()***REMOVED***
        return this._line ;
***REMOVED***
    eof: function()***REMOVED***
        return (this._cursor == this._input.length);
***REMOVED***
    peek: function(count)***REMOVED***
        var c = null;
        count = (typeof count == "undefined" ? 1 : count);
        if (this._cursor < this._input.length)***REMOVED***
            c = this._input.charAt(this._cursor + count - 1);
    ***REMOVED***

        return c;
***REMOVED***
    read: function()***REMOVED***
        var c = null;
        if (this._cursor < this._input.length)***REMOVED***
            if (this._input.charAt(this._cursor) == "\n")***REMOVED***
                this._line++;
                this._col=1;
        ***REMOVED*** else ***REMOVED***
                this._col++;
        ***REMOVED***
            c = this._input.charAt(this._cursor++);
    ***REMOVED***

        return c;
***REMOVED***
    mark: function()***REMOVED***
        this._bookmark = ***REMOVED***
            cursor: this._cursor,
            line:   this._line,
            col:    this._col
    ***REMOVED***;
***REMOVED***

    reset: function()***REMOVED***
        if (this._bookmark)***REMOVED***
            this._cursor = this._bookmark.cursor;
            this._line = this._bookmark.line;
            this._col = this._bookmark.col;
            delete this._bookmark;
    ***REMOVED***
***REMOVED***
    readTo: function(pattern)***REMOVED***

        var buffer = "",
            c;
        while (buffer.length < pattern.length || buffer.lastIndexOf(pattern) != buffer.length - pattern.length)***REMOVED***
            c = this.read();
            if (c)***REMOVED***
                buffer += c;
        ***REMOVED*** else ***REMOVED***
                throw new Error("Expected \"" + pattern + "\" at line " + this._line  + ", col " + this._col + ".");
        ***REMOVED***
    ***REMOVED***

        return buffer;

***REMOVED***
    readWhile: function(filter)***REMOVED***

        var buffer = "",
            c = this.read();

        while(c !== null && filter(c))***REMOVED***
            buffer += c;
            c = this.read();
    ***REMOVED***

        return buffer;

***REMOVED***
    readMatch: function(matcher)***REMOVED***

        var source = this._input.substring(this._cursor),
            value = null;
        if (typeof matcher == "string")***REMOVED***
            if (source.indexOf(matcher) === 0)***REMOVED***
                value = this.readCount(matcher.length);
        ***REMOVED***
    ***REMOVED*** else if (matcher instanceof RegExp)***REMOVED***
            if (matcher.test(source))***REMOVED***
                value = this.readCount(RegExp.lastMatch.length);
        ***REMOVED***
    ***REMOVED***

        return value;
***REMOVED***
    readCount: function(count)***REMOVED***
        var buffer = "";

        while(count--)***REMOVED***
            buffer += this.read();
    ***REMOVED***

        return buffer;
***REMOVED***

***REMOVED***;
function SyntaxError(message, line, col)***REMOVED***
    this.col = col;
    this.line = line;
    this.message = message;

***REMOVED***
SyntaxError.prototype = new Error();
function SyntaxUnit(text, line, col, type)***REMOVED***
    this.col = col;
    this.line = line;
    this.text = text;
    this.type = type;
***REMOVED***
SyntaxUnit.fromToken = function(token)***REMOVED***
    return new SyntaxUnit(token.value, token.startLine, token.startCol);
***REMOVED***;

SyntaxUnit.prototype = ***REMOVED***
    constructor: SyntaxUnit,
    valueOf: function()***REMOVED***
        return this.toString();
***REMOVED***
    toString: function()***REMOVED***
        return this.text;
***REMOVED***

***REMOVED***;
function TokenStreamBase(input, tokenData)***REMOVED***
    this._reader = input ? new StringReader(input.toString()) : null;
    this._token = null;
    this._tokenData = tokenData;
    this._lt = [];
    this._ltIndex = 0;

    this._ltIndexCache = [];
***REMOVED***
TokenStreamBase.createTokenData = function(tokens)***REMOVED***

    var nameMap     = [],
        typeMap     = ***REMOVED******REMOVED***,
        tokenData     = tokens.concat([]),
        i            = 0,
        len            = tokenData.length+1;

    tokenData.UNKNOWN = -1;
    tokenData.unshift(***REMOVED***name:"EOF"***REMOVED***);

    for (; i < len; i++)***REMOVED***
        nameMap.push(tokenData[i].name);
        tokenData[tokenData[i].name] = i;
        if (tokenData[i].text)***REMOVED***
            typeMap[tokenData[i].text] = i;
    ***REMOVED***
***REMOVED***

    tokenData.name = function(tt)***REMOVED***
        return nameMap[tt];
***REMOVED***;

    tokenData.type = function(c)***REMOVED***
        return typeMap[c];
***REMOVED***;

    return tokenData;
***REMOVED***;

TokenStreamBase.prototype = ***REMOVED***
    constructor: TokenStreamBase,
    match: function(tokenTypes, channel)***REMOVED***
        if (!(tokenTypes instanceof Array))***REMOVED***
            tokenTypes = [tokenTypes];
    ***REMOVED***

        var tt  = this.get(channel),
            i   = 0,
            len = tokenTypes.length;

        while(i < len)***REMOVED***
            if (tt == tokenTypes[i++])***REMOVED***
                return true;
        ***REMOVED***
    ***REMOVED***
        this.unget();
        return false;
***REMOVED***
    mustMatch: function(tokenTypes, channel)***REMOVED***

        var token;
        if (!(tokenTypes instanceof Array))***REMOVED***
            tokenTypes = [tokenTypes];
    ***REMOVED***

        if (!this.match.apply(this, arguments))***REMOVED***
            token = this.LT(1);
            throw new SyntaxError("Expected " + this._tokenData[tokenTypes[0]].name +
                " at line " + token.startLine + ", col " + token.startCol + ".", token.startLine, token.startCol);
    ***REMOVED***
***REMOVED***
    advance: function(tokenTypes, channel)***REMOVED***

        while(this.LA(0) !== 0 && !this.match(tokenTypes, channel))***REMOVED***
            this.get();
    ***REMOVED***

        return this.LA(0);
***REMOVED***
    get: function(channel)***REMOVED***

        var tokenInfo   = this._tokenData,
            reader      = this._reader,
            value,
            i           =0,
            len         = tokenInfo.length,
            found       = false,
            token,
            info;
        if (this._lt.length && this._ltIndex >= 0 && this._ltIndex < this._lt.length)***REMOVED***

            i++;
            this._token = this._lt[this._ltIndex++];
            info = tokenInfo[this._token.type];
            while((info.channel !== undefined && channel !== info.channel) &&
                    this._ltIndex < this._lt.length)***REMOVED***
                this._token = this._lt[this._ltIndex++];
                info = tokenInfo[this._token.type];
                i++;
        ***REMOVED***
            if ((info.channel === undefined || channel === info.channel) &&
                    this._ltIndex <= this._lt.length)***REMOVED***
                this._ltIndexCache.push(i);
                return this._token.type;
        ***REMOVED***
    ***REMOVED***
        token = this._getToken();
        if (token.type > -1 && !tokenInfo[token.type].hide)***REMOVED***
            token.channel = tokenInfo[token.type].channel;
            this._token = token;
            this._lt.push(token);
            this._ltIndexCache.push(this._lt.length - this._ltIndex + i);
            if (this._lt.length > 5)***REMOVED***
                this._lt.shift();
        ***REMOVED***
            if (this._ltIndexCache.length > 5)***REMOVED***
                this._ltIndexCache.shift();
        ***REMOVED***
            this._ltIndex = this._lt.length;
    ***REMOVED***
        info = tokenInfo[token.type];
        if (info &&
                (info.hide ||
                (info.channel !== undefined && channel !== info.channel)))***REMOVED***
            return this.get(channel);
    ***REMOVED*** else ***REMOVED***
            return token.type;
    ***REMOVED***
***REMOVED***
    LA: function(index)***REMOVED***
        var total = index,
            tt;
        if (index > 0)***REMOVED***
            if (index > 5)***REMOVED***
                throw new Error("Too much lookahead.");
        ***REMOVED***
            while(total)***REMOVED***
                tt = this.get();
                total--;
        ***REMOVED***
            while(total < index)***REMOVED***
                this.unget();
                total++;
        ***REMOVED***
    ***REMOVED*** else if (index < 0)***REMOVED***

            if(this._lt[this._ltIndex+index])***REMOVED***
                tt = this._lt[this._ltIndex+index].type;
        ***REMOVED*** else ***REMOVED***
                throw new Error("Too much lookbehind.");
        ***REMOVED***

    ***REMOVED*** else ***REMOVED***
            tt = this._token.type;
    ***REMOVED***

        return tt;

***REMOVED***
    LT: function(index)***REMOVED***
        this.LA(index);
        return this._lt[this._ltIndex+index-1];
***REMOVED***
    peek: function()***REMOVED***
        return this.LA(1);
***REMOVED***
    token: function()***REMOVED***
        return this._token;
***REMOVED***
    tokenName: function(tokenType)***REMOVED***
        if (tokenType < 0 || tokenType > this._tokenData.length)***REMOVED***
            return "UNKNOWN_TOKEN";
    ***REMOVED*** else ***REMOVED***
            return this._tokenData[tokenType].name;
    ***REMOVED***
***REMOVED***
    tokenType: function(tokenName)***REMOVED***
        return this._tokenData[tokenName] || -1;
***REMOVED***
    unget: function()***REMOVED***
        if (this._ltIndexCache.length)***REMOVED***
            this._ltIndex -= this._ltIndexCache.pop();//--;
            this._token = this._lt[this._ltIndex - 1];
    ***REMOVED*** else ***REMOVED***
            throw new Error("Too much lookahead.");
    ***REMOVED***
***REMOVED***

***REMOVED***;




parserlib.util = ***REMOVED***
StringReader: StringReader,
SyntaxError : SyntaxError,
SyntaxUnit  : SyntaxUnit,
EventTarget : EventTarget,
TokenStreamBase : TokenStreamBase
***REMOVED***;
***REMOVED***)();
(function()***REMOVED***
var EventTarget = parserlib.util.EventTarget,
TokenStreamBase = parserlib.util.TokenStreamBase,
StringReader = parserlib.util.StringReader,
SyntaxError = parserlib.util.SyntaxError,
SyntaxUnit  = parserlib.util.SyntaxUnit;


var Colors = ***REMOVED***
    aliceblue       :"#f0f8ff",
    antiquewhite    :"#faebd7",
    aqua            :"#00ffff",
    aquamarine      :"#7fffd4",
    azure           :"#f0ffff",
    beige           :"#f5f5dc",
    bisque          :"#ffe4c4",
    black           :"#000000",
    blanchedalmond  :"#ffebcd",
    blue            :"#0000ff",
    blueviolet      :"#8a2be2",
    brown           :"#a52a2a",
    burlywood       :"#deb887",
    cadetblue       :"#5f9ea0",
    chartreuse      :"#7fff00",
    chocolate       :"#d2691e",
    coral           :"#ff7f50",
    cornflowerblue  :"#6495ed",
    cornsilk        :"#fff8dc",
    crimson         :"#dc143c",
    cyan            :"#00ffff",
    darkblue        :"#00008b",
    darkcyan        :"#008b8b",
    darkgoldenrod   :"#b8860b",
    darkgray        :"#a9a9a9",
    darkgrey        :"#a9a9a9",
    darkgreen       :"#006400",
    darkkhaki       :"#bdb76b",
    darkmagenta     :"#8b008b",
    darkolivegreen  :"#556b2f",
    darkorange      :"#ff8c00",
    darkorchid      :"#9932cc",
    darkred         :"#8b0000",
    darksalmon      :"#e9967a",
    darkseagreen    :"#8fbc8f",
    darkslateblue   :"#483d8b",
    darkslategray   :"#2f4f4f",
    darkslategrey   :"#2f4f4f",
    darkturquoise   :"#00ced1",
    darkviolet      :"#9400d3",
    deeppink        :"#ff1493",
    deepskyblue     :"#00bfff",
    dimgray         :"#696969",
    dimgrey         :"#696969",
    dodgerblue      :"#1e90ff",
    firebrick       :"#b22222",
    floralwhite     :"#fffaf0",
    forestgreen     :"#228b22",
    fuchsia         :"#ff00ff",
    gainsboro       :"#dcdcdc",
    ghostwhite      :"#f8f8ff",
    gold            :"#ffd700",
    goldenrod       :"#daa520",
    gray            :"#808080",
    grey            :"#808080",
    green           :"#008000",
    greenyellow     :"#adff2f",
    honeydew        :"#f0fff0",
    hotpink         :"#ff69b4",
    indianred       :"#cd5c5c",
    indigo          :"#4b0082",
    ivory           :"#fffff0",
    khaki           :"#f0e68c",
    lavender        :"#e6e6fa",
    lavenderblush   :"#fff0f5",
    lawngreen       :"#7cfc00",
    lemonchiffon    :"#fffacd",
    lightblue       :"#add8e6",
    lightcoral      :"#f08080",
    lightcyan       :"#e0ffff",
    lightgoldenrodyellow  :"#fafad2",
    lightgray       :"#d3d3d3",
    lightgrey       :"#d3d3d3",
    lightgreen      :"#90ee90",
    lightpink       :"#ffb6c1",
    lightsalmon     :"#ffa07a",
    lightseagreen   :"#20b2aa",
    lightskyblue    :"#87cefa",
    lightslategray  :"#778899",
    lightslategrey  :"#778899",
    lightsteelblue  :"#b0c4de",
    lightyellow     :"#ffffe0",
    lime            :"#00ff00",
    limegreen       :"#32cd32",
    linen           :"#faf0e6",
    magenta         :"#ff00ff",
    maroon          :"#800000",
    mediumaquamarine:"#66cdaa",
    mediumblue      :"#0000cd",
    mediumorchid    :"#ba55d3",
    mediumpurple    :"#9370d8",
    mediumseagreen  :"#3cb371",
    mediumslateblue :"#7b68ee",
    mediumspringgreen   :"#00fa9a",
    mediumturquoise :"#48d1cc",
    mediumvioletred :"#c71585",
    midnightblue    :"#191970",
    mintcream       :"#f5fffa",
    mistyrose       :"#ffe4e1",
    moccasin        :"#ffe4b5",
    navajowhite     :"#ffdead",
    navy            :"#000080",
    oldlace         :"#fdf5e6",
    olive           :"#808000",
    olivedrab       :"#6b8e23",
    orange          :"#ffa500",
    orangered       :"#ff4500",
    orchid          :"#da70d6",
    palegoldenrod   :"#eee8aa",
    palegreen       :"#98fb98",
    paleturquoise   :"#afeeee",
    palevioletred   :"#d87093",
    papayawhip      :"#ffefd5",
    peachpuff       :"#ffdab9",
    peru            :"#cd853f",
    pink            :"#ffc0cb",
    plum            :"#dda0dd",
    powderblue      :"#b0e0e6",
    purple          :"#800080",
    red             :"#ff0000",
    rosybrown       :"#bc8f8f",
    royalblue       :"#4169e1",
    saddlebrown     :"#8b4513",
    salmon          :"#fa8072",
    sandybrown      :"#f4a460",
    seagreen        :"#2e8b57",
    seashell        :"#fff5ee",
    sienna          :"#a0522d",
    silver          :"#c0c0c0",
    skyblue         :"#87ceeb",
    slateblue       :"#6a5acd",
    slategray       :"#708090",
    slategrey       :"#708090",
    snow            :"#fffafa",
    springgreen     :"#00ff7f",
    steelblue       :"#4682b4",
    tan             :"#d2b48c",
    teal            :"#008080",
    thistle         :"#d8bfd8",
    tomato          :"#ff6347",
    turquoise       :"#40e0d0",
    violet          :"#ee82ee",
    wheat           :"#f5deb3",
    white           :"#ffffff",
    whitesmoke      :"#f5f5f5",
    yellow          :"#ffff00",
    yellowgreen     :"#9acd32",
    activeBorder        :"Active window border.",
    activecaption       :"Active window caption.",
    appworkspace        :"Background color of multiple document interface.",
    background          :"Desktop background.",
    buttonface          :"The face background color for 3-D elements that appear 3-D due to one layer of surrounding border.",
    buttonhighlight     :"The color of the border facing the light source for 3-D elements that appear 3-D due to one layer of surrounding border.",
    buttonshadow        :"The color of the border away from the light source for 3-D elements that appear 3-D due to one layer of surrounding border.",
    buttontext          :"Text on push buttons.",
    captiontext         :"Text in caption, size box, and scrollbar arrow box.",
    graytext            :"Grayed (disabled) text. This color is set to #000 if the current display driver does not support a solid gray color.",
    greytext            :"Greyed (disabled) text. This color is set to #000 if the current display driver does not support a solid grey color.",
    highlight           :"Item(s) selected in a control.",
    highlighttext       :"Text of item(s) selected in a control.",
    inactiveborder      :"Inactive window border.",
    inactivecaption     :"Inactive window caption.",
    inactivecaptiontext :"Color of text in an inactive caption.",
    infobackground      :"Background color for tooltip controls.",
    infotext            :"Text color for tooltip controls.",
    menu                :"Menu background.",
    menutext            :"Text in menus.",
    scrollbar           :"Scroll bar gray area.",
    threeddarkshadow    :"The color of the darker (generally outer) of the two borders away from the light source for 3-D elements that appear 3-D due to two concentric layers of surrounding border.",
    threedface          :"The face background color for 3-D elements that appear 3-D due to two concentric layers of surrounding border.",
    threedhighlight     :"The color of the lighter (generally outer) of the two borders facing the light source for 3-D elements that appear 3-D due to two concentric layers of surrounding border.",
    threedlightshadow   :"The color of the darker (generally inner) of the two borders facing the light source for 3-D elements that appear 3-D due to two concentric layers of surrounding border.",
    threedshadow        :"The color of the lighter (generally inner) of the two borders away from the light source for 3-D elements that appear 3-D due to two concentric layers of surrounding border.",
    window              :"Window background.",
    windowframe         :"Window frame.",
    windowtext          :"Text in windows."
***REMOVED***;
function Combinator(text, line, col)***REMOVED***

    SyntaxUnit.call(this, text, line, col, Parser.COMBINATOR_TYPE);
    this.type = "unknown";
    if (/^\s+$/.test(text))***REMOVED***
        this.type = "descendant";
***REMOVED*** else if (text == ">")***REMOVED***
        this.type = "child";
***REMOVED*** else if (text == "+")***REMOVED***
        this.type = "adjacent-sibling";
***REMOVED*** else if (text == "~")***REMOVED***
        this.type = "sibling";
***REMOVED***

***REMOVED***

Combinator.prototype = new SyntaxUnit();
Combinator.prototype.constructor = Combinator;
function MediaFeature(name, value)***REMOVED***

    SyntaxUnit.call(this, "(" + name + (value !== null ? ":" + value : "") + ")", name.startLine, name.startCol, Parser.MEDIA_FEATURE_TYPE);
    this.name = name;
    this.value = value;
***REMOVED***

MediaFeature.prototype = new SyntaxUnit();
MediaFeature.prototype.constructor = MediaFeature;
function MediaQuery(modifier, mediaType, features, line, col)***REMOVED***

    SyntaxUnit.call(this, (modifier ? modifier + " ": "") + (mediaType ? mediaType : "") + (mediaType && features.length > 0 ? " and " : "") + features.join(" and "), line, col, Parser.MEDIA_QUERY_TYPE);
    this.modifier = modifier;
    this.mediaType = mediaType;
    this.features = features;

***REMOVED***

MediaQuery.prototype = new SyntaxUnit();
MediaQuery.prototype.constructor = MediaQuery;
function Parser(options)***REMOVED***
    EventTarget.call(this);


    this.options = options || ***REMOVED******REMOVED***;

    this._tokenStream = null;
***REMOVED***
Parser.DEFAULT_TYPE = 0;
Parser.COMBINATOR_TYPE = 1;
Parser.MEDIA_FEATURE_TYPE = 2;
Parser.MEDIA_QUERY_TYPE = 3;
Parser.PROPERTY_NAME_TYPE = 4;
Parser.PROPERTY_VALUE_TYPE = 5;
Parser.PROPERTY_VALUE_PART_TYPE = 6;
Parser.SELECTOR_TYPE = 7;
Parser.SELECTOR_PART_TYPE = 8;
Parser.SELECTOR_SUB_PART_TYPE = 9;

Parser.prototype = function()***REMOVED***

    var proto = new EventTarget(),  //new prototype
        prop,
        additions =  ***REMOVED***
            constructor: Parser,
            DEFAULT_TYPE : 0,
            COMBINATOR_TYPE : 1,
            MEDIA_FEATURE_TYPE : 2,
            MEDIA_QUERY_TYPE : 3,
            PROPERTY_NAME_TYPE : 4,
            PROPERTY_VALUE_TYPE : 5,
            PROPERTY_VALUE_PART_TYPE : 6,
            SELECTOR_TYPE : 7,
            SELECTOR_PART_TYPE : 8,
            SELECTOR_SUB_PART_TYPE : 9,

            _stylesheet: function()***REMOVED***

                var tokenStream = this._tokenStream,
                    charset     = null,
                    count,
                    token,
                    tt;

                this.fire("startstylesheet");
                this._charset();

                this._skipCruft();
                while (tokenStream.peek() == Tokens.IMPORT_SYM)***REMOVED***
                    this._import();
                    this._skipCruft();
            ***REMOVED***
                while (tokenStream.peek() == Tokens.NAMESPACE_SYM)***REMOVED***
                    this._namespace();
                    this._skipCruft();
            ***REMOVED***
                tt = tokenStream.peek();
                while(tt > Tokens.EOF)***REMOVED***

                    try ***REMOVED***

                        switch(tt)***REMOVED***
                            case Tokens.MEDIA_SYM:
                                this._media();
                                this._skipCruft();
                                break;
                            case Tokens.PAGE_SYM:
                                this._page();
                                this._skipCruft();
                                break;
                            case Tokens.FONT_FACE_SYM:
                                this._font_face();
                                this._skipCruft();
                                break;
                            case Tokens.KEYFRAMES_SYM:
                                this._keyframes();
                                this._skipCruft();
                                break;
                            case Tokens.VIEWPORT_SYM:
                                this._viewport();
                                this._skipCruft();
                                break;
                            case Tokens.UNKNOWN_SYM:  //unknown @ rule
                                tokenStream.get();
                                if (!this.options.strict)***REMOVED***
                                    this.fire(***REMOVED***
                                        type:       "error",
                                        error:      null,
                                        message:    "Unknown @ rule: " + tokenStream.LT(0).value + ".",
                                        line:       tokenStream.LT(0).startLine,
                                        col:        tokenStream.LT(0).startCol
                                ***REMOVED***);
                                    count=0;
                                    while (tokenStream.advance([Tokens.LBRACE, Tokens.RBRACE]) == Tokens.LBRACE)***REMOVED***
                                        count++;    //keep track of nesting depth
                                ***REMOVED***

                                    while(count)***REMOVED***
                                        tokenStream.advance([Tokens.RBRACE]);
                                        count--;
                                ***REMOVED***

                            ***REMOVED*** else ***REMOVED***
                                    throw new SyntaxError("Unknown @ rule.", tokenStream.LT(0).startLine, tokenStream.LT(0).startCol);
                            ***REMOVED***
                                break;
                            case Tokens.S:
                                this._readWhitespace();
                                break;
                            default:
                                if(!this._ruleset())***REMOVED***
                                    switch(tt)***REMOVED***
                                        case Tokens.CHARSET_SYM:
                                            token = tokenStream.LT(1);
                                            this._charset(false);
                                            throw new SyntaxError("@charset not allowed here.", token.startLine, token.startCol);
                                        case Tokens.IMPORT_SYM:
                                            token = tokenStream.LT(1);
                                            this._import(false);
                                            throw new SyntaxError("@import not allowed here.", token.startLine, token.startCol);
                                        case Tokens.NAMESPACE_SYM:
                                            token = tokenStream.LT(1);
                                            this._namespace(false);
                                            throw new SyntaxError("@namespace not allowed here.", token.startLine, token.startCol);
                                        default:
                                            tokenStream.get();  //get the last token
                                            this._unexpectedToken(tokenStream.token());
                                ***REMOVED***

                            ***REMOVED***
                    ***REMOVED***
                ***REMOVED*** catch(ex) ***REMOVED***
                        if (ex instanceof SyntaxError && !this.options.strict)***REMOVED***
                            this.fire(***REMOVED***
                                type:       "error",
                                error:      ex,
                                message:    ex.message,
                                line:       ex.line,
                                col:        ex.col
                        ***REMOVED***);
                    ***REMOVED*** else ***REMOVED***
                            throw ex;
                    ***REMOVED***
                ***REMOVED***

                    tt = tokenStream.peek();
            ***REMOVED***

                if (tt != Tokens.EOF)***REMOVED***
                    this._unexpectedToken(tokenStream.token());
            ***REMOVED***

                this.fire("endstylesheet");
        ***REMOVED***

            _charset: function(emit)***REMOVED***
                var tokenStream = this._tokenStream,
                    charset,
                    token,
                    line,
                    col;

                if (tokenStream.match(Tokens.CHARSET_SYM))***REMOVED***
                    line = tokenStream.token().startLine;
                    col = tokenStream.token().startCol;

                    this._readWhitespace();
                    tokenStream.mustMatch(Tokens.STRING);

                    token = tokenStream.token();
                    charset = token.value;

                    this._readWhitespace();
                    tokenStream.mustMatch(Tokens.SEMICOLON);

                    if (emit !== false)***REMOVED***
                        this.fire(***REMOVED***
                            type:   "charset",
                            charset:charset,
                            line:   line,
                            col:    col
                    ***REMOVED***);
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

            _import: function(emit)***REMOVED***

                var tokenStream = this._tokenStream,
                    tt,
                    uri,
                    importToken,
                    mediaList   = [];
                tokenStream.mustMatch(Tokens.IMPORT_SYM);
                importToken = tokenStream.token();
                this._readWhitespace();

                tokenStream.mustMatch([Tokens.STRING, Tokens.URI]);
                uri = tokenStream.token().value.replace(/(?:url\()?["']([^"']+)["']\)?/, "$1");

                this._readWhitespace();

                mediaList = this._media_query_list();
                tokenStream.mustMatch(Tokens.SEMICOLON);
                this._readWhitespace();

                if (emit !== false)***REMOVED***
                    this.fire(***REMOVED***
                        type:   "import",
                        uri:    uri,
                        media:  mediaList,
                        line:   importToken.startLine,
                        col:    importToken.startCol
                ***REMOVED***);
            ***REMOVED***

        ***REMOVED***

            _namespace: function(emit)***REMOVED***

                var tokenStream = this._tokenStream,
                    line,
                    col,
                    prefix,
                    uri;
                tokenStream.mustMatch(Tokens.NAMESPACE_SYM);
                line = tokenStream.token().startLine;
                col = tokenStream.token().startCol;
                this._readWhitespace();
                if (tokenStream.match(Tokens.IDENT))***REMOVED***
                    prefix = tokenStream.token().value;
                    this._readWhitespace();
            ***REMOVED***

                tokenStream.mustMatch([Tokens.STRING, Tokens.URI]);
                uri = tokenStream.token().value.replace(/(?:url\()?["']([^"']+)["']\)?/, "$1");

                this._readWhitespace();
                tokenStream.mustMatch(Tokens.SEMICOLON);
                this._readWhitespace();

                if (emit !== false)***REMOVED***
                    this.fire(***REMOVED***
                        type:   "namespace",
                        prefix: prefix,
                        uri:    uri,
                        line:   line,
                        col:    col
                ***REMOVED***);
            ***REMOVED***

        ***REMOVED***

            _media: function()***REMOVED***
                var tokenStream     = this._tokenStream,
                    line,
                    col,
                    mediaList;//       = [];
                tokenStream.mustMatch(Tokens.MEDIA_SYM);
                line = tokenStream.token().startLine;
                col = tokenStream.token().startCol;

                this._readWhitespace();

                mediaList = this._media_query_list();

                tokenStream.mustMatch(Tokens.LBRACE);
                this._readWhitespace();

                this.fire(***REMOVED***
                    type:   "startmedia",
                    media:  mediaList,
                    line:   line,
                    col:    col
            ***REMOVED***);

                while(true) ***REMOVED***
                    if (tokenStream.peek() == Tokens.PAGE_SYM)***REMOVED***
                        this._page();
                ***REMOVED*** else   if (tokenStream.peek() == Tokens.FONT_FACE_SYM)***REMOVED***
                        this._font_face();
                ***REMOVED*** else if (!this._ruleset())***REMOVED***
                        break;
                ***REMOVED***
            ***REMOVED***

                tokenStream.mustMatch(Tokens.RBRACE);
                this._readWhitespace();

                this.fire(***REMOVED***
                    type:   "endmedia",
                    media:  mediaList,
                    line:   line,
                    col:    col
            ***REMOVED***);
        ***REMOVED***
            _media_query_list: function()***REMOVED***
                var tokenStream = this._tokenStream,
                    mediaList   = [];


                this._readWhitespace();

                if (tokenStream.peek() == Tokens.IDENT || tokenStream.peek() == Tokens.LPAREN)***REMOVED***
                    mediaList.push(this._media_query());
            ***REMOVED***

                while(tokenStream.match(Tokens.COMMA))***REMOVED***
                    this._readWhitespace();
                    mediaList.push(this._media_query());
            ***REMOVED***

                return mediaList;
        ***REMOVED***
            _media_query: function()***REMOVED***
                var tokenStream = this._tokenStream,
                    type        = null,
                    ident       = null,
                    token       = null,
                    expressions = [];

                if (tokenStream.match(Tokens.IDENT))***REMOVED***
                    ident = tokenStream.token().value.toLowerCase();
                    if (ident != "only" && ident != "not")***REMOVED***
                        tokenStream.unget();
                        ident = null;
                ***REMOVED*** else ***REMOVED***
                        token = tokenStream.token();
                ***REMOVED***
            ***REMOVED***

                this._readWhitespace();

                if (tokenStream.peek() == Tokens.IDENT)***REMOVED***
                    type = this._media_type();
                    if (token === null)***REMOVED***
                        token = tokenStream.token();
                ***REMOVED***
            ***REMOVED*** else if (tokenStream.peek() == Tokens.LPAREN)***REMOVED***
                    if (token === null)***REMOVED***
                        token = tokenStream.LT(1);
                ***REMOVED***
                    expressions.push(this._media_expression());
            ***REMOVED***

                if (type === null && expressions.length === 0)***REMOVED***
                    return null;
            ***REMOVED*** else ***REMOVED***
                    this._readWhitespace();
                    while (tokenStream.match(Tokens.IDENT))***REMOVED***
                        if (tokenStream.token().value.toLowerCase() != "and")***REMOVED***
                            this._unexpectedToken(tokenStream.token());
                    ***REMOVED***

                        this._readWhitespace();
                        expressions.push(this._media_expression());
                ***REMOVED***
            ***REMOVED***

                return new MediaQuery(ident, type, expressions, token.startLine, token.startCol);
        ***REMOVED***
            _media_type: function()***REMOVED***
                return this._media_feature();
        ***REMOVED***
            _media_expression: function()***REMOVED***
                var tokenStream = this._tokenStream,
                    feature     = null,
                    token,
                    expression  = null;

                tokenStream.mustMatch(Tokens.LPAREN);

                feature = this._media_feature();
                this._readWhitespace();

                if (tokenStream.match(Tokens.COLON))***REMOVED***
                    this._readWhitespace();
                    token = tokenStream.LT(1);
                    expression = this._expression();
            ***REMOVED***

                tokenStream.mustMatch(Tokens.RPAREN);
                this._readWhitespace();

                return new MediaFeature(feature, (expression ? new SyntaxUnit(expression, token.startLine, token.startCol) : null));
        ***REMOVED***
            _media_feature: function()***REMOVED***
                var tokenStream = this._tokenStream;

                tokenStream.mustMatch(Tokens.IDENT);

                return SyntaxUnit.fromToken(tokenStream.token());
        ***REMOVED***
            _page: function()***REMOVED***
                var tokenStream = this._tokenStream,
                    line,
                    col,
                    identifier  = null,
                    pseudoPage  = null;
                tokenStream.mustMatch(Tokens.PAGE_SYM);
                line = tokenStream.token().startLine;
                col = tokenStream.token().startCol;

                this._readWhitespace();

                if (tokenStream.match(Tokens.IDENT))***REMOVED***
                    identifier = tokenStream.token().value;
                    if (identifier.toLowerCase() === "auto")***REMOVED***
                        this._unexpectedToken(tokenStream.token());
                ***REMOVED***
            ***REMOVED***
                if (tokenStream.peek() == Tokens.COLON)***REMOVED***
                    pseudoPage = this._pseudo_page();
            ***REMOVED***

                this._readWhitespace();

                this.fire(***REMOVED***
                    type:   "startpage",
                    id:     identifier,
                    pseudo: pseudoPage,
                    line:   line,
                    col:    col
            ***REMOVED***);

                this._readDeclarations(true, true);

                this.fire(***REMOVED***
                    type:   "endpage",
                    id:     identifier,
                    pseudo: pseudoPage,
                    line:   line,
                    col:    col
            ***REMOVED***);

        ***REMOVED***
            _margin: function()***REMOVED***
                var tokenStream = this._tokenStream,
                    line,
                    col,
                    marginSym   = this._margin_sym();

                if (marginSym)***REMOVED***
                    line = tokenStream.token().startLine;
                    col = tokenStream.token().startCol;

                    this.fire(***REMOVED***
                        type: "startpagemargin",
                        margin: marginSym,
                        line:   line,
                        col:    col
                ***REMOVED***);

                    this._readDeclarations(true);

                    this.fire(***REMOVED***
                        type: "endpagemargin",
                        margin: marginSym,
                        line:   line,
                        col:    col
                ***REMOVED***);
                    return true;
            ***REMOVED*** else ***REMOVED***
                    return false;
            ***REMOVED***
        ***REMOVED***
            _margin_sym: function()***REMOVED***

                var tokenStream = this._tokenStream;

                if(tokenStream.match([Tokens.TOPLEFTCORNER_SYM, Tokens.TOPLEFT_SYM,
                        Tokens.TOPCENTER_SYM, Tokens.TOPRIGHT_SYM, Tokens.TOPRIGHTCORNER_SYM,
                        Tokens.BOTTOMLEFTCORNER_SYM, Tokens.BOTTOMLEFT_SYM,
                        Tokens.BOTTOMCENTER_SYM, Tokens.BOTTOMRIGHT_SYM,
                        Tokens.BOTTOMRIGHTCORNER_SYM, Tokens.LEFTTOP_SYM,
                        Tokens.LEFTMIDDLE_SYM, Tokens.LEFTBOTTOM_SYM, Tokens.RIGHTTOP_SYM,
                        Tokens.RIGHTMIDDLE_SYM, Tokens.RIGHTBOTTOM_SYM]))
                ***REMOVED***
                    return SyntaxUnit.fromToken(tokenStream.token());
            ***REMOVED*** else ***REMOVED***
                    return null;
            ***REMOVED***

        ***REMOVED***

            _pseudo_page: function()***REMOVED***

                var tokenStream = this._tokenStream;

                tokenStream.mustMatch(Tokens.COLON);
                tokenStream.mustMatch(Tokens.IDENT);

                return tokenStream.token().value;
        ***REMOVED***

            _font_face: function()***REMOVED***
                var tokenStream = this._tokenStream,
                    line,
                    col;
                tokenStream.mustMatch(Tokens.FONT_FACE_SYM);
                line = tokenStream.token().startLine;
                col = tokenStream.token().startCol;

                this._readWhitespace();

                this.fire(***REMOVED***
                    type:   "startfontface",
                    line:   line,
                    col:    col
            ***REMOVED***);

                this._readDeclarations(true);

                this.fire(***REMOVED***
                    type:   "endfontface",
                    line:   line,
                    col:    col
            ***REMOVED***);
        ***REMOVED***

            _viewport: function()***REMOVED***
                 var tokenStream = this._tokenStream,
                    line,
                    col;

                    tokenStream.mustMatch(Tokens.VIEWPORT_SYM);
                    line = tokenStream.token().startLine;
                    col = tokenStream.token().startCol;

                    this._readWhitespace();

                    this.fire(***REMOVED***
                        type:   "startviewport",
                        line:   line,
                        col:    col
                ***REMOVED***);

                    this._readDeclarations(true);

                    this.fire(***REMOVED***
                        type:   "endviewport",
                        line:   line,
                        col:    col
                ***REMOVED***);

        ***REMOVED***

            _operator: function(inFunction)***REMOVED***

                var tokenStream = this._tokenStream,
                    token       = null;

                if (tokenStream.match([Tokens.SLASH, Tokens.COMMA]) ||
                    (inFunction && tokenStream.match([Tokens.PLUS, Tokens.STAR, Tokens.MINUS])))***REMOVED***
                    token =  tokenStream.token();
                    this._readWhitespace();
            ***REMOVED***
                return token ? PropertyValuePart.fromToken(token) : null;

        ***REMOVED***

            _combinator: function()***REMOVED***

                var tokenStream = this._tokenStream,
                    value       = null,
                    token;

                if(tokenStream.match([Tokens.PLUS, Tokens.GREATER, Tokens.TILDE]))***REMOVED***
                    token = tokenStream.token();
                    value = new Combinator(token.value, token.startLine, token.startCol);
                    this._readWhitespace();
            ***REMOVED***

                return value;
        ***REMOVED***

            _unary_operator: function()***REMOVED***

                var tokenStream = this._tokenStream;

                if (tokenStream.match([Tokens.MINUS, Tokens.PLUS]))***REMOVED***
                    return tokenStream.token().value;
            ***REMOVED*** else ***REMOVED***
                    return null;
            ***REMOVED***
        ***REMOVED***

            _property: function()***REMOVED***

                var tokenStream = this._tokenStream,
                    value       = null,
                    hack        = null,
                    tokenValue,
                    token,
                    line,
                    col;
                if (tokenStream.peek() == Tokens.STAR && this.options.starHack)***REMOVED***
                    tokenStream.get();
                    token = tokenStream.token();
                    hack = token.value;
                    line = token.startLine;
                    col = token.startCol;
            ***REMOVED***

                if(tokenStream.match(Tokens.IDENT))***REMOVED***
                    token = tokenStream.token();
                    tokenValue = token.value;
                    if (tokenValue.charAt(0) == "_" && this.options.underscoreHack)***REMOVED***
                        hack = "_";
                        tokenValue = tokenValue.substring(1);
                ***REMOVED***

                    value = new PropertyName(tokenValue, hack, (line||token.startLine), (col||token.startCol));
                    this._readWhitespace();
            ***REMOVED***

                return value;
        ***REMOVED***
            _ruleset: function()***REMOVED***

                var tokenStream = this._tokenStream,
                    tt,
                    selectors;
                try ***REMOVED***
                    selectors = this._selectors_group();
            ***REMOVED*** catch (ex)***REMOVED***
                    if (ex instanceof SyntaxError && !this.options.strict)***REMOVED***
                        this.fire(***REMOVED***
                            type:       "error",
                            error:      ex,
                            message:    ex.message,
                            line:       ex.line,
                            col:        ex.col
                    ***REMOVED***);
                        tt = tokenStream.advance([Tokens.RBRACE]);
                        if (tt == Tokens.RBRACE)***REMOVED***
                    ***REMOVED*** else ***REMOVED***
                            throw ex;
                    ***REMOVED***

                ***REMOVED*** else ***REMOVED***
                        throw ex;
                ***REMOVED***
                    return true;
            ***REMOVED***
                if (selectors)***REMOVED***

                    this.fire(***REMOVED***
                        type:       "startrule",
                        selectors:  selectors,
                        line:       selectors[0].line,
                        col:        selectors[0].col
                ***REMOVED***);

                    this._readDeclarations(true);

                    this.fire(***REMOVED***
                        type:       "endrule",
                        selectors:  selectors,
                        line:       selectors[0].line,
                        col:        selectors[0].col
                ***REMOVED***);

            ***REMOVED***

                return selectors;

        ***REMOVED***
            _selectors_group: function()***REMOVED***
                var tokenStream = this._tokenStream,
                    selectors   = [],
                    selector;

                selector = this._selector();
                if (selector !== null)***REMOVED***

                    selectors.push(selector);
                    while(tokenStream.match(Tokens.COMMA))***REMOVED***
                        this._readWhitespace();
                        selector = this._selector();
                        if (selector !== null)***REMOVED***
                            selectors.push(selector);
                    ***REMOVED*** else ***REMOVED***
                            this._unexpectedToken(tokenStream.LT(1));
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***

                return selectors.length ? selectors : null;
        ***REMOVED***
            _selector: function()***REMOVED***

                var tokenStream = this._tokenStream,
                    selector    = [],
                    nextSelector = null,
                    combinator  = null,
                    ws          = null;
                nextSelector = this._simple_selector_sequence();
                if (nextSelector === null)***REMOVED***
                    return null;
            ***REMOVED***

                selector.push(nextSelector);

                do ***REMOVED***
                    combinator = this._combinator();

                    if (combinator !== null)***REMOVED***
                        selector.push(combinator);
                        nextSelector = this._simple_selector_sequence();
                        if (nextSelector === null)***REMOVED***
                            this._unexpectedToken(tokenStream.LT(1));
                    ***REMOVED*** else ***REMOVED***
                            selector.push(nextSelector);
                    ***REMOVED***
                ***REMOVED*** else ***REMOVED***
                        if (this._readWhitespace())***REMOVED***
                            ws = new Combinator(tokenStream.token().value, tokenStream.token().startLine, tokenStream.token().startCol);
                            combinator = this._combinator();
                            nextSelector = this._simple_selector_sequence();
                            if (nextSelector === null)***REMOVED***
                                if (combinator !== null)***REMOVED***
                                    this._unexpectedToken(tokenStream.LT(1));
                            ***REMOVED***
                        ***REMOVED*** else ***REMOVED***

                                if (combinator !== null)***REMOVED***
                                    selector.push(combinator);
                            ***REMOVED*** else ***REMOVED***
                                    selector.push(ws);
                            ***REMOVED***

                                selector.push(nextSelector);
                        ***REMOVED***
                    ***REMOVED*** else ***REMOVED***
                            break;
                    ***REMOVED***

                ***REMOVED***
            ***REMOVED*** while(true);

                return new Selector(selector, selector[0].line, selector[0].col);
        ***REMOVED***
            _simple_selector_sequence: function()***REMOVED***

                var tokenStream = this._tokenStream,
                    elementName = null,
                    modifiers   = [],
                    selectorText= "",
                    components  = [
                        function()***REMOVED***
                            return tokenStream.match(Tokens.HASH) ?
                                    new SelectorSubPart(tokenStream.token().value, "id", tokenStream.token().startLine, tokenStream.token().startCol) :
                                    null;
                    ***REMOVED***
                        this._class,
                        this._attrib,
                        this._pseudo,
                        this._negation
                    ],
                    i           = 0,
                    len         = components.length,
                    component   = null,
                    found       = false,
                    line,
                    col;
                line = tokenStream.LT(1).startLine;
                col = tokenStream.LT(1).startCol;

                elementName = this._type_selector();
                if (!elementName)***REMOVED***
                    elementName = this._universal();
            ***REMOVED***

                if (elementName !== null)***REMOVED***
                    selectorText += elementName;
            ***REMOVED***

                while(true)***REMOVED***
                    if (tokenStream.peek() === Tokens.S)***REMOVED***
                        break;
                ***REMOVED***
                    while(i < len && component === null)***REMOVED***
                        component = components[i++].call(this);
                ***REMOVED***

                    if (component === null)***REMOVED***
                        if (selectorText === "")***REMOVED***
                            return null;
                    ***REMOVED*** else ***REMOVED***
                            break;
                    ***REMOVED***
                ***REMOVED*** else ***REMOVED***
                        i = 0;
                        modifiers.push(component);
                        selectorText += component.toString();
                        component = null;
                ***REMOVED***
            ***REMOVED***


                return selectorText !== "" ?
                        new SelectorPart(elementName, modifiers, selectorText, line, col) :
                        null;
        ***REMOVED***
            _type_selector: function()***REMOVED***

                var tokenStream = this._tokenStream,
                    ns          = this._namespace_prefix(),
                    elementName = this._element_name();

                if (!elementName)***REMOVED***
                    if (ns)***REMOVED***
                        tokenStream.unget();
                        if (ns.length > 1)***REMOVED***
                            tokenStream.unget();
                    ***REMOVED***
                ***REMOVED***

                    return null;
            ***REMOVED*** else ***REMOVED***
                    if (ns)***REMOVED***
                        elementName.text = ns + elementName.text;
                        elementName.col -= ns.length;
                ***REMOVED***
                    return elementName;
            ***REMOVED***
        ***REMOVED***
            _class: function()***REMOVED***

                var tokenStream = this._tokenStream,
                    token;

                if (tokenStream.match(Tokens.DOT))***REMOVED***
                    tokenStream.mustMatch(Tokens.IDENT);
                    token = tokenStream.token();
                    return new SelectorSubPart("." + token.value, "class", token.startLine, token.startCol - 1);
            ***REMOVED*** else ***REMOVED***
                    return null;
            ***REMOVED***

        ***REMOVED***
            _element_name: function()***REMOVED***

                var tokenStream = this._tokenStream,
                    token;

                if (tokenStream.match(Tokens.IDENT))***REMOVED***
                    token = tokenStream.token();
                    return new SelectorSubPart(token.value, "elementName", token.startLine, token.startCol);

            ***REMOVED*** else ***REMOVED***
                    return null;
            ***REMOVED***
        ***REMOVED***
            _namespace_prefix: function()***REMOVED***
                var tokenStream = this._tokenStream,
                    value       = "";
                if (tokenStream.LA(1) === Tokens.PIPE || tokenStream.LA(2) === Tokens.PIPE)***REMOVED***

                    if(tokenStream.match([Tokens.IDENT, Tokens.STAR]))***REMOVED***
                        value += tokenStream.token().value;
                ***REMOVED***

                    tokenStream.mustMatch(Tokens.PIPE);
                    value += "|";

            ***REMOVED***

                return value.length ? value : null;
        ***REMOVED***
            _universal: function()***REMOVED***
                var tokenStream = this._tokenStream,
                    value       = "",
                    ns;

                ns = this._namespace_prefix();
                if(ns)***REMOVED***
                    value += ns;
            ***REMOVED***

                if(tokenStream.match(Tokens.STAR))***REMOVED***
                    value += "*";
            ***REMOVED***

                return value.length ? value : null;

       ***REMOVED***
            _attrib: function()***REMOVED***

                var tokenStream = this._tokenStream,
                    value       = null,
                    ns,
                    token;

                if (tokenStream.match(Tokens.LBRACKET))***REMOVED***
                    token = tokenStream.token();
                    value = token.value;
                    value += this._readWhitespace();

                    ns = this._namespace_prefix();

                    if (ns)***REMOVED***
                        value += ns;
                ***REMOVED***

                    tokenStream.mustMatch(Tokens.IDENT);
                    value += tokenStream.token().value;
                    value += this._readWhitespace();

                    if(tokenStream.match([Tokens.PREFIXMATCH, Tokens.SUFFIXMATCH, Tokens.SUBSTRINGMATCH,
                            Tokens.EQUALS, Tokens.INCLUDES, Tokens.DASHMATCH]))***REMOVED***

                        value += tokenStream.token().value;
                        value += this._readWhitespace();

                        tokenStream.mustMatch([Tokens.IDENT, Tokens.STRING]);
                        value += tokenStream.token().value;
                        value += this._readWhitespace();
                ***REMOVED***

                    tokenStream.mustMatch(Tokens.RBRACKET);

                    return new SelectorSubPart(value + "]", "attribute", token.startLine, token.startCol);
            ***REMOVED*** else ***REMOVED***
                    return null;
            ***REMOVED***
        ***REMOVED***
            _pseudo: function()***REMOVED***

                var tokenStream = this._tokenStream,
                    pseudo      = null,
                    colons      = ":",
                    line,
                    col;

                if (tokenStream.match(Tokens.COLON))***REMOVED***

                    if (tokenStream.match(Tokens.COLON))***REMOVED***
                        colons += ":";
                ***REMOVED***

                    if (tokenStream.match(Tokens.IDENT))***REMOVED***
                        pseudo = tokenStream.token().value;
                        line = tokenStream.token().startLine;
                        col = tokenStream.token().startCol - colons.length;
                ***REMOVED*** else if (tokenStream.peek() == Tokens.FUNCTION)***REMOVED***
                        line = tokenStream.LT(1).startLine;
                        col = tokenStream.LT(1).startCol - colons.length;
                        pseudo = this._functional_pseudo();
                ***REMOVED***

                    if (pseudo)***REMOVED***
                        pseudo = new SelectorSubPart(colons + pseudo, "pseudo", line, col);
                ***REMOVED***
            ***REMOVED***

                return pseudo;
        ***REMOVED***
            _functional_pseudo: function()***REMOVED***

                var tokenStream = this._tokenStream,
                    value = null;

                if(tokenStream.match(Tokens.FUNCTION))***REMOVED***
                    value = tokenStream.token().value;
                    value += this._readWhitespace();
                    value += this._expression();
                    tokenStream.mustMatch(Tokens.RPAREN);
                    value += ")";
            ***REMOVED***

                return value;
        ***REMOVED***
            _expression: function()***REMOVED***

                var tokenStream = this._tokenStream,
                    value       = "";

                while(tokenStream.match([Tokens.PLUS, Tokens.MINUS, Tokens.DIMENSION,
                        Tokens.NUMBER, Tokens.STRING, Tokens.IDENT, Tokens.LENGTH,
                        Tokens.FREQ, Tokens.ANGLE, Tokens.TIME,
                        Tokens.RESOLUTION, Tokens.SLASH]))***REMOVED***

                    value += tokenStream.token().value;
                    value += this._readWhitespace();
            ***REMOVED***

                return value.length ? value : null;

        ***REMOVED***
            _negation: function()***REMOVED***

                var tokenStream = this._tokenStream,
                    line,
                    col,
                    value       = "",
                    arg,
                    subpart     = null;

                if (tokenStream.match(Tokens.NOT))***REMOVED***
                    value = tokenStream.token().value;
                    line = tokenStream.token().startLine;
                    col = tokenStream.token().startCol;
                    value += this._readWhitespace();
                    arg = this._negation_arg();
                    value += arg;
                    value += this._readWhitespace();
                    tokenStream.match(Tokens.RPAREN);
                    value += tokenStream.token().value;

                    subpart = new SelectorSubPart(value, "not", line, col);
                    subpart.args.push(arg);
            ***REMOVED***

                return subpart;
        ***REMOVED***
            _negation_arg: function()***REMOVED***

                var tokenStream = this._tokenStream,
                    args        = [
                        this._type_selector,
                        this._universal,
                        function()***REMOVED***
                            return tokenStream.match(Tokens.HASH) ?
                                    new SelectorSubPart(tokenStream.token().value, "id", tokenStream.token().startLine, tokenStream.token().startCol) :
                                    null;
                    ***REMOVED***
                        this._class,
                        this._attrib,
                        this._pseudo
                    ],
                    arg         = null,
                    i           = 0,
                    len         = args.length,
                    elementName,
                    line,
                    col,
                    part;

                line = tokenStream.LT(1).startLine;
                col = tokenStream.LT(1).startCol;

                while(i < len && arg === null)***REMOVED***

                    arg = args[i].call(this);
                    i++;
            ***REMOVED***
                if (arg === null)***REMOVED***
                    this._unexpectedToken(tokenStream.LT(1));
            ***REMOVED***
                if (arg.type == "elementName")***REMOVED***
                    part = new SelectorPart(arg, [], arg.toString(), line, col);
            ***REMOVED*** else ***REMOVED***
                    part = new SelectorPart(null, [arg], arg.toString(), line, col);
            ***REMOVED***

                return part;
        ***REMOVED***

            _declaration: function()***REMOVED***

                var tokenStream = this._tokenStream,
                    property    = null,
                    expr        = null,
                    prio        = null,
                    error       = null,
                    invalid     = null,
                    propertyName= "";

                property = this._property();
                if (property !== null)***REMOVED***

                    tokenStream.mustMatch(Tokens.COLON);
                    this._readWhitespace();

                    expr = this._expr();
                    if (!expr || expr.length === 0)***REMOVED***
                        this._unexpectedToken(tokenStream.LT(1));
                ***REMOVED***

                    prio = this._prio();
                    propertyName = property.toString();
                    if (this.options.starHack && property.hack == "*" ||
                            this.options.underscoreHack && property.hack == "_") ***REMOVED***

                        propertyName = property.text;
                ***REMOVED***

                    try ***REMOVED***
                        this._validateProperty(propertyName, expr);
                ***REMOVED*** catch (ex) ***REMOVED***
                        invalid = ex;
                ***REMOVED***

                    this.fire(***REMOVED***
                        type:       "property",
                        property:   property,
                        value:      expr,
                        important:  prio,
                        line:       property.line,
                        col:        property.col,
                        invalid:    invalid
                ***REMOVED***);

                    return true;
            ***REMOVED*** else ***REMOVED***
                    return false;
            ***REMOVED***
        ***REMOVED***

            _prio: function()***REMOVED***

                var tokenStream = this._tokenStream,
                    result      = tokenStream.match(Tokens.IMPORTANT_SYM);

                this._readWhitespace();
                return result;
        ***REMOVED***

            _expr: function(inFunction)***REMOVED***

                var tokenStream = this._tokenStream,
                    values      = [],
                    value       = null,
                    operator    = null;

                value = this._term();
                if (value !== null)***REMOVED***

                    values.push(value);

                    do ***REMOVED***
                        operator = this._operator(inFunction);
                        if (operator)***REMOVED***
                            values.push(operator);
                    ***REMOVED*** /*else ***REMOVED***
							values.push(new PropertyValue(valueParts, valueParts[0].line, valueParts[0].col));
							valueParts = [];
						***REMOVED****/

                        value = this._term();

                        if (value === null)***REMOVED***
                            break;
                    ***REMOVED*** else ***REMOVED***
                            values.push(value);
                    ***REMOVED***
                ***REMOVED*** while(true);
            ***REMOVED***

                return values.length > 0 ? new PropertyValue(values, values[0].line, values[0].col) : null;
        ***REMOVED***

            _term: function()***REMOVED***

                var tokenStream = this._tokenStream,
                    unary       = null,
                    value       = null,
                    token,
                    line,
                    col;
                unary = this._unary_operator();
                if (unary !== null)***REMOVED***
                    line = tokenStream.token().startLine;
                    col = tokenStream.token().startCol;
            ***REMOVED***
                if (tokenStream.peek() == Tokens.IE_FUNCTION && this.options.ieFilters)***REMOVED***

                    value = this._ie_function();
                    if (unary === null)***REMOVED***
                        line = tokenStream.token().startLine;
                        col = tokenStream.token().startCol;
                ***REMOVED***
            ***REMOVED*** else if (tokenStream.match([Tokens.NUMBER, Tokens.PERCENTAGE, Tokens.LENGTH,
                        Tokens.ANGLE, Tokens.TIME,
                        Tokens.FREQ, Tokens.STRING, Tokens.IDENT, Tokens.URI, Tokens.UNICODE_RANGE]))***REMOVED***

                    value = tokenStream.token().value;
                    if (unary === null)***REMOVED***
                        line = tokenStream.token().startLine;
                        col = tokenStream.token().startCol;
                ***REMOVED***
                    this._readWhitespace();
            ***REMOVED*** else ***REMOVED***
                    token = this._hexcolor();
                    if (token === null)***REMOVED***
                        if (unary === null)***REMOVED***
                            line = tokenStream.LT(1).startLine;
                            col = tokenStream.LT(1).startCol;
                    ***REMOVED***
                        if (value === null)***REMOVED***
                            if (tokenStream.LA(3) == Tokens.EQUALS && this.options.ieFilters)***REMOVED***
                                value = this._ie_function();
                        ***REMOVED*** else ***REMOVED***
                                value = this._function();
                        ***REMOVED***
                    ***REMOVED***

                ***REMOVED*** else ***REMOVED***
                        value = token.value;
                        if (unary === null)***REMOVED***
                            line = token.startLine;
                            col = token.startCol;
                    ***REMOVED***
                ***REMOVED***

            ***REMOVED***

                return value !== null ?
                        new PropertyValuePart(unary !== null ? unary + value : value, line, col) :
                        null;

        ***REMOVED***

            _function: function()***REMOVED***

                var tokenStream = this._tokenStream,
                    functionText = null,
                    expr        = null,
                    lt;

                if (tokenStream.match(Tokens.FUNCTION))***REMOVED***
                    functionText = tokenStream.token().value;
                    this._readWhitespace();
                    expr = this._expr(true);
                    functionText += expr;
                    if (this.options.ieFilters && tokenStream.peek() == Tokens.EQUALS)***REMOVED***
                        do ***REMOVED***

                            if (this._readWhitespace())***REMOVED***
                                functionText += tokenStream.token().value;
                        ***REMOVED***
                            if (tokenStream.LA(0) == Tokens.COMMA)***REMOVED***
                                functionText += tokenStream.token().value;
                        ***REMOVED***

                            tokenStream.match(Tokens.IDENT);
                            functionText += tokenStream.token().value;

                            tokenStream.match(Tokens.EQUALS);
                            functionText += tokenStream.token().value;
                            lt = tokenStream.peek();
                            while(lt != Tokens.COMMA && lt != Tokens.S && lt != Tokens.RPAREN)***REMOVED***
                                tokenStream.get();
                                functionText += tokenStream.token().value;
                                lt = tokenStream.peek();
                        ***REMOVED***
                    ***REMOVED*** while(tokenStream.match([Tokens.COMMA, Tokens.S]));
                ***REMOVED***

                    tokenStream.match(Tokens.RPAREN);
                    functionText += ")";
                    this._readWhitespace();
            ***REMOVED***

                return functionText;
        ***REMOVED***

            _ie_function: function()***REMOVED***

                var tokenStream = this._tokenStream,
                    functionText = null,
                    expr        = null,
                    lt;
                if (tokenStream.match([Tokens.IE_FUNCTION, Tokens.FUNCTION]))***REMOVED***
                    functionText = tokenStream.token().value;

                    do ***REMOVED***

                        if (this._readWhitespace())***REMOVED***
                            functionText += tokenStream.token().value;
                    ***REMOVED***
                        if (tokenStream.LA(0) == Tokens.COMMA)***REMOVED***
                            functionText += tokenStream.token().value;
                    ***REMOVED***

                        tokenStream.match(Tokens.IDENT);
                        functionText += tokenStream.token().value;

                        tokenStream.match(Tokens.EQUALS);
                        functionText += tokenStream.token().value;
                        lt = tokenStream.peek();
                        while(lt != Tokens.COMMA && lt != Tokens.S && lt != Tokens.RPAREN)***REMOVED***
                            tokenStream.get();
                            functionText += tokenStream.token().value;
                            lt = tokenStream.peek();
                    ***REMOVED***
                ***REMOVED*** while(tokenStream.match([Tokens.COMMA, Tokens.S]));

                    tokenStream.match(Tokens.RPAREN);
                    functionText += ")";
                    this._readWhitespace();
            ***REMOVED***

                return functionText;
        ***REMOVED***

            _hexcolor: function()***REMOVED***

                var tokenStream = this._tokenStream,
                    token = null,
                    color;

                if(tokenStream.match(Tokens.HASH))***REMOVED***

                    token = tokenStream.token();
                    color = token.value;
                    if (!/#[a-f0-9]***REMOVED***3,6***REMOVED***/i.test(color))***REMOVED***
                        throw new SyntaxError("Expected a hex color but found '" + color + "' at line " + token.startLine + ", col " + token.startCol + ".", token.startLine, token.startCol);
                ***REMOVED***
                    this._readWhitespace();
            ***REMOVED***

                return token;
        ***REMOVED***

            _keyframes: function()***REMOVED***
                var tokenStream = this._tokenStream,
                    token,
                    tt,
                    name,
                    prefix = "";

                tokenStream.mustMatch(Tokens.KEYFRAMES_SYM);
                token = tokenStream.token();
                if (/^@\-([^\-]+)\-/.test(token.value)) ***REMOVED***
                    prefix = RegExp.$1;
            ***REMOVED***

                this._readWhitespace();
                name = this._keyframe_name();

                this._readWhitespace();
                tokenStream.mustMatch(Tokens.LBRACE);

                this.fire(***REMOVED***
                    type:   "startkeyframes",
                    name:   name,
                    prefix: prefix,
                    line:   token.startLine,
                    col:    token.startCol
            ***REMOVED***);

                this._readWhitespace();
                tt = tokenStream.peek();
                while(tt == Tokens.IDENT || tt == Tokens.PERCENTAGE) ***REMOVED***
                    this._keyframe_rule();
                    this._readWhitespace();
                    tt = tokenStream.peek();
            ***REMOVED***

                this.fire(***REMOVED***
                    type:   "endkeyframes",
                    name:   name,
                    prefix: prefix,
                    line:   token.startLine,
                    col:    token.startCol
            ***REMOVED***);

                this._readWhitespace();
                tokenStream.mustMatch(Tokens.RBRACE);

        ***REMOVED***

            _keyframe_name: function()***REMOVED***
                var tokenStream = this._tokenStream,
                    token;

                tokenStream.mustMatch([Tokens.IDENT, Tokens.STRING]);
                return SyntaxUnit.fromToken(tokenStream.token());
        ***REMOVED***

            _keyframe_rule: function()***REMOVED***
                var tokenStream = this._tokenStream,
                    token,
                    keyList = this._key_list();

                this.fire(***REMOVED***
                    type:   "startkeyframerule",
                    keys:   keyList,
                    line:   keyList[0].line,
                    col:    keyList[0].col
            ***REMOVED***);

                this._readDeclarations(true);

                this.fire(***REMOVED***
                    type:   "endkeyframerule",
                    keys:   keyList,
                    line:   keyList[0].line,
                    col:    keyList[0].col
            ***REMOVED***);

        ***REMOVED***

            _key_list: function()***REMOVED***
                var tokenStream = this._tokenStream,
                    token,
                    key,
                    keyList = [];
                keyList.push(this._key());

                this._readWhitespace();

                while(tokenStream.match(Tokens.COMMA))***REMOVED***
                    this._readWhitespace();
                    keyList.push(this._key());
                    this._readWhitespace();
            ***REMOVED***

                return keyList;
        ***REMOVED***

            _key: function()***REMOVED***

                var tokenStream = this._tokenStream,
                    token;

                if (tokenStream.match(Tokens.PERCENTAGE))***REMOVED***
                    return SyntaxUnit.fromToken(tokenStream.token());
            ***REMOVED*** else if (tokenStream.match(Tokens.IDENT))***REMOVED***
                    token = tokenStream.token();

                    if (/from|to/i.test(token.value))***REMOVED***
                        return SyntaxUnit.fromToken(token);
                ***REMOVED***

                    tokenStream.unget();
            ***REMOVED***
                this._unexpectedToken(tokenStream.LT(1));
        ***REMOVED***
            _skipCruft: function()***REMOVED***
                while(this._tokenStream.match([Tokens.S, Tokens.CDO, Tokens.CDC]))***REMOVED***
            ***REMOVED***
        ***REMOVED***
            _readDeclarations: function(checkStart, readMargins)***REMOVED***
                var tokenStream = this._tokenStream,
                    tt;


                this._readWhitespace();

                if (checkStart)***REMOVED***
                    tokenStream.mustMatch(Tokens.LBRACE);
            ***REMOVED***

                this._readWhitespace();

                try ***REMOVED***

                    while(true)***REMOVED***

                        if (tokenStream.match(Tokens.SEMICOLON) || (readMargins && this._margin()))***REMOVED***
                    ***REMOVED*** else if (this._declaration())***REMOVED***
                            if (!tokenStream.match(Tokens.SEMICOLON))***REMOVED***
                                break;
                        ***REMOVED***
                    ***REMOVED*** else ***REMOVED***
                            break;
                    ***REMOVED***
                        this._readWhitespace();
                ***REMOVED***

                    tokenStream.mustMatch(Tokens.RBRACE);
                    this._readWhitespace();

            ***REMOVED*** catch (ex) ***REMOVED***
                    if (ex instanceof SyntaxError && !this.options.strict)***REMOVED***
                        this.fire(***REMOVED***
                            type:       "error",
                            error:      ex,
                            message:    ex.message,
                            line:       ex.line,
                            col:        ex.col
                    ***REMOVED***);
                        tt = tokenStream.advance([Tokens.SEMICOLON, Tokens.RBRACE]);
                        if (tt == Tokens.SEMICOLON)***REMOVED***
                            this._readDeclarations(false, readMargins);
                    ***REMOVED*** else if (tt != Tokens.RBRACE)***REMOVED***
                            throw ex;
                    ***REMOVED***

                ***REMOVED*** else ***REMOVED***
                        throw ex;
                ***REMOVED***
            ***REMOVED***

        ***REMOVED***
            _readWhitespace: function()***REMOVED***

                var tokenStream = this._tokenStream,
                    ws = "";

                while(tokenStream.match(Tokens.S))***REMOVED***
                    ws += tokenStream.token().value;
            ***REMOVED***

                return ws;
        ***REMOVED***
            _unexpectedToken: function(token)***REMOVED***
                throw new SyntaxError("Unexpected token '" + token.value + "' at line " + token.startLine + ", col " + token.startCol + ".", token.startLine, token.startCol);
        ***REMOVED***
            _verifyEnd: function()***REMOVED***
                if (this._tokenStream.LA(1) != Tokens.EOF)***REMOVED***
                    this._unexpectedToken(this._tokenStream.LT(1));
            ***REMOVED***
        ***REMOVED***
            _validateProperty: function(property, value)***REMOVED***
                Validation.validate(property, value);
        ***REMOVED***

            parse: function(input)***REMOVED***
                this._tokenStream = new TokenStream(input, Tokens);
                this._stylesheet();
        ***REMOVED***

            parseStyleSheet: function(input)***REMOVED***
                return this.parse(input);
        ***REMOVED***

            parseMediaQuery: function(input)***REMOVED***
                this._tokenStream = new TokenStream(input, Tokens);
                var result = this._media_query();
                this._verifyEnd();
                return result;
        ***REMOVED***
            parsePropertyValue: function(input)***REMOVED***

                this._tokenStream = new TokenStream(input, Tokens);
                this._readWhitespace();

                var result = this._expr();
                this._readWhitespace();
                this._verifyEnd();
                return result;
        ***REMOVED***
            parseRule: function(input)***REMOVED***
                this._tokenStream = new TokenStream(input, Tokens);
                this._readWhitespace();

                var result = this._ruleset();
                this._readWhitespace();
                this._verifyEnd();
                return result;
        ***REMOVED***
            parseSelector: function(input)***REMOVED***

                this._tokenStream = new TokenStream(input, Tokens);
                this._readWhitespace();

                var result = this._selector();
                this._readWhitespace();
                this._verifyEnd();
                return result;
        ***REMOVED***
            parseStyleAttribute: function(input)***REMOVED***
                input += "***REMOVED***"; // for error recovery in _readDeclarations()
                this._tokenStream = new TokenStream(input, Tokens);
                this._readDeclarations();
        ***REMOVED***
    ***REMOVED***;
    for (prop in additions)***REMOVED***
        if (additions.hasOwnProperty(prop))***REMOVED***
            proto[prop] = additions[prop];
    ***REMOVED***
***REMOVED***

    return proto;
***REMOVED***();
var Properties = ***REMOVED***
    "align-items"                   : "flex-start | flex-end | center | baseline | stretch",
    "align-content"                 : "flex-start | flex-end | center | space-between | space-around | stretch",
    "align-self"                    : "auto | flex-start | flex-end | center | baseline | stretch",
    "-webkit-align-items"           : "flex-start | flex-end | center | baseline | stretch",
    "-webkit-align-content"         : "flex-start | flex-end | center | space-between | space-around | stretch",
    "-webkit-align-self"            : "auto | flex-start | flex-end | center | baseline | stretch",
    "alignment-adjust"              : "auto | baseline | before-edge | text-before-edge | middle | central | after-edge | text-after-edge | ideographic | alphabetic | hanging | mathematical | <percentage> | <length>",
    "alignment-baseline"            : "baseline | use-script | before-edge | text-before-edge | after-edge | text-after-edge | central | middle | ideographic | alphabetic | hanging | mathematical",
    "animation"                     : 1,
    "animation-delay"               : ***REMOVED*** multi: "<time>", comma: true ***REMOVED***,
    "animation-direction"           : ***REMOVED*** multi: "normal | alternate", comma: true ***REMOVED***,
    "animation-duration"            : ***REMOVED*** multi: "<time>", comma: true ***REMOVED***,
    "animation-iteration-count"     : ***REMOVED*** multi: "<number> | infinite", comma: true ***REMOVED***,
    "animation-name"                : ***REMOVED*** multi: "none | <ident>", comma: true ***REMOVED***,
    "animation-play-state"          : ***REMOVED*** multi: "running | paused", comma: true ***REMOVED***,
    "animation-timing-function"     : 1,
    "-moz-animation-delay"               : ***REMOVED*** multi: "<time>", comma: true ***REMOVED***,
    "-moz-animation-direction"           : ***REMOVED*** multi: "normal | alternate", comma: true ***REMOVED***,
    "-moz-animation-duration"            : ***REMOVED*** multi: "<time>", comma: true ***REMOVED***,
    "-moz-animation-iteration-count"     : ***REMOVED*** multi: "<number> | infinite", comma: true ***REMOVED***,
    "-moz-animation-name"                : ***REMOVED*** multi: "none | <ident>", comma: true ***REMOVED***,
    "-moz-animation-play-state"          : ***REMOVED*** multi: "running | paused", comma: true ***REMOVED***,

    "-ms-animation-delay"               : ***REMOVED*** multi: "<time>", comma: true ***REMOVED***,
    "-ms-animation-direction"           : ***REMOVED*** multi: "normal | alternate", comma: true ***REMOVED***,
    "-ms-animation-duration"            : ***REMOVED*** multi: "<time>", comma: true ***REMOVED***,
    "-ms-animation-iteration-count"     : ***REMOVED*** multi: "<number> | infinite", comma: true ***REMOVED***,
    "-ms-animation-name"                : ***REMOVED*** multi: "none | <ident>", comma: true ***REMOVED***,
    "-ms-animation-play-state"          : ***REMOVED*** multi: "running | paused", comma: true ***REMOVED***,

    "-webkit-animation-delay"               : ***REMOVED*** multi: "<time>", comma: true ***REMOVED***,
    "-webkit-animation-direction"           : ***REMOVED*** multi: "normal | alternate", comma: true ***REMOVED***,
    "-webkit-animation-duration"            : ***REMOVED*** multi: "<time>", comma: true ***REMOVED***,
    "-webkit-animation-iteration-count"     : ***REMOVED*** multi: "<number> | infinite", comma: true ***REMOVED***,
    "-webkit-animation-name"                : ***REMOVED*** multi: "none | <ident>", comma: true ***REMOVED***,
    "-webkit-animation-play-state"          : ***REMOVED*** multi: "running | paused", comma: true ***REMOVED***,

    "-o-animation-delay"               : ***REMOVED*** multi: "<time>", comma: true ***REMOVED***,
    "-o-animation-direction"           : ***REMOVED*** multi: "normal | alternate", comma: true ***REMOVED***,
    "-o-animation-duration"            : ***REMOVED*** multi: "<time>", comma: true ***REMOVED***,
    "-o-animation-iteration-count"     : ***REMOVED*** multi: "<number> | infinite", comma: true ***REMOVED***,
    "-o-animation-name"                : ***REMOVED*** multi: "none | <ident>", comma: true ***REMOVED***,
    "-o-animation-play-state"          : ***REMOVED*** multi: "running | paused", comma: true ***REMOVED***,

    "appearance"                    : "icon | window | desktop | workspace | document | tooltip | dialog | button | push-button | hyperlink | radio-button | checkbox | menu-item | tab | menu | menubar | pull-down-menu | pop-up-menu | list-menu | radio-group | checkbox-group | outline-tree | range | field | combo-box | signature | password | normal | none | inherit",
    "azimuth"                       : function (expression) ***REMOVED***
        var simple      = "<angle> | leftwards | rightwards | inherit",
            direction   = "left-side | far-left | left | center-left | center | center-right | right | far-right | right-side",
            behind      = false,
            valid       = false,
            part;

        if (!ValidationTypes.isAny(expression, simple)) ***REMOVED***
            if (ValidationTypes.isAny(expression, "behind")) ***REMOVED***
                behind = true;
                valid = true;
        ***REMOVED***

            if (ValidationTypes.isAny(expression, direction)) ***REMOVED***
                valid = true;
                if (!behind) ***REMOVED***
                    ValidationTypes.isAny(expression, "behind");
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***

        if (expression.hasNext()) ***REMOVED***
            part = expression.next();
            if (valid) ***REMOVED***
                throw new ValidationError("Expected end of value but found '" + part + "'.", part.line, part.col);
        ***REMOVED*** else ***REMOVED***
                throw new ValidationError("Expected (<'azimuth'>) but found '" + part + "'.", part.line, part.col);
        ***REMOVED***
    ***REMOVED***
***REMOVED***
    "backface-visibility"           : "visible | hidden",
    "background"                    : 1,
    "background-attachment"         : ***REMOVED*** multi: "<attachment>", comma: true ***REMOVED***,
    "background-clip"               : ***REMOVED*** multi: "<box>", comma: true ***REMOVED***,
    "background-color"              : "<color> | inherit",
    "background-image"              : ***REMOVED*** multi: "<bg-image>", comma: true ***REMOVED***,
    "background-origin"             : ***REMOVED*** multi: "<box>", comma: true ***REMOVED***,
    "background-position"           : ***REMOVED*** multi: "<bg-position>", comma: true ***REMOVED***,
    "background-repeat"             : ***REMOVED*** multi: "<repeat-style>" ***REMOVED***,
    "background-size"               : ***REMOVED*** multi: "<bg-size>", comma: true ***REMOVED***,
    "baseline-shift"                : "baseline | sub | super | <percentage> | <length>",
    "behavior"                      : 1,
    "binding"                       : 1,
    "bleed"                         : "<length>",
    "bookmark-label"                : "<content> | <attr> | <string>",
    "bookmark-level"                : "none | <integer>",
    "bookmark-state"                : "open | closed",
    "bookmark-target"               : "none | <uri> | <attr>",
    "border"                        : "<border-width> || <border-style> || <color>",
    "border-bottom"                 : "<border-width> || <border-style> || <color>",
    "border-bottom-color"           : "<color> | inherit",
    "border-bottom-left-radius"     :  "<x-one-radius>",
    "border-bottom-right-radius"    :  "<x-one-radius>",
    "border-bottom-style"           : "<border-style>",
    "border-bottom-width"           : "<border-width>",
    "border-collapse"               : "collapse | separate | inherit",
    "border-color"                  : ***REMOVED*** multi: "<color> | inherit", max: 4 ***REMOVED***,
    "border-image"                  : 1,
    "border-image-outset"           : ***REMOVED*** multi: "<length> | <number>", max: 4 ***REMOVED***,
    "border-image-repeat"           : ***REMOVED*** multi: "stretch | repeat | round", max: 2 ***REMOVED***,
    "border-image-slice"            : function(expression) ***REMOVED***

        var valid   = false,
            numeric = "<number> | <percentage>",
            fill    = false,
            count   = 0,
            max     = 4,
            part;

        if (ValidationTypes.isAny(expression, "fill")) ***REMOVED***
            fill = true;
            valid = true;
    ***REMOVED***

        while (expression.hasNext() && count < max) ***REMOVED***
            valid = ValidationTypes.isAny(expression, numeric);
            if (!valid) ***REMOVED***
                break;
        ***REMOVED***
            count++;
    ***REMOVED***


        if (!fill) ***REMOVED***
            ValidationTypes.isAny(expression, "fill");
    ***REMOVED*** else ***REMOVED***
            valid = true;
    ***REMOVED***

        if (expression.hasNext()) ***REMOVED***
            part = expression.next();
            if (valid) ***REMOVED***
                throw new ValidationError("Expected end of value but found '" + part + "'.", part.line, part.col);
        ***REMOVED*** else ***REMOVED***
                throw new ValidationError("Expected ([<number> | <percentage>]***REMOVED***1,4***REMOVED*** && fill?) but found '" + part + "'.", part.line, part.col);
        ***REMOVED***
    ***REMOVED***
***REMOVED***
    "border-image-source"           : "<image> | none",
    "border-image-width"            : ***REMOVED*** multi: "<length> | <percentage> | <number> | auto", max: 4 ***REMOVED***,
    "border-left"                   : "<border-width> || <border-style> || <color>",
    "border-left-color"             : "<color> | inherit",
    "border-left-style"             : "<border-style>",
    "border-left-width"             : "<border-width>",
    "border-radius"                 : function(expression) ***REMOVED***

        var valid   = false,
            simple = "<length> | <percentage> | inherit",
            slash   = false,
            fill    = false,
            count   = 0,
            max     = 8,
            part;

        while (expression.hasNext() && count < max) ***REMOVED***
            valid = ValidationTypes.isAny(expression, simple);
            if (!valid) ***REMOVED***

                if (expression.peek() == "/" && count > 0 && !slash) ***REMOVED***
                    slash = true;
                    max = count + 5;
                    expression.next();
            ***REMOVED*** else ***REMOVED***
                    break;
            ***REMOVED***
        ***REMOVED***
            count++;
    ***REMOVED***

        if (expression.hasNext()) ***REMOVED***
            part = expression.next();
            if (valid) ***REMOVED***
                throw new ValidationError("Expected end of value but found '" + part + "'.", part.line, part.col);
        ***REMOVED*** else ***REMOVED***
                throw new ValidationError("Expected (<'border-radius'>) but found '" + part + "'.", part.line, part.col);
        ***REMOVED***
    ***REMOVED***
***REMOVED***
    "border-right"                  : "<border-width> || <border-style> || <color>",
    "border-right-color"            : "<color> | inherit",
    "border-right-style"            : "<border-style>",
    "border-right-width"            : "<border-width>",
    "border-spacing"                : ***REMOVED*** multi: "<length> | inherit", max: 2 ***REMOVED***,
    "border-style"                  : ***REMOVED*** multi: "<border-style>", max: 4 ***REMOVED***,
    "border-top"                    : "<border-width> || <border-style> || <color>",
    "border-top-color"              : "<color> | inherit",
    "border-top-left-radius"        : "<x-one-radius>",
    "border-top-right-radius"       : "<x-one-radius>",
    "border-top-style"              : "<border-style>",
    "border-top-width"              : "<border-width>",
    "border-width"                  : ***REMOVED*** multi: "<border-width>", max: 4 ***REMOVED***,
    "bottom"                        : "<margin-width> | inherit",
    "-moz-box-align"                : "start | end | center | baseline | stretch",
    "-moz-box-decoration-break"     : "slice |clone",
    "-moz-box-direction"            : "normal | reverse | inherit",
    "-moz-box-flex"                 : "<number>",
    "-moz-box-flex-group"           : "<integer>",
    "-moz-box-lines"                : "single | multiple",
    "-moz-box-ordinal-group"        : "<integer>",
    "-moz-box-orient"               : "horizontal | vertical | inline-axis | block-axis | inherit",
    "-moz-box-pack"                 : "start | end | center | justify",
    "-webkit-box-align"             : "start | end | center | baseline | stretch",
    "-webkit-box-decoration-break"  : "slice |clone",
    "-webkit-box-direction"         : "normal | reverse | inherit",
    "-webkit-box-flex"              : "<number>",
    "-webkit-box-flex-group"        : "<integer>",
    "-webkit-box-lines"             : "single | multiple",
    "-webkit-box-ordinal-group"     : "<integer>",
    "-webkit-box-orient"            : "horizontal | vertical | inline-axis | block-axis | inherit",
    "-webkit-box-pack"              : "start | end | center | justify",
    "box-shadow"                    : function (expression) ***REMOVED***
        var result      = false,
            part;

        if (!ValidationTypes.isAny(expression, "none")) ***REMOVED***
            Validation.multiProperty("<shadow>", expression, true, Infinity);
    ***REMOVED*** else ***REMOVED***
            if (expression.hasNext()) ***REMOVED***
                part = expression.next();
                throw new ValidationError("Expected end of value but found '" + part + "'.", part.line, part.col);
        ***REMOVED***
    ***REMOVED***
***REMOVED***
    "box-sizing"                    : "content-box | border-box | inherit",
    "break-after"                   : "auto | always | avoid | left | right | page | column | avoid-page | avoid-column",
    "break-before"                  : "auto | always | avoid | left | right | page | column | avoid-page | avoid-column",
    "break-inside"                  : "auto | avoid | avoid-page | avoid-column",
    "caption-side"                  : "top | bottom | inherit",
    "clear"                         : "none | right | left | both | inherit",
    "clip"                          : 1,
    "color"                         : "<color> | inherit",
    "color-profile"                 : 1,
    "column-count"                  : "<integer> | auto",                      //http://www.w3.org/TR/css3-multicol/
    "column-fill"                   : "auto | balance",
    "column-gap"                    : "<length> | normal",
    "column-rule"                   : "<border-width> || <border-style> || <color>",
    "column-rule-color"             : "<color>",
    "column-rule-style"             : "<border-style>",
    "column-rule-width"             : "<border-width>",
    "column-span"                   : "none | all",
    "column-width"                  : "<length> | auto",
    "columns"                       : 1,
    "content"                       : 1,
    "counter-increment"             : 1,
    "counter-reset"                 : 1,
    "crop"                          : "<shape> | auto",
    "cue"                           : "cue-after | cue-before | inherit",
    "cue-after"                     : 1,
    "cue-before"                    : 1,
    "cursor"                        : 1,
    "direction"                     : "ltr | rtl | inherit",
    "display"                       : "inline | block | list-item | inline-block | table | inline-table | table-row-group | table-header-group | table-footer-group | table-row | table-column-group | table-column | table-cell | table-caption | grid | inline-grid | none | inherit | -moz-box | -moz-inline-block | -moz-inline-box | -moz-inline-grid | -moz-inline-stack | -moz-inline-table | -moz-grid | -moz-grid-group | -moz-grid-line | -moz-groupbox | -moz-deck | -moz-popup | -moz-stack | -moz-marker | -webkit-box | -webkit-inline-box | -ms-flexbox | -ms-inline-flexbox | flex | -webkit-flex | inline-flex | -webkit-inline-flex",
    "dominant-baseline"             : 1,
    "drop-initial-after-adjust"     : "central | middle | after-edge | text-after-edge | ideographic | alphabetic | mathematical | <percentage> | <length>",
    "drop-initial-after-align"      : "baseline | use-script | before-edge | text-before-edge | after-edge | text-after-edge | central | middle | ideographic | alphabetic | hanging | mathematical",
    "drop-initial-before-adjust"    : "before-edge | text-before-edge | central | middle | hanging | mathematical | <percentage> | <length>",
    "drop-initial-before-align"     : "caps-height | baseline | use-script | before-edge | text-before-edge | after-edge | text-after-edge | central | middle | ideographic | alphabetic | hanging | mathematical",
    "drop-initial-size"             : "auto | line | <length> | <percentage>",
    "drop-initial-value"            : "initial | <integer>",
    "elevation"                     : "<angle> | below | level | above | higher | lower | inherit",
    "empty-cells"                   : "show | hide | inherit",
    "filter"                        : 1,
    "fit"                           : "fill | hidden | meet | slice",
    "fit-position"                  : 1,
    "flex"                          : "none | [ <flex-grow> <flex-shrink>? || <flex-basis>",
    "flex-basis"                    : "<width>",
    "flex-direction"                : "row | row-reverse | column | column-reverse",
    "flex-flow"                     : "<flex-direction> || <flex-wrap>",
    "flex-grow"                     : "<number>",
    "flex-shrink"                   : "<number>",
    "flex-wrap"                     : "nowrap | wrap | wrap-reverse",
    "-webkit-flex"                  : "none | [ <flex-grow> <flex-shrink>? || <flex-basis>",
    "-webkit-flex-basis"            : "<width>",
    "-webkit-flex-direction"        : "row | row-reverse | column | column-reverse",
    "-webkit-flex-flow"             : "<flex-direction> || <flex-wrap>",
    "-webkit-flex-grow"             : "<number>",
    "-webkit-flex-shrink"           : "<number>",
    "-webkit-flex-wrap"             : "nowrap | wrap | wrap-reverse",
    "-ms-flex"                      : "[[ <number> <number>? ] || [ <length> || <percentage> || auto ] ] | none",
    "-ms-flex-align"                : "start | end | center | stretch | baseline",
    "-ms-flex-direction"            : "row | column | row-reverse | column-reverse | inherit",
    "-ms-flex-order"                : "<number>",
    "-ms-flex-pack"                 : "start | end | center | justify",
    "-ms-flex-wrap"                 : "nowrap | wrap | wrap-reverse",
    "float"                         : "left | right | none | inherit",
    "float-offset"                  : 1,
    "font"                          : 1,
    "font-family"                   : 1,
    "font-size"                     : "<absolute-size> | <relative-size> | <length> | <percentage> | inherit",
    "font-size-adjust"              : "<number> | none | inherit",
    "font-stretch"                  : "normal | ultra-condensed | extra-condensed | condensed | semi-condensed | semi-expanded | expanded | extra-expanded | ultra-expanded | inherit",
    "font-style"                    : "normal | italic | oblique | inherit",
    "font-variant"                  : "normal | small-caps | inherit",
    "font-weight"                   : "normal | bold | bolder | lighter | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | inherit",
    "grid-cell-stacking"            : "columns | rows | layer",
    "grid-column"                   : 1,
    "grid-columns"                  : 1,
    "grid-column-align"             : "start | end | center | stretch",
    "grid-column-sizing"            : 1,
    "grid-column-span"              : "<integer>",
    "grid-flow"                     : "none | rows | columns",
    "grid-layer"                    : "<integer>",
    "grid-row"                      : 1,
    "grid-rows"                     : 1,
    "grid-row-align"                : "start | end | center | stretch",
    "grid-row-span"                 : "<integer>",
    "grid-row-sizing"               : 1,
    "hanging-punctuation"           : 1,
    "height"                        : "<margin-width> | inherit",
    "hyphenate-after"               : "<integer> | auto",
    "hyphenate-before"              : "<integer> | auto",
    "hyphenate-character"           : "<string> | auto",
    "hyphenate-lines"               : "no-limit | <integer>",
    "hyphenate-resource"            : 1,
    "hyphens"                       : "none | manual | auto",
    "icon"                          : 1,
    "image-orientation"             : "angle | auto",
    "image-rendering"               : 1,
    "image-resolution"              : 1,
    "inline-box-align"              : "initial | last | <integer>",
    "justify-content"               : "flex-start | flex-end | center | space-between | space-around",
    "-webkit-justify-content"       : "flex-start | flex-end | center | space-between | space-around",
    "left"                          : "<margin-width> | inherit",
    "letter-spacing"                : "<length> | normal | inherit",
    "line-height"                   : "<number> | <length> | <percentage> | normal | inherit",
    "line-break"                    : "auto | loose | normal | strict",
    "line-stacking"                 : 1,
    "line-stacking-ruby"            : "exclude-ruby | include-ruby",
    "line-stacking-shift"           : "consider-shifts | disregard-shifts",
    "line-stacking-strategy"        : "inline-line-height | block-line-height | max-height | grid-height",
    "list-style"                    : 1,
    "list-style-image"              : "<uri> | none | inherit",
    "list-style-position"           : "inside | outside | inherit",
    "list-style-type"               : "disc | circle | square | decimal | decimal-leading-zero | lower-roman | upper-roman | lower-greek | lower-latin | upper-latin | armenian | georgian | lower-alpha | upper-alpha | none | inherit",
    "margin"                        : ***REMOVED*** multi: "<margin-width> | inherit", max: 4 ***REMOVED***,
    "margin-bottom"                 : "<margin-width> | inherit",
    "margin-left"                   : "<margin-width> | inherit",
    "margin-right"                  : "<margin-width> | inherit",
    "margin-top"                    : "<margin-width> | inherit",
    "mark"                          : 1,
    "mark-after"                    : 1,
    "mark-before"                   : 1,
    "marks"                         : 1,
    "marquee-direction"             : 1,
    "marquee-play-count"            : 1,
    "marquee-speed"                 : 1,
    "marquee-style"                 : 1,
    "max-height"                    : "<length> | <percentage> | none | inherit",
    "max-width"                     : "<length> | <percentage> | none | inherit",
    "min-height"                    : "<length> | <percentage> | inherit",
    "min-width"                     : "<length> | <percentage> | inherit",
    "move-to"                       : 1,
    "nav-down"                      : 1,
    "nav-index"                     : 1,
    "nav-left"                      : 1,
    "nav-right"                     : 1,
    "nav-up"                        : 1,
    "opacity"                       : "<number> | inherit",
    "order"                         : "<integer>",
    "-webkit-order"                 : "<integer>",
    "orphans"                       : "<integer> | inherit",
    "outline"                       : 1,
    "outline-color"                 : "<color> | invert | inherit",
    "outline-offset"                : 1,
    "outline-style"                 : "<border-style> | inherit",
    "outline-width"                 : "<border-width> | inherit",
    "overflow"                      : "visible | hidden | scroll | auto | inherit",
    "overflow-style"                : 1,
    "overflow-wrap"                 : "normal | break-word",
    "overflow-x"                    : 1,
    "overflow-y"                    : 1,
    "padding"                       : ***REMOVED*** multi: "<padding-width> | inherit", max: 4 ***REMOVED***,
    "padding-bottom"                : "<padding-width> | inherit",
    "padding-left"                  : "<padding-width> | inherit",
    "padding-right"                 : "<padding-width> | inherit",
    "padding-top"                   : "<padding-width> | inherit",
    "page"                          : 1,
    "page-break-after"              : "auto | always | avoid | left | right | inherit",
    "page-break-before"             : "auto | always | avoid | left | right | inherit",
    "page-break-inside"             : "auto | avoid | inherit",
    "page-policy"                   : 1,
    "pause"                         : 1,
    "pause-after"                   : 1,
    "pause-before"                  : 1,
    "perspective"                   : 1,
    "perspective-origin"            : 1,
    "phonemes"                      : 1,
    "pitch"                         : 1,
    "pitch-range"                   : 1,
    "play-during"                   : 1,
    "pointer-events"                : "auto | none | visiblePainted | visibleFill | visibleStroke | visible | painted | fill | stroke | all | inherit",
    "position"                      : "static | relative | absolute | fixed | inherit",
    "presentation-level"            : 1,
    "punctuation-trim"              : 1,
    "quotes"                        : 1,
    "rendering-intent"              : 1,
    "resize"                        : 1,
    "rest"                          : 1,
    "rest-after"                    : 1,
    "rest-before"                   : 1,
    "richness"                      : 1,
    "right"                         : "<margin-width> | inherit",
    "rotation"                      : 1,
    "rotation-point"                : 1,
    "ruby-align"                    : 1,
    "ruby-overhang"                 : 1,
    "ruby-position"                 : 1,
    "ruby-span"                     : 1,
    "size"                          : 1,
    "speak"                         : "normal | none | spell-out | inherit",
    "speak-header"                  : "once | always | inherit",
    "speak-numeral"                 : "digits | continuous | inherit",
    "speak-punctuation"             : "code | none | inherit",
    "speech-rate"                   : 1,
    "src"                           : 1,
    "stress"                        : 1,
    "string-set"                    : 1,

    "table-layout"                  : "auto | fixed | inherit",
    "tab-size"                      : "<integer> | <length>",
    "target"                        : 1,
    "target-name"                   : 1,
    "target-new"                    : 1,
    "target-position"               : 1,
    "text-align"                    : "left | right | center | justify | inherit" ,
    "text-align-last"               : 1,
    "text-decoration"               : 1,
    "text-emphasis"                 : 1,
    "text-height"                   : 1,
    "text-indent"                   : "<length> | <percentage> | inherit",
    "text-justify"                  : "auto | none | inter-word | inter-ideograph | inter-cluster | distribute | kashida",
    "text-outline"                  : 1,
    "text-overflow"                 : 1,
    "text-rendering"                : "auto | optimizeSpeed | optimizeLegibility | geometricPrecision | inherit",
    "text-shadow"                   : 1,
    "text-transform"                : "capitalize | uppercase | lowercase | none | inherit",
    "text-wrap"                     : "normal | none | avoid",
    "top"                           : "<margin-width> | inherit",
    "-ms-touch-action"              : "auto | none | pan-x | pan-y",
    "touch-action"                  : "auto | none | pan-x | pan-y",
    "transform"                     : 1,
    "transform-origin"              : 1,
    "transform-style"               : 1,
    "transition"                    : 1,
    "transition-delay"              : 1,
    "transition-duration"           : 1,
    "transition-property"           : 1,
    "transition-timing-function"    : 1,
    "unicode-bidi"                  : "normal | embed | isolate | bidi-override | isolate-override | plaintext | inherit",
    "user-modify"                   : "read-only | read-write | write-only | inherit",
    "user-select"                   : "none | text | toggle | element | elements | all | inherit",
    "vertical-align"                : "auto | use-script | baseline | sub | super | top | text-top | central | middle | bottom | text-bottom | <percentage> | <length>",
    "visibility"                    : "visible | hidden | collapse | inherit",
    "voice-balance"                 : 1,
    "voice-duration"                : 1,
    "voice-family"                  : 1,
    "voice-pitch"                   : 1,
    "voice-pitch-range"             : 1,
    "voice-rate"                    : 1,
    "voice-stress"                  : 1,
    "voice-volume"                  : 1,
    "volume"                        : 1,
    "white-space"                   : "normal | pre | nowrap | pre-wrap | pre-line | inherit | -pre-wrap | -o-pre-wrap | -moz-pre-wrap | -hp-pre-wrap", //http://perishablepress.com/wrapping-content/
    "white-space-collapse"          : 1,
    "widows"                        : "<integer> | inherit",
    "width"                         : "<length> | <percentage> | auto | inherit" ,
    "word-break"                    : "normal | keep-all | break-all",
    "word-spacing"                  : "<length> | normal | inherit",
    "word-wrap"                     : "normal | break-word",
    "writing-mode"                  : "horizontal-tb | vertical-rl | vertical-lr | lr-tb | rl-tb | tb-rl | bt-rl | tb-lr | bt-lr | lr-bt | rl-bt | lr | rl | tb | inherit",
    "z-index"                       : "<integer> | auto | inherit",
    "zoom"                          : "<number> | <percentage> | normal"
***REMOVED***;
function PropertyName(text, hack, line, col)***REMOVED***

    SyntaxUnit.call(this, text, line, col, Parser.PROPERTY_NAME_TYPE);
    this.hack = hack;

***REMOVED***

PropertyName.prototype = new SyntaxUnit();
PropertyName.prototype.constructor = PropertyName;
PropertyName.prototype.toString = function()***REMOVED***
    return (this.hack ? this.hack : "") + this.text;
***REMOVED***;
function PropertyValue(parts, line, col)***REMOVED***

    SyntaxUnit.call(this, parts.join(" "), line, col, Parser.PROPERTY_VALUE_TYPE);
    this.parts = parts;

***REMOVED***

PropertyValue.prototype = new SyntaxUnit();
PropertyValue.prototype.constructor = PropertyValue;
function PropertyValueIterator(value)***REMOVED***
    this._i = 0;
    this._parts = value.parts;
    this._marks = [];
    this.value = value;

***REMOVED***
PropertyValueIterator.prototype.count = function()***REMOVED***
    return this._parts.length;
***REMOVED***;
PropertyValueIterator.prototype.isFirst = function()***REMOVED***
    return this._i === 0;
***REMOVED***;
PropertyValueIterator.prototype.hasNext = function()***REMOVED***
    return (this._i < this._parts.length);
***REMOVED***;
PropertyValueIterator.prototype.mark = function()***REMOVED***
    this._marks.push(this._i);
***REMOVED***;
PropertyValueIterator.prototype.peek = function(count)***REMOVED***
    return this.hasNext() ? this._parts[this._i + (count || 0)] : null;
***REMOVED***;
PropertyValueIterator.prototype.next = function()***REMOVED***
    return this.hasNext() ? this._parts[this._i++] : null;
***REMOVED***;
PropertyValueIterator.prototype.previous = function()***REMOVED***
    return this._i > 0 ? this._parts[--this._i] : null;
***REMOVED***;
PropertyValueIterator.prototype.restore = function()***REMOVED***
    if (this._marks.length)***REMOVED***
        this._i = this._marks.pop();
***REMOVED***
***REMOVED***;
function PropertyValuePart(text, line, col)***REMOVED***

    SyntaxUnit.call(this, text, line, col, Parser.PROPERTY_VALUE_PART_TYPE);
    this.type = "unknown";

    var temp;
    if (/^([+\-]?[\d\.]+)([a-z]+)$/i.test(text))***REMOVED***  //dimension
        this.type = "dimension";
        this.value = +RegExp.$1;
        this.units = RegExp.$2;
        switch(this.units.toLowerCase())***REMOVED***

            case "em":
            case "rem":
            case "ex":
            case "px":
            case "cm":
            case "mm":
            case "in":
            case "pt":
            case "pc":
            case "ch":
            case "vh":
            case "vw":
            case "vm":
                this.type = "length";
                break;

            case "deg":
            case "rad":
            case "grad":
                this.type = "angle";
                break;

            case "ms":
            case "s":
                this.type = "time";
                break;

            case "hz":
            case "khz":
                this.type = "frequency";
                break;

            case "dpi":
            case "dpcm":
                this.type = "resolution";
                break;

    ***REMOVED***

***REMOVED*** else if (/^([+\-]?[\d\.]+)%$/i.test(text))***REMOVED***  //percentage
        this.type = "percentage";
        this.value = +RegExp.$1;
***REMOVED*** else if (/^([+\-]?\d+)$/i.test(text))***REMOVED***  //integer
        this.type = "integer";
        this.value = +RegExp.$1;
***REMOVED*** else if (/^([+\-]?[\d\.]+)$/i.test(text))***REMOVED***  //number
        this.type = "number";
        this.value = +RegExp.$1;

***REMOVED*** else if (/^#([a-f0-9]***REMOVED***3,6***REMOVED***)/i.test(text))***REMOVED***  //hexcolor
        this.type = "color";
        temp = RegExp.$1;
        if (temp.length == 3)***REMOVED***
            this.red    = parseInt(temp.charAt(0)+temp.charAt(0),16);
            this.green  = parseInt(temp.charAt(1)+temp.charAt(1),16);
            this.blue   = parseInt(temp.charAt(2)+temp.charAt(2),16);
    ***REMOVED*** else ***REMOVED***
            this.red    = parseInt(temp.substring(0,2),16);
            this.green  = parseInt(temp.substring(2,4),16);
            this.blue   = parseInt(temp.substring(4,6),16);
    ***REMOVED***
***REMOVED*** else if (/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i.test(text))***REMOVED*** //rgb() color with absolute numbers
        this.type   = "color";
        this.red    = +RegExp.$1;
        this.green  = +RegExp.$2;
        this.blue   = +RegExp.$3;
***REMOVED*** else if (/^rgb\(\s*(\d+)%\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)/i.test(text))***REMOVED*** //rgb() color with percentages
        this.type   = "color";
        this.red    = +RegExp.$1 * 255 / 100;
        this.green  = +RegExp.$2 * 255 / 100;
        this.blue   = +RegExp.$3 * 255 / 100;
***REMOVED*** else if (/^rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d\.]+)\s*\)/i.test(text))***REMOVED*** //rgba() color with absolute numbers
        this.type   = "color";
        this.red    = +RegExp.$1;
        this.green  = +RegExp.$2;
        this.blue   = +RegExp.$3;
        this.alpha  = +RegExp.$4;
***REMOVED*** else if (/^rgba\(\s*(\d+)%\s*,\s*(\d+)%\s*,\s*(\d+)%\s*,\s*([\d\.]+)\s*\)/i.test(text))***REMOVED*** //rgba() color with percentages
        this.type   = "color";
        this.red    = +RegExp.$1 * 255 / 100;
        this.green  = +RegExp.$2 * 255 / 100;
        this.blue   = +RegExp.$3 * 255 / 100;
        this.alpha  = +RegExp.$4;
***REMOVED*** else if (/^hsl\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)/i.test(text))***REMOVED*** //hsl()
        this.type   = "color";
        this.hue    = +RegExp.$1;
        this.saturation = +RegExp.$2 / 100;
        this.lightness  = +RegExp.$3 / 100;
***REMOVED*** else if (/^hsla\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*,\s*([\d\.]+)\s*\)/i.test(text))***REMOVED*** //hsla() color with percentages
        this.type   = "color";
        this.hue    = +RegExp.$1;
        this.saturation = +RegExp.$2 / 100;
        this.lightness  = +RegExp.$3 / 100;
        this.alpha  = +RegExp.$4;
***REMOVED*** else if (/^url\(["']?([^\)"']+)["']?\)/i.test(text))***REMOVED*** //URI
        this.type   = "uri";
        this.uri    = RegExp.$1;
***REMOVED*** else if (/^([^\(]+)\(/i.test(text))***REMOVED***
        this.type   = "function";
        this.name   = RegExp.$1;
        this.value  = text;
***REMOVED*** else if (/^["'][^"']*["']/.test(text))***REMOVED***    //string
        this.type   = "string";
        this.value  = eval(text);
***REMOVED*** else if (Colors[text.toLowerCase()])***REMOVED***  //named color
        this.type   = "color";
        temp        = Colors[text.toLowerCase()].substring(1);
        this.red    = parseInt(temp.substring(0,2),16);
        this.green  = parseInt(temp.substring(2,4),16);
        this.blue   = parseInt(temp.substring(4,6),16);
***REMOVED*** else if (/^[\,\/]$/.test(text))***REMOVED***
        this.type   = "operator";
        this.value  = text;
***REMOVED*** else if (/^[a-z\-\u0080-\uFFFF][a-z0-9\-\u0080-\uFFFF]*$/i.test(text))***REMOVED***
        this.type   = "identifier";
        this.value  = text;
***REMOVED***

***REMOVED***

PropertyValuePart.prototype = new SyntaxUnit();
PropertyValuePart.prototype.constructor = PropertyValuePart;
PropertyValuePart.fromToken = function(token)***REMOVED***
    return new PropertyValuePart(token.value, token.startLine, token.startCol);
***REMOVED***;

var Pseudos = ***REMOVED***
    ":first-letter": 1,
    ":first-line":   1,
    ":before":       1,
    ":after":        1
***REMOVED***;

Pseudos.ELEMENT = 1;
Pseudos.CLASS = 2;

Pseudos.isElement = function(pseudo)***REMOVED***
    return pseudo.indexOf("::") === 0 || Pseudos[pseudo.toLowerCase()] == Pseudos.ELEMENT;
***REMOVED***;
function Selector(parts, line, col)***REMOVED***

    SyntaxUnit.call(this, parts.join(" "), line, col, Parser.SELECTOR_TYPE);
    this.parts = parts;
    this.specificity = Specificity.calculate(this);

***REMOVED***

Selector.prototype = new SyntaxUnit();
Selector.prototype.constructor = Selector;
function SelectorPart(elementName, modifiers, text, line, col)***REMOVED***

    SyntaxUnit.call(this, text, line, col, Parser.SELECTOR_PART_TYPE);
    this.elementName = elementName;
    this.modifiers = modifiers;

***REMOVED***

SelectorPart.prototype = new SyntaxUnit();
SelectorPart.prototype.constructor = SelectorPart;
function SelectorSubPart(text, type, line, col)***REMOVED***

    SyntaxUnit.call(this, text, line, col, Parser.SELECTOR_SUB_PART_TYPE);
    this.type = type;
    this.args = [];

***REMOVED***

SelectorSubPart.prototype = new SyntaxUnit();
SelectorSubPart.prototype.constructor = SelectorSubPart;
function Specificity(a, b, c, d)***REMOVED***
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
***REMOVED***

Specificity.prototype = ***REMOVED***
    constructor: Specificity,
    compare: function(other)***REMOVED***
        var comps = ["a", "b", "c", "d"],
            i, len;

        for (i=0, len=comps.length; i < len; i++)***REMOVED***
            if (this[comps[i]] < other[comps[i]])***REMOVED***
                return -1;
        ***REMOVED*** else if (this[comps[i]] > other[comps[i]])***REMOVED***
                return 1;
        ***REMOVED***
    ***REMOVED***

        return 0;
***REMOVED***
    valueOf: function()***REMOVED***
        return (this.a * 1000) + (this.b * 100) + (this.c * 10) + this.d;
***REMOVED***
    toString: function()***REMOVED***
        return this.a + "," + this.b + "," + this.c + "," + this.d;
***REMOVED***

***REMOVED***;
Specificity.calculate = function(selector)***REMOVED***

    var i, len,
        part,
        b=0, c=0, d=0;

    function updateValues(part)***REMOVED***

        var i, j, len, num,
            elementName = part.elementName ? part.elementName.text : "",
            modifier;

        if (elementName && elementName.charAt(elementName.length-1) != "*") ***REMOVED***
            d++;
    ***REMOVED***

        for (i=0, len=part.modifiers.length; i < len; i++)***REMOVED***
            modifier = part.modifiers[i];
            switch(modifier.type)***REMOVED***
                case "class":
                case "attribute":
                    c++;
                    break;

                case "id":
                    b++;
                    break;

                case "pseudo":
                    if (Pseudos.isElement(modifier.text))***REMOVED***
                        d++;
                ***REMOVED*** else ***REMOVED***
                        c++;
                ***REMOVED***
                    break;

                case "not":
                    for (j=0, num=modifier.args.length; j < num; j++)***REMOVED***
                        updateValues(modifier.args[j]);
                ***REMOVED***
        ***REMOVED***
     ***REMOVED***
***REMOVED***

    for (i=0, len=selector.parts.length; i < len; i++)***REMOVED***
        part = selector.parts[i];

        if (part instanceof SelectorPart)***REMOVED***
            updateValues(part);
    ***REMOVED***
***REMOVED***

    return new Specificity(0, b, c, d);
***REMOVED***;

var h = /^[0-9a-fA-F]$/,
    nonascii = /^[\u0080-\uFFFF]$/,
    nl = /\n|\r\n|\r|\f/;


function isHexDigit(c)***REMOVED***
    return c !== null && h.test(c);
***REMOVED***

function isDigit(c)***REMOVED***
    return c !== null && /\d/.test(c);
***REMOVED***

function isWhitespace(c)***REMOVED***
    return c !== null && /\s/.test(c);
***REMOVED***

function isNewLine(c)***REMOVED***
    return c !== null && nl.test(c);
***REMOVED***

function isNameStart(c)***REMOVED***
    return c !== null && (/[a-z_\u0080-\uFFFF\\]/i.test(c));
***REMOVED***

function isNameChar(c)***REMOVED***
    return c !== null && (isNameStart(c) || /[0-9\-\\]/.test(c));
***REMOVED***

function isIdentStart(c)***REMOVED***
    return c !== null && (isNameStart(c) || /\-\\/.test(c));
***REMOVED***

function mix(receiver, supplier)***REMOVED***
	for (var prop in supplier)***REMOVED***
		if (supplier.hasOwnProperty(prop))***REMOVED***
			receiver[prop] = supplier[prop];
		***REMOVED***
	***REMOVED***
	return receiver;
***REMOVED***
function TokenStream(input)***REMOVED***
	TokenStreamBase.call(this, input, Tokens);
***REMOVED***

TokenStream.prototype = mix(new TokenStreamBase(), ***REMOVED***
    _getToken: function(channel)***REMOVED***

        var c,
            reader = this._reader,
            token   = null,
            startLine   = reader.getLine(),
            startCol    = reader.getCol();

        c = reader.read();


        while(c)***REMOVED***
            switch(c)***REMOVED***
                case "/":

                    if(reader.peek() == "*")***REMOVED***
                        token = this.commentToken(c, startLine, startCol);
                ***REMOVED*** else ***REMOVED***
                        token = this.charToken(c, startLine, startCol);
                ***REMOVED***
                    break;
                case "|":
                case "~":
                case "^":
                case "$":
                case "*":
                    if(reader.peek() == "=")***REMOVED***
                        token = this.comparisonToken(c, startLine, startCol);
                ***REMOVED*** else ***REMOVED***
                        token = this.charToken(c, startLine, startCol);
                ***REMOVED***
                    break;
                case "\"":
                case "'":
                    token = this.stringToken(c, startLine, startCol);
                    break;
                case "#":
                    if (isNameChar(reader.peek()))***REMOVED***
                        token = this.hashToken(c, startLine, startCol);
                ***REMOVED*** else ***REMOVED***
                        token = this.charToken(c, startLine, startCol);
                ***REMOVED***
                    break;
                case ".":
                    if (isDigit(reader.peek()))***REMOVED***
                        token = this.numberToken(c, startLine, startCol);
                ***REMOVED*** else ***REMOVED***
                        token = this.charToken(c, startLine, startCol);
                ***REMOVED***
                    break;
                case "-":
                    if (reader.peek() == "-")***REMOVED***  //could be closing HTML-style comment
                        token = this.htmlCommentEndToken(c, startLine, startCol);
                ***REMOVED*** else if (isNameStart(reader.peek()))***REMOVED***
                        token = this.identOrFunctionToken(c, startLine, startCol);
                ***REMOVED*** else ***REMOVED***
                        token = this.charToken(c, startLine, startCol);
                ***REMOVED***
                    break;
                case "!":
                    token = this.importantToken(c, startLine, startCol);
                    break;
                case "@":
                    token = this.atRuleToken(c, startLine, startCol);
                    break;
                case ":":
                    token = this.notToken(c, startLine, startCol);
                    break;
                case "<":
                    token = this.htmlCommentStartToken(c, startLine, startCol);
                    break;
                case "U":
                case "u":
                    if (reader.peek() == "+")***REMOVED***
                        token = this.unicodeRangeToken(c, startLine, startCol);
                        break;
                ***REMOVED***
                default:
                    if (isDigit(c))***REMOVED***
                        token = this.numberToken(c, startLine, startCol);
                ***REMOVED*** else
                    if (isWhitespace(c))***REMOVED***
                        token = this.whitespaceToken(c, startLine, startCol);
                ***REMOVED*** else
                    if (isIdentStart(c))***REMOVED***
                        token = this.identOrFunctionToken(c, startLine, startCol);
                ***REMOVED*** else
                    ***REMOVED***
                        token = this.charToken(c, startLine, startCol);
                ***REMOVED***






        ***REMOVED***
            break;
    ***REMOVED***

        if (!token && c === null)***REMOVED***
            token = this.createToken(Tokens.EOF,null,startLine,startCol);
    ***REMOVED***

        return token;
***REMOVED***
    createToken: function(tt, value, startLine, startCol, options)***REMOVED***
        var reader = this._reader;
        options = options || ***REMOVED******REMOVED***;

        return ***REMOVED***
            value:      value,
            type:       tt,
            channel:    options.channel,
            hide:       options.hide || false,
            startLine:  startLine,
            startCol:   startCol,
            endLine:    reader.getLine(),
            endCol:     reader.getCol()
    ***REMOVED***;
***REMOVED***
    atRuleToken: function(first, startLine, startCol)***REMOVED***
        var rule    = first,
            reader  = this._reader,
            tt      = Tokens.CHAR,
            valid   = false,
            ident,
            c;
        reader.mark();
        ident = this.readName();
        rule = first + ident;
        tt = Tokens.type(rule.toLowerCase());
        if (tt == Tokens.CHAR || tt == Tokens.UNKNOWN)***REMOVED***
            if (rule.length > 1)***REMOVED***
                tt = Tokens.UNKNOWN_SYM;
        ***REMOVED*** else ***REMOVED***
                tt = Tokens.CHAR;
                rule = first;
                reader.reset();
        ***REMOVED***
    ***REMOVED***

        return this.createToken(tt, rule, startLine, startCol);
***REMOVED***
    charToken: function(c, startLine, startCol)***REMOVED***
        var tt = Tokens.type(c);

        if (tt == -1)***REMOVED***
            tt = Tokens.CHAR;
    ***REMOVED***

        return this.createToken(tt, c, startLine, startCol);
***REMOVED***
    commentToken: function(first, startLine, startCol)***REMOVED***
        var reader  = this._reader,
            comment = this.readComment(first);

        return this.createToken(Tokens.COMMENT, comment, startLine, startCol);
***REMOVED***
    comparisonToken: function(c, startLine, startCol)***REMOVED***
        var reader  = this._reader,
            comparison  = c + reader.read(),
            tt      = Tokens.type(comparison) || Tokens.CHAR;

        return this.createToken(tt, comparison, startLine, startCol);
***REMOVED***
    hashToken: function(first, startLine, startCol)***REMOVED***
        var reader  = this._reader,
            name    = this.readName(first);

        return this.createToken(Tokens.HASH, name, startLine, startCol);
***REMOVED***
    htmlCommentStartToken: function(first, startLine, startCol)***REMOVED***
        var reader      = this._reader,
            text        = first;

        reader.mark();
        text += reader.readCount(3);

        if (text == "<!--")***REMOVED***
            return this.createToken(Tokens.CDO, text, startLine, startCol);
    ***REMOVED*** else ***REMOVED***
            reader.reset();
            return this.charToken(first, startLine, startCol);
    ***REMOVED***
***REMOVED***
    htmlCommentEndToken: function(first, startLine, startCol)***REMOVED***
        var reader      = this._reader,
            text        = first;

        reader.mark();
        text += reader.readCount(2);

        if (text == "-->")***REMOVED***
            return this.createToken(Tokens.CDC, text, startLine, startCol);
    ***REMOVED*** else ***REMOVED***
            reader.reset();
            return this.charToken(first, startLine, startCol);
    ***REMOVED***
***REMOVED***
    identOrFunctionToken: function(first, startLine, startCol)***REMOVED***
        var reader  = this._reader,
            ident   = this.readName(first),
            tt      = Tokens.IDENT;
        if (reader.peek() == "(")***REMOVED***
            ident += reader.read();
            if (ident.toLowerCase() == "url(")***REMOVED***
                tt = Tokens.URI;
                ident = this.readURI(ident);
                if (ident.toLowerCase() == "url(")***REMOVED***
                    tt = Tokens.FUNCTION;
            ***REMOVED***
        ***REMOVED*** else ***REMOVED***
                tt = Tokens.FUNCTION;
        ***REMOVED***
    ***REMOVED*** else if (reader.peek() == ":")***REMOVED***  //might be an IE function
            if (ident.toLowerCase() == "progid")***REMOVED***
                ident += reader.readTo("(");
                tt = Tokens.IE_FUNCTION;
        ***REMOVED***
    ***REMOVED***

        return this.createToken(tt, ident, startLine, startCol);
***REMOVED***
    importantToken: function(first, startLine, startCol)***REMOVED***
        var reader      = this._reader,
            important   = first,
            tt          = Tokens.CHAR,
            temp,
            c;

        reader.mark();
        c = reader.read();

        while(c)***REMOVED***
            if (c == "/")***REMOVED***
                if (reader.peek() != "*")***REMOVED***
                    break;
            ***REMOVED*** else ***REMOVED***
                    temp = this.readComment(c);
                    if (temp === "")***REMOVED***    //broken!
                        break;
                ***REMOVED***
            ***REMOVED***
        ***REMOVED*** else if (isWhitespace(c))***REMOVED***
                important += c + this.readWhitespace();
        ***REMOVED*** else if (/i/i.test(c))***REMOVED***
                temp = reader.readCount(8);
                if (/mportant/i.test(temp))***REMOVED***
                    important += c + temp;
                    tt = Tokens.IMPORTANT_SYM;

            ***REMOVED***
                break;  //we're done
        ***REMOVED*** else ***REMOVED***
                break;
        ***REMOVED***

            c = reader.read();
    ***REMOVED***

        if (tt == Tokens.CHAR)***REMOVED***
            reader.reset();
            return this.charToken(first, startLine, startCol);
    ***REMOVED*** else ***REMOVED***
            return this.createToken(tt, important, startLine, startCol);
    ***REMOVED***


***REMOVED***
    notToken: function(first, startLine, startCol)***REMOVED***
        var reader      = this._reader,
            text        = first;

        reader.mark();
        text += reader.readCount(4);

        if (text.toLowerCase() == ":not(")***REMOVED***
            return this.createToken(Tokens.NOT, text, startLine, startCol);
    ***REMOVED*** else ***REMOVED***
            reader.reset();
            return this.charToken(first, startLine, startCol);
    ***REMOVED***
***REMOVED***
    numberToken: function(first, startLine, startCol)***REMOVED***
        var reader  = this._reader,
            value   = this.readNumber(first),
            ident,
            tt      = Tokens.NUMBER,
            c       = reader.peek();

        if (isIdentStart(c))***REMOVED***
            ident = this.readName(reader.read());
            value += ident;

            if (/^em$|^ex$|^px$|^gd$|^rem$|^vw$|^vh$|^vm$|^ch$|^cm$|^mm$|^in$|^pt$|^pc$/i.test(ident))***REMOVED***
                tt = Tokens.LENGTH;
        ***REMOVED*** else if (/^deg|^rad$|^grad$/i.test(ident))***REMOVED***
                tt = Tokens.ANGLE;
        ***REMOVED*** else if (/^ms$|^s$/i.test(ident))***REMOVED***
                tt = Tokens.TIME;
        ***REMOVED*** else if (/^hz$|^khz$/i.test(ident))***REMOVED***
                tt = Tokens.FREQ;
        ***REMOVED*** else if (/^dpi$|^dpcm$/i.test(ident))***REMOVED***
                tt = Tokens.RESOLUTION;
        ***REMOVED*** else ***REMOVED***
                tt = Tokens.DIMENSION;
        ***REMOVED***

    ***REMOVED*** else if (c == "%")***REMOVED***
            value += reader.read();
            tt = Tokens.PERCENTAGE;
    ***REMOVED***

        return this.createToken(tt, value, startLine, startCol);
***REMOVED***
    stringToken: function(first, startLine, startCol)***REMOVED***
        var delim   = first,
            string  = first,
            reader  = this._reader,
            prev    = first,
            tt      = Tokens.STRING,
            c       = reader.read();

        while(c)***REMOVED***
            string += c;
            if (c == delim && prev != "\\")***REMOVED***
                break;
        ***REMOVED***
            if (isNewLine(reader.peek()) && c != "\\")***REMOVED***
                tt = Tokens.INVALID;
                break;
        ***REMOVED***
            prev = c;
            c = reader.read();
    ***REMOVED***
        if (c === null)***REMOVED***
            tt = Tokens.INVALID;
    ***REMOVED***

        return this.createToken(tt, string, startLine, startCol);
***REMOVED***

    unicodeRangeToken: function(first, startLine, startCol)***REMOVED***
        var reader  = this._reader,
            value   = first,
            temp,
            tt      = Tokens.CHAR;
        if (reader.peek() == "+")***REMOVED***
            reader.mark();
            value += reader.read();
            value += this.readUnicodeRangePart(true);
            if (value.length == 2)***REMOVED***
                reader.reset();
        ***REMOVED*** else ***REMOVED***

                tt = Tokens.UNICODE_RANGE;
                if (value.indexOf("?") == -1)***REMOVED***

                    if (reader.peek() == "-")***REMOVED***
                        reader.mark();
                        temp = reader.read();
                        temp += this.readUnicodeRangePart(false);
                        if (temp.length == 1)***REMOVED***
                            reader.reset();
                    ***REMOVED*** else ***REMOVED***
                            value += temp;
                    ***REMOVED***
                ***REMOVED***

            ***REMOVED***
        ***REMOVED***
    ***REMOVED***

        return this.createToken(tt, value, startLine, startCol);
***REMOVED***
    whitespaceToken: function(first, startLine, startCol)***REMOVED***
        var reader  = this._reader,
            value   = first + this.readWhitespace();
        return this.createToken(Tokens.S, value, startLine, startCol);
***REMOVED***

    readUnicodeRangePart: function(allowQuestionMark)***REMOVED***
        var reader  = this._reader,
            part = "",
            c       = reader.peek();
        while(isHexDigit(c) && part.length < 6)***REMOVED***
            reader.read();
            part += c;
            c = reader.peek();
    ***REMOVED***
        if (allowQuestionMark)***REMOVED***
            while(c == "?" && part.length < 6)***REMOVED***
                reader.read();
                part += c;
                c = reader.peek();
        ***REMOVED***
    ***REMOVED***

        return part;
***REMOVED***

    readWhitespace: function()***REMOVED***
        var reader  = this._reader,
            whitespace = "",
            c       = reader.peek();

        while(isWhitespace(c))***REMOVED***
            reader.read();
            whitespace += c;
            c = reader.peek();
    ***REMOVED***

        return whitespace;
***REMOVED***
    readNumber: function(first)***REMOVED***
        var reader  = this._reader,
            number  = first,
            hasDot  = (first == "."),
            c       = reader.peek();


        while(c)***REMOVED***
            if (isDigit(c))***REMOVED***
                number += reader.read();
        ***REMOVED*** else if (c == ".")***REMOVED***
                if (hasDot)***REMOVED***
                    break;
            ***REMOVED*** else ***REMOVED***
                    hasDot = true;
                    number += reader.read();
            ***REMOVED***
        ***REMOVED*** else ***REMOVED***
                break;
        ***REMOVED***

            c = reader.peek();
    ***REMOVED***

        return number;
***REMOVED***
    readString: function()***REMOVED***
        var reader  = this._reader,
            delim   = reader.read(),
            string  = delim,
            prev    = delim,
            c       = reader.peek();

        while(c)***REMOVED***
            c = reader.read();
            string += c;
            if (c == delim && prev != "\\")***REMOVED***
                break;
        ***REMOVED***
            if (isNewLine(reader.peek()) && c != "\\")***REMOVED***
                string = "";
                break;
        ***REMOVED***
            prev = c;
            c = reader.peek();
    ***REMOVED***
        if (c === null)***REMOVED***
            string = "";
    ***REMOVED***

        return string;
***REMOVED***
    readURI: function(first)***REMOVED***
        var reader  = this._reader,
            uri     = first,
            inner   = "",
            c       = reader.peek();

        reader.mark();
        while(c && isWhitespace(c))***REMOVED***
            reader.read();
            c = reader.peek();
    ***REMOVED***
        if (c == "'" || c == "\"")***REMOVED***
            inner = this.readString();
    ***REMOVED*** else ***REMOVED***
            inner = this.readURL();
    ***REMOVED***

        c = reader.peek();
        while(c && isWhitespace(c))***REMOVED***
            reader.read();
            c = reader.peek();
    ***REMOVED***
        if (inner === "" || c != ")")***REMOVED***
            uri = first;
            reader.reset();
    ***REMOVED*** else ***REMOVED***
            uri += inner + reader.read();
    ***REMOVED***

        return uri;
***REMOVED***
    readURL: function()***REMOVED***
        var reader  = this._reader,
            url     = "",
            c       = reader.peek();
        while (/^[!#$%&\\*-~]$/.test(c))***REMOVED***
            url += reader.read();
            c = reader.peek();
    ***REMOVED***

        return url;

***REMOVED***
    readName: function(first)***REMOVED***
        var reader  = this._reader,
            ident   = first || "",
            c       = reader.peek();

        while(true)***REMOVED***
            if (c == "\\")***REMOVED***
                ident += this.readEscape(reader.read());
                c = reader.peek();
        ***REMOVED*** else if(c && isNameChar(c))***REMOVED***
                ident += reader.read();
                c = reader.peek();
        ***REMOVED*** else ***REMOVED***
                break;
        ***REMOVED***
    ***REMOVED***

        return ident;
***REMOVED***

    readEscape: function(first)***REMOVED***
        var reader  = this._reader,
            cssEscape = first || "",
            i       = 0,
            c       = reader.peek();

        if (isHexDigit(c))***REMOVED***
            do ***REMOVED***
                cssEscape += reader.read();
                c = reader.peek();
        ***REMOVED*** while(c && isHexDigit(c) && ++i < 6);
    ***REMOVED***

        if (cssEscape.length == 3 && /\s/.test(c) ||
            cssEscape.length == 7 || cssEscape.length == 1)***REMOVED***
                reader.read();
    ***REMOVED*** else ***REMOVED***
            c = "";
    ***REMOVED***

        return cssEscape + c;
***REMOVED***

    readComment: function(first)***REMOVED***
        var reader  = this._reader,
            comment = first || "",
            c       = reader.read();

        if (c == "*")***REMOVED***
            while(c)***REMOVED***
                comment += c;
                if (comment.length > 2 && c == "*" && reader.peek() == "/")***REMOVED***
                    comment += reader.read();
                    break;
            ***REMOVED***

                c = reader.read();
        ***REMOVED***

            return comment;
    ***REMOVED*** else ***REMOVED***
            return "";
    ***REMOVED***

***REMOVED***
***REMOVED***);


var Tokens  = [
    ***REMOVED*** name: "CDO"***REMOVED***,
    ***REMOVED*** name: "CDC"***REMOVED***,
    ***REMOVED*** name: "S", whitespace: true/*, channel: "ws"*/***REMOVED***,
    ***REMOVED*** name: "COMMENT", comment: true, hide: true, channel: "comment" ***REMOVED***,
    ***REMOVED*** name: "INCLUDES", text: "~="***REMOVED***,
    ***REMOVED*** name: "DASHMATCH", text: "|="***REMOVED***,
    ***REMOVED*** name: "PREFIXMATCH", text: "^="***REMOVED***,
    ***REMOVED*** name: "SUFFIXMATCH", text: "$="***REMOVED***,
    ***REMOVED*** name: "SUBSTRINGMATCH", text: "*="***REMOVED***,
    ***REMOVED*** name: "STRING"***REMOVED***,
    ***REMOVED*** name: "IDENT"***REMOVED***,
    ***REMOVED*** name: "HASH"***REMOVED***,
    ***REMOVED*** name: "IMPORT_SYM", text: "@import"***REMOVED***,
    ***REMOVED*** name: "PAGE_SYM", text: "@page"***REMOVED***,
    ***REMOVED*** name: "MEDIA_SYM", text: "@media"***REMOVED***,
    ***REMOVED*** name: "FONT_FACE_SYM", text: "@font-face"***REMOVED***,
    ***REMOVED*** name: "CHARSET_SYM", text: "@charset"***REMOVED***,
    ***REMOVED*** name: "NAMESPACE_SYM", text: "@namespace"***REMOVED***,
    ***REMOVED*** name: "VIEWPORT_SYM", text: ["@viewport", "@-ms-viewport"]***REMOVED***,
    ***REMOVED*** name: "UNKNOWN_SYM" ***REMOVED***,
    ***REMOVED*** name: "KEYFRAMES_SYM", text: [ "@keyframes", "@-webkit-keyframes", "@-moz-keyframes", "@-o-keyframes" ] ***REMOVED***,
    ***REMOVED*** name: "IMPORTANT_SYM"***REMOVED***,
    ***REMOVED*** name: "LENGTH"***REMOVED***,
    ***REMOVED*** name: "ANGLE"***REMOVED***,
    ***REMOVED*** name: "TIME"***REMOVED***,
    ***REMOVED*** name: "FREQ"***REMOVED***,
    ***REMOVED*** name: "DIMENSION"***REMOVED***,
    ***REMOVED*** name: "PERCENTAGE"***REMOVED***,
    ***REMOVED*** name: "NUMBER"***REMOVED***,
    ***REMOVED*** name: "URI"***REMOVED***,
    ***REMOVED*** name: "FUNCTION"***REMOVED***,
    ***REMOVED*** name: "UNICODE_RANGE"***REMOVED***,
    ***REMOVED*** name: "INVALID"***REMOVED***,
    ***REMOVED*** name: "PLUS", text: "+" ***REMOVED***,
    ***REMOVED*** name: "GREATER", text: ">"***REMOVED***,
    ***REMOVED*** name: "COMMA", text: ","***REMOVED***,
    ***REMOVED*** name: "TILDE", text: "~"***REMOVED***,
    ***REMOVED*** name: "NOT"***REMOVED***,
    ***REMOVED*** name: "TOPLEFTCORNER_SYM", text: "@top-left-corner"***REMOVED***,
    ***REMOVED*** name: "TOPLEFT_SYM", text: "@top-left"***REMOVED***,
    ***REMOVED*** name: "TOPCENTER_SYM", text: "@top-center"***REMOVED***,
    ***REMOVED*** name: "TOPRIGHT_SYM", text: "@top-right"***REMOVED***,
    ***REMOVED*** name: "TOPRIGHTCORNER_SYM", text: "@top-right-corner"***REMOVED***,
    ***REMOVED*** name: "BOTTOMLEFTCORNER_SYM", text: "@bottom-left-corner"***REMOVED***,
    ***REMOVED*** name: "BOTTOMLEFT_SYM", text: "@bottom-left"***REMOVED***,
    ***REMOVED*** name: "BOTTOMCENTER_SYM", text: "@bottom-center"***REMOVED***,
    ***REMOVED*** name: "BOTTOMRIGHT_SYM", text: "@bottom-right"***REMOVED***,
    ***REMOVED*** name: "BOTTOMRIGHTCORNER_SYM", text: "@bottom-right-corner"***REMOVED***,
    ***REMOVED*** name: "LEFTTOP_SYM", text: "@left-top"***REMOVED***,
    ***REMOVED*** name: "LEFTMIDDLE_SYM", text: "@left-middle"***REMOVED***,
    ***REMOVED*** name: "LEFTBOTTOM_SYM", text: "@left-bottom"***REMOVED***,
    ***REMOVED*** name: "RIGHTTOP_SYM", text: "@right-top"***REMOVED***,
    ***REMOVED*** name: "RIGHTMIDDLE_SYM", text: "@right-middle"***REMOVED***,
    ***REMOVED*** name: "RIGHTBOTTOM_SYM", text: "@right-bottom"***REMOVED***,
    ***REMOVED*** name: "RESOLUTION", state: "media"***REMOVED***,
    ***REMOVED*** name: "IE_FUNCTION" ***REMOVED***,
    ***REMOVED*** name: "CHAR" ***REMOVED***,
    ***REMOVED***
        name: "PIPE",
        text: "|"
***REMOVED***
    ***REMOVED***
        name: "SLASH",
        text: "/"
***REMOVED***
    ***REMOVED***
        name: "MINUS",
        text: "-"
***REMOVED***
    ***REMOVED***
        name: "STAR",
        text: "*"
***REMOVED***

    ***REMOVED***
        name: "LBRACE",
        text: "***REMOVED***"
***REMOVED***
    ***REMOVED***
        name: "RBRACE",
        text: "***REMOVED***"
***REMOVED***
    ***REMOVED***
        name: "LBRACKET",
        text: "["
***REMOVED***
    ***REMOVED***
        name: "RBRACKET",
        text: "]"
***REMOVED***
    ***REMOVED***
        name: "EQUALS",
        text: "="
***REMOVED***
    ***REMOVED***
        name: "COLON",
        text: ":"
***REMOVED***
    ***REMOVED***
        name: "SEMICOLON",
        text: ";"
***REMOVED***

    ***REMOVED***
        name: "LPAREN",
        text: "("
***REMOVED***
    ***REMOVED***
        name: "RPAREN",
        text: ")"
***REMOVED***
    ***REMOVED***
        name: "DOT",
        text: "."
***REMOVED***
];

(function()***REMOVED***

    var nameMap = [],
        typeMap = ***REMOVED******REMOVED***;

    Tokens.UNKNOWN = -1;
    Tokens.unshift(***REMOVED***name:"EOF"***REMOVED***);
    for (var i=0, len = Tokens.length; i < len; i++)***REMOVED***
        nameMap.push(Tokens[i].name);
        Tokens[Tokens[i].name] = i;
        if (Tokens[i].text)***REMOVED***
            if (Tokens[i].text instanceof Array)***REMOVED***
                for (var j=0; j < Tokens[i].text.length; j++)***REMOVED***
                    typeMap[Tokens[i].text[j]] = i;
            ***REMOVED***
        ***REMOVED*** else ***REMOVED***
                typeMap[Tokens[i].text] = i;
        ***REMOVED***
    ***REMOVED***
***REMOVED***

    Tokens.name = function(tt)***REMOVED***
        return nameMap[tt];
***REMOVED***;

    Tokens.type = function(c)***REMOVED***
        return typeMap[c] || -1;
***REMOVED***;

***REMOVED***)();
var Validation = ***REMOVED***

    validate: function(property, value)***REMOVED***
        var name        = property.toString().toLowerCase(),
            parts       = value.parts,
            expression  = new PropertyValueIterator(value),
            spec        = Properties[name],
            part,
            valid,
            j, count,
            msg,
            types,
            last,
            literals,
            max, multi, group;

        if (!spec) ***REMOVED***
            if (name.indexOf("-") !== 0)***REMOVED***    //vendor prefixed are ok
                throw new ValidationError("Unknown property '" + property + "'.", property.line, property.col);
        ***REMOVED***
    ***REMOVED*** else if (typeof spec != "number")***REMOVED***
            if (typeof spec == "string")***REMOVED***
                if (spec.indexOf("||") > -1) ***REMOVED***
                    this.groupProperty(spec, expression);
            ***REMOVED*** else ***REMOVED***
                    this.singleProperty(spec, expression, 1);
            ***REMOVED***

        ***REMOVED*** else if (spec.multi) ***REMOVED***
                this.multiProperty(spec.multi, expression, spec.comma, spec.max || Infinity);
        ***REMOVED*** else if (typeof spec == "function") ***REMOVED***
                spec(expression);
        ***REMOVED***

    ***REMOVED***

***REMOVED***

    singleProperty: function(types, expression, max, partial) ***REMOVED***

        var result      = false,
            value       = expression.value,
            count       = 0,
            part;

        while (expression.hasNext() && count < max) ***REMOVED***
            result = ValidationTypes.isAny(expression, types);
            if (!result) ***REMOVED***
                break;
        ***REMOVED***
            count++;
    ***REMOVED***

        if (!result) ***REMOVED***
            if (expression.hasNext() && !expression.isFirst()) ***REMOVED***
                part = expression.peek();
                throw new ValidationError("Expected end of value but found '" + part + "'.", part.line, part.col);
        ***REMOVED*** else ***REMOVED***
                 throw new ValidationError("Expected (" + types + ") but found '" + value + "'.", value.line, value.col);
        ***REMOVED***
    ***REMOVED*** else if (expression.hasNext()) ***REMOVED***
            part = expression.next();
            throw new ValidationError("Expected end of value but found '" + part + "'.", part.line, part.col);
    ***REMOVED***

***REMOVED***

    multiProperty: function (types, expression, comma, max) ***REMOVED***

        var result      = false,
            value       = expression.value,
            count       = 0,
            sep         = false,
            part;

        while(expression.hasNext() && !result && count < max) ***REMOVED***
            if (ValidationTypes.isAny(expression, types)) ***REMOVED***
                count++;
                if (!expression.hasNext()) ***REMOVED***
                    result = true;

            ***REMOVED*** else if (comma) ***REMOVED***
                    if (expression.peek() == ",") ***REMOVED***
                        part = expression.next();
                ***REMOVED*** else ***REMOVED***
                        break;
                ***REMOVED***
            ***REMOVED***
        ***REMOVED*** else ***REMOVED***
                break;

        ***REMOVED***
    ***REMOVED***

        if (!result) ***REMOVED***
            if (expression.hasNext() && !expression.isFirst()) ***REMOVED***
                part = expression.peek();
                throw new ValidationError("Expected end of value but found '" + part + "'.", part.line, part.col);
        ***REMOVED*** else ***REMOVED***
                part = expression.previous();
                if (comma && part == ",") ***REMOVED***
                    throw new ValidationError("Expected end of value but found '" + part + "'.", part.line, part.col);
            ***REMOVED*** else ***REMOVED***
                    throw new ValidationError("Expected (" + types + ") but found '" + value + "'.", value.line, value.col);
            ***REMOVED***
        ***REMOVED***

    ***REMOVED*** else if (expression.hasNext()) ***REMOVED***
            part = expression.next();
            throw new ValidationError("Expected end of value but found '" + part + "'.", part.line, part.col);
    ***REMOVED***

***REMOVED***

    groupProperty: function (types, expression, comma) ***REMOVED***

        var result      = false,
            value       = expression.value,
            typeCount   = types.split("||").length,
            groups      = ***REMOVED*** count: 0 ***REMOVED***,
            partial     = false,
            name,
            part;

        while(expression.hasNext() && !result) ***REMOVED***
            name = ValidationTypes.isAnyOfGroup(expression, types);
            if (name) ***REMOVED***
                if (groups[name]) ***REMOVED***
                    break;
            ***REMOVED*** else ***REMOVED***
                    groups[name] = 1;
                    groups.count++;
                    partial = true;

                    if (groups.count == typeCount || !expression.hasNext()) ***REMOVED***
                        result = true;
                ***REMOVED***
            ***REMOVED***
        ***REMOVED*** else ***REMOVED***
                break;
        ***REMOVED***
    ***REMOVED***

        if (!result) ***REMOVED***
            if (partial && expression.hasNext()) ***REMOVED***
                    part = expression.peek();
                    throw new ValidationError("Expected end of value but found '" + part + "'.", part.line, part.col);
        ***REMOVED*** else ***REMOVED***
                throw new ValidationError("Expected (" + types + ") but found '" + value + "'.", value.line, value.col);
        ***REMOVED***
    ***REMOVED*** else if (expression.hasNext()) ***REMOVED***
            part = expression.next();
            throw new ValidationError("Expected end of value but found '" + part + "'.", part.line, part.col);
    ***REMOVED***
***REMOVED***



***REMOVED***;
function ValidationError(message, line, col)***REMOVED***
    this.col = col;
    this.line = line;
    this.message = message;

***REMOVED***
ValidationError.prototype = new Error();
var ValidationTypes = ***REMOVED***

    isLiteral: function (part, literals) ***REMOVED***
        var text = part.text.toString().toLowerCase(),
            args = literals.split(" | "),
            i, len, found = false;

        for (i=0,len=args.length; i < len && !found; i++)***REMOVED***
            if (text == args[i].toLowerCase())***REMOVED***
                found = true;
        ***REMOVED***
    ***REMOVED***

        return found;
***REMOVED***

    isSimple: function(type) ***REMOVED***
        return !!this.simple[type];
***REMOVED***

    isComplex: function(type) ***REMOVED***
        return !!this.complex[type];
***REMOVED***
    isAny: function (expression, types) ***REMOVED***
        var args = types.split(" | "),
            i, len, found = false;

        for (i=0,len=args.length; i < len && !found && expression.hasNext(); i++)***REMOVED***
            found = this.isType(expression, args[i]);
    ***REMOVED***

        return found;
***REMOVED***
    isAnyOfGroup: function(expression, types) ***REMOVED***
        var args = types.split(" || "),
            i, len, found = false;

        for (i=0,len=args.length; i < len && !found; i++)***REMOVED***
            found = this.isType(expression, args[i]);
    ***REMOVED***

        return found ? args[i-1] : false;
***REMOVED***
    isType: function (expression, type) ***REMOVED***
        var part = expression.peek(),
            result = false;

        if (type.charAt(0) != "<") ***REMOVED***
            result = this.isLiteral(part, type);
            if (result) ***REMOVED***
                expression.next();
        ***REMOVED***
    ***REMOVED*** else if (this.simple[type]) ***REMOVED***
            result = this.simple[type](part);
            if (result) ***REMOVED***
                expression.next();
        ***REMOVED***
    ***REMOVED*** else ***REMOVED***
            result = this.complex[type](expression);
    ***REMOVED***

        return result;
***REMOVED***



    simple: ***REMOVED***

        "<absolute-size>": function(part)***REMOVED***
            return ValidationTypes.isLiteral(part, "xx-small | x-small | small | medium | large | x-large | xx-large");
    ***REMOVED***

        "<attachment>": function(part)***REMOVED***
            return ValidationTypes.isLiteral(part, "scroll | fixed | local");
    ***REMOVED***

        "<attr>": function(part)***REMOVED***
            return part.type == "function" && part.name == "attr";
    ***REMOVED***

        "<bg-image>": function(part)***REMOVED***
            return this["<image>"](part) || this["<gradient>"](part) ||  part == "none";
    ***REMOVED***

        "<gradient>": function(part) ***REMOVED***
            return part.type == "function" && /^(?:\-(?:ms|moz|o|webkit)\-)?(?:repeating\-)?(?:radial\-|linear\-)?gradient/i.test(part);
    ***REMOVED***

        "<box>": function(part)***REMOVED***
            return ValidationTypes.isLiteral(part, "padding-box | border-box | content-box");
    ***REMOVED***

        "<content>": function(part)***REMOVED***
            return part.type == "function" && part.name == "content";
    ***REMOVED***

        "<relative-size>": function(part)***REMOVED***
            return ValidationTypes.isLiteral(part, "smaller | larger");
    ***REMOVED***
        "<ident>": function(part)***REMOVED***
            return part.type == "identifier";
    ***REMOVED***

        "<length>": function(part)***REMOVED***
            if (part.type == "function" && /^(?:\-(?:ms|moz|o|webkit)\-)?calc/i.test(part))***REMOVED***
                return true;
        ***REMOVED***else***REMOVED***
                return part.type == "length" || part.type == "number" || part.type == "integer" || part == "0";
        ***REMOVED***
    ***REMOVED***

        "<color>": function(part)***REMOVED***
            return part.type == "color" || part == "transparent";
    ***REMOVED***

        "<number>": function(part)***REMOVED***
            return part.type == "number" || this["<integer>"](part);
    ***REMOVED***

        "<integer>": function(part)***REMOVED***
            return part.type == "integer";
    ***REMOVED***

        "<line>": function(part)***REMOVED***
            return part.type == "integer";
    ***REMOVED***

        "<angle>": function(part)***REMOVED***
            return part.type == "angle";
    ***REMOVED***

        "<uri>": function(part)***REMOVED***
            return part.type == "uri";
    ***REMOVED***

        "<image>": function(part)***REMOVED***
            return this["<uri>"](part);
    ***REMOVED***

        "<percentage>": function(part)***REMOVED***
            return part.type == "percentage" || part == "0";
    ***REMOVED***

        "<border-width>": function(part)***REMOVED***
            return this["<length>"](part) || ValidationTypes.isLiteral(part, "thin | medium | thick");
    ***REMOVED***

        "<border-style>": function(part)***REMOVED***
            return ValidationTypes.isLiteral(part, "none | hidden | dotted | dashed | solid | double | groove | ridge | inset | outset");
    ***REMOVED***

        "<margin-width>": function(part)***REMOVED***
            return this["<length>"](part) || this["<percentage>"](part) || ValidationTypes.isLiteral(part, "auto");
    ***REMOVED***

        "<padding-width>": function(part)***REMOVED***
            return this["<length>"](part) || this["<percentage>"](part);
    ***REMOVED***

        "<shape>": function(part)***REMOVED***
            return part.type == "function" && (part.name == "rect" || part.name == "inset-rect");
    ***REMOVED***

        "<time>": function(part) ***REMOVED***
            return part.type == "time";
    ***REMOVED***
***REMOVED***

    complex: ***REMOVED***

        "<bg-position>": function(expression)***REMOVED***
            var types   = this,
                result  = false,
                numeric = "<percentage> | <length>",
                xDir    = "left | right",
                yDir    = "top | bottom",
                count = 0,
                hasNext = function() ***REMOVED***
                    return expression.hasNext() && expression.peek() != ",";
            ***REMOVED***;

            while (expression.peek(count) && expression.peek(count) != ",") ***REMOVED***
                count++;
        ***REMOVED***

            if (count < 3) ***REMOVED***
                if (ValidationTypes.isAny(expression, xDir + " | center | " + numeric)) ***REMOVED***
                        result = true;
                        ValidationTypes.isAny(expression, yDir + " | center | " + numeric);
            ***REMOVED*** else if (ValidationTypes.isAny(expression, yDir)) ***REMOVED***
                        result = true;
                        ValidationTypes.isAny(expression, xDir + " | center");
            ***REMOVED***
        ***REMOVED*** else ***REMOVED***
                if (ValidationTypes.isAny(expression, xDir)) ***REMOVED***
                    if (ValidationTypes.isAny(expression, yDir)) ***REMOVED***
                        result = true;
                        ValidationTypes.isAny(expression, numeric);
                ***REMOVED*** else if (ValidationTypes.isAny(expression, numeric)) ***REMOVED***
                        if (ValidationTypes.isAny(expression, yDir)) ***REMOVED***
                            result = true;
                            ValidationTypes.isAny(expression, numeric);
                    ***REMOVED*** else if (ValidationTypes.isAny(expression, "center")) ***REMOVED***
                            result = true;
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED*** else if (ValidationTypes.isAny(expression, yDir)) ***REMOVED***
                    if (ValidationTypes.isAny(expression, xDir)) ***REMOVED***
                        result = true;
                        ValidationTypes.isAny(expression, numeric);
                ***REMOVED*** else if (ValidationTypes.isAny(expression, numeric)) ***REMOVED***
                        if (ValidationTypes.isAny(expression, xDir)) ***REMOVED***
                                result = true;
                                ValidationTypes.isAny(expression, numeric);
                    ***REMOVED*** else if (ValidationTypes.isAny(expression, "center")) ***REMOVED***
                            result = true;
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED*** else if (ValidationTypes.isAny(expression, "center")) ***REMOVED***
                    if (ValidationTypes.isAny(expression, xDir + " | " + yDir)) ***REMOVED***
                        result = true;
                        ValidationTypes.isAny(expression, numeric);
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

            return result;
    ***REMOVED***

        "<bg-size>": function(expression)***REMOVED***
            var types   = this,
                result  = false,
                numeric = "<percentage> | <length> | auto",
                part,
                i, len;

            if (ValidationTypes.isAny(expression, "cover | contain")) ***REMOVED***
                result = true;
        ***REMOVED*** else if (ValidationTypes.isAny(expression, numeric)) ***REMOVED***
                result = true;
                ValidationTypes.isAny(expression, numeric);
        ***REMOVED***

            return result;
    ***REMOVED***

        "<repeat-style>": function(expression)***REMOVED***
            var result  = false,
                values  = "repeat | space | round | no-repeat",
                part;

            if (expression.hasNext())***REMOVED***
                part = expression.next();

                if (ValidationTypes.isLiteral(part, "repeat-x | repeat-y")) ***REMOVED***
                    result = true;
            ***REMOVED*** else if (ValidationTypes.isLiteral(part, values)) ***REMOVED***
                    result = true;

                    if (expression.hasNext() && ValidationTypes.isLiteral(expression.peek(), values)) ***REMOVED***
                        expression.next();
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

            return result;

    ***REMOVED***

        "<shadow>": function(expression) ***REMOVED***
            var result  = false,
                count   = 0,
                inset   = false,
                color   = false,
                part;

            if (expression.hasNext()) ***REMOVED***

                if (ValidationTypes.isAny(expression, "inset"))***REMOVED***
                    inset = true;
            ***REMOVED***

                if (ValidationTypes.isAny(expression, "<color>")) ***REMOVED***
                    color = true;
            ***REMOVED***

                while (ValidationTypes.isAny(expression, "<length>") && count < 4) ***REMOVED***
                    count++;
            ***REMOVED***


                if (expression.hasNext()) ***REMOVED***
                    if (!color) ***REMOVED***
                        ValidationTypes.isAny(expression, "<color>");
                ***REMOVED***

                    if (!inset) ***REMOVED***
                        ValidationTypes.isAny(expression, "inset");
                ***REMOVED***

            ***REMOVED***

                result = (count >= 2 && count <= 4);

        ***REMOVED***

            return result;
    ***REMOVED***

        "<x-one-radius>": function(expression) ***REMOVED***
            var result  = false,
                simple = "<length> | <percentage> | inherit";

            if (ValidationTypes.isAny(expression, simple))***REMOVED***
                result = true;
                ValidationTypes.isAny(expression, simple);
        ***REMOVED***

            return result;
    ***REMOVED***
***REMOVED***
***REMOVED***;



parserlib.css = ***REMOVED***
Colors              :Colors,
Combinator          :Combinator,
Parser              :Parser,
PropertyName        :PropertyName,
PropertyValue       :PropertyValue,
PropertyValuePart   :PropertyValuePart,
MediaFeature        :MediaFeature,
MediaQuery          :MediaQuery,
Selector            :Selector,
SelectorPart        :SelectorPart,
SelectorSubPart     :SelectorSubPart,
Specificity         :Specificity,
TokenStream         :TokenStream,
Tokens              :Tokens,
ValidationError     :ValidationError
***REMOVED***;
***REMOVED***)();




(function()***REMOVED***
for(var prop in parserlib)***REMOVED***
exports[prop] = parserlib[prop];
***REMOVED***
***REMOVED***)();
var CSSLint = (function()***REMOVED***

    var rules           = [],
        formatters      = [],
        embeddedRuleset = /\/\*csslint([^\*]*)\*\//,
        api             = new parserlib.util.EventTarget();

    api.version = "@VERSION@";
    api.addRule = function(rule)***REMOVED***
        rules.push(rule);
        rules[rule.id] = rule;
***REMOVED***;
    api.clearRules = function()***REMOVED***
        rules = [];
***REMOVED***;
    api.getRules = function()***REMOVED***
        return [].concat(rules).sort(function(a,b)***REMOVED***
            return a.id > b.id ? 1 : 0;
    ***REMOVED***);
***REMOVED***;
    api.getRuleset = function() ***REMOVED***
        var ruleset = ***REMOVED******REMOVED***,
            i = 0,
            len = rules.length;

        while (i < len)***REMOVED***
            ruleset[rules[i++].id] = 1;    //by default, everything is a warning
    ***REMOVED***

        return ruleset;
***REMOVED***;
    function applyEmbeddedRuleset(text, ruleset)***REMOVED***
        var valueMap,
            embedded = text && text.match(embeddedRuleset),
            rules = embedded && embedded[1];

        if (rules) ***REMOVED***
            valueMap = ***REMOVED***
                "true": 2,  // true is error
                "": 1,      // blank is warning
                "false": 0, // false is ignore

                "2": 2,     // explicit error
                "1": 1,     // explicit warning
                "0": 0      // explicit ignore
        ***REMOVED***;

            rules.toLowerCase().split(",").forEach(function(rule)***REMOVED***
                var pair = rule.split(":"),
                    property = pair[0] || "",
                    value = pair[1] || "";

                ruleset[property.trim()] = valueMap[value.trim()];
        ***REMOVED***);
    ***REMOVED***

        return ruleset;
***REMOVED***
    api.addFormatter = function(formatter) ***REMOVED***
        formatters[formatter.id] = formatter;
***REMOVED***;
    api.getFormatter = function(formatId)***REMOVED***
        return formatters[formatId];
***REMOVED***;
    api.format = function(results, filename, formatId, options) ***REMOVED***
        var formatter = this.getFormatter(formatId),
            result = null;

        if (formatter)***REMOVED***
            result = formatter.startFormat();
            result += formatter.formatResults(results, filename, options || ***REMOVED******REMOVED***);
            result += formatter.endFormat();
    ***REMOVED***

        return result;
***REMOVED***;
    api.hasFormat = function(formatId)***REMOVED***
        return formatters.hasOwnProperty(formatId);
***REMOVED***;
    api.verify = function(text, ruleset)***REMOVED***

        var i       = 0,
            len     = rules.length,
            reporter,
            lines,
            report,
            parser = new parserlib.css.Parser(***REMOVED*** starHack: true, ieFilters: true,
                                                underscoreHack: true, strict: false ***REMOVED***);
        lines = text.replace(/\n\r?/g, "$split$").split('$split$');

        if (!ruleset)***REMOVED***
            ruleset = this.getRuleset();
    ***REMOVED***

        if (embeddedRuleset.test(text))***REMOVED***
            ruleset = applyEmbeddedRuleset(text, ruleset);
    ***REMOVED***

        reporter = new Reporter(lines, ruleset);

        ruleset.errors = 2;       //always report parsing errors as errors
        for (i in ruleset)***REMOVED***
            if(ruleset.hasOwnProperty(i) && ruleset[i])***REMOVED***
                if (rules[i])***REMOVED***
                    rules[i].init(parser, reporter);
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***
        try ***REMOVED***
            parser.parse(text);
    ***REMOVED*** catch (ex) ***REMOVED***
            reporter.error("Fatal error, cannot continue: " + ex.message, ex.line, ex.col, ***REMOVED******REMOVED***);
    ***REMOVED***

        report = ***REMOVED***
            messages    : reporter.messages,
            stats       : reporter.stats,
            ruleset     : reporter.ruleset
    ***REMOVED***;
        report.messages.sort(function (a, b)***REMOVED***
            if (a.rollup && !b.rollup)***REMOVED***
                return 1;
        ***REMOVED*** else if (!a.rollup && b.rollup)***REMOVED***
                return -1;
        ***REMOVED*** else ***REMOVED***
                return a.line - b.line;
        ***REMOVED***
    ***REMOVED***);

        return report;
***REMOVED***;

    return api;

***REMOVED***)();
function Reporter(lines, ruleset)***REMOVED***
    this.messages = [];
    this.stats = [];
    this.lines = lines;
    this.ruleset = ruleset;
***REMOVED***

Reporter.prototype = ***REMOVED***
    constructor: Reporter,
    error: function(message, line, col, rule)***REMOVED***
        this.messages.push(***REMOVED***
            type    : "error",
            line    : line,
            col     : col,
            message : message,
            evidence: this.lines[line-1],
            rule    : rule || ***REMOVED******REMOVED***
    ***REMOVED***);
***REMOVED***
    warn: function(message, line, col, rule)***REMOVED***
        this.report(message, line, col, rule);
***REMOVED***
    report: function(message, line, col, rule)***REMOVED***
        this.messages.push(***REMOVED***
            type    : this.ruleset[rule.id] == 2 ? "error" : "warning",
            line    : line,
            col     : col,
            message : message,
            evidence: this.lines[line-1],
            rule    : rule
    ***REMOVED***);
***REMOVED***
    info: function(message, line, col, rule)***REMOVED***
        this.messages.push(***REMOVED***
            type    : "info",
            line    : line,
            col     : col,
            message : message,
            evidence: this.lines[line-1],
            rule    : rule
    ***REMOVED***);
***REMOVED***
    rollupError: function(message, rule)***REMOVED***
        this.messages.push(***REMOVED***
            type    : "error",
            rollup  : true,
            message : message,
            rule    : rule
    ***REMOVED***);
***REMOVED***
    rollupWarn: function(message, rule)***REMOVED***
        this.messages.push(***REMOVED***
            type    : "warning",
            rollup  : true,
            message : message,
            rule    : rule
    ***REMOVED***);
***REMOVED***
    stat: function(name, value)***REMOVED***
        this.stats[name] = value;
***REMOVED***
***REMOVED***;
CSSLint._Reporter = Reporter;
CSSLint.Util = ***REMOVED***
    mix: function(receiver, supplier)***REMOVED***
        var prop;

        for (prop in supplier)***REMOVED***
            if (supplier.hasOwnProperty(prop))***REMOVED***
                receiver[prop] = supplier[prop];
        ***REMOVED***
    ***REMOVED***

        return prop;
***REMOVED***
    indexOf: function(values, value)***REMOVED***
        if (values.indexOf)***REMOVED***
            return values.indexOf(value);
    ***REMOVED*** else ***REMOVED***
            for (var i=0, len=values.length; i < len; i++)***REMOVED***
                if (values[i] === value)***REMOVED***
                    return i;
            ***REMOVED***
        ***REMOVED***
            return -1;
    ***REMOVED***
***REMOVED***
    forEach: function(values, func) ***REMOVED***
        if (values.forEach)***REMOVED***
            return values.forEach(func);
    ***REMOVED*** else ***REMOVED***
            for (var i=0, len=values.length; i < len; i++)***REMOVED***
                func(values[i], i, values);
        ***REMOVED***
    ***REMOVED***
***REMOVED***
***REMOVED***;
CSSLint.addRule(***REMOVED***
    id: "adjoining-classes",
    name: "Disallow adjoining classes",
    desc: "Don't use adjoining classes.",
    browsers: "IE6",
    init: function(parser, reporter)***REMOVED***
        var rule = this;
        parser.addListener("startrule", function(event)***REMOVED***
            var selectors = event.selectors,
                selector,
                part,
                modifier,
                classCount,
                i, j, k;

            for (i=0; i < selectors.length; i++)***REMOVED***
                selector = selectors[i];
                for (j=0; j < selector.parts.length; j++)***REMOVED***
                    part = selector.parts[j];
                    if (part.type == parser.SELECTOR_PART_TYPE)***REMOVED***
                        classCount = 0;
                        for (k=0; k < part.modifiers.length; k++)***REMOVED***
                            modifier = part.modifiers[k];
                            if (modifier.type == "class")***REMOVED***
                                classCount++;
                        ***REMOVED***
                            if (classCount > 1)***REMOVED***
                                reporter.report("Don't use adjoining classes.", part.line, part.col, rule);
                        ***REMOVED***
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***);
***REMOVED***

***REMOVED***);
CSSLint.addRule(***REMOVED***
    id: "box-model",
    name: "Beware of broken box size",
    desc: "Don't use width or height when using padding or border.",
    browsers: "All",
    init: function(parser, reporter)***REMOVED***
        var rule = this,
            widthProperties = ***REMOVED***
                border: 1,
                "border-left": 1,
                "border-right": 1,
                padding: 1,
                "padding-left": 1,
                "padding-right": 1
        ***REMOVED***
            heightProperties = ***REMOVED***
                border: 1,
                "border-bottom": 1,
                "border-top": 1,
                padding: 1,
                "padding-bottom": 1,
                "padding-top": 1
        ***REMOVED***
            properties,
            boxSizing = false;

        function startRule()***REMOVED***
            properties = ***REMOVED******REMOVED***;
            boxSizing = false;
    ***REMOVED***

        function endRule()***REMOVED***
            var prop, value;
            
            if (!boxSizing) ***REMOVED***
                if (properties.height)***REMOVED***
                    for (prop in heightProperties)***REMOVED***
                        if (heightProperties.hasOwnProperty(prop) && properties[prop])***REMOVED***
                            value = properties[prop].value;
                            if (!(prop == "padding" && value.parts.length === 2 && value.parts[0].value === 0))***REMOVED***
                                reporter.report("Using height with " + prop + " can sometimes make elements larger than you expect.", properties[prop].line, properties[prop].col, rule);
                        ***REMOVED***
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***

                if (properties.width)***REMOVED***
                    for (prop in widthProperties)***REMOVED***
                        if (widthProperties.hasOwnProperty(prop) && properties[prop])***REMOVED***
                            value = properties[prop].value;
                            
                            if (!(prop == "padding" && value.parts.length === 2 && value.parts[1].value === 0))***REMOVED***
                                reporter.report("Using width with " + prop + " can sometimes make elements larger than you expect.", properties[prop].line, properties[prop].col, rule);
                        ***REMOVED***
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***   
        ***REMOVED***     
    ***REMOVED***

        parser.addListener("startrule", startRule);
        parser.addListener("startfontface", startRule);
        parser.addListener("startpage", startRule);
        parser.addListener("startpagemargin", startRule);
        parser.addListener("startkeyframerule", startRule); 

        parser.addListener("property", function(event)***REMOVED***
            var name = event.property.text.toLowerCase();
            
            if (heightProperties[name] || widthProperties[name])***REMOVED***
                if (!/^0\S*$/.test(event.value) && !(name == "border" && event.value == "none"))***REMOVED***
                    properties[name] = ***REMOVED*** line: event.property.line, col: event.property.col, value: event.value ***REMOVED***;
            ***REMOVED***
        ***REMOVED*** else ***REMOVED***
                if (/^(width|height)/i.test(name) && /^(length|percentage)/.test(event.value.parts[0].type))***REMOVED***
                    properties[name] = 1;
            ***REMOVED*** else if (name == "box-sizing") ***REMOVED***
                    boxSizing = true;
            ***REMOVED***
        ***REMOVED***
            
    ***REMOVED***);

        parser.addListener("endrule", endRule);
        parser.addListener("endfontface", endRule);
        parser.addListener("endpage", endRule);
        parser.addListener("endpagemargin", endRule);
        parser.addListener("endkeyframerule", endRule);         
***REMOVED***

***REMOVED***);
CSSLint.addRule(***REMOVED***
    id: "box-sizing",
    name: "Disallow use of box-sizing",
    desc: "The box-sizing properties isn't supported in IE6 and IE7.",
    browsers: "IE6, IE7",
    tags: ["Compatibility"],
    init: function(parser, reporter)***REMOVED***
        var rule = this;

        parser.addListener("property", function(event)***REMOVED***
            var name = event.property.text.toLowerCase();
   
            if (name == "box-sizing")***REMOVED***
                reporter.report("The box-sizing property isn't supported in IE6 and IE7.", event.line, event.col, rule);
        ***REMOVED***
    ***REMOVED***);       
***REMOVED***

***REMOVED***);
CSSLint.addRule(***REMOVED***
    id: "bulletproof-font-face",
    name: "Use the bulletproof @font-face syntax",
    desc: "Use the bulletproof @font-face syntax to avoid 404's in old IE (http://www.fontspring.com/blog/the-new-bulletproof-font-face-syntax).",
    browsers: "All",
    init: function(parser, reporter)***REMOVED***
        var rule = this,
            count = 0,
            fontFaceRule = false,
            firstSrc     = true,
            ruleFailed    = false,
            line, col;
        parser.addListener("startfontface", function(event)***REMOVED***
            fontFaceRule = true;
    ***REMOVED***);

        parser.addListener("property", function(event)***REMOVED***
            if (!fontFaceRule) ***REMOVED***
                return;
        ***REMOVED***

            var propertyName = event.property.toString().toLowerCase(),
                value        = event.value.toString();
            line = event.line;
            col  = event.col;
            if (propertyName === 'src') ***REMOVED***
                var regex = /^\s?url\(['"].+\.eot\?.*['"]\)\s*format\(['"]embedded-opentype['"]\).*$/i;
                if (!value.match(regex) && firstSrc) ***REMOVED***
                    ruleFailed = true;
                    firstSrc = false;
            ***REMOVED*** else if (value.match(regex) && !firstSrc) ***REMOVED***
                    ruleFailed = false;
            ***REMOVED***
        ***REMOVED***


    ***REMOVED***);
        parser.addListener("endfontface", function(event)***REMOVED***
            fontFaceRule = false;

            if (ruleFailed) ***REMOVED***
                reporter.report("@font-face declaration doesn't follow the fontspring bulletproof syntax.", line, col, rule);
        ***REMOVED***
    ***REMOVED***);
***REMOVED***
***REMOVED***); 
CSSLint.addRule(***REMOVED***
    id: "compatible-vendor-prefixes",
    name: "Require compatible vendor prefixes",
    desc: "Include all compatible vendor prefixes to reach a wider range of users.",
    browsers: "All",
    init: function (parser, reporter) ***REMOVED***
        var rule = this,
            compatiblePrefixes,
            properties,
            prop,
            variations,
            prefixed,
            i,
            len,
            inKeyFrame = false,
            arrayPush = Array.prototype.push,
            applyTo = [];
        compatiblePrefixes = ***REMOVED***
            "animation"                  : "webkit moz",
            "animation-delay"            : "webkit moz",
            "animation-direction"        : "webkit moz",
            "animation-duration"         : "webkit moz",
            "animation-fill-mode"        : "webkit moz",
            "animation-iteration-count"  : "webkit moz",
            "animation-name"             : "webkit moz",
            "animation-play-state"       : "webkit moz",
            "animation-timing-function"  : "webkit moz",
            "appearance"                 : "webkit moz",
            "border-end"                 : "webkit moz",
            "border-end-color"           : "webkit moz",
            "border-end-style"           : "webkit moz",
            "border-end-width"           : "webkit moz",
            "border-image"               : "webkit moz o",
            "border-radius"              : "webkit",
            "border-start"               : "webkit moz",
            "border-start-color"         : "webkit moz",
            "border-start-style"         : "webkit moz",
            "border-start-width"         : "webkit moz",
            "box-align"                  : "webkit moz ms",
            "box-direction"              : "webkit moz ms",
            "box-flex"                   : "webkit moz ms",
            "box-lines"                  : "webkit ms",
            "box-ordinal-group"          : "webkit moz ms",
            "box-orient"                 : "webkit moz ms",
            "box-pack"                   : "webkit moz ms",
            "box-sizing"                 : "webkit moz",
            "box-shadow"                 : "webkit moz",
            "column-count"               : "webkit moz ms",
            "column-gap"                 : "webkit moz ms",
            "column-rule"                : "webkit moz ms",
            "column-rule-color"          : "webkit moz ms",
            "column-rule-style"          : "webkit moz ms",
            "column-rule-width"          : "webkit moz ms",
            "column-width"               : "webkit moz ms",
            "hyphens"                    : "epub moz",
            "line-break"                 : "webkit ms",
            "margin-end"                 : "webkit moz",
            "margin-start"               : "webkit moz",
            "marquee-speed"              : "webkit wap",
            "marquee-style"              : "webkit wap",
            "padding-end"                : "webkit moz",
            "padding-start"              : "webkit moz",
            "tab-size"                   : "moz o",
            "text-size-adjust"           : "webkit ms",
            "transform"                  : "webkit moz ms o",
            "transform-origin"           : "webkit moz ms o",
            "transition"                 : "webkit moz o",
            "transition-delay"           : "webkit moz o",
            "transition-duration"        : "webkit moz o",
            "transition-property"        : "webkit moz o",
            "transition-timing-function" : "webkit moz o",
            "user-modify"                : "webkit moz",
            "user-select"                : "webkit moz ms",
            "word-break"                 : "epub ms",
            "writing-mode"               : "epub ms"
    ***REMOVED***;


        for (prop in compatiblePrefixes) ***REMOVED***
            if (compatiblePrefixes.hasOwnProperty(prop)) ***REMOVED***
                variations = [];
                prefixed = compatiblePrefixes[prop].split(' ');
                for (i = 0, len = prefixed.length; i < len; i++) ***REMOVED***
                    variations.push('-' + prefixed[i] + '-' + prop);
            ***REMOVED***
                compatiblePrefixes[prop] = variations;
                arrayPush.apply(applyTo, variations);
        ***REMOVED***
    ***REMOVED***
                
        parser.addListener("startrule", function () ***REMOVED***
            properties = [];
    ***REMOVED***);

        parser.addListener("startkeyframes", function (event) ***REMOVED***
            inKeyFrame = event.prefix || true;
    ***REMOVED***);

        parser.addListener("endkeyframes", function (event) ***REMOVED***
            inKeyFrame = false;
    ***REMOVED***);

        parser.addListener("property", function (event) ***REMOVED***
            var name = event.property;
            if (CSSLint.Util.indexOf(applyTo, name.text) > -1) ***REMOVED***
                if (!inKeyFrame || typeof inKeyFrame != "string" || 
                        name.text.indexOf("-" + inKeyFrame + "-") !== 0) ***REMOVED***
                    properties.push(name);
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***);

        parser.addListener("endrule", function (event) ***REMOVED***
            if (!properties.length) ***REMOVED***
                return;
        ***REMOVED***

            var propertyGroups = ***REMOVED******REMOVED***,
                i,
                len,
                name,
                prop,
                variations,
                value,
                full,
                actual,
                item,
                propertiesSpecified;

            for (i = 0, len = properties.length; i < len; i++) ***REMOVED***
                name = properties[i];

                for (prop in compatiblePrefixes) ***REMOVED***
                    if (compatiblePrefixes.hasOwnProperty(prop)) ***REMOVED***
                        variations = compatiblePrefixes[prop];
                        if (CSSLint.Util.indexOf(variations, name.text) > -1) ***REMOVED***
                            if (!propertyGroups[prop]) ***REMOVED***
                                propertyGroups[prop] = ***REMOVED***
                                    full : variations.slice(0),
                                    actual : [],
                                    actualNodes: []
                            ***REMOVED***;
                        ***REMOVED***
                            if (CSSLint.Util.indexOf(propertyGroups[prop].actual, name.text) === -1) ***REMOVED***
                                propertyGroups[prop].actual.push(name.text);
                                propertyGroups[prop].actualNodes.push(name);
                        ***REMOVED***
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

            for (prop in propertyGroups) ***REMOVED***
                if (propertyGroups.hasOwnProperty(prop)) ***REMOVED***
                    value = propertyGroups[prop];
                    full = value.full;
                    actual = value.actual;

                    if (full.length > actual.length) ***REMOVED***
                        for (i = 0, len = full.length; i < len; i++) ***REMOVED***
                            item = full[i];
                            if (CSSLint.Util.indexOf(actual, item) === -1) ***REMOVED***
                                propertiesSpecified = (actual.length === 1) ? actual[0] : (actual.length == 2) ? actual.join(" and ") : actual.join(", ");
                                reporter.report("The property " + item + " is compatible with " + propertiesSpecified + " and should be included as well.", value.actualNodes[0].line, value.actualNodes[0].col, rule); 
                        ***REMOVED***
                    ***REMOVED***

                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***);
***REMOVED***
***REMOVED***);
CSSLint.addRule(***REMOVED***
    id: "display-property-grouping",
    name: "Require properties appropriate for display",
    desc: "Certain properties shouldn't be used with certain display property values.",
    browsers: "All",
    init: function(parser, reporter)***REMOVED***
        var rule = this;

        var propertiesToCheck = ***REMOVED***
                display: 1,
                "float": "none",
                height: 1,
                width: 1,
                margin: 1,
                "margin-left": 1,
                "margin-right": 1,
                "margin-bottom": 1,
                "margin-top": 1,
                padding: 1,
                "padding-left": 1,
                "padding-right": 1,
                "padding-bottom": 1,
                "padding-top": 1,
                "vertical-align": 1
        ***REMOVED***
            properties;

        function reportProperty(name, display, msg)***REMOVED***
            if (properties[name])***REMOVED***
                if (typeof propertiesToCheck[name] != "string" || properties[name].value.toLowerCase() != propertiesToCheck[name])***REMOVED***
                    reporter.report(msg || name + " can't be used with display: " + display + ".", properties[name].line, properties[name].col, rule);
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***
        
        function startRule()***REMOVED***
            properties = ***REMOVED******REMOVED***;
    ***REMOVED***

        function endRule()***REMOVED***

            var display = properties.display ? properties.display.value : null;
            if (display)***REMOVED***
                switch(display)***REMOVED***

                    case "inline":
                        reportProperty("height", display);
                        reportProperty("width", display);
                        reportProperty("margin", display);
                        reportProperty("margin-top", display);
                        reportProperty("margin-bottom", display);              
                        reportProperty("float", display, "display:inline has no effect on floated elements (but may be used to fix the IE6 double-margin bug).");
                        break;

                    case "block":
                        reportProperty("vertical-align", display);
                        break;

                    case "inline-block":
                        reportProperty("float", display);
                        break;

                    default:
                        if (display.indexOf("table-") === 0)***REMOVED***
                            reportProperty("margin", display);
                            reportProperty("margin-left", display);
                            reportProperty("margin-right", display);
                            reportProperty("margin-top", display);
                            reportProperty("margin-bottom", display);
                            reportProperty("float", display);
                    ***REMOVED***
            ***REMOVED***
        ***REMOVED***
          
    ***REMOVED***

        parser.addListener("startrule", startRule);
        parser.addListener("startfontface", startRule);
        parser.addListener("startkeyframerule", startRule);
        parser.addListener("startpagemargin", startRule);
        parser.addListener("startpage", startRule);

        parser.addListener("property", function(event)***REMOVED***
            var name = event.property.text.toLowerCase();

            if (propertiesToCheck[name])***REMOVED***
                properties[name] = ***REMOVED*** value: event.value.text, line: event.property.line, col: event.property.col ***REMOVED***;                    
        ***REMOVED***
    ***REMOVED***);

        parser.addListener("endrule", endRule);
        parser.addListener("endfontface", endRule);
        parser.addListener("endkeyframerule", endRule);
        parser.addListener("endpagemargin", endRule);
        parser.addListener("endpage", endRule);

***REMOVED***

***REMOVED***);
CSSLint.addRule(***REMOVED***
    id: "duplicate-background-images",
    name: "Disallow duplicate background images",
    desc: "Every background-image should be unique. Use a common class for e.g. sprites.",
    browsers: "All",
    init: function(parser, reporter)***REMOVED***
        var rule = this,
            stack = ***REMOVED******REMOVED***;

        parser.addListener("property", function(event)***REMOVED***
            var name = event.property.text,
                value = event.value,
                i, len;

            if (name.match(/background/i)) ***REMOVED***
                for (i=0, len=value.parts.length; i < len; i++) ***REMOVED***
                    if (value.parts[i].type == 'uri') ***REMOVED***
                        if (typeof stack[value.parts[i].uri] === 'undefined') ***REMOVED***
                            stack[value.parts[i].uri] = event;
                    ***REMOVED***
                        else ***REMOVED***
                            reporter.report("Background image '" + value.parts[i].uri + "' was used multiple times, first declared at line " + stack[value.parts[i].uri].line + ", col " + stack[value.parts[i].uri].col + ".", event.line, event.col, rule);
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***);
***REMOVED***
***REMOVED***);
CSSLint.addRule(***REMOVED***
    id: "duplicate-properties",
    name: "Disallow duplicate properties",
    desc: "Duplicate properties must appear one after the other.",
    browsers: "All",
    init: function(parser, reporter)***REMOVED***
        var rule = this,
            properties,
            lastProperty;            
            
        function startRule(event)***REMOVED***
            properties = ***REMOVED******REMOVED***;        
    ***REMOVED***
        
        parser.addListener("startrule", startRule);
        parser.addListener("startfontface", startRule);
        parser.addListener("startpage", startRule);
        parser.addListener("startpagemargin", startRule);
        parser.addListener("startkeyframerule", startRule);        
        
        parser.addListener("property", function(event)***REMOVED***
            var property = event.property,
                name = property.text.toLowerCase();
            
            if (properties[name] && (lastProperty != name || properties[name] == event.value.text))***REMOVED***
                reporter.report("Duplicate property '" + event.property + "' found.", event.line, event.col, rule);
        ***REMOVED***
            
            properties[name] = event.value.text;
            lastProperty = name;
                        
    ***REMOVED***);
            
        
***REMOVED***

***REMOVED***);
CSSLint.addRule(***REMOVED***
    id: "empty-rules",
    name: "Disallow empty rules",
    desc: "Rules without any properties specified should be removed.",
    browsers: "All",
    init: function(parser, reporter)***REMOVED***
        var rule = this,
            count = 0;

        parser.addListener("startrule", function()***REMOVED***
            count=0;
    ***REMOVED***);

        parser.addListener("property", function()***REMOVED***
            count++;
    ***REMOVED***);

        parser.addListener("endrule", function(event)***REMOVED***
            var selectors = event.selectors;
            if (count === 0)***REMOVED***
                reporter.report("Rule is empty.", selectors[0].line, selectors[0].col, rule);
        ***REMOVED***
    ***REMOVED***);
***REMOVED***

***REMOVED***);
CSSLint.addRule(***REMOVED***
    id: "errors",
    name: "Parsing Errors",
    desc: "This rule looks for recoverable syntax errors.",
    browsers: "All",
    init: function(parser, reporter)***REMOVED***
        var rule = this;

        parser.addListener("error", function(event)***REMOVED***
            reporter.error(event.message, event.line, event.col, rule);
    ***REMOVED***);

***REMOVED***

***REMOVED***);
CSSLint.addRule(***REMOVED***
    id: "fallback-colors",
    name: "Require fallback colors",
    desc: "For older browsers that don't support RGBA, HSL, or HSLA, provide a fallback color.",
    browsers: "IE6,IE7,IE8",
    init: function(parser, reporter)***REMOVED***
        var rule = this,
            lastProperty,
            propertiesToCheck = ***REMOVED***
                color: 1,
                background: 1,
                "border-color": 1,
                "border-top-color": 1,
                "border-right-color": 1,
                "border-bottom-color": 1,
                "border-left-color": 1,
                border: 1,
                "border-top": 1,
                "border-right": 1,
                "border-bottom": 1,
                "border-left": 1,
                "background-color": 1
        ***REMOVED***
            properties;
        
        function startRule(event)***REMOVED***
            properties = ***REMOVED******REMOVED***;    
            lastProperty = null;    
    ***REMOVED***
        
        parser.addListener("startrule", startRule);
        parser.addListener("startfontface", startRule);
        parser.addListener("startpage", startRule);
        parser.addListener("startpagemargin", startRule);
        parser.addListener("startkeyframerule", startRule);        
        
        parser.addListener("property", function(event)***REMOVED***
            var property = event.property,
                name = property.text.toLowerCase(),
                parts = event.value.parts,
                i = 0, 
                colorType = "",
                len = parts.length;                
                        
            if(propertiesToCheck[name])***REMOVED***
                while(i < len)***REMOVED***
                    if (parts[i].type == "color")***REMOVED***
                        if ("alpha" in parts[i] || "hue" in parts[i])***REMOVED***
                            
                            if (/([^\)]+)\(/.test(parts[i]))***REMOVED***
                                colorType = RegExp.$1.toUpperCase();
                        ***REMOVED***
                            
                            if (!lastProperty || (lastProperty.property.text.toLowerCase() != name || lastProperty.colorType != "compat"))***REMOVED***
                                reporter.report("Fallback " + name + " (hex or RGB) should precede " + colorType + " " + name + ".", event.line, event.col, rule);
                        ***REMOVED***
                    ***REMOVED*** else ***REMOVED***
                            event.colorType = "compat";
                    ***REMOVED***
                ***REMOVED***
                    
                    i++;
            ***REMOVED***
        ***REMOVED***

            lastProperty = event;
    ***REMOVED***);        
         
***REMOVED***

***REMOVED***);
CSSLint.addRule(***REMOVED***
    id: "floats",
    name: "Disallow too many floats",
    desc: "This rule tests if the float property is used too many times",
    browsers: "All",
    init: function(parser, reporter)***REMOVED***
        var rule = this;
        var count = 0;
        parser.addListener("property", function(event)***REMOVED***
            if (event.property.text.toLowerCase() == "float" &&
                    event.value.text.toLowerCase() != "none")***REMOVED***
                count++;
        ***REMOVED***
    ***REMOVED***);
        parser.addListener("endstylesheet", function()***REMOVED***
            reporter.stat("floats", count);
            if (count >= 10)***REMOVED***
                reporter.rollupWarn("Too many floats (" + count + "), you're probably using them for layout. Consider using a grid system instead.", rule);
        ***REMOVED***
    ***REMOVED***);
***REMOVED***

***REMOVED***);
CSSLint.addRule(***REMOVED***
    id: "font-faces",
    name: "Don't use too many web fonts",
    desc: "Too many different web fonts in the same stylesheet.",
    browsers: "All",
    init: function(parser, reporter)***REMOVED***
        var rule = this,
            count = 0;


        parser.addListener("startfontface", function()***REMOVED***
            count++;
    ***REMOVED***);

        parser.addListener("endstylesheet", function()***REMOVED***
            if (count > 5)***REMOVED***
                reporter.rollupWarn("Too many @font-face declarations (" + count + ").", rule);
        ***REMOVED***
    ***REMOVED***);
***REMOVED***

***REMOVED***);
CSSLint.addRule(***REMOVED***
    id: "font-sizes",
    name: "Disallow too many font sizes",
    desc: "Checks the number of font-size declarations.",
    browsers: "All",
    init: function(parser, reporter)***REMOVED***
        var rule = this,
            count = 0;
        parser.addListener("property", function(event)***REMOVED***
            if (event.property == "font-size")***REMOVED***
                count++;
        ***REMOVED***
    ***REMOVED***);
        parser.addListener("endstylesheet", function()***REMOVED***
            reporter.stat("font-sizes", count);
            if (count >= 10)***REMOVED***
                reporter.rollupWarn("Too many font-size declarations (" + count + "), abstraction needed.", rule);
        ***REMOVED***
    ***REMOVED***);
***REMOVED***

***REMOVED***);
CSSLint.addRule(***REMOVED***
    id: "gradients",
    name: "Require all gradient definitions",
    desc: "When using a vendor-prefixed gradient, make sure to use them all.",
    browsers: "All",
    init: function(parser, reporter)***REMOVED***
        var rule = this,
            gradients;

        parser.addListener("startrule", function()***REMOVED***
            gradients = ***REMOVED***
                moz: 0,
                webkit: 0,
                oldWebkit: 0,
                o: 0
        ***REMOVED***;
    ***REMOVED***);

        parser.addListener("property", function(event)***REMOVED***

            if (/\-(moz|o|webkit)(?:\-(?:linear|radial))\-gradient/i.test(event.value))***REMOVED***
                gradients[RegExp.$1] = 1;
        ***REMOVED*** else if (/\-webkit\-gradient/i.test(event.value))***REMOVED***
                gradients.oldWebkit = 1;
        ***REMOVED***

    ***REMOVED***);

        parser.addListener("endrule", function(event)***REMOVED***
            var missing = [];

            if (!gradients.moz)***REMOVED***
                missing.push("Firefox 3.6+");
        ***REMOVED***

            if (!gradients.webkit)***REMOVED***
                missing.push("Webkit (Safari 5+, Chrome)");
        ***REMOVED***
            
            if (!gradients.oldWebkit)***REMOVED***
                missing.push("Old Webkit (Safari 4+, Chrome)");
        ***REMOVED***

            if (!gradients.o)***REMOVED***
                missing.push("Opera 11.1+");
        ***REMOVED***

            if (missing.length && missing.length < 4)***REMOVED***            
                reporter.report("Missing vendor-prefixed CSS gradients for " + missing.join(", ") + ".", event.selectors[0].line, event.selectors[0].col, rule); 
        ***REMOVED***

    ***REMOVED***);

***REMOVED***

***REMOVED***);
CSSLint.addRule(***REMOVED***
    id: "ids",
    name: "Disallow IDs in selectors",
    desc: "Selectors should not contain IDs.",
    browsers: "All",
    init: function(parser, reporter)***REMOVED***
        var rule = this;
        parser.addListener("startrule", function(event)***REMOVED***
            var selectors = event.selectors,
                selector,
                part,
                modifier,
                idCount,
                i, j, k;

            for (i=0; i < selectors.length; i++)***REMOVED***
                selector = selectors[i];
                idCount = 0;

                for (j=0; j < selector.parts.length; j++)***REMOVED***
                    part = selector.parts[j];
                    if (part.type == parser.SELECTOR_PART_TYPE)***REMOVED***
                        for (k=0; k < part.modifiers.length; k++)***REMOVED***
                            modifier = part.modifiers[k];
                            if (modifier.type == "id")***REMOVED***
                                idCount++;
                        ***REMOVED***
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***

                if (idCount == 1)***REMOVED***
                    reporter.report("Don't use IDs in selectors.", selector.line, selector.col, rule);
            ***REMOVED*** else if (idCount > 1)***REMOVED***
                    reporter.report(idCount + " IDs in the selector, really?", selector.line, selector.col, rule);
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***);
***REMOVED***

***REMOVED***);
CSSLint.addRule(***REMOVED***
    id: "import",
    name: "Disallow @import",
    desc: "Don't use @import, use <link> instead.",
    browsers: "All",
    init: function(parser, reporter)***REMOVED***
        var rule = this;
        
        parser.addListener("import", function(event)***REMOVED***        
            reporter.report("@import prevents parallel downloads, use <link> instead.", event.line, event.col, rule);
    ***REMOVED***);

***REMOVED***

***REMOVED***);
CSSLint.addRule(***REMOVED***
    id: "important",
    name: "Disallow !important",
    desc: "Be careful when using !important declaration",
    browsers: "All",
    init: function(parser, reporter)***REMOVED***
        var rule = this,
            count = 0;
        parser.addListener("property", function(event)***REMOVED***
            if (event.important === true)***REMOVED***
                count++;
                reporter.report("Use of !important", event.line, event.col, rule);
        ***REMOVED***
    ***REMOVED***);
        parser.addListener("endstylesheet", function()***REMOVED***
            reporter.stat("important", count);
            if (count >= 10)***REMOVED***
                reporter.rollupWarn("Too many !important declarations (" + count + "), try to use less than 10 to avoid specificity issues.", rule);
        ***REMOVED***
    ***REMOVED***);
***REMOVED***

***REMOVED***);
CSSLint.addRule(***REMOVED***
    id: "known-properties",
    name: "Require use of known properties",
    desc: "Properties should be known (listed in CSS3 specification) or be a vendor-prefixed property.",
    browsers: "All",
    init: function(parser, reporter)***REMOVED***
        var rule = this;

        parser.addListener("property", function(event)***REMOVED***
            var name = event.property.text.toLowerCase();
            if (event.invalid) ***REMOVED***
                reporter.report(event.invalid.message, event.line, event.col, rule);
        ***REMOVED***

    ***REMOVED***);
***REMOVED***

***REMOVED***);
CSSLint.addRule(***REMOVED***
    id: "outline-none",
    name: "Disallow outline: none",
    desc: "Use of outline: none or outline: 0 should be limited to :focus rules.",
    browsers: "All",
    tags: ["Accessibility"],
    init: function(parser, reporter)***REMOVED***
        var rule = this,
            lastRule;

        function startRule(event)***REMOVED***
            if (event.selectors)***REMOVED***
                lastRule = ***REMOVED***
                    line: event.line,
                    col: event.col,
                    selectors: event.selectors,
                    propCount: 0,
                    outline: false
            ***REMOVED***;
        ***REMOVED*** else ***REMOVED***
                lastRule = null;
        ***REMOVED***
    ***REMOVED***
        
        function endRule(event)***REMOVED***
            if (lastRule)***REMOVED***
                if (lastRule.outline)***REMOVED***
                    if (lastRule.selectors.toString().toLowerCase().indexOf(":focus") == -1)***REMOVED***
                        reporter.report("Outlines should only be modified using :focus.", lastRule.line, lastRule.col, rule);
                ***REMOVED*** else if (lastRule.propCount == 1) ***REMOVED***
                        reporter.report("Outlines shouldn't be hidden unless other visual changes are made.", lastRule.line, lastRule.col, rule);                        
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***

        parser.addListener("startrule", startRule);
        parser.addListener("startfontface", startRule);
        parser.addListener("startpage", startRule);
        parser.addListener("startpagemargin", startRule);
        parser.addListener("startkeyframerule", startRule); 

        parser.addListener("property", function(event)***REMOVED***
            var name = event.property.text.toLowerCase(),
                value = event.value;                
                
            if (lastRule)***REMOVED***
                lastRule.propCount++;
                if (name == "outline" && (value == "none" || value == "0"))***REMOVED***
                    lastRule.outline = true;
            ***REMOVED***            
        ***REMOVED***
            
    ***REMOVED***);
        
        parser.addListener("endrule", endRule);
        parser.addListener("endfontface", endRule);
        parser.addListener("endpage", endRule);
        parser.addListener("endpagemargin", endRule);
        parser.addListener("endkeyframerule", endRule); 

***REMOVED***

***REMOVED***);
CSSLint.addRule(***REMOVED***
    id: "overqualified-elements",
    name: "Disallow overqualified elements",
    desc: "Don't use classes or IDs with elements (a.foo or a#foo).",
    browsers: "All",
    init: function(parser, reporter)***REMOVED***
        var rule = this,
            classes = ***REMOVED******REMOVED***;
            
        parser.addListener("startrule", function(event)***REMOVED***
            var selectors = event.selectors,
                selector,
                part,
                modifier,
                i, j, k;

            for (i=0; i < selectors.length; i++)***REMOVED***
                selector = selectors[i];

                for (j=0; j < selector.parts.length; j++)***REMOVED***
                    part = selector.parts[j];
                    if (part.type == parser.SELECTOR_PART_TYPE)***REMOVED***
                        for (k=0; k < part.modifiers.length; k++)***REMOVED***
                            modifier = part.modifiers[k];
                            if (part.elementName && modifier.type == "id")***REMOVED***
                                reporter.report("Element (" + part + ") is overqualified, just use " + modifier + " without element name.", part.line, part.col, rule);
                        ***REMOVED*** else if (modifier.type == "class")***REMOVED***
                                
                                if (!classes[modifier])***REMOVED***
                                    classes[modifier] = [];
                            ***REMOVED***
                                classes[modifier].push(***REMOVED*** modifier: modifier, part: part ***REMOVED***);
                        ***REMOVED***
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***);
        
        parser.addListener("endstylesheet", function()***REMOVED***
        
            var prop;
            for (prop in classes)***REMOVED***
                if (classes.hasOwnProperty(prop))***REMOVED***
                    if (classes[prop].length == 1 && classes[prop][0].part.elementName)***REMOVED***
                        reporter.report("Element (" + classes[prop][0].part + ") is overqualified, just use " + classes[prop][0].modifier + " without element name.", classes[prop][0].part.line, classes[prop][0].part.col, rule);
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***        
    ***REMOVED***);
***REMOVED***

***REMOVED***);
CSSLint.addRule(***REMOVED***
    id: "qualified-headings",
    name: "Disallow qualified headings",
    desc: "Headings should not be qualified (namespaced).",
    browsers: "All",
    init: function(parser, reporter)***REMOVED***
        var rule = this;

        parser.addListener("startrule", function(event)***REMOVED***
            var selectors = event.selectors,
                selector,
                part,
                i, j;

            for (i=0; i < selectors.length; i++)***REMOVED***
                selector = selectors[i];

                for (j=0; j < selector.parts.length; j++)***REMOVED***
                    part = selector.parts[j];
                    if (part.type == parser.SELECTOR_PART_TYPE)***REMOVED***
                        if (part.elementName && /h[1-6]/.test(part.elementName.toString()) && j > 0)***REMOVED***
                            reporter.report("Heading (" + part.elementName + ") should not be qualified.", part.line, part.col, rule);
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***);
***REMOVED***

***REMOVED***);
CSSLint.addRule(***REMOVED***
    id: "regex-selectors",
    name: "Disallow selectors that look like regexs",
    desc: "Selectors that look like regular expressions are slow and should be avoided.",
    browsers: "All",
    init: function(parser, reporter)***REMOVED***
        var rule = this;

        parser.addListener("startrule", function(event)***REMOVED***
            var selectors = event.selectors,
                selector,
                part,
                modifier,
                i, j, k;

            for (i=0; i < selectors.length; i++)***REMOVED***
                selector = selectors[i];
                for (j=0; j < selector.parts.length; j++)***REMOVED***
                    part = selector.parts[j];
                    if (part.type == parser.SELECTOR_PART_TYPE)***REMOVED***
                        for (k=0; k < part.modifiers.length; k++)***REMOVED***
                            modifier = part.modifiers[k];
                            if (modifier.type == "attribute")***REMOVED***
                                if (/([\~\|\^\$\*]=)/.test(modifier))***REMOVED***
                                    reporter.report("Attribute selectors with " + RegExp.$1 + " are slow!", modifier.line, modifier.col, rule);
                            ***REMOVED***
                        ***REMOVED***

                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***);
***REMOVED***

***REMOVED***);
CSSLint.addRule(***REMOVED***
    id: "rules-count",
    name: "Rules Count",
    desc: "Track how many rules there are.",
    browsers: "All",
    init: function(parser, reporter)***REMOVED***
        var rule = this,
            count = 0;
        parser.addListener("startrule", function()***REMOVED***
            count++;
    ***REMOVED***);

        parser.addListener("endstylesheet", function()***REMOVED***
            reporter.stat("rule-count", count);
    ***REMOVED***);
***REMOVED***

***REMOVED***);
CSSLint.addRule(***REMOVED***
    id: "selector-max-approaching",
    name: "Warn when approaching the 4095 selector limit for IE",
    desc: "Will warn when selector count is >= 3800 selectors.",
    browsers: "IE",
    init: function(parser, reporter) ***REMOVED***
        var rule = this, count = 0;

        parser.addListener('startrule', function(event) ***REMOVED***
            count += event.selectors.length;
    ***REMOVED***);

        parser.addListener("endstylesheet", function() ***REMOVED***
            if (count >= 3800) ***REMOVED***
                reporter.report("You have " + count + " selectors. Internet Explorer supports a maximum of 4095 selectors per stylesheet. Consider refactoring.",0,0,rule); 
        ***REMOVED***
    ***REMOVED***);
***REMOVED***

***REMOVED***);
CSSLint.addRule(***REMOVED***
    id: "selector-max",
    name: "Error when past the 4095 selector limit for IE",
    desc: "Will error when selector count is > 4095.",
    browsers: "IE",
    init: function(parser, reporter)***REMOVED***
        var rule = this, count = 0;

        parser.addListener('startrule',function(event) ***REMOVED***
            count += event.selectors.length;
    ***REMOVED***);

        parser.addListener("endstylesheet", function() ***REMOVED***
            if (count > 4095) ***REMOVED***
                reporter.report("You have " + count + " selectors. Internet Explorer supports a maximum of 4095 selectors per stylesheet. Consider refactoring.",0,0,rule); 
        ***REMOVED***
    ***REMOVED***);
***REMOVED***

***REMOVED***);
CSSLint.addRule(***REMOVED***
    id: "shorthand",
    name: "Require shorthand properties",
    desc: "Use shorthand properties where possible.",
    browsers: "All",
    init: function(parser, reporter)***REMOVED***
        var rule = this,
            prop, i, len,
            propertiesToCheck = ***REMOVED******REMOVED***,
            properties,
            mapping = ***REMOVED***
                "margin": [
                    "margin-top",
                    "margin-bottom",
                    "margin-left",
                    "margin-right"
                ],
                "padding": [
                    "padding-top",
                    "padding-bottom",
                    "padding-left",
                    "padding-right"
                ]              
        ***REMOVED***;
        for (prop in mapping)***REMOVED***
            if (mapping.hasOwnProperty(prop))***REMOVED***
                for (i=0, len=mapping[prop].length; i < len; i++)***REMOVED***
                    propertiesToCheck[mapping[prop][i]] = prop;
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***
            
        function startRule(event)***REMOVED***
            properties = ***REMOVED******REMOVED***;
    ***REMOVED***
        function endRule(event)***REMOVED***
            
            var prop, i, len, total;
            for (prop in mapping)***REMOVED***
                if (mapping.hasOwnProperty(prop))***REMOVED***
                    total=0;
                    
                    for (i=0, len=mapping[prop].length; i < len; i++)***REMOVED***
                        total += properties[mapping[prop][i]] ? 1 : 0;
                ***REMOVED***
                    
                    if (total == mapping[prop].length)***REMOVED***
                        reporter.report("The properties " + mapping[prop].join(", ") + " can be replaced by " + prop + ".", event.line, event.col, rule);
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***        
        
        parser.addListener("startrule", startRule);
        parser.addListener("startfontface", startRule);
        parser.addListener("property", function(event)***REMOVED***
            var name = event.property.toString().toLowerCase(),
                value = event.value.parts[0].value;

            if (propertiesToCheck[name])***REMOVED***
                properties[name] = 1;
        ***REMOVED***
    ***REMOVED***);

        parser.addListener("endrule", endRule);
        parser.addListener("endfontface", endRule);     

***REMOVED***

***REMOVED***);
CSSLint.addRule(***REMOVED***
    id: "star-property-hack",
    name: "Disallow properties with a star prefix",
    desc: "Checks for the star property hack (targets IE6/7)",
    browsers: "All",
    init: function(parser, reporter)***REMOVED***
        var rule = this;
        parser.addListener("property", function(event)***REMOVED***
            var property = event.property;

            if (property.hack == "*") ***REMOVED***
                reporter.report("Property with star prefix found.", event.property.line, event.property.col, rule);
        ***REMOVED***
    ***REMOVED***);
***REMOVED***
***REMOVED***);
CSSLint.addRule(***REMOVED***
    id: "text-indent",
    name: "Disallow negative text-indent",
    desc: "Checks for text indent less than -99px",
    browsers: "All",
    init: function(parser, reporter)***REMOVED***
        var rule = this,
            textIndent,
            direction;


        function startRule(event)***REMOVED***
            textIndent = false;
            direction = "inherit";
    ***REMOVED***
        function endRule(event)***REMOVED***
            if (textIndent && direction != "ltr")***REMOVED***
                reporter.report("Negative text-indent doesn't work well with RTL. If you use text-indent for image replacement explicitly set direction for that item to ltr.", textIndent.line, textIndent.col, rule);
        ***REMOVED***
    ***REMOVED***

        parser.addListener("startrule", startRule);
        parser.addListener("startfontface", startRule);
        parser.addListener("property", function(event)***REMOVED***
            var name = event.property.toString().toLowerCase(),
                value = event.value;

            if (name == "text-indent" && value.parts[0].value < -99)***REMOVED***
                textIndent = event.property;
        ***REMOVED*** else if (name == "direction" && value == "ltr")***REMOVED***
                direction = "ltr";
        ***REMOVED***
    ***REMOVED***);

        parser.addListener("endrule", endRule);
        parser.addListener("endfontface", endRule);

***REMOVED***

***REMOVED***);
CSSLint.addRule(***REMOVED***
    id: "underscore-property-hack",
    name: "Disallow properties with an underscore prefix",
    desc: "Checks for the underscore property hack (targets IE6)",
    browsers: "All",
    init: function(parser, reporter)***REMOVED***
        var rule = this;
        parser.addListener("property", function(event)***REMOVED***
            var property = event.property;

            if (property.hack == "_") ***REMOVED***
                reporter.report("Property with underscore prefix found.", event.property.line, event.property.col, rule);
        ***REMOVED***
    ***REMOVED***);
***REMOVED***
***REMOVED***);
CSSLint.addRule(***REMOVED***
    id: "unique-headings",
    name: "Headings should only be defined once",
    desc: "Headings should be defined only once.",
    browsers: "All",
    init: function(parser, reporter)***REMOVED***
        var rule = this;

        var headings =  ***REMOVED***
                h1: 0,
                h2: 0,
                h3: 0,
                h4: 0,
                h5: 0,
                h6: 0
        ***REMOVED***;

        parser.addListener("startrule", function(event)***REMOVED***
            var selectors = event.selectors,
                selector,
                part,
                pseudo,
                i, j;

            for (i=0; i < selectors.length; i++)***REMOVED***
                selector = selectors[i];
                part = selector.parts[selector.parts.length-1];

                if (part.elementName && /(h[1-6])/i.test(part.elementName.toString()))***REMOVED***
                    
                    for (j=0; j < part.modifiers.length; j++)***REMOVED***
                        if (part.modifiers[j].type == "pseudo")***REMOVED***
                            pseudo = true;
                            break;
                    ***REMOVED***
                ***REMOVED***
                
                    if (!pseudo)***REMOVED***
                        headings[RegExp.$1]++;
                        if (headings[RegExp.$1] > 1) ***REMOVED***
                            reporter.report("Heading (" + part.elementName + ") has already been defined.", part.line, part.col, rule);
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***);
        
        parser.addListener("endstylesheet", function(event)***REMOVED***
            var prop,
                messages = [];
                
            for (prop in headings)***REMOVED***
                if (headings.hasOwnProperty(prop))***REMOVED***
                    if (headings[prop] > 1)***REMOVED***
                        messages.push(headings[prop] + " " + prop + "s");
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
            
            if (messages.length)***REMOVED***
                reporter.rollupWarn("You have " + messages.join(", ") + " defined in this stylesheet.", rule);
        ***REMOVED***
    ***REMOVED***);        
***REMOVED***

***REMOVED***);
CSSLint.addRule(***REMOVED***
    id: "universal-selector",
    name: "Disallow universal selector",
    desc: "The universal selector (*) is known to be slow.",
    browsers: "All",
    init: function(parser, reporter)***REMOVED***
        var rule = this;

        parser.addListener("startrule", function(event)***REMOVED***
            var selectors = event.selectors,
                selector,
                part,
                modifier,
                i, j, k;

            for (i=0; i < selectors.length; i++)***REMOVED***
                selector = selectors[i];
                
                part = selector.parts[selector.parts.length-1];
                if (part.elementName == "*")***REMOVED***
                    reporter.report(rule.desc, part.line, part.col, rule);
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***);
***REMOVED***

***REMOVED***);
CSSLint.addRule(***REMOVED***
    id: "unqualified-attributes",
    name: "Disallow unqualified attribute selectors",
    desc: "Unqualified attribute selectors are known to be slow.",
    browsers: "All",
    init: function(parser, reporter)***REMOVED***
        var rule = this;

        parser.addListener("startrule", function(event)***REMOVED***
            
            var selectors = event.selectors,
                selector,
                part,
                modifier,
                i, j, k;

            for (i=0; i < selectors.length; i++)***REMOVED***
                selector = selectors[i];
                
                part = selector.parts[selector.parts.length-1];
                if (part.type == parser.SELECTOR_PART_TYPE)***REMOVED***
                    for (k=0; k < part.modifiers.length; k++)***REMOVED***
                        modifier = part.modifiers[k];
                        if (modifier.type == "attribute" && (!part.elementName || part.elementName == "*"))***REMOVED***
                            reporter.report(rule.desc, part.line, part.col, rule);                               
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
                
        ***REMOVED***            
    ***REMOVED***);
***REMOVED***

***REMOVED***);
CSSLint.addRule(***REMOVED***
    id: "vendor-prefix",
    name: "Require standard property with vendor prefix",
    desc: "When using a vendor-prefixed property, make sure to include the standard one.",
    browsers: "All",
    init: function(parser, reporter)***REMOVED***
        var rule = this,
            properties,
            num,
            propertiesToCheck = ***REMOVED***
                "-webkit-border-radius": "border-radius",
                "-webkit-border-top-left-radius": "border-top-left-radius",
                "-webkit-border-top-right-radius": "border-top-right-radius",
                "-webkit-border-bottom-left-radius": "border-bottom-left-radius",
                "-webkit-border-bottom-right-radius": "border-bottom-right-radius",
                
                "-o-border-radius": "border-radius",
                "-o-border-top-left-radius": "border-top-left-radius",
                "-o-border-top-right-radius": "border-top-right-radius",
                "-o-border-bottom-left-radius": "border-bottom-left-radius",
                "-o-border-bottom-right-radius": "border-bottom-right-radius",
                
                "-moz-border-radius": "border-radius",
                "-moz-border-radius-topleft": "border-top-left-radius",
                "-moz-border-radius-topright": "border-top-right-radius",
                "-moz-border-radius-bottomleft": "border-bottom-left-radius",
                "-moz-border-radius-bottomright": "border-bottom-right-radius",                
                
                "-moz-column-count": "column-count",
                "-webkit-column-count": "column-count",
                
                "-moz-column-gap": "column-gap",
                "-webkit-column-gap": "column-gap",
                
                "-moz-column-rule": "column-rule",
                "-webkit-column-rule": "column-rule",
                
                "-moz-column-rule-style": "column-rule-style",
                "-webkit-column-rule-style": "column-rule-style",
                
                "-moz-column-rule-color": "column-rule-color",
                "-webkit-column-rule-color": "column-rule-color",
                
                "-moz-column-rule-width": "column-rule-width",
                "-webkit-column-rule-width": "column-rule-width",
                
                "-moz-column-width": "column-width",
                "-webkit-column-width": "column-width",
                
                "-webkit-column-span": "column-span",
                "-webkit-columns": "columns",
                
                "-moz-box-shadow": "box-shadow",
                "-webkit-box-shadow": "box-shadow",
                
                "-moz-transform" : "transform",
                "-webkit-transform" : "transform",
                "-o-transform" : "transform",
                "-ms-transform" : "transform",
                
                "-moz-transform-origin" : "transform-origin",
                "-webkit-transform-origin" : "transform-origin",
                "-o-transform-origin" : "transform-origin",
                "-ms-transform-origin" : "transform-origin",
                
                "-moz-box-sizing" : "box-sizing",
                "-webkit-box-sizing" : "box-sizing",
                
                "-moz-user-select" : "user-select",
                "-khtml-user-select" : "user-select",
                "-webkit-user-select" : "user-select"                
        ***REMOVED***;
        function startRule()***REMOVED***
            properties = ***REMOVED******REMOVED***;
            num=1;        
    ***REMOVED***
        function endRule(event)***REMOVED***
            var prop,
                i, len,
                standard,
                needed,
                actual,
                needsStandard = [];

            for (prop in properties)***REMOVED***
                if (propertiesToCheck[prop])***REMOVED***
                    needsStandard.push(***REMOVED*** actual: prop, needed: propertiesToCheck[prop]***REMOVED***);
            ***REMOVED***
        ***REMOVED***

            for (i=0, len=needsStandard.length; i < len; i++)***REMOVED***
                needed = needsStandard[i].needed;
                actual = needsStandard[i].actual;

                if (!properties[needed])***REMOVED***               
                    reporter.report("Missing standard property '" + needed + "' to go along with '" + actual + "'.", properties[actual][0].name.line, properties[actual][0].name.col, rule);
            ***REMOVED*** else ***REMOVED***
                    if (properties[needed][0].pos < properties[actual][0].pos)***REMOVED***
                        reporter.report("Standard property '" + needed + "' should come after vendor-prefixed property '" + actual + "'.", properties[actual][0].name.line, properties[actual][0].name.col, rule);
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***        
        
        parser.addListener("startrule", startRule);
        parser.addListener("startfontface", startRule);
        parser.addListener("startpage", startRule);
        parser.addListener("startpagemargin", startRule);
        parser.addListener("startkeyframerule", startRule);         

        parser.addListener("property", function(event)***REMOVED***
            var name = event.property.text.toLowerCase();

            if (!properties[name])***REMOVED***
                properties[name] = [];
        ***REMOVED***

            properties[name].push(***REMOVED*** name: event.property, value : event.value, pos:num++ ***REMOVED***);
    ***REMOVED***);

        parser.addListener("endrule", endRule);
        parser.addListener("endfontface", endRule);
        parser.addListener("endpage", endRule);
        parser.addListener("endpagemargin", endRule);
        parser.addListener("endkeyframerule", endRule);         
***REMOVED***

***REMOVED***);
CSSLint.addRule(***REMOVED***
    id: "zero-units",
    name: "Disallow units for 0 values",
    desc: "You don't need to specify units when a value is 0.",
    browsers: "All",
    init: function(parser, reporter)***REMOVED***
        var rule = this;
        parser.addListener("property", function(event)***REMOVED***
            var parts = event.value.parts,
                i = 0, 
                len = parts.length;

            while(i < len)***REMOVED***
                if ((parts[i].units || parts[i].type == "percentage") && parts[i].value === 0 && parts[i].type != "time")***REMOVED***
                    reporter.report("Values of 0 shouldn't have units specified.", parts[i].line, parts[i].col, rule);
            ***REMOVED***
                i++;
        ***REMOVED***

    ***REMOVED***);

***REMOVED***

***REMOVED***);
(function() ***REMOVED***
    var xmlEscape = function(str) ***REMOVED***
        if (!str || str.constructor !== String) ***REMOVED***
            return "";
    ***REMOVED***
        
        return str.replace(/[\"&><]/g, function(match) ***REMOVED***
            switch (match) ***REMOVED***
                case "\"":
                    return "&quot;";
                case "&":
                    return "&amp;";
                case "<":
                    return "&lt;";
                case ">":
                    return "&gt;";            
        ***REMOVED***
    ***REMOVED***);
***REMOVED***;

    CSSLint.addFormatter(***REMOVED***
        id: "checkstyle-xml",
        name: "Checkstyle XML format",
        startFormat: function()***REMOVED***
            return "<?xml version=\"1.0\" encoding=\"utf-8\"?><checkstyle>";
    ***REMOVED***
        endFormat: function()***REMOVED***
            return "</checkstyle>";
    ***REMOVED***
        readError: function(filename, message) ***REMOVED***
            return "<file name=\"" + xmlEscape(filename) + "\"><error line=\"0\" column=\"0\" severty=\"error\" message=\"" + xmlEscape(message) + "\"></error></file>";
    ***REMOVED***
        formatResults: function(results, filename, options) ***REMOVED***
            var messages = results.messages,
                output = [];
            var generateSource = function(rule) ***REMOVED***
                if (!rule || !('name' in rule)) ***REMOVED***
                    return "";
            ***REMOVED***
                return 'net.csslint.' + rule.name.replace(/\s/g,'');
        ***REMOVED***;



            if (messages.length > 0) ***REMOVED***
                output.push("<file name=\""+filename+"\">");
                CSSLint.Util.forEach(messages, function (message, i) ***REMOVED***
                    if (!message.rollup) ***REMOVED***
                      output.push("<error line=\"" + message.line + "\" column=\"" + message.col + "\" severity=\"" + message.type + "\"" +
                          " message=\"" + xmlEscape(message.message) + "\" source=\"" + generateSource(message.rule) +"\"/>");
                ***REMOVED***
            ***REMOVED***);
                output.push("</file>");
        ***REMOVED***

            return output.join("");
    ***REMOVED***
***REMOVED***);

***REMOVED***());
CSSLint.addFormatter(***REMOVED***
    id: "compact",
    name: "Compact, 'porcelain' format",
    startFormat: function() ***REMOVED***
        return "";
***REMOVED***
    endFormat: function() ***REMOVED***
        return "";
***REMOVED***
    formatResults: function(results, filename, options) ***REMOVED***
        var messages = results.messages,
            output = "";
        options = options || ***REMOVED******REMOVED***;
        var capitalize = function(str) ***REMOVED***
            return str.charAt(0).toUpperCase() + str.slice(1);
    ***REMOVED***;

        if (messages.length === 0) ***REMOVED***
            return options.quiet ? "" : filename + ": Lint Free!";
    ***REMOVED***

        CSSLint.Util.forEach(messages, function(message, i) ***REMOVED***
            if (message.rollup) ***REMOVED***
                output += filename + ": " + capitalize(message.type) + " - " + message.message + "\n";
        ***REMOVED*** else ***REMOVED***
                output += filename + ": " + "line " + message.line + 
                    ", col " + message.col + ", " + capitalize(message.type) + " - " + message.message + " (" + message.rule.id + ")\n";
        ***REMOVED***
    ***REMOVED***);
    
        return output;
***REMOVED***
***REMOVED***);
CSSLint.addFormatter(***REMOVED***
    id: "csslint-xml",
    name: "CSSLint XML format",
    startFormat: function()***REMOVED***
        return "<?xml version=\"1.0\" encoding=\"utf-8\"?><csslint>";
***REMOVED***
    endFormat: function()***REMOVED***
        return "</csslint>";
***REMOVED***
    formatResults: function(results, filename, options) ***REMOVED***
        var messages = results.messages,
            output = [];
        var escapeSpecialCharacters = function(str) ***REMOVED***
            if (!str || str.constructor !== String) ***REMOVED***
                return "";
        ***REMOVED***
            return str.replace(/\"/g, "'").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    ***REMOVED***;

        if (messages.length > 0) ***REMOVED***
            output.push("<file name=\""+filename+"\">");
            CSSLint.Util.forEach(messages, function (message, i) ***REMOVED***
                if (message.rollup) ***REMOVED***
                    output.push("<issue severity=\"" + message.type + "\" reason=\"" + escapeSpecialCharacters(message.message) + "\" evidence=\"" + escapeSpecialCharacters(message.evidence) + "\"/>");
            ***REMOVED*** else ***REMOVED***
                    output.push("<issue line=\"" + message.line + "\" char=\"" + message.col + "\" severity=\"" + message.type + "\"" +
                        " reason=\"" + escapeSpecialCharacters(message.message) + "\" evidence=\"" + escapeSpecialCharacters(message.evidence) + "\"/>");
            ***REMOVED***
        ***REMOVED***);
            output.push("</file>");
    ***REMOVED***

        return output.join("");
***REMOVED***
***REMOVED***);
CSSLint.addFormatter(***REMOVED***
    id: "junit-xml",
    name: "JUNIT XML format",
    startFormat: function()***REMOVED***
        return "<?xml version=\"1.0\" encoding=\"utf-8\"?><testsuites>";
***REMOVED***
    endFormat: function() ***REMOVED***
        return "</testsuites>";
***REMOVED***
    formatResults: function(results, filename, options) ***REMOVED***

        var messages = results.messages,
            output = [],
            tests = ***REMOVED***
                'error': 0,
                'failure': 0
        ***REMOVED***;
        var generateSource = function(rule) ***REMOVED***
            if (!rule || !('name' in rule)) ***REMOVED***
                return "";
        ***REMOVED***
            return 'net.csslint.' + rule.name.replace(/\s/g,'');
    ***REMOVED***;
        var escapeSpecialCharacters = function(str) ***REMOVED***

            if (!str || str.constructor !== String) ***REMOVED***
                return "";
        ***REMOVED***

            return str.replace(/\"/g, "'").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    ***REMOVED***;

        if (messages.length > 0) ***REMOVED***

            messages.forEach(function (message, i) ***REMOVED***
                var type = message.type === 'warning' ? 'error' : message.type;
                if (!message.rollup) ***REMOVED***
                    output.push("<testcase time=\"0\" name=\"" + generateSource(message.rule) + "\">");
                    output.push("<" + type + " message=\"" + escapeSpecialCharacters(message.message) + "\"><![CDATA[" + message.line + ':' + message.col + ':' + escapeSpecialCharacters(message.evidence)  + "]]></" + type + ">");
                    output.push("</testcase>");

                    tests[type] += 1;

            ***REMOVED***

        ***REMOVED***);

            output.unshift("<testsuite time=\"0\" tests=\"" + messages.length + "\" skipped=\"0\" errors=\"" + tests.error + "\" failures=\"" + tests.failure + "\" package=\"net.csslint\" name=\"" + filename + "\">");
            output.push("</testsuite>");

    ***REMOVED***

        return output.join("");

***REMOVED***
***REMOVED***);
CSSLint.addFormatter(***REMOVED***
    id: "lint-xml",
    name: "Lint XML format",
    startFormat: function()***REMOVED***
        return "<?xml version=\"1.0\" encoding=\"utf-8\"?><lint>";
***REMOVED***
    endFormat: function()***REMOVED***
        return "</lint>";
***REMOVED***
    formatResults: function(results, filename, options) ***REMOVED***
        var messages = results.messages,
            output = [];
        var escapeSpecialCharacters = function(str) ***REMOVED***
            if (!str || str.constructor !== String) ***REMOVED***
                return "";
        ***REMOVED***
            return str.replace(/\"/g, "'").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    ***REMOVED***;

        if (messages.length > 0) ***REMOVED***
        
            output.push("<file name=\""+filename+"\">");
            CSSLint.Util.forEach(messages, function (message, i) ***REMOVED***
                if (message.rollup) ***REMOVED***
                    output.push("<issue severity=\"" + message.type + "\" reason=\"" + escapeSpecialCharacters(message.message) + "\" evidence=\"" + escapeSpecialCharacters(message.evidence) + "\"/>");
            ***REMOVED*** else ***REMOVED***
                    output.push("<issue line=\"" + message.line + "\" char=\"" + message.col + "\" severity=\"" + message.type + "\"" +
                        " reason=\"" + escapeSpecialCharacters(message.message) + "\" evidence=\"" + escapeSpecialCharacters(message.evidence) + "\"/>");
            ***REMOVED***
        ***REMOVED***);
            output.push("</file>");
    ***REMOVED***

        return output.join("");
***REMOVED***
***REMOVED***);
CSSLint.addFormatter(***REMOVED***
    id: "text",
    name: "Plain Text",
    startFormat: function() ***REMOVED***
        return "";
***REMOVED***
    endFormat: function() ***REMOVED***
        return "";
***REMOVED***
    formatResults: function(results, filename, options) ***REMOVED***
        var messages = results.messages,
            output = "";
        options = options || ***REMOVED******REMOVED***;

        if (messages.length === 0) ***REMOVED***
            return options.quiet ? "" : "\n\ncsslint: No errors in " + filename + ".";
    ***REMOVED***

        output = "\n\ncsslint: There are " + messages.length  +  " problems in " + filename + ".";
        var pos = filename.lastIndexOf("/"),
            shortFilename = filename;

        if (pos === -1)***REMOVED***
            pos = filename.lastIndexOf("\\");       
    ***REMOVED***
        if (pos > -1)***REMOVED***
            shortFilename = filename.substring(pos+1);
    ***REMOVED***

        CSSLint.Util.forEach(messages, function (message, i) ***REMOVED***
            output = output + "\n\n" + shortFilename;
            if (message.rollup) ***REMOVED***
                output += "\n" + (i+1) + ": " + message.type;
                output += "\n" + message.message;
        ***REMOVED*** else ***REMOVED***
                output += "\n" + (i+1) + ": " + message.type + " at line " + message.line + ", col " + message.col;
                output += "\n" + message.message;
                output += "\n" + message.evidence;
        ***REMOVED***
    ***REMOVED***);
    
        return output;
***REMOVED***
***REMOVED***);

exports.CSSLint = CSSLint;

***REMOVED***);