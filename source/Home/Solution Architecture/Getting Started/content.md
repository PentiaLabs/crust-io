# Getting Started

## Installing the tools
Check the prerequsites from the [overview](/home/solution architecture/overview)

### Install 
Install the pentia-builder into your solution by writing 

~~~powershell
npm install pentia-builder
~~~

### Check config file
Next setup the solution-config.json file
Take the one from our [boilerplate](https://github.com/PentiaLabs/Pentia.BoilerPlate/blob/master/solution-config.json)

check the settings such as name and sitecore version.
You can read the documentation for the settings here: [solution-config.json](/home/solution architecture/configuration settings) 

### setup website
First run

~~~powershell
gulp setup
~~~

This will get sitecore and unzip it to your website root.
Next create a IIS site to point to the website root.
Setup your hostfile to point the hostname to 127.0.0.1.

Publish all your code to the new site by running 

~~~powershell 
gulp publish-all-layers
~~~

Make sure all your configuration has been applied to the local website by running 

~~~powershell
gulp apply-xml-transform
~~~

## Developing
When developing a feature use the publish button in visual studio to publish just the one project.
As of right now there is no gulp task to publish a single project.

Remember that if you make configuration changes you need to run **gulp apply-xml-transform** again.
