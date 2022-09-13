const PORT = process.env.PORT || 9000;

const connection = {
    connectionString: 'postgres://postgres:samandar@localhost:5432/exam',
    connectionElString: 'postgres://sesutblw:s6B9UuSs4wdS2ccVIsNToFumh4c8ynHg@rajje.db.elephantsql.com/sesutblw'
}

module.exports = {
    PORT,
    connection
};