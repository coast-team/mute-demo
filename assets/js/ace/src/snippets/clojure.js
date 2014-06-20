define('ace/snippets/clojure', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***


exports.snippetText = "snippet comm\n\
	(comment\n\
	  $***REMOVED***1***REMOVED***\n\
	  )\n\
snippet condp\n\
	(condp $***REMOVED***1:pred***REMOVED*** $***REMOVED***2:expr***REMOVED***\n\
	  $***REMOVED***3***REMOVED***)\n\
snippet def\n\
	(def $***REMOVED***1***REMOVED***)\n\
snippet defm\n\
	(defmethod $***REMOVED***1:multifn***REMOVED*** \"$***REMOVED***2:doc-string***REMOVED***\" $***REMOVED***3:dispatch-val***REMOVED*** [$***REMOVED***4:args***REMOVED***]\n\
	  $***REMOVED***5***REMOVED***)\n\
snippet defmm\n\
	(defmulti $***REMOVED***1:name***REMOVED*** \"$***REMOVED***2:doc-string***REMOVED***\" $***REMOVED***3:dispatch-fn***REMOVED***)\n\
snippet defma\n\
	(defmacro $***REMOVED***1:name***REMOVED*** \"$***REMOVED***2:doc-string***REMOVED***\" $***REMOVED***3:dispatch-fn***REMOVED***)\n\
snippet defn\n\
	(defn $***REMOVED***1:name***REMOVED*** \"$***REMOVED***2:doc-string***REMOVED***\" [$***REMOVED***3:arg-list***REMOVED***]\n\
	  $***REMOVED***4***REMOVED***)\n\
snippet defp\n\
	(defprotocol $***REMOVED***1:name***REMOVED***\n\
	  $***REMOVED***2***REMOVED***)\n\
snippet defr\n\
	(defrecord $***REMOVED***1:name***REMOVED*** [$***REMOVED***2:fields***REMOVED***]\n\
	  $***REMOVED***3:protocol***REMOVED***\n\
	  $***REMOVED***4***REMOVED***)\n\
snippet deft\n\
	(deftest $***REMOVED***1:name***REMOVED***\n\
	    (is (= $***REMOVED***2:assertion***REMOVED***)))\n\
	  $***REMOVED***3***REMOVED***)\n\
snippet is\n\
	(is (= $***REMOVED***1***REMOVED*** $***REMOVED***2***REMOVED***))\n\
snippet defty\n\
	(deftype $***REMOVED***1:Name***REMOVED*** [$***REMOVED***2:fields***REMOVED***]\n\
	  $***REMOVED***3:Protocol***REMOVED***\n\
	  $***REMOVED***4***REMOVED***)\n\
snippet doseq\n\
	(doseq [$***REMOVED***1:elem***REMOVED*** $***REMOVED***2:coll***REMOVED***]\n\
	  $***REMOVED***3***REMOVED***)\n\
snippet fn\n\
	(fn [$***REMOVED***1:arg-list***REMOVED***] $***REMOVED***2***REMOVED***)\n\
snippet if\n\
	(if $***REMOVED***1:test-expr***REMOVED***\n\
	  $***REMOVED***2:then-expr***REMOVED***\n\
	  $***REMOVED***3:else-expr***REMOVED***)\n\
snippet if-let \n\
	(if-let [$***REMOVED***1:result***REMOVED*** $***REMOVED***2:test-expr***REMOVED***]\n\
		($***REMOVED***3:then-expr***REMOVED*** $1)\n\
		($***REMOVED***4:else-expr***REMOVED***))\n\
snippet imp\n\
	(:import [$***REMOVED***1:package***REMOVED***])\n\
	& ***REMOVED***:keys [$***REMOVED***1:keys***REMOVED***] :or ***REMOVED***$***REMOVED***2:defaults***REMOVED******REMOVED******REMOVED***\n\
snippet let\n\
	(let [$***REMOVED***1:name***REMOVED*** $***REMOVED***2:expr***REMOVED***]\n\
		$***REMOVED***3***REMOVED***)\n\
snippet letfn\n\
	(letfn [($***REMOVED***1:name) [$***REMOVED***2:args***REMOVED***]\n\
	          $***REMOVED***3***REMOVED***)])\n\
snippet map\n\
	(map $***REMOVED***1:func***REMOVED*** $***REMOVED***2:coll***REMOVED***)\n\
snippet mapl\n\
	(map #($***REMOVED***1:lambda***REMOVED***) $***REMOVED***2:coll***REMOVED***)\n\
snippet met\n\
	($***REMOVED***1:name***REMOVED*** [$***REMOVED***2:this***REMOVED*** $***REMOVED***3:args***REMOVED***]\n\
	  $***REMOVED***4***REMOVED***)\n\
snippet ns\n\
	(ns $***REMOVED***1:name***REMOVED***\n\
	  $***REMOVED***2***REMOVED***)\n\
snippet dotimes\n\
	(dotimes [_ 10]\n\
	  (time\n\
	    (dotimes [_ $***REMOVED***1:times***REMOVED***]\n\
	      $***REMOVED***2***REMOVED***)))\n\
snippet pmethod\n\
	($***REMOVED***1:name***REMOVED*** [$***REMOVED***2:this***REMOVED*** $***REMOVED***3:args***REMOVED***])\n\
snippet refer\n\
	(:refer-clojure :exclude [$***REMOVED***1***REMOVED***])\n\
snippet require\n\
	(:require [$***REMOVED***1:namespace***REMOVED*** :as [$***REMOVED***2***REMOVED***]])\n\
snippet use\n\
	(:use [$***REMOVED***1:namespace***REMOVED*** :only [$***REMOVED***2***REMOVED***]])\n\
snippet print\n\
	(println $***REMOVED***1***REMOVED***)\n\
snippet reduce\n\
	(reduce $***REMOVED***1:(fn [p n] $***REMOVED***3***REMOVED***)***REMOVED*** $***REMOVED***2***REMOVED***)\n\
snippet when\n\
	(when $***REMOVED***1:test***REMOVED*** $***REMOVED***2:body***REMOVED***)\n\
snippet when-let\n\
	(when-let [$***REMOVED***1:result***REMOVED*** $***REMOVED***2:test***REMOVED***]\n\
		$***REMOVED***3:body***REMOVED***)\n\
";
exports.scope = "clojure";

***REMOVED***);
