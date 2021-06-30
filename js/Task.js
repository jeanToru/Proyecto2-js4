import { add } from './localStorage.js';

class Task {
    constructor(id,info, category, time, status) {
        this.id = id;
        this.info = info;
        this.category = category;
        this.time = time;
        this.taskStatus = status;
    }

    addTask() {
        add(this.id,this.info, this.category, this.time, this.taskStatus);
    }
}

export default Task;