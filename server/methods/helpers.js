async function ifUsernameExist(username, pool) {
    const [rows] = await pool.execute('SELECT COUNT(*) as count FROM users WHERE username = ?', [username]);
    return rows[0].count > 0;
}

async function checkStatus(username, state, pool) {
    try {
        const result = await pool.execute("SELECT status FROM users WHERE username = ?", [username])
        return result[0][0].status === state
    } catch (error) {
        console.error('ERROR getting status data', error)
    }
}


async function getStatus(username, pool) {
    try {
        return await pool.execute("SELECT status FROM users WHERE username = ?", [username])
    } catch (error) {
        console.error('ERROR getting status data', error)
    }
}



module.exports = {ifUsernameExist, checkStatus, getStatus}