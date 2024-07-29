const todoForm = document.getElementById("todoForm");
const todoInput = todoForm.children[0];
const todoList = document.getElementById("todoList");
const totalTodo = document.getElementById("totalTodo");
const allTodoBtn = document.getElementById("allTodo");
const activeTodoBtn = document.getElementById("activeTodo");
const completedTodoBtn = document.getElementById("completedTodo");
const clearBtn = document.getElementById("clearBtn");

let allTodo = [];

const getActiveTodos = () => {
  return allTodo.filter((todo) => !todo.isDone);
};
const getCompletedTodos = () => {
  return allTodo.filter((todo) => todo.isDone === true);
};

totalTodo.innerText = getActiveTodos().length;

class Todo {
  constructor(todoText) {
    this.todoText = todoText;
    this.id = Date.now();
    this.isDone = false;
  }
}

const handleDisplayTodo = (filterTodo) => {
  todoList.innerHTML = "";
  let todoListElms = "";

  filterTodo.forEach((todo) => {
    todoListElms += `
        <li
           class="group p-6 flex items-center justify-between w-full gap-4 items-center border-b border-slate-500"
              >
                <div class="flex items-center gap-4">
                  <div class="relative w-[20px] h-[20px]">
             
                    ${
                      todo.isDone
                        ? ` <span class=' absolute flex rounded-full p-1  bg-gradient-to-br from-cyan-500 to-voilet-500'
                    >
                      <img
                        class='w-full'
                        src='/images/icon-check.svg'
                        alt="Icon Check"
                    /></span>`
                        : ` <span  class="absolute flex cursor-pointer rounded-full border p-1 w-[20px] h-[20px]"
                    >
                    </span>`
                    }
                          <input class=" cursor-pointer opacity-0 w-[20px] h-[20px] absolute" onchange="handleToggleCompleteTask(${
                            todo.id
                          })"  type="checkbox" /> 
                  </div>
                  <span>${todo.todoText}</span>
                </div>

                <button onclick="handleDeleteTask(${
                  todo.id
                })" class="hidden group-hover:block">
                  <img src="/images/icon-cross.svg" alt="cross" />
                </button>
              </li>`;
  });

  totalTodo.innerText = getActiveTodos().length;
  todoList.innerHTML = todoListElms;
};

const handleAddTodo = (e) => {
  // It prevents the window reloading
  e.preventDefault();
  const inputValue = todoInput.value;
  const newTodo = new Todo(inputValue);
  allTodo.push(newTodo);
  handleDisplayTodo(allTodo);
  todoInput.value = "";
};

const handleToggleCompleteTask = (id) => {
  const victimTodo = allTodo.find((todo) => todo.id === id);

  victimTodo.isDone = !victimTodo.isDone;
  handleDisplayTodo(allTodo);
};
const handleDeleteTask = (id) => {
  allTodo = allTodo.filter((todo) => todo.id !== id);

  handleDisplayTodo(allTodo);
};

// Addd Event LIstener to the form
todoForm.addEventListener("submit", handleAddTodo);

// Add Evenet LIsterners to The Filter Buttons
activeTodoBtn.addEventListener("click", () => {
  const activeTodos = getActiveTodos();
  handleDisplayTodo(activeTodos);
});
allTodoBtn.addEventListener("click", () => {
  handleDisplayTodo(allTodo);
});
completedTodoBtn.addEventListener("click", () => {
  const completedTodo = getCompletedTodos();
  handleDisplayTodo(completedTodo);
});

clearBtn.addEventListener("click", () => {
  allTodo = getActiveTodos();
  handleDisplayTodo(allTodo);
});
