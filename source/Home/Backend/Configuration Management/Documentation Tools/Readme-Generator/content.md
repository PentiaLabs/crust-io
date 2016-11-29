# Readme-Generator

This module is used for automatically generating a readme file in markdown format.
All information is being extracted from all the *.build files in project, this means it only works on old projects. 

## Installation instructions.

~~~powershell
Install-Module -Name Readme-generator
~~~

### Usage

~~~powershell
Import-module readme-generator 
cd "path to project root"
New-Readme
~~~

To get help write:
~~~powershell
get-help new-readme
~~~