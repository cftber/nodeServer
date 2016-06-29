/**
 * Created by tgzhao on 2016/6/28.
 */
var redisClient = require('../util/redisClient');
var restful = require('../util/restful');
var config = require('../config');
var async = require('async');

/**
 * 生成订单
 * 多层嵌套回调
 */
exports.createOrder = function(req, res) {
    var order = req.body;
    console.log(JSON.stringify(order));
    redisClient.incrItem('orderid', function (err, reply) {
        if (err) {
            res.send(err);
        } else {
            order.orderid = reply;
            console.log(JSON.stringify(order));
            new restful({url: config.ordercenterurl}).invoke(JSON.stringify(order), function(err, res) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(JSON.stringify(res));
                }
            });
            res.send(JSON.stringify(order));
        }
    });
}

exports.createOrder2 = function(req, res) {
    var order = req.body;
    console.log(JSON.stringify(order));
    createOrderid(order, res, saveOrderinfo);
}

function createOrderid(order, res, callback) {
    //redisClient.getItem('aa', redisClient.print);
    console.log(callback);
    redisClient.incrItem('orderid', function (err, reply) {
        console.log(callback);
       if (err) {
           handleError(err, res);
           return;
       }
        callback(order, res, reply, cacheOrderinfo);
    });
}

function saveOrderinfo(order, res, orderid, callback) {
    order.orderid = orderid;
    new restful({url: config.ordercenterurl}).invoke(JSON.stringify(order), function(err, reply) {
        if (err) {
            handleError(err, res);
            return;
        }
        callback(order, res);
    });
}

function cacheOrderinfo(order, res) {
    redisClient.setItem('orderinfo:' + order.orderid, JSON.stringify(order), null, function(err, reply) {
       if (err) {
           handleError(err, res);
       }
        res.json(order);
    });
}

exports.createOrder3 = function(req, res) {
    var order = req.body;
    console.log(JSON.stringify(order));
    redisClient.incrItem('orderid', function(err, reply) {
        if (err) {
            handleError(err, res);
        } else {
            saveOrderInfo(reply, order, res, replyOrderInfo);
        }
    });
}

function saveOrderInfo(reply, order, res, callback) {
    order.orderid = reply;
    new restful({url: config.ordercenterurl}).invoke(JSON.stringify(order), function(err, resp) {
        if (err) {
            handleError(err, res);
        } else {
            callback(null, resp, res);
        }
    });
}

function replyOrderInfo(err, order, res) {
    res.send(JSON.stringify(order));
}

function handleError(err, res) {
    console.log('err:' + err);
    res.send(err);
}



exports.createOrder4 = function(req, res) {
    var order = req.body;
    async.waterfall([
        function(cb) {
            redisClient.incrItem('orderid', function(err, orderid){
                cb(null, orderid);
            });
        },
        function(orderid, cb) {
            console.log('orderid' + orderid);
            order.orderid = orderid;
            //new orderid();
            cb('throw err')
            new restful({url: config.ordercenterurl})
                .invoke(JSON.stringify(order), function(err, resp) {
               if (err) {
                   cb(err);
               } else {
                   cb(null, resp);
               }
            });
        },
        function(orderinfo, cb) {
            console.log(orderinfo);
            res.send(JSON.stringify(orderinfo));
            res.end();
        }
    ], function(err, result) {
        if(err) {
            res.send(err);
            res.end();
        }
    });
}