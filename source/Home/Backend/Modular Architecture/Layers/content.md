# Layers

![Layers](/images/backend/modular architecture/layers/layers.png)

Layers help by visualising and enforcing the [stable dependency](/Home/Backend/Modular%20Architecture/Packaging%20Principles/#stable-dependencies-principle-sdp-) and [stable abstraction](/Home/Backend/Modular%20Architecture/Packaging%20Principles/#stable-abstractions-principle-sap-) principles of [module coupling](/Home/Backend/Modular%20Architecture/Packaging%20Principles/#module-coupling).
Each layer defines the [stability](/Home/Backend/Modular%20Architecture/Stability/) of the [modules](/Home/Backend/Modular%20Architecture/Module) and the direction of dependency. 

Modules in the same layer should **not** reference each other, see [here](/Home/Backend/FAQ/Module%20needs%20to%20reference%20another%20module%20in%20the%20same%20layer/).

> Note that the layers in Modular Architecture are not equivalent to the layers seen in 3/n-tiers architecture even though they bear resemblance in terms of dependency direction.

A layer is physically described in your solution by folders in the filesystem, solution folders in Visual Studio, folders in Sitecore along with namespaces in code.
See [Anders Laub blog](https://laubplusco.net/layers-in-sitecore-modular-architecture/).

## Foundation Layer (previously call framework)

This layer is the most stable and contains only modules which are not subject to change, and if they do change it will have implications for all modules, typical foundation modules:
- Taxonomy
- Dictionary
- Indexing
- ...

## Feature Layer
Modules in this layer resembles the customer domain and need to be flexible, and therefore are more likely to change, typical feature modules:
- Navigation
- Search
- Metadata
- ...

## Project Layer
The project is the least stable layer and can reference all modules as it is used to aggregate the functionality provided by the feature and foundation layers, typical project modules:
* Page Types
* Design
* Context (Responsible for dependency injection (IoC))

## Build Library (Layer)
We actually have a 4th Conceptual Layer - the build library which contains very stable code used by more than one solution. 
If a module requires a change/new feature a new version is released, typical build library modules:
- Pentia's Sitecore Extensions, Custom fields, etc.
- Sitecore (all Sitecore versions)
- Sitecore Modules (i.e. WFFM)
- 3rd party Libraries (Unity, Asset Bundling)
- Sitecore patches
- Tools i.e. job viewer, index viewer, etc.
