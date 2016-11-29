# Referencing assets

Everything in the FrontendBuilder is about file processing, so it needs to know where the project files live to be able to process them. These references are handled inside the ```project-context.json``` file. More on that in the section [Configuration reference](/Home/Frontend/Develop/FrontendBuilder/Getting%20started/Configuration%20reference).

## Less file references

When you instruct the FrontendBuilder to process LESS-files, you're basically telling it, depending on the current configuration environment, to:

|Development|Production|
|-----------|----------|
|Continously watch a list of files for changes, process them into CSS when they change and live-reload them for ease of day-to-day development tasks|Process files and minify them without comments|

In both cases you're working towards different goals but on the same files regardless of the current environment. Therefore we need to be able to define which files that needs to be a part of the bundles that lives inside our projects.

In most cases a single less-bundle will be sufficient.

### Example setup:

A project has a set of less files which are imported into a `style.less` file. This will serve as the bundle inside this project, and will be defined in the project-context.json as follows:

```json
"paths": {

    [...]

    "paths": {
        "less": [
            {
                "name": "style",
                "src": "www/Components/Project/Design/Dev/styles/style.less",
                "dest": "www/Components/Project/Design/Dist/styles/",
                "watch": [
                    "www/Components/Project/Design/Dev/styles/*.less"
                ]
            }
        ],

    [...]
}
```

The FrontendBuilder will use this information to generate a HTML-file for the bundle only containing references to the product of the bundle processing. In this case the product will be the file style.css, which means that the generated file will have the following contents:

#### In development

**_www/Components/Project/Design/Dist/styles/style.html:_**

```html
<link rel="stylesheet" href="/Components/Project/Design/Dist/styles/style.css"/>
```

#### In production

**_www/Components/Project/Design/Dist/styles/style.html:_**

```html
<link rel="stylesheet" href="/Components/Project/Design/Dist/styles/style---756fjj3873.css"/>
```

Notice the postfixed hash in the production generated file references. This is a hash of the file which serves as a way to help with cache busting.

So the exact same file is generated, but the css is processed according to the build environment. In production we'll strip all comments and minify the entire stylesheet, whereas in development we'll keep all the information for debug purposes.

Now that the bundle is in place, we can easily include it into our master page in the appropriate place.

We'll make use of the module DesignResources to reference our bundles. If you haven't setup the DesignResources-module in the project, please consult the "Project Setup"-section.

```html
[...]

<%@ Register TagPrefix="PT" Namespace="PT.Framework.DesignResources.Presentation" Assembly="PT.Framework.DesignResources" %>

[...]

<!DOCTYPE html>
<html>
    <head>
        [...]

        <PT:DesignResourceBundle runat="server" Bundle="styles/style" Cacheable="true" VaryByDevice="true" />
    </head>
    <body>

        [...]

    </body>
</html>
```

## JavaScript references

When you instruct the FrontendBuilder to process JavaScript, you're basically telling it, depending on the current configuration environment, to:

|Development|Production|
|-----------|----------|
|Continously watch a list of files for changes, process them when they change and live-reload them for ease of day-to-day development tasks|Optimize a dependency chain of AMD modules with r.js into one uglified product that can be easily referenced and served in a specific place in the code|

In both cases you're working towards different goals but on the same files regardless of the current environment. Therefore we need to be able to define which files that needs to be a part of the bundles that lives inside our projects.

We use the `requirejs`-object in the project-context.json `paths`-object to instruct the FrontendBuilder where to find central files for processing. The requirejs configuration inside project-context.json file is per our convention. Only change values inside it if you know what you're doing. Otherwise it should work out of the box.

All relations and dependencies are handled within the AMD pattern.

The FrontendBuilder will upon execution of the requirejs-task (which will automatically be executed on project build), generate a file containing the reference according to the environment we're in.

The contents of the file would be:

**In development**

**_www/Components/Project/Design/Dist/scripts/require.html:_**

```html
<script data-main="Components/Project/Design/Dist/scripts/config.js" src="Components/Project/Design/Dist/scripts/require.js" ></script>
```

**In production**

**_www/Components/Project/Design/Dist/scripts/require.html:_**

```html
<script src="Components/Project/Design/Dist/scripts/app---756fjj3873.js"></script>
```

Notice the postfixed hash in the production generated file reference. This is a hash of the file which serves as a way to help with cache busting.

Now that the script bundle is in place, we can easily include it into our master page in the appropriate place - being in the bottom of the page.

We'll make use of the module DesignResources to reference our bundles. If you haven't setup the DesignResources-module in the project, please consult the "[Installing DesignResources](/Home/Frontend/Develop/FrontendBuilder/Project%20coupling/Installing%20DesignResources)" page.

```html
[...]

<%@ Register TagPrefix="PT" Namespace="PT.Framework.DesignResources.Presentation" Assembly="PT.Framework.DesignResources" %>

[...]

<!DOCTYPE html>
<html>
        [...]
    <body>

        [...]

        <PT:DesignResourceBundle runat="server" Bundle="scripts/require" Cacheable="true" VaryByDevice="true" />
    </body>
</html>
```

***