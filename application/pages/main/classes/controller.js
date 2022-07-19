const path = require('path');

class MainPageController {

    static async renderMainPage(req, res) {
        res.sendFile(path.resolve('../rogorc/html/index.html'));
    }
}

module.exports = { MainPageController };