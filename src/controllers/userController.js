const ApiError = require('../classes/ApiError');

class userController {

    async signUp(req, res) {

    }

    async signIn(req, res) {

    }

    async authCheck(req, res, next) {
        const {id} = req.query;
        if (!id) {
            return next(ApiError.fordidden('Aboba')); // Test
        }
        res.json(id);
    }
}

module.exports = new userController();