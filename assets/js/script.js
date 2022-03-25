

// const taskIdCounter = 0;
// // this is the add task button that we will reference with click action 
// const formEl = document.querySelector('#task-form') 
// let tasksToDoEl = document.querySelector('.task-list'); // or ("#tasks-to-do")

// const taskFormHandler = (event) => {
//     // this event argument voids default browser protocol 
//     event.preventDefault();

//     const taskNameInput = document.querySelector("input[name='task-name']").value;
//     const taskTypeInput = document.querySelector("select[name='task-type']").value;

//     // check if input values are empty strings
//     if(taskNameInput === '' || taskTypeInput === '') {
//         alert('You need to fill out the task form!');
//         return false;
//     }
//         // this will reset the task form box to avoid manually having to erase what you wrote to create a new one.
//         // the reset() method was designed specifically for the <form> element and won't on any other element.
//         //   formEl.reset();
//             // reset form fields for next task to be entered
//             document.querySelector("input[name='task-name']").value = "";
//             document.querySelector("select[name='task-type']").selectedIndex = 0;

//     // package up data as an object
//     const taskDataObj = {
//         name: taskNameInput,
//         type: taskTypeInput
//     };
    
//     // send it as an argument to createTaskEl
//     createTaskEl(taskDataObj); // calling createTaskEl() in this () is the only way to pass in taskDataObj as an arg in createTaskEl().

//     console.dir(`taskName: ${taskNameInput} | taskType: ${taskTypeInput}`); // taskName: xxxxx | taskType: xxxxx
// };

// const createTaskEl = (taskDataObj, taskIdCounter) => {
//     // create list item
//     const listItemEl = document.createElement('li');
//     listItemEl.className = 'task-item';

//     // add task id as a custom attribute 
//     listItemEl.setAttribute('data-task-id', taskIdCounter);

//     // create div to hold task info and add to list item
//     const taskInfoEl = document.createElement('div');
//     taskInfoEl.className = 'task-info';
//     taskInfoEl.innerHTML = "<h3 class = 'task-name'>" + taskDataObj.name + "</h3><span class = 'task-type'>" + taskDataObj.type + "</span>";
//     listItemEl.appendChild(taskInfoEl);

//     const taskActionsEl = createTaskActions(taskIdCounter);
//     listItemEl.appendChild(taskActionsEl);

//     // check to see if the element is logged to the console when you submit the form.
//     console.log(taskActionsEl);

//     // add entire list item to list
//     tasksToDoEl.appendChild(listItemEl); 

//     // increase task counter for next unique id
//     taskIdCounter++;

//     // console.dir(listItemEl);
// };

// const createTaskActions = (taskId) => {
//     const actionContainerEl = document.createElement('div');
//     actionContainerEl.className = 'task-actions';
    
//     // createEditButton
//     const editButtonEl = document.createElement('button');
//     editButtonEl.innerHTML = 'Edit';
//     editButtonEl.className = 'btn edit-btn';
//     editButtonEl.setAttribute('data-task-id', taskId);

//     actionContainerEl.appendChild(editButtonEl);

//     // createDeleteButton
//     const deleteButtonEl = document.createElement('button');
//     deleteButtonEl.textContent = 'Delete';
//     deleteButtonEl.className = 'btn delete-btn';
//     deleteButtonEl.setAttribute('data-task-id', taskId);

//     actionContainerEl.appendChild(deleteButtonEl);

//     // createOptionDropDown
//     const statusSelectEl = document.createElement('select');
//     statusSelectEl.className = 'select-status';
//     statusSelectEl.setAttribute('name', 'status-change');
//     statusSelectEl.setAttribute('data-task-id', taskId);

//     const statusChoices = ['To Do', 'In Progress', 'Completed'];
//         for (const i = 0; i < statusChoices.length; i++) {
//             // create option element
//             const statusOptionEl = document.createElement('option');
//             statusOptionEl.textContent = statusChoices[i];
//             statusOptionEl.setAttribute('value', statusChoices[i]);

//             // append to select
//             statusSelectEl.appendChild(statusOptionEl);
//         };

//     actionContainerEl.appendChild(statusSelectEl);
//     return actionContainerEl;
// };

// // this is an event listener with the call back function 'taskFormHandler'
// // since the 'button' element's type = submit, the submit of this button ro the 
// // enter key will run the taskFormHandler() that adds a new list itemEl. 
// formEl.addEventListener('submit', taskFormHandler);
// -----------------------------------------------------
var taskIdCounter = 0;

var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var pageContentEl = document.querySelector("#page-content");

var taskFormHandler = function(event) {
  event.preventDefault();
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;

  // check if inputs are empty (validate)
  if (taskNameInput === "" || taskTypeInput === "") {
    alert("You need to fill out the task form!");
    return false;
  }

  // reset form fields for next task to be entered
  document.querySelector("input[name='task-name']").value = "";
  document.querySelector("select[name='task-type']").selectedIndex = 0;

  // check if task is new or one being edited by seeing if it has a data-task-id attribute
  var isEdit = formEl.hasAttribute("data-task-id");

  if (isEdit) {
    var taskId = formEl.getAttribute("data-task-id");
    completeEditTask(taskNameInput, taskTypeInput, taskId);
  } else {
    var taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput
    };

    createTaskEl(taskDataObj);
  }
};

var createTaskEl = function(taskDataObj) {
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";
  listItemEl.setAttribute("data-task-id", taskIdCounter);

  var taskInfoEl = document.createElement("div");
  taskInfoEl.className = "task-info";
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
  listItemEl.appendChild(taskInfoEl);

  // create task actions (buttons and select) for task
  var taskActionsEl = createTaskActions(taskIdCounter);
  listItemEl.appendChild(taskActionsEl);
  tasksToDoEl.appendChild(listItemEl);
  
  console.log(taskActionsEl); // check to see if the element is logged to the console when submitting the form 

  // increase task counter for next unique id
  taskIdCounter++;
};

var createTaskActions = function(taskId) {
  // create container to hold elements
  var actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";

  // create edit button
  var editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute("data-task-id", taskId);
  actionContainerEl.appendChild(editButtonEl);
  // create delete button
  var deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-task-id", taskId);
  actionContainerEl.appendChild(deleteButtonEl);
  // create change status dropdown
  var statusSelectEl = document.createElement("select");
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-task-id", taskId);
  statusSelectEl.className = "select-status";
  actionContainerEl.appendChild(statusSelectEl);
  // create status options
  var statusChoices = ["To Do", "In Progress", "Completed"];

  for (var i = 0; i < statusChoices.length; i++) {
    // create option element
    var statusOptionEl = document.createElement("option");
    statusOptionEl.setAttribute("value", statusChoices[i]);
    statusOptionEl.textContent = statusChoices[i];

    // append to select
    statusSelectEl.appendChild(statusOptionEl);
  }

  return actionContainerEl;
};

var completeEditTask = function(taskName, taskType, taskId) {
  // find task list item with taskId value
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  // set new values
  taskSelected.querySelector("h3.task-name").textContent = taskName;
  taskSelected.querySelector("span.task-type").textContent = taskType;

  alert("Task Updated!");

  // remove data attribute from form
  formEl.removeAttribute("data-task-id");
  // update formEl button to go back to saying "Add Task" instead of "Edit Task"
  formEl.querySelector("#save-task").textContent = "Add Task";
};

var taskButtonHandler = function(event) {
  // get target element from event
  var targetEl = event.target;

  if (targetEl.matches(".edit-btn")) {
    console.log("edit", targetEl);
    var taskId = targetEl.getAttribute("data-task-id");
    editTask(taskId);
  } else if (targetEl.matches(".delete-btn")) {
    console.log("delete", targetEl);
    var taskId = targetEl.getAttribute("data-task-id");
    deleteTask(taskId);
  }
};

var taskStatusChangeHandler = function(event) {
  console.log(event.target.value);

  // find task list item based on event.target's data-task-id attribute
  var taskId = event.target.getAttribute("data-task-id");

  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  // convert value to lower case
  var statusValue = event.target.value.toLowerCase();

  if (statusValue === "to do") {
    tasksToDoEl.appendChild(taskSelected);
  } else if (statusValue === "in progress") {
    tasksInProgressEl.appendChild(taskSelected);
  } else if (statusValue === "completed") {
    tasksCompletedEl.appendChild(taskSelected);
  }
};

var editTask = function(taskId) {
  console.log(taskId);

  // get task list item element
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  // get content from task name and type
  var taskName = taskSelected.querySelector("h3.task-name").textContent;
  console.log(taskName);

  var taskType = taskSelected.querySelector("span.task-type").textContent;
  console.log(taskType);

  // write values of taskname and taskType to form to be edited
  document.querySelector("input[name='task-name']").value = taskName;
  document.querySelector("select[name='task-type']").value = taskType;

  // set data attribute to the form with a value of the task's id so it knows which one is being edited
  formEl.setAttribute("data-task-id", taskId);
  // update form's button to reflect editing a task rather than creating a new one
  formEl.querySelector("#save-task").textContent = "Save Task";
};

var deleteTask = function(taskId) {
  console.log(taskId);
  // find task list element with taskId value and remove it
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  taskSelected.remove();
};

// Create a new task
formEl.addEventListener("submit", taskFormHandler);

// for edit and delete buttons
pageContentEl.addEventListener("click", taskButtonHandler);

// for changing the status
pageContentEl.addEventListener("change", taskStatusChangeHandler);
