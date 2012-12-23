var https = require('https');

var _API_LIMIT = 150,
    _API_LIMIT_CURRENT = 0;

/**
 * Create XboxApi object.
 *
 * @constructor
 */
var XboxApi = function XboxApi() {
    var _REQUESTS_LIMIT = 5,
        _GAMERTAG_ATTEMPTS = {};

    if (XboxApi.caller != XboxApi.getInstance) {
        throw new Error('A new instance can not be set for this object');
    }

    /**
     * Fetch JSON data.
     *
     * @param method - method to use (profile, ...)
     * @param params - parameters used to make https request
     * @param callback - callback function
     * @return {Error}
     */
    this.fetchDataFor = function (method, params, callback) {
        if (method) {
            if (params && typeof params === 'object') {
                limitCheck(function (err) {
                    if (err) {
                        callback(err);
                    } else {
                        switch (method) {
                            case 'profile':
                                profile(params, callback);
                                break;
                            case 'friends':
                                friends(params, callback);
                                break;
                            case 'games':
                                games(params, callback);
                                break;
                            case 'achievements':
                                achievements(params, callback);
                                break;
                            default:
                                callback(new Error('Method not found'));
                        }
                    }
                });
            } else {
                callback(new Error('Undefined JSON object'));
            }
        } else {
            callback(new Error('Undefined method'));
        }
    }

    /**
     * Fetch gamertag profile.
     *
     * @param params - parameters used to make https request
     * @param cb - callback function
     */
    function profile(params, cb) {
        if (params.gamertag) {
            var opts = {
                host:'xboxapi.com',
                path:'/profile/' + params.gamertag
            };

            console.log(_GAMERTAG_ATTEMPTS);

            if (_GAMERTAG_ATTEMPTS[params.gamertag + '.profile']) {
                var now = new Date().getTime();

                if (now >= (_GAMERTAG_ATTEMPTS[params.gamertag + '.profile'].date + (15 * 60 * 1000))) {
                    _GAMERTAG_ATTEMPTS[params.gamertag + '.profile'].attempts = 1;
                }

                if (_GAMERTAG_ATTEMPTS[params.gamertag + '.profile'].attempts < _REQUESTS_LIMIT) {
                    _GAMERTAG_ATTEMPTS[params.gamertag + '.profile'].attempts += 1;

                    makeHttpsRequest('profile', params, opts, cb);
                } else {
                    cb(new Error('Requests limit exceeded for this gamertag'));
                }
            } else {
                _GAMERTAG_ATTEMPTS[params.gamertag + '.profile'] = {
                    date:new Date().getTime(),
                    attempts:1
                };

                makeHttpsRequest('profile', params, opts, cb);
            }
        } else {
            cb(new Error('Undefined gamertag property'));
        }
    }

    /**
     * Fetch gamertag friends list.
     *
     * @param params  - parameters used to make https request
     * @param cb - callback function
     */
    function friends(params, cb) {
        if (params.gamertag) {
            var opts = {
                host:'xboxapi.com',
                path:'/friends/' + params.gamertag
            };

            console.log(_GAMERTAG_ATTEMPTS);

            if (_GAMERTAG_ATTEMPTS[params.gamertag + '.friends']) {
                var now = new Date().getTime();

                if (now >= (_GAMERTAG_ATTEMPTS[params.gamertag + '.friends'].date + (15 * 60 * 1000))) {
                    _GAMERTAG_ATTEMPTS[params.gamertag + '.friends'].attempts = 1;
                }

                if (_GAMERTAG_ATTEMPTS[params.gamertag + '.friends'].attempts < _REQUESTS_LIMIT) {
                    _GAMERTAG_ATTEMPTS[params.gamertag + '.friends'].attempts += 1;

                    makeHttpsRequest('friends', params, opts, cb);
                } else {
                    cb(new Error('Requests limit exceeded for this gamertag'));
                }
            } else {
                _GAMERTAG_ATTEMPTS[params.gamertag + '.friends'] = {
                    date:new Date().getTime(),
                    attempts:1
                };

                makeHttpsRequest('friends', params, opts, cb);
            }
        } else {
            cb(new Error('Undefined gamertag property'));
        }
    }

    /**
     * Fetch gamertag games list.
     *
     * @param params - parameters used to make https request
     * @param cb - callback function
     */
    function games(params, cb) {
        if (params.gamertag) {
            var opts = {
                host:'xboxapi.com',
                path:'/games/' + params.gamertag
            };

            console.log(_GAMERTAG_ATTEMPTS);

            if (_GAMERTAG_ATTEMPTS[params.gamertag + '.games']) {
                var now = new Date().getTime();

                if (now >= (_GAMERTAG_ATTEMPTS[params.gamertag + '.games'].date + (15 * 60 * 1000))) {
                    _GAMERTAG_ATTEMPTS[params.gamertag + '.games'].attempts = 1;
                }

                if (_GAMERTAG_ATTEMPTS[params.gamertag + '.games'].attempts < _REQUESTS_LIMIT) {
                    _GAMERTAG_ATTEMPTS[params.gamertag + '.games'].attempts += 1;

                    makeHttpsRequest('games', params, opts, cb);
                } else {
                    cb(new Error('Requests limit exceeded for this gamertag'));
                }
            } else {
                _GAMERTAG_ATTEMPTS[params.gamertag + '.games'] = {
                    date:new Date().getTime(),
                    attempts:1
                };

                makeHttpsRequest('games', params, opts, cb);
            }
        } else {
            cb(new Error('Undefined gamertag property'));
        }
    }

    /**
     * Fetch game achievements list for a gamertag.
     *
     * @param params - parameters used to make https request
     * @param cb - callback function
     */
    function achievements(params, cb) {
        if (params.gamertag && params.game_id) {
            var opts = {
                host:'xboxapi.com',
                path:'/achievements/' + params.game_id + '/' + params.gamertag
            };

            console.log(_GAMERTAG_ATTEMPTS);

            if (_GAMERTAG_ATTEMPTS[params.gamertag + '.achievements']) {
                var now = new Date().getTime();

                if (now >= (_GAMERTAG_ATTEMPTS[params.gamertag + '.achievements'].date + (15 * 60 * 1000))) {
                    _GAMERTAG_ATTEMPTS[params.gamertag + '.achievements'].attempts = 1;
                }

                if (_GAMERTAG_ATTEMPTS[params.gamertag + '.achievements'].attempts < _REQUESTS_LIMIT) {
                    _GAMERTAG_ATTEMPTS[params.gamertag + '.achievements'].attempts += 1;

                    makeHttpsRequest('achievements', params, opts, cb);
                } else {
                    cb(new Error('Requests limit exceeded for this gamertag'));
                }
            } else {
                _GAMERTAG_ATTEMPTS[params.gamertag + '.achievements'] = {
                    date:new Date().getTime(),
                    attempts:1
                };

                makeHttpsRequest('achievements', params, opts, cb);
            }
        } else {
            cb(new Error('Undefined gamertag and/or game_id properties'));
        }
    }

    /**
     * Make an HTTPS request.
     *
     * @param fn - function to call when an error occurs
     * @param params - parameters used to make https request
     * @param opts - https header options
     * @param cb - callback function
     */
    function makeHttpsRequest(fn, params, opts, cb) {
        var req = https.request(opts, function (res) {
            var data = '';

            res.on('data', function (chunk) {
                data += chunk;
            });

            res.on('end', function () {
                try {
                    var json = JSON.parse(data);

                    if (json.Success == true) {
                        cb(null, json);
                    } else {
                        switch (fn) {
                            case 'profile':
                                profile(params, cb);
                                break;
                            case 'friends':
                                friends(params, cb);
                                break;
                            case 'games':
                                games(params, cb);
                                break;
                            case 'achievements':
                                achievements(params, cb);
                                break;
                            default:
                                cb(new Error('Function not found'));
                        }
                    }
                } catch (e) {
                    switch (fn) {
                        case 'profile':
                            profile(params, cb);
                            break;
                        case 'friends':
                            friends(params, cb);
                            break;
                        case 'games':
                            games(params, cb);
                            break;
                        case 'achievements':
                            achievements(params, cb);
                            break;
                        default:
                            cb(new Error('Function not found'));
                    }
                }
            });

            res.on('error', function (err) {
                switch (fn) {
                    case 'profile':
                        profile(params, cb);
                        break;
                    case 'friends':
                        friends(params, cb);
                        break;
                    case 'games':
                        games(params, cb);
                        break;
                    case 'achievements':
                        achievements(params, cb);
                        break;
                    default:
                        cb(new Error('Function not found'));
                }
            });
        });

        req.on('error', function (err) {
            switch (fn) {
                case 'profile':
                    profile(params, cb);
                    break;
                case 'friends':
                    friends(params, cb);
                    break;
                case 'games':
                    games(params, cb);
                    break;
                case 'achievements':
                    achievements(params, cb);
                    break;
                default:
                    cb(new Error('Function not found'));
            }
        });

        req.end();
    }

    /**
     * Check if API limit exceeded.
     *
     * @param cb - callback function
     */
    function limitCheck(cb) {
        var req = https.request({host:'xboxapi.com', path:'/limit'}, function (res) {
            var data = '';

            res.on('data', function (chunk) {
                data += chunk;
            });

            res.on('end', function () {
                var limit = data.split('/');

                _API_LIMIT_CURRENT = parseInt(limit[0]);
                _API_LIMIT = parseInt(limit[1]);

                _API_LIMIT_CURRENT < _API_LIMIT ? cb() : cb(new Error('API limit exceeded'));
            });

            res.on('error', function (err) {
                cb(err);
            });
        });

        req.on('error', function (err) {
            cb(err);
        });

        req.end();
    }
}

XboxApi.instance = null;

/**
 * Return or create an instance of XboxApi.
 *
 * @return {*}
 */
XboxApi.getInstance = function () {
    if (this.instance === null) {
        this.instance = new XboxApi();
    }

    return this.instance;
}

module.exports = XboxApi.getInstance();