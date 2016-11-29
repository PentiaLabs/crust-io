# Mediator Pattern

Everyone collaborating on scripting in a Pentia project should do so by following our mediator pattern as described below.

## Why?

The more tied modules are to each other, the less reusable they will be, and the more difficult it becomes to make changes to one without accidentally affecting another.

## Goals

These are the things we’re trying to achieve as opposed to old fashioned JavaScript spaghetti code:

 * Scalability
 * Highly-reusable code
 * No need for more than one single script reference
 * Small compositions of modules build for single responsibility principles.
 * Possibility to dynamically load modules triggered by user intent.
 * Housekeeping / memory management.
 * Easy interchangeability - even libraries such as jQuery.

## Mediator-what? What is it all about?

It’s a loosely coupled architecture with functionality broken down into independent modules with ideally no inter-module dependencies. Modules speak to the rest of the application when something interesting happens and an intermediate layer interprets and reacts to these messages.
Our applications can therefore consist of self-contained modules that can exist on their own, independently to their surroundings. We should be able to select any random module and drop in into a new page, and have it working without having to make adjustments or experience any problems with them.
By using this we don’t build large applications - we break them down into small pieces and assemble the very small pieces into a big application.

## The moving parts

### Modules (moduler)

 * Single-purpose parts of a larger system.
 * Will publish events of interest.
 * Very limited knowledge of what’s going on in the rest of the system.

### Mediator (formidler) - publish/subscribe messenger ([Code](https://github.com/PentiaLabs/component-loader/blob/master/component-loader/mediator.js))

 * Used to handle communication between related objects.
 * All communication is handled by the Mediator and components don’t need to know anything about each other - or even the existence of each other.
 * Allows loose coupling by encapsulating the way disparate sets of components interact and communicate with each other.
 * So how do we write code for the Mediator? We’re encouraged to think about module interfaces. How is this module suppose to communicate to its surroundings, and how should it be able to intercept communication from others? What is it interested in knowing about? It needs to be installed into something - in our case, the facade.

### Facade (facade) - handles security ([Code](https://github.com/PentiaLabs/component-loader/blob/master/component-loader/facade.js))

 * The Mediator interface is installed to the facade. The facade exposes the only interface the other modules needs to worry about. The facade is the skeleton of the control tower, and the Mediator is the technical control panel and communication system inside it making it functional.
 * At the time of writing we have no fine grained security system installed as it is mentioned in the [“Patterns For Large-Scale JavaScript Application Architecture” article](https://addyosmani.com/largescalejavascript/). We’ll implement this when time allows it.

### Loader (loader) - instantiates and keeps track of discovering and loading modules ([Code](https://github.com/PentiaLabs/component-loader/blob/master/component-loader/loader.js))
The loader is actually a module in itself. It exposes its own interface to allow other elements to inform it of changes to the current overall module composition of a page. It utilizes the facade internally to subscribe to a ‘refresh’ event, which when triggered will scan the entire DOM for components to initialize or renew.

### How can I use it?

In development we’ll serve [RequireJS](http://requirejs.org/), which by convention will load the script provided in the ```data-main``` attribute - which in this case is our ```config.js``` file:

```html
<script data-main="config.js" src="require.js"></script>
```

(In production we’ll have these files concatenated and uglified, and the script reference will look different as a result of our tooling setup, but the rest of the concept will be the same)

In our ```config.js``` we’ll have the configurations for our RequireJS setup at the top, and in the bottom we’ll initiate the loader - see the following code example. We’ll do so by requiring both the facade and the loader, and in the callback we’ll publish an event through the facade which our loader subscribes to:

```js
require(['facade', 'loader'], function (facade) {
	facade.publish('loader:refresh');
});
```

This will trigger a subscription in the loader, which will scan the current document for tags containing the attribute ```data-component```. For instance:

```html
<div class="airplane" data-component="airplane"></div>
```

This will - by our convention - fetch the file:

```
path to scripts/components/airplane/main.js
```

Which will return the JavaScript class for this particular component, do some housekeeping around the component life cycle in the application (read the details inside the [loader.js](https://github.com/PentiaLabs/component-loader/blob/master/component-loader/loader.js) file which is well commented) and the loader will create a new instance tied to the tag that originated the instantiation.

## Questions

**What if I want to have more than one module loaded on a single tag?**

You shouldn’t. Allowing something like this would introduce an ill-adviced anti-pattern. One DOM-node should only have one type of responsibility. Either you are a carousel or you are a modal window. You're not both.

If you are, you're a ModalCarousel and you should compose your module as such in the scripting. You could do it by composing the ModalCarousel as a new module which conceptually would be a fusion of modal and carousel, but in terms of hooking it up with a DOM-node it should be a single responsibility principle.

## When should it be used?

At any time you would want JavaScript functionality on your page. You can use it on traditional web pages that has full page transitions, as well as in Single Page Applications where only parts of the application logic shifts on interaction. The loader is constructed in such a way that it will handle all the housekeeping around pausing and tearing down components to leverage the best possible garbage collection and prevent memory leaks.

## Further reading and references:

 * [Patterns For Large-Scale JavaScript Application Architecture (article)](https://addyosmani.com/largescalejavascript/)
 * [Pentia Frontend RequireJS and mediator pattern demo (code repo)](https://github.com/PentiaLabs/PT-requirejs-mediator-pattern-demo)
 * [Pentia's RequireJS Component Loader (code repo)](https://github.com/PentiaLabs/component-loader)
 * [Video walk-through (danish)](https://pentia.sharepoint.com/portals/hub/_layouts/15/PointPublishing.aspx?app=video&p=p&chid=48ef2809-f3df-4fba-8d32-6ad2d2bd107f&vid=acca3c57-3f2a-4873-82ba-a10eda6dfd6c)
