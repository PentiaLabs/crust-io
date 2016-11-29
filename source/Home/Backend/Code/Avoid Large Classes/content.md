# Avoid Large Clases

A class contains that contains many fields/methods/lines of code is more than liekely responsisble for more than 1 thing, and therefore breaks the [SOLID Principles](/Home/Backend/Modular%20Architecture/Packaging%20Principles/) 

![Large Class](/images/backend/code/large class.png)

## Treatment
When a class is wearing too many (functional) hats, its time to split it up:

- Extract Class - helps if part of the behavior of the large class can be spun off into a separate component.
- Extract Subclass - helps if part of the behavior of the large class can be implemented in different ways or is used in rare cases.
- Extract Interface - helps if it is necessary to have a list of the operations and behaviors that the client can use.