var ToDo= function (options){
  options=options || {};
  this.task= options.task || '';
  this.elem=options.elem;
  this.done=false;
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

var task, contents;

// var icon = $('<a href="#"><img src="http://f.cl.ly/items/3F2D2J201Q2F3I072632/cross5.png"></a>').load(function() {
//   $(this).width(16).height(16).appendTo('li');
//
// });

$('#sendMessage').on('submit', function (event){
  event.preventDefault(); //wont refresh page
    //Grab the Task Value
    contents = $('#text').val() + '<button>x</button>';



//     var text = $('#text').val() + '<button>x</button>';
//     if(text.length){
//         $('<li />', {html: text}).appendTo('#todoList').append(task.elem)
//     }
//
//
$('ul').on('click','button' , function(el){
    $(this).parent().remove()
});

      // Create a new todo list
    task = new ToDo ({
      task: contents,
      //image: icon,
      elem: $(rendered({task: contents}))[0]

    });


    todo_list.push(task);
    //show our task on the page
    $('#todoList').append(task.elem);
  //  $('li').append(icon);


      //reset form
      $(this)[0].reset();

var q = $('#todoList li').length;
$('#counter').html(q);
});


// Manaage ToDo Items
var todo_modifier;

$('#todoList').on('click', 'li', function(event){
    event.preventDefault();

  todo_modifier = _.findWhere(todo_list, {elem: $(this)[0] });

  if(todo_modifier.done) {
    todo_modifier.done = false;
      $(this).removeClass('done');

    var w = $('#todoList .done').length - 0;
    $('#counterdone').html(w);
  }
  else{
  todo_modifier.done = true;

    $(this).addClass('done');

    var w = $('#todoList .done').length;
    $('#counterdone').html(w);

    $('delete').removeClass();
  }


});
