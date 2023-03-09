'use strict';

const form = document.querySelector('.create-task-form');
const clearBtn = document.querySelector('.clear-tasks');
const taskInput = document.querySelector('.task-input');
const filter = document.querySelector('.filter-input');
const taskList = document.querySelector('.collection');

document.addEventListener('DOMContentLoaded', showPosts);
form.addEventListener('submit', addTask);
taskList.addEventListener('click', deleteTask);
clearBtn.addEventListener('click', removeAllTasks);
filter.addEventListener('keyup', filterTasks);
taskList.addEventListener('click', editTask);


// Function is called when the page loads and retrieves the list 
// of tasks from Local Storage. It then creates a DOM element for each task and adds it to the list.
function showPosts() {
    let tasks;
// If local storage contains an item with the key 'tasks', the value is retrieved, parsed from JSON format, and assigned to tasks.
// If local storage does not contain an item with the key 'tasks', an empty array is assigned to tasks.
    if (localStorage.getItem('tasks') !== null) {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    } else {
        tasks = []
    }
// For each task in tasks, the following actions are taken:
    tasks.forEach((task) => {
// Create a new list item (<li>) element and assign it to the li variable.
// Add a class of 'task' to the li element.
// Set the data-id attribute of the li element to the ID of the task.
// Set the inner HTML of the li element to a string that includes the text of the task.
        const li = document.createElement('li');
        li.classList.add('task');
        li.dataset.id = task.id; 
        li.innerHTML = `<span class='text'>${task.text}</span>`;
// Create a new span element and assign it to the buttonEdit variable.
// Add a class of 'edit-task' to the buttonEdit element.
// Set the inner HTML of the buttonEdit element to an icon for editing a task.
// Append the buttonEdit element to the li element.
        const buttonEdit = document.createElement('span');
        buttonEdit.classList.add('edit-task');
        buttonEdit.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';
        li.append(buttonEdit);
// Create a new span element and assign it to the button variable.
// Add a class of 'remove-task' to the button element.
// Set the inner HTML of the button element to an SVG image for deleting a task.
// Append the button element to the li element.
        const button = document.createElement('span');
        button.classList.add('remove-task');
        button.innerHTML = '<svg viewBox="0 0 24 24" width="35" height="35"><path d="M18 6L6 18M6 6l12 12" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>';
        li.append(button);
// Append the li element to the taskList element (which is not shown in the code provided).
        taskList.append(li);
    })
    
}


function addTask(event) {
//  prevents the default behavior of the event, which prevents
//  the page from reloading when the form is submitted.
    event.preventDefault();
// Gets the value of the input field for the task, trims 
// it to remove any leading or trailing whitespace, 
// and stores it in the value variable. 
// If the value is an empty string, the function returns null.
    const value = taskInput.value.trim();
    if (value === '') {
        return null;
    }
// generates a unique ID for the new task using the Date.now() 
// method and converts it to a string. 
// This ID is stored in the taskId variable.
    const taskId = Date.now().toString(); // assign a unique ID to the task
// creates a new list item (<li>) element using 
// the document.createElement() method, and adds the 
// class task to it using the classList.add() method. 
// It also sets the taskId as a data attribute 
// using the li.dataset.id property.
    const li = document.createElement('li');
    li.classList.add('task');
    li.dataset.id = taskId; // set the ID as a data attribute
//  Creates a new span element to display the text of the task
// using the document.createElement() method. 
//  It adds the class text to it using the classList.add() method, 
//  sets the text content to the value of the input 
//  field using the textContent property, and appends it to the li element.
    const taskText = document.createElement('span');
    taskText.classList.add('text');
    taskText.textContent = value;
    li.appendChild(taskText);

// Creates span elements, one for an edit button and one 
// for a remove button. These are created in a similar way to 
// the task text span element, but with different 
// classes and HTML content. Both of these span elements 
// are appended to the li element.
    const buttonEdit = document.createElement('span');
    buttonEdit.classList.add('edit-task');
    buttonEdit.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';
    li.appendChild(buttonEdit);

    const button = document.createElement('span');
    button.classList.add('remove-task');
    button.innerHTML = '<svg viewBox="0 0 24 24" width="35" height="35"><path d="M18 6L6 18M6 6l12 12" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>';
    li.appendChild(button);
// the li element is appended to the existing ul element that
//  contains the task list using the taskList.append() method. 
    taskList.append(li);
// Call storeTasksInLocalStorage and passes it an object
//  containing the taskId and the value of the task.
    storeTasksInLocalStorage({ id: taskId, text: value });
// input field for the task is then cleared using
//  the taskInput.value = '' assignment.
    taskInput.value = '';
}

//  Functions that takes a single argument, task, 
// which is the task that the user wants to store in local storage.
function storeTasksInLocalStorage(task) {
    let tasks;
// checks if there is already an item in local storage with 
// the key 'tasks'. If there is an item with that key,
//  the value is not null, and the code that.
//  retrieves the value of the 'tasks' key from local 
// storage using JSON.parse(), which converts the JSON-formatted 
// string to a JavaScript object. 
// The resulting object is assigned to the tasks variable. 
    if (localStorage.getItem('tasks') !== null) {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    } else {
        tasks = []
    }
// push() method is used to add the task argument 
// to the end of the tasks array.
    tasks.push(task);
// the localStorage.setItem() method is used to store
// the updated tasks array in local storage. 
// The JSON.stringify() method is used to convert 
// the JavaScript object to a JSON-formatted string before it is stored. 
// The key for the item in local storage is set to 'tasks'.
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//  function that deletes a task from the DOM and 
// from local storage when the user 
// clicks on a delete button associated with that task. 
function deleteTask(event) {
// checks if the clicked element is an SVG element 
// (i.e., an icon). This is done using the tagName 
// property of the event.target object, which returns 
// the tag name of the clicked element in uppercase. 
// If the clicked element is an SVG element,
// the code inside this if block is executed.
    if (event.target.tagName === 'svg') {
// checks if the user confirms that they want to 
// delete the task by showing a confirmation dialog
//  using the confirm() method. If the user clicks 'OK', 
// the code inside this if block is executed.
        if (confirm('Are you sure you want to delete this task?')) {
// gets the ID of the task that the user wants to delete. 
// This is done by retrieving the data-id attribute
// from the parent node of the clicked element
// using the dataset property. 
// The resulting ID is assigned to the taskId variable
            const taskId = event.target.parentNode.parentNode.dataset.id;
//  removes the parent node of the clicked element 
// (which is the task item in the list) from the DOM.  
            event.target.parentNode.parentNode.remove();
// remove the task with the specified taskId from local storage.
            removeTaskFromLocalStorage(taskId); 
        }
// The else if block checks if the clicked element is a path element and doing the same that code above
    }else if (event.target.tagName === 'path') {
           if (confirm('Are you sure you want to delete this task?')) {
            const taskId = event.target.parentNode.parentNode.parentNode.dataset.id; // get the ID of the task
            event.target.parentNode.parentNode.parentNode.remove();
            removeTaskFromLocalStorage(taskId);
        }
    }
}



function editTask(event) {
// checks if the target element that triggered the event has the tag name 'I',
// indicating that an icon was clicked.
    if (event.target.tagName === 'I') {
// retrieves the text of the previous sibling element of the icon's parent element
// using previousElementSibling and stores it in a variable called currentText.
      let textSpan = event.target.parentElement.previousElementSibling;
      let currentText = textSpan.textContent;
  
// prompts the user to enter new text and stores the input value in a variable called newText.
      let newText = prompt('Enter new text:', currentText);
  
// if the newText variable is not null and not empty after being trimmed,
// the function updates the text content of the textSpan element to the new text.
      if (newText !== null && newText.trim() !== '') {
// retrieves an array of tasks stored in local storage
        let tasks = JSON.parse(localStorage.getItem('tasks'));
  
// finds the task object with the same text as the currentText
        let task = tasks.find((task) => task.text === currentText);
  
// if the task object is found, updates its text property with the new text
        if (task) {
          task.text = newText;
          localStorage.setItem('tasks', JSON.stringify(tasks));
        }
  
// updates the text content of the textSpan element to the new text
        textSpan.textContent = newText;
      }
    }
  }

function removeTaskFromLocalStorage(taskId) {
    let tasks;
// If the tasks key exists, the function parses its value from a 
// JSON string to an array of objects using JSON.parse(), 
// and assigns it to the tasks variable else to empty array.
    if (localStorage.getItem('tasks') !== null) {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    } else {
        tasks = []
    }
// The function filters the tasks array using the Array.filter() 
// method, which returns a new array that only includes
// the tasks whose id property does not match the taskId parameter.
    const filteredTasks = tasks.filter((task) => {
        return task.id !== taskId;
    });
// The filtered tasks array is then converted back to a 
// JSON string using JSON.stringify() and saved to the local storage 
    localStorage.setItem('tasks', JSON.stringify(filteredTasks));
}

// Removes all task-related data 
function removeAllTasks() {

    if (confirm('Are you sure you want to delete?')) {
        taskList.innerHTML = '';
        removeAllTaskFromLocalStorage();
    }
}

// removes all task-related data from the browser's local storage. 
// This is done so that the deleted tasks do not reappear the next 
// time the user visits the web page.
function removeAllTaskFromLocalStorage() {
    localStorage.clear()
}

// function is a search/filter function that is called 
// when the user types in the search bar. 
// It takes an event object as a parameter, which contains 
// information about the event that triggered the function.
function filterTasks(event) {
    const itemList = document.querySelectorAll('.task');
    const searchQuery = event.target.value.toLowerCase();
// loops through each task item in the itemList using the forEach method. 
// For each task item, it retrieves the text content of the first 
// child element (which contains the task description) and converts it to 
// lowercase using the toLowerCase method. It stores this value in the itemValue variable.
    itemList.forEach((item) => {
        const itemValue = item.firstChild.textContent.toLowerCase();
// checks whether the itemValue includes the searchQuery. If it does, 
// it sets the display style of the task item to list-item, 
// which shows the item in the list. 
// If it doesn't include the searchQuery, it 
// sets the display style to none, which hides the item from the list.        
        if (itemValue.includes(searchQuery)) {
            item.style.display = 'list-item';
        } else {
            item.style.display = 'none';
        }
    })
}

// Additional function that show what element was clicked
// document.addEventListener("click", function(event) {
//     // Retrieve the element that was clicked
//     var clickedElement = event.target;
//     // Do something with the clicked element
//     console.log("The element with tag name '" + clickedElement.tagName + "' was clicked.");
// });