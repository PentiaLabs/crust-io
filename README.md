# Crust

Static site generator with support for hierarchical page structure.

## Static site source

### Generator

To get started you need to have an app-folder with the page templates and content data. The best way to get this going, is to use the [Yeoman](http://yeoman.io) generator, which can be found here (TODO: insert link when generator is ready)

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