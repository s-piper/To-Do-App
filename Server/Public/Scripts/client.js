// const { fileURLToPath } = require("url");

console.log('js loaded');

$( document ).ready( function(){
    console.log( 'jQ loaded' );

    clickListeners()
  
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
      })
  }


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


  function getTasks() {
    console.log( 'getTasks' );
    // calls server to get tasks
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

  function loadTasks(tasks) {
      $('#highPriority').empty();
      $('#mediumPriority').empty();
      $('#lowPriority').empty();

      for (let i = 0;  < tasks.length; ++) {
          let task = tasks[i];

          if (task.complete === true) {
            $('#completed').append(`
            <tr>
                <td>${task.details}</td>
                <td>${task.priority}</td>
                <td><button class = "delete" data-id ="${tasks.id}">Delete</button></td>
            `)
          }else if (task.priority == 'medium') {
            $('#mediumPriority').append(`
            <tr>
                <td>${task.details}</td>
                <td>${task.priority}</td>
                <td><button class = "completed" data-id ="${tasks.id}">Complete?</button></td>
                <td><button class = "delete" data-id ="${tasks.id}">Delete</button></td>
            `)
          }else if (task.priority == 'low') {
            $('#lowPriority').append(`
            <tr>
                <td>${task.details}</td>
                <td>${task.priority}</td>
                <td><button class = "completed" data-id ="${tasks.id}">Complete?</button></td>
                <td><button class = "delete" data-id ="${tasks.id}">Delete</button></td>
            `)
          }else if (task.priority == 'high') {
            $('#highPriority').append(`
            <tr>
                <td>${task.details}</td>
                <td>${task.priority}</td>
                <td><button class = "completed" data-id ="${tasks.id}">Complete?</button></td>
                <td><button class = "delete" data-id ="${tasks.id}">Delete</button></td>
            `)
          }
          
      }


  }