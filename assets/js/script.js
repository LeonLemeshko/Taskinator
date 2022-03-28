




  // EXTRA VARIANT CODE
// ---------------------------------------------------------------------------------------------------------------------------------
// taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
  
  // GLOBAL SCOPE
// ---------------------------------------------------------------------------------------------------------------------------------
const pageContentEl = document.querySelector('#page-content'); // so the <main> element can delegate the click responsibility since there will be delete.. buttons in all columns
let taskIdCounter = 0;
const formEl = document.querySelector("#task-form");
const tasksToDoEl = document.querySelector("#tasks-to-do");

  // FUNCTION - ADD TASK AND GET VALUE, CHOOSE TASK-TYPE, ERROR PROOF EMPTY SUBMIT, RESET FORM AFTER SUBMIT, CREATE NAME/TYPE OBJECT
// ---------------------------------------------------------------------------------------------------------------------------------
const taskFormHandler = (event) => {

  event.preventDefault();

  const taskNameInput = document.querySelector("input[name='task-name'").value;
  // Query the <input> element below with the name attribute 'task-name' : 
  // <div class="form-group"> <input type="text" name="task-name" class='text-input' placeholder="Enter Task Name"> </div>

  const taskTypeInput = document.querySelector("select[name='task-type']").value;
  // Query the <select> element with the name attribute 'task-type' : 
 // <select name="task-type" class="select-dropdown">....</select>


  // check if inputs are empty (validate)
  if (taskNameInput === "" || taskTypeInput === "") {
    alert("You need to fill out the task form!");
    return false;
  }
  
  formEl.reset();

  // reset form fields for next task to be entered
  document.querySelector("input[name='task-name']").value = "";
  document.querySelector("select[name='task-type']").selectedIndex = 0;

  // check element for certain attribute
  const isEdit = formEl.hasAttribute('data-task-id');
  // console.log(isEdit)
    // has data attribute, so get task id and call function to complete edit process
    if (isEdit) {
      let taskId = formEl.getAttribute('data-task-id');
      completeEditTask(taskNameInput, taskTypeInput, taskId);
    } 
    // no data attribute, so create object as normal and pass to createTaskEl()
    else {
      var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
      };
    };

  createTaskEl(taskDataObj);
};
// ---------------------------------------------------------------------------------------------------------------------------------


  // FUNCTION - CREATE TASK EL
// ---------------------------------------------------------------------------------------------------------------------------------
const createTaskEl = (taskDataObj) => { // using the taskDataObj from taskFormHandler() allows us to access its key value properties
  // create list item
  const listItemEl = document.createElement("li");
  listItemEl.className = "task-item";

  // add task id as a custom attribute
  listItemEl.setAttribute('data-task-id', taskIdCounter); // NEW ATTRIBUTE WIL BE: "data-task-id" = 0

  // create div to hold task info and add to list item
  // below in (taskInfoEl.innerHTML) we are accessing the taskDataObj key value pair properties when setting inner.HTML.
  const taskInfoEl = document.createElement("div");
  taskInfoEl.className = "task-info";
  // taskInfoEl.innerHTML = `<h3 class='task-name'> ${taskDataObj.name} </h3>  // this format will break the code 
  //                         <span class='task-type'> ${taskDataObj.type} </span>`; // this format will break the code
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
  listItemEl.appendChild(taskInfoEl);

    // add the buttons and select drop down options applied to them in the newly created div in createTaskActions()
  const taskActionsEl = createTaskActions(taskIdCounter);
  listItemEl.appendChild(taskActionsEl);

  // add list item to list
  tasksToDoEl.appendChild(listItemEl);
  taskIdCounter++
};
// ---------------------------------------------------------------------------------------------------------------------------------

  // FUNCTION - CREATE TASK ACTIONS
// ---------------------------------------------------------------------------------------------------------------------------------
  const createTaskActions = (taskId) => {

      // create DIV to contain button and select elements
    const actionContainerEl = document.createElement('div');
    actionContainerEl.className = 'task-actions';

    // create edit BUTTON
  const editButtonEl = document.createElement('button');
  editButtonEl.textContent = 'Edit';
  editButtonEl.className = 'btn edit-btn';
  editButtonEl.setAttribute('data-task-id', taskId);

  actionContainerEl.appendChild(editButtonEl);

  // create delete BUTTON
  const deleteButtonEl = document.createElement('button');
  deleteButtonEl.textContent = 'Delete';
  deleteButtonEl.className = 'btn delete-btn';
  deleteButtonEl.setAttribute('data-task-id', taskId);

  actionContainerEl.appendChild(deleteButtonEl);

  // create SELECT element for select status change ability 
  const statusSelectEl = document.createElement('select');
  statusSelectEl.className = 'select-status';
  statusSelectEl.setAttribute('name', 'status-change');
  statusSelectEl.setAttribute('data-task-id', taskId);

  actionContainerEl.appendChild(statusSelectEl);

  // add three OPTIONS to this dropdown: To Do, In Progress, and Completed.
  const statusChoices = ['To Do', 'In Progress', 'Completed'];
    for (let i = 0; i < statusChoices.length; i++) {
      // CREATE OPTION ELEMENT
        const statusOptionEl = document.createElement('option');
        statusOptionEl.textContent = statusChoices[i]; //  returns the value of the array at the given index 
        statusOptionEl.setAttribute ('value', statusChoices[i]); // value = statusChoices array.length being looped at any given index

      // APPEND TO SELECT ELEMENT
        statusSelectEl.appendChild(statusOptionEl);
    }



  // verify that function is returning correct data
  return actionContainerEl; // BELOW IS WHAT createTaskActions(5) IN THE CONSOLE SHOULD OUTPUT: 
  
// <div class="task-actions">
//   <button class="btn edit-btn" data-task-id="5">Edit</button>
//   <button class="btn delete-btn" data-task-id="5">Delete</button>
//     <select class="select-status" name="status-change" data-task-id="5">
//        <option value="To Do">To Do</option>
//        <option value="In Progress">In Progress</option>
//        <option value="Completed">Completed</option>
//     </select>
// </div>

};
// ---------------------------------------------------------------------------------------------------------------------------------

    // EVENT LISTENERS AND CONSOLE LOGS
// ---------------------------------------------------------------------------------------------------------------------------------
formEl.addEventListener("submit", taskFormHandler);
// ---------------------------------------------------------------------------------------------------------------------------------

// FUNCTION - used the manage all the task buttons
// ---------------------------------------------------------------------------------------------------------------------------------
const taskButtonHandler = (event) => {
  // console.log(event.target); // reports the element on which the event occurs, the 'click' event.
    // Get target element from event
    const targetEl = event.target;

    // Edit Button was clicked
    if (targetEl.matches('.edit-btn')) {
      let taskId = targetEl.getAttribute('data-task-id');
      editTask(taskId);
    }
    // Delete Button was clicked
    else if (targetEl.matches('.delete.btn')) {
      let taskId = targetEl.getAttribute('data-task-id');
      deleteTask(taskId);  
    }
};

// FUNCTION - DELETE TASK ACTION
// ---------------------------------------------------------------------------------------------------------------------------------
const deleteTask = (taskId) => { // call this function from taskButtonHandler()
  const taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  // console.log(taskSelected);
  // console.log(taskId);
  taskSelected.remove(); // makes the delete button actually delete
};

// FUNCTION - EDIT TASK ACTION
// ---------------------------------------------------------------------------------------------------------------------------------
const editTask = (taskId) => {
  // get task list item element
  let taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  // get content from task name and type
  let taskName = taskSelected.querySelector("h3.task-name").textContent;
  // console.log(taskName);

  let taskType = taskSelected.querySelector("span.task-type").textContent;
  // console.log(taskType);

  document.querySelector("input[name='task-name']").value = taskName;
  document.querySelector("select[name='task-type']").value = taskType; // ??? is not appearing in form input taskType
  document.querySelector('#save-task').textContent = 'Save Task';

  formEl.setAttribute('data-task-id', taskId);


  // console.log('editing task #' + taskId); // editing task #0
  // console.log(taskSelected); // prints the DOM of the the listItemEl
  // console.log(taskId); // 0
};

// FUNCTION - EDIT TASK ACTION
// ---------------------------------------------------------------------------------------------------------------------------------
const completeEditTask = (taskName, taskType, taskId) => { // this parameter should be logged into the console after firing edit
  // console.log(taskName, taskType, taskId);
     let taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']")

  // set new values
    taskSelected.querySelector('h3.task-name').textContent = taskName;
    taskSelected.querySelector('span.task-type').textContent = taskType;

    alert('Task Updated!');

    //  reset the form by removing the task id and changing the button text back to normal
    formEl.removeAttribute('data-task-id');
    document.querySelector('#save-task').textContent = 'Add Task';
};


    // EVENT LISTENERS AND CONSOLE LOGS
// ---------------------------------------------------------------------------------------------------------------------------------
pageContentEl.addEventListener('click', taskButtonHandler);
//  If an element that has parent elements is clicked, the click event bubbles, or travels, upwards to its parents.
