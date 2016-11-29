# Avoid Long Methods

A method contains too many lines of code. Generally, any method longer than ten lines should make you start asking questions.

![Layers](/images/backend/code/long method.png)

## Treatment
As a rule of thumb, if you feel the need to comment on something inside a method, you should take this code and put it in a new method. Even a single line can and should be split off into a separate method, if it requires explanations. And if the method has a descriptive name, nobody will need to look at the code to see what it does.