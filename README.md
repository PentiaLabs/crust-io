# Crust

***

Static site generator with support for hierarchical page structure.

***

## Static site source

***

### Generator

***

To get started you need to have an app-folder with the page templates and content data. The best way to get a project structure set up, is to use the [Yeoman](http://yeoman.io) generator, which can be found here: [generator-crust](https://www.npmjs.com/package/generator-crust)

Follow the instructions in the readme, and you should be up and running in no time.

***

### General crust file structure

***

Crust basically works by merging content into templates, eventually turning the finished product into static HTML.

The source elements needs to reside inside the app-folder. The default way the folders inside app is structured is as follows:

```
├── app/
│   ├── source
│   ├── templates
│   │   ├── components
│   │   ├── master
│   │   ├── pages
│   ├── styles
│   ├── graphics
│   ├── images
```

**Remember** you can get this generated for you by using the [Yeoman](http://yeoman.io) generator, described above this section.

| Folder           | Description   |
| ---------------- | ------------- |
| source     | This folder is the place for the hierarchical content files, being the markdown files for the content data as well as an associated config file written in [yaml](http://yaml.org/). The config file describes what kind of pagetype content will be rendered into. In the following illustration I'll elaborate a bit on this particular folder and how it could look. |
| templates   | Folder for templates in which the content will be rendered into. In here we have folders for master-files, component-files and pages which inherits from master. |
| styles   | The styling - using [Sass](http://sass-lang.com) |
| graphics   | Graphics that's supposed to be used to present the overall aesthetics of the site - this being icons in bitmap and vector files etc. |
| images   | Images used in content. |

***

### Source folder file structure

***

I think this is best described using an example of a source-folder and a representation of what that source looks like in the final generated product.

***

#### Source

***

So if we have a source looking like this:

```
├── source/
│   ├── Frontpage
│   │   ├── Subpage to frontpage
│   │   │   ├── content.md
│   │   │   ├── config.yaml
│   ├── Some other page
│   │   ├── content.md
│   │   ├── config.yaml
│   ├── A third page
│   │   ├── content.md
│   │   ├── config.yaml
│   ├── content.md
│   ├── config.yaml
```ß

| Filename         | Description   |
| ---------------- | ------------- |
| content.md     | Contains content for a page, written in markdown. |
| config.yaml   | Contains configuration for how to merge the content of content.md into templates. Look below for a sample |


An example of a ```config.yaml```:
```yaml
---
template: toplevel

```

This tells crust to put the generated content of the ```content.md```, lying on the same level as the ```config.yaml```-file, inside a template stored inside the ```app/templates/pages```-folder with the name ```toplevel```.


If we generate the source-structure from before using crust, it will produce an output like this:

```
├── dist/
│   ├── Frontpage
│   │   ├── Subpage to frontpage
│   │   │   ├── index.html
│   ├── Some other page
│   │   ├── index.html
│   ├── A third page
│   │   ├── index.html
│   ├── index.html
```

The content of the ```dist```-folder should be ready to ship to any web hosting provider possible and is now considered to be unattached to the crust framework. If you need to do changes, you should do them inside the ```source```-folder, run it through crust again and re-upload the content of the ```dist```-folder.

***

## How to use crust

***

### Options

***

| Name             | Type          | Default | Description   |
| ---------------- | ------------- | ------------- |------------- |
| sourceFolder     | `string`      | | Path to source folder that holds hierarchical page structure |
| templateFolder   | `string`      | | Path to where the page type template files are located |

***

### Basic usage:

***

```js
var crust = require('crust-io');

crust.compile(dir, { 
    sourceFolder : 'app/source',
    templateFolder : 'app/templates/pages'
});
```
***

### Use with gulp

***

```js
var crust = require('crust-io');

gulp.task('crust', function () {
	var sourceFolder = 'app/source';

	// the dir from which we should read the hierarchical page structure
 	var dir = path.join(__dirname, sourceFolder);

	return crust.compile(dir, { 
		sourceFolder : sourceFolder,
		templateFolder : '/app/templates/pages/'
	});
});
```

---
❤♥ Pentia ♥❤