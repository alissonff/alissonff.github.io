//Selectors

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listener
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//Functions

function addTodo(event){
    if(todoInput.value === ''){
        alert("Todo empty, try again");
        todoInput.value = ''
    } else{
        //Prevent form from submitting
    event.preventDefault();
    
    //create Todo DIV
    const todoDiv = document.createElement('div');
    //assign a class to it
    todoDiv.classList.add('todo');

    //creating LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    newTodo.setAttribute('completed', false);
    todoDiv.appendChild(newTodo);

    //completed button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    //delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add('delete-btn');
    todoDiv.appendChild(deleteButton);

    //Append Todo List
    todoList.appendChild(todoDiv);

    //add todos to a local storage
    saveLocalTodos(todoInput.value);
    
    //clear todo input value
    todoInput.value = "";
    }
}

//delete and check function

function deleteCheck(e){
    const item = e.target;
    if(item.classList[0] === "delete-btn"){
        const todo = item.parentElement;
        //animation 
        todo.classList.add('fall');
        removeLocalTodos(todo); 
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });      
        
    }

    if (item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
        todo.children[0].setAttribute('completed', true);
        completeTodo(todo);      
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch (e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display = "flex";
                } else{
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display = "flex";
                } else{
                    todo.style.display = "none";
                }
                break;               
        }
    });
}

function saveLocalTodos(todo){
    let todosJson = {todo: todo, completed: false};

    let todos;
    //check if the file already exists
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todosJson);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo){
        //create Todo DIV
        const todoDiv = document.createElement('div');
        //assign a class to it
        todoDiv.classList.add('todo');

        //creating LI
        const newTodo = document.createElement('li');
        newTodo.innerText = todo.todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        //completed button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);

        //delete button
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.classList.add('delete-btn');
        todoDiv.appendChild(deleteButton);
        if (todo.completed === true){
            todoDiv.classList.add("completed");
        }

        //Append Todo List
        todoList.appendChild(todoDiv);       
    });
}

function removeLocalTodos(todo){
    //Check
  let todos;
  let updatedTodos = [];
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.forEach(function (innerTodo, index) {
    
    if (innerTodo.todo === todoIndex) {
    } else {
      updatedTodos.push(innerTodo);
    }
  });
  
  localStorage.setItem("todos", JSON.stringify(updatedTodos));
}

function completeTodo(todo) {
    //Check
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    const hasClass = todo.classList.contains("completed");
    todos.forEach(function (innerTodo, index) {
      if (innerTodo.todo === todoIndex) {
        if (hasClass) {
          innerTodo.completed = true;
        } else {
          innerTodo.completed = false;
        }
  
        todos[index] = innerTodo;
        localStorage.setItem("todos", JSON.stringify(todos));
      }
    });
  }
  