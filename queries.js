//Connecting to the posgres database on local environment
const Pool = require('pg').Pool //connection pooler for the postgres database
const pool = new Pool({
    user: 'willieluong',
    host: 'localhost',
    database: 'student',
    password: '',
    port: 5432
})

//function to get all users: 
const getUsers = (request, response) => {
    //command: getting all information from the database by ID by the ascending ID order
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, result) => {
        if(error){
            response.status(401).send('Internal Error')
            throw error
        }
        response.status(200).json(result.rows);
    })
}

//Function to get a single user by ID: 
const getUserByThisID = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM users WHERE id=$1', [id], (error, result) => {
        if(error){
            response.status(401).send('Internal Error')
            //error handling: 
            throw error
        }
        response.status(200).json(result.rows)
    })
}

//function to post a new user to the database: 
const createUser = (request, response) => {
    //deconstructing the request body into objects
    const {name, email, password, type} = request.body

    pool.query('INSERT INTO users(name, email, password, type) VALUES ($1, $2, $3, $4)', [name, email, password, type], (error, result) => {
        if(error){
            response.status(401).send('Internal Error')
            throw error
        }
        
        response.status(201).send(`User added with ID: ${result.insertId}`)
    })
}


//function update a user from the databse
const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const {name, email } = request.body

    pool.query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3',
        [name, email, id], (error, result) => {
            if(error){
                response.status(401).send('Internal Error')
                throw error
            }
            response.status(200).send(`User modified with ID: ${id}`)
        }
    )
}

//function to delete a user from the database
const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        response.status(401).send('Internal Error')
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
}


module.exports = {
    getUsers,
    getUserByThisID,
    createUser,
    updateUser,
    deleteUser
}