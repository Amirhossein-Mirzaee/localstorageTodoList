let $ = document;
const inputElem = $.getElementById("itemInput");
const addButton = $.getElementById("addButton");
const clearButton = $.getElementById("clearButton");
const todoListElem = $.getElementById("todoList");

let todosArray = [];

function addNewTodo() {
  let newTodoTitle = inputElem.value;

  let newTodoObj = {
    id: todosArray.length + 1,
    title: newTodoTitle,
    complete: false,
  };

  todosArray.push(newTodoObj);
  setLocalStorage(todosArray);
  todosGenerator(todosArray);
  
  
  inputElem.focus();
}

function setLocalStorage(todosList) {
  localStorage.setItem("todos", JSON.stringify(todosList));
}

function todosGenerator(todosList) {
  let newTodoLiElem, newTodoLabalElem, newTodoCompleteBtn, newTodoDeleteBtn;

  todoListElem.innerHTML = "";

  todosList.forEach(function (todo) {
    console.log(todo);
    newTodoLiElem = $.createElement("li");
    newTodoLiElem.className = "completed well";

    newTodoLabalElem = $.createElement("label");
    newTodoLabalElem.innerHTML = todo.title;

    newTodoCompleteBtn = $.createElement("button");
    newTodoCompleteBtn.className = "btn btn-success";
    newTodoCompleteBtn.innerHTML = "Complete";

    newTodoDeleteBtn = $.createElement("button");
    newTodoDeleteBtn.className = "btn btn-danger";
    newTodoDeleteBtn.innerHTML = "Delete";

    newTodoLiElem.append(
      newTodoLabalElem,
      newTodoCompleteBtn,
      newTodoDeleteBtn
    );

    todoListElem.append(newTodoLiElem);
  });
}

function getLocalStorage() {
  let localStorageTodos = JSON.parse(localStorage.getItem("todos"));

  if (localStorageTodos) {
    todosArray = localStorageTodos;
  } else {
    todosArray = [];
  }

  todosGenerator(todosArray);
}

function clearTodos() {
  todosArray = [];
  todosGenerator(todosArray);
  // localStorage.clear()
  localStorage.removeItem("todos");
}

window.addEventListener("load", getLocalStorage);
addButton.addEventListener("click", addNewTodo);
clearButton.addEventListener("click", clearTodos);
