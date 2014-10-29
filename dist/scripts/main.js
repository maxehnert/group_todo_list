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


var task_template = $('#task_items').html();
var rendered = _.template(task_template);

$.getJSON(my_server).done( function(data){

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

    contents = $('#text').val() + '<button class="remove"><img class="removeX" src="../images/cross5.png"/></button>';




task = new ToDo({
   task: contents


 });


    //show our task on the page
    if($('#text').val() === ''){
      return false;
    }


$.ajax({
    type: 'POST',  //post request to the server
    url: my_server, // what url it will be
    data: task  //the data we are sending
  }).done( function (data){
    // Add to my todo_list
    todo_list.push(data);

    // Show our task on the page
    $('#todoList').append(rendered(data));

    // Reset my form
    $(self)[0].reset();


    //creates the total counter
    var q = $('#todoList li').length;
    $('#counter').html(q);
  });

});

$('ul').on('click', 'button', function(e){

  console.log(e);
    $(this).parent().remove();

    $.ajax ({
      type: 'DELETE',
      url: my_server + "/" + todo_modifier._id,
    });

  var q = $('#todoList li').length - 0;
  $('#counter').html(q);

});

// Manaage ToDo Items
var todo_modifier;

//click on the notes to mark them as done
$('#todoList').on('click', 'li', function(event){
    event.preventDefault();

  var myID = $(this).attr('id');

  todo_modifier = _.findWhere(todo_list, { _id: myID });

    if (todo_modifier.done == 'true') {
    todo_modifier.done = 'false';
    $(this).removeClass('done');

    var w = $('#todoList .done').length - 0;
    $('#counterdone').html(w);

    }
    else {
    todo_modifier.done = 'true';
    $(this).addClass('done');

    var w = $('#todoList .done').length;

    $('#counterdone').html(w);

    $('delete').removeClass();

    }

  $.ajax ({
  type: 'PUT',
  url: my_server + "/" + todo_modifier._id,
  data: todo_modifier
  });
});
