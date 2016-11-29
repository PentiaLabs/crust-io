# Preprocessor

## Less

At the current point in time we're only using [LESS](http://lesscss.org/) (preprocessing with latest npm avaiable compiler) - the heavy lifting in this regard will be handled by the [FrontendBuilder](https://github.com/PentiaLabs/FrontendBuilder))

### Variables

*   Lowercase only
*   Hyphen between words - just as with CSS properties.

##### Colors

```css
/* Good */
@color-gray-100: #808080;
@color-gray-200: #525252;

/* Bad */
@color-gray-dark: #808080;
@color-gray-darker: #525252;
```
In case of adding a new color to the variables:
```css
@color-gray-100: #808080;
@color-gray-150: #3e3d3d; /* new color added */
@color-gray-200: #525252;
```
## But... Sass?!

We've been talking about switching to [Sass](http://sass-lang.com/) at some point, which seems to be gaining popularity in the general frontend community (Bootstrap, for which we have a tie to the grid, have switched to Sass in the upcoming [version 4](http://v4-alpha.getbootstrap.com/)) and a switch will probably come, but we need to be 100% ready for it in regard to tooling, education, methodical questions and such, so we're able to hand over assignments to each other without losing effeciency.
