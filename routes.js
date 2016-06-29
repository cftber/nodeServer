/**
 * Created by tgzhao on 16/6/22.
 */

exports.setRequestUrl = function (app) {
    var payService = require("./controllers/payServices"),
        orderService = require('./controllers/orderservice');

    app.post("/payorder", payService.payOrder);
    app.post('/createorder', orderService.createOrder);
    app.post('/createorder2', orderService.createOrder4);
}