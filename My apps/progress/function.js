export default class local{

    static insertTask(columnId, newText){
        const localData = getLocal();

        const column = localData.find(item => item.columnId == columnId);

        const task = {
            taskId: Math.floor(Math.random()*1000),
            content: newText
        };

        column.tasks.push(task);
        setLocal(localData);
        return task;
    };

    static getAll(){
        const localData = getLocal();
        taskCount();
        return [localData[0].tasks, localData[1].tasks, localData[2].tasks];
    };

    static updateTask(taskId, fewData){
        const localData = getLocal();

        function getColumnTask(){
            for(const column of localData){
                const task = column.tasks.find(item => item.taskId == taskId);
    
                if(task){
                    return [task, column];
                }
            };
        };

        const [task, oldColumn] = getColumnTask();

        const newColumn = localData.find(item => item.columnId == fewData.columnId);
        
        task.content = fewData.content;
        oldColumn.tasks.splice(oldColumn.tasks.indexOf(task), 1);
        newColumn.tasks.push(task);

        setLocal(localData);
    };

    static delete(taskId){
        const localData = getLocal();

        for(const column of localData){
            const deleteTask = column.tasks.find(item => item.taskId == taskId);
            if(deleteTask){
                column.tasks.splice(column.tasks.indexOf(deleteTask), 1);
            }
            setLocal(localData);
        }
    };
};


function getLocal(){
    const localData = localStorage.getItem("localData");

    if(!localData){
        return [
            {columnId: 0, tasks: []},
            {columnId: 1, tasks: []},
            {columnId: 2, tasks: []}
        ]
    };
    return JSON.parse(localData);
};

function setLocal(localData){
    localStorage.setItem("localData", JSON.stringify(localData));
    taskCount();
};

function taskCount(){
    const localData = getLocal();

    const todo = document.querySelector("span.todo");
    todo.textContent = localData[0].tasks.length;

    const pending = document.querySelector("span.pending");
    pending.textContent = localData[1].tasks.length;

    const completed = document.querySelector("span.completed");
    completed.textContent = localData[2].tasks.length;
};