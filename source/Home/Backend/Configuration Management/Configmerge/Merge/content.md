# Merge

This will merge all xml inside the element

## Example

~~~xml
    <element action="Merge" 
        xpath="/configuration/sitecore/geoIpManager/providers/add[@name='default']" 
        configurations="releasecd" overwrite="true">
            <add name="default" salt="X66f6tBLnFPxf8" />
    </element>
~~~