import { getListTask, getRemove, getTimer } from './util.js';

function getCounter(num) {
    let counter = num + tasks.length;
    return counter;
}

let listTask = getListTask();
let removeTasks = getRemove();
let timeEnd = getTimer();
let course;
let tasks = [];
let counterTasks = 0;
const datosLocalStorage = localStorage.getItem('tasks');

if (datosLocalStorage) {
    tasks = JSON.parse(datosLocalStorage);
}

function add(id, info, category, time, status) {
    const myTasks = {
        id: id,
        name: info,
        category: category,
        time: time,
        taskStatus: status
    };

    tasks.push(myTasks);
    counterTasks++;
    addTaskDOM(myTasks);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

for (let i = 0; i < tasks.length; i++) {
    addTaskDOM(tasks[i]);
}

function addTaskDOM(task) {
    const item = document.createElement('li');
    item.setAttribute('id', `task-${task.id}`);
    item.className = 'task-list__item';
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.checked = task.taskStatus;
    const label = document.createElement('p');
    label.setAttribute('class', `${task.category}`);
    const times = document.createElement('span');
    times.setAttribute('class', `time`);
    label.innerHTML = `${task.name}`;
    times.innerHTML = timeNow(task.time);
    const edit = document.createElement('button');
    edit.setAttribute('value', 'Edit');
    edit.setAttribute('class', 'edit');
    const trash = document.createElement('button');
    trash.setAttribute('value', 'Trash');
    trash.className = 'delete';
    trash.setAttribute('id', `delete-${task.id}`);
    trash.dataset.taskId = task.id;
    item.appendChild(checkbox);
    item.appendChild(label);
    item.appendChild(edit);
    item.appendChild(trash);
    item.appendChild(times);
    listTask.appendChild(item);

    if (checkbox.checked) {
        times.classList.add('complete');
        edit.classList.add('completeEdit');
    } else {
        times.classList.remove('complete');
        edit.classList.remove('completeEdit');
    }

    checkbox.addEventListener('click', () => {
        if (checkbox.checked) {
            for (let i = 0; i < tasks.length; i++) {
                if (tasks[i].id == task.id) {
                    tasks[i].taskStatus = true;
                    localStorage.setItem('tasks', JSON.stringify(tasks));
                }
            }
            times.classList.add('complete');
            edit.classList.add('completeEdit');
        } else {
            task.taskStatus = false;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            times.classList.remove('complete');
            edit.classList.remove('completeEdit');
        }
    });

    edit.addEventListener('click', () => {
        label.setAttribute('contentEditable', 'true');
        task.name = label.innerHTML;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    });

    trash.addEventListener('click', (event) => {
        const deleteTrash = event.currentTarget.dataset.taskId;
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].id == deleteTrash) {
                tasks.splice(i, 1);
                localStorage.setItem('tasks', JSON.stringify(tasks));
                item.remove();
            }
        }
    });

    removeTasks.addEventListener('click', () => {
        if (checkbox.checked) {
            for (let i = 0; i < tasks.length; i++) {
                if (tasks[i].taskStatus == true) {
                    tasks.splice(i, 1);
                    localStorage.setItem('tasks', JSON.stringify(tasks));
                    item.remove();
                }
            }
        }
    });
}

function timeNow(time) {
    course = timeEnd.getTime() - time;
    let seconds = Math.floor((course / 1000) % 60);
    let mins = Math.floor((course / (1000 * 60)) % 60);
    let hrs = Math.floor((course / (1000 * 60 * 60)) % 24);
    if (course < 60000) {
        return `${seconds} seconds ago`;
    } else if (course >= 60000 & course <= 3599999) {
        return `${mins} minutes ago`;
    } else if (course >= 3600000) {
        return `${hrs} hour ago`;
    }
}

export {
    add,
    getCounter
};