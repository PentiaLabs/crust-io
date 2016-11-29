# Machine requirements

These are the requirements for Windows machines that will be running the FrontendBuilder.

This can be local developer PCs or entire buildserver setups.

You will need to go through **all** of the steps in this guide to be able to do a successful build.

At the bottom of this page you can read a lot about why we need to go through installing all of these software dependencies.

1) **Install Node.js**

2) **Install git**

  * **CLI commands should be executed with administrator rights**

  * Select "Use Git and optional Unix tools from the Windows Command Prompt

    ![git-add-to-path](https://cloud.githubusercontent.com/assets/248851/10457533/212b82ac-71c7-11e5-87a2-09a32b3e3438.png)


3) Make sure that we're able to clone git repositories by by-passing the git-protocol in favor of https. So execute the following command inside command line prompt with administrator rights:

  ```powershell
git config --global url."https://".insteadOf git://
  ```


4) **Upgrade npm to npm 3.x.x**

Even though you've just installed Node.js it doesn't necessarily mean you have npm in version 3.

  * **The following commands should be executed inside a command line prompt with administrator rights**

  ```powershell
npm install -g npm-windows-upgrade
  ```

  ```powershell
Set-ExecutionPolicy Unrestricted -Scope CurrentUser -Force
  ```

  ```powershell
    npm-windows-upgrade
  ```

  * Select the newest version and let it install

  * When it finishes the install run:

  ```powershell
  npm --version
  ```

  and make sure it responds with something like ```3.x.x```


4) **Install Python 2.7.x**

  * Go to https://www.python.org/downloads

  * Click the button to download Python 2.7.x

  * Run the installer.

  * Select ```Install for all users``` - click next.

  * Select to install in ```C:\Python27``` - click next

  * Be sure to select ```Will be installed on local hard drive``` in ```Add python.exe to Path``` - click next

    ![python-add-to-path-03](https://cloud.githubusercontent.com/assets/248851/10457509/0dd59e4a-71c7-11e5-9a3e-7e928694d602.png)

  * Finish up the installation

5) **Install Visual Studio Express 2013 for Windows Desktop with Update 4**

Even if you have another version of Visual Studio installed on your system do install this as well.

 * Go to http://www.microsoft.com/en-gb/download/details.aspx?id=44914

 * Select "English" or some other available language and click "Download"

 * Check "wdexpress_full.exe" and click "Next"

 * Run the file downloaded. Begin the installation.

 * If you're unable to start the installation, it means you already have the necessary tools for this step. Abort the installation.

## Why do we need to have such a large range of software as a dependency for our builds?

As stated on the about page, we want to have a setup that adheres to best practice conventions for serving client side assets in production, along side maintaining a developer suite that makes developer ergonomics as modern and effective as possible. In doing this we facilitate complex tooling which depends on certain third party libraries that needs to be natively compiled to work - the compilation is handled by a package called [node-gyp](https://github.com/nodejs/node-gyp). The support for node-gyp complation on Windows is flaky to say the least - something that Microsoft is actively looking into solving. Until then, we need to have the above setup in place to be able to handle our assets in a way that will benefit our digital solutions.

The subject of poor node-gyp support in Windows is a well known one - it even has its own [issues thread](https://github.com/nodejs/node-gyp/issues/629) inside the node-gyp repository, which also holds a fair amount of useful information on the matter. Some of which I have included below to cast some light on the problem.

  
### What exactly is the service that node-gyp provides that sooo many projects depend on?

It provides the ability to pull in natively compiled modules in to be accessible to Node.js. I.e. build C++ projects so you can use them in js.

### Why on earth is a c++ compiler even necessary? Hardly anything else on windows requires a c++ compiler after all.

Because it is building native code, i.e. C++, which is super easy to do on non-Windows platforms with gcc or clang.

### Why can't we just download a compiler as part of node on windows? Or as part of the first node-gyp install?

Just downloading a stand-alone compiler is one of the things that the multiple Microsoft employee posts in this thread have talked about, it is not easy to do, and less easy since they have removed the basic compiler from the latest versions of the Windows SDK.

### What's the deal with the various configurations (an env variable and an npm variable? why?)

Because building c++ outside of a sandbox has many, many configurations and relies on envars that can drastically affect what is build.

### How is it that there is such a large range of things that might go wrong? It would seem like there would be just two or three things but there seems to be endless combinations.

Welcome to compiling native code on a complex platform.

### What does any of this have to do with Python? What is python even being used for?

Python is used internally by GYP, the CMake-like build system that node-gyp wraps and makes easier to use for node.

### Why is it a version of Python that was superseded over seven years ago?

The reason python2 is required is because GYP requires it and hasn't converted to using python3. It isn't a simple switch to take a large project that many other projects depend on and change from Python 2 to 3, and so far, it doesn't seem like a large effort has been made to make that change, considering it is a low priority defect since 2009, https://code.google.com/p/gyp/issues/detail?id=36

### What about all this is easier on a *nix system than on Windows?

*nix systems are a lot less complicated, you can very easily pull all your requirements (like gcc, python2, platform specific SDKS) and build and go, but on Windows, the ecosystem is a lot different, and it just isn't that simple, though many efforts, npm included, have tried to help this a ton, but there is still a lot of legacy work out there, and not enough time, money, and resources to turn it on overnight