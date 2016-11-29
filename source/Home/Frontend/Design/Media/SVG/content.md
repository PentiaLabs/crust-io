# SVG

We're using inline SVG in our HTML documents to portray graphical icons. Formerly (and on some legacy solutions still) we've used icon fonts, but this has been switched out in favor of SVG.

## Technical instructions

First of all, let's have some technical instructions. Beneath this section you're able to read a little about why we think SVG is the correct way of serving iconography on the web.

The FrontendBuilder is able to process a bunch of svg-files, combine them in a spritesheet and provide the css classes for easy insertion on the page.

### Generating spritesheet and CSS

Here's how to do it:

 1.  Please make sure that you have a consistent naming convention of the individual icons.

 2. Open the project-context.json file and provide the path for where the SVG-files are located. Please consult the FrontendBuilder docs for the syntax for svg processing ([here](/Home/Frontend/Develop/FrontendBuilder/Getting%20started/Configuration%20reference/#svgsprite-array-)). When the FrontendBuilder is building the project, the svgmin-task will process the files.

 ![Collection of individual icons](/images/svg/svg-approach.png)

 3. The SVG files are optimized and transformed into a complete svg-definition document with references based on file name, which is placed in the distribution folder as a build artifact. Any inline styles removed in this process so we're able style fills, strokes, etc. directly from CSS.

 ![Generated spritesheet](/images/svg/svg-id.png)

### Injecting the spritesheet

The generated SVG definition document should now be injected inline at the top of StandardPage.cshtml / .aspx (or where you have configured it to be). This will eliminate additional HTTP requests and related latency, etc. which means that we can provide icons instantly!

Be advised that it's important that you inject the spritesheet in the top of the document. Safari will not render icons if the spritesheet is placed below the icon-reference.

The FrontendBuilder can help you with this injection. Read the instructions on how to do that [here](/Home/Frontend/Develop/FrontendBuilder/Getting%20started/Configuration%20reference/#svginject-object-).

### Using icons in the solution

From thereon out it's easy to insert icons into the page by referring to the icon in the HTML as follows:

```html
<svg class="icon">
	<use xlink:href="#calendar-outline"></use>
</svg>
```

By doing it as instructed above, you'll always be able to see which icons are available just by looking at the individual files enclosed in the project file system.

And that's it! Now you're able to get great-looking icons of any size, resolution, etc. without losing quality.

|100%|500%|
|-----------|----------|
|![100% example](/images/svg/button-100.png)|![500% example](/images/svg/button-500.png)|

### Payoff:

 * Clean inline vector.
 * No loading of fonts.
 * Instant display of graphics - no FOUT.
 * Lots of opportunities styling and animations.
 * No antialisering.
 * Complete control over colors, paths and presentation.

### But what about fallback?
 
We have a FrontendBuilder task planned which is to create a font fallback for browsers that can not interpret / render svg.
The syntax for this approach will be something like the following:

```html
<svg class="icon">
	<use xlink:href="#calendar-outline"></use>
	<foreignobject>
	  <span class="icon-fallback icon-calendar-outline"></span>
	</foreignobject>
</svg>
```

Browsers that are happy serving svg will never read the ```<foreignobject>``` tag.
Browsers that do not understand neither svg or foreignobject tag will ignore these and jump straight down and render the <span> tag.

## Why SVG?

Well for a lot of reasons really. Some of them are explained below.

### Icon font rendering issues

Icon fonts have always been a hack. We originally used a custom font with our icons as unicode symbols. This allowed us to include our icon font in our CSS bundle. Simply adding a class to any element would make our icons appear. We could then change the size and color on the fly using only CSS.

Unfortunately, even though these icons were vector shapes, they’d often render poorly on 1x displays. In Webkit-based browsers, you’d get blurry icons depending on the browser’s window width. Since our icons were delivered as text, sub-pixel rendering meant to improve text legibility actually made our icons look much worse.

### Page rendering improvements

Since our SVG is injected directly into the markup (more on why we used this approach in a bit), we no longer see a flash of unstyled content as the icon font is downloaded, cached, and rendered.

### Accessibility

As laid out in [Death to Icon Fonts](https://speakerdeck.com/ninjanails/death-to-icon-fonts), some users override icon fonts. For dyslexics, certain typefaces can be more readable. To those changing their fonts, font-based icons were rendered as empty squares. This messed up page layouts and didn’t provide any meaning. SVGs will display regardless of font overrides. For screen readers, SVG provides us the ability to add pronouncable alt attributes, or leave them off entirely.

### Properly sized glyphs

For each icon with icon fonts we would serve a single glyph at all sizes. Since loading of sites utilizing font icons are dependent on the download of the icon font, we would be forced to limit the icon set to just one specific pixel shape - for example 16px shapes. This would lead to some concessions on the visuals of each symbol since we’d optimize for the 16px grid. When scaling icons up in blankslates or marketing pages, we’re still showing the 16px version of the icon. With SVGs, we can easily fork the entire icon set and offer more appropriate glyphs at any size we specify. We could have done this with our icon fonts, but then our users would need to download twice as much data. Possibly more.

### Ease of authoring

Building custom fonts demands a lot of dependencies and tooling. With SVG, adding a new icon could be as trivial as dragging another SVG file into a directory - the FrontendBuilder will handle the rest (optimizing, concatenation, creating css rules etc)

### We can animate them

There's a lot of possibilities regarding SVGs and animation. We can bring more life to our graphics if we want to.

### Drawbacks & Gotchas

Firefox still has pixel-rounding errors in SVG, though the icon font had the same issue.
We still need to provide a fallback for browsers that doesn't support SVG. We can do this with a <foreignobject> and in there: icon font fallback. 
Internet Explorer needs defined width and height attributes on the svg element in order for them to be sized correctly.
