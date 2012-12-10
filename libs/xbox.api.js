var https = require('https');

var XboxApi = function XboxApi() {
    var _api_limit = 150;

    this.profile = function (gamertag, callback) {
        if (gamertag) {
            var opts = {
                host:'xboxapi.com',
                path:'/profile/' + gamertag
            };

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
                                callback(json);
                            } else {
                                callback(null, json.Error);
                            }
                        } else {
                            callback(null, new Error('API Limit has been reached'));
                        }
                    }
                    catch (e) {
                        callback(e);
                    }
                });
            });

            req.on('error', function (err) {
                callback(null, err);
            });

            req.end();
        }
        else {
            callback(null, new Error('Undefined gamertag'));
        }
    }

    this.friends = function (gamertag, callback) {
        if (gamertag) {
            var opts = {
                host:'xboxapi.com',
                path:'/friends/' + gamertag
            };

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
                                callback(json);
                            } else {
                                callback(null, json.Error);
                            }
                        } else {
                            callback(null, new Error('API Limit has been reached'));
                        }
                    }
                    catch (e) {
                        callback(e);
                    }
                });
            });

            req.on('error', function (err) {
                callback(null, err);
            });

            req.end();
        }
        else {
            callback(null, new Error('Undefined gamertag'));
        }
    }

    this.games = function (gamertag, callback) {
        if (gamertag) {
            var opts = {
                host:'xboxapi.com',
                path:'/games/' + gamertag
            };

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
                                callback(json);
                            } else {
                                callback(null, json.Error);
                            }
                        } else {
                            callback(null, new Error('API Limit has been reached'));
                        }
                    }
                    catch (e) {
                        callback(e);
                    }
                });
            });

            req.on('error', function (err) {
                callback(null, err);
            });

            req.end();
        }
        else {
            callback(null, new Error('Undefined gamertag'));
        }
    }

    this.achievements = function (gamertag, game, callback) {
        if (gamertag) {
            if (game) {
                var opts = {
                    host:'xboxapi.com',
                    path:'/achievements/' + game + '/' + gamertag
                };

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
                                    callback(json);
                                } else {
                                    callback(null, json.Error);
                                }
                            } else {
                                callback(null, new Error('API Limit has been reached'));
                            }
                        }
                        catch (e) {
                            callback(e);
                        }
                    });
                });

                req.on('error', function (err) {
                    callback(null, err);
                });

                req.end();
            } else {
                callback(null, new Error('Undefined game ID'));
            }
        }
        else {
            callback(null, new Error('Undefined gamertag'));
        }
    }

    function limitCheck(limit) {
        var result = limit.split('/');

        var value = parseInt(result[0]);

        return value < _api_limit;
    }

    if (XboxApi.caller != XboxApi.getInstance) {
        throw new Error('A new instance can not be set for this object');
    }
}

XboxApi.instance = null;

XboxApi.getInstance = function () {
    if (this.instance === null) {
        this.instance = new XboxApi();
    }

    return this.instance;
}

module.exports = XboxApi.getInstance();