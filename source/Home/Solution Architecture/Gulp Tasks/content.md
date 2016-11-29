# Gulp tasks 

## Visual studio command runner
If you have not already installed the command runner for visual studio, you can find it here:
https://blogs.msdn.microsoft.com/webdev/2016/01/06/task-runners-in-visual-studio-2015/ 
This helps exploring and running the command directly from within Visual Studio.

## Publishing
All publishing is done using standard MSBuild publishing to the local site, this ensures standard documented
functionality. The Publishing being done is the same as right clicking the project within VS and clicking publish.

### publish-all-layers
This will run publish-context-layer, publish-feature-layer, publish-foundation-layer and delete-config-transforms. In that order.

### publish-feature-layer
This command will run through all folders in the feature folder, and publish all projects found. 

### publish-context-layer
This command will run through all folders in the context folder, and publish all projects found. 

### publish-foundation-layer
This command will run through all folders in the foundation folder, and publish all projects found. 

## Configuration Transformation

### apply-xml-tranform
This command will look through all configuration transform files and apply them to the ones it can find in the local website root.
This means that if you place a web.debug.config in the root of your project, it will try to look for a file called web.config in the root of the website.
So by recreating the folder structure in your project to match the one in the website, you can target specific files.

The convention is that the files are being named to match the build configuration that they belong to.
fx. connectionstring.prod.config will only be applied when running the prod build configuration. 

To avoid alot of duplication configuration it is possible to specify a name that tells the command to always apply files named with that name.
By defualt it is 'always' as specified in the solution-config.json file, under configurationtransform -> AlwaysApplyName.
So this means that file named with 'always', always get applied first. so web.always.config will be run even if you are building the debug configuration.

Right now, the command needs to be run seperately, it is not hooked into the build pipeline of VS. 

## Package Installing
In order to get sitecore and install it to your local website, you need to run the command called setup.

### setup
This command will first clean the root directory of your local website specified in solution-config.json
Then it will call unzip-sitecore to get the sitecore installed into the folder.

### clean-rootfolder
This command deletes everything in the path specifed in solution-config.json -> configs -> debug -> rootFolder

### unzip-sitecore
This command calls a powershell script that looks for a package called 

Name = solution-config.json -> packagesource -> packageName
Version = solution-config.json -> Sitecore -> version

If the package is installed locally, it unzips and copies it to the website root.
If it cant find the package locally it will go to the feed specified in solution-config.json -> packagesource -> location

## Utility tasks

### set-temp-output-folder
This task will set the output folder which is normally set from soltuion-config.json -> configs -> debug -> rootFolder. To ./tmp
this is used for generating deployment packages.

### delete-config-transforms
This tasks delete all config transform files in the rootFolder of the website,
this is to ensure that sitecore does not use them when they are placed in the include folder.