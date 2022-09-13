const { fetch, fetchAll } = require('../../lib/postgres')

const ALL_BUILDINGS = `
    SELECT * FROM buildings
`

const BUILDING_BY_ID = `
    SELECT * FROM buildings WHERE building_id = $1
`

const buildings = () => fetchAll(ALL_BUILDINGS)
const buildingId = (id) => fetch(BUILDING_BY_ID, id)

module.exports = {
    buildings,
    buildingId
}