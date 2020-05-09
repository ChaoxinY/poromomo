<?php
require_once './lib/databaseToolMethods.php';
require_once './lib/debugToolMethods.php';
require_once './settings.php';

const RETURN_TASKS = 'SELECT * FROM `tasks`';
const RETURN_TASKPARTS = 'SELECT * FROM `taskparts` WHERE task_id = ? ';
const CREATE_TASK = 'INSERT INTO`tasks` (name, description) VALUES ("","") ';
const CREATE_TASKPART = 'INSERT INTO`taskparts` (description, task_id) VALUES (?,?) ';
const UPDATE_TASK = 'UPDATE `tasks` SET name =? , description = ? WHERE id = ?';
const UPDATE_TASKPART = 'UPDATE `taskparts` SET description = ? WHERE id = ?';
const RETURN_HIGHEST_TASK_ID = 'SELECT MAX(id) AS id FROM `tasks`';
const RETURN_HIGHEST_TASKPART_ID = 'SELECT MAX(id) AS id FROM `taskparts`';

$uri = explode('/api/', $_SERVER['REQUEST_URI']);

if (isset($uri[1]) == false) {
    logError(400, "");
}

$uriPart = $uri[1];
if ($_SERVER['REQUEST_METHOD'] === "GET") {

    if ($uriPart === "tasks") {
        echo json_encode(returnQueryResult(executeQuery(createConnection(), RETURN_TASKS)));
    }
    if (strpos($uriPart, 'taskParts') !== false) {
        $dynamicParams = [0 => retrieveDynamicValueFromURIString($uriPart, 2)];
        echo json_encode(returnQueryResult(executeQuery(createConnection(), RETURN_TASKPARTS, $dynamicParams)));
    }
}

if ($_SERVER['REQUEST_METHOD'] === "PUT") {

    if (strpos($uriPart, 'tasksParts') !== false) {
        $keys = [      
            0 => "description"  
        ];
        $dynamicParams = retrieveDynamicValuesFromInput($keys);
        array_push($dynamicParams, retrieveDynamicValueFromURIString($uriPart, 1));
        executeQuery(createConnection(), UPDATE_TASKPART, $dynamicParams);
    }

    else if (strpos($uriPart, 'tasks') !== false) {
        $keys = [
            0 => "name",
            1 => "description",
        ];
        $dynamicParams = retrieveDynamicValuesFromInput($keys);
        array_push($dynamicParams, retrieveDynamicValueFromURIString($uriPart, 1));
        executeQuery(createConnection(), UPDATE_TASK, $dynamicParams);
    }
   
}

if ($_SERVER['REQUEST_METHOD'] === "POST") {
    // echo json_encode($uriPart);
    if ($uriPart === "tasks") {
        //Also set name in database
        //Give an empty description string instead of null
        executeQuery(createConnection(), CREATE_TASK);
        //Query return the highest task id
        echo json_encode(["name" => "Task: ".  returnQueryResult(executeQuery(createConnection(), RETURN_HIGHEST_TASK_ID))[0]["id"]]);
    }
    if ($uriPart === "tasksParts") {
        //Create task PART
    
        $keys = [
            0 => "description",
            1 => "task_id"
        ];
        $dynamicParams = retrieveDynamicValuesFromInput($keys);
        executeQuery(createConnection(), CREATE_TASKPART, $dynamicParams);
        echo json_encode(returnQueryResult(executeQuery(createConnection(), RETURN_HIGHEST_TASKPART_ID))[0]);
    }
}
