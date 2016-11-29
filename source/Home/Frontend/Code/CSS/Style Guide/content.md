# Style Guide

## Formatting and whitespace

### Casing

*   Lowercase only
*   Hyphen between words - just as with CSS properties.

```css
/* Good */
.add-to-cart-button {}

/* Bad */
.addtocartbutton {}
.addToCartButton {}
.add_to_cart_button {}
```

### Rules

*   One space after selector
*   Opening curly-brace followed by new line
*   Closing curly-brace on new line
*   Blank line between rules - this will improve readability in version control tools.

```css
/* Good */
.selector {
    color: #000;
}

/* Bad */
.selector{color:#000;}
```

### Declarations

*   One declaration per line - this will also improve readability and comparison in version control tools.
*   Colon and one space after every property
*   Semi-colon after every value

```css
/* Good */
.selector {
    color: #000;
    font-size: 20px;
}

/* Bad */
.selector {
    color:#000; font-size: 20px
}
```

#### Multi-value declarations

*   Put each expression on a new line

```css
.selector {
    box-shadow:
        0 0 5px 0 black,
        inset 0 0 0 1px red;
    font-size: 20px;
}
```

## Indentation

We use tabs for indentation. We've made an active choice in doing so, the main reason being that tabs can be personalized. The width of a tab character can be adjusted per editor. This means that people can view your code in the way they feel comfortable with, not in the way you prefer.

Further reading on this:

 * http://lea.verou.me/2012/01/why-tabs-are-clearly-superior/

## Comments

All our CSS is written with a pre/post processor. This enables single-line `//` comments that don’t exist in the CSS spec.