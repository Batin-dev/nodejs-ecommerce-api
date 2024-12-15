const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const logger = require('../lib/logger');

const usersFilePath = path.join(__dirname, '../db/users.json');

const getUsers = () => {
    const data = fs.readFileSync(usersFilePath, 'utf-8');
    return JSON.parse(data);
};

router.get('/', (req, res) => {
    const users = getUsers(); 
    res.json(users);
});

router.post('/login', (req,res)=> {

    const { email, password } = req.body;
    if(!email || !password) return res.status(401).json({ succes : false, error : "Email and password must be filled!"});

    const users = getUsers();
    const user = users.find(user => user.email === email && user.password === password);

    if(user)  {
        res.status(200).json({ succes : true}); console.log(`${email} succesfully logined`)
        logger("LOGIN","/user/login", email)
    }

    else { res.status(401).json({ succes : false, error : "invalid email or password"})};

});
module.exports = router;
