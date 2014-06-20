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

define('ace/mode/json_worker', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/worker/mirror', 'ace/mode/json/json_parse'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var Mirror = require("../worker/mirror").Mirror;
var parse = require("./json/json_parse");

var JsonWorker = exports.JsonWorker = function(sender) ***REMOVED***
    Mirror.call(this, sender);
    this.setTimeout(200);
***REMOVED***;

oop.inherits(JsonWorker, Mirror);

(function() ***REMOVED***

    this.onUpdate = function() ***REMOVED***
        var value = this.doc.getValue();

        try ***REMOVED***
            var result = parse(value);
    ***REMOVED*** catch (e) ***REMOVED***
            var pos = this.doc.indexToPosition(e.at-1);
            this.sender.emit("error", ***REMOVED***
                row: pos.row,
                column: pos.column,
                text: e.message,
                type: "error"
        ***REMOVED***);
            return;
    ***REMOVED***
        this.sender.emit("ok");
***REMOVED***;

***REMOVED***).call(JsonWorker.prototype);

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

define('ace/mode/json/json_parse', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***

    var at,     // The index of the current character
        ch,     // The current character
        escapee = ***REMOVED***
            '"':  '"',
            '\\': '\\',
            '/':  '/',
            b:    '\b',
            f:    '\f',
            n:    '\n',
            r:    '\r',
            t:    '\t'
    ***REMOVED***
        text,

        error = function (m) ***REMOVED***

            throw ***REMOVED***
                name:    'SyntaxError',
                message: m,
                at:      at,
                text:    text
        ***REMOVED***;
    ***REMOVED***

        next = function (c) ***REMOVED***

            if (c && c !== ch) ***REMOVED***
                error("Expected '" + c + "' instead of '" + ch + "'");
        ***REMOVED***

            ch = text.charAt(at);
            at += 1;
            return ch;
    ***REMOVED***

        number = function () ***REMOVED***

            var number,
                string = '';

            if (ch === '-') ***REMOVED***
                string = '-';
                next('-');
        ***REMOVED***
            while (ch >= '0' && ch <= '9') ***REMOVED***
                string += ch;
                next();
        ***REMOVED***
            if (ch === '.') ***REMOVED***
                string += '.';
                while (next() && ch >= '0' && ch <= '9') ***REMOVED***
                    string += ch;
            ***REMOVED***
        ***REMOVED***
            if (ch === 'e' || ch === 'E') ***REMOVED***
                string += ch;
                next();
                if (ch === '-' || ch === '+') ***REMOVED***
                    string += ch;
                    next();
            ***REMOVED***
                while (ch >= '0' && ch <= '9') ***REMOVED***
                    string += ch;
                    next();
            ***REMOVED***
        ***REMOVED***
            number = +string;
            if (isNaN(number)) ***REMOVED***
                error("Bad number");
        ***REMOVED*** else ***REMOVED***
                return number;
        ***REMOVED***
    ***REMOVED***

        string = function () ***REMOVED***

            var hex,
                i,
                string = '',
                uffff;

            if (ch === '"') ***REMOVED***
                while (next()) ***REMOVED***
                    if (ch === '"') ***REMOVED***
                        next();
                        return string;
                ***REMOVED*** else if (ch === '\\') ***REMOVED***
                        next();
                        if (ch === 'u') ***REMOVED***
                            uffff = 0;
                            for (i = 0; i < 4; i += 1) ***REMOVED***
                                hex = parseInt(next(), 16);
                                if (!isFinite(hex)) ***REMOVED***
                                    break;
                            ***REMOVED***
                                uffff = uffff * 16 + hex;
                        ***REMOVED***
                            string += String.fromCharCode(uffff);
                    ***REMOVED*** else if (typeof escapee[ch] === 'string') ***REMOVED***
                            string += escapee[ch];
                    ***REMOVED*** else ***REMOVED***
                            break;
                    ***REMOVED***
                ***REMOVED*** else ***REMOVED***
                        string += ch;
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
            error("Bad string");
    ***REMOVED***

        white = function () ***REMOVED***

            while (ch && ch <= ' ') ***REMOVED***
                next();
        ***REMOVED***
    ***REMOVED***

        word = function () ***REMOVED***

            switch (ch) ***REMOVED***
            case 't':
                next('t');
                next('r');
                next('u');
                next('e');
                return true;
            case 'f':
                next('f');
                next('a');
                next('l');
                next('s');
                next('e');
                return false;
            case 'n':
                next('n');
                next('u');
                next('l');
                next('l');
                return null;
        ***REMOVED***
            error("Unexpected '" + ch + "'");
    ***REMOVED***

        value,  // Place holder for the value function.

        array = function () ***REMOVED***

            var array = [];

            if (ch === '[') ***REMOVED***
                next('[');
                white();
                if (ch === ']') ***REMOVED***
                    next(']');
                    return array;   // empty array
            ***REMOVED***
                while (ch) ***REMOVED***
                    array.push(value());
                    white();
                    if (ch === ']') ***REMOVED***
                        next(']');
                        return array;
                ***REMOVED***
                    next(',');
                    white();
            ***REMOVED***
        ***REMOVED***
            error("Bad array");
    ***REMOVED***

        object = function () ***REMOVED***

            var key,
                object = ***REMOVED******REMOVED***;

            if (ch === '***REMOVED***') ***REMOVED***
                next('***REMOVED***');
                white();
                if (ch === '***REMOVED***') ***REMOVED***
                    next('***REMOVED***');
                    return object;   // empty object
            ***REMOVED***
                while (ch) ***REMOVED***
                    key = string();
                    white();
                    next(':');
                    if (Object.hasOwnProperty.call(object, key)) ***REMOVED***
                        error('Duplicate key "' + key + '"');
                ***REMOVED***
                    object[key] = value();
                    white();
                    if (ch === '***REMOVED***') ***REMOVED***
                        next('***REMOVED***');
                        return object;
                ***REMOVED***
                    next(',');
                    white();
            ***REMOVED***
        ***REMOVED***
            error("Bad object");
    ***REMOVED***;

    value = function () ***REMOVED***

        white();
        switch (ch) ***REMOVED***
        case '***REMOVED***':
            return object();
        case '[':
            return array();
        case '"':
            return string();
        case '-':
            return number();
        default:
            return ch >= '0' && ch <= '9' ? number() : word();
    ***REMOVED***
***REMOVED***;

    return function (source, reviver) ***REMOVED***
        var result;

        text = source;
        at = 0;
        ch = ' ';
        result = value();
        white();
        if (ch) ***REMOVED***
            error("Syntax error");
    ***REMOVED***

        return typeof reviver === 'function' ? function walk(holder, key) ***REMOVED***
            var k, v, value = holder[key];
            if (value && typeof value === 'object') ***REMOVED***
                for (k in value) ***REMOVED***
                    if (Object.hasOwnProperty.call(value, k)) ***REMOVED***
                        v = walk(value, k);
                        if (v !== undefined) ***REMOVED***
                            value[k] = v;
                    ***REMOVED*** else ***REMOVED***
                            delete value[k];
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
            return reviver.call(holder, key, value);
    ***REMOVED***(***REMOVED***'': result***REMOVED***, '') : result;
***REMOVED***;
***REMOVED***);
