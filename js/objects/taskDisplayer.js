import { sentXMLRequest } from "../lib/httpsRequestMethods.js";
import { generateElement, generatePopUpMessage, generateCloseButton } from "../lib/htmlElementCreatorTool.js";

export default class TaskDisplayer {

    taskDiv;
    taskName;
    taskDescription;
    taskPartsDiv;
    taskFooterDiv;

    // {description:string, index: number}
    currentTask;
    addPartsButton;

    constructor() {
        //get all exisiting element
        this.taskDiv = document.getElementById("taskDiv");
        this.taskName = document.getElementById("taskName");
        this.taskName.addEventListener("click", () => {
            let elementToModify = { element: taskName, key: "name" };
            this.openInputWindow(elementToModify, this);
        });

        this.taskDescription = document.getElementById("taskDescription");
        let taskDescriptionDiv  = document.getElementById("taskDescriptionDiv");
        taskDescriptionDiv.addEventListener("click", () => {
            let elementToModify = { element: taskDescription, key: "description" };
            this.openInputWindow(elementToModify, this)
        });

        this.taskPartsDiv = document.getElementById("taskPartsDiv");
        this.taskFooterDiv = document.getElementById("taskFooterDiv");
        this.taskFooterDiv.addEventListener("click", () => {
            // taskData.isArchived = true;
            //validate taskdata
            if (this.validateTaskData()) { return; }
            let dataToSent = JSON.stringify({
                name: this.currentTask.name,
                description: this.currentTask.description,
            });
            sentXMLRequest("PUT", "../../api/tasks" + this.currentTask.id, generatePopUpMessage, null, dataToSent);
        });
        //set rootdiv visibility to false
        this.taskDiv.style.display = "none";
    }

    //Needs to receive context
    displayTask(taskpartsData,context) {
        //Set value from data
        console.log(context.currentTask);
        document.getElementById("navigationDiv").style.display = "none";
        context.taskDiv.style.display = "";
        context.taskName.innerHTML = context.currentTask.name;
        context.taskDescription.innerHTML = context.currentTask.description;
        //Add respective parts
        context.taskPartsDiv.innerHTML = "";
        taskpartsData.forEach(taskPart => {
            context.generateTaskPartDiv(taskPart.description, taskPart.id, context);
        });

        let addPartsButton = generateElement("button", context.taskPartsDiv);
        context.addPartsButton = addPartsButton;
        addPartsButton.addEventListener("click", () => {
            let dataToSent = JSON.stringify({
                description: "",
                task_id : context.currentTask.id
            });
            sentXMLRequest("POST", "../../api/tasksParts", context.setTaskPartIndex, context, dataToSent);
        });
    }

    /**
     * 
     * @param {HTMLElement,keyname,index} elementToModify 
     * @param {*} context 
     */
    openInputWindow(elementToModify, context) {
        //Rootdiv has to be next to the elementToModify in the DOM hierachy
        if(document.getElementById("inputWindow") !== null)
        {
            return;
        }
        let rootdiv = generateElement("div", elementToModify.element.parentNode,null,null,"inputWindow");
        elementToModify.element.parentNode.insertBefore(rootdiv, elementToModify.element);
        let textarea = generateElement("textarea", rootdiv);
        textarea.innerHTML = elementToModify.element.innerHTML;
        textarea.focus();
        elementToModify.element.style.display = "none";

        textarea.addEventListener("blur", () => {
            rootdiv.remove();
            elementToModify.element.style.display = "";
            elementToModify.element.innerHTML = textarea.value;
            //Get reference by key name
            if (elementToModify.key == "taskParts") {
                //Call sumbit taskpart function and return
                if (!context.validateTaskData()) { return; }
                let dataToSent = JSON.stringify({
                    description: textarea.value
                });
                sentXMLRequest("PUT", "../../api/tasksParts/" + elementToModify.index, null, null, dataToSent);
                return;
            }
            // let taskData = context.currentTask.find(element => element.key = elementToModify.key);
            //if the key is anything else
            
            context.currentTask[elementToModify.key] = textarea.value;
            if (!context.validateTaskData()) { return; }
            console.log( elementToModify.key );
            console.log(context.currentTask.name);
            let dataToSent = JSON.stringify({
                name: context.currentTask.name,
                description: context.currentTask.description
            });
            elementToModify.element.display = "";
            sentXMLRequest("PUT", "../../api/tasks/" + context.currentTask.id, null, null, dataToSent);
        });
    }

    setTaskPartIndex(data, context) {
        let taskPartDiv = context.generateTaskPartDiv("", data.id, context);
        context.taskPartsDiv.insertBefore(taskPartDiv, context.addPartsButton);
    }

    generateTaskPartDiv(description, index, context) {
        let taskPartDiv = generateElement("div", context.taskPartsDiv,null,"leftMargin_20px taskPartDiv");
        let taskPartDescription = generateElement("h3", taskPartDiv, description);
        taskPartDiv.addEventListener("click", () => {
            let elementToModify = { element: taskPartDescription, key: "taskParts", index: index };
            context.openInputWindow(elementToModify, context);
        });
        //add remove button           
        generateCloseButton(taskPartDiv);
        return taskPartDiv;
    }

    validateTaskData() {
        return true;
    }

}