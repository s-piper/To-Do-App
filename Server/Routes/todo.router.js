const { Router } = require('express');
const express = require('express');
const toDoRouter = express.Router();

const pool = require('../modules/pool');




toDoRouter.post('/', (req, res) => {
    let newTask = req.body;

    let queryText = `INSERT INTO "tasks" ("task", "priority")
                     VALUES($1, $2)`;

    let values = [newTask.details, newTask.priority];
    
    pool.query(queryText, values)
        .then(result => {
            res.sendStatus(201);
        }).catch(error =>{
            console.log('Didnt add task', error);
            res.sendStatus(500);
            
        })

})















module.exports = toDoRouter;