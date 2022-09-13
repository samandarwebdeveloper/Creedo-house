const { fetch, fetchAll } = require('../../lib/postgres')

const ALL_BANKS = `
    SELECT * FROM banks
`

const ADD_BANK = `
    INSERT INTO
        banks(bank_name, bank_image, bank_max_amount, bank_credit_deadline, bank_starter_amount)
    VALUES
        ($1, $2, $3, $4, $5)
    RETURNING
        *
`

const ALL_BUILDINGS = `
    SELECT * FROM buildings
`

const ADD_BUILDING = `
    INSERT INTO
        buildings(building_name, building_image)
    VALUES
        ($1, $2)
    RETURNING
        *
`

const BUILDING_NAMES = `
    SELECT 
        building_id,
        building_name
    FROM
        buildings
`

const ALL_COMPLEXES = `
    SELECT 
        c.complex_name AS complex_name,
        c.complex_image AS complex_image,
        c.complex_id AS complex_id,
        c.complex_address AS complex_address,
        b.building_name AS building_name
    FROM 
        complexes c
    JOIN
        buildings b
    ON
        c.building_id = b.building_id
`

const ADD_COMPLEX = `
    INSERT INTO
        complexes(complex_name, complex_address, building_id, complex_image)
    VALUES
        ($1, $2, $3, $4)
    RETURNING
        *
`

const ALL_HOUSE = `
    SELECT
        r.room_id AS room_id,
        r.room_amount AS room_amount,
        r.room_capacity AS room_capacity,
        r.room_capacity_price AS room_capacity_price,
        c.complex_name AS complex_name,
        c.complex_address AS complex_address,
        c.complex_image AS complex_image
    FROM
        rooms r
    JOIN
        complexes c
    ON
        r.complex_id = c.complex_id
`

const COMPEX_NAMES = `
    SELECT DISTINCT
        complex_id,
        complex_name
    FROM
        complexes
`

const ADD_HOUSE = `
    INSERT INTO
        rooms(room_amount, room_capacity, room_capacity_price, complex_id)
    VALUES
        ($1, $2, $3, $4)
    RETURNING
        *
`

const allBanks = () => fetchAll(ALL_BANKS)
const addBank = (name, image, maxAmount, creditDeadline, starterAmount) => fetch(ADD_BANK, name, image, maxAmount, creditDeadline, starterAmount)
const allBuildings = () => fetchAll(ALL_BUILDINGS)
const addBuilding = (name, image) => fetch(ADD_BUILDING, name, image)
const allComplexes = () => fetchAll(ALL_COMPLEXES)
const buildingNames = () => fetchAll(BUILDING_NAMES)
const addComplex = (name, address, buildingId, image) => fetch(ADD_COMPLEX, name, address, buildingId, image)
const allHouse = () => fetchAll(ALL_HOUSE)
const compexNames = () => fetchAll(COMPEX_NAMES)
const addHouse = (amount, capacity, capacityPrice, complexId) => fetch(ADD_HOUSE, amount, capacity, capacityPrice, complexId)

module.exports = {
    allBanks,
    addBank,
    allBuildings,
    addBuilding,
    allComplexes,
    buildingNames,
    addComplex,
    allHouse,
    compexNames,
    addHouse
}