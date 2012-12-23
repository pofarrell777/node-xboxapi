#node-xboxapi

A Node.js module for interfacing with the <a href="https://xboxapi.com/">Unofficial XBOX Api</a>

##Installation

```
$ npm install node-xboxapi
```

##Usage

**IMPORTANT**:

* There is a limit of requests per hour (default to 150).
* This limit can change.
* Also, there is a limit of requests attempts (default to 5) to avoid an IP ban from xboxapi.com.

####Load in the module

```
var uxa = require('node-xboxapi');
```

####Retrieve user profile

```
uxa.fetchDataFor('profile', { gamertag:'fallenbe' }, function(data, err)
{
    if (err) {
        // do something
    } else {
        // do something
    }
});
```

####Retrieve user friends list

```
uxa.fetchDataFor('friends', { gamertag:'fallenbe' }, function(data, err) { … });
```

####Retrieve user games list

```
uxa.fetchDataFor('games', { gamertag:'fallenbe' }, function(data, err) { … });
```

####Retrieve game achievements list

```
uxa.fetchDataFor('achievements', { gamertag:'fallenbe', game_id:1414793202 }, function(data, err) { … });
```

##Credits

Thanks to: [Alan Wynn](https://github.com/djekl)

##Changelog

0.1.4:

* Used the callback limit to check if we can make a request, if not send en error message
* Removed the limit check when we received the JSON data
* Check if we received the JSON data with success, if not retry until we block the gamertag request
* Block only a gamertag (for 15 minutes) when he tried to make the same request more than 5 times

0.1.3:

* Added `_API_LIMIT` and `_API_LIMIT_CURRENT` as global variables. These variables will be updated after each request with `api_limit` response text.
* Added `_REQUESTS_LIMIT` and `_GAMERTAG_ATTEMPTS`. Each gamertag for each method can make 5 requests max when there is an error. If the gamertag attempts for one method has exceeded, you must wait for `1 hour` before make new requests.

0.1.2:

* Only change the module version (Major.Minor.Patch).

0.0.2:

* `_api_limit` global variable removed because this limit can change.
* Unified the HTTPS request in one private function.
* Updated READMED.md

0.0.1:

* Well I just created this module.