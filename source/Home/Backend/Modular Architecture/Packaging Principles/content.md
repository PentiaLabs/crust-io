# Packaging principles


Is a way of grouping classes in order to make them more organized, manageable and maintainable! 
It helps us understand which classes can be packaged together **called package cohesion** and how these packages should relate with one another **called package coupling**.

> "Building software without packaging, is like trying to build a sand castle one grain at a time"

Refer to [Agile Principles, Patterns, and Practices in C# chapter 28](http://www.amazon.com/Agile-Principles-Patterns-Practices-C/dp/0131857258) or [Wikipedia](https://en.wikipedia.org/wiki/Package_principles).

At Pentia the result of packaging is a [**Module**](/Home/Backend/Modular%20Architecture/Module), previously it was called a **component**


## Module Coupling

Module Coupling is the corner stone principle in Modular Architecture and to support it we have introduce [3 Layers](/Home/Backend/Modular%20Architecture/Layers).

### Stable-dependencies principle (SDP)

Depend in the direction of [stability](/Home/Backend/Modular%20Architecture/Stability/) - a module should only rely on modules that are more stable than itself. 

![Stable-dependencies principle](/images/backend/modular architecture/packaging principles/stable.png)

### Stable-abstractions principle (SAP)

Abstractness should increases with [stability](/Home/Backend/Modular%20Architecture/Stability/). Packages that are maximally stable should be therefore maximally abstract. 
Unstable packages should be concrete. The abstraction of a module should be in proportion to its stability

### Acyclic dependencies principle (ADP)

The dependencies between components must not form cycles, i.e. no circular referencies enforced by Visual Studio for C# but not JavaScript

## Module Cohesion

###	Common-closure principle (CCP)

The classes in a module should be closed together against the same kinds of change. A change that affects a module affects all the classes in that module and no other module.

What changes together, should live together.

###	Common-reuse principle (CRP)

When you depend on one class in a module you depend on all the classes in that module, not just the one you are using

###	Reuse-release equivalence principle (REP)

Essentially means that the module must be created with reusable classes — “Either all of the classes inside the module are reusable, or none of them are”. The classes must also be of the same family.


