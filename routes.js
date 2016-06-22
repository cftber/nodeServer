/**
 * Created by tgzhao on 16/6/22.
 */

exports.setRequestUrl = function (app) {
    var payService = require("./controllers/payServices");

    app.post("/payorder", payService.payOrder);

}