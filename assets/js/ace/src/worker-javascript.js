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

define('ace/mode/javascript_worker', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/worker/mirror', 'ace/mode/javascript/jshint'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var Mirror = require("../worker/mirror").Mirror;
var lint = require("./javascript/jshint").JSHINT;

function startRegex(arr) ***REMOVED***
    return RegExp("^(" + arr.join("|") + ")");
***REMOVED***

var disabledWarningsRe = startRegex([
    "Bad for in variable '(.+)'.",
    'Missing "use strict"'
]);
var errorsRe = startRegex([
    "Unexpected",
    "Expected ",
    "Confusing (plus|minus)",
    "\\***REMOVED***a\\***REMOVED*** unterminated regular expression",
    "Unclosed ",
    "Unmatched ",
    "Unbegun comment",
    "Bad invocation",
    "Missing space after",
    "Missing operator at"
]);
var infoRe = startRegex([
    "Expected an assignment",
    "Bad escapement of EOL",
    "Unexpected comma",
    "Unexpected space",
    "Missing radix parameter.",
    "A leading decimal point can",
    "\\['***REMOVED***a***REMOVED***'\\] is better written in dot notation.",
    "'***REMOVED***a***REMOVED***' used out of scope"
]);

var JavaScriptWorker = exports.JavaScriptWorker = function(sender) ***REMOVED***
    Mirror.call(this, sender);
    this.setTimeout(500);
    this.setOptions();
***REMOVED***;

oop.inherits(JavaScriptWorker, Mirror);

(function() ***REMOVED***
    this.setOptions = function(options) ***REMOVED***
        this.options = options || ***REMOVED***
            esnext: true,
            moz: true,
            devel: true,
            browser: true,
            node: true,
            laxcomma: true,
            laxbreak: true,
            lastsemic: true,
            onevar: false,
            passfail: false,
            maxerr: 100,
            expr: true,
            multistr: true,
            globalstrict: true
    ***REMOVED***;
        this.doc.getValue() && this.deferredUpdate.schedule(100);
***REMOVED***;

    this.changeOptions = function(newOptions) ***REMOVED***
        oop.mixin(this.options, newOptions);
        this.doc.getValue() && this.deferredUpdate.schedule(100);
***REMOVED***;

    this.isValidJS = function(str) ***REMOVED***
        try ***REMOVED***
            eval("throw 0;" + str);
    ***REMOVED*** catch(e) ***REMOVED***
            if (e === 0)
                return true;
    ***REMOVED***
        return false
***REMOVED***;

    this.onUpdate = function() ***REMOVED***
        var value = this.doc.getValue();
        value = value.replace(/^#!.*\n/, "\n");
        if (!value) ***REMOVED***
            this.sender.emit("jslint", []);
            return;
    ***REMOVED***
        var errors = [];
        var maxErrorLevel = this.isValidJS(value) ? "warning" : "error";
        lint(value, this.options);
        var results = lint.errors;

        var errorAdded = false
        for (var i = 0; i < results.length; i++) ***REMOVED***
            var error = results[i];
            if (!error)
                continue;
            var raw = error.raw;
            var type = "warning";

            if (raw == "Missing semicolon.") ***REMOVED***
                var str = error.evidence.substr(error.character);
                str = str.charAt(str.search(/\S/));
                if (maxErrorLevel == "error" && str && /[\w\d***REMOVED***(['"]/.test(str)) ***REMOVED***
                    error.reason = 'Missing ";" before statement';
                    type = "error";
            ***REMOVED*** else ***REMOVED***
                    type = "info";
            ***REMOVED***
        ***REMOVED***
            else if (disabledWarningsRe.test(raw)) ***REMOVED***
                continue;
        ***REMOVED***
            else if (infoRe.test(raw)) ***REMOVED***
                type = "info"
        ***REMOVED***
            else if (errorsRe.test(raw)) ***REMOVED***
                errorAdded  = true;
                type = maxErrorLevel;
        ***REMOVED***
            else if (raw == "'***REMOVED***a***REMOVED***' is not defined.") ***REMOVED***
                type = "warning";
        ***REMOVED***
            else if (raw == "'***REMOVED***a***REMOVED***' is defined but never used.") ***REMOVED***
                type = "info";
        ***REMOVED***

            errors.push(***REMOVED***
                row: error.line-1,
                column: error.character-1,
                text: error.reason,
                type: type,
                raw: raw
        ***REMOVED***);

            if (errorAdded) ***REMOVED***
        ***REMOVED***
    ***REMOVED***

        this.sender.emit("jslint", errors);
***REMOVED***;

***REMOVED***).call(JavaScriptWorker.prototype);

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
define('ace/mode/javascript/jshint', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***
module.exports = (function e(t,n,r)***REMOVED***function s(o,u)***REMOVED***if(!n[o])***REMOVED***if(!t[o])***REMOVED***var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")***REMOVED***var f=n[o]=***REMOVED***exports:***REMOVED******REMOVED******REMOVED***;t[o][0].call(f.exports,function(e)***REMOVED***var n=t[o][1][e];return s(n?n:e)***REMOVED***,f,f.exports,e,t,n,r)***REMOVED***return n[o].exports***REMOVED***var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s***REMOVED***)(***REMOVED***
1:[function(_dereq_,module,exports)***REMOVED***
var identifierStartTable = [];

for (var i = 0; i < 128; i++) ***REMOVED***
  identifierStartTable[i] =
    i === 36 ||           // $
    i >= 65 && i <= 90 || // A-Z
    i === 95 ||           // _
    i >= 97 && i <= 122;  // a-z
***REMOVED***

var identifierPartTable = [];

for (var i = 0; i < 128; i++) ***REMOVED***
  identifierPartTable[i] =
    identifierStartTable[i] || // $, _, A-Z, a-z
    i >= 48 && i <= 57;        // 0-9
***REMOVED***

module.exports = ***REMOVED***
  asciiIdentifierStartTable: identifierStartTable,
  asciiIdentifierPartTable: identifierPartTable
***REMOVED***;

***REMOVED***,
***REMOVED******REMOVED***],
2:[function(_dereq_,module,exports)***REMOVED***

(function() ***REMOVED***
  var root = this;
  var previousUnderscore = root._;
  var breaker = ***REMOVED******REMOVED***;
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;
  var push             = ArrayProto.push,
      slice            = ArrayProto.slice,
      concat           = ArrayProto.concat,
      toString         = ObjProto.toString,
      hasOwnProperty   = ObjProto.hasOwnProperty;
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;
  var _ = function(obj) ***REMOVED***
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  ***REMOVED***;
  if (typeof exports !== 'undefined') ***REMOVED***
    if (typeof module !== 'undefined' && module.exports) ***REMOVED***
      exports = module.exports = _;
***REMOVED***
    exports._ = _;
  ***REMOVED*** else ***REMOVED***
    root._ = _;
  ***REMOVED***
  _.VERSION = '1.4.4';
  var each = _.each = _.forEach = function(obj, iterator, context) ***REMOVED***
    if (obj == null) return;
    if (nativeForEach && obj.forEach === nativeForEach) ***REMOVED***
      obj.forEach(iterator, context);
***REMOVED*** else if (obj.length === +obj.length) ***REMOVED***
      for (var i = 0, l = obj.length; i < l; i++) ***REMOVED***
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
  ***REMOVED***
***REMOVED*** else ***REMOVED***
      for (var key in obj) ***REMOVED***
        if (_.has(obj, key)) ***REMOVED***
          if (iterator.call(context, obj[key], key, obj) === breaker) return;
    ***REMOVED***
  ***REMOVED***
***REMOVED***
  ***REMOVED***;
  _.map = _.collect = function(obj, iterator, context) ***REMOVED***
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) ***REMOVED***
      results[results.length] = iterator.call(context, value, index, list);
***REMOVED***);
    return results;
  ***REMOVED***;

  var reduceError = 'Reduce of empty array with no initial value';
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) ***REMOVED***
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) ***REMOVED***
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
***REMOVED***
    each(obj, function(value, index, list) ***REMOVED***
      if (!initial) ***REMOVED***
        memo = value;
        initial = true;
  ***REMOVED*** else ***REMOVED***
        memo = iterator.call(context, memo, value, index, list);
  ***REMOVED***
***REMOVED***);
    if (!initial) throw new TypeError(reduceError);
    return memo;
  ***REMOVED***;
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) ***REMOVED***
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) ***REMOVED***
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
***REMOVED***
    var length = obj.length;
    if (length !== +length) ***REMOVED***
      var keys = _.keys(obj);
      length = keys.length;
***REMOVED***
    each(obj, function(value, index, list) ***REMOVED***
      index = keys ? keys[--length] : --length;
      if (!initial) ***REMOVED***
        memo = obj[index];
        initial = true;
  ***REMOVED*** else ***REMOVED***
        memo = iterator.call(context, memo, obj[index], index, list);
  ***REMOVED***
***REMOVED***);
    if (!initial) throw new TypeError(reduceError);
    return memo;
  ***REMOVED***;
  _.find = _.detect = function(obj, iterator, context) ***REMOVED***
    var result;
    any(obj, function(value, index, list) ***REMOVED***
      if (iterator.call(context, value, index, list)) ***REMOVED***
        result = value;
        return true;
  ***REMOVED***
***REMOVED***);
    return result;
  ***REMOVED***;
  _.filter = _.select = function(obj, iterator, context) ***REMOVED***
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);
    each(obj, function(value, index, list) ***REMOVED***
      if (iterator.call(context, value, index, list)) results[results.length] = value;
***REMOVED***);
    return results;
  ***REMOVED***;
  _.reject = function(obj, iterator, context) ***REMOVED***
    return _.filter(obj, function(value, index, list) ***REMOVED***
      return !iterator.call(context, value, index, list);
***REMOVED*** context);
  ***REMOVED***;
  _.every = _.all = function(obj, iterator, context) ***REMOVED***
    iterator || (iterator = _.identity);
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(iterator, context);
    each(obj, function(value, index, list) ***REMOVED***
      if (!(result = result && iterator.call(context, value, index, list))) return breaker;
***REMOVED***);
    return !!result;
  ***REMOVED***;
  var any = _.some = _.any = function(obj, iterator, context) ***REMOVED***
    iterator || (iterator = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(iterator, context);
    each(obj, function(value, index, list) ***REMOVED***
      if (result || (result = iterator.call(context, value, index, list))) return breaker;
***REMOVED***);
    return !!result;
  ***REMOVED***;
  _.contains = _.include = function(obj, target) ***REMOVED***
    if (obj == null) return false;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    return any(obj, function(value) ***REMOVED***
      return value === target;
***REMOVED***);
  ***REMOVED***;
  _.invoke = function(obj, method) ***REMOVED***
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) ***REMOVED***
      return (isFunc ? method : value[method]).apply(value, args);
***REMOVED***);
  ***REMOVED***;
  _.pluck = function(obj, key) ***REMOVED***
    return _.map(obj, function(value)***REMOVED*** return value[key]; ***REMOVED***);
  ***REMOVED***;
  _.where = function(obj, attrs, first) ***REMOVED***
    if (_.isEmpty(attrs)) return first ? null : [];
    return _[first ? 'find' : 'filter'](obj, function(value) ***REMOVED***
      for (var key in attrs) ***REMOVED***
        if (attrs[key] !== value[key]) return false;
  ***REMOVED***
      return true;
***REMOVED***);
  ***REMOVED***;
  _.findWhere = function(obj, attrs) ***REMOVED***
    return _.where(obj, attrs, true);
  ***REMOVED***;
  _.max = function(obj, iterator, context) ***REMOVED***
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) ***REMOVED***
      return Math.max.apply(Math, obj);
***REMOVED***
    if (!iterator && _.isEmpty(obj)) return -Infinity;
    var result = ***REMOVED***computed : -Infinity, value: -Infinity***REMOVED***;
    each(obj, function(value, index, list) ***REMOVED***
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed >= result.computed && (result = ***REMOVED***value : value, computed : computed***REMOVED***);
***REMOVED***);
    return result.value;
  ***REMOVED***;
  _.min = function(obj, iterator, context) ***REMOVED***
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) ***REMOVED***
      return Math.min.apply(Math, obj);
***REMOVED***
    if (!iterator && _.isEmpty(obj)) return Infinity;
    var result = ***REMOVED***computed : Infinity, value: Infinity***REMOVED***;
    each(obj, function(value, index, list) ***REMOVED***
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed < result.computed && (result = ***REMOVED***value : value, computed : computed***REMOVED***);
***REMOVED***);
    return result.value;
  ***REMOVED***;
  _.shuffle = function(obj) ***REMOVED***
    var rand;
    var index = 0;
    var shuffled = [];
    each(obj, function(value) ***REMOVED***
      rand = _.random(index++);
      shuffled[index - 1] = shuffled[rand];
      shuffled[rand] = value;
***REMOVED***);
    return shuffled;
  ***REMOVED***;
  var lookupIterator = function(value) ***REMOVED***
    return _.isFunction(value) ? value : function(obj)***REMOVED*** return obj[value]; ***REMOVED***;
  ***REMOVED***;
  _.sortBy = function(obj, value, context) ***REMOVED***
    var iterator = lookupIterator(value);
    return _.pluck(_.map(obj, function(value, index, list) ***REMOVED***
      return ***REMOVED***
        value : value,
        index : index,
        criteria : iterator.call(context, value, index, list)
  ***REMOVED***;
***REMOVED***).sort(function(left, right) ***REMOVED***
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) ***REMOVED***
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
  ***REMOVED***
      return left.index < right.index ? -1 : 1;
***REMOVED***), 'value');
  ***REMOVED***;
  var group = function(obj, value, context, behavior) ***REMOVED***
    var result = ***REMOVED******REMOVED***;
    var iterator = lookupIterator(value || _.identity);
    each(obj, function(value, index) ***REMOVED***
      var key = iterator.call(context, value, index, obj);
      behavior(result, key, value);
***REMOVED***);
    return result;
  ***REMOVED***;
  _.groupBy = function(obj, value, context) ***REMOVED***
    return group(obj, value, context, function(result, key, value) ***REMOVED***
      (_.has(result, key) ? result[key] : (result[key] = [])).push(value);
***REMOVED***);
  ***REMOVED***;
  _.countBy = function(obj, value, context) ***REMOVED***
    return group(obj, value, context, function(result, key) ***REMOVED***
      if (!_.has(result, key)) result[key] = 0;
      result[key]++;
***REMOVED***);
  ***REMOVED***;
  _.sortedIndex = function(array, obj, iterator, context) ***REMOVED***
    iterator = iterator == null ? _.identity : lookupIterator(iterator);
    var value = iterator.call(context, obj);
    var low = 0, high = array.length;
    while (low < high) ***REMOVED***
      var mid = (low + high) >>> 1;
      iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid;
***REMOVED***
    return low;
  ***REMOVED***;
  _.toArray = function(obj) ***REMOVED***
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  ***REMOVED***;
  _.size = function(obj) ***REMOVED***
    if (obj == null) return 0;
    return (obj.length === +obj.length) ? obj.length : _.keys(obj).length;
  ***REMOVED***;
  _.first = _.head = _.take = function(array, n, guard) ***REMOVED***
    if (array == null) return void 0;
    return (n != null) && !guard ? slice.call(array, 0, n) : array[0];
  ***REMOVED***;
  _.initial = function(array, n, guard) ***REMOVED***
    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
  ***REMOVED***;
  _.last = function(array, n, guard) ***REMOVED***
    if (array == null) return void 0;
    if ((n != null) && !guard) ***REMOVED***
      return slice.call(array, Math.max(array.length - n, 0));
***REMOVED*** else ***REMOVED***
      return array[array.length - 1];
***REMOVED***
  ***REMOVED***;
  _.rest = _.tail = _.drop = function(array, n, guard) ***REMOVED***
    return slice.call(array, (n == null) || guard ? 1 : n);
  ***REMOVED***;
  _.compact = function(array) ***REMOVED***
    return _.filter(array, _.identity);
  ***REMOVED***;
  var flatten = function(input, shallow, output) ***REMOVED***
    each(input, function(value) ***REMOVED***
      if (_.isArray(value)) ***REMOVED***
        shallow ? push.apply(output, value) : flatten(value, shallow, output);
  ***REMOVED*** else ***REMOVED***
        output.push(value);
  ***REMOVED***
***REMOVED***);
    return output;
  ***REMOVED***;
  _.flatten = function(array, shallow) ***REMOVED***
    return flatten(array, shallow, []);
  ***REMOVED***;
  _.without = function(array) ***REMOVED***
    return _.difference(array, slice.call(arguments, 1));
  ***REMOVED***;
  _.uniq = _.unique = function(array, isSorted, iterator, context) ***REMOVED***
    if (_.isFunction(isSorted)) ***REMOVED***
      context = iterator;
      iterator = isSorted;
      isSorted = false;
***REMOVED***
    var initial = iterator ? _.map(array, iterator, context) : array;
    var results = [];
    var seen = [];
    each(initial, function(value, index) ***REMOVED***
      if (isSorted ? (!index || seen[seen.length - 1] !== value) : !_.contains(seen, value)) ***REMOVED***
        seen.push(value);
        results.push(array[index]);
  ***REMOVED***
***REMOVED***);
    return results;
  ***REMOVED***;
  _.union = function() ***REMOVED***
    return _.uniq(concat.apply(ArrayProto, arguments));
  ***REMOVED***;
  _.intersection = function(array) ***REMOVED***
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) ***REMOVED***
      return _.every(rest, function(other) ***REMOVED***
        return _.indexOf(other, item) >= 0;
  ***REMOVED***);
***REMOVED***);
  ***REMOVED***;
  _.difference = function(array) ***REMOVED***
    var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
    return _.filter(array, function(value)***REMOVED*** return !_.contains(rest, value); ***REMOVED***);
  ***REMOVED***;
  _.zip = function() ***REMOVED***
    var args = slice.call(arguments);
    var length = _.max(_.pluck(args, 'length'));
    var results = new Array(length);
    for (var i = 0; i < length; i++) ***REMOVED***
      results[i] = _.pluck(args, "" + i);
***REMOVED***
    return results;
  ***REMOVED***;
  _.object = function(list, values) ***REMOVED***
    if (list == null) return ***REMOVED******REMOVED***;
    var result = ***REMOVED******REMOVED***;
    for (var i = 0, l = list.length; i < l; i++) ***REMOVED***
      if (values) ***REMOVED***
        result[list[i]] = values[i];
  ***REMOVED*** else ***REMOVED***
        result[list[i][0]] = list[i][1];
  ***REMOVED***
***REMOVED***
    return result;
  ***REMOVED***;
  _.indexOf = function(array, item, isSorted) ***REMOVED***
    if (array == null) return -1;
    var i = 0, l = array.length;
    if (isSorted) ***REMOVED***
      if (typeof isSorted == 'number') ***REMOVED***
        i = (isSorted < 0 ? Math.max(0, l + isSorted) : isSorted);
  ***REMOVED*** else ***REMOVED***
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
  ***REMOVED***
***REMOVED***
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
    for (; i < l; i++) if (array[i] === item) return i;
    return -1;
  ***REMOVED***;
  _.lastIndexOf = function(array, item, from) ***REMOVED***
    if (array == null) return -1;
    var hasIndex = from != null;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) ***REMOVED***
      return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
***REMOVED***
    var i = (hasIndex ? from : array.length);
    while (i--) if (array[i] === item) return i;
    return -1;
  ***REMOVED***;
  _.range = function(start, stop, step) ***REMOVED***
    if (arguments.length <= 1) ***REMOVED***
      stop = start || 0;
      start = 0;
***REMOVED***
    step = arguments[2] || 1;

    var len = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(len);

    while(idx < len) ***REMOVED***
      range[idx++] = start;
      start += step;
***REMOVED***

    return range;
  ***REMOVED***;
  _.bind = function(func, context) ***REMOVED***
    if (func.bind === nativeBind && nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    var args = slice.call(arguments, 2);
    return function() ***REMOVED***
      return func.apply(context, args.concat(slice.call(arguments)));
***REMOVED***;
  ***REMOVED***;
  _.partial = function(func) ***REMOVED***
    var args = slice.call(arguments, 1);
    return function() ***REMOVED***
      return func.apply(this, args.concat(slice.call(arguments)));
***REMOVED***;
  ***REMOVED***;
  _.bindAll = function(obj) ***REMOVED***
    var funcs = slice.call(arguments, 1);
    if (funcs.length === 0) funcs = _.functions(obj);
    each(funcs, function(f) ***REMOVED*** obj[f] = _.bind(obj[f], obj); ***REMOVED***);
    return obj;
  ***REMOVED***;
  _.memoize = function(func, hasher) ***REMOVED***
    var memo = ***REMOVED******REMOVED***;
    hasher || (hasher = _.identity);
    return function() ***REMOVED***
      var key = hasher.apply(this, arguments);
      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
***REMOVED***;
  ***REMOVED***;
  _.delay = function(func, wait) ***REMOVED***
    var args = slice.call(arguments, 2);
    return setTimeout(function()***REMOVED*** return func.apply(null, args); ***REMOVED***, wait);
  ***REMOVED***;
  _.defer = function(func) ***REMOVED***
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  ***REMOVED***;
  _.throttle = function(func, wait) ***REMOVED***
    var context, args, timeout, result;
    var previous = 0;
    var later = function() ***REMOVED***
      previous = new Date;
      timeout = null;
      result = func.apply(context, args);
***REMOVED***;
    return function() ***REMOVED***
      var now = new Date;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) ***REMOVED***
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
  ***REMOVED*** else if (!timeout) ***REMOVED***
        timeout = setTimeout(later, remaining);
  ***REMOVED***
      return result;
***REMOVED***;
  ***REMOVED***;
  _.debounce = function(func, wait, immediate) ***REMOVED***
    var timeout, result;
    return function() ***REMOVED***
      var context = this, args = arguments;
      var later = function() ***REMOVED***
        timeout = null;
        if (!immediate) result = func.apply(context, args);
  ***REMOVED***;
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) result = func.apply(context, args);
      return result;
***REMOVED***;
  ***REMOVED***;
  _.once = function(func) ***REMOVED***
    var ran = false, memo;
    return function() ***REMOVED***
      if (ran) return memo;
      ran = true;
      memo = func.apply(this, arguments);
      func = null;
      return memo;
***REMOVED***;
  ***REMOVED***;
  _.wrap = function(func, wrapper) ***REMOVED***
    return function() ***REMOVED***
      var args = [func];
      push.apply(args, arguments);
      return wrapper.apply(this, args);
***REMOVED***;
  ***REMOVED***;
  _.compose = function() ***REMOVED***
    var funcs = arguments;
    return function() ***REMOVED***
      var args = arguments;
      for (var i = funcs.length - 1; i >= 0; i--) ***REMOVED***
        args = [funcs[i].apply(this, args)];
  ***REMOVED***
      return args[0];
***REMOVED***;
  ***REMOVED***;
  _.after = function(times, func) ***REMOVED***
    if (times <= 0) return func();
    return function() ***REMOVED***
      if (--times < 1) ***REMOVED***
        return func.apply(this, arguments);
  ***REMOVED***
***REMOVED***;
  ***REMOVED***;
  _.keys = nativeKeys || function(obj) ***REMOVED***
    if (obj !== Object(obj)) throw new TypeError('Invalid object');
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys[keys.length] = key;
    return keys;
  ***REMOVED***;
  _.values = function(obj) ***REMOVED***
    var values = [];
    for (var key in obj) if (_.has(obj, key)) values.push(obj[key]);
    return values;
  ***REMOVED***;
  _.pairs = function(obj) ***REMOVED***
    var pairs = [];
    for (var key in obj) if (_.has(obj, key)) pairs.push([key, obj[key]]);
    return pairs;
  ***REMOVED***;
  _.invert = function(obj) ***REMOVED***
    var result = ***REMOVED******REMOVED***;
    for (var key in obj) if (_.has(obj, key)) result[obj[key]] = key;
    return result;
  ***REMOVED***;
  _.functions = _.methods = function(obj) ***REMOVED***
    var names = [];
    for (var key in obj) ***REMOVED***
      if (_.isFunction(obj[key])) names.push(key);
***REMOVED***
    return names.sort();
  ***REMOVED***;
  _.extend = function(obj) ***REMOVED***
    each(slice.call(arguments, 1), function(source) ***REMOVED***
      if (source) ***REMOVED***
        for (var prop in source) ***REMOVED***
          obj[prop] = source[prop];
    ***REMOVED***
  ***REMOVED***
***REMOVED***);
    return obj;
  ***REMOVED***;
  _.pick = function(obj) ***REMOVED***
    var copy = ***REMOVED******REMOVED***;
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    each(keys, function(key) ***REMOVED***
      if (key in obj) copy[key] = obj[key];
***REMOVED***);
    return copy;
  ***REMOVED***;
  _.omit = function(obj) ***REMOVED***
    var copy = ***REMOVED******REMOVED***;
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    for (var key in obj) ***REMOVED***
      if (!_.contains(keys, key)) copy[key] = obj[key];
***REMOVED***
    return copy;
  ***REMOVED***;
  _.defaults = function(obj) ***REMOVED***
    each(slice.call(arguments, 1), function(source) ***REMOVED***
      if (source) ***REMOVED***
        for (var prop in source) ***REMOVED***
          if (obj[prop] == null) obj[prop] = source[prop];
    ***REMOVED***
  ***REMOVED***
***REMOVED***);
    return obj;
  ***REMOVED***;
  _.clone = function(obj) ***REMOVED***
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend(***REMOVED******REMOVED***, obj);
  ***REMOVED***;
  _.tap = function(obj, interceptor) ***REMOVED***
    interceptor(obj);
    return obj;
  ***REMOVED***;
  var eq = function(a, b, aStack, bStack) ***REMOVED***
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    if (a == null || b == null) return a === b;
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) ***REMOVED***
      case '[object String]':
        return a == String(b);
      case '[object Number]':
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        return +a == +b;
      case '[object RegExp]':
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
***REMOVED***
    if (typeof a != 'object' || typeof b != 'object') return false;
    var length = aStack.length;
    while (length--) ***REMOVED***
      if (aStack[length] == a) return bStack[length] == b;
***REMOVED***
    aStack.push(a);
    bStack.push(b);
    var size = 0, result = true;
    if (className == '[object Array]') ***REMOVED***
      size = a.length;
      result = size == b.length;
      if (result) ***REMOVED***
        while (size--) ***REMOVED***
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
    ***REMOVED***
  ***REMOVED***
***REMOVED*** else ***REMOVED***
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(_.isFunction(aCtor) && (aCtor instanceof aCtor) &&
                               _.isFunction(bCtor) && (bCtor instanceof bCtor))) ***REMOVED***
        return false;
  ***REMOVED***
      for (var key in a) ***REMOVED***
        if (_.has(a, key)) ***REMOVED***
          size++;
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
    ***REMOVED***
  ***REMOVED***
      if (result) ***REMOVED***
        for (key in b) ***REMOVED***
          if (_.has(b, key) && !(size--)) break;
    ***REMOVED***
        result = !size;
  ***REMOVED***
***REMOVED***
    aStack.pop();
    bStack.pop();
    return result;
  ***REMOVED***;
  _.isEqual = function(a, b) ***REMOVED***
    return eq(a, b, [], []);
  ***REMOVED***;
  _.isEmpty = function(obj) ***REMOVED***
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  ***REMOVED***;
  _.isElement = function(obj) ***REMOVED***
    return !!(obj && obj.nodeType === 1);
  ***REMOVED***;
  _.isArray = nativeIsArray || function(obj) ***REMOVED***
    return toString.call(obj) == '[object Array]';
  ***REMOVED***;
  _.isObject = function(obj) ***REMOVED***
    return obj === Object(obj);
  ***REMOVED***;
  each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) ***REMOVED***
    _['is' + name] = function(obj) ***REMOVED***
      return toString.call(obj) == '[object ' + name + ']';
***REMOVED***;
  ***REMOVED***);
  if (!_.isArguments(arguments)) ***REMOVED***
    _.isArguments = function(obj) ***REMOVED***
      return !!(obj && _.has(obj, 'callee'));
***REMOVED***;
  ***REMOVED***
  if (typeof (/./) !== 'function') ***REMOVED***
    _.isFunction = function(obj) ***REMOVED***
      return typeof obj === 'function';
***REMOVED***;
  ***REMOVED***
  _.isFinite = function(obj) ***REMOVED***
    return isFinite(obj) && !isNaN(parseFloat(obj));
  ***REMOVED***;
  _.isNaN = function(obj) ***REMOVED***
    return _.isNumber(obj) && obj != +obj;
  ***REMOVED***;
  _.isBoolean = function(obj) ***REMOVED***
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  ***REMOVED***;
  _.isNull = function(obj) ***REMOVED***
    return obj === null;
  ***REMOVED***;
  _.isUndefined = function(obj) ***REMOVED***
    return obj === void 0;
  ***REMOVED***;
  _.has = function(obj, key) ***REMOVED***
    return hasOwnProperty.call(obj, key);
  ***REMOVED***;
  _.noConflict = function() ***REMOVED***
    root._ = previousUnderscore;
    return this;
  ***REMOVED***;
  _.identity = function(value) ***REMOVED***
    return value;
  ***REMOVED***;
  _.times = function(n, iterator, context) ***REMOVED***
    var accum = Array(n);
    for (var i = 0; i < n; i++) accum[i] = iterator.call(context, i);
    return accum;
  ***REMOVED***;
  _.random = function(min, max) ***REMOVED***
    if (max == null) ***REMOVED***
      max = min;
      min = 0;
***REMOVED***
    return min + Math.floor(Math.random() * (max - min + 1));
  ***REMOVED***;
  var entityMap = ***REMOVED***
    escape: ***REMOVED***
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '/': '&#x2F;'
***REMOVED***
  ***REMOVED***;
  entityMap.unescape = _.invert(entityMap.escape);
  var entityRegexes = ***REMOVED***
    escape:   new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g'),
    unescape: new RegExp('(' + _.keys(entityMap.unescape).join('|') + ')', 'g')
  ***REMOVED***;
  _.each(['escape', 'unescape'], function(method) ***REMOVED***
    _[method] = function(string) ***REMOVED***
      if (string == null) return '';
      return ('' + string).replace(entityRegexes[method], function(match) ***REMOVED***
        return entityMap[method][match];
  ***REMOVED***);
***REMOVED***;
  ***REMOVED***);
  _.result = function(object, property) ***REMOVED***
    if (object == null) return null;
    var value = object[property];
    return _.isFunction(value) ? value.call(object) : value;
  ***REMOVED***;
  _.mixin = function(obj) ***REMOVED***
    each(_.functions(obj), function(name)***REMOVED***
      var func = _[name] = obj[name];
      _.prototype[name] = function() ***REMOVED***
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
  ***REMOVED***;
***REMOVED***);
  ***REMOVED***;
  var idCounter = 0;
  _.uniqueId = function(prefix) ***REMOVED***
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  ***REMOVED***;
  _.templateSettings = ***REMOVED***
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  ***REMOVED***;
  var noMatch = /(.)^/;
  var escapes = ***REMOVED***
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\t':     't',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  ***REMOVED***;

  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;
  _.template = function(text, data, settings) ***REMOVED***
    var render;
    settings = _.defaults(***REMOVED******REMOVED***, settings, _.templateSettings);
    var matcher = new RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) ***REMOVED***
      source += text.slice(index, offset)
        .replace(escaper, function(match) ***REMOVED*** return '\\' + escapes[match]; ***REMOVED***);

      if (escape) ***REMOVED***
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
  ***REMOVED***
      if (interpolate) ***REMOVED***
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
  ***REMOVED***
      if (evaluate) ***REMOVED***
        source += "';\n" + evaluate + "\n__p+='";
  ***REMOVED***
      index = offset + match.length;
      return match;
***REMOVED***);
    source += "';\n";
    if (!settings.variable) source = 'with(obj||***REMOVED******REMOVED***)***REMOVED***\n' + source + '***REMOVED***\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function()***REMOVED***__p+=__j.call(arguments,'');***REMOVED***;\n" +
      source + "return __p;\n";

    try ***REMOVED***
      render = new Function(settings.variable || 'obj', '_', source);
***REMOVED*** catch (e) ***REMOVED***
      e.source = source;
      throw e;
***REMOVED***

    if (data) return render(data, _);
    var template = function(data) ***REMOVED***
      return render.call(this, data, _);
***REMOVED***;
    template.source = 'function(' + (settings.variable || 'obj') + ')***REMOVED***\n' + source + '***REMOVED***';

    return template;
  ***REMOVED***;
  _.chain = function(obj) ***REMOVED***
    return _(obj).chain();
  ***REMOVED***;
  var result = function(obj) ***REMOVED***
    return this._chain ? _(obj).chain() : obj;
  ***REMOVED***;
  _.mixin(_);
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) ***REMOVED***
    var method = ArrayProto[name];
    _.prototype[name] = function() ***REMOVED***
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name == 'shift' || name == 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
***REMOVED***;
  ***REMOVED***);
  each(['concat', 'join', 'slice'], function(name) ***REMOVED***
    var method = ArrayProto[name];
    _.prototype[name] = function() ***REMOVED***
      return result.call(this, method.apply(this._wrapped, arguments));
***REMOVED***;
  ***REMOVED***);

  _.extend(_.prototype, ***REMOVED***
    chain: function() ***REMOVED***
      this._chain = true;
      return this;
***REMOVED***
    value: function() ***REMOVED***
      return this._wrapped;
***REMOVED***

  ***REMOVED***);

***REMOVED***).call(this);

***REMOVED***,
***REMOVED******REMOVED***],
3:[function(_dereq_,module,exports)***REMOVED***

var _        = _dereq_("underscore");
var events   = _dereq_("events");
var vars     = _dereq_("./vars.js");
var messages = _dereq_("./messages.js");
var Lexer    = _dereq_("./lex.js").Lexer;
var reg      = _dereq_("./reg.js");
var state    = _dereq_("./state.js").state;
var style    = _dereq_("./style.js");

var JSHINT = (function () ***REMOVED***
  

  var anonname, // The guessed name for anonymous functions.
    api, // Extension API
    bang = ***REMOVED***
      "<"  : true,
      "<=" : true,
      "==" : true,
      "===": true,
      "!==": true,
      "!=" : true,
      ">"  : true,
      ">=" : true,
      "+"  : true,
      "-"  : true,
      "*"  : true,
      "/"  : true,
      "%"  : true
***REMOVED***
    boolOptions = ***REMOVED***
      asi         : true, // if automatic semicolon insertion should be tolerated
      bitwise     : true, // if bitwise operators should not be allowed
      boss        : true, // if advanced usage of assignments should be allowed
      browser     : true, // if the standard browser globals should be predefined
      camelcase   : true, // if identifiers should be required in camel case
      couch       : true, // if CouchDB globals should be predefined
      curly       : true, // if curly braces around all blocks should be required
      debug       : true, // if debugger statements should be allowed
      devel       : true, // if logging globals should be predefined (console, alert, etc.)
      dojo        : true, // if Dojo Toolkit globals should be predefined
      eqeqeq      : true, // if === should be required
      eqnull      : true, // if == null comparisons should be tolerated
      notypeof    : true, // if should report typos in typeof comparisons
      es3         : true, // if ES3 syntax should be allowed
      es5         : true, // if ES5 syntax should be allowed (is now set per default)
      esnext      : true, // if es.next specific syntax should be allowed
      moz         : true, // if mozilla specific syntax should be allowed
      evil        : true, // if eval should be allowed
      expr        : true, // if ExpressionStatement should be allowed as Programs
      forin       : true, // if for in statements must filter
      funcscope   : true, // if only function scope should be used for scope tests
      globalstrict: true, // if global  should be allowed (also enables 'strict')
      immed       : true, // if immediate invocations must be wrapped in parens
      iterator    : true, // if the `__iterator__` property should be allowed
      jquery      : true, // if jQuery globals should be predefined
      lastsemic   : true, // if semicolons may be ommitted for the trailing
      laxbreak    : true, // if line breaks should not be checked
      laxcomma    : true, // if line breaks should not be checked around commas
      loopfunc    : true, // if functions should be allowed to be defined within
      mootools    : true, // if MooTools globals should be predefined
      multistr    : true, // allow multiline strings
      freeze      : true, // if modifying native object prototypes should be disallowed
      newcap      : true, // if constructor names must be capitalized
      noarg       : true, // if arguments.caller and arguments.callee should be
      node        : true, // if the Node.js environment globals should be
      noempty     : true, // if empty blocks should be disallowed
      nonbsp      : true, // if non-breaking spaces should be disallowed
      nonew       : true, // if using `new` for side-effects should be disallowed
      nonstandard : true, // if non-standard (but widely adopted) globals should
      phantom     : true, // if PhantomJS symbols should be allowed
      plusplus    : true, // if increment/decrement should not be allowed
      proto       : true, // if the `__proto__` property should be allowed
      prototypejs : true, // if Prototype and Scriptaculous globals should be
      rhino       : true, // if the Rhino environment globals should be predefined
      shelljs     : true, // if ShellJS globals should be predefined
      typed       : true, // if typed array globals should be predefined
      undef       : true, // if variables should be declared before used
      scripturl   : true, // if script-targeted URLs should be tolerated
      strict      : true, // require the  pragma
      sub         : true, // if all forms of subscript notation are tolerated
      supernew    : true, // if `new function () ***REMOVED*** ... ***REMOVED***;` and `new Object;`
      validthis   : true, // if 'this' inside a non-constructor function is valid.
      withstmt    : true, // if with statements should be allowed
      worker      : true, // if Web Worker script symbols should be allowed
      wsh         : true, // if the Windows Scripting Host environment globals
      yui         : true, // YUI variables should be predefined
      mocha       : true, // Mocha functions should be predefined
      noyield     : true, // allow generators without a yield
      onecase     : true, // if one case switch statements should be allowed
      regexp      : true, // if the . should not be allowed in regexp literals
      regexdash   : true  // if unescaped first/last dash (-) inside brackets
***REMOVED***
    valOptions = ***REMOVED***
      maxlen       : false,
      indent       : false,
      maxerr       : false,
      predef       : false, // predef is deprecated and being replaced by globals
      globals      : false,
      quotmark     : false, // 'single'|'double'|true
      scope        : false,
      maxstatements: false, // ***REMOVED***int***REMOVED*** max statements per function
      maxdepth     : false, // ***REMOVED***int***REMOVED*** max nested block depth per function
      maxparams    : false, // ***REMOVED***int***REMOVED*** max params per function
      maxcomplexity: false, // ***REMOVED***int***REMOVED*** max cyclomatic complexity per function
      shadow       : false, // if variable shadowing should be tolerated
      unused       : true,  // warn if variables are unused. Available options:
      latedef      : false, // warn if the variable is used before its definition
      ignore       : false  // start/end ignoring lines of code, bypassing the lexer
***REMOVED***
    invertedOptions = ***REMOVED***
      bitwise : true,
      forin   : true,
      newcap  : true,
      plusplus: true,
      regexp  : true,
      undef   : true,
      eqeqeq  : true,
      strict  : true
***REMOVED***
    renamedOptions = ***REMOVED***
      eqeq   : "eqeqeq",
      windows: "wsh",
      sloppy : "strict"
***REMOVED***

    removedOptions = ***REMOVED***
      nomen: true,
      onevar: true,
      passfail: true,
      white: true,
      gcl: true,
      smarttabs: true,
      trailing: true
***REMOVED***

    declared, // Globals that were declared using /*global ... */ syntax.
    exported, // Variables that are used outside of the current file.

    functionicity = [
      "closure", "exception", "global", "label",
      "outer", "unused", "var"
    ],

    funct, // The current function
    functions, // All of the functions

    global, // The global scope
    implied, // Implied globals
    inblock,
    indent,
    lookahead,
    lex,
    member,
    membersOnly,
    noreach,
    predefined,    // Global variables defined by option

    scope,  // The current scope
    stack,
    unuseds,
    urls,

    extraModules = [],
    emitter = new events.EventEmitter();

  function checkOption(name, t) ***REMOVED***
    name = name.trim();

    if (/^[+-]W\d***REMOVED***3***REMOVED***$/g.test(name)) ***REMOVED***
      return true;
***REMOVED***

    if (valOptions[name] === undefined && boolOptions[name] === undefined) ***REMOVED***
      if (t.type !== "jslint" && !removedOptions[name]) ***REMOVED***
        error("E001", t, name);
        return false;
  ***REMOVED***
***REMOVED***

    return true;
  ***REMOVED***

  function isString(obj) ***REMOVED***
    return Object.prototype.toString.call(obj) === "[object String]";
  ***REMOVED***

  function isIdentifier(tkn, value) ***REMOVED***
    if (!tkn)
      return false;

    if (!tkn.identifier || tkn.value !== value)
      return false;

    return true;
  ***REMOVED***

  function isReserved(token) ***REMOVED***
    if (!token.reserved) ***REMOVED***
      return false;
***REMOVED***
    var meta = token.meta;

    if (meta && meta.isFutureReservedWord && state.option.inES5()) ***REMOVED***
      if (!meta.es5) ***REMOVED***
        return false;
  ***REMOVED***
      if (meta.strictOnly) ***REMOVED***
        if (!state.option.strict && !state.directive["use strict"]) ***REMOVED***
          return false;
    ***REMOVED***
  ***REMOVED***

      if (token.isProperty) ***REMOVED***
        return false;
  ***REMOVED***
***REMOVED***

    return true;
  ***REMOVED***

  function supplant(str, data) ***REMOVED***
    return str.replace(/\***REMOVED***([^***REMOVED******REMOVED***]*)\***REMOVED***/g, function (a, b) ***REMOVED***
      var r = data[b];
      return typeof r === "string" || typeof r === "number" ? r : a;
***REMOVED***);
  ***REMOVED***

  function combine(dest, src) ***REMOVED***
    Object.keys(src).forEach(function (name) ***REMOVED***
      if (JSHINT.blacklist.hasOwnProperty(name)) return;
      dest[name] = src[name];
***REMOVED***);
  ***REMOVED***

  function assume() ***REMOVED***
    if (state.option.esnext) ***REMOVED***
      combine(predefined, vars.newEcmaIdentifiers);
***REMOVED***

    if (state.option.couch) ***REMOVED***
      combine(predefined, vars.couch);
***REMOVED***

    if (state.option.rhino) ***REMOVED***
      combine(predefined, vars.rhino);
***REMOVED***

    if (state.option.shelljs) ***REMOVED***
      combine(predefined, vars.shelljs);
      combine(predefined, vars.node);
***REMOVED***
    if (state.option.typed) ***REMOVED***
      combine(predefined, vars.typed);
***REMOVED***

    if (state.option.phantom) ***REMOVED***
      combine(predefined, vars.phantom);
***REMOVED***

    if (state.option.prototypejs) ***REMOVED***
      combine(predefined, vars.prototypejs);
***REMOVED***

    if (state.option.node) ***REMOVED***
      combine(predefined, vars.node);
      combine(predefined, vars.typed);
***REMOVED***

    if (state.option.devel) ***REMOVED***
      combine(predefined, vars.devel);
***REMOVED***

    if (state.option.dojo) ***REMOVED***
      combine(predefined, vars.dojo);
***REMOVED***

    if (state.option.browser) ***REMOVED***
      combine(predefined, vars.browser);
      combine(predefined, vars.typed);
***REMOVED***

    if (state.option.nonstandard) ***REMOVED***
      combine(predefined, vars.nonstandard);
***REMOVED***

    if (state.option.jquery) ***REMOVED***
      combine(predefined, vars.jquery);
***REMOVED***

    if (state.option.mootools) ***REMOVED***
      combine(predefined, vars.mootools);
***REMOVED***

    if (state.option.worker) ***REMOVED***
      combine(predefined, vars.worker);
***REMOVED***

    if (state.option.wsh) ***REMOVED***
      combine(predefined, vars.wsh);
***REMOVED***

    if (state.option.globalstrict && state.option.strict !== false) ***REMOVED***
      state.option.strict = true;
***REMOVED***

    if (state.option.yui) ***REMOVED***
      combine(predefined, vars.yui);
***REMOVED***

    if (state.option.mocha) ***REMOVED***
      combine(predefined, vars.mocha);
***REMOVED***

    state.option.inMoz = function (strict) ***REMOVED***
      return state.option.moz;
***REMOVED***;

    state.option.inESNext = function (strict) ***REMOVED***
      return state.option.moz || state.option.esnext;
***REMOVED***;

    state.option.inES5 = function (/* strict */) ***REMOVED***
      return !state.option.es3;
***REMOVED***;

    state.option.inES3 = function (strict) ***REMOVED***
      if (strict) ***REMOVED***
        return !state.option.moz && !state.option.esnext && state.option.es3;
  ***REMOVED***
      return state.option.es3;
***REMOVED***;
  ***REMOVED***
  function quit(code, line, chr) ***REMOVED***
    var percentage = Math.floor((line / state.lines.length) * 100);
    var message = messages.errors[code].desc;

    throw ***REMOVED***
      name: "JSHintError",
      line: line,
      character: chr,
      message: message + " (" + percentage + "% scanned).",
      raw: message,
      code: code
***REMOVED***;
  ***REMOVED***

  function isundef(scope, code, token, a) ***REMOVED***
    return JSHINT.undefs.push([scope, code, token, a]);
  ***REMOVED***

  function removeIgnoredMessages() ***REMOVED***
    var ignored = state.ignoredLines;

    if (_.isEmpty(ignored)) return;
    JSHINT.errors = _.reject(JSHINT.errors, function (err) ***REMOVED*** return ignored[err.line] ***REMOVED***);
  ***REMOVED***

  function warning(code, t, a, b, c, d) ***REMOVED***
    var ch, l, w, msg;

    if (/^W\d***REMOVED***3***REMOVED***$/.test(code)) ***REMOVED***
      if (state.ignored[code])
        return;

      msg = messages.warnings[code];
***REMOVED*** else if (/E\d***REMOVED***3***REMOVED***/.test(code)) ***REMOVED***
      msg = messages.errors[code];
***REMOVED*** else if (/I\d***REMOVED***3***REMOVED***/.test(code)) ***REMOVED***
      msg = messages.info[code];
***REMOVED***

    t = t || state.tokens.next;
    if (t.id === "(end)") ***REMOVED***  // `~
      t = state.tokens.curr;
***REMOVED***

    l = t.line || 0;
    ch = t.from || 0;

    w = ***REMOVED***
      id: "(error)",
      raw: msg.desc,
      code: msg.code,
      evidence: state.lines[l - 1] || "",
      line: l,
      character: ch,
      scope: JSHINT.scope,
      a: a,
      b: b,
      c: c,
      d: d
***REMOVED***;

    w.reason = supplant(msg.desc, w);
    JSHINT.errors.push(w);

    removeIgnoredMessages();

    if (JSHINT.errors.length >= state.option.maxerr)
      quit("E043", l, ch);

    return w;
  ***REMOVED***

  function warningAt(m, l, ch, a, b, c, d) ***REMOVED***
    return warning(m, ***REMOVED***
      line: l,
      from: ch
***REMOVED*** a, b, c, d);
  ***REMOVED***

  function error(m, t, a, b, c, d) ***REMOVED***
    warning(m, t, a, b, c, d);
  ***REMOVED***

  function errorAt(m, l, ch, a, b, c, d) ***REMOVED***
    return error(m, ***REMOVED***
      line: l,
      from: ch
***REMOVED*** a, b, c, d);
  ***REMOVED***
  function addInternalSrc(elem, src) ***REMOVED***
    var i;
    i = ***REMOVED***
      id: "(internal)",
      elem: elem,
      value: src
***REMOVED***;
    JSHINT.internals.push(i);
    return i;
  ***REMOVED***
  function addlabel(name, opts) ***REMOVED***
    opts = opts || ***REMOVED******REMOVED***;

    var type  = opts.type;
    var token = opts.token;
    var islet = opts.islet;
    if (type === "exception") ***REMOVED***
      if (_.has(funct["(context)"], name)) ***REMOVED***
        if (funct[name] !== true && !state.option.node) ***REMOVED***
          warning("W002", state.tokens.next, name);
    ***REMOVED***
  ***REMOVED***
***REMOVED***

    if (_.has(funct, name) && !funct["(global)"]) ***REMOVED***
      if (funct[name] === true) ***REMOVED***
        if (state.option.latedef) ***REMOVED***
          if ((state.option.latedef === true && _.contains([funct[name], type], "unction")) ||
              !_.contains([funct[name], type], "unction")) ***REMOVED***
            warning("W003", state.tokens.next, name);
      ***REMOVED***
    ***REMOVED***
  ***REMOVED*** else ***REMOVED***
        if ((!state.option.shadow || _.contains([ "inner", "outer" ], state.option.shadow)) &&
            type !== "exception" || funct["(blockscope)"].getlabel(name)) ***REMOVED***
          warning("W004", state.tokens.next, name);
    ***REMOVED***
  ***REMOVED***
***REMOVED***

    if (funct["(context)"] && _.has(funct["(context)"], name) && type !== "function") ***REMOVED***
      if (state.option.shadow === "outer") ***REMOVED***
        warning("W123", state.tokens.next, name);
  ***REMOVED***
***REMOVED***
    if (islet) ***REMOVED***
      funct["(blockscope)"].current.add(name, type, state.tokens.curr);
***REMOVED*** else ***REMOVED***
      funct["(blockscope)"].shadow(name);
      funct[name] = type;

      if (token) ***REMOVED***
        funct["(tokens)"][name] = token;
  ***REMOVED***

      setprop(funct, name, ***REMOVED*** unused: opts.unused || false ***REMOVED***);

      if (funct["(global)"]) ***REMOVED***
        global[name] = funct;
        if (_.has(implied, name)) ***REMOVED***
          if (state.option.latedef) ***REMOVED***
            if ((state.option.latedef === true && _.contains([funct[name], type], "unction")) ||
                !_.contains([funct[name], type], "unction")) ***REMOVED***
              warning("W003", state.tokens.next, name);
        ***REMOVED***
      ***REMOVED***

          delete implied[name];
    ***REMOVED***
  ***REMOVED*** else ***REMOVED***
        scope[name] = funct;
  ***REMOVED***
***REMOVED***
  ***REMOVED***

  function doOption() ***REMOVED***
    var nt = state.tokens.next;
    var body = nt.body.match(/(-\s+)?[^\s,:]+(?:\s*:\s*(-\s+)?[^\s,]+)?/g);
    var predef = ***REMOVED******REMOVED***;

    if (nt.type === "globals") ***REMOVED***
      body.forEach(function (g) ***REMOVED***
        g = g.split(":");
        var key = (g[0] || "").trim();
        var val = (g[1] || "").trim();

        if (key.charAt(0) === "-") ***REMOVED***
          key = key.slice(1);
          val = false;

          JSHINT.blacklist[key] = key;
          delete predefined[key];
    ***REMOVED*** else ***REMOVED***
          predef[key] = (val === "true");
    ***REMOVED***
  ***REMOVED***);

      combine(predefined, predef);

      for (var key in predef) ***REMOVED***
        if (_.has(predef, key)) ***REMOVED***
          declared[key] = nt;
    ***REMOVED***
  ***REMOVED***
***REMOVED***

    if (nt.type === "exported") ***REMOVED***
      body.forEach(function (e) ***REMOVED***
        exported[e] = true;
  ***REMOVED***);
***REMOVED***

    if (nt.type === "members") ***REMOVED***
      membersOnly = membersOnly || ***REMOVED******REMOVED***;

      body.forEach(function (m) ***REMOVED***
        var ch1 = m.charAt(0);
        var ch2 = m.charAt(m.length - 1);

        if (ch1 === ch2 && (ch1 === "\"" || ch1 === "'")) ***REMOVED***
          m = m
            .substr(1, m.length - 2)
            .replace("\\\"", "\"");
    ***REMOVED***

        membersOnly[m] = false;
  ***REMOVED***);
***REMOVED***

    var numvals = [
      "maxstatements",
      "maxparams",
      "maxdepth",
      "maxcomplexity",
      "maxerr",
      "maxlen",
      "indent"
    ];

    if (nt.type === "jshint" || nt.type === "jslint") ***REMOVED***
      body.forEach(function (g) ***REMOVED***
        g = g.split(":");
        var key = (g[0] || "").trim();
        var val = (g[1] || "").trim();

        if (!checkOption(key, nt)) ***REMOVED***
          return;
    ***REMOVED***

        if (numvals.indexOf(key) >= 0) ***REMOVED***
          if (val !== "false") ***REMOVED***
            val = +val;

            if (typeof val !== "number" || !isFinite(val) || val <= 0 || Math.floor(val) !== val) ***REMOVED***
              error("E032", nt, g[1].trim());
              return;
        ***REMOVED***

            state.option[key] = val;
      ***REMOVED*** else ***REMOVED***
            state.option[key] = key === "indent" ? 4 : false;
      ***REMOVED***

          return;
    ***REMOVED***

        if (key === "validthis") ***REMOVED***

          if (funct["(global)"])
            return void error("E009");

          if (val !== "true" && val !== "false")
            return void error("E002", nt);

          state.option.validthis = (val === "true");
          return;
    ***REMOVED***

        if (key === "quotmark") ***REMOVED***
          switch (val) ***REMOVED***
          case "true":
          case "false":
            state.option.quotmark = (val === "true");
            break;
          case "double":
          case "single":
            state.option.quotmark = val;
            break;
          default:
            error("E002", nt);
      ***REMOVED***
          return;
    ***REMOVED***

        if (key === "shadow") ***REMOVED***
          switch (val) ***REMOVED***
          case "true":
            state.option.shadow = true;
            break;
          case "outer":
            state.option.shadow = "outer";
            break;
          case "false":
          case "inner":
            state.option.shadow = "inner";
            break;
          default:
            error("E002", nt);
      ***REMOVED***
          return;
    ***REMOVED***

        if (key === "unused") ***REMOVED***
          switch (val) ***REMOVED***
          case "true":
            state.option.unused = true;
            break;
          case "false":
            state.option.unused = false;
            break;
          case "vars":
          case "strict":
            state.option.unused = val;
            break;
          default:
            error("E002", nt);
      ***REMOVED***
          return;
    ***REMOVED***

        if (key === "latedef") ***REMOVED***
          switch (val) ***REMOVED***
          case "true":
            state.option.latedef = true;
            break;
          case "false":
            state.option.latedef = false;
            break;
          case "nofunc":
            state.option.latedef = "nofunc";
            break;
          default:
            error("E002", nt);
      ***REMOVED***
          return;
    ***REMOVED***

        if (key === "ignore") ***REMOVED***
          switch (val) ***REMOVED***
          case "start":
            state.ignoreLinterErrors = true;
            break;
          case "end":
            state.ignoreLinterErrors = false;
            break;
          case "line":
            state.ignoredLines[nt.line] = true;
            removeIgnoredMessages();
            break;
          default:
            error("E002", nt);
      ***REMOVED***
          return;
    ***REMOVED***

        var match = /^([+-])(W\d***REMOVED***3***REMOVED***)$/g.exec(key);
        if (match) ***REMOVED***
          state.ignored[match[2]] = (match[1] === "-");
          return;
    ***REMOVED***

        var tn;
        if (val === "true" || val === "false") ***REMOVED***
          if (nt.type === "jslint") ***REMOVED***
            tn = renamedOptions[key] || key;
            state.option[tn] = (val === "true");

            if (invertedOptions[tn] !== undefined) ***REMOVED***
              state.option[tn] = !state.option[tn];
        ***REMOVED***
      ***REMOVED*** else ***REMOVED***
            state.option[key] = (val === "true");
      ***REMOVED***

          if (key === "newcap") ***REMOVED***
            state.option["(explicitNewcap)"] = true;
      ***REMOVED***
          return;
    ***REMOVED***

        error("E002", nt);
  ***REMOVED***);

      assume();
***REMOVED***
  ***REMOVED***

  function peek(p) ***REMOVED***
    var i = p || 0, j = 0, t;

    while (j <= i) ***REMOVED***
      t = lookahead[j];
      if (!t) ***REMOVED***
        t = lookahead[j] = lex.token();
  ***REMOVED***
      j += 1;
***REMOVED***
    return t;
  ***REMOVED***

  function advance(id, t) ***REMOVED***
    switch (state.tokens.curr.id) ***REMOVED***
    case "(number)":
      if (state.tokens.next.id === ".") ***REMOVED***
        warning("W005", state.tokens.curr);
  ***REMOVED***
      break;
    case "-":
      if (state.tokens.next.id === "-" || state.tokens.next.id === "--") ***REMOVED***
        warning("W006");
  ***REMOVED***
      break;
    case "+":
      if (state.tokens.next.id === "+" || state.tokens.next.id === "++") ***REMOVED***
        warning("W007");
  ***REMOVED***
      break;
***REMOVED***

    if (state.tokens.curr.type === "(string)" || state.tokens.curr.identifier) ***REMOVED***
      anonname = state.tokens.curr.value;
***REMOVED***

    if (id && state.tokens.next.id !== id) ***REMOVED***
      if (t) ***REMOVED***
        if (state.tokens.next.id === "(end)") ***REMOVED***
          error("E019", t, t.id);
    ***REMOVED*** else ***REMOVED***
          error("E020", state.tokens.next, id, t.id, t.line, state.tokens.next.value);
    ***REMOVED***
  ***REMOVED*** else if (state.tokens.next.type !== "(identifier)" || state.tokens.next.value !== id) ***REMOVED***
        warning("W116", state.tokens.next, id, state.tokens.next.value);
  ***REMOVED***
***REMOVED***

    state.tokens.prev = state.tokens.curr;
    state.tokens.curr = state.tokens.next;
    for (;;) ***REMOVED***
      state.tokens.next = lookahead.shift() || lex.token();

      if (!state.tokens.next) ***REMOVED*** // No more tokens left, give up
        quit("E041", state.tokens.curr.line);
  ***REMOVED***

      if (state.tokens.next.id === "(end)" || state.tokens.next.id === "(error)") ***REMOVED***
        return;
  ***REMOVED***

      if (state.tokens.next.check) ***REMOVED***
        state.tokens.next.check();
  ***REMOVED***

      if (state.tokens.next.isSpecial) ***REMOVED***
        doOption();
  ***REMOVED*** else ***REMOVED***
        if (state.tokens.next.id !== "(endline)") ***REMOVED***
          break;
    ***REMOVED***
  ***REMOVED***
***REMOVED***
  ***REMOVED***

  function isInfix(token) ***REMOVED***
    return token.infix || (!token.identifier && !!token.led);
  ***REMOVED***

  function isEndOfExpr() ***REMOVED***
    var curr = state.tokens.curr;
    var next = state.tokens.next;
    if (next.id === ";" || next.id === "***REMOVED***" || next.id === ":") ***REMOVED***
      return true;
***REMOVED***
    if (isInfix(next) === isInfix(curr) || (curr.id === "yield" && state.option.inMoz(true))) ***REMOVED***
      return curr.line !== next.line;
***REMOVED***
    return false;
  ***REMOVED***

  function expression(rbp, initial) ***REMOVED***
    var left, isArray = false, isObject = false, isLetExpr = false;
    if (!initial && state.tokens.next.value === "let" && peek(0).value === "(") ***REMOVED***
      if (!state.option.inMoz(true)) ***REMOVED***
        warning("W118", state.tokens.next, "let expressions");
  ***REMOVED***
      isLetExpr = true;
      funct["(blockscope)"].stack();
      advance("let");
      advance("(");
      state.syntax["let"].fud.call(state.syntax["let"].fud, false);
      advance(")");
***REMOVED***

    if (state.tokens.next.id === "(end)")
      error("E006", state.tokens.curr);

    if (state.option.asi &&
        (state.tokens.curr.id === "[" ||
          state.tokens.curr.id === "(" ||
          state.tokens.curr.id === "/") &&
        state.tokens.prev.line < state.tokens.curr.line)
      warning("W014", state.tokens.curr, state.tokens.curr.id);

    advance();

    if (initial) ***REMOVED***
      anonname = "anonymous";
      funct["(verb)"] = state.tokens.curr.value;
***REMOVED***

    if (initial === true && state.tokens.curr.fud) ***REMOVED***
      left = state.tokens.curr.fud();
***REMOVED*** else ***REMOVED***
      if (state.tokens.curr.nud) ***REMOVED***
        left = state.tokens.curr.nud();
  ***REMOVED*** else ***REMOVED***
        error("E030", state.tokens.curr, state.tokens.curr.id);
  ***REMOVED***

      while (rbp < state.tokens.next.lbp && !isEndOfExpr()) ***REMOVED***
        isArray = state.tokens.curr.value === "Array";
        isObject = state.tokens.curr.value === "Object";
        if (left && (left.value || (left.first && left.first.value))) ***REMOVED***
          if (left.value !== "new" ||
            (left.first && left.first.value && left.first.value === ".")) ***REMOVED***
            isArray = false;
            if (left.value !== state.tokens.curr.value) ***REMOVED***
              isObject = false;
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***

        advance();

        if (isArray && state.tokens.curr.id === "(" && state.tokens.next.id === ")") ***REMOVED***
          warning("W009", state.tokens.curr);
    ***REMOVED***

        if (isObject && state.tokens.curr.id === "(" && state.tokens.next.id === ")") ***REMOVED***
          warning("W010", state.tokens.curr);
    ***REMOVED***

        if (left && state.tokens.curr.led) ***REMOVED***
          left = state.tokens.curr.led(left);
    ***REMOVED*** else ***REMOVED***
          error("E033", state.tokens.curr, state.tokens.curr.id);
    ***REMOVED***
  ***REMOVED***
***REMOVED***
    if (isLetExpr) ***REMOVED***
      funct["(blockscope)"].unstack();
***REMOVED***
    return left;
  ***REMOVED***

  function nobreaknonadjacent(left, right) ***REMOVED***
    left = left || state.tokens.curr;
    right = right || state.tokens.next;
    if (!state.option.laxbreak && left.line !== right.line) ***REMOVED***
      warning("W014", right, right.value);
***REMOVED***
  ***REMOVED***

  function nolinebreak(t) ***REMOVED***
    t = t || state.tokens.curr;
    if (t.line !== state.tokens.next.line) ***REMOVED***
      warning("E022", t, t.value);
***REMOVED***
  ***REMOVED***

  function nobreakcomma(left, right) ***REMOVED***
    if (left.line !== right.line) ***REMOVED***
      if (!state.option.laxcomma) ***REMOVED***
        if (comma.first) ***REMOVED***
          warning("I001");
          comma.first = false;
    ***REMOVED***
        warning("W014", left, right.value);
  ***REMOVED***
***REMOVED***
  ***REMOVED***

  function comma(opts) ***REMOVED***
    opts = opts || ***REMOVED******REMOVED***;

    if (!opts.peek) ***REMOVED***
      nobreakcomma(state.tokens.curr, state.tokens.next);
      advance(",");
***REMOVED*** else ***REMOVED***
      nobreakcomma(state.tokens.prev, state.tokens.curr);
***REMOVED***

    if (state.tokens.next.identifier && !(opts.property && state.option.inES5())) ***REMOVED***
      switch (state.tokens.next.value) ***REMOVED***
      case "break":
      case "case":
      case "catch":
      case "continue":
      case "default":
      case "do":
      case "else":
      case "finally":
      case "for":
      case "if":
      case "in":
      case "instanceof":
      case "return":
      case "switch":
      case "throw":
      case "try":
      case "var":
      case "let":
      case "while":
      case "with":
        error("E024", state.tokens.next, state.tokens.next.value);
        return false;
  ***REMOVED***
***REMOVED***

    if (state.tokens.next.type === "(punctuator)") ***REMOVED***
      switch (state.tokens.next.value) ***REMOVED***
      case "***REMOVED***":
      case "]":
      case ",":
        if (opts.allowTrailing) ***REMOVED***
          return true;
    ***REMOVED***
      case ")":
        error("E024", state.tokens.next, state.tokens.next.value);
        return false;
  ***REMOVED***
***REMOVED***
    return true;
  ***REMOVED***

  function symbol(s, p) ***REMOVED***
    var x = state.syntax[s];
    if (!x || typeof x !== "object") ***REMOVED***
      state.syntax[s] = x = ***REMOVED***
        id: s,
        lbp: p,
        value: s
  ***REMOVED***;
***REMOVED***
    return x;
  ***REMOVED***

  function delim(s) ***REMOVED***
    return symbol(s, 0);
  ***REMOVED***

  function stmt(s, f) ***REMOVED***
    var x = delim(s);
    x.identifier = x.reserved = true;
    x.fud = f;
    return x;
  ***REMOVED***

  function blockstmt(s, f) ***REMOVED***
    var x = stmt(s, f);
    x.block = true;
    return x;
  ***REMOVED***

  function reserveName(x) ***REMOVED***
    var c = x.id.charAt(0);
    if ((c >= "a" && c <= "z") || (c >= "A" && c <= "Z")) ***REMOVED***
      x.identifier = x.reserved = true;
***REMOVED***
    return x;
  ***REMOVED***

  function prefix(s, f) ***REMOVED***
    var x = symbol(s, 150);
    reserveName(x);

    x.nud = (typeof f === "function") ? f : function () ***REMOVED***
      this.right = expression(150);
      this.arity = "unary";

      if (this.id === "++" || this.id === "--") ***REMOVED***
        if (state.option.plusplus) ***REMOVED***
          warning("W016", this, this.id);
    ***REMOVED*** else if (this.right && (!this.right.identifier || isReserved(this.right)) &&
            this.right.id !== "." && this.right.id !== "[") ***REMOVED***
          warning("W017", this);
    ***REMOVED***
  ***REMOVED***

      return this;
***REMOVED***;

    return x;
  ***REMOVED***

  function type(s, f) ***REMOVED***
    var x = delim(s);
    x.type = s;
    x.nud = f;
    return x;
  ***REMOVED***

  function reserve(name, func) ***REMOVED***
    var x = type(name, func);
    x.identifier = true;
    x.reserved = true;
    return x;
  ***REMOVED***

  function FutureReservedWord(name, meta) ***REMOVED***
    var x = type(name, (meta && meta.nud) || function () ***REMOVED***
      return this;
***REMOVED***);

    meta = meta || ***REMOVED******REMOVED***;
    meta.isFutureReservedWord = true;

    x.value = name;
    x.identifier = true;
    x.reserved = true;
    x.meta = meta;

    return x;
  ***REMOVED***

  function reservevar(s, v) ***REMOVED***
    return reserve(s, function () ***REMOVED***
      if (typeof v === "function") ***REMOVED***
        v(this);
  ***REMOVED***
      return this;
***REMOVED***);
  ***REMOVED***

  function infix(s, f, p, w) ***REMOVED***
    var x = symbol(s, p);
    reserveName(x);
    x.infix = true;
    x.led = function (left) ***REMOVED***
      if (!w) ***REMOVED***
        nobreaknonadjacent(state.tokens.prev, state.tokens.curr);
  ***REMOVED***
      if (s === "in" && left.id === "!") ***REMOVED***
        warning("W018", left, "!");
  ***REMOVED***
      if (typeof f === "function") ***REMOVED***
        return f(left, this);
  ***REMOVED*** else ***REMOVED***
        this.left = left;
        this.right = expression(p);
        return this;
  ***REMOVED***
***REMOVED***;
    return x;
  ***REMOVED***


  function application(s) ***REMOVED***
    var x = symbol(s, 42);

    x.led = function (left) ***REMOVED***
      if (!state.option.inESNext()) ***REMOVED***
        warning("W104", state.tokens.curr, "arrow function syntax (=>)");
  ***REMOVED***

      nobreaknonadjacent(state.tokens.prev, state.tokens.curr);

      this.left = left;
      this.right = doFunction(undefined, undefined, false, left);
      return this;
***REMOVED***;
    return x;
  ***REMOVED***

  function relation(s, f) ***REMOVED***
    var x = symbol(s, 100);

    x.led = function (left) ***REMOVED***
      nobreaknonadjacent(state.tokens.prev, state.tokens.curr);
      var right = expression(100);

      if (isIdentifier(left, "NaN") || isIdentifier(right, "NaN")) ***REMOVED***
        warning("W019", this);
  ***REMOVED*** else if (f) ***REMOVED***
        f.apply(this, [left, right]);
  ***REMOVED***

      if (!left || !right) ***REMOVED***
        quit("E041", state.tokens.curr.line);
  ***REMOVED***

      if (left.id === "!") ***REMOVED***
        warning("W018", left, "!");
  ***REMOVED***

      if (right.id === "!") ***REMOVED***
        warning("W018", right, "!");
  ***REMOVED***

      this.left = left;
      this.right = right;
      return this;
***REMOVED***;
    return x;
  ***REMOVED***

  function isPoorRelation(node) ***REMOVED***
    return node &&
        ((node.type === "(number)" && +node.value === 0) ||
         (node.type === "(string)" && node.value === "") ||
         (node.type === "null" && !state.option.eqnull) ||
        node.type === "true" ||
        node.type === "false" ||
        node.type === "undefined");
  ***REMOVED***

  function isTypoTypeof(left, right) ***REMOVED***
    if (state.option.notypeof)
      return false;

    if (!left || !right)
      return false;

    var values = [
      "undefined", "object", "boolean", "number",
      "string", "function", "xml", "object", "unknown"
    ];

    if (right.type === "(identifier)" && right.value === "typeof" && left.type === "(string)")
      return !_.contains(values, left.value);

    return false;
  ***REMOVED***

  function findNativePrototype(left) ***REMOVED***
    var natives = [
      "Array", "ArrayBuffer", "Boolean", "Collator", "DataView", "Date",
      "DateTimeFormat", "Error", "EvalError", "Float32Array", "Float64Array",
      "Function", "Infinity", "Intl", "Int16Array", "Int32Array", "Int8Array",
      "Iterator", "Number", "NumberFormat", "Object", "RangeError",
      "ReferenceError", "RegExp", "StopIteration", "String", "SyntaxError",
      "TypeError", "Uint16Array", "Uint32Array", "Uint8Array", "Uint8ClampedArray",
      "URIError"
    ];

    function walkPrototype(obj) ***REMOVED***
      if (typeof obj !== "object") return;
      return obj.right === "prototype" ? obj : walkPrototype(obj.left);
***REMOVED***

    function walkNative(obj) ***REMOVED***
      while (!obj.identifier && typeof obj.left === "object")
        obj = obj.left;

      if (obj.identifier && natives.indexOf(obj.value) >= 0)
        return obj.value;
***REMOVED***

    var prototype = walkPrototype(left);
    if (prototype) return walkNative(prototype);
  ***REMOVED***

  function assignop(s, f, p) ***REMOVED***
    var x = infix(s, typeof f === "function" ? f : function (left, that) ***REMOVED***
      that.left = left;

      if (left) ***REMOVED***
        if (state.option.freeze) ***REMOVED***
          var nativeObject = findNativePrototype(left);
          if (nativeObject)
            warning("W121", left, nativeObject);
    ***REMOVED***

        if (predefined[left.value] === false &&
            scope[left.value]["(global)"] === true) ***REMOVED***
          warning("W020", left);
    ***REMOVED*** else if (left["function"]) ***REMOVED***
          warning("W021", left, left.value);
    ***REMOVED***

        if (funct[left.value] === "const") ***REMOVED***
          error("E013", left, left.value);
    ***REMOVED***

        if (left.id === ".") ***REMOVED***
          if (!left.left) ***REMOVED***
            warning("E031", that);
      ***REMOVED*** else if (left.left.value === "arguments" && !state.directive["use strict"]) ***REMOVED***
            warning("E031", that);
      ***REMOVED***

          that.right = expression(10);
          return that;
    ***REMOVED*** else if (left.id === "[") ***REMOVED***
          if (state.tokens.curr.left.first) ***REMOVED***
            state.tokens.curr.left.first.forEach(function (t) ***REMOVED***
              if (t && funct[t.value] === "const") ***REMOVED***
                error("E013", t, t.value);
          ***REMOVED***
        ***REMOVED***);
      ***REMOVED*** else if (!left.left) ***REMOVED***
            warning("E031", that);
      ***REMOVED*** else if (left.left.value === "arguments" && !state.directive["use strict"]) ***REMOVED***
            warning("E031", that);
      ***REMOVED***
          that.right = expression(10);
          return that;
    ***REMOVED*** else if (left.identifier && !isReserved(left)) ***REMOVED***
          if (funct[left.value] === "exception") ***REMOVED***
            warning("W022", left);
      ***REMOVED***
          that.right = expression(10);
          return that;
    ***REMOVED***

        if (left === state.syntax["function"]) ***REMOVED***
          warning("W023", state.tokens.curr);
    ***REMOVED***
  ***REMOVED***

      error("E031", that);
***REMOVED*** p);

    x.exps = true;
    x.assign = true;
    return x;
  ***REMOVED***


  function bitwise(s, f, p) ***REMOVED***
    var x = symbol(s, p);
    reserveName(x);
    x.led = (typeof f === "function") ? f : function (left) ***REMOVED***
      if (state.option.bitwise) ***REMOVED***
        warning("W016", this, this.id);
  ***REMOVED***
      this.left = left;
      this.right = expression(p);
      return this;
***REMOVED***;
    return x;
  ***REMOVED***


  function bitwiseassignop(s) ***REMOVED***
    return assignop(s, function (left, that) ***REMOVED***
      if (state.option.bitwise) ***REMOVED***
        warning("W016", that, that.id);
  ***REMOVED***

      if (left) ***REMOVED***
        if (left.id === "." || left.id === "[" ||
            (left.identifier && !isReserved(left))) ***REMOVED***
          expression(10);
          return that;
    ***REMOVED***
        if (left === state.syntax["function"]) ***REMOVED***
          warning("W023", state.tokens.curr);
    ***REMOVED***
        return that;
  ***REMOVED***
      error("E031", that);
***REMOVED*** 20);
  ***REMOVED***


  function suffix(s) ***REMOVED***
    var x = symbol(s, 150);

    x.led = function (left) ***REMOVED***
      if (state.option.plusplus) ***REMOVED***
        warning("W016", this, this.id);
  ***REMOVED*** else if ((!left.identifier || isReserved(left)) && left.id !== "." && left.id !== "[") ***REMOVED***
        warning("W017", this);
  ***REMOVED***

      this.left = left;
      return this;
***REMOVED***;
    return x;
  ***REMOVED***

  function optionalidentifier(fnparam, prop) ***REMOVED***
    if (!state.tokens.next.identifier) ***REMOVED***
      return;
***REMOVED***

    advance();

    var curr = state.tokens.curr;
    var val  = state.tokens.curr.value;

    if (!isReserved(curr)) ***REMOVED***
      return val;
***REMOVED***

    if (prop) ***REMOVED***
      if (state.option.inES5()) ***REMOVED***
        return val;
  ***REMOVED***
***REMOVED***

    if (fnparam && val === "undefined") ***REMOVED***
      return val;
***REMOVED***

    warning("W024", state.tokens.curr, state.tokens.curr.id);
    return val;
  ***REMOVED***
  function identifier(fnparam, prop) ***REMOVED***
    var i = optionalidentifier(fnparam, prop);
    if (i) ***REMOVED***
      return i;
***REMOVED***
    if (state.tokens.curr.id === "function" && state.tokens.next.id === "(") ***REMOVED***
      warning("W025");
***REMOVED*** else ***REMOVED***
      error("E030", state.tokens.next, state.tokens.next.value);
***REMOVED***
  ***REMOVED***


  function reachable(s) ***REMOVED***
    var i = 0, t;
    if (state.tokens.next.id !== ";" || noreach) ***REMOVED***
      return;
***REMOVED***
    for (;;) ***REMOVED***
      do ***REMOVED***
        t = peek(i);
        i += 1;
  ***REMOVED*** while (t.id != "(end)" && t.id === "(comment)");

      if (t.reach) ***REMOVED***
        return;
  ***REMOVED***
      if (t.id !== "(endline)") ***REMOVED***
        if (t.id === "function") ***REMOVED***
          if (state.option.latedef === true) ***REMOVED***
            warning("W026", t);
      ***REMOVED***
          break;
    ***REMOVED***

        warning("W027", t, t.value, s);
        break;
  ***REMOVED***
***REMOVED***
  ***REMOVED***


  function statement() ***REMOVED***
    var values;
    var i = indent, r, s = scope, t = state.tokens.next;

    if (t.id === ";") ***REMOVED***
      advance(";");
      return;
***REMOVED***
    var res = isReserved(t);

    if (res && t.meta && t.meta.isFutureReservedWord && peek().id === ":") ***REMOVED***
      warning("W024", t, t.id);
      res = false;
***REMOVED***
    if (_.has(["[", "***REMOVED***"], t.value)) ***REMOVED***
      if (lookupBlockType().isDestAssign) ***REMOVED***
        if (!state.option.inESNext()) ***REMOVED***
          warning("W104", state.tokens.curr, "destructuring expression");
    ***REMOVED***
        values = destructuringExpression();
        values.forEach(function (tok) ***REMOVED***
          isundef(funct, "W117", tok.token, tok.id);
    ***REMOVED***);
        advance("=");
        destructuringExpressionMatch(values, expression(10, true));
        advance(";");
        return;
  ***REMOVED***
***REMOVED***
    if (t.identifier && !res && peek().id === ":") ***REMOVED***
      advance();
      advance(":");
      scope = Object.create(s);
      addlabel(t.value, ***REMOVED*** type: "label" ***REMOVED***);

      if (!state.tokens.next.labelled && state.tokens.next.value !== "***REMOVED***") ***REMOVED***
        warning("W028", state.tokens.next, t.value, state.tokens.next.value);
  ***REMOVED***

      state.tokens.next.label = t.value;
      t = state.tokens.next;
***REMOVED***

    if (t.id === "***REMOVED***") ***REMOVED***
      var iscase = (funct["(verb)"] === "case" && state.tokens.curr.value === ":");
      block(true, true, false, false, iscase);
      return;
***REMOVED***

    r = expression(0, true);

    if (r && (!r.identifier || r.value !== "function") && (r.type !== "(punctuator)")) ***REMOVED***
      if (!state.directive["use strict"] &&
          state.option.globalstrict &&
          state.option.strict) ***REMOVED***
        warning("E007");
  ***REMOVED***
***REMOVED***

    if (!t.block) ***REMOVED***
      if (!state.option.expr && (!r || !r.exps)) ***REMOVED***
        warning("W030", state.tokens.curr);
  ***REMOVED*** else if (state.option.nonew && r && r.left && r.id === "(" && r.left.id === "new") ***REMOVED***
        warning("W031", t);
  ***REMOVED***

      if (state.tokens.next.id !== ";") ***REMOVED***
        if (!state.option.asi) ***REMOVED***
          if (!state.option.lastsemic || state.tokens.next.id !== "***REMOVED***" ||
            state.tokens.next.line !== state.tokens.curr.line) ***REMOVED***
            warningAt("W033", state.tokens.curr.line, state.tokens.curr.character);
      ***REMOVED***
    ***REMOVED***
  ***REMOVED*** else ***REMOVED***
        advance(";");
  ***REMOVED***
***REMOVED***

    indent = i;
    scope = s;
    return r;
  ***REMOVED***


  function statements(startLine) ***REMOVED***
    var a = [], p;

    while (!state.tokens.next.reach && state.tokens.next.id !== "(end)") ***REMOVED***
      if (state.tokens.next.id === ";") ***REMOVED***
        p = peek();

        if (!p || (p.id !== "(" && p.id !== "[")) ***REMOVED***
          warning("W032");
    ***REMOVED***

        advance(";");
  ***REMOVED*** else ***REMOVED***
        a.push(statement(startLine === state.tokens.next.line));
  ***REMOVED***
***REMOVED***
    return a;
  ***REMOVED***
  function directives() ***REMOVED***
    var i, p, pn;

    for (;;) ***REMOVED***
      if (state.tokens.next.id === "(string)") ***REMOVED***
        p = peek(0);
        if (p.id === "(endline)") ***REMOVED***
          i = 1;
          do ***REMOVED***
            pn = peek(i);
            i = i + 1;
      ***REMOVED*** while (pn.id === "(endline)");

          if (pn.id !== ";") ***REMOVED***
            if (pn.id !== "(string)" && pn.id !== "(number)" &&
              pn.id !== "(regexp)" && pn.identifier !== true &&
              pn.id !== "***REMOVED***") ***REMOVED***
              break;
        ***REMOVED***
            warning("W033", state.tokens.next);
      ***REMOVED*** else ***REMOVED***
            p = pn;
      ***REMOVED***
    ***REMOVED*** else if (p.id === "***REMOVED***") ***REMOVED***
          warning("W033", p);
    ***REMOVED*** else if (p.id !== ";") ***REMOVED***
          break;
    ***REMOVED***

        advance();
        if (state.directive[state.tokens.curr.value]) ***REMOVED***
          warning("W034", state.tokens.curr, state.tokens.curr.value);
    ***REMOVED***

        if (state.tokens.curr.value === "use strict") ***REMOVED***
          if (!state.option["(explicitNewcap)"])
            state.option.newcap = true;
          state.option.undef = true;
    ***REMOVED***
        state.directive[state.tokens.curr.value] = true;

        if (p.id === ";") ***REMOVED***
          advance(";");
    ***REMOVED***
        continue;
  ***REMOVED***
      break;
***REMOVED***
  ***REMOVED***
  function block(ordinary, stmt, isfunc, isfatarrow, iscase) ***REMOVED***
    var a,
      b = inblock,
      old_indent = indent,
      m,
      s = scope,
      t,
      line,
      d;

    inblock = ordinary;

    if (!ordinary || !state.option.funcscope)
      scope = Object.create(scope);

    t = state.tokens.next;

    var metrics = funct["(metrics)"];
    metrics.nestedBlockDepth += 1;
    metrics.verifyMaxNestedBlockDepthPerFunction();

    if (state.tokens.next.id === "***REMOVED***") ***REMOVED***
      advance("***REMOVED***");
      funct["(blockscope)"].stack();

      line = state.tokens.curr.line;
      if (state.tokens.next.id !== "***REMOVED***") ***REMOVED***
        indent += state.option.indent;
        while (!ordinary && state.tokens.next.from > indent) ***REMOVED***
          indent += state.option.indent;
    ***REMOVED***

        if (isfunc) ***REMOVED***
          m = ***REMOVED******REMOVED***;
          for (d in state.directive) ***REMOVED***
            if (_.has(state.directive, d)) ***REMOVED***
              m[d] = state.directive[d];
        ***REMOVED***
      ***REMOVED***
          directives();

          if (state.option.strict && funct["(context)"]["(global)"]) ***REMOVED***
            if (!m["use strict"] && !state.directive["use strict"]) ***REMOVED***
              warning("E007");
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***

        a = statements(line);

        metrics.statementCount += a.length;

        if (isfunc) ***REMOVED***
          state.directive = m;
    ***REMOVED***

        indent -= state.option.indent;
  ***REMOVED***

      advance("***REMOVED***", t);

      funct["(blockscope)"].unstack();

      indent = old_indent;
***REMOVED*** else if (!ordinary) ***REMOVED***
      if (isfunc) ***REMOVED***
        m = ***REMOVED******REMOVED***;
        if (stmt && !isfatarrow && !state.option.inMoz(true)) ***REMOVED***
          error("W118", state.tokens.curr, "function closure expressions");
    ***REMOVED***

        if (!stmt) ***REMOVED***
          for (d in state.directive) ***REMOVED***
            if (_.has(state.directive, d)) ***REMOVED***
              m[d] = state.directive[d];
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***
        expression(10);

        if (state.option.strict && funct["(context)"]["(global)"]) ***REMOVED***
          if (!m["use strict"] && !state.directive["use strict"]) ***REMOVED***
            warning("E007");
      ***REMOVED***
    ***REMOVED***
  ***REMOVED*** else ***REMOVED***
        error("E021", state.tokens.next, "***REMOVED***", state.tokens.next.value);
  ***REMOVED***
***REMOVED*** else ***REMOVED***
      funct["(nolet)"] = true;

      if (!stmt || state.option.curly) ***REMOVED***
        warning("W116", state.tokens.next, "***REMOVED***", state.tokens.next.value);
  ***REMOVED***

      noreach = true;
      indent += state.option.indent;
      a = [statement()];
      indent -= state.option.indent;
      noreach = false;

      delete funct["(nolet)"];
***REMOVED***
    switch (funct["(verb)"]) ***REMOVED***
    case "break":
    case "continue":
    case "return":
    case "throw":
      if (iscase) ***REMOVED***
        break;
  ***REMOVED***
    default:
      funct["(verb)"] = null;
***REMOVED***

    if (!ordinary || !state.option.funcscope) scope = s;
    inblock = b;
    if (ordinary && state.option.noempty && (!a || a.length === 0)) ***REMOVED***
      warning("W035");
***REMOVED***
    metrics.nestedBlockDepth -= 1;
    return a;
  ***REMOVED***


  function countMember(m) ***REMOVED***
    if (membersOnly && typeof membersOnly[m] !== "boolean") ***REMOVED***
      warning("W036", state.tokens.curr, m);
***REMOVED***
    if (typeof member[m] === "number") ***REMOVED***
      member[m] += 1;
***REMOVED*** else ***REMOVED***
      member[m] = 1;
***REMOVED***
  ***REMOVED***


  function note_implied(tkn) ***REMOVED***
    var name = tkn.value;
    var desc = Object.getOwnPropertyDescriptor(implied, name);

    if (!desc)
      implied[name] = [tkn.line];
    else
      desc.value.push(tkn.line);
  ***REMOVED***

  type("(number)", function () ***REMOVED***
    return this;
  ***REMOVED***);

  type("(string)", function () ***REMOVED***
    return this;
  ***REMOVED***);

  type("(template)", function () ***REMOVED***
    return this;
  ***REMOVED***);

  state.syntax["(identifier)"] = ***REMOVED***
    type: "(identifier)",
    lbp: 0,
    identifier: true,

    nud: function () ***REMOVED***
      var v = this.value;
      var s = scope[v];
      var f;
      var block;

      if (typeof s === "function") ***REMOVED***
        s = undefined;
  ***REMOVED*** else if (!funct["(blockscope)"].current.has(v) && typeof s === "boolean") ***REMOVED***
        f = funct;
        funct = functions[0];
        addlabel(v, ***REMOVED*** type: "var" ***REMOVED***);
        s = funct;
        funct = f;
  ***REMOVED***

      block = funct["(blockscope)"].getlabel(v);
      if (funct === s || block) ***REMOVED***
        switch (block ? block[v]["(type)"] : funct[v]) ***REMOVED***
        case "unused":
          if (block) block[v]["(type)"] = "var";
          else funct[v] = "var";
          break;
        case "unction":
          if (block) block[v]["(type)"] = "function";
          else funct[v] = "function";
          this["function"] = true;
          break;
        case "const":
          setprop(funct, v, ***REMOVED*** unused: false ***REMOVED***);
          break;
        case "function":
          this["function"] = true;
          break;
        case "label":
          warning("W037", state.tokens.curr, v);
          break;
    ***REMOVED***
  ***REMOVED*** else if (funct["(global)"]) ***REMOVED***

        if (typeof predefined[v] !== "boolean") ***REMOVED***
          if (!(anonname === "typeof" || anonname === "delete") ||
            (state.tokens.next && (state.tokens.next.value === "." ||
              state.tokens.next.value === "["))) ***REMOVED***

            if (!funct["(comparray)"].check(v)) ***REMOVED***
              isundef(funct, "W117", state.tokens.curr, v);
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***

        note_implied(state.tokens.curr);
  ***REMOVED*** else ***REMOVED***

        switch (funct[v]) ***REMOVED***
        case "closure":
        case "function":
        case "var":
        case "unused":
          warning("W038", state.tokens.curr, v);
          break;
        case "label":
          warning("W037", state.tokens.curr, v);
          break;
        case "outer":
        case "global":
          break;
        default:
          if (s === true) ***REMOVED***
            funct[v] = true;
      ***REMOVED*** else if (s === null) ***REMOVED***
            warning("W039", state.tokens.curr, v);
            note_implied(state.tokens.curr);
      ***REMOVED*** else if (typeof s !== "object") ***REMOVED***
            if (!(anonname === "typeof" || anonname === "delete") ||
              (state.tokens.next &&
                (state.tokens.next.value === "." || state.tokens.next.value === "["))) ***REMOVED***

              isundef(funct, "W117", state.tokens.curr, v);
        ***REMOVED***
            funct[v] = true;
            note_implied(state.tokens.curr);
      ***REMOVED*** else ***REMOVED***
            switch (s[v]) ***REMOVED***
            case "function":
            case "unction":
              this["function"] = true;
              s[v] = "closure";
              funct[v] = s["(global)"] ? "global" : "outer";
              break;
            case "var":
            case "unused":
              s[v] = "closure";
              funct[v] = s["(global)"] ? "global" : "outer";
              break;
            case "const":
              setprop(s, v, ***REMOVED*** unused: false ***REMOVED***);
              break;
            case "closure":
              funct[v] = s["(global)"] ? "global" : "outer";
              break;
            case "label":
              warning("W037", state.tokens.curr, v);
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
      return this;
***REMOVED***

    led: function () ***REMOVED***
      error("E033", state.tokens.next, state.tokens.next.value);
***REMOVED***
  ***REMOVED***;

  type("(regexp)", function () ***REMOVED***
    return this;
  ***REMOVED***);

  delim("(endline)");
  delim("(begin)");
  delim("(end)").reach = true;
  delim("(error)").reach = true;
  delim("***REMOVED***").reach = true;
  delim(")");
  delim("]");
  delim("\"").reach = true;
  delim("'").reach = true;
  delim(";");
  delim(":").reach = true;
  delim("#");

  reserve("else");
  reserve("case").reach = true;
  reserve("catch");
  reserve("default").reach = true;
  reserve("finally");
  reservevar("arguments", function (x) ***REMOVED***
    if (state.directive["use strict"] && funct["(global)"]) ***REMOVED***
      warning("E008", x);
***REMOVED***
  ***REMOVED***);
  reservevar("eval");
  reservevar("false");
  reservevar("Infinity");
  reservevar("null");
  reservevar("this", function (x) ***REMOVED***
    if (state.directive["use strict"] && !state.option.validthis && ((funct["(statement)"] &&
        funct["(name)"].charAt(0) > "Z") || funct["(global)"])) ***REMOVED***
      warning("W040", x);
***REMOVED***
  ***REMOVED***);
  reservevar("true");
  reservevar("undefined");

  assignop("=", "assign", 20);
  assignop("+=", "assignadd", 20);
  assignop("-=", "assignsub", 20);
  assignop("*=", "assignmult", 20);
  assignop("/=", "assigndiv", 20).nud = function () ***REMOVED***
    error("E014");
  ***REMOVED***;
  assignop("%=", "assignmod", 20);

  bitwiseassignop("&=", "assignbitand", 20);
  bitwiseassignop("|=", "assignbitor", 20);
  bitwiseassignop("^=", "assignbitxor", 20);
  bitwiseassignop("<<=", "assignshiftleft", 20);
  bitwiseassignop(">>=", "assignshiftright", 20);
  bitwiseassignop(">>>=", "assignshiftrightunsigned", 20);
  infix(",", function (left, that) ***REMOVED***
    var expr;
    that.exprs = [left];
    if (!comma(***REMOVED***peek: true***REMOVED***)) ***REMOVED***
      return that;
***REMOVED***
    while (true) ***REMOVED***
      if (!(expr = expression(10)))  ***REMOVED***
        break;
  ***REMOVED***
      that.exprs.push(expr);
      if (state.tokens.next.value !== "," || !comma()) ***REMOVED***
        break;
  ***REMOVED***
***REMOVED***
    return that;
  ***REMOVED***, 10, true);

  infix("?", function (left, that) ***REMOVED***
    increaseComplexityCount();
    that.left = left;
    that.right = expression(10);
    advance(":");
    that["else"] = expression(10);
    return that;
  ***REMOVED***, 30);

  var orPrecendence = 40;
  infix("||", function (left, that) ***REMOVED***
    increaseComplexityCount();
    that.left = left;
    that.right = expression(orPrecendence);
    return that;
  ***REMOVED***, orPrecendence);
  infix("&&", "and", 50);
  bitwise("|", "bitor", 70);
  bitwise("^", "bitxor", 80);
  bitwise("&", "bitand", 90);
  relation("==", function (left, right) ***REMOVED***
    var eqnull = state.option.eqnull && (left.value === "null" || right.value === "null");

    switch (true) ***REMOVED***
      case !eqnull && state.option.eqeqeq:
        this.from = this.character;
        warning("W116", this, "===", "==");
        break;
      case isPoorRelation(left):
        warning("W041", this, "===", left.value);
        break;
      case isPoorRelation(right):
        warning("W041", this, "===", right.value);
        break;
      case isTypoTypeof(right, left):
        warning("W122", this, right.value);
        break;
      case isTypoTypeof(left, right):
        warning("W122", this, left.value);
        break;
***REMOVED***

    return this;
  ***REMOVED***);
  relation("===", function (left, right) ***REMOVED***
    if (isTypoTypeof(right, left)) ***REMOVED***
      warning("W122", this, right.value);
***REMOVED*** else if (isTypoTypeof(left, right)) ***REMOVED***
      warning("W122", this, left.value);
***REMOVED***
    return this;
  ***REMOVED***);
  relation("!=", function (left, right) ***REMOVED***
    var eqnull = state.option.eqnull &&
        (left.value === "null" || right.value === "null");

    if (!eqnull && state.option.eqeqeq) ***REMOVED***
      this.from = this.character;
      warning("W116", this, "!==", "!=");
***REMOVED*** else if (isPoorRelation(left)) ***REMOVED***
      warning("W041", this, "!==", left.value);
***REMOVED*** else if (isPoorRelation(right)) ***REMOVED***
      warning("W041", this, "!==", right.value);
***REMOVED*** else if (isTypoTypeof(right, left)) ***REMOVED***
      warning("W122", this, right.value);
***REMOVED*** else if (isTypoTypeof(left, right)) ***REMOVED***
      warning("W122", this, left.value);
***REMOVED***
    return this;
  ***REMOVED***);
  relation("!==", function (left, right) ***REMOVED***
    if (isTypoTypeof(right, left)) ***REMOVED***
      warning("W122", this, right.value);
***REMOVED*** else if (isTypoTypeof(left, right)) ***REMOVED***
      warning("W122", this, left.value);
***REMOVED***
    return this;
  ***REMOVED***);
  relation("<");
  relation(">");
  relation("<=");
  relation(">=");
  bitwise("<<", "shiftleft", 120);
  bitwise(">>", "shiftright", 120);
  bitwise(">>>", "shiftrightunsigned", 120);
  infix("in", "in", 120);
  infix("instanceof", "instanceof", 120);
  infix("+", function (left, that) ***REMOVED***
    var right = expression(130);
    if (left && right && left.id === "(string)" && right.id === "(string)") ***REMOVED***
      left.value += right.value;
      left.character = right.character;
      if (!state.option.scripturl && reg.javascriptURL.test(left.value)) ***REMOVED***
        warning("W050", left);
  ***REMOVED***
      return left;
***REMOVED***
    that.left = left;
    that.right = right;
    return that;
  ***REMOVED***, 130);
  prefix("+", "num");
  prefix("+++", function () ***REMOVED***
    warning("W007");
    this.right = expression(150);
    this.arity = "unary";
    return this;
  ***REMOVED***);
  infix("+++", function (left) ***REMOVED***
    warning("W007");
    this.left = left;
    this.right = expression(130);
    return this;
  ***REMOVED***, 130);
  infix("-", "sub", 130);
  prefix("-", "neg");
  prefix("---", function () ***REMOVED***
    warning("W006");
    this.right = expression(150);
    this.arity = "unary";
    return this;
  ***REMOVED***);
  infix("---", function (left) ***REMOVED***
    warning("W006");
    this.left = left;
    this.right = expression(130);
    return this;
  ***REMOVED***, 130);
  infix("*", "mult", 140);
  infix("/", "div", 140);
  infix("%", "mod", 140);

  suffix("++", "postinc");
  prefix("++", "preinc");
  state.syntax["++"].exps = true;

  suffix("--", "postdec");
  prefix("--", "predec");
  state.syntax["--"].exps = true;
  prefix("delete", function () ***REMOVED***
    var p = expression(10);
    if (!p || (p.id !== "." && p.id !== "[")) ***REMOVED***
      warning("W051");
***REMOVED***
    this.first = p;
    return this;
  ***REMOVED***).exps = true;

  prefix("~", function () ***REMOVED***
    if (state.option.bitwise) ***REMOVED***
      warning("W052", this, "~");
***REMOVED***
    expression(150);
    return this;
  ***REMOVED***);

  prefix("...", function () ***REMOVED***
    if (!state.option.inESNext()) ***REMOVED***
      warning("W104", this, "spread/rest operator");
***REMOVED***
    if (!state.tokens.next.identifier) ***REMOVED***
      error("E030", state.tokens.next, state.tokens.next.value);
***REMOVED***
    expression(150);
    return this;
  ***REMOVED***);

  prefix("!", function () ***REMOVED***
    this.right = expression(150);
    this.arity = "unary";

    if (!this.right) ***REMOVED*** // '!' followed by nothing? Give up.
      quit("E041", this.line || 0);
***REMOVED***

    if (bang[this.right.id] === true) ***REMOVED***
      warning("W018", this, "!");
***REMOVED***
    return this;
  ***REMOVED***);

  prefix("typeof", "typeof");
  prefix("new", function () ***REMOVED***
    var c = expression(155), i;
    if (c && c.id !== "function") ***REMOVED***
      if (c.identifier) ***REMOVED***
        c["new"] = true;
        switch (c.value) ***REMOVED***
        case "Number":
        case "String":
        case "Boolean":
        case "Math":
        case "JSON":
          warning("W053", state.tokens.prev, c.value);
          break;
        case "Function":
          if (!state.option.evil) ***REMOVED***
            warning("W054");
      ***REMOVED***
          break;
        case "Date":
        case "RegExp":
        case "this":
          break;
        default:
          if (c.id !== "function") ***REMOVED***
            i = c.value.substr(0, 1);
            if (state.option.newcap && (i < "A" || i > "Z") && !_.has(global, c.value)) ***REMOVED***
              warning("W055", state.tokens.curr);
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***
  ***REMOVED*** else ***REMOVED***
        if (c.id !== "." && c.id !== "[" && c.id !== "(") ***REMOVED***
          warning("W056", state.tokens.curr);
    ***REMOVED***
  ***REMOVED***
***REMOVED*** else ***REMOVED***
      if (!state.option.supernew)
        warning("W057", this);
***REMOVED***
    if (state.tokens.next.id !== "(" && !state.option.supernew) ***REMOVED***
      warning("W058", state.tokens.curr, state.tokens.curr.value);
***REMOVED***
    this.first = c;
    return this;
  ***REMOVED***);
  state.syntax["new"].exps = true;

  prefix("void").exps = true;

  infix(".", function (left, that) ***REMOVED***
    var m = identifier(false, true);

    if (typeof m === "string") ***REMOVED***
      countMember(m);
***REMOVED***

    that.left = left;
    that.right = m;

    if (m && m === "hasOwnProperty" && state.tokens.next.value === "=") ***REMOVED***
      warning("W001");
***REMOVED***

    if (left && left.value === "arguments" && (m === "callee" || m === "caller")) ***REMOVED***
      if (state.option.noarg)
        warning("W059", left, m);
      else if (state.directive["use strict"])
        error("E008");
***REMOVED*** else if (!state.option.evil && left && left.value === "document" &&
        (m === "write" || m === "writeln")) ***REMOVED***
      warning("W060", left);
***REMOVED***

    if (!state.option.evil && (m === "eval" || m === "execScript")) ***REMOVED***
      warning("W061");
***REMOVED***

    return that;
  ***REMOVED***, 160, true);

  infix("(", function (left, that) ***REMOVED***
    if (state.option.immed && left && !left.immed && left.id === "function") ***REMOVED***
      warning("W062");
***REMOVED***

    var n = 0;
    var p = [];

    if (left) ***REMOVED***
      if (left.type === "(identifier)") ***REMOVED***
        if (left.value.match(/^[A-Z]([A-Z0-9_$]*[a-z][A-Za-z0-9_$]*)?$/)) ***REMOVED***
          if ("Number String Boolean Date Object Error".indexOf(left.value) === -1) ***REMOVED***
            if (left.value === "Math") ***REMOVED***
              warning("W063", left);
        ***REMOVED*** else if (state.option.newcap) ***REMOVED***
              warning("W064", left);
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
***REMOVED***

    if (state.tokens.next.id !== ")") ***REMOVED***
      for (;;) ***REMOVED***
        p[p.length] = expression(10);
        n += 1;
        if (state.tokens.next.id !== ",") ***REMOVED***
          break;
    ***REMOVED***
        comma();
  ***REMOVED***
***REMOVED***

    advance(")");

    if (typeof left === "object") ***REMOVED***
      if (state.option.inES3() && left.value === "parseInt" && n === 1) ***REMOVED***
        warning("W065", state.tokens.curr);
  ***REMOVED***
      if (!state.option.evil) ***REMOVED***
        if (left.value === "eval" || left.value === "Function" ||
            left.value === "execScript") ***REMOVED***
          warning("W061", left);

          if (p[0] && [0].id === "(string)") ***REMOVED***
            addInternalSrc(left, p[0].value);
      ***REMOVED***
    ***REMOVED*** else if (p[0] && p[0].id === "(string)" &&
             (left.value === "setTimeout" ||
            left.value === "setInterval")) ***REMOVED***
          warning("W066", left);
          addInternalSrc(left, p[0].value);
    ***REMOVED*** else if (p[0] && p[0].id === "(string)" &&
             left.value === "." &&
             left.left.value === "window" &&
             (left.right === "setTimeout" ||
            left.right === "setInterval")) ***REMOVED***
          warning("W066", left);
          addInternalSrc(left, p[0].value);
    ***REMOVED***
  ***REMOVED***
      if (!left.identifier && left.id !== "." && left.id !== "[" &&
          left.id !== "(" && left.id !== "&&" && left.id !== "||" &&
          left.id !== "?") ***REMOVED***
        warning("W067", left);
  ***REMOVED***
***REMOVED***

    that.left = left;
    return that;
  ***REMOVED***, 155, true).exps = true;

  prefix("(", function () ***REMOVED***
    var bracket, brackets = [];
    var pn, pn1, i = 0;
    var ret;
    var parens = 1;

    do ***REMOVED***
      pn = peek(i);

      if (pn.value === "(") ***REMOVED***
        parens += 1;
  ***REMOVED*** else if (pn.value === ")") ***REMOVED***
        parens -= 1;
  ***REMOVED***

      i += 1;
      pn1 = peek(i);
***REMOVED*** while (!(parens === 0 && pn.value === ")") &&
             pn1.value !== "=>" && pn1.value !== ";" && pn1.type !== "(end)");

    if (state.tokens.next.id === "function") ***REMOVED***
      state.tokens.next.immed = true;
***REMOVED***

    var exprs = [];

    if (state.tokens.next.id !== ")") ***REMOVED***
      for (;;) ***REMOVED***
        if (pn1.value === "=>" && _.contains(["***REMOVED***", "["], state.tokens.next.value)) ***REMOVED***
          bracket = state.tokens.next;
          bracket.left = destructuringExpression();
          brackets.push(bracket);
          for (var t in bracket.left) ***REMOVED***
            exprs.push(bracket.left[t].token);
      ***REMOVED***
    ***REMOVED*** else ***REMOVED***
          exprs.push(expression(10));
    ***REMOVED***
        if (state.tokens.next.id !== ",") ***REMOVED***
          break;
    ***REMOVED***
        comma();
  ***REMOVED***
***REMOVED***

    advance(")", this);
    if (state.option.immed && exprs[0] && exprs[0].id === "function") ***REMOVED***
      if (state.tokens.next.id !== "(" &&
        (state.tokens.next.id !== "." || (peek().value !== "call" && peek().value !== "apply"))) ***REMOVED***
        warning("W068", this);
  ***REMOVED***
***REMOVED***

    if (state.tokens.next.value === "=>") ***REMOVED***
      return exprs;
***REMOVED***
    if (!exprs.length) ***REMOVED***
      return;
***REMOVED***
    if (exprs.length > 1) ***REMOVED***
      ret = Object.create(state.syntax[","]);
      ret.exprs = exprs;
***REMOVED*** else ***REMOVED***
      ret = exprs[0];
***REMOVED***
    if (ret) ***REMOVED***
      ret.paren = true;
***REMOVED***
    return ret;
  ***REMOVED***);

  application("=>");

  infix("[", function (left, that) ***REMOVED***
    var e = expression(10), s;
    if (e && e.type === "(string)") ***REMOVED***
      if (!state.option.evil && (e.value === "eval" || e.value === "execScript")) ***REMOVED***
        warning("W061", that);
  ***REMOVED***

      countMember(e.value);
      if (!state.option.sub && reg.identifier.test(e.value)) ***REMOVED***
        s = state.syntax[e.value];
        if (!s || !isReserved(s)) ***REMOVED***
          warning("W069", state.tokens.prev, e.value);
    ***REMOVED***
  ***REMOVED***
***REMOVED***
    advance("]", that);

    if (e && e.value === "hasOwnProperty" && state.tokens.next.value === "=") ***REMOVED***
      warning("W001");
***REMOVED***

    that.left = left;
    that.right = e;
    return that;
  ***REMOVED***, 160, true);

  function comprehensiveArrayExpression() ***REMOVED***
    var res = ***REMOVED******REMOVED***;
    res.exps = true;
    funct["(comparray)"].stack();
    var reversed = false;
    if (state.tokens.next.value !== "for") ***REMOVED***
      reversed = true;
      if (!state.option.inMoz(true)) ***REMOVED***
        warning("W116", state.tokens.next, "for", state.tokens.next.value);
  ***REMOVED***
      funct["(comparray)"].setState("use");
      res.right = expression(10);
***REMOVED***

    advance("for");
    if (state.tokens.next.value === "each") ***REMOVED***
      advance("each");
      if (!state.option.inMoz(true)) ***REMOVED***
        warning("W118", state.tokens.curr, "for each");
  ***REMOVED***
***REMOVED***
    advance("(");
    funct["(comparray)"].setState("define");
    res.left = expression(130);
    if (_.contains(["in", "of"], state.tokens.next.value)) ***REMOVED***
      advance();
***REMOVED*** else ***REMOVED***
      error("E045", state.tokens.curr);
***REMOVED***
    funct["(comparray)"].setState("generate");
    expression(10);

    advance(")");
    if (state.tokens.next.value === "if") ***REMOVED***
      advance("if");
      advance("(");
      funct["(comparray)"].setState("filter");
      res.filter = expression(10);
      advance(")");
***REMOVED***

    if (!reversed) ***REMOVED***
      funct["(comparray)"].setState("use");
      res.right = expression(10);
***REMOVED***

    advance("]");
    funct["(comparray)"].unstack();
    return res;
  ***REMOVED***

  prefix("[", function () ***REMOVED***
    var blocktype = lookupBlockType(true);
    if (blocktype.isCompArray) ***REMOVED***
      if (!state.option.inESNext()) ***REMOVED***
        warning("W119", state.tokens.curr, "array comprehension");
  ***REMOVED***
      return comprehensiveArrayExpression();
***REMOVED*** else if (blocktype.isDestAssign && !state.option.inESNext()) ***REMOVED***
      warning("W104", state.tokens.curr, "destructuring assignment");
***REMOVED***
    var b = state.tokens.curr.line !== state.tokens.next.line;
    this.first = [];
    if (b) ***REMOVED***
      indent += state.option.indent;
      if (state.tokens.next.from === indent + state.option.indent) ***REMOVED***
        indent += state.option.indent;
  ***REMOVED***
***REMOVED***
    while (state.tokens.next.id !== "(end)") ***REMOVED***
      while (state.tokens.next.id === ",") ***REMOVED***
        if (!state.option.inES5())
          warning("W070");
        advance(",");
  ***REMOVED***

      if (state.tokens.next.id === "]") ***REMOVED***
        break;
  ***REMOVED***

      this.first.push(expression(10));
      if (state.tokens.next.id === ",") ***REMOVED***
        comma(***REMOVED*** allowTrailing: true ***REMOVED***);
        if (state.tokens.next.id === "]" && !state.option.inES5(true)) ***REMOVED***
          warning("W070", state.tokens.curr);
          break;
    ***REMOVED***
  ***REMOVED*** else ***REMOVED***
        break;
  ***REMOVED***
***REMOVED***
    if (b) ***REMOVED***
      indent -= state.option.indent;
***REMOVED***
    advance("]", this);
    return this;
  ***REMOVED***, 160);


  function property_name() ***REMOVED***
    var id = optionalidentifier(false, true);

    if (!id) ***REMOVED***
      if (state.tokens.next.id === "(string)") ***REMOVED***
        id = state.tokens.next.value;
        advance();
  ***REMOVED*** else if (state.tokens.next.id === "(number)") ***REMOVED***
        id = state.tokens.next.value.toString();
        advance();
  ***REMOVED***
***REMOVED***

    if (id === "hasOwnProperty") ***REMOVED***
      warning("W001");
***REMOVED***

    return id;
  ***REMOVED***

  function functionparams(parsed) ***REMOVED***
    var curr, next;
    var params = [];
    var ident;
    var tokens = [];
    var t;
    var pastDefault = false;

    if (parsed) ***REMOVED***
      if (Array.isArray(parsed)) ***REMOVED***
        for (var i in parsed) ***REMOVED***
          curr = parsed[i];
          if (curr.value === "...") ***REMOVED***
            if (!state.option.inESNext()) ***REMOVED***
              warning("W104", curr, "spread/rest operator");
        ***REMOVED***
            continue;
      ***REMOVED*** else if (curr.value !== ",") ***REMOVED***
            params.push(curr.value);
            addlabel(curr.value, ***REMOVED*** type: "unused", token: curr ***REMOVED***);
      ***REMOVED***
    ***REMOVED***
        return params;
  ***REMOVED*** else ***REMOVED***
        if (parsed.identifier === true) ***REMOVED***
          addlabel(parsed.value, ***REMOVED*** type: "unused", token: parsed ***REMOVED***);
          return [parsed];
    ***REMOVED***
  ***REMOVED***
***REMOVED***

    next = state.tokens.next;

    advance("(");

    if (state.tokens.next.id === ")") ***REMOVED***
      advance(")");
      return;
***REMOVED***

    for (;;) ***REMOVED***
      if (_.contains(["***REMOVED***", "["], state.tokens.next.id)) ***REMOVED***
        tokens = destructuringExpression();
        for (t in tokens) ***REMOVED***
          t = tokens[t];
          if (t.id) ***REMOVED***
            params.push(t.id);
            addlabel(t.id, ***REMOVED*** type: "unused", token: t.token ***REMOVED***);
      ***REMOVED***
    ***REMOVED***
  ***REMOVED*** else if (state.tokens.next.value === "...") ***REMOVED***
        if (!state.option.inESNext()) ***REMOVED***
          warning("W104", state.tokens.next, "spread/rest operator");
    ***REMOVED***
        advance("...");
        ident = identifier(true);
        params.push(ident);
        addlabel(ident, ***REMOVED*** type: "unused", token: state.tokens.curr ***REMOVED***);
  ***REMOVED*** else ***REMOVED***
        ident = identifier(true);
        params.push(ident);
        addlabel(ident, ***REMOVED*** type: "unused", token: state.tokens.curr ***REMOVED***);
  ***REMOVED***
      if (pastDefault) ***REMOVED***
        if (state.tokens.next.id !== "=") ***REMOVED***
          error("E051", state.tokens.current);
    ***REMOVED***
  ***REMOVED***
      if (state.tokens.next.id === "=") ***REMOVED***
        if (!state.option.inESNext()) ***REMOVED***
          warning("W119", state.tokens.next, "default parameters");
    ***REMOVED***
        advance("=");
        pastDefault = true;
        expression(10);
  ***REMOVED***
      if (state.tokens.next.id === ",") ***REMOVED***
        comma();
  ***REMOVED*** else ***REMOVED***
        advance(")", next);
        return params;
  ***REMOVED***
***REMOVED***
  ***REMOVED***

  function setprop(funct, name, values) ***REMOVED***
    if (!funct["(properties)"][name]) ***REMOVED***
      funct["(properties)"][name] = ***REMOVED*** unused: false ***REMOVED***;
***REMOVED***

    _.extend(funct["(properties)"][name], values);
  ***REMOVED***

  function getprop(funct, name, prop) ***REMOVED***
    if (!funct["(properties)"][name])
      return null;

    return funct["(properties)"][name][prop] || null;
  ***REMOVED***

  function functor(name, token, scope, overwrites) ***REMOVED***
    var funct = ***REMOVED***
      "(name)"      : name,
      "(breakage)"  : 0,
      "(loopage)"   : 0,
      "(scope)"     : scope,
      "(tokens)"    : ***REMOVED******REMOVED***,
      "(properties)": ***REMOVED******REMOVED***,

      "(catch)"     : false,
      "(global)"    : false,

      "(line)"      : null,
      "(character)" : null,
      "(metrics)"   : null,
      "(statement)" : null,
      "(context)"   : null,
      "(blockscope)": null,
      "(comparray)" : null,
      "(generator)" : null,
      "(params)"    : null
***REMOVED***;

    if (token) ***REMOVED***
      _.extend(funct, ***REMOVED***
        "(line)"     : token.line,
        "(character)": token.character,
        "(metrics)"  : createMetrics(token)
  ***REMOVED***);
***REMOVED***

    _.extend(funct, overwrites);

    if (funct["(context)"]) ***REMOVED***
      funct["(blockscope)"] = funct["(context)"]["(blockscope)"];
      funct["(comparray)"]  = funct["(context)"]["(comparray)"];
***REMOVED***

    return funct;
  ***REMOVED***

  function doFunction(name, statement, generator, fatarrowparams) ***REMOVED***
    var f;
    var oldOption = state.option;
    var oldIgnored = state.ignored;
    var oldScope  = scope;

    state.option = Object.create(state.option);
    state.ignored = Object.create(state.ignored);
    scope = Object.create(scope);

    funct = functor(name || "\"" + anonname + "\"", state.tokens.next, scope, ***REMOVED***
      "(statement)": statement,
      "(context)":   funct,
      "(generator)": generator ? true : null
***REMOVED***);

    f = funct;
    state.tokens.curr.funct = funct;

    functions.push(funct);

    if (name) ***REMOVED***
      addlabel(name, ***REMOVED*** type: "function" ***REMOVED***);
***REMOVED***

    funct["(params)"] = functionparams(fatarrowparams);
    funct["(metrics)"].verifyMaxParametersPerFunction(funct["(params)"]);

    JSHINT.undefs = _.filter(JSHINT.undefs, function (item) ***REMOVED***
      return !_.contains(_.union(fatarrowparams), item[2]);
***REMOVED***);

    block(false, true, true, fatarrowparams ? true : false);

    if (!state.option.noyield && generator && funct["(generator)"] !== "yielded") ***REMOVED***
      warning("W124", state.tokens.curr);
***REMOVED***

    funct["(metrics)"].verifyMaxStatementsPerFunction();
    funct["(metrics)"].verifyMaxComplexityPerFunction();
    funct["(unusedOption)"] = state.option.unused;

    scope = oldScope;
    state.option = oldOption;
    state.ignored = oldIgnored;
    funct["(last)"] = state.tokens.curr.line;
    funct["(lastcharacter)"] = state.tokens.curr.character;

    _.map(Object.keys(funct), function (key) ***REMOVED***
      if (key[0] === "(") return;
      funct["(blockscope)"].unshadow(key);
***REMOVED***);

    funct = funct["(context)"];

    return f;
  ***REMOVED***

  function createMetrics(functionStartToken) ***REMOVED***
    return ***REMOVED***
      statementCount: 0,
      nestedBlockDepth: -1,
      ComplexityCount: 1,

      verifyMaxStatementsPerFunction: function () ***REMOVED***
        if (state.option.maxstatements &&
          this.statementCount > state.option.maxstatements) ***REMOVED***
          warning("W071", functionStartToken, this.statementCount);
    ***REMOVED***
  ***REMOVED***

      verifyMaxParametersPerFunction: function (params) ***REMOVED***
        params = params || [];

        if (state.option.maxparams && params.length > state.option.maxparams) ***REMOVED***
          warning("W072", functionStartToken, params.length);
    ***REMOVED***
  ***REMOVED***

      verifyMaxNestedBlockDepthPerFunction: function () ***REMOVED***
        if (state.option.maxdepth &&
          this.nestedBlockDepth > 0 &&
          this.nestedBlockDepth === state.option.maxdepth + 1) ***REMOVED***
          warning("W073", null, this.nestedBlockDepth);
    ***REMOVED***
  ***REMOVED***

      verifyMaxComplexityPerFunction: function () ***REMOVED***
        var max = state.option.maxcomplexity;
        var cc = this.ComplexityCount;
        if (max && cc > max) ***REMOVED***
          warning("W074", functionStartToken, cc);
    ***REMOVED***
  ***REMOVED***
***REMOVED***;
  ***REMOVED***

  function increaseComplexityCount() ***REMOVED***
    funct["(metrics)"].ComplexityCount += 1;
  ***REMOVED***

  function checkCondAssignment(expr) ***REMOVED***
    var id, paren;
    if (expr) ***REMOVED***
      id = expr.id;
      paren = expr.paren;
      if (id === "," && (expr = expr.exprs[expr.exprs.length - 1])) ***REMOVED***
        id = expr.id;
        paren = paren || expr.paren;
  ***REMOVED***
***REMOVED***
    switch (id) ***REMOVED***
    case "=":
    case "+=":
    case "-=":
    case "*=":
    case "%=":
    case "&=":
    case "|=":
    case "^=":
    case "/=":
      if (!paren && !state.option.boss) ***REMOVED***
        warning("W084");
  ***REMOVED***
***REMOVED***
  ***REMOVED***


  (function (x) ***REMOVED***
    x.nud = function (isclassdef) ***REMOVED***
      var b, f, i, p, t, g;
      var props = ***REMOVED******REMOVED***; // All properties, including accessors
      var tag = "";

      function saveProperty(name, tkn) ***REMOVED***
        if (props[name] && _.has(props, name))
          warning("W075", state.tokens.next, i);
        else
          props[name] = ***REMOVED******REMOVED***;

        props[name].basic = true;
        props[name].basictkn = tkn;
  ***REMOVED***

      function saveSetter(name, tkn) ***REMOVED***
        if (props[name] && _.has(props, name)) ***REMOVED***
          if (props[name].basic || props[name].setter)
            warning("W075", state.tokens.next, i);
    ***REMOVED*** else ***REMOVED***
          props[name] = ***REMOVED******REMOVED***;
    ***REMOVED***

        props[name].setter = true;
        props[name].setterToken = tkn;
  ***REMOVED***

      function saveGetter(name) ***REMOVED***
        if (props[name] && _.has(props, name)) ***REMOVED***
          if (props[name].basic || props[name].getter)
            warning("W075", state.tokens.next, i);
    ***REMOVED*** else ***REMOVED***
          props[name] = ***REMOVED******REMOVED***;
    ***REMOVED***

        props[name].getter = true;
        props[name].getterToken = state.tokens.curr;
  ***REMOVED***

      b = state.tokens.curr.line !== state.tokens.next.line;
      if (b) ***REMOVED***
        indent += state.option.indent;
        if (state.tokens.next.from === indent + state.option.indent) ***REMOVED***
          indent += state.option.indent;
    ***REMOVED***
  ***REMOVED***

      for (;;) ***REMOVED***
        if (state.tokens.next.id === "***REMOVED***") ***REMOVED***
          break;
    ***REMOVED***

        if (isclassdef && state.tokens.next.value === "static") ***REMOVED***
          advance("static");
          tag = "static ";
    ***REMOVED***

        if (state.tokens.next.value === "get" && peek().id !== ":") ***REMOVED***
          advance("get");

          if (!state.option.inES5(!isclassdef)) ***REMOVED***
            error("E034");
      ***REMOVED***

          i = property_name();
          if (!i && !state.option.inESNext()) ***REMOVED***
            error("E035");
      ***REMOVED***
          if (isclassdef && i === "constructor") ***REMOVED***
            error("E049", state.tokens.next, "class getter method", i);
      ***REMOVED***
          if (i) ***REMOVED***
            saveGetter(tag + i);
      ***REMOVED***

          t = state.tokens.next;
          f = doFunction();
          p = f["(params)"];
          if (i && p) ***REMOVED***
            warning("W076", t, p[0], i);
      ***REMOVED***
    ***REMOVED*** else if (state.tokens.next.value === "set" && peek().id !== ":") ***REMOVED***
          advance("set");

          if (!state.option.inES5(!isclassdef)) ***REMOVED***
            error("E034");
      ***REMOVED***

          i = property_name();
          if (!i && !state.option.inESNext()) ***REMOVED***
            error("E035");
      ***REMOVED***
          if (isclassdef && i === "constructor") ***REMOVED***
            error("E049", state.tokens.next, "class setter method", i);
      ***REMOVED***
          if (i) ***REMOVED***
            saveSetter(tag + i, state.tokens.next);
      ***REMOVED***

          t = state.tokens.next;
          f = doFunction();
          p = f["(params)"];
          if (i && (!p || p.length !== 1)) ***REMOVED***
            warning("W077", t, i);
      ***REMOVED***
    ***REMOVED*** else ***REMOVED***
          g = false;
          if (state.tokens.next.value === "*" && state.tokens.next.type === "(punctuator)") ***REMOVED***
            if (!state.option.inESNext()) ***REMOVED***
              warning("W104", state.tokens.next, "generator functions");
        ***REMOVED***
            advance("*");
            g = true;
      ***REMOVED***
          i = property_name();
          saveProperty(tag + i, state.tokens.next);

          if (typeof i !== "string") ***REMOVED***
            break;
      ***REMOVED***

          if (state.tokens.next.value === "(") ***REMOVED***
            if (!state.option.inESNext()) ***REMOVED***
              warning("W104", state.tokens.curr, "concise methods");
        ***REMOVED***
            doFunction(i, undefined, g);
      ***REMOVED*** else if (!isclassdef) ***REMOVED***
            advance(":");
            expression(10);
      ***REMOVED***
    ***REMOVED***
        if (isclassdef && i === "prototype") ***REMOVED***
          error("E049", state.tokens.next, "class method", i);
    ***REMOVED***

        countMember(i);
        if (isclassdef) ***REMOVED***
          tag = "";
          continue;
    ***REMOVED***
        if (state.tokens.next.id === ",") ***REMOVED***
          comma(***REMOVED*** allowTrailing: true, property: true ***REMOVED***);
          if (state.tokens.next.id === ",") ***REMOVED***
            warning("W070", state.tokens.curr);
      ***REMOVED*** else if (state.tokens.next.id === "***REMOVED***" && !state.option.inES5(true)) ***REMOVED***
            warning("W070", state.tokens.curr);
      ***REMOVED***
    ***REMOVED*** else ***REMOVED***
          break;
    ***REMOVED***
  ***REMOVED***
      if (b) ***REMOVED***
        indent -= state.option.indent;
  ***REMOVED***
      advance("***REMOVED***", this);
      if (state.option.inES5()) ***REMOVED***
        for (var name in props) ***REMOVED***
          if (_.has(props, name) && props[name].setter && !props[name].getter) ***REMOVED***
            warning("W078", props[name].setterToken);
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
      return this;
***REMOVED***;
    x.fud = function () ***REMOVED***
      error("E036", state.tokens.curr);
***REMOVED***;
  ***REMOVED***(delim("***REMOVED***")));

  function destructuringExpression() ***REMOVED***
    var id, ids;
    var identifiers = [];
    if (!state.option.inESNext()) ***REMOVED***
      warning("W104", state.tokens.curr, "destructuring expression");
***REMOVED***
    var nextInnerDE = function () ***REMOVED***
      var ident;
      if (_.contains(["[", "***REMOVED***"], state.tokens.next.value)) ***REMOVED***
        ids = destructuringExpression();
        for (var id in ids) ***REMOVED***
          id = ids[id];
          identifiers.push(***REMOVED*** id: id.id, token: id.token ***REMOVED***);
    ***REMOVED***
  ***REMOVED*** else if (state.tokens.next.value === ",") ***REMOVED***
        identifiers.push(***REMOVED*** id: null, token: state.tokens.curr ***REMOVED***);
  ***REMOVED*** else if (state.tokens.next.value === "(") ***REMOVED***
        advance("(");
        nextInnerDE();
        advance(")");
  ***REMOVED*** else ***REMOVED***
        ident = identifier();
        if (ident)
          identifiers.push(***REMOVED*** id: ident, token: state.tokens.curr ***REMOVED***);
  ***REMOVED***
***REMOVED***;
    if (state.tokens.next.value === "[") ***REMOVED***
      advance("[");
      nextInnerDE();
      while (state.tokens.next.value !== "]") ***REMOVED***
        advance(",");
        nextInnerDE();
  ***REMOVED***
      advance("]");
***REMOVED*** else if (state.tokens.next.value === "***REMOVED***") ***REMOVED***
      advance("***REMOVED***");
      id = identifier();
      if (state.tokens.next.value === ":") ***REMOVED***
        advance(":");
        nextInnerDE();
  ***REMOVED*** else ***REMOVED***
        identifiers.push(***REMOVED*** id: id, token: state.tokens.curr ***REMOVED***);
  ***REMOVED***
      while (state.tokens.next.value !== "***REMOVED***") ***REMOVED***
        advance(",");
        id = identifier();
        if (state.tokens.next.value === ":") ***REMOVED***
          advance(":");
          nextInnerDE();
    ***REMOVED*** else ***REMOVED***
          identifiers.push(***REMOVED*** id: id, token: state.tokens.curr ***REMOVED***);
    ***REMOVED***
  ***REMOVED***
      advance("***REMOVED***");
***REMOVED***
    return identifiers;
  ***REMOVED***

  function destructuringExpressionMatch(tokens, value) ***REMOVED***
    var first = value.first;

    if (!first)
      return;

    _.zip(tokens, Array.isArray(first) ? first : [ first ]).forEach(function (val) ***REMOVED***
      var token = val[0];
      var value = val[1];

      if (token && value)
        token.first = value;
      else if (token && token.first && !value)
        warning("W080", token.first, token.first.value);
***REMOVED***);
  ***REMOVED***

  var conststatement = stmt("const", function (prefix) ***REMOVED***
    var tokens;
    var value;
    var lone; // State variable to know if it is a lone identifier, or a destructuring statement.

    if (!state.option.inESNext())
      warning("W104", state.tokens.curr, "const");

    this.first = [];
    for (;;) ***REMOVED***
      var names = [];
      if (_.contains(["***REMOVED***", "["], state.tokens.next.value)) ***REMOVED***
        tokens = destructuringExpression();
        lone = false;
  ***REMOVED*** else ***REMOVED***
        tokens = [ ***REMOVED*** id: identifier(), token: state.tokens.curr ***REMOVED*** ];
        lone = true;
  ***REMOVED***
      for (var t in tokens) ***REMOVED***
        if (tokens.hasOwnProperty(t)) ***REMOVED***
          t = tokens[t];
          if (funct[t.id] === "const") ***REMOVED***
            warning("E011", null, t.id);
      ***REMOVED***
          if (funct["(global)"] && predefined[t.id] === false) ***REMOVED***
            warning("W079", t.token, t.id);
      ***REMOVED***
          if (t.id) ***REMOVED***
            addlabel(t.id, ***REMOVED*** token: t.token, type: "const", unused: true ***REMOVED***);
            names.push(t.token);
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
      if (prefix) ***REMOVED***
        break;
  ***REMOVED***

      this.first = this.first.concat(names);

      if (state.tokens.next.id !== "=") ***REMOVED***
        warning("E012", state.tokens.curr, state.tokens.curr.value);
  ***REMOVED***

      if (state.tokens.next.id === "=") ***REMOVED***
        advance("=");
        if (state.tokens.next.id === "undefined") ***REMOVED***
          warning("W080", state.tokens.prev, state.tokens.prev.value);
    ***REMOVED***
        if (peek(0).id === "=" && state.tokens.next.identifier) ***REMOVED***
          warning("W120", state.tokens.next, state.tokens.next.value);
    ***REMOVED***
        value = expression(10);
        if (lone) ***REMOVED***
          tokens[0].first = value;
    ***REMOVED*** else ***REMOVED***
          destructuringExpressionMatch(names, value);
    ***REMOVED***
  ***REMOVED***

      if (state.tokens.next.id !== ",") ***REMOVED***
        break;
  ***REMOVED***
      comma();
***REMOVED***
    return this;
  ***REMOVED***);

  conststatement.exps = true;
  var varstatement = stmt("var", function (prefix) ***REMOVED***
    var tokens, lone, value;

    this.first = [];
    for (;;) ***REMOVED***
      var names = [];
      if (_.contains(["***REMOVED***", "["], state.tokens.next.value)) ***REMOVED***
        tokens = destructuringExpression();
        lone = false;
  ***REMOVED*** else ***REMOVED***
        tokens = [ ***REMOVED*** id: identifier(), token: state.tokens.curr ***REMOVED*** ];
        lone = true;
  ***REMOVED***
      for (var t in tokens) ***REMOVED***
        if (tokens.hasOwnProperty(t)) ***REMOVED***
          t = tokens[t];
          if (state.option.inESNext() && funct[t.id] === "const") ***REMOVED***
            warning("E011", null, t.id);
      ***REMOVED***
          if (funct["(global)"] && predefined[t.id] === false) ***REMOVED***
            warning("W079", t.token, t.id);
      ***REMOVED***
          if (t.id) ***REMOVED***
            addlabel(t.id, ***REMOVED*** type: "unused", token: t.token ***REMOVED***);
            names.push(t.token);
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
      if (prefix) ***REMOVED***
        break;
  ***REMOVED***

      this.first = this.first.concat(names);

      if (state.tokens.next.id === "=") ***REMOVED***
        advance("=");
        if (state.tokens.next.id === "undefined") ***REMOVED***
          warning("W080", state.tokens.prev, state.tokens.prev.value);
    ***REMOVED***
        if (peek(0).id === "=" && state.tokens.next.identifier) ***REMOVED***
          warning("W120", state.tokens.next, state.tokens.next.value);
    ***REMOVED***
        value = expression(10);
        if (lone) ***REMOVED***
          tokens[0].first = value;
    ***REMOVED*** else ***REMOVED***
          destructuringExpressionMatch(names, value);
    ***REMOVED***
  ***REMOVED***

      if (state.tokens.next.id !== ",") ***REMOVED***
        break;
  ***REMOVED***
      comma();
***REMOVED***
    return this;
  ***REMOVED***);
  varstatement.exps = true;

  var letstatement = stmt("let", function (prefix) ***REMOVED***
    var tokens, lone, value, letblock;

    if (!state.option.inESNext()) ***REMOVED***
      warning("W104", state.tokens.curr, "let");
***REMOVED***

    if (state.tokens.next.value === "(") ***REMOVED***
      if (!state.option.inMoz(true)) ***REMOVED***
        warning("W118", state.tokens.next, "let block");
  ***REMOVED***
      advance("(");
      funct["(blockscope)"].stack();
      letblock = true;
***REMOVED*** else if (funct["(nolet)"]) ***REMOVED***
      error("E048", state.tokens.curr);
***REMOVED***

    this.first = [];
    for (;;) ***REMOVED***
      var names = [];
      if (_.contains(["***REMOVED***", "["], state.tokens.next.value)) ***REMOVED***
        tokens = destructuringExpression();
        lone = false;
  ***REMOVED*** else ***REMOVED***
        tokens = [ ***REMOVED*** id: identifier(), token: state.tokens.curr.value ***REMOVED*** ];
        lone = true;
  ***REMOVED***
      for (var t in tokens) ***REMOVED***
        if (tokens.hasOwnProperty(t)) ***REMOVED***
          t = tokens[t];
          if (state.option.inESNext() && funct[t.id] === "const") ***REMOVED***
            warning("E011", null, t.id);
      ***REMOVED***
          if (funct["(global)"] && predefined[t.id] === false) ***REMOVED***
            warning("W079", t.token, t.id);
      ***REMOVED***
          if (t.id && !funct["(nolet)"]) ***REMOVED***
            addlabel(t.id, ***REMOVED*** type: "unused", token: t.token, islet: true ***REMOVED***);
            names.push(t.token);
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
      if (prefix) ***REMOVED***
        break;
  ***REMOVED***

      this.first = this.first.concat(names);

      if (state.tokens.next.id === "=") ***REMOVED***
        advance("=");
        if (state.tokens.next.id === "undefined") ***REMOVED***
          warning("W080", state.tokens.prev, state.tokens.prev.value);
    ***REMOVED***
        if (peek(0).id === "=" && state.tokens.next.identifier) ***REMOVED***
          warning("W120", state.tokens.next, state.tokens.next.value);
    ***REMOVED***
        value = expression(10);
        if (lone) ***REMOVED***
          tokens[0].first = value;
    ***REMOVED*** else ***REMOVED***
          destructuringExpressionMatch(names, value);
    ***REMOVED***
  ***REMOVED***

      if (state.tokens.next.id !== ",") ***REMOVED***
        break;
  ***REMOVED***
      comma();
***REMOVED***
    if (letblock) ***REMOVED***
      advance(")");
      block(true, true);
      this.block = true;
      funct["(blockscope)"].unstack();
***REMOVED***

    return this;
  ***REMOVED***);
  letstatement.exps = true;

  blockstmt("class", function () ***REMOVED***
    return classdef.call(this, true);
  ***REMOVED***);

  function classdef(stmt) ***REMOVED***
    if (!state.option.inESNext()) ***REMOVED***
      warning("W104", state.tokens.curr, "class");
***REMOVED***
    if (stmt) ***REMOVED***
      this.name = identifier();
      addlabel(this.name, ***REMOVED*** type: "unused", token: state.tokens.curr ***REMOVED***);
***REMOVED*** else if (state.tokens.next.identifier && state.tokens.next.value !== "extends") ***REMOVED***
      this.name = identifier();
***REMOVED***
    classtail(this);
    return this;
  ***REMOVED***

  function classtail(c) ***REMOVED***
    var strictness = state.directive["use strict"];
    if (state.tokens.next.value === "extends") ***REMOVED***
      advance("extends");
      c.heritage = expression(10);
***REMOVED***
    state.directive["use strict"] = true;
    advance("***REMOVED***");
    c.body = state.syntax["***REMOVED***"].nud(true);
    state.directive["use strict"] = strictness;
  ***REMOVED***

  blockstmt("function", function () ***REMOVED***
    var generator = false;
    if (state.tokens.next.value === "*") ***REMOVED***
      advance("*");
      if (state.option.inESNext(true)) ***REMOVED***
        generator = true;
  ***REMOVED*** else ***REMOVED***
        warning("W119", state.tokens.curr, "function*");
  ***REMOVED***
***REMOVED***
    if (inblock) ***REMOVED***
      warning("W082", state.tokens.curr);

***REMOVED***
    var i = identifier();
    if (funct[i] === "const") ***REMOVED***
      warning("E011", null, i);
***REMOVED***
    addlabel(i, ***REMOVED*** type: "unction", token: state.tokens.curr ***REMOVED***);

    doFunction(i, ***REMOVED*** statement: true ***REMOVED***, generator);
    if (state.tokens.next.id === "(" && state.tokens.next.line === state.tokens.curr.line) ***REMOVED***
      error("E039");
***REMOVED***
    return this;
  ***REMOVED***);

  prefix("function", function () ***REMOVED***
    var generator = false;
    if (state.tokens.next.value === "*") ***REMOVED***
      if (!state.option.inESNext()) ***REMOVED***
        warning("W119", state.tokens.curr, "function*");
  ***REMOVED***
      advance("*");
      generator = true;
***REMOVED***
    var i = optionalidentifier();
    doFunction(i, undefined, generator);
    if (!state.option.loopfunc && funct["(loopage)"]) ***REMOVED***
      warning("W083");
***REMOVED***
    return this;
  ***REMOVED***);

  blockstmt("if", function () ***REMOVED***
    var t = state.tokens.next;
    increaseComplexityCount();
    state.condition = true;
    advance("(");
    checkCondAssignment(expression(0));
    advance(")", t);
    state.condition = false;
    block(true, true);
    if (state.tokens.next.id === "else") ***REMOVED***
      advance("else");
      if (state.tokens.next.id === "if" || state.tokens.next.id === "switch") ***REMOVED***
        statement(true);
  ***REMOVED*** else ***REMOVED***
        block(true, true);
  ***REMOVED***
***REMOVED***
    return this;
  ***REMOVED***);

  blockstmt("try", function () ***REMOVED***
    var b;

    function doCatch() ***REMOVED***
      var oldScope = scope;
      var e;

      advance("catch");
      advance("(");

      scope = Object.create(oldScope);

      e = state.tokens.next.value;
      if (state.tokens.next.type !== "(identifier)") ***REMOVED***
        e = null;
        warning("E030", state.tokens.next, e);
  ***REMOVED***

      advance();

      funct = functor("(catch)", state.tokens.next, scope, ***REMOVED***
        "(context)"  : funct,
        "(breakage)" : funct["(breakage)"],
        "(loopage)"  : funct["(loopage)"],
        "(statement)": false,
        "(catch)"    : true
  ***REMOVED***);

      if (e) ***REMOVED***
        addlabel(e, ***REMOVED*** type: "exception" ***REMOVED***);
  ***REMOVED***

      if (state.tokens.next.value === "if") ***REMOVED***
        if (!state.option.inMoz(true)) ***REMOVED***
          warning("W118", state.tokens.curr, "catch filter");
    ***REMOVED***
        advance("if");
        expression(0);
  ***REMOVED***

      advance(")");

      state.tokens.curr.funct = funct;
      functions.push(funct);

      block(false);

      scope = oldScope;

      funct["(last)"] = state.tokens.curr.line;
      funct["(lastcharacter)"] = state.tokens.curr.character;
      funct = funct["(context)"];
***REMOVED***

    block(true);

    while (state.tokens.next.id === "catch") ***REMOVED***
      increaseComplexityCount();
      if (b && (!state.option.inMoz(true))) ***REMOVED***
        warning("W118", state.tokens.next, "multiple catch blocks");
  ***REMOVED***
      doCatch();
      b = true;
***REMOVED***

    if (state.tokens.next.id === "finally") ***REMOVED***
      advance("finally");
      block(true);
      return;
***REMOVED***

    if (!b) ***REMOVED***
      error("E021", state.tokens.next, "catch", state.tokens.next.value);
***REMOVED***

    return this;
  ***REMOVED***);

  blockstmt("while", function () ***REMOVED***
    var t = state.tokens.next;
    funct["(breakage)"] += 1;
    funct["(loopage)"] += 1;
    increaseComplexityCount();
    advance("(");
    checkCondAssignment(expression(0));
    advance(")", t);
    block(true, true);
    funct["(breakage)"] -= 1;
    funct["(loopage)"] -= 1;
    return this;
  ***REMOVED***).labelled = true;

  blockstmt("with", function () ***REMOVED***
    var t = state.tokens.next;
    if (state.directive["use strict"]) ***REMOVED***
      error("E010", state.tokens.curr);
***REMOVED*** else if (!state.option.withstmt) ***REMOVED***
      warning("W085", state.tokens.curr);
***REMOVED***

    advance("(");
    expression(0);
    advance(")", t);
    block(true, true);

    return this;
  ***REMOVED***);

  blockstmt("switch", function () ***REMOVED***
    var t = state.tokens.next;
    var g = false;
    var noindent = false;

    funct["(breakage)"] += 1;
    advance("(");
    checkCondAssignment(expression(0));
    advance(")", t);
    t = state.tokens.next;
    advance("***REMOVED***");

    if (state.tokens.next.from === indent)
      noindent = true;

    if (!noindent)
      indent += state.option.indent;

    this.cases = [];

    for (;;) ***REMOVED***
      switch (state.tokens.next.id) ***REMOVED***
      case "case":
        switch (funct["(verb)"]) ***REMOVED***
        case "yield":
        case "break":
        case "case":
        case "continue":
        case "return":
        case "switch":
        case "throw":
          break;
        default:
          if (!reg.fallsThrough.test(state.lines[state.tokens.next.line - 2])) ***REMOVED***
            warning("W086", state.tokens.curr, "case");
      ***REMOVED***
    ***REMOVED***

        advance("case");
        this.cases.push(expression(0));
        increaseComplexityCount();
        g = true;
        advance(":");
        funct["(verb)"] = "case";
        break;
      case "default":
        switch (funct["(verb)"]) ***REMOVED***
        case "yield":
        case "break":
        case "continue":
        case "return":
        case "throw":
          break;
        default:
          if (this.cases.length) ***REMOVED***
            if (!reg.fallsThrough.test(state.lines[state.tokens.next.line - 2])) ***REMOVED***
              warning("W086", state.tokens.curr, "default");
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***

        advance("default");
        g = true;
        advance(":");
        break;
      case "***REMOVED***":
        if (!noindent)
          indent -= state.option.indent;

        advance("***REMOVED***", t);
        funct["(breakage)"] -= 1;
        funct["(verb)"] = undefined;
        return;
      case "(end)":
        error("E023", state.tokens.next, "***REMOVED***");
        return;
      default:
        indent += state.option.indent;
        if (g) ***REMOVED***
          switch (state.tokens.curr.id) ***REMOVED***
          case ",":
            error("E040");
            return;
          case ":":
            g = false;
            statements();
            break;
          default:
            error("E025", state.tokens.curr);
            return;
      ***REMOVED***
    ***REMOVED*** else ***REMOVED***
          if (state.tokens.curr.id === ":") ***REMOVED***
            advance(":");
            error("E024", state.tokens.curr, ":");
            statements();
      ***REMOVED*** else ***REMOVED***
            error("E021", state.tokens.next, "case", state.tokens.next.value);
            return;
      ***REMOVED***
    ***REMOVED***
        indent -= state.option.indent;
  ***REMOVED***
***REMOVED***
  ***REMOVED***).labelled = true;

  stmt("debugger", function () ***REMOVED***
    if (!state.option.debug) ***REMOVED***
      warning("W087", this);
***REMOVED***
    return this;
  ***REMOVED***).exps = true;

  (function () ***REMOVED***
    var x = stmt("do", function () ***REMOVED***
      funct["(breakage)"] += 1;
      funct["(loopage)"] += 1;
      increaseComplexityCount();

      this.first = block(true, true);
      advance("while");
      var t = state.tokens.next;
      advance("(");
      checkCondAssignment(expression(0));
      advance(")", t);
      funct["(breakage)"] -= 1;
      funct["(loopage)"] -= 1;
      return this;
***REMOVED***);
    x.labelled = true;
    x.exps = true;
  ***REMOVED***());

  blockstmt("for", function () ***REMOVED***
    var s, t = state.tokens.next;
    var letscope = false;
    var foreachtok = null;

    if (t.value === "each") ***REMOVED***
      foreachtok = t;
      advance("each");
      if (!state.option.inMoz(true)) ***REMOVED***
        warning("W118", state.tokens.curr, "for each");
  ***REMOVED***
***REMOVED***

    funct["(breakage)"] += 1;
    funct["(loopage)"] += 1;
    increaseComplexityCount();
    advance("(");
    var nextop; // contains the token of the "in" or "of" operator
    var i = 0;
    var inof = ["in", "of"];
    do ***REMOVED***
      nextop = peek(i);
      ++i;
***REMOVED*** while (!_.contains(inof, nextop.value) && nextop.value !== ";" &&
          nextop.type !== "(end)");
    if (_.contains(inof, nextop.value)) ***REMOVED***
      if (!state.option.inESNext() && nextop.value === "of") ***REMOVED***
        error("W104", nextop, "for of");
  ***REMOVED***

      if (state.tokens.next.id === "var") ***REMOVED***
        advance("var");
        state.syntax["var"].fud.call(state.syntax["var"].fud, true);
  ***REMOVED*** else if (state.tokens.next.id === "let") ***REMOVED***
        advance("let");
        letscope = true;
        funct["(blockscope)"].stack();
        state.syntax["let"].fud.call(state.syntax["let"].fud, true);
  ***REMOVED*** else if (!state.tokens.next.identifier) ***REMOVED***
        error("E030", state.tokens.next, state.tokens.next.type);
        advance();
  ***REMOVED*** else ***REMOVED***
        switch (funct[state.tokens.next.value]) ***REMOVED***
        case "unused":
          funct[state.tokens.next.value] = "var";
          break;
        case "var":
          break;
        default:
          if (!funct["(blockscope)"].getlabel(state.tokens.next.value))
            warning("W088", state.tokens.next, state.tokens.next.value);
    ***REMOVED***
        advance();
  ***REMOVED***
      advance(nextop.value);
      expression(20);
      advance(")", t);
      s = block(true, true);
      if (state.option.forin && s && (s.length > 1 || typeof s[0] !== "object" ||
          s[0].value !== "if")) ***REMOVED***
        warning("W089", this);
  ***REMOVED***
      funct["(breakage)"] -= 1;
      funct["(loopage)"] -= 1;
***REMOVED*** else ***REMOVED***
      if (foreachtok) ***REMOVED***
        error("E045", foreachtok);
  ***REMOVED***
      if (state.tokens.next.id !== ";") ***REMOVED***
        if (state.tokens.next.id === "var") ***REMOVED***
          advance("var");
          state.syntax["var"].fud.call(state.syntax["var"].fud);
    ***REMOVED*** else if (state.tokens.next.id === "let") ***REMOVED***
          advance("let");
          letscope = true;
          funct["(blockscope)"].stack();
          state.syntax["let"].fud.call(state.syntax["let"].fud);
    ***REMOVED*** else ***REMOVED***
          for (;;) ***REMOVED***
            expression(0, "for");
            if (state.tokens.next.id !== ",") ***REMOVED***
              break;
        ***REMOVED***
            comma();
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
      nolinebreak(state.tokens.curr);
      advance(";");
      if (state.tokens.next.id !== ";") ***REMOVED***
        checkCondAssignment(expression(0));
  ***REMOVED***
      nolinebreak(state.tokens.curr);
      advance(";");
      if (state.tokens.next.id === ";") ***REMOVED***
        error("E021", state.tokens.next, ")", ";");
  ***REMOVED***
      if (state.tokens.next.id !== ")") ***REMOVED***
        for (;;) ***REMOVED***
          expression(0, "for");
          if (state.tokens.next.id !== ",") ***REMOVED***
            break;
      ***REMOVED***
          comma();
    ***REMOVED***
  ***REMOVED***
      advance(")", t);
      block(true, true);
      funct["(breakage)"] -= 1;
      funct["(loopage)"] -= 1;

***REMOVED***
    if (letscope) ***REMOVED***
      funct["(blockscope)"].unstack();
***REMOVED***
    return this;
  ***REMOVED***).labelled = true;


  stmt("break", function () ***REMOVED***
    var v = state.tokens.next.value;

    if (funct["(breakage)"] === 0)
      warning("W052", state.tokens.next, this.value);

    if (!state.option.asi)
      nolinebreak(this);

    if (state.tokens.next.id !== ";" && !state.tokens.next.reach) ***REMOVED***
      if (state.tokens.curr.line === state.tokens.next.line) ***REMOVED***
        if (funct[v] !== "label") ***REMOVED***
          warning("W090", state.tokens.next, v);
    ***REMOVED*** else if (scope[v] !== funct) ***REMOVED***
          warning("W091", state.tokens.next, v);
    ***REMOVED***
        this.first = state.tokens.next;
        advance();
  ***REMOVED***
***REMOVED***
    reachable("break");
    return this;
  ***REMOVED***).exps = true;


  stmt("continue", function () ***REMOVED***
    var v = state.tokens.next.value;

    if (funct["(breakage)"] === 0)
      warning("W052", state.tokens.next, this.value);

    if (!state.option.asi)
      nolinebreak(this);

    if (state.tokens.next.id !== ";" && !state.tokens.next.reach) ***REMOVED***
      if (state.tokens.curr.line === state.tokens.next.line) ***REMOVED***
        if (funct[v] !== "label") ***REMOVED***
          warning("W090", state.tokens.next, v);
    ***REMOVED*** else if (scope[v] !== funct) ***REMOVED***
          warning("W091", state.tokens.next, v);
    ***REMOVED***
        this.first = state.tokens.next;
        advance();
  ***REMOVED***
***REMOVED*** else if (!funct["(loopage)"]) ***REMOVED***
      warning("W052", state.tokens.next, this.value);
***REMOVED***
    reachable("continue");
    return this;
  ***REMOVED***).exps = true;


  stmt("return", function () ***REMOVED***
    if (this.line === state.tokens.next.line) ***REMOVED***
      if (state.tokens.next.id !== ";" && !state.tokens.next.reach) ***REMOVED***
        this.first = expression(0);

        if (this.first &&
            this.first.type === "(punctuator)" && this.first.value === "=" &&
            !this.first.paren && !state.option.boss) ***REMOVED***
          warningAt("W093", this.first.line, this.first.character);
    ***REMOVED***
  ***REMOVED***
***REMOVED*** else ***REMOVED***
      if (state.tokens.next.type === "(punctuator)" &&
        ["[", "***REMOVED***", "+", "-"].indexOf(state.tokens.next.value) > -1) ***REMOVED***
        nolinebreak(this); // always warn (Line breaking error)
  ***REMOVED***
***REMOVED***
    reachable("return");
    return this;
  ***REMOVED***).exps = true;

  (function (x) ***REMOVED***
    x.exps = true;
    x.lbp = 25;
  ***REMOVED***(prefix("yield", function () ***REMOVED***
    var prev = state.tokens.prev;
    if (state.option.inESNext(true) && !funct["(generator)"]) ***REMOVED***
      if (!("(catch)" === funct["(name)"] && funct["(context)"]["(generator)"])) ***REMOVED***
        error("E046", state.tokens.curr, "yield");
  ***REMOVED***
***REMOVED*** else if (!state.option.inESNext()) ***REMOVED***
      warning("W104", state.tokens.curr, "yield");
***REMOVED***
    funct["(generator)"] = "yielded";
    if (this.line === state.tokens.next.line || !state.option.inMoz(true)) ***REMOVED***
      if (state.tokens.next.id !== ";" && !state.tokens.next.reach && state.tokens.next.nud) ***REMOVED***
        nobreaknonadjacent(state.tokens.curr, state.tokens.next);
        this.first = expression(10);

        if (this.first.type === "(punctuator)" && this.first.value === "=" &&
            !this.first.paren && !state.option.boss) ***REMOVED***
          warningAt("W093", this.first.line, this.first.character);
    ***REMOVED***
  ***REMOVED***

      if (state.option.inMoz(true) && state.tokens.next.id !== ")" &&
          (prev.lbp > 30 || (!prev.assign && !isEndOfExpr()) || prev.id === "yield")) ***REMOVED***
        error("E050", this);
  ***REMOVED***
***REMOVED*** else if (!state.option.asi) ***REMOVED***
      nolinebreak(this); // always warn (Line breaking error)
***REMOVED***
    return this;
  ***REMOVED***)));


  stmt("throw", function () ***REMOVED***
    nolinebreak(this);
    this.first = expression(20);
    reachable("throw");
    return this;
  ***REMOVED***).exps = true;

  stmt("import", function () ***REMOVED***
    if (!state.option.inESNext()) ***REMOVED***
      warning("W119", state.tokens.curr, "import");
***REMOVED***

    if (state.tokens.next.type === "(string)") ***REMOVED***
      advance("(string)");
      return this;
***REMOVED***
    if (state.tokens.next.identifier) ***REMOVED***
      this.name = identifier();
      addlabel(this.name, ***REMOVED*** type: "unused", token: state.tokens.curr ***REMOVED***);
***REMOVED*** else ***REMOVED***
      advance("***REMOVED***");
      for (;;) ***REMOVED***
        if (state.tokens.next.value === "***REMOVED***") ***REMOVED***
          advance("***REMOVED***");
          break;
    ***REMOVED***
        var importName;
        if (state.tokens.next.type === "default") ***REMOVED***
          importName = "default";
          advance("default");
    ***REMOVED*** else ***REMOVED***
          importName = identifier();
    ***REMOVED***
        if (state.tokens.next.value === "as") ***REMOVED***
          advance("as");
          importName = identifier();
    ***REMOVED***
        addlabel(importName, ***REMOVED*** type: "unused", token: state.tokens.curr ***REMOVED***);

        if (state.tokens.next.value === ",") ***REMOVED***
          advance(",");
    ***REMOVED*** else if (state.tokens.next.value === "***REMOVED***") ***REMOVED***
          advance("***REMOVED***");
          break;
    ***REMOVED*** else ***REMOVED***
          error("E024", state.tokens.next, state.tokens.next.value);
          break;
    ***REMOVED***
  ***REMOVED***
***REMOVED***

    advance("from");
    advance("(string)");
    return this;
  ***REMOVED***).exps = true;

  stmt("export", function () ***REMOVED***
    if (!state.option.inESNext()) ***REMOVED***
      warning("W119", state.tokens.curr, "export");
***REMOVED***

    if (state.tokens.next.type === "default") ***REMOVED***
      advance("default");
      if (state.tokens.next.id === "function" || state.tokens.next.id === "class") ***REMOVED***
        this.block = true;
  ***REMOVED***
      this.exportee = expression(10);

      return this;
***REMOVED***

    if (state.tokens.next.value === "***REMOVED***") ***REMOVED***
      advance("***REMOVED***");
      for (;;) ***REMOVED***
        exported[identifier()] = true;

        if (state.tokens.next.value === ",") ***REMOVED***
          advance(",");
    ***REMOVED*** else if (state.tokens.next.value === "***REMOVED***") ***REMOVED***
          advance("***REMOVED***");
          break;
    ***REMOVED*** else ***REMOVED***
          error("E024", state.tokens.next, state.tokens.next.value);
          break;
    ***REMOVED***
  ***REMOVED***
      return this;
***REMOVED***

    if (state.tokens.next.id === "var") ***REMOVED***
      advance("var");
      exported[state.tokens.next.value] = true;
      state.syntax["var"].fud.call(state.syntax["var"].fud);
***REMOVED*** else if (state.tokens.next.id === "let") ***REMOVED***
      advance("let");
      exported[state.tokens.next.value] = true;
      state.syntax["let"].fud.call(state.syntax["let"].fud);
***REMOVED*** else if (state.tokens.next.id === "const") ***REMOVED***
      advance("const");
      exported[state.tokens.next.value] = true;
      state.syntax["const"].fud.call(state.syntax["const"].fud);
***REMOVED*** else if (state.tokens.next.id === "function") ***REMOVED***
      this.block = true;
      advance("function");
      exported[state.tokens.next.value] = true;
      state.syntax["function"].fud();
***REMOVED*** else if (state.tokens.next.id === "class") ***REMOVED***
      this.block = true;
      advance("class");
      exported[state.tokens.next.value] = true;
      state.syntax["class"].fud();
***REMOVED*** else ***REMOVED***
      error("E024", state.tokens.next, state.tokens.next.value);
***REMOVED***

    return this;
  ***REMOVED***).exps = true;

  FutureReservedWord("abstract");
  FutureReservedWord("boolean");
  FutureReservedWord("byte");
  FutureReservedWord("char");
  FutureReservedWord("class", ***REMOVED*** es5: true, nud: classdef ***REMOVED***);
  FutureReservedWord("double");
  FutureReservedWord("enum", ***REMOVED*** es5: true ***REMOVED***);
  FutureReservedWord("export", ***REMOVED*** es5: true ***REMOVED***);
  FutureReservedWord("extends", ***REMOVED*** es5: true ***REMOVED***);
  FutureReservedWord("final");
  FutureReservedWord("float");
  FutureReservedWord("goto");
  FutureReservedWord("implements", ***REMOVED*** es5: true, strictOnly: true ***REMOVED***);
  FutureReservedWord("import", ***REMOVED*** es5: true ***REMOVED***);
  FutureReservedWord("int");
  FutureReservedWord("interface", ***REMOVED*** es5: true, strictOnly: true ***REMOVED***);
  FutureReservedWord("long");
  FutureReservedWord("native");
  FutureReservedWord("package", ***REMOVED*** es5: true, strictOnly: true ***REMOVED***);
  FutureReservedWord("private", ***REMOVED*** es5: true, strictOnly: true ***REMOVED***);
  FutureReservedWord("protected", ***REMOVED*** es5: true, strictOnly: true ***REMOVED***);
  FutureReservedWord("public", ***REMOVED*** es5: true, strictOnly: true ***REMOVED***);
  FutureReservedWord("short");
  FutureReservedWord("static", ***REMOVED*** es5: true, strictOnly: true ***REMOVED***);
  FutureReservedWord("super", ***REMOVED*** es5: true ***REMOVED***);
  FutureReservedWord("synchronized");
  FutureReservedWord("throws");
  FutureReservedWord("transient");
  FutureReservedWord("volatile");

  var lookupBlockType = function () ***REMOVED***
    var pn, pn1;
    var i = -1;
    var bracketStack = 0;
    var ret = ***REMOVED******REMOVED***;
    if (_.contains(["[", "***REMOVED***"], state.tokens.curr.value))
      bracketStack += 1;
    do ***REMOVED***
      pn = (i === -1) ? state.tokens.next : peek(i);
      pn1 = peek(i + 1);
      i = i + 1;
      if (_.contains(["[", "***REMOVED***"], pn.value)) ***REMOVED***
        bracketStack += 1;
  ***REMOVED*** else if (_.contains(["]", "***REMOVED***"], pn.value)) ***REMOVED***
        bracketStack -= 1;
  ***REMOVED***
      if (pn.identifier && pn.value === "for" && bracketStack === 1) ***REMOVED***
        ret.isCompArray = true;
        ret.notJson = true;
        break;
  ***REMOVED***
      if (_.contains(["***REMOVED***", "]"], pn.value) && pn1.value === "=" && bracketStack === 0) ***REMOVED***
        ret.isDestAssign = true;
        ret.notJson = true;
        break;
  ***REMOVED***
      if (pn.value === ";") ***REMOVED***
        ret.isBlock = true;
        ret.notJson = true;
  ***REMOVED***
***REMOVED*** while (bracketStack > 0 && pn.id !== "(end)" && i < 15);
    return ret;
  ***REMOVED***;
  function destructuringAssignOrJsonValue() ***REMOVED***

    var block = lookupBlockType();
    if (block.notJson) ***REMOVED***
      if (!state.option.inESNext() && block.isDestAssign) ***REMOVED***
        warning("W104", state.tokens.curr, "destructuring assignment");
  ***REMOVED***
      statements();
***REMOVED*** else ***REMOVED***
      state.option.laxbreak = true;
      state.jsonMode = true;
      jsonValue();
***REMOVED***
  ***REMOVED***

  var arrayComprehension = function () ***REMOVED***
    var CompArray = function () ***REMOVED***
      this.mode = "use";
      this.variables = [];
***REMOVED***;
    var _carrays = [];
    var _current;
    function declare(v) ***REMOVED***
      var l = _current.variables.filter(function (elt) ***REMOVED***
        if (elt.value === v) ***REMOVED***
          elt.undef = false;
          return v;
    ***REMOVED***
  ***REMOVED***).length;
      return l !== 0;
***REMOVED***
    function use(v) ***REMOVED***
      var l = _current.variables.filter(function (elt) ***REMOVED***
        if (elt.value === v && !elt.undef) ***REMOVED***
          if (elt.unused === true) ***REMOVED***
            elt.unused = false;
      ***REMOVED***
          return v;
    ***REMOVED***
  ***REMOVED***).length;
      return (l === 0);
***REMOVED***
    return ***REMOVED***stack: function () ***REMOVED***
          _current = new CompArray();
          _carrays.push(_current);
    ***REMOVED***
        unstack: function () ***REMOVED***
          _current.variables.filter(function (v) ***REMOVED***
            if (v.unused)
              warning("W098", v.token, v.value);
            if (v.undef)
              isundef(v.funct, "W117", v.token, v.value);
      ***REMOVED***);
          _carrays.splice(-1, 1);
          _current = _carrays[_carrays.length - 1];
    ***REMOVED***
        setState: function (s) ***REMOVED***
          if (_.contains(["use", "define", "generate", "filter"], s))
            _current.mode = s;
    ***REMOVED***
        check: function (v) ***REMOVED***
          if (!_current) ***REMOVED***
            return;
      ***REMOVED***
          if (_current && _current.mode === "use") ***REMOVED***
            if (use(v)) ***REMOVED***
              _current.variables.push(***REMOVED***
                funct: funct,
                token: state.tokens.curr,
                value: v,
                undef: true,
                unused: false
          ***REMOVED***);
        ***REMOVED***
            return true;
      ***REMOVED*** else if (_current && _current.mode === "define") ***REMOVED***
            if (!declare(v)) ***REMOVED***
              _current.variables.push(***REMOVED***
                funct: funct,
                token: state.tokens.curr,
                value: v,
                undef: false,
                unused: true
          ***REMOVED***);
        ***REMOVED***
            return true;
      ***REMOVED*** else if (_current && _current.mode === "generate") ***REMOVED***
            isundef(funct, "W117", state.tokens.curr, v);
            return true;
      ***REMOVED*** else if (_current && _current.mode === "filter") ***REMOVED***
            if (use(v)) ***REMOVED***
              isundef(funct, "W117", state.tokens.curr, v);
        ***REMOVED***
            return true;
      ***REMOVED***
          return false;
    ***REMOVED***
    ***REMOVED***;
  ***REMOVED***;

  function jsonValue() ***REMOVED***
    function jsonObject() ***REMOVED***
      var o = ***REMOVED******REMOVED***, t = state.tokens.next;
      advance("***REMOVED***");
      if (state.tokens.next.id !== "***REMOVED***") ***REMOVED***
        for (;;) ***REMOVED***
          if (state.tokens.next.id === "(end)") ***REMOVED***
            error("E026", state.tokens.next, t.line);
      ***REMOVED*** else if (state.tokens.next.id === "***REMOVED***") ***REMOVED***
            warning("W094", state.tokens.curr);
            break;
      ***REMOVED*** else if (state.tokens.next.id === ",") ***REMOVED***
            error("E028", state.tokens.next);
      ***REMOVED*** else if (state.tokens.next.id !== "(string)") ***REMOVED***
            warning("W095", state.tokens.next, state.tokens.next.value);
      ***REMOVED***
          if (o[state.tokens.next.value] === true) ***REMOVED***
            warning("W075", state.tokens.next, state.tokens.next.value);
      ***REMOVED*** else if ((state.tokens.next.value === "__proto__" &&
            !state.option.proto) || (state.tokens.next.value === "__iterator__" &&
            !state.option.iterator)) ***REMOVED***
            warning("W096", state.tokens.next, state.tokens.next.value);
      ***REMOVED*** else ***REMOVED***
            o[state.tokens.next.value] = true;
      ***REMOVED***
          advance();
          advance(":");
          jsonValue();
          if (state.tokens.next.id !== ",") ***REMOVED***
            break;
      ***REMOVED***
          advance(",");
    ***REMOVED***
  ***REMOVED***
      advance("***REMOVED***");
***REMOVED***

    function jsonArray() ***REMOVED***
      var t = state.tokens.next;
      advance("[");
      if (state.tokens.next.id !== "]") ***REMOVED***
        for (;;) ***REMOVED***
          if (state.tokens.next.id === "(end)") ***REMOVED***
            error("E027", state.tokens.next, t.line);
      ***REMOVED*** else if (state.tokens.next.id === "]") ***REMOVED***
            warning("W094", state.tokens.curr);
            break;
      ***REMOVED*** else if (state.tokens.next.id === ",") ***REMOVED***
            error("E028", state.tokens.next);
      ***REMOVED***
          jsonValue();
          if (state.tokens.next.id !== ",") ***REMOVED***
            break;
      ***REMOVED***
          advance(",");
    ***REMOVED***
  ***REMOVED***
      advance("]");
***REMOVED***

    switch (state.tokens.next.id) ***REMOVED***
    case "***REMOVED***":
      jsonObject();
      break;
    case "[":
      jsonArray();
      break;
    case "true":
    case "false":
    case "null":
    case "(number)":
    case "(string)":
      advance();
      break;
    case "-":
      advance("-");
      advance("(number)");
      break;
    default:
      error("E003", state.tokens.next);
***REMOVED***
  ***REMOVED***

  var blockScope = function () ***REMOVED***
    var _current = ***REMOVED******REMOVED***;
    var _variables = [_current];

    function _checkBlockLabels() ***REMOVED***
      for (var t in _current) ***REMOVED***
        if (_current[t]["(type)"] === "unused") ***REMOVED***
          if (state.option.unused) ***REMOVED***
            var tkn = _current[t]["(token)"];
            var line = tkn.line;
            var chr  = tkn.character;
            warningAt("W098", line, chr, t);
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
***REMOVED***

    return ***REMOVED***
      stack: function () ***REMOVED***
        _current = ***REMOVED******REMOVED***;
        _variables.push(_current);
  ***REMOVED***

      unstack: function () ***REMOVED***
        _checkBlockLabels();
        _variables.splice(_variables.length - 1, 1);
        _current = _.last(_variables);
  ***REMOVED***

      getlabel: function (l) ***REMOVED***
        for (var i = _variables.length - 1 ; i >= 0; --i) ***REMOVED***
          if (_.has(_variables[i], l) && !_variables[i][l]["(shadowed)"]) ***REMOVED***
            return _variables[i];
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***

      shadow: function (name) ***REMOVED***
        for (var i = _variables.length - 1; i >= 0; i--) ***REMOVED***
          if (_.has(_variables[i], name)) ***REMOVED***
            _variables[i][name]["(shadowed)"] = true;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***

      unshadow: function (name) ***REMOVED***
        for (var i = _variables.length - 1; i >= 0; i--) ***REMOVED***
          if (_.has(_variables[i], name)) ***REMOVED***
            _variables[i][name]["(shadowed)"] = false;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***

      current: ***REMOVED***
        has: function (t) ***REMOVED***
          return _.has(_current, t);
    ***REMOVED***

        add: function (t, type, tok) ***REMOVED***
          _current[t] = ***REMOVED*** "(type)" : type, "(token)": tok, "(shadowed)": false ***REMOVED***;
    ***REMOVED***
  ***REMOVED***
***REMOVED***;
  ***REMOVED***;
  var itself = function (s, o, g) ***REMOVED***
    var i, k, x;
    var optionKeys;
    var newOptionObj = ***REMOVED******REMOVED***;
    var newIgnoredObj = ***REMOVED******REMOVED***;

    o = _.clone(o);
    state.reset();

    if (o && o.scope) ***REMOVED***
      JSHINT.scope = o.scope;
***REMOVED*** else ***REMOVED***
      JSHINT.errors = [];
      JSHINT.undefs = [];
      JSHINT.internals = [];
      JSHINT.blacklist = ***REMOVED******REMOVED***;
      JSHINT.scope = "(main)";
***REMOVED***

    predefined = Object.create(null);
    combine(predefined, vars.ecmaIdentifiers);
    combine(predefined, vars.reservedVars);

    combine(predefined, g || ***REMOVED******REMOVED***);

    declared = Object.create(null);
    exported = Object.create(null);

    function each(obj, cb) ***REMOVED***
      if (!obj)
        return;

      if (!Array.isArray(obj) && typeof obj === "object")
        obj = Object.keys(obj);

      obj.forEach(cb);
***REMOVED***

    if (o) ***REMOVED***
      each(o.predef || null, function (item) ***REMOVED***
        var slice, prop;

        if (item[0] === "-") ***REMOVED***
          slice = item.slice(1);
          JSHINT.blacklist[slice] = slice;
    ***REMOVED*** else ***REMOVED***
          prop = Object.getOwnPropertyDescriptor(o.predef, item);
          predefined[item] = prop ? prop.value : false;
    ***REMOVED***
  ***REMOVED***);

      each(o.exported || null, function (item) ***REMOVED***
        exported[item] = true;
  ***REMOVED***);

      delete o.predef;
      delete o.exported;

      optionKeys = Object.keys(o);
      for (x = 0; x < optionKeys.length; x++) ***REMOVED***
        if (/^-W\d***REMOVED***3***REMOVED***$/g.test(optionKeys[x])) ***REMOVED***
          newIgnoredObj[optionKeys[x].slice(1)] = true;
    ***REMOVED*** else ***REMOVED***
          newOptionObj[optionKeys[x]] = o[optionKeys[x]];

          if (optionKeys[x] === "newcap" && o[optionKeys[x]] === false)
            newOptionObj["(explicitNewcap)"] = true;
    ***REMOVED***
  ***REMOVED***
***REMOVED***

    state.option = newOptionObj;
    state.ignored = newIgnoredObj;

    state.option.indent = state.option.indent || 4;
    state.option.maxerr = state.option.maxerr || 50;

    indent = 1;
    global = Object.create(predefined);
    scope = global;

    funct = functor("(global)", null, scope, ***REMOVED***
      "(global)"    : true,
      "(blockscope)": blockScope(),
      "(comparray)" : arrayComprehension(),
      "(metrics)"   : createMetrics(state.tokens.next)
***REMOVED***);

    functions = [funct];
    urls = [];
    stack = null;
    member = ***REMOVED******REMOVED***;
    membersOnly = null;
    implied = ***REMOVED******REMOVED***;
    inblock = false;
    lookahead = [];
    unuseds = [];

    if (!isString(s) && !Array.isArray(s)) ***REMOVED***
      errorAt("E004", 0);
      return false;
***REMOVED***

    api = ***REMOVED***
      get isJSON() ***REMOVED***
        return state.jsonMode;
  ***REMOVED***

      getOption: function (name) ***REMOVED***
        return state.option[name] || null;
  ***REMOVED***

      getCache: function (name) ***REMOVED***
        return state.cache[name];
  ***REMOVED***

      setCache: function (name, value) ***REMOVED***
        state.cache[name] = value;
  ***REMOVED***

      warn: function (code, data) ***REMOVED***
        warningAt.apply(null, [ code, data.line, data.char ].concat(data.data));
  ***REMOVED***

      on: function (names, listener) ***REMOVED***
        names.split(" ").forEach(function (name) ***REMOVED***
          emitter.on(name, listener);
    ***REMOVED***.bind(this));
  ***REMOVED***
***REMOVED***;

    emitter.removeAllListeners();
    (extraModules || []).forEach(function (func) ***REMOVED***
      func(api);
***REMOVED***);

    state.tokens.prev = state.tokens.curr = state.tokens.next = state.syntax["(begin)"];

    lex = new Lexer(s);

    lex.on("warning", function (ev) ***REMOVED***
      warningAt.apply(null, [ ev.code, ev.line, ev.character].concat(ev.data));
***REMOVED***);

    lex.on("error", function (ev) ***REMOVED***
      errorAt.apply(null, [ ev.code, ev.line, ev.character ].concat(ev.data));
***REMOVED***);

    lex.on("fatal", function (ev) ***REMOVED***
      quit("E041", ev.line, ev.from);
***REMOVED***);

    lex.on("Identifier", function (ev) ***REMOVED***
      emitter.emit("Identifier", ev);
***REMOVED***);

    lex.on("String", function (ev) ***REMOVED***
      emitter.emit("String", ev);
***REMOVED***);

    lex.on("Number", function (ev) ***REMOVED***
      emitter.emit("Number", ev);
***REMOVED***);

    lex.start();
    for (var name in o) ***REMOVED***
      if (_.has(o, name)) ***REMOVED***
        checkOption(name, state.tokens.curr);
  ***REMOVED***
***REMOVED***

    assume();
    combine(predefined, g || ***REMOVED******REMOVED***);
    comma.first = true;

    try ***REMOVED***
      advance();
      switch (state.tokens.next.id) ***REMOVED***
      case "***REMOVED***":
      case "[":
        destructuringAssignOrJsonValue();
        break;
      default:
        directives();

        if (state.directive["use strict"]) ***REMOVED***
          if (!state.option.globalstrict && !(state.option.node || state.option.phantom)) ***REMOVED***
            warning("W097", state.tokens.prev);
      ***REMOVED***
    ***REMOVED***

        statements();
  ***REMOVED***
      advance((state.tokens.next && state.tokens.next.value !== ".")  ? "(end)" : undefined);
      funct["(blockscope)"].unstack();

      var markDefined = function (name, context) ***REMOVED***
        do ***REMOVED***
          if (typeof context[name] === "string") ***REMOVED***

            if (context[name] === "unused")
              context[name] = "var";
            else if (context[name] === "unction")
              context[name] = "closure";

            return true;
      ***REMOVED***

          context = context["(context)"];
    ***REMOVED*** while (context);

        return false;
  ***REMOVED***;

      var clearImplied = function (name, line) ***REMOVED***
        if (!implied[name])
          return;

        var newImplied = [];
        for (var i = 0; i < implied[name].length; i += 1) ***REMOVED***
          if (implied[name][i] !== line)
            newImplied.push(implied[name][i]);
    ***REMOVED***

        if (newImplied.length === 0)
          delete implied[name];
        else
          implied[name] = newImplied;
  ***REMOVED***;

      var warnUnused = function (name, tkn, type, unused_opt) ***REMOVED***
        var line = tkn.line;
        var chr  = tkn.character;

        if (unused_opt === undefined) ***REMOVED***
          unused_opt = state.option.unused;
    ***REMOVED***

        if (unused_opt === true) ***REMOVED***
          unused_opt = "last-param";
    ***REMOVED***

        var warnable_types = ***REMOVED***
          "vars": ["var"],
          "last-param": ["var", "param"],
          "strict": ["var", "param", "last-param"]
    ***REMOVED***;

        if (unused_opt) ***REMOVED***
          if (warnable_types[unused_opt] && warnable_types[unused_opt].indexOf(type) !== -1) ***REMOVED***
            warningAt("W098", line, chr, name);
      ***REMOVED***
    ***REMOVED***

        unuseds.push(***REMOVED***
          name: name,
          line: line,
          character: chr
    ***REMOVED***);
  ***REMOVED***;

      var checkUnused = function (func, key) ***REMOVED***
        var type = func[key];
        var tkn = func["(tokens)"][key];

        if (key.charAt(0) === "(")
          return;

        if (type !== "unused" && type !== "unction" && type !== "const")
          return;
        if (func["(params)"] && func["(params)"].indexOf(key) !== -1)
          return;
        if (func["(global)"] && _.has(exported, key))
          return;
        if (type === "const" && !getprop(func, key, "unused"))
          return;

        warnUnused(key, tkn, "var");
  ***REMOVED***;
      for (i = 0; i < JSHINT.undefs.length; i += 1) ***REMOVED***
        k = JSHINT.undefs[i].slice(0);

        if (markDefined(k[2].value, k[0])) ***REMOVED***
          clearImplied(k[2].value, k[2].line);
    ***REMOVED*** else if (state.option.undef) ***REMOVED***
          warning.apply(warning, k.slice(1));
    ***REMOVED***
  ***REMOVED***

      functions.forEach(function (func) ***REMOVED***
        if (func["(unusedOption)"] === false) ***REMOVED***
          return;
    ***REMOVED***

        for (var key in func) ***REMOVED***
          if (_.has(func, key)) ***REMOVED***
            checkUnused(func, key);
      ***REMOVED***
    ***REMOVED***

        if (!func["(params)"])
          return;

        var params = func["(params)"].slice();
        var param  = params.pop();
        var type, unused_opt;

        while (param) ***REMOVED***
          type = func[param];
          unused_opt = func["(unusedOption)"] || state.option.unused;
          unused_opt = unused_opt === true ? "last-param" : unused_opt;

          if (param === "undefined")
            return;

          if (type === "unused" || type === "unction") ***REMOVED***
            warnUnused(param, func["(tokens)"][param], "param", func["(unusedOption)"]);
      ***REMOVED*** else if (unused_opt === "last-param") ***REMOVED***
            return;
      ***REMOVED***

          param = params.pop();
    ***REMOVED***
  ***REMOVED***);

      for (var key in declared) ***REMOVED***
        if (_.has(declared, key) && !_.has(global, key) && !_.has(exported, key)) ***REMOVED***
          warnUnused(key, declared[key], "var");
    ***REMOVED***
  ***REMOVED***

***REMOVED*** catch (err) ***REMOVED***
      if (err && err.name === "JSHintError") ***REMOVED***
        var nt = state.tokens.next || ***REMOVED******REMOVED***;
        JSHINT.errors.push(***REMOVED***
          scope     : "(main)",
          raw       : err.raw,
          code      : err.code,
          reason    : err.message,
          line      : err.line || nt.line,
          character : err.character || nt.from
    ***REMOVED*** null);
  ***REMOVED*** else ***REMOVED***
        throw err;
  ***REMOVED***
***REMOVED***

    if (JSHINT.scope === "(main)") ***REMOVED***
      o = o || ***REMOVED******REMOVED***;

      for (i = 0; i < JSHINT.internals.length; i += 1) ***REMOVED***
        k = JSHINT.internals[i];
        o.scope = k.elem;
        itself(k.value, o, g);
  ***REMOVED***
***REMOVED***

    return JSHINT.errors.length === 0;
  ***REMOVED***;
  itself.addModule = function (func) ***REMOVED***
    extraModules.push(func);
  ***REMOVED***;

  itself.addModule(style.register);
  itself.data = function () ***REMOVED***
    var data = ***REMOVED***
      functions: [],
      options: state.option
***REMOVED***;

    var implieds = [];
    var members = [];
    var fu, f, i, j, n, globals;

    if (itself.errors.length) ***REMOVED***
      data.errors = itself.errors;
***REMOVED***

    if (state.jsonMode) ***REMOVED***
      data.json = true;
***REMOVED***

    for (n in implied) ***REMOVED***
      if (_.has(implied, n)) ***REMOVED***
        implieds.push(***REMOVED***
          name: n,
          line: implied[n]
    ***REMOVED***);
  ***REMOVED***
***REMOVED***

    if (implieds.length > 0) ***REMOVED***
      data.implieds = implieds;
***REMOVED***

    if (urls.length > 0) ***REMOVED***
      data.urls = urls;
***REMOVED***

    globals = Object.keys(scope);
    if (globals.length > 0) ***REMOVED***
      data.globals = globals;
***REMOVED***

    for (i = 1; i < functions.length; i += 1) ***REMOVED***
      f = functions[i];
      fu = ***REMOVED******REMOVED***;

      for (j = 0; j < functionicity.length; j += 1) ***REMOVED***
        fu[functionicity[j]] = [];
  ***REMOVED***

      for (j = 0; j < functionicity.length; j += 1) ***REMOVED***
        if (fu[functionicity[j]].length === 0) ***REMOVED***
          delete fu[functionicity[j]];
    ***REMOVED***
  ***REMOVED***

      fu.name = f["(name)"];
      fu.param = f["(params)"];
      fu.line = f["(line)"];
      fu.character = f["(character)"];
      fu.last = f["(last)"];
      fu.lastcharacter = f["(lastcharacter)"];

      fu.metrics = ***REMOVED***
        complexity: f["(metrics)"].ComplexityCount,
        parameters: (f["(params)"] || []).length,
        statements: f["(metrics)"].statementCount
  ***REMOVED***;

      data.functions.push(fu);
***REMOVED***

    if (unuseds.length > 0) ***REMOVED***
      data.unused = unuseds;
***REMOVED***

    members = [];
    for (n in member) ***REMOVED***
      if (typeof member[n] === "number") ***REMOVED***
        data.member = member;
        break;
  ***REMOVED***
***REMOVED***

    return data;
  ***REMOVED***;

  itself.jshint = itself;

  return itself;
***REMOVED***());
if (typeof exports === "object" && exports) ***REMOVED***
  exports.JSHINT = JSHINT;
***REMOVED***

***REMOVED***,
***REMOVED***"./lex.js":4,"./messages.js":5,"./reg.js":6,"./state.js":7,"./style.js":8,"./vars.js":9,"events":10,"underscore":2***REMOVED***],
4:[function(_dereq_,module,exports)***REMOVED***



var _      = _dereq_("underscore");
var events = _dereq_("events");
var reg    = _dereq_("./reg.js");
var state  = _dereq_("./state.js").state;

var unicodeData = _dereq_("../data/ascii-identifier-data.js");
var asciiIdentifierStartTable = unicodeData.asciiIdentifierStartTable;
var asciiIdentifierPartTable = unicodeData.asciiIdentifierPartTable;

var Token = ***REMOVED***
  Identifier: 1,
  Punctuator: 2,
  NumericLiteral: 3,
  StringLiteral: 4,
  Comment: 5,
  Keyword: 6,
  NullLiteral: 7,
  BooleanLiteral: 8,
  RegExp: 9,
  TemplateLiteral: 10
***REMOVED***;

function asyncTrigger() ***REMOVED***
  var _checks = [];

  return ***REMOVED***
    push: function (fn) ***REMOVED***
      _checks.push(fn);
***REMOVED***

    check: function () ***REMOVED***
      for (var check = 0; check < _checks.length; ++check) ***REMOVED***
        _checks[check]();
  ***REMOVED***

      _checks.splice(0, _checks.length);
***REMOVED***
  ***REMOVED***;
***REMOVED***
function Lexer(source) ***REMOVED***
  var lines = source;

  if (typeof lines === "string") ***REMOVED***
    lines = lines
      .replace(/\r\n/g, "\n")
      .replace(/\r/g, "\n")
      .split("\n");
  ***REMOVED***

  if (lines[0] && lines[0].substr(0, 2) === "#!") ***REMOVED***
    if (lines[0].indexOf("node") !== -1) ***REMOVED***
      state.option.node = true;
***REMOVED***
    lines[0] = "";
  ***REMOVED***

  this.emitter = new events.EventEmitter();
  this.source = source;
  this.setLines(lines);
  this.prereg = true;

  this.line = 0;
  this.char = 1;
  this.from = 1;
  this.input = "";
  this.inComment = false;

  for (var i = 0; i < state.option.indent; i += 1) ***REMOVED***
    state.tab += " ";
  ***REMOVED***
***REMOVED***

Lexer.prototype = ***REMOVED***
  _lines: [],

  getLines: function () ***REMOVED***
    this._lines = state.lines;
    return this._lines;
  ***REMOVED***,

  setLines: function (val) ***REMOVED***
    this._lines = val;
    state.lines = this._lines;
  ***REMOVED***,
  peek: function (i) ***REMOVED***
    return this.input.charAt(i || 0);
  ***REMOVED***,
  skip: function (i) ***REMOVED***
    i = i || 1;
    this.char += i;
    this.input = this.input.slice(i);
  ***REMOVED***,
  on: function (names, listener) ***REMOVED***
    names.split(" ").forEach(function (name) ***REMOVED***
      this.emitter.on(name, listener);
***REMOVED***.bind(this));
  ***REMOVED***,
  trigger: function () ***REMOVED***
    this.emitter.emit.apply(this.emitter, Array.prototype.slice.call(arguments));
  ***REMOVED***,
  triggerAsync: function (type, args, checks, fn) ***REMOVED***
    checks.push(function () ***REMOVED***
      if (fn()) ***REMOVED***
        this.trigger(type, args);
  ***REMOVED***
***REMOVED***.bind(this));
  ***REMOVED***,
  scanPunctuator: function () ***REMOVED***
    var ch1 = this.peek();
    var ch2, ch3, ch4;

    switch (ch1) ***REMOVED***
    case ".":
      if ((/^[0-9]$/).test(this.peek(1))) ***REMOVED***
        return null;
  ***REMOVED***
      if (this.peek(1) === "." && this.peek(2) === ".") ***REMOVED***
        return ***REMOVED***
          type: Token.Punctuator,
          value: "..."
    ***REMOVED***;
  ***REMOVED***
    case "(":
    case ")":
    case ";":
    case ",":
    case "***REMOVED***":
    case "***REMOVED***":
    case "[":
    case "]":
    case ":":
    case "~":
    case "?":
      return ***REMOVED***
        type: Token.Punctuator,
        value: ch1
  ***REMOVED***;
    case "#":
      return ***REMOVED***
        type: Token.Punctuator,
        value: ch1
  ***REMOVED***;
    case "":
      return null;
***REMOVED***

    ch2 = this.peek(1);
    ch3 = this.peek(2);
    ch4 = this.peek(3);

    if (ch1 === ">" && ch2 === ">" && ch3 === ">" && ch4 === "=") ***REMOVED***
      return ***REMOVED***
        type: Token.Punctuator,
        value: ">>>="
  ***REMOVED***;
***REMOVED***

    if (ch1 === "=" && ch2 === "=" && ch3 === "=") ***REMOVED***
      return ***REMOVED***
        type: Token.Punctuator,
        value: "==="
  ***REMOVED***;
***REMOVED***

    if (ch1 === "!" && ch2 === "=" && ch3 === "=") ***REMOVED***
      return ***REMOVED***
        type: Token.Punctuator,
        value: "!=="
  ***REMOVED***;
***REMOVED***

    if (ch1 === ">" && ch2 === ">" && ch3 === ">") ***REMOVED***
      return ***REMOVED***
        type: Token.Punctuator,
        value: ">>>"
  ***REMOVED***;
***REMOVED***

    if (ch1 === "<" && ch2 === "<" && ch3 === "=") ***REMOVED***
      return ***REMOVED***
        type: Token.Punctuator,
        value: "<<="
  ***REMOVED***;
***REMOVED***

    if (ch1 === ">" && ch2 === ">" && ch3 === "=") ***REMOVED***
      return ***REMOVED***
        type: Token.Punctuator,
        value: ">>="
  ***REMOVED***;
***REMOVED***
    if (ch1 === "=" && ch2 === ">") ***REMOVED***
      return ***REMOVED***
        type: Token.Punctuator,
        value: ch1 + ch2
  ***REMOVED***;
***REMOVED***
    if (ch1 === ch2 && ("+-<>&|".indexOf(ch1) >= 0)) ***REMOVED***
      return ***REMOVED***
        type: Token.Punctuator,
        value: ch1 + ch2
  ***REMOVED***;
***REMOVED***

    if ("<>=!+-*%&|^".indexOf(ch1) >= 0) ***REMOVED***
      if (ch2 === "=") ***REMOVED***
        return ***REMOVED***
          type: Token.Punctuator,
          value: ch1 + ch2
    ***REMOVED***;
  ***REMOVED***

      return ***REMOVED***
        type: Token.Punctuator,
        value: ch1
  ***REMOVED***;
***REMOVED***

    if (ch1 === "/") ***REMOVED***
      if (ch2 === "=" && /\/=(?!(\S*\/[gim]?))/.test(this.input)) ***REMOVED***
        return ***REMOVED***
          type: Token.Punctuator,
          value: "/="
    ***REMOVED***;
  ***REMOVED***

      return ***REMOVED***
        type: Token.Punctuator,
        value: "/"
  ***REMOVED***;
***REMOVED***

    return null;
  ***REMOVED***,
  scanComments: function () ***REMOVED***
    var ch1 = this.peek();
    var ch2 = this.peek(1);
    var rest = this.input.substr(2);
    var startLine = this.line;
    var startChar = this.char;

    function commentToken(label, body, opt) ***REMOVED***
      var special = ["jshint", "jslint", "members", "member", "globals", "global", "exported"];
      var isSpecial = false;
      var value = label + body;
      var commentType = "plain";
      opt = opt || ***REMOVED******REMOVED***;

      if (opt.isMultiline) ***REMOVED***
        value += "*/";
  ***REMOVED***

      special.forEach(function (str) ***REMOVED***
        if (isSpecial) ***REMOVED***
          return;
    ***REMOVED***
        if (label === "//" && str !== "jshint") ***REMOVED***
          return;
    ***REMOVED***

        if (body.substr(0, str.length) === str) ***REMOVED***
          isSpecial = true;
          label = label + str;
          body = body.substr(str.length);
    ***REMOVED***

        if (!isSpecial && body.charAt(0) === " " && body.substr(1, str.length) === str) ***REMOVED***
          isSpecial = true;
          label = label + " " + str;
          body = body.substr(str.length + 1);
    ***REMOVED***

        if (!isSpecial) ***REMOVED***
          return;
    ***REMOVED***

        switch (str) ***REMOVED***
        case "member":
          commentType = "members";
          break;
        case "global":
          commentType = "globals";
          break;
        default:
          commentType = str;
    ***REMOVED***
  ***REMOVED***);

      return ***REMOVED***
        type: Token.Comment,
        commentType: commentType,
        value: value,
        body: body,
        isSpecial: isSpecial,
        isMultiline: opt.isMultiline || false,
        isMalformed: opt.isMalformed || false
  ***REMOVED***;
***REMOVED***
    if (ch1 === "*" && ch2 === "/") ***REMOVED***
      this.trigger("error", ***REMOVED***
        code: "E018",
        line: startLine,
        character: startChar
  ***REMOVED***);

      this.skip(2);
      return null;
***REMOVED***
    if (ch1 !== "/" || (ch2 !== "*" && ch2 !== "/")) ***REMOVED***
      return null;
***REMOVED***
    if (ch2 === "/") ***REMOVED***
      this.skip(this.input.length); // Skip to the EOL.
      return commentToken("//", rest);
***REMOVED***

    var body = "";
    if (ch2 === "*") ***REMOVED***
      this.inComment = true;
      this.skip(2);

      while (this.peek() !== "*" || this.peek(1) !== "/") ***REMOVED***
        if (this.peek() === "") ***REMOVED*** // End of Line
          body += "\n";
          if (!this.nextLine()) ***REMOVED***
            this.trigger("error", ***REMOVED***
              code: "E017",
              line: startLine,
              character: startChar
        ***REMOVED***);

            this.inComment = false;
            return commentToken("/*", body, ***REMOVED***
              isMultiline: true,
              isMalformed: true
        ***REMOVED***);
      ***REMOVED***
    ***REMOVED*** else ***REMOVED***
          body += this.peek();
          this.skip();
    ***REMOVED***
  ***REMOVED***

      this.skip(2);
      this.inComment = false;
      return commentToken("/*", body, ***REMOVED*** isMultiline: true ***REMOVED***);
***REMOVED***
  ***REMOVED***,
  scanKeyword: function () ***REMOVED***
    var result = /^[a-zA-Z_$][a-zA-Z0-9_$]*/.exec(this.input);
    var keywords = [
      "if", "in", "do", "var", "for", "new",
      "try", "let", "this", "else", "case",
      "void", "with", "enum", "while", "break",
      "catch", "throw", "const", "yield", "class",
      "super", "return", "typeof", "delete",
      "switch", "export", "import", "default",
      "finally", "extends", "function", "continue",
      "debugger", "instanceof"
    ];

    if (result && keywords.indexOf(result[0]) >= 0) ***REMOVED***
      return ***REMOVED***
        type: Token.Keyword,
        value: result[0]
  ***REMOVED***;
***REMOVED***

    return null;
  ***REMOVED***,
  scanIdentifier: function () ***REMOVED***
    var id = "";
    var index = 0;
    var type, char;

    function isNonAsciiIdentifierStart(code) ***REMOVED***
      return code > 256;
***REMOVED***

    function isNonAsciiIdentifierPart(code) ***REMOVED***
      return code > 256;
***REMOVED***

    function isHexDigit(str) ***REMOVED***
      return (/^[0-9a-fA-F]$/).test(str);
***REMOVED***

    var readUnicodeEscapeSequence = function () ***REMOVED***
      index += 1;

      if (this.peek(index) !== "u") ***REMOVED***
        return null;
  ***REMOVED***

      var ch1 = this.peek(index + 1);
      var ch2 = this.peek(index + 2);
      var ch3 = this.peek(index + 3);
      var ch4 = this.peek(index + 4);
      var code;

      if (isHexDigit(ch1) && isHexDigit(ch2) && isHexDigit(ch3) && isHexDigit(ch4)) ***REMOVED***
        code = parseInt(ch1 + ch2 + ch3 + ch4, 16);

        if (asciiIdentifierPartTable[code] || isNonAsciiIdentifierPart(code)) ***REMOVED***
          index += 5;
          return "\\u" + ch1 + ch2 + ch3 + ch4;
    ***REMOVED***

        return null;
  ***REMOVED***

      return null;
***REMOVED***.bind(this);

    var getIdentifierStart = function () ***REMOVED***
      var chr = this.peek(index);
      var code = chr.charCodeAt(0);

      if (code === 92) ***REMOVED***
        return readUnicodeEscapeSequence();
  ***REMOVED***

      if (code < 128) ***REMOVED***
        if (asciiIdentifierStartTable[code]) ***REMOVED***
          index += 1;
          return chr;
    ***REMOVED***

        return null;
  ***REMOVED***

      if (isNonAsciiIdentifierStart(code)) ***REMOVED***
        index += 1;
        return chr;
  ***REMOVED***

      return null;
***REMOVED***.bind(this);

    var getIdentifierPart = function () ***REMOVED***
      var chr = this.peek(index);
      var code = chr.charCodeAt(0);

      if (code === 92) ***REMOVED***
        return readUnicodeEscapeSequence();
  ***REMOVED***

      if (code < 128) ***REMOVED***
        if (asciiIdentifierPartTable[code]) ***REMOVED***
          index += 1;
          return chr;
    ***REMOVED***

        return null;
  ***REMOVED***

      if (isNonAsciiIdentifierPart(code)) ***REMOVED***
        index += 1;
        return chr;
  ***REMOVED***

      return null;
***REMOVED***.bind(this);

    char = getIdentifierStart();
    if (char === null) ***REMOVED***
      return null;
***REMOVED***

    id = char;
    for (;;) ***REMOVED***
      char = getIdentifierPart();

      if (char === null) ***REMOVED***
        break;
  ***REMOVED***

      id += char;
***REMOVED***

    switch (id) ***REMOVED***
    case "true":
    case "false":
      type = Token.BooleanLiteral;
      break;
    case "null":
      type = Token.NullLiteral;
      break;
    default:
      type = Token.Identifier;
***REMOVED***

    return ***REMOVED***
      type: type,
      value: id
***REMOVED***;
  ***REMOVED***,
  scanNumericLiteral: function () ***REMOVED***
    var index = 0;
    var value = "";
    var length = this.input.length;
    var char = this.peek(index);
    var bad;

    function isDecimalDigit(str) ***REMOVED***
      return (/^[0-9]$/).test(str);
***REMOVED***

    function isOctalDigit(str) ***REMOVED***
      return (/^[0-7]$/).test(str);
***REMOVED***

    function isHexDigit(str) ***REMOVED***
      return (/^[0-9a-fA-F]$/).test(str);
***REMOVED***

    function isIdentifierStart(ch) ***REMOVED***
      return (ch === "$") || (ch === "_") || (ch === "\\") ||
        (ch >= "a" && ch <= "z") || (ch >= "A" && ch <= "Z");
***REMOVED***

    if (char !== "." && !isDecimalDigit(char)) ***REMOVED***
      return null;
***REMOVED***

    if (char !== ".") ***REMOVED***
      value = this.peek(index);
      index += 1;
      char = this.peek(index);

      if (value === "0") ***REMOVED***
        if (char === "x" || char === "X") ***REMOVED***
          index += 1;
          value += char;

          while (index < length) ***REMOVED***
            char = this.peek(index);
            if (!isHexDigit(char)) ***REMOVED***
              break;
        ***REMOVED***
            value += char;
            index += 1;
      ***REMOVED***

          if (value.length <= 2) ***REMOVED*** // 0x
            return ***REMOVED***
              type: Token.NumericLiteral,
              value: value,
              isMalformed: true
        ***REMOVED***;
      ***REMOVED***

          if (index < length) ***REMOVED***
            char = this.peek(index);
            if (isIdentifierStart(char)) ***REMOVED***
              return null;
        ***REMOVED***
      ***REMOVED***

          return ***REMOVED***
            type: Token.NumericLiteral,
            value: value,
            base: 16,
            isMalformed: false
      ***REMOVED***;
    ***REMOVED***
        if (isOctalDigit(char)) ***REMOVED***
          index += 1;
          value += char;
          bad = false;

          while (index < length) ***REMOVED***
            char = this.peek(index);

            if (isDecimalDigit(char)) ***REMOVED***
              bad = true;
        ***REMOVED*** else if (!isOctalDigit(char)) ***REMOVED***
              break;
        ***REMOVED***
            value += char;
            index += 1;
      ***REMOVED***

          if (index < length) ***REMOVED***
            char = this.peek(index);
            if (isIdentifierStart(char)) ***REMOVED***
              return null;
        ***REMOVED***
      ***REMOVED***

          return ***REMOVED***
            type: Token.NumericLiteral,
            value: value,
            base: 8,
            isMalformed: false
      ***REMOVED***;
    ***REMOVED***

        if (isDecimalDigit(char)) ***REMOVED***
          index += 1;
          value += char;
    ***REMOVED***
  ***REMOVED***

      while (index < length) ***REMOVED***
        char = this.peek(index);
        if (!isDecimalDigit(char)) ***REMOVED***
          break;
    ***REMOVED***
        value += char;
        index += 1;
  ***REMOVED***
***REMOVED***

    if (char === ".") ***REMOVED***
      value += char;
      index += 1;

      while (index < length) ***REMOVED***
        char = this.peek(index);
        if (!isDecimalDigit(char)) ***REMOVED***
          break;
    ***REMOVED***
        value += char;
        index += 1;
  ***REMOVED***
***REMOVED***

    if (char === "e" || char === "E") ***REMOVED***
      value += char;
      index += 1;
      char = this.peek(index);

      if (char === "+" || char === "-") ***REMOVED***
        value += this.peek(index);
        index += 1;
  ***REMOVED***

      char = this.peek(index);
      if (isDecimalDigit(char)) ***REMOVED***
        value += char;
        index += 1;

        while (index < length) ***REMOVED***
          char = this.peek(index);
          if (!isDecimalDigit(char)) ***REMOVED***
            break;
      ***REMOVED***
          value += char;
          index += 1;
    ***REMOVED***
  ***REMOVED*** else ***REMOVED***
        return null;
  ***REMOVED***
***REMOVED***

    if (index < length) ***REMOVED***
      char = this.peek(index);
      if (isIdentifierStart(char)) ***REMOVED***
        return null;
  ***REMOVED***
***REMOVED***

    return ***REMOVED***
      type: Token.NumericLiteral,
      value: value,
      base: 10,
      isMalformed: !isFinite(value)
***REMOVED***;
  ***REMOVED***,
  scanTemplateLiteral: function () ***REMOVED***
    if (!state.option.esnext || this.peek() !== "`") ***REMOVED***
      return null;
***REMOVED***

    var startLine = this.line;
    var startChar = this.char;
    var jump = 1;
    var value = "";
    this.skip();

    while (this.peek() !== "`") ***REMOVED***
      while (this.peek() === "") ***REMOVED***
        if (!this.nextLine()) ***REMOVED***
          this.trigger("error", ***REMOVED***
            code: "E052",
            line: startLine,
            character: startChar
      ***REMOVED***);

          return ***REMOVED***
            type: Token.TemplateLiteral,
            value: value,
            isUnclosed: true
      ***REMOVED***;
    ***REMOVED***
        value += "\n";
  ***REMOVED***
      var char = this.peek();
      this.skip(jump);
      value += char;
***REMOVED***

    this.skip();
    return ***REMOVED***
      type: Token.TemplateLiteral,
      value: value,
      isUnclosed: false
***REMOVED***;
  ***REMOVED***,
  scanStringLiteral: function (checks) ***REMOVED***
    var quote = this.peek();
    if (quote !== "\"" && quote !== "'") ***REMOVED***
      return null;
***REMOVED***
    this.triggerAsync("warning", ***REMOVED***
      code: "W108",
      line: this.line,
      character: this.char // +1?
***REMOVED*** checks, function () ***REMOVED*** return state.jsonMode && quote !== "\""; ***REMOVED***);

    var value = "";
    var startLine = this.line;
    var startChar = this.char;
    var allowNewLine = false;

    this.skip();

    outer: while (this.peek() !== quote) ***REMOVED***
      while (this.peek() === "") ***REMOVED*** // End Of Line

        if (!allowNewLine) ***REMOVED***
          this.trigger("warning", ***REMOVED***
            code: "W112",
            line: this.line,
            character: this.char
      ***REMOVED***);
    ***REMOVED*** else ***REMOVED***
          allowNewLine = false;

          this.triggerAsync("warning", ***REMOVED***
            code: "W043",
            line: this.line,
            character: this.char
      ***REMOVED*** checks, function () ***REMOVED*** return !state.option.multistr; ***REMOVED***);

          this.triggerAsync("warning", ***REMOVED***
            code: "W042",
            line: this.line,
            character: this.char
      ***REMOVED*** checks, function () ***REMOVED*** return state.jsonMode && state.option.multistr; ***REMOVED***);
    ***REMOVED***

        if (!this.nextLine()) ***REMOVED***
          this.trigger("error", ***REMOVED***
            code: "E029",
            line: startLine,
            character: startChar
      ***REMOVED***);

          return ***REMOVED***
            type: Token.StringLiteral,
            value: value,
            isUnclosed: true,
            quote: quote
      ***REMOVED***;
    ***REMOVED***
        
        if (this.peek() == quote)
          break outer;
  ***REMOVED***

      allowNewLine = false;
      var char = this.peek();
      var jump = 1; // A length of a jump, after we're done

      if (char < " ") ***REMOVED***
        this.trigger("warning", ***REMOVED***
          code: "W113",
          line: this.line,
          character: this.char,
          data: [ "<non-printable>" ]
    ***REMOVED***);
  ***REMOVED***

      if (char === "\\") ***REMOVED***
        this.skip();
        char = this.peek();

        switch (char) ***REMOVED***
        case "'":
          this.triggerAsync("warning", ***REMOVED***
            code: "W114",
            line: this.line,
            character: this.char,
            data: [ "\\'" ]
      ***REMOVED*** checks, function () ***REMOVED***return state.jsonMode; ***REMOVED***);
          break;
        case "b":
          char = "\\b";
          break;
        case "f":
          char = "\\f";
          break;
        case "n":
          char = "\\n";
          break;
        case "r":
          char = "\\r";
          break;
        case "t":
          char = "\\t";
          break;
        case "0":
          char = "\\0";
          var n = parseInt(this.peek(1), 10);
          this.triggerAsync("warning", ***REMOVED***
            code: "W115",
            line: this.line,
            character: this.char
      ***REMOVED*** checks,
          function () ***REMOVED*** return n >= 0 && n <= 7 && state.directive["use strict"]; ***REMOVED***);
          break;
        case "u":
          char = String.fromCharCode(parseInt(this.input.substr(1, 4), 16));
          jump = 5;
          break;
        case "v":
          this.triggerAsync("warning", ***REMOVED***
            code: "W114",
            line: this.line,
            character: this.char,
            data: [ "\\v" ]
      ***REMOVED*** checks, function () ***REMOVED*** return state.jsonMode; ***REMOVED***);

          char = "\v";
          break;
        case "x":
          var  x = parseInt(this.input.substr(1, 2), 16);

          this.triggerAsync("warning", ***REMOVED***
            code: "W114",
            line: this.line,
            character: this.char,
            data: [ "\\x-" ]
      ***REMOVED*** checks, function () ***REMOVED*** return state.jsonMode; ***REMOVED***);

          char = String.fromCharCode(x);
          jump = 3;
          break;
        case "\\":
          char = "\\\\";
          break;
        case "\"":
          char = "\\\"";
          break;
        case "/":
          break;
        case "":
          allowNewLine = true;
          char = "";
          break;
        case "!":
          if (value.slice(value.length - 2) === "<") ***REMOVED***
            break;
      ***REMOVED***
        default:
          this.trigger("warning", ***REMOVED***
            code: "W044",
            line: this.line,
            character: this.char
      ***REMOVED***);
    ***REMOVED***
  ***REMOVED***

      value += char;
      this.skip(jump);
***REMOVED***

    this.skip();
    return ***REMOVED***
      type: Token.StringLiteral,
      value: value,
      isUnclosed: false,
      quote: quote
***REMOVED***;
  ***REMOVED***,
  scanRegExp: function () ***REMOVED***
    var index = 0;
    var length = this.input.length;
    var char = this.peek();
    var value = char;
    var body = "";
    var flags = [];
    var malformed = false;
    var isCharSet = false;
    var terminated;

    var scanUnexpectedChars = function () ***REMOVED***
      if (char < " ") ***REMOVED***
        malformed = true;
        this.trigger("warning", ***REMOVED***
          code: "W048",
          line: this.line,
          character: this.char
    ***REMOVED***);
  ***REMOVED***
      if (char === "<") ***REMOVED***
        malformed = true;
        this.trigger("warning", ***REMOVED***
          code: "W049",
          line: this.line,
          character: this.char,
          data: [ char ]
    ***REMOVED***);
  ***REMOVED***
***REMOVED***.bind(this);
    if (!this.prereg || char !== "/") ***REMOVED***
      return null;
***REMOVED***

    index += 1;
    terminated = false;

    while (index < length) ***REMOVED***
      char = this.peek(index);
      value += char;
      body += char;

      if (isCharSet) ***REMOVED***
        if (char === "]") ***REMOVED***
          if (this.peek(index - 1) !== "\\" || this.peek(index - 2) === "\\") ***REMOVED***
            isCharSet = false;
      ***REMOVED***
    ***REMOVED***

        if (char === "\\") ***REMOVED***
          index += 1;
          char = this.peek(index);
          body += char;
          value += char;

          scanUnexpectedChars();
    ***REMOVED***

        index += 1;
        continue;
  ***REMOVED***

      if (char === "\\") ***REMOVED***
        index += 1;
        char = this.peek(index);
        body += char;
        value += char;

        scanUnexpectedChars();

        if (char === "/") ***REMOVED***
          index += 1;
          continue;
    ***REMOVED***

        if (char === "[") ***REMOVED***
          index += 1;
          continue;
    ***REMOVED***
  ***REMOVED***

      if (char === "[") ***REMOVED***
        isCharSet = true;
        index += 1;
        continue;
  ***REMOVED***

      if (char === "/") ***REMOVED***
        body = body.substr(0, body.length - 1);
        terminated = true;
        index += 1;
        break;
  ***REMOVED***

      index += 1;
***REMOVED***

    if (!terminated) ***REMOVED***
      this.trigger("error", ***REMOVED***
        code: "E015",
        line: this.line,
        character: this.from
  ***REMOVED***);

      return void this.trigger("fatal", ***REMOVED***
        line: this.line,
        from: this.from
  ***REMOVED***);
***REMOVED***

    while (index < length) ***REMOVED***
      char = this.peek(index);
      if (!/[gim]/.test(char)) ***REMOVED***
        break;
  ***REMOVED***
      flags.push(char);
      value += char;
      index += 1;
***REMOVED***

    try ***REMOVED***
      new RegExp(body, flags.join(""));
***REMOVED*** catch (err) ***REMOVED***
      malformed = true;
      this.trigger("error", ***REMOVED***
        code: "E016",
        line: this.line,
        character: this.char,
        data: [ err.message ] // Platform dependent!
  ***REMOVED***);
***REMOVED***

    return ***REMOVED***
      type: Token.RegExp,
      value: value,
      flags: flags,
      isMalformed: malformed
***REMOVED***;
  ***REMOVED***,
  scanNonBreakingSpaces: function () ***REMOVED***
    return state.option.nonbsp ?
      this.input.search(/(\u00A0)/) : -1;
  ***REMOVED***,
  scanUnsafeChars: function () ***REMOVED***
    return this.input.search(reg.unsafeChars);
  ***REMOVED***,
  next: function (checks) ***REMOVED***
    this.from = this.char;
    var start;
    if (/\s/.test(this.peek())) ***REMOVED***
      start = this.char;

      while (/\s/.test(this.peek())) ***REMOVED***
        this.from += 1;
        this.skip();
  ***REMOVED***
***REMOVED***

    var match = this.scanComments() ||
      this.scanStringLiteral(checks) ||
      this.scanTemplateLiteral();

    if (match) ***REMOVED***
      return match;
***REMOVED***

    match =
      this.scanRegExp() ||
      this.scanPunctuator() ||
      this.scanKeyword() ||
      this.scanIdentifier() ||
      this.scanNumericLiteral();

    if (match) ***REMOVED***
      this.skip(match.value.length);
      return match;
***REMOVED***

    return null;
  ***REMOVED***,
  nextLine: function () ***REMOVED***
    var char;

    if (this.line >= this.getLines().length) ***REMOVED***
      return false;
***REMOVED***

    this.input = this.getLines()[this.line];
    this.line += 1;
    this.char = 1;
    this.from = 1;

    var inputTrimmed = this.input.trim();

    var startsWith = function () ***REMOVED***
      return _.some(arguments, function (prefix) ***REMOVED***
        return inputTrimmed.indexOf(prefix) === 0;
  ***REMOVED***);
***REMOVED***;

    var endsWith = function () ***REMOVED***
      return _.some(arguments, function (suffix) ***REMOVED***
        return inputTrimmed.indexOf(suffix, inputTrimmed.length - suffix.length) !== -1;
  ***REMOVED***);
***REMOVED***;
    if (state.ignoreLinterErrors === true) ***REMOVED***
      if (!startsWith("/*", "//") && !endsWith("*/")) ***REMOVED***
        this.input = "";
  ***REMOVED***
***REMOVED***

    char = this.scanNonBreakingSpaces();
    if (char >= 0) ***REMOVED***
      this.trigger("warning", ***REMOVED*** code: "W125", line: this.line, character: char + 1 ***REMOVED***);
***REMOVED***

    this.input = this.input.replace(/\t/g, state.tab);
    char = this.scanUnsafeChars();

    if (char >= 0) ***REMOVED***
      this.trigger("warning", ***REMOVED*** code: "W100", line: this.line, character: char ***REMOVED***);
***REMOVED***

    if (state.option.maxlen && state.option.maxlen < this.input.length) ***REMOVED***
      var inComment = this.inComment ||
        startsWith.call(inputTrimmed, "//") ||
        startsWith.call(inputTrimmed, "/*");

      var shouldTriggerError = !inComment || !reg.maxlenException.test(inputTrimmed);

      if (shouldTriggerError) ***REMOVED***
        this.trigger("warning", ***REMOVED*** code: "W101", line: this.line, character: this.input.length ***REMOVED***);
  ***REMOVED***
***REMOVED***

    return true;
  ***REMOVED***,
  start: function () ***REMOVED***
    this.nextLine();
  ***REMOVED***,
  token: function () ***REMOVED***
    var checks = asyncTrigger();
    var token;


    function isReserved(token, isProperty) ***REMOVED***
      if (!token.reserved) ***REMOVED***
        return false;
  ***REMOVED***
      var meta = token.meta;

      if (meta && meta.isFutureReservedWord && state.option.inES5()) ***REMOVED***
        if (!meta.es5) ***REMOVED***
          return false;
    ***REMOVED***
        if (meta.strictOnly) ***REMOVED***
          if (!state.option.strict && !state.directive["use strict"]) ***REMOVED***
            return false;
      ***REMOVED***
    ***REMOVED***

        if (isProperty) ***REMOVED***
          return false;
    ***REMOVED***
  ***REMOVED***

      return true;
***REMOVED***
    var create = function (type, value, isProperty) ***REMOVED***
      var obj;

      if (type !== "(endline)" && type !== "(end)") ***REMOVED***
        this.prereg = false;
  ***REMOVED***

      if (type === "(punctuator)") ***REMOVED***
        switch (value) ***REMOVED***
        case ".":
        case ")":
        case "~":
        case "#":
        case "]":
          this.prereg = false;
          break;
        default:
          this.prereg = true;
    ***REMOVED***

        obj = Object.create(state.syntax[value] || state.syntax["(error)"]);
  ***REMOVED***

      if (type === "(identifier)") ***REMOVED***
        if (value === "return" || value === "case" || value === "typeof") ***REMOVED***
          this.prereg = true;
    ***REMOVED***

        if (_.has(state.syntax, value)) ***REMOVED***
          obj = Object.create(state.syntax[value] || state.syntax["(error)"]);
          if (!isReserved(obj, isProperty && type === "(identifier)")) ***REMOVED***
            obj = null;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***

      if (!obj) ***REMOVED***
        obj = Object.create(state.syntax[type]);
  ***REMOVED***

      obj.identifier = (type === "(identifier)");
      obj.type = obj.type || type;
      obj.value = value;
      obj.line = this.line;
      obj.character = this.char;
      obj.from = this.from;

      if (isProperty && obj.identifier) ***REMOVED***
        obj.isProperty = isProperty;
  ***REMOVED***

      obj.check = checks.check;

      return obj;
***REMOVED***.bind(this);

    for (;;) ***REMOVED***
      if (!this.input.length) ***REMOVED***
        return create(this.nextLine() ? "(endline)" : "(end)", "");
  ***REMOVED***

      token = this.next(checks);

      if (!token) ***REMOVED***
        if (this.input.length) ***REMOVED***
          this.trigger("error", ***REMOVED***
            code: "E024",
            line: this.line,
            character: this.char,
            data: [ this.peek() ]
      ***REMOVED***);

          this.input = "";
    ***REMOVED***

        continue;
  ***REMOVED***

      switch (token.type) ***REMOVED***
      case Token.StringLiteral:
        this.triggerAsync("String", ***REMOVED***
          line: this.line,
          char: this.char,
          from: this.from,
          value: token.value,
          quote: token.quote
    ***REMOVED*** checks, function () ***REMOVED*** return true; ***REMOVED***);

        return create("(string)", token.value);

      case Token.TemplateLiteral:
        this.trigger("Template", ***REMOVED***
          line: this.line,
          char: this.char,
          from: this.from,
          value: token.value
    ***REMOVED***);
        return create("(template)", token.value);

      case Token.Identifier:
        this.trigger("Identifier", ***REMOVED***
          line: this.line,
          char: this.char,
          from: this.form,
          name: token.value,
          isProperty: state.tokens.curr.id === "."
    ***REMOVED***);
      case Token.Keyword:
      case Token.NullLiteral:
      case Token.BooleanLiteral:
        return create("(identifier)", token.value, state.tokens.curr.id === ".");

      case Token.NumericLiteral:
        if (token.isMalformed) ***REMOVED***
          this.trigger("warning", ***REMOVED***
            code: "W045",
            line: this.line,
            character: this.char,
            data: [ token.value ]
      ***REMOVED***);
    ***REMOVED***

        this.triggerAsync("warning", ***REMOVED***
          code: "W114",
          line: this.line,
          character: this.char,
          data: [ "0x-" ]
    ***REMOVED*** checks, function () ***REMOVED*** return token.base === 16 && state.jsonMode; ***REMOVED***);

        this.triggerAsync("warning", ***REMOVED***
          code: "W115",
          line: this.line,
          character: this.char
    ***REMOVED*** checks, function () ***REMOVED***
          return state.directive["use strict"] && token.base === 8;
    ***REMOVED***);

        this.trigger("Number", ***REMOVED***
          line: this.line,
          char: this.char,
          from: this.from,
          value: token.value,
          base: token.base,
          isMalformed: token.malformed
    ***REMOVED***);

        return create("(number)", token.value);

      case Token.RegExp:
        return create("(regexp)", token.value);

      case Token.Comment:
        state.tokens.curr.comment = true;

        if (token.isSpecial) ***REMOVED***
          return ***REMOVED***
            id: '(comment)',
            value: token.value,
            body: token.body,
            type: token.commentType,
            isSpecial: token.isSpecial,
            line: this.line,
            character: this.char,
            from: this.from
      ***REMOVED***;
    ***REMOVED***

        break;

      case "":
        break;

      default:
        return create("(punctuator)", token.value);
  ***REMOVED***
***REMOVED***
  ***REMOVED***
***REMOVED***;

exports.Lexer = Lexer;

***REMOVED***,
***REMOVED***"../data/ascii-identifier-data.js":1,"./reg.js":6,"./state.js":7,"events":10,"underscore":2***REMOVED***],
5:[function(_dereq_,module,exports)***REMOVED***


var _ = _dereq_("underscore");

var errors = ***REMOVED***
  E001: "Bad option: '***REMOVED***a***REMOVED***'.",
  E002: "Bad option value.",
  E003: "Expected a JSON value.",
  E004: "Input is neither a string nor an array of strings.",
  E005: "Input is empty.",
  E006: "Unexpected early end of program.",
  E007: "Missing \"use strict\" statement.",
  E008: "Strict violation.",
  E009: "Option 'validthis' can't be used in a global scope.",
  E010: "'with' is not allowed in strict mode.",
  E011: "const '***REMOVED***a***REMOVED***' has already been declared.",
  E012: "const '***REMOVED***a***REMOVED***' is initialized to 'undefined'.",
  E013: "Attempting to override '***REMOVED***a***REMOVED***' which is a constant.",
  E014: "A regular expression literal can be confused with '/='.",
  E015: "Unclosed regular expression.",
  E016: "Invalid regular expression.",
  E017: "Unclosed comment.",
  E018: "Unbegun comment.",
  E019: "Unmatched '***REMOVED***a***REMOVED***'.",
  E020: "Expected '***REMOVED***a***REMOVED***' to match '***REMOVED***b***REMOVED***' from line ***REMOVED***c***REMOVED*** and instead saw '***REMOVED***d***REMOVED***'.",
  E021: "Expected '***REMOVED***a***REMOVED***' and instead saw '***REMOVED***b***REMOVED***'.",
  E022: "Line breaking error '***REMOVED***a***REMOVED***'.",
  E023: "Missing '***REMOVED***a***REMOVED***'.",
  E024: "Unexpected '***REMOVED***a***REMOVED***'.",
  E025: "Missing ':' on a case clause.",
  E026: "Missing '***REMOVED***' to match '***REMOVED***' from line ***REMOVED***a***REMOVED***.",
  E027: "Missing ']' to match '[' from line ***REMOVED***a***REMOVED***.",
  E028: "Illegal comma.",
  E029: "Unclosed string.",
  E030: "Expected an identifier and instead saw '***REMOVED***a***REMOVED***'.",
  E031: "Bad assignment.", // FIXME: Rephrase
  E032: "Expected a small integer or 'false' and instead saw '***REMOVED***a***REMOVED***'.",
  E033: "Expected an operator and instead saw '***REMOVED***a***REMOVED***'.",
  E034: "get/set are ES5 features.",
  E035: "Missing property name.",
  E036: "Expected to see a statement and instead saw a block.",
  E037: null,
  E038: null,
  E039: "Function declarations are not invocable. Wrap the whole function invocation in parens.",
  E040: "Each value should have its own case label.",
  E041: "Unrecoverable syntax error.",
  E042: "Stopping.",
  E043: "Too many errors.",
  E044: null,
  E045: "Invalid for each loop.",
  E046: "A yield statement shall be within a generator function (with syntax: `function*`)",
  E047: null, // Vacant
  E048: "Let declaration not directly within block.",
  E049: "A ***REMOVED***a***REMOVED*** cannot be named '***REMOVED***b***REMOVED***'.",
  E050: "Mozilla requires the yield expression to be parenthesized here.",
  E051: "Regular parameters cannot come after default parameters.",
  E052: "Unclosed template literal."
***REMOVED***;

var warnings = ***REMOVED***
  W001: "'hasOwnProperty' is a really bad name.",
  W002: "Value of '***REMOVED***a***REMOVED***' may be overwritten in IE 8 and earlier.",
  W003: "'***REMOVED***a***REMOVED***' was used before it was defined.",
  W004: "'***REMOVED***a***REMOVED***' is already defined.",
  W005: "A dot following a number can be confused with a decimal point.",
  W006: "Confusing minuses.",
  W007: "Confusing plusses.",
  W008: "A leading decimal point can be confused with a dot: '***REMOVED***a***REMOVED***'.",
  W009: "The array literal notation [] is preferable.",
  W010: "The object literal notation ***REMOVED******REMOVED*** is preferable.",
  W011: null,
  W012: null,
  W013: null,
  W014: "Bad line breaking before '***REMOVED***a***REMOVED***'.",
  W015: null,
  W016: "Unexpected use of '***REMOVED***a***REMOVED***'.",
  W017: "Bad operand.",
  W018: "Confusing use of '***REMOVED***a***REMOVED***'.",
  W019: "Use the isNaN function to compare with NaN.",
  W020: "Read only.",
  W021: "'***REMOVED***a***REMOVED***' is a function.",
  W022: "Do not assign to the exception parameter.",
  W023: "Expected an identifier in an assignment and instead saw a function invocation.",
  W024: "Expected an identifier and instead saw '***REMOVED***a***REMOVED***' (a reserved word).",
  W025: "Missing name in function declaration.",
  W026: "Inner functions should be listed at the top of the outer function.",
  W027: "Unreachable '***REMOVED***a***REMOVED***' after '***REMOVED***b***REMOVED***'.",
  W028: "Label '***REMOVED***a***REMOVED***' on ***REMOVED***b***REMOVED*** statement.",
  W030: "Expected an assignment or function call and instead saw an expression.",
  W031: "Do not use 'new' for side effects.",
  W032: "Unnecessary semicolon.",
  W033: "Missing semicolon.",
  W034: "Unnecessary directive \"***REMOVED***a***REMOVED***\".",
  W035: "Empty block.",
  W036: "Unexpected /*member '***REMOVED***a***REMOVED***'.",
  W037: "'***REMOVED***a***REMOVED***' is a statement label.",
  W038: "'***REMOVED***a***REMOVED***' used out of scope.",
  W039: "'***REMOVED***a***REMOVED***' is not allowed.",
  W040: "Possible strict violation.",
  W041: "Use '***REMOVED***a***REMOVED***' to compare with '***REMOVED***b***REMOVED***'.",
  W042: "Avoid EOL escaping.",
  W043: "Bad escaping of EOL. Use option multistr if needed.",
  W044: "Bad or unnecessary escaping.",
  W045: "Bad number '***REMOVED***a***REMOVED***'.",
  W046: "Don't use extra leading zeros '***REMOVED***a***REMOVED***'.",
  W047: "A trailing decimal point can be confused with a dot: '***REMOVED***a***REMOVED***'.",
  W048: "Unexpected control character in regular expression.",
  W049: "Unexpected escaped character '***REMOVED***a***REMOVED***' in regular expression.",
  W050: "JavaScript URL.",
  W051: "Variables should not be deleted.",
  W052: "Unexpected '***REMOVED***a***REMOVED***'.",
  W053: "Do not use ***REMOVED***a***REMOVED*** as a constructor.",
  W054: "The Function constructor is a form of eval.",
  W055: "A constructor name should start with an uppercase letter.",
  W056: "Bad constructor.",
  W057: "Weird construction. Is 'new' necessary?",
  W058: "Missing '()' invoking a constructor.",
  W059: "Avoid arguments.***REMOVED***a***REMOVED***.",
  W060: "document.write can be a form of eval.",
  W061: "eval can be harmful.",
  W062: "Wrap an immediate function invocation in parens " +
    "to assist the reader in understanding that the expression " +
    "is the result of a function, and not the function itself.",
  W063: "Math is not a function.",
  W064: "Missing 'new' prefix when invoking a constructor.",
  W065: "Missing radix parameter.",
  W066: "Implied eval. Consider passing a function instead of a string.",
  W067: "Bad invocation.",
  W068: "Wrapping non-IIFE function literals in parens is unnecessary.",
  W069: "['***REMOVED***a***REMOVED***'] is better written in dot notation.",
  W070: "Extra comma. (it breaks older versions of IE)",
  W071: "This function has too many statements. (***REMOVED***a***REMOVED***)",
  W072: "This function has too many parameters. (***REMOVED***a***REMOVED***)",
  W073: "Blocks are nested too deeply. (***REMOVED***a***REMOVED***)",
  W074: "This function's cyclomatic complexity is too high. (***REMOVED***a***REMOVED***)",
  W075: "Duplicate key '***REMOVED***a***REMOVED***'.",
  W076: "Unexpected parameter '***REMOVED***a***REMOVED***' in get ***REMOVED***b***REMOVED*** function.",
  W077: "Expected a single parameter in set ***REMOVED***a***REMOVED*** function.",
  W078: "Setter is defined without getter.",
  W079: "Redefinition of '***REMOVED***a***REMOVED***'.",
  W080: "It's not necessary to initialize '***REMOVED***a***REMOVED***' to 'undefined'.",
  W081: null,
  W082: "Function declarations should not be placed in blocks. " +
    "Use a function expression or move the statement to the top of " +
    "the outer function.",
  W083: "Don't make functions within a loop.",
  W084: "Assignment in conditional expression",
  W085: "Don't use 'with'.",
  W086: "Expected a 'break' statement before '***REMOVED***a***REMOVED***'.",
  W087: "Forgotten 'debugger' statement?",
  W088: "Creating global 'for' variable. Should be 'for (var ***REMOVED***a***REMOVED*** ...'.",
  W089: "The body of a for in should be wrapped in an if statement to filter " +
    "unwanted properties from the prototype.",
  W090: "'***REMOVED***a***REMOVED***' is not a statement label.",
  W091: "'***REMOVED***a***REMOVED***' is out of scope.",
  W093: "Did you mean to return a conditional instead of an assignment?",
  W094: "Unexpected comma.",
  W095: "Expected a string and instead saw ***REMOVED***a***REMOVED***.",
  W096: "The '***REMOVED***a***REMOVED***' key may produce unexpected results.",
  W097: "Use the function form of \"use strict\".",
  W098: "'***REMOVED***a***REMOVED***' is defined but never used.",
  W099: null,
  W100: "This character may get silently deleted by one or more browsers.",
  W101: "Line is too long.",
  W102: null,
  W103: "The '***REMOVED***a***REMOVED***' property is deprecated.",
  W104: "'***REMOVED***a***REMOVED***' is available in ES6 (use esnext option) or Mozilla JS extensions (use moz).",
  W105: "Unexpected ***REMOVED***a***REMOVED*** in '***REMOVED***b***REMOVED***'.",
  W106: "Identifier '***REMOVED***a***REMOVED***' is not in camel case.",
  W107: "Script URL.",
  W108: "Strings must use doublequote.",
  W109: "Strings must use singlequote.",
  W110: "Mixed double and single quotes.",
  W112: "Unclosed string.",
  W113: "Control character in string: ***REMOVED***a***REMOVED***.",
  W114: "Avoid ***REMOVED***a***REMOVED***.",
  W115: "Octal literals are not allowed in strict mode.",
  W116: "Expected '***REMOVED***a***REMOVED***' and instead saw '***REMOVED***b***REMOVED***'.",
  W117: "'***REMOVED***a***REMOVED***' is not defined.",
  W118: "'***REMOVED***a***REMOVED***' is only available in Mozilla JavaScript extensions (use moz option).",
  W119: "'***REMOVED***a***REMOVED***' is only available in ES6 (use esnext option).",
  W120: "You might be leaking a variable (***REMOVED***a***REMOVED***) here.",
  W121: "Extending prototype of native object: '***REMOVED***a***REMOVED***'.",
  W122: "Invalid typeof value '***REMOVED***a***REMOVED***'",
  W123: "'***REMOVED***a***REMOVED***' is already defined in outer scope.",
  W124: "A generator function shall contain a yield statement.",
  W125: "This line contains non-breaking spaces: http://jshint.com/doc/options/#nonbsp"
***REMOVED***;

var info = ***REMOVED***
  I001: "Comma warnings can be turned off with 'laxcomma'.",
  I002: null,
  I003: "ES5 option is now set per default"
***REMOVED***;

exports.errors = ***REMOVED******REMOVED***;
exports.warnings = ***REMOVED******REMOVED***;
exports.info = ***REMOVED******REMOVED***;

_.each(errors, function (desc, code) ***REMOVED***
  exports.errors[code] = ***REMOVED*** code: code, desc: desc ***REMOVED***;
***REMOVED***);

_.each(warnings, function (desc, code) ***REMOVED***
  exports.warnings[code] = ***REMOVED*** code: code, desc: desc ***REMOVED***;
***REMOVED***);

_.each(info, function (desc, code) ***REMOVED***
  exports.info[code] = ***REMOVED*** code: code, desc: desc ***REMOVED***;
***REMOVED***);

***REMOVED***,
***REMOVED***"underscore":2***REMOVED***],
6:[function(_dereq_,module,exports)***REMOVED***

"use string";
exports.unsafeString =
  /@cc|<\/?|script|\]\s*\]|<\s*!|&lt/i;
exports.unsafeChars =
  /[\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/;
exports.needEsc =
  /[\u0000-\u001f&<"\/\\\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/;

exports.needEscGlobal =
  /[\u0000-\u001f&<"\/\\\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
exports.starSlash = /\*\//;
exports.identifier = /^([a-zA-Z_$][a-zA-Z0-9_$]*)$/;
exports.javascriptURL = /^(?:javascript|jscript|ecmascript|vbscript|mocha|livescript)\s*:/i;
exports.fallsThrough = /^\s*\/\*\s*falls?\sthrough\s*\*\/\s*$/;
exports.maxlenException = /^(?:(?:\/\/|\/\*|\*) ?)?[^ ]+$/;

***REMOVED***,
***REMOVED******REMOVED***],
7:[function(_dereq_,module,exports)***REMOVED***


var state = ***REMOVED***
  syntax: ***REMOVED******REMOVED***,

  reset: function () ***REMOVED***
    this.tokens = ***REMOVED***
      prev: null,
      next: null,
      curr: null
***REMOVED***;

    this.option = ***REMOVED******REMOVED***;
    this.ignored = ***REMOVED******REMOVED***;
    this.directive = ***REMOVED******REMOVED***;
    this.jsonMode = false;
    this.jsonWarnings = [];
    this.lines = [];
    this.tab = "";
    this.cache = ***REMOVED******REMOVED***; // Node.JS doesn't have Map. Sniff.
    this.ignoredLines = ***REMOVED******REMOVED***;
    this.ignoreLinterErrors = false;
  ***REMOVED***
***REMOVED***;

exports.state = state;

***REMOVED***,
***REMOVED******REMOVED***],
8:[function(_dereq_,module,exports)***REMOVED***


exports.register = function (linter) ***REMOVED***

  linter.on("Identifier", function style_scanProto(data) ***REMOVED***
    if (linter.getOption("proto")) ***REMOVED***
      return;
***REMOVED***

    if (data.name === "__proto__") ***REMOVED***
      linter.warn("W103", ***REMOVED***
        line: data.line,
        char: data.char,
        data: [ data.name ]
  ***REMOVED***);
***REMOVED***
  ***REMOVED***);

  linter.on("Identifier", function style_scanIterator(data) ***REMOVED***
    if (linter.getOption("iterator")) ***REMOVED***
      return;
***REMOVED***

    if (data.name === "__iterator__") ***REMOVED***
      linter.warn("W104", ***REMOVED***
        line: data.line,
        char: data.char,
        data: [ data.name ]
  ***REMOVED***);
***REMOVED***
  ***REMOVED***);

  linter.on("Identifier", function style_scanCamelCase(data) ***REMOVED***
    if (!linter.getOption("camelcase")) ***REMOVED***
      return;
***REMOVED***

    if (data.name.replace(/^_+|_+$/g, "").indexOf("_") > -1 && !data.name.match(/^[A-Z0-9_]*$/)) ***REMOVED***
      linter.warn("W106", ***REMOVED***
        line: data.line,
        char: data.from,
        data: [ data.name ]
  ***REMOVED***);
***REMOVED***
  ***REMOVED***);

  linter.on("String", function style_scanQuotes(data) ***REMOVED***
    var quotmark = linter.getOption("quotmark");
    var code;

    if (!quotmark) ***REMOVED***
      return;
***REMOVED***

    if (quotmark === "single" && data.quote !== "'") ***REMOVED***
      code = "W109";
***REMOVED***

    if (quotmark === "double" && data.quote !== "\"") ***REMOVED***
      code = "W108";
***REMOVED***

    if (quotmark === true) ***REMOVED***
      if (!linter.getCache("quotmark")) ***REMOVED***
        linter.setCache("quotmark", data.quote);
  ***REMOVED***

      if (linter.getCache("quotmark") !== data.quote) ***REMOVED***
        code = "W110";
  ***REMOVED***
***REMOVED***

    if (code) ***REMOVED***
      linter.warn(code, ***REMOVED***
        line: data.line,
        char: data.char,
  ***REMOVED***);
***REMOVED***
  ***REMOVED***);

  linter.on("Number", function style_scanNumbers(data) ***REMOVED***
    if (data.value.charAt(0) === ".") ***REMOVED***
      linter.warn("W008", ***REMOVED***
        line: data.line,
        char: data.char,
        data: [ data.value ]
  ***REMOVED***);
***REMOVED***

    if (data.value.substr(data.value.length - 1) === ".") ***REMOVED***
      linter.warn("W047", ***REMOVED***
        line: data.line,
        char: data.char,
        data: [ data.value ]
  ***REMOVED***);
***REMOVED***

    if (/^00+/.test(data.value)) ***REMOVED***
      linter.warn("W046", ***REMOVED***
        line: data.line,
        char: data.char,
        data: [ data.value ]
  ***REMOVED***);
***REMOVED***
  ***REMOVED***);

  linter.on("String", function style_scanJavaScriptURLs(data) ***REMOVED***
    var re = /^(?:javascript|jscript|ecmascript|vbscript|mocha|livescript)\s*:/i;

    if (linter.getOption("scripturl")) ***REMOVED***
      return;
***REMOVED***

    if (re.test(data.value)) ***REMOVED***
      linter.warn("W107", ***REMOVED***
        line: data.line,
        char: data.char
  ***REMOVED***);
***REMOVED***
  ***REMOVED***);
***REMOVED***;

***REMOVED***,
***REMOVED******REMOVED***],
9:[function(_dereq_,module,exports)***REMOVED***

exports.reservedVars = ***REMOVED***
  arguments : false,
  NaN       : false
***REMOVED***;

exports.ecmaIdentifiers = ***REMOVED***
  Array              : false,
  Boolean            : false,
  Date               : false,
  decodeURI          : false,
  decodeURIComponent : false,
  encodeURI          : false,
  encodeURIComponent : false,
  Error              : false,
  "eval"             : false,
  EvalError          : false,
  Function           : false,
  hasOwnProperty     : false,
  isFinite           : false,
  isNaN              : false,
  JSON               : false,
  Math               : false,
  Number             : false,
  Object             : false,
  parseInt           : false,
  parseFloat         : false,
  RangeError         : false,
  ReferenceError     : false,
  RegExp             : false,
  String             : false,
  SyntaxError        : false,
  TypeError          : false,
  URIError           : false,
***REMOVED***;

exports.newEcmaIdentifiers = ***REMOVED***
  Set     : false,
  Map     : false,
  WeakMap : false,
  WeakSet : false,
  Proxy   : false,
  Promise : false
***REMOVED***;

exports.browser = ***REMOVED***
  Audio                : false,
  Blob                 : false,
  addEventListener     : false,
  applicationCache     : false,
  atob                 : false,
  blur                 : false,
  btoa                 : false,
  CanvasGradient       : false,
  CanvasPattern        : false,
  CanvasRenderingContext2D: false,
  clearInterval        : false,
  clearTimeout         : false,
  close                : false,
  closed               : false,
  CustomEvent          : false,
  DOMParser            : false,
  defaultStatus        : false,
  document             : false,
  Element              : false,
  ElementTimeControl   : false,
  event                : false,
  FileReader           : false,
  FormData             : false,
  focus                : false,
  frames               : false,
  getComputedStyle     : false,
  HTMLElement          : false,
  HTMLAnchorElement    : false,
  HTMLBaseElement      : false,
  HTMLBlockquoteElement: false,
  HTMLBodyElement      : false,
  HTMLBRElement        : false,
  HTMLButtonElement    : false,
  HTMLCanvasElement    : false,
  HTMLDirectoryElement : false,
  HTMLDivElement       : false,
  HTMLDListElement     : false,
  HTMLFieldSetElement  : false,
  HTMLFontElement      : false,
  HTMLFormElement      : false,
  HTMLFrameElement     : false,
  HTMLFrameSetElement  : false,
  HTMLHeadElement      : false,
  HTMLHeadingElement   : false,
  HTMLHRElement        : false,
  HTMLHtmlElement      : false,
  HTMLIFrameElement    : false,
  HTMLImageElement     : false,
  HTMLInputElement     : false,
  HTMLIsIndexElement   : false,
  HTMLLabelElement     : false,
  HTMLLayerElement     : false,
  HTMLLegendElement    : false,
  HTMLLIElement        : false,
  HTMLLinkElement      : false,
  HTMLMapElement       : false,
  HTMLMenuElement      : false,
  HTMLMetaElement      : false,
  HTMLModElement       : false,
  HTMLObjectElement    : false,
  HTMLOListElement     : false,
  HTMLOptGroupElement  : false,
  HTMLOptionElement    : false,
  HTMLParagraphElement : false,
  HTMLParamElement     : false,
  HTMLPreElement       : false,
  HTMLQuoteElement     : false,
  HTMLScriptElement    : false,
  HTMLSelectElement    : false,
  HTMLStyleElement     : false,
  HTMLTableCaptionElement: false,
  HTMLTableCellElement : false,
  HTMLTableColElement  : false,
  HTMLTableElement     : false,
  HTMLTableRowElement  : false,
  HTMLTableSectionElement: false,
  HTMLTextAreaElement  : false,
  HTMLTitleElement     : false,
  HTMLUListElement     : false,
  HTMLVideoElement     : false,
  history              : false,
  Image                : false,
  length               : false,
  localStorage         : false,
  location             : false,
  matchMedia           : false,
  MessageChannel       : false,
  MessageEvent         : false,
  MessagePort          : false,
  MouseEvent           : false,
  moveBy               : false,
  moveTo               : false,
  MutationObserver     : false,
  name                 : false,
  Node                 : false,
  NodeFilter           : false,
  NodeList             : false,
  navigator            : false,
  onbeforeunload       : true,
  onblur               : true,
  onerror              : true,
  onfocus              : true,
  onload               : true,
  onresize             : true,
  onunload             : true,
  open                 : false,
  openDatabase         : false,
  opener               : false,
  Option               : false,
  parent               : false,
  print                : false,
  removeEventListener  : false,
  resizeBy             : false,
  resizeTo             : false,
  screen               : false,
  scroll               : false,
  scrollBy             : false,
  scrollTo             : false,
  sessionStorage       : false,
  setInterval          : false,
  setTimeout           : false,
  SharedWorker         : false,
  status               : false,
  SVGAElement          : false,
  SVGAltGlyphDefElement: false,
  SVGAltGlyphElement   : false,
  SVGAltGlyphItemElement: false,
  SVGAngle             : false,
  SVGAnimateColorElement: false,
  SVGAnimateElement    : false,
  SVGAnimateMotionElement: false,
  SVGAnimateTransformElement: false,
  SVGAnimatedAngle     : false,
  SVGAnimatedBoolean   : false,
  SVGAnimatedEnumeration: false,
  SVGAnimatedInteger   : false,
  SVGAnimatedLength    : false,
  SVGAnimatedLengthList: false,
  SVGAnimatedNumber    : false,
  SVGAnimatedNumberList: false,
  SVGAnimatedPathData  : false,
  SVGAnimatedPoints    : false,
  SVGAnimatedPreserveAspectRatio: false,
  SVGAnimatedRect      : false,
  SVGAnimatedString    : false,
  SVGAnimatedTransformList: false,
  SVGAnimationElement  : false,
  SVGCSSRule           : false,
  SVGCircleElement     : false,
  SVGClipPathElement   : false,
  SVGColor             : false,
  SVGColorProfileElement: false,
  SVGColorProfileRule  : false,
  SVGComponentTransferFunctionElement: false,
  SVGCursorElement     : false,
  SVGDefsElement       : false,
  SVGDescElement       : false,
  SVGDocument          : false,
  SVGElement           : false,
  SVGElementInstance   : false,
  SVGElementInstanceList: false,
  SVGEllipseElement    : false,
  SVGExternalResourcesRequired: false,
  SVGFEBlendElement    : false,
  SVGFEColorMatrixElement: false,
  SVGFEComponentTransferElement: false,
  SVGFECompositeElement: false,
  SVGFEConvolveMatrixElement: false,
  SVGFEDiffuseLightingElement: false,
  SVGFEDisplacementMapElement: false,
  SVGFEDistantLightElement: false,
  SVGFEFloodElement    : false,
  SVGFEFuncAElement    : false,
  SVGFEFuncBElement    : false,
  SVGFEFuncGElement    : false,
  SVGFEFuncRElement    : false,
  SVGFEGaussianBlurElement: false,
  SVGFEImageElement    : false,
  SVGFEMergeElement    : false,
  SVGFEMergeNodeElement: false,
  SVGFEMorphologyElement: false,
  SVGFEOffsetElement   : false,
  SVGFEPointLightElement: false,
  SVGFESpecularLightingElement: false,
  SVGFESpotLightElement: false,
  SVGFETileElement     : false,
  SVGFETurbulenceElement: false,
  SVGFilterElement     : false,
  SVGFilterPrimitiveStandardAttributes: false,
  SVGFitToViewBox      : false,
  SVGFontElement       : false,
  SVGFontFaceElement   : false,
  SVGFontFaceFormatElement: false,
  SVGFontFaceNameElement: false,
  SVGFontFaceSrcElement: false,
  SVGFontFaceUriElement: false,
  SVGForeignObjectElement: false,
  SVGGElement          : false,
  SVGGlyphElement      : false,
  SVGGlyphRefElement   : false,
  SVGGradientElement   : false,
  SVGHKernElement      : false,
  SVGICCColor          : false,
  SVGImageElement      : false,
  SVGLangSpace         : false,
  SVGLength            : false,
  SVGLengthList        : false,
  SVGLineElement       : false,
  SVGLinearGradientElement: false,
  SVGLocatable         : false,
  SVGMPathElement      : false,
  SVGMarkerElement     : false,
  SVGMaskElement       : false,
  SVGMatrix            : false,
  SVGMetadataElement   : false,
  SVGMissingGlyphElement: false,
  SVGNumber            : false,
  SVGNumberList        : false,
  SVGPaint             : false,
  SVGPathElement       : false,
  SVGPathSeg           : false,
  SVGPathSegArcAbs     : false,
  SVGPathSegArcRel     : false,
  SVGPathSegClosePath  : false,
  SVGPathSegCurvetoCubicAbs: false,
  SVGPathSegCurvetoCubicRel: false,
  SVGPathSegCurvetoCubicSmoothAbs: false,
  SVGPathSegCurvetoCubicSmoothRel: false,
  SVGPathSegCurvetoQuadraticAbs: false,
  SVGPathSegCurvetoQuadraticRel: false,
  SVGPathSegCurvetoQuadraticSmoothAbs: false,
  SVGPathSegCurvetoQuadraticSmoothRel: false,
  SVGPathSegLinetoAbs  : false,
  SVGPathSegLinetoHorizontalAbs: false,
  SVGPathSegLinetoHorizontalRel: false,
  SVGPathSegLinetoRel  : false,
  SVGPathSegLinetoVerticalAbs: false,
  SVGPathSegLinetoVerticalRel: false,
  SVGPathSegList       : false,
  SVGPathSegMovetoAbs  : false,
  SVGPathSegMovetoRel  : false,
  SVGPatternElement    : false,
  SVGPoint             : false,
  SVGPointList         : false,
  SVGPolygonElement    : false,
  SVGPolylineElement   : false,
  SVGPreserveAspectRatio: false,
  SVGRadialGradientElement: false,
  SVGRect              : false,
  SVGRectElement       : false,
  SVGRenderingIntent   : false,
  SVGSVGElement        : false,
  SVGScriptElement     : false,
  SVGSetElement        : false,
  SVGStopElement       : false,
  SVGStringList        : false,
  SVGStylable          : false,
  SVGStyleElement      : false,
  SVGSwitchElement     : false,
  SVGSymbolElement     : false,
  SVGTRefElement       : false,
  SVGTSpanElement      : false,
  SVGTests             : false,
  SVGTextContentElement: false,
  SVGTextElement       : false,
  SVGTextPathElement   : false,
  SVGTextPositioningElement: false,
  SVGTitleElement      : false,
  SVGTransform         : false,
  SVGTransformList     : false,
  SVGTransformable     : false,
  SVGURIReference      : false,
  SVGUnitTypes         : false,
  SVGUseElement        : false,
  SVGVKernElement      : false,
  SVGViewElement       : false,
  SVGViewSpec          : false,
  SVGZoomAndPan        : false,
  TimeEvent            : false,
  top                  : false,
  URL                  : false,
  WebSocket            : false,
  window               : false,
  Worker               : false,
  XMLHttpRequest       : false,
  XMLSerializer        : false,
  XPathEvaluator       : false,
  XPathException       : false,
  XPathExpression      : false,
  XPathNamespace       : false,
  XPathNSResolver      : false,
  XPathResult          : false
***REMOVED***;

exports.devel = ***REMOVED***
  alert  : false,
  confirm: false,
  console: false,
  Debug  : false,
  opera  : false,
  prompt : false
***REMOVED***;

exports.worker = ***REMOVED***
  importScripts: true,
  postMessage  : true,
  self         : true
***REMOVED***;
exports.nonstandard = ***REMOVED***
  escape  : false,
  unescape: false
***REMOVED***;

exports.couch = ***REMOVED***
  "require" : false,
  respond   : false,
  getRow    : false,
  emit      : false,
  send      : false,
  start     : false,
  sum       : false,
  log       : false,
  exports   : false,
  module    : false,
  provides  : false
***REMOVED***;

exports.node = ***REMOVED***
  __filename    : false,
  __dirname     : false,
  GLOBAL        : false,
  global        : false,
  module        : false,
  require       : false,

  Buffer        : true,
  console       : true,
  exports       : true,
  process       : true,
  setTimeout    : true,
  clearTimeout  : true,
  setInterval   : true,
  clearInterval : true,
  setImmediate  : true, // v0.9.1+
  clearImmediate: true  // v0.9.1+
***REMOVED***;

exports.phantom = ***REMOVED***
  phantom      : true,
  require      : true,
  WebPage      : true,
  console      : true, // in examples, but undocumented
  exports      : true  // v1.7+
***REMOVED***;

exports.rhino = ***REMOVED***
  defineClass  : false,
  deserialize  : false,
  gc           : false,
  help         : false,
  importClass  : false,
  importPackage: false,
  "java"       : false,
  load         : false,
  loadClass    : false,
  Packages     : false,
  print        : false,
  quit         : false,
  readFile     : false,
  readUrl      : false,
  runCommand   : false,
  seal         : false,
  serialize    : false,
  spawn        : false,
  sync         : false,
  toint32      : false,
  version      : false
***REMOVED***;

exports.shelljs = ***REMOVED***
  target       : false,
  echo         : false,
  exit         : false,
  cd           : false,
  pwd          : false,
  ls           : false,
  find         : false,
  cp           : false,
  rm           : false,
  mv           : false,
  mkdir        : false,
  test         : false,
  cat          : false,
  sed          : false,
  grep         : false,
  which        : false,
  dirs         : false,
  pushd        : false,
  popd         : false,
  env          : false,
  exec         : false,
  chmod        : false,
  config       : false,
  error        : false,
  tempdir      : false
***REMOVED***;

exports.typed = ***REMOVED***
  ArrayBuffer         : false,
  ArrayBufferView     : false,
  DataView            : false,
  Float32Array        : false,
  Float64Array        : false,
  Int16Array          : false,
  Int32Array          : false,
  Int8Array           : false,
  Uint16Array         : false,
  Uint32Array         : false,
  Uint8Array          : false,
  Uint8ClampedArray   : false
***REMOVED***;

exports.wsh = ***REMOVED***
  ActiveXObject            : true,
  Enumerator               : true,
  GetObject                : true,
  ScriptEngine             : true,
  ScriptEngineBuildVersion : true,
  ScriptEngineMajorVersion : true,
  ScriptEngineMinorVersion : true,
  VBArray                  : true,
  WSH                      : true,
  WScript                  : true,
  XDomainRequest           : true
***REMOVED***;

exports.dojo = ***REMOVED***
  dojo     : false,
  dijit    : false,
  dojox    : false,
  define   : false,
  "require": false
***REMOVED***;

exports.jquery = ***REMOVED***
  "$"    : false,
  jQuery : false
***REMOVED***;

exports.mootools = ***REMOVED***
  "$"           : false,
  "$$"          : false,
  Asset         : false,
  Browser       : false,
  Chain         : false,
  Class         : false,
  Color         : false,
  Cookie        : false,
  Core          : false,
  Document      : false,
  DomReady      : false,
  DOMEvent      : false,
  DOMReady      : false,
  Drag          : false,
  Element       : false,
  Elements      : false,
  Event         : false,
  Events        : false,
  Fx            : false,
  Group         : false,
  Hash          : false,
  HtmlTable     : false,
  Iframe        : false,
  IframeShim    : false,
  InputValidator: false,
  instanceOf    : false,
  Keyboard      : false,
  Locale        : false,
  Mask          : false,
  MooTools      : false,
  Native        : false,
  Options       : false,
  OverText      : false,
  Request       : false,
  Scroller      : false,
  Slick         : false,
  Slider        : false,
  Sortables     : false,
  Spinner       : false,
  Swiff         : false,
  Tips          : false,
  Type          : false,
  typeOf        : false,
  URI           : false,
  Window        : false
***REMOVED***;

exports.prototypejs = ***REMOVED***
  "$"               : false,
  "$$"              : false,
  "$A"              : false,
  "$F"              : false,
  "$H"              : false,
  "$R"              : false,
  "$break"          : false,
  "$continue"       : false,
  "$w"              : false,
  Abstract          : false,
  Ajax              : false,
  Class             : false,
  Enumerable        : false,
  Element           : false,
  Event             : false,
  Field             : false,
  Form              : false,
  Hash              : false,
  Insertion         : false,
  ObjectRange       : false,
  PeriodicalExecuter: false,
  Position          : false,
  Prototype         : false,
  Selector          : false,
  Template          : false,
  Toggle            : false,
  Try               : false,
  Autocompleter     : false,
  Builder           : false,
  Control           : false,
  Draggable         : false,
  Draggables        : false,
  Droppables        : false,
  Effect            : false,
  Sortable          : false,
  SortableObserver  : false,
  Sound             : false,
  Scriptaculous     : false
***REMOVED***;

exports.yui = ***REMOVED***
  YUI       : false,
  Y         : false,
  YUI_config: false
***REMOVED***;

exports.mocha = ***REMOVED***
  describe    : false,
  it          : false,
  before      : false,
  after       : false,
  beforeEach  : false,
  afterEach   : false,
  suite       : false,
  test        : false,
  setup       : false,
  teardown    : false
***REMOVED***;

***REMOVED***,
***REMOVED******REMOVED***],
10:[function(_dereq_,module,exports)***REMOVED***

function EventEmitter() ***REMOVED***
  this._events = this._events || ***REMOVED******REMOVED***;
  this._maxListeners = this._maxListeners || undefined;
***REMOVED***
module.exports = EventEmitter;
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;
EventEmitter.defaultMaxListeners = 10;
EventEmitter.prototype.setMaxListeners = function(n) ***REMOVED***
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
***REMOVED***;

EventEmitter.prototype.emit = function(type) ***REMOVED***
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = ***REMOVED******REMOVED***;
  if (type === 'error') ***REMOVED***
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) ***REMOVED***
      er = arguments[1];
      if (er instanceof Error) ***REMOVED***
        throw er; // Unhandled 'error' event
  ***REMOVED*** else ***REMOVED***
        throw TypeError('Uncaught, unspecified "error" event.');
  ***REMOVED***
      return false;
***REMOVED***
  ***REMOVED***

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) ***REMOVED***
    switch (arguments.length) ***REMOVED***
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      default:
        len = arguments.length;
        args = new Array(len - 1);
        for (i = 1; i < len; i++)
          args[i - 1] = arguments[i];
        handler.apply(this, args);
***REMOVED***
  ***REMOVED*** else if (isObject(handler)) ***REMOVED***
    len = arguments.length;
    args = new Array(len - 1);
    for (i = 1; i < len; i++)
      args[i - 1] = arguments[i];

    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  ***REMOVED***

  return true;
***REMOVED***;

EventEmitter.prototype.addListener = function(type, listener) ***REMOVED***
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = ***REMOVED******REMOVED***;
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    this._events[type].push(listener);
  else
    this._events[type] = [this._events[type], listener];
  if (isObject(this._events[type]) && !this._events[type].warned) ***REMOVED***
    var m;
    if (!isUndefined(this._maxListeners)) ***REMOVED***
      m = this._maxListeners;
***REMOVED*** else ***REMOVED***
      m = EventEmitter.defaultMaxListeners;
***REMOVED***

    if (m && m > 0 && this._events[type].length > m) ***REMOVED***
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      console.trace();
***REMOVED***
  ***REMOVED***

  return this;
***REMOVED***;

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) ***REMOVED***
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() ***REMOVED***
    this.removeListener(type, g);

    if (!fired) ***REMOVED***
      fired = true;
      listener.apply(this, arguments);
***REMOVED***
  ***REMOVED***

  g.listener = listener;
  this.on(type, g);

  return this;
***REMOVED***;
EventEmitter.prototype.removeListener = function(type, listener) ***REMOVED***
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) ***REMOVED***
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  ***REMOVED*** else if (isObject(list)) ***REMOVED***
    for (i = length; i-- > 0;) ***REMOVED***
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) ***REMOVED***
        position = i;
        break;
  ***REMOVED***
***REMOVED***

    if (position < 0)
      return this;

    if (list.length === 1) ***REMOVED***
      list.length = 0;
      delete this._events[type];
***REMOVED*** else ***REMOVED***
      list.splice(position, 1);
***REMOVED***

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  ***REMOVED***

  return this;
***REMOVED***;

EventEmitter.prototype.removeAllListeners = function(type) ***REMOVED***
  var key, listeners;

  if (!this._events)
    return this;
  if (!this._events.removeListener) ***REMOVED***
    if (arguments.length === 0)
      this._events = ***REMOVED******REMOVED***;
    else if (this._events[type])
      delete this._events[type];
    return this;
  ***REMOVED***
  if (arguments.length === 0) ***REMOVED***
    for (key in this._events) ***REMOVED***
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
***REMOVED***
    this.removeAllListeners('removeListener');
    this._events = ***REMOVED******REMOVED***;
    return this;
  ***REMOVED***

  listeners = this._events[type];

  if (isFunction(listeners)) ***REMOVED***
    this.removeListener(type, listeners);
  ***REMOVED*** else ***REMOVED***
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  ***REMOVED***
  delete this._events[type];

  return this;
***REMOVED***;

EventEmitter.prototype.listeners = function(type) ***REMOVED***
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
***REMOVED***;

EventEmitter.listenerCount = function(emitter, type) ***REMOVED***
  var ret;
  if (!emitter._events || !emitter._events[type])
    ret = 0;
  else if (isFunction(emitter._events[type]))
    ret = 1;
  else
    ret = emitter._events[type].length;
  return ret;
***REMOVED***;

function isFunction(arg) ***REMOVED***
  return typeof arg === 'function';
***REMOVED***

function isNumber(arg) ***REMOVED***
  return typeof arg === 'number';
***REMOVED***

function isObject(arg) ***REMOVED***
  return typeof arg === 'object' && arg !== null;
***REMOVED***

function isUndefined(arg) ***REMOVED***
  return arg === void 0;
***REMOVED***

***REMOVED***,
***REMOVED******REMOVED***]***REMOVED***,***REMOVED******REMOVED***,[3])
(3)

***REMOVED***);