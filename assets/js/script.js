





  // EXTRA VARIANT CODE
// ---------------------------------------------------------------------------------------------------------------------------------
  
  // GLOBAL SCOPE
// ---------------------------------------------------------------------------------------------------------------------------------
let taskIdCounter = 0;

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
  const isEdit = formEl.hasAttribute("data-task-id");
  // has data attribute, so get task id and call function to complete edit process
  if (isEdit) {
    let taskId = formEl.getAttribute("data-task-id");
    completeEditTask(taskNameInput, taskTypeInput, taskId);
  } else {
    let taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput
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

  // INCREASE TASK COUNTER FOR NEXT UNIQUE ID
  taskIdCounter++;
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
};

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


