//Main file to create a simple express server using express
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser')
//postgres database queries command 
const db = require('./queries');
//app will be deployed on a default port or port 5000 
const PORT = process.env.PORT || 5000;

//set a static folder, to write middleware
app.use(express.static(path.join(__dirname, 'public')));

//rendering the message onto the front end
app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

//creating CRUD endpoint 
app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

//app will listen on a custom port. 
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


