const model = require('./model');

module.exports = {
    GET: async(req, res) => {
        try {
            const { id } = req.params;
            const houses = await model.houses(id);
            res.json(houses);
        } catch (error) {
            res.status(500).json({ error });
        }
    },
    GET_BY_ID: async(req, res) => {
        try {
            const { id } = req.params;
            const house = await model.houseId(id);
            res.json(house);    
        } catch (error) {
            res.status(500).json({ error });
        }
    }
}