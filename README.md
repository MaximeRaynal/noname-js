noname-js
=========
A javascript "framework" so tiny and so simple that it does not deserve a name.

Actually they are 3 modules :

- HttpRequest
- Template
- Routing

You can find simpeexample in the `examples`folder.

HttpRequest
---
A simple module to make (and debug) ajax request easyer. With cool feature like :

- Display request error in new tab
- Cache protection
- Chaining
- Uniform callback

Template
---
A very light template engine. Based on string remplacement.
The goal is to simplify "composant" creation, for exemple when use ajax data to create DOM Element.
Not for big templates, no compilation, no functions.
Only access to passed variables and not found value.

Routing
---
Allow to call a callback when the hash change and match with a regex.
Just associate a callback and a regex pattern, if hash change and match to our pattern,
the callback is called passing regex comparaison result (if you use capture group).
