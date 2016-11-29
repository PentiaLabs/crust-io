# Solution-config.json

## metadata

### name
Full project name #notused
### shortname
short name for project #notused

## configurationTransform

### AlwaysApplyName
This configuration setting is used in the command [apply-xml-transform](/home/solution architecture/gulp tasks#apply-xml-transform)

## msbuild
all configuration are related to usage of the [gulp-msbuild](https://github.com/hoffi/gulp-msbuild) module
Also see the [MSBuild Command-Line Reference](https://msdn.microsoft.com/en-us/library/ms164311.aspx) for further documentation

### showError
This controls the error output for all msbuild builds. default is false.

### showStandardOutput 
This controls the standard output for all msbuild builds. default is false.

### toolsversion 
specifies the version of msbuild that the builder uses. default 14.0

### verbosity
Sets the verbosity of all msbuild builds. default minimal.

## Sitecore

### version 
The sitecore version of the project - used by [unzip-sitecore](/home/solution architecture/gulp tasks#unzip-sitecore)

### cmsOnly 
Specifies if the sitecore instance is only using the cms features - #notused

## packageSource

### name
This is the name of the package feed used to find the sitecore package on, very confusing name. - #notimportant

### location
this is the feed where the tasks [unzip-sitecore](/home/solution architecture/gulp tasks#unzip-sitecore) will look for the sitecore package 

### packageName
this is the name of the package containing the full sitecore package. default Sitecore.Full. used by [unzip-sitecore](/home/solution architecture/gulp tasks#unzip-sitecore)

## frontendBuilder

### location
This is the placement of the frontend builder - #notused #notimportant

## configs
This is a list of all the build configurations used in the solution.
Be aware that the names needs to match the build configurations in the visual studio projects.

### name
The name of the build configuration. note it is case sensitive when using the gulp commands

### rootFolder
The rootFolder of the solution. 

### websiteRoot
The website root of the solution
used by:
* [all package commands](/home/solution architecture/gulp tasks#unzip-sitecore)
* [all publishing commands](/home/solution architecture/gulp tasks#Package Installing)

### hostname
The hostname of the website in the current build configuration - #notused #changessoon
