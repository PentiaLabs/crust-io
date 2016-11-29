# Basic principles

## Class names

* Use only class-attributes for styling hooks.
* Use meaningful names; use structural or purposeful names over presentational.
* Use .js-* classes to denote behavior (as opposed to style), but keep these classes out of your CSS.

## BEM

Use only BEM-principle class names for styling hooks.

### Use BEM mixins instead of concatenated BEM classes.

```html
<div class="article__lead lead"> [...]
<div class="header__search search"> [...]
```

Reference: http://alexbondarev.com/bem-elements-and-their-elements/

**Missing content**
```
Something about what to do with classes added by JavaScript to denote component state. 
What do we do? BEM modifiers? .is-*/.has-*?
```

## Fluid width components

  * don't put margin and padding on component - always 100% width;
  * margin + padding should be on containing element or component modifier
  * this way you can always put a component in a grid, and it's much easier to reuse

## CSS frameworks

We're using the standard [Bootstrap](http://getbootstrap.com/) grid for every grid solution.

## Critical CSS

At the time being we're looking into providing automatic Critical CSS extraction in our FrontendBuilder setup, so that it will work seamlessly with our Sitecore solutions, but we're yet to implement it in practice. Until such a setup is in place, a custom solution targeting delivery of Critical CSS on a solution is ill-advised and should be considered handled by a budget add-on in any project.

## Structuring CSS with ITCSS

ITCSS—which stands for Inverted Triangle CSS—is a fully managed CSS architecture. It's not a framework or library; there's nothing to download or install.

It's a collection of principles and metrics by which developers should group and order their CSS in order to keep it scalable, terse, logical, and manageable.

It helps you to organize your project CSS files in such way that you can better **deal with** CSS specifics like **global namespace, cascade and selectors specificity**.

### How it works
One of the key principles of ITCSS is that it separates your CSS codebase to several sections (called **layers**), which take form of the inverted triangle:

![itcss](https://github.com/PentiaLabs/Pentia.SOPs/blob/master/app/images/frontend/code/css/itcss-layers.jpg?raw=true)

1.	**Settings** – used with preprocessors and contain font, colors definitions, etc.
2.	**Tools** – globally used mixins and functions. It’s important not to output any CSS in the first 2 layers.
3.	**Generic** – reset and/or normalize styles, box-sizing definition, etc. This is the first layer which generates actual CSS.
4.	**Base (sometimes called Elements)** – styling for bare HTML elements (like H1, A, etc.). These come with default styling from the browser so we can redefine them here.
5.	**Objects** – class-based selectors which define undecorated design patterns, for example media object known from OOCSS
6.	**Components** – specific UI components. This is where majority of our work takes place and our UI components are often composed of Objects and Components
7.	**Trumps** – utilities and helper classes with ability to override anything which goes before in the triangle, e.g. hide helper class

### Example of use
**Creating a new component**

Let’s say you are creating a button component. **If** (only if!) there are some core, unopinionated styles that you can reuse for all buttons on the site, you’d create a file called `object.button.less` and add these least opinioned, reusable styles in there. These could be e.g.:
```less
// object.button.less
// Core styles for button

.button {
	padding: 10px 40px;
	border: none;
	outline: none;
}
```

Then you’d create a file called `component.button.less`, where you’d add the component-specific styles. In many cases, it is the only file you create for a new component. E.g.:
```less
// component.button.less
// Specific, component-related styes

.button {

	&.button--primary {
		background-color: @color-primary;
		color: @color-font-light;
		font-size: 30px;
	}

	&.button--secondary {
		background-color: @color-secondary;
		color: @color-font-dark;
		font-size: 22px;
	}
}
```
