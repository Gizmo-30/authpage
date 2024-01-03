const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
require('dotenv').config()


const getDatabasePool = require("./methods/database");
const {ifUsernameExist, checkStatus} = require("./methods/helpers");

const app = express();

const path = require('path');
const envFilePath = path.resolve(__dirname, '../.env');
require('dotenv').config({ path: envFilePath });
const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(bodyParser.json());



const start = async () => {
    try {
        const pool = await getDatabasePool()

        app.listen(PORT, () => console.log(`server started at http://127.0.0.1:${PORT}`))
        app.get('/', (req,res) => res.send('Hello world'))
        async function getUsers() {
            app.get('/users', async (req, res) => {
                try {
                    const [data] = await pool.query('SELECT * FROM users');
                    res.json(data);
                } catch (error) {
                    console.error('Error fetching users:', error);
                    res.status(500).send({ error: 'Internal Server Error' });
                }
            })
        }
        await getUsers()

        app.post('/signup', async (req,res) => {
                const { username, password } = req.body;

                const hashedPassword = await bcrypt.hash(password, 1);

                if(await ifUsernameExist(username, pool)){
                    return res.status(400).send('Username already exists');
                }

                try{
                    await pool.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword])
                    await getUsers()
                    res.sendStatus(201);
                }catch(err){
                    console.error('ERROR registering user: ', err);
                    res.status(500).send('Error registering user');
                }

        })

        app.post('/login', async (req,res) => {
            const { username, password } = req.body;
            const userExists = await ifUsernameExist(username, pool)

            if(!userExists) return res.status(400).send('User does not exist');

            let status = await checkStatus(username, "blocked", pool)

            if(status) return res.status(400).send('User is blocked');

            try{
                let user = await pool.query("SELECT * FROM users WHERE username = ?", [username]);
                let match = await bcrypt.compare(password, user[0][0].password)

                !match && res.status(500).send('Password is not correct')

                await getUsers()
                res.sendStatus(201)
            }catch(err){
                console.error('Error log in user: ', err);
                res.status(500).send("Error login user");
            }
        })

        app.post('/status', async (req,res) => {

            const queryDelete = `DELETE FROM users WHERE username IN (SELECT username FROM (SELECT username FROM users LIMIT ? OFFSET ?) AS subquery)`
            const changeStatus = `UPDATE users SET status = ? WHERE username = (SELECT username FROM (SELECT username FROM users LIMIT 1 OFFSET ?) AS subquery);`

            const {checked, status} = req.body
            try {
                if (status === 'delete') {
                    await pool.query(queryDelete , [checked.length, checked[0]-1])
                } else {
                    await Promise.all(checked.map(async e => {
                        await pool.query(changeStatus, [status, e-1])
                    }))
                }
                await getUsers()
                return res.status(201).send("Status updated successfully")
            } catch (error) {
                console.log(error)
                return res.status(500).send("Error updating status")
            }
        })
        return app
    } catch(err) {
        console.log("Error starting server", err)
        throw err
    }
}
start()
