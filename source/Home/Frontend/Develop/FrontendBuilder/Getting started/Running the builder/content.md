# Running the builder

To be able to run the builder on a day-to-day development basis, you need to execute the following command:

```powershell
npm run frontend --task=[task] --env=[configuration]
```

So if you want to run the ```build``` task in ```debug```-configuration, you would write:

```powershell
npm run frontend --task=build --env=debug
```

Remember that you're able to run a production targeted build of frontend resources in your own development environment. The only thing to do is to switch out the ```--env``` flag:

```powershell
npm run frontend --task=build --env=production
```

This will come in handy to make sure that everything that you're building will also work come launch day, when all the scripting and styling is concatinated and uglified. Due dilligence!


## Prototype

The frontend-builder has the ability to make a prototype for use based on [nunjucks templates](http://mozilla.github.io/nunjucks/), and JSON data.

More documentation on this will come in the future. For now just understand that you can run the prototype tool by executing the following command:

```powershell
npm run frontend --task=prototype
```

## Sitecore website development

The frontend-builder has the ability to run browsersync while developing directly on the sitecore website locally.

When running the following command all your assets will be processed and browsersync is activated on the IIS defined url

```powershell
npm run frontend --task=sitecore --env=debug
```
You have to set following values in your project-context.json as you please:

```json
"sitecore": {
    "url": "url-to-localhost",
    "port": "4000",
    "reloadDelay": "200"
  }
```