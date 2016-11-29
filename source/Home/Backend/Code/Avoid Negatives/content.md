# Avoid Negatives

Avoid negatives, f. ex.:

~~~~javascript
    public bool IsNotSomething(Item item)
~~~~

When utlizing this method, you might get calls such as:

~~~~javascript
    if(IsNotSomething(item))
	{
		[do stuff]
	}
~~~~

But you might want to use the negated case as well, in which case you'll get calls such as:

~~~~javascript
    if(!IsNotSomething(item))
	{
		[do stuff]
	}
~~~~

This usage will cause a double-negative which is very hard to read for most people.

## Treatment

Even though you initially only want to use the negation, define the positive instead:

~~~~javascript
    public bool IsSomething(Item item)
~~~~

This will give your initial use the following form, which gives a readable single-negative:

~~~~javascript
    if(!IsSomething(item))
	{
		[do stuff]
	}
~~~~

And the the double-negative that occured when using the positive is now replaced with a single-positive:

~~~~javascript
    if(IsSomething(item))
	{
		[do stuff]
	}
~~~~