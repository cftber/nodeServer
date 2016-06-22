/**
 * Created by tgzhao on 16/6/22.
 */

exports.payOrder = function (req, res, next) {
    var order = {orderId: 12323, orderDesc: "order desc"};
    res.json(order);
}