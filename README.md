# Crust

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

The source elements needs to reside inside the app-folder. The default way the folders inside app are structured is as follows:

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
│   ├── About us
│   │   ├── Subpage about us
│   │   │   ├── content.md
│   │   │   ├── config.yaml
│   │   ├── leftside.md
│   │   ├── rightside.html
│   │   ├── config.yaml
│   ├── Contact
│   │   ├── content.md
│   │   ├── config.yaml
│   ├── content.md
│   ├── config.yaml
```

| Filename         | Description   |
| ---------------- | ------------- |
| placeholder_name.md     | Contains content for a placeholder, written in markdown. The filename must match a placeholder name inside crust. In this particular case ```{{ crust_placeholder_name }}``` |
| placeholder_name.html     | Contains content for a placeholder, written in html. This is for when you want to inject certain HTML controls inside your templates. The filename must match a placeholder name inside crust. In this particular case ```{{ crust_placeholder_name }}``` |
| config.yaml   | Contains configuration for how to merge the content of content.md into templates. Look below for a sample |

Let's look at the ```About us``` from the source example above as an example:

It has the following files associated:

```
├── leftside.md
├── rightside.html
├── config.yaml
```

This means that the template for this particular page should have the following placeholders:
```{{ crust_leftside }}``` and ```{{ crust_rightside }}```

The content of ```config.yaml``` contains the following configuration:
```yaml
---
template: page-about

```

And our templates should therefore have the following template-file inside it:

```
├── app/
│   ├── source
│   ├── templates
│   │   ├── ...
│   │   ├── pages
│   │   │   ├── about.html
```

Which contains the following markup:

```html
{% extends '../master/layout.html' %}

<div class="row">
  <div class="col-lg-6">
    {{ crust_leftside }}
  </div>
  <div class="col-lg-6">
    {{ crust_rightside }}
 </div>
</div>
```

Now when we run it through the crust compiler we should end up with a product that merges our template above with the markdown transformed content from ```leftside.md``` and the raw html from ```rightside.html``` replacing ```{{ crust_leftside }}``` and ```{{ crust_rightside }}``` respectively.

If we generate the source-structure from before using crust, it will produce an output like this:

```
├── dist/
│   ├── About us
│   │   ├── Subpage to about us
│   │   │   ├── index.html
│   ├── Contacte
│   │   ├── index.html
├── index.html
```

The content of the ```dist```-folder should be ready to ship to any web hosting provider possible and is now considered to be unattached to the crust framework. If you need to do changes, you should do them inside the ```source```-folder, run it through crust again and re-upload the content of the ```dist```-folder.

Please note that the ```source```-folder itself has both content and config files associated to itself and will upon render be turned into the front page.

***

### Custom variables

***

Sometimes you'd want to pass in custom variables for pages to be able to act on for presentational purposes. There's a special namespace reserve for this type of behaviour inside the ```config.yaml``` file for pages.

Let's say you have some sort of additional meta data for an article. This could be the name of the author, that you'd like to pass into the rendering. You could add this piece of information in the ```config.yaml``` file like this:

```yaml
---
template: some-template
crustVars:
  author:
    name: John Doe
    twitter: http://twitter.com/JohnDoe
    
```

The ```crustVars``` object will be exposed upon generation of the HTML, so in your template you'd be able to react upon these information by doing something like the following:

```html

<a href="{{crustVars.author.twitter}}">{{crustVars.author.name}}</a>
```

If the crustVars object is absent it will simply be ignored by the compiler.

***

### Dynamic linking

***

Sometimes you would want to be able to link to a certain page from other templates.

In Crust you can do this by defining a ```permalink``` token inside the ```config.yaml``` for the page you want to link to, thereby making it possible to identify it from within templates.

```config.yaml``` :

```yaml
---
template: toplevel
permalink: my_link_token_for_this_page

```

To digest the link for this page, all you would need to do inside your templates would be:

```some-template.html``` :

```html
<a href="{{ crust__link_my_link_token_for_this_page }}">A link label</a>
```

And upon build, Crust will automatically put in the correct path for the page, making it completely unaffected by changes in folder renames and such.

***

### Sorting children

***

Crust works with the file structure, so the default sorting of pages in the structure that's sent up to the templates for presentational interpolation will be the alphabetical order of the folders. You're able to override this default with an ordered array of all or some of the child node names in the ```config.yaml``` file.

So if you have a source structure that reads as follows:

```
├── source/
│   ├── Frontpage
│   │   ├── Subpage A
│   │   │   ├── content.md
│   │   │   ├── config.yaml
│   │   ├── Subpage B
│   │   │   ├── content.md
│   │   │   ├── config.yaml
│   │   ├── Subpage C
│   │   │   ├── content.md
│   │   │   ├── config.yaml
```

And you for some reason want to have an order that reads: Subpage B, Subpage A, Subpage C, you can add the ```childSort``` array in the Frontpage ```config.yaml``` file as follows:

```config.yaml``` :

```yaml
---
template: some-template
childSort:
  - Subpage B
  - Subpage A
  - Subpage C
```

If you just want the Subpage C first and don't really care about the order of the rest of the pages you could make do with the following configuration:

```config.yaml``` :

```yaml
---
template: some-template
childSort:
  - Subpage C
```

This will result in Subpage C being first in the order and the rest in their default order.

***

## API

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