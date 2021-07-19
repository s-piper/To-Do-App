const { Router } = require('express');
const express = require('express');
const toDoRouter = express.Router();

const pool = require('../modules/pool');



//POSTs new tasks to database
toDoRouter.post('/', (req, res) => {
    let newTask = req.body;

    const queryText = `INSERT INTO "tasks" ("task", "priority")
                     VALUES($1, $2)`;

    let values = [newTask.details, newTask.priority];
    
    pool.query(queryText, values)
        .then(result => {
            res.sendStatus(201);
        }).catch(error =>{
            console.log('Didnt add task', error);
            res.sendStatus(500);
        });
});

//GETs tasks from database
toDoRouter.get('/', (req, res) => {
    const queryText = 'SELECT * FROM "tasks" ORDER BY "id";';

    pool.query(queryText)
        .then(result => {
            res.send(result.rows);
        }).catch(error => {
            console.log('router get error', error);
            res.send(500);
             });
});

//DELETES tasks from database
toDoRouter.delete('/:id', (req, res) => {
    deleteTask = req.params.id;

    console.log('Task to delete', deleteTask);

    const queryText = 'DELETE FROM "tasks" WHERE "tasks".id = $1;';

    pool.query(queryText, [deleteTask])
        .then(result => {
            res.sendStatus(200);
        }).catch(error => {
            console.log('delete error', error);
            res.sendStatus(500);
        });
});

//PUT the update value of complete on database
toDoRouter.put('/:id', (req, res) => {
    completeTask = req.params.id;

    const queryText = 'UPDATE "tasks" SET "complete"=true WHERE "tasks".id = $1;';

    pool.query(queryText, [completeTask])
        .then(result => {
            res.sendStatus(200);
        }).catch(error => {
            console.log('put error', error);
            res.sendStatus(500);
        });
})r












module.exports = toDoRouter;