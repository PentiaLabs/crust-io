# What do we do if we need to modify to Sitecore files

This is normally due to a bug in Sitecore and support have provided a fix that modifies one or more Sitecore files. 
> Create a Sitecore Patch/Fix module for the build library and reference the patch from the project.build

With this approach if the bug is fix in a later version is it easy to remove the modification and 
it documents what changes have been made and why.


In addition the patch/fix is aivaible for all other projects to use
