





  // EXTRA VARIANT CODE
// ---------------------------------------------------------------------------------------------------------------------------------
  
  // GLOBAL SCOPE
// ---------------------------------------------------------------------------------------------------------------------------------
let taskIdCounter = 0;
const tasks = []; // task objects array

const formEl = document.querySelector("#task-form");
const tasksToDoEl = document.querySelector("#tasks-to-do");
const tasksInProgressEl = document.querySelector("#tasks-in-progress");
const tasksCompletedEl = document.querySelector("#tasks-completed");
const pageContentEl = document.querySelector("#page-content");


// FUNCTION - ADD TASK AND GET VALUE, CHOOSE TASK-TYPE, ERROR PROOF EMPTY SUBMIT, RESET FORM AFTER SUBMIT, CREATE NAME/TYPE OBJECT
// ---------------------------------------------------------------------------------------------------------------------------------
const taskFormHandler = (event) => {
  event.preventDefault();
  const taskNameInput = document.querySelector("input[name='task-name']").value;
  const taskTypeInput = document.querySelector("select[name='task-type']").value;

  // check if inputs are empty (validate)
  if (taskNameInput === "" || taskTypeInput === "") {
    alert("You need to fill out the task form!");
    return false;
  }

  // reset form fields for next task to be entered
  document.querySelector("input[name='task-name']").value = "";
  document.querySelector("select[name='task-type']").selectedIndex = 0;

  // check if task is new or one being edited by seeing if it has a data-task-id attribute
  // so get task id and call function to complete edit process
  const isEdit = formEl.hasAttribute("data-task-id");
  if (isEdit) {
    let taskId = formEl.getAttribute("data-task-id");
    completeEditTask(taskNameInput, taskTypeInput, taskId);
  } else {
    let taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput,
      status: 'to do'
    };

    createTaskEl(taskDataObj);
  }
};


// FUNCTION - CREATE TASK EL
// ---------------------------------------------------------------------------------------------------------------------------------
const createTaskEl = (taskDataObj) => {
  // create list item
  const listItemEl = document.createElement("li");
  listItemEl.className = "task-item";
  listItemEl.setAttribute("data-task-id", taskIdCounter);

  // below in (taskInfoEl.innerHTML) we are accessing the taskDataObj key value pair properties when setting inner.HTML.
  // CREATE DIV TO HOLD TASK INFO AND ADD TO LIST ITEM:
  const taskInfoEl = document.createElement("div");
  taskInfoEl.className = "task-info";
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
  listItemEl.appendChild(taskInfoEl);

  // add the buttons and select drop down options applied to them in the newly created div in createTaskActions()
  // CREATE TASK ACTIONS (BUTTONS AND SELECT) FOR TASK
  let taskActionsEl = createTaskActions(taskIdCounter);
  listItemEl.appendChild(taskActionsEl);
  tasksToDoEl.appendChild(listItemEl);

  // ADD ID VALUE AS A PROPERTY TO THE taskDataObj ARGUMENT VARIABLE AND ADD ENTIRE OBJECT TO THE tasks ARRAY
  taskDataObj.id = taskIdCounter; // This will set its id to the taskCounter var which actively counts up 
  tasks.push(taskDataObj) // This will push the new set id to the taskDataObj object array

  // SAVE TASKS TO LOCAL STORAGE
  saveTasks();

  // INCREASE TASK COUNTER FOR NEXT UNIQUE ID
  taskIdCounter++;

  // CHECK THAT NEW taskDataObj PROPERTY GETS TO THE FUNCTION VIA THE taskDataObj PARAMETER THAT WE SET UP
  console.log(taskDataObj); // submit a new task to check
  console.log(taskDataObj.status); // submit a new task to check

  
};


// FUNCTION - CREATE TASK ACTIONS
// ---------------------------------------------------------------------------------------------------------------------------------
const createTaskActions = (taskId) => {

  // create DIV / CONTAINER  to contain button and select elements:
  const actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";

  // create edit BUTTON:
  const editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute("data-task-id", taskId);
  actionContainerEl.appendChild(editButtonEl);

  // create delete BUTTON:
  const deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-task-id", taskId);
  actionContainerEl.appendChild(deleteButtonEl);

  // create SELECT element for select status change ability 
  // CREATE CHANGE STATUS DROPDOWN:
  const statusSelectEl = document.createElement("select");
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-task-id", taskId);
  statusSelectEl.className = "select-status";
  actionContainerEl.appendChild(statusSelectEl);
  
  // add three OPTIONS to this dropdown: To Do, In Progress, and Completed.
  // CREATE STATUS OPTIONS:
  const statusChoices = ["To Do", "In Progress", "Completed"];

  for (let i = 0; i < statusChoices.length; i++) {
    // CREATE OPTION ELEMENT
    const statusOptionEl = document.createElement("option");
    statusOptionEl.setAttribute("value", statusChoices[i]);
    statusOptionEl.textContent = statusChoices[i];

    // APPEND TO SELECT ELEMENT
    statusSelectEl.appendChild(statusOptionEl);
  }

  // verify that function is returning correct data
  return actionContainerEl;
};

// FUNCTION - EDIT TASK ACTION
// ---------------------------------------------------------------------------------------------------------------------------------
const completeEditTask = (taskName, taskType, taskId) => { // this parameter should be logged into the console after firing edit
  // console.log(taskName, taskType, taskId);

  // find task list item with taskId value
  let taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  // set new values
  taskSelected.querySelector("h3.task-name").textContent = taskName;
  taskSelected.querySelector("span.task-type").textContent = taskType;

  // LOOP THROUGH TASKS ARRAY AND TASK OBJECT WITH NEW CONTENT
  for (let i = 0; i < tasks.length; i++) {
    if(tasks[i].id === parseInt(taskId)) { // (taskId) is a string, so we convert it to a number for comparison 
      tasks[i].name = taskName;
      tasks[i].type = taskType;
    }
  }

    // SAVE TASKS TO LOCAL STORAGE
    saveTasks();

  alert("Task Updated!");


  // reset the form by removing the task id and changing the button text back to normal
  // remove data attribute from form
  formEl.removeAttribute("data-task-id"); // users are able to create new tasks again.

  // UPDATE formEl button to go back to saying 'Add Task' instead of 'Edit Task'
  formEl.querySelector("#save-task").textContent = "Add Task";
  
};

// FUNCTION - used the manage all the task buttons
// ---------------------------------------------------------------------------------------------------------------------------------
const taskButtonHandler = (event) => {
    // console.log(event.target); // reports the element on which the event occurs, the 'click' event.

  // get target element from event
  let targetEl = event.target;

  // Edit Button was clicked
  if (targetEl.matches(".edit-btn")) {
    console.log("edit", targetEl);
    let taskId = targetEl.getAttribute("data-task-id");
    editTask(taskId);
  } 
  // Delete Button was clicked
  else if (targetEl.matches(".delete-btn")) {
    console.log("delete", targetEl);
    let taskId = targetEl.getAttribute("data-task-id");
    deleteTask(taskId);
  }
};

// FUNCTION - status changing involving other two columns
// ---------------------------------------------------------------------------------------------------------------------------------
const taskStatusChangeHandler = (event) => {
  console.log(event.target.value); // Use event.target on the event obj to get the El that triggered the event
  // We want to 'get' the set attribute ('data-task-id') which initially has a value of 0

  // GET THE TASK ITEM'S ID
  // find task list item based on event.target's data-task-id attribute
  let taskId = event.target.getAttribute("data-task-id");

  // FIND THE PARENT TASK ITEM ELEMENT BASED ON THE ID
  let taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  // GET THE CURRENTLY SELECTED OPTION'S VALUE AND CONVERT TO LOWERCASE
  let statusValue = event.target.value.toLowerCase();

  // * Note that the variable taskSelected didn't create a second <li>.
  // * That would only be the case if we used document.createElement()
  // * It's a reference to an existing DOM element, and we simply appended that existing element somewhere else.

  if (statusValue === "to do") {
    // Here appendChild() didn't create a copy of the task, but moved the taskItem from it origin location in the DOM into the other <ul>.
    tasksToDoEl.appendChild(taskSelected);
  } 
  else if (statusValue === "in progress") {
    tasksInProgressEl.appendChild(taskSelected);
  } 
  else if (statusValue === "completed") {
    tasksCompletedEl.appendChild(taskSelected);
  }
    // * tasksToDoEl, tasksInProgressEl, and tasksCompletedEl are references to the <ul> element
    // * If the user selects "In Progress" from the dropdown, it will append the current task item to the <ul id="tasks-in-progress"> element with 
    // the tasksInProgressEl.appendChild(taskSelected) method.

    // UPDATE TASK'S IN TASK ARRAY
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === parseInt(taskId)) {
        tasks[i].status = statusValue;
      }
    }
    // VERIFY TASKS UPDATE IN TASK ARRAY
    console.log(tasks);

    // SAVE TASKS TO LOCAL STORAGE
    saveTasks();
};

// FUNCTION - EDIT TASK ACTION
// ---------------------------------------------------------------------------------------------------------------------------------
const editTask = (taskId) => {
  console.log(taskId);

  // get task list item element
  let taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  // get content from task name and type
  let taskName = taskSelected.querySelector("h3.task-name").textContent;
  console.log(taskName);

  let taskType = taskSelected.querySelector("span.task-type").textContent;
  console.log(taskType);

  // write values of taskName and taskType to form to be edited
  document.querySelector("input[name='task-name']").value = taskName;
  document.querySelector("select[name='task-type']").value = taskType;

  // set data attribute to the form with a value of the task's id so it knows which one is being edited
  formEl.setAttribute("data-task-id", taskId);

  // update form's button to reflect editing a task rather than creating a new one
  formEl.querySelector("#save-task").textContent = "Save Task";
};

// FUNCTION - DELETE TASK ACTION
// ---------------------------------------------------------------------------------------------------------------------------------
const deleteTask = (taskId) => { // call this function from taskButtonHandler()

  // find task list element with taskId value and remove it
  let taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  taskSelected.remove();

  // create a new array to hold updated list of tasks
  const updatedTaskArr = [];

  // loop through current tasks
  for (let i = 0; i < tasks.length; i++) {
    // if tasks[i].id doesn't match the value of taskId, lets keep that task and push it into the new array
    if (tasks[i].id !== parseInt(taskId)) {
      updatedTaskArr.push(tasks[i]);
    }
  }

  // reassign tasks array to be the same as updatedTaskArr
  tasks = updatedTaskArr; 

  // SAVE TASKS TO LOCAL STORAGE
  saveTasks();
};

// FUNCTION - LOCAL STORAGE FUNCTION
// LOCAL STORAGE METHODS - setItem() & getItem()
// setItem() saves data to local storage
// getItem() retrieves data from local storage?
// ---------------------------------------------------------------------------------------------------------
const saveTasks = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks)); // json = js object notation
  // json is a means of organizing and structuring data thats transferred from one place to another
}


// EVENT LISTENERS AND CONSOLE LOGS
// ---------------------------------------------------------------------------------------------------------------------------------

// Create a new task
formEl.addEventListener("submit", taskFormHandler);

// for edit and delete buttons
pageContentEl.addEventListener("click", taskButtonHandler);

// for changing the status
pageContentEl.addEventListener("change", taskStatusChangeHandler);

// <select> click only fires on the initial click
// Second click to choose an option fires on the <option> element instead of the <select> element.
// Change event that triggers, as the name implies, any time a form element's value changes.
// If an element that has parent elements is clicked, the click event bubbles, or travels, upwards to its parents.


