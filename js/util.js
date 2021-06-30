function getRemove() {
    return document.getElementById('remove');
}

function getContextDoom() {
    return document.getElementById('new-task');
}

function getListTask() {
    return document.getElementById('task-list');
}

function getTimer() {
    return new Date();
}

export {
    getContextDoom,
    getListTask,
    getTimer,
    getRemove
};