# Primitive Obsession

Use of primitives instead of small objects for simple tasks (such as currency, ranges, special strings for phone numbers, etc.) or passing simple types as paramters.

~~~~javascript
    public void DoSomthing(string name, int age, int hight, 
	                       string street, string city, string postCode, 
						   int shoesSize)
~~~~

## Treatment

### Introduce Parameter Object

~~~~javascript
    public void DoSomthing(Person person)
~~~~


### Replace Data Value with Object

![New Class](/images/backend/code/new class.png)

If you have a large variety of primitive fields, it may be possible to logically group some of them into their own class. 
Even better, move the behavior associated with this data into the class too.

### Replace Type Code with Subclasses

When complicated data is coded in variables, create subclasses for each value of the coded type. Then extract the relevant behaviors from the original class to these subclasses. Replace the control flow code with polymorphism.

![Sub Class](/images/backend/code/subclass.png)

### Replace Type Code with State/Strategy

You have a coded type that affects behavior but you cannot use subclasses to get rid of it. Replace type code with a state object. If it is necessary to replace a field value with type code, another state object is "plugged in".

![State Class](/images/backend/code/state.png)