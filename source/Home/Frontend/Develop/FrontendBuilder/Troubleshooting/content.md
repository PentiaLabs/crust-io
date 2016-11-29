# Troubleshooting

You might run into some configuration or software problems when working with the frontendbuilder, here are some steps to make it work.

## Basics

 * Make sure you're not running `watch` or `prototype` while trying to build. This can lock some files.
 * Make a clean NPM install for command line - this will fix most issues with dependencies.
   * Clean npm cache with `npm cache clean`
   * Remove `node_modules` `rimraf ./node_modules` (install rimraf with `npm install rimraf -g`)
   * Run `npm install` again.
 * Check your npm version with `npm -v`, you should have at least 3.*.*.
 * If you installed `gulp` globally on an old version of npm and have updated you npm version afterwards you might need to re-install gulp globally.

## Other sorts of gotchas

### I'm getting: ```ENOENT: no such file or directory, chmod [...] \bin\ [...]```

This might be caused by a bug in an earlier version of the Pentia Builder.

When doing a Pentia Build, the builder will try to clean up ```bin``` folders. But it gets too greedy, also deleting files inside ```bin```-folders inside the ```node_modules``` folder.

We've corrected this behaviour in a newer release in the Pentia Builder which should take care of the issue you're experiencing.

**How to solve:**

 * Open up the ```project.build``` file in a text editor.
 * Find the ```<property name="build.version" value="x.y.zz" />```
 * Change it to (at least) ```<property name="build.version" value="3.5.22" />``` (You might need to check if there's a newer version, and use that instead)
 * Delete the node_modules folder in the root of the project - preferably by using [rimraf](https://www.npmjs.com/package/rimraf)

### Build returns with: ```The command "npm install" exited with code 9009"```

This usually occurs when nodejs hasn't been added correctly to PATH under system variables. Probably due to insufficient administrator privileges during nodejs installation.

**How to solve:**

Go to "Control Panel\System and Security\System" and press "Advanced system settings". Click "Environment Variables..." and find "PATH" in the "System Variables" section. The path to the nodejs installation dir should be listed inside this path - most commonly ```C:\Program Files\nodejs``` if it isn't there add it.

### I'm getting ```EPERM: operation not permitted, unlink [...]```

You're probably trying to build the project whilst having an active command line session running (maybe you're running a gulp server or a npm run frontend --task=prototype in PowerShell?)

The build is trying to touch the files that are currently open in the file system, so we need to close them.

**How to solve:**

 * Stop the running job in command line. Press CTRL + C a couple of times in the window where it's running.
 * Try doing the build again.

#### I'm getting: ```Error: spawn (cmd/powershell.exe) ENOENT```

```powershell
events.js:85
  throw er; // Unhandled 'error' event
        ^
Error: spawn cmd ENOENT
```

If you're getting an error message that looks like the one above, when you're running the build or the prototype it's probably because you haven't set sufficient folder paths inside your ```PATH```-variable.

**How to solve:**

 * Right click ```"This PC"``` and select ```"Properties > Advanced system settings > Environment variables"``` and insert the following for the ```PATH```-variable in the bottom area labelled ```"System variables"```:

 * C:\Windows\System32\

### I'm getting: ```'node'/'node-gyp' is not recognized as an internal or external command```

You probably haven't set the sufficient folder paths inside ```PATH```-variable.

**How to solve:**

 * Right click ```"This PC"``` and select ```"Properties > Advanced system settings > Environment variables"``` and insert the following for the ```PATH```-variable in the bottom area labelled ```"System variables"```:

 * ```<path to your node.js installation>```

 * Usually being:

 * ```C:\Program Files\nodejs```
 * 
 
### I'm getting: ```No gulpfile found``` but there is a gulpfile. 

NPM and gulp is using the wrong directory. This will break a lot of stuff, and it can be hard to find out what's wrong. Doing a `npm list --depth=0` will give you the current working dir and installed packages in this dir. This is useful for figuring out if you have this problem.

**How to solve:**

* Run `regedit`
* Check `HKEY_LOCAL_MACHINE\Software\Microsoft\Command Processor\AutoRun` and `HKEY_CURRENT_USER\Software\Microsoft\Command Processor\AutoRun`
* If you got any path set here, remove it. NPM and other node modules will use this as the working dir, and not the dir you are currently in. This gives strange results.

External Sources: [StackOverflow](http://stackoverflow.com/a/29561882/171087)
 
### I'm getting: ```npm WARN addRemoteGit error : not found git``` 

You're missing git or are unable to access data through the git-protocol.

**How to solve:**

Make sure that you've installed git, and that the path to it is in your PATH. Go [here](https://www.google.dk/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0ahUKEwjRyoqVhN7KAhVBqw4KHbnUARYQFggeMAA&url=https%3A%2F%2Fgit-scm.com%2F&usg=AFQjCNGjsRc2vATKpMMHsC4QXWApepLVig&sig2=a22h2mr21l81vGQuvFdUwQ) to download and install.

  * **Commands should be executed with administrator rights**

  * Select "Use Git and optional Unix tools from the Windows Command Prompt

  ![git-add-to-path](https://cloud.githubusercontent.com/assets/248851/10457533/212b82ac-71c7-11e5-87a2-09a32b3e3438.png)


  * Execute the following command afterwards in the command line:

  ```git config --global url."https://".insteadOf git://```

