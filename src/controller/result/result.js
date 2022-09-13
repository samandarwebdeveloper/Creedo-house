const model = require('./model');

module.exports = {
    POST: async(req, res) => {
        const { credit_duration, id } = req.body;
        const result = await model.result(credit_duration, id);
        res.json(result);
    }
}