# Basic principles

So, these are the ideal principles. But as always, you should strive to maintain HTML standards and semantics, but not at the expense of practicality. Use the least amount of markup with the fewest intricacies whenever possible.

## HTML5 doctype

Always use HTML5 doctype. It will enforce standards mode and more consistent rendering in every browser possible with this simple doctype at the beginning of every HTML page.

```html
<!DOCTYPE html>
<html>
  <head>
  </head>
</html>
```

## Language attribute

From the HTML5 spec:

> Authors are encouraged to specify a lang attribute on the root html element, giving the document's language. This aids speech synthesis tools to determine what pronunciations to use, translation tools to determine what rules to use, and so forth.

```html
<html lang="da-DK">
  <!-- ... -->
</html>
```

### References

 * Read more about the lang attribute in [the spec](http://www.w3.org/html/wg/drafts/html/master/semantics.html#the-html-element).
 * W3Schools has a [list of language codes](http://www.w3schools.com/tags/ref_language_codes.asp) and a [list of country codes](http://www.w3schools.com/tags/ref_country_codes.asp).

## IE compatibility mode

Internet Explorer supports the use of a document compatibility ```<meta>`` tag to specify what version of IE the page should be rendered as. Unless circumstances require otherwise, it's most useful to instruct IE to use the latest supported mode with edge mode.

For more information, [read this awesome Stack Overflow article](http://stackoverflow.com/questions/6771258/whats-the-difference-if-meta-http-equiv-x-ua-compatible-content-ie-edge-e).

```html
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
```

## IE conditional comments

```html
<!--[if lt IE 7 ]> <html class="ie6" lang="da-DK"> <![endif]-->
<!--[if IE 7 ]>    <html class="ie7" lang="da-DK"> <![endif]-->
<!--[if IE 8 ]>    <html class="ie8" lang="da-DK"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--> <html lang="da-DK"> <!--<![endif]-->
```

If we replace our html tag with the above we can use classes to deliver styles to specific versions.
e.g. "float to fix" a bug with #myElement in ie6

```css
.ie6 #myElement { float: left; width: 100% }
```

## Character encoding

Quickly and easily ensure proper rendering of your content by declaring an explicit character encoding. When doing so, you may avoid using character entities in your HTML, provided their encoding matches that of the document (generally UTF-8).

```html
<head>
  <meta charset="UTF-8">
</head>
```

## CSS and JavaScript includes

Per HTML5 spec, typically there is no need to specify a type when including CSS and JavaScript files as text/css and text/javascript are their respective defaults.

```html
<!-- External CSS -->
<link rel="stylesheet" href="code-guide.css">

<!-- In-document CSS -->
<style>
  /* ... */
</style>

<!-- JavaScript -->
<script src="code-guide.js"></script>
```

HTML5 spec links
 * [Using link](http://www.w3.org/TR/2011/WD-html5-20110525/semantics.html#the-link-element)
 * [Using style](http://www.w3.org/TR/2011/WD-html5-20110525/semantics.html#the-style-element)
 * [Using script](http://www.w3.org/TR/2011/WD-html5-20110525/scripting-1.html#the-script-element)

## JavaScript generated markup

Writing markup in a JavaScript file makes the content harder to find, harder to edit, and less performant. Avoid it whenever possible.