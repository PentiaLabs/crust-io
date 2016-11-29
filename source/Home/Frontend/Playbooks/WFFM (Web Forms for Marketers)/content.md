# WFFM (Web Forms for Marketers)

Different versions of *WFFM* will come with its own set of problems in terms of clashes with our own code. This page is dedicated to these issues.

## RequireJS

Some versions of *WFFM* are built with their own version of *RequireJS*. If we are using *RequireJS* on our project, this will mean that *WFFM’s* *RequireJS* will clash with ours, and instead of loading our own configuration, theirs will be loaded, effectively meaning that none of our modules will be loaded.

Unfortunately, there is no way of turning their requirement for *RequireJS* off, and therefore we need to “hack” it to the best of our abilities. This means that we will need to be able to modify the WFFM module itself. In order to do so without it being overwritten every time we build the project, we need to copy the module and create our own version.

First, we need to copy the module and rename it accordingly. In this example we are using version 8.1.151217. The module usually comes in the form of two folders, one with just the version number and one with a trailing “-CD”. Both of these should be copied, renamed and the files within edited in both accordingly.

![WFFM location and folder](/images/wffm/wffmRequire.png)

In this example, we have renamed / added to the folders the text “AES JS Hotfix” in order to identify that this is not a standard *WFFM* module, but contains a hotfix / “hack”. The path to the module is: 

```powershell
\\buildlibrary\library\Sitecore Modules\Web Forms for Marketers
```

Within each module we need to locate the *RequireJS* scripts and “gut” them. The files are located here: 

```powershell
\\buildlibrary\library\Sitecore Modules\Web Forms for Marketers\8.1.151217 - AES JS Hotfix\www\sitecore modules\Web\Web Forms for Marketers\mvc
```

![WFFM files to edit](/images/wffm/wffmRequireFiles.png)

The two files we need to edit are *main.js* and *require-2.1.15.js*, or the appropriate version of *RequireJS* that comes with the given *WFFM* module.

Within *main.js* we need to comment out the lines 18 – 21:

![WFFM main.js](/images/wffm/wffmRequireMain.png)

And within *require-2.1.15.js* we simply need to comment out EVERYTHING.

Remember to edit these files in both folders, the one with a trailing “-CD” as well as the one without.

After we’re done editing the files and now have the two renamed and hotfixed folders, we need to edit *wffm.build*, which should be located in the root of your project, and change the paths to point at our hotfixed version of the *WFFM* module.

![wffm.build requirejs](/images/wffm/wffmRequireBuild.png)

You should now be all set, and all you need to do now is to perform a full build with the Pentia builder.

## Bootstrap

If you are experiencing trouble with *WFFM* loading its own *Bootstrap* styling, it can easily be disabled in *wffm.build*, which is usually located in the root of your project.

![wffm.build bootstrap](/images/wffm/wffmBootstrap.png)