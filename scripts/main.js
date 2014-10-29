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


//add the note click function
$('#sendMessage').on('submit', function (event){
  event.preventDefault(); //wont refresh page
    //Grab the Task Value
    contents = $('#text').val() + '<button class="remove"><img class="removeX" src="../images/cross5.png"/></button>';

    //click to remove the note and decrement the total counter
    $('ul').on('click','button' , function(el){
        $(this).parent().remove();
        var q = $('#todoList li').length -0;
        $('#counter').html(q);
    });

    // Create a new todo list
    task = new ToDo ({
      task: contents,
      elem: $(rendered({task: contents}))[0]
    });

    todo_list.push(task);


    //show our task on the page
    if($('#text').val() === ''){
      return false;
    }

    $('#todoList').append(task.elem);

    //reset form
    $(this)[0].reset();


    //else(return false;);

    //creates the total counter
    var q = $('#todoList li').length;
    $('#counter').html(q);
});


// Manaage ToDo Items
var todo_modifier;

//click on the notes to mark them as done
$('#todoList').on('click', 'li', function(event){
    event.preventDefault();

  todo_modifier = _.findWhere(todo_list, {elem: $(this)[0] });

  //this changes the note to done and increments the done counter
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
