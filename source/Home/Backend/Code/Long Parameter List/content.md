# Long Parameter List

More than **three or four** parameters for a method.
A long list of parameters might happen after several types of algorithms are merged in a single method. 
A long list may have been created to control which algorithm will be run and how.

![Long Parameter List](/images/backend/code/params.png)



## Treatment

If the current object does not contain all necessary data, another object (which will get the necessary data) can be passed as a method parameter.

### Don't

~~~~javascript
    public void DoSomthing(string name, int age, int hight, 
	                       string street, string city, string postCode, 
						   int shoesSize)
~~~~

### Replace with

~~~~javascript
    public void DoSomthing(Person person)
~~~~

