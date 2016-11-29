# Vendor Prefixes

Write your CSS without vendor prefixes. Keep it simple.

## Autoprefixer

Our FrontendBuilder has the post-processor [Autoprefixer](https://github.com/postcss/autoprefixer) build in and will add vendor prefixes intelligently.

You define the browsers you need to support in the per project configuration setting found in project-context.json [here](/Home/Frontend/Develop/FrontendBuilder/Getting%20started/Configuration%20reference/#autoprefixer-object-), and it uses data from [Can I Use](http://caniuse.com/) to insert only the prefixed properties you need.