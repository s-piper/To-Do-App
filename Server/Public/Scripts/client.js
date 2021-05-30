// const { fileURLToPath } = require("url");

console.log('js loaded');

$( document ).ready( function(){
    console.log( 'jQ loaded' );

    clickListeners();

  }); // end jQuery
  

  //starts the function for button clicks
  //collects input data
  function clickListeners() {
      $('#addBtn').on('click', function() {
          console.log('in add btn click');
          
          let taskToSend = {
              details: $('#taskIn').val(),
              priority: $('#priority').val()
          };

          sendTask(taskToSend);
      });
      //triggers GET call
      getTasks();

      $('#taskTable').on('click', '.delete', handleDelete);
      $('#taskTable').on('click', '.completed', markComplete);


  }

  //Adds sends new task to server
  function sendTask(newTask) {
    $.ajax({
        method:'POST',
        url: '/todo',
        data: newTask
      }).then(response => {
        console.log('server says:', response);
        getTasks();
      }).catch(err =>{
        alert('Not sure how to tell you this:', err);
      })
  }

  //GETS tasks from server
  function getTasks() {
    console.log( 'getTasks' );
    $.ajax({
      type: 'GET',
      url: '/todo'
    }).then (function (response) {
      console.log('get server says', response);
      loadTasks(response);
    }).catch (err => {
      console.log('get error', err);
    });
  }

    //Clears DOM and renders tasks based on category
    //Creates applicable delete and complete buttons
  function loadTasks(tasks) {
      $('#highPriority').empty();
      $('#mediumPriority').empty();
      $('#lowPriority').empty();
      $('#completed').empty();
      $('#taskIn').val('');

      for (let i = 0; i < tasks.length; i++) {
          let task = tasks[i];

          if (task.complete === true) {
            $('#completed').append(`
            <tr>
                <td>${task.task}</td>
                <td>${task.priority}</td>
                <td>Crushed It!</td>
                <td><button class = "btn btn-danger delete" data-id ="${task.id}">Delete</button></td>
            `)
          }else if (task.priority == 'medium') {
            $('#mediumPriority').append(`
            <tr>
                <td>${task.task}</td>
                <td>${task.priority}</td>
                <td><button class = "btn btn-success completed" data-id ="${task.id}">Complete?</button></td>
                <td><button class = "btn btn-danger delete" data-id ="${task.id}" >Delete</button></td>
            `)
          }else if (task.priority == 'low') {
            $('#lowPriority').append(`
            <tr>
                <td>${task.task}</td>
                <td>${task.priority}</td>
                <td><button class = "btn btn-success completed" data-id ="${task.id}">Complete?</button></td>
                <td><button class = "btn btn-danger delete" data-id ="${task.id}">Delete</button></td>
            `)
          }else if (task.priority == 'high') {
            $('#highPriority').append(`
            <tr>
                <td>${task.task}</td>
                <td>${task.priority}</td>
                <td><button class = "btn btn-success completed" data-id ="${task.id}">Complete?</button></td>
                <td><button class = "btn btn-danger delete" data-id ="${task.id}">Delete</button></td>
            `)
          }
          
      }

  }
  //Handles the delete click, identifies item to delete using id
  //Could be added to deleteTask function
    function handleDelete() {
    console.log('delete click');

    taskToDelete = $(this).data("id");

    deleteTask(taskToDelete);
}
//Sends DELETE to server
function deleteTask(taskId) {
    console.log('in deleteTask');

    $.ajax({
        method: 'DELETE',
        url: `/todo/${taskId}`
    }).then( response => {
        console.log('deleted task', taskId);
    }).catch( error => {
        console.log('delete error', error);
    }); 

    getTasks();
}

//handles complete click and sends to server
function markComplete(){
    console.log('complete click');
    let taskId = $(this).data("id");
   
  
    $.ajax({
      method:'PUT',
      url: `/todo/${taskId}`,
    }).then(response => {
      console.log('mark complete', taskId);
      getTasks();
    }).catch(error =>{
      alert('Are you sure you did it?', error);
    })
  }