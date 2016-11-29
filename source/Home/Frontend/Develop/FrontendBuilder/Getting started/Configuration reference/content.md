# Configuration reference

The FrontendBuilder is all about processing your assets. In order to be able to do so, it needs to know where to find them, and in some cases: how your want your files processed. This is where the configuration file ```project-context.json``` comes into play.

When running the FrontendBuilder inside a project folder for the first time, the FrontendBuilder will generate a sample project-context.json file, with a default structure and data that you can adjust to fit your project composition.

```project-context.json``` has the following options. Also see the file enclosed in the repo: project-context.json.sample

## metadata (object)

This object holds a bit of meta data about the project in which the frontend-builder is installed.

The available keys inside this object are:

### name (string)
This should be the name of the project.

### shortName (string)
This should be the project name abbrevation. This should not contain spaces or special characters.

## baseDirs (object)
This object holds some info about the directories contained in the project.

### dev (string)

This should contain the base path of the source files location in the solution. Relatively to the webroot provided path.

### dist (string)

This should contain the desired base path of the output files. Relatively to the webroot provided path.

## options (object)

This holds the configuration options for various areas and tasks.

### webroot (string)

Sometimes the actual web root folder of the hosted website lies somewhere lower in the hierarchy than the project-context.json it self, so this should be a pointer to the starting point of the web root in relation to the position of the project-context.json - this is so the builder is able to find the correct files to process in the project, but also to build browser friendly references to them in the output files it creates.

### generateStaticPrototype (boolean)

The build comes with an entire framework for developing a static prototype of a web application. Set this to true to be able to do so.

### prototypePort (number)

The port of which the prototype will be hosted on. Only relevant if ```generateStaticPrototype``` has been set to true.

### designResourcePrefix (string)

It's adviced against changing this unless you know what you're doing and have a good reason in doing so.
(TODO: elaborate and explain)

### enableBless (boolean)

Set this to true if you have stylesheets with a high amount of css selectors and need to support IE 10 and lower. The Bless CSS post-processor will split CSS files suitably for Internet Explorer < 10 to handle the IE 6-9 bug with a maximum of 4095-selectors per stylesheet bug (http://blogs.msdn.com/b/ieinternals/archive/2011/05/14/10164546.aspx) we need to split our stylesheets into bundles that will respect this limitation.

### autoprefixer (object)

If this is set, css will be post processed polyfilled for the configuration enclosed. It uses [browserlist](https://github.com/postcss/autoprefixer#browsers) configuration objects.

## paths (object)

### requirejs (array)

This array holds object with an oppinionated structure of Pentias requirejs setup. This section should be elaborated further in the future, but for now have a look at the project-context.json.sample file enclosed in this project, and consult the [PT-requirejs-mediator-pattern-demo](https://github.com/PentiaLabs/PT-requirejs-mediator-pattern-demo) repository for further instructions about the facade/mediator pattern we're using.

For now just leave this be if you're not entirely sure of what you're doing and haven't got a very good reason in doing so.

### lint (array)

Paths for files that should be linted with ESLint. Linting configurations must be set in `.eslintrc`, if this files doesn't exist it's created when you define paths.
If there are no lint paths, it will skip linting.

### less (array)
Each entry in this array should define a style bundle.

Example:

```json
{
  "name": "style",
  "src": "Components/Project/Design/Dev/Global/styles/style.less",
  "dest": "Components/Project/Design/Dist/Global/styles/",
  "watch": [
    "Components/Project/Design/Dev/Global/styles/**/*.less"
  ]
}
```

The name will also be the name of the html file that's generated that holds the reference to the produced stylesheet. The ```src``` should contain the path to the main less file for the bundle, and from thereon out less imports takes care of the rest of the chaining. The ```dest``` should contain the path to where the generated css file should be placed, and the ```watch``` array should contain patterns to files that should be watched for changes to be able to trigger browser reloads.

### svgsprite (array)

The FrontendBuilder can take a lot of individual svg-files, crunch them, combine them and provide css classes for each which makes is easy to work with and maintain vector graphics on the website.

Example:

```json
{
  "name": "basic",
  "src": "Components/Project/Design/Dev/Global/Icons/*.svg",
  "dest": "Components/Project/Design/Dist/Global/icons"
}
```

The name will also be the name of the produced combination of svg files, so in this case the product would be called ```basic.svg```. The ```src``` points to where to find the individual svg files that are to be combined, and the ```dest``` tells us where to store the output.

To get an idea of how to use the generated spritesheet in the solution please consult the [SVG SOP](/Home/Frontend/Design/Media/SVG/) for an in-dept instruction.

### copy (array)

Sometimes we just want to copy files from a source folder to a destination folder.

Example:

```json
{
  "src": "Components/Project/Design/Dev/Global/fonts/**/*.*",
  "dest": "Components/Project/Design/Dist/Global/fonts"
}
```

The name will also be the name of the produced combination of svg files, so in this case the product would be called ```basic.svg```. The ```src``` points to where to find the individual svg files that are to be combined, and the ```dest``` tells us where to store the output.

### htmlprototype (object)

The FrontendBuilder provides us with a framework to do a static html prototype - we've chosen a dynamic template langauge for this called [Nunjucks](https://mozilla.github.io/nunjucks/) which provides us with a lot of power to do block inheritance, macros, data injection etc. - and really just makes it possible for us to do [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) prototyping

Example:

```json
{
  "src": "Components/Project/Design/Prototype/src",
  "dist": "Components/Project/Design/Prototype/dist",
  "searchPaths": [
    "Components/Project/Design/Prototype/src/pagetypes",
    "Components/Project/Design/Prototype/src/templates"
  ]
}
```

```src``` should point to the root of where our nunjucks files live, and ```dist``` should be where we want the output generated html files to be distributed to. ```searchPaths``` should be an array of paths for where nunjucks should look for templates. If a template that is not in this array is referenced by a nunjucks file, it will throw an error.

## On-demand tasks

On demand tasks are tasks that manipulate files that are under version control, and therefore should be executed on demand, when things regarding the task artefacts changes.

### svginject (object)

The FrontendBuilder can automatically inject a generated spritesheet into the solution. The svginject task isn't a part of the normal build process, but is rather a task you can run on demand. It wont produce any build artifacts as the other tasks does. The svginject task will manipulate the ```targetFile``` (which is under normal version control) by injecting inline svg. When the task has finished you will need to check in the changes made and be done with it.

To be able to inject svg into your projects master page, you'll need to decorate it with the following comment block:

```html
<!-- inject:icons:svg -->
```

By doing so you will instruct the task in where to place the svg spritesheet.

To run the svginject task you need to run the following command manually on the command line inside the root folder of the project:

```powershell
npm run frontend --task=svginject
```

Configuration example:

```json
"svginject": {
  "targetFile": "www/Components/Project/PageTypes/Presentation/StandardPage.cshtml",
  "targetFolder": "www/Components/Project/PageTypes/Presentation",
  "source": "www/Components/Project/Design/Dist/Global/icons/generated-spritesheet.svg"
}
```

### modernizr (object)

The FrontendBuilder can automatically create a generated modernizr file into the solution. The modernizr task isn't a part of the normal build process, but is rather a task you can run on demand. It will produce an output artifact that should be placed under version control.

To run the modernizr task you need to run the following command manually on the command line inside the root folder of the project:

```powershell
npm run frontend --task=modernizr-build
```

Configuration example:

```json
"modernizr": {
  "config": {},
  "outputName": "modernizr-build.js",
  "dest": "Components/Project/Design/Dev/Global/Scripts/vendor/modernizr"
}
```

The config object being a modernizr config parameter. The available options can be viewed here: https://modernizr.com/docs#configuration-options 
