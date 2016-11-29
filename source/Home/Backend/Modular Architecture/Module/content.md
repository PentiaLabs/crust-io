# Module

The result of [packaging](/Home/Backend/Modular%20Architecture/Packaging%20Principles/) a number of classes together is called a **MODULE**. Each module is represented by a single Visual Studio project.

A module divides domain functionality into loosely coupled modules with clear boundaries, where each Module can contain Presentation, Business logic, Sitecore Content (Templates, layouts, setting items, etc.) and Data (Sitecore, SQL, etc.).

![Modules](/images/backend/modular architecture/module/example.png)

Within each modules we generally use [Domain Driven Design]( https://en.wikipedia.org/wiki/Domain-driven_design) as it provides the context for the code (both backend and frontend) and clarifies communication with the customer by identifing/defining the [Ubiquitous Language]( http://martinfowler.com/bliki/UbiquitousLanguage.html).

note: in older projects a **module** was a called a **component**
