import local from "./function.js";

const addForm = document.querySelectorAll(".add");
const todo = document.querySelector(".cards.todo");
const pending = document.querySelector(".cards.pending");
const completed = document.querySelector(".cards.completed");

const theBox = [todo, pending, completed];

function ListCard(task, index){
    const newForm = document.createElement("form");
    newForm.className = "card";
    newForm.draggable = true;
    newForm.dataset.id = task.taskId;

    newForm.innerHTML = `
                        <input type="text" value="${task.content}" name="task" autocomplete="off" disabled="disabled">
                            <div>
                                <span class="task-id">#${task.taskId}</span>
                                <span>
                                    <button class="bi bi-pencil edit" data-id="${task.taskId}"></button>
                                    <button class="bi bi-check-lg update hide" data-id="${task.taskId}"></button>
                                    <button class="bi bi-trash3 delete" data-id="${task.taskId}"></button>
                                </span>
                            </div>
                        `;
    
    theBox[index].appendChild(newForm);
};

local.getAll().forEach((allTask,index) => {
    allTask.forEach(task => {
        ListCard(task, index);
    });
});

addForm.forEach(eachForm => {
    eachForm.addEventListener("submit", event => {
        event.preventDefault();

        if(eachForm.task.value){
            const task = local.insertTask(eachForm.submit.dataset.id, eachForm.task.value.trim());
            console.log(task);
            ListCard(task, eachForm.submit.dataset.id);
            eachForm.reset();
        }
    });
});

theBox.forEach(eachColumn => {
    eachColumn.addEventListener("click", event => {
        event.preventDefault();

        if(event.target.classList.contains("edit")){
            event.target.parentElement.parentElement.previousElementSibling.removeAttribute("disabled");
            event.target.classList.add("hide");
            event.target.nextElementSibling.classList.remove("hide");
            event.target.parentElement.parentElement.parentElement.removeAttribute("draggable");
        }
    
        if(event.target.classList.contains("update")){
            event.target.parentElement.parentElement.previousElementSibling.setAttribute("disabled","disabled");
            event.target.classList.add("hide");
            event.target.previousElementSibling.classList.remove("hide");
            event.target.parentElement.parentElement.parentElement.setAttribute("draggable","true");

            console.log(event.target.parentElement.parentElement.previousElementSibling.value);

            local.updateTask(event.target.dataset.id, {
                columnId: event.target.parentElement.parentElement.parentElement.parentElement.dataset.id,
                content: event.target.parentElement.parentElement.previousElementSibling.value
            });
        }

        if(event.target.classList.contains("delete")){
            local.delete(event.target.dataset.id);
            event.target.parentElement.parentElement.parentElement.remove("form");
        }
    });

    eachColumn.addEventListener("dragstart", event => {
        if(event.target.classList.contains("card")){
            event.target.classList.add("drag");
        }
    });

    eachColumn.addEventListener("dragover", event => {
        const dragTask = document.querySelector(".drag");
        eachColumn.appendChild(dragTask);
    });

    eachColumn.addEventListener("dragend", event => {
        if(event.target.classList.contains("card")){
            event.target.classList.remove("drag");

            local.updateTask(event.target.dataset.id, {
                columnId: event.target.parentElement.dataset.id,
                content: event.target.task.value
            });
        }
    });
});