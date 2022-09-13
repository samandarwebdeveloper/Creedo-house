const { fetch, fetchAll } = require('../../lib/postgres')

const PERIOD = `
    SELECT 
        DISTINCT bank_credit_deadline
    FROM 
        banks
`

const BANKS = `
    SELECT
        *
    FROM
        banks   
    WHERE
        bank_credit_deadline = $1 
    AND
        bank_max_amount >= $2
    ORDER BY
        bank_max_amount
`

const period = () => fetchAll(PERIOD)
const banks = (period, amount) => fetch(BANKS, period, amount)

module.exports = {
    period,
    banks
}