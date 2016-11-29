# Style Guide

This section is still work in progress.

For now it should suffice to download our .eslint file and follow the instructions from there on out.

## JS selector names

Selector names in the markup are classes starting with `js-`. These classes are only used for selecting the element in Javascript, for styling there must be another class name given.

**For example:**
```
<button class="button button--primary js-button--search-trigger">
	Click me!
</button>
```
In this example we'll use the classes `button` and `button--primary` to style with, and `js-button--search-trigger` to select the element in Javascript with.
