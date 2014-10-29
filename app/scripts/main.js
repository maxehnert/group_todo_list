var my_server = 'http://tiy-atl-fe-server.herokuapp.com/collections/mandmlist2';


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
var todo_list = [];


var task_template = $('#task_items').html();
var rendered = _.template(task_template);

$.getJSON(my_server).done( function(data){
todo_list = data;
    _.each(todo_list, function (item){

       $('#todoList', 'todo_list').prepend(rendered(item));
    });
});

var task, contents;


// var icon = $('<a href="#"><img src="http://f.cl.ly/items/3F2D2J201Q2F3I072632/cross5.png"></a>').load(function() {
//   $(this).width(16).height(16).appendTo('li');
//
// });



$('#sendMessage').on('submit', function (event){
  event.preventDefault(); //wont refresh page
    //Grab the Task Value
var self = this;
    contents = $('#text').val() + '<button class="remove">x</button>';


//     var text = $('#text').val() + '<button>x</button>';
//     if(text.length){
//         $('<li />', {html: text}).appendTo('#todoList').append(task.elem)
//     }
//
//
$('ul').on('click','button' , function(el){
    $(this).parent().remove();

var q = $('#todoList li').length - 0;
$('#counter').html(q);

});

task = new ToDo({
   task: contents


 });



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

var q = $('#todoList li').length;
$('#counter').html(q);

   });

});

// Manaage ToDo Items
var todo_modifier;

$('#todoList').on('click', 'li', function(event){
    event.preventDefault();

  var myID = $(this).attr('id');

  todo_modifier = _.findWhere(todo_list, { _id: myID });

    if (todo_modifier.done == 'true') {
    todo_modifier.done = 'false';
    $(this).removeClass('done');

var w = $('#todoList .done').length - 0;
$('#counterdone').html(w);


  } else {
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


// $.ajax ({
//   type: 'DELETE',
//   url: my_server + "/" + todo_modifier._id
// });

});
