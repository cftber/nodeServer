/**
 * Created by tgzhao on 16/6/22.
 */
var redisClient = require("../util/redisClient");

exports.payOrder = function (req, res, next) {
    var order = {orderId: 12323, orderDesc: "order desc"};
    console.log(JSON.stringify(order));
    redisClient.setItem("orderinfo", JSON.stringify(order), null, function (err, result) {
        if (err) {
            res.json(err);
        }
    })

    redisClient.getItem("orderinfo", function (err, result) {
        if (err) {
            res.json(err);
        }
        else {
            console.log(result);
            res.send(result);
            // res.json(JSON.parse(result));
        }
    })
    // res.json(order);
}