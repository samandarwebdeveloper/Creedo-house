const model = require('./model');

module.exports = {
    PERIOD_GET: async(req, res) => {
        try {
            const period = await model.period();
            res.json(period);
        } catch (error) {
            res.status(500).json({ error });
        }
    },
    GET: async(req, res) => {
        try {
            const { period, amount } = req.body
            const bank = await model.banks(period, amount);
            res.json(bank);
        } catch (error) {
            res.status(500).json({ error });
        }
    }
}