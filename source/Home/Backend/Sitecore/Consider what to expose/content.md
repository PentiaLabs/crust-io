# Consider what to expose

Consider if web services or test pages should be exposed in production environments, and if so how to secure them.

## Secure Sitecore applications and dialogs

Inherit from Sitecore.Shell.Web.UI.**SecurePage** when creating Sitecore dialogs or applications.

Use [Sitecore Services](https://sitecorecontextitem.wordpress.com/2015/01/07/what-is-sitecore-services-client/) where fine grain security is required for access to REST API's. 

