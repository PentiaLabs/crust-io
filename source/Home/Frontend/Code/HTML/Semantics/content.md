# Semantics

Above all, remember that HTML is a markup language. The elements we use to describe content infer hierarchical and descriptive meaning. These inferences should not be taken lightly because this metadata is read and understood by search engines. Using structured markup accurately and consistently helps man and machine accessing the site use it better.

## HTML5 elements

Use HTML5 elements where appropriate:

```html
<article>
<aside>
<figure>
<figcaption>
<header>
<footer>
<main>
<nav>
<section>
```

However, like all generic elements they should be qualified with a class/ID to define their role or context. Don’t just rely on the parent/child relationship in selector chains to style them.

```html
<!-- Bad -->
<div class="page-header">
    ...
</div>

<!-- Good -->
<header class="page-header">
    ...
</header>
```

## Document outline

The document hierarchy follows the HTML5 outlining algorithm. The heading outline (`<h1> – <h6>`) does not need to be hierarchical globally. HTML5 sectioning elements are used to new outlining contexts.

Within each sectioning context, the appropriate heading hierarchy should be used for clarity (although this has no impact on the outline algorithm.

### Traditional HTML

Traditional HTML authoring has a strict reliance on creating a universal document hierarchy. This is often difficult to maintain if content or modules are used in multiple contexts. This is not recommended today.

```html
<div class="primary">
    <h1>Page Title</h1>

    <div class="article">
        <h2>Article Title</h2>
        <p>Llorem ipsum dolor sit amet.</p>

        <h3>Article Subtitle</h3>
        <p>Curabitur vulputate, ligula lacinia scelerisque tempor.</p>

        <h3>Article Subtitle</h3>
        <p>Curabitur vulputate, ligula lacinia scelerisque tempor.</p>
    </div>

    <div class="article">
        <h2>Article Title</h2>
        <p>Nulla facilisi. Duis aliquet egestas purus in blandit.</p>
    </div>
</div>

<div class="sidebar">
    <h2>Related Articles</h2>
    ...
</div>
```

### HTML5 with sectioning

In HTML5 documents, the heading hierarchy may be restarted within any element that creates a new sectioning context. The document outlining model in HTML5 combines the heading levels and sectioning hierarchy to assemble the document hierarchy.

Technically, you could use only `<span class="token tag"><span class="token tag"><span class="token punctuation"><</span>h1</span><span class="token punctuation">></span></span>` elements if you wanted to, but this makes styling more difficult so it’s not recommended. If a section of content merits its own hierarchy, then use a sectioning element.

Never choose a heading level based on the global styling applied to that element though. There are conventions in CSS to swap the styling of another heading level consistently and in a maintainable way.

```html
<div class="primary">
    <h1>Page Title</h1>

    <article>
        <h1>Article Title</h1>
        <p>Llorem ipsum dolor sit amet.</p>

        <h2>Article Subtitle</h2>
        <p>Curabitur vulputate, ligula lacinia scelerisque tempor.</p>

        <h2>Article Subtitle</h2>
        <p>Curabitur vulputate, ligula lacinia scelerisque tempor.</p>
    </article>

    <article>
        <h1>Article Title</h1>
        <p>Nulla facilisi. Duis aliquet egestas purus in blandit.</p>
    </article>
</div>

<aside>
    <h1>Related Articles</h1>
    ...
</aside>
```

## Further reading

*   [Smashing Magazine: HTML5 and the Document Outlining Algorithm](http://coding.smashingmagazine.com/2011/08/16/html5-and-the-document-outlining-algorithm/)
*   [HTML5 Doctor: Outlines](http://html5doctor.com/outlines/)
*   [MDN: Sections and Outlines of an HTML5 Document](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Sections_and_Outlines_of_an_HTML5_document)
*   [HTML5 Outline Tester](http://gsnedders.html5.org/outliner/)