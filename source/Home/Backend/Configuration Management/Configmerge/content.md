# Config Merge

These are all the functions possible in the ConfigMerge builder. 

When creating a new file you need to speciy the these elements

## Example
~~~xml
<?xml version="1.0" encoding="utf-8"?>
<project name="configmerge.build" xmlns="http://nant.sf.net/release/0.85/nant.xsd">
    <configmerge configfile="${project.web.config}" configurations="debug">
        <element action="InsertAfter" xpath="/configuration/system.webServer/handlers/add[last()]">
            <add verb="*" path="Components/Forum/Project/API/Legacy/PublicationDetails.ashx" type="PT.Forum.Project.API.Legacy.PublicationDetails, PT.Forum.Project.API" 
                 name="PublicationDetails" />
        </element>
    </configmerge>
</project>
~~~

TODO: 

Write specification for all attibutes on the configmerge element.

1. configfile, the file you are applying the transformation to
2. configurations, the build configurations this will be applied to
3. outputfile, the file we are writing to, this i by default the same as the configfile