# Documentation Tools

Here you can find the tools we use for generating documentation for our projects.
Most of our tools are powershell modules that are being distributed from our central feed, on the server Tund. 
Below is the basic setup for adding that feed as a package source so you can install and use the different modules.

## General setup for powershell modules

First you need to have WMF 5.0 - this is already installed on all Windows 10 devices.

If you are on windows 7, 8, 8.1 or Server 2012 then you need to install it from here: 
https://www.microsoft.com/en-us/download/details.aspx?id=50395

When thats done, check that your package sources.
Open a powershell commandline, running as admin.

~~~powershell
Get-PackageSource -Location http://tund/nuget/powershell
~~~

this will return the package source if one exists, if you get something back, then you are all set.
else you need to register a new packagesource 

~~~powershell
Register-PackageSource -Name Pentia -Location http://tund/nuget/powershell -Trusted -ProviderName PowerShellGet
~~~

then you need to install a package provider for nuget, so that your machine nows how to handle nuget packages.

~~~powershell
Install-PackageProvider -Name NuGet 
~~~

To check that you can find packages from the feed run the following command.

~~~powershell
Find-Module -Repository Pentia
~~~

This should return two packages; readme-generator and sitecore-config

In the future this is where all internal Pentia Powershell modules will be distrubuted from.