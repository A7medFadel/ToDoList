let
    container = document.querySelector('.container')
    , divOfTasks = document.createElement('li')
    , inputTask = document.querySelector('#input-task')
    , submintTask = document.querySelector('#sbm')
    , ulForDivOfTasks = document.createElement('ul')
    , lisOfTasks = document.createElement('li')
    , checker = document.createElement('input')
    , text = document.createElement('h4')
    , deleteButton = document.createElement('span')
    , noTasksMsg = document.getElementById('noTasksMsg')
    , divOfDivOfTasks = []
    , sameTasksMsgDiv = document.getElementById('sameTasksMsgDiv')
    , deleteAll = document.getElementById('deleteAll')
    , notasksToDelete = document.getElementById('notasksToDelete')
    , tasksAdedNumber = document.getElementById('tasksAdedNumber')
    , test = 0
    , arrayOfTasks = [];

window.onload = function () {
    inputTask.focus();
}

if (localStorage.getItem('tasks') !== null) {
    getTasksToLocalStorage();
    arrayOfTasks = JSON.parse(localStorage.getItem('tasks'));
}

for (let i = 0; i < arrayOfTasks.length; i++) {
    // console.log(arrayOfTasks[i].completed);
    if (arrayOfTasks[i].completed) {
        goToMakeCheckOn(arrayOfTasks[i].id);
    }
}

tasksAdedNumber.innerHTML = 0;

// addTasksToLocalStorage(arrayOfTasks);
// To submit a new task
submintTask.addEventListener("click", function takeInput() {
    event.preventDefault();
    if (inputTask.value !== "") {
        // createTask(inputTask.value);
        addTastToArray(inputTask.value);
        addTasksToLocalStorage(arrayOfTasks);
    } else {
        showMsgOfEmptyTask();
    }

    inputTask.value = "";
});

// localStorage.clear();

container.appendChild(ulForDivOfTasks)

// To delete all tasks if there
deleteAll.addEventListener('click', function delAll(e) {
    if (ulForDivOfTasks.childElementCount == 0) {
        showMsgNotasksToDelete();
    }
    else {
        let arrayDivOfDivOfTasks = Array.from(ulForDivOfTasks.childNodes);
        arrayDivOfDivOfTasks.forEach(e => {
            e.remove();
        });
        tasksAdedNumber.innerHTML = 0;
        noTasksMsg.style.display = 'block';
        localStorage.clear()
    }
    localStorage.clear()
});


// ====================================================== 
// ===================== Functions ======================
// ====================================================== 

// function to add a tosks to array
function addTastToArray(val) {
    let task = {
        'value': val,
        'id': Date.now(),
        'completed': false
    }
    arrayOfTasks.push(task);
    createTask(task.value, task.id)
}

// the main function to create tasks
function createTask(textOfTask, tasksid) {

    let divOfTasks = document.createElement('li');
    divOfTasks.setAttribute("id", "tasks");
    divOfTasks.setAttribute("data-id", tasksid);

    let checker = document.createElement('input');
    checker.id = 'checker';
    checker, tasksCompletedNumber = document.getElementById('tasksCompletedNumber')
    checker.type = 'checkbox';
    checker.classList.add('theChecker');

    let text = document.createElement('h4');
    text.innerHTML = textOfTask;

    let deleteButton = document.createElement('span');
    deleteButton.setAttribute("id", "delete");
    deleteButton.innerHTML = 'delete';

    divOfTasks.appendChild(checker)
    divOfTasks.appendChild(text)
    divOfTasks.appendChild(deleteButton)
    ulForDivOfTasks.appendChild(divOfTasks)

    noTasksMsg.style.display = 'none';

    // to delete task after click on button
    deleteButton.addEventListener('click', function (e) {
        e.target.parentElement.remove();
        if (ulForDivOfTasks.childElementCount == 0) {
            noTasksMsg.style.display = 'block';
        }
        arrayOfTasks = arrayOfTasks.filter((task) => task.id != e.target.parentElement.dataset.id);
        addTasksToLocalStorage(arrayOfTasks);
        tasksAdedNumber.innerHTML = ulForDivOfTasks.childElementCount;
    })
    tasksAdedNumber.innerHTML = ulForDivOfTasks.childElementCount;

    // checker.checked = true;
    // to put line on the task is completed
    checker.addEventListener('click', (e) => {
        if (checker.checked) {
            text.classList.add('completed');
        }
        else {
            text.classList.remove('completed');
        }
        toCheckIfTheTaskCompleted(e.target.parentElement.dataset.id);

        // console.log(e.target.parentElement.childNodes[1].classList.contains('completed'));
        // if (e.target.parentElement.childNodes[1].classList.contains('completed')) {
        //     e.target.checked = true;
        // } else {
        //     e.target.checked = false;
        // }
        if (e.target.parentElement.childNodes[1].classList.contains('completed')) {
            e.target.checked = true;
        } else {
            e.target.checked = false;
        }

        // console.log(toCheckIfTheTaskCompleted(e.target.parentElement.dataset.id));
    });

    divOfDivOfTasks.push(divOfTasks);

}

function goToMakeCheckOn(checkerid) {
    for (let i = 0; i < divOfDivOfTasks.length; i++) {
        if (divOfDivOfTasks[i].dataset.id == checkerid) {
            divOfDivOfTasks[i].childNodes[0].checked = true;
            divOfDivOfTasks[i].childNodes[1].classList.add('completed')

        }
    }
}

// to show empty task massage 
function showMsgOfEmptyTask() {
    sameTasksMsgDiv.style.display = 'flex';
    setTimeout(() => {
        sameTasksMsgDiv.style.display = 'none';
    }, 2000);
}

// to show no task to delete massage  
function showMsgNotasksToDelete() {
    notasksToDelete.style.display = 'flex';
    setTimeout(() => {
        notasksToDelete.style.display = 'none';
    }, 2000);
}

// add tasks to local storage
function addTasksToLocalStorage(array) {
    localStorage.setItem('tasks', JSON.stringify(array));
}

// get tasks from local storage
function getTasksToLocalStorage() {
    localStorage.getItem('tasks');
    let array = JSON.parse(localStorage.getItem('tasks'));
    for (let i = 0; i < array.length; i++) {
        createTask(JSON.parse(localStorage.getItem('tasks'))[i].value, JSON.parse(localStorage.getItem('tasks'))[i].id)
    }
}

// 
function toCheckIfTheTaskCompleted(taskid) {
    for (let i = 0; i < arrayOfTasks.length; i++) {
        // console.log(arrayOfTasks[i].id);
        if (arrayOfTasks[i].id == taskid) {
            arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false);
            // return arrayOfTasks[i].completed;
        }
    }
    addTasksToLocalStorage(arrayOfTasks);
}

// toCheckIfTheTaskCompleted(1)
