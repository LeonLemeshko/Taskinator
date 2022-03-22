

// this is the add task button that we will reference with click action 
const formEl = document.querySelector('#task-form') // or ("#save-task")
// this is the <ul> that we will target for reference and manipulation
let tasksToDoEl = document.querySelector('.task-list'); // or ("#tasks-to-do")

const createTaskHandler = (event) => {

    // this event argument voids default browser protocol 
    event.preventDefault();

    const listItemEl = document.createElement('li');
    listItemEl.className = 'task-item';
    listItemEl.innerHTML = 'This is a new task.';
    tasksToDoEl.appendChild(listItemEl); // this will append the element as the last
    // child automatically every time the click function is operated. This appends
    // listItemEl to the tasksToDoEl on every click along with its set properties.
};
// this is an event listener with the call back function 'createTaskHandler'
// since the 'button' element's type = submit, the submit of this button ro the 
// enter key will run the createTaskHandler() that adds a new list itemEl. 
formEl.addEventListener('submit', createTaskHandler);
