import Task from './Task.js';
import { getCounter } from './localStorage.js';
import { getContextDoom, getTimer } from './util.js';
let time = getTimer();
const tasks = getContextDoom();

tasks.addEventListener('submit', (event) => {
    event.preventDefault();
    const tasksList = new Task(getCounter(0), tasks.elements[0].value, tasks.elements[1].value, time.getTime(), false);
    tasksList.addTask();
    tasks.elements[0].value = '';
    tasks.elements[1].value = '';
});