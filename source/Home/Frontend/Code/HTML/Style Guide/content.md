# Style Guide

## Formatting and whitespace

*   Lowercase tag name
*   Lowercase attribute name
*   Use double-quotes for attribute values (not single-quotes)

    ```html
    <!-- Good -->
    <img src="#">

    <!-- Bad -->
    <IMG SRC='#'>
    ```

## Indentation

We use tabs for indentation. We've made an active choice in doing so, the main reason being that tabs can be personalized. The width of a tab character can be adjusted per editor. This means that people can view your code in the way they feel comfortable with, not in the way you prefer.

Further reading on this:

 * http://lea.verou.me/2012/01/why-tabs-are-clearly-superior/

## Void elements

[Void elements](https://www.w3.org/TR/html5/syntax.html#void-elements) have no end tag.

Don’t use a trailing slash anymore. Yeya, HTML5!

```html
<!-- Good -->
<br>
<hr>
<img>
<input>
<link>
<meta>

<!-- Bad -->
<br />
```

## Optional tags

[Optional tags](https://www.w3.org/TR/html5/syntax.html#optional-tags) should always be closed for readability — even if not strictly required by the HTML spec.
    
```html
<!-- Good -->
<ul>
    <li>One</li>
    <li>Two</li>
</ul>

<!-- Bad -->
<ul>
    <li>One
    <li>Two
</ul>
```

## Comments

Avoid using HTML comments.
    
```html
<!-- I don't need to be here -->
<p>Lorem ipsum dolor sit amet.</p>
```

### Why not?

*   With modern developer tools, the need to “View Source” is rare today.
*   Developer annotations should be secret (HTML comments are not).
*   Save users from downloading useless bytes.

### Suggestion

Comments in HTML should always wrapped in backend/templating language, or stripped out during HTML minification. Example:

```aspnet
<%--
Pentia:
See: Issue 12345
--%>
<p>Lorem ipsum dolor sit amet.</p>
```

## Nesting

Markup has a hierarchy, which creates parent/child relationships between elements. Maintaining an accurate hierarchy is essential for readability and avoiding validation issues.

### Single-line nesting

Child elements may be most readable without whitespace. Example:

*   Each line is under 80 characters.
*   Each line is nested less than two levels deeper.

```html
<ul>
    <li>One</li>
    <li>Two</li>
    <li>Three</li>
</ul>
```

A good example of multi-level HTML that still benefits from single-line nesting is anchors within lists:

```html
<ul>
    <li><a href="#">One</a></li>
    <li><a href="#">Two</a></li>
    <li><a href="#">Three</a></li>
</ul>
```

### Multi-line nesting

Use a single blank line to break up complex hierarchies. Separate child elements with a single blank line.

```html
<ul>
    <li>
        <h2>Title</h2>
        <p>Lorem ipsum dolor.</p>
    </li>

    <li>
        <h2>Title</h2>
        <p>Lorem ipsum dolor.</p>
    </li>

    <li>
        <h2>Title</h2>
        <p>Lorem ipsum dolor.</p>
    </li>
</ul>
```

### Hybrid nesting

In practice, single-line and multi-line syntaxes are both used. The goal is optimum readability for the given content. This is more important than strictly following a single syntax. So basically, be pragmatic about it in favor of readability and easing of team collaboration.

```html
<ul>
    <li>
        <h2>Title</h2>
        <p>Lorem ipsum dolor sit amet.</p>
    </li>

    <li>
        <h2>Title</h2>

        <p class="lede">
            Lorem ipsum dolor sit amet.
        </p>

        <p>
            Nulla facilisi. Duis aliquet egestas purus in blandit.
            Curabitur vulputate, ligula lacinia scelerisque tempor,
            lacus lacus ornare ante, ac egestas est urna sit amet arcu.
        </p>
    </li>

    <li>
        <h2>Title</h2>
        <p>Lorem ipsum dolor sit amet.</p>
    </li>
</ul>
```

### Grouping elements

Complex markup can take hundreds of lines to describe relatively simple content. From an authoring perspective, this can be difficult to scan and read. Adding several line-breaks between large sets of markup improves readability for developers. Whitespace characters are collapsed in HTML so there is no visual output, and the additional bytes are negligible.