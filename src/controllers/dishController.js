const uuid = require('uuid');
const path = require("path");
const ApiError = require('../classes/ApiError');

const { Dish } = require('../models/models');

class dishController {

    async createDish(req, res, next) {

        try {
            const {name, price, type_id, description} = req.body;
            const { img } = req.files;
            console.log(req.files);
            let fileName = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, '..', 'static', fileName));
            const dish = await Dish.create({name, price, type_id, description, img: fileName});
            return res.json(dish);  
        } catch (err) {
            next(ApiError.internalError(err.message));
        }

    }

    async getAllDish(req, res) {

    }

    async getOneDish(req, res) {
        
    }

    async deleteDish(req, res) {

    }
}

module.exports = new dishController();