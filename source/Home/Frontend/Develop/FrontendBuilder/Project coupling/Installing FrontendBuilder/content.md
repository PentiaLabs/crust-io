# Installing FrontendBuilder

This section describes the scenario where a new project is about to start, and the FrontendBuilder needs to be setup for the very first time. In other words a one-time installation inside a project that hasn't previously used the FrontendBuilder.

## Prerequisites

Make sure you've already gone through the steps described in the "[Getting started](/Home/Frontend/Develop/FrontendBuilder/Getting%20started/)" section of these pages. They will also contain instructions on how to get a new developer up and running on a project that already has a running FrontendBuilder.

## Setup instructions

 1. Create a package.json file in the root of the project folder. Please use the following sample:

	```json
	{
	  "name": "Project Name",
	  "version": "1.0.0",
	  "scripts": {
	    "frontend": "frontend-builder"
	  }
	}
	```

 2. Install the frontend-builder with the following command in a command line with administrator privileges:

	```powershell
	npm install frontend-builder --save --no-optional
	```
	
	this will save it as a dependency, for this project.

 3. Run the builder (see section "[Running the builder](/Home/Frontend/Develop/FrontendBuilder/Getting%20started/Running%20the%20builder/)") - the first run will create a ```project-context.json``` file wherein the project file paths should be provided.
 
 4. Adjust the paths in the `project-context.json` to the paths for the assets in your solution. See "[Configuration reference](/Home/Frontend/Develop/FrontendBuilder/Getting%20started/Configuration%20reference/)" for further instructions.

## Setting up the Design project

 So we're working with source frontend assets in our projects that needs to be processed according to the rules set fitting the current environment. This means that the contents of the distribution folder will vary from development to production, which again means that the distribution folder can't be a part of the solution source control. The frontend assets needs to be processed when the solution is being build.

The build of the solution can happen in various places: On a developers local machine, in continuous integration setups or in automatic deployment scenarios etc. Because of this nature we need to instruct the solution on how to handle our frontend assets.

The source assets lives inside the Design project in Pentia solutions, so we'll set some Before- and AfterBuild commands to be executed inside the Design.csproj.

The commands should read as follows:

```html
<Target Name="BeforeBuild">
	<Exec Command="npm install --no-optional" CustomErrorRegularExpression="^npm ERR!" CustomWarningRegularExpression="^npm WARN" />
</Target>

<Target Name="AfterBuild">
    <Exec WorkingDirectory="$(SolutionDir)" Command="npm frontend --task=build --env=$(Configuration)" />
</Target>
```

<br>
**BeforeBuild**

The BeforeBuild instructs the build agent to make sure that the node package management dependencies are always up to date according to what we have listed inside the package.json file. If they're already up to date the install will skip onto the next task. If there's something new in the manifests the command will fetch the new modules.

**AfterBuild**

The AfterBuild instructs the build agent to execute the build task that corresponds to the currently chosen configuration. For example: 

```powershell
npm frontend --task=build --env=Production
```