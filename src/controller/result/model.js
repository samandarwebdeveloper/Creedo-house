const { fetch, fetchAll } = require('../../lib/postgres')

const RESULT = `
    SELECT 
        r.room_capacity * r.room_capacity_price AS room_price,
        r.room_capacity * r.room_capacity_price / 100 * b.bank_starter_amount AS starter_amount,
        ((r.room_capacity * r.room_capacity_price) - (r.room_capacity * r.room_capacity_price / 100 * b.bank_starter_amount)) / (b.bank_credit_deadline * 12) AS monthly_payment,
        b.bank_credit_deadline AS payment_duration,
        b.bank_name
    FROM rooms r
    JOIN banks b
        ON b.bank_credit_deadline = $1
    WHERE 
        r.room_id = $2
    AND
        b.bank_max_amount >= (r.room_capacity * r.room_capacity_price)
`


const result = (credit_duration, id) => fetch(RESULT, credit_duration, id)

module.exports = {
    result
}