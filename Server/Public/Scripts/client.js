const { fileURLToPath } = require("url");

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
              priority: $('#priority'),val()
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
        loadTasks();
      }).catch(err =>{
        alert('Not sure how to tell you this:', err);
      })
  }


  function loadTasks() {
      
  }