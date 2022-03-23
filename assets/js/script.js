

// this is the add task button that we will reference with click action 
const formEl = document.querySelector('#task-form') 
let tasksToDoEl = document.querySelector('.task-list'); // or ("#tasks-to-do")

const taskFormHandler = (event) => {

    // this event argument voids default browser protocol 
    event.preventDefault();

    const taskNameInput = document.querySelector("input[name='task-name']").value;
    const taskTypeInput = document.querySelector("select[name='task-type']").value;

    // package up data as an object
    const taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };
    
    // send it as an argument to createTaskEl
    createTaskEl(taskDataObj); // calling createTaskEl() in this () is the only way to pass in taskDataObj as an arg in createTaskEl().

    console.dir(`taskName: ${taskNameInput} | taskType: ${taskTypeInput}`); // taskName: xxxxx | taskType: xxxxx
};

const createTaskEl = (taskDataObj) => {
    // create list item
    const listItemEl = document.createElement('li');
    listItemEl.className = 'task-item';

    // create div to hold task info and add to list item
    const taskInfoEl = document.createElement('div');
    taskInfoEl.className = 'task-info';
    taskInfoEl.innerHTML = "<h3 class = 'task-name'>" + taskDataObj.name + "</h3><span class = 'task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);

    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl); 

    // console.dir(listItemEl);
};

// this is an event listener with the call back function 'taskFormHandler'
// since the 'button' element's type = submit, the submit of this button ro the 
// enter key will run the taskFormHandler() that adds a new list itemEl. 
formEl.addEventListener('submit', taskFormHandler);
