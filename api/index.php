<?php
require_once './lib/databaseToolMethods.php';
error_reporting(E_ALL);

if (!file_exists('../../logs')) {
    mkdir('../../logs', 0777, true);
}
ini_set('log_errors', TRUE);
ini_set('error_log', "../../logs/php-errors.log");

// timezone
date_default_timezone_set('Europe/Amsterdam');

define('DB_USERNAME', 'root');
define('DB_PASSWORD', '');
define('DB_SERVER', '127.0.0.1');
define('DB_NAME', 'poromomo');

const RETURN_TASKS = 'SELECT * FROM `tasks`';


$uri = explode('/api/', $_SERVER['REQUEST_URI']);

if (isset($uri[1]) == false) {
    logError(400, "");
}

$uriPart = $uri[1];
if ($_SERVER['REQUEST_METHOD'] === "GET") {

    if ($uriPart === "test") {
        //Creates connection only when a uri is valid.
        createConnection();
        // echo json_encode('his');
        echoQueryResult(executeQuery(createConnection(), RETURN_TASKS));
    }
}

