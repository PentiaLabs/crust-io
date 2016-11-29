# Sitecore-Config

This module contains functions for getting data from the *.build files in a project.

## Installation instructions.

~~~powershell
Install-Module -Name Sitecore-config
~~~

### Usage

~~~powershell
Import-module sitecore-config
cd "path to project root"
get-sitecoreversion
~~~

To get a list of commands write:

~~~powershell
get-command -module sitecore-config
~~~

To get help and info about a command write:
~~~powershell
get-help command-here 
~~~

fx. 

~~~powershell
get-help get-sitecoreverion
~~~