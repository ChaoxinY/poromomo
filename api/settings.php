<?php
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
