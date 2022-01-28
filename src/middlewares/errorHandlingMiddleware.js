const ApiError = require("../classes/ApiError");

module.exports = function (err, req, res, next) {
    if (err instanceof ApiError) {
        return res.json(err.status).json(err.message);
    }
    return res.status(500).json({message: "Непредвиденная ошибка"});
}