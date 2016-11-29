# Checklist

In the process of selecting a font for use on web it's important to make sure that the browser delivery of the font is actually attainable. Secondly we need to make sure that we're happy with how the font is performing in browsers.

This is why design authors and a frontend developers should make sure that they've taken responsiblity of going through each item on the checklist below.

## System support

How the font performs when installed locally on a computer and used inside Photoshop/Sketch/other is one thing.

A whole other is how the webfont is supported cross system and cross browser.

A proof of concept is needed in regards of verification that webfont usage of types are feasible, and needs to be sorted out early on.

## License

Verify that pricing, number of available page views and other licensing issues for a chosen font are in accordance with customer expectations and project budget.

## Per environment subscription management

Make sure that operations policies regarding different environments and the owners of these respectively are well sorted out before implementation begins. When in development it would be normal proceedings to be using an in house font vendor subscription, only to switch out credentials owned by the client when the project lives in the production environment.

Verify that everything regarding the setup for this switch is in order, so it is not an issue when launch day dawns.

## Mime-type

Verify that all non-default mime-types are distributed programatically onto every server that will need to deliverfont mime-types (woff or woff2 for instance)