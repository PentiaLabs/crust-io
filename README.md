# McFly

Static site generator with support for hiearichal page structure. View the last deployed version here (insert CNAME)

## How does it work?

The project has some HTML templates, these are made with [Swig](http://paularmstrong.github.io/swig/).
The builder (Gulp/Node) then reads the folder structure for general site structure and populates them with the content from markdown files that lies besides them. Then it generates the static html site accoringly.

(TODO: Elaborate on how folder structure and md-files translates into page structure)

## Dependencies

- [Nodejs](http://nodejs.org/).
- gulp and bower module globally - type `npm install -g gulp bower` in your cli of choice.

## How to generate the site

(TODO: Elaborate on generation process)

If you are developing you can type `gulp serve` this will start a local preview server with auto reload making it easy to develop now features.

## Demo Deploy

## Problems with git
Some firewalls might not like Git, type the following command in your Git Shell to fix this.
`git config --global url."https://".insteadOf git://`

---
❤♥ Pentia ♥❤