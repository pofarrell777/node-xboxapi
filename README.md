#node-xboxapi

A Node.js module for interfacing with the <a href="https://xboxapi.com/">Unofficial XBOX Api</a>

##Installation
===

```
$ npm install node-xboxapi
```

##Usage
===

**IMPORTANT**:

* There is a limit of requests per day
* This limit can change

####Load in the module

```
var uxa = require('node-xboxapi');
```

####Retrieve user profile
#####Parameters
* gamertag
* callback

```
uxa.profile('fallenbe', function(data, err)
{
    if (err) {
        // do something
    } else {
        // do something
    }
});
```

####Retrieve user friends list
#####Parameters
* gamertag
* callback

```
uxa.friends('fallenbe', function(data, err) { … });
```

####Retrieve user games list
#####Parameters
* gamertag
* callback

```
uxa.games('fallenbe', function(data, err) { … });
```

####Retrieve game achievements list
#####Parameters
* gamertag
* game_id
* callback

```
uxa.achievements('fallenbe', '1414793202', function(data, err) { … });
```

##Changelog
===
0.1.2:

* Only change the module version (Major.Minor.Patch).

0.0.2:

* `_api_limit` global variable removed because this limit can change.
* Unified the HTTPS request in one private function.
* Updated READMED.md

0.0.1:

* Well I just created this module.