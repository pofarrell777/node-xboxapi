#node-xboxapi

A Node.js module for interfacing with the <a href="https://xboxapi.com/">Unofficial XBOX Api</a>

##Installation
===

```
$ npm install node-xboxapi
```

##Usage
===

**IMPORTANT**: There is a limit of 150 requests per hour

####Load in the module

```javascript
var uxa = require('node-xboxapi');
```

####Retrieve user profile

```javascript
uxa.profile('fallenbe', function(data, err)
{
    if (err) {
        // do something when en error occured
    } else {
        // do something when there is no error
    }
});
```

####Retrieve user friends list

```
uxa.friends('fallenbe', function(data, err)
{
 if (err)
 {
  // do something with err object
 }
 else
 {
  // do something with data
 }
});
```

####Retrieve user games list

```
uxa.games('fallenbe', function(data, err)
{
 if (err)
 {
  // do something with err object
 }
 else
 {
  // do something with data
 }
});
```

####Retrieve game achievements list

```
uxa.achievements('fallenbe', '1414793202', function(data, err)
{
 if (err)
 {
  // do something with err object
 }
 else
 {
  // do something with data
 }
});
```

##Changelog
===

0.0.1:

* Well I just created this module.
