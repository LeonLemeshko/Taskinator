

// this is the add task button that we will reference with click action 
const formEl = document.querySelector('#task-form') // or ("#save-task")
// this is the <ul> that we will target for reference and manipulation
let tasksToDoEl = document.querySelector('.task-list'); // or ("#tasks-to-do")

const createTaskHandler = (event) => {

    // this event argument voids default browser protocol 
    event.preventDefault();

    const taskNameInput = document.querySelector("input[name='task-name']").value;
    const taskTypeInput = document.querySelector("select[name='task-type']").value;

    // this also allowed us to find the value property in the El Obj
    // finding this property means we can use it to be assigned to listItemEl.
    console.dir(taskNameInput); // console.log would not give enough info on the El
    console.dir(taskTypeInput)
    
    // create list item
    const listItemEl = document.createElement('li');
    listItemEl.className = 'task-item';

    // create div to hold task info and add to list item
    const taskInfoEl = document.createElement('div');
    taskInfoEl.className = 'task-info';

    // add HTML content to the div
    taskInfoEl.innerHTML = "<h3 class = 'task-name'>" + taskNameInput + "</h3><span class = 'task-type'>" + taskTypeInput + "</span>";
    listItemEl.appendChild(taskInfoEl);

    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl); 
    // this will append the element as the last
    // child automatically every time the click function is operated. This appends
    // listItemEl to the tasksToDoEl on every submit along with its set properties.
    // and this appends taskInfoEl div El on every submit along with its set properties

    console.dir(listItemEl);
};
// this is an event listener with the call back function 'createTaskHandler'
// since the 'button' element's type = submit, the submit of this button ro the 
// enter key will run the createTaskHandler() that adds a new list itemEl. 
formEl.addEventListener('submit', createTaskHandler);
console.log('password test');
