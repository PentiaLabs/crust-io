# Installing DesignResources

To be able to successfully include the asset bundles created by the FrontendBuilder, you'll need to setup the module DesignResources in the project.

[Documentation for DesignResources](http://buildlibrary/Pentia/DesignResources)

Here's a step by step guide on how to setup the DesignResources module inside your solution.

First of all open up the project.build file, and find the following node in the enclosed xml:

```html
<dirset id="project.modules" basedir="${library.root}">
...
```

Inside that tag we have a list of all the modules that are installed in the project. It's in here we need to pass a reference to the DesignResources and also the version that we need. Choosing the correct version is beyond the scope of this installation guide as it has to do with what version of Sitecore your project is using, so please consult the [DesignResources documentation](http://buildlibrary/Pentia/DesignResources) for that answer.

Now put in a line inside the project.build file, so it now looks something like:

![Add reference inside project.build](/images/installing-designresources/project-build-ref.png)

At this point you'll need to pass in a reference for the DesignResources assembly. To do so go to the "Solution Explorer" and navigate to the "Design" project:

![Go to solution explorer and navigate to the Design project](/images/installing-designresources/01.png)

Right click "References" and click "Add Reference...":

![Add new reference](/images/installing-designresources/02.png)

A window opens up. Press the "Browse..." button in the bottom of the window:

![Browse for assembly](/images/installing-designresources/03.png)

Now navigate to the correct folder corresponding to the version of the DesignResources module you want to reference. In this example we'll navigate to "\\buildlibrary\library\Pentia\DesignResources\1.0\www\bin" and select the enclosed "PT.Framework.DesignResources.dll" and click the "Add" button:

![Add .dll](/images/installing-designresources/04.png)

Your screen should now look something like this. Now click "OK":

![Verify](/images/installing-designresources/05.png)

The reference should now be added to "References" in the "Design" project:

![And verify that it's listed in the list of references in the project](/images/installing-designresources/06.png)

Now just press CTRL + SHIFT + S to save the project file. DesignResources will now be installed upon the next build of the project.