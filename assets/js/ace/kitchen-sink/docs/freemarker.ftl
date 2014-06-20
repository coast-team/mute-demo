<#ftl encoding="utf-8" />
<#setting locale="en_US" />
<#import "library" as lib />
<#--
    FreeMarker comment
    $***REMOVED***abc***REMOVED*** <#assign a=12 />
-->

<!DOCTYPE html>
<html lang="en-us">
    <head>
        <meta charset="utf-8" />
        
        <title>$***REMOVED***title!"FreeMarker"***REMOVED***<title>
    </head>
    
    <body>
    
        <h1>Hello $***REMOVED***name!""***REMOVED***</h1>
        
        <p>Today is: $***REMOVED***.now?date***REMOVED***</p>
        
        <#assign x = 13>
        <#if x &gt; 12 && x lt 14>x equals 13: $***REMOVED***x***REMOVED***</#if>
        
        <ul>
            <#list items as item>
                <li>$***REMOVED***item_index***REMOVED***: $***REMOVED***item.name!?split("\n")[0]***REMOVED***</li>
            </#list>
        </ul>
        
        User directive: <@lib.function attr1=true attr2='value' attr3=-42.12>Test</@lib.function>
        <@anotherOne />
        
        <#if variable?exists>
            Deprecated
        <#elseif variable??>
            Better
        <#else>
            Default
        </#if>
        
        <img src="images/$***REMOVED***user.id***REMOVED***.png" />
        
    </body>
</html>
