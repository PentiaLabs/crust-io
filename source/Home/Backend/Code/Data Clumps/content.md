# Data Clumps

Sometimes different parts of the code contain identical groups of variables (such as parameters for connecting to a database). These clumps should be turned into their own classes.

Often these data groups are due to poor program structure or "copypasta programming”.

If you want to make sure whether or not some data is a data clump, just delete one of the data values and see whether the other values still make sense. If this is not the case, this is a good sign that this group of variables should be combined into an object.

![Data](/images/backend/code/data.png)

## Treatment

### Extract Class

If repeating data comprises the fields of a class, the extract a class and move the fields to their own class.

![Extract Class](/images/backend/code/extractclass.png)

### Introduce Parameter Object

If the same data clumps are passed in the parameters of methods, introduce Parameter Object to set them off as a class.

![Extract Class](/images/backend/code/parameterobject.png)


