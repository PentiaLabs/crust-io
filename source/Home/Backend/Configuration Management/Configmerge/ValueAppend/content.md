# ValueAppend

This will append the value in the value attribute to the one pointed at in the xpath

## Example

~~~xml
    <element action="ValueAppend" 
    xpath="/sitecore/settings/setting[@name='IgnoreUrlPrefixes']/@value" 
    value="|/Components/Forum/Project/API/services|/Components/Forum/Project/API/Legacy" 
    seperator="|"/>
~~~