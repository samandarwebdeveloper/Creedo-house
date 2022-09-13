const model = require('./model');

module.exports = {
    GET: async(req, res) => {
        res.render('admin');
    },
    GET_ALL_BANKS: async(req, res) => {
        const banks = await model.allBanks();
        res.json(banks);
    },
    ADD_BANK: async(req, res) => {
        const { name, maxAmount, creditDeadline, starterAmount } = req.body;
        const file = req.file;
        const image = file.originalname;
        const bank = await model.addBank(name, image, maxAmount, creditDeadline, starterAmount);
        res.send(bank);
    },
    ALL_BUILDINGS: async(req, res) => {
        const buildings = await model.allBuildings();
        res.json(buildings);
    },
    ADD_BUILDING: async(req, res) => {
        const { name } = req.body;
        const file = req.file;
        const image = file.originalname;
        const building = await model.addBuilding(name, image);
        res.send(building);
    },
    ALL_COMPLEXES: async(req, res) => {
        const complexes = await model.allComplexes();
        res.json(complexes);
    },
    BUILDING_NAMES: async(req, res) => {
        const buildings = await model.buildingNames();
        res.json(buildings);
    },
    ADD_COMPLEX: async(req, res) => {
        const { name, address, buildingId } = req.body;
        const file = req.file;
        const image = file.originalname;
        const complex = await model.addComplex(name, address, buildingId, image);
        res.send(complex);
    },
    ALL_HOUSE: async(req, res) => {
        const houses = await model.allHouse();
        res.json(houses);
    },
    COMPEX_NAMES: async(req, res) => {
        const complexes = await model.compexNames();
        res.json(complexes);
    },
    ADD_HOUSE: async(req, res) => {
        const { amount, capacity, capacityPrice, complexId } = req.body;
        const house = await model.addHouse(amount, capacity, capacityPrice, complexId);
        res.send(house);
    }

}