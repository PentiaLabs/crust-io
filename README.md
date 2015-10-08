# Crust

Static site generator with support for hierarchical page structure.

## Static site source

### Generator

To get started you need to have an app-folder with the page templates and content data. The best way to get a project structure set up, is to use the [Yeoman](http://yeoman.io) generator, which can be found here: [generator-crust](https://www.npmjs.com/package/generator-crust)

Follow the instructions in the readme, and you should be up and running in no time.

### Custom setup

If you're not into getting things done for you, you can choose the custom way of setting the sourcecode up.

(TODO: Elaborate on how to do that...)

## How to use crust

### Options

| Name             | Type          | Default | Description   |
| ---------------- | ------------- | ------------- |------------- |
| sourceFolder     | `string`      | | Path to source folder that holds hierarchical page structure |
| templateFolder   | `string`      | | Path to where the page type template files are located |

### Basic usage:

```js
var crust = require('crust-io');

crust.compile(dir, { 
    sourceFolder : 'app/source',
    templateFolder : 'app/templates/pages'
});
```

### Use with gulp

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