const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const toDoRouter = require('./routes/todo.router')

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

// Forwards todo server calls to toDoRouter
app.use('/todo', toDoRouter)


app.listen(PORT, () => {
  console.log('listening on port', PORT);
});
