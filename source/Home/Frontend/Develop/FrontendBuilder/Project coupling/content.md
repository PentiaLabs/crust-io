1. Create a package.json file in the root of the project folder. Please use the following sample:

```
{
  "name": "Project Name",
  "scripts": {
    "frontend": "frontend-builder"
  }
}
```

2. Install the frontend-builder with `npm install frontend-builder --save --no-optional`, this will save it as a dependency, for this project.

3. Run the builder (go to "Running the builder") - the first run will create a ```project-context.json``` file wherein the project file paths should be provided.
4. Adjust the paths in the `project-context.json` to the paths for the assets in your solution.

The complete project-context.json configuration reference.