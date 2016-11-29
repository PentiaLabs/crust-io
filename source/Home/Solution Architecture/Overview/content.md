# Overview
Here is a quick overview of where to find more about the Architecture, read about the features, and get an idea about what is comming next.

## Getting the tools
**all tooling is contained in a NPM package called pentia-builder** 

Prerequisites:
* [Node.js](https://nodejs.org/en/)
* [NPM](https://docs.npmjs.com/)
* [gulp](http://gulpjs.com/)
* [MSBuild](https://www.microsoft.com/en-us/download/details.aspx?id=48159)
* [Package management](https://github.com/OneGet/oneget)
* [Powershell](https://github.com/PowerShell/PowerShell)  

Ways to get the build tools:
from a commandline use npm install 

Getting the public version from the global npm repository
~~~powershell
npm install pentia-builder
~~~

Gettings the internal version from Pentias internal repository
~~~powershell
npm install http://tund/npm/PentiaNpm/pentia-builder/-/pentia-builder-0.0.21.tgz
~~~

### Package locations

* https://www.npmjs.com/package/pentia-builder 
* http://tund/npm/PentiaNpm/pentia-builder

## [Architecture](/Home/Backend/Modular%20Architecture)

## Vision
The vision for all the tooling on our solutions is to create as small and speacialized components as possible,
so that each project can install and use only the bits and pieces that they need.
Right now everything is gathered in the package called pentia-builder, which will be split into many smaller packages.

## Features

* Configuration Management (using configuration transforms)
* Publishing files from source to website, using MSBuild Publishing
* Packagement management for Sitecore and other non build related packages.

### Technologies

* MSBuild - config transformation https://msdn.microsoft.com/en-us/library/dd465326(v=vs.110.aspx)
* [Gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md) as task runner
* [Package Manager](https://blogs.technet.microsoft.com/packagemanagement/2015/04/28/introducing-packagemanagement-in-windows-10/)

### Roadmap

* September - splitting out all features of pentia-builder as seperate packages
* October - Documentation and automation framework for future packages and features
* November+ - Issues and features added to the github of [Pentia-builder](https://github.com/PentiaLabs/Pentia.Builder/issues) 

### Github repositories

* https://github.com/PentiaLabs/Pentia.Builder
* https://github.com/PentiaLabs/Pentia.BoilerPlate