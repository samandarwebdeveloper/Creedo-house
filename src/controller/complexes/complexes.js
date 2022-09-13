const model = require('./model');

module.exports = {
    GET: async(req, res) => {
        try {
            const { id } = req.params;
            const complexes = await model.complexes(id);
            res.json(complexes);
        } catch (error) {
            res.status(500).json({ error });
        }
    },
    GET_BY_ID: async(req, res) => {
        const { id } = req.params;
        const complex = await model.complexId(id);
        res.json(complex);
    }
}