const { fetch, fetchAll } = require('../../lib/postgres')

const COMPLEXES_BY_ID = `
    SELECT * FROM complexes WHERE complex_id = $1
`

const ALL_COMPLEXES = `
    SELECT * FROM complexes WHERE building_id = $1
`

const complexes = (id) => fetchAll(ALL_COMPLEXES, id)
const complexId = (id) => fetch(COMPLEXES_BY_ID, id)

module.exports = {
    complexes,
    complexId
}