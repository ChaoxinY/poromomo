import {sentXMLRequest} from "../lib/httpsRequestMethods.js";
import {generateElement, generatePopUpMessage, generateCloseButton,generateDivGrid } from "../lib/htmlElementCreatorTool.js";

export default class TaskListDisplayer {

    rootDiv = document.getElementById("taskListDisplayDiv");
    taskDisplayer;
    columns = [];
    columnCount = 4;
    currentColumnIndex = 0;

    // taskList = [];
    constructor(taskDisplayer){
        this.taskDisplayer = taskDisplayer;
        sentXMLRequest("GET","../../api/tasks",this.displayTaskList,this);
    }

 

    displayTaskList(data,context)
    {
        //clear root div
        context.currentColumnIndex = 0;
        context.rootDiv.innerHTML = '';
        //fill root div with tasks
        context.columns = generateDivGrid(context.columnCount, context.rootDiv);
        data.forEach(data => {
            context.generateTaskDisplay(data, context,context.columns[context.currentColumnIndex])
            context.currentColumnIndex++;
            if (context.currentColumnIndex == context.columns.length) { context.currentColumnIndex = 0; }
        });

        //Add task button
        let addTaskButton = document.getElementById("addTaskButton");
        addTaskButton.addEventListener("click", () => {
            sentXMLRequest("POST","../../api/tasks" ,context.onTaskCreated,context);          
        });
    }      

    onTaskCreated(data,context)
    {
  
        context.generateTaskDisplay(data, context, context.columns[context.currentColumnIndex])
        context.currentColumnIndex++;
        if (context.currentColumnIndex == context.columns.length) { context.currentColumnIndex = 0; }
          
    }

    generateTaskDisplay(data, context, containerDiv)
    {
        let taskDiv = generateElement("div", containerDiv, null , "taskListDiv overFlowDiv");
        generateElement("h2",taskDiv,data.name);
        taskDiv.addEventListener("click", () => {
            context.taskDisplayer.currentTask = data;
            sentXMLRequest("GET","../../api/taskParts/task/" + data.id ,context.taskDisplayer.displayTask,context.taskDisplayer);              
        });
    }
}