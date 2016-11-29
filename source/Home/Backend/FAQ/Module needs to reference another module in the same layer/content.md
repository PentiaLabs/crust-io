# One or more [Modules](/Home/Backend/Modular%20Architecture/Module) needs to reference another module in the same layer?

This typically happens in the feature layer and [modules](/Home/Backend/Modular%20Architecture/Module) in the same layer should **not** reference each other!

There are a number of solutions to this issue:
1. Keep the module in the feature layer and introduce an abstraction in the foundation layer
  - Then the modules can reference the abstraction, not the implementation. 
  - Use dependency injection to resolve the implementation.
2. If the module very stable, abstract or a fundamental part of the solution consider moving it the foundation layer.
3. Consider that the modules boundaries/responsibilities are not correct and you need to re-factor the modules.
4. In rare cases move a module to the project layer, so it can reference the other modules in the feature layer.
 
**Solution 1** in general is the best solution, and also has the added benefit that different implementations could be injected depending on the context.

### Example

Getting the price for a product from Microsoft Ax is very slow!

For product list pages it could inject a cached list of the prices, which are cached for X hours.

But when a visitor is about to buy the product, it will inject the slow code (which calls Microsoft Ax to ensure the price is correct).

Module nneds to reference another module in the same layer


