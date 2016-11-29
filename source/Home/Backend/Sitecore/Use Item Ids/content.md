# Use item id’s for referencing items

Applies for Everything (Templates, Fields, specific items)

## Exception
It will be necessary to use paths when to access a context specific items. This is where you define a relative path find an item. The most common application is to get site specific items (in a multi-site solution); so it is not possible use ID’s, for example:
- Site Specific Settings
- Site Dictionary 
- Context specific items (i.e. found relative to another item).

> Uses Id’s ensures that constants are defined and reduces the use of literals strings.