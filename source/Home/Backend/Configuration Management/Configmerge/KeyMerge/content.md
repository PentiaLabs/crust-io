# KeyMerge

This will overwrite a specific value from the xml.

## Example 

~~~xml
    <element action="KeyMerge" 
        xpath="/configuration/sitecore/settings" 
        keyAttribute="name">
        <setting name="WFM.MasterDatabase" value="web"/>
    </element>
~~~