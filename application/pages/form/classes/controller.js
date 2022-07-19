const path = require('path');

class OrderPageController {

    static async renderOrderPage(req, res) {
        res.sendFile(path.resolve('../rogorc/html/form.html'));
    }
}

module.exports = { OrderPageController };