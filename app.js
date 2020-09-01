$(document).ready(function(){

   var firebaseConfig = {
    apiKey: "AIzaSyDwHWzlLTijbkT4Ry7fOa0BL8Eq017IC4g",
    authDomain: "todolist-8048a.firebaseapp.com",
    databaseURL: "https://todolist-8048a.firebaseio.com",
    projectId: "todolist-8048a",
    storageBucket: "todolist-8048a.appspot.com",
    messagingSenderId: "207880670227",
    appId: "1:207880670227:web:37676f264a0d51633cc3e6"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  let todo = firebase.database().ref('todo');

  /*let todoRef = todo.push({
    task:"ride a bicycle",
    status:"Pending"
  });*/

  todo.on('value',function(snapshot){
    console.log(snapshot.val());

    let data = snapshot.val();

    $('#pending').html('');

     $('#completed').html('');
    for(let key in data){
      //console.log(data[key].task);

      if(data[key].status==="Pending"){
        $('#pending').append(`
        <div class="card">
          <div class="card-body">
            <h5>${data[key].task}</h5>
            <button data-id="${key}" class="btn btn-danger btn-sm delete">Delete</button>
            <button data-id="${key}" class="btn btn-success btn-sm complete">Completed</button>
          </div>
        </div>
        `);
      }
      else{
        $('#completed').append(`
          <div class="card">
          <div class="card-body">
            <h5>${data[key].task}</h5>
          </div>
        </div>
          `);
      };

      
    };
  })


  $('#add-task').click(function(){
    //alert("Hello");

    let task = $('#task-input').val();

    let todoRef = todo.push({
      task:task,
      status:'Pending'
    });


    $('#task-input').val('');
    alert("Task added");
  });


  //Event Delegation

  $('#pending').on('click','.delete',function(){
    //alert("Hello");

    let taskId=$(this).data("id");

    //alert(taskId);

    //delete that particular task

    firebase.database().ref('todo/' + taskId).remove();
  });
   
  $('#pending').on('click','.complete',function(){
    //alert("Hello");

    let taskId=$(this).data("id");

    //alert(taskId);

    //delete that particular task

    firebase.database().ref('todo/' + taskId).update({
      status:'Completed'
    });
   
  });
   

})