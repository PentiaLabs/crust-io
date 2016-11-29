# Stability

Code stability is a way of expressing how likely it is that the code or it’s interfaces will change over time.

## How to determine the stability of a [module](/Home/Backend/Modular%20Architecture/Module)

Determining how a module will change over time, hence determining its stability and which layer it belongs to is not easy.

In general, it comes down to experience and also a useful tool is to look across a number of websites and check out how much the feature differs from website to website.

For example, Design it varies a lot across websites, therefore Design is not very stable and there is a high probability of change over time. 
In addition, it is project specific, concreate implementation (and therefore not abstract or general) and it depends on all modules; so it belongs in the Project layer, which is the most volatile. 

> Rule of thumb - If in doubt, assume it is **not** stable and place the module in the feature layer.


