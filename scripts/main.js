//api server address
var my_server = 'http://tiy-atl-fe-server.herokuapp.com/collections/mandmlist4';


var ToDo= function (options){
  options = options || {};
  this.task= options.task || '';
  this.done = 'false';
//  this.icon = options.icon;
  this.status = options.status || 'incomplete';
  this.check = function(){
    this.status = 'complete';
  };

};
//collections of ToDo
var todo_list;

//creating a template for our tasks
var task_template = $('#task_items').html();
var rendered = _.template(task_template);

//GET request from server
$.getJSON(my_server).done( function(data){

    //inserting the new list item into the ul
    todo_list = data;
    _.each(todo_list, function (item){
       $('#todoList').prepend(rendered(item));
    });
});

var task, contents;

//add the note click function
$('#sendMessage').on('submit', function (event){
  event.preventDefault(); //wont refresh page
    //Grab the Task Value

  var self = this;

  //what is included in the li
  contents = $('#text').val() + '<button class="remove"><img class="removeX" src="../images/cross5.png"/></button>';

  task = new ToDo({
    task: contents
  });

  //if no value is added to the input field, the submit won't work
  if($('#text').val() === ''){
    return false;
  }

  //Creating the POST request to the server
  $.ajax({
    type: 'POST',  //post request to the server
    url: my_server, // what url it will be
    data: task  //the data we are sending
  }).done( function (data){

    // Add to my todo_list
    todo_list.push(data);

    // Show our task on the page and appear at the top of the list
    $('#todoList').prepend(rendered(data));

    // Reset my form
    $(self)[0].reset();


    //creates the total counter
    var q = $('#todoList li').length;
    $('#counter').html(q);
  });

});

//this is the detele button function
$('ul').on('click', 'button', function(e){

  //removes the li when the X is clicked
  $(this).parent().remove();

  //creates the DELETE request from the server
  $.ajax ({
    type: 'DELETE',
    url: my_server + "/" + todo_modifier._id,
  });

  //decriments our counter down by 1
  var q = $('#todoList li').length -0;
  $('#counter').html(q);

});

// Manaage ToDo Items
var todo_modifier;

//click on the notes to mark them as done
$('#todoList').on('click', 'li', function(event){
  event.preventDefault();

  var myID = $(this).attr('id');

  todo_modifier = _.findWhere(todo_list, { _id: myID });

    //this if/else statement changes the li color when it is clicked
    if (todo_modifier.done == 'true') {
    todo_modifier.done = 'false';
    $(this).removeClass('done');
    //decrements our completed counter up 1
    var w = $('#todoList .done').length - 0;
    $('#counterdone').html(w);

    }
    else {
    todo_modifier.done = 'true';
    $(this).addClass('done');
    //increments our completed counter down 1
    var w = $('#todoList .done').length;

    $('#counterdone').html(w);

    $('delete').removeClass();

    }

  //creates PUT request to server to update 'done' status
  $.ajax ({
  type: 'PUT',
  url: my_server + "/" + todo_modifier._id,
  data: todo_modifier
  });
});
