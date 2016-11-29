# Avoid Boolean Parameters

Avoid having boolean parameters in your methods, f. ex.:

~~~~javascript
    public void DoSomething(Item item, bool IsPublished)
~~~~

When reading calls to this method, it'll say something like the following, which makes the intent unclear:

~~~~javascript
    DoSomething(item, false)
~~~~

## Treatment
Extract the parameter into an Enum, f. ex.:

~~~~javascript
	public Enum IsPublished
	{
		Yes,
		No
	}
~~~~

Change your method signatur into:

~~~~javascript
    public void DoSomething(Item item, IsPublished isPublished)
~~~~

Finally refactor your calls into f. ex.:

~~~~javascript
    DoSomething(item, IsPublished.Yes)
~~~~