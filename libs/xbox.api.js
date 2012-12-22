/**
 * Required modules.
 */
var https = require('https');


/**
 * @constructor
 */
var XboxApi = function XboxApi() {

    /**
     * Retrieve the profile for a gamertag.
     *
     * @param gamertag
     * @param callback
     */
    this.profile = function (gamertag, callback) {
        if (gamertag) {
            var opts = {
                host:'xboxapi.com',
                path:'/profile/' + gamertag
            };

            fetchData(opts, function (data, err) {
                if (err) {
                    callback(null, err);
                } else {
                    callback(data, null);
                }
            });
        }
        else {
            callback(null, new Error('Undefined gamertag'));
        }
    }


    /**
     * retrieve the friend list for a gamertag.
     *
     * @param gamertag
     * @param callback
     */
    this.friends = function (gamertag, callback) {
        if (gamertag) {
            var opts = {
                host:'xboxapi.com',
                path:'/friends/' + gamertag
            };

            fetchData(opts, function (data, err) {
                if (err) {
                    callback(null, err);
                } else {
                    callback(data, null);
                }
            });
        }
        else {
            callback(null, new Error('Undefined gamertag'));
        }
    }


    /**
     * Retrieve the game list for a gamertag.
     *
     * @param gamertag
     * @param callback
     */
    this.games = function (gamertag, callback) {
        if (gamertag) {
            var opts = {
                host:'xboxapi.com',
                path:'/games/' + gamertag
            };

            fetchData(opts, function (data, err) {
                if (err) {
                    callback(null, err);
                } else {
                    callback(data, null);
                }
            });
        }
        else {
            callback(null, new Error('Undefined gamertag'));
        }
    }


    /**
     * Retrieve the achievement list of a game for a gamertag.
     *
     * @param gamertag
     * @param gameId
     * @param callback
     */
    this.achievements = function (gamertag, gameId, callback) {
        if (gamertag) {
            if (gameId) {
                var opts = {
                    host:'xboxapi.com',
                    path:'/achievements/' + gameId + '/' + gamertag
                };

                fetchData(opts, function (data, err) {
                    if (err) {
                        callback(null, err);
                    } else {
                        callback(data, null);
                    }
                });
            } else {
                callback(null, new Error('Undefined game ID'));
            }
        } else {
            callback(null, new Error('Undefined gamertag'));
        }
    }


    /**
     * Fetch the JSON data from xboxapi.com.
     *
     * @param opts
     * @param callback
     */
    function fetchData(opts, callback) {
        var req = https.request(opts, function (res) {
            var data = '';

            res.on('data', function (chunk) {
                data += chunk;
            });

            res.on('end', function () {
                try {
                    var json = JSON.parse(data);

                    if (limitCheck(json.API_Limit)) {
                        if (json.Success == true) {
                            callback(json, null);
                        } else {
                            callback(null, json.Error);
                        }
                    } else {
                        callback(null, new Error('API Limit has been reached'));
                    }
                }
                catch (e) {
                    callback(null, e);
                }
            });

            res.on('error', function (err) {
                callback(null, err);
            });
        });

        req.on('error', function (err) {
            callback(null, err);
        });

        req.end();
    }


    /**
     * Check if the limit of requests per hour is reached.
     *
     * @param apiLimit
     * @return {Boolean}
     */
    function limitCheck(apiLimit) {
        var result = apiLimit.split('/');

        var current = parseInt(result[0]),
            limit = parseInt(result[1]);

        return current < limit;
    }


    // Check if we try to create a new instance
    if (XboxApi.caller != XboxApi.getInstance) {
        throw new Error('A new instance can not be set for this object');
    }
}


XboxApi.instance = null;


/**
 * Create or retrieve the scraper instance.
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