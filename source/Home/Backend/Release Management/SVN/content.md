# SVN - Release Management 

With SVN there are 3 main concepts [**Trunk**, **Braches** and **Tags**](http://blogs.wandisco.com/2011/10/26/what-do-%E2%80%98trunk%E2%80%99-%E2%80%98branch%E2%80%99-and-%E2%80%98tag%E2%80%99-really-mean/). 
We use Branches and Tags to track what version of the code is deployed and to which environment.

![Example](/images/backend/release management/branches.png) 

## Trunk
The trunk is the main line of development in Pentia **SVN** repository, ideally the majority of devlopement is done in the trunk. 



## Test (or Release) Branch

When we are ready to deploy, we create a **Test (or Release) Branch** and devlopement continues in the trunk.

![**Test (or Release) Branch**](/images/backend/release management/createbranch.png) 

**Test (or Release) Branch** is required as bug fixes in the test must not affect the development process for the next release in trunk and or changes in the development truck must not affect the deployment.

- Test (or Release) Branch is **always** created from the trunk.
- Releases to production as a major version. 
- All changes made in the Test (or Release) Branch are merged back into the trunk.
  - Idealy there are no bugs or changes are required.
  - If a lot of bugs are identified the release should be aborted.



## Tags

When test is completed and we are ready to deploy to production we create a new *Tag*. 

![Test (or Release) Branch](/images/backend/release management/createtag.png)

A tag in SVN is just a branch that has an ancestor called tags, by convention a tag is read only and you cannot commit to the tag.

## Hotfix Branch

A Hotfix Branch is created when we have to fix a bug in production, without deploying all the changes since the last deployment.

![Hotfix Branch](/images/backend/release management/createhotfix.png)


- The Hotfix Branch branch is created from the latest release tag
- Releases to production as a minor version
- Merges the bug fix into the trunk
