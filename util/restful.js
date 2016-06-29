/**
 * Created by tgzhao on 2016/6/28.
 */
var http = require('http');
var url = require('url');

var Restful = function(opts) {
    this._init(opts);
}

Restful.prototype._init = function(opts) {
    var _this = this;
    if (!opts.url) {
        return;
    }
    this.url = opts.url;
}

Restful.prototype._getReqOpts = function() {
    var reqOpts=url.parse(this.url);
    reqOpts.method='POST';
    reqOpts.headers={
        'Content-Type':'application/json'
    };
    return reqOpts;
}

Restful.prototype.invoke = function(data, callback) {
    var reqOpts = this._getReqOpts();
    var req = http.request(reqOpts, function(res) {
        var ret = [];
        res.on('error', function() {
            callback('Error service response');
        });

        res.on('data', function(buff) {
            ret.push(buff);
        });

        res.on('end', function() {
            ret = Buffer.concat(ret).toString();
            try{
                ret = JSON.parse(ret);
            } catch (e) {
                callback('Error parse response');
                return;
            }
            callback(null, ret);
        });
    });

    req.on('error', function() {
        callback('error sevcie request');
    });
    req.write(data);
    req.end();
}

module.exports = Restful;