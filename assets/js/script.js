

// this is the add task button that we will reference with click action 
let buttonEl = document.querySelector('.btn'); // or ("#save-task")
// this is the <ul> that we will target for reference and manipulation
let tasksToDoEl = document.querySelector('.task-list'); // or ("#tasks-to-do")

const createTaskHandler = () => {
    const listItemEl = document.createElement('li');
    listItemEl.className = 'task-item';
    listItemEl.innerHTML = 'This is a new task.';
    tasksToDoEl.appendChild(listItemEl); // this will append the element as the last
    // child automatically every time the click function is operated. This appends
    // listItemEl to the tasksToDoEl on every click along with its set properties.
}
// this is an event listener with the call back function 'createTaskHandler'
buttonEl.addEventListener('click', createTaskHandler);



