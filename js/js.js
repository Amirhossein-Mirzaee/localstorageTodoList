let $ = document;
const inputElem = $.getElementById("itemInput");
const addButton = $.getElementById("addButton");
const clearButton = $.getElementById("clearButton");
const todoListElem = $.getElementById("todoList");
let todosArray = [];

const addToList = () => {
  const newTodo = inputElem.value;
  const newTodoObj = {
    id: todosArray.length + 1,
    title: newTodo,
    complete: false,
  };
  todosArray.push(newTodoObj);
  setLocalStorage(todosArray);
  todosGenerator(todosArray);
  inputElem.value = "";
  console.log(todosArray);
};
const setLocalStorage = (todoList) => {
  localStorage.setItem("todos", JSON.stringify(todoList));
};
const todosGenerator = (todoList) => {
  todoListElem.innerHTML = "";
  todoList.forEach((todo) => {
    const newTodoliElem = $.createElement("li");
    newTodoliElem.className = "completed well";
    const newTodoLabalElem = $.createElement("label");
    newTodoLabalElem.innerHTML = todo.title;
    const newTodoCompleteBtn = $.createElement("button");
    newTodoCompleteBtn.className = "btn btn-success";
    newTodoCompleteBtn.innerHTML = "Complete";
    newTodoCompleteBtn.setAttribute(
      "onclick",
      "completeTodo (" + todo.id + ")"
    );
    const newTododeleteBtn = $.createElement("button");
    newTododeleteBtn.className = "btn btn-danger";
    newTododeleteBtn.innerHTML = "Delete";
    newTododeleteBtn.setAttribute("onclick", "removeTodo (" + todo.id + ")");

    if (todo.complete) {
      newTodoliElem.className = "uncompleted well";
      newTodoCompleteBtn.innerHTML = "UnComplete";
    }

    newTodoliElem.append(
      newTodoLabalElem,
      newTodoCompleteBtn,
      newTododeleteBtn
    );
    todoListElem.append(newTodoliElem);
  });
};

const removeTodo = (todoId) => {
  const localStorageTodos = JSON.parse(localStorage.getItem("todos"));
  todosArray = localStorageTodos;
  const mainIndex = todosArray.findIndex((todo) => {
    return todo.id === todoId;
  });
  todosArray.splice(mainIndex, 1);
  console.log(todosArray);
  setLocalStorage(todosArray);
  todosGenerator(todosArray);
};
const completeTodo = (todoId) => {
  const localStorageTodos = JSON.parse(localStorage.getItem("todos"));
  todosArray = localStorageTodos;
  todosArray.forEach((todo) => {
    if (todo.id === todoId) {
      todo.complete = !todo.complete;
    }
  });
  setLocalStorage(todosArray);
  todosGenerator(todosArray);
};

function getLocalStorage() {
  let localStorageTodos = JSON.parse(localStorage.getItem("todos"));

  if (localStorageTodos) {
    todosArray = localStorageTodos;
  } else {
    todosArray = [];
  }

  todosGenerator(todosArray);
}
const clearTodos = () => {
  todosArray = [];
  localStorage.removeItem("todos");
  todosGenerator(todosArray);
};

window.addEventListener("load", getLocalStorage);
addButton.addEventListener("click", addToList);
clearButton.addEventListener("click", clearTodos);
