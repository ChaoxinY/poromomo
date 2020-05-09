import TaskDisplayer from './objects/taskDisplayer.js';
import TaskListDisplayer from './objects/taskListDisplayer.js';
import {sentXMLRequest} from "./lib/httpsRequestMethods.js";

function start()
{
    let taskDisplayer = new TaskDisplayer();
    let taskListDisplayer = new TaskListDisplayer(taskDisplayer);
    document.getElementById("displayTaskButton").addEventListener("click", () => {
        sentXMLRequest("GET","../../api/tasks",taskListDisplayer.displayTaskList,taskListDisplayer);   
        document.getElementById("navigationDiv").style.display = "";
        document.getElementById("taskDiv").style.display = "none";
    });
}

start();