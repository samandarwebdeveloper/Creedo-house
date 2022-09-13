const { fetch, fetchAll } = require('../../lib/postgres')

const HOUSES = `
    SELECT * FROM rooms WHERE complex_id = $1
`

const HOUSE_BY_ID = `
    SELECT * FROM rooms WHERE room_id = $1
`

const houses = (id) => fetchAll(HOUSES, id)
const houseId = (id) => fetch(HOUSE_BY_ID, id)

module.exports = {
    houses,
    houseId
}