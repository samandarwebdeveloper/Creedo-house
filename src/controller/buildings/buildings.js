const model = require('./model');

module.exports = {
    GET: async(req, res) => {
        const buildings = await model.buildings();
        res.render('index', { buildings });
    },
    GET_BY_ID: async(req, res) => {
        const { id } = req.params;
        const buildings = await model.buildingId(id);
        res.json(buildings);
    }
}