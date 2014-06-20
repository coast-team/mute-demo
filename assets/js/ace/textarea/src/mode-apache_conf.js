/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2012, Ajax.org B.V.
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
 *
 * Contributor(s):
 *
 *
 *
 * ***** END LICENSE BLOCK ***** */

__ace_shadowed__.define('ace/mode/apache_conf', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text', 'ace/mode/apache_conf_highlight_rules', 'ace/mode/folding/cstyle'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var ApacheConfHighlightRules = require("./apache_conf_highlight_rules").ApacheConfHighlightRules;
var FoldMode = require("./folding/cstyle").FoldMode;

var Mode = function() ***REMOVED***
    this.HighlightRules = ApacheConfHighlightRules;
    this.foldingRules = new FoldMode();
***REMOVED***;
oop.inherits(Mode, TextMode);

(function() ***REMOVED***
    this.lineCommentStart = "#";
    this.$id = "ace/mode/apache_conf";
***REMOVED***).call(Mode.prototype);

exports.Mode = Mode;
***REMOVED***);

__ace_shadowed__.define('ace/mode/apache_conf_highlight_rules', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text_highlight_rules'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var ApacheConfHighlightRules = function() ***REMOVED***

    this.$rules = ***REMOVED*** start: 
       [ ***REMOVED*** token: 
            [ 'punctuation.definition.comment.apacheconf',
              'comment.line.hash.ini',
              'comment.line.hash.ini' ],
           regex: '^((?:\\s)*)(#)(.*$)' ***REMOVED***,
         ***REMOVED*** token: 
            [ 'punctuation.definition.tag.apacheconf',
              'entity.tag.apacheconf',
              'text',
              'string.value.apacheconf',
              'punctuation.definition.tag.apacheconf' ],
           regex: '(<)(Proxy|ProxyMatch|IfVersion|Directory|DirectoryMatch|Files|FilesMatch|IfDefine|IfModule|Limit|LimitExcept|Location|LocationMatch|VirtualHost)(?:(\\s)(.+?))?(>)' ***REMOVED***,
         ***REMOVED*** token: 
            [ 'punctuation.definition.tag.apacheconf',
              'entity.tag.apacheconf',
              'punctuation.definition.tag.apacheconf' ],
           regex: '(</)(Proxy|ProxyMatch|IfVersion|Directory|DirectoryMatch|Files|FilesMatch|IfDefine|IfModule|Limit|LimitExcept|Location|LocationMatch|VirtualHost)(>)' ***REMOVED***,
         ***REMOVED*** token: 
            [ 'keyword.alias.apacheconf', 'text',
              'string.regexp.apacheconf', 'text',
              'string.replacement.apacheconf', 'text' ],
           regex: '(Rewrite(?:Rule|Cond))(\\s+)(.+?)(\\s+)(.+?)($|\\s)' ***REMOVED***,
         ***REMOVED*** token: 
            [ 'keyword.alias.apacheconf', 'text',
              'entity.status.apacheconf', 'text',
              'string.regexp.apacheconf', 'text',
              'string.path.apacheconf', 'text' ],
           regex: '(RedirectMatch)(?:(\\s+)(\\d\\d\\d|permanent|temp|seeother|gone))?(\\s+)(.+?)(\\s+)(?:(.+?)($|\\s))?' ***REMOVED***,
         ***REMOVED*** token: 
            [ 'keyword.alias.apacheconf', 'text', 
              'entity.status.apacheconf', 'text',
              'string.path.apacheconf', 'text',
              'string.path.apacheconf', 'text' ],
           regex: '(Redirect)(?:(\\s+)(\\d\\d\\d|permanent|temp|seeother|gone))?(\\s+)(.+?)(\\s+)(?:(.+?)($|\\s))?' ***REMOVED***,
         ***REMOVED*** token: 
            [ 'keyword.alias.apacheconf', 'text',
              'string.regexp.apacheconf', 'text',
              'string.path.apacheconf', 'text' ],
           regex: '(ScriptAliasMatch|AliasMatch)(\\s+)(.+?)(\\s+)(?:(.+?)(\\s))?' ***REMOVED***,
         ***REMOVED*** token: 
            [ 'keyword.alias.apacheconf', 'text',
              'string.path.apacheconf', 'text',
              'string.path.apacheconf', 'text' ],
           regex: '(RedirectPermanent|RedirectTemp|ScriptAlias|Alias)(\\s+)(.+?)(\\s+)(?:(.+?)($|\\s))?' ***REMOVED***,
         ***REMOVED*** token: 'keyword.core.apacheconf',
           regex: '\\b(?:AcceptPathInfo|AccessFileName|AddDefaultCharset|AddOutputFilterByType|AllowEncodedSlashes|AllowOverride|AuthName|AuthType|CGIMapExtension|ContentDigest|DefaultType|DocumentRoot|EnableMMAP|EnableSendfile|ErrorDocument|ErrorLog|FileETag|ForceType|HostnameLookups|IdentityCheck|Include|KeepAlive|KeepAliveTimeout|LimitInternalRecursion|LimitRequestBody|LimitRequestFields|LimitRequestFieldSize|LimitRequestLine|LimitXMLRequestBody|LogLevel|MaxKeepAliveRequests|NameVirtualHost|Options|Require|RLimitCPU|RLimitMEM|RLimitNPROC|Satisfy|ScriptInterpreterSource|ServerAdmin|ServerAlias|ServerName|ServerPath|ServerRoot|ServerSignature|ServerTokens|SetHandler|SetInputFilter|SetOutputFilter|TimeOut|TraceEnable|UseCanonicalName)\\b' ***REMOVED***,
         ***REMOVED*** token: 'keyword.mpm.apacheconf',
           regex: '\\b(?:AcceptMutex|AssignUserID|BS2000Account|ChildPerUserID|CoreDumpDirectory|EnableExceptionHook|Group|Listen|ListenBacklog|LockFile|MaxClients|MaxMemFree|MaxRequestsPerChild|MaxRequestsPerThread|MaxSpareServers|MaxSpareThreads|MaxThreads|MaxThreadsPerChild|MinSpareServers|MinSpareThreads|NumServers|PidFile|ReceiveBufferSize|ScoreBoardFile|SendBufferSize|ServerLimit|StartServers|StartThreads|ThreadLimit|ThreadsPerChild|ThreadStackSize|User|Win32DisableAcceptEx)\\b' ***REMOVED***,
         ***REMOVED*** token: 'keyword.access.apacheconf',
           regex: '\\b(?:Allow|Deny|Order)\\b' ***REMOVED***,
         ***REMOVED*** token: 'keyword.actions.apacheconf',
           regex: '\\b(?:Action|Script)\\b' ***REMOVED***,
         ***REMOVED*** token: 'keyword.alias.apacheconf',
           regex: '\\b(?:Alias|AliasMatch|Redirect|RedirectMatch|RedirectPermanent|RedirectTemp|ScriptAlias|ScriptAliasMatch)\\b' ***REMOVED***,
         ***REMOVED*** token: 'keyword.auth.apacheconf',
           regex: '\\b(?:AuthAuthoritative|AuthGroupFile|AuthUserFile)\\b' ***REMOVED***,
         ***REMOVED*** token: 'keyword.auth_anon.apacheconf',
           regex: '\\b(?:Anonymous|Anonymous_Authoritative|Anonymous_LogEmail|Anonymous_MustGiveEmail|Anonymous_NoUserID|Anonymous_VerifyEmail)\\b' ***REMOVED***,
         ***REMOVED*** token: 'keyword.auth_dbm.apacheconf',
           regex: '\\b(?:AuthDBMAuthoritative|AuthDBMGroupFile|AuthDBMType|AuthDBMUserFile)\\b' ***REMOVED***,
         ***REMOVED*** token: 'keyword.auth_digest.apacheconf',
           regex: '\\b(?:AuthDigestAlgorithm|AuthDigestDomain|AuthDigestFile|AuthDigestGroupFile|AuthDigestNcCheck|AuthDigestNonceFormat|AuthDigestNonceLifetime|AuthDigestQop|AuthDigestShmemSize)\\b' ***REMOVED***,
         ***REMOVED*** token: 'keyword.auth_ldap.apacheconf',
           regex: '\\b(?:AuthLDAPAuthoritative|AuthLDAPBindDN|AuthLDAPBindPassword|AuthLDAPCharsetConfig|AuthLDAPCompareDNOnServer|AuthLDAPDereferenceAliases|AuthLDAPEnabled|AuthLDAPFrontPageHack|AuthLDAPGroupAttribute|AuthLDAPGroupAttributeIsDN|AuthLDAPRemoteUserIsDN|AuthLDAPUrl)\\b' ***REMOVED***,
         ***REMOVED*** token: 'keyword.autoindex.apacheconf',
           regex: '\\b(?:AddAlt|AddAltByEncoding|AddAltByType|AddDescription|AddIcon|AddIconByEncoding|AddIconByType|DefaultIcon|HeaderName|IndexIgnore|IndexOptions|IndexOrderDefault|ReadmeName)\\b' ***REMOVED***,
         ***REMOVED*** token: 'keyword.cache.apacheconf',
           regex: '\\b(?:CacheDefaultExpire|CacheDisable|CacheEnable|CacheForceCompletion|CacheIgnoreCacheControl|CacheIgnoreHeaders|CacheIgnoreNoLastMod|CacheLastModifiedFactor|CacheMaxExpire)\\b' ***REMOVED***,
         ***REMOVED*** token: 'keyword.cern_meta.apacheconf',
           regex: '\\b(?:MetaDir|MetaFiles|MetaSuffix)\\b' ***REMOVED***,
         ***REMOVED*** token: 'keyword.cgi.apacheconf',
           regex: '\\b(?:ScriptLog|ScriptLogBuffer|ScriptLogLength)\\b' ***REMOVED***,
         ***REMOVED*** token: 'keyword.cgid.apacheconf',
           regex: '\\b(?:ScriptLog|ScriptLogBuffer|ScriptLogLength|ScriptSock)\\b' ***REMOVED***,
         ***REMOVED*** token: 'keyword.charset_lite.apacheconf',
           regex: '\\b(?:CharsetDefault|CharsetOptions|CharsetSourceEnc)\\b' ***REMOVED***,
         ***REMOVED*** token: 'keyword.dav.apacheconf',
           regex: '\\b(?:Dav|DavDepthInfinity|DavMinTimeout|DavLockDB)\\b' ***REMOVED***,
         ***REMOVED*** token: 'keyword.deflate.apacheconf',
           regex: '\\b(?:DeflateBufferSize|DeflateCompressionLevel|DeflateFilterNote|DeflateMemLevel|DeflateWindowSize)\\b' ***REMOVED***,
         ***REMOVED*** token: 'keyword.dir.apacheconf',
           regex: '\\b(?:DirectoryIndex|DirectorySlash)\\b' ***REMOVED***,
         ***REMOVED*** token: 'keyword.disk_cache.apacheconf',
           regex: '\\b(?:CacheDirLength|CacheDirLevels|CacheExpiryCheck|CacheGcClean|CacheGcDaily|CacheGcInterval|CacheGcMemUsage|CacheGcUnused|CacheMaxFileSize|CacheMinFileSize|CacheRoot|CacheSize|CacheTimeMargin)\\b' ***REMOVED***,
         ***REMOVED*** token: 'keyword.dumpio.apacheconf',
           regex: '\\b(?:DumpIOInput|DumpIOOutput)\\b' ***REMOVED***,
         ***REMOVED*** token: 'keyword.env.apacheconf',
           regex: '\\b(?:PassEnv|SetEnv|UnsetEnv)\\b' ***REMOVED***,
         ***REMOVED*** token: 'keyword.expires.apacheconf',
           regex: '\\b(?:ExpiresActive|ExpiresByType|ExpiresDefault)\\b' ***REMOVED***,
         ***REMOVED*** token: 'keyword.ext_filter.apacheconf',
           regex: '\\b(?:ExtFilterDefine|ExtFilterOptions)\\b' ***REMOVED***,
         ***REMOVED*** token: 'keyword.file_cache.apacheconf',
           regex: '\\b(?:CacheFile|MMapFile)\\b' ***REMOVED***,
         ***REMOVED*** token: 'keyword.headers.apacheconf',
           regex: '\\b(?:Header|RequestHeader)\\b' ***REMOVED***,
         ***REMOVED*** token: 'keyword.imap.apacheconf',
           regex: '\\b(?:ImapBase|ImapDefault|ImapMenu)\\b' ***REMOVED***,
         ***REMOVED*** token: 'keyword.include.apacheconf',
           regex: '\\b(?:SSIEndTag|SSIErrorMsg|SSIStartTag|SSITimeFormat|SSIUndefinedEcho|XBitHack)\\b' ***REMOVED***,
         ***REMOVED*** token: 'keyword.isapi.apacheconf',
           regex: '\\b(?:ISAPIAppendLogToErrors|ISAPIAppendLogToQuery|ISAPICacheFile|ISAPIFakeAsync|ISAPILogNotSupported|ISAPIReadAheadBuffer)\\b' ***REMOVED***,
         ***REMOVED*** token: 'keyword.ldap.apacheconf',
           regex: '\\b(?:LDAPCacheEntries|LDAPCacheTTL|LDAPConnectionTimeout|LDAPOpCacheEntries|LDAPOpCacheTTL|LDAPSharedCacheFile|LDAPSharedCacheSize|LDAPTrustedCA|LDAPTrustedCAType)\\b' ***REMOVED***,
         ***REMOVED*** token: 'keyword.log.apacheconf',
           regex: '\\b(?:BufferedLogs|CookieLog|CustomLog|LogFormat|TransferLog|ForensicLog)\\b' ***REMOVED***,
         ***REMOVED*** token: 'keyword.mem_cache.apacheconf',
           regex: '\\b(?:MCacheMaxObjectCount|MCacheMaxObjectSize|MCacheMaxStreamingBuffer|MCacheMinObjectSize|MCacheRemovalAlgorithm|MCacheSize)\\b' ***REMOVED***,
         ***REMOVED*** token: 'keyword.mime.apacheconf',
           regex: '\\b(?:AddCharset|AddEncoding|AddHandler|AddInputFilter|AddLanguage|AddOutputFilter|AddType|DefaultLanguage|ModMimeUsePathInfo|MultiviewsMatch|RemoveCharset|RemoveEncoding|RemoveHandler|RemoveInputFilter|RemoveLanguage|RemoveOutputFilter|RemoveType|TypesConfig)\\b' ***REMOVED***,
         ***REMOVED*** token: 'keyword.misc.apacheconf',
           regex: '\\b(?:ProtocolEcho|Example|AddModuleInfo|MimeMagicFile|CheckSpelling|ExtendedStatus|SuexecUserGroup|UserDir)\\b' ***REMOVED***,
         ***REMOVED*** token: 'keyword.negotiation.apacheconf',
           regex: '\\b(?:CacheNegotiatedDocs|ForceLanguagePriority|LanguagePriority)\\b' ***REMOVED***,
         ***REMOVED*** token: 'keyword.nw_ssl.apacheconf',
           regex: '\\b(?:NWSSLTrustedCerts|NWSSLUpgradeable|SecureListen)\\b' ***REMOVED***,
         ***REMOVED*** token: 'keyword.proxy.apacheconf',
           regex: '\\b(?:AllowCONNECT|NoProxy|ProxyBadHeader|ProxyBlock|ProxyDomain|ProxyErrorOverride|ProxyFtpDirCharset|ProxyIOBufferSize|ProxyMaxForwards|ProxyPass|ProxyPassReverse|ProxyPreserveHost|ProxyReceiveBufferSize|ProxyRemote|ProxyRemoteMatch|ProxyRequests|ProxyTimeout|ProxyVia)\\b' ***REMOVED***,
         ***REMOVED*** token: 'keyword.rewrite.apacheconf',
           regex: '\\b(?:RewriteBase|RewriteCond|RewriteEngine|RewriteLock|RewriteLog|RewriteLogLevel|RewriteMap|RewriteOptions|RewriteRule)\\b' ***REMOVED***,
         ***REMOVED*** token: 'keyword.setenvif.apacheconf',
           regex: '\\b(?:BrowserMatch|BrowserMatchNoCase|SetEnvIf|SetEnvIfNoCase)\\b' ***REMOVED***,
         ***REMOVED*** token: 'keyword.so.apacheconf',
           regex: '\\b(?:LoadFile|LoadModule)\\b' ***REMOVED***,
         ***REMOVED*** token: 'keyword.ssl.apacheconf',
           regex: '\\b(?:SSLCACertificateFile|SSLCACertificatePath|SSLCARevocationFile|SSLCARevocationPath|SSLCertificateChainFile|SSLCertificateFile|SSLCertificateKeyFile|SSLCipherSuite|SSLEngine|SSLMutex|SSLOptions|SSLPassPhraseDialog|SSLProtocol|SSLProxyCACertificateFile|SSLProxyCACertificatePath|SSLProxyCARevocationFile|SSLProxyCARevocationPath|SSLProxyCipherSuite|SSLProxyEngine|SSLProxyMachineCertificateFile|SSLProxyMachineCertificatePath|SSLProxyProtocol|SSLProxyVerify|SSLProxyVerifyDepth|SSLRandomSeed|SSLRequire|SSLRequireSSL|SSLSessionCache|SSLSessionCacheTimeout|SSLUserName|SSLVerifyClient|SSLVerifyDepth)\\b' ***REMOVED***,
         ***REMOVED*** token: 'keyword.usertrack.apacheconf',
           regex: '\\b(?:CookieDomain|CookieExpires|CookieName|CookieStyle|CookieTracking)\\b' ***REMOVED***,
         ***REMOVED*** token: 'keyword.vhost_alias.apacheconf',
           regex: '\\b(?:VirtualDocumentRoot|VirtualDocumentRootIP|VirtualScriptAlias|VirtualScriptAliasIP)\\b' ***REMOVED***,
         ***REMOVED*** token: 
            [ 'keyword.php.apacheconf',
              'text',
              'entity.property.apacheconf',
              'text',
              'string.value.apacheconf',
              'text' ],
           regex: '\\b(php_value|php_flag)\\b(?:(\\s+)(.+?)(?:(\\s+)(.+?))?)?(\\s)' ***REMOVED***,
         ***REMOVED*** token: 
            [ 'punctuation.variable.apacheconf',
              'variable.env.apacheconf',
              'variable.misc.apacheconf',
              'punctuation.variable.apacheconf' ],
           regex: '(%\\***REMOVED***)(?:(HTTP_USER_AGENT|HTTP_REFERER|HTTP_COOKIE|HTTP_FORWARDED|HTTP_HOST|HTTP_PROXY_CONNECTION|HTTP_ACCEPT|REMOTE_ADDR|REMOTE_HOST|REMOTE_PORT|REMOTE_USER|REMOTE_IDENT|REQUEST_METHOD|SCRIPT_FILENAME|PATH_INFO|QUERY_STRING|AUTH_TYPE|DOCUMENT_ROOT|SERVER_ADMIN|SERVER_NAME|SERVER_ADDR|SERVER_PORT|SERVER_PROTOCOL|SERVER_SOFTWARE|TIME_YEAR|TIME_MON|TIME_DAY|TIME_HOUR|TIME_MIN|TIME_SEC|TIME_WDAY|TIME|API_VERSION|THE_REQUEST|REQUEST_URI|REQUEST_FILENAME|IS_SUBREQ|HTTPS)|(.*?))(\\***REMOVED***)' ***REMOVED***,
         ***REMOVED*** token: [ 'entity.mime-type.apacheconf', 'text' ],
           regex: '\\b((?:text|image|application|video|audio)/.+?)(\\s)' ***REMOVED***,
         ***REMOVED*** token: 'entity.helper.apacheconf',
           regex: '\\b(?:from|unset|set|on|off)\\b',
           caseInsensitive: true ***REMOVED***,
         ***REMOVED*** token: 'constant.integer.apacheconf', regex: '\\b\\d+\\b' ***REMOVED***,
         ***REMOVED*** token: 
            [ 'text',
              'punctuation.definition.flag.apacheconf',
              'string.flag.apacheconf',
              'punctuation.definition.flag.apacheconf',
              'text' ],
           regex: '(\\s)(\\[)(.*?)(\\])(\\s)' ***REMOVED*** ] ***REMOVED***
    
    this.normalizeRules();
***REMOVED***;

ApacheConfHighlightRules.metaData = ***REMOVED*** fileTypes: 
       [ 'conf',
         'CONF',
         'htaccess',
         'HTACCESS',
         'htgroups',
         'HTGROUPS',
         'htpasswd',
         'HTPASSWD',
         '.htaccess',
         '.HTACCESS',
         '.htgroups',
         '.HTGROUPS',
         '.htpasswd',
         '.HTPASSWD' ],
      name: 'Apache Conf',
      scopeName: 'source.apacheconf' ***REMOVED***


oop.inherits(ApacheConfHighlightRules, TextHighlightRules);

exports.ApacheConfHighlightRules = ApacheConfHighlightRules;
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
